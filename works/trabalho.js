import * as THREE from '../build/three.module.js'
import Stats from '../build/jsm/libs/stats.module.js'
import { TrackballControls } from '../build/jsm/controls/TrackballControls.js'
import KeyboardState from '../libs/util/KeyboardState.js';
import { initRenderer,
        initCamera,
        InfoBox,
        onWindowResize,
        degreesToRadians, 
        createGroundPlaneWired,
        initDefaultBasicLight} from '../libs/util/util.js'

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

// Esfera que é a base de tudo
var esferaHeliceGeo = new THREE.SphereGeometry(2 * c, 20, 20)
var esferaHeliceMat = new THREE.MeshPhongMaterial({ color: 0xff0000 })
var esferaHelice = new THREE.Mesh(esferaHeliceGeo, esferaHeliceMat)

// Cone da hélice
var coneHeliceGeo = new THREE.CylinderGeometry(0.1 * c, 1.3 * c, 1.5 * c, 12)
var coneHeliceMat = new THREE.MeshPhongMaterial({ color: 0xff0000 })
var coneHelice = new THREE.Mesh(coneHeliceGeo, coneHeliceMat)

// Cilindro que rotaciona na hélice
var cylHeliceGeo = new THREE.CylinderGeometry(0.3 * c, 0.3 * c, 20 * c, 10)
var cylHeliceMat = new THREE.MeshPhongMaterial({ color: 0xffffff })
var cylHelice = new THREE.Mesh(cylHeliceGeo, cylHeliceMat)

// Cilindros do corpo do avião
var cyl1corpoGeo = new THREE.CylinderGeometry(1.9 * c, 4.8 * c, 6 * c, 16)
var cyl1corpoMat = new THREE.MeshPhongMaterial({ color: 0xd3d3d3 })
var cyl1corpo = new THREE.Mesh(cyl1corpoGeo, cyl1corpoMat)

var cyl2corpoGeo = new THREE.CylinderGeometry(4.8 * c, 7 * c, 10 * c, 18)
var cyl2corpoMat = new THREE.MeshPhongMaterial({ color: 0xd3d3d3 })
var cyl2corpo = new THREE.Mesh(cyl2corpoGeo, cyl2corpoMat)

var cyl3corpoGeo = new THREE.CylinderGeometry(7 * c, 8.5 * c, 10 * c, 18)
var cyl3corpoMat = new THREE.MeshPhongMaterial({ color: 0xd3d3d3 })
var cyl3corpo = new THREE.Mesh(cyl3corpoGeo, cyl3corpoMat)

var cyl4corpoGeo = new THREE.CylinderGeometry(8.5 * c, 8.5 * c, 30 * c, 18)
var cyl4corpoMat = new THREE.MeshPhongMaterial({ color: 0xd3d3d3 })
var cyl4corpo = new THREE.Mesh(cyl4corpoGeo, cyl4corpoMat)

var cyl5corpoGeo = new THREE.CylinderGeometry(8.5 * c, 6 * c, 12 * c, 24)
var cyl5corpoMat = new THREE.MeshPhongMaterial({ color: 0xd3d3d3 })
var cyl5corpo = new THREE.Mesh(cyl5corpoGeo, cyl5corpoMat)

var cyl6corpoGeo = new THREE.CylinderGeometry(6 * c, 3 * c, 9 * c, 18)
var cyl6corpoMat = new THREE.MeshPhongMaterial({ color: 0xd3d3d3 })
var cyl6corpo = new THREE.Mesh(cyl6corpoGeo, cyl6corpoMat)

var cyl7corpoGeo = new THREE.CylinderGeometry(3 * c, 2.2 * c, 7 * c, 18)
var cyl7corpoMat = new THREE.MeshPhongMaterial({ color: 0xd3d3d3 })
var cyl7corpo = new THREE.Mesh(cyl7corpoGeo, cyl7corpoMat)

// Asas
var asaGeo = new THREE.BoxGeometry(30 * c, 10 * c, 1.2 * c)
var asaMat = new THREE.MeshPhongMaterial({ color: 0xc4c4c4 })

