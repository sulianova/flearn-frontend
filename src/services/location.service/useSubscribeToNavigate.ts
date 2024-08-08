import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import type LocationService from '.';

export default function useSubscribeToNavigate(this: LocationService) {
  const navigate = useNavigate();

  useEffect(() => {
    this.navigate = navigate;
  }, [navigate]);
}
