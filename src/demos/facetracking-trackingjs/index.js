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
import throttle from "lodash.throttle";

function render() {
    const bufferContext = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // 거울모드
    bufferContext.translate(video.videoWidth, 0);
    bufferContext.scale(-1, 1);
    
    // 화면 그리기
    bufferContext.drawImage(video, 0, 0);
  
    window.requestAnimationFrame(render);
  };
  

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
    video.srcObject = stream;
    video.play();
      
    window.devicePixelRatio = 1;
  }


window.plot = function(x, y, w, h) {
    var rect = document.createElement('div');
    document.querySelector('.demo-container').appendChild(rect);
    rect.classList.add('rect');
    rect.style.width = w + 'px';
    rect.style.height = h + 'px';
    rect.style.left = (img.offsetLeft + x) + 'px';
    rect.style.top = (img.offsetTop + y) + 'px';
};
  
window.onload = function() {
    // init();
    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    video.addEventListener('canplay', function() {
        document.querySelector("#loading").style.display = "none";
        document.querySelector("#content").style.display = "block";
      });
    
    var context = canvas.getContext('2d');
    // var tracker = new tracking.ObjectTracker(['face', 'eye', 'mouth']);
    var tracker = new tracking.ObjectTracker('eye');

    // tracker.setInitialScale(4);
    tracker.setStepSize(1.7);
    // tracker.setEdgesDensity(0.1);
    tracking.track('#video', tracker, { camera: true });
    tracker.on('track', throttle(function(event) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        event.data.forEach(function(rect) {
            context.strokeStyle = '#a64ceb';
            context.strokeRect(rect.x, rect.y, rect.width, rect.height);
            context.font = '11px Helvetica';
            context.fillStyle = "#fff";
            context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
            context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
        });
    }, 500));
};
