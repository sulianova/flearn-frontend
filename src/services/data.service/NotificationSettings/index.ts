import { documentId } from 'firebase/firestore';

import { firebaseService } from 'services/firebase.service';

import type { INotificationSettings } from './types';

export * from './types';

class NotificationSettings {
  public async get(email: string) {
    try {
      return await firebaseService.getDoc<INotificationSettings>(firebaseService.Collections.NotificationSettings, email) ?? {};
    } catch (error) {
      console.log('Failed to get notification settings', { email, error });
      throw error;
    }
  }

  public async getAll(emails: string[]) {
    try {
      return await firebaseService.getDocsByIds<INotificationSettings>(firebaseService.Collections.NotificationSettings, emails) ?? {};
    } catch (error) {
      console.log('Failed to get all notification settings', { emails, error });
      throw error;
    }
  }

  public async patch(email: string, patch: Partial<INotificationSettings>) {
    try {
      const prev = await this.get(email); 
      await firebaseService.setDoc<INotificationSettings>(firebaseService.Collections.NotificationSettings, email, { ...prev, ...patch });
    } catch (error) {
      console.log('Failed to patch notification settings', { email, error });
      throw error;
    }
  }
}

const notificationSettings = new NotificationSettings();
export default notificationSettings;

