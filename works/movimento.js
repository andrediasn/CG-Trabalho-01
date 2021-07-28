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
export function esquerda(esferaMov, esferaHelice, speed) {
  if(speed > 0) {                             // Movimento somente se houver aceleracao
    if ((auxRotHorizontal < 200)){             // Limite rotacional
      esferaMov.rotateOnAxis(rotZ, -angleRotHori )   // Rotaciona o aviao para os lados
      auxRotHorizontal ++                     // Auxiliar para nivelamento
    }
    if(speedHorEsq<1){
      esferaHelice.rotateOnAxis(rotY, angleHori * speedHorEsq)  
      speedHorDir = 0
      speedHorEsq += 0.005
    }
    else
      esferaHelice.rotateOnAxis(rotY, angleHori)
  }  
}
export function direita(esferaMov, esferaHelice, speed) {                          // Analogamente ao esquerda()
  if(speed > 0) {
    if ((auxRotHorizontal > -120)){
      esferaMov.rotateOnAxis(rotZ, angleRotHori);
      auxRotHorizontal --
    }
    if(speedHorDir<1){
      esferaHelice.rotateOnAxis(rotY, -angleHori * speedHorDir)
      speedHorEsq = 0
      speedHorDir += 0.005
    }
    else
      esferaHelice.rotateOnAxis(rotY, -angleHori)
  }
}
export function cima(esferaHelice, esferaCam, speed) {
  if(speed > 0) {                                // Verica se ha aceleracao
    if (auxRotVertical > -20) {                  // Limite rotacional
      esferaHelice.rotateOnAxis(rotX, angleVert)    // Movimenta para cima com a rotação
      esferaCam.rotateOnAxis(rotX, -angleVert)      // Nivela a camera
      auxRotVertical --                          // Auxiliar para nivelamento
    }
  }
}
export function baixo(esferaHelice, esferaCam, speed){                                 // Analogamente ao cima()
  if(speed > 0) { 
    if (auxRotVertical < 20) {
      esferaHelice.rotateOnAxis(rotX, -angleVert)
      esferaCam.rotateOnAxis(rotX, angleVert)
      auxRotVertical ++
    }
  }
}


export function forceNiv(esferaHelice, esferaMov, esferaCam) {                                // Funcao para forcar nivelamento instantaneo no modo Inspecao
  clearTimeout(auxNivEsq)
  clearTimeout(auxNivDir)
  clearTimeout(auxNivCima)
  clearTimeout(auxNivBaixo)
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