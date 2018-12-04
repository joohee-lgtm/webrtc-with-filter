import { 
    getUserMediaPromise,
    getMediaElement,
    getGuideElement,
} from '../util';
let output;

function handleSuccess(stream) {
    const {content} = getGuideElement();
    const {video, output: o} = getMediaElement();

    output = o;
    content.style.display = "block";
    video.srcObject = stream;
    video.oncanplay = render;
}

function render() {
    const outputContext = output.getContext("2d");
    
    output.width = video.videoWidth;
    output.height = video.videoHeight;
    outputContext.translate(video.videoWidth, 0);
    outputContext.scale(-1, 1);  
    outputContext.drawImage(video, 0,0);

    requestAnimationFrame(render);
}

document.querySelector('#user').addEventListener('click', function (e) {
    getUserMediaPromise({
        audio: false,
        video: {
            facingMode: "user"
        }
    }).then(handleSuccess)
});

document.querySelector('#environment').addEventListener('click', function (e) {
    getUserMediaPromise({
        audio: false,
        video: {
            facingMode: "environment"
        }
    }).then(handleSuccess)
});