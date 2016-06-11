<?php
include "../../../dbpass.php";

$conn = mysqli_connect($servername, $username, $password, "neusonw");
if (!$conn) {
   die("Connection failed: " . mysqli_connect_error());
}
switch (filter_input(INPUT_GET,"asset",FILTER_SANITIZE_STRING)) {
case "current-data":
   if ($_SERVER['REQUEST_METHOD'] === 'POST') {
      //Verify identity of requestor
      $hash = $_POST["hash"];
      $challenge = $_POST["challenge"];
      //Check that the hashed 
      if(hash("md5",$challenge.$pass) == $hash) {
         $output = filter_input(INPUT_POST, 'output', FILTER_SANITIZE_NUMBER_INT);
         $sql = "insert into esm (output) VALUES (".$output.");";
         $result = mysqli_query($conn, $sql);
      } else {
         header("HTTP/1.1 401 Unauthorized");
         echo "<h1>Invalid Resource</h1>";
         break;
      }
   } 
   $sql = "select * from esm ORDER BY id DESC LIMIT 1;";
   $result = mysqli_query($conn, $sql);
   if(mysqli_num_rows($result) > 0) {
      while($row = mysqli_fetch_assoc($result)){
         $data = array('output' => (int)$row["output"]);
      }
   }
   else{
      $data = array('output' => 200);
   }
   header('Content-Type: application/json');
   echo json_encode($data);
   break;
case "historical-data":
   header('Content-Type: application/json');
   echo "{\"times\":[\"December 26th\",\"December 31st\",\"January 5th\",\"January 10th\",\"January 15th\",\"January 20th\",\"January 25th\",\"January 30th\",\"February 4th\",\"February 9th\",\"February 14th\",\"February 19th\",\"February 24th\",\"February 29th\",\"March 5th\",\"March 10th\",\"March 15th\",\"March 20th\",\"March 25th\",\"March 30th\"],\"output\":[3125,3042,3385,3017,3365,3104,3354,3208,3380,3434,3415,3304,3392,3312,3286,3126,3139,3282,3035,3071]}";
   break;
case "recent-data":
   header('Content-Type: application/json');
   echo "{\"times\":[\"6:24 PM\",\"6:29 PM\",\"6:34 PM\",\"6:39 PM\",\"6:44 PM\",\"6:49 PM\",\"6:54 PM\",\"6:59 PM\",\"7:04 PM\",\"7:09 PM\",\"7:14 PM\",\"7:19 PM\"],\"output\":[3172,3276,3386,3014,3267,3402,3047,3337,3014,3394,3088,3252]}";
   break;
default:
   header("HTTP/1.1 404 Not Found");
   echo "<h1>Invalid Resource</h1>";
   break;
}
?>
