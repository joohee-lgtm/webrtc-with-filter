import "../ua";
import {
    showPermissionError,
    getMediaElement,
    showContentBlock,
    installUserMediaAccess
} from '../util';
let output;

function handleSuccess(stream) {
    const { video, output: o } = getMediaElement();

    showContentBlock();
    output = o;
    video.srcObject = stream;
    video.oncanplay = function () {
        showContentBlock();
        render();
    };
    video.play();
}

function handleReject() {
    showPermissionError();
}

function render() {
    const outputContext = output.getContext("2d");

    output.width = video.videoWidth;
    output.height = video.videoHeight;
    outputContext.translate(video.videoWidth, 0);
    outputContext.scale(-1, 1);
    outputContext.drawImage(video, 0, 0);

    requestAnimationFrame(render);
}

function accessToCamera(e) {
    installUserMediaAccess({
        audio: false,
        video: {
            facingMode: e.target.id,
        }
    })
        .then(handleSuccess)
        .catch(handleReject);

    document.querySelector('#user').style.display = "";
    document.querySelector('#environment').style.display = "";
    e.target.style.display = "none";
    document.getElementById("current").innerHTML = `facingMode: ${e.target.id}`;
}

document.addEventListener("DOMContentLoaded", function () {
    accessToCamera({
        target: document.querySelector('#user')
    });
    document.querySelector('#user').addEventListener('click', accessToCamera);
    document.querySelector('#environment').addEventListener('click', accessToCamera);
});

