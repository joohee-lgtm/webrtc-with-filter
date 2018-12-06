/*
ref) https://sudo.isl.co/webrtc-real-time-image-filtering/
*/

import {
  installMediaDevice,
  getMediaElement,
} from "../util";
import {initFabric, getFabricCanvas, addRandomEmoji} from "./fabricEmojiService";

let {video, buffer, output} = getMediaElement(); 

const saveButton = document.getElementById('save');
const addButton = document.getElementById('add');
function render() {
  const bufferContext = buffer.getContext('2d');
  const outputContext = output.getContext('2d');

  // 거울모드
  buffer.width = video.videoWidth;
  buffer.height = video.videoHeight;
  bufferContext.translate(video.videoWidth, 0);
  bufferContext.scale(-1, 1);

  // 화면 그리기
  bufferContext.drawImage(video, 0, 0);
  outputContext.drawImage(buffer, 0, 0);

  window.requestAnimationFrame(render);
}

export function saveImage() {
  const a = document.createElement('a');
  const film = document.createElement('canvas');
  const filmContext = film.getContext('2d');
  const fabric = getFabricCanvas();

  film.width = video.videoWidth;
  film.height = video.videoHeight;
  filmContext.drawImage(output, 0, 0);
  filmContext.drawImage(fabric, 0, 0);

  // https://stackoverflow.com/questions/10673122/how-to-save-canvas-as-an-image-with-canvas-todataurl
  // here is the most important part because if you dont replace you will get a DOM 18 exception.
  const dataURL = film.toDataURL("image/png").replace("image/png", "image/octet-stream");

  a.setAttribute('download', 'canvasTest.png');
  a.setAttribute('href', dataURL);
  a.click();
}

function canplay () {
  render();
  initFabric();
}

document.addEventListener("DOMContentLoaded", function() {
  saveButton.addEventListener("click", saveImage);
  addButton.addEventListener('click', () => {addRandomEmoji()});
  video.addEventListener('canplay', canplay);
  installMediaDevice();
});
