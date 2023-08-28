import { firebaseService } from 'services/firebase.service';
import Store from 'store';
import { ECollections, IOrderData, IRootState } from 'types';

class Order {
  public async create(userFromForm: IOrderData['userFromForm']) {
    const state = Store.getState() as IRootState;
    const courseData = state.course?.data;
    const courseId = state.course?.courseId;

    if (!courseData || !courseId) {
      throw new Error('Cannot create order: courseData or courseId is undefined');
    }
    const id = `${courseId}_${userFromForm.email}`;
    const oldOrder = await firebaseService.getDoc(ECollections.Order, id);

    if (oldOrder) {
      throw new Error('Cannot create duplicated order');
    }

    const { discontAmount, discontDeadline, creditPrice, creditWas } = courseData;

    const data: IOrderData = {
      status: 'created',
      userFromForm,
      currentAuthedUser: state.user?.user,
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

    await firebaseService.setDoc(ECollections.Order, id, data);
  }
}

export default new Order();
