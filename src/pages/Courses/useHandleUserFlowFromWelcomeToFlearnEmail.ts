import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { URLSections } from 'router';
import { authService } from 'services';
import { locationService } from 'services/location.service';


export default function useHandleUserFlowFromWelcomeToFlearnEmail() {
  const [params, setParams] = useSearchParams();

  const isFromWelcomeToFlearnEmail = params.get('from') === 'WelcomeToFlearnEmail';
  useEffect(() => {
    if (!isFromWelcomeToFlearnEmail) {
      return;
    }

    authService.awaitPersistenceAuthIfItExists()
      .then(() => authService.authenticate())
      .then(() => locationService.navigate?.(URLSections.EmptyProfile.to()))
      .catch(() => setParams(p => (p.delete('from'), p)));
  }, [isFromWelcomeToFlearnEmail]);
}
