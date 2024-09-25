import { discountService } from "services/discount.service";
import { userService } from "services/user.service";

import Icon from "ui/Icon/Icon";

import GeneralPopup from "ui/GeneralPopup/GeneralPopup";
import classes from './PromoPopup.module.scss';
import { useCountdown } from "hooks";
import { useState } from "react";
import BuyPopup from "components/BuyPopup/BuyPopup";

export default function PromoPopup() {
  const authedUser = userService.useAuthedUser();
  const discount = discountService.useDiscount();
  const show = discountService.useShowBanner();
  const cd = useCountdown(discount?.endDate ?? null);
  const [buyPopup, setBuyPopup] = useState(false);

  if (!authedUser || !show || !discount || +discount.endDate < Date.now()) {
    return null;
  }

  if (buyPopup) {
    return (
      <BuyPopup
        close={() => setBuyPopup(false)}
        user={authedUser}
      />
    );
  }

  return (
    <GeneralPopup
      containerClassname={classes.popup}
      close={() => discountService.hideBanner()}
    >
      <div className={classes.title_subscription}>FLEARN PRO</div>
      <div className={classes.title_discount}>{`-${Math.floor(discount.discountPRC)}%`}</div>
      <div className={classes.timer}>
        <div className={classes.timer__item}>{cd.days}</div>
        <div className={classes.timer__item}>{cd.hours}</div>
        <div className={classes.timer__item}>{cd.minutes}</div>
        <div className={classes.timer__item}>{cd.seconds}</div>
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
        onClick={() => setBuyPopup(true)}
        // className={GeneralPopup.Btn.classesWithCx.btn_secondary}
        className={GeneralPopup.Btn.classesWithCx.cx({ btn_special: true })}
      >
        Купить
      </GeneralPopup.Btn>
      <GeneralPopup.Btn
        onClick={() => setBuyPopup(true)}
        // className={GeneralPopup.Btn.classesWithCx.btn_secondary}
        className={GeneralPopup.Btn.classesWithCx.cx({ btn_invisible: true })}
      >
        Подробнее
      </GeneralPopup.Btn>
    </GeneralPopup>
  );
}
