import * as THREE from '../build/three.module.js'
import { degreesToRadians } from '../libs/util/util.js'
import { ConvexGeometry } from '../build/jsm/geometries/ConvexGeometry.js'

// Função que cria e retorna uma árvore com folhas geradas randomicamente
var createTree = function () {
  var troncoColor = 0x8b4621
  var folhasColor = 0x55ec30
  // Tronco e Galhos
  var baseTroncoMat = new THREE.MeshLambertMaterial({ color: troncoColor })

  // Usando Lathe Geometry para a base do tronco
  var points = [
    new THREE.Vector2(1.5, 1),
    new THREE.Vector2(1.8, 1.5),
    new THREE.Vector2(2.4, 2),
    new THREE.Vector2(2.7, 2.5),
    new THREE.Vector2(2.8, 3),
    new THREE.Vector2(3.2, 3.5),
    new THREE.Vector2(3.7, 4),
    new THREE.Vector2(4, 4.5),
  ]

  var segments = 20
  var phiStart = 0
  var phiLength = 2 * Math.PI
  var baseTroncoGeo = new THREE.LatheGeometry(
    points,
    segments,
    phiStart,
    phiLength
  )
  var baseTroncoGeo = new THREE.CylinderGeometry(2.2, 1.5, 3.5, 10, 10)
  var baseTronco = new THREE.Mesh(baseTroncoGeo, baseTroncoMat)
  baseTronco.castShadow = true

  var mat4 = new THREE.Matrix4()
  baseTronco.matrixAutoUpdate = false
  baseTronco.matrix.identity()
  baseTronco.matrix.multiply(mat4.makeRotationX(degreesToRadians(-90)))
  baseTronco.matrix.multiply(mat4.makeTranslation(0, -4.5, 0))

  if (Math.random() > 0.6) {
    var height = 13
  }

  var corpoTroncoGeo = new THREE.CylinderGeometry(1.5, 1, height || 10, 10)
  var corpoTroncoMat = new THREE.MeshLambertMaterial({ color: troncoColor })
  var corpoTronco = new THREE.Mesh(corpoTroncoGeo, corpoTroncoMat)
  corpoTronco.castShadow = true
  baseTronco.add(corpoTronco)

  corpoTronco.matrixAutoUpdate = false
  corpoTronco.matrix.multiply(
    mat4.makeTranslation(0, height / -1.58 || -6.75, 0)
  )

  // ---------- ALL.castShadow = true
  // Folhas
  const folhasMat = new THREE.MeshLambertMaterial({ color: folhasColor })
  // Fazendo as folhas pela Convex Geometry
  const leavesPoints = generatePointsLeaves()

  const convexGeometry = new ConvexGeometry(leavesPoints)

  var folhas = new THREE.Mesh(convexGeometry, folhasMat)
  folhas.castShadow = true
  corpoTronco.add(folhas)
  folhas.matrixAutoUpdate = false
  folhas.matrix.multiply(mat4.makeTranslation(0, height / -0.78 || -13, 0))

  function generatePointsLeaves() {
    var points = []
    points.push(new THREE.Vector3(5, 10, -5))
    points.push(new THREE.Vector3(-5, 10, -5))
    points.push(new THREE.Vector3(0, 10, 7))
    var maxSize = 8
    for (var i = 0; i < 10; i++) {
      var randomX = Math.round(-maxSize + Math.random() * maxSize * 2)
      var randomY = Math.round(0.1 + (Math.random() - 0.3) * maxSize * 2) //
      var randomZ = Math.round(-maxSize + Math.random() * maxSize * 2)
      points.push(new THREE.Vector3(randomX, randomY, randomZ))
    }
    return points
  }

  // Galho facultativo
  if (Math.random() > 0.6) {
    var galhoGeo = new THREE.CylinderGeometry(0.4, 0.3, 5, 7, 7)
    var galho = new THREE.Mesh(galhoGeo, baseTroncoMat)
    corpoTronco.add(galho)
    galho.castShadow = true
    galho.matrixAutoUpdate = false
    galho.matrix.identity()
    galho.matrix.multiply(mat4.makeTranslation(1.5, 1, 0))
    galho.matrix.multiply(mat4.makeRotationZ(degreesToRadians(30)))

    var galho2Geo = new THREE.CylinderGeometry(0.3, 0.2, 4, 7, 7)
    var galho2 = new THREE.Mesh(galho2Geo, baseTroncoMat)
    galho2.castShadow = true
    galho.add(galho2)
    galho2.matrixAutoUpdate = false
    galho2.matrix.identity()
    galho2.matrix.multiply(mat4.makeTranslation(-0.8, -4.2, 0))
    galho2.matrix.multiply(mat4.makeRotationZ(degreesToRadians(-25)))
  }

  return baseTronco
}

var mat4 = new THREE.Matrix4()
var arvores = []
var arvores2 = []
var arvores3 = []
export function addArvores(scene) {
  for (let i = 0; i < 150; i++) {
    arvores.push(createTree())
  }

  arvores.map((arvore) => {
    scene.add(arvore)
    arvore.matrix.multiply(
      mat4.makeTranslation(
        (Math.random() * 0.13 - 0.2) * 11900,
        (Math.random() * 1.5 - 1.5) * -1500,
        1.8
      )
    )
    arvore.matrix.multiply(mat4.makeRotationX(degreesToRadians(-90)))
  })

  for (let i = 0; i < 150; i++) {
    arvores2.push(createTree())
  }

  arvores2.map((arvore) => {
    scene.add(arvore)
    arvore.matrix.multiply(
      mat4.makeTranslation(
        (Math.random() * 0.07 - 0.2) * -21900,
        (Math.random() * 1.5 - 1.5) * -1500,
        1.8
      )
    )
    arvore.matrix.multiply(mat4.makeRotationX(degreesToRadians(-90)))
  })

  for (let i = 0; i < 150; i++) {
    arvores3.push(createTree())
  }

  arvores3.map((arvore) => {
    scene.add(arvore)
    arvore.matrix.multiply(
      mat4.makeTranslation(
        (Math.random() * 0.28 - 0.2) * -18500,
        (Math.random() * 0.9 - 1) * 1000,
        1.8
      )
    )
    arvore.matrix.multiply(mat4.makeRotationX(degreesToRadians(-90)))
  })
}

export function showEnvironmentObjects(scene) {
  arvores.map((arvore) => {
    arvore.visible = true
  })
}

export function hideEnvironmentObjects(scene) {
  arvores.map((arvore) => {
    arvore.visible = false
  })
}
