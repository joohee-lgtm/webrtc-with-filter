!function(e){var n=window.webpackHotUpdate;window.webpackHotUpdate=function(e,t){!function(e,n){if(!E[e]||!m[e])return;for(var t in m[e]=!1,n)Object.prototype.hasOwnProperty.call(n,t)&&(h[t]=n[t]);0==--v&&0===b&&_()}(e,t),n&&n(e,t)};var t,r=!0,o="89b1879360914bee6034",c=1e4,i={},d=[],a=[];function l(e){var n=P[e];if(!n)return x;var r=function(r){return n.hot.active?(P[r]?-1===P[r].parents.indexOf(e)&&P[r].parents.push(e):(d=[e],t=r),-1===n.children.indexOf(r)&&n.children.push(r)):(console.warn("[HMR] unexpected require("+r+") from disposed module "+e),d=[]),x(r)},o=function(e){return{configurable:!0,enumerable:!0,get:function(){return x[e]},set:function(n){x[e]=n}}};for(var c in x)Object.prototype.hasOwnProperty.call(x,c)&&"e"!==c&&"t"!==c&&Object.defineProperty(r,c,o(c));return r.e=function(e){return"ready"===u&&p("prepare"),b++,x.e(e).then(n,function(e){throw n(),e});function n(){b--,"prepare"===u&&(w[e]||g(e),0===b&&0===v&&_())}},r.t=function(e,n){return 1&n&&(e=r(e)),x.t(e,-2&n)},r}var s=[],u="idle";function p(e){u=e;for(var n=0;n<s.length;n++)s[n].call(null,e)}var f,h,y,v=0,b=0,w={},m={},E={};function D(e){return+e+""===e?+e:e}function O(e){if("idle"!==u)throw new Error("check() is only allowed in idle status");return r=e,p("check"),function(e){return e=e||1e4,new Promise(function(n,t){if("undefined"==typeof XMLHttpRequest)return t(new Error("No browser support"));try{var r=new XMLHttpRequest,c=x.p+""+o+".hot-update.json";r.open("GET",c,!0),r.timeout=e,r.send(null)}catch(e){return t(e)}r.onreadystatechange=function(){if(4===r.readyState)if(0===r.status)t(new Error("Manifest request to "+c+" timed out."));else if(404===r.status)n();else if(200!==r.status&&304!==r.status)t(new Error("Manifest request to "+c+" failed."));else{try{var e=JSON.parse(r.responseText)}catch(e){return void t(e)}n(e)}}})}(c).then(function(e){if(!e)return p("idle"),null;m={},w={},E=e.c,y=e.h,p("prepare");var n=new Promise(function(e,n){f={resolve:e,reject:n}});h={};return g(7),"prepare"===u&&0===b&&0===v&&_(),n})}function g(e){E[e]?(m[e]=!0,v++,function(e){var n=document.getElementsByTagName("head")[0],t=document.createElement("script");t.charset="utf-8",t.src=x.p+""+e+"."+o+".hot-update.js",n.appendChild(t)}(e)):w[e]=!0}function _(){p("ready");var e=f;if(f=null,e)if(r)Promise.resolve().then(function(){return j(r)}).then(function(n){e.resolve(n)},function(n){e.reject(n)});else{var n=[];for(var t in h)Object.prototype.hasOwnProperty.call(h,t)&&n.push(D(t));e.resolve(n)}}function j(n){if("ready"!==u)throw new Error("apply() is only allowed in ready status");var t,r,c,a,l;function s(e){for(var n=[e],t={},r=n.slice().map(function(e){return{chain:[e],id:e}});r.length>0;){var o=r.pop(),c=o.id,i=o.chain;if((a=P[c])&&!a.hot._selfAccepted){if(a.hot._selfDeclined)return{type:"self-declined",chain:i,moduleId:c};if(a.hot._main)return{type:"unaccepted",chain:i,moduleId:c};for(var d=0;d<a.parents.length;d++){var l=a.parents[d],s=P[l];if(s){if(s.hot._declinedDependencies[c])return{type:"declined",chain:i.concat([l]),moduleId:c,parentId:l};-1===n.indexOf(l)&&(s.hot._acceptedDependencies[c]?(t[l]||(t[l]=[]),f(t[l],[c])):(delete t[l],n.push(l),r.push({chain:i.concat([l]),id:l})))}}}}return{type:"accepted",moduleId:e,outdatedModules:n,outdatedDependencies:t}}function f(e,n){for(var t=0;t<n.length;t++){var r=n[t];-1===e.indexOf(r)&&e.push(r)}}n=n||{};var v={},b=[],w={},m=function(){console.warn("[HMR] unexpected require("+g.moduleId+") to disposed module")};for(var O in h)if(Object.prototype.hasOwnProperty.call(h,O)){var g;l=D(O);var _=!1,j=!1,I=!1,A="";switch((g=h[O]?s(l):{type:"disposed",moduleId:O}).chain&&(A="\nUpdate propagation: "+g.chain.join(" -> ")),g.type){case"self-declined":n.onDeclined&&n.onDeclined(g),n.ignoreDeclined||(_=new Error("Aborted because of self decline: "+g.moduleId+A));break;case"declined":n.onDeclined&&n.onDeclined(g),n.ignoreDeclined||(_=new Error("Aborted because of declined dependency: "+g.moduleId+" in "+g.parentId+A));break;case"unaccepted":n.onUnaccepted&&n.onUnaccepted(g),n.ignoreUnaccepted||(_=new Error("Aborted because "+l+" is not accepted"+A));break;case"accepted":n.onAccepted&&n.onAccepted(g),j=!0;break;case"disposed":n.onDisposed&&n.onDisposed(g),I=!0;break;default:throw new Error("Unexception type "+g.type)}if(_)return p("abort"),Promise.reject(_);if(j)for(l in w[l]=h[l],f(b,g.outdatedModules),g.outdatedDependencies)Object.prototype.hasOwnProperty.call(g.outdatedDependencies,l)&&(v[l]||(v[l]=[]),f(v[l],g.outdatedDependencies[l]));I&&(f(b,[g.moduleId]),w[l]=m)}var H,C=[];for(r=0;r<b.length;r++)l=b[r],P[l]&&P[l].hot._selfAccepted&&C.push({module:l,errorHandler:P[l].hot._selfAccepted});p("dispose"),Object.keys(E).forEach(function(e){!1===E[e]&&function(e){delete installedChunks[e]}(e)});for(var R,k,S=b.slice();S.length>0;)if(l=S.pop(),a=P[l]){var M={},N=a.hot._disposeHandlers;for(c=0;c<N.length;c++)(t=N[c])(M);for(i[l]=M,a.hot.active=!1,delete P[l],delete v[l],c=0;c<a.children.length;c++){var T=P[a.children[c]];T&&((H=T.parents.indexOf(l))>=0&&T.parents.splice(H,1))}}for(l in v)if(Object.prototype.hasOwnProperty.call(v,l)&&(a=P[l]))for(k=v[l],c=0;c<k.length;c++)R=k[c],(H=a.children.indexOf(R))>=0&&a.children.splice(H,1);for(l in p("apply"),o=y,w)Object.prototype.hasOwnProperty.call(w,l)&&(e[l]=w[l]);var V=null;for(l in v)if(Object.prototype.hasOwnProperty.call(v,l)&&(a=P[l])){k=v[l];var F=[];for(r=0;r<k.length;r++)if(R=k[r],t=a.hot._acceptedDependencies[R]){if(-1!==F.indexOf(t))continue;F.push(t)}for(r=0;r<F.length;r++){t=F[r];try{t(k)}catch(e){n.onErrored&&n.onErrored({type:"accept-errored",moduleId:l,dependencyId:k[r],error:e}),n.ignoreErrored||V||(V=e)}}}for(r=0;r<C.length;r++){var q=C[r];l=q.module,d=[l];try{x(l)}catch(e){if("function"==typeof q.errorHandler)try{q.errorHandler(e)}catch(t){n.onErrored&&n.onErrored({type:"self-accept-error-handler-errored",moduleId:l,error:t,originalError:e}),n.ignoreErrored||V||(V=t),V||(V=e)}else n.onErrored&&n.onErrored({type:"self-accept-errored",moduleId:l,error:e}),n.ignoreErrored||V||(V=e)}}return V?(p("fail"),Promise.reject(V)):(p("idle"),new Promise(function(e){e(b)}))}var P={};function x(n){if(P[n])return P[n].exports;var r=P[n]={i:n,l:!1,exports:{},hot:function(e){var n={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_disposeHandlers:[],_main:t!==e,active:!0,accept:function(e,t){if(void 0===e)n._selfAccepted=!0;else if("function"==typeof e)n._selfAccepted=e;else if("object"==typeof e)for(var r=0;r<e.length;r++)n._acceptedDependencies[e[r]]=t||function(){};else n._acceptedDependencies[e]=t||function(){}},decline:function(e){if(void 0===e)n._selfDeclined=!0;else if("object"==typeof e)for(var t=0;t<e.length;t++)n._declinedDependencies[e[t]]=!0;else n._declinedDependencies[e]=!0},dispose:function(e){n._disposeHandlers.push(e)},addDisposeHandler:function(e){n._disposeHandlers.push(e)},removeDisposeHandler:function(e){var t=n._disposeHandlers.indexOf(e);t>=0&&n._disposeHandlers.splice(t,1)},check:O,apply:j,status:function(e){if(!e)return u;s.push(e)},addStatusHandler:function(e){s.push(e)},removeStatusHandler:function(e){var n=s.indexOf(e);n>=0&&s.splice(n,1)},data:i[e]};return t=void 0,n}(n),parents:(a=d,d=[],a),children:[]};return e[n].call(r.exports,r,r.exports,l(n)),r.l=!0,r.exports}x.m=e,x.c=P,x.d=function(e,n,t){x.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},x.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},x.t=function(e,n){if(1&n&&(e=x(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(x.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)x.d(t,r,function(n){return e[n]}.bind(null,r));return t},x.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return x.d(n,"a",n),n},x.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},x.p="./dist",x.h=function(){return o},l(20)(x.s=20)}({20:function(e,n,t){e.exports=t(21)},21:function(e,n,t){"use strict";window.addEventListener("load",function(){window.CVD=null,JEEFACEFILTERAPI.init({canvasId:"output",NNCpath:"https://appstatic.jeeliz.com/faceFilter/NNC.json",callbackReady:function(e,n){e?console.log("AN ERROR HAPPENS. SORRY BRO :( . ERR =",e):(console.log("INFO : JEEFACEFILTERAPI IS READY"),CVD=JEEFACEFILTERAPI.Canvas2DDisplay(n),CVD.ctx.strokeStyle="yellow")},callbackTrack:function(e){if(e.detected>.6){var n=CVD.getCoordinates(e);CVD.ctx.clearRect(0,0,CVD.canvas.width,CVD.canvas.height),CVD.ctx.strokeRect(n.x,n.y,n.w,n.h),CVD.update_canvasTexture()}CVD.draw()}}),document.querySelector("#stop").addEventListener("click",stop)})}});