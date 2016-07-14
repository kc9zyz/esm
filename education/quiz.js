$(document).ready(function(){
   $("div.quiz1").click(function(){
      $("div.quiz1").unbind("click");
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
   $("div.quiz2").click(function(){
      $("div.quiz2").unbind("click");
      if(this.id != "g2a"){
         $("#"+this.id).css("color","red");
         $("#"+this.id).css("text-decoration","line-through");
      }
      $('.g1').css("text-decoration","none")
      $("#g2a").css("color","green");
      $("#g2d").fadeTo(1500,0.4);
      $("#g2b").fadeTo(1500,0.4);
      $("#g2c").fadeTo(1500,0.4);
   });
});

