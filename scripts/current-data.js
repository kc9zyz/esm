var opts = {
   lines: 12, // The number of lines to draw
   angle: 0.15, // The length of each line
   lineWidth: 0.33, // The line thickness
   pointer: {
      length: 0.54, // The radius of the inner circle
      strokeWidth: 0.035, // The rotation offset
      color: '#000000' // Fill color
   },
   limitMax: 'false',   // If true, the pointer will not go past the end of the gauge
   colorStart: '#6FADCF',   // Colors
   colorStop: '#8FC0DA',    // just experiment with them
   strokeColor: '#E0E0E0',   // to see which ones work best for you
   generateGradient: true,
};


getCurrentData = function(caller) {
   $.ajax({
      url: "data/?asset=current-data",
      success: function(result){
         updateGauge(caller, result.panelOutput, result.shingleOutput, result.timestamp);
      },
      error : function(jq,err) {
         console.log(err);
      }

   });
};

var targetPanel = document.getElementById('current-data-panel'); // your canvas element
var targetShingle = document.getElementById('current-data-shingle'); // your canvas element
updateGauge = function(caller, panel, shingle, time) {
   // Check to see if the counter has been initialized
   if ( typeof updateGauge.firstTime == 'undefined' ) {
      // It has not... perform the initialization
      updateGauge.firstTime = 1;
   }
   if (caller == 'waypoint' && updateGauge.firstTime == 1) {
      updateGauge.firstTime = 0;

      this.gauge1 = new Gauge(targetPanel).setOptions(opts); // create sexy gauge!
      this.gauge2 = new Gauge(targetShingle).setOptions(opts); // create sexy gauge!

      this.gauge1.maxValue = 400; // set max gauge value
      this.gauge2.maxValue = 400; // set max gauge value

      this.gauge1.animationSpeed = 13; // set animation speed (32 is default value)
      this.gauge2.animationSpeed = 13; // set animation speed (32 is default value)

      this.gauge1.setTextField(document.getElementById("current-data-panel-textfield"));
      this.gauge2.setTextField(document.getElementById("current-data-shingle-textfield"));

      this.gauge1.set(0); // set actual value
      this.gauge2.set(0); // set actual value


      this.gauge1.set(panel);
      this.gauge2.set(shingle);
      setInterval( function() {
         getCurrentData('time');
      }, 2000);

   }
   else if (caller == 'time' && updateGauge.firstTime == 0) {
      if(this.gauge1.value != panel){
         this.gauge1.animationSpeed = 1;
         this.gauge1.set(panel);
      }
      if(this.gauge2.value != shingle){
         this.gauge2.animationSpeed = 1;
         this.gauge2.set(shingle);
      }
   }
   // Update system status display
   a = new Date(time);
   b = new Date();
   // If the system hasn't updated in 20 minutes, consider it offline
   if((b - a) > (20*60*1000)){
      $('#system-live').html('System was last live '+a.toLocaleString());
   }
   else{
      $('#system-live').html('System is live');
   }


};
getCurrentData('waypoint');
