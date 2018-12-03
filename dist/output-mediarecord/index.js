!function(e){var n=window.webpackHotUpdate;window.webpackHotUpdate=function(e,t){!function(e,n){if(!w[e]||!b[e])return;for(var t in b[e]=!1,n)Object.prototype.hasOwnProperty.call(n,t)&&(v[t]=n[t]);0==--y&&0===m&&_()}(e,t),n&&n(e,t)};var t,r=!0,o="3477246664071167be68",i=1e4,a={},d=[],c=[];function s(e){var n=I[e];if(!n)return P;var r=function(r){return n.hot.active?(I[r]?-1===I[r].parents.indexOf(e)&&I[r].parents.push(e):(d=[e],t=r),-1===n.children.indexOf(r)&&n.children.push(r)):(console.warn("[HMR] unexpected require("+r+") from disposed module "+e),d=[]),P(r)},o=function(e){return{configurable:!0,enumerable:!0,get:function(){return P[e]},set:function(n){P[e]=n}}};for(var i in P)Object.prototype.hasOwnProperty.call(P,i)&&"e"!==i&&"t"!==i&&Object.defineProperty(r,i,o(i));return r.e=function(e){return"ready"===l&&p("prepare"),m++,P.e(e).then(n,function(e){throw n(),e});function n(){m--,"prepare"===l&&(g[e]||D(e),0===m&&0===y&&_())}},r.t=function(e,n){return 1&n&&(e=r(e)),P.t(e,-2&n)},r}var u=[],l="idle";function p(e){l=e;for(var n=0;n<u.length;n++)u[n].call(null,e)}var f,v,h,y=0,m=0,g={},b={},w={};function O(e){return+e+""===e?+e:e}function E(e){if("idle"!==l)throw new Error("check() is only allowed in idle status");return r=e,p("check"),function(e){return e=e||1e4,new Promise(function(n,t){if("undefined"==typeof XMLHttpRequest)return t(new Error("No browser support"));try{var r=new XMLHttpRequest,i=P.p+""+o+".hot-update.json";r.open("GET",i,!0),r.timeout=e,r.send(null)}catch(e){return t(e)}r.onreadystatechange=function(){if(4===r.readyState)if(0===r.status)t(new Error("Manifest request to "+i+" timed out."));else if(404===r.status)n();else if(200!==r.status&&304!==r.status)t(new Error("Manifest request to "+i+" failed."));else{try{var e=JSON.parse(r.responseText)}catch(e){return void t(e)}n(e)}}})}(i).then(function(e){if(!e)return p("idle"),null;b={},g={},w=e.c,h=e.h,p("prepare");var n=new Promise(function(e,n){f={resolve:e,reject:n}});v={};return D(12),"prepare"===l&&0===m&&0===y&&_(),n})}function D(e){w[e]?(b[e]=!0,y++,function(e){var n=document.getElementsByTagName("head")[0],t=document.createElement("script");t.charset="utf-8",t.src=P.p+""+e+"."+o+".hot-update.js",n.appendChild(t)}(e)):g[e]=!0}function _(){p("ready");var e=f;if(f=null,e)if(r)Promise.resolve().then(function(){return j(r)}).then(function(n){e.resolve(n)},function(n){e.reject(n)});else{var n=[];for(var t in v)Object.prototype.hasOwnProperty.call(v,t)&&n.push(O(t));e.resolve(n)}}function j(n){if("ready"!==l)throw new Error("apply() is only allowed in ready status");var t,r,i,c,s;function u(e){for(var n=[e],t={},r=n.slice().map(function(e){return{chain:[e],id:e}});r.length>0;){var o=r.pop(),i=o.id,a=o.chain;if((c=I[i])&&!c.hot._selfAccepted){if(c.hot._selfDeclined)return{type:"self-declined",chain:a,moduleId:i};if(c.hot._main)return{type:"unaccepted",chain:a,moduleId:i};for(var d=0;d<c.parents.length;d++){var s=c.parents[d],u=I[s];if(u){if(u.hot._declinedDependencies[i])return{type:"declined",chain:a.concat([s]),moduleId:i,parentId:s};-1===n.indexOf(s)&&(u.hot._acceptedDependencies[i]?(t[s]||(t[s]=[]),f(t[s],[i])):(delete t[s],n.push(s),r.push({chain:a.concat([s]),id:s})))}}}}return{type:"accepted",moduleId:e,outdatedModules:n,outdatedDependencies:t}}function f(e,n){for(var t=0;t<n.length;t++){var r=n[t];-1===e.indexOf(r)&&e.push(r)}}n=n||{};var y={},m=[],g={},b=function(){console.warn("[HMR] unexpected require("+D.moduleId+") to disposed module")};for(var E in v)if(Object.prototype.hasOwnProperty.call(v,E)){var D;s=O(E);var _=!1,j=!1,x=!1,H="";switch((D=v[E]?u(s):{type:"disposed",moduleId:E}).chain&&(H="\nUpdate propagation: "+D.chain.join(" -> ")),D.type){case"self-declined":n.onDeclined&&n.onDeclined(D),n.ignoreDeclined||(_=new Error("Aborted because of self decline: "+D.moduleId+H));break;case"declined":n.onDeclined&&n.onDeclined(D),n.ignoreDeclined||(_=new Error("Aborted because of declined dependency: "+D.moduleId+" in "+D.parentId+H));break;case"unaccepted":n.onUnaccepted&&n.onUnaccepted(D),n.ignoreUnaccepted||(_=new Error("Aborted because "+s+" is not accepted"+H));break;case"accepted":n.onAccepted&&n.onAccepted(D),j=!0;break;case"disposed":n.onDisposed&&n.onDisposed(D),x=!0;break;default:throw new Error("Unexception type "+D.type)}if(_)return p("abort"),Promise.reject(_);if(j)for(s in g[s]=v[s],f(m,D.outdatedModules),D.outdatedDependencies)Object.prototype.hasOwnProperty.call(D.outdatedDependencies,s)&&(y[s]||(y[s]=[]),f(y[s],D.outdatedDependencies[s]));x&&(f(m,[D.moduleId]),g[s]=b)}var M,k=[];for(r=0;r<m.length;r++)s=m[r],I[s]&&I[s].hot._selfAccepted&&k.push({module:s,errorHandler:I[s].hot._selfAccepted});p("dispose"),Object.keys(w).forEach(function(e){!1===w[e]&&function(e){delete installedChunks[e]}(e)});for(var L,U,S=m.slice();S.length>0;)if(s=S.pop(),c=I[s]){var A={},q=c.hot._disposeHandlers;for(i=0;i<q.length;i++)(t=q[i])(A);for(a[s]=A,c.hot.active=!1,delete I[s],delete y[s],i=0;i<c.children.length;i++){var R=I[c.children[i]];R&&((M=R.parents.indexOf(s))>=0&&R.parents.splice(M,1))}}for(s in y)if(Object.prototype.hasOwnProperty.call(y,s)&&(c=I[s]))for(U=y[s],i=0;i<U.length;i++)L=U[i],(M=c.children.indexOf(L))>=0&&c.children.splice(M,1);for(s in p("apply"),o=h,g)Object.prototype.hasOwnProperty.call(g,s)&&(e[s]=g[s]);var B=null;for(s in y)if(Object.prototype.hasOwnProperty.call(y,s)&&(c=I[s])){U=y[s];var C=[];for(r=0;r<U.length;r++)if(L=U[r],t=c.hot._acceptedDependencies[L]){if(-1!==C.indexOf(t))continue;C.push(t)}for(r=0;r<C.length;r++){t=C[r];try{t(U)}catch(e){n.onErrored&&n.onErrored({type:"accept-errored",moduleId:s,dependencyId:U[r],error:e}),n.ignoreErrored||B||(B=e)}}}for(r=0;r<k.length;r++){var T=k[r];s=T.module,d=[s];try{P(s)}catch(e){if("function"==typeof T.errorHandler)try{T.errorHandler(e)}catch(t){n.onErrored&&n.onErrored({type:"self-accept-error-handler-errored",moduleId:s,error:t,originalError:e}),n.ignoreErrored||B||(B=t),B||(B=e)}else n.onErrored&&n.onErrored({type:"self-accept-errored",moduleId:s,error:e}),n.ignoreErrored||B||(B=e)}}return B?(p("fail"),Promise.reject(B)):(p("idle"),new Promise(function(e){e(m)}))}var I={};function P(n){if(I[n])return I[n].exports;var r=I[n]={i:n,l:!1,exports:{},hot:function(e){var n={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_disposeHandlers:[],_main:t!==e,active:!0,accept:function(e,t){if(void 0===e)n._selfAccepted=!0;else if("function"==typeof e)n._selfAccepted=e;else if("object"==typeof e)for(var r=0;r<e.length;r++)n._acceptedDependencies[e[r]]=t||function(){};else n._acceptedDependencies[e]=t||function(){}},decline:function(e){if(void 0===e)n._selfDeclined=!0;else if("object"==typeof e)for(var t=0;t<e.length;t++)n._declinedDependencies[e[t]]=!0;else n._declinedDependencies[e]=!0},dispose:function(e){n._disposeHandlers.push(e)},addDisposeHandler:function(e){n._disposeHandlers.push(e)},removeDisposeHandler:function(e){var t=n._disposeHandlers.indexOf(e);t>=0&&n._disposeHandlers.splice(t,1)},check:E,apply:j,status:function(e){if(!e)return l;u.push(e)},addStatusHandler:function(e){u.push(e)},removeStatusHandler:function(e){var n=u.indexOf(e);n>=0&&u.splice(n,1)},data:a[e]};return t=void 0,n}(n),parents:(c=d,d=[],c),children:[]};return e[n].call(r.exports,r,r.exports,s(n)),r.l=!0,r.exports}P.m=e,P.c=I,P.d=function(e,n,t){P.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},P.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},P.t=function(e,n){if(1&n&&(e=P(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(P.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)P.d(t,r,function(n){return e[n]}.bind(null,r));return t},P.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return P.d(n,"a",n),n},P.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},P.p="./dist",P.h=function(){return o},s(31)(P.s=31)}({0:function(e,n,t){"use strict";t.d(n,"b",function(){return o}),t.d(n,"a",function(){return a});var r=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"div",t=document.getElementById(e);return t||((t=document.createElement(n)).id=e,t.style.display="none",document.body.append(t)),t},o=function(){d().then(c).catch(s)},i=function(){return{loading:r("loading"),permission:r("permission"),content:r("content")}},a=function(){var e=r("video","video"),n=(r("output","canvas"),r("buffer","canvas"));return{video:e,output:output,buffer:n}},d=function(){return void 0===navigator.mediaDevices&&(navigator.mediaDevices={}),void 0===navigator.mediaDevices.getUserMedia&&(navigator.mediaDevices.getUserMedia=function(e){var n=navigator.webkitGetUserMedia||navigator.mozGetUserMedia;return n?new Promise(function(t,r){n.call(navigator,e,t,r)}):Promise.reject(new Error("getUserMedia is not implemented in this browser"))}),window.navigator.mediaDevices.getUserMedia({audio:!1,video:{facing:"user"}})},c=function(e){var n=a(),t=n.video,r=n.output,o=n.buffer;t.addEventListener("canplay",function(){!function(){var e=i(),n=e.loading,t=e.content;n.style.display="none",t.style.display="block"}(),o.width=r.width=t.videoWidth,o.height=r.height=t.videoHeight}),t.srcObject=e,t.play(),window.devicePixelRatio=1},s=function(e){var n=i(),t=n.loading,r=n.permission;t.style.display="none",r.style.display="block"}},31:function(e,n,t){e.exports=t(32)},32:function(e,n,t){"use strict";t.r(n);var r,o=t(0),i=Object(o.a)(),a=i.video,d=i.buffer,c=i.output,s=document.getElementById("icon"),u=document.getElementById("picka"),l=document.querySelector('button[data-value="canvasstream"]'),p=document.querySelector('button[data-value="videostream"]');function f(){var e=d.getContext("2d"),n=c.getContext("2d");d.width=a.videoWidth,d.height=a.videoHeight,e.translate(a.videoWidth,0),e.scale(-1,1),e.drawImage(a,0,0),n.drawImage(d,0,0),n.drawImage(s,0,c.height-s.height),window.requestAnimationFrame(f)}function v(){gifler(u.src).frames("canvas#icon",function(e,n){e.canvas.width=parseInt(.6*u.naturalWidth,10),e.canvas.height=parseInt(.6*u.naturalHeight,10),e.drawImage(n.buffer,0,0,e.canvas.width,e.canvas.height)}),f()}var h=[],y=c.captureStream(),m=a.captureStream();function g(){p.classList.contains("ing")?(p.classList.remove("ing"),l.disabled=!1,r&&r.stop()):(p.classList.add("ing"),l.disabled=!0,w(m))}function b(){l.classList.contains("ing")?(l.classList.remove("ing"),p.disabled=!1,r&&r.stop()):(l.classList.add("ing"),p.disabled=!0,w(y))}function w(e){r=new MediaRecorder(e),window.mr=r,r.addEventListener("dataavailable",function(e){h.push(e.data)}),r.addEventListener("stop",function(){var e=document.createElement("video"),n=new Blob(h,{type:"video/webm"}),t=URL.createObjectURL(n);e.src=t,h=[],window.open(t)}),r.start()}document.addEventListener("DOMContentLoaded",function(){Object(o.b)(),a.addEventListener("canplay",v),l.addEventListener("click",b),p.addEventListener("click",g)})}});