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
} from '../libs/util/util.js'

var stats = new Stats() // To show FPS information
var scene = new THREE.Scene() // Create main scene
var renderer = initRenderer() // View function in util/utils

// Variáveis iniciais
var mat4 = new THREE.Matrix4()
const c = 0.6 // Constante para modificar o tamanho do avião

// Plano e iluminação
var plane = createGroundPlaneWired(2000, 2000, 50, 50)
//plane.rotateX(degreesToRadians(-90));
initDefaultBasicLight(scene)

// ----------------- Criação dos polígonos ----------------- //

var heliceMat = new THREE.MeshPhongMaterial({
  // Material para os elementos da hélice
  color: 0xff0000,
  specular: 0x989898,
})

// Esfera que é a base de tudo
var esferaHeliceGeo = new THREE.SphereGeometry(2 * c, 20, 20)
var esferaHelice = new THREE.Mesh(esferaHeliceGeo, heliceMat)

// Cone da hélice
var coneHeliceGeo = new THREE.CylinderGeometry(0.1 * c, 1.3 * c, 1.5 * c, 70)
var coneHelice = new THREE.Mesh(coneHeliceGeo, heliceMat)

// Cilindro que rotaciona na hélice
var cylHeliceGeo = new THREE.CylinderGeometry(0.3 * c, 0.3 * c, 8 * c, 10)
var cylHeliceMat = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  specular: 0xbababa,
})
var cylHelice = new THREE.Mesh(cylHeliceGeo, cylHeliceMat)

// Cilindros do corpo do avião
var cylCorpoMat = new THREE.MeshPhongMaterial({
  color: 0x888888,
  specular: 0x333333,
})

var cyl1corpoGeo = new THREE.CylinderGeometry(1.9 * c, 4.8 * c, 6 * c, 18)
var cyl1corpo = new THREE.Mesh(cyl1corpoGeo, cylCorpoMat)

var cyl2corpoGeo = new THREE.CylinderGeometry(4.8 * c, 7 * c, 10 * c, 18)
var cyl2corpo = new THREE.Mesh(cyl2corpoGeo, cylCorpoMat)

var cyl3corpoGeo = new THREE.CylinderGeometry(7 * c, 8.5 * c, 10 * c, 18)
var cyl3corpo = new THREE.Mesh(cyl3corpoGeo, cylCorpoMat)

var cyl4corpoGeo = new THREE.CylinderGeometry(8.5 * c, 8.5 * c, 30 * c, 18)
var cyl4corpo = new THREE.Mesh(cyl4corpoGeo, cylCorpoMat)

var cyl5corpoGeo = new THREE.CylinderGeometry(8.5 * c, 6 * c, 12 * c, 18)
var cyl5corpo = new THREE.Mesh(cyl5corpoGeo, cylCorpoMat)

var cyl6corpoGeo = new THREE.CylinderGeometry(6 * c, 3 * c, 9 * c, 18)
var cyl6corpo = new THREE.Mesh(cyl6corpoGeo, cylCorpoMat)

var cyl7corpoGeo = new THREE.CylinderGeometry(3 * c, 2.2 * c, 7 * c, 18)
var cyl7corpo = new THREE.Mesh(cyl7corpoGeo, cylCorpoMat)

// Asas
var asaGeo = new THREE.BoxGeometry(30 * c, 10 * c, 1.2 * c)
var asaMat = new THREE.MeshPhongMaterial({
  color: 0x999999,
  specular: 0x989898,
})

var asa1 = new THREE.Mesh(asaGeo, asaMat)
var asa2 = new THREE.Mesh(asaGeo, asaMat)

// Turbinas
var turbinaMat = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  specular: 0x989898,
})

var cylTurbinaGeo = new THREE.CylinderGeometry(3.5 * c, 2.2 * c, 6 * c, 20)
var cylTurbina1 = new THREE.Mesh(cylTurbinaGeo, turbinaMat)
var cylTurbina2 = new THREE.Mesh(cylTurbinaGeo, turbinaMat)

var esferaTurbinaGeo = new THREE.SphereGeometry(2.2 * c, 20, 20)
var esferaTurbina1 = new THREE.Mesh(esferaTurbinaGeo, turbinaMat)
var esferaTurbina2 = new THREE.Mesh(esferaTurbinaGeo, turbinaMat)

