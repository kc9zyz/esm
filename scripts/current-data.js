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
         updateGauge(caller, result.output);
      },
      error : function(jq,err) {
         console.log(err);
      }

   });
};

var target = document.getElementById('current-data-gauge'); // your canvas element
resizeGauge = function() {
   var container = document.getElementById('wattCol');
   target.height = container.offsetHeight * 0.4;
   target.width = container.offsetWidth;  
}
updateGauge = function(caller, level) {
   // Check to see if the counter has been initialized
   if ( typeof updateGauge.firstTime == 'undefined' ) {
      // It has not... perform the initialization
      updateGauge.firstTime = 1;
   }
   if (caller == 'waypoint' && updateGauge.firstTime == 1) {
      updateGauge.firstTime = 0;
      //resizeGauge();
      this.gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
      this.gauge.maxValue = 7000; // set max gauge value
      this.gauge.animationSpeed = 13; // set animation speed (32 is default value)
      this.gauge.setTextField(document.getElementById("current-data-textfield"));
      this.gauge.set(0); // set actual value


      this.gauge.animationSpeed = 13;
      this.gauge.set(level);
      setInterval( function() {
         getCurrentData('time');
      }, 10000);

   }
   else if (caller == 'time' && updateGauge.firstTime == 0) {
      if(this.gauge.value != level){
         this.gauge.animationSpeed = 1;
         this.gauge.set(level);
      }
   }

};
getCurrentData('waypoint');
