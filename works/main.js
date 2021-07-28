
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
  initDefaultBasicLight,
  radiansToDegrees,
  createLightSphere,
} from '../libs/util/util.js'
import {
  criaAviao,
  getEsferaHelice,
  getEsferaMov,
  rotatePlaneComponents,
} from './aviao.js'
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

// ----------------- Criação dos polígonos ----------------- //

var posX = 3000
var posY = 7
var posZ = -3500
criaAviao(scene, posX, posY, posZ)
var esferaHelice = getEsferaHelice()
var esferaMov = getEsferaMov()

// ------------------------------ Movimento ---------------------------------

// Variaveis de posicao
var speed = 0
var auxSpeed = 0
var position = new THREE.Vector3()
// Auxiliares na rotacao:
var rotZ = new THREE.Vector3(0, 0, 1)
var rotY = new THREE.Vector3(0, 1, 0)
var rotX = new THREE.Vector3(1, 0, 0)
var angleRotHori = degreesToRadians(1)
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
  position.setFromMatrixPosition(esferaHelice.matrixWorld) // Vetor posicao
  posX = position.x
  posY = position.y
  posZ = position.z
}

export function returnPosition(aux) {
  if (aux == 0) return posX
  else if (aux == 1) return posY
  else if (aux == 2) return posZ
}

// Movimento de aceleracao
function aceleracao() {
  if (!modoCam) {
    // Depende do modo da camera
    if (speed > 0) esferaHelice.translateZ(speed) // Movimento para frente
  }
}
function acelera() {
  clearTimeout(auxDes) // Interrompe desaceleracao
  if (!modoCam) {
    // Previne continuacao de movimento na troca de camera
    if (speed < 5) {
      // Velocidade maxima
      speed += 0.5 // Valor da aceleracao
      auxAce = setTimeout(acelera, 120) // Recursividade para simular aceleracao
    }
  }
}
function desacelera() {
  //Analogamente ao acelera()
  clearTimeout(auxAce) //Interrompe aceleracao
  if (!modoCam) {
    if (speed > 0) {
      speed -= 0.25
      auxDes = setTimeout(desacelera, 120)
    }
  }
}

// Movimento direcional
function esquerda() {
  if (speed > 0) {
    // Movimento somente se houver aceleracao
    clearTimeout(auxNivEsq) // Interrompe Nivelamento
    if (auxRotHorizontal < 40) {
      // Limite rotacional
      esferaMov.rotateOnAxis(rotZ, -angleRotHori) // Rotaciona o aviao para os lados
      auxRotHorizontal++ // Auxiliar para nivelamento
    }
    if (speedHorEsq <= 1) {
      esferaHelice.rotateOnAxis(rotY, angleHori * speedHorEsq)
      speedHorDir = 0
      speedHorEsq += 0.05
    } else esferaHelice.rotateOnAxis(rotY, angleHori)
    auxEsq = setTimeout(esquerda, 40) // Recursividade
  }
}
function direita() {
  // Analogamente ao esquerda()
  if (speed > 0) {
    clearTimeout(auxNivDir)
    if (auxRotHorizontal > -40) {
      esferaMov.rotateOnAxis(rotZ, angleRotHori)
      auxRotHorizontal--
    }
    if (speedHorDir <= 1) {
      esferaHelice.rotateOnAxis(rotY, -angleHori * speedHorDir)
      speedHorEsq = 0
      speedHorDir += 0.05
    } else esferaHelice.rotateOnAxis(rotY, -angleHori)
    auxDir = setTimeout(direita, 40)
  }
}
function cima() {
  if (speed > 0) {
    // Verica se ha aceleracao
    clearTimeout(auxNivCima) // Iterrompe nivelaento
    breakMov() // Impede movimento contrario
    if (auxRotVertical > -20) {
      // Limite rotacional
      esferaHelice.rotateOnAxis(rotX, angleVert) // Movimenta para cima com a rotação
      esferaCam.rotateOnAxis(rotX, -angleVert) // Nivela a camera
      auxRotVertical-- // Auxiliar para nivelamento
      auxCima = setTimeout(cima, 40) // Recursividade
    }
  }
}
function baixo() {
  // Analogamente ao cima()
  if (speed > 0) {
    clearTimeout(auxNivBaixo)
    breakMov()
    if (auxRotVertical < 20) {
      esferaHelice.rotateOnAxis(rotX, -angleVert)
      esferaCam.rotateOnAxis(rotX, angleVert)
      auxRotVertical++
      auxBaixo = setTimeout(baixo, 40)
    }
  }
}
function breakMov() {
  // Esta funcao interrompe o movimento horizontal, para diminuir
  clearTimeout(auxDir) // bugs quando muitas teclas sao apertadas ao mesmo tempo
  clearTimeout(auxEsq)
}

