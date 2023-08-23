import { firebaseService } from 'services';

import { userConverter } from './userConverter';

import { ECollections } from 'types';
import type { IUserData } from 'types';

class User {
  public async get(id: string) {
    return await firebaseService.getDoc(ECollections.User, id, userConverter);
  }

  public async set(id: string, data: IUserData) {
    return await firebaseService.setDoc(ECollections.User, id, data, userConverter);
  }

  public async update(id: string, data: Partial<IUserData>) {
    const user = await this.get(id) as IUserData | undefined;
    if (!user) {
      throw new Error(`Cannot update user: user with id = ${id} is not created`);
    }
    const fullData: IUserData = {
      ...user,
      ...data,
    };
    return await this.set(id, fullData);
  }

  public async create(id: string, data: Omit<IUserData, 'firstSignInAt' | 'lastSignInAt'>) {
    const alreadyHas = Boolean(await this.get(id));
    if (alreadyHas) {
      throw new Error('Failed to create new user: id already taken');
    }
    const fullData: IUserData = {
      ...data,
      firstSignInAt: new Date(),
      lastSignInAt: new Date(),
    };

    return await this.set(id, fullData);
  }

  public async getOrCreate(id: string, data: Omit<IUserData, 'firstSignInAt' | 'lastSignInAt'>) {
    const user = await this.get(id);
    if (user) {
      return user;
    }

    return await this.create(id, data);
  }
}

export default User;