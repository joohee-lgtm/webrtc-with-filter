!function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="./dist",r(r.s=9)}({21:function(e,t,r){"use strict";r.r(t),THREE.JeelizHelper=function(){var e,t,r,n,i,o,a,s,c,d,l,u={rotationOffsetX:0,pivotOffsetYZ:[.4,.2],detectionThreshold:.75,detectionHysteresis:.05,tweakMoveYRotateY:.5,isDebugPivotPoint:!1},f=[],E=[],v=null,p=!1,h=!1;function T(e){f.forEach(function(t,r){l=t.visible;var n=e[r];l&&n.detected<u.detectionThreshold-u.detectionHysteresis?(v&&v(r,!1),t.visible=!1):!l&&n.detected>u.detectionThreshold+u.detectionHysteresis&&(v&&v(r,!0),t.visible=!0)})}var R={init:function(l,p){var T;r=l.maxFacesDetected,a=l.videoTexture,o=l.GL,c=l.canvasElement,n=r>1,l.threejsCanvasId?(h=!0,(T=document.getElementById("threejsCanvas")).setAttribute("width",c.width),T.setAttribute("height",c.height)):T=c,void 0!==p&&(v=p),e=new THREE.WebGLRenderer({context:h?null:o,canvas:T,alpha:!(!h&&!l.alpha)}),t=new THREE.Scene,function(){for(var e=0;e<r;++e){var n=new THREE.Object3D;n.frustumCulled=!1,n.visible=!1;var i=new THREE.Object3D;if(i.frustumCulled=!1,n.add(i),f.push(n),E.push(i),t.add(n),u.isDebugPivotPoint){var o=new THREE.Mesh(new THREE.BoxGeometry(.1,.1,.1),new THREE.MeshNormalMaterial({side:THREE.DoubleSide,depthTest:!1}));o.position.copy(i.position),n.add(o),window.pivot=o,console.log("DEBUG in JeelizHelper: set the position of <pivot> in the console and report the value into JeelizThreejsHelper.js for _settings.pivotOffsetYZ")}}}(),function(){var e="attribute vec2 position;\n\t            varying vec2 vUV;\n\t            void main(void){\n\t                gl_Position=vec4(position, 0., 1.);\n\t                vUV=0.5+0.5*position;\n\t            }",r="precision lowp float;\n\t            uniform sampler2D samplerVideo;\n\t            varying vec2 vUV;\n\t            void main(void){\n\t                gl_FragColor=texture2D(samplerVideo, vUV);\n\t            }";if(h){var n=function(e,t,r){var n=o.createShader(t);return o.shaderSource(n,e),o.compileShader(n),o.getShaderParameter(n,o.COMPILE_STATUS)?n:(alert("ERROR IN "+r+" SHADER : "+o.getShaderInfoLog(n)),!1)},a=n(e,o.VERTEX_SHADER,"VERTEX"),c=n(r,o.FRAGMENT_SHADER,"FRAGMENT");d=o.createProgram(),o.attachShader(d,a),o.attachShader(d,c),o.linkProgram(d),o.getUniformLocation(d,"samplerVideo")}else{(s=new THREE.DataTexture(new Uint8Array([255,0,0]),1,1,THREE.RGBFormat)).needsUpdate=!0;var l=new THREE.RawShaderMaterial({depthWrite:!1,depthTest:!1,vertexShader:e,fragmentShader:r,uniforms:{samplerVideo:{value:s}}}),u=new THREE.BufferGeometry,f=new Float32Array([-1,-1,1,-1,1,1,-1,1]);u.addAttribute("position",new THREE.BufferAttribute(f,2)),u.setIndex(new THREE.BufferAttribute(new Uint16Array([0,1,2,0,2,3]),1)),i=new THREE.Mesh(u,l),R.apply_videoTexture(i),i.renderOrder=-1e3,i.frustumCulled=!1,t.add(i)}}();var m={videoMesh:i,renderer:e,scene:t};return n?m.faceObjects=E:m.faceObject=E[0],m},detect:function(e){T(n?e:[e])},get_isDetected:function(){return l},render:function(r,i){var s=n?r:[r];T(s),function(e,t){var r=Math.tan(t.aspect*t.fov*Math.PI/360);f.forEach(function(n,i){if(n.visible){var o=e[i],a=u.tweakMoveYRotateY*Math.tan(o.rx),s=Math.cos(o.rz),c=Math.sin(o.rz),d=c*a*o.s,l=s*a*(o.s/t.aspect),f=1/(2*o.s*r),v=o.x+d,p=o.y+l,h=-f-.5,T=v*f*r,R=p*f*r/t.aspect;E[i].position.set(-c*u.pivotOffsetYZ[0],-s*u.pivotOffsetYZ[0],-u.pivotOffsetYZ[1]),n.position.set(T,R+u.pivotOffsetYZ[0],h+u.pivotOffsetYZ[1]),n.rotation.set(o.rx+u.rotationOffsetX,o.ry,o.rz,"ZXY")}})}(s,i),h?(o.viewport(0,0,c.width,c.height),o.useProgram(d),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,a),o.drawElements(o.TRIANGLES,3,o.UNSIGNED_SHORT,0)):e.state.reset(),e.render(t,i)},sortFaces:function(e,t,r){for(var n={X:0,Y:1,Z:2}[t.toUpperCase()],i=r?-1:1,o=e.index.count/3,a=new Array(o),s=0;s<o;++s)a[s]=[e.index.array[3*s],e.index.array[3*s+1],e.index.array[3*s+2]];var c=e.attributes.position.array,d=a.map(function(e,t){return[(c[3*e[0]]+c[3*e[1]]+c[3*e[2]])/3,(c[3*e[0]+1]+c[3*e[1]+1]+c[3*e[2]+1])/3,(c[3*e[0]+2]+c[3*e[1]+2]+c[3*e[2]+2])/3,e]});d.sort(function(e,t){return(e[n]-t[n])*i}),d.forEach(function(t,r){var n=t[3];e.index.array[3*r]=n[0],e.index.array[3*r+1]=n[1],e.index.array[3*r+2]=n[2]})},get_threeVideoTexture:function(){return s},apply_videoTexture:function(t){p||(t.onAfterRender=function(){try{e.properties.update(s,"__webglTexture",a),s.magFilter=THREE.LinearFilter,s.minFilter=THREE.LinearFilter,p=!0}catch(e){console.log("WARNING in THREE.JeelizHelper : the glVideoTexture is not fully initialized")}delete t.onAfterRender})},create_threejsOccluder:function(e,t){var r=new THREE.Mesh;return(new THREE.BufferGeometryLoader).load(e,function(e){var n=new THREE.ShaderMaterial({vertexShader:THREE.ShaderLib.basic.vertexShader,fragmentShader:"precision lowp float;\n void main(void){\n gl_FragColor=vec4(1.,0.,0.,1.);\n }",uniforms:THREE.ShaderLib.basic.uniforms,colorWrite:!1});r.renderOrder=-1,r.material=n,r.geometry=e,void 0!==t&&t&&t(r)}),r},set_pivotOffsetYZ:function(e){u.pivotOffsetYZ=e}};return R}();var n,i=THREE.JeelizHelper;function o(e,t){t?console.log("INFO in detect_callback() : DETECTED"):console.log("INFO in detect_callback() : LOST")}function a(){JeelizResizer.size_canvas({canvasId:"jeeFaceFilterCanvas",callback:function(e,t){JEEFACEFILTERAPI.init({followZRot:!0,canvasId:"jeeFaceFilterCanvas",NNCpath:"https://appstatic.jeeliz.com/faceFilter/NNC.json",maxFacesDetected:1,callbackReady:function(e,t){e?console.log("AN ERROR HAPPENS. ERR =",e):(console.log("INFO : JEEFACEFILTERAPI IS READY"),function(e){var t=i.init(e,o),r=new THREE.BoxGeometry(1,1,1),a=new THREE.MeshNormalMaterial,s=new THREE.Mesh(r,a);s.frustumCulled=!1,t.faceObject.add(s);var c=e.canvasElement.width/e.canvasElement.height;n=new THREE.PerspectiveCamera(20,c,.1,100)}(t))},callbackTrack:function(e){i.render(e,n)}})}})}function s(){JEEFACEFILTERAPI.toggle_pause(!0)}window.addEventListener("load",function(){a(),document.querySelector("#stop").addEventListener("click",s)})},9:function(e,t,r){e.exports=r(21)}});