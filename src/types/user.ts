export interface IUserData {
  email: string
  displayName: string | null
  photoURL: string | null
  firstSignInAt: Date
  lastSignInAt: Date
}

export interface IUserDataDB {
  email: string
  displayName: string | null
  photoURL: string | null
  firstSignInAt: { seconds: number, nanoseconds: number }
  lastSignInAt: { seconds: number, nanoseconds: number }
}