// Laminas da turbina
var laminaTurbinaMat = new THREE.MeshPhongMaterial({
  color: 0x222222,
  specular: 0x989898,
})
var laminaTurbinaGeo = new THREE.BoxGeometry(5.5 * c, 2 * c, 0.2 * c)

var laminasTurbinaEsq = []
var laminasTurbinaDir = []

for (let i = 0; i < 12; i++) {
  laminasTurbinaEsq.push(new THREE.Mesh(laminaTurbinaGeo, laminaTurbinaMat))
  laminasTurbinaDir.push(new THREE.Mesh(laminaTurbinaGeo, laminaTurbinaMat))
}

// Leme
// Esfera do leme
var lemeMat = new THREE.MeshPhongMaterial({
  color: 0xff00000,
  specular: 0x989898,
})

var esferaLemeGeo = new THREE.SphereGeometry(2.2 * c, 20, 20)
var esferaLeme = new THREE.Mesh(esferaLemeGeo, lemeMat)

// Cilindro do leme
var cylLemeGeo = new THREE.CylinderGeometry(1.8 * c, 1.0 * c, 2 * c, 10)
var cylLeme = new THREE.Mesh(cylLemeGeo, lemeMat)

// Retângulo na vertical do leme
var retVerLemeGeo = new THREE.BoxGeometry(0.4 * c, 8 * c, 2.4 * c)
var retVerLeme = new THREE.Mesh(retVerLemeGeo, lemeMat)

// Retângulo na horizontal do leme
var retHorLemeGeo = new THREE.BoxGeometry(16 * c, 3.0 * c, 0.6 * c)
var retHorLeme = new THREE.Mesh(retHorLemeGeo, lemeMat)

// Cabine do avião
var cabineMat = new THREE.MeshPhongMaterial({
  color: 0x333333,
  specular: 0x989898,
})

var cylCabineGeo = new THREE.CylinderGeometry(3 * c, 3 * c, 4.5 * c, 30)
var sCabineGeo = new THREE.SphereGeometry(3.0 * c, 20, 20)

var cylCabine = new THREE.Mesh(cylCabineGeo, cabineMat)
var sCabine1 = new THREE.Mesh(sCabineGeo, cabineMat)
var sCabine2 = new THREE.Mesh(sCabineGeo, cabineMat)

// Janelas
var janelaMat = new THREE.MeshPhongMaterial({
  color: 0xf0f0f0,
  specular: 0xbbbbbb,
})
// Janelas no cilindro antes do central(cyl3)
var janela3Geo = new THREE.CylinderGeometry(1.66 * c, 1.66 * c, 2 * c, 16)
var janela3esq = new THREE.Mesh(janela3Geo, janelaMat)
var janela3dir = new THREE.Mesh(janela3Geo, janelaMat)

// Janelas no cilindro central(cyl4)
var janela4Geo = new THREE.CylinderGeometry(1.66 * c, 1.66 * c, 16.8 * c, 16)
var janelas4 = []
for (let i = 0; i < 7; i++) {
  janelas4.push(new THREE.Mesh(janela4Geo, janelaMat))
}

//Janelas no cilindro depois do central(cyl5)
var janela5Geo = new THREE.CylinderGeometry(1.66 * c, 1.66 * c, 2 * c, 16)
var janelas5esq = []
var janelas5dir = []
for (let i = 0; i < 2; i++) {
  janelas5esq.push(new THREE.Mesh(janela5Geo, janelaMat))
  janelas5dir.push(new THREE.Mesh(janela5Geo, janelaMat))
}

// ----------------- Adicionando os polígonos à cena e colocando-os em suas posições ----------------- //
scene.add(esferaHelice)
esferaHelice.translateX(posX).translateY(posY).translateZ(posZ)

//Objeto para auxiliar no movimento
var esferaMovGeo = new THREE.SphereGeometry(1, 1, 1)
var esferaMov = new THREE.Mesh(esferaMovGeo, heliceMat)
esferaHelice.add(esferaMov)
esferaHelice.translateX(posX).translateY(posX).translateZ(posZ)

