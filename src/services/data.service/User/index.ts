import { authService, firebaseService } from 'services';

import { userConverter } from './userConverter';

import { ECollections } from 'types';
import type { IUserData } from 'types';

class User {
  public async get(email: string) {
    return await firebaseService.getDoc(ECollections.User, email, userConverter);
  }

  public async set(email: string, data: IUserData) {
    return await firebaseService.setDoc(ECollections.User, email, data, userConverter);
  }

  public async create(email: string, data: Omit<IUserData, 'firstSignInAt' | 'lastSignInAt'>) {
    const alreadyHas = Boolean(await this.get(email));
    if (alreadyHas) {
      throw new Error('Faild to create new user: email already taken');
    }
    const fullData: IUserData = {
      ...data,
      firstSignInAt: new Date(),
      lastSignInAt: new Date(),
    };

    return await this.set(email, fullData);
  }

  public async getOrCreate(email: string, data: Omit<IUserData, 'firstSignInAt' | 'lastSignInAt'>) {
    const user = await this.get(email);
    if (user) {
      return user;
    }

    return await this.create(email, data);
  }
}

export default User;