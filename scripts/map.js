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
map.setView(new L.LatLng(42.7922,-86.1073),10);

var btnState = false;
$(".leaflet-control-zoom").css("visibility", "hidden");
map.scrollWheelZoom.disable();
//$(".leaflet-control-attribution").css("pointer-events","none");
$("#mapToggle").click(function(){
   if(btnState){
      $("#mapToggle").text("Enable Map Controls");
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
