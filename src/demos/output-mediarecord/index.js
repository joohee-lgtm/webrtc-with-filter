import "../ua";
import {
  installMediaDevice,
  getMediaElement
} from '../util';

let {video, buffer, output} = getMediaElement();
const icon = document.getElementById('icon');
const picka = document.getElementById('picka');
const canvasRecordButton = document.querySelector('button[data-value="canvasstream"]');
const videoRecordButton = document.querySelector('button[data-value="videostream"]');

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

function render() {
  const bufferContext = buffer.getContext('2d');
  const outputContext =  output.getContext('2d');
  
  // 거울모드
  buffer.width = video.videoWidth;
  buffer.height = video.videoHeight;
  bufferContext.translate(video.videoWidth, 0);
  bufferContext.scale(-1, 1);
  bufferContext.drawImage(video, 0, 0);
  
  // 화면 그리기
  outputContext.drawImage(buffer,0,0);
  outputContext.drawImage(icon, 0, output.height - icon.height);
  
  window.requestAnimationFrame(render);
};

function canplay() {
  gifler(picka.src).frames('canvas#icon', function(iconContext, frame){
    iconContext.canvas.width = parseInt(picka.naturalWidth*0.6, 10);
    iconContext.canvas.height = parseInt(picka.naturalHeight*0.6, 10);
    iconContext.drawImage(frame.buffer, 0, 0, iconContext.canvas.width, iconContext.canvas.height);
  });
  render();
}

let mediaRecorder;
let chunks = [];
let canvasStream = output.captureStream();
let videoStream = video.captureStream();

function videoRecordButtonClickHandler() {
  if (videoRecordButton.classList.contains("ing")) {
    videoRecordButton.classList.remove("ing");
    canvasRecordButton.disabled = false;
    mediaRecorder && mediaRecorder.stop();
  } else {
    videoRecordButton.classList.add("ing");
    canvasRecordButton.disabled = true;
    record(videoStream);
  }
}

function canvasRecordButtonClickHandler() {
  if (canvasRecordButton.classList.contains("ing")) {
    canvasRecordButton.classList.remove("ing");
    videoRecordButton.disabled = false;
    mediaRecorder && mediaRecorder.stop();
  } else {
    canvasRecordButton.classList.add("ing");
    videoRecordButton.disabled = true;
    record(canvasStream);
  }
}

function record(stream) {
  // https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/isTypeSupported
  // https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/mimeType
  // video/mp4 안되는데 짱나게 하고 있네 ..
  mediaRecorder = new MediaRecorder(stream, {
    // mimeType : 'video/mp4'
  });
  window.mr = mediaRecorder;
  mediaRecorder.addEventListener("dataavailable", function(e) {
    chunks.push(e.data);
  });
  mediaRecorder.addEventListener("stop", function(){
    const recordedVideo = document.createElement('video');
    const blob = new Blob(chunks, { 'type' : 'video/webm' });
    const blobURL = URL.createObjectURL(blob);
    recordedVideo.src = blobURL;
    chunks = [];
    
    window.open(blobURL);
  });
  mediaRecorder.start();
}

document.addEventListener("DOMContentLoaded", function(){
  installMediaDevice();
  video.addEventListener('canplay', canplay);
  canvasRecordButton.addEventListener('click', canvasRecordButtonClickHandler);
  videoRecordButton.addEventListener('click', videoRecordButtonClickHandler);
});
