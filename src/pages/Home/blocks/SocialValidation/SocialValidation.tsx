import classNames from 'classnames/bind';
import { formatI18nT } from 'shared';

import Item from './Item/Item';
import classes from './SocialValidation.module.scss';

export default SocialValidation;

const cx = classNames.bind(classes);
const t = formatI18nT('socialValidation');

function SocialValidation() {
  return (
    <>
      <div data-bcalternate></div>
      <div className={classes.header}>
        <h2 className={cx({ header__title: true })}><span>{t('title1')}</span><span>{t('title2')}</span></h2>
      </div>
      <div className={classes.list}>
          <Item/>
      </div>
    </>
  );
}