// Adding month labels
for (var i = 0; i < 12; i++) {
  var text_label_geo = new THREE.TextGeometry(months[i], props_labels);
  text_label = new THREE.Mesh(text_label_geo, material_labels);
  scene.add(text_label);
  text_label.rotation.x -= Math.PI * 0.2;
  text_label.position.set(75*i-12,5,60);
};


// Adding year labels
for (var i = 0; i < year_last - year_first; i++) {
  var year = year_last - i;
  var text_label_geo = new THREE.TextGeometry(year, props_labels);
  text_label = new THREE.Mesh(text_label_geo, material_labels);
  scene.add(text_label);
  text_label.rotation.x -= Math.PI * 0.2;
  text_label.position.set(75*12, 5, -100*i+30);

  // Adding lines
  var geometry = new THREE.Geometry();
  geometry.vertices.push( new THREE.Vector3( 75*12+40, 15, -100*i+20 ) );
  geometry.vertices.push( new THREE.Vector3( 75*12+40, 5, -100*i+50 ) );
  geometry.vertices.push( new THREE.Vector3( 75*12-60, 5, -100*i+50 ) );

  var line = new THREE.Line( geometry, material_line );
  scene.add( line );
}
