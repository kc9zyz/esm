function loadjscssfile(filename, filetype){
   if (filetype=="js"){ //if filename is a external JavaScript file
      var fileref=document.createElement('script')
         fileref.setAttribute("type","text/javascript")
         fileref.setAttribute("src", filename)
   }
   else if (filetype=="css"){ //if filename is an external CSS file
      var fileref=document.createElement("link")
         fileref.setAttribute("rel", "stylesheet")
         fileref.setAttribute("type", "text/css")
         fileref.setAttribute("href", filename)
   }
   if (typeof fileref!="undefined")
      document.getElementsByTagName("head")[0].appendChild(fileref)
}
function jqueryLoaded() {
   $(document).ready(function(){
      // Add scrollspy to <body>
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
      loadjscssfile("scripts/jquery.waypoints.min.js","js");
      loadjscssfile("scripts/gauge.min.js","js");
      loadjscssfile("scripts/Chart.min.js","js");
      loadjscssfile("scripts/current-data.js","js");
      loadjscssfile("scripts/last-hour-data.js","js");
      loadjscssfile("scripts/grad-date.js","js");


   });

}
function checkJquery() {
   if (window.jQuery) {
      jqueryLoaded();
   } else {
      window.setTimeout(checkJquery, 100);
   }
}

checkJquery();
