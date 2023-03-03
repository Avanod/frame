import {maskIcon, recordIcon, recordingIcon, stopRecordIcon} from './svg.js';

// wrapper element
const wrapper = document.createElement('div');
// Timer element
const timerWrapper = document.createElement('div');
const timerElement = document.createElement('span');
// Close Element
const closeButton = document.createElement('span');
// Mask Element
const maskWrapper = document.createElement('div');
const maskStartButton = document.createElement('span');
const maskStopButton = document.createElement('span');
// Record Elements
const recordWrapper = document.createElement('div');
const recordButton = document.createElement('span');
const startRecordButton = document.createElement('span');
const stopRecordButton = document.createElement('span');
// Blink timeout variable
let blinkIntervalId;
const mouseEnterWrapper = () => {
  // Show close button
  closeButton.style.visibility = 'visible';
  closeButton.style.opacity = '1';
};
const mouseOutWrapper = () => {
  // Hide close button
  closeButton.style.visibility = 'hidden';
  closeButton.style.opacity = '0';
};
const blinkStopButton = () => {
  blinkIntervalId = setInterval(() => {
    const opacity = getComputedStyle(recordButton).opacity;
    if (opacity === '1') recordButton.style.opacity = '0';
    else recordButton.style.opacity = '1';
  }, 500);
};
const finalizedElements = async () => {
  // Initial wrapper
  const initWrapper = new Promise((resolve) => {
    // Wrapper styles
    wrapper.style.position = 'fixed';
    wrapper.style.left = '25px';
    wrapper.style.bottom = '25px';
    wrapper.style.height = '55px';
    wrapper.style.backgroundColor = 'rgba(256, 256, 256, 1)';
    wrapper.style.border = '1px solid #8685E0';
    wrapper.style.borderRadius = '6px';
    wrapper.style.padding = '10px 15px';
    wrapper.style.display = 'flex';
    wrapper.style.alignItems = 'center';
    wrapper.style.color = 'black';
    wrapper.style.fontFamily = '"Roboto mono",monospace';
    wrapper.style.fontSize = '20px';
    wrapper.style.direction = 'ltr';
    // Hover wrapper
    wrapper.addEventListener('mouseover', mouseEnterWrapper);
    wrapper.addEventListener('mouseout', mouseOutWrapper);
    resolve(wrapper);
  });
  const initMaskStartButton = new Promise((resolve) => {
    // Mask start button ID
    maskStartButton.setAttribute('id', 'rs-mask-start');
    maskStartButton.innerHTML = maskIcon;
    maskStartButton.style.borderLeft = '1px solid #C9C9C9';
    maskStartButton.style.paddingLeft = '15px';
    maskWrapper.appendChild(maskStartButton);
    resolve(true);
  });
  const initMaskStopButton = new Promise((resolve) => {
    // Mask stop button ID
    maskStopButton.setAttribute('id', 'rs-mask-stop');
    // Mask button styles
    maskStopButton.style.display = 'inline-block';
    maskStopButton.style.position = 'relative';
    maskStopButton.style.width = '30px';
    maskStopButton.style.height = '30px';
    maskStopButton.style.backgroundColor = 'rgb(99,99,99)';
    maskStopButton.style.border = '1px solid #fff';
    maskStopButton.style.marginRight = '10px';
    maskStopButton.style.cursor = 'pointer';
    resolve(true);
  });
  // Finalize timer
  const initTimerWrapper = new Promise((resolve)=>{
    // Timer ID
    timerWrapper.setAttribute('id', 'rs-timer-wrapper');
    // Timer styles
    timerWrapper.style.margin = '0 20px 0 0';
    timerWrapper.style.display = 'flex';
    timerWrapper.style.alignItems = 'center';
    timerWrapper.style.lineHeight = '1.2';
    timerWrapper.style.position = 'relative';
    // Append to wrapper
    wrapper.appendChild(timerWrapper);
    resolve(true);
  })
  const initTimer = new Promise((resolve) => {
    // Timer ID
    timerElement.setAttribute('id', 'rs-timer');
    // Timer styles
    timerElement.style.fontSize = '20px';
    timerElement.innerText = '00:00';
    // Append to wrapper
    timerWrapper.appendChild(timerElement);
    resolve(timerElement);
  });
  // Record button
  const initRecordButton = new Promise((resolve)=>{
    recordButton.setAttribute('id','rs-recording');
    recordButton.style.opacity = '0';
    recordButton.style.transition = 'all .3s ease';
    recordButton.style.position = 'absolute';
    recordButton.style.right = '-20px';
    recordButton.innerHTML = recordingIcon;
    timerWrapper.appendChild(recordButton);
    resolve(true);
  })
  // Initial start button
  const initStartRecordButton = new Promise((resolve) => {
    startRecordButton.setAttribute('id', 'rs-start-record');
    startRecordButton.innerHTML = recordIcon;
    startRecordButton.style.cursor = 'pointer';
    recordWrapper.appendChild(startRecordButton);
    resolve(true);
  });
  // Initial stop button
  const initStopRecordButton = new Promise((resolve) => {
    stopRecordButton.setAttribute('id', 'rs-stop-record');
    stopRecordButton.innerHTML = stopRecordIcon;
    stopRecordButton.style.cursor = 'pointer';
    resolve(true);
  });
  // Initial record wrapper
  const initRecordWrapper = new Promise((resolve) => {
    recordWrapper.setAttribute('id', 'rs-record-wrapper');
    recordWrapper.style.margin = '0 15px';
    recordWrapper.style.display = 'flex';
    recordWrapper.style.alignItems = 'center';
    recordWrapper.style.justifyContent = 'center';
    wrapper.appendChild(recordWrapper);
    resolve(true);
  });
  // Initial mask wrapper
  const initMaskWrapper = new Promise((resolve) => {
    // Mask wrapper ID
    maskWrapper.setAttribute('id', 'rs-mask');
    // Mask wrapper style
    maskWrapper.style.display = 'flex';
    maskWrapper.style.alignItems = 'center';
    // Append to wrapper
    wrapper.appendChild(maskWrapper);
    resolve(true);
  });
  // Initial close button
  const initCloseButton = new Promise((resolve) => {
    // Close button ID
    closeButton.setAttribute('id', 'rs-close');
    // Close button styles
    closeButton.style.height = '16px';
    closeButton.style.width = '16px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.position = 'absolute';
    closeButton.style.right = '0';
    closeButton.style.top = '0';
    closeButton.style.transform = 'translate(6px, -6px)';
    closeButton.style.border = '1px solid black';
    closeButton.style.backgroundColor = 'white';
    closeButton.style.borderRadius = '50%';
    closeButton.style.color = 'black';
    closeButton.style.fontSize = '8px';
    closeButton.style.display = 'flex';
    closeButton.style.alignItems = 'center';
    closeButton.style.justifyContent = 'center';
    closeButton.style.transition = 'all .3s ease';
    closeButton.style.visibility = 'hidden';
    closeButton.style.opacity = '0';
    closeButton.innerText = '✖';
    // closeButton.innerHTML = `<svg viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'><line x1='1' y1='11' x2='11' y2='1' stroke='white' stroke-width='2' /><line x1='1' y1='1' x2='11' y2='11' stroke='white' stroke-width='2' /></svg>`;
    // Append to wrapper
    wrapper.appendChild(closeButton);
    resolve(true);
  });
  // Append wrapper to body
  const appendToBody = new Promise((resolve) => {
    document.body.appendChild(wrapper);
    resolve(true);
  });
  return Promise.all([
    initTimerWrapper,
    initTimer,
    initWrapper,
    initRecordButton,
    initStartRecordButton,
    initStopRecordButton,
    initMaskWrapper,
    initMaskStartButton,
    initMaskStopButton,
    initRecordWrapper,
    initCloseButton,
    appendToBody,
  ]);
};
export const createElement = async (closeElement, startRecord, stopRecord, startMask, stopMask) => {
  maskStartButton.onclick = () => {
    startMask(true);
    maskStartButton.remove();
    maskWrapper.appendChild(maskStopButton);
  };
  maskStopButton.onclick = () => {
    stopMask(true);
    maskStopButton.remove();
    maskWrapper.appendChild(maskStartButton);
  };
  closeButton.onclick = () => closeElement(true);
  startRecordButton.onclick = () => {
    startRecord(true);
    startRecordButton.remove();
    recordWrapper.appendChild(stopRecordButton);
    blinkStopButton();
  };
  stopRecordButton.onclick = () => {
    stopRecord(true);
    stopRecordButton.remove();
    recordWrapper.appendChild(startRecordButton);
    clearInterval(blinkIntervalId);
  };
  // Return created element
  return new Promise((resolve) => finalizedElements().then(response => resolve(response[0])));
};
export const destroyElement = () => {
  wrapper.remove();
  timerWrapper.remove();
  timerElement.remove();
  closeButton.remove();
  maskWrapper.remove();
  maskStartButton.remove();
  maskStopButton.remove();
  recordWrapper.remove();
  recordButton.remove();
  startRecordButton.remove();
  stopRecordButton.remove();
};