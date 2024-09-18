import ReactDOM from 'react-dom/client';

import { useTheme } from 'hooks';
import Router from './router';

import 'styles/index.scss';
import Discount from 'components/Discount/Discount';

function App() {
  useTheme();

  return (
    <>
      <Router/>
      <Discount/>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App/>);
