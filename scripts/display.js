function waitForElement(){
   if(typeof $LAB !== "undefined"){
      $LAB
         .script("https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js")
         .wait()
         .script("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js")
         .wait()
         .script("scripts/min/gauge.min.js")
         .script("scripts/min/current-data.min.js")
         .script("scripts/min/education.min.js")
   }
   else{
      setTimeout(function(){
         waitForElement();
      },250);
   }
}
waitForElement();
