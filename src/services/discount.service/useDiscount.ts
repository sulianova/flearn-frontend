import { useBehaviourSubjectValue } from 'hooks';

import type DiscountService from '.';

export default function useDiscount(this: DiscountService) {
  return useBehaviourSubjectValue(this.discountBS)
}
