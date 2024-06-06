import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

import { dataService } from 'services';
import { getFirebaseConfig } from '../firebase.service/firebase.config';

import type { FirebaseApp, FirebaseOptions } from 'firebase/app';
import type { Auth, User as FirebaseUser } from 'firebase/auth';

export type { User as FirebaseUser } from 'firebase/auth';

class AuthService {
  public firebaseUserBS = new BehaviorSubject<FirebaseUser | null>(null);
  public get user() {
    return this.firebaseUserBS.getValue();
  }

  constructor(config: FirebaseOptions) {
    this._app = initializeApp(config);
    this._auth = getAuth(this._app);
    this._authProvider = new GoogleAuthProvider();
    this._authProvider.setCustomParameters({ prompt: 'consent' });

    this._authenticationInProgress = false;
    this._resolveAwaitPersistedUser = undefined;

    setPersistence(this._auth, browserLocalPersistence)
      .then(async () => {
        const user = this._auth.currentUser;
        await this._afterAuth(user!);
        // save persisted user
        this.firebaseUserBS.next(user!);
        // call _resolveAwaitPersistedUser to resolve pending authUsingPersistance calls
        this._resolveAwaitPersistedUser?.(user!);
        // save _resolveAwaitPersistedUser as null to indicate that persisted user already have been parsed
        this._resolveAwaitPersistedUser = null;
      });
  }

  // public async authUsingPersistance() {
  //   // setPersistence ends work before authUsingPersistance was called => 
  //   // if persisted user existed he will be already in this.user
  //   if (this._resolveAwaitPersistedUser === null) {
  //     return this.firebaseUserBS.getValue();
  //   }

  //   return new Promise(resolve => {
  //     this._resolveAwaitPersistedUser = resolve as (user: FirebaseUser | null) => {};
  //   });
  // }

  public async authenticate() {
    try {
      if (this._authenticationInProgress || this.isAuthenticated) {
        return;
      }
  
      this._authenticationInProgress = true;
  
      const result = await signInWithPopup(this._auth, this._authProvider, );
  
      this._authenticationInProgress = false;
      if (!result.user) {
        throw new Error('failed auth');
      }

      await this._afterAuth(result.user);
  
      this.firebaseUserBS.next(result.user);
    } catch (err) {
      console.log('Failed to authenticate', { err });
    }
  }

  public async getAuthenticatedUser() {
    try {
      const user = this.firebaseUserBS.getValue();
      if (user) {
        return user;
      }
  
      await this.authenticate();
      return this.firebaseUserBS.getValue()!;
    } catch (err) {
      console.log('Failed to getAuthenticatedUser', { err });
      return null;
    }
  }

  public async logout() {
    await signOut(this._auth);
    this.firebaseUserBS.next(this._auth.currentUser);
  }

  public get isAuthenticated() {
    return Boolean(this.firebaseUserBS.getValue());
  }

  private async _afterAuth(fbUser: FirebaseUser) {
    try {
      const { uid: id, email, displayName, photoURL } = fbUser;
      if (!email) {
        throw new Error('Cannot authenticate without email');
      }
  
      const user = await dataService.user.getOrCreate(id, { id, email, displayName, photoURL, role: 'user' });
  
      // send update request to work in the background
      dataService.user.update(user.id, { lastSignInAt: new Date() });
    } catch (err) {
      console.log('Failed _afterAuth', { err, fbUser });
    }
  }

  private _app: FirebaseApp;
  private _auth: Auth;
  private _authProvider: GoogleAuthProvider;
  private _authenticationInProgress: boolean;

  private _resolveAwaitPersistedUser: ((user: FirebaseUser | null) => {}) | undefined | null;
}

export const authService = new AuthService(getFirebaseConfig());
export default AuthService;
