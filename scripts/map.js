var map;
var ajaxRequest;
var plotlist;
var plotlayers=[];
var myArr = null;



// set up the map
map = new L.Map('map',{scrollWheelZoom: false});
map.dragging.disable();
//map.touchZoom.disable();
//map.doubleClickZoom.disable();
//map.scrollWheelZoom.disable();
//map.boxZoom.disable();
//map.keyboard.disable();

// create the tile layer with correct attribution
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
var osm = new L.TileLayer(osmUrl, {minZoom:0 , maxZoom: 19, attribution: osmAttrib});     

// start the map in michigan
var checkExist = setInterval(function() {
map.addLayer(osm);
map.setView(new L.LatLng(42.7922,-86.1073),10);
map.once('focus',function() { map.scrollWheelZoom.enable(); });
}, 500); // check every 100ms
