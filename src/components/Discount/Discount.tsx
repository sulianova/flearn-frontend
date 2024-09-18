import { discountService } from "services/discount.service";
import { userService } from "services/user.service";

import Popup from "ui/Popup/Popup";

export default function Discount() {
  const authedUser = userService.useAuthedUser();
  const discount = discountService.useDiscount();
  const show = discountService.useShowBanner();

  console.log('Discount', { authedUser, discount, show });

  if (!authedUser || !show || !discount || +discount.endDate < Date.now()) {
    return null;
  }

  return (
    <Popup
      close={() => discountService.hideBanner(authedUser.email)}
    >
      {(startClosingProcess: () => void) => `Discount: ${discount.endDate}`}
    </Popup>
  );
}
