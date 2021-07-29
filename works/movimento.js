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
var angleHori = degreesToRadians(0.4)
var angleVert = degreesToRadians(0.4)
var auxRotVertical = 0                   
var auxRotHorizontal = 0       
var speedHorEsq = 0   
var speedHorDir = 0     
var speedVertC = 0
var speedVertB = 0      

// Movimento direcional
export function esquerda(esferaMov, esferaHelice, esferaCam, speed) {
  if(speed > 0) {                             // Movimento somente se houver aceleracao
    if (speed > 0) {
      if (auxRotHorizontal < 60) {
        esferaMov.rotation.z -= angleRotHori // Rotaciona o aviao para os lados
        auxRotHorizontal++ // Auxiliar para nivelamento
      }
      if (speedHorEsq <= 1) {
        esferaHelice.rotation.y += angleHori * speedHorEsq
        esferaCam.rotation.y += angleHori * speedHorEsq
        speedHorDir = 0
        speedHorEsq += 0.05
      } 
      else {
        esferaHelice.rotation.y += angleHori
        esferaCam.rotation.y += angleHori 
      }
    }
  }   
}
export function direita(esferaMov, esferaHelice, esferaCam, speed) {
  if (speed > 0) {
    if (auxRotHorizontal > -60 ) {
      esferaMov.rotation.z += angleRotHori
      auxRotHorizontal--
    }
    if (speedHorDir <= 1) {
      esferaHelice.rotation.y -= angleHori * speedHorDir
      esferaCam.rotation.y -= angleHori * speedHorDir
      speedHorEsq = 0
      speedHorDir += 0.05
    } 
    else {
      esferaHelice.rotation.y -= angleHori
      esferaCam.rotation.y -= angleHori
    }
  }
}
export function cima(esferaHelice, esferaMov, speed) {
  if(speed > 0) {  
    if (auxRotVertical > -50) {
      esferaMov.rotation.x += angleVert // Movimenta para cima com a rotação
      auxRotVertical-- // Auxiliar para nivelamento
    }
    if(speedVertC > -1){
      speedVertC -= 0.05
    }
    esferaHelice.translateY( speed * speedVertC )
  }
}
export function baixo(esferaHelice, esferaMov, speed){ 
  if (speed > 0) {
    if (auxRotVertical < 50) {
      esferaMov.rotation.x -= angleVert
      auxRotVertical++
    }
    if(speedVertB < 1){
      speedVertB += 0.05
    }
    esferaHelice.translateY( speed * speedVertB )
  }
}

export function nivelamento (esferaHelice, esferaCam, esferaMov, nivV, nivH, speed){
  if (nivV){
    if (auxRotVertical > 0 ){ //nivBaixo
      esferaMov.rotation.x += angleVert
      auxRotVertical--
      if (speedVertB > 0){
        esferaHelice.translateY( speedVertB * speed)
        speedVertB -= 0.1
      }
    }
    else if (auxRotVertical < 0){ //nivCima
      esferaMov.rotation.x -= angleVert // Nivela aviao
      auxRotVertical++
      if (speedVertC < 0){
        esferaHelice.translateY( speedVertC * speed )
        speedVertC += 0.1
      }
    }
  }
  if(nivH){
    if (auxRotHorizontal < 0){ // nivDir
      esferaMov.rotation.z -= angleRotHori
      esferaHelice.rotation.y -= angleHori * speedHorDir
      esferaCam.rotation.y -= angleHori * speedHorDir
      if (speedHorDir > 0) 
        speedHorDir -= 0.1
      auxRotHorizontal++
    }
    else if (auxRotHorizontal > 0){ //nivEsq
      esferaMov.rotation.z += angleRotHori 
      esferaHelice.rotation.y += angleHori * speedHorEsq
      esferaCam.rotation.y += angleHori * speedHorEsq
      if (speedHorEsq > 0) 
        speedHorEsq -= 0.1
      auxRotHorizontal-- 
    }
  }
}

// Recura angulos apos trocas de modo de camera
var movz = 0
var hely = 0
var helx = 0
export function forceNiv(esferaHelice, esferaMov) {  
  movz = esferaMov.rotation.z
  hely = esferaHelice.rotation.y                               
  helx = esferaHelice.rotation.x 
  esferaMov.rotation.z = 0     
  esferaHelice.rotation.y = 0                                    
  esferaHelice.rotation.x = 0
}
export function restoreNiv(esferaHelice, esferaMov) {                        
  esferaMov.rotation.z = movz  
  esferaHelice.rotation.y = hely                                 
  esferaHelice.rotation.x = helx
}