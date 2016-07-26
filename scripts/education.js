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
               $('#earlyFrame').attr('src', $('#earlyFrame').attr('src'));
               $('#earlyTab').children().trigger('click');
               hold1 = false;
            },5000);
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
               $('#generalFrame').attr('src', $('#generalFrame').attr('src'));
               $('#generalTab').children().trigger('click');
               hold2 = false;
            },5000);
         }
      }
   }
},1000);