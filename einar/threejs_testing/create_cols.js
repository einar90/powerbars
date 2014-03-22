function create_column (height, year, month) {
  column = new THREE.Mesh(new THREE.CubeGeometry(40,height,40), material_column);
  column.year = year;
  column.month = month;
  return column;
}

function create_monthview_col (height) {
  column = new THREE.Mesh(new THREE.CubeGeometry(20,height,20), material_column);
  return column;
}


month_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
month_measurements = [];
for (var mon = 0; mon < 31; mon++) {
  month_measurements[mon] = Math.random()*200;
}

month_cols = [];

function draw_month(month) {
  for (var day = 0; day < month_days[month]; day++){
    month_cols[day] = create_monthview_col(month_measurements[day]);
    scene.add(month_cols[day]);
    month_cols[day].position.x = day*30-65;
    month_cols[day].position.y = -month_cols[day].geometry.height*2;
  }
}

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
    columns[year][month] = create_column(Math.random()*100, year, month);
  };
};

draw_columns(columns);




for (var year = 0; year < year_last-year_first; year++) {
  for (var month = 0; month < 12; month++) {
    new TWEEN.Tween(columns[year][month].position).to({
        y: columns[year][month].geometry.height*0.5
      }, Math.random()*3000).start();
  }
}

