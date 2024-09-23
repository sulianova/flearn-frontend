import ReactDOM from 'react-dom/client';

import { useTheme } from 'hooks';
import Router from './router';

import 'styles/index.scss';

function App() {
  useTheme();

  return (
    <Router/>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App/>);
