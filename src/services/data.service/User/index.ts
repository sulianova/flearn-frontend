import { firebaseService, TWhereProps } from 'services';

import { userConverter } from './userConverter';

import { ECollections, ECommonErrorTypes } from 'types';
import type { IUserData, IUserDataDB } from '../../user.service/types';

class User {
  public async get(id: string): Promise<IUserData> {
    const userDataDB = await firebaseService.getDoc(ECollections.User, id) as IUserDataDB | undefined;

    if (!userDataDB) {
      throw new Error(ECommonErrorTypes.FailedToFindData);
    }

   return userConverter.fromFirestore(userDataDB);
  }

  public async set(id: string, data: IUserData): Promise<IUserData> {
    const dataDB = userConverter.toFirestore(data);
    const newDataDB = await firebaseService.setDoc(ECollections.User, id, dataDB) as IUserDataDB;
    return userConverter.fromFirestore(newDataDB);
  }

  public async getAll(filter: { ids?: string[] }): Promise<IUserData[]> {
    const queryConstraints = [
      filter.ids && { param: 'id', value: filter.ids, operator: 'in' },
    ].filter(Boolean) as TWhereProps;

    const usersDataDB = (await firebaseService.getDocs(ECollections.User, queryConstraints))
      .map(d => d.data) as IUserDataDB[];
    return usersDataDB.map(userDataDB => userConverter.fromFirestore(userDataDB));
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

export default new User();