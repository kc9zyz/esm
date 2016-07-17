$(document).ready(function(){
   // The general form of this file:
   //    Assign a click handler to each quiz class
   //    When the click fires, unbind the click handler
   //    Check to see if the correct answer was selected
   //    Color an incorrect selection red, strike it through
   //    Color the correct answer green
   //    Fade out all incorrect answers

   // General Question 1
   $("div.gquiz1").click(function(){
      $("div.gquiz1").unbind("click");
      if(this.id != "g1d"){
         $("#"+this.id).css("color","red");
         $("#"+this.id).css("text-decoration","line-through");
      }
      $('.g1').css("text-decoration","none")
      $("#g1d").css("color","green");
   $("#g1a").fadeTo(1500,0.4);
   $("#g1b").fadeTo(1500,0.4);
   $("#g1c").fadeTo(1500,0.4);
   });

   // General Question 2
   $("div.gquiz2").click(function(){
      $("div.gquiz2").unbind("click");
      if(this.id != "g2a"){
         $("#"+this.id).css("color","red");
         $("#"+this.id).css("text-decoration","line-through");
      }
      $('.g2').css("text-decoration","none")
      $("#g2a").css("color","green");
   $("#g2d").fadeTo(1500,0.4);
   $("#g2b").fadeTo(1500,0.4);
   $("#g2c").fadeTo(1500,0.4);
   });

   // General Question 3
   $("div.gquiz3").click(function(){
      $("div.gquiz3").unbind("click");
      if(this.id != "g3b"){
         $("#"+this.id).css("color","red");
         $("#"+this.id).css("text-decoration","line-through");
      }
      $('.g3').css("text-decoration","none")
      $("#g3b").css("color","green");
   $("#g3a").fadeTo(1500,0.4);
   });

   // General Question 4
   $("div.gquiz4").click(function(){
      $("div.gquiz4").unbind("click");
      if(this.id != "g4c"){
         $("#"+this.id).css("color","red");
         $("#"+this.id).css("text-decoration","line-through");
      }
      $('.g4').css("text-decoration","none")
      $("#g4c").css("color","green");
   $("#g4d").fadeTo(1500,0.4);
   $("#g4b").fadeTo(1500,0.4);
   $("#g4a").fadeTo(1500,0.4);
   });

   // General Question 5
   $("div.gquiz5").click(function(){
      $("div.gquiz5").unbind("click");
      if(this.id != "g5b"){
         $("#"+this.id).css("color","red");
         $("#"+this.id).css("text-decoration","line-through");
      }
      $('.g5').css("text-decoration","none")
      $("#g5b").css("color","green");
   $("#g5a").fadeTo(1500,0.4);
   });

   // General Question 6
   $("div.gquiz6").click(function(){
      $("div.gquiz6").unbind("click");
      if(this.id != "g6d"){
         $("#"+this.id).css("color","red");
         $("#"+this.id).css("text-decoration","line-through");
      }
      $('.g6').css("text-decoration","none")
      $("#g6d").css("color","green");
   $("#g6c").fadeTo(1500,0.4);
   $("#g6b").fadeTo(1500,0.4);
   $("#g6a").fadeTo(1500,0.4);
   });

});

