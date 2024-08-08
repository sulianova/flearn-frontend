import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import Page, { EPageVariant } from 'ui/Page/Page';
import Spinner from 'ui/Spinner/Spinner';
import { getBrowserAgent } from 'utils';

import classes from './statis.module.scss';

export default function TikTokLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (getBrowserAgent() === 'TIKTOK') {
      return;
    }

    const prevPathname = (new URLSearchParams(location.search)).get('prevPathname');
    if (!prevPathname) {
      return;
    }

    navigate(prevPathname);
  }, [navigate, location.search]);

  return (
    <Page variant={EPageVariant.WEB} header footer>
      <div className={classes.center}>
        Авторизация из TikTok браузера не возможна. Пожалуйста откройте сайт через другой браузер.
      </div>
    </Page>
  );
}
