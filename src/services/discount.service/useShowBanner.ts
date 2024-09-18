import { useBehaviourSubjectValue } from 'hooks';

import type DiscountService from '.';

export default function useShowBanner(this: DiscountService) {
  return useBehaviourSubjectValue(this.showBannerBS)
}
