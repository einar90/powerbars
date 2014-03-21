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


// Setting object properties


// Defining materials

var material_column = new THREE.MeshLambertMaterial(
{
  color: 0xc82032,
  specular: 0x333333,
  shininess: 10,
});


