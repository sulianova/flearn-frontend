import Store from 'store';
import { login } from 'store/actions/sagas';

import Page, { EPageVariant } from 'ui/Page/Page';

export default function Unauthorized() {
  return (
    <Page variant={EPageVariant.Fallback} header footer>
      <p>You have to be authenticated to access this page</p>
      <button onClick={handleLogin}>Login</button>
    </Page>
  );
}

function handleLogin() {
  Store.dispatch(login({ payload: {}}));
}
