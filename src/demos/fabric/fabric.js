/*
ref) https://sudo.isl.co/webrtc-real-time-image-filtering/
*/

const save = document.getElementById('save');
const video = document.getElementById('video');
const buffer = document.createElement('canvas');
const output = document.getElementById('canvas');
let fabricInstance;

function initFabric() {
  
  fabricInstance = new fabric.Canvas('fabric', {
    width:640,
    height:480
  });
  // fix - lower-canvas 가 1280 으로 맞춰지는 이슈 (왜??)
  fabricInstance.getContext().canvas.width = 640;
  fabricInstance.getContext().canvas.height = 480;

  const red = new fabric.Rect({top: 100, left: 0, width: 80, height: 50, fill: 'red' });
  const blue = new fabric.Rect({top: 0, left: 100, width: 50, height: 70, fill: 'blue' });
  const green = new fabric.Rect({top: 100, left: 100, width: 60, height: 60, fill: 'green' });
  
  fabricInstance.add(red, blue, green)
  fabricInstance.forEachObject(function(o){ o.hasBorders = o.hasControls = false; });
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
  output.style.display = 'block';
  video.srcObject = stream;
  video.play();

  // window.devicePixelRatio = 1;
}

function render() {
  buffer.width = video.videoWidth;
  buffer.height = video.videoHeight;
  output.width = video.videoWidth;
  output.height = video.videoHeight;

  const bufferContext = buffer.getContext('2d');
  const outputContext =  output.getContext('2d');

  // 거울모드
  bufferContext.translate(video.videoWidth, 0);
  bufferContext.scale(-1, 1);
  
  // 화면 그리기
  bufferContext.drawImage(video, 0, 0);
  outputContext.drawImage(buffer,0,0);

  window.requestAnimationFrame(render);
}

function saveImage() {
  const a = document.createElement('a');
  const film = document.createElement('canvas');
  const filmContext = film.getContext('2d');
  const fabricContext = fabricInstance.getContext();

  film.width = video.videoWidth;
  film.height = video.videoHeight;
  filmContext.drawImage(output, 0, 0);
  filmContext.drawImage(fabricContext.canvas, 0, 0);

  // https://stackoverflow.com/questions/10673122/how-to-save-canvas-as-an-image-with-canvas-todataurl
  // here is the most important part because if you dont replace you will get a DOM 18 exception.
  const dataURL = film.toDataURL("image/png").replace("image/png", "image/octet-stream");

  a.setAttribute('download', 'canvasTest.png');
  a.setAttribute('href', dataURL);
  a.click();

  
}

document.addEventListener("DOMContentLoaded", function (){
  init();
  save.addEventListener('click', saveImage);
  video.addEventListener('canplay', function(){
    render();
    initFabric();
  });
});