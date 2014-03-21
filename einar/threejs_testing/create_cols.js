function create_column (height) {
  var geometry_plane_side = new THREE.PlaneGeometry(40,height);
  var geometry_plane_top = new THREE.PlaneGeometry(40,40);

  var plane_back = new THREE.Mesh(geometry_plane_side, material_column);
  scene.add(plane_back);
  plane_back.position.y = 0;

  var plane_left = new THREE.Mesh(geometry_plane_side, material_column);
  scene.add(plane_left);
  plane_left.rotation.y -= Math.PI*0.5;
  plane_left.position.x = -20;
  plane_left.position.z = 20;

  var plane_right = new THREE.Mesh(geometry_plane_side, material_column);
  scene.add(plane_right);
  plane_right.rotation.y += Math.PI*0.5;
  plane_right.position.x = 20;
  plane_right.position.z = 20;

  var plane_front = new THREE.Mesh(geometry_plane_side, material_column);
  scene.add(plane_front);
  plane_front.rotation.y += Math.PI*0;
  plane_front.position.z = 40;
  plane_front.frontplane = true;

  var plane_top = new THREE.Mesh(geometry_plane_top, material_column);
  scene.add(plane_top);
  plane_top.rotation.x -= Math.PI*0.5;
  plane_top.position.z = 20;
  plane_top.position.y = height*0.5;

  var object_column = new THREE.Object3D();
  object_column.add(plane_top);
  object_column.add(plane_left);
  object_column.add(plane_right);
  object_column.add(plane_front);
  object_column.add(plane_back);
  object_column.columnobject = true;
  return object_column;
}

function draw_columns(columns) {
  for (var year = 0; year < columns.length; year++) {
    for (var month = 0; month < 12; month++) {
      scene.add(columns[year][month]);
      columns[year][month].position.x = month*75;
      columns[year][month].position.z = -year*100;
      columns[year][month].position.y = columns[year][month].children[1].geometry.height*0.5;
    }
  };
}

create_calendar_arrray = function (years) {
  var array2D = [], i, j;

  for (i = 0; i < years; i++) {
    array2D[i] = [];
    for (j = 0; j < 12; j++) {
      array2D[i][j] = null;
    }
  }
  return array2D;
}



var columns = create_calendar_arrray(year_last-year_first);

for (var year = 0; year < year_last - year_first; year++) {
  for (var month = 0; month < 12; month++)
  {
    columns[year][month] = create_column(Math.random()*100);
  };
};

draw_columns(columns);