var asa1 = new THREE.Mesh(asaGeo, asaMat)
var asa2 = new THREE.Mesh(asaGeo, asaMat)

// Esfera do leme
var esferaLemeGeo = new THREE.SphereGeometry(2.2 * c, 20, 20)
var esferaLemeMat = new THREE.MeshPhongMaterial({ color: 0xff00000 })
var esferaLeme = new THREE.Mesh(esferaLemeGeo, esferaLemeMat)

// Cilindro do leme
var cylLemeGeo = new THREE.CylinderGeometry(1.8 * c, 1.0 * c, 2 * c, 10)
var cylLemeMat = new THREE.MeshPhongMaterial({ color: 0xff00000 })
var cylLeme = new THREE.Mesh(cylLemeGeo, cylLemeMat)

// Retângulo na vertical do leme
var retVerLemeGeo = new THREE.BoxGeometry(0.4 * c, 8 * c, 2.4 * c)
var retVerLemeMat = new THREE.MeshPhongMaterial({ color: 0xff0000 })
var retVerLeme = new THREE.Mesh(retVerLemeGeo, retVerLemeMat)

// Retângulo na horizontal do leme
var retHorLemeGeo = new THREE.BoxGeometry(16 * c, 3.0 * c, 0.6 * c)
var retHorLemeMat = new THREE.MeshPhongMaterial({ color: 0xff0000 })
var retHorLeme = new THREE.Mesh(retHorLemeGeo, retHorLemeMat)

// Cabine do avião
var cylCabineGeo = new THREE.CylinderGeometry(3 * c, 3 * c, 4.5 * c, 30)
var sCabineGeo = new THREE.SphereGeometry(3.0 * c, 20, 20)

var cylCabineMat = new THREE.MeshPhongMaterial({ color: 0x656565 })
var sCabineMat = new THREE.MeshPhongMaterial({ color: 0x656565 })

var cylCabine = new THREE.Mesh(cylCabineGeo, cylCabineMat)
var sCabine1 = new THREE.Mesh(sCabineGeo, sCabineMat)
var sCabine2 = new THREE.Mesh(sCabineGeo, sCabineMat)

// ----------------- Adicionando os polígonos à cena e colocando-os em suas posições ----------------- //
scene.add(esferaHelice)
esferaHelice.translateX(posX).translateY(posY).translateZ(posZ)

//Objeto para auxiliar no movimento
var esferaMovGeo = new THREE.SphereGeometry(1, 1, 1)
var esferaMov = new THREE.Mesh(esferaMovGeo, esferaHeliceMat)
esferaHelice.add(esferaMov)
esferaHelice.translateX(posX).translateY(posX).translateZ(posZ)

// Cone para colocar as hélices rotacionando
esferaHelice.add(coneHelice)
coneHelice.matrixAutoUpdate = false
coneHelice.matrix.identity()
coneHelice.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)))
coneHelice.matrix.multiply(mat4.makeTranslation(0.0, 2.2 * c, 0.0))

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
cyl3corpo.matrix.multiply(mat4.makeTranslation(0.0, -10.0 * c, 0.0))

// Cilindro 4 do corpo do aviao
cyl3corpo.add(cyl4corpo)
cyl4corpo.matrixAutoUpdate = false
cyl4corpo.matrix.identity()
cyl4corpo.matrix.multiply(mat4.makeTranslation(0.0, -19.8 * c, 0.0))

// Cilindro 5 do corpo do aviao
cyl4corpo.add(cyl5corpo)
cyl5corpo.matrixAutoUpdate = false
cyl5corpo.matrix.identity()
cyl5corpo.matrix.multiply(mat4.makeTranslation(0.0, -20.8 * c, 0.0))

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
asa1.matrix.multiply(mat4.makeTranslation(12.8 * c, -0.8 * c, 0.0))
asa1.matrix.multiply(mat4.makeRotationX(degreesToRadians(5)))
asa1.matrix.multiply(mat4.makeRotationZ(degreesToRadians(-10)))

