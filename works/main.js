import * as THREE from '../build/three.module.js'
import Stats from '../build/jsm/libs/stats.module.js'
import { TrackballControls } from '../build/jsm/controls/TrackballControls.js'
import KeyboardState from '../libs/util/KeyboardState.js'
import {
  initRenderer,
  initCamera,
  InfoBox,
  onWindowResize,
  degreesToRadians,
  createGroundPlaneWired,
  radiansToDegrees,
  createLightSphere,
  SecondaryBox,
} from '../libs/util/util.js'
import {
  criaAviao,
  getEsferaHelice,
  getEsferaMov,
  rotatePlaneComponents,
} from './aviao.js'
import {
  esquerda,
  direita,
  cima,
  baixo,
  forceNiv,
  restoreNiv,
  nivelamento,
} from './movimento.js'
import {
  addTrajeto,
  checkpoint,
  getCont,
  getDist,
  getStart,
} from './circuito.js'
import { addMontanhas } from './montanha.js'
import {
  addArvores,
  showEnvironmentObjects,
  hideEnvironmentObjects,
} from './arvore.js'

var stats = new Stats() // To show FPS information
var scene = new THREE.Scene() // Create main scene
var renderer = initRenderer() // View function in util/utils

// Plano e iluminação
var plane = createGroundPlaneWired(10000, 10000, 100, 100, 'rgb(20, 90, 30)')
plane.translateX(1000)

// ---------------- Ambiente ---------------- //
// Iluminação
const ambientLight = new THREE.HemisphereLight(0xcccccc, 0x111111, 0.7)
scene.add(ambientLight)

// Sol
const sunColor = 0xff5800
const sunPosition = new THREE.Vector3(0, 2000, 0)
var sunObject = createLightSphere(scene, 100, 100, 100, sunPosition)
sunObject.material = new THREE.MeshPhongMaterial({ color: sunColor })

// Criando o spotLight do sol
var sunLight = new THREE.SpotLight('rgb(255,136,0)')
sunLight.intensity = 3
sunLight.position.copy(sunPosition)
sunLight.distance = 0
sunLight.castShadow = true
sunLight.decay = 2
sunLight.penumbra = 1
sunLight.angle = degreesToRadians(110)
sunLight.shadow.mapSize.width = 4000
sunLight.shadow.mapSize.height = 4000
sunLight.shadow.camera.fov = radiansToDegrees(sunLight.angle)
sunLight.shadow.camera.far = 7000.0
sunLight.shadow.camera.near = 0.2

scene.add(sunObject)
scene.add(sunLight)

// Árvores
addArvores(scene)

// Montanhas
addMontanhas(scene)

// ----------------- Circuito --------------- //

// Ativa/desativa trajeto
var trajOn = true
var trajeto = addTrajeto()
function switchTrajeto() {
  if (trajOn) {
    scene.add(trajeto)
    trajOn = false
  } else {
    scene.remove(trajeto)
    trajOn = true
  }
}
switchTrajeto()

// Tempo
var contadorCP = 0
var distancia = 0
var start = 0
var duracao = 0
var auxt = 0
var auxduracao = 0
var auxTempoModoCam = 0
function getCircuito() {
  contadorCP = getCont()
  distancia = getDist()
  if (contadorCP > 0 && contadorCP < 15 && !modoCam) {
    start = getStart()
    duracao = new Date().getTime() - start - auxTempoModoCam 
  } 
  // Calcula tempo no modo de camera inspecao, para ser desconsiderado
  else if (contadorCP > 0 && contadorCP < 15 && modoCam){ 
    auxduracao = new Date().getTime() - auxt    
  }
}

// ----------------- Aviao ----------------- //
var posX = 3000
var posY = 7
var posZ = -3500
criaAviao(scene, posX, posY, posZ)
var esferaHelice = getEsferaHelice()
var esferaMov = getEsferaMov()

// ---------------- Movimento ----------------- //
// Variaveis de posicao
var speed = 0
var auxSpeed = 0
var position = new THREE.Vector3()
// Auxiliares na recursividade:
var auxAce
var auxDes
var mAce = false

// Movimento de aceleracao
function aceleracao() {
  if (!modoCam) {
    if (speed > 0) esferaHelice.translateZ(speed) // Movimento para frente
  }
}
function acelera() {
  clearTimeout(auxDes) // Interrompe desaceleracao
  if (!modoCam) { // Previne continuacao de movimento na troca de camera
    mAce = true
    if (speed < 3) { // Velocidade maxima
      speed += 0.04 // Valor da aceleracao
      auxAce = setTimeout(acelera, 100) // Recursividade para simular aceleracao
    }
  }
}
function desacelera() {
  clearTimeout(auxAce) 
  if (!modoCam) {
    mAce = false
    if (speed > 0) {
      speed -= 0.04
      auxDes = setTimeout(desacelera, 100)
    }
  }
}

