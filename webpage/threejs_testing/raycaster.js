var mouse = new THREE.Vector2(), INTERSECTED;
document.addEventListener( 'mousemove', onDocumentMouseMove, false );

function onDocumentMouseMove( event ) {
  event.preventDefault();
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

projector = new THREE.Projector();
raycaster = new THREE.Raycaster();


function display_height (bar) {
  // body...
}
