import * as THREE from '../build/three.module.js'
import { degreesToRadians } from '../libs/util/util.js'

// Função para inserir a textura no objeto
function insertTexture(texture, object, repeatX, repeatY) {
  object.material.map = texture
  object.material.map.repeat.set(repeatX, repeatY)
  object.material.map.wrapS = THREE.RepeatWrapping
  object.material.map.wrapT = THREE.RepeatWrapping
  object.material.side = THREE.DoubleSide
}

export function createPeriferia(scene) {
  var textureLoader = new THREE.TextureLoader()
  var text1 = textureLoader.load('Images/Floor/Text1.jpg')
  var text2 = textureLoader.load('Images/Floor/Grass.jpg')
  var text3 = textureLoader.load('Images/Floor/Text3.jpg')
  var text4 = textureLoader.load('Images/Floor/Mud.jpeg')

  var plane1Geo = new THREE.PlaneGeometry(9800, 4200)
  var plane1Mat = new THREE.MeshBasicMaterial({ color: 0xffffff })
  var plane1 = new THREE.Mesh(plane1Geo, plane1Mat)
  insertTexture(text1, plane1, 230, 180)
  plane1
    .rotateX(degreesToRadians(90))
    .translateX(1070)
    .translateY(2650)
    .translateZ(2.8)

  scene.add(plane1)

  var plane2Geo = new THREE.PlaneGeometry(2600, 9800)
  var plane2Mat = new THREE.MeshBasicMaterial({ color: 0xffffff })
  var plane2 = new THREE.Mesh(plane2Geo, plane2Mat)
  insertTexture(text2, plane2, 300, 800)
  plane2.rotateX(degreesToRadians(90)).translateX(4710).translateY(-100)

  scene.add(plane2)

  var plane3Geo = new THREE.PlaneGeometry(2000, 9800)
  var plane3Mat = new THREE.MeshBasicMaterial({ color: 0xffffff })
  var plane3 = new THREE.Mesh(plane3Geo, plane3Mat)
  insertTexture(text3, plane3, 190, 800)
  plane3
    .rotateX(degreesToRadians(90))
    .translateX(4710)
    .translateY(-100)
    .rotateZ(degreesToRadians(90))
    .translateX(-3900)
    .translateY(3800)
    .translateZ(3.9)

  scene.add(plane3)

  var plane4Geo = new THREE.PlaneGeometry(2900, 9800)
  var plane4Mat = new THREE.MeshBasicMaterial({ color: 0xffffff })
  var plane4 = new THREE.Mesh(plane4Geo, plane4Mat)
  insertTexture(text4, plane4, 312, 800)
  plane4.rotateX(degreesToRadians(90)).translateX(-2610).translateY(-100)

  scene.add(plane4)
}
