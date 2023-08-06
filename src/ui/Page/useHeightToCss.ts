import { useEffect, useRef } from 'react';

export default function useHeightToCss() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(
    () => {
      if (ref.current) {
        const page = ref.current;
        const observer = new ResizeObserver(() => {
          const height = page.clientHeight;
          page.style.setProperty('--page-height', `${height}px`);
        });

        observer.observe(page);
        return () => observer.disconnect();
      }
    },
    []
  );

  return ref;
}