// Cone para colocar as hélices rotacionando
esferaHelice.add(coneHelice)
coneHelice.matrixAutoUpdate = false
coneHelice.matrix.identity()
coneHelice.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)))
coneHelice.matrix.multiply(mat4.makeTranslation(0.0, 2 * c, 0.0))

// Hélice rotacionando
esferaHelice.add(cylHelice)
cylHelice.matrixAutoUpdate = false
cylHelice.matrix.identity()
cylHelice.matrix.multiply(mat4.makeTranslation(0.0, 0.0, 1.0 * c))

// Cilindro 1 do corpo do aviao
esferaMov.add(cyl1corpo)
cyl1corpo.matrixAutoUpdate = false
cyl1corpo.matrix.identity()
cyl1corpo.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)))
cyl1corpo.matrix.multiply(mat4.makeTranslation(0.0, -3.3 * c, 0.0))

// Cilindro 2 do corpo do aviao
cyl1corpo.add(cyl2corpo)
cyl2corpo.matrixAutoUpdate = false
cyl2corpo.matrix.identity()
cyl2corpo.matrix.multiply(mat4.makeTranslation(0.0, -8.0 * c, 0.0))

// Cilindro 3 do corpo do aviao
cyl2corpo.add(cyl3corpo)
cyl3corpo.matrixAutoUpdate = false
cyl3corpo.matrix.identity()
cyl3corpo.matrix.multiply(mat4.makeTranslation(0.0, -9.95 * c, 0.0))

// Cilindro 4 do corpo do aviao
cyl3corpo.add(cyl4corpo)
cyl4corpo.matrixAutoUpdate = false
cyl4corpo.matrix.identity()
cyl4corpo.matrix.multiply(mat4.makeTranslation(0.0, -19.85 * c, 0.0))

// Cilindro 5 do corpo do aviao
cyl4corpo.add(cyl5corpo)
cyl5corpo.matrixAutoUpdate = false
cyl5corpo.matrix.identity()
cyl5corpo.matrix.multiply(mat4.makeTranslation(0.0, -20.9 * c, 0.0))

// Cilindro 6 do corpo do aviao
cyl5corpo.add(cyl6corpo)
cyl6corpo.matrixAutoUpdate = false
cyl6corpo.matrix.identity()
cyl6corpo.matrix.multiply(mat4.makeTranslation(0.0, -10.5 * c, 0.0))

// Cilindro 7 do corpo do aviao
cyl6corpo.add(cyl7corpo)
cyl7corpo.matrixAutoUpdate = false
cyl7corpo.matrix.identity()
cyl7corpo.matrix.multiply(mat4.makeTranslation(0.0, -8.0 * c, 0.0))

// Asas
cyl4corpo.add(asa1)
cyl4corpo.add(asa2)

asa1.matrixAutoUpdate = false
asa1.matrix.identity()
asa1.matrix.multiply(mat4.makeTranslation(12.8 * c, -0.8 * c, 2.5 * c))
asa1.matrix.multiply(mat4.makeRotationX(degreesToRadians(5)))
asa1.matrix.multiply(mat4.makeRotationZ(degreesToRadians(-10)))

asa2.matrixAutoUpdate = false
asa2.matrix.identity()
asa2.matrix.multiply(mat4.makeTranslation(-12.8 * c, -0.8 * c, 2.5 * c))
asa2.matrix.multiply(mat4.makeRotationX(degreesToRadians(5)))
asa2.matrix.multiply(mat4.makeRotationZ(degreesToRadians(10)))

// Turbina
asa1.add(cylTurbina1)
asa1.add(esferaTurbina1)
asa2.add(cylTurbina2)
asa2.add(esferaTurbina2)

cylTurbina1.matrixAutoUpdate = false
cylTurbina1.matrix.identity()
cylTurbina1.matrix.multiply(mat4.makeTranslation(0, 2.8 * c, 3.6 * c))

esferaTurbina1.matrixAutoUpdate = false
esferaTurbina1.matrix.identity()
esferaTurbina1.matrix.multiply(mat4.makeTranslation(0, 0, 3.6 * c))

cylTurbina2.matrixAutoUpdate = false
cylTurbina2.matrix.identity()
cylTurbina2.matrix.multiply(mat4.makeTranslation(0, 2.8 * c, 3.6 * c))

