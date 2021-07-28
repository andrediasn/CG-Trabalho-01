import * as THREE from '../build/three.module.js'
import Stats from '../build/jsm/libs/stats.module.js'
import { TrackballControls } from '../build/jsm/controls/TrackballControls.js'
import KeyboardState from '../libs/util/KeyboardState.js';
import { initRenderer, initCamera, InfoBox, onWindowResize, degreesToRadians, 
        createGroundPlaneWired, initDefaultBasicLight, radiansToDegrees,
        createLightSphere} from '../libs/util/util.js'
import { criaAviao, getEsferaHelice, getEsferaMov, rotatePlaneComponents } from './aviao.js';
import { returnPosition, esquerda, direita, cima, baixo, forceNiv, restoreNiv, nivelamento  } from './movimento.js';
import { addTrajeto, circuito } from './circuito.js'
import { createMountain } from './montanha.js'
import { createTree } from './arvore.js'

var stats = new Stats() // To show FPS information
var scene = new THREE.Scene() // Create main scene
var renderer = initRenderer() // View function in util/utils

// Plano e iluminação
var mat4 = new THREE.Matrix4()
var plane = createGroundPlaneWired(7500, 7200, 100, 100)
plane.translateX(1000)

// ---------------- Ambiente ---------------- //
// Iluminação
const ambientLight = new THREE.HemisphereLight(0xcccccc, 0x111111, 0.7)
scene.add(ambientLight)

// Sol
const sunColor = 0xff5800
const sunPosition = new THREE.Vector3(0, 3000, 0)
var sunObject = createLightSphere(scene, 100, 100, 100, sunPosition)
sunObject.material = new THREE.MeshPhongMaterial({ color: sunColor })

// Criando o spotLight do sol
var sunLight = new THREE.SpotLight('rgb(255,136,0)')
sunLight.intensity = 2
sunLight.position.copy(sunPosition)
sunLight.distance = 0
sunLight.castShadow = true
sunLight.decay = 2
sunLight.penumbra = 1
sunLight.angle = degreesToRadians(80)
sunLight.shadow.mapSize.width = 4000
sunLight.shadow.mapSize.height = 4000
sunLight.shadow.camera.fov = radiansToDegrees(sunLight.angle)
sunLight.shadow.camera.far = 8000.0
sunLight.shadow.camera.near = 0.2

scene.add(sunObject)
scene.add(sunLight)

// Árvores
var arvores = []

for (let i = 0; i < 300; i++) {
  arvores.push(createTree())
}

arvores.map((arvore, index) => {
  scene.add(arvore)
  arvore.matrix.multiply(
    mat4.makeTranslation(
      (Math.random() - 0.35) * 6500,
      (Math.random() - 0.35) * 5000,
      1.8
    )
  )
  arvore.matrix.multiply(mat4.makeRotationX(degreesToRadians(-90)))
})

function showEnvironmentObjects() {
  arvores.map((arvore) => {
    arvore.visible = true
  })
}

function hideEnvironmentObjects() {
  arvores.map((arvore) => {
    arvore.visible = false
  })
}

// Montanhas
// Montanha Mais Alta
var montanhaAlta1 = createMountain(0)
var montanhaAlta2 = createMountain(1)
var montanhaAlta3 = createMountain(2)

var montanhaAlta = [montanhaAlta1, montanhaAlta2, montanhaAlta3]
montanhaAlta.map((montanha) => {
  scene.add(montanha)
  montanha.matrixAutoUpdate = false
  montanha.matrix.multiply(mat4.makeTranslation(-1000, 0, -1500))
})

// Montanha da Esquerda
var montanhaEsq1 = createMountain(3)
var montanhaEsq2 = createMountain(4)

var montanhaEsquerda = [montanhaEsq1, montanhaEsq2]
montanhaEsquerda.map((montanha) => {
  scene.add(montanha)
  montanha.matrixAutoUpdate = false
  montanha.matrix.multiply(mat4.makeTranslation(-2400, 0, -600))
  montanha.matrix.multiply(mat4.makeRotationY(degreesToRadians(20)))
})

// Montanha da Direita
var montanhaDir1 = createMountain(5)
var montanhaDir2 = createMountain(6)

var montanhaDireita = [montanhaDir1, montanhaDir2]
montanhaDireita.map((montanha) => {
  scene.add(montanha)
  montanha.matrixAutoUpdate = false
  montanha.matrix.multiply(mat4.makeTranslation(1500, 0, -2600))
  montanha.matrix.multiply(mat4.makeRotationY(degreesToRadians(-40)))
})

