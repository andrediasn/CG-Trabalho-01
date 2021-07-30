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
var metaX2 = 3100
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
var metaX4 = 3200
var metaY4 = 150
var metaZ4 = 1200
// Trajeto ate torus 4
var trajX4 = trajX3 + metaX4 - metaX3 
var trajY4 = trajY3 + metaY4 - metaY3 
var trajZ4 = trajZ3 + metaZ4 + Math.abs(metaZ3) 

//Torus5
var metaX5 = 2800
var metaY5 = 200
var metaZ5 = 2000
// Trajeto ate torus 5
var trajX5 = trajX4 + metaX5 - metaX4 
var trajY5 = trajY4 + metaY5 - metaY4 
var trajZ5 = trajZ4 + metaZ5 - metaZ4 

//Torus6
var metaX6 = 1000
var metaY6 = 500
var metaZ6 = 1820
// Trajeto ate torus 6
var trajX6 = trajX5 + metaX6 - metaX5 
var trajY6 = trajY5 + metaY6 - metaY5 
var trajZ6 = trajZ5 + metaZ6 - metaZ5 

//Torus7
var metaX7 = 0
var metaY7 = 200
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
var metaY10 = 110
var metaZ10 = -1000
// Trajeto ate torus 10
var trajX10 = trajX9 + metaX10 - metaX9 
var trajY10 = trajY9 + metaY10 - metaY9 
var trajZ10 = trajZ9 + metaZ10 + Math.abs(metaZ9) 

//Torus11
var metaX11 = 0
var metaY11 = 150
var metaZ11 = -1500
// Trajeto ate torus 11
var trajX11 = trajX10 + metaX11 - metaX10 
var trajY11 = trajY10 + metaY11 - metaY10 
var trajZ11 = trajZ10 + metaZ11 + Math.abs(metaZ10) 

//Torus12
var metaX12 = 600
var metaY12 = 130
var metaZ12 = -2200
// Trajeto ate torus 12
var trajX12 = trajX11 + metaX12 - metaX11 
var trajY12 = trajY11 + metaY12 - metaY11 
var trajZ12 = trajZ11 + metaZ12 + Math.abs(metaZ11)

//Torus13
var metaX13 = 600
var metaY13 = 130
var metaZ13 = -2200
// Trajeto ate torus 13
var trajX13 = trajX12 + metaX13 - metaX12 
var trajY13 = trajY12 + metaY13 - metaY12 
var trajZ13 = trajZ12 + metaZ13 + Math.abs(metaZ12)

//Torus14
var metaX14 = 2200
var metaY14 = 140
var metaZ14 = -3000
// Trajeto ate torus 14
var trajX14 = trajX12 + metaX14 - metaX12 
var trajY14 = trajY12 + metaY14 - metaY12 
var trajZ14 = trajZ12 + metaZ14 + Math.abs(metaZ12)





export function addTrajeto() {
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
        new THREE.Vector3( trajX11, trajY11, trajZ11 ),
        new THREE.Vector3( trajX12, trajY12, trajZ12 ),
        new THREE.Vector3( trajX13, trajY13, trajZ13 ),
        new THREE.Vector3( trajX14, trajY14, trajZ14 )
    ] );

    const points = curve.getPoints( 50 );
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
    const trajeto = new THREE.Line( geometry, material );
    trajeto.translateX(trajX).translateY(trajY).translateZ(trajZ)
    
    return trajeto
}

var rotZ = new THREE.Vector3(0,0,1)      
var rotY = new THREE.Vector3(0,1,0)
var rotX = new THREE.Vector3(1,0,0)

var torusGeo = new THREE.TorusGeometry (30, 2, 16, 100) // (raio, tubo, radialSegments, tubularSegments)
var torusMat = new THREE.MeshPhongMaterial({
    color: 0xfc1803,
    opacity: 0.5,
    transparent: true});
