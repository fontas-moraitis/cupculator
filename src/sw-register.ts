const registerServiceWorker = () => {
  // if ('serviceWorker' in navigator) {
  //   navigator.serviceWorker.register('./serviceworker.js');
  // }

  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js');
    });
  }
}

export default registerServiceWorker;