// ----------------- Circuito --------------- //

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
circuito(scene, 0)

// ----------------- Criando aviao ----------------- //

var posX = 3000
var posY = 7
var posZ = -3500
criaAviao(scene, posX, posY, posZ)
var esferaHelice = getEsferaHelice()
var esferaMov = getEsferaMov()

// ---------------- Aceleracao ----------------- //

// Variaveis de posicao
var speed = 0
var auxSpeed = 0               
var position = new THREE.Vector3()       
       
// Auxiliares na recursividade:
var auxAce                            
var auxDes  

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
    if(speed < 5) {                         // Velocidade maxima
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

function getPosition() {
  scene.updateMatrixWorld(true)
  position.setFromMatrixPosition( esferaHelice.matrixWorld )     // Vetor posicao
  posX = position.x
  posY = position.y
  posZ = position.z
}

var niv = false

// ----------------- Camera ----------------- //
var pX = posX
var pY = posY
var pZ = posZ
var pHolder = new THREE.Vector3()  
function attPosition () {
  scene.updateMatrixWorld(true)
  pHolder.setFromMatrixPosition( esferaHelice.matrixWorld )     // Vetor posicao
  pX = pHolder.x
  pY = pHolder.y
  pZ = pHolder.z
}

var holderGeo = new THREE.SphereGeometry(1, 1, 1)
var holderMat = new THREE.MeshBasicMaterial({ color: 0xfc1803 })
var axesHelper = new THREE.AxesHelper(12)
var esferaCam = new THREE.Mesh(holderGeo, holderMat) // Objeto que carrega a cammera
scene.add(esferaCam)
esferaCam.position.set(pX, pY, pZ) // Posiciona objeto no centro do aviao

function posicaoHolder() {
  attPosition()
  esferaCam.position.set(pX, pY, pZ)
}

// Camera para o modo Simulacao
var cameraSimulation = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  7000
)
cameraSimulation.position.copy(new THREE.Vector3(0, 30, -120))
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
switchCam()

//Funcao para a troca do modo de camera
function switchCam() {
  if (modoCam) {
    scene.add(plane)
    scene.remove(axesHelper)
    trackballControls = new TrackballControls(clear, renderer.domElement) // Remove o trackball
    camera = cameraSimulation // Retorna camera para modo simulacao
    esferaHelice.position.set(posX, posY, posZ) // Posiciona na posicao anterior salva
    showEnvironmentObjects() // Recoloca arvores da cena
    speed = auxSpeed // Restaura velocidade
    restoreNiv() // Restaura angulos de inclinacao
    modoCam = false // Auxilia modo da camera
  } else {
    getPosition() // Salva a posicao
    auxSpeed = speed // Salva velocidade
    speed = 0 // Interrompe o movimento
    scene.add(axesHelper)
    scene.remove(plane)
    hideEnvironmentObjects() // Esconde arvores da cena
    forceNiv() // Forca nivelamento instantaneo
    camera = cameraInspection // Troca camera
    trackballControls = new TrackballControls(camera, renderer.domElement) // Add trackball
    esferaHelice.position.set(0, 0, 0) // Posiciona aviao no centro do mundo deslocando para baixo
    esferaHelice.translateZ(25)
    modoCam = true
  }
}

// --------------------------- Keybord---------------------------------- //

var keyboard = new KeyboardState();

function keyboardUpdate() {
  keyboard.update()
  if(!modoCam) {                                      //Apenas no modo simulacao
    if ( keyboard.pressed("down") )     baixo(esferaHelice, speed)          // Chama movimento
    if ( keyboard.down("down") )        niv = false
    if ( keyboard.up("down") )          niv = true

    if ( keyboard.pressed("up") )       cima(esferaHelice, speed)
    if ( keyboard.down("up") )          niv = false
    if ( keyboard.up("up") )            niv = true
  

    if ( keyboard.pressed("left") )     esquerda(esferaMov, esferaHelice, esferaCam, speed)
    if ( keyboard.down("left") )        niv = false
    if ( keyboard.up("left") )          niv = true

    if ( keyboard.pressed("right") )    direita(esferaMov, esferaHelice, esferaCam, speed)
    if ( keyboard.down("right") )       niv = false
    if ( keyboard.up("right") )         niv = true
    
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
  nivelamento(esferaHelice, esferaCam, esferaMov, niv)
  posicaoHolder()
  rotatePlaneComponents()
  requestAnimationFrame(render)
  renderer.render(scene, camera) // Render scene
}
