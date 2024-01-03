import { IOrderData, IOrderDataDB } from 'types';
import { dateFR2DB } from '../shared';

export function orderDataFR2DB(order: IOrderData): IOrderDataDB {
  return {
    ...order,
    currentAuthedUser: orderCurrentAuthedUserFR2DB(order),
    course: orderCourseFR2DB(order),
    meta: orderMetaFR2DB(order),
  };
}

function orderCurrentAuthedUserFR2DB({ currentAuthedUser: user }: IOrderData): IOrderDataDB['currentAuthedUser'] {
  if (!user) return null;
  return {
    ...user,
    firstSignInAt: dateFR2DB(user.firstSignInAt),
    lastSignInAt: dateFR2DB(user.lastSignInAt),
  };
}

function orderCourseFR2DB({ course }: IOrderData): IOrderDataDB['course'] {
  return {
    ...course,
    dataSnapshot: {
      ...course.dataSnapshot,
      discontDeadline: course.dataSnapshot.discontDeadline ? dateFR2DB(course.dataSnapshot.discontDeadline): null,
    },
  };
}

function orderMetaFR2DB({ meta }: IOrderData): IOrderDataDB['meta'] {
  return {
    ...meta,
    createdAt: dateFR2DB(meta.createdAt),
  };
}
