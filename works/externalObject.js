import * as THREE from '../build/three.module.js'
import Stats from '../build/jsm/libs/stats.module.js'
import { TrackballControls } from '../build/jsm/controls/TrackballControls.js'
import { GLTFLoader } from '../build/jsm/loaders/GLTFLoader.js'
import {
  initRenderer,
  initCamera,
  onWindowResize,
} from '../../libs/util/util.js'
import {
  degreesToRadians,
  initDefaultBasicLight,
  getMaxSize,
} from '../libs/util/util.js'
import { ConvexGeometry } from '../build/jsm/geometries/ConvexGeometry.js'

// Loading archive
function onError() {}

function onProgress(xhr, model) {
  if (xhr.lengthComputable) {
    var percentComplete = (xhr.loaded / xhr.total) * 100
  }
}

function normalizeAndRescale(obj, newScale) {
  var scale = getMaxSize(obj) // Available in 'utils.js'
  obj.scale.set(
    newScale * (1.0 / scale),
    newScale * (1.0 / scale),
    newScale * (1.0 / scale)
  )
  return obj
}

function fixPosition(obj) {
  // Fix position of the object over the ground plane
  var box = new THREE.Box3().setFromObject(obj)
  if (box.min.y > 0) obj.translateY(-box.min.y)
  else obj.translateY(-1 * box.min.y)
  return obj
}

export function loadGLTFFile(
  modelPath,
  modelName,
  desiredScale,
  x,
  z,
  scene,
  LoadingManager
) {
  var loader = new GLTFLoader(LoadingManager)
  loader.load(
    modelPath + modelName + '.gltf',
    function (gltf) {
      var obj = gltf.scene
      obj.name = modelName
      obj.visible = true
      obj.traverse(function (child) {
        if (child) {
          child.castShadow = true
        }
      })
      obj.traverse(function (node) {
        if (node.material) node.material.side = THREE.DoubleSide
      })

      var obj = normalizeAndRescale(obj, desiredScale)
      var obj = fixPosition(obj)

      obj
        .translateY(desiredScale * -0.121)
        .translateX(x)
        .translateZ(-z)
      scene.add(obj)
    },
    onProgress,
    onError
  )
}
