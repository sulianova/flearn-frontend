import { firebaseService } from 'services/firebase.service';
import Store from 'store';
import { ECollections, IOrderData, IRootState } from 'types';
import { orderConverter } from './orderConverter';

class Order {
  public async create(userFromForm: IOrderData['userFromForm']) {
    try {
      const state = Store.getState() as IRootState;
      const courseData = state.course?.data;
      const courseId = state.course?.courseId;
  
      if (!courseData || !courseId) {
        throw new Error('Cannot create order: courseData or courseId is undefined');
      }
      const id = `${courseId}_${userFromForm.email}`;

      const orderAlreadyExists = await firebaseService.docExists(ECollections.Order, id);
      if (orderAlreadyExists) {
        throw new Error('Cannot create duplicated order');
      }

      const { discontAmount, discontDeadline, creditPrice, creditWas } = courseData;
  
      const data: IOrderData = {
        status: 'created',
        userFromForm,
        currentAuthedUser: state.user?.user ?? null,
        course: {
          id: courseId,
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
    } catch (err) {
      const error = err as Error;
      // tslint:disable-next-line
      console.error(error);
      throw new Error(`Failed to create Order: ${error.message}`);
    }
  }
}

const order = new Order();
export default order;
