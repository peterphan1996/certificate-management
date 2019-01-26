export const downloadFile = (data, filename, type) => {
  const file = new Blob([data], { type });
  if (window.navigator.msSaveOrOpenBlob)
    window.navigator.msSaveOrOpenBlob(file, filename);
  else {
    const a = document.createElement('a');

    const url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
};
