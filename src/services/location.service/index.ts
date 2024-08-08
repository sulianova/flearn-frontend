import { BehaviorSubject } from 'rxjs';
import { Location, NavigateFunction } from 'react-router';

import type { TURLSectionObj } from 'router';

import useSubscribeToLocation from './useSubscribeToLocation';
import useSubscribeToSection from './useSubscribeToSection';
import useSubscribeToNavigate from './useSubscribeToNavigate';

class LocationService {
  public navigate: NavigateFunction | null = null;
  public locationBS = new BehaviorSubject<Location | null>(null);
  public URLSectionBS = new BehaviorSubject<TURLSectionObj>({ name: 'Other', params: {} });

  public useSubscribeToLocation = useSubscribeToLocation;
  public useSubscribeToSection = useSubscribeToSection;
  public useSubscribeToNavigate = useSubscribeToNavigate;

  public get location() {
    return this.locationBS.getValue();
  }

  public get URLSection() {
    return this.URLSectionBS.getValue();
  }
}

export const locationService = new LocationService();
export default LocationService;
