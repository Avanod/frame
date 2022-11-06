// Load Styles
import '../scss/main.scss';

// Declare Elements
const preview = document.getElementById('preview');
const recording = document.getElementById('recording');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const downloadButton = document.getElementById('downloadButton');

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
  // Get stream and show preview
  .then((stream) => {
    // Show stream on preview box
    preview.srcObject = stream;
    // Add stream to download button
    downloadButton.href = stream;
    // Check prefix for Firefox
    preview.captureStream = preview.captureStream || preview.mozCaptureStream;
    return new Promise((resolve) => preview.onplaying = resolve);
  })
  // Create recorded chunks and wait for stop
  .then(() => startRecording(preview.captureStream()))
  // Create Blob and video file
  .then((recordedChunks) => {
    // Create Blob
    const recordedBlob = new Blob(recordedChunks, {type: mimeType});
    // Create URL for preview box
    recording.src = URL.createObjectURL(recordedBlob);
    // Add URL to download button
    downloadButton.href = recording.src;
    // Name of downloaded file
    downloadButton.download = 'RecordedVideo.webm';
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
3;

// Haydeh
const mouseEvents = () => {
  let moved, clicked, startPosition, element;

  let mousedownListener = (event) => {
    const x = event.pageX;
    const y = event.pageY;
    startPosition = {x, y};
    clicked = true;
  };

  let mousemoveListener = (event) => {
    const x = event.pageX;
    const y = event.pageY;
    if (clicked) {
      event.preventDefault();
      if (!moved) element = createElement();
      if (!element) return;
      // Style
      //// Background color of element
      element.style.backgroundColor = 'black';
      //// CSS position of element
      element.style.position = 'absolute';
      //// Position of element
      element.style.top = `${startPosition.y < y ? startPosition.y : y}px`;
      element.style.right = `${startPosition.x < x ? startPosition.x : x}px`;
      element.style.bottom = `${y < startPosition.y ? y : startPosition.y}px`;
      element.style.left = `${x < startPosition.x ? x : startPosition.x}px`;
      //// Width and height of element
      element.style.width = `${startPosition.x > x ? startPosition.x - x : x - startPosition.x}px`;
      element.style.height = `${startPosition.y > y ? startPosition.y - y : y - startPosition.y}px`;
      ////////////////////////////////////////////
      moved = true;
    }
  };

  let mouseupListener = () => {
    moved = false;
    clicked = false;
  };

  document.addEventListener('mousedown', mousedownListener);
  document.addEventListener('mousemove', mousemoveListener);
  document.addEventListener('mouseup', mouseupListener);

  // document.addEventListener('mouseup', upListener)

  // release memory
  // document.removeEventListener('mousedown', downListener)
  // document.removeEventListener('mousemove', moveListener)
  // document.removeEventListener('mouseup', upListener)
};

mouseEvents();

const createElement = () => {
  const element = document.createElement('div');
  element.setAttribute('id', `mask-element-${Math.random().toString(16).slice(2)}`);
  element.addEventListener('click', () => removeElement(element));
  document.body.appendChild(element);
  return element;
};
const removeElement = (element) => element.remove();