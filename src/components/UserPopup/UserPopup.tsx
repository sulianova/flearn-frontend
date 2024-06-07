import classnames from 'classnames/bind';
import classes from './UserPopup.module.scss';
import Portfolio from 'assets/images/Svg/Portfolio';

const cx = classnames.bind(classes);


 export default function UserPopup() {
  return (
    <>
      {/* <div className={classes.overlay}></div> */}
      <div className={cx({ popup: true, animated: true, inverseAnimated: true, open: false })}>
        <div className={classes.itemsGroup}>
         <div className={classes.item}>
          <div className={classes.itemTitle + ' s-text-16'}>София Ульянова</div>
          <div className={classes.itemSubtitle + ' s-text-14'}>ulianova.sofia@gmail.com</div>
          </div>
        </div>
        <div className={classes.itemsGroup}>
          <div className={cx({ item: true, itemHoverable: true })}>
            <div className={classes.itemTitle + ' s-text-16'}>
              <div className={classes.withIcon}>
                <Portfolio/>
                <span>Анкета</span>
              </div>
            </div>
          </div>
          <div className={cx({ item: true, itemHoverable: true }) + ' s-text-16'}>
            <div className={classes.itemTitle}>Выйти из профиля</div>
          </div>
        </div>
      </div>
    </>
  );
}

