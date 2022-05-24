import * as React from 'react';

import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { HashRouter } from 'react-router-dom';
import '../utils/i18n';

import { persistor, store } from '../store';
import { SnackBarProvider } from '../components/Snackbar';
import { Modals } from '../modals';

import { InitComponent } from '.';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SnackBarProvider>
        <Modals />
        <HashRouter>
          <InitComponent />
        </HashRouter>
      </SnackBarProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('Content')
);
