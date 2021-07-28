import * as THREE from '../build/three.module.js'
import { ConvexGeometry } from '../build/jsm/geometries/ConvexGeometry.js'
import { degreesToRadians } from '../libs/util/util.js'

// Função que cria e retorna uma montanha
// O argumento recebido é a posição no vetor points que indica quais serão os pontos usados
function createMountain(index) {
  var mountainColor = 0x4a3321
  var points = [
    // Montanha Alta Pt1
    [
      new THREE.Vector3(280, 0, 310),
      new THREE.Vector3(345, 0, 240),
      new THREE.Vector3(-440, 0, -480),
      new THREE.Vector3(340, 0, -280),
      new THREE.Vector3(-440, 0, 350),
      new THREE.Vector3(100, 0, -440),
      new THREE.Vector3(10, 0, 350),

      new THREE.Vector3(0, 630, 0),
      new THREE.Vector3(-140, 530, -50),
      new THREE.Vector3(-240, 500, -90),
      new THREE.Vector3(-290, 460, 20),
      new THREE.Vector3(-340, 400, -50),
      new THREE.Vector3(-400, 370, -50),
      new THREE.Vector3(-320, 360, -210),
      new THREE.Vector3(20, 500, -150),
      new THREE.Vector3(-40, 470, -200),
      new THREE.Vector3(-140, 530, -120),
      new THREE.Vector3(-100, 370, -300),
      new THREE.Vector3(-190, 350, -310),
      new THREE.Vector3(220, 350, -250),
      new THREE.Vector3(120, 300, -330),

      new THREE.Vector3(-140, 480, 90),
      new THREE.Vector3(-50, 500, 80),
      new THREE.Vector3(20, 460, 110),
      new THREE.Vector3(190, 470, 10),
      new THREE.Vector3(280, 390, -50),
      new THREE.Vector3(-60, 490, 100),
      new THREE.Vector3(10, 440, 150),
      new THREE.Vector3(70, 500, 90),
      new THREE.Vector3(240, 330, 160),
      new THREE.Vector3(50, 350, 210),
      new THREE.Vector3(100, 260, 260),
      new THREE.Vector3(210, 210, 280),
      new THREE.Vector3(-160, 300, 240),
      new THREE.Vector3(-30, 270, 270),
      new THREE.Vector3(-220, 350, 170),
      new THREE.Vector3(-50, 100, 330),
      new THREE.Vector3(-150, 150, 320),
      new THREE.Vector3(230, 290, 230),

      new THREE.Vector3(340, 310, 130),
      new THREE.Vector3(340, 310, -180),

      new THREE.Vector3(-440, 300, 0),
      new THREE.Vector3(-440, 300, -230),
    ],
    // Montanha Alta Pt2
    [
      new THREE.Vector3(-440, 0, 350),
      new THREE.Vector3(-440, 0, -480),
      new THREE.Vector3(-440, 300, 0),
      new THREE.Vector3(-440, 300, -230),
      new THREE.Vector3(-440, 220, -270),

      new THREE.Vector3(-560, 0, 420),
      new THREE.Vector3(-670, 0, 400),
      new THREE.Vector3(-780, 0, 350),
      new THREE.Vector3(-840, 0, 260),
      new THREE.Vector3(-870, 0, 100),
      new THREE.Vector3(-820, 0, -10),
      new THREE.Vector3(-750, 0, -220),
      new THREE.Vector3(-650, 0, -380),

      new THREE.Vector3(-520, 220, 200),
      new THREE.Vector3(-610, 140, 280),
      new THREE.Vector3(-680, 210, 60),
      new THREE.Vector3(-710, 120, 260),
      new THREE.Vector3(-620, 250, 130),
      new THREE.Vector3(-760, 140, 220),
      new THREE.Vector3(-800, 100, -20),
      new THREE.Vector3(-640, 230, -200),
    ],
    [
      // Montanha Alta Pt3
      new THREE.Vector3(340, 310, 130),
      new THREE.Vector3(340, 310, -180),
      new THREE.Vector3(340, 0, 240),
      new THREE.Vector3(340, 0, -280),
      new THREE.Vector3(720, 0, 140),
      new THREE.Vector3(690, 0, -180),
      new THREE.Vector3(600, 0, 260),

      new THREE.Vector3(400, 330, -60),
      new THREE.Vector3(390, 325, 20),
      new THREE.Vector3(360, 320, -20),

      new THREE.Vector3(470, 200, 170),
      new THREE.Vector3(390, 150, 200),
      new THREE.Vector3(370, 85, 220),
      new THREE.Vector3(660, 60, 170),
      new THREE.Vector3(560, 150, 170),
      new THREE.Vector3(670, 100, 20),
      new THREE.Vector3(610, 170, 70),
      new THREE.Vector3(580, 210, -60),
      new THREE.Vector3(490, 280, 40),
      new THREE.Vector3(510, 250, 100),
      new THREE.Vector3(430, 300, -100),
      new THREE.Vector3(630, 150, -90),
      new THREE.Vector3(680, 100, -70),
      new THREE.Vector3(590, 120, -200),
      new THREE.Vector3(480, 130, -230),
    ],
    [
      // Montanha da Esquerda Pt1
      new THREE.Vector3(-910, 0, -180),
      new THREE.Vector3(-910, 0, 200),
      new THREE.Vector3(-1200, 0, -130),
      new THREE.Vector3(-1300, 0, 200),
      new THREE.Vector3(-1420, 0, 40),

      new THREE.Vector3(-910, 190, -90),
      new THREE.Vector3(-910, 200, 140),

      new THREE.Vector3(-1370, 30, 10),
      new THREE.Vector3(-1340, 40, 80),
      new THREE.Vector3(-1340, 20, 120),
      new THREE.Vector3(-1280, 60, 110),
      new THREE.Vector3(-1250, 40, -80),
      new THREE.Vector3(-1250, 80, 20),
      new THREE.Vector3(-1190, 110, 80),
      new THREE.Vector3(-1160, 100, 140),
      new THREE.Vector3(-1100, 80, 180),
      new THREE.Vector3(-990, 70, 190),
      new THREE.Vector3(-1050, 150, -40),
      new THREE.Vector3(-1000, 180, 30),
      new THREE.Vector3(-1060, 60, -150),
      new THREE.Vector3(-1120, 90, -110),
    ],
    [
      // Montanha da Esquerda Pt2
      new THREE.Vector3(-910, 190, -90),
      new THREE.Vector3(-910, 200, 140),
      new THREE.Vector3(-910, 0, 200),
      new THREE.Vector3(-910, 0, -182),

      new THREE.Vector3(-720, 0, 220),
      new THREE.Vector3(-590, 0, 140),
      new THREE.Vector3(-550, 0, -130),
      new THREE.Vector3(-690, 0, -210),

      new THREE.Vector3(-880, 110, 185),
      new THREE.Vector3(-820, 50, 210),
      new THREE.Vector3(-730, 70, 170),
      new THREE.Vector3(-650, 60, 70),
      new THREE.Vector3(-720, 115, 20),
      new THREE.Vector3(-790, 160, -10),
      new THREE.Vector3(-780, 145, 90),
      new THREE.Vector3(-730, 60, -160),
      new THREE.Vector3(-710, 100, -80),
      new THREE.Vector3(-630, 65, 60),
      new THREE.Vector3(-620, 60, -50),
      new THREE.Vector3(-710, 70, 170),
      new THREE.Vector3(-590, 40, 0),
    ],
    [
      // Montanha da Direita Pt1
      new THREE.Vector3(0, 0, 320),
      new THREE.Vector3(0, 0, -340),
      new THREE.Vector3(-440, 0, 180),
      new THREE.Vector3(-390, 0, -180),
      new THREE.Vector3(-630, 0, -10),

      new THREE.Vector3(0, 350, 190),
      new THREE.Vector3(0, 370, -200),

      new THREE.Vector3(-70, 280, 220),
      new THREE.Vector3(-130, 210, 230),
      new THREE.Vector3(-260, 60, 230),

      new THREE.Vector3(-210, 240, 190),
      new THREE.Vector3(-280, 150, 200),
      new THREE.Vector3(-420, 90, 140),
      new THREE.Vector3(-400, 130, 110),

      new THREE.Vector3(-70, 340, 90),
      new THREE.Vector3(-130, 310, -100),
      new THREE.Vector3(-190, 280, -10),
      new THREE.Vector3(-240, 250, 120),
      new THREE.Vector3(-290, 220, 60),
      new THREE.Vector3(-370, 170, -30),
      new THREE.Vector3(-390, 160, 20),
    ],
    [
      // Montanha da Direita Pt2
      new THREE.Vector3(0, 350, 190),
      new THREE.Vector3(0, 370, -200),

      new THREE.Vector3(0, 0, 320),
      new THREE.Vector3(220, 0, 350),
      new THREE.Vector3(460, 0, 20),

      new THREE.Vector3(0, 0, -340),
      new THREE.Vector3(280, 0, -240),

      new THREE.Vector3(20, 280, 230),
      new THREE.Vector3(60, 100, 310),

      new THREE.Vector3(230, 70, 280),
      new THREE.Vector3(300, 40, 215),
      new THREE.Vector3(270, 100, 190),
      new THREE.Vector3(230, 160, 150),
      new THREE.Vector3(320, 130, 20),
      new THREE.Vector3(260, 180, 70),
      new THREE.Vector3(180, 250, 0),
      new THREE.Vector3(100, 310, 50),

      new THREE.Vector3(300, 70, -150),
      new THREE.Vector3(190, 190, -170),

      new THREE.Vector3(60, 250, -240),
    ],
  ]

  // Criando a geometria ConvexGeometry
  var convexGeometry = new ConvexGeometry(points[index])
  var mountainMat = new THREE.MeshLambertMaterial({ color: mountainColor })

  var object = new THREE.Mesh(convexGeometry, mountainMat)
  object.castShadow = true
  object.matrixAutoUpdate = false
  var mat4 = new THREE.Matrix4()
  object.matrix.multiply(mat4.makeRotationY(degreesToRadians(180)))

  return object
}

export { createMountain }