function getPosition() { // salva posição do aviao
  scene.updateMatrixWorld(true)
  position.setFromMatrixPosition(esferaHelice.matrixWorld) // Vetor posicao
  posX = position.x
  posY = position.y
  posZ = position.z
}

//Nivelamento
var nivV = false
var nivH = false

        // ----------------- Camera ----------------- //
var axesHelper = new THREE.AxesHelper(12)

var pX = posX
var pY = posY
var pZ = posZ
var pHolder = new THREE.Vector3()
var holderGeo = new THREE.SphereGeometry(0.01, 0.01, 1)
var holderMat = new THREE.MeshBasicMaterial({ color: 0xff1803 })
var esferaCam = new THREE.Mesh(holderGeo, holderMat) // Objeto que carrega a cammera
scene.add(esferaCam)
esferaCam.position.set(pX, pY, pZ) // Posiciona objeto no centro do aviao

function posicaoHolder() {
  scene.updateMatrixWorld(true)
  pHolder.setFromMatrixPosition(esferaHelice.matrixWorld) // Vetor posicao
  pX = pHolder.x
  pY = pHolder.y
  pZ = pHolder.z
  esferaCam.position.set(pX, pY, pZ)
}

// Camera para o modo Simulacao
var cameraSimulation = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  90000
)
cameraSimulation.position.copy(new THREE.Vector3(0, 40, -150))
cameraSimulation.lookAt(new THREE.Vector3(0, 0, 0))

// Camera para o modo Inspecao
var cameraInspection = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  120
)
cameraInspection.position.copy(new THREE.Vector3(0, 20, 60))
cameraInspection.lookAt(new THREE.Vector3(0, 0, 0))
var camera = cameraSimulation
var clear = initCamera(new THREE.Vector3(0, 0, 0)) // Usada apenas para limpar o trackball
var trackballControls = new TrackballControls(clear, renderer.domElement)
var modoCam = true // Auxilia na selecao da camera

esferaCam.add(camera)

//Funcao para a troca do modo de camera
function switchCam() {
  if (modoCam) {
    auxTempoModoCam += auxduracao // Usado para calcular tempo a ser diminuido do modo inspecao
    scene.add(plane)
    scene.remove(axesHelper)
    trackballControls = new TrackballControls(clear, renderer.domElement) // Remove o trackball
    esferaHelice.position.set(posX, posY, posZ) // Posiciona na posicao anterior salva
    showEnvironmentObjects(scene) // Recoloca arvores da cena
    if (modoCockpit) {
      camera = cameraSimulation
      esferaCam.add(camera)
    } else {
      camera = camCockpit
      cockpit.add(camera)
    }
    restoreNiv(esferaHelice, esferaMov) // Restaura angulos de inclinacao
    nivV = true
    nivH = true
    modoCam = false // Auxilia modo da camera
    speed = auxSpeed // Restaura velocidade
    if(mAce) acelera()
    else desacelera()
  } else {
    auxt = new Date().getTime() // Usado para calcular tempo no modo inspeçao
    nivV = false
    nivH = false
    getPosition() // Salva a posicao
    auxSpeed = speed // Salva velocidade
    speed = 0 // Interrompe o movimento
    scene.add(axesHelper)
    scene.remove(plane)
    hideEnvironmentObjects(scene) // Esconde arvores da cena
    forceNiv(esferaHelice, esferaMov) // Forca nivelamento instantaneo
    camera = cameraInspection // Troca camera
    trackballControls = new TrackballControls(camera, renderer.domElement) // Add trackball
    esferaHelice.position.set(0, 0, 0) // Posiciona aviao no centro do mundo deslocando para baixo
    esferaHelice.translateZ(25)
    modoCam = true
  }
}

// Cockpit
var cockpit = new THREE.Mesh(holderGeo, holderMat)
esferaMov.add(cockpit)

var camCockpit = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  90000
)
camCockpit.position.copy(new THREE.Vector3(0, 7, -15))
camCockpit.lookAt(new THREE.Vector3(0, 5, 0))

var modoCockpit = true
function switchCockpit() {
  if (modoCockpit) {
    camera = camCockpit
    cockpit.add(camera)
    modoCockpit = false
  } else {
    camera = cameraSimulation
    esferaCam.add(camera)
    modoCockpit = true
  }
}

switchCam()
// --------------------------- Audio---------------------------------- //

var listener = new THREE.AudioListener();
esferaCam.add(listener);

//Music
var sound = new THREE.Audio(listener);
var audioLoader = new THREE.AudioLoader();
audioLoader.load('Sounds/Base2.mp3', function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.2);
        sound.play();
      });

