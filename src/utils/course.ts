import type { ICourseData, ICourseProductOption } from 'services/course.service';

export function getDiscountedPrice(courseBaseDiscount: ICourseData['discount'], productOption: ICourseProductOption) {
  const discount = productOption.discount ?? courseBaseDiscount;
  if (!discount || !discount.amountPrc || (discount.deadline && discount.deadline < new Date())) {
    return { creditWas: productOption.price, creditPrice: productOption.price, discount: null };
  }

  return {
    creditWas: productOption.price,
    creditPrice: Math.round(productOption.price * (100 - discount.amountPrc ) / 100),
    discount: discount.amountPrc,
  };
}

export function getCourseBaseDiscountAmountPrc(discount: ICourseData['discount']) {
  if (!discount || !discount.amountPrc || (discount.deadline && discount.deadline < new Date())) {
    return null;
  }

  return discount.amountPrc;
}

export function formatCourseCredit(credit: number) {
  const thousands = String(credit).slice(0, -3);
  const theReast = String(credit).slice(-3);
  return `${thousands} ${theReast}`;
}

export function formatCourseDiscount(discontAmount: number) {
  return `-${discontAmount}%`;
}
