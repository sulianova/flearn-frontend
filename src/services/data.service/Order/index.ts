import type { ICourseData } from 'services/course.service';
import { firebaseService } from 'services/firebase.service';
import type { IUserData } from 'services/user.service';

import { IOrderData, IOrderDataDB } from 'types';
import { orderConverter } from './orderConverter';

class Order {
  public async create(props: {
    userFromForm: IOrderData['userFromForm'],
    chosenProductOptionType: keyof ICourseData['productOptions']
    courseData: ICourseData,
    userData: IUserData | undefined,
  }) {
    try {
      const { userFromForm, chosenProductOptionType, courseData, userData } = props;
      const id = this.getId(courseData.id, userFromForm.email);

      const orderAlreadyExists = await firebaseService.docExists(firebaseService.Collections.Order, id);
      if (orderAlreadyExists) {
        throw new Error('Cannot create duplicated order');
      }
  
      const data: IOrderData = {
        status: 'created',
        userFromForm,
        chosenProductOption: {
          type: chosenProductOptionType,
          option: courseData.productOptions[chosenProductOptionType]!,
        },
        currentAuthedUser: userData ?? null,
        course: {
          id: courseData.id,
          options: courseData.productOptions,
        },
        meta: {
          createdAt: new Date(),
        },
      };

      await firebaseService.setDoc(firebaseService.Collections.Order, id, orderConverter.toFirestore(data));
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
      const orderDB = await firebaseService.getDocOrThrow<IOrderDataDB>(firebaseService.Collections.Order, id);
      const order = orderConverter.fromFirestore(orderDB);
      await firebaseService.setDoc(firebaseService.Collections.Order, id, orderConverter.toFirestore({ ...order, ...patch }));
    } catch (err) {
      const error = err as Error;
      // tslint:disable-next-line
      console.error(error);
      throw new Error(`Failed to set Order: ${error.message}`);
    }
  }

  public async exists(courseId: string, email: string) {
    const id = this.getId(courseId, email);
    return await firebaseService.docExists(firebaseService.Collections.Order, id);
  }

  private getId(courseId: string, email: string) {
    return `${courseId}_${email}`;
  }
}

const order = new Order();
export default order;
