import { BehaviorSubject } from "rxjs";

import { dataService } from "services";
import { IDiscount } from "services/data.service/Discount/types";
import { userService } from "services/user.service";
import { MS_PER_MINUTE } from "utils";

import useDiscount from "./useDiscount";
import useShowBanner from "./useShowBanner";

class DiscountService {
  protected discountBS = new BehaviorSubject<IDiscount | null>(null);
  protected showBannerBS = new BehaviorSubject<boolean>(false);

  public useDiscount = useDiscount;
  public useShowBanner = useShowBanner;

  public async get(email: string) {
    return dataService.discount.get(email);
  }

  public async add(data: Pick<IDiscount, "type" | "email" | "product" | "discountPRC" | "minutes" | "startDate">) {
    await dataService.discount.add(data);
    this.discountBS.next(await dataService.discount.get(data.email));
    this.showBannerBS.next(true);
  }

  public hideBanner(email: string) {
    this.showBannerBS.next(false);

    const checkAndShow = async () => {
      const user = userService.authedUser;
      if (!user) {
        return;
      }

      const discount = await this.get(email);
      this.discountBS.next(discount);
      if (discount) {
        this.showBannerBS.next(true);
      }
    }

    setTimeout(checkAndShow, MS_PER_MINUTE * 30);
  }
}

export const discountService = new DiscountService();
export default DiscountService;
