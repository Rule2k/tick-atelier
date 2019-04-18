import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { BreakpointProvider } from 'react-socks';
import { ReactRouterGlobalHistory } from 'react-router-global-history';

import DisplayAppOrLogin from 'src/containers/DisplayAppOrLogin/DisplayAppOrLogin';
import { persistor, store } from './store';

const rootComponent = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <BreakpointProvider>
          <ReactRouterGlobalHistory />
          <DisplayAppOrLogin />
        </BreakpointProvider>
      </Router>
    </PersistGate>
  </Provider>
);
const target = document.getElementById('root');
// 1 - Le composant à rendre
// 2 - La cible dans le DOM
render(rootComponent, target);
