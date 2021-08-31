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

  var plane1Geo = new THREE.PlaneGeometry(1200, 1000)
  var plane1Mat = new THREE.MeshBasicMaterial({ color: 0xffffff })
  var plane1 = new THREE.Mesh(plane1Geo, plane1Mat)
  insertTexture(text1, plane1, 6, 10)
  plane1
    .rotateX(degreesToRadians(90))
    .translateX(-400)
    .translateY(-3300)
    .translateZ(-4)

  scene.add(plane1)

  var plane2Geo = new THREE.PlaneGeometry(1500, 1000)
  var plane2Mat = new THREE.MeshBasicMaterial({ color: 0xffffff })
  var plane2 = new THREE.Mesh(plane2Geo, plane2Mat)
  insertTexture(text2, plane2, 15, 10)
  plane2
    .rotateX(degreesToRadians(90))
    .translateX(3000)
    .translateY(-3000)
    .translateZ(-4)

  scene.add(plane2)

  var plane3Geo = new THREE.PlaneGeometry(1500, 1500)
  var plane3Mat = new THREE.MeshBasicMaterial({ color: 0xffffff })
  var plane3 = new THREE.Mesh(plane3Geo, plane3Mat)
  insertTexture(text3, plane3, 15, 15)
  plane3
    .rotateX(degreesToRadians(90))
    .translateX(1300)
    .translateY(-4000)
    .translateZ(-4)

  scene.add(plane3)

  var plane4Geo = new THREE.PlaneGeometry(700, 1800) 
  var plane4Mat = new THREE.MeshBasicMaterial({ color: 0xffffff })
  var plane4 = new THREE.Mesh(plane4Geo, plane4Mat)
  insertTexture(text4, plane4, 14, 36)
  plane4
    .rotateX(degreesToRadians(90))
    .translateX(-400)
    .translateY(-1500)
    .translateZ(-4)

  scene.add(plane4)
}
