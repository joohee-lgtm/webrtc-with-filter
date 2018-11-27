import {
  installMediaDevice,
  getMediaElement
} from '../util';

let {video, buffer, output} = getMediaElement();
const icon = document.getElementById('icon');
const picka = document.getElementById('picka');
const mediaRecorderButton = document.querySelector('button[data-value="mediarecorder"]');
const mediaSourceButton = document.querySelector('button[data-value="mediasource"]');

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
let mediaSource;
let recordedBlobs;
let canvasStream = output.captureStream();
let videoStream = video.captureStream();

function mediaRecorderButtonClickHandler() {
  if (mediaRecorderButton.classList.contains("ing")) {
    mediaRecorder && mediaRecorder.stop();
    return ;
  }

  mediaRecorderButton.classList.add("ing");
  mediaRecorder = new MediaRecorder(videoStream);
  mediaRecorder.addEventListener("dataavailable", function(e) {
    chunks.push(e.data);
  })
  mediaRecorder.addEventListener("stop", function(){
    const recordedVideo = document.createElement('video');
    const blob = new Blob(chunks, { 'type' : 'video/webm' });
    const blobURL = URL.createObjectURL(blob);
    recordedVideo.src = blobURL;
    mediaRecorderButton.classList.remove("ing");
    window.open(blobURL);
  });
  mediaRecorder.start();
}

function mediaSourceButtonClickHandler() {
  if (mediaSourceButton.classList.contains("ing")) {
    mediaRecorder && mediaRecorder.stop();
    return ;
  }

  let options = {mimeType: 'video/webm'};
  recordedBlobs = [];
  mediaSourceButton.classList.add("ing");
  mediaSource = new MediaSource();
  // mediaSource.addEventListener('sourceopen', function() {
  //   mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
  // });

  mediaRecorder = new MediaRecorder(canvasStream, options);
  mediaRecorder.addEventListener("dataavailable", function(e) {
    recordedBlobs.push(e.data);
  });
  mediaRecorder.addEventListener("stop", function(){
    const recordedVideo = document.createElement('video');
    const blob = new Blob(recordedBlobs, { 'type' : 'video/webm' });
    const blobURL = URL.createObjectURL(blob);;
    recordedVideo.src = blobURL;
    mediaRecorderButton.classList.remove("ing");
    window.open(blobURL);
  });
  mediaRecorder.start();
}

document.addEventListener("DOMContentLoaded", function(){
  installMediaDevice();
  video.addEventListener('canplay', canplay);
  mediaRecorderButton.addEventListener('click', mediaRecorderButtonClickHandler);
  mediaSourceButton.addEventListener('click', mediaSourceButtonClickHandler);
});
