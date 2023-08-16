import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import firebaseConfig from './firebase.service/firebase.config.json';

import type { Auth, User } from 'firebase/auth';

class AuthService {
  public user: User | null;

  constructor() {
    this.user = null;
    this._auth = getAuth(initializeApp(firebaseConfig));
    this._authProvider = new GoogleAuthProvider();
    this._authenticationInProgress = false;
  }

  public async authenticate() {
    if (this._authenticationInProgress) {
      return;
    }

    this._authenticationInProgress = true;
    const result = await signInWithPopup(this._auth, this._authProvider);
    this._authenticationInProgress = false;
    if (!result.user) {
      throw new Error('faild auth');
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

  public logout() {
    this.user = null;
  }

  public get isAuthenticated() {
    return this.user !== null;
  }

  private _auth: Auth;
  private _authProvider: GoogleAuthProvider;
  private _authenticationInProgress: boolean;
}

export const authService = new AuthService();