import THREEJeelizHelper from "./JeelizThreejsHelper";

"use strict";

let THREECAMERA;

// callback : launched if a face is detected or lost. TODO : add a cool particle effect WoW !
function detect_callback(faceIndex, isDetected) {
    if (isDetected) {
        console.log('INFO in detect_callback() : DETECTED');
    } else {
        console.log('INFO in detect_callback() : LOST');
    }
}

// build the 3D. called once when Jeeliz Face Filter is OK
function init_threeScene(spec) {
    // const threeStuffs = THREE.JeelizHelper.init(spec, detect_callback);
    const threeStuffs = THREEJeelizHelper.init(spec, detect_callback);

     // CREATE A CUBE
    const cubeGeometry = new THREE.BoxGeometry(1,1,1);
    const cubeMaterial = new THREE.MeshNormalMaterial();
    const threeCube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    threeCube.frustumCulled = false;
    threeStuffs.faceObject.add(threeCube);

    //CREATE THE CAMERA
    const aspecRatio=spec.canvasElement.width / spec.canvasElement.height;
    THREECAMERA=new THREE.PerspectiveCamera(20, aspecRatio, 0.1, 100);
} // end init_threeScene()

//launched by body.onload() :
function main(){
    JeelizResizer.size_canvas({
        canvasId: 'jeeFaceFilterCanvas',
        callback: function(isError, bestVideoSettings){
            init_faceFilter(bestVideoSettings);
        }
    })
} //end main()

function init_faceFilter(videoSettings){
    JEEFACEFILTERAPI.init({
        followZRot: true,
        canvasId: 'jeeFaceFilterCanvas',
        NNCpath: 'https://appstatic.jeeliz.com/faceFilter/NNC.json', // root of NNC.json file
        maxFacesDetected: 1,
        callbackReady: function(errCode, spec){
          if (errCode){
            console.log('AN ERROR HAPPENS. ERR =', errCode);
            return;
          }

          document.getElementById('loading').style.display = "none";
          document.getElementById('content').style.display = "block";          

          console.log('INFO : JEEFACEFILTERAPI IS READY');
          init_threeScene(spec);
        }, //end callbackReady()

        //called at each render iteration (drawing loop) :
        callbackTrack: function(detectState){
        //   THREE.JeelizHelper.render(detectState, THREECAMERA);
        THREEJeelizHelper.render(detectState, THREECAMERA);
        } //end callbackTrack()
    }); //end JEEFACEFILTERAPI.init call
} // end main()

function stop() {
    JEEFACEFILTERAPI.toggle_pause(true);
}

window.addEventListener("load", function(){
    main();
    document.querySelector('#stop').addEventListener('click', stop);
});