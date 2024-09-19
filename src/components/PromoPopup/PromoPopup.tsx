import { discountService } from "services/discount.service";
import { userService } from "services/user.service";

import GeneralPopup from "ui/GeneralPopup/GeneralPopup";

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
      style={{ backgroundColor: 'var(--color-accent-promo-background)'}}
      // close={() => discountService.hideBanner(authedUser.email)}
    >
      <GeneralPopup.Btn
        // className={GeneralPopup.Btn.classesWithCx.btn_secondary}
        className={GeneralPopup.Btn.classesWithCx.cx({ btn_secondary: true })}
      >
        Button
      </GeneralPopup.Btn>
    </GeneralPopup>
  );
}
