import { discountService } from "services/discount.service";
import { userService } from "services/user.service";

import Icon from "ui/Icon/Icon";

import GeneralPopup from "ui/GeneralPopup/GeneralPopup";
import classes from './PromoPopup.module.scss';

export default function PromoPopup() {
  const authedUser = userService.useAuthedUser();
  const discount = discountService.useDiscount();
  const show = discountService.useShowBanner();

  console.log('Discount', { authedUser, discount, show });

  if (!authedUser || !show || !discount || +discount.endDate < Date.now()) {
    return null;
  }

  return (
    <GeneralPopup
      close={() => {}}
      containerClassname={classes.popup}
      // close={() => discountService.hideBanner(authedUser.email)}
    >
      <div className={classes.title_subscription}>FLEARN PRO</div>
      <div className={classes.title_discount}>-50%</div>
      <div className={classes.timer}>
        <div className={classes.timer__item}>1</div>
        <div className={classes.timer__item}>10</div>
        <div className={classes.timer__item}>10</div>
        <div className={classes.timer__item}>10</div>
      </div>
      <div className={classes.list}>
        <div className={classes.list__item}>
          <div className={classes.list__item__icon}>
            <Icon icon='Checkmark'/>
          </div>
          <div className={classes.list__item__text}>Доступ ко всем урокам</div>
        </div>
        <div className={classes.list__item}>
          <div className={classes.list__item__icon}>
            <Icon icon='Checkmark'/>
          </div>
          <div className={classes.list__item__text}>Индивидуальная обратная связь</div>
        </div>
        <div className={classes.list__item}>
          <div className={classes.list__item__icon}>
            <Icon icon='Checkmark'/>
          </div>
          <div className={classes.list__item__text}>Телеграм-чат студентов</div>
        </div>
      </div>
      <GeneralPopup.Btn
        // className={GeneralPopup.Btn.classesWithCx.btn_secondary}
        className={GeneralPopup.Btn.classesWithCx.cx({ btn_special: true })}
      >
        Купить
      </GeneralPopup.Btn>
      <GeneralPopup.Btn
        // className={GeneralPopup.Btn.classesWithCx.btn_secondary}
        className={GeneralPopup.Btn.classesWithCx.cx({ btn_invisible: true })}
      >
        Подробнее
      </GeneralPopup.Btn>
    </GeneralPopup>
  );
}
