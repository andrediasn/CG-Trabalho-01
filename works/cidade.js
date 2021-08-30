import * as THREE from '../build/three.module.js'
import { degreesToRadians } from '../libs/util/util.js'
import { ConvexGeometry } from '../build/jsm/geometries/ConvexGeometry.js'

// Função para inserir a textura no objeto
function insertTexture(texture, object, repeatX, repeatY) {
  object.material.map = texture
  object.material.map.repeat.set(repeatX, repeatY)
  object.material.map.wrapS = THREE.RepeatWrapping
  object.material.map.wrapT = THREE.RepeatWrapping
  object.material.side = THREE.DoubleSide
}

var c = 3.2 // Constante escalar

// Função que cria modelo do prédio 1
function createBuilding(modelo, textureLoader) {
  switch (modelo) {
    case 1:
      var glassWindow = textureLoader.load('Images/Predio4/GlassWindow.jpg')
      var glassWindow2 = textureLoader.load('Images/Predio4/GlassWindow.jpg')
      var glassWindow3 = textureLoader.load('Images/Predio4/GlassWindow.jpg')
      var roofTexture = textureLoader.load('Images/Predio4/Teto.jpg')

      var faceBotGeo = new THREE.PlaneGeometry(50 * c, 60 * c)
      var faceMidGeo = new THREE.PlaneGeometry(40 * c, 40 * c)
      var faceTopGeo = new THREE.PlaneGeometry(30 * c, 30 * c)
      var roofGeo = new THREE.PlaneGeometry(50 * c, 50 * c)
      var roof2Geo = new THREE.PlaneGeometry(40 * c, 40 * c)
      var roof3Geo = new THREE.PlaneGeometry(30 * c, 30 * c)
      var cylGeo = new THREE.CylinderGeometry(1 * c, 1 * c, 14 * c, 30, 30)
      var cylGeo2 = new THREE.CylinderGeometry(0.8 * c, 0.2 * c, 10 * c, 28, 28)
      var sphereGeo = new THREE.SphereGeometry(3.5 * c, 50, 50)

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
      var cylMat = new THREE.MeshPhongMaterial({ color: 0x888888 })

      var face1 = new THREE.Mesh(faceBotGeo, faceMat)
      face1.castShadow = true
      face1.receiveShadow = true
      face1
        .rotateX(degreesToRadians(90))
        .translateY(30 * c)
        .rotateY(degreesToRadians(90))
        .translateZ(25 * c)
        .translateX(25 * c)
      insertTexture(glassWindow, face1, 1.5, 1)

      var face2 = new THREE.Mesh(faceBotGeo, faceMat)
      face2.castShadow = true
      face2.receiveShadow = true
      face2
        .rotateY(degreesToRadians(90))
        .translateX(25 * c)
        .translateZ(-25 * c)

      var face3 = new THREE.Mesh(faceBotGeo, faceMat)
      face3.castShadow = true
      face3.receiveShadow = true
      face3
        .rotateY(degreesToRadians(90))
        .translateX(25 * c)
        .translateZ(25 * c)

      var face4 = new THREE.Mesh(faceBotGeo, faceMat)
      face4.castShadow = true
      face4.receiveShadow = true
      face4.translateZ(-50 * c)

      var roof1 = new THREE.Mesh(roofGeo, roofMat)
      roof1
        .rotateX(degreesToRadians(90))
        .translateZ(-30 * c)
        .translateY(-25 * c)
      insertTexture(roofTexture, roof1, 2, 2)

      var faceMid1 = new THREE.Mesh(faceMidGeo, face2Mat)
      faceMid1.castShadow = true
      faceMid1.receiveShadow = true
      faceMid1
        .rotateX(degreesToRadians(90))
        .translateZ(20 * c)
        .translateY(-20 * c)
      insertTexture(glassWindow2, faceMid1, 1.2, 0.7)

      var faceMid2 = new THREE.Mesh(faceMidGeo, face2Mat)
      faceMid2.castShadow = true
      faceMid2.receiveShadow = true
      faceMid2
        .rotateY(degreesToRadians(90))
        .translateX(20 * c)
        .translateZ(-20 * c)

      var faceMid3 = new THREE.Mesh(faceMidGeo, face2Mat)
      faceMid3.castShadow = true
      faceMid3.receiveShadow = true
      faceMid3
        .rotateY(degreesToRadians(90))
        .translateX(20 * c)
        .translateZ(20 * c)

      var faceMid4 = new THREE.Mesh(faceMidGeo, face2Mat)
      faceMid4.castShadow = true
      faceMid4.receiveShadow = true
      faceMid4.translateZ(-40 * c)

      var roof2 = new THREE.Mesh(roof2Geo, roofMat)
      roof2
        .rotateX(degreesToRadians(90))
        .translateZ(20 * c)
        .translateY(-20 * c)

      var faceTop1 = new THREE.Mesh(faceTopGeo, face3Mat)
      faceTop1.castShadow = true
      faceTop1.receiveShadow = true
      faceTop1
        .rotateX(degreesToRadians(90))
        .translateZ(15 * c)
        .translateY(15 * c)
      insertTexture(glassWindow3, faceTop1, 0.9, 0.5)

      var faceTop2 = new THREE.Mesh(faceTopGeo, face3Mat)
      faceTop2.castShadow = true
      faceTop2.receiveShadow = true
      faceTop2
        .rotateY(degreesToRadians(90))
        .translateX(15 * c)
        .translateZ(-15 * c)

      var faceTop3 = new THREE.Mesh(faceTopGeo, face3Mat)
      faceTop3.castShadow = true
      faceTop3.receiveShadow = true
      faceTop3
        .rotateY(degreesToRadians(90))
        .translateX(15 * c)
        .translateZ(15 * c)

      var faceTop4 = new THREE.Mesh(faceTopGeo, face3Mat)
      faceTop4.castShadow = true
      faceTop4.receiveShadow = true
      faceTop4.translateZ(-30 * c)

      var roof3 = new THREE.Mesh(roof3Geo, roofMat)
      roof3
        .rotateX(degreesToRadians(90))
        .translateZ(-15 * c)
        .translateY(-15 * c)

      var cyl1 = new THREE.Mesh(cylGeo, cylMat)
      cyl1
        .rotateZ(degreesToRadians(45))
        .translateY(8 * c)
        .translateZ(1 * c)
        .rotateX(degreesToRadians(45))
      var cyl2 = new THREE.Mesh(cylGeo, cylMat)
      cyl2
        .rotateZ(degreesToRadians(135))
        .translateY(8 * c)
        .translateZ(1 * c)
        .rotateX(degreesToRadians(45))
      var cyl3 = new THREE.Mesh(cylGeo, cylMat)
      cyl3
        .rotateZ(degreesToRadians(90))
        .translateZ(5 * c)
        .rotateX(-45)
        .translateZ(-5 * c)

      var sphere = new THREE.Mesh(sphereGeo, cylMat)
      sphere.translateZ(1.6 * c).translateY(8 * c)

      var cyl4 = new THREE.Mesh(cylGeo2, cylMat)
      cyl4
        .translateZ(-10 * c)
        .translateX(-1.2 * c)
        .rotateX(degreesToRadians(90))

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
      roof3.add(cyl1)
      roof3.add(cyl2)
      roof3.add(cyl3)
      cyl3.add(sphere)
      roof3.add(cyl4)

      return face1
    case 2: {
      var sideWall = textureLoader.load('Images/Predio5/SideWall.png')
      var window = textureLoader.load('Images/Predio5/window.jpg')
      var window2 = textureLoader.load('Images/Predio5/window.jpg')

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
      face1.castShadow = true
      face1.receiveShadow = true
      face1
        .rotateX(degreesToRadians(90))
        .translateY(25 * c)
        .rotateY(degreesToRadians(90))
        .translateZ(25 * c)
        .translateX(25 * c)
      insertTexture(sideWall, face1, 3, 3)

      var face2 = new THREE.Mesh(faceBotGeo, faceMat)
      face2.castShadow = true
      face2.receiveShadow = true
      face2
        .rotateY(degreesToRadians(90))
        .translateX(25 * c)
        .translateZ(-25 * c)
      insertTexture(window, face2, 3, 3)

      var face3 = new THREE.Mesh(faceBotGeo, faceMat)
      face3.castShadow = true
      face3.receiveShadow = true
      face3
        .rotateY(degreesToRadians(90))
        .translateX(25 * c)
        .translateZ(25 * c)

      var face4 = new THREE.Mesh(faceBotGeo, faceMatPure)
      face4.castShadow = true
      face4.receiveShadow = true
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
      ceiling1.castShadow = true
      ceiling1.receiveShadow = true
      ceiling1.rotateX(degreesToRadians(-90)).translateZ(25 * c)

      var faceTopMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
      })

      var faceTop1 = new THREE.Mesh(faceTopGeo, faceMatPure)
      faceTop1.castShadow = true
      faceTop1.receiveShadow = true
      faceTop1
        .rotateX(degreesToRadians(90))
        .translateY(25 * c)
        .translateZ(-10 * c)

      var faceTop2 = new THREE.Mesh(faceTopGeo, faceTopMat)
      faceTop2.castShadow = true
      faceTop2.receiveShadow = true
      faceTop2
        .rotateY(degreesToRadians(90))
        .translateX(15 * c)
        .translateZ(-15 * c)
      insertTexture(window2, faceTop2, 2, 2)

      var faceTop3 = new THREE.Mesh(faceTopGeo, faceTopMat)
      faceTop3.castShadow = true
      faceTop3.receiveShadow = true
      faceTop3
        .rotateY(degreesToRadians(90))
        .translateX(15 * c)
        .translateZ(15 * c)

      var faceTop4 = new THREE.Mesh(faceTopGeo, faceMatPure)
      faceTop4.castShadow = true
      faceTop4.receiveShadow = true
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
      ceiling2.castShadow = true
      ceiling2.receiveShadow = true
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
      var brickWall = textureLoader.load('Images/Predio6/BrickWall.jpeg')
      var window3 = textureLoader.load('Images/Predio6/OldWindow.jpg')
      var sidewall = textureLoader.load('Images/Predio6/ConcreteSidewall.jpg')
      var roofDoor = textureLoader.load('Images/Predio6/RoofDoor.jpg')
      var roofFloor = textureLoader.load('Images/Predio6/RoofFloor.jpg')
      var roofFloor2 = textureLoader.load('Images/Predio6/RoofFloor.jpg')
      var brickRoofTile = textureLoader.load('Images/Predio6/BrickRoofTile.jpg')
      var diagonalRoofMat3 = textureLoader.load(
        'Images/Predio6/DiagonalRoofWall.jpeg'
      )

      var faceBotGeo = new THREE.PlaneGeometry(50 * c, 30 * c)
      var faceBotGeo2 = new THREE.PlaneGeometry(40 * c, 30 * c)
      var roof1Geo = new THREE.PlaneGeometry(50 * c, 40 * c)
      var faceRoofGeo = new THREE.PlaneGeometry(15 * c, 30 * c)
      var faceRoofGeo2 = new THREE.PlaneGeometry(15 * c, 20 * c)
      var roofBoxRoofGeo = new THREE.PlaneGeometry(20 * c, 30 * c)
      var diagonalRoofGeo = new THREE.PlaneGeometry(21 * c, 30 * c)
      var diagonalRoofGeo2 = new THREE.PlaneGeometry(21 * c, 28 * c)

      var faceMat = new THREE.MeshBasicMaterial({
        color: 0xeecaba,
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
      face1.castShadow = true
      face1.receiveShadow = true
      face1
        .rotateX(degreesToRadians(90))
        .translateY(15 * c)
        .rotateY(degreesToRadians(90))
        .translateZ(25 * c)
        .translateX(25 * c)
      insertTexture(sidewall, face1, 1.8, 0.8)

      var face2 = new THREE.Mesh(faceBotGeo2, faceMidMat)
      face2.castShadow = true
      face2.receiveShadow = true
      face2
        .rotateY(degreesToRadians(90))
        .translateX(20 * c)
        .translateZ(-25 * c)
      insertTexture(window3, face2, 3, 1)

      var face3 = new THREE.Mesh(faceBotGeo2, faceMidMat)
      face3.castShadow = true
      face3.receiveShadow = true
      face3
        .rotateY(degreesToRadians(90))
        .translateX(20 * c)
        .translateZ(25 * c)
      insertTexture(window3, face3, 3, 2)

      var face4 = new THREE.Mesh(faceBotGeo, faceMatPure)
      face4.castShadow = true
      face4.receiveShadow = true
      face4.translateZ(-40 * c)

      var faceMid1 = new THREE.Mesh(faceBotGeo, faceMatPure)
      faceMid1.castShadow = true
      faceMid1.receiveShadow = true
      faceMid1.translateY(30 * c)

      var faceMid2 = new THREE.Mesh(faceBotGeo2, faceMidMat)
      faceMid2.castShadow = true
      faceMid2.receiveShadow = true
      faceMid2
        .rotateY(degreesToRadians(90))
        .translateX(20 * c)
        .translateZ(-25 * c)

      var faceMid3 = new THREE.Mesh(faceBotGeo2, faceMidMat)
      faceMid3.castShadow = true
      faceMid3.receiveShadow = true
      faceMid3
        .rotateY(degreesToRadians(90))
        .translateX(20 * c)
        .translateZ(25 * c)

      var faceMid4 = new THREE.Mesh(faceBotGeo, faceMatPure)
      faceMid4.castShadow = true
      faceMid4.receiveShadow = true
      faceMid4.translateZ(-40 * c)

      var roof1 = new THREE.Mesh(roof1Geo, roofMat)
      roof1
        .rotateX(degreesToRadians(90))
        .translateY(-20 * c)
        .translateZ(-15 * c)
      insertTexture(roofFloor, roof1, 2, 2)

      var faceRoof1 = new THREE.Mesh(faceRoofGeo, faceRoofMat1)
      faceRoof1.castShadow = true
      faceRoof1.receiveShadow = true
      faceRoof1
        .rotateZ(degreesToRadians(90))
        .rotateY(degreesToRadians(90))
        .translateY(-10 * c)
        .translateX(7.5 * c)

      var faceRoof2 = new THREE.Mesh(faceRoofGeo, faceRoofMat1)
      faceRoof2.castShadow = true
      faceRoof2.receiveShadow = true
      faceRoof2
        .rotateZ(degreesToRadians(90))
        .rotateY(degreesToRadians(90))
        .translateY(-10 * c)
        .translateX(7.5 * c)
        .translateZ(-20 * c)
      insertTexture(brickWall, faceRoof2, 1, 2)

      var faceRoof3 = new THREE.Mesh(faceRoofGeo2, faceRoofMat2)
      faceRoof3.castShadow = true
      faceRoof3.receiveShadow = true
      faceRoof3
        .rotateY(degreesToRadians(90))
        .translateZ(-5 * c)
        .translateX(7.5 * c)
        .translateY(-10 * c)
      insertTexture(roofDoor, faceRoof3, 1, 1)

      var faceRoof4 = new THREE.Mesh(faceRoofGeo2, faceRoofMat1)
      faceRoof4.castShadow = true
      faceRoof4.receiveShadow = true
      faceRoof4
        .rotateY(degreesToRadians(90))
        .translateZ(25 * c)
        .translateX(7.5 * c)
        .translateY(-10 * c)

      var roofBoxRoof = new THREE.Mesh(roofBoxRoofGeo, roofMat2)
      roofBoxRoof.castShadow = true
      roofBoxRoof.receiveShadow = true
      roofBoxRoof
        .rotateZ(degreesToRadians(90))
        .translateX(-10 * c)
        .translateY(-10 * c)
        .translateZ(-15 * c)
      insertTexture(roofFloor2, roofBoxRoof, 1, 1)

      var diagonalRoof = new THREE.Mesh(diagonalRoofGeo, roofTileMat)
      diagonalRoof.castShadow = true
      diagonalRoof.receiveShadow = true
      diagonalRoof.translateZ(7.5 * c).rotateY(degreesToRadians(45))
      insertTexture(brickRoofTile, diagonalRoof, 1.5, 2)

      var diagonalRoof2 = new THREE.Mesh(diagonalRoofGeo2, diagonalRoofMat)
      diagonalRoof2.castShadow = true
      diagonalRoof2.receiveShadow = true
      diagonalRoof2
        .rotateX(degreesToRadians(90))
        .translateZ(14 * c)
        .translateY(-14 * c)
      insertTexture(diagonalRoofMat3, diagonalRoof2, 2, 2)

      var diagonalRoof3 = new THREE.Mesh(diagonalRoofGeo2, diagonalRoofMat)
      diagonalRoof3.castShadow = true
      diagonalRoof3.receiveShadow = true
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

function createBuilding2(modelo, textureLoader) {
  var m = 192
  var n = 128
  var geoHolder = new THREE.PlaneGeometry(10, 10, 10, 10)
  var matHolder = new THREE.MeshPhongMaterial({ opacity: 0, transparent: true })
  switch (modelo) {
    case 1: {
      var predio1 = new THREE.Mesh(geoHolder, matHolder)
      predio1.castShadow = true
      predio1.receiveShadow = true
      predio1.translateY(0.5 * m)

      var p1Text3 = textureLoader.load('Images/Predio1/Janelas.jpg')
      var p1bk = new THREE.Mesh(new THREE.PlaneGeometry(1 * m, 2 * m))
      p1bk.castShadow = true
      p1bk.receiveShadow = true
      p1bk.translateY(0.5 * m).rotateY(degreesToRadians(180))
      insertTexture(p1Text3, p1bk, 1, 3)

      var p1Text1 = textureLoader.load('Images/Predio1/Janelas.jpg')
      var p1ft = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.5 * m,
          0.5 * m,
          1 * m,
          60,
          60,
          true,
          1.97,
          3.04
        )
      )
      p1ft.castShadow = true
      p1ft.receiveShadow = true
      p1ft.translateZ(0.47 * m).rotateY(degreesToRadians(160))
      insertTexture(p1Text1, p1ft, 1, 1.5)

      var p1Text4 = textureLoader.load('Images/Predio1/Janelas.jpg')
      var p1ft2 = new THREE.Mesh(new THREE.PlaneGeometry(1 * m, 1 * m))
      p1ft2.castShadow = true
      p1ft2.receiveShadow = true
      p1ft2.translateY(m).translateZ(0.5 * m)
      insertTexture(p1Text4, p1ft2, 1, 1.5)

      var p1Text2 = textureLoader.load('Images/Predio1/Tijolos2.jpg')
      var p1lf = new THREE.Mesh(new THREE.PlaneGeometry(0.5 * m, 2 * m))
      p1lf.castShadow = true
      p1lf.receiveShadow = true
      p1lf
        .rotateY(degreesToRadians(90))
        .translateZ(0.5 * m)
        .translateX(-0.25 * m)
        .translateY(0.5 * m)
      insertTexture(p1Text2, p1lf, 3, 10)

      var p1rt = new THREE.Mesh(new THREE.PlaneGeometry(0.5 * m, 2 * m))
      p1rt.castShadow = true
      p1rt.receiveShadow = true
      p1rt
        .rotateY(degreesToRadians(-90))
        .translateZ(0.5 * m)
        .translateX(0.25 * m)
        .translateY(0.5 * m)
      insertTexture(p1Text2, p1rt, 3, 10)

      var p1Text5 = textureLoader.load('Images/Predio1/Concreto2.jpg')
      var p1up1 = new THREE.Mesh(new THREE.PlaneGeometry(1 * m, 0.5 * m))
      p1up1.castShadow = true
      p1up1.receiveShadow = true
      p1up1
        .rotateX(degreesToRadians(-90))
        .translateZ(1.5 * m)
        .translateY(-0.25 * m)
      insertTexture(p1Text5, p1up1, 6, 3)

      var p1Text6 = textureLoader.load('Images/Predio1/Concreto3.jpg')
      var p1up2 = new THREE.Mesh(
        new THREE.CircleGeometry(0.5 * m, 90, 3.15, 3.1)
      )
      p1up2.castShadow = true
      p1up2.receiveShadow = true
      p1up2
        .rotateX(degreesToRadians(-90))
        .translateZ(0.5 * m)
        .translateY(-0.47 * m)
      insertTexture(p1Text6, p1up2, 3, 3)

      predio1
        .add(p1bk)
        .add(p1ft)
        .add(p1ft2)
        .add(p1lf)
        .add(p1rt)
        .add(p1up1)
        .add(p1up2)

      return predio1
    }
    case 2: {
      var predio2 = new THREE.Mesh(geoHolder, matHolder)
      predio2.castShadow = true
      predio2.receiveShadow = true
      predio2.translateY(1 * n)

      var p2Text1 = textureLoader.load('Images/Predio2/Tijolos.jpg')
      var p2rt = new THREE.Mesh(new THREE.PlaneGeometry(1 * n, 2 * n))
      p2rt.castShadow = true
      p2rt.receiveShadow = true
      p2rt.translateX(1 * n).rotateY(degreesToRadians(90))
      insertTexture(p2Text1, p2rt, 4, 5)
      var p2lf = new THREE.Mesh(new THREE.PlaneGeometry(1 * n, 2 * n))
      p2lf.castShadow = true
      p2lf.receiveShadow = true
      p2lf.translateX(-1 * n).rotateY(degreesToRadians(-90))
      insertTexture(p2Text1, p2lf, 4, 5)

      var p2Text2 = textureLoader.load('Images/Predio2/Janelas1.jpg')
      var p2bk = new THREE.Mesh(new THREE.PlaneGeometry(2 * n, 2 * n))
      p2bk.castShadow = true
      p2bk.receiveShadow = true
      p2bk.translateZ(-0.5 * n).rotateY(degreesToRadians(180))
      insertTexture(p2Text2, p2bk, 4, 3)

      var p2Text3 = textureLoader.load('Images/Predio2/Janelas.jpg')
      var p2ft1lf = new THREE.Mesh(new THREE.PlaneGeometry(0.5 * n, 2 * n))
      p2ft1lf.castShadow = true
      p2ft1lf.receiveShadow = true
      p2ft1lf
        .translateX(-0.75 * n)
        .translateZ(-1 * n)
        .rotateY(degreesToRadians(180))
      insertTexture(p2Text3, p2ft1lf, 1, 5)
      var p2ft1rt = new THREE.Mesh(new THREE.PlaneGeometry(0.5 * n, 2 * n))
      p2ft1rt.castShadow = true
      p2ft1rt.receiveShadow = true
      p2ft1rt
        .translateX(0.75 * n)
        .translateZ(-1 * n)
        .rotateY(degreesToRadians(180))
      insertTexture(p2Text3, p2ft1rt, 1, 5)

      var p2Text4 = textureLoader.load('Images/Predio2/Janelas1.jpg')
      var p2ft2 = new THREE.Mesh(new THREE.PlaneGeometry(1 * n, 2 * n))
      p2ft2.castShadow = true
      p2ft2.receiveShadow = true
      p2ft2
        .translateZ(0.25 * n)
        .translateZ(-1 * n)
        .rotateY(degreesToRadians(180))
      insertTexture(p2Text4, p2ft2, 2, 4)

      var p2Text5 = textureLoader.load('Images/Predio2/Tijolos.jpg')
      var p2ft3lf = new THREE.Mesh(new THREE.PlaneGeometry(0.25 * n, 2 * n))
      p2ft3lf.castShadow = true
      p2ft3lf.receiveShadow = true
      p2ft3lf
        .rotateY(degreesToRadians(-90))
        .translateX(-0.875 * n)
        .translateZ(-0.5 * n)
      insertTexture(p2Text5, p2ft3lf, 1, 5)
      var p2ft3rt = new THREE.Mesh(new THREE.PlaneGeometry(0.25 * n, 2 * n))
      p2ft3rt.castShadow = true
      p2ft3rt.receiveShadow = true
      p2ft3rt
        .rotateY(degreesToRadians(90))
        .translateX(0.875 * n)
        .translateZ(-0.5 * n)
      insertTexture(p2Text5, p2ft3rt, 1, 5)

      var p2Text6 = textureLoader.load('Images/Predio2/Teto.jpg')
      var p2up = new THREE.Mesh(new THREE.PlaneGeometry(0.75 * n, 2 * n))
      p2up.castShadow = true
      p2up.receiveShadow = true
      p2up
        .rotateZ(degreesToRadians(90))
        .rotateY(degreesToRadians(90))
        .translateZ(1 * n)
        .translateX(0.125 * n)
      insertTexture(p2Text6, p2up, 10, 16)
      var p2Text7 = textureLoader.load('Images/Predio2/Teto.jpg')
      var p2up2 = new THREE.Mesh(new THREE.PlaneGeometry(0.25 * n, 0.5 * n))
      p2up2.castShadow = true
      p2up2.receiveShadow = true
      p2up2
        .rotateZ(degreesToRadians(90))
        .rotateY(degreesToRadians(90))
        .translateZ(1 * n)
        .translateX(-0.375 * n)
        .translateY(-0.75 * n)
      insertTexture(p2Text7, p2up2, 4, 4)
      var p2up3 = new THREE.Mesh(new THREE.PlaneGeometry(0.25 * n, 0.5 * n))
      p2up3.castShadow = true
      p2up3.receiveShadow = true
      p2up3
        .rotateZ(degreesToRadians(90))
        .rotateY(degreesToRadians(90))
        .translateZ(1 * n)
        .translateX(-0.375 * n)
        .translateY(0.75 * n)
      insertTexture(p2Text7, p2up3, 4, 4)

      var p2Text8 = textureLoader.load('Images/Predio2/door.jpg')
      var p2ft4 = new THREE.Mesh(new THREE.PlaneGeometry(1 * n, 0.2 * n))
      p2ft4.castShadow = true
      p2ft4.receiveShadow = true
      p2ft4
        .translateY(-0.9 * n)
        .translateZ(-0.76 * n)
        .rotateY(degreesToRadians(180))
      insertTexture(p2Text8, p2ft4, 4, 1)

      predio2.add(p2rt).add(p2lf).add(p2up2).add(p2up3).add(p2up).add(p2bk) // Sides + Back + up
      p2bk
        .add(p2ft1lf)
        .add(p2ft1rt)
        .add(p2ft2)
        .add(p2ft3lf)
        .add(p2ft3rt)
        .add(p2ft4) // Front

      return predio2
    }
    case 3: {
      var predio3 = new THREE.Mesh(geoHolder, matHolder)
      predio3.translateY(m)

      var p3Text = textureLoader.load('Images/Predio3/Janelas2.jpg')
      var p3ft1 = new THREE.Mesh(new THREE.PlaneGeometry(0.5 * m, 2 * m))
      p3ft1.castShadow = true
      p3ft1.receiveShadow = true
      p3ft1.translateX(-0.5 * m).translateZ(0.5 * m)
      insertTexture(p3Text, p3ft1, 1, 7)
      var p3ft2 = new THREE.Mesh(new THREE.PlaneGeometry(0.5 * m, 2 * m))
      p3ft2.castShadow = true
      p3ft2.receiveShadow = true
      p3ft2.translateX(0.5 * m).translateZ(0.5 * m)
      insertTexture(p3Text, p3ft2, 1, 7)

      var p3bk1 = new THREE.Mesh(new THREE.PlaneGeometry(0.5 * m, 2 * m))
      p3bk1.castShadow = true
      p3bk1.receiveShadow = true
      p3bk1.translateX(-0.5 * m).translateZ(-0.5 * m)
      insertTexture(p3Text, p3bk1, 1, 7)
      var p3bk2 = new THREE.Mesh(new THREE.PlaneGeometry(0.5 * m, 2 * m))
      p3bk2.castShadow = true
      p3bk2.receiveShadow = true
      p3bk2.translateX(0.5 * m).translateZ(-0.5 * m)
      insertTexture(p3Text, p3bk2, 1, 5)

      var p3Text2 = textureLoader.load('Images/Predio3/Janelas3.jpg')
      var p3lf1 = new THREE.Mesh(new THREE.PlaneGeometry(m, 2 * m))
      p3lf1.castShadow = true
      p3lf1.receiveShadow = true
      p3lf1.translateX(-0.75 * m).rotateY(degreesToRadians(90))
      insertTexture(p3Text2, p3lf1, 2, 7)
      var p3lf2 = new THREE.Mesh(new THREE.PlaneGeometry(m, 2 * m))
      p3lf2.castShadow = true
      p3lf2.receiveShadow = true
      p3lf2.translateX(-0.25 * m).rotateY(degreesToRadians(90))
      insertTexture(p3Text2, p3lf2, 2, 7)
      var p3rt1 = new THREE.Mesh(new THREE.PlaneGeometry(m, 2 * m))
      p3rt1.castShadow = true
      p3rt1.receiveShadow = true
      p3rt1.translateX(0.75 * m).rotateY(degreesToRadians(90))
      insertTexture(p3Text2, p3rt1, 2, 7)
      var p3rt2 = new THREE.Mesh(new THREE.PlaneGeometry(m, 2 * m))
      p3rt2.castShadow = true
      p3rt2.receiveShadow = true
      p3rt2.translateX(0.25 * m).rotateY(degreesToRadians(90))
      insertTexture(p3Text2, p3rt2, 1, 2)

      var p3Text3 = textureLoader.load('Images/Predio3/Concreto.jpg')
      var p3up1 = new THREE.Mesh(new THREE.PlaneGeometry(0.5 * m, m))
      p3up1.castShadow = true
      p3up1.receiveShadow = true
      p3up1
        .rotateX(degreesToRadians(-90))
        .translateZ(m)
        .translateX(-0.5 * m)
      insertTexture(p3Text3, p3up1, 1, 1)
      var p3up2 = new THREE.Mesh(new THREE.PlaneGeometry(0.5 * m, m))
      p3up2.castShadow = true
      p3up2.receiveShadow = true
      p3up2
        .rotateX(degreesToRadians(-90))
        .translateZ(m)
        .translateX(0.5 * m)
      insertTexture(p3Text3, p3up2, 2, 4)

      var p3Text4 = textureLoader.load('Images/Predio3/Janelas4.jpg')
      var p3c1ft = new THREE.Mesh(new THREE.PlaneGeometry(0.5 * m, 0.25 * m))
      p3c1ft.castShadow = true
      p3c1ft.receiveShadow = true
      p3c1ft.translateZ(0.2 * m).translateY(-0.5 * m)
      insertTexture(p3Text4, p3c1ft, 1, 1)
      var p3c1bk = new THREE.Mesh(new THREE.PlaneGeometry(0.5 * m, 0.25 * m))
      p3c1bk.castShadow = true
      p3c1bk.receiveShadow = true
      p3c1bk.translateZ(-0.2 * m).translateY(-0.5 * m)
      insertTexture(p3Text4, p3c1bk, 1, 1)

      var p3Text5 = textureLoader.load('Images/Predio3/Janelas5.jpg')
      var p3c1up = new THREE.Mesh(new THREE.PlaneGeometry(0.5 * m, 0.4 * m))
      p3c1up.castShadow = true
      p3c1up.receiveShadow = true
      p3c1up.translateY(-0.375 * m).rotateX(degreesToRadians(-90))
      insertTexture(p3Text5, p3c1up, 1, 1)
      var p3Text6 = textureLoader.load('Images/Predio3/Tijolos.jpg')
      var p3c1dn = new THREE.Mesh(new THREE.PlaneGeometry(0.5 * m, 0.4 * m))
      p3c1dn.castShadow = true
      p3c1dn.receiveShadow = true
      p3c1dn.translateY(-0.625 * m).rotateX(degreesToRadians(90))
      insertTexture(p3Text6, p3c1dn, 5, 5)

      var p3c2ft = new THREE.Mesh(new THREE.PlaneGeometry(0.5 * m, 0.25 * m))
      p3c2ft.castShadow = true
      p3c2ft.receiveShadow = true
      p3c2ft.translateZ(0.2 * m).translateY(0.5 * m)
      insertTexture(p3Text4, p3c2ft, 1, 1)
      var p3c2bk = new THREE.Mesh(new THREE.PlaneGeometry(0.5 * m, 0.25 * m))
      p3c2bk.castShadow = true
      p3c2bk.receiveShadow = true
      p3c2bk.translateZ(-0.2 * m).translateY(0.5 * m)
      insertTexture(p3Text4, p3c2bk, 1, 1)

      var p3c2up = new THREE.Mesh(new THREE.PlaneGeometry(0.5 * m, 0.4 * m))
      p3c2up.castShadow = true
      p3c2up.receiveShadow = true
      p3c2up.translateY(0.625 * m).rotateX(degreesToRadians(-90))
      insertTexture(p3Text5, p3c2up, 1, 1)
      var p3c2dn = new THREE.Mesh(new THREE.PlaneGeometry(0.5 * m, 0.4 * m))
      p3c2dn.castShadow = true
      p3c2dn.receiveShadow = true
      p3c2dn.translateY(0.375 * m).rotateX(degreesToRadians(90))
      insertTexture(p3Text6, p3c2dn, 5, 5)

      predio3
        .add(p3ft1)
        .add(p3ft2)
        .add(p3bk1)
        .add(p3bk2)
        .add(p3lf1)
        .add(p3lf2)
        .add(p3rt1)
        .add(p3rt2)
        .add(p3up1)
        .add(p3up2)
        .add(p3c1ft)
        .add(p3c1bk)
        .add(p3c1up)
        .add(p3c1dn)
        .add(p3c2ft)
        .add(p3c2bk)
        .add(p3c2up)
        .add(p3c2dn)

      return predio3
    }
  }
}

var t = 100 // tamanho da rua 1x1

function createStreet(modelo, textureLoader) {
  switch (modelo) {
    case 1: {
      var streetText = textureLoader.load('Images/Floor/street1.jpg')
      var street = new THREE.Mesh(new THREE.PlaneGeometry(t, t))
      insertTexture(streetText, street, 1, 1)
      return street
    }
    case 2: {
      var crossText = textureLoader.load('Images/Floor/Cross3.jpg')
      var cross = new THREE.Mesh(new THREE.PlaneGeometry(t, t / 5))
      insertTexture(crossText, cross, 1, 1)
      return cross
    }
    case 3: {
      var crossText = textureLoader.load('Images/Floor/Cross1.jpg')
      var cross = new THREE.Mesh(new THREE.PlaneGeometry(t, t))
      insertTexture(crossText, cross, 1, 1)
      return cross
    }
    case 4: {
      var crossText = textureLoader.load('Images/Floor/Cross2.jpg')
      var cross = new THREE.Mesh(new THREE.PlaneGeometry(t, t))
      insertTexture(crossText, cross, 1, 1)
      return cross
    }
    case 5:{
      var pisoText = textureLoader.load('Images/Floor/Piso.jpg')
      var piso = new THREE.Mesh(new THREE.PlaneGeometry(t*5, t*5))
      insertTexture(pisoText, piso, 20, 20)
      return piso
    }
    case 6:{
      var pisoText = textureLoader.load('Images/Floor/Piso.jpg')
      var piso = new THREE.Mesh(new THREE.PlaneGeometry(t*11, t*5))
      insertTexture(pisoText, piso, 40, 20)
      return piso
    }
  }
}

export function createCity(scene, LoadingManager) {
  var textureLoader = new THREE.TextureLoader(LoadingManager)

  // Criando predios
  var predio1 = new Array(5)
  var predio2 = new Array(5)
  var predio3 = new Array(5)
  var predio4 = new Array(5)
  var predio5 = new Array(5)
  var predio6 = new Array(5)

  for (var i = 0; i < 5; i++) {
    predio1[i] = createBuilding2(1, textureLoader)
    predio2[i] = createBuilding2(2, textureLoader)
    predio3[i] = createBuilding2(3, textureLoader)
    predio4[i] = createBuilding(1, textureLoader)
    predio5[i] = createBuilding(2, textureLoader)
    predio6[i] = createBuilding(3, textureLoader)
    scene.add(predio1[i])
    scene.add(predio2[i])
    scene.add(predio3[i])
    scene.add(predio4[i])
    scene.add(predio5[i])
    scene.add(predio6[i])
  }

  // Posições para os blocos da cidade
  var posA = [2000, 0, -2500]

  // Posicionando Predios
  predio1[0]
    .translateZ(posA[2] + 260)
    .translateX(posA[0] - 100)
    .rotateY(degreesToRadians(180))

  predio2[0]
    .translateZ(posA[2] + 150)
    .translateX(posA[0] - 350)
    .rotateY(degreesToRadians(180))

  predio3[0].translateZ(posA[2] + 450).translateX(posA[0] - 290)

  predio4[0]
    .translateZ(posA[0] - 700)
    .translateY(posA[2] + 50)
    .translateX(15)
    .rotateZ(degreesToRadians(-90))

  predio5[0]
    .translateZ(posA[0] - 700)
    .translateY(posA[2] + 370)
    .rotateZ(degreesToRadians(-90))

  predio6[0]
    .translateZ(posA[0] - 700)
    .translateY(posA[2] + 700)
    .translateX(-50)
    .rotateZ(degreesToRadians(-90))

  predio3[1].translateZ(posA[2] + 760).translateX(posA[0] - 350)

  predio4[1]
    .translateZ(posA[0] - 100)
    .translateY(posA[2] + 640)
    .translateX(15)
    .rotateZ(degreesToRadians(-90))

  predio6[1]
    .translateZ(posA[0] - 70)
    .translateY(posA[2] + 1000)
    .translateX(-30)
    .rotateZ(degreesToRadians(-90))

  predio3[2].translateZ(posA[2] + 1050).translateX(posA[0] - 310)

  predio4[2]
    .translateZ(posA[0] - 100)
    .translateY(posA[2] + 1540)
    .translateX(15)
    .rotateZ(degreesToRadians(-90))

  predio5[1]
    .translateZ(posA[0] - 650)
    .translateY(posA[2] + 980)
    .rotateZ(degreesToRadians(-90))

  predio1[1]
    .translateZ(posA[2] + 1480)
    .translateX(posA[0] - 100)
    .rotateY(degreesToRadians(180))

  predio2[1]
    .translateZ(posA[2] + 1400)
    .translateX(posA[0] - 350)
    .rotateY(degreesToRadians(180))

  predio5[2]
    .translateZ(posA[0] - 400)
    .translateY(posA[2] + 1550)
    .rotateZ(degreesToRadians(-90))

  predio6[2]
    .translateZ(posA[0] - 700)
    .translateY(posA[2] + 1550)
    .translateX(-50)
    .rotateZ(degreesToRadians(-90))

  predio5[3]
    .translateZ(posA[0] - 900)
    .translateY(posA[2] + 1330)
    .rotateZ(degreesToRadians(-90))

  predio1[2]
    .translateZ(posA[2] + 1390)
    .translateX(posA[0] - 530)
    .rotateY(degreesToRadians(270))

  predio3[3].translateZ(posA[2] + 450).translateX(posA[0] - 1400)

  predio2[2]
    .translateZ(posA[2] + 150)
    .translateX(posA[0] - 1300)
    .rotateY(degreesToRadians(180))

  predio5[4]
    .translateZ(posA[0] - 1550)
    .translateY(posA[2] + 110)
    .rotateZ(degreesToRadians(-90))

  predio6[3]
    .translateZ(posA[0] - 940)
    .translateY(posA[2] + 100)
    .translateX(-50)
    .rotateZ(degreesToRadians(-90))

  predio1[3]
    .translateZ(posA[2] + 390)
    .translateX(posA[0] - 850)
    .rotateY(degreesToRadians(270))

  predio2[3]
    .translateZ(posA[2] + 750)
    .translateX(posA[0] - 910)
    .rotateY(degreesToRadians(180))

  predio4[3]
    .translateZ(posA[0] - 1272)
    .translateY(posA[2] + 682)
    .translateX(15)
    .rotateZ(degreesToRadians(-90))

  predio6[4]
    .translateZ(posA[0] - 1500)
    .translateY(posA[2] + 710)
    .translateX(-50)
    .rotateZ(degreesToRadians(-90))

  predio1[4].translateZ(posA[2] + 960).translateX(posA[0] - 1400)

  predio3[4].translateZ(posA[2] + 1370).translateX(posA[0] - 1400)

  predio4[4]
    .translateZ(posA[0] - 1510)
    .translateY(posA[2] + 1540)
    .translateX(15)
    .rotateZ(degreesToRadians(-90))

  predio2[4].translateZ(posA[2] + 1610).translateX(posA[0] - 900)

  //Criando Ruas
  createBlockOfStreets(posA[0], posA[1], posA[2])

  function createBlockOfStreets(px, py, pz) {
    var street1h = new Array(17)
    var street2h = new Array(17)
    var street3h = new Array(17)
    var street4h = new Array(17)
    var street1v = new Array(17)
    var street3v = new Array(17)
    var street4v = new Array(17)

    for (var i = 0; i < 17; i++) {
      street1h[i] = createStreet(1, textureLoader)
      street4h[i] = createStreet(1, textureLoader)
      street1v[i] = createStreet(1, textureLoader)
      street4v[i] = createStreet(1, textureLoader)
      street2h[i] = createStreet(1, textureLoader)
      street3h[i] = createStreet(1, textureLoader)
      street3v[i] = createStreet(1, textureLoader)
      scene.add(street1h[i])
      scene.add(street4h[i])
      scene.add(street1v[i])
      scene.add(street4v[i])
      if (i != 11) {
        scene.add(street2h[i])
        scene.add(street3h[i])
        scene.add(street3v[i])
      }
    }
    scene.remove(street3v[5])

    var cross1 = new Array(6)
    var cross2 = new Array(6)
    for (var i = 0; i < 6; i++) {
      if (i < 4) {
        cross1[i] = createStreet(3, textureLoader)
        scene.add(cross1[i])
      } else {
        cross1[i] = createStreet(4, textureLoader)
        scene.add(cross1[i])
      }
      cross2[i] = createStreet(2, textureLoader)
      scene.add(cross2[i])
    }

    //Posicionando Ruas

    for (var i = 0; i < 17; i++) {
      street1h[i].position.set(px - i * t, py, pz)
      street1h[i].rotateX(degreesToRadians(90))
      street2h[i].position.set(px - i * t, py, 6 * t + pz)
      street2h[i].rotateX(degreesToRadians(90))
      street3h[i].position.set(px - i * t, py, 12 * t + pz)
      street3h[i].rotateX(degreesToRadians(90))
      street4h[i].position.set(px - i * t, py, 18 * t + pz)
      street4h[i].rotateX(degreesToRadians(90)).rotateZ(degreesToRadians(180))
      street1v[i].position.set(px + t, py, pz + t + i * t)
      street1v[i].rotateX(degreesToRadians(90)).rotateZ(degreesToRadians(90))
      street3v[i].position.set(px - 11 * t, py, pz + t + i * t)
      street3v[i].rotateX(degreesToRadians(90)).rotateZ(degreesToRadians(90))
      street4v[i].position.set(px - 17 * t, py, pz + t + i * t)
      street4v[i].rotateX(degreesToRadians(90)).rotateZ(degreesToRadians(-90))
    }

    //Cruzamentos
    cross1[0].position.set(px + t, py, pz)
    cross1[0].rotateX(degreesToRadians(90)).rotateZ(degreesToRadians(90))
    cross1[1].position.set(px + t, py, pz + t * 18)
    cross1[1].rotateX(degreesToRadians(90)).rotateZ(degreesToRadians(180))
    cross1[2].position.set(px - t * 17, py, pz)
    cross1[2].rotateX(degreesToRadians(90))
    cross1[3].position.set(px - t * 17, py, pz + t * 18)
    cross1[3].rotateX(degreesToRadians(90)).rotateZ(degreesToRadians(-90))
    cross1[4].position.set(px - t * 11, py, pz + t * 6)
    cross1[4].rotateX(degreesToRadians(90))
    cross1[5].position.set(px - t * 11, py, pz + t * 12)
    cross1[5].rotateX(degreesToRadians(90))
    cross2[1].position.set(px - t * 11, py + 0.1, pz + t / 2.5)
    cross2[1].rotateX(degreesToRadians(90))
    cross2[3].position.set(px - t * 11, py + 0.1, pz + t * 18 - t / 2.5)
    cross2[3].rotateX(degreesToRadians(90))
    cross2[4].position.set(px + t / 1.66, py + 0.1, pz + t * 6)
    cross2[4].rotateX(degreesToRadians(90)).rotateZ(degreesToRadians(90))
    cross2[5].position.set(px + t / 1.66, py + 0.1, pz + t * 12)
    cross2[5].rotateX(degreesToRadians(90)).rotateZ(degreesToRadians(90))
    cross2[2].position.set(px - t * 16 - t / 1.66, py + 0.1, pz + t * 6)
    cross2[2].rotateX(degreesToRadians(90)).rotateZ(degreesToRadians(-90))
    cross2[0].position.set(px - t * 16 - t / 1.66, py + 0.1, pz + t * 12)
    cross2[0].rotateX(degreesToRadians(90)).rotateZ(degreesToRadians(-90))

    var piso1 = new Array(3)
    for (var i = 0; i < 3; i++) {
      piso1[i] = createStreet(5, textureLoader)
      scene.add(piso1[i])
      piso1[i].position.set(px-(t*14), py, pz+(t*3)+(t*6*i))
      piso1[i].rotateX(degreesToRadians(90))
    }
    var piso2 = new Array(3)
    for (var i = 0; i < 3; i++) {
      piso2[i] = createStreet(6, textureLoader)
      scene.add(piso2[i])
      piso2[i].position.set(px-(t*5), py, pz+(t*3)+(t*6*i))
      piso2[i].rotateX(degreesToRadians(90)) 
    }
  }
}
