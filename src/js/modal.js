const fade = document.createElement('div');
const modal = document.createElement('div');
const header = document.createElement('div');
const closeButton = document.createElement('span');
const content = document.createElement('div');
const body = document.querySelector('body');
const createFade = () => {
  fade.style.position = 'fixed';
  fade.style.inset = '0 0 0 0';
  fade.style.backgroundColor = 'rgba(0, 0, 0, .75)';
  fade.style.zIndex = '1';
  fade.style.display = 'none';
  body.appendChild(fade);
  return fade;
};
const createModal = () => {
  modal.style.position = 'absolute';
  modal.style.width = '600px';
  modal.style.height = 'auto';
  modal.style.inset = '50% 0 auto 0';
  modal.style.marginRight = 'auto';
  modal.style.marginLeft = 'auto';
  modal.style.transform = 'translateY(-50%)';
  modal.style.backgroundColor = 'rgba(255, 255, 255, 1)';
  modal.style.zIndex = '2';
  fade.appendChild(modal);
  return modal;
};
const createHeader = () => {
  header.style.padding = '17px 15px';
  header.style.display = 'flex';
  header.style.justifyContent = 'space-between'
  modal.appendChild(header);
  return header;
};
const createCloseButton = () => {
  closeButton.setAttribute('id', 'rs-close');
  closeButton.style.height = '12px';
  closeButton.style.width = '12px';
  closeButton.style.display = 'inline-flex';
  closeButton.style.alignItems = 'center';
  closeButton.style.justifyContent = 'center';
  closeButton.style.cursor = 'pointer';
  closeButton.innerHTML = `<svg viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'><line x1='1' y1='11' x2='11' y2='1' stroke='black' stroke-width='2' /><line x1='1' y1='1' x2='11' y2='11' stroke='black' stroke-width='2' /></svg>`;
  closeButton.onclick = () => hideModal();
  header.appendChild(closeButton);
  return closeButton;
};
const createContent = () => {
  content.setAttribute('id', 'rs-modal-content');
  content.style.padding = '17px 15px';
  modal.appendChild(content);
  return content;
};
const initialModal = async () => {
  const initialFade = new Promise((resolve) => resolve(createFade()));
  const initialModal = new Promise((resolve) => resolve(createModal()));
  const initialHeader = new Promise((resolve) => resolve(createHeader()));
  const initialCloseButton = new Promise((resolve) => resolve(createCloseButton()));
  const initialContent = new Promise((resolve) => resolve(createContent()));
  return Promise.all([initialContent, initialHeader, initialFade, initialModal, initialCloseButton]);
};
const init = async () => new Promise(resolve => initialModal().then(response => resolve(response[0])));
export const showModal = () => {
  body.style.overflow = 'hidden';
  fade.style.display = 'block';
};
export const hideModal = () => {
  body.removeAttribute('overflow');
  fade.remove();
  modal.remove();
  header.remove();
  closeButton.remove();
  content.remove();
};
export const addTitle = (title) => header.insertBefore(title, closeButton);
export default init;