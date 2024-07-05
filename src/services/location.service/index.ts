import { BehaviorSubject } from 'rxjs';
import { NavigateFunction } from 'react-router';

import type { TURLSectionObj } from 'router';

import useSubscribeToLocation from './useSubscribeToLocation';
import useSubscribeToNavigate from './useSubscribeToNavigate';

class LocationService {
  public navigate: NavigateFunction | null = null;
  public URLSectionBS = new BehaviorSubject<TURLSectionObj>({ name: 'Other', params: {} });

  public useSubscribeToLocation = useSubscribeToLocation;
  public useSubscribeToNavigate = useSubscribeToNavigate;

  public get URLSection() {
    return this.URLSectionBS.getValue();
  }
}

export const locationService = new LocationService();
export default LocationService;
