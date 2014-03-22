// get the DOM element to attach to
var container = document.getElementById('container');

// create a WebGL renderer, camera and a scene
var renderer = new THREE.WebGLRenderer();
var camera =
  new THREE.PerspectiveCamera(
    VIEW_ANGLE,
    ASPECT,
    NEAR,
    FAR);

var scene = new THREE.Scene();
scene.add(camera)
;camera.position.x = 800;
camera.position.y = 200;
camera.position.z = 700;
var lookPoint = new THREE.Vector3(550,0,-550);
camera.lookAt(lookPoint);

// start the renderer
renderer.setSize(WIDTH, HEIGHT);

// attach the render-supplied DOM element
console.log(renderer.domElement);
container.appendChild(renderer.domElement);
