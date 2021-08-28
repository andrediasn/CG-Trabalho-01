import * as THREE from '../build/three.module.js'
import Stats from '../build/jsm/libs/stats.module.js'
import { TrackballControls } from '../build/jsm/controls/TrackballControls.js'
import {
  initRenderer,
  initCamera,
  onWindowResize,
} from '../../libs/util/util.js'
import { degreesToRadians, initDefaultBasicLight } from '../libs/util/util.js'
import { ConvexGeometry } from '../build/jsm/geometries/ConvexGeometry.js'

// Texture Loader
var textureLoader = new THREE.TextureLoader()

var brickWall = textureLoader.load('../works/Images/BrickWall.jpeg')
var neoClassicWindow = textureLoader.load(
  '../works/Images/NeoClassicWindow.jpg'
)
var neoClassicWindow2 = textureLoader.load(
  '../works/Images/NeoClassicWindow.jpg'
)
var sideWall = textureLoader.load('../works/Images/SideWall.png')
var glassWindow = textureLoader.load('../works/Images/GlassWindow.jpg')
var glassWindow2 = textureLoader.load('../works/Images/GlassWindow.jpg')
var glassWindow3 = textureLoader.load('../works/Images/GlassWindow.jpg')
var front = textureLoader.load('../works/Images/FrontOfBuilding.jpg')
var window3 = textureLoader.load('../works/Images/OldWindow.jpg')
var sidewall = textureLoader.load('../works/Images/ConcreteSidewall.jpg')
var roofDoor = textureLoader.load('../works/Images/RoofDoor.jpg')
var roofFloor = textureLoader.load('../works/Images/RoofFloor.jpg')
var roofFloor2 = textureLoader.load('../works/Images/RoofFloor.jpg')
var brickRoofTile = textureLoader.load('../works/Images/BrickRoofTile.jpg')
var diagonalRoofMat3 = textureLoader.load(
  '../works/Images/DiagonalRoofWall.jpeg'
)

// Função para inserir a textura no objeto
function insertTexture(texture, object, repeatX, repeatY) {
  object.material.map = texture
  object.material.map.repeat.set(repeatX, repeatY)
  object.material.map.wrapS = THREE.RepeatWrapping
  object.material.map.wrapT = THREE.RepeatWrapping
}

var c = 5 // Constante escalar

