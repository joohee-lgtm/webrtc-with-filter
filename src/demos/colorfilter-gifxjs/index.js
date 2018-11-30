import glfx from "glfx";
import {
  installMediaDevice,
  getMediaElement,
} from "../util";
let {video, buffer, output} = getMediaElement();
let glfxCanvas, glfxImage;

function render() {
  const bufferContext = buffer.getContext('2d');
  const outputContext =  output.getContext('2d');
  
  // 거울모드
  buffer.width = video.videoWidth;
  buffer.height = video.videoHeight;
  bufferContext.translate(video.videoWidth, 0);
  bufferContext.scale(-1, 1);
 
  // 화면 그리기
  bufferContext.drawImage(video, 0, 0);

  const videoTexture = glfxCanvas.texture(buffer);
  glfxCanvas.draw(videoTexture).hexagonalPixelate(320, 239.5, 20).update();
  outputContext.drawImage(glfxCanvas, 0, 0);

  const text = "WebGL & WebRTC";
  const textWidth = outputContext.measureText(text).width;
  outputContext.font = "900 30pt sans-serif";
  outputContext.fillStyle = "#fff";
  outputContext.textAlign = "center";
  outputContext.textBaseline="middle";
  outputContext.fillText(text,buffer.width/2,buffer.height/2);
  outputContext.lineWidth = 10;
  outputContext.strokeStyle = "#fff";
  outputContext.beginPath();
  outputContext.moveTo(buffer.width/2-textWidth/2-30, buffer.height/2-50);
  outputContext.lineTo(buffer.width/2+textWidth/2+30, buffer.height/2-50);
  outputContext.lineTo(buffer.width/2+textWidth/2+30, buffer.height/2+50);
  outputContext.lineTo(buffer.width/2-textWidth/2-30, buffer.height/2+50);
  outputContext.lineTo(buffer.width/2-textWidth/2-30, buffer.height/2-50);
  outputContext.stroke();

  window.requestAnimationFrame(render);
}

// https://webgl2fundamentals.org/webgl/lessons/ko/webgl-image-processing.html ^^..
function canplay() {
  glfxCanvas = glfx.canvas();
  // output.style.display = "none";
  glfxImage = document.createElement('img');

  render();
  
}

document.addEventListener("DOMContentLoaded", function() {
  video.addEventListener('canplay', canplay);
  installMediaDevice();
});
