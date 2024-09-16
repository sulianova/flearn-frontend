import Page, { EPageVariant } from 'ui/Page/Page';

import Header from './Header/Header';
import Catalogue from './Catalogue/Catalogue';

import classes from './Profile.module.scss';

export default function Profile() {
  return (
    <Page 
      variant={EPageVariant.LMS}
      header
      footer
      backgroundColor='var(--color-background-alternate)'
    >
      <div className={classes.profilePage}>
        <div className={classes.profilePageContent}>
          <div className={classes.main}>
            <Header/>
            <Catalogue/>
          </div>
          {/* <aside className={classes.asideWrapper}></aside> */}
        </div>
      </div>
    </Page>
  );
}

