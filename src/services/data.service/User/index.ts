import { firebaseService, TWhereProps } from 'services/firebase.service';

import { userConverter } from './userConverter';

import { ECommonErrorTypes } from 'types';
import type { IUserData, IUserDataDB } from '../../user.service/types';

class User {
  public async get(id: string): Promise<IUserData> {
    const userDataDB = await firebaseService.getDoc(firebaseService.Collections.User, id) as IUserDataDB | undefined;

    if (!userDataDB) {
      throw new Error(ECommonErrorTypes.FailedToFindData);
    }

   return userConverter.fromFirestore(userDataDB);
  }

  public async set(id: string, data: IUserData): Promise<IUserData> {
    const dataDB = userConverter.toFirestore(data);
    const newDataDB = await firebaseService.setDoc(firebaseService.Collections.User, id, dataDB) as IUserDataDB;
    return userConverter.fromFirestore(newDataDB);
  }

  public async getAll(filter: { ids?: string[] }): Promise<IUserData[]> {
    const queryConstraints = [
      filter.ids && { param: 'id', value: filter.ids, operator: 'in' },
    ].filter(Boolean) as TWhereProps;

    const usersDataDB = (await firebaseService.getDocs(firebaseService.Collections.User, queryConstraints))
      .map(d => d.data) as IUserDataDB[];
    return usersDataDB.map(userDataDB => userConverter.fromFirestore(userDataDB));
  }

  public async update(id: string, data: Partial<IUserData>) {
    try {
      const user = await this.get(id)
        .catch(() => { /* do nothing */ }) as IUserData | undefined;
      if (!user) {
        throw new Error(`User with id = ${id} is not created`);
      }
      const fullData: IUserData = {
        ...user,
        ...data,
      };
      return await this.set(id, fullData);
    } catch (error) {
      // tslint:disable-next-line
      console.error('Failed update user', { id, data, error });
      throw new Error('Failed update user');
    }
  }

  public async create(id: string, data: Omit<IUserData, 'firstSignInAt' | 'lastSignInAt'>) {
    try {
      const user = await this.get(id)
        .catch(() => { /* do nothing */ }) as IUserData | undefined;
      if (user) {
        throw new Error('User alredy exists');
      }

      const fullData: IUserData = {
        ...data,
        firstSignInAt: new Date(),
        lastSignInAt: new Date(),
      };

      return await this.set(id, fullData);
    } catch (error) {
      // tslint:disable-next-line
      console.error('Failed create user', { id, data, error });
      throw new Error('Failed create user');
    }
  }

  public async getOrCreate(id: string, data: Omit<IUserData, 'firstSignInAt' | 'lastSignInAt'>) {
    try {
      const user = await this.get(id)
        .catch(() => { /* do nothing */ }) as IUserData | undefined;
      if (user) {
        return user;
      }

      return await this.create(id, data);
    } catch (error) {
      // tslint:disable-next-line
      console.error('Failed to getOrCreate user', { id, data, error });
      throw new Error('Failed to getOrCreate user');
    }
  }
}

export default new User();