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

// start the map in michigan
map.addLayer(osm);
map.setView(new L.LatLng(42.9634,-85.890),10);
L.marker([42.9637,-85.8894])
   .addTo(map)
   .bindPopup("Last Seen: 4/9/2016<br>Average Output: 3.7kW");

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
