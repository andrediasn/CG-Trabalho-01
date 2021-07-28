import * as THREE from '../build/three.module.js'
import { degreesToRadians } from '../libs/util/util.js'

// Variaveis de posicao
var posX = 3000                             
var posY = 7
var posZ = -3500
var position = new THREE.Vector3()       
// Auxiliares na rotacao:
var rotZ = new THREE.Vector3(0,0,1)      
var rotY = new THREE.Vector3(0,1,0)
var rotX = new THREE.Vector3(1,0,0)
var angleRotHori = degreesToRadians(0.5)        
var angleHori = degreesToRadians(0.5)
var angleVert = degreesToRadians(1.3)
var auxRotVertical = 0                   
var auxRotHorizontal = 0       
var speedHorEsq = 0   
var speedHorDir = 0           
// Auxiliares na recursividade:
var auxForceNiv

export function returnPosition(aux){
  if (aux == 0)
    return posX
  else if(aux == 1)
    return posY
  else if (aux == 2)
    return posZ
}

// Movimento direcional
export function esquerda(esferaMov, esferaHelice, esferaCam, speed) {
  if(speed > 0) {                             // Movimento somente se houver aceleracao
    if (auxRotHorizontal < 100){             // Limite rotacional
      esferaMov.rotateOnAxis(rotZ, -angleRotHori )   // Rotaciona o aviao para os lados
      auxRotHorizontal ++                     // Auxiliar para nivelamento
    }
    if(speedHorEsq<1){
      esferaHelice.rotateOnAxis(rotY, angleHori * speedHorEsq)  
      esferaCam.rotateOnAxis(rotY, angleHori * speedHorEsq) 
      speedHorDir = 0
      speedHorEsq += 0.005
    }
    else {
      esferaHelice.rotateOnAxis(rotY, angleHori)
      esferaCam.rotateOnAxis(rotY, angleHori)
    }
  }   
}
export function direita(esferaMov, esferaHelice, esferaCam, speed) {
  if (speed > 0) {
    if (auxRotHorizontal > -100) {
      esferaMov.rotateOnAxis(rotZ, angleRotHori)
      auxRotHorizontal--
    }
    if (speedHorDir < 1) {
      esferaHelice.rotateOnAxis(rotY, -angleHori * speedHorDir)
      esferaCam.rotateOnAxis(rotY, -angleHori * speedHorDir)
      speedHorEsq = 0
      speedHorDir += 0.05
    } 
    else {
      esferaHelice.rotateOnAxis(rotY, -angleHori)
      esferaCam.rotateOnAxis(rotY, -angleHori)
    }
  }
}
export function cima(esferaHelice, speed) {
  if(speed > 0) {  
    var eulerC = new THREE.Euler();
    eulerC.setFromRotationMatrix(esferaHelice.matrixWorld); 
    //console.log('euler x', euler.x)                            
    if (eulerC.x < 0.5) {                  // Limite rotacional
      esferaHelice.rotateOnAxis(rotX, angleVert)    // Movimenta para cima com a rotação
    }
  }
}
export function baixo(esferaHelice, speed){                                
  if(speed > 0) { 
    var eulerB = new THREE.Euler();
    eulerB.setFromRotationMatrix(esferaHelice.matrixWorld);
    //console.log('euler x', euler.x)  
    if (eulerB.x > -0.5) {
      esferaHelice.rotateOnAxis(rotX, -angleVert)
    }
  }
}

export function nivelamento (esferaHelice, esferaCam, esferaMov, niv){
  if (niv){
    var eulerHelice = new THREE.Euler();
    eulerHelice.setFromRotationMatrix(esferaHelice.matrixWorld); 
    if (eulerHelice.x > 0.01 ){
      esferaHelice.rotateOnAxis(rotX, -angleVert)
    }
    else if (eulerHelice.x < -0.01){
      esferaHelice.rotateOnAxis(rotX, angleVert)    
    }
    var eulerMov = new THREE.Euler();
    eulerMov.setFromRotationMatrix(esferaMov.matrixWorld); 
    if (eulerMov.z > 0.01){
      esferaMov.rotateOnAxis(rotZ, -angleRotHori )
      auxRotHorizontal ++
    }
    if (eulerMov.z < -0.01){
      esferaMov.rotateOnAxis(rotZ, angleRotHori )
      auxRotHorizontal --
    }
  }
}


export function forceNiv(esferaHelice, esferaMov, esferaCam) {        // Funcao para forcar nivelamento instantaneo no modo Inspecao
  if (auxRotHorizontal > 0) {                                               
    auxForceNiv = auxRotHorizontal * angleRotHori
    esferaMov.rotateOnAxis(rotZ, auxForceNiv)                                            
  }
  else if (auxRotHorizontal < 0) {                                               
    auxForceNiv = auxRotHorizontal * angleRotHori
    esferaMov.rotateOnAxis(rotZ, auxForceNiv)                                           
  }
  if (auxRotVertical < 0) {
    auxForceNiv = auxRotVertical * angleVert
    esferaHelice.rotateOnAxis(rotX, -auxForceNiv) 
    esferaCam.rotateOnAxis(rotX, auxForceNiv)           
  }
  else if (auxRotVertical > 0) {
    auxForceNiv = auxRotVertical * angleVert
    esferaHelice.rotateOnAxis(rotX, auxForceNiv)       
    esferaCam.rotateOnAxis(rotX, -auxForceNiv)         
  }
}
export function restoreNiv() {                            // Restaura angulos de nivelamento ao voltar para modo simulacao
  if (auxRotHorizontal > 0) {                                               
    auxForceNiv = auxRotHorizontal * angleRotHori
    esferaMov.rotateOnAxis(rotZ, -auxForceNiv)
    nivEsq()                                       
  }
  else if (auxRotHorizontal < 0) {                                               
    auxForceNiv = auxRotHorizontal * angleRotHori
    esferaMov.rotateOnAxis(rotZ, -auxForceNiv)                                           
    nivDir()
  }
  if (auxRotVertical < 0) {
    auxForceNiv = auxRotVertical * angleVert
    esferaHelice.rotateOnAxis(rotX, auxForceNiv) 
    esferaCam.rotateOnAxis(rotX, -auxForceNiv)
    nivCima()      
  }
  else if (auxRotVertical > 0) {
    auxForceNiv = auxRotVertical * angleVert
    esferaHelice.rotateOnAxis(rotX, -auxForceNiv)       
    esferaCam.rotateOnAxis(rotX, auxForceNiv)  
    nivBaixo()
  }
}