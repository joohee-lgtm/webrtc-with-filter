/*
ref) https://sudo.isl.co/webrtc-real-time-image-filtering/
*/

const video = document.createElement('video');
const buffer = document.createElement('canvas');
const canvas = document.getElementById('canvas');
let bufferFilter = '';
let canvasText = 'Hello ' + document.getElementById('textItem').value + '!';  

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

function render(filter) {
  buffer.width = video.videoWidth;
  buffer.height = video.videoHeight;
  
  const bufferContext = buffer.getContext('2d');
  
  // 거울모드
  bufferContext.translate(video.videoWidth, 0);
  bufferContext.scale(-1, 1);
  bufferContext.filter = bufferFilter;
 
  // 화면 그리기
  bufferContext.drawImage(video, 0, 0);
  
  canvas.width = buffer.width;
  canvas.height = buffer.height;

  const ctx =  canvas.getContext('2d');
  
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

function toggle() {
  const bufferContext = buffer.getContext('2d');
  bufferFilter = this.innerText;

}

function textSubmit() {
 const bufferContext = buffer.getContext('2d');
  const text = document.getElementById('textItem').value;
  if (text !== '') {
     canvasText = 'Hello ' +document.querySelector("#textItem").value + '!';
  } else {
    canvasText = '';
  }
 }

document.addEventListener("DOMContentLoaded", init);
video.addEventListener('canplay', function(){
  document.getElementById("loading").style.display = "none";
  document.getElementById("content").style.display = "block";
  render();
});
[...document.getElementById('inputs').querySelectorAll('button')].forEach(button => {
  button.addEventListener('click', toggle);
});

document.querySelector("#textSubmit").addEventListener('click', textSubmit);