asa2.matrixAutoUpdate = false
asa2.matrix.identity()
asa2.matrix.multiply(mat4.makeTranslation(-12.8 * c, -0.8 * c, 0.0))
asa2.matrix.multiply(mat4.makeRotationX(degreesToRadians(5)))
asa2.matrix.multiply(mat4.makeRotationZ(degreesToRadians(10)))

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
retVerLeme.matrix.multiply(mat4.makeTranslation(0.0, -2.1 * c, -2.6 * c))
retVerLeme.matrix.multiply(mat4.makeRotationX(degreesToRadians(50)))

// Retangulo na horizontal do leme
cylLeme.add(retHorLeme)
retHorLeme.matrixAutoUpdate = false
retHorLeme.matrix.identity()
retHorLeme.matrix.multiply(mat4.makeTranslation(0.0, 0.0, 0.3 * c))
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

// ------------------------------ Movimento ---------------------------------
// Variaveis auxiliares
var speed = 0                            // Velocidade
var posX = 0                             // Armazena a posicao
var posY = 10
var posZ = 0
var position = new THREE.Vector3()       // Auxiliar para a posicao

var rotZ = new THREE.Vector3(0,0,1)      // Auxiliares na rotacao
var rotY = new THREE.Vector3(0,1,0)
var rotX = new THREE.Vector3(1,0,0)
var angle = degreesToRadians(0.5)        
var angle2 = degreesToRadians(0.1)
var auxRotVertical = 0                   
var auxRotHorizontal = 0                 // Auxiliares na rotacao

var auxAce = 0                           // Auxiliares na recursividade da aceleracao
var auxDes = 0 



// Movimento de aceleracao
function aceleracao() {
  if(!modoCam) {                                                  // Depende do modo da camera
    if (speed > 0){ 
      esferaHelice.translateZ( speed )                            // Movimento para frente
      cylHelice.matrix.multiply(mat4.makeRotationZ(speed/3))      // Rotação da helice
    }
  }
}

function acelera() {
  clearTimeout(auxDes)                      // Interrompe desaceleracao
  if(!modoCam) {                            // Previne continuacao de movimento na troca de camera
    if(speed < 1) {                         // Velocidade maxima
      speed += 0.01                         // Valor da aceleracao
      auxAce = setTimeout(acelera, 300)     // Recursividade para simular aceleracao
    }
  }
}

function desacelera() {         //Analogamente ao acelera()
  clearTimeout(auxAce)          //Interrompe aceleracao
  if(!modoCam) { 
      if(speed > 0) {
      speed -= 0.01
      auxDes = setTimeout(desacelera, 300) 
    }
  }
}

// Movimento direcional
function esquerda() {
  if ((auxRotHorizontal < 150)){            // Limite rotacional
    esferaMov.rotateOnAxis(rotZ, -angle )   // Rotaciona o aviao para os lados
    auxRotHorizontal ++                     // Auxiliar para nivelamento
  }
  esferaHelice.rotateOnAxis(rotY, angle2 )  // Movimenta para os lados
}
function direita() {                        // Analogamente ao esquerda()
  if ((auxRotHorizontal > -150)){
    esferaMov.rotateOnAxis(rotZ, angle );
    auxRotHorizontal --
  }
  esferaHelice.rotateOnAxis(rotY, -angle2 )
}
function cima() {
  esferaHelice.rotateOnAxis(rotX, angle2)    // Movimenta para cima com a rotação
  esferaCam.rotateOnAxis(rotX, -angle2)      // Nivela a camera
  auxRotVertical --                          // Auxiliar para nivelamento
}
function baixo(){                            // Analogamente ao cima()
  esferaHelice.rotateOnAxis(rotX, -angle2)
  esferaCam.rotateOnAxis(rotX, angle2)
  auxRotVertical ++
}

// Funcao para salvar posicao
function getPosition() {
  scene.updateMatrixWorld(true)
  position.setFromMatrixPosition( esferaHelice.matrixWorld )     // Vetor posicao
  posX = position.x
  posY = position.y
  posZ = position.z
}

