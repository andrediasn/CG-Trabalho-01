import * as THREE from '../build/three.module.js'
import { degreesToRadians } from '../libs/util/util.js'


// Posicao inicial
var start = new THREE.Vector3()
start.x = 1000
start.y = 7
start.z = -3600

//Inicializando  array e posições dos checkpoints
var meta = new Array(15);
for(var i=0; i<meta.length; i++)
    meta[i] = new THREE.Vector3()

// Torus inicial
meta[0].x= 1000
meta[0].y = 60
meta[0].z = -3030

//Torus 1
meta[1].x= 900
meta[1].y = 150
meta[1].z = -2500

//Torus2
meta[2].x= 920
meta[2].y = 85
meta[2].z = -1700

//Torus3
meta[3].x= 1200
meta[3].y = 100
meta[3].z = -1300

//Torus4
meta[4].x= 1950
meta[4].y = 130
meta[4].z = -1300

//Torus5
meta[5].x= 2780
meta[5].y = 200
meta[5].z = -620

//Torus6
meta[6].x= 2000
meta[6].y = 400
meta[6].z = 300

//Torus7
meta[7].x= 1080
meta[7].y = 300
meta[7].z = 680

//Torus8
meta[8].x= 610
meta[8].y = 230
meta[8].z = -1130

//Torus9
meta[9].x= -680
meta[9].y = 230
meta[9].z = -1700

//Torus10
meta[10].x = -100
meta[10].y = 230
meta[10].z = -930

//Torus11
meta[11].x = 840
meta[11].y = 320
meta[11].z = -1400

//Torus12
meta[12].x = 1450
meta[12].y = 320
meta[12].z = -1900

//Torus13
meta[13].x = 2780
meta[13].y = 200
meta[13].z = -620

//Torus14
meta[14].x = 760
meta[14].y = 150
meta[14].z = -172



export function addTrajeto() {
    const curve = new THREE.CatmullRomCurve3( [
        new THREE.Vector3( start.x, start.y, start.z),
        new THREE.Vector3( meta[0].x, meta[0].y, meta[0].z ),
        new THREE.Vector3( meta[1].x, meta[1].y, meta[1].z ),
        new THREE.Vector3( meta[2].x, meta[2].y, meta[2].z ),
        new THREE.Vector3( meta[3].x, meta[3].y, meta[3].z ),
        new THREE.Vector3( meta[4].x, meta[4].y, meta[4].z ),
        new THREE.Vector3( meta[5].x, meta[5].y, meta[5].z ),
        new THREE.Vector3( meta[6].x, meta[6].y, meta[6].z ),
        new THREE.Vector3( meta[7].x, meta[7].y, meta[7].z ),
        new THREE.Vector3( meta[8].x, meta[8].y, meta[8].z ),
        new THREE.Vector3( meta[9].x, meta[9].y, meta[9].z ),
        new THREE.Vector3( meta[10].x, meta[10].y, meta[10].z ),
        new THREE.Vector3( meta[11].x, meta[11].y, meta[11].z ),
        new THREE.Vector3( meta[12].x, meta[12].y, meta[12].z ),
        new THREE.Vector3( meta[13].x, meta[13].y, meta[13].z ),
        new THREE.Vector3( meta[14].x, meta[14].y, meta[14].z )
    ] );

    const points = curve.getPoints( 200 );
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
    const trajeto = new THREE.Line( geometry, material );
    
    return trajeto
}


// Criando torus
var torusGeo = new THREE.TorusGeometry (30, 2, 16, 100) // (raio, tubo, radialSegments, tubularSegments)
var torusMat = new THREE.MeshPhongMaterial({
    color: 0xfc1803,
    opacity: 0.5,
    transparent: true});

var torus = new Array(15);
for (var i = 0; i < torus.length; i++){
    torus[i] = new THREE.Mesh( torusGeo, torusMat);
    torus[i].translateX(meta[i].x).translateY(meta[i].y).translateZ(meta[i].z);
}

