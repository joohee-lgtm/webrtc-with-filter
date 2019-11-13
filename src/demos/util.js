const getById = (id, tagName = "div") => {
    let target = document.getElementById(id);

    if (!target) {
        target = document.createElement(tagName);
        target.id = id;
        target.style.display = "none";
        document.body.prepend(target);
    }

    return target;
}

export const generateNoticeArea = (notice) => {
    const target = document.createElement('div');

    document.body.prepend(target);
    target.innerText = notice;

    return target;

}

export const getGuideElement = () => {
    let loading = getById('loading');
    let permission = getById('permission');
    let content = getById('content');
    let notSupport = getById('not_support');

    return {
        notSupport,
        loading,
        permission,
        content
    }
}

const guides = {
    loading: '로딩중',
    permission: '접근 권한 없음 <a href="https://support.google.com/chrome/answer/2693767?co=GENIE.Platform%3DDesktop&hl=en&oco=0">google chrome guide</a>',
    not_support: 'WebRTC 지원범위 아님'
};

export const initGuideElement = () => {
    Object.keys(guides).forEach(id => {
        const area = document.getElementById(id);
        if (!area) {
            getById(id).innerHTML = guides[id];
        }
    });
}

export const getMediaElement = () => {
    let video = getById("video", "video");
    let output = getById("output", "canvas");
    let buffer = getById("buffer", "canvas");

    return {
        video,
        output,
        buffer
    }
}

export const installUserMediaAccess = () => {
    initGuideElement();
    return getWebRTCPromise();
}

export const getWebRTCPromise = (constant = {}) => {
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
        },
        ...constant
    });
}
export const showNotSupport = () => {
    const {
        loading,
        notSupport
    } = getGuideElement();

    loading.style.display = "none";
    notSupport.style.display = "block";
}

export const showContentBlock = () => {
    const {
        loading,
        content,
        permission
    } = getGuideElement();

    loading.style.display = "none";
    permission.style.display = "none";
    content.style.display = "block";
}

export const showPermissionError = () => {
    const {
        loading,
        content,
        permission
    } = getGuideElement();

    loading.style.display = "none";
    permission.style.display = "block";
    content.style.display = "none";
}


export const runDefaultSetup = (stream) => {
    const {
        video,
        output,
        buffer
    } = getMediaElement();

    video.addEventListener("canplay", function () {
        showContentBlock();

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

export const supportsVideoType = (type = "webm") => {
    let video;

    // Allow user to create shortcuts, i.e. just "webm"
    let formats = {
        ogg: 'video/ogg; codecs="theora"',
        h264: 'video/mp4; codecs="avc1.42E01E"',
        webm: 'video/webm; codecs="vp8, vorbis"',
        vp9: 'video/webm; codecs="vp9"',
        hls: 'application/x-mpegURL; codecs="avc1.42E01E"'
    };

    if (!video) {
        video = document.createElement('video')
    }

    return video.canPlayType(formats[type] || type) !== "";
}

export const notSupportWebm = () => !supportsVideoType();