import ReactDOM from 'react-dom/client';

import { useTheme } from 'hooks';
import Router from './router';

import 'styles/index.scss';
import PromoPopup from 'components/PromoPopup/PromoPopup';

function App() {
  useTheme();

  return (
    <>
      <Router/>
      <PromoPopup/>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App/>);
