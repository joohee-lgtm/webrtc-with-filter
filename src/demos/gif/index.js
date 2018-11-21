/*
ref) https://sudo.isl.co/webrtc-real-time-image-filtering/
*/
import GIF from "gif.js";

const saveButton = document.querySelector('[data-value="gifjs"]');
const saveCCaptureButtons = document.querySelectorAll('.ccapture');
const video = document.getElementById('video');
const preview = document.getElementById('preview');
const buffer = document.createElement('canvas');
const output = document.getElementById('output');
const icon = document.getElementById('icon');
const picka = document.getElementById('picka');

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

let gifFrames = [];

function setup(stream) {
  video.srcObject = stream;
  video.play();

  window.devicePixelRatio = 1;
  
  const prm = gifler(picka.src).frames('canvas#icon', function(iconContext, frame){
    iconContext.canvas.width = parseInt(picka.naturalWidth*0.6, 10);
    iconContext.canvas.height = parseInt(picka.naturalHeight*0.6, 10);
    
    iconContext.drawImage(frame.buffer, 0, 0, iconContext.canvas.width, iconContext.canvas.height);
  });

  prm.then(function(e) {
    gifFrames = [].concat(e._frames);
  });

  saveButton.addEventListener('click', save);
  [...saveCCaptureButtons].forEach(function(btn) {
    btn.addEventListener('click', saveUseCCapture.bind(this, btn.dataset.value));
  })
}

function saveUseCCapture(format) {
  const temp = document.createElement('canvas');
  const tempContext = temp.getContext('2d');
  const capturer = new CCapture({
    format,
    workersPath: './',
    framerate: 4,
    verbose: true  
  });

  temp.width = buffer.width;
  temp.height = buffer.height;

  capturer.start();

  tempContext.drawImage(buffer, 0, 0);
  tempContext.drawImage(gifFrames[0].buffer, 0, 0);
  capturer.capture(temp);

  tempContext.drawImage(buffer, 0, 0);
  tempContext.drawImage(gifFrames[1].buffer, 0, 0);
  capturer.capture(temp);

  tempContext.drawImage(buffer, 0, 0);
  tempContext.drawImage(gifFrames[2].buffer, 0, 0);
  capturer.capture(temp);

  tempContext.drawImage(buffer, 0, 0);
  tempContext.drawImage(gifFrames[3].buffer, 0, 0);
  capturer.capture(temp);

  capturer.stop();
  capturer.save();
}

function save() {
  const temp = document.createElement('canvas');
  const tempContext = temp.getContext('2d');
  const gif = new GIF({
    workers: 1,
    quality: 30,
    width: buffer.width,
    height: buffer.height
  });

  temp.width = buffer.width;
  temp.height = buffer.height;

  // gifFrames[0].buffer.width = icon.width;
  // gifFrames[0].buffer.height = icon.height;
  const gifOption = {
    delay: 70, // TODO delay from original gif
    copy: true
  }
  
  tempContext.drawImage(buffer, 0, 0);
  tempContext.drawImage(gifFrames[0].buffer, 0, 0);
  gif.addFrame(tempContext, gifOption);

  tempContext.drawImage(buffer, 0, 0);
  tempContext.drawImage(gifFrames[1].buffer, 0, 0);
  gif.addFrame(tempContext, gifOption);

  tempContext.drawImage(buffer, 0, 0);
  tempContext.drawImage(gifFrames[2].buffer, 0, 0);
  gif.addFrame(tempContext, gifOption);

  tempContext.drawImage(buffer, 0, 0);
  tempContext.drawImage(gifFrames[3].buffer, 0, 0);
  gif.addFrame(tempContext, gifOption);
  
  gif.on('finished', function(blob) {
    const src = URL.createObjectURL(blob);
    preview.src = src;
  });

  gif.render();
}

function render() {
  const bufferContext = buffer.getContext('2d');
  buffer.width = video.videoWidth;
  buffer.height = video.videoHeight;
  
  // 거울모드
  bufferContext.translate(video.videoWidth, 0);
  bufferContext.scale(-1, 1);
  
  // 화면 그리기
  bufferContext.drawImage(video, 0, 0);

  output.width = buffer.width;
  output.height = buffer.height;

  const ctx =  output.getContext('2d');
  
  ctx.drawImage(buffer,0,0);
  ctx.drawImage(icon,0,output.height - icon.height);

  window.requestAnimationFrame(render);
};

document.addEventListener("DOMContentLoaded", function(){
  init();
  video.addEventListener('canplay', function(){
    document.getElementById('loading').style.display = 'none';  
    document.getElementById('content').style.display = 'block';  

    render();
  });
});
