
const emoji_preset = ["0x1F601", "0x1F602", "0x1F603", "0x1F604", "0x1F605", "0x1F606", "0x1F609", "0x1F60A", "0x1F60B", "0x1F60C", "0x1F60D", "0x1F60F", "0x1F612", "0x1F613", "0x1F614", "0x1F616", "0x1F618", "0x1F61A", "0x1F61C", "0x1F61D", "0x1F61E", "0x1F620", "0x1F621", "0x1F622", "0x1F623", "0x1F624", "0x1F625", "0x1F628", "0x1F629", "0x1F62A", "0x1F62B", "0x1F62D", "0x1F630", "0x1F631", "0x1F632", "0x1F633", "0x1F635", "0x1F637", "0x1F638", "0x1F639", "0x1F63A", "0x1F63B", "0x1F63C", "0x1F63D", "0x1F63E", "0x1F63F", "0x1F640", "0x1F645", "0x1F646", "0x1F647", "0x1F648", "0x1F649", "0x1F64A", "0x1F64B", "0x1F64C", "0x1F64D", "0x1F64E", "0x1F64F"];
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

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


export function initFabric() {
  fabricInstance = new fabric.Canvas('fabric', {
    width: 640,
    height: 480
  });
  // fix - lower-canvas 가 1280 으로 맞춰지는 이슈 (왜??)
  fabricInstance.getContext().canvas.width = 640;
  fabricInstance.getContext().canvas.height = 480;

  loadSVG();
  bindDeleteAction();
//   bindAddAction();
  emoji = shuffle(emoji_preset);
  addRandomEmoji();
  addRandomEmoji();
  addRandomEmoji();
}

  
  function loadSVG(e) {
    const target = document.getElementById("delete");
  
    fabric.loadSVGFromString(target.outerHTML, function(objects, options) {
      var svg = fabric.util.groupSVGElements(objects, options);
      var config = {
        left: fabricInstance.getWidth() / 2,
        top: fabricInstance.getHeight() - 30,
        fill: '#fff',
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
  
  
  export function addRandomEmoji(post = {
    y: randomInt(10, 470), 
    x: randomInt(10, 630)
  }) {
    if (emoji.length < 1) {
      emoji = shuffle(emoji_preset);
    }
    const size = randomInt(25, 50);
    // const size = 300;
    const random = new fabric.Textbox(String.fromCodePoint(emoji.pop()), {
      top: post.y,
      left: post.x,
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
      'mouse:down' : function(options) {
        !options.target && addRandomEmoji(options.pointer);
      },
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
  
  export function getFabricCanvas() {
      return fabricInstance.getContext().canvas;
  }