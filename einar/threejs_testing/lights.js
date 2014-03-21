prettyBars.lights = (function() {
	// Variables that depend each run
	var stateMap = {
		scene: null,
		camera: null,
		lightsHeight: 500
	};

	// Functions
	var init,
		initializeStateMap,
		addDirectionalLight,
		addHemisphereLight,
		addPointLightCamera,
		addPointLightsBars;

		initializeStateMap = function(scene, camera, lightsHeight) {
			stateMap.scene = scene;
			stateMap.camera = camera;
			stateMap.lightsHeight = lightsHeight;
		};

		addDirectionalLight = function() {
			// Create a directional light
			var dirLight = new THREE.DirectionalLight(0xffffff,.5);
			dirLight.position.set(stateMap.camera.position.x, stateMap.camera.position.y, stateMap.camera.position.z);
			stateMap.scene.add(dirLight);
		};

		addHemisphereLight = function() {
			var hemiLight = new THREE.HemisphereLight(0xffffff, 0x333333, 0.3);
			stateMap.scene.add(hemiLight);
		};

		addPointLightCamera = function() {
			var pointLight_camera = new THREE.PointLight(0xFFFFFF,1);
			pointLight_camera.position.set(stateMap.camera.position.x, stateMap.camera.position.y, stateMap.camera.position.z);
			stateMap.scene.add(pointLight_camera);
		};

		addPointLightsBars = function() {
			// Adding the different lights that lie between the bars
			var pointLight_origo = new THREE.PointLight(0xFFFFFF,0.3);
			pointLight_origo.position.set( 0, stateMap.lightsHeight, 0);
			stateMap.scene.add(pointLight_origo);
			
			var pointLight_farleft = new THREE.PointLight(0xFFFFFF,0.3);
			pointLight_farleft.position.set( 0, stateMap.lightsHeight, -10*100);
			stateMap.scene.add(pointLight_farleft);
			
			var pointLight_farright = new THREE.PointLight(0xFFFFFF,0.3);
			pointLight_farright.position.set( 12*75, stateMap.lightsHeight, -10*100);
			stateMap.scene.add(pointLight_farright);
		};

		init = function(scene, camera, lightsHeight) {
			// Init the state variables
			initializeStateMap(scene, camera, lightsHeight);

			// Set up the different Lights
			addDirectionalLight();
			addHemisphereLight();
			addPointLightCamera();
			addPointLightsBars();
		};



	// Public Functions
	return {
		init: init
	};



}());



