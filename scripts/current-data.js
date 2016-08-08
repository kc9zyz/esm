var opts = {
   lines: 12, // The number of lines to draw
   angle: 0.15, // The length of each line
   lineWidth: 0.33, // The line thickness
   pointer: {
      length: 0.54, // The radius of the inner circle
      strokeWidth: 0.035, // The rotation offset
      color: '#000000' // Fill color
   },
   limitMax: 'false',   // If true, the pointer will not go past the end of the gauge
   colorStart: '#6FADCF',   // Colors
   colorStop: '#8FC0DA',    // just experiment with them
   strokeColor: '#E0E0E0',   // to see which ones work best for you
   generateGradient: true,
};

var energy = {
	'Cell Phone Charger':	10,
	'QuickCharge™ 2.0 Charger':	25,
	'Laptop':	70,
	'Window AC Unit':	600,
	'Refrigerator':	200,
	'Washing Machine':	700,
	'Microwave':	1500,
	'Blender':	750,
	'Toaster':	1000,
	'Easy Bake Oven':	100,
	'George Foreman Grill':	760,
	'Dishwasher':	1200,
	'Panini Press':	1400,
	'Quesadilla Maker':	900,
	'Waffle Iron':	1000,
	'Pancake Skillet':	1000,
	'Space Heater':	1500
};

getEnergyExample = function(output){
	// Update appliance comparisons
	var energyArray = Array();

	// Convert map to array
	for (key in energy){
		// Don't include the last displayed value in the new array
		if (key != this.previousExample){
			energyArray.push([key , energy[key]]);
		}
	}

	// Shuffle the array
	for (var i=0; i<1000; i++)
	{
		var first = Math.floor((Math.random() * energyArray.length));
		var second = Math.floor((Math.random() * energyArray.length));
		var temp = energyArray[first];
		energyArray[first] = energyArray[second];
		energyArray[second] = temp;
	}

	// Pop off a value to display

	do{
		var chosenOne = energyArray.pop();
		if (!chosenOne){
			break;
		}
	// Make sure that the value will always end up with greater than
	// 0 items powered
	}while(chosenOne[1] > output);

	if (chosenOne){
		var numberPowered = Math.floor(output / chosenOne[1]);
		if (numberPowered > 1){
			var chosenText = chosenOne[0];
			// Pluralize string. Currently only handling cases
			// present at time of project completion, a more complex pluralizer
			// may be needed with more complex examples
			if (chosenText.slice(-1) == 's'){
				chosenText += 'es';
			}
			else{
				chosenText += 's';
			}
		}
		else{
			var chosenText = chosenOne[0];
		}
		$("#energyComp").html(''+numberPowered+' '+chosenOne[0]);
	}
	else{
		$("#energyComp").html('None of the devices on our list without batteries');
	}

}


getCurrentData = function(caller) {
	$.ajax({
		url: "data/?asset=current-data",
		success: function(result){
			var more = [result.totalOutput,result.panelAngle,result.heading];
			updateGauge(caller, result.panelOutput, result.shingleOutput, more, result.timestamp);
		},
		error : function(jq,err) {
			console.log(err);
		}

	});
};

var targetPanel = document.getElementById('current-data-panel'); // your canvas element
var targetShingle = document.getElementById('current-data-shingle'); // your canvas element
updateGauge = function(caller, panel, shingle, more, time) {
	// Check to see if the counter has been initialized
	if ( typeof updateGauge.firstTime == 'undefined' ) {
		// It has not... perform the initialization
		updateGauge.firstTime = 1;
	}
	if (caller == 'waypoint' && updateGauge.firstTime == 1) {
		updateGauge.firstTime = 0;

		this.gauge1 = new Gauge(targetPanel).setOptions(opts); // create sexy gauge!
		this.gauge2 = new Gauge(targetShingle).setOptions(opts); // create sexy gauge!

		this.gauge1.maxValue = 400; // set max gauge value
		this.gauge2.maxValue = 400; // set max gauge value

		this.gauge1.animationSpeed = 13; // set animation speed (32 is default value)
		this.gauge2.animationSpeed = 13; // set animation speed (32 is default value)

		this.gauge1.setTextField(document.getElementById("current-data-panel-textfield"));
		this.gauge2.setTextField(document.getElementById("current-data-shingle-textfield"));

		this.gauge1.set(0); // set actual value
		this.gauge2.set(0); // set actual value


		// Make sure that valid data is available, gaugejs can't handle NaN
		if(!isNaN(panel) && !isNaN(shingle)){
			this.gauge1.set(panel);
			this.gauge2.set(shingle);
		}
		setInterval( function() {
			getCurrentData('time');
		}, 10000);


	}
	else if (caller == 'time' && updateGauge.firstTime == 0) {
		if(this.gauge1.value != panel){
			this.gauge1.animationSpeed = 1;
			this.gauge1.set(panel);
		}
		if(this.gauge2.value != shingle){
			this.gauge2.animationSpeed = 1;
			this.gauge2.set(shingle);
		}
	}
	// Update the total Watts area
	$("#totalWatts").html(''+more[0]+' W');
	$("#panelAngle").html(''+more[1]+' °');
	$("#heading").html(''+more[2]+' °');

	// Update the energy example screen
	getEnergyExample(more[0]);





	// Update system status display
	a = new Date(time);
	b = new Date();
	// If the system hasn't updated in 20 minutes, consider it offline
	if((b - a) > (20*60*1000)){
		$('#system-live').html('System was last live '+a.toLocaleString());
	}
	else{
		$('#system-live').html('System is live');
	}


};
getCurrentData('waypoint');
