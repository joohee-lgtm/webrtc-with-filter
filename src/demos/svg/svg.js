/*
ref) https://sudo.isl.co/webrtc-real-time-image-filtering/
*/

const video = document.getElementById('video');
const buffer = document.createElement('canvas');
const canvas = document.getElementById('canvas');
let bufferFilter = '';

function init() {
  document.querySelectorAll('filter').forEach(e => {
    document.querySelector('#inputs').insertAdjacentHTML('beforeEnd', `<button>${e.id}</button>`)
  });
  [...document.getElementById('inputs').querySelectorAll('button')].forEach(button => {
  button.addEventListener('click', toggle);
});

  
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
  document.getElementById('access').style.display = 'none';  
  document.getElementById('inputs').style.display = 'block';  
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
  
  window.requestAnimationFrame(render);
}

function toggle() {
  const bufferContext = buffer.getContext('2d');
  
  if (this.innerText.toLowerCase() != 'nothing') {
     bufferFilter = `url(#${this.innerText})`; 
  } else {
    bufferFilter ='';
  }
  document.querySelector("#current").innerText = `current filter : ${this.innerText}`
}


document.getElementById('access').addEventListener('click', init);
video.addEventListener('canplay', render);
