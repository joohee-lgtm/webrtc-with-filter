

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
        loading, permission, content
    }
}

export const getMediaElement = () => {
    let video = getById("video", "video");
    let ouput = getById("output", "canvas");
    let buffer = getById("buffer", "canvas");
    
    return {
        video, output, buffer
    }
}

export const getUserMediaPromise = () => {
    return window.navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facing: 'user'
        }
    })
}

export const runDefaultSetup = (stream) => {
    const {video, output, buffer} = getMediaElement();
    const {loading, content} = getGuideElement();

    video.addEventListener("canplay", function() {
        loading.style.display = "none";
        content.style.display = "block";
      
        buffer.width = output.width = video.videoWidth;
        buffer.height = output.height = video.videoHeight;      
    })

    video.srcObject = stream;
    video.play();
  
    window.devicePixelRatio = 1;
}

export const runDefaultErrorGuide = (err) => {
    const {loading, permission} = getGuideElement();

    loading.style.display = "none";
    permission.style.display = "block";
}