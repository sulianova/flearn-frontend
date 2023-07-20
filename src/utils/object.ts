import { IObject, IPayload } from 'types';

export function isSamePayload(payload1: IPayload, payload2: IPayload): boolean {
  if (payload1 === payload2) {
    return true;
  }

  const payloadType = typeof payload1;
  const isArray = Array.isArray(payload1);

  if (typeof payload2 !== payloadType || Array.isArray(payload2) !== isArray) {
    return false;
  }

  if (isArray) {
    const p1 = payload1 as Array<string | number | IObject>;
    const p2 = payload2 as Array<string | number | IObject>;

    if (p1.length !== p2.length) {
      return false;
    }

    for (let i = 0; i < p1.length; i++) {
      if (!isSamePayload(p1[i], p2[i])) {
        return false;
      }
    }
    return true;
}

  if (payloadType === 'object' && payload1 !== null && payload2 !== null) {
    if (Object.prototype.toString.call(payload1) === '[object Date]') {
      const date1 = payload1 as Date;
      const date2 = payload2 as Date;

      return date1.getTime() === date2.getTime();
    }

    const p1 = payload1 as IObject;
    const p2 = payload2 as IObject;

    return (
      isSamePayload(Object.keys(p1), Object.keys(p2)) &&
      isSamePayload(Object.values(p1), Object.values(p2))
    );
  }

  return false;
}
