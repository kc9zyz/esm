   $(document).ready(function(){
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
     /* $(window).scroll(function() {
           var theta = ($(window).scrollTop() * 0.25) % (2* Math.PI);
             $('#modelImg').css({ transform: 'rotate('+window.pageYOffset+'deg)' });
             console.log(window.pageYOffset);
      });*/

   });


