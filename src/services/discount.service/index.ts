import { BehaviorSubject, merge } from "rxjs";

import { authService, dataService } from "services";
import { IDiscount } from "services/data.service/Discount/types";
import { userService } from "services/user.service";
import { MS_PER_MINUTE } from "utils";

import useDiscount from "./useDiscount";
import useShowBanner from "./useShowBanner";

const PROMO_POPUP_HIDE_MS = 10_000;

class DiscountService {
  protected discountBS = new BehaviorSubject<IDiscount | null>(null);
  protected showBannerBS = new BehaviorSubject<boolean>(false);

  public useDiscount = useDiscount;
  public useShowBanner = useShowBanner;

  constructor() {
    this.init();
  }

  public async get(email: string) {
    return dataService.discount.get(email);
  }

  public async add(data: Pick<IDiscount, "type" | "email" | "product" | "discountPRC" | "minutes" | "startDate">) {
    await dataService.discount.add(data);
    this.discountBS.next(await dataService.discount.get(data.email));
    this.showBannerBS.next(true);
  }

  public async addMe() {
    this.add({
        type: 'personal',
        email: 'vfyodorov@nes.ru',
        product: 'subscription',
        startDate: new Date(),
        minutes: 30,
        discountPRC: 10,
    });
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

    setTimeout(checkAndShow, PROMO_POPUP_HIDE_MS);
  }

  private init() {
    const refetch = async () => {
      const authedUser = authService.user;
      if (!authedUser) {
        this.showBannerBS.next(false);
        this.discountBS.next(null);
        return;
      }
      const discount = await this.get(authedUser.email);
      if (!discount || discount.endDate < new Date()) {
        this.showBannerBS.next(false);
        this.discountBS.next(null);
        return;
      }

      this.discountBS.next(discount);
      this.showBannerBS.next(true);
    };

    merge(
      authService.firebaseUserBS,
    ).subscribe(refetch);
  }
}

export const discountService = new DiscountService();
(window as any).discountService = discountService;
export default DiscountService;
