import completeRequest from './completeRequest.js';

export const initialInfo = {
  store: {
    fullName: undefined,
    subject: undefined,
  },
  get info() {
    return this.store;
  },
  set info(info) {
    console.log({info});
    this.store = info ?? {};
  },
};

const saveData = (function () {
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style.display = 'none';
  return function (recordedBlob, fileName) {
    completeRequest(initialInfo.info);
    // const url = URL.createObjectURL(recordedBlob);
    // a.href = url;
    // // Name of downloaded file
    // a.download = `${fileName}.webm`;
    // a.click();
    // window.URL.revokeObjectURL(url);
  };
}());

export default saveData;