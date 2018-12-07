import dat from "dat.gui";

const canvasFilterValue = document.querySelector('.filter_value');
let gui;
const resetButton = document.querySelector('.reset');

let canvasText = 'Hello WebRTC!';
let updated = {};
let guiControllerMap = {};
let filters = {
    // min, max, default (=none), filterText
    blur: [0, 100, 0, "blur(${value}px)"],
    brightness: [0, 1000, 100, "brightness(${value}%)"],
    contrast: [0, 1000, 100, "contrast(${value}%)"],
    grayscale: [0, 100, 0, "grayscale(${value}%)"],
    hue_rotate: [0,360, 0, "hue-rotate(${value}deg)"],
    invert: [0, 100, 0, "invert(${value}%)"],
    opacity: [0, 100, 100, "opacity(${value}%)"],
    saturate: [0, 1000, 100, "saturate(${value}%)"],
    sepia: [0, 100, 0, "sepia(${value}%)"],
}

export function initGUI() {
    gui = new dat.GUI()
    resetButton.addEventListener("click", reset);
    const filterName = Object.keys(filters);
    
    guiControllerMap["message"] = gui
      .add({message: 'WebRTC'}, 'message')
      .name('message')
      .listen()
      .onChange(function(e) {
        if(e === "") {
          canvasText = "";
        } else {
          canvasText = `Hello ${e}!`;
        }
      });
  
    filterName.forEach(function(name) {
      const value = filters[name];
      guiControllerMap[name] = gui.add(
        {[name] : value[2]},
        name,
        value[0],
        value[1]
      )
      .name(name)
      .listen()
      .onChange(function (e) {
        updateFilters(name, Math.floor(e));
      });
    });
}

function reset() {
    guiControllerMap['message'].setValue("WebRTC");
  
    const filterName = Object.keys(filters);
    filterName.forEach(function(name) {
        let target = canvasFilterValue.querySelector(`.${name}`) 
        target && resetTarget(target, name);
    });
  }
  
  function resetTarget(self, name) {
    guiControllerMap[name].setValue(filters[name][2]);
    self.parentElement.removeChild(self);
  }
  

function updateFilters(name, value) {
    const target = filters[name];

    if (value === target[2]) {
        delete updated[name];
    } else {
        updated[name] = target[3].replace("${value}", value);
    }

    Object.keys(updated).forEach(function(key){
        let target = canvasFilterValue.querySelector(`.${key}`) 
        if(!target) {
        target = document.createElement('button');
        target.className = key;
        canvasFilterValue.appendChild(target);
        target.addEventListener('click', function() {
            resetTarget(target, key)
        });
        }
        target.innerText = updated[key];
    });  
}

export function getFilterValues() {
    return updated;
}
export function getDecorateText() {
    return canvasText;
};