// Creating the floor plane
plane_floor_geometry = new THREE.PlaneGeometry(4000,8000);
plane_floor = new THREE.Mesh(plane_floor_geometry, material_floor);
scene.add(plane_floor);
plane_floor.rotation.x -= Math.PI*0.5;
plane_floor.position.y = 0;

// Creating back wall plane
plane_backwall_geometry = new THREE.PlaneGeometry(4000,4000);
plane_backwall = new THREE.Mesh(plane_backwall_geometry, material_wall);
scene.add(plane_backwall);
plane_backwall.position.z = -4000;

// Creating left wall plane
plane_leftwall_geometry = new THREE.PlaneGeometry(8000,4000);
plane_leftwall = new THREE.Mesh(plane_leftwall_geometry, material_wall);
scene.add(plane_leftwall);
plane_leftwall.rotation.y = Math.PI*0.5;
plane_leftwall.position.x = -2000;

// Creating right wall plane
plane_rightwall_geometry = new THREE.PlaneGeometry(8000,4000);
plane_rightwall = new THREE.Mesh(plane_rightwall_geometry, material_wall);
scene.add(plane_rightwall);
plane_rightwall.rotation.y = -Math.PI*0.5;
plane_rightwall.position.x = 2000;
