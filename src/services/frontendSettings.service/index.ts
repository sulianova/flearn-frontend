import { isEqual } from 'lodash';
import { BehaviorSubject } from 'rxjs';

import { ECollections } from 'types';

import { authService } from 'services';
import { firebaseService } from 'services/firebase.service';
import { localStorageService } from 'services/localStorage.service';

import type { IFrontendSettings, IFrontendSettingsBD } from './types';
import useFrontendSettings from './useFrontendSettings';

class FrontendSettingsService {
  public useFrontendSettings = useFrontendSettings;
  constructor() {
    authService.firebaseUserBS
      .subscribe(user => {
        if (!user) {
          const savedSettings = localStorageService.get<IFrontendSettings>(this.lsKey, { parse: true });
          this.bs.next(savedSettings ?? this.defaultFrontendSettings);
        } else {
          this.fetch();
        }
      });
  }

  public get settings() {
    return this.bs.getValue();
  }

  public async update(patch: IFrontendSettings) {
    try {
      const settings = this.settings;
      const newSettigs = { ...settings, ...patch };
      if (isEqual(settings, newSettigs)) {
        return;
      }

      const authedUser = authService.user;
      if (authedUser) {
        await firebaseService.setDoc(ECollections.FrontendSettings, authedUser.email, newSettigs);
      }

      localStorageService.set(this.lsKey, newSettigs);
      this.bs.next(newSettigs);
    } catch (error) {
      console.log('Failed to update frontend settings', { error, patch });
      throw error;
    }
  }

  protected async fetch() {
    try {
      const authedUser = authService.user;
      if (!authedUser) {
        throw new Error('Not authenticated');
      }

      const settigsDB = await firebaseService.getDoc<IFrontendSettingsBD>(ECollections.FrontendSettings, authedUser.email) ?? {};
      const settigs: IFrontendSettings = {
        ...this.defaultFrontendSettings,
        ...settigsDB,
      };

      localStorageService.set<IFrontendSettings>(this.lsKey, settigs);
      this.bs.next(settigs);
    } catch (error) {
      console.log('Failed to fetch frontend settigs');
      throw error;
    }
  }

  protected lsKey = 'frontend_settings';
  protected defaultFrontendSettings: IFrontendSettings = { theme: 'light' };
  protected bs = new BehaviorSubject<IFrontendSettings>(localStorageService.get<IFrontendSettings>(this.lsKey, { parse: true }) ?? this.defaultFrontendSettings);
}

export const frontendSettingsService = new FrontendSettingsService();
export default FrontendSettingsService;
(window as any).frontendSettingsService = frontendSettingsService;
