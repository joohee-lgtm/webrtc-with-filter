# realtime-filter
- 웹 카메라가 보여주는 화면에 필터를 입력해보자.
----
### 리서치를 시작한 이유
- 웹으로 인스타그램 카메라를 어디까지 따라할 수 있을까?
- SNOW 앱, 인스타그램의 인앱 카메라로 다양한 효과를 가진 사진과 동영상을 찍을 수 있다.
- 그런 카메라 앱들은 필터를 이용해서 필름 카메라의 느낌을 내거나, 얼굴에 강아지 귀를 달거나, vlog 같이 날짜를 입력할 수 있다.
- 이미 찍은 사진이나 동영상에 효과를 제공하는 웹 에디터는 많다.

### 할 수 있는것
- 카메라가 찍고 있는 화면을 웹 브라우저에 보여주기
- 효과 넣기 (색상 넣기, giphy 아이템 넣기, 눈코입 어디있는지 찾기..)
- 사진 or 동영상 파일로 저장하기

### 기본 구현 흐름
1. `getUserMedia()` 로 디바이스 카메라에 대한 접근권한을 획득한다.
2. 카메라가 전달해주는 MediaStream 객체를 `<video>` 태그에 소스로 지정한다.
3. `<video>` 재생이 시작되면, 비디오 프레임을 `<canvas>` 에 그려주는 함수를 실행한다.
4. `<video>` 를 `<canvas>` 에 그리면서, 원하는 필터도 함께 추가한다.
5. requestFrameAnimation 함수를 이용하여 `<video>`의 매 프래임을 `<canvas>` 에 계속 렌더링 시켜준다.
6. 렌더링 대상이 되는 `<canvas>` 를 이용해서 비디오 포맷 혹은 이미지 포맷으로 저장한다.

```javascript
const video = document.querySelector("video");
const output = document.querySelector("canvas#output");
const buffer = document.createElement("canvas");

function render() {
    const bufferContext = buffer.getContext("2d");
    const outputContext = output.getContext("2d");

    bufferContext.drawImage(video, 0,0); // (4)
    bufferContext.filter = "~~~"; // (4)
    output.drawImage(buffer, 0,0); // (4)

    requestAnimationFrame(render); // (5)
}

function save() { // (6)
    const dataurl = output.toDataUrl("image/png");
    // ... 이미지 변환 및 저장 생략

    const mediaRecorder = new MediaRecorder(output.captureStream());
    mediaRecorder.start();
    // ... 동영상 녹화 과정 및 저장 생략
}

window.navigator.mediaDevices.getUserMedia({ // (1)
    audio: false,
    video: {
      facing: 'user'
    }
})
.then(function(stream){
      video.srcObject = stream; // (2)
      video.oncanplay = render; // (3)
      video.play(); // (3)
})
.catch(function(err) {...} );
```

- 실시간 이미지 필터를 구현하는데는 위의 흐름과 크게 다르지 않다.
- 디바이스 접근 이후에는 모든 것이 화면에 보여지는 canvas 를 중심으로 구현된다.
- 1~6 번 과정을 더 구체화 시켜줄 브라우저 API나 라이브러리는 아래 문서를 순서대로 읽어보면 된다.

### 1. user webcam to canvas
- getUserMedia by WebRTC
- MediaStream
### 2. streaming canvas with filter
- canvas native filter (svg / css)
- webgl filter (#3)
- canvas manipulation library (fabric.js, glfx.js, ...)
- face tracking
### 3. record streaming canvas
- captureStream
- MediaRecorder
- RTCPeerConnection
- record library


