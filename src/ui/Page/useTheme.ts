import { useEffect } from 'react';
import { frontendSettingsService } from 'services/frontendSettings.service';

const colors = [
  '--color-accent-error',
  '--color-accent-error-light',
  '--color-accent-error',
  '--color-accent-notice',
  '--color-accent-success',
  '--color-accent-warning',
  '--color-accent-promo',
  '--color-accent-promo-hover',
  '--color-accent-neutral',
  '--color-accent-neutral-hover',
  '--color-background-alternate',
  '--color-background-default',
  '--color-background-glassy-a',
  '--color-background-glassy-b',
  '--color-background-glassy-c',
  '--color-background-glassy-d',
  '--color-background-glassy-inverted-a',
  '--color-background-glassy-inverted-b',
  '--color-background-glassy-inverted-c',
  '--color-background-glassy-inverted-d',
  '--color-background-highlighted',
  '--color-background-overlay',
  '--color-background-active',
  '--color-background-stroke',
  '--border-color',
  '--color-content-inverted-primary',
  '--color-content-inverted-secondary',
  '--color-content-primary',
  '--color-content-secondary',
  '--color-content-tertiary',
  '--color-content-background-primary',
  '--color-content-background-secondary',
  '--color-content-paragraph-primary',
  '--color-content-paragraph-secondary',
  '--color-background-btn',
  '--color-background-btn-hover',
];

export default function useTheme() {
  const { theme } = frontendSettingsService.useFrontendSettings();
  useEffect(() => {
    colors.forEach(color =>
      document.body.style.setProperty(color, `var(${color}-${theme})`)
    );
  }, [theme]);
}
