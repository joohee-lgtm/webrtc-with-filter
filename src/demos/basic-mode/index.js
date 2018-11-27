
function handleSuccess(stream) {
    const video = document.querySelector('video');
    const videoTracks = stream.getVideoTracks();
    video.srcObject = stream;
}

function handleError(error) {
    if (error.name === 'ConstraintNotSatisfiedError') {
        let v = constraints.video;
        errorMsg(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
    } else if (error.name === 'PermissionDeniedError') {
        errorMsg('Permissions have not been granted to use your camera and ' +
            'microphone, you need to allow the page access to your devices in ' +
            'order for the demo to work.');
    }
    errorMsg(`getUserMedia error: ${error.name}`, error);
}

function errorMsg(msg, error) {
    const errorElement = document.querySelector('#errorMsg');
    errorElement.innerHTML += `<p>${msg}</p>`;
    if (typeof error !== 'undefined') {
        console.error(error);
    }
}

function init(e, constraints) {
    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream){
        handleSuccess(stream);
    })
}

document.querySelector('#showVideo1').addEventListener('click', function (e) {
    init(e, {
        audio: false,
        video: {
            facingMode: "user"
        }
    });
});

document.querySelector('#showVideo2').addEventListener('click', function (e) {
    init(e, {
        audio: false,
        video: {
            facingMode: "environment"
        }
    });
});