esferaTurbina2.matrixAutoUpdate = false
esferaTurbina2.matrix.identity()
esferaTurbina2.matrix.multiply(mat4.makeTranslation(0, 0, 3.6 * c))

// Laminas da turbina
laminasTurbinaDir.map((lamina, index) => {
  cylTurbina1.add(lamina)
  lamina.matrixAutoUpdate = false
  lamina.matrix.identity()
  lamina.matrix.multiply(mat4.makeTranslation(0, 2.3 * c, 0))
  lamina.matrix.multiply(mat4.makeRotationY(degreesToRadians(15 * index)))
})

laminasTurbinaEsq.map((lamina, index) => {
  cylTurbina2.add(lamina)
  lamina.matrixAutoUpdate = false
  lamina.matrix.identity()
  lamina.matrix.multiply(mat4.makeTranslation(0, 2.3 * c, 0))
  lamina.matrix.multiply(mat4.makeRotationY(degreesToRadians(15 * index)))
})

// Esfera do leme
cyl7corpo.add(esferaLeme)
esferaLeme.matrixAutoUpdate = false
esferaLeme.matrix.identity()
esferaLeme.matrix.multiply(mat4.makeTranslation(0.0, -3.5 * c, 0.0))

// Cilindro do leme
esferaLeme.add(cylLeme)
cylLeme.matrixAutoUpdate = false
cylLeme.matrix.identity()
cylLeme.matrix.multiply(mat4.makeTranslation(0.0, -2.2 * c, -0.7 * c))
cylLeme.matrix.multiply(mat4.makeRotationX(degreesToRadians(20)))

// Retangulo na vertical do leme
cylLeme.add(retVerLeme)
retVerLeme.matrixAutoUpdate = false
retVerLeme.matrix.identity()
retVerLeme.matrix.multiply(mat4.makeTranslation(0.0, -2.3 * c, -2.8 * c))
retVerLeme.matrix.multiply(mat4.makeRotationX(degreesToRadians(50)))

// Retangulo na horizontal do leme
cylLeme.add(retHorLeme)
retHorLeme.matrixAutoUpdate = false
retHorLeme.matrix.identity()
retHorLeme.matrix.multiply(mat4.makeTranslation(0.0, 0.0, 0.4 * c))
retHorLeme.matrix.multiply(mat4.makeRotationX(degreesToRadians(-10)))

// Cabine
cyl2corpo.add(cylCabine)
cylCabine.add(sCabine1)
cylCabine.add(sCabine2)

cylCabine.matrixAutoUpdate = false
sCabine1.matrixAutoUpdate = false
sCabine2.matrixAutoUpdate = false
cylCabine.matrix.identity()
sCabine1.matrix.identity()
sCabine2.matrix.identity()

cylCabine.matrix.multiply(mat4.makeTranslation(0.0, -4.0 * c, -5.0 * c))
cylCabine.matrix.multiply(mat4.makeRotationX(degreesToRadians(16)))
sCabine1.matrix.multiply(mat4.makeTranslation(0.0, -2.1 * c, 0.0))
sCabine2.matrix.multiply(mat4.makeTranslation(0.0, 2.1 * c, 0.0))

// Janelas
// Janelas no cilindro antes do central(cyl3)
cyl3corpo.add(janela3esq)
cyl3corpo.add(janela3dir)

janela3esq.matrixAutoUpdate = false
janela3esq.matrix.identity()

janela3esq.matrix.multiply(mat4.makeTranslation(7.1 * c, -2.8 * c, -0.2 * c))
janela3esq.matrix.multiply(mat4.makeRotationZ(degreesToRadians(98)))

janela3dir.matrix.identity()
janela3dir.matrixAutoUpdate = false

janela3dir.matrix.multiply(mat4.makeTranslation(-7.1 * c, -2.8 * c, -0.2 * c))
janela3dir.matrix.multiply(mat4.makeRotationZ(degreesToRadians(82)))

// Janelas no cilindro central(cyl4)
janelas4.map((janela, index) => {
  cyl4corpo.add(janela)
  janela.matrixAutoUpdate = false
  janela.matrix.identity()
  janela.matrix.multiply(mat4.makeRotationZ(degreesToRadians(90)))
  janela.matrix.multiply(
    mat4.makeTranslation(-12.8 * c + index * 4.2 * c, 0, -0.2 * c)
  )
})

