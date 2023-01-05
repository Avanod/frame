// Load Styles
import '../scss/main.scss';
import ScreenMask from './screenMask.js';
// Declare Elements
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

// Declare constraints
const displayMediaConstraints = {
  audio: true,
  video: true,
};
const userMediaConstraints = {
  audio: {
    sampleSize: 100,
    frameRate: {max: 30},
    // noiseSuppression: true,
    // echoCancellation: true,
    channelCount: 2,
  },
};
// Declare mime type
const mimeType = 'video/webm';

// Declare Stats
let videoStreamState;
let audioStreamState;

// Start recording function
function startRecording(stream) {
  // Create a media recorder
  const recorder = new MediaRecorder(stream);
  // The stream data is stored in this array
  let data = [];
  // Push frames to array
  recorder.ondataavailable = (event) => data.push(event.data);
  // Start media recorder
  recorder.start();

  // Check if stream is stopped
  let stopped = new Promise((resolve, reject) => {
    recorder.onstop = resolve;
    recorder.onerror = (event) => reject(event.name);
  });

  // When stream is stopped, return data
  return Promise.all([stopped]).then(() => data);
}

// Stop recording function
function stopRecording(streams) {
  // Stop every track of each stream
  streams.forEach(stream => stream.getTracks().forEach((track) => track.stop()));
}

// Create mixed stream from display media and user media
async function createStream() {
  // Get display media
  videoStreamState = await navigator.mediaDevices.getDisplayMedia(displayMediaConstraints);
  // Get user media (Just Audio)
  audioStreamState = await navigator.mediaDevices.getUserMedia(userMediaConstraints);
  // Get Audio track of this moment
  const audioTrack = audioStreamState.getAudioTracks()[0];
  // Add microphone audio to display video
  videoStreamState.addTrack(audioTrack);
  // Return mixed stream
  return videoStreamState;
}

// Start Stream
startButton.addEventListener('click', () => {
  createStream()
  // Create recorded chunks and wait for stop
  .then((stream) =>{
    // Check if stream is stopped with browser button
    stream.getVideoTracks()[0].onended = function () {
      stopRecording([videoStreamState, audioStreamState])
    };
    return startRecording(stream)
  })
  // Create Blob and video file
  .then((recordedChunks) => {
    // Create Blob
    const recordedBlob = new Blob(recordedChunks, {type: mimeType});
    console.log('here three')
    // Test of File
    saveData(recordedBlob, 'my-file');
    console.log(`Successfully recorded ${recordedBlob.size} bytes of ${recordedBlob.type} media.`);
  })
  .catch((error) => {
    if (error.name === 'NotFoundError') {
      console.log('Camera or microphone not found. Can\'t record.');
    } else {
      console.log(error);
    }
  });
}, false);

// Stop Stream
stopButton.addEventListener('click', () => {
  stopRecording([videoStreamState, audioStreamState]);
}, false);

/*
 *
 * Test File
 * */
const saveData = (function () {
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style.display = 'none';
  return function (recordedBlob, fileName) {
    const url = URL.createObjectURL(recordedBlob);
    a.href = url;
    // Name of downloaded file
    a.download = `${fileName}.webm`;
    a.click();
    window.URL.revokeObjectURL(url);
  };
}());

// Screen Mask
ScreenMask.init();