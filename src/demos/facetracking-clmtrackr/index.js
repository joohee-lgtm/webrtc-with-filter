import dat from "dat.gui";
import {
  getMediaElement,
  runDefaultSetup,
  runDefaultErrorGuide,
  installUserMediaAccess
} from "../util";


const featureColorMap = {
  shape: "#000",
  rightEyePoint: "#000",
  leftEyePoint: "#000",
  rightEye: "#000",
  leftEye: "#000",
  rightEyebrow: "#000",
  leftEyebrow: "#000",
  upperLip: "#000",
  lowerLip: "#000",
  noseRidge: "#000",
  noseSide: "#000"
};
let { video, output } = getMediaElement();
let ctrack, gui;

function initGUI() {
  gui = new dat.GUI({ autoPlace: true });
  document.getElementById('my-gui-container').appendChild(gui.domElement);

  const featureNames = Object.keys(featureColorMap);

  featureNames.forEach(function (name) {
    gui.addColor(featureColorMap, name)
      .listen()
      .onChange(function (color) {
        featureColorMap[name] = color;
      });
  });
}

// https://www.auduno.com/clmtrackr/examples/media/facemodel_numbering_new.png
function parseFaceModel(f) {
  const shape = f.slice(0, 15);
  const rightEyebrow = f.slice(15, 19);
  const leftEyebrow = f.slice(19, 23);
  const rightEye = [f[23], f[63], f[24], f[64], f[25], f[65], f[26], f[66], f[23]];
  const leftEye = [f[30], f[68], f[29], f[67], f[28], f[70], f[31], f[69], f[30]];
  const rightEyePoint = [f[32]];
  const leftEyePoint = [f[27]];
  const upperLip = f.slice(44, 51).concat([f[59], f[60], f[61], f[44]]);
  const lowerLip = f.slice(50, 56).concat([f[44], f[56], f[57], f[58], f[50]]);
  const noseRidge = [f[33], f[41], f[62]];
  const noseSide = [f[34], f[35], f[36], f[42], f[37], f[43], f[38], f[39], f[40]];

  return {
    shape,
    rightEyePoint, leftEyePoint,
    rightEye, leftEye,
    rightEyebrow, leftEyebrow,
    upperLip, lowerLip,
    noseRidge, noseSide
  }
}

function render() {
  const faceMatch = ctrack.getCurrentPosition();
  const outputContext = output.getContext('2d');

  outputContext.clearRect(0, 0, output.width, output.height);

  if (faceMatch) {
    const parsed = parseFaceModel(faceMatch);

    Object.keys(parsed).forEach(function (key) {
      strokePath(parsed[key], featureColorMap[key]);
    });
  }

  window.requestAnimationFrame(render);
}

function strokePath(paths, color) {
  const outputContext = output.getContext('2d');

  if (paths.length < 2) {
    outputContext.beginPath();
    outputContext.strokeStyle = color;
    outputContext.rect(paths[0][0], paths[0][1], 1, 1);
    outputContext.stroke();
    return;
  }

  outputContext.beginPath();
  outputContext.strokeStyle = color;
  outputContext.moveTo.apply(outputContext, paths.shift());

  paths.forEach(point => outputContext.lineTo.apply(outputContext, point));
  outputContext.stroke();
}

function canplay() {
  const id = window.requestAnimationFrame(function () {
    const { width, height } = video.getBoundingClientRect();

    if (width < 1 || height < 1) {
      return;
    }

    video.width = width;
    video.height = height;
    output.width = width;
    output.height = height;

    ctrack = new clm.tracker();
    ctrack.init();
    ctrack.start(video);

    initGUI();
    render();

    window.cancelAnimationFrame(id);
  })

}

document.addEventListener("DOMContentLoaded", function () {
  video.addEventListener('canplay', canplay);
  installUserMediaAccess()
    .then(runDefaultSetup)
    .catch(runDefaultErrorGuide);
});
