prettyBars.scenebox = (function() {
	// Variables that depend on each run
	var stateMap = {
		scene: null
	};

	// Materials used in the module
	var materials = {
		materialFloor : null,
		materialWall : null
	};

	// Functions
	var init,
		initializeStateMap,
		initializeMaterials,
		addPlaneFloor,
		addPlanesWalls;

	initializeStateMap = function(scene) {
		stateMap.scene = scene;
	};

	initializeMaterials = function() {
		materials.materialFloor = new THREE.MeshPhongMaterial(
			{
			  color: 0x333333,
			});

		materials.materialWall = new THREE.MeshPhongMaterial(
			{
			  color: 0x111111,
			  shininess: 10,
			});
	};

	addPlaneFloor = function() {
		// Creates the plane that acts as floor
		plane_floor_geometry = new THREE.PlaneGeometry(4000,8000);
		plane_floor = new THREE.Mesh(plane_floor_geometry, materials.materialFloor);
		stateMap.scene.add(plane_floor);
		plane_floor.rotation.x -= Math.PI*0.5;
		plane_floor.position.y = 0;
	};

	addPlanesWalls = function() {
		// Creating back wall plane
		plane_backwall_geometry = new THREE.PlaneGeometry(4000,4000);
		plane_backwall = new THREE.Mesh(plane_backwall_geometry, materials.materialWall);
		stateMap.scene.add(plane_backwall);
		plane_backwall.position.z = -4000;
		
		// Creating left wall plane
		plane_leftwall_geometry = new THREE.PlaneGeometry(8000,4000);
		plane_leftwall = new THREE.Mesh(plane_leftwall_geometry, materials.materialWall);
		stateMap.scene.add(plane_leftwall);
		plane_leftwall.rotation.y = Math.PI*0.5;
		plane_leftwall.position.x = -2000;
		
		// Creating right wall plane
		plane_rightwall_geometry = new THREE.PlaneGeometry(8000,4000);
		plane_rightwall = new THREE.Mesh(plane_rightwall_geometry, materials.materialWall);
		stateMap.scene.add(plane_rightwall);
		plane_rightwall.rotation.y = -Math.PI*0.5;
		plane_rightwall.position.x = 2000;
	};

	init = function(scene) {
		// Initialize state variables
		initializeStateMap(scene);

		// Initialize the materials
		initializeMaterials();

		// Set up all the walls and floor
		addPlaneFloor();
		addPlanesWalls();
	};


	// Public Functions
	return {
		init: init
	};

}());




