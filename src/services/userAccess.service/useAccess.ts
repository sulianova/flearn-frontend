import { useBehaviourSubjectValue } from 'hooks';

import type UserAccessService from '.';

export default function useAccess(this: UserAccessService) {
  return useBehaviourSubjectValue(this._subscriptionBS)?.access ?? 'FREE';
}
