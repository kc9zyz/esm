function handleScroll(e)
{
   if(handleScroll.active)
   {
      delta = e.originalEvent.deltaY;
      if (delta > 10)
      {
         delta = 10;
      }
      handleScroll.position += delta;
      if(handleScroll.position < 0)
      {
         handleScroll.position = 0;
      }
   }

   if($('#intro').position().top == 0)
   {
      if (handleScroll.active == false && handleScroll.position > 580)
      {
         handleScroll.position = 580;
      }
      handleScroll.active = true;
   }

   if (handleScroll.position < 581)
   {
      //Animate image
      $('#modelImg').attr('src','./vr/0_'+Math.floor(handleScroll.position/20)+'.png');
      e.preventDefault();
      e.stopPropagation();
   }
   else 
   {
      handleScroll.active = false;
   }

}
$(document).ready(function (){
   $("head").append($("<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css' type='text/css' media='screen' />"));
   $("head").append($("<link rel='stylesheet' href='css/min/leaflet.min.css' type='text/css' media='screen' />"));

   $('body').scrollspy({target: ".navbar", offset: 50});   

   // Add smooth scrolling on all links inside the navbar
   $("#myNavbar a").on('click', function(event) {

      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;
      if (hash != "") {
         $(".navbar-collapse.in").collapse('hide');
         // Using jQuery's animate() method to add smooth page scroll
         // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
         $('html, body').animate({scrollTop: $(hash).offset().top}, 800, function(){

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
         });
      }
   });
   $('body').on({
      'mousewheel':function(e){
         handleScroll(e);
      }
   });
   if($('#intro').position().top == 0){
      handleScroll.active = true;
      handleScroll.position = 0;
   }
   else{
      handleScroll.active = false;
   }

});


