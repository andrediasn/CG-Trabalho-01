import * as THREE from '../build/three.module.js'
import { degreesToRadians } from '../libs/util/util.js'

//Inicio do trajeto
var trajX = 3000
var trajY = 7
var trajZ = -3500

// Torus inicial
var metaX0 = 3000
var metaY0 = 60
var metaZ0 = -3000
// Trajeto ate torus inicial
var trajX0 = metaX0 - trajX //0
var trajY0 = metaY0 - trajY //53
var trajZ0 = metaZ0 + Math.abs(trajZ) // 400

//Torus 1
var metaX1 = 2800
var metaY1 = 120
var metaZ1 = -2000
// Trajeto ate torus 1
var trajX1 = trajX0 + metaX1 - metaX0 
var trajY1 = trajY0 + metaY1 - metaY0 
var trajZ1 = trajZ0 + metaZ1 + Math.abs(metaZ0)    

//Torus2
var metaX2 = 3300
var metaY2 = 150
var metaZ2 = -1000
// Trajeto ate torus 2
var trajX2 = trajX1 + metaX2 - metaX1 
var trajY2 = trajY1 + metaY2 - metaY1 
var trajZ2 = trajZ1 + metaZ2 + Math.abs(metaZ1)  

//Torus3
var metaX3 = 3800
var metaY3 = 150
var metaZ3 = 0
// Trajeto ate torus 3
var trajX3 = trajX2 + metaX3 - metaX2 
var trajY3 = trajY2 + metaY3 - metaY2 
var trajZ3 = trajZ2 + metaZ3 + Math.abs(metaZ2) 

//Torus4
var metaX4 = 3300
var metaY4 = 150
var metaZ4 = 1000
// Trajeto ate torus 4
var trajX4 = trajX3 + metaX4 - metaX3 
var trajY4 = trajY3 + metaY4 - metaY3 
var trajZ4 = trajZ3 + metaZ4 + Math.abs(metaZ3) 

//Torus5
var metaX5 = 2800
var metaY5 = 150
var metaZ5 = 2000
// Trajeto ate torus 5
var trajX5 = trajX4 + metaX5 - metaX4 
var trajY5 = trajY4 + metaY5 - metaY4 
var trajZ5 = trajZ4 + metaZ5 - metaZ4 

//Torus6
var metaX6 = 1000
var metaY6 = 160
var metaZ6 = 2500
// Trajeto ate torus 6
var trajX6 = trajX5 + metaX6 - metaX5 
var trajY6 = trajY5 + metaY6 - metaY5 
var trajZ6 = trajZ5 + metaZ6 - metaZ5 

//Torus7
var metaX7 = 0
var metaY7 = 170
var metaZ7 = 2000
// Trajeto ate torus 7
var trajX7 = trajX6 + metaX7 - metaX6 
var trajY7 = trajY6 + metaY7 - metaY6 
var trajZ7 = trajZ6 + metaZ7 - metaZ6 

//Torus8
var metaX8 = -1000
var metaY8 = 180
var metaZ8 = 1000
// Trajeto ate torus 8
var trajX8 = trajX7 + metaX8 - metaX7 
var trajY8 = trajY7 + metaY8 - metaY7 
var trajZ8 = trajZ7 + metaZ8 - metaZ7

//Torus9
var metaX9 = -2000
var metaY9 = 190
var metaZ9 = 0
// Trajeto ate torus 9
var trajX9 = trajX8 + metaX9 - metaX8 
var trajY9 = trajY8 + metaY9 - metaY8 
var trajZ9 = trajZ8 + metaZ9 - metaZ8

//Torus10
var metaX10 = -1500
var metaY10 = 1100
var metaZ10 = -1000
// Trajeto ate torus 10
var trajX10 = trajX9 + metaX10 - metaX9 
var trajY10 = trajY9 + metaY10 - metaY9 
var trajZ10 = trajZ9 + metaZ10 + Math.abs(metaZ9) 

var torusGeo = new THREE.TorusGeometry (30, 2, 16, 100) // (raio, tubo, radialSegments, tubularSegments)
var torusMat = new THREE.MeshBasicMaterial ({ color: 0xfc1803 })
        
