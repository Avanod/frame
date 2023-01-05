import {runTimer, stopTimer} from './timer.js';

class ScreenRecorder {
  constructor(options) {
    this.startButtonId = options?.startButtonId ?? 'startButton';
    this.stopButtonId = options?.stopButtonId ?? 'stopButton';
    // Declare constraints
    this.displayMediaConstraints = options?.displayMediaConstraints ?? {audio: true, video: true};
    this.userMediaConstraints = options?.userMediaConstraints ?? {
      audio: {
        sampleSize: 100,
        frameRate: {max: 30},
        channelCount: 2,
      },
    };
    // Declare mime type
    this.mimeType = options?.mimeType ?? 'video/webm';
    // Declare Elements
    this.startButton = document.getElementById(this.startButtonId);
    this.stopButton = document.getElementById(this.stopButtonId);
  }
  // Declare Stats
  videoStreamState;
  audioStreamState;
  // Start recording function
  startRecording = (stream) => {
    runTimer();
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
  };
  // Stop recording function
  stopRecording = (streams) => {
    // Stop every track of each stream
    streams.forEach(stream => stream.getTracks().forEach((track) => track.stop()));
  };
  // Create mixed stream from display media and user media
  createStream = async () => {
    // Get display media
    this.videoStreamState = await navigator.mediaDevices.getDisplayMedia(this.displayMediaConstraints);
    // Get user media (Just Audio)
    this.audioStreamState = await navigator.mediaDevices.getUserMedia(this.userMediaConstraints);
    // Get Audio track of this moment
    const audioTrack = this.audioStreamState.getAudioTracks()[0];
    // Add microphone audio to display video
    this.videoStreamState.addTrack(audioTrack);
    // Return mixed stream
    return this.videoStreamState;
  };
  // Start get permission
  start = () => {
    const stopRecording = () => this.stopRecording([this.videoStreamState, this.audioStreamState]);
    const saveData = (recordedBlob, fileName) => this.saveData(recordedBlob, fileName);
    const mimeType = this.mimeType;
    this.createStream()
        // Create recorded chunks and wait for stop
        .then((stream) => {
          // Check if stream is stopped with browser button
          stream.getVideoTracks()[0].onended = () => stopRecording();
          // Create float element
          this.createFloatingElement().then((response) => {
            // Start timer
            runTimer(response[1], this.observeTime)
          });
          return this.startRecording(stream);
        })
        // Create Blob and video file
        .then((recordedChunks) => {
          // Stop timer
          stopTimer();
          // Create Blob
          const recordedBlob = new Blob(recordedChunks, {type: mimeType});
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
  };
  // Save video
  saveData = (function () {
    const a = document.createElement('a');
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
  // Create floating element
  createFloatingElement = async () => {
    // Create wrapper element
    const element = document.createElement('div');
    // Create timer element
    const timer = document.createElement('span');
    // Finalized wrapper
    const finalizedWrapper = new Promise((resolve) => {
      // Wrapper styles
      element.style.position = 'fixed';
      element.style.left = '25px';
      element.style.bottom = '25px';
      element.style.height = '25px';
      element.style.backgroundColor = 'rgba(0, 0, 0, .75)';
      element.style.border = '1px solid rgba(255, 255, 255, 1)';
      element.style.borderRadius = '2px';
      element.style.padding = '0 4px';
      element.style.display = 'flex';
      element.style.alignItems = 'center';
      element.style.color = 'white';
      element.style.fontFamily = '"Roboto mono",monospace';
      element.style.fontSize = '14px';
      resolve(element)
    });
    // Finalized timer
    const finalizedTimer = new Promise((resolve) => {
      timer.setAttribute('id', 'rs-timer');
      timer.innerText = '00:00:000';
      element.appendChild(timer);
      resolve(timer)
    });
    // Append wrapper to body
    const appendToBody = new Promise((resolve) => {
      document.body.appendChild(element)
      resolve(true)
    });
    return Promise.all([finalizedWrapper, finalizedTimer, appendToBody]);
  };
  // Initial Listeners
  init = () => {
    // Start Stream
    this.startButton.addEventListener('click', () => this.start(), false);
    // Stop Stream
    this.stopButton.addEventListener('click', () => this.stopRecording([this.videoStreamState, this.audioStreamState]), false);
  };
  observeTime = ({seconds}) => {
    console.log({seconds})
  }
}

export default ScreenRecorder;