function create_column (x0, z0, height) {
var geometry_plane_side = new THREE.PlaneGeometry(40,height);
var geometry_plane_top = new THREE.PlaneGeometry(40,40);

var plane_back = new THREE.Mesh(geometry_plane_side, material_column);
scene.add(plane_back);
plane_back.position.x = x0;
plane_back.position.z = z0;
plane_back.position.y = 0;
plane_back.position.y = height*0.5;

var plane_left = new THREE.Mesh(geometry_plane_side, material_column);
scene.add(plane_left);
plane_left.rotation.y -= Math.PI*0.5;
plane_left.position.x = x0-20;
plane_left.position.z = z0+20;
plane_left.position.y = height*0.5;

var plane_right = new THREE.Mesh(geometry_plane_side, material_column);
scene.add(plane_right);
plane_right.rotation.y += Math.PI*0.5;
plane_right.position.x = x0+20;
plane_right.position.z = z0+20;
plane_right.position.y = height*0.5;

var plane_front = new THREE.Mesh(geometry_plane_side, material_column);
scene.add(plane_front);
plane_front.rotation.y += Math.PI*0;
plane_front.position.x = x0;
plane_front.position.z = z0+40;
plane_front.position.y = height*0.5;

var plane_top = new THREE.Mesh(geometry_plane_top, material_column);
scene.add(plane_top);
plane_top.rotation.x -= Math.PI*0.5;
plane_top.position.x = x0;
plane_top.position.z = z0+20;
plane_top.position.y = height;
}


for (var i = 0; i < year_last - year_first; i++) {
for (var j = 0; j < 12; j++)
{
  create_column(75*j, -i*100, Math.random()*100);
};
};
