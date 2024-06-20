import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { useTheme } from 'hooks';
import store from 'store';
import Router from './router';

import 'styles/index.scss';

function App() {
  useTheme();

  return (
    <Provider store={store}>
      <Router/>
    </Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App/>);
