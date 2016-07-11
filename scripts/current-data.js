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
         updateGauge(caller, result.panelOutput);
      },
      error : function(jq,err) {
         console.log(err);
      }

   });
};

var targetPanel = document.getElementById('current-data-panel'); // your canvas element
var targetShingle = document.getElementById('current-data-shingle'); // your canvas element
updateGauge = function(caller, level) {
   // Check to see if the counter has been initialized
   if ( typeof updateGauge.firstTime == 'undefined' ) {
      // It has not... perform the initialization
      updateGauge.firstTime = 1;
   }
   if (caller == 'waypoint' && updateGauge.firstTime == 1) {
      updateGauge.firstTime = 0;
      this.gauge1 = new Gauge(targetPanel).setOptions(opts); // create sexy gauge!
      this.gauge1.maxValue = 400; // set max gauge value
      this.gauge1.animationSpeed = 13; // set animation speed (32 is default value)
      this.gauge1.setTextField(document.getElementById("current-data-panel-textfield"));
      this.gauge1.set(0); // set actual value


      this.gauge1.animationSpeed = 13;
      this.gauge1.set(level);
      setInterval( function() {
         getCurrentData('time');
      }, 2000);

   }
   else if (caller == 'time' && updateGauge.firstTime == 0) {
      if(this.gauge1.value != level){
         this.gauge1.animationSpeed = 1;
         this.gauge1.set(level);
      }
   }

};
getCurrentData('waypoint');
