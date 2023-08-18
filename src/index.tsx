import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import store from 'store';
import { init } from 'store/actions/sagas';
import Router from './router';

import 'styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

store.dispatch(init({}));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router/>
    </Provider>
  </React.StrictMode>
);