// Movimente de nivelamento do aviao
function nivBaixo() {
  if (auxRotVertical > 0) {
    esferaHelice.rotateOnAxis(rotX, angle2)       // Nivela aviao
    esferaCam.rotateOnAxis(rotX, -angle2)         // Nivela Camera
    auxRotVertical --
    setTimeout(nivBaixo, 200)                     // Recursividade
  }
}
function nivCima() {                              // Analogamente ao nivBaixo()
  if (auxRotVertical < 0) {
    esferaHelice.rotateOnAxis(rotX, -angle2) 
    esferaCam.rotateOnAxis(rotX, angle2)
    auxRotVertical ++
    setTimeout(nivCima, 200)
  }
}
function nivEsq() {                               // Analogamente ao nivBaixo()
  if (auxRotHorizontal > 0) {
    esferaMov.rotateOnAxis(rotZ, angle)
    auxRotHorizontal --
    setTimeout(nivEsq, 200)
  }
}
function nivDir() {                               // Analogamente ao nivBaixo()
  if (auxRotHorizontal < 0) {
    esferaMov.rotateOnAxis(rotZ, -angle)
    auxRotHorizontal ++
    setTimeout(nivDir, 200)
  }
}

// ----------------- Camera ----------------- //
//Objeto que carregara a camera
var esferaCamGeo = new THREE.SphereGeometry(1, 1, 1)
var esferaCam = new THREE.Mesh(esferaCamGeo, esferaHeliceMat)
esferaHelice.add(esferaCam)
esferaCam.translateX(0).translateY(0).translateZ(-20)         // Posiciona obejeto no centro do aviao

var axesHelper = new THREE.AxesHelper( 12 )
var camera = initCamera(new THREE.Vector3(0, 20, -120 ))
var clear = initCamera(new THREE.Vector3(0,0,0))             // Usada apenas para limpar o trackball
var trackballControls = new TrackballControls( clear, renderer.domElement )
var modoCam = true                                           // Auxilia na selecao da camera

esferaCam.add(camera)
switchCam()

//Funcao para a troca do modo de camera
function switchCam(){
  if(modoCam){
    scene.add(plane)
    trackballControls = new TrackballControls( clear, renderer.domElement )     // Remove o trackball
    esferaHelice.position.set(posX, posY, posZ)                                 // Posiciona na posicao anterior salva
    camera.position.set(posX, posY+20, posZ-120)                                // Reposiciona camera
    //Falta arrumar angulo da camera
    modoCam = false                                                             // Auxilia modo da camera
  }
  else {
    getPosition()                                                               // Salva a posicao
    speed = 0                                                                   // Interrompe o movimento
    scene.add(axesHelper)
    scene.remove(plane)
    trackballControls = new TrackballControls( camera, renderer.domElement )     // Add trackball
    esferaHelice.position.set(0,0,25)                                            // Posiciona aviao no centro do mundo
    modoCam = true
  }
}

// Nivelamento da Camera
//camera.rotateX(degreesToRadians(10));

// --------------------------- Keybord---------------------------------- //

var keyboard = new KeyboardState();

function keyboardUpdate() {
  keyboard.update()
  if(!modoCam){                                 //Apenas no modo simulacao
    if ( keyboard.pressed("down") ) {   
      if (auxRotVertical < 400)                 // Limite rotacional
        baixo()                                 // Movimento + Rotacao
    }
    else if (auxRotVertical > 0)      
      nivBaixo()                                // Chama nivelamento

    if ( keyboard.pressed("up") ) {     
      if (auxRotVertical > -400)      
        cima()
    }
    else if (auxRotVertical < 0)  
      nivCima()

    if ( keyboard.pressed("left") )
      esquerda()
    else if (auxRotHorizontal > 0)    
      nivEsq()

    if ( keyboard.pressed("right") ) 
      direita()
    else if (auxRotHorizontal < 0)   
      nivDir()
    
    if ( keyboard.pressed("Q") )
      acelera()     
    if ( keyboard.pressed("A") )
      desacelera()
        
  }
  if ( keyboard.pressed("space") )  switchCam()
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
  requestAnimationFrame(render)
  renderer.render(scene, camera) // Render scene
}
