import classNames from 'classnames/bind';

import Item from './Item/Item';
import classes from './SocialValidation.module.scss';

export default SocialValidation;

const cx = classNames.bind(classes);


function SocialValidation() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <h2 className={cx({ headerTitle: true })} >100+ учеников любят flearn</h2>
      </div>
      <div className={classes.list}>
          <Item/>
      </div>
    </div>
  );
}