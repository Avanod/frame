import init, {addTitle, hideModal, showModal} from './modal.js';

const storeValues = {};

const onChangeValue = (event) => {
  const {name, value} = event.target;
  storeValues[name] = value;
  console.log({name, value});
};

const completeRequest = ({fullName, subject}, onSubmit) => {
  storeValues['fullName'] = fullName;
  storeValues['subject'] = subject;
  init().then((modalContent) => {
    createModalContent({fullName, subject}, onSubmit).then(([content, title, footer]) => {
      modalContent.appendChild(content).appendChild(footer);
      addTitle(title);
      showModal();
    });
  });
};
// Modal Sections
const createModalContent = async ({fullName, subject}, onSubmit) => {
  const content = new Promise((resolve) => resolve(createContent({fullName, subject})));
  const title = new Promise((resolve) => resolve(createTitle()));
  const footer = new Promise((resolve) => resolve(createFooter(onSubmit)));
  return Promise.all([content, title, footer]);
};
const createContent = ({fullName, subject}) => {
  // System Description
  const content = document.createElement('div');
  const p = document.createElement('p');
  p.innerText = 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.';
  content.appendChild(p);
  content.appendChild(createForm({fullName, subject}));
  return content;
};
const createTitle = () => {
  const title = document.createElement('h4');
  title.innerText = 'ارسال گزارش خطا یا پیشنهاد بهبود سیستم';
  return title;
};
const createFooter = (onSubmit) => {
  const footer = document.createElement('div');
  footer.style.display = 'flex';
  footer.style.justifyContent = 'space-between';
  // Button Element
  const button = document.createElement('button');
  button.style.textAlign = 'center';
  button.style.whiteSpace = 'nowrap';
  button.style.padding = '0.375rem 0.75rem';
  button.style.color = '#FFF';
  // Reject Button
  const rejectButton = button.cloneNode(true);
  rejectButton.innerText = 'انصراف';
  rejectButton.style.backgroundColor = '#DC3545';
  rejectButton.style.border = '1px solid #dc3545';
  rejectButton.onclick = () => {
    hideModal();
    onSubmit(undefined);
  };
  // Accept Button
  const acceptButton = button.cloneNode(true);
  acceptButton.innerText = 'ارسال';
  acceptButton.style.backgroundColor = '#007BFF';
  acceptButton.style.border = '1px solid #007bff';
  acceptButton.onclick = () => onSubmit(storeValues);
  // Append buttons to footer
  footer.appendChild(rejectButton);
  footer.appendChild(acceptButton);
  return footer;
};
// Form and Inputs
const createInput = (row, col, inputLabel, label, name, initialValue) => {
  // Input
  const input = document.createElement('input');
  //// Input styles
  input.style.width = '100%';
  input.style.height = '2rem';
  //// Input properties
  input.setAttribute('id', name);
  input.setAttribute('name', name);
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', label);
  input.onchange = onChangeValue;
  if (initialValue) input.value = initialValue;
  // Label
  inputLabel.innerText = label;
  inputLabel.setAttribute('for', name);
  // Input and Label append to col
  col.appendChild(inputLabel);
  col.appendChild(input);
  // Col append to wrapper
  row.appendChild(col);
};
const createSelect = (row, col, selectLabel, options, label, name) => {
  // Select
  const select = document.createElement('select');
  //// Select styles
  select.style.width = '100%';
  select.style.height = '2rem';
  //// Select property
  select.setAttribute('id', name);
  select.setAttribute('name', name);
  select.onchange = onChangeValue;
  // Options
  const option = document.createElement('option');
  options.forEach(item => {
    const clone = option.cloneNode(true);
    clone.value = item.value;
    clone.innerText = item.label;
    select.appendChild(clone);
  });
  // Label
  selectLabel.innerText = label;
  selectLabel.setAttribute('for', name);
  // Select and Label append to col
  col.appendChild(selectLabel);
  col.appendChild(select);
  // Col append to wrapper
  row.appendChild(col);
};
const createTextArea = (row, col, textAreaLabel, label, name) => {
  // TextArea
  const textArea = document.createElement('textarea');
  //// TextArea styles
  textArea.style.width = '100%';
  //// TextArea property
  textArea.setAttribute('id', name);
  textArea.setAttribute('name', name);
  textArea.setAttribute('rows', '4');
  textArea.setAttribute('placeholder', label);
  textArea.onchange = onChangeValue;
  // Label
  textAreaLabel.innerText = label;
  textAreaLabel.setAttribute('for', name);
  // TextArea and Label append to col
  col.appendChild(textAreaLabel);
  col.appendChild(textArea);
  // Col append to wrapper
  row.appendChild(col);
};
const createForm = ({fullName, subject}) => {
  // Wrapper
  const wrapper = document.createElement('div');
  //// Wrapper styles
  wrapper.style.width = '100%';
  wrapper.style.paddingRight = '15px';
  wrapper.style.paddingLeft = '15px';
  wrapper.style.marginRight = 'auto';
  wrapper.style.marginLeft = 'auto';
  // Row
  const row = document.createElement('div');
  //// Row styles
  row.style.display = 'flex';
  row.style.flexWrap = 'wrap';
  row.style.marginRight = '-30px';
  row.style.marginLeft = '-30px';
  row.style.marginBottom = '1rem';
  wrapper.appendChild(row);
  // Col
  const col = document.createElement('div');
  //// Col styles
  col.style.position = 'relative';
  col.style.width = '100%';
  col.style.paddingRight = '15px';
  col.style.paddingLeft = '15px';
  col.style.maxWidth = '100%';
  col.style.flexGrow = '1';
  col.style.flexBasis = '0';
  col.style.marginBottom = '.5rem';
  // Input Label
  const inputLabel = document.createElement('label');
  //// Input Label styles
  inputLabel.style.marginBottom = '.5rem';
  // Full name
  createInput(row, col.cloneNode(true), inputLabel.cloneNode(true), 'نام و نام‌خانوادگی', 'fullName', fullName);
  // Subject
  createInput(row, col.cloneNode(true), inputLabel.cloneNode(true), 'موضوع', 'subject', subject);
  // Priority
  //// highest: 1
  //// high: 2
  //// medium: 3
  //// low: 4
  //// lowest: 5
  //// critical: 6
  const options = [
    {label: 'خیلی زیاد', value: '1'},
    {label: 'زیاد', value: '2'},
    {label: 'معمولی', value: '3'},
    {label: 'پایین', value: '4'},
    {label: 'خیلی پایین', value: '5'},
    {label: 'بحرانی', value: '6'},
  ];
  createSelect(row, col.cloneNode(true), inputLabel.cloneNode(true), options, 'اولویت', 'priority');
  // Divider
  const divider = document.createElement('div');
  //// Divider styles
  divider.style.width = '100%';
  row.appendChild(divider);
  // Description
  createTextArea(row, col.cloneNode(true), inputLabel.cloneNode(true), 'توضیحات', 'description');
  return wrapper;
};
export default completeRequest;