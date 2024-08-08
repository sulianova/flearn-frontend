import { useEffect } from 'react';
import { useLocation } from 'react-router';

import type LocationService from '.';

export default function useSubscribeToLocation(this: LocationService) {
  const location = useLocation();

  useEffect(() => {
    this.locationBS.next(location);
  }, [location]);
}
