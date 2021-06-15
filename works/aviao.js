import * as THREE from  '../build/three.module.js';
import Stats from       '../build/jsm/libs/stats.module.js';
import {GUI} from       '../build/jsm/libs/dat.gui.module.js';
import {TrackballControls} from '../build/jsm/controls/TrackballControls.js';
import {initRenderer, 
        initCamera, 
        degreesToRadians, 
        onWindowResize,
        initDefaultBasicLight} from "../libs/util/util.js";

var stats = new Stats();          // To show FPS information
var scene = new THREE.Scene();    // Create main scene
var renderer = initRenderer();    // View function in util/utils
var camera = initCamera(new THREE.Vector3(15, 35, 7)); // Init camera in this position
var trackballControls = new TrackballControls( camera, renderer.domElement );
initDefaultBasicLight(scene);

//Variavéis de Speed
var speedHelice = 0;
var angle2 = 0;
var angle3 = 0;
var speed = 0.01;
var animationOn = true; // control if animation is on or of

// Show world axes
var axesHelper = new THREE.AxesHelper( 12 );
scene.add( axesHelper );

// Base sphere
var sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
var sphereMaterial = new THREE.MeshPhongMaterial( {color:'rgb(180,180,255)'} );
var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
scene.add(sphere);
// Set initial position of the sphere
sphere.translateX(1.0).translateY(1.0).translateZ(1.0);

var cylinderGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2.0, 25);
var cylinderMaterial = new THREE.MeshPhongMaterial( {color:'rgb(100,255,100)'} );
var helice = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
sphere.add(helice);

var helice2=new THREE.Mesh( cylinderGeometry, cylinderMaterial );
sphere.add(helice2);

var cubeGeometry = new THREE.BoxGeometry(0.7, 0.7, 3);
var cubeMaterial = new THREE.MeshNormalMaterial();
var tronco = new THREE.Mesh(cubeGeometry, cubeMaterial);
tronco.position.set(0, 0, 1.7);
sphere.add(tronco);

var cubeGeometry = new THREE.BoxGeometry(3, 0.1, 0.5);
var cubeMaterial = new THREE.MeshNormalMaterial();
var asa = new THREE.Mesh(cubeGeometry, cubeMaterial);
asa.position.set(0, 0, 0);
tronco.add(asa);



// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

buildInterface();
render();

function rotateCylinder()
{

  helice.matrixAutoUpdate = false;
  helice2.matrixAutoUpdate = false;

  if(animationOn)
  {
    speedHelice+=speed;
    
    var mat4 = new THREE.Matrix4();
    helice.matrix.identity();  // reset matrix
    helice2.matrix.identity();  // reset

    
    helice.matrix.multiply(mat4.makeRotationZ(speedHelice)); // R1
    helice.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0)); // T1

    
    helice2.matrix.multiply(mat4.makeRotationZ(speedHelice)); // R1
    helice2.matrix.multiply(mat4.makeTranslation(0.0, -1.0, 0.0)); // T


  }
}

function buildInterface()
{
  var controls = new function ()
  {
    this.onChangeAnimation = function(){
      animationOn = !animationOn;
    };
    this.speed = 0.01;

    this.changeSpeed = function(){
      speed = this.speed;
    };
  };

  // GUI interface
  var gui = new GUI();
  gui.add(controls, 'onChangeAnimation',true).name("Animation On/Off");
  gui.add(controls, 'speed', 0.01, 0.5)
    .onChange(function(e) { controls.changeSpeed() })
    .name("Change Speed");
}

function render()
{
  stats.update(); // Update FPS
  trackballControls.update();
  rotateCylinder();
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}