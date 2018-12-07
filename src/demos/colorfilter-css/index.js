import "../ua";
import {
  initGUI,
  getFilterValues,
  getDecorateText
} from "./filterGuiService";
import {
  showNotSupport,
  installMediaDevice,
  getMediaElement,
} from "../util";

let {video, buffer, output} = getMediaElement(); 

function decorateTextItem() {
  const outputContext =  output.getContext('2d');

  outputContext.font = "900 60px sans-serif";
  outputContext.fillStyle = "#555588d6";
  outputContext.lineWidth = 20;
  outputContext.strokeStyle = "#555588d6";
  outputContext.fillText(getDecorateText(),26,video.videoHeight-27);
  outputContext.beginPath();
  outputContext.moveTo(15, 15);
  outputContext.lineTo(video.videoWidth-15, 15);
  outputContext.lineTo(video.videoWidth-15, video.videoHeight-15);
  outputContext.lineTo(15, video.videoHeight-15);
  outputContext.lineTo(15,15);
  outputContext.stroke();
}

function render() {
  const bufferContext = buffer.getContext('2d');
  const outputContext =  output.getContext('2d');
  const filterString = Object.values(getFilterValues()).join(" ");

  // 거울모드
  buffer.width = video.videoWidth;
  buffer.height = video.videoHeight;
  bufferContext.translate(video.videoWidth, 0);
  bufferContext.scale(-1, 1);

  // 필터 셋팅
  bufferContext.filter = filterString;
 
  // 화면 그리기
  bufferContext.drawImage(video, 0, 0);
  outputContext.drawImage(buffer,0,0);
  
  decorateTextItem();
  window.requestAnimationFrame(render);
}

function canplay() {
  initGUI();
  render();
}

document.addEventListener("DOMContentLoaded", function() {
  const ctx = document.createElement("canvas").getContext("2d");
  if (ctx.filter === undefined) {
    showNotSupport();
    return ;
  }
  
  video.addEventListener('canplay', canplay);
  installMediaDevice();
});
