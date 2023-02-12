// Load Styles
import '../scss/main.scss';
import {createElement, destroyElement} from './floatingEmelemt.js';
import Observable from './Observable.js';
import {runTimer, stopTimer} from './timer.js';
import ScreenMask from './screenMask.js';
import ScreenRecorder from './screenRecorder.js';
// Screen Recorder
const screenRecorder = new ScreenRecorder();
const screenMask = new ScreenMask();
// Declare time wrapper
let timerWrapper;
// Declare start button

const startButton = document.getElementById('startButton');

const startRecord = () => {
  // Subscribe observer
  Observable.subscribe(clearElements);
  screenRecorder.start().then(() => runTimer(timerWrapper, observeTime));
};
const stopRecord = () => screenRecorder.stopRecording();
const closeElement = () => screenRecorder.stopRecording();
const clearElements = () => {
  stopTimer();
  destroyElement();
  screenMask.removeAllElements();
  // Unsubscribe observer
  Observable.unsubscribe(clearElements);
};
const startMask = () => {
  screenMask.init(true);
};
const stopMask = () => {
  screenMask.init(false);
};
const observeTime = ({minutes}) => (minutes === 1) && stopRecord();
startButton.onclick = () => createElement(closeElement, startRecord, stopRecord, startMask, stopMask).then(element => timerWrapper = element);