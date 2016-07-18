var duration = 'hour';
$( document ).ready(function() {
   $('#download').on('click',function(event){
      var num = $('#numPoints').val();
      window.location = 'data/?asset=historical-data&type=csv&duration='+duration+'&points='+num;
   });
   $("#Hour").on('click', function(event) {
      $("#Drop").html("Select Range - "+$(this).text()+' <span class="caret"></span>');
      duration = 'hour';
   });
   $("#Day").on('click', function(event) {
      $("#Drop").html("Select Range - "+$(this).text()+' <span class="caret"></span>');
      duration = 'day';
   });
   $("#Week").on('click', function(event) {
      $("#Drop").html("Select Range - "+$(this).text()+' <span class="caret"></span>');
      duration = 'week';
   });
   $("#Month").on('click', function(event) {
      $("#Drop").html("Select Range - "+$(this).text()+' <span class="caret"></span>');
      duration = 'month';
   });
   $("#Year").on('click', function(event) {
      $("#Drop").html("Select Range - "+$(this).text()+' <span class="caret"></span>');
      duration = 'year';
   });
   $("#All").on('click', function(event) {
      $("#Drop").html("Select Range - "+$(this).text()+' <span class="caret"></span>');
      duration = 'all';
   });
});
