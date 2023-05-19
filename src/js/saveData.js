import completeRequest from './completeRequest.js';
import {hideModal} from './modal.js';

export const initialInfo = {
  store: {
    fullName: 'نیما کاویانی',
    email: 'n.kaviyani@asax.ir',
  },
  get info() {
    return this.store;
  },
  set info(info) {
    this.store = info ?? {
      fullName: undefined,
      email: undefined,
      avatar: undefined,
    };
  },
};

const request = async (recordedBlob, values) => {
  const now = new Date();
  const yyyy = now.getFullYear();
  let mm = now.getMonth() + 1; // Months start at 0!
  let dd = now.getDate();
  let HH = now.getHours();
  let MM = now.getMinutes();
  let SS = now.getSeconds();

  if (dd < 10) dd = `0${dd}`;
  if (mm < 10) mm = `0${mm}`;
  if (HH < 10) HH = `0${HH}`;
  if (MM < 10) MM = `0${MM}`;
  if (SS < 10) SS = `0${SS}`;

  const fileName = `${yyyy}/${mm}/${dd}-${HH}:${MM}:${SS}`;

  const file = new File([recordedBlob], fileName);
  const formData = new FormData();

  formData.append('file', file, `${fileName}.webm`);
  formData.append('fullName', values['fullName']);
  formData.append('subject', values['subject']);
  formData.append('description', values['description']);
  formData.append('priority', values['priority']);

  const requestBody = {
    ...values,
    file: `${fileName}.webm`,
  };
  console.log({recordedBlob});
  console.log({requestBody});

  const response = await fetch('https://reqbin.com/echo/post/json', {
    method: 'POST',
    // body: formData,
    body: {},
  });

  response.json().then(response => {
    console.log({response});
  });
  hideModal();
};

const saveData = (function () {
  completeRequest(initialInfo.info, (values) => values && request(undefined, undefined, values));
  // const a = document.createElement('a');
  // document.body.appendChild(a);
  // a.style.display = 'none';
  return function (recordedBlob) {
    completeRequest(initialInfo.info, (values) => values && request(recordedBlob, values));
    // const url = URL.createObjectURL(recordedBlob);
    // a.href = url;
    // // Name of downloaded file
    // a.download = `${fileName}.webm`;
    // a.click();
    // window.URL.revokeObjectURL(url);
  };
}());

export default saveData;