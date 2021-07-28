import * as THREE from '../build/three.module.js'
import Stats from '../build/jsm/libs/stats.module.js'
import { TrackballControls } from '../build/jsm/controls/TrackballControls.js'
import KeyboardState from '../libs/util/KeyboardState.js';
import { initRenderer, initCamera, InfoBox, onWindowResize, degreesToRadians, 
        createGroundPlaneWired, initDefaultBasicLight} from '../libs/util/util.js'
import { criaAviao, getEsferaHelice, getEsferaMov, rotatePlaneComponents } from './aviao.js';
import { returnPosition, esquerda, direita, cima, baixo, forceNiv, restoreNiv  } from './movimento.js';

var stats = new Stats() // To show FPS information
var scene = new THREE.Scene() // Create main scene
var renderer = initRenderer() // View function in util/utils

// Plano e iluminação
var plane = createGroundPlaneWired(4000, 4000, 100, 100)
//plane.rotateX(degreesToRadians(-90));
initDefaultBasicLight(scene)


// ----------------- Adicionando os polígonos à cena e colocando-os em suas posições ----------------- //
var posX = 0                             
var posY = 20
var posZ = -1900
criaAviao(scene, posX, posY, posZ)
var esferaHelice = getEsferaHelice()
var esferaMov = getEsferaMov()

// ------------------------------ Movimento ---------------------------------
// Variaveis de posicao
var speed = 0
var auxSpeed = 0               

var position = new THREE.Vector3()       
// Auxiliares na rotacao:
var rotZ = new THREE.Vector3(0,0,1)      
var rotY = new THREE.Vector3(0,1,0)
var rotX = new THREE.Vector3(1,0,0)
var angleRotHori = degreesToRadians(1.3)        
var angleHori = degreesToRadians(0.8)
var angleVert = degreesToRadians(1.3)
var auxRotVertical = 0                   
var auxRotHorizontal = 0       
var speedHorEsq = 0   
var speedHorDir = 0           
// Auxiliares na recursividade:
var auxAce                            
var auxDes  
var auxEsq
var auxDir
var auxCima
var auxBaixo 
var auxNivEsq
var auxNivDir
var auxNivCima
var auxNivBaixo
var auxForceNiv

// Funcao para salvar posicao
function getPosition() {
  scene.updateMatrixWorld(true)
  position.setFromMatrixPosition( esferaHelice.matrixWorld )     // Vetor posicao
  posX = position.x
  posY = position.y
  posZ = position.z
}

// Movimento de aceleracao
function aceleracao() {
  if(!modoCam) {                                                  // Depende do modo da camera
    if (speed > 0) 
      esferaHelice.translateZ( speed )                            // Movimento para frente
  }
}
function acelera() {
  clearTimeout(auxDes)                      // Interrompe desaceleracao
  if(!modoCam) {                            // Previne continuacao de movimento na troca de camera
    if(speed < 1.5) {                         // Velocidade maxima
      speed += 0.05                         // Valor da aceleracao
      auxAce = setTimeout(acelera, 120)     // Recursividade para simular aceleracao
    }
  }
}
function desacelera() {         //Analogamente ao acelera()
  clearTimeout(auxAce)          //Interrompe aceleracao
  if(!modoCam) { 
      if(speed > 0) {
      speed -= 0.05
      auxDes = setTimeout(desacelera, 120) 
    }
  }
}



// ----------------- Circuito --------------- //

var torusGeo = new THREE.TorusGeometry (30, 2, 16, 100) // (raio, tubo, radialSegments, tubularSegments)
var torusMat = new THREE.MeshBasicMaterial ({ color: 0xfc1803 })
var meta = new THREE.Mesh( torusGeo, torusMat)
scene.add(meta)
meta.translateX(posX).translateY(posY).translateZ(posZ)

function circuito () {
  var meta = new THREE.Mesh( torusGeo, torusMat)
  scene.add(meta)
}

// ----------------- Camera ----------------- //

