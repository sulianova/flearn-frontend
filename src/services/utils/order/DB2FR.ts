import { IOrderData, IOrderDataDB } from 'types';
import { dateDB2FR } from '../shared';
import { ICourseProductOption, ICourseProductOptionDB } from 'services/course.service';

export function orderDataDB2FR(order: IOrderDataDB): IOrderData {
  return {
    ...order,
    chosenProductOption: {
      ...order.chosenProductOption,
      option: productOptionDB2FR(order.chosenProductOption.option),
    },
    currentAuthedUser: orderCurrentAuthedUserDB2FR(order),
    course: orderCourseDB2FR(order),
    meta: orderMetaDB2FR(order),
  };
}

function productOptionDB2FR(option: ICourseProductOptionDB): ICourseProductOption {
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
      ...deadline && { deadline: dateDB2FR(deadline) },
    }
  }
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
    options: {
      BASE: productOptionDB2FR(course.options.BASE),
      OPTIMAL: productOptionDB2FR(course.options.OPTIMAL),
      ...course.options.EXTENDED && { EXTENDED: productOptionDB2FR(course.options.EXTENDED) },
    },
  };
}

function orderMetaDB2FR({ meta }: IOrderDataDB): IOrderData['meta'] {
  return {
    ...meta,
    createdAt: dateDB2FR(meta.createdAt),
  };
}