//Airplane
var sound2 = new THREE.Audio(listener);
var audioLoader2 = new THREE.AudioLoader();
audioLoader2.load('Sounds/Airplane.mp3', function (buffer) {
  sound2.setBuffer(buffer);
  sound2.setLoop(true);
  sound2.setVolume(0.1*speed/3);
  sound2.play();
});
function airplaneAudio(){
  sound2.setVolume(0.1*speed/3);  
}
  
// --------------------------- Skybox ---------------------------------- //

let textSky = [];
let texture_ft = new THREE.TextureLoader().load( 'Images/sw_ft.png');
let texture_bk = new THREE.TextureLoader().load( 'Images/sw_bk.png');
let texture_up = new THREE.TextureLoader().load( 'Images/sw_up.png');
let texture_dn = new THREE.TextureLoader().load( 'Images/sw_dn.png');
let texture_rt = new THREE.TextureLoader().load( 'Images/sw_rt.png');
let texture_lf = new THREE.TextureLoader().load( 'Images/sw_lf.png');
  
textSky.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
textSky.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
textSky.push(new THREE.MeshBasicMaterial( { map: texture_up }));
textSky.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
textSky.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
textSky.push(new THREE.MeshBasicMaterial( { map: texture_lf }));
   
for (let i = 0; i < 6; i++)
  textSky[i].side = THREE.BackSide;
   
let skyboxGeo = new THREE.BoxGeometry( 90000, 90000, 90000);
let skybox = new THREE.Mesh( skyboxGeo, textSky );
scene.add( skybox );
//skybox.translateY(2000);

// --------------------------- Keyboard---------------------------------- //

function printP() {
  console.log('x', pX)
  console.log('y', pY)
  console.log('z', pZ)
}

var vD = false
var vU = false
var vL = false
var vR = false

var keyboard = new KeyboardState()

function keyboardUpdate() {
  keyboard.update()
  if (!modoCam) {
    if (keyboard.pressed('down')) baixo(esferaHelice, esferaMov, speed)
    if (keyboard.down('down')) {vD = true; nivV = false;}
    if (keyboard.up('down')) {vD = false; if(!vU) nivV = true;}

    if (keyboard.pressed('up')) cima(esferaHelice, esferaMov, speed)
    if (keyboard.down('up')) {vU = true; nivV = false}
    if (keyboard.up('up')) {vU = false;  if(!vD) nivV = true}

    if (keyboard.pressed('left'))
      esquerda(esferaMov, esferaHelice, esferaCam, speed)
    if (keyboard.down('left')) {vL = true; nivH = false}
    if (keyboard.up('left')) {vL = false;  if(!vR) nivH = true}

    if (keyboard.pressed('right'))
      direita(esferaMov, esferaHelice, esferaCam, speed)
    if (keyboard.down('right')) {vR = true; nivH = false}
    if (keyboard.up('right')) {vR = false;  if(!vL)nivH = true}

    if (keyboard.down('Q')) acelera()
    if (keyboard.down('A')) desacelera()

    if (keyboard.down('C')) switchCockpit()

    if (keyboard.down('R')) document.location.reload(true)

    if (keyboard.down('enter')) switchTrajeto()

    if (keyboard.down('P')) printP() // usado para testes
  }
  if (keyboard.down('space')) switchCam()
}


// Informacoes na tela
var controls = new InfoBox()
controls.add('Instruções:')
controls.add('Use SPACE para mudar o modo')
controls.add('Use R para reiniciar')
controls.addParagraph()
controls.add('Modo 1: Simulador')
controls.add('* Q para acelerar')
controls.add('* A para desacelerar')
controls.add('* Setas para direcionar')
controls.add('* C para modo cockpit')
controls.add('* ENTER para trajeto on/off')
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

var timerMessage = new SecondaryBox('')

render()
function render() {
  if (!modoCam)
    timerMessage.changeMessage(
      `Tempo: ${(duracao / 1000).toFixed(2)} - CheckPoint: ${contadorCP}/15 - Distancia até o próximo: ${distancia.toFixed(0)}`
    )
  else timerMessage.changeMessage('')
  stats.update()
  trackballControls.update()
  keyboardUpdate()
  getCircuito() // contadores do circuito
  aceleracao()
  nivelamento(esferaHelice, esferaCam, esferaMov, nivV, nivH, speed)
  posicaoHolder() // atualiza posicao do holder
  checkpoint(scene, pX, pY, pZ, listener) // calcula colisao com checkpoint
  rotatePlaneComponents()
  airplaneAudio()
  requestAnimationFrame(render)
  renderer.render(scene, camera) // Render scene
}

