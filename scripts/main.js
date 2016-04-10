function waitForElement(){
   if(typeof $LAB !== "undefined"){
      $LAB
         .script("https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js")
         .wait()
         .script("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js")
         .wait()
         .script("scripts/min/jquery.waypoints.min.js")
         .script("http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js")
         .wait()
         .script("scripts/min/gauge.min.js")
         .script("scripts/min/scroll.min.js")
         .script("scripts/min/map.min.js")
         .script("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.min.js")
         .script("scripts/min/current-data.min.js")
         .script("scripts/min/last-hour-data.min.js")
         .script("scripts/min/historical-data.min.js")
         .script("scripts/min/grad-date.min.js")


         //variable exists, do what you want
   }
   else{
      setTimeout(function(){
         waitForElement();
      },250);
   }
}
waitForElement();
