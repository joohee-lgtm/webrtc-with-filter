/*
ref) https://sudo.isl.co/webrtc-real-time-image-filtering/
*/

const video = document.getElementById('video');
const wrapper = document.getElementById('wrapper');
const buffer = document.getElementById('buffer');
const output = document.getElementById('output');
const fps = 60;

function init() {
  window.navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      facing: 'user'
    }
  })
  .then(stream => {
    window.devicePixelRatio = 1;
    video.srcObject = stream;
    video.play();
  })
  .catch(err => {
    if(err.code === 0) {
      document.getElementById('loading').style.display = "none";
      document.getElementById('permission').style.display = "block";
    }
    console.log('There was an error 😱', err)
  });
}

function framerate() {
  setTimeout(function(){
    render();
    Caman("#output", function () {
      this.reloadCanvasData();
      this.greyscale().render(function() {
      // 버퍼 캔버스에 비디오 스트림 그리기
      requestAnimationFrame(framerate);
      });
    });
  }, 1000/fps);
}

function render() {
  const startTime = Date.now();

  buffer.width = video.videoWidth;
  buffer.height = video.videoHeight;
  output.width = video.videoWidth;
  output.height = video.videoHeight;

  const bufferContext = buffer.getContext('2d');
  const outputContext =  output.getContext('2d');

  // 거울모드
  bufferContext.translate(video.videoWidth, 0);
  bufferContext.scale(-1, 1);
  bufferContext.drawImage(video, 0, 0);
  outputContext.drawImage(buffer,0,0);
}

document.addEventListener("DOMContentLoaded", init);
video.addEventListener('canplay', function(){
  document.getElementById('loading').style.display = "none";
  document.getElementById('content').style.display = "block";
  framerate(); 
});
