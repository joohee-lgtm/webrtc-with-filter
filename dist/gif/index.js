!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="./dist",n(n.s=10)}({10:function(e,t,n){e.exports=n(11)},11:function(e,t){var n=document.getElementById("video"),o=document.createElement("canvas"),r=document.getElementById("canvas"),i=document.getElementById("icon"),a=document.getElementById("picka");function d(e){r.style.display="block",n.srcObject=e,n.play(),window.devicePixelRatio=1,gifler(a.src).frames("canvas#icon",function(e,t){e.canvas.width=parseInt(.6*a.naturalWidth,10),e.canvas.height=parseInt(.6*a.naturalHeight,10),e.drawImage(t.buffer,0,0,e.canvas.width,e.canvas.height)})}function c(){var e=o.getContext("2d");i.getContext("2d");o.width=n.videoWidth,o.height=n.videoHeight,e.translate(n.videoWidth,0),e.scale(-1,1),e.drawImage(n,0,0),r.width=o.width,r.height=o.height;var t=r.getContext("2d");t.drawImage(o,0,0),t.drawImage(i,0,r.height-i.height),window.requestAnimationFrame(c)}document.addEventListener("DOMContentLoaded",function(){window.navigator.mediaDevices.getUserMedia({audio:!1,video:{facing:"user"}}).then(d).catch(function(e){return console.log("There was an error 😱",e)}),n.addEventListener("canplay",function(){document.getElementById("loading").style.display="none",document.getElementById("content").style.display="block",c()})})}});