// Função que cria modelo do prédio 1
export function createBuilding(modelo) {
  switch (modelo) {
    case 1:
      // Modelo 1
      var faceBotGeo = new THREE.PlaneGeometry(50 * c, 60 * c)
      var faceMidGeo = new THREE.PlaneGeometry(40 * c, 40 * c)
      var faceTopGeo = new THREE.PlaneGeometry(30 * c, 30 * c)
      var roofGeo = new THREE.PlaneGeometry(50 * c, 50 * c)
      var roof2Geo = new THREE.PlaneGeometry(40 * c, 40 * c)
      var roof3Geo = new THREE.PlaneGeometry(30 * c, 30 * c)

      var faceMat = new THREE.MeshBasicMaterial({
        color: 'rgba(255, 255, 255)',
        side: THREE.DoubleSide,
      })
      var face2Mat = new THREE.MeshBasicMaterial({
        color: 'rgba(255, 255, 255)',
        side: THREE.DoubleSide,
      })
      var face3Mat = new THREE.MeshBasicMaterial({
        color: 'rgba(255, 255, 255)',
        side: THREE.DoubleSide,
      })
      var roofMat = new THREE.MeshBasicMaterial({
        color: 0xababab,
        side: THREE.DoubleSide,
      })

      var face1 = new THREE.Mesh(faceBotGeo, faceMat)
      face1
        .rotateX(degreesToRadians(90))
        .translateY(30 * c)
        .rotateY(degreesToRadians(90))
        .translateZ(25 * c)
        .translateX(25 * c)
      insertTexture(glassWindow, face1, 1.5, 1)

      var face2 = new THREE.Mesh(faceBotGeo, faceMat)
      face2
        .rotateY(degreesToRadians(90))
        .translateX(25 * c)
        .translateZ(-25 * c)

      var face3 = new THREE.Mesh(faceBotGeo, faceMat)
      face3
        .rotateY(degreesToRadians(90))
        .translateX(25 * c)
        .translateZ(25 * c)

      var face4 = new THREE.Mesh(faceBotGeo, faceMat)
      face4.translateZ(-50 * c)

      var roof1 = new THREE.Mesh(roofGeo, roofMat)
      roof1
        .rotateX(degreesToRadians(90))
        .translateZ(-30 * c)
        .translateY(-25 * c)

      var faceMid1 = new THREE.Mesh(faceMidGeo, face2Mat)
      faceMid1
        .rotateX(degreesToRadians(90))
        .translateZ(20 * c)
        .translateY(-20 * c)
      insertTexture(glassWindow2, faceMid1, 1.2, 0.7)

      var faceMid2 = new THREE.Mesh(faceMidGeo, face2Mat)
      faceMid2
        .rotateY(degreesToRadians(90))
        .translateX(20 * c)
        .translateZ(-20 * c)

      var faceMid3 = new THREE.Mesh(faceMidGeo, face2Mat)
      faceMid3
        .rotateY(degreesToRadians(90))
        .translateX(20 * c)
        .translateZ(20 * c)

      var faceMid4 = new THREE.Mesh(faceMidGeo, face2Mat)
      faceMid4.translateZ(-40 * c)

      var roof2 = new THREE.Mesh(roof2Geo, roofMat)
      roof2
        .rotateX(degreesToRadians(90))
        .translateZ(20 * c)
        .translateY(-20 * c)

      var faceTop1 = new THREE.Mesh(faceTopGeo, face3Mat)
      faceTop1
        .rotateX(degreesToRadians(90))
        .translateZ(15 * c)
        .translateY(15 * c)
      insertTexture(glassWindow3, faceTop1, 0.9, 0.5)

      var faceTop2 = new THREE.Mesh(faceTopGeo, face3Mat)
      faceTop2
        .rotateY(degreesToRadians(90))
        .translateX(15 * c)
        .translateZ(-15 * c)

      var faceTop3 = new THREE.Mesh(faceTopGeo, face3Mat)
      faceTop3
        .rotateY(degreesToRadians(90))
        .translateX(15 * c)
        .translateZ(15 * c)

      var faceTop4 = new THREE.Mesh(faceTopGeo, face3Mat)
      faceTop4.translateZ(-30 * c)

      var roof3 = new THREE.Mesh(roof3Geo, roofMat)
      roof3
        .rotateX(degreesToRadians(90))
        .translateZ(-15 * c)
        .translateY(-15 * c)

      face1.add(face2)
      face1.add(face3)
      face1.add(face4)
      face1.add(roof1)
      roof1.add(faceMid1)
      faceMid1.add(faceMid2)
      faceMid1.add(faceMid3)
      faceMid1.add(faceMid4)
      faceMid1.add(roof2)
      roof2.add(faceTop1)
      faceTop1.add(faceTop2)
      faceTop1.add(faceTop3)
      faceTop1.add(faceTop4)
      faceTop1.add(roof3)

      return face1
    case 2: {
      // Modelo 2
      var faceTopGeo = new THREE.PlaneGeometry(30 * c, 30 * c)
      var faceBotGeo = new THREE.PlaneGeometry(50 * c, 50 * c)

      var faceMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
      })
      var faceMatPure = new THREE.MeshBasicMaterial({
        color: 0xffffec,
        side: THREE.DoubleSide,
      })

      var face1 = new THREE.Mesh(faceBotGeo, faceMatPure)
      face1
        .rotateX(degreesToRadians(90))
        .translateY(25 * c)
        .rotateY(degreesToRadians(90))
        .translateZ(25 * c)
        .translateX(25 * c)
      insertTexture(sideWall, face1, 3, 3)

      var face2 = new THREE.Mesh(faceBotGeo, faceMat)
      face2
        .rotateY(degreesToRadians(90))
        .translateX(25 * c)
        .translateZ(-25 * c)
      insertTexture(neoClassicWindow, face2, 2, 2)

      var face3 = new THREE.Mesh(faceBotGeo, faceMat)
      face3
        .rotateY(degreesToRadians(90))
        .translateX(25 * c)
        .translateZ(25 * c)

      var face4 = new THREE.Mesh(faceBotGeo, faceMatPure)
      face4.translateZ(-50 * c)

      var face5 = new THREE.Mesh(faceBotGeo, faceMat)
      face5
        .rotateX(degreesToRadians(90))
        .translateZ(-25 * c)
        .translateY(-25 * c)

      var points = [
        new THREE.Vector3(-25 * c, 50 * c, 0.01 * c),
        new THREE.Vector3(-25 * c, 0, 0.01 * c),
        new THREE.Vector3(25 * c, 0, 0.01 * c),
        new THREE.Vector3(25 * c, 50 * c, 0.01 * c),
        new THREE.Vector3(-15 * c, 40 * c, 10 * c),
        new THREE.Vector3(-15 * c, 10 * c, 10 * c),
        new THREE.Vector3(15 * c, 10 * c, 10 * c),
        new THREE.Vector3(15 * c, 40 * c, 10 * c),
      ]
      var convexGeometry = new ConvexGeometry(points)
      var ceilingMat = new THREE.MeshBasicMaterial({ color: 0x212121 })
      var ceiling1 = new THREE.Mesh(convexGeometry, ceilingMat)
      ceiling1.rotateX(degreesToRadians(-90)).translateZ(25 * c)

      var faceTopMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
      })

      var faceTop1 = new THREE.Mesh(faceTopGeo, faceMatPure)
      faceTop1
        .rotateX(degreesToRadians(90))
        .translateY(25 * c)
        .translateZ(-10 * c)

      var faceTop2 = new THREE.Mesh(faceTopGeo, faceTopMat)
      faceTop2
        .rotateY(degreesToRadians(90))
        .translateX(15 * c)
        .translateZ(-15 * c)
      insertTexture(neoClassicWindow2, faceTop2, 1, 1)

      var faceTop3 = new THREE.Mesh(faceTopGeo, faceTopMat)
      faceTop3
        .rotateY(degreesToRadians(90))
        .translateX(15 * c)
        .translateZ(15 * c)

      var faceTop4 = new THREE.Mesh(faceTopGeo, faceMatPure)
      faceTop4.translateZ(-30 * c)

      var faceTop5 = new THREE.Mesh(faceTopGeo, faceTopMat)
      faceTop5
        .rotateX(degreesToRadians(90))
        .translateZ(-15 * c)
        .translateY(-15 * c)

      points = [
        new THREE.Vector3(-15 * c, 40 * c, 0.01 * c),
        new THREE.Vector3(-15 * c, 10 * c, 0.01 * c),
        new THREE.Vector3(15 * c, 10 * c, 0.01 * c),
        new THREE.Vector3(15 * c, 40 * c, 0.01 * c),
        new THREE.Vector3(0, 25 * c, 7 * c),
        new THREE.Vector3(0, 25 * c, 7 * c),
        new THREE.Vector3(0, 25 * c, 7 * c),
        new THREE.Vector3(0, 25 * c, 7 * c),
      ]

      convexGeometry = new ConvexGeometry(points)
      var ceiling2 = new THREE.Mesh(convexGeometry, ceilingMat)
      ceiling2
        .rotateX(degreesToRadians(-90))
        .translateZ(15 * c)
        .translateY(-10 * c)

      face1.add(face2)
      face1.add(face3)
      face1.add(face4)
      face1.add(face5)
      face1.add(ceiling1)
      ceiling1.add(faceTop1)
      faceTop1.add(faceTop2)
      faceTop1.add(faceTop3)
      faceTop1.add(faceTop4)
      faceTop1.add(faceTop5)
      faceTop1.add(ceiling2)

      return face1
    }
    case 3: {
      // Modelo 3
      var faceBotGeo = new THREE.PlaneGeometry(50 * c, 30 * c)
      var faceBotGeo2 = new THREE.PlaneGeometry(40 * c, 30 * c)
      var roof1Geo = new THREE.PlaneGeometry(50 * c, 40 * c)
      var faceRoofGeo = new THREE.PlaneGeometry(15 * c, 30 * c)
      var faceRoofGeo2 = new THREE.PlaneGeometry(15 * c, 20 * c)
      var roofBoxRoofGeo = new THREE.PlaneGeometry(20 * c, 30 * c)
      var diagonalRoofGeo = new THREE.PlaneGeometry(21 * c, 30 * c)
      var diagonalRoofGeo2 = new THREE.PlaneGeometry(21 * c, 28 * c)

      var faceMat = new THREE.MeshBasicMaterial({
        color: 0xffdfef,
        side: THREE.DoubleSide,
      })
      var faceMatPure = new THREE.MeshBasicMaterial({
        color: 0xf3e2d3,
        side: THREE.DoubleSide,
      })
      var faceMidMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
      })
      var faceRoofMat1 = new THREE.MeshBasicMaterial({
        color: 0xdddddd,
        side: THREE.DoubleSide,
      })
      var faceRoofMat2 = new THREE.MeshBasicMaterial({
        color: 0xf7e8b1,
        side: THREE.DoubleSide,
      })
      var roofMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
      })
      var roofMat2 = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
      })
      var roofTileMat = new THREE.MeshBasicMaterial({
        color: 0xafafaf,
        side: THREE.DoubleSide,
      })
      var diagonalRoofMat = new THREE.MeshBasicMaterial({
        color: 0xeec8b8,
        side: THREE.DoubleSide,
      })

      var face1 = new THREE.Mesh(faceBotGeo, faceMatPure)
      face1
        .rotateX(degreesToRadians(90))
        .translateY(15 * c)
        .rotateY(degreesToRadians(90))
        .translateZ(25 * c)
        .translateX(25 * c)
      insertTexture(sidewall, face1, 1.8, 0.8)

      var face2 = new THREE.Mesh(faceBotGeo2, faceMat)
      face2
        .rotateY(degreesToRadians(90))
        .translateX(20 * c)
        .translateZ(-25 * c)
      insertTexture(front, face2, 1, 0.95)

      var face3 = new THREE.Mesh(faceBotGeo2, faceMidMat)
      face3
        .rotateY(degreesToRadians(90))
        .translateX(20 * c)
        .translateZ(25 * c)
      insertTexture(window3, face3, 2, 1)

      var face4 = new THREE.Mesh(faceBotGeo, faceMatPure)
      face4.translateZ(-40 * c)

      var faceMid1 = new THREE.Mesh(faceBotGeo, faceMatPure)
      faceMid1.translateY(30 * c)

      var faceMid2 = new THREE.Mesh(faceBotGeo2, faceMidMat)
      faceMid2
        .rotateY(degreesToRadians(90))
        .translateX(20 * c)
        .translateZ(-25 * c)

      var faceMid3 = new THREE.Mesh(faceBotGeo2, faceMidMat)
      faceMid3
        .rotateY(degreesToRadians(90))
        .translateX(20 * c)
        .translateZ(25 * c)

      var faceMid4 = new THREE.Mesh(faceBotGeo, faceMatPure)
      faceMid4.translateZ(-40 * c)

      var roof1 = new THREE.Mesh(roof1Geo, roofMat)
      roof1
        .rotateX(degreesToRadians(90))
        .translateY(-20 * c)
        .translateZ(-15 * c)
      insertTexture(roofFloor, roof1, 2, 2)

      var faceRoof1 = new THREE.Mesh(faceRoofGeo, faceRoofMat1)
      faceRoof1
        .rotateZ(degreesToRadians(90))
        .rotateY(degreesToRadians(90))
        .translateY(-10 * c)
        .translateX(7.5 * c)

      var faceRoof2 = new THREE.Mesh(faceRoofGeo, faceRoofMat1)
      faceRoof2
        .rotateZ(degreesToRadians(90))
        .rotateY(degreesToRadians(90))
        .translateY(-10 * c)
        .translateX(7.5 * c)
        .translateZ(-20 * c)
      insertTexture(brickWall, faceRoof2, 1, 2)

      var faceRoof3 = new THREE.Mesh(faceRoofGeo2, faceRoofMat2)
      faceRoof3
        .rotateY(degreesToRadians(90))
        .translateZ(-5 * c)
        .translateX(7.5 * c)
        .translateY(-10 * c)
      insertTexture(roofDoor, faceRoof3, 1, 1)

      var faceRoof4 = new THREE.Mesh(faceRoofGeo2, faceRoofMat1)
      faceRoof4
        .rotateY(degreesToRadians(90))
        .translateZ(25 * c)
        .translateX(7.5 * c)
        .translateY(-10 * c)

      var roofBoxRoof = new THREE.Mesh(roofBoxRoofGeo, roofMat2)
      roofBoxRoof
        .rotateZ(degreesToRadians(90))
        .translateX(-10 * c)
        .translateY(-10 * c)
        .translateZ(-15 * c)
      insertTexture(roofFloor2, roofBoxRoof, 1, 1)

      var diagonalRoof = new THREE.Mesh(diagonalRoofGeo, roofTileMat)
      diagonalRoof.translateZ(7.5 * c).rotateY(degreesToRadians(45))
      insertTexture(brickRoofTile, diagonalRoof, 1.5, 2)

      var diagonalRoof2 = new THREE.Mesh(diagonalRoofGeo2, diagonalRoofMat)
      diagonalRoof2
        .rotateX(degreesToRadians(90))
        .translateZ(14 * c)
        .translateY(-14 * c)
      insertTexture(diagonalRoofMat3, diagonalRoof2, 2, 2)

      var diagonalRoof3 = new THREE.Mesh(diagonalRoofGeo2, diagonalRoofMat)
      diagonalRoof3
        .rotateX(degreesToRadians(90))
        .translateZ(-14 * c)
        .translateY(-14 * c)

      face1.add(face2)
      face1.add(face3)
      face1.add(face4)
      face1.add(faceMid1)
      faceMid1.add(faceMid2)
      faceMid1.add(faceMid3)
      faceMid1.add(faceMid4)
      faceMid1.add(roof1)
      roof1.add(roofBoxRoof)
      roof1.add(faceRoof1)
      roof1.add(faceRoof2)
      roof1.add(faceRoof3)
      roof1.add(faceRoof4)
      faceRoof1.add(diagonalRoof)
      diagonalRoof.add(diagonalRoof2)
      diagonalRoof.add(diagonalRoof3)
      return face1
    }
  }
}