//Janelas no cilindro depois do central(cyl5)
janelas5esq.map((janela, index) => {
  cyl5corpo.add(janela)
  janela.matrixAutoUpdate = false
  janela.matrix.identity()
  janela.matrix.multiply(mat4.makeRotationZ(degreesToRadians(102)))
  janela.matrix.multiply(
    mat4.makeTranslation(1.2 * c + index * 4 * c, 6.1 * c, -0.2 * c)
  )
})

janelas5dir.map((janela, index) => {
  cyl5corpo.add(janela)
  janela.matrixAutoUpdate = false
  janela.matrix.identity()
  janela.matrix.multiply(mat4.makeRotationZ(degreesToRadians(78)))
  janela.matrix.multiply(
    mat4.makeTranslation(1.2 * c + index * 4 * c, -6.1 * c, -0.2 * c)
  )
})

// Função para rotacionar determinadas partes do aviao
function rotatePlaneComponents() {
  cylHelice.matrixAutoUpdate = false
  cylHelice.matrix.multiply(mat4.makeRotationZ(0.2 + speed / 4))
  laminasTurbinaDir.map((lamina) => {
    lamina.matrixAutoUpdate = false
    lamina.matrix.multiply(mat4.makeRotationY(degreesToRadians(-3 + speed / 4)))
  })
  laminasTurbinaEsq.map((lamina) => {
    lamina.matrixAutoUpdate = false
    lamina.matrix.multiply(mat4.makeRotationY(degreesToRadians(-3 + speed / 4)))
  })
}

// ------------------------------ Movimento ---------------------------------
// Variaveis auxiliares
var speed = 0 // Velocidade
var posX = 0 // Armazena a posicao
var posY = 10
var posZ = 0
var angX = 0 // Ainda sem uso
var angY = 0
var angZ = 0
var rotZ = new THREE.Vector3(0, 0, 1) // Auxiliares na rotacao
var rotY = new THREE.Vector3(0, 1, 0)
var rotX = new THREE.Vector3(1, 0, 0)
var angle = degreesToRadians(0.5)
var angle2 = degreesToRadians(0.1)
var auxRotVertical = 0
var auxRotHorizontal = 0
var auxAce = 0
var auxDes = 0
// Movimento de aceleracao
function aceleracao() {
  if (!modoCam) {
    // Depende do modo da camera
    if (speed > 0) {
      esferaHelice.translateZ(speed) // Movimento para frente
    }
  }
}
function acelera() {
  clearTimeout(auxDes) // Interrompe desaceleracao
  if (!modoCam) {
    //Previne continuação de movimento na troca de camera
    if (speed < 1) {
      speed += 0.01
      auxAce = setTimeout(acelera, 300) // Aceleracao progressiva de modo recursivo
    }
  }
}
function desacelera() {
  //Analogamente ao acelera()
  clearTimeout(auxAce) //Interrompe aceleracao
  if (!modoCam) {
    if (speed > 0) {
      speed -= 0.01
      auxDes = setTimeout(desacelera, 300) // Recursividade
    }
  }
}

// Movimento direcao
function esquerda() {
  if (auxRotHorizontal < 150) {
    esferaMov.rotateOnAxis(rotZ, -angle) // Rotaciona o aviao para os lados
    auxRotHorizontal++ // Utilizado para nivelamento
  }
  esferaHelice.rotateOnAxis(rotY, angle2) // Movimenta para os lados
}
function direita() {
  if (auxRotHorizontal > -150) {
    esferaMov.rotateOnAxis(rotZ, angle)
    auxRotHorizontal--
  }
  esferaHelice.rotateOnAxis(rotY, -angle2)
}
function cima() {
  esferaHelice.rotateOnAxis(rotX, angle2) // Movimenta para cima com a rotação
  esferaCam.rotateOnAxis(rotX, -angle2) // Nivela a camera
  auxRotVertical--
}
function baixo() {
  esferaHelice.rotateOnAxis(rotX, -angle2)
  esferaCam.rotateOnAxis(rotX, angle2)
  auxRotVertical++
}

// Funcao para salvar posicao
var position = new THREE.Vector3()
function getPosition() {
  scene.updateMatrixWorld(true)
  position.setFromMatrixPosition(esferaHelice.matrixWorld)
  posX = position.x
  posY = position.y
  posZ = position.z
}

