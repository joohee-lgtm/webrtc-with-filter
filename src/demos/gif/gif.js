/*
ref) https://sudo.isl.co/webrtc-real-time-image-filtering/
*/

const video = document.getElementById('video');
const buffer = document.createElement('canvas');
const canvas = document.getElementById('canvas');
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

function setup(stream) {
  canvas.style.display = 'block';

  video.srcObject = stream;
  video.play();

  window.devicePixelRatio = 1;
  
  gifler(picka.src).frames('canvas#icon', function(iconContext, frame){
    iconContext.canvas.width = parseInt(picka.naturalWidth*0.6, 10);
    iconContext.canvas.height = parseInt(picka.naturalHeight*0.6, 10);
    
    iconContext.drawImage(frame.buffer, 0, 0, iconContext.canvas.width, iconContext.canvas.height);
  });
}

function render() {
  const bufferContext = buffer.getContext('2d');
  const iconContext = icon.getContext('2d');  
  buffer.width = video.videoWidth;
  buffer.height = video.videoHeight;
  
  // 거울모드
  bufferContext.translate(video.videoWidth, 0);
  bufferContext.scale(-1, 1);
  
  // 화면 그리기
  bufferContext.drawImage(video, 0, 0);

  canvas.width = buffer.width;
  canvas.height = buffer.height;

  const ctx =  canvas.getContext('2d');
  
  ctx.drawImage(buffer,0,0);
  ctx.drawImage(icon,0,canvas.height - icon.height);

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