import { useBehaviourSubjectValue } from 'hooks';

import type UserService from '.';

export default function useAuthedUser(this: UserService) {
  return useBehaviourSubjectValue(this.authedUserBS);
}