// Criando torus
var meta0 = new THREE.Mesh( torusGeo, torusMat)
meta0.translateX(metaX0).translateY(metaY0).translateZ(metaZ0)
var meta1 = new THREE.Mesh( torusGeo, torusMat)
meta1.translateX(metaX1).translateY(metaY1).translateZ(metaZ1)
meta1.rotateOnAxis(rotY, degreesToRadians(-10) )
var meta2 = new THREE.Mesh( torusGeo, torusMat)
meta2.translateX(metaX2).translateY(metaY2).translateZ(metaZ2)
meta2.rotateOnAxis(rotY, degreesToRadians(20) )
var meta3 = new THREE.Mesh( torusGeo, torusMat)
meta3.translateX(metaX3).translateY(metaY3).translateZ(metaZ3)
meta3.rotateOnAxis(rotY, degreesToRadians(10) )
var meta4 = new THREE.Mesh( torusGeo, torusMat)
meta4.translateX(metaX4).translateY(metaY4).translateZ(metaZ4)
meta4.rotateOnAxis(rotY, degreesToRadians(-30) )
var meta5 = new THREE.Mesh( torusGeo, torusMat)
meta5.translateX(metaX5).translateY(metaY5).translateZ(metaZ5)
meta5.rotateOnAxis(rotY, degreesToRadians(-40) )
var meta6 = new THREE.Mesh( torusGeo, torusMat)
meta6.translateX(metaX6).translateY(metaY6).translateZ(metaZ6)
meta6.rotateOnAxis(rotY, degreesToRadians(90) )
var meta7 = new THREE.Mesh( torusGeo, torusMat)
meta7.translateX(metaX7).translateY(metaY7).translateZ(metaZ7)
meta7.rotateOnAxis(rotY, degreesToRadians(60) )
var meta8 = new THREE.Mesh( torusGeo, torusMat)
meta8.translateX(metaX8).translateY(metaY8).translateZ(metaZ8)
meta8.rotateOnAxis(rotY, degreesToRadians(60) )
var meta9 = new THREE.Mesh( torusGeo, torusMat)
meta9.translateX(metaX9).translateY(metaY9).translateZ(metaZ9)
meta9.rotateOnAxis(rotY, degreesToRadians(40) )
var meta10 = new THREE.Mesh( torusGeo, torusMat)
meta10.translateX(metaX10).translateY(metaY10).translateZ(metaZ10)
meta10.rotateOnAxis(rotY, degreesToRadians(120) )
var meta11 = new THREE.Mesh( torusGeo, torusMat)
meta11.translateX(metaX11).translateY(metaY11).translateZ(metaZ11)
meta11.rotateOnAxis(rotY, degreesToRadians(120) )
var meta12 = new THREE.Mesh( torusGeo, torusMat)
meta12.translateX(metaX12).translateY(metaY12).translateZ(metaZ12)
meta12.rotateOnAxis(rotY, degreesToRadians(120) )
var meta13 = new THREE.Mesh( torusGeo, torusMat)
meta13.translateX(metaX13).translateY(metaY13).translateZ(metaZ13)
meta13.rotateOnAxis(rotY, degreesToRadians(120) )
var meta14 = new THREE.Mesh( torusGeo, torusMat)
meta14.translateX(metaX14).translateY(metaY14).translateZ(metaZ14)
meta14.rotateOnAxis(rotY, degreesToRadians(120) )


var aux = 0
var auxm = 30
var cont = 0

export function getCont () {
    return cont
}

export function getDist() {
    return aux
}

function circuito (scene) { // funcao pra teste, add todos torus ao msm tempo
    scene.add(meta0)
    scene.add(meta1)
    scene.add(meta2)
    scene.add(meta3)
    scene.add(meta4)
    scene.add(meta5)
    scene.add(meta6)
    scene.add(meta7)
    scene.add(meta8)
    scene.add(meta9)
    scene.add(meta10)
    scene.add(meta11)
    scene.add(meta12)
    scene.add(meta13)
    scene.add(meta14)
}

