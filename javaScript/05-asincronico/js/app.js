'use strict';

/* ================= SIMULADOR ================= */

const log = document.getElementById('log');
const resultados = document.getElementById('resultados');

let tiempoSecuencial = 0;
let tiempoParalelo = 0;

function simularPeticion(nombre, min=500, max=1500, fallar=false){
  return new Promise((res, rej)=>{
    const tiempo = Math.random()*(max-min)+min;
    setTimeout(()=>{
      if(fallar) rej(new Error("Error en "+nombre));
      else res({nombre, tiempo});
    }, tiempo);
  });
}

function mostrarLog(msg){
  const div = document.createElement('div');
  div.textContent = msg;
  log.appendChild(div);
}

async function cargarSecuencial(){
  log.innerHTML='';
  const inicio = performance.now();

  const u = await simularPeticion("Usuario");
  mostrarLog("Usuario listo");

  const p = await simularPeticion("Posts");
  mostrarLog("Posts listos");

  const c = await simularPeticion("Comentarios");
  mostrarLog("Comentarios listos");

  tiempoSecuencial = performance.now()-inicio;
  mostrarComparativa();
}

async function cargarParalelo(){
  log.innerHTML='';
  const inicio = performance.now();

  await Promise.all([
    simularPeticion("Usuario"),
    simularPeticion("Posts"),
    simularPeticion("Comentarios")
  ]);

  tiempoParalelo = performance.now()-inicio;
  mostrarComparativa();
}

function mostrarComparativa(){
  if(tiempoSecuencial && tiempoParalelo){
    resultados.innerHTML = `
      Secuencial: ${(tiempoSecuencial/1000).toFixed(2)}s <br>
      Paralelo: ${(tiempoParalelo/1000).toFixed(2)}s
    `;
  }
}

document.getElementById('btn-secuencial').onclick=cargarSecuencial;
document.getElementById('btn-paralelo').onclick=cargarParalelo;
document.getElementById('btn-limpiar').onclick=()=>log.innerHTML='';

/* ================= TEMPORIZADOR ================= */

const display = document.getElementById('display');
const barra = document.getElementById('barra-progreso');
const inputTiempo = document.getElementById('input-tiempo');

let intervalo=null, total=0, restante=0;

function actualizar(){
  display.textContent = restante;
  barra.style.width = ((total-restante)/total*100)+"%";
}

function iniciar(){
  if(intervalo) return;
  total = parseInt(inputTiempo.value);
  restante = total;

  intervalo = setInterval(()=>{
    restante--;
    actualizar();
    if(restante<=0){
      clearInterval(intervalo);
      intervalo=null;
      alert("Tiempo terminado");
    }
  },1000);
}

function detener(){
  clearInterval(intervalo);
  intervalo=null;
}

function reiniciar(){
  detener();
  display.textContent="00";
  barra.style.width="0%";
}

document.getElementById('btn-iniciar').onclick=iniciar;
document.getElementById('btn-detener').onclick=detener;
document.getElementById('btn-reiniciar').onclick=reiniciar;

/* ================= ERRORES ================= */

const logErrores = document.getElementById('log-errores');

function logError(msg){
  const d=document.createElement('div');
  d.textContent=msg;
  logErrores.appendChild(d);
}

async function simularError(){
  try{
    await simularPeticion("API",500,1000,true);
  }catch(e){
    logError("Error capturado: "+e.message);
  }
}

async function reintentos(){
  for(let i=1;i<=3;i++){
    try{
      await simularPeticion("API",500,1000,Math.random()>0.5);
      logError("Éxito en intento "+i);
      return;
    }catch(e){
      logError("Falló intento "+i);
    }
  }
  logError("Todos fallaron");
}

document.getElementById('btn-error').onclick=simularError;
document.getElementById('btn-reintentos').onclick=reintentos;