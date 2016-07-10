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
   if ($_SERVER['REQUEST_METHOD'] === 'POST') {
      // Get the json string from the post body
      $dataString = $_POST["json"];
      // Decode the JSON data
      $sentData = json_decode($dataString,true);

      // Verify identity of requestor
      $hash = $_POST["hash"];
      // Check that the hashed 
      if(hash("md5",$dataString.$pass) == $hash) {
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
            break;
         }

         $sql = "insert into esm (panelOutput,shingleOutput,timestamp,location,heading,panel_angle) VALUES (".$panelOutput.",".$shingleOutput.",".$timestamp.",".$locID.",".$heading.",".$panel_angle.");";
         $result = mysqli_query($conn, $sql);
      } else {
         header("HTTP/1.1 401 Unauthorized");
         echo json_encode(array("error" => "Unautharized"));
         break;
      }
   } 
   $sql = "select * from esm ORDER BY timestamp DESC LIMIT 1;";
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
case "historical-data":
   header('Content-Type: application/json');
   echo "{\"times\":[\"December 26th\",\"December 31st\",\"January 5th\",\"January 10th\",\"January 15th\",\"January 20th\",\"January 25th\",\"January 30th\",\"February 4th\",\"February 9th\",\"February 14th\",\"February 19th\",\"February 24th\",\"February 29th\",\"March 5th\",\"March 10th\",\"March 15th\",\"March 20th\",\"March 25th\",\"March 30th\"],\"output\":[3125,3042,3385,3017,3365,3104,3354,3208,3380,3434,3415,3304,3392,3312,3286,3126,3139,3282,3035,3071]}";
   break;
case "recent-data":
   $times = array();
   $panelOutputs=array();
   $shingleOutputs=array();

   $sql = "select * from esm where timestamp >= DATE_SUB(NOW(), INTERVAL 1 HOUR);";
   switch (filter_input(INPUT_GET,"duration",FILTER_SANITIZE_STRING)) {
   case "hour":
      $sql = "select * from esm where timestamp >= DATE_SUB(NOW(), INTERVAL 1 HOUR) ORDER BY timestamp ASC; ";
      break;
   case "day":
      $sql = "select * from esm where timestamp >= DATE_SUB(NOW(), INTERVAL 1 DAY) ORDER BY timestamp ASC;";
      break;
   case "week":
      $sql = "select * from esm where timestamp >= DATE_SUB(NOW(), INTERVAL 1 WEEK) ORDER BY timestamp ASC;";
      break;
   }
   $result = mysqli_query($conn, $sql);
   if(mysqli_num_rows($result) > 0) {
      while($row = mysqli_fetch_assoc($result)){
         array_push($times,$row["timestamp"]);
         array_push($panelOutputs,$row["panelOutput"]);
         array_push($shingleOutputs,$row["shingleOutput"]);
      }
   }

   $data = array('times' => $times, 'panelOutputs'=> $panelOutputs, 'shingleOutputs' => $shingleOutputs);
   header('Content-Type: application/json');
   echo json_encode($data);
   //echo "{\"times\":[\"6:24 PM\",\"6:29 PM\",\"6:34 PM\",\"6:39 PM\",\"6:44 PM\",\"6:49 PM\",\"6:54 PM\",\"6:59 PM\",\"7:04 PM\",\"7:09 PM\",\"7:14 PM\",\"7:19 PM\"],\"output\":[3172,3276,3386,3014,3267,3402,3047,3337,3014,3394,3088,3252]}";
   break;

   default:
      header("HTTP/1.1 404 Not Found");
      echo "<h1>Invalid Resource</h1>";
      break;
}
?>
