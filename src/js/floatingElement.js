// Create wrapper element
const element = document.createElement('div');
// Create timer element
const timerElement = document.createElement('span');
export const createFloatingElement = async () => {
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
    resolve(element);
  });
  // Finalized timer
  const finalizedTimer = new Promise((resolve) => {
    timerElement.setAttribute('id', 'rs-timer');
    timerElement.innerText = '00:00:000';
    element.appendChild(timerElement);
    resolve(timerElement);
  });
  // Append wrapper to body
  const appendToBody = new Promise((resolve) => {
    document.body.appendChild(element);
    resolve(true);
  });
  return Promise.all([finalizedWrapper, finalizedTimer, appendToBody]);
};

export const destroyFloatingElement = () => {
  element.remove()
  timerElement.remove()
};