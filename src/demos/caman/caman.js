/*
ref) https://sudo.isl.co/webrtc-real-time-image-filtering/
*/

const video = document.getElementById('video');
// const buffer = document.createElement('canvas');
const access = document.getElementById('access');
const wrapper = document.getElementById('wrapper');
const buffer = document.getElementById('buffer');
const output = document.getElementById('output');
const fps = 60;

access.addEventListener('click', init);
video.addEventListener('canplay', framerate);

function init() {
  window.navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      facing: 'user'
    }
  })
  .then(stream => {
    window.devicePixelRatio = 1;
    wrapper.style.display = 'block';
    access.style.display = 'none';
    video.srcObject = stream;
    video.play();
    access.removeEventListener('click', init);
    access.addEventListener('click', render);
  })
  .catch(err => console.log('There was an error 😱', err));
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

