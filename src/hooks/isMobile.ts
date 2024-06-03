import { useEffect, useState } from 'react';

const IS_MOBILE_VIEWPORT_WIDTH_THRESHOLD_PX = 767.98;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < IS_MOBILE_VIEWPORT_WIDTH_THRESHOLD_PX);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}