export function addTrajeto() {
     
    //Create a closed wavey loop
    const curve = new THREE.CatmullRomCurve3( [
    new THREE.Vector3( 0, 0, 0 ),
    new THREE.Vector3( trajX0, trajY0, trajZ0 ),
    new THREE.Vector3( trajX1, trajY1, trajZ1 ),
    new THREE.Vector3( trajX2, trajY2, trajZ2 ),
    new THREE.Vector3( trajX3, trajY3, trajZ3 ),
    new THREE.Vector3( trajX4, trajY4, trajZ4 ),
    new THREE.Vector3( trajX5, trajY5, trajZ5 ),
    new THREE.Vector3( trajX6, trajY6, trajZ6 ),
    new THREE.Vector3( trajX7, trajY7, trajZ7 ),
    new THREE.Vector3( trajX8, trajY8, trajZ8 ),
    new THREE.Vector3( trajX9, trajY9, trajZ9 ),
    new THREE.Vector3( trajX10, trajY10, trajZ10 ),
    ] );

    const points = curve.getPoints( 50 );
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

    // Create the final object to add to the scene
    const trajeto = new THREE.Line( geometry, material );
        
    trajeto.translateX(trajX).translateY(trajY).translateZ(trajZ)
    
    return trajeto
}
//meta0.rotateOnAxis(rotY, degreesToRadians(90) )
var rotZ = new THREE.Vector3(0,0,1)      
var rotY = new THREE.Vector3(0,1,0)
var rotX = new THREE.Vector3(1,0,0)

export function circuito (scene, cont) {
    if(cont == 0) {
        var meta0 = new THREE.Mesh( torusGeo, torusMat)
        scene.add(meta0)
        meta0.translateX(metaX0).translateY(metaY0).translateZ(metaZ0)
        //meta0.translateX(metaX0).translateY(30).translateZ(-3500)
        var meta1 = new THREE.Mesh( torusGeo, torusMat)
        scene.add(meta1)
        meta1.translateX(metaX1).translateY(metaY1).translateZ(metaZ1)
        var meta2 = new THREE.Mesh( torusGeo, torusMat)
        scene.add(meta2)
        meta2.translateX(metaX2).translateY(metaY2).translateZ(metaZ2)
        meta2.rotateOnAxis(rotY, degreesToRadians(30) )
        var meta3 = new THREE.Mesh( torusGeo, torusMat)
        scene.add(meta3)
        meta3.translateX(metaX3).translateY(metaY3).translateZ(metaZ3)
        var meta4 = new THREE.Mesh( torusGeo, torusMat)
        scene.add(meta4)
        meta4.translateX(metaX4).translateY(metaY4).translateZ(metaZ4)
        meta4.rotateOnAxis(rotY, degreesToRadians(-30) )
        var meta5 = new THREE.Mesh( torusGeo, torusMat)
        scene.add(meta5)
        meta5.translateX(metaX5).translateY(metaY5).translateZ(metaZ5)
        meta5.rotateOnAxis(rotY, degreesToRadians(-60) )
        var meta6 = new THREE.Mesh( torusGeo, torusMat)
        scene.add(meta6)
        meta6.translateX(metaX6).translateY(metaY6).translateZ(metaZ6)
        var meta7 = new THREE.Mesh( torusGeo, torusMat)
        meta6.rotateOnAxis(rotY, degreesToRadians(90) )
        scene.add(meta7)
        meta7.translateX(metaX7).translateY(metaY7).translateZ(metaZ7)
        meta7.rotateOnAxis(rotY, degreesToRadians(60) )
        var meta8 = new THREE.Mesh( torusGeo, torusMat)
        scene.add(meta8)
        meta8.translateX(metaX8).translateY(metaY8).translateZ(metaZ8)
        var meta9 = new THREE.Mesh( torusGeo, torusMat)
        scene.add(meta9)
        meta9.translateX(metaX9).translateY(metaY9).translateZ(metaZ9)
        var meta10 = new THREE.Mesh( torusGeo, torusMat)
        scene.add(meta10)
        meta10.translateX(metaX10).translateY(metaY10).translateZ(metaZ10)
    }
    else if(cont == 1) // Remove apos atingir a meta
        scene.remove(meta0)
    else if(cont == 2)
        scene.remove(meta1)
    else if(cont == 3)
        scene.remove(meta2)
    else if(cont == 4)
        scene.remove(meta3)
    else if(cont == 5)
        scene.remove(meta4)
    else if(cont == 6)
        scene.remove(meta5)
    else if(cont == 7)
        scene.remove(meta6)
    else if(cont == 8)
        scene.remove(meta7)
    else if(cont == 9)
        scene.remove(meta8)
    else if(cont == 10)
        scene.remove(meta9)
    else if(cont == 11)
        scene.remove(meta10)
}