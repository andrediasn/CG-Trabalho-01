import * as THREE from  '../build/three.module.js';
import Stats from       '../build/jsm/libs/stats.module.js';
import KeyboardState from '../libs/util/KeyboardState.js';
import {GUI} from       '../build/jsm/libs/dat.gui.module.js';
import {initRenderer,
        initCamera,
        onWindowResize, 
        createGroundPlaneWired,
        degreesToRadians} from "../libs/util/util.js";

var scene = new THREE.Scene();   
var stats = new Stats();        
var renderer = initRenderer();    


// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

var axesHelper = new THREE.AxesHelper( 12 );
scene.add( axesHelper );

//Camera Teste
var camera = initCamera(new THREE.Vector3(0, 10, 30 )); // Init camera in this position



//Plano e iluminação
var plane = createGroundPlaneWired(5000, 5000, 40, 40); // width, height, resolutionW, resolutionH
scene.add(plane);
scene.add (new THREE.HemisphereLight());





// Variavéis Gerais
var keyboard = new KeyboardState();
var speedHelice = 0;
var angle2 = 0;
var angle3 = 0;
var speed = 0.01;
var animationOn = true; // control if animation is on or of
var nivDown = 0;
var angle = degreesToRadians(0.5);
var angle2 = degreesToRadians(0.3);
var rotZ = new THREE.Vector3(0,0,1);
var rotY = new THREE.Vector3(0,1,0);
var rotX = new THREE.Vector3(1,0,0);
var key = false;






// Aviao
var sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
var sphereMaterial = new THREE.MeshPhongMaterial( {color:'rgb(180,180,255)'} );
var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
scene.add(sphere);
sphere.translateX(1.0).translateY(1.0).translateZ(1.0);

var cylinderGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 25);
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




sphere.add(camera); 


buildInterface();
render();


















function movHelice()
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
    helice.matrix.multiply(mat4.makeTranslation(0.0, 0.5, 0.0)); // T1

    
    helice2.matrix.multiply(mat4.makeRotationZ(speedHelice)); // R1
    helice2.matrix.multiply(mat4.makeTranslation(0.0, -0.5, 0.0)); // T


  }
}

function nivelar(){
    while( nivDown > 0 ){
        sphere.rotateOnAxis(rotX, -angle2);
        nivDown = nivDown-1;
    }
}



// Comandos
function keyboardUpdate() {

    keyboard.update();


    if ( keyboard.pressed("down") ){
        sphere.rotateOnAxis(rotX, angle2);
        nivDown = nivDown+1;
        

    }     
    if ( keyboard.pressed("up") ){
        sphere.rotateOnAxis(rotX, -angle2);
    }       
    if ( keyboard.pressed("left") ){
        tronco.rotateOnAxis(rotZ, angle );
        //sphere.rotateOnAxis(rotX, angle2);
    }     
    if ( keyboard.pressed("right") ){
        tronco.rotateOnAxis(rotZ, -angle );
        //sphere.rotateOnAxis(rotX, angle2);
    }    
    if ( keyboard.pressed("space") )    sphere.translateZ( -0.05 );
  
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
  movHelice();
  keyboardUpdate();
  nivelar();
  requestAnimationFrame(render); // Show events
  renderer.render(scene, camera) // Render scene
}