!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="./dist",n(n.s=5)}({5:function(e,t,n){e.exports=n(6)},6:function(e,t){var n=document.getElementById("video"),o=(document.getElementById("wrapper"),document.getElementById("buffer")),i=document.getElementById("output"),r=60;function d(){setTimeout(function(){!function(){Date.now();o.width=n.videoWidth,o.height=n.videoHeight,i.width=n.videoWidth,i.height=n.videoHeight;var e=o.getContext("2d"),t=i.getContext("2d");e.translate(n.videoWidth,0),e.scale(-1,1),e.drawImage(n,0,0),t.drawImage(o,0,0)}(),Caman("#output",function(){this.reloadCanvasData(),this.greyscale().render(function(){requestAnimationFrame(d)})})},1e3/r)}document.addEventListener("DOMContentLoaded",function(){window.navigator.mediaDevices.getUserMedia({audio:!1,video:{facing:"user"}}).then(function(e){window.devicePixelRatio=1,n.srcObject=e,n.play()}).catch(function(e){0===e.code&&(document.getElementById("loading").style.display="none",document.getElementById("permission").style.display="block"),console.log("There was an error 😱",e)})}),n.addEventListener("canplay",function(){document.getElementById("loading").style.display="none",document.getElementById("content").style.display="block",d()})}});