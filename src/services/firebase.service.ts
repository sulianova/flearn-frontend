import { initializeApp } from 'firebase/app';
import { doc as getDocRef, getDoc, getFirestore, setDoc} from 'firebase/firestore';
import firebaseConfig from './firebase.config.json';

import { ECollections } from 'types';

import type { FirebaseApp, FirebaseOptions } from 'firebase/app';
import type { Firestore } from 'firebase/firestore';
import type { ICourseData, IObject } from 'types';

class FirebaseService {
  constructor(config: FirebaseOptions) {
    this._app = initializeApp(config);
    this._db = getFirestore(this._app);
  }

  public async getCourse(id: string) {
    return await this._getDoc(ECollections.Course, id);
  }

  public async setCourse(id: string, data: ICourseData) {
    return await this._setDoc(ECollections.Course, id, data);
  }

  private async _getDoc(collectionName: ECollections, id: string) {
    try {
      const docRef = getDocRef(this._db, collectionName, id);
      const doc = await getDoc(docRef);
      if (doc.exists()) {
        return doc.data();
      } else {
        throw new Error(`doc doesn't exist`);
      }
    } catch(e) {
      console.error(e);
    }
  }

  private async _setDoc(collectionName: ECollections, id: string, data: IObject) {
    try {
      const docRef = getDocRef(this._db, collectionName, id);
      await setDoc(docRef, data);
      const doc = await getDoc(docRef);
      return doc;
    } catch(e) {
      console.error(e);
    }
  }

  private _app: FirebaseApp;
  private _db: Firestore;
}

export const firebaseService = new FirebaseService(firebaseConfig);
