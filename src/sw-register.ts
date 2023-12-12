const registerServiceWorker = () => {
  if (navigator.serviceWorker && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js');
    });
  }
}

export default registerServiceWorker;
