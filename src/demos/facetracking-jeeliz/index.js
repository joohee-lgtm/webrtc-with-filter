"use strict";
import { showPermissionError, getMediaElement, generateNoticeArea } from '../util';
function main() {
    window.CVD = null;
    JEEFACEFILTERAPI.init({
        canvasId: 'output',
        NNCpath: 'https://appstatic.jeeliz.com/faceFilter/NNC.json', //root of NNC.json file
        callbackReady: function (errCode, spec) {
            if (errCode) {
                generateNoticeArea('JEEFACEFILTERAPI 초기화 실패');

                return;
            }

            console.log('INFO : JEEFACEFILTERAPI IS READY');
            CVD = JEEFACEFILTERAPI.Canvas2DDisplay(spec);
            CVD.ctx.strokeStyle = 'yellow';
        }, //end callbackReady()

        //called at each render iteration (drawing loop)
        callbackTrack: function (detectState) {
            if (detectState.detected > 0.6) {
                var faceCoo = CVD.getCoordinates(detectState);

                CVD.ctx.clearRect(0, 0, CVD.canvas.width, CVD.canvas.height);
                CVD.ctx.strokeRect(faceCoo.x, faceCoo.y, faceCoo.w, faceCoo.h);
                CVD.update_canvasTexture();
            }
            CVD.draw();
        } //end callbackTrack()
    }); //end JEEFACEFILTERAPI.init call
} //end main()


window.addEventListener("load", function () {
    main();
    document.querySelector('#stop').addEventListener('click', stop);
});