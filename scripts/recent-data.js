var duration = 'hour';
var options = {

   ///Boolean - Whether grid lines are shown across the chart
   scaleShowGridLines : true,

   //String - Colour of the grid lines
   scaleGridLineColor : "rgba(255,255,255,.05)",
   scaleFontColor : "rgba(255,255,255,.8)",

   scaleLabel: "          <%=value%>",
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

   maintainAspectRatio: true,
   responsive : true,

   //String - A legend template
   legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
   multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>",



};
var waypoint = new Waypoint({
   element: document.getElementById("last-hour-data-chart"),
    handler: function(){
       getLastHourData();
       this.destroy();
    },
    offset: '90%'
})

getLastHourData = function() {

   var maxLength = Math.floor($(window).width()/50);
   $.ajax({
      url: 'data/?asset=historical-data&duration='+duration+'&points='+maxLength,
      success: function(result) {
         var times = [];
         for (entry in result.times){
            var time = new Date(result.times[entry]);
            switch(duration){
               case 'hour':
                  a = time.toLocaleTimeString();
                  b = a.split(':');
                  times[entry] = b[0]+':'+b[1]+' '+b[2].split(' ')[1];
                  break;
               case 'day':
                  a = time.toLocaleTimeString();
                  b = a.split(':');
                  times[entry] = b[0]+':'+b[1]+' '+b[2].split(' ')[1];
                  break;
               case 'week':
                  a = time.toLocaleTimeString();
                  b = a.split(':');
                  times[entry] = time.toLocaleDateString()+' ('+b[0]+' '+b[2].split(' ')[1]+')';
                  break;
            }
         }
         var points = result.panelOutputs;
         console.log(points);
         updateLastHour([times, result.panelOutputs, result.shingleOutputs])
      }
   });
};


updateLastHour = function(points) {
   var lastHourData = {
      labels:   points[0],
      datasets: [
      {
         label: "Panel",
         fillColor: "rgba(151,187,205,0.2)",
         strokeColor: "rgba(151,187,205,1)",
         pointColor: "rgba(151,187,205,1)",
         pointStrokeColor: "#fff",
         pointHighlightFill: "#fff",
         pointHighlightStroke: "rgba(151,187,205,1)",
         data: points[1]
      },
      {
         label: "Shingle",
         fillColor: "rgba(151,187,205,0.2)",
         strokeColor: "rgba(51,87,205,1)",
         pointColor: "rgba(51,87,205,1)",
         pointStrokeColor: "#fff",
         pointHighlightFill: "#fff",
         pointHighlightStroke: "rgba(151,187,205,1)",
         data: points[2]
      }

      ]

   };
   Chart.types.Line.extend({
      name: "LineAlt",
      draw: function () {
         Chart.types.Line.prototype.draw.apply(this, arguments);

         var ctx = this.chart.ctx;
         ctx.save();
         // text alignment and color
         ctx.textAlign = "center";
         ctx.textBaseline = "bottom";
         ctx.fillStyle = this.options.scaleFontColor;
         // position
         var x = this.scale.xScalePaddingLeft * 0.4;
         var y = this.chart.height / 2;
         // change origin
         ctx.translate(x, y);
         // rotate text
         ctx.rotate(-90 * Math.PI / 180);
         ctx.fillText("Watts", 0, 0);
         ctx.restore();
      }
   });

   // Get the context of the canvas element we want to select
   var ctx = document.getElementById("last-hour-data-chart");
   var container = document.getElementById('recentCol');
   ctx.width = container.clientWidth;
   if(this.lastHourChart)
   {
      this.lastHourChart.destroy();
   }
   this.lastHourChart = new Chart(ctx.getContext("2d")).LineAlt(lastHourData,options);
   this.firstTime = 0;


};
$("#currentHour").on('click', function(event) {
   $("#currentDrop").html("Select Range - "+$(this).text()+' <span class="caret"></span>');
   duration = 'hour';
   getLastHourData();
});
$("#currentDay").on('click', function(event) {
   $("#currentDrop").html("Select Range - "+$(this).text()+' <span class="caret"></span>');
   duration = 'day';
   getLastHourData();
});
$("#currentWeek").on('click', function(event) {
   $("#currentDrop").html("Select Range - "+$(this).text()+' <span class="caret"></span>');
   duration = 'week';
   getLastHourData();
});
