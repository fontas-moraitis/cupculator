import React from 'react';
import { createRoot } from 'react-dom/client';
import registerServiceWorker from './sw-register';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import App from './components/App/App';
import './style/index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);

// Cache first strategy, we need to update version in serviceworker.js to push new changes
registerServiceWorker();