var rotZ = new THREE.Vector3(0,0,1);      
var rotY = new THREE.Vector3(0,1,0);
var rotX = new THREE.Vector3(1,0,0);

// Rotacionando alguns torus.
torus[1].rotateOnAxis(rotY, degreesToRadians(-10));
torus[2].rotateOnAxis(rotY, degreesToRadians(20));
torus[3].rotateOnAxis(rotY, degreesToRadians(90));
torus[4].rotateOnAxis(rotY, degreesToRadians(90));
torus[5].rotateOnAxis(rotY, degreesToRadians(45));
torus[6].rotateOnAxis(rotY, degreesToRadians(120));
torus[7].rotateOnAxis(rotY, degreesToRadians(90));
torus[8].rotateOnAxis(rotY, degreesToRadians(0));
torus[9].rotateOnAxis(rotY, degreesToRadians(90));
torus[10].rotateOnAxis(rotY, degreesToRadians(90));
torus[11].rotateOnAxis(rotY, degreesToRadians(120));
torus[12].rotateOnAxis(rotY, degreesToRadians(120));
torus[13].rotateOnAxis(rotY, degreesToRadians(120));
torus[14].rotateOnAxis(rotY, degreesToRadians(120));


var aux = 0;
var auxm = 30;
var cont = 0;
var start;

export function checkpoint(scene, px, py, pz, listener){
    var sound = new THREE.Audio(listener);
    var audioLoader = new THREE.AudioLoader();

    if (cont == 0) {
        scene.add(torus[cont]);
        scene.add(torus[cont+1]);
        scene.add(torus[cont+2]);
        aux = distancia(torus[cont].position.x, torus[cont].position.y, torus[cont].position.z, px, py, pz);
        if(aux < auxm) {
            start = new Date().getTime();
            cont ++;
            audioLoader.load('Sounds/Checkpoint.mp3', function (buffer) {
                sound.setBuffer(buffer);
                sound.setLoop(false);
                sound.setVolume(0.2);
                sound.play();
            });
        }
    } else if(cont < 13){
        scene.remove(torus[cont-1]);
        scene.add(torus[cont+2]);
        aux = distancia(torus[cont].position.x, torus[cont].position.y, torus[cont].position.z, px, py, pz);
        if(aux < auxm){ 
            cont ++;
            audioLoader.load('Sounds/Checkpoint.mp3', function (buffer) {
                sound.setBuffer(buffer);
                sound.setLoop(false);
                sound.setVolume(0.2);
                sound.play();
            });
        }
    } else if(cont == 13){
        scene.remove(torus[cont-1]);
        aux = distancia(torus[cont].position.x, torus[cont].position.y, torus[cont].position.z, px, py, pz);
        if(aux < auxm){ 
            cont ++;
            audioLoader.load('Sounds/Checkpoint.mp3', function (buffer) {
                sound.setBuffer(buffer);
                sound.setLoop(false);
                sound.setVolume(0.2);
                sound.play();
            });
        }
    } else if(cont == 14){
        scene.remove(torus[cont-1]);
        aux = distancia(torus[cont].position.x, torus[cont].position.y, torus[cont].position.z, px, py, pz);
        if(aux < auxm){ 
            cont ++;
            audioLoader.load('Sounds/End.mp3', function (buffer) {
                sound.setBuffer(buffer);
                sound.setLoop(false);
                sound.setVolume(0.2);
                sound.play();
            });
        }
    } else{
        scene.remove(torus[cont-1]);
        aux = 0;
    }
}

function distancia(mx, my, mz, px, py, pz){
    var dx = px - mx;
    var dy = py - my;
    var dz = pz - mz;
    return Math.sqrt( dx * dx + dy * dy + dz * dz );
}

export function getCont () { return cont; }

export function getDist() { return aux; }

export function getStart () { return start; }

/* function circuito (scene) { // funcao pra teste, add todos torus ao msm tempo
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
} */

