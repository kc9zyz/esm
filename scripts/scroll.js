numberOfScrollImages = 52;
function handleScroll(delta,e)
{
	if(!handleScroll.neverActive)
	{
		if(handleScroll.active)
		{
			if (delta > 10)
			{
				delta = 10;
			}
			handleScroll.position += delta;
			if(handleScroll.position < 0)
			{
				handleScroll.position = 0;
			}
			if (handleScroll.position < (numberOfScrollImages * 20)+1)
			{
				//Animate image
				$('#modelImg').attr('src','images/trailer/'+Math.floor(handleScroll.position/20)+'.jpg');
				e.preventDefault();
				e.stopPropagation();
			}
			else 
			{
				handleScroll.active = false;
			}
		}

		if($('#intro').position().top == 0)
		{
			if (handleScroll.active == false && handleScroll.position > (numberOfScrollImages * 20))
			{
				handleScroll.position = (numberOfScrollImages * 20);
			}
			handleScroll.active = true;
		}
	}
}

$(document).ready(function (){
	$("head").append($("<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css' type='text/css' media='screen' />"));
	$("head").append($("<link rel='stylesheet' href='css/min/leaflet.min.css' type='text/css' media='screen' />"));

	$('body').scrollspy({target: ".navbar", offset: 50});   

	// Add smooth scrolling on all links inside the navbar
	$("#myNavbar a").on('click', function(event) {

		// Prevent default anchor click behavior
		event.preventDefault();


		// Store hash
		var hash = this.hash;
		if (hash != ""){
			if (hash == "#intro"){
				$('#modelImg').attr('src','images/trailer/0.jpg');
				handleScroll.active = true;
				handleScroll.position = 0;
			}
			$(".navbar-collapse.in").collapse('hide');
			// Using jQuery's animate() method to add smooth page scroll
			// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
			$('html, body').animate({scrollTop: $(hash).offset().top}, 800, function(){

				// Add hash (#) to URL when done scrolling (default click behavior)
				window.location.hash = hash;
				if (hash != "#intro"){
					handleScroll.active = false;
					handleScroll.position = 0;
					$('#modelImg').attr('src','images/trailer/0.jpg');
				}
			});
		}
	});
	lastTouchLocation = 0;
	$('#modelImg').on({
		'mousewheel':function(e){
			handleScroll(e.originalEvent.deltaY,e);
		},
		'touchmove':function(e){
			delta = e.originalEvent.changedTouches[0].screenY - lastTouchLocation;
			sign = delta / Math.abs(delta);

			if(Math.abs(delta) > 10)
			{
				delta = 20;
				delta *= sign;
			}
			else
			{
				delta *= 3;
			}

			handleScroll(delta,e);
			lastTouchLocation = e.originalEvent.changedTouches[0].screenY;


		}
	});
	if($('#intro').position().top == 0){
		handleScroll.active = true;
		handleScroll.position = 0;
		handleScroll.neverActive = false;
	}
	else{
		handleScroll.active = false;
		handleScroll.position = 0;
		handleScroll.neverActive = false;
	}
	// Check if client is on a cellular connection, do not animate to conserve 
	// bandwidth
	try
	{
		if(navigator.connection.type == 'cellular')
		{ 
			handleScroll.neverActive = true;
		}
		else
		{

			for( var i=0; i<numberOfScrollImages; i++) { 
				$.ajax({url:'images/trailer/'+i+'.jpg', success: function(result){
				}});
			}
		}
	} 
	catch (TypeError)
	{
		for( var i=0; i<numberOfScrollImages; i++) { 
			$.ajax({url:'images/trailer/'+i+'.jpg', success: function(result){
			}});
		}
	}
});


