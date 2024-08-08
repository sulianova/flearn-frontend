import { firebaseService } from 'services/firebase.service';
import type { TAccess, TAccessData } from 'services/userAccess.service/types';

class Access {
  public async get(courseId: string, email: string) {
    try {
      return (await firebaseService.getDocOrThrow<TAccessData>(firebaseService.Collections.Access, courseId))[email];
    } catch (err) {
      const error = err as Error;
      // tslint:disable-next-line
      console.error(error);
      throw new Error(`Failed to add Access: ${error.message}`);
    }
  }

  public async add(courseId: string, email: string, accessValue: TAccess) {
    try {
      const access = await firebaseService.getDocOrThrow<TAccessData>(firebaseService.Collections.Access, courseId);
      await firebaseService.setDoc<TAccessData>(firebaseService.Collections.Access, courseId, { ...access, [email]: accessValue });
    } catch (err) {
      const error = err as Error;
      // tslint:disable-next-line
      console.error(error);
      throw new Error(`Failed to add Access: ${error.message}`);
    }
  }

  public async getAll(props: { email: string }) {
    try {
      return await firebaseService.getDocs<TAccessData>(firebaseService.Collections.Access, [{ param: props.email, value: ['FREE', 'BASE', 'OPTIMAL', 'EXTENDED' ], operator: 'in' }]);
    } catch (error) {
      console.log('Failed to getAll accesses', { props, error });
      throw error;
    }
  }
}

const access = new Access();
export default access;
