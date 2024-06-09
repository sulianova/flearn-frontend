import classes from './BuyPopup.module.scss';
import classnames from 'classnames/bind';

import Popup from 'ui/Popup/Popup';
import ModalCross from 'assets/images/Svg/ModalCross';
import { formatI18nT, i18n } from 'shared';

const cx = classnames.bind(classes);
const t = formatI18nT('courseLanding.form');

interface IProps {
  close: () => void
}

export default function BuyPopup({ close }: IProps) {
  return (
    <Popup>
      <div className={classes.__}>
        <div className={classes.close} onClick={close}>
          <ModalCross/>
        </div>
        <div className={classes.body}>
          <div className={classes.header}>
            <div className={classes.stepWidget}>
              <div className={cx({ stepWidgetItem: true, stepWidgetItemDesk: true, active: true })  + ' s-text-16'}>о курсе</div>
              <div className={cx({ stepWidgetItem: true, stepWidgetItemDesk: true, active: false })  + ' s-text-16'}>способы оплаты</div>
              <div className={cx({ stepWidgetItem: true, stepWidgetItemDesk: true, active: false })  + ' s-text-16'}>подтверждение</div>
              <div className={cx({ stepWidgetItem: true, stepWidgetItemMob: true, active: true })  + ' s-text-16'}>1</div>
              <div className={cx({ stepWidgetItem: true, stepWidgetItemMob: true, active: false })  + ' s-text-16'}>2</div>
              <div className={cx({ stepWidgetItem: true, stepWidgetItemMob: true, active: false })  + ' s-text-16'}>3</div>
            </div>
          </div>
          <div className={classes.headerTitle}>
        <h2 className={' s-text-36'}>Выберите, что больше подходит</h2>
      </div>
      <div className={classes.commonFlowRow}>
        <div className={classes.wrapper} id='decision-form'>
          <div className={classes.block}>
            <div className={classes.titleWrapper}>
              <h2 className={classes.courseName + ' s-text-16'}>самостоятельно</h2>
              <h1 className={classes.title + ' s-text-24'}>{t(`title1.course`)}</h1>
            </div>
            <div className={classes.credit}>
              <s className={classes.creditWas + ' s-text-24'}>3000 &#8381;</s>
              <div className={classes.creditPrice}>
                1000 &#8381;
                <span className={classes.discount + ' s-text-18'}>-30%</span>
              </div>
            </div>
            <button className={classes.btn + ' s-text-21'}>Перейти к оплате</button>
          </div>
          <div className={cx({ block: true, blockDetails: true })}>
            <div className={classes.buble + ' s-text-21'}>самый популярный</div>
            <div className={classes.titleWrapper}>
              <h2 className={classes.courseName + ' s-text-16'}>с обратной связью</h2>
              <h1 className={classes.title + ' s-text-24'}>{t(`title2.course`)}</h1>
            </div>
            <div className={classes.credit}>
              <s className={classes.creditWas + ' s-text-24'}>3000 &#8381;</s>
              <div className={classes.creditPrice}>
                1000 &#8381;
                <span className={classes.discount + ' s-text-18'}>-30%</span>
              </div>
            </div>
            <button className={classes.btn + ' s-text-21'}>Перейти к оплате</button>
          </div>
          <div className={classes.block}>
            <div className={classes.titleWrapper}>
              <h2 className={classes.courseName + ' s-text-16'}>расширенный</h2>
              <h1 className={classes.title + ' s-text-24'}>{t(`title3.course`)}</h1>
            </div>
            <div className={classes.credit}>
              <s className={classes.creditWas + ' s-text-24'}>3000 &#8381;</s>
              <div className={classes.creditPrice}>
                1000 &#8381;
                <span className={classes.discount + ' s-text-18'}>-30%</span>
              </div>
            </div>
            <button  className={classes.btn + ' s-text-21'}>Перейти к оплате</button>
          </div>
        </div>
      </div>
        </div>
      </div>
    </Popup>
  );
}
