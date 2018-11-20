/*
ref) https://sudo.isl.co/webrtc-real-time-image-filtering/
*/
import dat from "dat.gui";

const save = document.getElementById('save');
const video = document.getElementById('video');
const buffer = document.createElement('canvas');
const output = document.getElementById('canvas');
const addButton = document.querySelector("#add");

let emoji_preset = [0x1F600, 0x1F604, 0x1F34A, 0x1F344, 0x1F37F, 0x1F363, 0x1F370, 0x1F355,
  0x1F354, 0x1F35F, 0x1F6C0, 0x1F48E, 0x1F5FA, 0x23F0, 0x1F579, 0x1F4DA,
  0x1F431, 0x1F42A, 0x1F439, 0x1F424];
let emoji;
let fabricInstance;

function shuffle(a) {
  var array = a.concat([]);
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


function initFabric() {

  fabricInstance = new fabric.Canvas('fabric', {
    width: 640,
    height: 480
  });
  // fix - lower-canvas 가 1280 으로 맞춰지는 이슈 (왜??)
  fabricInstance.getContext().canvas.width = 640;
  fabricInstance.getContext().canvas.height = 480;

  // const red = new fabric.Rect({
  //   top: 100,
  //   left: 0,
  //   width: 80,
  //   height: 50,
  //   fill: 'red'
  // });
  // const blue = new fabric.Rect({
  //   top: 0,
  //   left: 100,
  //   width: 50,
  //   height: 70,
  //   fill: 'blue'
  // });
  // const green = new fabric.Rect({
  //   top: 100,
  //   left: 100,
  //   width: 60,
  //   height: 60,
  //   fill: 'green'
  // });

  // fabricInstance
  //   .add(red, blue, green);
  
  // fabricInstance.forEachObject(function (o) {
  //   o.hasBorders = o.hasControls = false;
  // });
  loadSVG();
  bindDeleteAction();
  bindAddAction();
  addRandomEmoji();
  addRandomEmoji();
  addRandomEmoji();
}

function init() {
  window.navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facing: 'user'
      }
    })
    .then(stream => {
      window.devicePixelRatio = 1;
      video.srcObject = stream;
      video.play();
    })
    .catch(err => {
      if (err.code === 0) {
        document.getElementById('loading').style.display = "none";
        document.getElementById('permission').style.display = "block";
      }
      console.log('There was an error 😱', err)
    });
}

function setup(stream) {
  video.srcObject = stream;
  video.play();

  // window.devicePixelRatio = 1;
}

function render() {
  buffer.width = video.videoWidth;
  buffer.height = video.videoHeight;
  output.width = video.videoWidth;
  output.height = video.videoHeight;

  const bufferContext = buffer.getContext('2d');
  const outputContext = output.getContext('2d');

  // 거울모드
  bufferContext.translate(video.videoWidth, 0);
  bufferContext.scale(-1, 1);

  // 화면 그리기
  bufferContext.drawImage(video, 0, 0);
  outputContext.drawImage(buffer, 0, 0);

  window.requestAnimationFrame(render);
}

function saveImage() {
  const a = document.createElement('a');
  const film = document.createElement('canvas');
  const filmContext = film.getContext('2d');
  const fabricContext = fabricInstance.getContext();

  film.width = video.videoWidth;
  film.height = video.videoHeight;
  filmContext.drawImage(output, 0, 0);
  filmContext.drawImage(fabricContext.canvas, 0, 0);

  // https://stackoverflow.com/questions/10673122/how-to-save-canvas-as-an-image-with-canvas-todataurl
  // here is the most important part because if you dont replace you will get a DOM 18 exception.
  const dataURL = film.toDataURL("image/png").replace("image/png", "image/octet-stream");

  a.setAttribute('download', 'canvasTest.png');
  a.setAttribute('href', dataURL);
  a.click();


}

document.addEventListener("DOMContentLoaded", init);
save.addEventListener("click", saveImage);
video.addEventListener('canplay', function () {
  document.getElementById('loading').style.display = "none";
  document.getElementById('content').style.display = "block";
  // document.getElementById("file").onchange = openSVG;
  render();
  initFabric();
});

function loadSVG(e) {
  const target = document.getElementById("delete");

  fabric.loadSVGFromString(target.outerHTML, function(objects, options) {
    var svg = fabric.util.groupSVGElements(objects, options);
    var config = {
      left: fabricInstance.getWidth() / 2,
      top: fabricInstance.getHeight() - 30,
      fill: '#77f',
      originX: 'center',
      originY: 'center',
      selectable: false,
      hasBorders: false,
      opacity: 0,
      hasControls: false,
      name: "deleteIcon",
    };
    svg.set(config);
    var bg = new fabric.Rect({
      ...config,
      width: 50,
      height: 50,
      name: "deleteIcon",
    })

    svg.scaleToWidth(50);
    svg.scaleToHeight(50);
    // svg.hasBorders = svg.hasControls = false;
    fabricInstance.add(bg, svg).renderAll();
  });
}

function bindAddAction() {
  emoji = shuffle(emoji_preset);
  addButton.addEventListener('click', function() {
    addRandomEmoji();
  });
}

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addRandomEmoji() {
  if (emoji.length < 1) {
    emoji = shuffle(emoji_preset);
  }
  const size = randomInt(25, 50);
  // const size = 300;
  const random = new fabric.Textbox(String.fromCodePoint(emoji.pop()), {
    top: randomInt(10, 470),
    left: randomInt(10, 630),
    angle: randomInt(-180, 180),
    fontSize: size,
    hasBorders: false,
    hasControls: false,
  });
  fabricInstance
    .add(random).renderAll();
}

function bindDeleteAction() {
  // http://fabricjs.com/intersection
  fabricInstance.on({
    'object:moving': function(e) {
      e.target.setCoords();
      fabricInstance.forEachObject(function(obj) {
        if (obj === e.target || obj.name !== "deleteIcon") return;
        obj.set('opacity' ,e.target.intersectsWithObject(obj) ? 0.8 : 0.4);
      });
    },
    'object:moved' : function(e) {
      e.target.setCoords();
      const icons = fabricInstance.getObjects().filter(function(obj) {
        return obj.name === "deleteIcon";
      });
      if(e.target.intersectsWithObject(icons[0])) {
        fabricInstance.remove(e.target);
      }
      icons.forEach(function(icon) {
        icon.set("opacity", 0);
      })
    }
  })
}