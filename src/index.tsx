import ReactDOM from 'react-dom/client';

import { useTheme } from 'hooks';
import { usePageSource } from 'hooks/pageSource';
import Router from './router';

import 'styles/index.scss';
import { PageContext } from 'ui/Page/Page';

function App() {
  const pageSource = usePageSource()
  useTheme();

  return (
    <PageContext.Provider value={pageSource}>
      <Router/>
    </PageContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App/>);