export function checkpoint(scene, px, py, pz) {
    //circuito(scene) // apenas para teste
    if (cont == 0) {
        scene.add(meta0)
        scene.add(meta1)
        scene.add(meta2)
        aux = distancia(meta0.position.x, meta0.position.y, meta0.position.z, px, py, pz)
        if(aux < auxm) {
            start = new Date().getTime()
            cont ++
        }
    }
    else if(cont == 1) {
        scene.remove(meta0)
        scene.add(meta3)
        aux = distancia(meta1.position.x, meta1.position.y, meta1.position.z, px, py, pz)
        if(aux < auxm) 
            cont ++
    }
    else if(cont == 2){
        scene.remove(meta1)
        scene.add(meta4)
        aux = distancia(meta2.position.x, meta2.position.y, meta2.position.z, px, py, pz)
        if(aux < auxm) 
            cont ++
    }
    else if(cont == 3){
        scene.remove(meta2)
        scene.add(meta5)
        aux = distancia(meta3.position.x, meta3.position.y, meta3.position.z, px, py, pz)
        if(aux < auxm) 
            cont ++
    }
    else if(cont == 4){
        scene.remove(meta3)
        scene.add(meta6)
        aux = distancia(meta4.position.x, meta4.position.y, meta4.position.z, px, py, pz)
        if(aux < auxm) 
            cont ++
    }
    else if(cont == 5){
        scene.remove(meta4)
        scene.add(meta7)
        aux = distancia(meta5.position.x, meta5.position.y, meta5.position.z, px, py, pz)
        if(aux < auxm) 
            cont ++
    }
    else if(cont == 6){
        scene.remove(meta5)
        scene.add(meta8)
        aux = distancia(meta6.position.x, meta6.position.y, meta6.position.z, px, py, pz)
        if(aux < auxm) 
            cont ++
    }
    else if(cont == 7){
        scene.remove(meta6)
        scene.add(meta9)
        aux = distancia(meta7.position.x, meta7.position.y, meta7.position.z, px, py, pz)
        if(aux < auxm) 
            cont ++
    }
    else if(cont == 8){
        scene.remove(meta7)
        scene.add(meta10)
        aux = distancia(meta8.position.x, meta8.position.y, meta8.position.z, px, py, pz)
        if(aux < auxm) 
            cont ++
    }
    else if(cont == 9){
        scene.remove(meta8)
        scene.add(meta11)
        aux = distancia(meta9.position.x, meta9.position.y, meta9.position.z, px, py, pz)
        if(aux < auxm) 
            cont ++
    }
    else if(cont == 10){
        scene.remove(meta9)
        scene.add(meta12)
        aux = distancia(meta10.position.x, meta10.position.y, meta10.position.z, px, py, pz)
        if(aux < auxm) 
            cont ++     
    }
    else if(cont == 11){
        scene.remove(meta10)
        scene.add(meta13)
        aux = distancia(meta11.position.x, meta11.position.y, meta11.position.z, px, py, pz)
        if(aux < auxm) 
            cont ++  
    }
    else if(cont == 12){
        scene.remove(meta11)
        scene.add(meta14)
        aux = distancia(meta12.position.x, meta12.position.y, meta12.position.z, px, py, pz)
        if(aux < auxm) 
            cont ++  
    }
    else if(cont == 13){
        scene.remove(meta12)
        aux = distancia(meta13.position.x, meta13.position.y, meta13.position.z, px, py, pz)
        if(aux < auxm) 
            cont ++  
    }
    else if(cont == 14){
        scene.remove(meta13)
        aux = distancia(meta14.position.x, meta14.position.y, meta14.position.z, px, py, pz)
        if(aux < auxm) 
            cont ++  
    }
    else if(cont == 15){
        scene.remove(meta14)
        aux = 0
    }
}

function distancia(mx, my, mz, px, py, pz){
    var dx = px - mx
    var dy = py - my
    var dz = pz - mz
    return Math.sqrt( dx * dx + dy * dy + dz * dz );
}

var start
export function getStart (){
    return start
}