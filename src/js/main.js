// Load Styles
import '../scss/main.scss';
import ScreenMask from './screenMask.js';
import ScreenRecorder from './screenRecorder.js';

// Screen Recorder
const screenRecorder = new ScreenRecorder()
screenRecorder.init();
// Screen Mask
const screenMask = new ScreenMask()
screenMask.init();