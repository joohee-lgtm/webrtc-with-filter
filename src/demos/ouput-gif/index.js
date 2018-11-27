/*
ref) https://sudo.isl.co/webrtc-real-time-image-filtering/
*/
import GIF from "gif.js";

const saveButton = document.querySelector('[data-value="gifjs"]');
const saveCCaptureButtons = document.querySelectorAll('.ccapture');
const saveMP4Button = document.querySelector('.ffmpegserver');
const startRecordingButton = document.querySelector('.record_start');
const stopRecordingButton = document.querySelector('.record_stop');

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

  startRecordingButton.addEventListener('click', startRecording);
  stopRecordingButton.addEventListener('click', stopRecording);
  saveMP4Button.addEventListener('click', saveMP4);
  saveButton.addEventListener('click', save);
  [...saveCCaptureButtons].forEach(function(btn) {
    btn.addEventListener('click', saveUseCCapture.bind(this, btn.dataset.value));
  })
}

const webmCapture = new CCapture({
  format: 'webm',
  framerate: 30,
  verbose: true,
  name: "foobar",     // videos will be named foobar-#.mp4, untitled if not set.
  extension: ".mp4",  // extension for file. default = ".mp4"
  codec: "mpeg4"     // this is an valid ffmpeg codec "mpeg4", "libx264", "flv1", etc... // if not set ffmpeg guesses based on extension.
});
let nowRecording = false;
const webmCaptureCanvas = document.createElement('canvas');
const webmCaptureContext = webmCaptureCanvas.getContext('2d');

const webmCaptureRender = function(){
  webmCaptureContext.drawImage(output, 0, 0);
  webmCaptureContext.restore();
  webmCapture.capture(webmCaptureCanvas);  
}

function startRecording() {
  nowRecording = true;
  startRecordingButton.disabled = true;
  stopRecordingButton.disabled = false;
  webmCaptureCanvas.width = output.width;
  webmCaptureCanvas.height = output.height;
  webmCapture.start();
}

function stopRecording() {
  nowRecording = false;
  startRecordingButton.disabled = false;
  stopRecordingButton.disabled = true;
  webmCapture.stop();
  webmCapture.save();    
}


function showVideoLink(url, size) {
  size = size ? (" [size: " + (size / 1024 / 1024).toFixed(1) + "meg]") : " [unknown size]";
  var a = document.createElement("a");
  a.href = `http://localhost:8080${url}`;
  var filename = url;
  var slashNdx = filename.lastIndexOf("/");
  if (slashNdx >= 0) {
    filename = filename.substr(slashNdx + 1);
  }
  a.download = filename;
  a.appendChild(document.createTextNode(url + size));
  document.body.appendChild(a);
}

function saveMP4(){
  const socketScript = document.querySelector("#serverSocketScript");

  if (socketScript.className.indexOf('load_fail') > -1) {
    alert("ffmpegserver is not running")
    return false;ㅠ
  }

  const capturer = new CCapture({
    format: 'ffmpegserver',
    framerate: 10,
    verbose: true,
    name: "foobar",     // videos will be named foobar-#.mp4, untitled if not set.
    extension: ".mp4",  // extension for file. default = ".mp4"
    codec: "mpeg4",     // this is an valid ffmpeg codec "mpeg4", "libx264", "flv1", etc... // if not set ffmpeg guesses based on extension.
    onProgress: function(e){
      console.log(e);
    }
  });

  const temp = document.createElement('canvas');
  const tempContext = temp.getContext('2d');

  temp.width = buffer.width;
  temp.height = buffer.height;

  capturer.start();
  let i = 0;

  const tempRenderer = function(){
    if (i < gifFrames.length) {
      tempContext.drawImage(buffer, 0, 0);
      tempContext.drawImage(gifFrames[i].buffer, 0, 0);
      tempContext.restore();
      capturer.capture(temp);  
      i++;
      requestAnimationFrame(tempRenderer);
    } else {
      capturer.stop();
      capturer.save(showVideoLink);    
    }
  }

  requestAnimationFrame(tempRenderer);
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

  nowRecording && webmCaptureRender();

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
