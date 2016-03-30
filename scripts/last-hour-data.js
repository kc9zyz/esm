
var options = {

   ///Boolean - Whether grid lines are shown across the chart
   scaleShowGridLines : true,

   //String - Colour of the grid lines
   scaleGridLineColor : "rgba(255,255,255,.05)",
   scaleFontColor : "rgba(255,255,255,.8)",

   //Number - Width of the grid lines
   scaleGridLineWidth : 1,

   //Boolean - Whether to show horizontal lines (except X axis)
   scaleShowHorizontalLines: true,

   //Boolean - Whether to show vertical lines (except Y axis)
   scaleShowVerticalLines: true,

   //Boolean - Whether the line is curved between points
   bezierCurve : true,

   //Number - Tension of the bezier curve between points
   bezierCurveTension : 0.4,

   //Boolean - Whether to show a dot for each point
   pointDot : true,

   //Number - Radius of each point dot in pixels
   pointDotRadius : 4,

   //Number - Pixel width of point dot stroke
   pointDotStrokeWidth : 1,

   //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
   pointHitDetectionRadius : 5,

   //Boolean - Whether to show a stroke for datasets
   datasetStroke : true,

   //Number - Pixel width of dataset stroke
   datasetStrokeWidth : 2,

   //Boolean - Whether to fill the dataset with a colour
   datasetFill : true,

   //String - A legend template
   legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

};
function waitForElement(){
   if(typeof Waypoint !== "undefined" && typeof Chart !== "undefined"){
      var waypoint = new Waypoint({
         element: document.getElementById("last-hour-data-chart"),
         handler: function(){
            getLastHourData();
            this.destroy();
         },
         offset: '90%'
      })
   }
   else{
      setTimeout(function(){
         waitForElement();
      },250);
   }
}
waitForElement();

getLastHourData = function() {
   if ( typeof this.firstTime == 'undefined' ) {
      // It has not... perform the initialization
      this.firstTime = 1;

      $.ajax({
         url: "data/last-hour-data.json",
         success: function(result) {
            updateLastHour('waypoint', [result.times, result.output])
         }
      });
   }
};
getLastData = function() {
   $.ajax({
      url: "data/last-data.json",
      success: function(result) {
         updateLastHour('time', [result.time,result.output])
      }
   });
};


updateLastHour = function(caller, points) {
   // Check to see if the counter has been initialized
   if ( typeof this.firstTime == 'undefined' ) {
      // It has not... perform the initialization
      this.firstTime = 1;
   }
   if (caller == 'waypoint' && this.firstTime == 1) {
      var lastHourData = {
         labels:   points[0],
         datasets: [
         {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: points[1]

         }
         ]
      };

      // Get the context of the canvas element we want to select
      var ctx = document.getElementById("last-hour-data-chart");
      var container = document.getElementById('currentDataRecent');
      ctx.width = container.offsetWidth*0.9;
      ctx.height = ((window.innerHeight * 0.5) > container.offsetHeight*0.7 ? container.offsetHeight*0.7 : window.innerHeight * 0.5);
      this.lastHourChart = new Chart(ctx.getContext("2d")).Line(lastHourData, options);
      setInterval( function() {
         getLastData();
      }, 3000);
      this.firstTime = 0;

   }
   else if (caller == 'time' && this.firstTime == 0) {
      var currentPoints = this.lastHourChart.datasets[0].points;
      if ( currentPoints[currentPoints.length - 1].label != points[0]) {
         this.lastHourChart.removeData();
         this.lastHourChart.addData([parseInt(points[1])], points[0]);
      }


   }

};
