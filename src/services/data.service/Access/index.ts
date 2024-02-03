import { firebaseService } from 'services/firebase.service';
import { ECollections } from 'types';
import { IAccessData } from './types';

export type { IAccessData } from './types';

class Access {
  public async add(courseId: string, email: string) {
    try {
      const access = await firebaseService.getDocOrThrow<IAccessData>(ECollections.Access, courseId);
      await firebaseService.setDoc(ECollections.Access, courseId, { ...access, users: { ...access.users, [email]: true } });
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
