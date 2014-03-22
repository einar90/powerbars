function create_column (height) {
  return new THREE.Mesh(new THREE.CubeGeometry(40,height,40), material_column);
}

/* function move_columns(columns) {
    for (var year = 0; year < columns.length; year++) {
    for (var month = 0; month < 12; month++) {
      columns[year][month].position.y += columns[year][month].geometry.height*2;
    }
  };
} */

function draw_columns(columns) {
  for (var year = 0; year < columns.length; year++) {
    for (var month = 0; month < 12; month++) {
      scene.add(columns[year][month]);
      columns[year][month].position.x = month*75;
      columns[year][month].position.z = -year*100;
      columns[year][month].position.y = -columns[year][month].geometry.height*2;
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
    console.log(columns[year][month]);
  };
};

draw_columns(columns);

console.log("COLS",columns[0][0]);



for (var year = 0; year < year_last-year_first; year++) {
  for (var month = 0; month < 12; month++) {
    new TWEEN.Tween(columns[year][month].position).to({
        y: columns[year][month].geometry.height*0.5
      }, Math.random()*3000).start();
  }
}

