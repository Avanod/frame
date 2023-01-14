// Load Styles
import '../scss/main.scss';
import {createElement, destroyElement} from './floatingEmelemt.js';
import {runTimer} from './timer.js';
import ScreenMask from './screenMask.js';
import ScreenRecorder from './screenRecorder.js';
// Screen Recorder
const screenRecorder = new ScreenRecorder();
const screenMask = new ScreenMask();
let timerWrapper;
const starButton = document.getElementById('startButton');

const closeElement = () => stopRecord();
const startRecord = () => {
  screenRecorder.start().then(() => runTimer(timerWrapper, observeTime));
  const onStop = screenRecorder.onStop();
  onStop.then(response => {
    console.log({response})
    console.log(onStop.canceled)
    if (onStop.canceled) console.log('true')
  });
};
const stopRecord = () => {
  screenRecorder.stopRecording();
  destroyElement();
  screenMask.removeAllElements();
};
const startMask = () => {
  screenMask.init(true);
};
const stopMask = () => {
  screenMask.init(false);
};
const observeTime = ({minutes}) => (minutes === 1) && stopRecord();
starButton.onclick = () => createElement(closeElement, startRecord, stopRecord, startMask, stopMask).then(element => timerWrapper = element);