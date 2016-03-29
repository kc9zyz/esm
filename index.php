<!DOCTYPE html>
<html>
<head>
<title>Bootstrap Example</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
<script defer=""  src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
<script defer="" src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<style>
body {
   position: relative; 
}
#currentDataLive {padding-top:50px;height:500px;color: #fff; background-color: #1E88E5;}
#currentDataRecent {padding-top:50px;height:500px;color: #fff; background-color: #673ab7;}
#historicalData {padding-top:50px;height:500px;color: #fff; background-color: #ff9800;}
#education {padding-top:50px;height:500px;color: #fff; background-color: #00bcd4;}
#team {padding-top:50px;height:500px;color: #fff; background-color: #009688;}
</style>
</head>
<body data-spy="scroll" data-target=".navbar" data-offset="50">

<nav class="navbar navbar-inverse navbar-fixed-top">
   <div class="container-fluid">
      <div class="navbar-header">
         <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>                        
         </button>
         <a class="navbar-brand" href="#">Solar Energy Unit</a>
      </div>
      <div>
         <div class="collapse navbar-collapse" id="myNavbar">
            <ul class="nav navbar-nav">
               <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">Current Data <span class="caret"></span></a>
               <ul class="dropdown-menu">
                  <li><a href="#currentDataLive">Live Data</a></li>
                  <li><a href="#currentDataRecent">Recent Data</a></li>
               </ul>
               </li>
               <li><a href="#historicalData">Historical Data</a></li>
               <li><a href="#education">Education</a></li>
               <li><a href="#team">Team</a></li>
            </ul>
         </div>
      </div>
   </div>
</nav>    

<div id="currentDataLive" class="container-fluid">
   <h1>Live Data</h1>
   <div id="system-live"> <img src=https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Ski_trail_rating_symbol-green_circle.svg/600px-Ski_trail_rating_symbol-green_circle.svg.png width=30 align="left" /> The system is currently in demo mode </div>



   <canvas width="220" height="300" id="current-data-gauge"></canvas>
   <div id="current-data-textfield" style="font-size: 40px;"></div>
   <br>
   <div style="font-size: 22px;">Watts of Solar Output</div>
   <br>

</div>

</div>
<div id="currentDataRecent" class="container-fluid">
<h1>Recent Data</h1>
<canvas width="220" height="300" id="last-hour-data-chart"></canvas>
</div>
<div id="historicalData" class="container-fluid">
<h1>Historical Data</h1>
<canvas width="220" height="400" id="historical-data-chart"></canvas>
</div>
<div id="education" class="container-fluid">
<h1>Education</h1>
<?php
echo "education";
?>
</div>
<div id="team" class="container-fluid">
<h1>Team</h1>
<div id="graduation-date">
</div>
</div>

</body>
<script defer="" src="scripts/main.js"></script>
</html>

