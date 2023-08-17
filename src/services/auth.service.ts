import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import firebaseConfig from './firebase.service/firebase.config.json';

import type { FirebaseApp, FirebaseOptions } from 'firebase/app';
import type { Auth, User } from 'firebase/auth';

class AuthService {
  public user: User | null;

  constructor(config: FirebaseOptions) {
    this.user = null;
    this._app = initializeApp(config);
    this._auth = getAuth(this._app);
    this._authProvider = new GoogleAuthProvider();
    this._authenticationInProgress = false;
    this._resolveAwaitPersistedUser = undefined;

    setPersistence(this._auth, browserLocalPersistence).then(() => {
      // save persisted user
      this.user = this._auth.currentUser;
      // call _resolveAwaitPersistedUser to resolve pending authUsingPersistance calls
      this._resolveAwaitPersistedUser?.(this.user);
      // save _resolveAwaitPersistedUser as null to indicate that persisted user already have been parsed
      this._resolveAwaitPersistedUser = null;
    });
  }

  public async authUsingPersistance() {
    // setPersistence end work before authUsingPersistance was called => 
    // if persisted user existed he will be already in this.user
    if (this._resolveAwaitPersistedUser === null) {
      return this.user;
    }

    return new Promise(resolve => {
      this._resolveAwaitPersistedUser = resolve as (user: User | null) => {};
    });
  }

  public async authenticate() {
    if (this._authenticationInProgress) {
      return;
    }

    this._authenticationInProgress = true;

    const result = await signInWithPopup(this._auth, this._authProvider);

    this._authenticationInProgress = false;
    if (!result.user) {
      throw new Error('failed auth');
    }

    this.user = result.user;

    console.log('user: ', result.user);
  }

  public async getAuthenticatedUser() {
    if (this.user) {
      return this.user;
    }

    await this.authenticate();
    return this.user!;
  }

  public async logout() {
    await signOut(this._auth);
    this.user = this._auth.currentUser;
  }

  public get isAuthenticated() {
    return this.user !== null;
  }

  private _app: FirebaseApp;
  private _auth: Auth;
  private _authProvider: GoogleAuthProvider;
  private _authenticationInProgress: boolean;

  private _resolveAwaitPersistedUser: ((user: User | null) => {}) | undefined | null;
}

export const authService = new AuthService(firebaseConfig);
