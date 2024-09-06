

import { useURLSection } from 'hooks';
import { authService } from 'services';

import Page, { EPageVariant } from 'ui/Page/Page';

import classes from '../Fallback.module.scss';

export default function Unauthorized() {
  const section = useURLSection();

  return (
    <Page
      variant={section.name === 'Profile' || section.name === 'Study' ? EPageVariant.LMS : EPageVariant.WEB}
      header
      footer
    >
      <div className={classes._}>
        <p>You have to be authenticated to access this page</p>
        <button onClick={() => authService.authenticate()}>Login</button>
      </div>
    </Page>
  );
}
