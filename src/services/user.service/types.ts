export interface IUserData {
  id: string
  email: string
  displayName: string | null
  photoURL: string | null
  firstSignInAt: Date
  lastSignInAt: Date
  role: 'user' | 'support'
}

export interface IUserDataDB {
  id: string
  email: string
  displayName: string | null
  photoURL: string | null
  firstSignInAt: string
  lastSignInAt: string
  role: 'user' | 'support'
}

export type TActionS =
  | { type: 'created', payload: { id: string, courseId: string, lessonId: string, userId: string } }
  | { type: 'updated', payload: { id: string } };

export type TActionBS =
  | null
  | { users: IUserData[] }
  | Error;
