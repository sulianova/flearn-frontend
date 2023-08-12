import { initializeApp } from 'firebase/app';
import { doc as getDocRef, getDoc, getFirestore, setDoc} from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { courseConverter } from './courseConverter';
import firebaseConfig from './firebase.config.json';

import { ECollections } from 'types';

import type { FirebaseApp, FirebaseOptions } from 'firebase/app';
import type { DocumentData, Firestore, FirestoreDataConverter } from 'firebase/firestore';
import type { Auth, GoogleAuthProvider as GoogleAuthProviderType, User } from 'firebase/auth';
import type { ICourseData, IObject } from 'types';

class FirebaseService {
  constructor(config: FirebaseOptions) {
    this._app = initializeApp(config);
    this._db = getFirestore(this._app);
    this._auth = getAuth(this._app);
    this._authProvider = new GoogleAuthProvider();
    this._user = null;
    this._authenticationInProgress = false;
  }

  public async getCourse(id: string) {
    // await this._checkCourseAccess(id);
    return await this._getDoc(ECollections.Course, id, courseConverter);
  }

  public async setCourse(id: string, data: ICourseData) {
    return await this._setDoc(ECollections.Course, id, data, courseConverter);
  }

  private async _getDoc(collectionName: ECollections, id: string, converter: FirestoreDataConverter<DocumentData, DocumentData> | null = null) {
    try {
      const docRef = converter ? getDocRef(this._db, collectionName, id).withConverter(converter) : getDocRef(this._db, collectionName, id);
      const doc = await getDoc(docRef);
      if (doc.exists()) {
        return doc.data();
      } else {
        throw new Error(`doc doesn't exist`);
      }
    } catch(e) {
      // tslint:disable-next-line
      console.error(e);
    }
  }

  private async _setDoc(collectionName: ECollections, id: string, data: IObject, converter: FirestoreDataConverter<DocumentData, DocumentData> | null = null) {
    try {
      const docRef = converter ? getDocRef(this._db, collectionName, id).withConverter(converter) : getDocRef(this._db, collectionName, id);
      await setDoc(docRef, data);
      const savedDoc = await this._getDoc(collectionName, id, converter);
      return savedDoc;
    } catch(e) {
      // tslint:disable-next-line
      console.error(e);
    }
  }

  public async authenticate() {
    if (this._authenticationInProgress) {
      return;
    }
    this._authenticationInProgress = true;
    const result = await signInWithPopup(this._auth, this._authProvider);
    this._authenticationInProgress = false;
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential) {
      throw new Error('faild auth');
    }
    const token = credential.accessToken;
    const user = result.user;

    this._user = user;
  }

  private async _checkCourseAccess(courseId: string) {
    let uuid = this._user?.uid;
    if (!uuid) {
      await this.authenticate();
      uuid = this._user!.uid;
    }

    const access = await this._getDoc(ECollections.Access, courseId) as Record<string, Record<string, boolean> | undefined> | undefined;
    const userHasAccess = access && access[courseId] && access[courseId]?.[uuid];
    return userHasAccess;
  }

  private _app: FirebaseApp;
  private _db: Firestore;
  private _auth: Auth;
  private _authProvider: GoogleAuthProviderType;
  private _user: User | null;
  private _authenticationInProgress: boolean;
}

export const firebaseService = new FirebaseService(firebaseConfig);
