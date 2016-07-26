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
