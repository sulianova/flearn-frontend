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
      <div className={classes.title_subscription}>
        <div className={classes.star_14}> <Icon icon='Magic'/></div>
        FLEARN PRO
      </div>
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
            <Icon icon='Pro'/>
          </div>
          <div className={classes.list__item__text}>Доступ ко всем урокам</div>
        </div>
        <div className={classes.list__item}>
          <div className={classes.list__item__icon}>
            <Icon icon='Pro'/>
          </div>
          <div className={classes.list__item__text}>Брифы с обратной связью</div>
        </div>
        <div className={classes.list__item}>
          <div className={classes.list__item__icon}>
            <Icon icon='Pro'/>
          </div>
          <div className={classes.list__item__text}>Онлайн-наброски каждую неделю</div>
        </div>
      </div>
      <div className={classes.discountDescription}>
        <span>2 990 ₽ </span>
        <span>1 490 ₽ </span>
      </div>
      <GeneralPopup.Btn
        onClick={() => setBuyPopup(true)}
        className={GeneralPopup.Btn.classesWithCx.cx({ btn_special: true })}
      >
        Забрать скидку
      </GeneralPopup.Btn>
      <GeneralPopup.Btn
        onClick={() => setBuyPopup(true)}
        className={GeneralPopup.Btn.classesWithCx.cx({ btn_invisible: true })}
      >
        Подробнее
      </GeneralPopup.Btn>
    </GeneralPopup>
  );
}
