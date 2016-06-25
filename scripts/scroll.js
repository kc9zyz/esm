numberOfScrollImages = 52;
function handleScroll(delta,e)
{
   if(!handleScroll.neverActive)
   {
      if(handleScroll.active)
      {
         if (isNaN(delta))
         {
            delta = 0;
         }
         handleScroll.position += delta;
         if(handleScroll.position < 0)
         {
            handleScroll.position = 0;
         }
         if (handleScroll.position < (numberOfScrollImages * 10)+1)
         {
            //Animate image
            $('#modelImg').attr('src','images/trailer/'+Math.floor(handleScroll.position/10)+'.jpg');
            e.preventDefault();
            e.stopPropagation();
         }
         else 
         {
            handleScroll.active = false;
         }
      }

      if($('#intro').position().top == 0)
      {
         if (handleScroll.active == false && handleScroll.position > (numberOfScrollImages * 20))
         {
            handleScroll.position = (numberOfScrollImages * 20);
         }
         handleScroll.active = true;
      }
   }
}

$(document).ready(function (){
   $("head").append($("<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css' type='text/css' media='screen' />"));

   $('body').scrollspy({target: ".navbar", offset: 50});   

   // Add smooth scrolling on all links inside the navbar
   $("#myNavbar a").on('click', function(event) {

      // Prevent default anchor click behavior
      event.preventDefault();


      // Store hash
      var hash = this.hash;
      if (hash != ""){
         if (hash == "#intro"){
            $('#modelImg').attr('src','images/trailer/0.jpg');
            handleScroll.active = true;
            handleScroll.position = 0;
         }
         $(".navbar-collapse.in").collapse('hide');
         // Using jQuery's animate() method to add smooth page scroll
         // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
         $('html, body').animate({scrollTop: $(hash).offset().top}, 800, function(){

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
            if (hash != "#intro"){
               handleScroll.active = false;
               handleScroll.position = 0;
               $('#modelImg').attr('src','images/trailer/0.jpg');
            }
         });
      }
   });
   lastTouchLocation = null;
   if($('#intro').position().top == 0){
      handleScroll.active = true;
      handleScroll.position = 0;
      handleScroll.neverActive = false;
   }
   else{
      handleScroll.active = false;
      handleScroll.position = 0;
      handleScroll.neverActive = false;
   }
   lastScrollTime = 0;


   $('body').on({
      'mousewheel': function(e){
         // Check to see if it has been at least 1/10th of a second since the last scroll
         d = new Date();
         delta = 0;
         if(d.getTime() > lastScrollTime + 45){
            lastScrollTime = d.getTime();
            delta = (e.originalEvent.deltaY/ Math.abs(e.originalEvent.deltaY))*20;
         }
         handleScroll(delta,e);
      },
      'touchmove':function(e){
         if (lastTouchLocation == null){
            lastTouchLocation = e.originalEvent.changedTouches[0].screenY; 
         }
         delta = lastTouchLocation - e.originalEvent.changedTouches[0].screenY;
         sign = delta / Math.abs(delta);

         delta *= 4;
         if(Math.abs(delta) > 20){
           delta = 0;
           }
         handleScroll(delta,e);
         lastTouchLocation = e.originalEvent.changedTouches[0].screenY;
         
      }
   });
   // Check if client is on a cellular connection, do not animate to conserve 
   // bandwidth
   try
   {
      if(navigator.connection.type == 'cellular')
      { 
         handleScroll.neverActive = true;
      }
      else
      {
         for( var i=0; i<numberOfScrollImages; i++) { 
            $.ajax({url:'images/trailer/'+i+'.jpg', success: function(result){
               document.images['modelImg'].style.opacity = 1;
            }});
         }
      }
   } 
   catch (TypeError)
   {
      for( var i=0; i<numberOfScrollImages; i++) { 
         $.ajax({url:'images/trailer/'+i+'.jpg', success: function(result){
            document.images['modelImg'].style.opacity = 1;
         }});
      }
   }
   $("head").append($("<link rel='stylesheet' href='css/min/leaflet.min.css' type='text/css' media='screen' />"));
});


