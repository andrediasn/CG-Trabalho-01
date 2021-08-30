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

export function createPeriferia() {
  var textureLoader = new THREE.TextureLoader()
}
