var mouse = new THREE.Vector2(), INTERSECTED;
document.addEventListener( 'mousemove', onDocumentMouseMove, false );

function onDocumentMouseMove( event ) {
  event.preventDefault();
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

projector = new THREE.Projector();
raycaster = new THREE.Raycaster();


var bar_height_label_geo = new THREE.TextGeometry("HEIGHT", props_labels);
var bar_height_label = new THREE.Mesh(bar_height_label_geo, material_labels);
var height_line = null;

function draw_height_label (bar_height) {
  scene.remove(bar_height_label);
  bar_height_label_geo = new THREE.TextGeometry(bar_height, props_labels);
  bar_height_label = new THREE.Mesh(bar_height_label_geo, material_labels);
  scene.add(bar_height_label);
  bar_height_label.position.x = 800;
  bar_height_label.position.y = 250;
  bar_height_label.position.z = 400;
}

function draw_height_line (endpos) {
  if (height_line != null) scene.remove(height_line);
  var line_geo = new THREE.Geometry();
  line_geo.vertices.push( new THREE.Vector3( 800, 250, 400 ) );
  line_geo.vertices.push( endpos );
  height_line = new THREE.Line( line_geo, material_line );
  scene.add( height_line );
}

material_highlight = new THREE.MeshPhongMaterial(
{
  color: 0xf04254,
  specular: 0x333333,
  shininess: 30,
});

function draw_height_label_backdrop() {
  material_backdrop = new THREE.MeshLambertMaterial(
  {
    color: 0x333333,
    transparent: true,
    opacity: 0.01,
  });
  height_backdrop_geo = new THREE.PlaneGeometry(80,30);
  height_backdrop = new THREE.Mesh(height_backdrop_geo, material_backdrop);
  scene.add(height_backdrop);
  height_backdrop.position.x = 622;
  height_backdrop.position.y = 255;
  height_backdrop.position.z = 395;
}

var prev_intersected = null;
