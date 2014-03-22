var delta_year = 0;

var navigation_material = new THREE.MeshBasicMaterial(
{
  color: 0x0099cc,
});

var arrow_vertices = [
  new THREE.Vector3(0,0,0),
  new THREE.Vector3(50,0,0),
  new THREE.Vector3(50,50,0),
  new THREE.Vector3(75,50,0),
  new THREE.Vector3(25,100,0),
  new THREE.Vector3(-25,50,0),
  new THREE.Vector3(0,50,0),
]

function create_geometry_from_vertices(vertices) {
  var geometry = new THREE.Geometry();
  for (var i = 0; i < vertices.length; i++) {
    geometry.vertices.push(vertices[i]);
  };
  geometry.faces.push(new THREE.Face3(0,1,2));
  geometry.faces.push(new THREE.Face3(0,2,6));
  geometry.faces.push(new THREE.Face3(3,4,5));
  return geometry;
}

function create_arrow() {
  var geometry = create_geometry_from_vertices(arrow_vertices);
  var arrow = new THREE.Mesh(geometry, navigation_material);
  return arrow;
}

var arrow_down = create_arrow();
var arrow_up = create_arrow();

scene.add(arrow_down);
scene.add(arrow_up);

arrow_up.position.x = 1020;
arrow_up.position.z = -200;
arrow_up.position.y = 5;
arrow_up.rotation.x = -Math.PI*0.5;

arrow_down.position.x = 1045;
arrow_down.position.z = -100;
arrow_down.position.y = 5;
arrow_down.rotation.y = -Math.PI;
arrow_down.rotation.x = Math.PI*0.5;

arrow_down.navcontrol = true;
arrow_down.navdown = true;
arrow_up.navcontrol = true;
arrow_up.navup = true;

function navigate_up () {
  if (delta_year <= 0) return;
  delta_year -= 1;
  console.log(delta_year);
  for (var year = 0; year < year_last-year_first; year++) {
    for (var month = 0; month < 12; month++) {
      new TWEEN.Tween(columns[year][month].position).to({
          z: columns[year][month].position.z - 100
        }, 1000).start();
    }
  }
  for (var month = 0; month < 12; month++) {
    new TWEEN.Tween(columns[delta_year][month].position).to({
          y: columns[delta_year][month].position.y + 200,
        }, 1000).start();
  }
}


function navigate_down () {
  if (delta_year >= year_last-year_first) return;
  delta_year += 1;
  console.log(delta_year);
  for (var year = 0; year < year_last-year_first; year++) {
    for (var month = 0; month < 12; month++) {
      new TWEEN.Tween(columns[year][month].position).to({
          z: columns[year][month].position.z + 100,
        }, 1000).start();
    }
  }
  for (var month = 0; month < 12; month++) {
    new TWEEN.Tween(columns[delta_year-1][month].position).to({
          y: columns[delta_year-1][month].position.y - 200,
        }, 1000).start();
  }
}
