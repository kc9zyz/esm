function waitForElement(){
   if(typeof $LAB !== "undefined"){
      $LAB
         .script("scripts/min/jquery.min.js")
         .wait()
         .script("scripts/min/bootstrap.min.js")
         .wait()
         .script("scripts/min/scroll.min.js")
         .script("scripts/min/jquery.waypoints.min.js")
         .script("http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js")
         .wait()
         .script("scripts/min/gauge.min.js")
         .script("scripts/min/map.min.js")
         .script("scripts/min/Chart.min.js")
         .script("scripts/min/current-data.min.js")
         .script("scripts/min/recent-data.min.js")
         .script("scripts/min/historical-data.min.js")


         //variable exists, do what you want
   }
   else{
      setTimeout(function(){
         waitForElement();
      },250);
   }
}
waitForElement();
