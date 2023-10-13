import { IUserData, IUserDataDB } from 'types';
import { dateDB2FR } from '../shared';

// export function userDataDB2FR(userDataDB: IUserDataDB): IUserData {
//   const firstSignInAt = typeof userDataDB.firstSignInAt === 'string' ? dateDB2FR(userDataDB.firstSignInAt)
//     : new Date(userDataDB.firstSignInAt.seconds * 1_000 + userDataDB.firstSignInAt.nanoseconds/1_000_000);
//   const lastSignInAt = typeof userDataDB.lastSignInAt === 'string' ? dateDB2FR(userDataDB.lastSignInAt)
//     : new Date(userDataDB.lastSignInAt.seconds * 1_000 + userDataDB.lastSignInAt.nanoseconds/1_000_000);

//   return {
//     ...userDataDB,
//     firstSignInAt,
//     lastSignInAt,
//   }
// }
