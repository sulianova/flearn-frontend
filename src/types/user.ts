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
  firstSignInAt: { seconds: number, nanoseconds: number }
  lastSignInAt: { seconds: number, nanoseconds: number }
  role: 'user' | 'support'
}
