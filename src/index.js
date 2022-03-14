import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './sw-register';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import App from './components/App/App';
// styles
import './style/index.css';

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// Cache first strategy, we need to update version in serviceworker.js to push new changes
registerServiceWorker();
