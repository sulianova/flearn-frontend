import Page, { EPageVariant } from 'ui/Page/Page';

import Header from './Header/Header';
import Catalogue from './Catalogue/Catalogue';

import classes from './Profile.module.scss';

export default function Profile() {
  const blocks: JSX.Element[] = [
    <Header/>,
    <Catalogue/>
  ].filter(c => c !== undefined);

  return (
    <Page 
      variant={EPageVariant.LMS}
      header
      footer
      backgroundColor='var(--color-background-alternate)'
    >
      <div className={classes.page}>
        <div className={classes.page__content}>
          <div className={classes.main}>
              {blocks.map((block, index) => (
                <div key={index} className={classes.section}>
                  {block}
                </div>
              ))}
          </div>
          <aside className={classes.asideWrapper}></aside>
        </div>
      </div>
    </Page>
  );
}

