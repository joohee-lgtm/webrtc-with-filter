!function(e){var n=window.webpackHotUpdate;window.webpackHotUpdate=function(e,t){!function(e,n){if(!w[e]||!b[e])return;for(var t in b[e]=!1,n)Object.prototype.hasOwnProperty.call(n,t)&&(h[t]=n[t]);0==--y&&0===m&&j()}(e,t),n&&n(e,t)};var t,r=!0,o="134d30b0df741c087f1f",i=1e4,d={},c=[],a=[];function s(e){var n=I[e];if(!n)return x;var r=function(r){return n.hot.active?(I[r]?-1===I[r].parents.indexOf(e)&&I[r].parents.push(e):(c=[e],t=r),-1===n.children.indexOf(r)&&n.children.push(r)):(console.warn("[HMR] unexpected require("+r+") from disposed module "+e),c=[]),x(r)},o=function(e){return{configurable:!0,enumerable:!0,get:function(){return x[e]},set:function(n){x[e]=n}}};for(var i in x)Object.prototype.hasOwnProperty.call(x,i)&&"e"!==i&&"t"!==i&&Object.defineProperty(r,i,o(i));return r.e=function(e){return"ready"===l&&p("prepare"),m++,x.e(e).then(n,function(e){throw n(),e});function n(){m--,"prepare"===l&&(g[e]||_(e),0===m&&0===y&&j())}},r.t=function(e,n){return 1&n&&(e=r(e)),x.t(e,-2&n)},r}var u=[],l="idle";function p(e){l=e;for(var n=0;n<u.length;n++)u[n].call(null,e)}var f,h,v,y=0,m=0,g={},b={},w={};function O(e){return+e+""===e?+e:e}function E(e){if("idle"!==l)throw new Error("check() is only allowed in idle status");return r=e,p("check"),function(e){return e=e||1e4,new Promise(function(n,t){if("undefined"==typeof XMLHttpRequest)return t(new Error("No browser support"));try{var r=new XMLHttpRequest,i=x.p+""+o+".hot-update.json";r.open("GET",i,!0),r.timeout=e,r.send(null)}catch(e){return t(e)}r.onreadystatechange=function(){if(4===r.readyState)if(0===r.status)t(new Error("Manifest request to "+i+" timed out."));else if(404===r.status)n();else if(200!==r.status&&304!==r.status)t(new Error("Manifest request to "+i+" failed."));else{try{var e=JSON.parse(r.responseText)}catch(e){return void t(e)}n(e)}}})}(i).then(function(e){if(!e)return p("idle"),null;b={},g={},w=e.c,v=e.h,p("prepare");var n=new Promise(function(e,n){f={resolve:e,reject:n}});h={};return _(10),"prepare"===l&&0===m&&0===y&&j(),n})}function _(e){w[e]?(b[e]=!0,y++,function(e){var n=document.getElementsByTagName("head")[0],t=document.createElement("script");t.charset="utf-8",t.src=x.p+""+e+"."+o+".hot-update.js",n.appendChild(t)}(e)):g[e]=!0}function j(){p("ready");var e=f;if(f=null,e)if(r)Promise.resolve().then(function(){return D(r)}).then(function(n){e.resolve(n)},function(n){e.reject(n)});else{var n=[];for(var t in h)Object.prototype.hasOwnProperty.call(h,t)&&n.push(O(t));e.resolve(n)}}function D(n){if("ready"!==l)throw new Error("apply() is only allowed in ready status");var t,r,i,a,s;function u(e){for(var n=[e],t={},r=n.slice().map(function(e){return{chain:[e],id:e}});r.length>0;){var o=r.pop(),i=o.id,d=o.chain;if((a=I[i])&&!a.hot._selfAccepted){if(a.hot._selfDeclined)return{type:"self-declined",chain:d,moduleId:i};if(a.hot._main)return{type:"unaccepted",chain:d,moduleId:i};for(var c=0;c<a.parents.length;c++){var s=a.parents[c],u=I[s];if(u){if(u.hot._declinedDependencies[i])return{type:"declined",chain:d.concat([s]),moduleId:i,parentId:s};-1===n.indexOf(s)&&(u.hot._acceptedDependencies[i]?(t[s]||(t[s]=[]),f(t[s],[i])):(delete t[s],n.push(s),r.push({chain:d.concat([s]),id:s})))}}}}return{type:"accepted",moduleId:e,outdatedModules:n,outdatedDependencies:t}}function f(e,n){for(var t=0;t<n.length;t++){var r=n[t];-1===e.indexOf(r)&&e.push(r)}}n=n||{};var y={},m=[],g={},b=function(){console.warn("[HMR] unexpected require("+_.moduleId+") to disposed module")};for(var E in h)if(Object.prototype.hasOwnProperty.call(h,E)){var _;s=O(E);var j=!1,D=!1,H=!1,P="";switch((_=h[E]?u(s):{type:"disposed",moduleId:E}).chain&&(P="\nUpdate propagation: "+_.chain.join(" -> ")),_.type){case"self-declined":n.onDeclined&&n.onDeclined(_),n.ignoreDeclined||(j=new Error("Aborted because of self decline: "+_.moduleId+P));break;case"declined":n.onDeclined&&n.onDeclined(_),n.ignoreDeclined||(j=new Error("Aborted because of declined dependency: "+_.moduleId+" in "+_.parentId+P));break;case"unaccepted":n.onUnaccepted&&n.onUnaccepted(_),n.ignoreUnaccepted||(j=new Error("Aborted because "+s+" is not accepted"+P));break;case"accepted":n.onAccepted&&n.onAccepted(_),D=!0;break;case"disposed":n.onDisposed&&n.onDisposed(_),H=!0;break;default:throw new Error("Unexception type "+_.type)}if(j)return p("abort"),Promise.reject(j);if(D)for(s in g[s]=h[s],f(m,_.outdatedModules),_.outdatedDependencies)Object.prototype.hasOwnProperty.call(_.outdatedDependencies,s)&&(y[s]||(y[s]=[]),f(y[s],_.outdatedDependencies[s]));H&&(f(m,[_.moduleId]),g[s]=b)}var L,k=[];for(r=0;r<m.length;r++)s=m[r],I[s]&&I[s].hot._selfAccepted&&k.push({module:s,errorHandler:I[s].hot._selfAccepted});p("dispose"),Object.keys(w).forEach(function(e){!1===w[e]&&function(e){delete installedChunks[e]}(e)});for(var M,S,A=m.slice();A.length>0;)if(s=A.pop(),a=I[s]){var U={},q=a.hot._disposeHandlers;for(i=0;i<q.length;i++)(t=q[i])(U);for(d[s]=U,a.hot.active=!1,delete I[s],delete y[s],i=0;i<a.children.length;i++){var R=I[a.children[i]];R&&((L=R.parents.indexOf(s))>=0&&R.parents.splice(L,1))}}for(s in y)if(Object.prototype.hasOwnProperty.call(y,s)&&(a=I[s]))for(S=y[s],i=0;i<S.length;i++)M=S[i],(L=a.children.indexOf(M))>=0&&a.children.splice(L,1);for(s in p("apply"),o=v,g)Object.prototype.hasOwnProperty.call(g,s)&&(e[s]=g[s]);var B=null;for(s in y)if(Object.prototype.hasOwnProperty.call(y,s)&&(a=I[s])){S=y[s];var C=[];for(r=0;r<S.length;r++)if(M=S[r],t=a.hot._acceptedDependencies[M]){if(-1!==C.indexOf(t))continue;C.push(t)}for(r=0;r<C.length;r++){t=C[r];try{t(S)}catch(e){n.onErrored&&n.onErrored({type:"accept-errored",moduleId:s,dependencyId:S[r],error:e}),n.ignoreErrored||B||(B=e)}}}for(r=0;r<k.length;r++){var T=k[r];s=T.module,c=[s];try{x(s)}catch(e){if("function"==typeof T.errorHandler)try{T.errorHandler(e)}catch(t){n.onErrored&&n.onErrored({type:"self-accept-error-handler-errored",moduleId:s,error:t,originalError:e}),n.ignoreErrored||B||(B=t),B||(B=e)}else n.onErrored&&n.onErrored({type:"self-accept-errored",moduleId:s,error:e}),n.ignoreErrored||B||(B=e)}}return B?(p("fail"),Promise.reject(B)):(p("idle"),new Promise(function(e){e(m)}))}var I={};function x(n){if(I[n])return I[n].exports;var r=I[n]={i:n,l:!1,exports:{},hot:function(e){var n={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_disposeHandlers:[],_main:t!==e,active:!0,accept:function(e,t){if(void 0===e)n._selfAccepted=!0;else if("function"==typeof e)n._selfAccepted=e;else if("object"==typeof e)for(var r=0;r<e.length;r++)n._acceptedDependencies[e[r]]=t||function(){};else n._acceptedDependencies[e]=t||function(){}},decline:function(e){if(void 0===e)n._selfDeclined=!0;else if("object"==typeof e)for(var t=0;t<e.length;t++)n._declinedDependencies[e[t]]=!0;else n._declinedDependencies[e]=!0},dispose:function(e){n._disposeHandlers.push(e)},addDisposeHandler:function(e){n._disposeHandlers.push(e)},removeDisposeHandler:function(e){var t=n._disposeHandlers.indexOf(e);t>=0&&n._disposeHandlers.splice(t,1)},check:E,apply:D,status:function(e){if(!e)return l;u.push(e)},addStatusHandler:function(e){u.push(e)},removeStatusHandler:function(e){var n=u.indexOf(e);n>=0&&u.splice(n,1)},data:d[e]};return t=void 0,n}(n),parents:(a=c,c=[],a),children:[]};return e[n].call(r.exports,r,r.exports,s(n)),r.l=!0,r.exports}x.m=e,x.c=I,x.d=function(e,n,t){x.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},x.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},x.t=function(e,n){if(1&n&&(e=x(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(x.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)x.d(t,r,function(n){return e[n]}.bind(null,r));return t},x.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return x.d(n,"a",n),n},x.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},x.p="./dist",x.h=function(){return o},s(27)(x.s=27)}({0:function(e,n,t){"use strict";t.d(n,"b",function(){return o}),t.d(n,"a",function(){return d});var r=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"div",t=document.getElementById(e);return t||((t=document.createElement(n)).id=e,t.style.display="none",document.body.append(t)),t},o=function(){c().then(a).catch(s)},i=function(){return{loading:r("loading"),permission:r("permission"),content:r("content")}},d=function(){var e=r("video","video"),n=(r("output","canvas"),r("buffer","canvas"));return{video:e,output:output,buffer:n}},c=function(){return window.navigator.mediaDevices.getUserMedia({audio:!1,video:{facing:"user"}})},a=function(e){var n=d(),t=n.video,r=n.output,o=n.buffer,c=i(),a=c.loading,s=c.content;t.addEventListener("canplay",function(){a.style.display="none",s.style.display="block",o.width=r.width=t.videoWidth,o.height=r.height=t.videoHeight}),t.srcObject=e,t.play(),window.devicePixelRatio=1},s=function(e){var n=i(),t=n.loading,r=n.permission;t.style.display="none",r.style.display="block"}},27:function(e,n,t){e.exports=t(28)},28:function(e,n,t){"use strict";t.r(n);var r,o=t(0),i=Object(o.a)(),d=i.video,c=i.buffer,a=i.output,s=document.getElementById("icon"),u=document.getElementById("picka"),l=document.querySelector('button[data-value="canvasstream"]'),p=document.querySelector('button[data-value="videostream"]');function f(){var e=c.getContext("2d"),n=a.getContext("2d");c.width=d.videoWidth,c.height=d.videoHeight,e.translate(d.videoWidth,0),e.scale(-1,1),e.drawImage(d,0,0),n.drawImage(c,0,0),n.drawImage(s,0,a.height-s.height),window.requestAnimationFrame(f)}function h(){gifler(u.src).frames("canvas#icon",function(e,n){e.canvas.width=parseInt(.6*u.naturalWidth,10),e.canvas.height=parseInt(.6*u.naturalHeight,10),e.drawImage(n.buffer,0,0,e.canvas.width,e.canvas.height)}),f()}var v=[],y=a.captureStream(),m=d.captureStream();function g(){p.classList.contains("ing")?(p.classList.remove("ing"),l.disabled=!1,r&&r.stop()):(p.classList.add("ing"),l.disabled=!0,w(m))}function b(){l.classList.contains("ing")?(l.classList.remove("ing"),p.disabled=!1,r&&r.stop()):(l.classList.add("ing"),p.disabled=!0,w(y))}function w(e){(r=new MediaRecorder(e)).addEventListener("dataavailable",function(e){v.push(e.data)}),r.addEventListener("stop",function(){var e=document.createElement("video"),n=new Blob(v,{type:"video/webm"}),t=URL.createObjectURL(n);e.src=t,v=[],window.open(t)}),r.start()}document.addEventListener("DOMContentLoaded",function(){Object(o.b)(),d.addEventListener("canplay",h),l.addEventListener("click",b),p.addEventListener("click",g)})}});