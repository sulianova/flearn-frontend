import { i18n } from 'shared';
import Img from 'ui/Img/Img';
import Sofi from './SofiUlianova25.jpg'

import classes from './Header.module.scss';

export default function Header() {
  return (
    <div className={classes.__}>
      <div className={classes.inner}>
        <div className={classes.headerWrapper}>
          <h1 className={classes.headerTitle}>{i18n.t('catalogue.title')}</h1>
        </div>
        <div className={classes.descriptionWrapper }>
          <div className={classes.description + ' s-text-21'}>{i18n.t('catalogue.description')}</div>
        </div>
      </div>
    </div>
  );
}
