import init, {addTitle, hideModal, showModal} from './modal.js';
import ScreenMask from './screenMask.js';

const screenMask = new ScreenMask();

const askingForMask = () => {
  init().then((modalContent) => {
    createModalContent().then(([content, title, footer]) => {
      modalContent.appendChild(content).appendChild(footer);
      addTitle(title);
      showModal();
    });
  });
};
const createModalContent = async () => {
  const content = new Promise((resolve) => resolve(createContent()));
  const title = new Promise((resolve) => resolve(createTitle()));
  const footer = new Promise((resolve) => resolve(createFooter()));
  return Promise.all([content, title, footer]);
};
const createContent = () => {
  const content = document.createElement('div');
  const p = document.createElement('p');
  p.innerText = 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.';
  content.appendChild(p);
  return content;
};
const createTitle = () => {
  const title = document.createElement('h4');
  title.innerText = 'مایل هستید؟';
  return title;
};
const createFooter = () => {
  const footer = document.createElement('div');
  footer.style.display = 'flex';
  footer.style.justifyContent = 'space-between';
  // Accept Button
  const acceptButton = document.createElement('button');
  acceptButton.innerText = 'مخفی کردن';
  acceptButton.style.textAlign = 'center';
  acceptButton.style.whiteSpace = 'nowrap';
  acceptButton.style.padding = '0.375rem 0.75rem';
  acceptButton.style.color = '#FFF';
  acceptButton.style.backgroundColor = '#DC3545';
  acceptButton.style.border = '1px solid #dc3545';
  acceptButton.onclick = () => {
    screenMask.init(true);
    hideModal();
  };
  // Reject Button
  const rejectButton = document.createElement('button');
  rejectButton.innerText = 'ادامه';
  rejectButton.style.textAlign = 'center';
  rejectButton.style.whiteSpace = 'nowrap';
  rejectButton.style.padding = '0.375rem 0.75rem';
  rejectButton.style.color = '#FFF';
  rejectButton.style.backgroundColor = '#007BFF';
  rejectButton.style.border = '1px solid #007bff';
  // Append buttons to footer
  footer.appendChild(acceptButton);
  footer.appendChild(rejectButton);
  return footer;
};
export default askingForMask;