// Movimente de nivelamento do aviao
function nivBaixo() {
  if (auxRotVertical > 0) {
    esferaHelice.rotateOnAxis(rotX, angle2)
    esferaCam.rotateOnAxis(rotX, -angle2)
    auxRotVertical--
    setTimeout(nivBaixo, 200)
  }
}
function nivCima() {
  if (auxRotVertical < 0) {
    esferaHelice.rotateOnAxis(rotX, -angle2)
    esferaCam.rotateOnAxis(rotX, angle2)
    auxRotVertical++
    setTimeout(nivCima, 200)
  }
}
function nivEsq() {
  if (auxRotHorizontal > 0) {
    esferaMov.rotateOnAxis(rotZ, angle)
    auxRotHorizontal--
    setTimeout(nivEsq, 200)
  }
}
function nivDir() {
  if (auxRotHorizontal < 0) {
    esferaMov.rotateOnAxis(rotZ, -angle)
    auxRotHorizontal++
    setTimeout(nivDir, 200)
  }
}

// ----------------- Camera ----------------- //
//Objeto que carregara a camera
var esferaCamGeo = new THREE.SphereGeometry(1, 1, 1)
var esferaCam = new THREE.Mesh(esferaCamGeo, heliceMat)
esferaHelice.add(esferaCam)
esferaCam.translateX(0).translateY(0).translateZ(-20)

var axesHelper = new THREE.AxesHelper(12)
var cameraSimulation = initCamera(new THREE.Vector3(0, 20, -120))
var cameraInspection = initCamera(new THREE.Vector3(0, 10, 35))
var camera = cameraSimulation
var clear = initCamera(new THREE.Vector3(0, 0, 0)) // Usada apenas para limpar o trackball
var trackballControls = new TrackballControls(clear, renderer.domElement)
var modoCam = true // Auxilia na selecao da camera

esferaCam.add(camera)
//asdasdasdFuncao para a troca do modo de camera
switchCam()
function switchCam() {
  if (modoCam) {
    scene.add(plane)
    scene.remove(axesHelper)
    camera = cameraSimulation
    trackballControls = new TrackballControls(clear, renderer.domElement) // Remove o trackball
    esferaHelice.position.set(posX, posY, posZ) // Posiciona na posicao anterior salva
    //Falta arrumar angulo da camera
    modoCam = false // Auxilia modo da camera
  } else {
    while (auxRotHorizontal > 0) nivEsq()

    while (auxRotHorizontal < 0) nivDir()

    while (auxRotVertical > 0) nivBaixo()

    while (auxRotVertical < 0) nivCima()
    getPosition() // Salva a posicao
    speed = 0 // Interrompe o movimento
    scene.add(axesHelper)
    scene.remove(plane)
    camera = cameraInspection
    trackballControls = new TrackballControls(camera, renderer.domElement) // Add trackball
    esferaHelice.position.set(0, 0, 24) // Posiciona aviao no centro
    modoCam = true
  }
}

// Nivelamento da Camera
//camera.rotateX(degreesToRadians(10));

// --------------------------- Keybord---------------------------------- //

var keyboard = new KeyboardState()

function keyboardUpdate() {
  keyboard.update()
  if (!modoCam) {
    //Apenas no modo simulacao
    if (keyboard.pressed('down')) {
      if (auxRotVertical < 400) baixo()
    } else if (auxRotVertical > 0) nivBaixo()

    if (keyboard.pressed('up')) {
      if (auxRotVertical > -400) cima()
    } else if (auxRotVertical < 0) nivCima()

    if (keyboard.pressed('left')) esquerda()
    else if (auxRotHorizontal > 0) nivEsq()

    if (keyboard.pressed('right')) direita()
    else if (auxRotHorizontal < 0) nivDir()

    if (keyboard.pressed('Q')) acelera()
    if (keyboard.pressed('A')) desacelera()
  }
  if (keyboard.up('space')) switchCam()
}

// Use this to show information onscreen
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
  rotatePlaneComponents()
  keyboardUpdate()
  aceleracao()
  requestAnimationFrame(render)
  renderer.render(scene, camera) // Render scene
}


