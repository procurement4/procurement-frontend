import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './stores/store';

import App from './App';
import './index.css';

import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

const container = document.getElementById('root');
const root = createRoot(container);



root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)} >
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);


