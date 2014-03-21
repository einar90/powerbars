// create a point light
var pointLight_height = 500;
var pointLight_camera = new THREE.PointLight(0xFFFFFF,1);
pointLight_camera.position.set(
                        camera.position.x,
                        camera.position.y,
                        camera.position.z);
scene.add(pointLight_camera);

var pointLight_origo = new THREE.PointLight(0xFFFFFF,0.3);
pointLight_origo.position.set( 0, pointLight_height, 0);
scene.add(pointLight_origo);

var pointLight_farleft = new THREE.PointLight(0xFFFFFF,0.3);
pointLight_farleft.position.set( 0, pointLight_height, -10*100);
scene.add(pointLight_farleft);

var pointLight_farright = new THREE.PointLight(0xFFFFFF,0.3);
pointLight_farright.position.set( 12*75, pointLight_height, -10*100);
scene.add(pointLight_farright);

// Create a directional light
var dirLight = new THREE.DirectionalLight(0xffffff,.5);
dirLight.position.set(camera.position.x, camera.position.y, camera.position.z);
scene.add(dirLight);

// Create ambient light
// var ambiLight = new THREE.AmbientLight(0xffffff);
// scene.add(ambiLight);

// Create hemisphere light
var hemiLight = new THREE.HemisphereLight(0xffffff, 0x333333, 0.3);
scene.add(hemiLight);
