const saveData = (function () {
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style.display = 'none';
  return function (recordedBlob, fileName) {
    const url = URL.createObjectURL(recordedBlob);
    a.href = url;
    // Name of downloaded file
    a.download = `${fileName}.webm`;
    a.click();
    window.URL.revokeObjectURL(url);
  };
}());
export default saveData;