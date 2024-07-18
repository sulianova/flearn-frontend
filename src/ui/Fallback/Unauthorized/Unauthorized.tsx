

import { useURLSection } from 'hooks';
import { authService } from 'services';

import Page, { EPageVariant } from 'ui/Page/Page';

export default function Unauthorized() {
  const section = useURLSection();

  return (
    <Page
      variant={EPageVariant.Fallback}
      header={section.name === 'Profile' || section.name === 'Study' ? EPageVariant.LMS : true}
      footer
    >
      <p>You have to be authenticated to access this page</p>
      <button onClick={() => authService.authenticate()}>Login</button>
    </Page>
  );
}
