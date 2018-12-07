/*
    ref) https://sudo.isl.co/webrtc-real-time-image-filtering/
    <script src="../build/tracking-min.js"></script>
    <script src="../build/data/face-min.js"></script>
    <script src="../build/data/eye-min.js"></script>
    <script src="../build/data/mouth-min.js"></script>
*/
// var video = document.getElementById('video');
// var canvas = document.getElementById('canvas');
// video.addEventListener('canplay', render);

// requestAnimationFrame 관련 이슈 https://github.com/eduardolundgren/tracking.js/issues/182
import {
  getUserMediaPromise, showNotSupport,
} from '../util';
import throttle from "lodash.throttle";

window.plot = function (x, y, w, h) {
  var rect = document.createElement('div');
  document.querySelector('.demo-container').appendChild(rect);
  rect.classList.add('rect');
  rect.style.width = w + 'px';
  rect.style.height = h + 'px';
  rect.style.left = (img.offsetLeft + x) + 'px';
  rect.style.top = (img.offsetTop + y) + 'px';
};

function trackHandler(event) {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  event.data.forEach(function (rect) {
    context.strokeStyle = '#a64ceb';
    context.strokeRect(rect.x, rect.y, rect.width, rect.height);
    context.font = '11px Helvetica';
    context.fillStyle = "#fff";
    context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
    context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
  });
}

function initTraker() {
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const tracker = new tracking.ObjectTracker('eye');

  video.addEventListener('canplay', function () {
    document.querySelector("#loading").style.display = "none";
    document.querySelector("#content").style.display = "block";
  });
  tracker.setStepSize(1.7);
  tracking.track('#video', tracker, {
    camera: true
  });
  tracker.on('track', throttle(function (event) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    trackHandler(event);
  }, 500));
}

window.onload = function () {
  getUserMediaPromise()
  .then(initTraker)
  .catch(showNotSupport)
};