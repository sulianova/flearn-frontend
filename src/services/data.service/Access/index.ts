import { firebaseService } from 'services/firebase.service';
import { ECollections } from 'types';
import { TAccess, TAccessData } from './types';

export type { TAccess, TAccessData } from './types';

class Access {
  public async get(courseId: string, email: string) {
    try {
      return (await firebaseService.getDocOrThrow<TAccessData>(ECollections.Access, courseId))[email];
    } catch (err) {
      const error = err as Error;
      // tslint:disable-next-line
      console.error(error);
      throw new Error(`Failed to add Access: ${error.message}`);
    }
  }

  public async add(courseId: string, email: string, accessValue: boolean = true) {
    try {
      const access = await firebaseService.getDocOrThrow<TAccessData>(ECollections.Access, courseId);
      await firebaseService.setDoc(ECollections.Access, courseId, { ...access, [email]: accessValue });
    } catch (err) {
      const error = err as Error;
      // tslint:disable-next-line
      console.error(error);
      throw new Error(`Failed to add Access: ${error.message}`);
    }
  }
}

const access = new Access();
export default access;
