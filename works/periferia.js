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

export function createPeriferia(scene, LoadingManager) {
  var textureLoader = new THREE.TextureLoader(LoadingManager)
  var text1 = textureLoader.load('Images/Floor/Sand.jpg')
  var text2 = textureLoader.load('Images/Floor/Text4.jpg')
  var text3 = textureLoader.load('Images/Floor/Jardim.jpg')
  var text4 = textureLoader.load('Images/Floor/Mud.jpeg')

  var plane1Geo = new THREE.PlaneGeometry(1500, 2000)
  var plane1Mat = new THREE.MeshBasicMaterial({ color: 0xffffff })
  var plane1 = new THREE.Mesh(plane1Geo, plane1Mat)
  insertTexture(text1, plane1, 7.5, 10)
  plane1
    .rotateX(degreesToRadians(90))
    .translateX(1070)
    .translateY(700)
    .translateZ(-5)

  scene.add(plane1)

  var plane2Geo = new THREE.PlaneGeometry(1000, 1500)
  var plane2Mat = new THREE.MeshBasicMaterial({ color: 0xffffff })
  var plane2 = new THREE.Mesh(plane2Geo, plane2Mat)
  insertTexture(text2, plane2, 10, 15)
  plane2
    .rotateX(degreesToRadians(90))
    .translateX(3000)
    .translateY(-1300)
    .translateZ(-5)

  scene.add(plane2)

  var plane3Geo = new THREE.PlaneGeometry(1500, 1500)
  var plane3Mat = new THREE.MeshBasicMaterial({ color: 0xffffff })
  var plane3 = new THREE.Mesh(plane3Geo, plane3Mat)
  insertTexture(text3, plane3, 15, 15)
  plane3
    .rotateX(degreesToRadians(90))
    .translateX(1300)
    .translateY(-4000)
    .translateZ(-5)

  scene.add(plane3)

  var plane4Geo = new THREE.PlaneGeometry(1500, 1500) 
  var plane4Mat = new THREE.MeshBasicMaterial({ color: 0xffffff })
  var plane4 = new THREE.Mesh(plane4Geo, plane4Mat)
  insertTexture(text4, plane4, 20, 20)
  plane4
    .rotateX(degreesToRadians(90))
    .translateX(-2610)
    .translateY(-1500)
    .translateZ(-5)

  scene.add(plane4)
}
