var prettyBars = {};
// set the scene size
var WIDTH = window.innerWidth,
  HEIGHT = window.innerHeight;

// set some camera attributes
var VIEW_ANGLE = 45,
  ASPECT = window.innerWidth/window.innerHeight,
  NEAR = 0.1,
  FAR = 10000;

// Setting script-wide variables
var year_first = 2000;
var year_last  = 2014;
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
              "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];

// Setting object properties
var props_labels = {size: 10.0, height: 1.5};

// Defining materials
var material_floor = new THREE.MeshPhongMaterial(
{
  color: 0x333333,
});
var material_wall = new THREE.MeshPhongMaterial(
{
  color: 0x111111,
  shininess: 10,
});
var material_column = new THREE.MeshLambertMaterial(
{
  color: 0xc82032,
  specular: 0x333333,
  shininess: 10,
});
var material_labels = new THREE.MeshBasicMaterial(
{
  color: 0xffffff,
});
var material_line = new THREE.LineBasicMaterial({
  color: 0x999999,
});
