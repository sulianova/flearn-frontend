import type { IOrderData, IOrderDataDB } from 'types';
import { dateFR2DB } from '../shared';
import type { ICourseProductOption, ICourseProductOptionDB } from 'services/course.service';

export function orderDataFR2DB(order: IOrderData): IOrderDataDB {
  return {
    ...order,
    chosenProductOption: {
      ...order.chosenProductOption,
      option: productOptionFR2DB(order.chosenProductOption.option),
    },
    currentAuthedUser: orderCurrentAuthedUserFR2DB(order),
    course: orderCourseFR2DB(order),
    meta: orderMetaFR2DB(order),
  };
}

function productOptionFR2DB(option: ICourseProductOption): ICourseProductOptionDB {
  const { price, description, discount } = option;
  if (!discount) {
    return { price, description };
  }
  const { amountPrc, deadline } = discount;
  return {
    price,
    description,
    discount: {
      amountPrc,
      ...deadline && { deadline: dateFR2DB(deadline) },
    }
  }
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
    options: {
      BASE: productOptionFR2DB(course.options.BASE),
      OPTIMAL: productOptionFR2DB(course.options.OPTIMAL),
      ...course.options.EXTENDED && { EXTENDED: productOptionFR2DB(course.options.EXTENDED) },
    },
  };
}

function orderMetaFR2DB({ meta }: IOrderData): IOrderDataDB['meta'] {
  return {
    ...meta,
    createdAt: dateFR2DB(meta.createdAt),
  };
}
