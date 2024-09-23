import type { IDiscount } from "services/data.service/Discount/types";
import { SUBSCRIPTION_PRICE_PER_MONTH_RUB } from "data";

export function getDiscount(discount: IDiscount | null, option: 'BASE' | 'OPTIMAL' | "EXTENDED") {
  if (option !== 'OPTIMAL' || !discount || !discount.discountPRC || discount.endDate < new Date()) {
    return {
      creditWas: SUBSCRIPTION_PRICE_PER_MONTH_RUB,
      creditPrice: SUBSCRIPTION_PRICE_PER_MONTH_RUB,
      discount: null
    };
  }

  return {
    creditWas: SUBSCRIPTION_PRICE_PER_MONTH_RUB,
    creditPrice: Math.round(SUBSCRIPTION_PRICE_PER_MONTH_RUB * (100 - discount.discountPRC ) / 100),
    discount: discount.discountPRC,
  };
}
