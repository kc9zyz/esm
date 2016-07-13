<?php
include "../../../dbpass.php";
include "../../dbpass.php";
error_reporting(E_ALL);
ini_set('display_errors', 'on');

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
      // Check that the hashed 
      if(hash("md5",$dataString.$pass) == $hash) {
         // Set all the variables from 
         $panelOutput = (float)$sentData["panelOutput"];
         $shingleOutput = (float)$sentData["shingleOutput"];
         $timestamp = $sentData["timestamp"];
         $lat = (float)$sentData["lat"];
         $lon = (float)$sentData["lon"];
         $heading = (int)$sentData["heading"];
         $panel_angle = (int)$sentData["panel_angle"];

         $timeout = 5;
         $locID = 0;

         while($timeout)
         {
            // Returns closest location that is x meters away
            $x = 100;
            $sql = "SELECT id, ( 6371000 * acos( cos( radians(".$lat.") ) * cos( radians( lat ) ) * cos( radians( lon ) - radians(".$lon.") ) + sin( radians(".$lat.") ) * sin( radians( lat ) ) ) ) AS distance FROM locations HAVING distance < ".$x." ORDER BY distance LIMIT 1;";
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
         $sql = "insert into esm (panelOutput,shingleOutput,timestamp,location,heading,panel_angle) VALUES (".$panelOutput.",".$shingleOutput.",".$timestamp.",".$locID.",".$heading.",".$panel_angle.");";
         $result = mysqli_query($conn, $sql);
      } else {
         header("HTTP/1.1 401 Unauthorized");
         echo json_encode(array("error" => "Unautharized"));
         return;
      }
   } 
   // 
   $sql = "select * from esm WHERE timestamp <= NOW() ORDER BY timestamp DESC LIMIT 1;";
   $result = mysqli_query($conn, $sql);
   if(mysqli_num_rows($result) > 0) {
      while($row = mysqli_fetch_assoc($result)){
         $data = array('panelOutput' => (int)$row["panelOutput"],'shingleOutput' => (int)$row["shingleOutput"]);
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
   $heading=array();
   $panel_angle=array();
   $locations=array();

   $sql = "select * from esm where timestamp >= DATE_SUB(NOW(), INTERVAL 1 HOUR);";
   $numPoints = filter_input(INPUT_GET,"points",FILTER_SANITIZE_NUMBER_INT);
   if($numPoints)
   {
      $numPoints ++;
   }
   // Select the duration based on the parameter passed
   switch (filter_input(INPUT_GET,"duration",FILTER_SANITIZE_STRING)) {
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
      $sql = "select * from esm ORDER BY timestamp ASC;";
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
      }
   }
   if($numPoints && count($times) > $numPoints)
   {
      $newTimes = array();
      $newPanel = array();
      $newShingle = array();
      $length = count($times);

      for($i=0;$i<$length;$i++)
      {
         if($i % (int)ceil($length/$numPoints))
         {
            array_push($newPanel[floor($i/ceil($length/$numPoints))],$panelOutputs[$i]);
            array_push($newShingle[floor($i/ceil($length/$numPoints))],$shingleOutputs[$i]);
         }
         else
         {
            $newTimes[$i/ceil($length/$numPoints)] = $times[$i];
            $newPanel[$i/ceil($length/$numPoints)] = array($panelOutputs[$i]);
            $newShingle[$i/ceil($length/$numPoints)] = array($shingleOutputs[$i]);
         }
      }
      $length = count($newPanel);
      for($i=0;$i<$length;$i++)
      {
         $totalPanel = 0;
         $totalShingle = 0;
         for($j=0;$j<count($newPanel[$i]);$j++)
         {
            $totalPanel+=(float)$newPanel[$i][$j];
            $totalShingle+=(float)$newShingle[$i][$j];
         }
         $newPanel[$i] = round($totalPanel/count($newPanel[$i]),1);
         $newShingle[$i] = round($totalShingle/count($newShingle[$i]),1);
      }
      $panelOutputs = $newPanel;
      $shingleOutputs = $newShingle;
      $times = $newTimes;
   }


   $data = array('times' => $times, 'panelOutputs'=> $panelOutputs, 'shingleOutputs' => $shingleOutputs);
   header('Content-Type: application/json');
   echo json_encode($data);
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
      $sql = "select * from esm where location = ".$locations[$i][2]." order by timestamp desc limit 1;";
      $result = mysqli_query($conn, $sql);
      if(mysqli_num_rows($result) > 0) {
         while($row = mysqli_fetch_assoc($result)){
            array_push($lastSeen,$row["timestamp"]);
            array_push($totalOutput,$row["panelOutput"]);
         }
      }


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
