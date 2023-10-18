const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const message = document.getElementById('message');

async function setupCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    return new Promise((resolve) => {
        video.onloadedmetadata = () => {
            resolve(video);
        };
    });
}

async function loadFaceApi() {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
}

async function main() {
    await setupCamera();
    await loadFaceApi();
    
    const canvasSize = { width: video.width, height: video.height };
    const faceCanvas = faceapi.createCanvasFromMedia(video);
    document.body.append(faceCanvas);
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(faceCanvas, displaySize);

    const ovalCenterX = canvasSize.width / 2;
    const ovalCenterY = canvasSize.height / 2;
    const ovalRadius = 100; // Радиус овала

    // Проверка, попало ли лицо в овал
    function isFaceInOval(detection) {
        const x = detection._box._x + detection._box._width / 2;
        const y = detection._box._y + detection._box._height / 2;
        const dx = (x - ovalCenterX) / ovalRadius;
        const dy = (y - ovalCenterY) / ovalRadius;
        return dx * dx + dy * dy <= 1;
    }

    video.addEventListener('play', async () => {
        const canvas = faceapi.createCanvasFromMedia(video);
        document.body.append(canvas);
        const displaySize = { width: video.width, height: video.height };
        faceapi.matchDimensions(canvas, displaySize);

        let faceCount = 0;
        let detections = [];
        let intervalId = null;

        const intervalDuration = 2000; // 2 секунды

        intervalId = setInterval(async () => {
            detections = await faceapi.detectAllFaces(video,
                new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
            canvas
                .getContext('2d')
                .clearRect(0, 0, canvas.width, canvas.height);

            for (const detection of detections) {
                if (isFaceInOval(detection)) {
                    faceCount++;
                    if (faceCount === 1) {
                        // Первое попадание в овал
                        message.innerText = 'Сделан первый снимок!';
                        const snap1 = await takeSnapshot(video, canvasSize);
                        displaySnapshot(snap1);
                    } else if (faceCount === 2) {
                        // Второе попадание в овал
                        message.innerText = 'Сделан второй снимок!';
                        const snap2 = await takeSnapshot(video, canvasSize);
                        displaySnapshot(snap2);
                        clearInterval(intervalId);
                    }
                }
            }
        }, intervalDuration);
    });
}

function takeSnapshot(video, canvasSize) {
    const canvas = document.createElement('canvas');
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvasSize.width, canvasSize.height);
    return canvas.toDataURL('image/jpeg');
}

function displaySnapshot(dataURL) {
    const img = new Image();
    img.src = dataURL;
    document.body.appendChild(img);
}

main();
