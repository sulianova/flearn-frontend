import { useBehaviourSubjectValue } from 'hooks';

import FrontendSettingsService from '.';

export default function useFrontendSettings(this: FrontendSettingsService) {
  return useBehaviourSubjectValue(this.bs);
}
