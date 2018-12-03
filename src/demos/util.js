const getById = (id, tagName = "div") => {
    let target = document.getElementById(id);

    if (!target) {
        target = document.createElement(tagName);
        target.id = id;
        target.style.display = "none";
        document.body.append(target);
    }

    return target;
}

export const installMediaDevice = () => {
    getUserMediaPromise()
        .then(runDefaultSetup)
        .catch(runDefaultErrorGuide);
}

export const getGuideElement = () => {
    let loading = getById('loading');
    let permission = getById('permission');
    let content = getById('content');

    return {
        loading,
        permission,
        content
    }
}

export const getMediaElement = () => {
    let video = getById("video", "video");
    let ouput = getById("output", "canvas");
    let buffer = getById("buffer", "canvas");

    return {
        video,
        output,
        buffer
    }
}

export const getUserMediaPromise = () => {
    // ref) https://developer.mozilla.org/ko/docs/Web/API/MediaDevices/getUserMedia
    // Older browsers might not implement mediaDevices at all, so we set an empty object first
    if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
    }

    // Some browsers partially implement mediaDevices. We can't just assign an object
    // with getUserMedia as it would overwrite existing properties.
    // Here, we will just add the getUserMedia property if it's missing.
    if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
            // First get ahold of the legacy getUserMedia, if present
            var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            // Some browsers just don't implement it - return a rejected promise with an error
            // to keep a consistent interface
            if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
            }

            // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
            return new Promise(function (resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject);
            });
        }
    }

    return window.navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            facing: 'user'
        }
    })
}

export const hideGuideContent = () => {
    const {
        loading,
        content
    } = getGuideElement();

    loading.style.display = "none";
    content.style.display = "block";
}

export const runDefaultSetup = (stream) => {
    const {
        video,
        output,
        buffer
    } = getMediaElement();

    video.addEventListener("canplay", function () {
        hideGuideContent();

        buffer.width = output.width = video.videoWidth;
        buffer.height = output.height = video.videoHeight;
    })

    video.srcObject = stream;
    video.play();

    window.devicePixelRatio = 1;
}

export const runDefaultErrorGuide = (err) => {
    const {
        loading,
        permission
    } = getGuideElement();

    loading.style.display = "none";
    permission.style.display = "block";
}
