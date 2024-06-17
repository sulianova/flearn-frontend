

import { authService } from 'services/auth.service';

import Page, { EPageVariant } from 'ui/Page/Page';

export default function Unauthorized() {
  return (
    <Page variant={EPageVariant.Fallback} header footer>
      <p>You have to be authenticated to access this page</p>
      <button onClick={() => authService.authenticate()}>Login</button>
    </Page>
  );
}
