var delta_year = 0;
var transition_in_progress = false;


var month_names = ["January", "February", "March", "April", "May", "June",
                   "July", "August", "September", "October", "November", "December"];

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
  if (delta_year <= 0 || transition_in_progress == true) return;
  delta_year -= 1;
  for (var year = 0; year < year_last-year_first; year++) {
    for (var month = 0; month < 12; month++) {
      new TWEEN.Tween(columns[year][month].position).to({
          z: columns[year][month].position.z - 100
        }, 600).start();
    }
    new TWEEN.Tween(prettyBars.labels.getYearsArray()[year].position)
          .to({ z: prettyBars.labels.getYearsArray()[year].position.z - 100 }, 600)
          .start();
  }
  for (var month = 0; month < 12; month++) {
    new TWEEN.Tween(columns[delta_year][month].position).to({
          y: columns[delta_year][month].position.y + 200,
        }, 600).start();
  }
  new TWEEN.Tween(prettyBars.labels.getYearsArray()[delta_year].position)
          .to({ y: prettyBars.labels.getYearsArray()[delta_year].position.y + 200 }, 600)
          .start();
}


function navigate_down () {
  if (delta_year >= year_last-year_first || transition_in_progress == true) return;
  delta_year += 1;
  for (var year = 0; year < year_last-year_first; year++) {
    for (var month = 0; month < 12; month++) {
      new TWEEN.Tween(columns[year][month].position)
          .to({ z: columns[year][month].position.z + 100 }, 600)
          .start();
    }
    new TWEEN.Tween(prettyBars.labels.getYearsArray()[year].position)
          .to({ z: prettyBars.labels.getYearsArray()[year].position.z + 100 }, 600)
          .start();
  }
  for (var month = 0; month < 12; month++) {
    new TWEEN.Tween(columns[delta_year-1][month].position).to({
          y: columns[delta_year-1][month].position.y - 200,
        }, 600).start();
  }

  new TWEEN.Tween(prettyBars.labels.getYearsArray()[delta_year-1].position)
          .to({ y: prettyBars.labels.getYearsArray()[delta_year-1].position.y - 200 }, 600)
          .start();

}

function show_details(year,month) {
  console.log("year: ", year);
  console.log("month:", month);
  monthview = true;

  // Hiding year view
  for (var yr = 0; yr < year_last-year_first; yr++) {
    for (var mon = 0; mon < 12; mon++) {
      new TWEEN.Tween(columns[yr][mon].position).to({
          y: columns[yr][mon].position.y - 200
        }, 600).start();
    }
    new TWEEN.Tween(prettyBars.labels.getYearsArray()[yr].position)
          .to({ y: prettyBars.labels.getYearsArray()[yr].position.y - 100 }, 600)
          .start();
  }
  for (i = 0; i < 12; i++) {
    new TWEEN.Tween(prettyBars.labels.getMonthsArray()[i].position)
          .to({ y: prettyBars.labels.getMonthsArray()[i].position.y - 100 }, 600)
          .start();
  }
  draw_height_label(month_names[month] + " " + (year_last-year));
  draw_details_box("Back");
  draw_month(month);
  for (day = 0; day < month_days[month]; day++) {
    new TWEEN.Tween(month_cols[day].position)
          .to({ y: month_cols[day].geometry.height*0.5 }, Math.random()*500)
          .start();
  }
}


function nav_to_yearview() {
  // Hide monthview
  for (day = 0; day < month_days[active_column.month]; day++) {
    new TWEEN.Tween(month_cols[day].position)
          .to({ y: -month_cols[day].geometry.height*2 }, Math.random()*500)
          .start();
  }

  // Show yearview
  for (var yr = 0; yr < year_last-year_first; yr++) {
    for (var mon = 0; mon < 12; mon++) {
      new TWEEN.Tween(columns[yr][mon].position).to({
          y: columns[yr][mon].position.y + 200
        }, 600).start();
    }
    new TWEEN.Tween(prettyBars.labels.getYearsArray()[yr].position)
          .to({ y: prettyBars.labels.getYearsArray()[yr].position.y + 100 }, 600)
          .start();
  }
  for (i = 0; i < 12; i++) {
    new TWEEN.Tween(prettyBars.labels.getMonthsArray()[i].position)
          .to({ y: prettyBars.labels.getMonthsArray()[i].position.y + 100 }, 600)
          .start();
  }
  monthview = false;
  draw_height_label("");
}



