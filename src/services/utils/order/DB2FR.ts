import { IOrderData, IOrderDataDB } from 'types';
import { dateDB2FR } from '../shared';

export function orderDataDB2FR(order: IOrderDataDB): IOrderData {
  return {
    ...order,
    currentAuthedUser: orderCurrentAuthedUserDB2FR(order),
    course: orderCourseDB2FR(order),
    meta: orderMetaDB2FR(order),
  };
}

function orderCurrentAuthedUserDB2FR({ currentAuthedUser: user }: IOrderDataDB): IOrderData['currentAuthedUser'] {
  if (!user) return null;
  return {
    ...user,
    firstSignInAt: dateDB2FR(user.firstSignInAt),
    lastSignInAt: dateDB2FR(user.lastSignInAt),
  };
}

function orderCourseDB2FR({ course }: IOrderDataDB): IOrderData['course'] {
  return {
    ...course,
    dataSnapshot: {
      ...course.dataSnapshot,
      discontDeadline: course.dataSnapshot.discontDeadline ? dateDB2FR(course.dataSnapshot.discontDeadline): null,
    },
  };
}

function orderMetaDB2FR({ meta }: IOrderDataDB): IOrderData['meta'] {
  return {
    ...meta,
    createdAt: dateDB2FR(meta.createdAt),
  };
}
