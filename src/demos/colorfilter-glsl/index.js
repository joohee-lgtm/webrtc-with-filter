import "../ua";
import { 
  getUserMediaPromise, showPermissionError,
} from '../util';  

const video = document.getElementById('video');
const buffer = document.createElement('canvas');
const canvas = document.getElementById('output');
let glslCanvas, text;

let fragColor = `gl_FragColor = vec4(color, 1.0);`;

function init() {
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
  
  video.srcObject = stream;
  video.play();
    
  window.devicePixelRatio = 1;
  update();
}

function render() {

  buffer.width = video.videoWidth;
  buffer.height = video.videoHeight;
  buffer.getContext('2d').drawImage(video, 0, 0);

  canvas.width = buffer.width;
  canvas.height = buffer.height;

  var dataURL = buffer.toDataURL();
  glslCanvas.setUniform('u_texture', dataURL);
  
  // window.requestAnimationFrame(render);
}

function update() {
  const vertexShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif
    uniform sampler2D u_texture;
    uniform vec2 u_resolution;
    uniform float u_time;
    void main() {
      vec2 st = gl_FragCoord.xy / u_resolution.xy;
      float x = gl_FragCoord.x;
      float y = gl_FragCoord.y;
      vec3 color = texture2D(u_texture, st).rgb;
      ${fragColor}
    }
  `;

  if (glslCanvas) glslCanvas.load(vertexShader);
}

function toggle() {
  fragColor = this.getAttribute('data-shader');
  text = this.innerText;
  document.querySelector('.filter_name').innerText = `filter : ${text}`;
  update();
}

document.addEventListener("DOMContentLoaded", function() {
  init();
});
video.addEventListener('canplay', function(){
  document.getElementById('loading').style.display = "none";
  document.getElementById('content').style.display = "block";
  if (!glslCanvas) {
    
    glslCanvas = new GlslCanvas(canvas);
    update();
  }

  setInterval(function() {
    render();
  }, 100);
});

[...document.getElementById('buttons').children].forEach(button => {
  button.addEventListener('click', toggle);
});