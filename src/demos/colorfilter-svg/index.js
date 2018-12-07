/*
ref) https://sudo.isl.co/webrtc-real-time-image-filtering/
*/
import "../ua";
import { 
  getUserMediaPromise, showPermissionError,
} from '../util';  


const video = document.createElement('video');
const buffer = document.createElement('canvas');
const bufferOriginal = document.createElement('canvas');
const canvas = document.getElementById('canvas');
let bufferFilter = '';

function init() {
  document.querySelectorAll('filter').forEach(e => {
    document.querySelector('#inputs').insertAdjacentHTML('beforeEnd', `<button data-value=${e.id}>${e.id}</button>`)
  });
  [...document.getElementById('inputs').querySelectorAll('button')].forEach(button => {
  button.addEventListener('click', toggle);
});

  
getUserMediaPromise({
    audio: false,
    video: {
      facing: 'user'
    }
  })
  .then(setup)
  .catch(showPermissionError);
}

function setup(stream) {
  canvas.style.display = 'block';
  document.getElementById('inputs').style.display = 'block';  
  video.srcObject = stream;
  video.play();

  window.devicePixelRatio = 1;
}

function render() {
  buffer.width = video.videoWidth;
  buffer.height = video.videoHeight;
  bufferOriginal.width = video.videoWidth;
  bufferOriginal.height = video.videoHeight;
  
  const bufferContext = buffer.getContext('2d');
  const bufferOriginalContenxt = bufferOriginal.getContext('2d');
  const ctx =  canvas.getContext('2d');
  
  // 거울모드
  bufferOriginalContenxt.translate(video.videoWidth, 0);
  bufferOriginalContenxt.scale(-1, 1);

  bufferContext.translate(video.videoWidth, 0);
  bufferContext.scale(-1, 1);
  bufferContext.filter = bufferFilter;
 
  // 화면 그리기
  bufferContext.drawImage(video, 0, 0);
  bufferOriginalContenxt.drawImage(video, 0, 0);

  canvas.width = buffer.width;
  canvas.height = buffer.height;
  
  /**   
    void ctx.drawImage(image, dx, dy);
    void ctx.drawImage(image, dx, dy, dWidth, dHeight);
    void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  */
  ctx.drawImage(bufferOriginal, 0,0, buffer.width/2, buffer.height, 0,0 , buffer.width/2, buffer.height);
  ctx.drawImage(buffer, buffer.width/2,0, buffer.width/2, buffer.height, buffer.width/2,0 , buffer.width/2, buffer.height);
  window.requestAnimationFrame(render);
}

function toggle() {
  if (this.innerText.toLowerCase() != 'nothing') {
     bufferFilter = `url(#${this.innerText})`; 
  } else {
    bufferFilter ='';
  }
  document.querySelector("#current").innerText = `current filter : ${this.innerText}`
}

document.addEventListener("DOMContentLoaded", init);
video.addEventListener('canplay', function() {
  document.getElementById("loading").style.display = "none";
  document.getElementById("content").style.display = "block";
  toggle.apply(document.querySelector("[data-value=duotone_peachypink]"));
  render();
});
