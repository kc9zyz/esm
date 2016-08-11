var duration = 'hour';
$( document ).ready(function() {
   $('#download').on('click',function(event){
      var num = $('#numPoints').val();
      var startDate = $('#startDate').val();
      var endDate = $('#endDate').val();
      window.location = 'data/?asset=historical-data&type=csv&duration='+duration+'&startDate='+startDate+'&endDate='+endDate;
   });
   $("#Hour").on('click', function(event) {
      $("#Drop").html("Select Range - "+$(this).text()+' <span class="caret"></span>');
      duration = 'hour';
      $("#dateRanges").css('display','none');
   });
   $("#Day").on('click', function(event) {
      $("#Drop").html("Select Range - "+$(this).text()+' <span class="caret"></span>');
      duration = 'day';
      $("#dateRanges").css('display','none');
   });
   $("#Week").on('click', function(event) {
      $("#Drop").html("Select Range - "+$(this).text()+' <span class="caret"></span>');
      duration = 'week';
      $("#dateRanges").css('display','none');
   });
   $("#Month").on('click', function(event) {
      $("#Drop").html("Select Range - "+$(this).text()+' <span class="caret"></span>');
      duration = 'month';
      $("#dateRanges").css('display','none');
   });
   $("#Year").on('click', function(event) {
      $("#Drop").html("Select Range - "+$(this).text()+' <span class="caret"></span>');
      duration = 'year';
      $("#dateRanges").css('display','none');
   });
   $("#All").on('click', function(event) {
      $("#Drop").html("Select Range - "+$(this).text()+' <span class="caret"></span>');
      duration = 'all';
      $("#dateRanges").css('display','none');
   });
   $("#Date").on('click', function(event) {
      $("#Drop").html("Select Range - "+$(this).text()+' <span class="caret"></span>');
      duration = 'date';
      $("#dateRanges").css('display','inline');
   });

});

