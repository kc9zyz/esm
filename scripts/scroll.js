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
   // Set jQuery.browser to check if there is a mobile browser being used     
   (function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

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
         // The optional number (1000) specifies the number of milliseconds it takes to scroll to the specified area
         $('html, body').animate({scrollTop: $(hash).offset().top}, 1500, function(){

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
         $('.model').fadeTo(1000,1.0);
      }
      else
      {
         for( var i=0; i<numberOfScrollImages; i++) { 
            $.ajax({url:'images/trailer/'+i+'.jpg', success: function(result){
               $('.model').fadeTo(1000,1.0);
            }});
         }
      }
   } 
   catch (TypeError)
   {
      for( var i=0; i<numberOfScrollImages; i++) { 
         $.ajax({url:'images/trailer/'+i+'.jpg', success: function(result){
            $('.model').fadeTo(1000,1.0);
         }});
      }
   }
   if(jQuery.browser)
   {
      //Do not load the iframe
      if(jQuery.browser.mobile)
      {
         $('#tabs-section').remove();
         $('#education').height(100);
         $('#education').append('<div class="btn-toolbar"><a class="btn btn-primary" href="education/genpub.html" style="padding:10px;">General</a><a class="btn btn-primary" href="education/genpub.html" style="padding:10px;">Early Adopters</a></div');

      }
   }
   $("head").append($("<link rel='stylesheet' href='css/min/leaflet.min.css' type='text/css' media='screen' />"));
});


