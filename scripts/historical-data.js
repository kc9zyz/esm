var liveDate = new Date('February 6, 2016');
var now = new Date();
var timeDiff = now.getTime() - liveDate.getTime();
var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
document.getElementById('system-live-time').innerHTML= 'System has been live for '
   +diffDays + ' days';


var histoOpts= {
    showXLabels: 10,

    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(57,0,0,.05)",
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

   responsive : true,
    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

};


     // Get the context of the canvas element we want to select
var ctx = document.getElementById("historical-data-chart");

updateHistoric = function() {
      $.ajax({
         url: 'data/?asset=historical-data',
         success: function(result) {

            var historicalData = {
               labels:   result.times,
               datasets: [
                   {
                       label: "My Second dataset",
                       fillColor: "rgba(255,128,128,0.2)",
                       strokeColor: "rgba(151,187,205,1)",
                       pointColor: "rgba(151,187,205,1)",
                       pointStrokeColor: "#fff",
                       pointHighlightFill: "#fff",
                       pointHighlightStroke: "rgba(151,187,205,1)",
                       data: result.output

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

            var container = document.getElementById('historicalCol');
            ctx.width = container.clientWidth
               var historicalChart = new Chart(ctx.getContext("2d")).LineAlt(historicalData, histoOpts
                     );

         }
      });
}
var waypoint = new Waypoint({
   element: document.getElementById("system-live-time"),
    handler: function(direction) {
       updateHistoric();
       this.destroy();

    },
    offset: 'bottom-in-view'

})
$("#historicalMonth").on('click', function(event) {
   $("#historicalDrop").html("Select Range - "+$(this).text()+' <span class="caret"></span>');
});
$("#historicalYear").on('click', function(event) {
   $("#historicalDrop").html("Select Range - "+$(this).text()+' <span class="caret"></span>');
});
$("#historicalAll").on('click', function(event) {
   $("#historicalDrop").html("Select Range - "+$(this).text()+' <span class="caret"></span>');
});
