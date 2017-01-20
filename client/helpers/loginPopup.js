export default function loginPopup(provider) {
  return new Promise((resolve) => {
    let win;
    const curWidth = document.body.offsetWidth;
    const curLeft = window.screenLeft;
    const leftPos = curLeft + (curWidth / 2) - 500;

    const curTop = window.screenTop;
    const topPos = curTop + 100;

    function receiveMessage(result) {
      resolve(result.data);
      win.close();
    }

    window.addEventListener('message', receiveMessage, false);
    const features = `status=no,scrollbar=yes,resizable=yes,width=1000,height=600,top=${topPos},left=${leftPos}`;
    win = window.open(`${process.env.PROXY_SERVER}/auth/${provider}`, 'auth_popup', features);
  });
}
