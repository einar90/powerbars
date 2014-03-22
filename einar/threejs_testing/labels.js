
prettyBars.labels = (function() {
  // Variables that depend each run
  var stateMap = {
    scene: null, 
    fromYear: null,
    toYear: null,
    yearLabels: []
  };

  var labelSettings = {
    size: 10.0,
    height: 1.5
  }

  // Materials
  var materials = {
    lineMaterial: null,
    labelMaterial: null
  };

  // Functions
  var init,
      initializeStateMap,
      initializeMaterials,
      addYearLabels,
      addYearLines,
      addMonthLabels,
      getYearLabels;

  initializeStateMap = function(scene, from, to) {
    stateMap.scene = scene;
    stateMap.fromYear = from;
    stateMap.toYear = to;
  };
  
  initializeMaterials = function() {
    materials.lineMaterial = new THREE.LineBasicMaterial(
    {
      color: 0x999999,
    });

    materials.labelMaterial = new THREE.MeshBasicMaterial(
    {
      color: 0xffffff,
    });
  };

  getYearLabels = function() {
    return stateMap.yearLabels;
  };


  addYearLabels = function() {
    // Loop through the years, and create a text ranging (from-to)
    for (var i = 0; i < stateMap.toYear - stateMap.fromYear; i++) {
      var year = stateMap.toYear - i;
      var text_label_geo = new THREE.TextGeometry(year, labelSettings);
      text_label = new THREE.Mesh(text_label_geo, materials.labelMaterial);
      stateMap.yearLabels.push(text_label);
      stateMap.scene.add(text_label);
      text_label.rotation.x -= Math.PI * 0.2;
      text_label.position.set(75*12, 5, -100*i+30);
    }
  };

  addYearLines = function() {
    // Creating a geometry and adding the lines for each year
    for (var i = 0; i < stateMap.toYear - stateMap.fromYear; i++) {
      var geometry = new THREE.Geometry();
      geometry.vertices.push( new THREE.Vector3( 75*12+40, 15, -100*i+20 ) );
      geometry.vertices.push( new THREE.Vector3( 75*12+40, 5, -100*i+50 ) );
      geometry.vertices.push( new THREE.Vector3( 75*12-60, 5, -100*i+50 ) );

      var line = new THREE.Line( geometry, materials.lineMaterial );
      stateMap.scene.add( line );
    }

  };

  addMonthLabels = function() {
    // Loop through all the months and add a label for each one
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
              "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];

    for (var i = 0; i < 12; i++) {
      var text_label_geo = new THREE.TextGeometry(months[i], labelSettings);
      text_label = new THREE.Mesh(text_label_geo, materials.labelMaterial);
      stateMap.scene.add(text_label);
      text_label.rotation.x -= Math.PI * 0.2;
      text_label.position.set(75*i-12,5,60);
    }
  };

  var init = function(scene, from, to) {

    // Set the dependant variables
    initializeStateMap(scene, from, to);

    // Initialize module materials
    initializeMaterials();

    // Set up the labels
    addYearLabels();
    addMonthLabels();
    addYearLines();
  };
    
    
    
  // Public functions
  return {
    init: init,
    getYearsArray: getYearLabels,
  };
  

}());


