function waitForElement(){
   if(typeof $LAB !== "undefined"){
      $LAB
         .script("scripts/min/jquery.min.js")
         .wait()
         .script("scripts/min/bootstrap.min.js")
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
