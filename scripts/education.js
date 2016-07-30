var hold1 = false;
var hold2 = false;
setInterval(function(){
   // Check if the slides have finished on either frame 
   if($('#general').attr('class') == 'tab-pane active'){
      // Check to see if the last frame is visible
      lastSlide =  $('#generalFrame').contents().find('.slide').toArray().pop();
      if($('#generalFrame').contents().find('#'+lastSlide.id).attr('aria-hidden') == 'false'){
         if(!hold1){
            hold1 = true;
            setTimeout(function(){
               // Trigger a transition to the early adopters module
               $('#earlyTab').children().trigger('click');
               hold1 = false;
            },5000);
            setTimeout(function(){
               $('#earlyFrame').attr('src', $('#earlyFrame').attr('src'));
            },4000);
         }
      }
   }
   if($('#early').attr('class') == 'tab-pane active'){
      // Check to see if the last frame is visible
      lastSlide =  $('#earlyFrame').contents().find('.slide').toArray().pop();
      if($('#earlyFrame').contents().find('#'+lastSlide.id).attr('aria-hidden') == 'false'){
         if(!hold2){
            hold2 = true;
            setTimeout(function(){
               // Trigger a transition to the general public module
               $('#generalTab').children().trigger('click');
               hold2 = false;
            },5000);
            setTimeout(function(){
               $('#generalFrame').attr('src', $('#generalFrame').attr('src'));
            },4000);
         }
      }
   }
},1000);

// Perform a screen blank for burn-in reuction
setInterval(function(){
   $('#cover').fadeTo(2000,1);
   setTimeout(function(){
      $('#cover').fadeTo(2000,0);
   },3000);
},900000);

setInterval(function(){

   $.ajax({
      url: "http://localhost:8000/",
      success: function(result){
         $('#warning').html(result.warning);

         var text = '';
         text +=' Panel Temperature: '+result.panelTemp+'°F';
         text += ' -- Electrical Box Temperature: '+result.boxTemp+'°F';
         text += ' -- Battery: '+result.battery+'%';
         text += ' -- Wind Speed: '+result.windspeed+' MPH';
         if(result.message != ''){
            text += ' -- Message: '+result.message;
         }
         $('#messageText').html(text);
      },
      error : function(jq,err) {
         console.log(err);
      }

   });

},2000);
