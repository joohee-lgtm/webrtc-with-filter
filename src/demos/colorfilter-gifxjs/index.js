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

  const videoTexture = glfxCanvas.texture(video);
  glfxCanvas.draw(videoTexture).triangleBlur(20).update();
  const src = glfxCanvas.toDataURL();
  glfxImage.onload = function() {
    outputContext.drawImage(this, 0, 0);
    window.requestAnimationFrame(render);
  }
  glfxImage.src = src;

  // outputContext.drawImage(src, 0, 0);

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
