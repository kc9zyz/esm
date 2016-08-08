var map;
var ajaxRequest;
var plotlist;
var plotlayers=[];
var myArr = null;



// set up the map
map = new L.Map('map');

// create the tile layer with correct attribution
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
var osm = new L.TileLayer(osmUrl, {minZoom:0 , maxZoom: 19, attribution: osmAttrib});     

var markers = [];
// start the map in michigan
map.addLayer(osm);
$.ajax({
   url: 'data/?asset=locations',
   success: function(result) {
      var locations = [];
      var latestMarker = [null,0];
      for (entry in result.locations){
         var time = new Date(result.lastSeen[entry]);
         var totalOutput = result.totalOutput[entry];

         marker =  L.marker(result.locations[entry]);
         marker.addTo(map);

         marker.bindPopup("Last Seen: "+time.toLocaleDateString()+"<br>Total Output: "+totalOutput+ " kWh");
         markers.push(marker);
         if(time > latestMarker[1]){
            latestMarker = [marker,time];
         }
      }
      var group = new L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.25),{maxZoom:13});
      latestMarker[0].openPopup();
   }
});

var btnState = false;
$(".leaflet-control-zoom").css("visibility", "hidden");
map.scrollWheelZoom.disable();
//$(".leaflet-control-attribution").css("pointer-events","none");
$("#mapToggle").click(function(){
   if(btnState){
      $("#mapToggle").text("\xa0Enable Map Controls");
      $("#map").css("pointer-events","none");
      $(".leaflet-control-zoom").css("visibility", "hidden");
      map.scrollWheelZoom.disable();
      btnState = false;
   }
   else{
      $("#mapToggle").text("Disable  Map Controls");
      $("#map").css("pointer-events","all");
      $(".leaflet-control-zoom").css("visibility", "visible");
      map.scrollWheelZoom.enable();
      btnState=true;
   }
});
