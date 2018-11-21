/*
ref) https://sudo.isl.co/webrtc-real-time-image-filtering/
*/
import dat from "dat.gui";

const video = document.createElement('video');
const buffer = document.createElement('canvas');
const output = document.getElementById('output');
const resetButton = document.querySelector('.reset');
const canvasFilterValue = document.querySelector('.filter_value');
const gui = new dat.GUI();
let bufferFilter = '';
let canvasText = 'Hello WebRTC!';

let filters = {
  // min, max, default (=none), filterText
  blur: [0, 100, 0, "blur(${value}px)"],
  brightness: [0, 1000, 100, "brightness(${value}%)"],
  contrast: [0, 1000, 100, "contrast(${value}%)"],
  grayscale: [0, 100, 0, "grayscale(${value}%)"],
  hue_rotate: [0,360, 0, "hue-rotate(${value}deg)"],
  invert: [0, 100, 0, "invert(${value}%)"],
  opacity: [0, 100, 100, "opacity(${value}%)"],
  saturate: [0, 1000, 100, "saturate(${value}%)"],
  sepia: [0, 100, 0, "sepia(${value}%)"],
}
let updated = {};
let guiControllerMap = {};

function updateFilters(name, value) {
  const target = filters[name];

  if (value === target[2]) {
     delete updated[name];
  } else {
    updated[name] = target[3].replace("${value}", value);
  }

  Object.keys(updated).forEach(function(key){
    let target = canvasFilterValue.querySelector(`.${key}`) 
    if(!target) {
      target = document.createElement('button');
      target.className = key;
      canvasFilterValue.appendChild(target);
      target.addEventListener('click', function() {
        resetTarget(target, key)
      });
    }
    target.innerText = updated[key];
  });  

  bufferFilter = Object.values(updated).join(" ");

  // canvasFilterValue.innerText = bufferFilter;
}

function initGUI() {
  const filterName = Object.keys(filters);
  
  const guiInstance = gui
    .add({message: 'WebRTC'}, 'message')
    // .add(filterInstance, "message")
    .name('message')
    .listen()
    .onChange(function(e) {
      if(e === "") {
        canvasText = "";
      } else {
        canvasText = `Hello ${e}!`;
      }
    });

    guiControllerMap["message"] = guiInstance;

  filterName.forEach(function(name) {
    const value = filters[name];
    const controller = gui.add(
      {[name] : value[2]},
      // filterInstance,
      name,
      value[0],
      value[1]
    )
    .name(name)
    .listen()
    .onChange(function (e) {
      updateFilters(name, Math.floor(e));
    });

    guiControllerMap[name] = controller;
  });
}

function reset() {
  guiControllerMap['message'].setValue("WebRTC");

  const filterName = Object.keys(filters);
  filterName.forEach(function(name) {
    guiControllerMap[name].setValue(filters[name][2]);
  })
}

function resetTarget(self, name) {
  guiControllerMap[name].setValue(filters[name][2]);
  self.parentElement.removeChild(self);
}

function init() {
  window.navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      facing: 'user'
    }
  })
  .then(setup)
  .catch((err) => console.log('There was an error 😱', err));
}

function setup(stream) {
  video.srcObject = stream;
  video.play();

  window.devicePixelRatio = 1;
}

function render() {
  buffer.width = video.videoWidth;
  buffer.height = video.videoHeight;
  
  const bufferContext = buffer.getContext('2d');
  
  // 거울모드
  bufferContext.translate(video.videoWidth, 0);
  bufferContext.scale(-1, 1);
  bufferContext.filter = bufferFilter;
 
  // 화면 그리기
  bufferContext.drawImage(video, 0, 0);
  
  output.width = buffer.width;
  output.height = buffer.height;

  const ctx =  output.getContext('2d');
  
  ctx.drawImage(buffer,0,0);
  
  
  ctx.font = "900 60px sans-serif";
  ctx.fillStyle = "#555588d6";
  ctx.fillText(
    canvasText,
    26,
    video.videoHeight-27
  );
  ctx.lineWidth = 30;
  ctx.strokeStyle = "#555588d6";
  ctx.beginPath();
  ctx.moveTo(15, 15);
  ctx.lineTo(video.videoWidth-15, 15);
  ctx.lineTo(video.videoWidth-15, video.videoHeight-15);
  ctx.lineTo(15, video.videoHeight-15);
  ctx.lineTo(15,15);
  ctx.stroke();

  window.requestAnimationFrame(render);
}

resetButton.addEventListener("click", reset);
document.addEventListener("DOMContentLoaded", init);
video.addEventListener('canplay', function(){
  document.getElementById("loading").style.display = "none";
  document.getElementById("content").style.display = "block";
  initGUI();
  render();
});

