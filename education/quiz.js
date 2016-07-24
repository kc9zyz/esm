$(document).ready(function(){
   // The general form of this file:
   //    Assign a click handler to each quiz class
   //    When the click fires, unbind the click handler
   //    Check to see if the correct answer was selected
   //    Color an incorrect selection red, strike it through
   //    Color the correct answer green
   //    Fade out all incorrect answers

   var green = '#00cc66';

   // From https://gist.github.com/varemenos/2531765
   function getUrlVar(key){
      var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search); 
      return result && unescape(result[1]) || ""; 
   }

   // General Question 1
   $(".gquiz1").click(function(){
      $(".gquiz1").unbind("click");
      if(this.id != "g1d"){
         $("#"+this.id).css("color","red");
         $("#"+this.id).css("text-decoration","line-through");
      }
      $('.g1').css("text-decoration","none")
      $("#g1d").css("color",green);
   $("#g1a").fadeTo(1500,0.4);
   $("#g1b").fadeTo(1500,0.4);
   $("#g1c").fadeTo(1500,0.4);
   });

   // General Question 2
   $(".gquiz2").click(function(){
      $(".gquiz2").unbind("click");
      if(this.id != "g2a"){
         $("#"+this.id).css("color","red");
         $("#"+this.id).css("text-decoration","line-through");
      }
      $('.g2').css("text-decoration","none")
      $("#g2a").css("color",green);
   $("#g2d").fadeTo(1500,0.4);
   $("#g2b").fadeTo(1500,0.4);
   $("#g2c").fadeTo(1500,0.4);
   });

   // General Question 3
   $(".gquiz3").click(function(){
      $(".gquiz3").unbind("click");
      if(this.id != "g3b"){
         $("#"+this.id).css("color","red");
         $("#"+this.id).css("text-decoration","line-through");
      }
      $('.g3').css("text-decoration","none")
      $("#g3b").css("color",green);
   $("#g3a").fadeTo(1500,0.4);
   });

   // General Question 4
   $(".gquiz4").click(function(){
      $(".gquiz4").unbind("click");
      if(this.id != "g4c"){
         $("#"+this.id).css("color","red");
         $("#"+this.id).css("text-decoration","line-through");
      }
      $('.g4').css("text-decoration","none")
      $("#g4c").css("color",green);
   $("#g4d").fadeTo(1500,0.4);
   $("#g4b").fadeTo(1500,0.4);
   $("#g4a").fadeTo(1500,0.4);
   });

   // General Question 5
   $(".gquiz5").click(function(){
      $(".gquiz5").unbind("click");
      if(this.id != "g5b"){
         $("#"+this.id).css("color","red");
         $("#"+this.id).css("text-decoration","line-through");
      }
      $('.g5').css("text-decoration","none")
      $("#g5b").css("color",green);
   $("#g5a").fadeTo(1500,0.4);
   });

   // General Question 6
   $(".gquiz6").click(function(){
      $(".gquiz6").unbind("click");
      if(this.id != "g6d"){
         $("#"+this.id).css("color","red");
         $("#"+this.id).css("text-decoration","line-through");
      }
      $('.g6').css("text-decoration","none")
      $("#g6d").css("color",green);
   $("#g6c").fadeTo(1500,0.4);
   $("#g6b").fadeTo(1500,0.4);
   $("#g6a").fadeTo(1500,0.4);
   });

   // Check if the module is in demo mode
   if(getUrlVar('demo') && getUrlVar('demo') == 'true'){
      // Trigger all answers to show
      $('.answer').trigger('click');
      // Schedule slide transition
      setInterval(function(){
         $.deck('next');
      },1000);
   }

});

