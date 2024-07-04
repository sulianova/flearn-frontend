import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import Page, { EPageVariant } from 'ui/Page/Page';
import Spinner from 'ui/Spinner/Spinner';

import classes from './statis.module.scss';
import { dataService } from 'services';

type TState =
  | { type: 'pending' }
  | { type: 'success' }
  | { type: 'error', error: string };

export default function Unsubscribe() {
  const location = useLocation();
  const [state, setState] = useState<TState>({ type: 'pending' });

  useEffect(() => {
    const email = (new URLSearchParams(location.search)).get('email');
    if (!email) {
      setState({ type: 'error', error: 'No email' });
      return;
    }
    dataService.notificationSettings.patch(email, { email: false })
      .then(() => setState({ type: 'success' }))
      .catch(error => {
        console.log('Failed to unsubscribe', { email, error });
        setState({ type: 'error', error: String(error) });
      });
  }, [location.search]);

  return (
    <Page variant={EPageVariant.WEB} header footer>
      <div className={classes.center}>
        {state.type === 'pending' && (
          <>
            <div>Unsubscribe process</div>
            <Spinner variant='global'/>
          </>
        )}
        {state.type === 'success' && (
          <div>Unsubscribed</div>
        )}
        {state.type === 'error' && (
          <>
            <div>Error</div>
            <div>{state.error}</div>
          </>
        )}
      </div>
    </Page>
  );
}
