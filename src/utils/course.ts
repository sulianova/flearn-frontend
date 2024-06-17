import type { ICourseData, ICourseProductOption } from 'services/course.service';

export function getDiscountedPrice(courseBaseDiscount: ICourseData['discount'], productOption: ICourseProductOption) {
    const discount = productOption.discount ?? courseBaseDiscount;
    if (!discount || (discount.deadline && discount.deadline < new Date())) {
        return { creditWas: productOption.price, creditPrice: productOption.price, discount: null };
    }

    return {
        creditWas: productOption.price,
        creditPrice: Math.round(productOption.price * (100 - discount.amountPrc ) / 100),
        discount: discount.amountPrc,
    };
}
