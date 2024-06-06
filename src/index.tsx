import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import store from 'store';
import Router from './router';

import 'styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  // <React.StrictMode> // fucks up isMounted hook
    <Provider store={store}>
      <Router/>
    </Provider>
  // </React.StrictMode>
);
