const video = document.getElementById('video');

navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then((stream)=> {
        video.srcObject = stream;
    })
    .catch( (err)=> {
        console.error('Error accessing the camera: ', err);
    });
