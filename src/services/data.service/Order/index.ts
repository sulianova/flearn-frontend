import type { ICourseData } from 'services/course.service';
import { firebaseService } from 'services/firebase.service';
import type { IUserData } from 'services/user.service';

import { ECollections, IOrderData, IOrderDataDB } from 'types';
import { orderConverter } from './orderConverter';

class Order {
  public async create(props: {
    userFromForm: IOrderData['userFromForm'],
    courseData: ICourseData,
    userData: IUserData | undefined,
  }) {
    try {
      const { userFromForm, courseData, userData } = props;
      const id = this.getId(courseData.id, userFromForm.email);

      const orderAlreadyExists = await firebaseService.docExists(ECollections.Order, id);
      if (orderAlreadyExists) {
        throw new Error('Cannot create duplicated order');
      }

      const { discontAmount, discontDeadline, creditPrice, creditWas } = courseData;
  
      const data: IOrderData = {
        status: 'created',
        userFromForm,
        currentAuthedUser: userData ?? null,
        course: {
          id: courseData.id,
          dataSnapshot: {
            discontAmount,
            discontDeadline,
            creditPrice,
            creditWas,
          },
        },
        meta: {
          createdAt: new Date(),
        },
      };

      await firebaseService.setDoc(ECollections.Order, id, orderConverter.toFirestore(data));
      return { id };
    } catch (err) {
      const error = err as Error;
      // tslint:disable-next-line
      console.error(error);
      throw new Error(`Failed to create Order: ${error.message}`);
    }
  }

  public async set(courseId: string, email: string, patch: Partial<IOrderData>) {
    try {
      const id = this.getId(courseId, email);
      const orderDB = await firebaseService.getDocOrThrow<IOrderDataDB>(ECollections.Order, id);
      const order = orderConverter.fromFirestore(orderDB);
      await firebaseService.setDoc(ECollections.Order, id, orderConverter.toFirestore({ ...order, ...patch }));
    } catch (err) {
      const error = err as Error;
      // tslint:disable-next-line
      console.error(error);
      throw new Error(`Failed to set Order: ${error.message}`);
    }
  }

  public async exists(courseId: string, email: string) {
    const id = this.getId(courseId, email);
    return await firebaseService.docExists(ECollections.Order, id);
  }

  private getId(courseId: string, email: string) {
    return `${courseId}_${email}`;
  }
}

const order = new Order();
export default order;
