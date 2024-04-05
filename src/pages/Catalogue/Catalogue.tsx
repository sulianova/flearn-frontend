import Page, { EFooter } from 'ui/Page/Page';

import List from './List/List';

import classes from './Catalogue.module.scss';
import { i18n } from 'shared';

export default Catalogue;

function Catalogue() {
  return (
    <Page header footer={EFooter.Big} wrapper='Catalogue'>
      <div className={classes.headerWrapper}>
          <h1 className={classes.headerTitle }>{i18n.t('catalogue.title')}</h1>
      </div>
      <div className={classes.descriptionWrapper }>
        <div className={classes.description + ' s-text-24'}>{i18n.t('catalogue.description')}</div>
      </div>
      <List></List>
    </Page>
  );
}


