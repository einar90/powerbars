var mouse = new THREE.Vector2(), INTERSECTED;
document.addEventListener( 'mousemove', onDocumentMouseMove, false );

var active_column = null;

function onDocumentMouseMove( event ) {
  event.preventDefault();
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

projector = new THREE.Projector();
raycaster = new THREE.Raycaster();

var props_labels = {
  size: 10.0,
  height: 2
}

var props_details = {
  size: 7.0,
  height: 1.5
}

var material_labels = new THREE.MeshBasicMaterial(
{
  color: 0xffffff,
});


var bar_height_label_geo = new THREE.TextGeometry("HEIGHT", props_labels);
var bar_height_label = new THREE.Mesh(bar_height_label_geo, material_labels);

function draw_height_label (bar_height) {
  new TWEEN.Tween(bar_height_label.position)
          .to({ y: 700 }, 2000)
          .start();
  bar_height_label_geo = new THREE.TextGeometry(bar_height, props_labels);
  bar_height_label = new THREE.Mesh(bar_height_label_geo, material_labels);
  scene.add(bar_height_label);
  bar_height_label.position.set(750,-100,400);
  new TWEEN.Tween(bar_height_label.position)
          .to({ x: 750, y:250, z: 400 }, 500)
          .start();
}



var details_mesh = null;
function draw_details_box (text) {
  if (details_mesh != null) scene.remove(details_mesh);
  var details_geo = new THREE.TextGeometry(text, props_details);
  details_mesh = new THREE.Mesh(details_geo, material_labels);
  scene.add(details_mesh);
  details_mesh.position.x = 750;
  details_mesh.position.y = 240;
  details_mesh.position.z = 400;

  var details_backdrop_geo = new THREE.PlaneGeometry(45, 20);
  var details_backdrop_material = new THREE.MeshLambertMaterial(
  {
    transparent: true,
    opacity: 0.0,
    color: 0x333333,
  });
  var details_backdrop = new THREE.Mesh(details_backdrop_geo, details_backdrop_material);
  scene.add(details_backdrop);
  details_backdrop.position.x = 765;
  details_backdrop.position.y = 240;
  details_backdrop.position.z = 402;
  details_backdrop.detailsbox = true;
}

material_highlight = new THREE.MeshPhongMaterial(
{
  color: 0xf04254,
  specular: 0x333333,
  shininess: 30,
});

var prev_intersected = null;

var onMouseClick = function() {
  navigation_detection(INTERSECTED);
  column_detection(INTERSECTED);
  details_detection(INTERSECTED);
}


window.onmousedown = onMouseClick;



function column_detection (INTERSECTED) {
  if (INTERSECTED.geometry.width == 40 && INTERSECTED.geometry.depth == 40) {
    if (prev_intersected != null) prev_intersected.material = material_column;
    var bar_height = INTERSECTED.geometry.height.toFixed(4);
    draw_height_label(bar_height);
    draw_details_box("Details");
    INTERSECTED.material = material_highlight;
    prev_intersected = INTERSECTED;
    active_column = INTERSECTED;
  }
}


function navigation_detection (INTERSECTED) {
  if (INTERSECTED.navcontrol && INTERSECTED.navcontrol === true) {
    if (INTERSECTED.navup && INTERSECTED.navup === true) {
      console.log("up");
      navigate_up();
    }
    if (INTERSECTED.navdown && INTERSECTED.navdown === true) {
      console.log("down");
      navigate_down();
    }
  };
}

function details_detection (INTERSECTED) {
  if (INTERSECTED.detailsbox && INTERSECTED.detailsbox === true) {
    if (monthview === false) {
      var year = active_column.year;
      var month = active_column.month;
      show_details(year,month);
    }
    else {
      nav_to_yearview();
    }
  }

}
