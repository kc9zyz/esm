<?php
// This include the database user and password, as well as the ssh key used as the data posting password
include "../../../dbpass.php";
include "../../dbpass.php";
error_reporting(E_ALL);
ini_set('display_errors', 'on');

$panelSqm = 15.6;
$shingleSqm = 9.79;
$sampleTime = 5/60;
$locationPrecision = 100; // Meters away from a location that is considered independent

$conn = mysqli_connect($servername, $username, $password, $db);
if (!$conn) {
   die("Connection failed: " . mysqli_connect_error());
}
switch (filter_input(INPUT_GET,"asset",FILTER_SANITIZE_STRING)) {
case "current-data":
{
   if ($_SERVER['REQUEST_METHOD'] === 'POST') {
      // Get the json string from the post body
      $dataString = $_POST["json"];
      // Decode the JSON data
      $sentData = json_decode($dataString,true);

      // Verify identity of requestor
      $hash = $_POST["hash"];
      // Check that the hash presented by the remote is correct 
      if(hash("md5",$dataString.$pass) == $hash) {
         // Set all the variables from 
         $panelOutput = (float)$sentData["panelOutput"];
         $shingleOutput = (float)$sentData["shingleOutput"];
         $timestamp = $sentData["timestamp"];
         $lat = (float)$sentData["lat"];
         $lon = (float)$sentData["lon"];
         $heading = (int)$sentData["heading"];
         $panelAngle = (int)$sentData["panelAngle"];

         $sql = "select * from esm WHERE timestamp = ".$timestamp.";";
         $result = mysqli_query($conn, $sql);
         // Check if timestamp is already in database, reject as a replay attack
         if(mysqli_num_rows($result) > 0) {
            header("HTTP/1.1 401 Unauthorized");
            echo json_encode(array("error" => "Unautharized", "cause" => "Timestamp Match"));
            return;
         }


         $timeout = 5;
         $locID = 0;

         if (abs($lat) > 90 || abs($lon) > 180)
         {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(array("error" => "Coordinates Out of Bounds"));
            return;
         }
         while($timeout)
         {
            // Returns closest location that is x meters away
            $sql = "SELECT id, ( 6371000 * acos( cos( radians(".$lat.") ) * cos( radians( lat ) ) * cos( radians( lon ) - radians(".$lon.") ) + sin( radians(".$lat.") ) * sin( radians( lat ) ) ) ) AS distance FROM locations HAVING distance < ".$locationPrecision." ORDER BY distance LIMIT 1;";
            $result = mysqli_query($conn, $sql);
            // Check to see if any locations were found
            if(mysqli_num_rows($result) > 0) {
               while($row = mysqli_fetch_assoc($result)){
                  $locID = (int)$row["id"];
               }
               // If a location is found, break out of the timeout loop
               break;
            }
            // Insert a new location
            else
            {
               $sql = "insert into locations (lat, lon) VALUES (".$lat.",".$lon.");";
               $result = mysqli_query($conn, $sql);

               // Location id is set by another run through this loop, lockup is handled by timeout value
               $timeout--;
            }
         }
         if(!$timeout)
         {
            header("HTTP/1.1 500 Internal Server Error");
            echo json_encode(array("error" => "DB error"));
            return;
         }

         // Insert the data point into the esm table
         $sql = "insert into esm (panelOutput,shingleOutput,timestamp,location,heading,panelAngle) VALUES (".$panelOutput.",".$shingleOutput.",".$timestamp.",".$locID.",".$heading.",".$panelAngle.");";
         $result = mysqli_query($conn, $sql);
      } else {
         header("HTTP/1.1 401 Unauthorized");
         echo json_encode(array("error" => "Unautharized", "cause" => "Hash Mismatch"));
         return;
      }
   } 
   // 
   $sql = "select * from esm WHERE timestamp <= NOW() ORDER BY timestamp DESC LIMIT 1;";
   $result = mysqli_query($conn, $sql);
   if(mysqli_num_rows($result) > 0) {
      while($row = mysqli_fetch_assoc($result)){
         // Calculate the total output based on system parameters
         $totalPanel = floor((int)$row["panelOutput"] * $panelSqm);
         $totalShingle = floor((int)$row["shingleOutput"] * $shingleSqm);
         $totalOutput = $totalPanel + $totalShingle;
         $data = array('panelOutput' => (int)$row["panelOutput"],'shingleOutput' => (int)$row["shingleOutput"],
            'totalShingle' => $totalShingle, 'totalPanel' => $totalPanel, 'totalOutput' => $totalOutput,
            'timestamp' => $row["timestamp"], 'panelAngle' => $row["panelAngle"], 'heading' => $row["heading"]);
      }
   }
   else{
      $data = array('output' => 200, 'error'=> 'no rows');
   }
   header('Content-Type: application/json');
   echo json_encode($data);
   break;
}
case "historical-data":
{
   $times = array();
   $panelOutputs=array();
   $shingleOutputs=array();
   $headings=array();
   $panelAngles=array();
   $locations=array();

   $numPoints = filter_input(INPUT_GET,"points",FILTER_SANITIZE_NUMBER_INT);
   $duration = filter_input(INPUT_GET,"duration",FILTER_SANITIZE_STRING);
   // Select the duration based on the parameter passed
   switch ($duration) {
   case "hour":
      $sql = "select * from esm where timestamp >= DATE_SUB(NOW(), INTERVAL 1 HOUR) AND timestamp <= NOW() ORDER BY timestamp ASC; ";
      break;
   case "day":
      $sql = "select * from esm where timestamp >= DATE_SUB(NOW(), INTERVAL 1 DAY) AND timestamp <= NOW() ORDER BY timestamp ASC;";
      break;
   case "week":
      $sql = "select * from esm where timestamp >= DATE_SUB(NOW(), INTERVAL 1 WEEK) AND timestamp <= NOW() ORDER BY timestamp ASC;";
      break;
   case "month":
      $sql = "select * from esm where timestamp >= DATE_SUB(NOW(), INTERVAL 1 MONTH) AND timestamp <= NOW() ORDER BY timestamp ASC;";
      break;
   case "year":
      $sql = "select * from esm where timestamp >= DATE_SUB(NOW(), INTERVAL 1 YEAR) AND timestamp <= NOW() ORDER BY timestamp ASC;";
      break;
   case "all":
      $sql = "select * from esm where timestamp <= NOW() ORDER BY timestamp ASC;";
      break;

   default:
      header("HTTP/1.1 400 Bad Request");
      echo json_encode(array("error" => "Param error"));
      return;
   }

   // Get the data type requested
   $dataType = filter_input(INPUT_GET,"type",FILTER_SANITIZE_STRING);
   if(!$dataType)
   {
      $dataType = "json";
   }

   // Run the query
   $result = mysqli_query($conn, $sql);
   if(mysqli_num_rows($result) > 0) {
      while($row = mysqli_fetch_assoc($result)){
         array_push($times,$row["timestamp"]);
         array_push($panelOutputs,$row["panelOutput"]);
         array_push($shingleOutputs,$row["shingleOutput"]);
         array_push($headings,$row["heading"]);
         array_push($panelAngles,$row["panelAngle"]);
         array_push($locations,$row["location"]);
      }
   }
   // Tally the produced power over the period selected
   $panelkWh = 0;
   $shinglekWh = 0;
   // Loop and integrate
   for($i=0;$i<count($panelOutputs);$i++)
   {
      $panelkWh += $panelOutputs[$i] * $panelSqm * $sampleTime; 
      $shinglekWh += $shingleOutputs[$i] * $shingleSqm * $sampleTime; 
   }
   $panelkWh = $panelkWh / 1000;
   $shinglekWh = $shinglekWh / 1000;
   $panelkWh = floor($panelkWh);
   $shinglekWh = floor($shinglekWh);

   // Check if the number of returned points is greater than the number requested
   if($numPoints && count($times) > $numPoints)
   {
      // Consolidate the number of points by averaging
      $newTimes = array();
      $newPanel = array();
      $newShingle = array();
      $newHeadings = array();
      $newpanelAngles = array();
      $newLocations = array();
      $length = count($times);

      // Loop through each data point
      for($i=0;$i<$length;$i++)
      {
         // if the data point is not first in a given bin, add it to the bin list
         if($i % (int)ceil($length/$numPoints))
         {
            array_push($newPanel[floor($i/ceil($length/$numPoints))],$panelOutputs[$i]);
            array_push($newShingle[floor($i/ceil($length/$numPoints))],$shingleOutputs[$i]);
            array_push($newTimes[floor($i/ceil($length/$numPoints))],$times[$i]);
            array_push($newHeadings[floor($i/ceil($length/$numPoints))],$headings[$i]);
            array_push($newpanelAngles[floor($i/ceil($length/$numPoints))],$panelAngles[$i]);
            array_push($newLocations[floor($i/ceil($length/$numPoints))],$locations[$i]);
         }
         // Otherwise, create a new bin and add the data to it
         else
         {
            $newTimes[$i/ceil($length/$numPoints)] = array($times[$i]);
            $newPanel[$i/ceil($length/$numPoints)] = array($panelOutputs[$i]);
            $newShingle[$i/ceil($length/$numPoints)] = array($shingleOutputs[$i]);
            $newHeadings[$i/ceil($length/$numPoints)] = array($headings[$i]);
            $newpanelAngles[$i/ceil($length/$numPoints)] = array($panelAngles[$i]);
            $newLocations[$i/ceil($length/$numPoints)] = array($locations[$i]);
         }
      }
      // Retrieve the length of the new list
      $length = count($newPanel);
      // Loop through the array-of-arrays and combine bin data
      for($i=0;$i<$length;$i++)
      {
         $totalPanel = 0;
         $totalShingle = 0;

         // Perform average on panel and shingle data
         for($j=0;$j<count($newPanel[$i]);$j++)
         {
            $totalPanel+=(float)$newPanel[$i][$j];
            $totalShingle+=(float)$newShingle[$i][$j];
         }
         // Take the midpoint for all other data
         $newPanel[$i] = round($totalPanel/count($newPanel[$i]),1);
         $newShingle[$i] = round($totalShingle/count($newShingle[$i]),1);
         $newTimes[$i] = $newTimes[$i][floor(count($newTimes[$i])/2)];
         $newHeadings[$i] = $newHeadings[$i][floor(count($newHeadings[$i])/2)];
         $newpanelAngles[$i] = $newpanelAngles[$i][floor(count($newpanelAngles[$i])/2)];
         $newLocations[$i] = $newLocations[$i][floor(count($newLocations[$i])/2)];
      }
      // Move binned data into the original variables for responding
      $panelOutputs = $newPanel;
      $shingleOutputs = $newShingle;
      $times = $newTimes;
      $headings = $newHeadings;
      $panelAngles = $newpanelAngles;
      $locations = $newLocations;
   }
   // Get the lattitde and longitude values of each location
   $sql = "select * from locations;";
   $locationsData = array();

   $result = mysqli_query($conn, $sql);
   if(mysqli_num_rows($result) > 0) {
      while($row = mysqli_fetch_assoc($result)){
         // Add raw location to list corresponding to location ID
         $locationsData[$row["id"]] = array($row["lat"],$row["lon"]);
      }
   }

   if($dataType == "json")
   {
      for($i=0;$i<count($locations);$i++)
      {
         $locations[$i] = array($locationsData[$locations[$i]][0],$locationsData[$locations[$i]][1]);
      }
      $data = array('times' => $times, 'panelOutputs'=> $panelOutputs, 'shingleOutputs' => $shingleOutputs,
         'headings' => $headings, 'panelAngles' => $panelAngles, 'locations' => $locations, 'panelkWh' => $panelkWh, 'shinglekWh' => $shinglekWh);
      header('Content-Type: application/json');
      echo json_encode($data);
   }
   else if($dataType == "csv")
   {
      header("Content-type: text/csv");
      header("Content-Disposition: attachment; filename=ESM_data_".$duration.".csv");
      header("Pragma: no-cache");
      header("Expires: 0");

      $f = fopen("php://output","w");
      fputcsv($f,array("Times","Panel Output (w/m2)","Shingle Output (w/m2)","Heading","Panel Angle", "Lattitude","Longitude"),',');
      for($i=0; $i<count($times);$i++)
      {
         fputcsv($f,array($times[$i],$panelOutputs[$i],$shingleOutputs[$i],$headings[$i],$panelAngles[$i],$locationsData[$locations[$i]][0],$locationsData[$locations[$i]][1]),',');
      }
   }
   break;
}
case "locations":
{
   $sql = "select * from locations;";
   $locations = array();
   $lastSeen = array();
   $totalOutput = array();

   $result = mysqli_query($conn, $sql);
   if(mysqli_num_rows($result) > 0) {
      while($row = mysqli_fetch_assoc($result)){
         array_push($locations,array($row["lat"],$row["lon"],$row["id"]));
      }
   }
   for($i=0;$i<count($locations);$i++)
   {
      $sql = "select * from esm where location = ".$locations[$i][2]." AND timestamp <= NOW() order by timestamp desc limit 1;";
      $result = mysqli_query($conn, $sql);
      if(mysqli_num_rows($result) > 0) {
         while($row = mysqli_fetch_assoc($result)){
            array_push($lastSeen,$row["timestamp"]);
         }
      }
      $totalkWh = 0;
      $sql = "select * from esm where location = ".$locations[$i][2]." AND timestamp <= NOW() order by timestamp desc;";
      $result = mysqli_query($conn, $sql);
      if(mysqli_num_rows($result) > 0) {
         while($row = mysqli_fetch_assoc($result)){
            $totalkWh+=(float)$row["panelOutput"] * $panelSqm;
            $totalkWh+=(float)$row["shingleOutput"] * $shingleSqm;
         }
      }
      $totalkWh *= ($sampleTime);
      $totalkWh /= 1000;
      if($totalkWh < 100)
      {
         $totalkWh = round($totalkWh,2);
      }
      else
      {
         $totalkWh = round($totalkWh,0);
      }
      array_push($totalOutput,$totalkWh);

      // Remove the MySQL ID from the result
      array_pop($locations[$i]);

   }
   $data = array('locations' => $locations, 'lastSeen' => $lastSeen, 'totalOutput' => $totalOutput);
   header('Content-Type: application/json');
   echo json_encode($data);
   break;
}

default:
{
   header("HTTP/1.1 404 Not Found");
   echo "<h1>Invalid Resource</h1>";
   return;
}
}
?>