// Movimente de nivelamento do aviao
function nivEsq() {
  if (auxRotHorizontal > 0) {
    // Verifica se precisa ser nivelado
    clearTimeout(auxEsq) // Interrompe movimento
    esferaMov.rotateOnAxis(rotZ, angleRotHori) // Nivela aviao
    esferaHelice.rotateOnAxis(rotY, angleHori * speedHorEsq)
    if (speedHorEsq > 0) speedHorEsq -= 0.02
    auxRotHorizontal-- // Diminui contador
    auxNivEsq = setTimeout(nivEsq, 30) // Recursividade
  }
}
function nivDir() {
  // Analogamente ao nivEsq()
  if (auxRotHorizontal < 0) {
    clearTimeout(auxDir)
    esferaMov.rotateOnAxis(rotZ, -angleRotHori)
    esferaHelice.rotateOnAxis(rotY, -angleHori * speedHorDir)
    if (speedHorDir > 0) speedHorDir -= 0.02
    auxRotHorizontal++
    auxNivDir = setTimeout(nivDir, 30)
  }
}
function nivCima() {
  // Analogamente ao nivEsq()
  if (auxRotVertical < 0) {
    clearTimeout(auxCima)
    esferaHelice.rotateOnAxis(rotX, -angleVert) // Nivela aviao
    esferaCam.rotateOnAxis(rotX, angleVert) // Nivela camera
    auxRotVertical++
    auxNivCima = setTimeout(nivCima, 40)
  }
}
function nivBaixo() {
  // Analogamente ao nivCima()
  if (auxRotVertical > 0) {
    clearTimeout(auxBaixo)
    esferaHelice.rotateOnAxis(rotX, angleVert)
    esferaCam.rotateOnAxis(rotX, -angleVert)
    auxRotVertical--
    auxNivBaixo = setTimeout(nivBaixo, 40)
  }
}
function forceNiv() {
  // Funcao para forcar nivelamento instantaneo no modo Inspecao
  clearTimeout(auxNivEsq)
  clearTimeout(auxNivDir)
  clearTimeout(auxNivCima)
  clearTimeout(auxNivBaixo)
  if (auxRotHorizontal > 0) {
    auxForceNiv = auxRotHorizontal * angleRotHori
    esferaMov.rotateOnAxis(rotZ, auxForceNiv)
  } else if (auxRotHorizontal < 0) {
    auxForceNiv = auxRotHorizontal * angleRotHori
    esferaMov.rotateOnAxis(rotZ, auxForceNiv)
  }
  if (auxRotVertical < 0) {
    auxForceNiv = auxRotVertical * angleVert
    esferaHelice.rotateOnAxis(rotX, -auxForceNiv)
    esferaCam.rotateOnAxis(rotX, auxForceNiv)
  } else if (auxRotVertical > 0) {
    auxForceNiv = auxRotVertical * angleVert
    esferaHelice.rotateOnAxis(rotX, auxForceNiv)
    esferaCam.rotateOnAxis(rotX, -auxForceNiv)
  }
}
function restoreNiv() {
  // Restaura angulos de nivelamento ao voltar para modo simulacao
  if (auxRotHorizontal > 0) {
    auxForceNiv = auxRotHorizontal * angleRotHori
    esferaMov.rotateOnAxis(rotZ, -auxForceNiv)
    nivEsq()
  } else if (auxRotHorizontal < 0) {
    auxForceNiv = auxRotHorizontal * angleRotHori
    esferaMov.rotateOnAxis(rotZ, -auxForceNiv)
    nivDir()
  }
  if (auxRotVertical < 0) {
    auxForceNiv = auxRotVertical * angleVert
    esferaHelice.rotateOnAxis(rotX, auxForceNiv)
    esferaCam.rotateOnAxis(rotX, -auxForceNiv)
    nivCima()
  } else if (auxRotVertical > 0) {
    auxForceNiv = auxRotVertical * angleVert
    esferaHelice.rotateOnAxis(rotX, -auxForceNiv)
    esferaCam.rotateOnAxis(rotX, auxForceNiv)
    nivBaixo()
  }
}

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

// ----------------- Camera ----------------- //

/*
Talvez usar:
var euler = new THREE.Euler();
  euler.setFromRotationMatrix(objeto.matrixWorld);
*/

var holderGeo = new THREE.SphereGeometry(1, 1, 1)
var holderMat = new THREE.MeshBasicMaterial({ color: 0xfc1803 })
var axesHelper = new THREE.AxesHelper(12)
var esferaCam = new THREE.Mesh(holderGeo, holderMat) // Objeto que carrega a cammera
esferaHelice.add(esferaCam)
esferaCam.translateX(0).translateY(0).translateZ(-20) // Posiciona objeto no centro do aviao

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

var keyboard = new KeyboardState()

function keyboardUpdate() {
  keyboard.update()
  if (!modoCam) {
    //Apenas no modo simulacao
    if (keyboard.down('down')) baixo() // Chama movimento
    if (keyboard.up('down')) nivBaixo() // Chama nivelamento

    if (keyboard.down('up')) cima()
    if (keyboard.up('up')) nivCima()

    if (keyboard.down('left')) esquerda()
    if (keyboard.up('left')) nivEsq()

    if (keyboard.down('right')) direita()
    if (keyboard.up('right')) nivDir()

    if (keyboard.down('Q')) acelera()
    if (keyboard.down('A')) desacelera()

    if (keyboard.down('enter')) switchTrajeto()
  }
  if (keyboard.down('space')) switchCam()
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
