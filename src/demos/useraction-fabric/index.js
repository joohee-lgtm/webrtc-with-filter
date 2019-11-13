/*
ref) https://sudo.isl.co/webrtc-real-time-image-filtering/
*/

import {
  runDefaultErrorGuide,
  runDefaultSetup,
  installUserMediaAccess,
  getMediaElement,
} from "../util";
import { initFabric, getFabricCanvas, addRandomEmoji } from "./fabricEmojiService";

let { video, buffer, output } = getMediaElement();

const saveButton = document.getElementById('save');
const addButton = document.getElementById('add');
let videoWidth, videoHeight;

function render() {
  const bufferContext = buffer.getContext('2d');
  const outputContext = output.getContext('2d');

  // 거울모드
  buffer.width = videoWidth;
  buffer.height = videoHeight;
  output.width = videoWidth;
  output.height = videoHeight;

  bufferContext.translate(videoWidth, 0);
  bufferContext.scale(-1, 1);

  // 화면 그리기
  bufferContext.drawImage(video, 0, 0, videoWidth, videoHeight);
  outputContext.drawImage(buffer, 0, 0, videoWidth, videoHeight);

  window.requestAnimationFrame(render);
}

export function saveImage() {
  const a = document.createElement('a');
  const film = document.createElement('canvas');
  const filmContext = film.getContext('2d');
  const fabric = getFabricCanvas();

  film.width = videoWidth;
  film.height = videoHeight;
  filmContext.drawImage(output, 0, 0);
  filmContext.drawImage(fabric, 0, 0);

  // https://stackoverflow.com/questions/10673122/how-to-save-canvas-as-an-image-with-canvas-todataurl
  // here is the most important part because if you dont replace you will get a DOM 18 exception.
  const dataURL = film.toDataURL("image/png").replace("image/png", "image/octet-stream");

  a.setAttribute('download', 'canvasTest.png');
  a.setAttribute('href', dataURL);
  a.click();
}

function canplay() {
  const id = requestAnimationFrame(function () {
    const { width, height } = video.getBoundingClientRect();

    videoWidth = width;
    videoHeight = height;
    if (width < 1 || height < 1) {
      return;
    }

    video.width = width;
    video.height = height;
    output.width = width;
    output.height = height;
    buffer.width = width;
    buffer.height = height;

    render();
    initFabric({ width, height });
    cancelAnimationFrame(id);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  saveButton.addEventListener("click", saveImage);
  addButton.addEventListener('click', () => { addRandomEmoji() });
  video.addEventListener('canplay', canplay);
  installUserMediaAccess()
    .then(runDefaultSetup)
    .catch(runDefaultErrorGuide);
});
