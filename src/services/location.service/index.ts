import { BehaviorSubject } from 'rxjs';

import type { TURLSectionObj } from 'router';

import useSubscribeToLocation from './useSubscribeToLocation';

class LocationService {
  public URLSectionBS = new BehaviorSubject<TURLSectionObj>({ name: 'Other', params: {} });
  public useSubscribeToLocation = useSubscribeToLocation;
  public get URLSection() {
    return this.URLSectionBS.getValue();
  }
}

export const locationService = new LocationService();
export default LocationService;
