import html2canvas from 'html2canvas';
const downloadMessage = (html: HTMLElement) => {
  html2canvas(html, {
    width: html.clientWidth,
    height: html.clientHeight,
    scale: 1.2,
  }).then(canvas => {
    const dataURL = canvas.toDataURL('image/png', 1.0);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = dataURL;
    a.download = `momotalk_${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
};
export default downloadMessage;
