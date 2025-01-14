import Page, { EPageVariant } from 'ui/Page/Page';

import Header from './Header/Header';
import Catalogue from './Catalogue/Catalogue';
import Resources from './Resources/Resources';

import classes from './Profile.module.scss';

export default function Profile() {
  const blocks: JSX.Element[] = [
    <Header/>,
    <Resources/>,
    <Catalogue/>,
  ].filter(c => c !== undefined);

  return (
    <Page 
      variant={EPageVariant.LMS}
      header
      footer={true}
      backgroundColor='var(--color-background-alternate)'
    >
      <div className={classes.profilePage}>
        <div className={classes.profilePage__content}>
              {blocks.map((block, index) => (
                <div key={index} className={classes.section}>
                  {block}
                </div>
              ))}
        </div>
      </div>
    </Page>
  );
}

