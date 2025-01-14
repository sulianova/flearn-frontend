import classNames from 'classnames/bind';

import Item from './Item/Item';
import classes from './SocialValidation.module.scss';

export default SocialValidation;

const cx = classNames.bind(classes);


function SocialValidation() {
  return (
    <>
      <div className={cx({ section__title: true })} >100+ учеников любят flearn</div>
      <div className={classes.list}>
          <Item/>
      </div>
    </>
  );
}