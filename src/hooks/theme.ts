import { useEffect } from 'react';

import { frontendSettingsService } from 'services/frontendSettings.service';

export function useTheme() {
  const { theme } = frontendSettingsService.useFrontendSettings();
  useEffect(() => {
    document.body.classList.add(theme);
    return () => document.body.classList.remove(theme);
  }, [theme]);
}
