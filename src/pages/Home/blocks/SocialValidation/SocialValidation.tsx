import classNames from 'classnames/bind';

import Item from './Item/Item';
import classes from './SocialValidation.module.scss';

export default SocialValidation;

const cx = classNames.bind(classes);


function SocialValidation() {
  return (
    <>
      <div className={classes.header}>
        <h2 className={cx({ header__title: true })}>100+ человек учатся в flearn, и они очень довольны</h2>
      </div>
      <div className={classes.list}>
          <Item/>
      </div>
    </>
  );
}