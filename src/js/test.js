// Load Styles
import '../scss/main.scss';

// Declare Elements
const preview = document.getElementById('preview');
const recording = document.getElementById('recording');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const downloadButton = document.getElementById('downloadButton');
const logElement = document.getElementById('log');

const recordingTimeMS = 5000;

// // Declare constraints
// const constraints = {
//   audio: true,
//   video: {mediaSource: 'screen'},
// };
// // Declare mime type
// const mimeType = 'video/webm';

// // Save file in local
// function saveFile(recordedChunks, mimeType) {
//   // Create blob for save in local
//   const blob = new Blob(recordedChunks, {
//     type: mimeType,
//   });
//   // Show prompt for save file and create an <a> tag.
//   let filename = window.prompt('Enter file name'), downloadLink = document.createElement('a');
//   // Set blob as URL
//   downloadLink.href = URL.createObjectURL(blob);
//   // Download file
//   downloadLink.download = `${filename}.webm`;
//   // Append <a> tag to body
//   document.body.appendChild(downloadLink);
//   // Click on <a> tag
//   downloadLink.click();
//   // Clear URL from memory
//   URL.revokeObjectURL(blob);
//   // Remove <a> tag from body
//   document.body.removeChild(downloadLink);
// }

// // Create recorder
// async function createRecorder(mimeType, constraints) {
//   // The stream data is stored in this array
//   let recordedChunks = [];
//   // Initial stream
//   navigator.mediaDevices.getDisplayMedia(constraints).then(stream=>{
//     // Create a media recorder
//     const mediaRecorder = new MediaRecorder(stream);
//     // Push frames to array
//     mediaRecorder.ondataavailable = function (e) {
//       if (e.data.size > 0) {
//         recordedChunks.push(e.data);
//       }
//     };
//     // On stop share screen save video file
//     mediaRecorder.onstop = function () {
//       // Display frames
//       console.log({recordedChunks});
//       // Save file
//       saveFile(recordedChunks, mimeType);
//       // Clear array
//       recordedChunks = [];
//     };
//     // Start record screen for every 200ms
//     mediaRecorder.start(200);
//     // Useless return
//     return mediaRecorder;
//   });
//   // const stream = await navigator.mediaDevices.getDisplayMedia(constraints);
// }

function log(msg) {
  logElement.innerHTML += `${msg}\n`;
}

function wait(delayInMS) {
  return new Promise((resolve) => setTimeout(resolve, delayInMS));
}

function stop(stream) {
  stream.getTracks().forEach((track) => track.stop());
}

function startRecording(stream, lengthInMS) {
  let recorder = new MediaRecorder(stream);
  let data = [];

  recorder.ondataavailable = (event) => data.push(event.data);
  recorder.start();
  log(`${recorder.state} for ${lengthInMS / 1000} seconds…`);

  let stopped = new Promise((resolve, reject) => {
    recorder.onstop = resolve;
    recorder.onerror = (event) => reject(event.name);
  });

  let recorded = wait(lengthInMS).then(() => {
    if (recorder.state === 'recording') {
      recorder.stop();
    }
  });

  return Promise.all([
    stopped,
    recorded,
  ]).then(() => data);
}

startButton.addEventListener('click', () => {
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  })
           .then((stream) => {
             preview.srcObject = stream;
             downloadButton.href = stream;
             preview.captureStream = preview.captureStream || preview.mozCaptureStream;
             return new Promise((resolve) => preview.onplaying = resolve);
           })
           .then(() => startRecording(preview.captureStream(), recordingTimeMS))
           .then((recordedChunks) => {
             let recordedBlob = new Blob(recordedChunks, {type: 'video/webm'});
             recording.src = URL.createObjectURL(recordedBlob);
             downloadButton.href = recording.src;
             downloadButton.download = 'RecordedVideo.webm';

             log(`Successfully recorded ${recordedBlob.size} bytes of ${recordedBlob.type} media.`);
           })
           .catch((error) => {
             if (error.name === 'NotFoundError') {
               log('Camera or microphone not found. Can\'t record.');
             } else {
               log(error);
             }
           });
}, false);

stopButton.addEventListener('click', () => {
  stop(preview.srcObject);
}, false);

// // Share Button
// const shareButton = document.getElementById('screen-share');
//
// // Onclick the button
// shareButton.onclick = () => {
//   // Invoke recorder
//   createRecorder(mimeType, constraints).then(mediaRecorder => console.log({mediaRecorder}));
// };