/*
Talvez usar:
var euler = new THREE.Euler();
  euler.setFromRotationMatrix(objeto.matrixWorld);

*/
var holderGeo = new THREE.SphereGeometry(1, 1, 1)
var holderMat = new THREE.MeshBasicMaterial ({ color: 0xfc1803 })
var axesHelper = new THREE.AxesHelper( 12 )
var esferaCam = new THREE.Mesh(holderGeo, holderMat)               // Objeto que carrega a cammera
esferaHelice.add(esferaCam)
esferaCam.translateX(0).translateY(0).translateZ(-20)                 // Posiciona objeto no centro do aviao

var cameraSimulation = initCamera(new THREE.Vector3(0, 30, -120))     // Camera para o modo Simulacao
var cameraInspection = initCamera(new THREE.Vector3(0, 20, 60))       // Camera para o modo de Inspecao
var camera = cameraSimulation
var clear = initCamera(new THREE.Vector3(0,0,0))                      // Usada apenas para limpar o trackball
var trackballControls = new TrackballControls( clear, renderer.domElement )
var modoCam = true                                                    // Auxilia na selecao da camera

esferaCam.add(camera)
switchCam()

//Funcao para a troca do modo de camera
function switchCam(){
  if(modoCam){
    scene.add(plane)
    scene.remove(axesHelper)
    trackballControls = new TrackballControls( clear, renderer.domElement )     // Remove o trackball
    camera = cameraSimulation                                                   // Retorna camera para modo simulacao
    esferaHelice.position.set(posX, posY, posZ)                                 // Posiciona na posicao anterior salva
    speed = auxSpeed                                                            // Restaura velocidade
    restoreNiv(esferaHelice, esferaMov, esferaCam)                                                                // Restaura angulos de inclinacao
    modoCam = false                                                             // Auxilia modo da camera
  }
  else {
    getPosition()                                                               // Salva a posicao
    auxSpeed = speed                                                            // Salva velocidade
    speed = 0                                                                   // Interrompe o movimento
    scene.add(axesHelper)
    scene.remove(plane)
    forceNiv(esferaHelice, esferaMov, esferaCam)                                                                   // Forca nivelamento instantaneo
    camera = cameraInspection                                                    // Troca camera
    trackballControls = new TrackballControls( camera, renderer.domElement )     // Add trackball
    esferaHelice.position.set(0,0,0)                                             // Posiciona aviao no centro do mundo
    esferaHelice.translateZ(25)
    modoCam = true
  }
}

// --------------------------- Keybord---------------------------------- //

var keyboard = new KeyboardState();

function keyboardUpdate() {
  keyboard.update()
  if(!modoCam) {                                      //Apenas no modo simulacao
    if ( keyboard.pressed("down") )     baixo(esferaHelice, esferaCam, speed)          // Chama movimento
    //if ( keyboard.up("down") )       nivBaixo(esferaHelice, esferaCam)       // Chama nivelamento

    if ( keyboard.pressed("up") )       cima(esferaHelice, esferaCam, speed)
    //if ( keyboard.up("up") )         nivCima(esferaHelice, esferaCam)

    if ( keyboard.pressed("left") )     esquerda(esferaMov, esferaHelice, speed)
    //if ( keyboard.up("left") )       nivEsq(esferaMov, esferaHelice)

    if ( keyboard.pressed("right") )    direita(esferaMov, esferaHelice, speed)
    //if ( keyboard.up("right") )      nivDir(esferaMov, esferaHelice)
    
    if ( keyboard.down("Q") )        acelera()
    if ( keyboard.down("A") )        desacelera()
        
  }
  if ( keyboard.down("space") )      switchCam()
}

// Informacoes na tela
var controls = new InfoBox()
controls.add('Use SPACE para mudar o modo')
controls.addParagraph()
controls.add('Modo 1: Simulador')
controls.add('* Q para acelerar')
controls.add('* A para desacelerar')
controls.add('* Setas para direcionar')
controls.addParagraph()
controls.add('Modo 2: Visualização')
controls.add('* Utilize o mouse para rotacionar')
controls.show()

// Listen window size changes
window.addEventListener(
  'resize',
  function () {
    onWindowResize(camera, renderer)
  },
  false
)

render()
function render() {
  stats.update()
  trackballControls.update()
  keyboardUpdate()
  aceleracao()
  rotatePlaneComponents()
  requestAnimationFrame(render)
  renderer.render(scene, camera) // Render scene
}
