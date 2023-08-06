import { initializeApp } from 'firebase/app';
import { doc as getDocRef, getDoc, getFirestore, setDoc} from 'firebase/firestore';
import { courseConverter } from './courseConverter';
import firebaseConfig from './firebase.config.json';

import { ECollections } from 'types';

import type { FirebaseApp, FirebaseOptions } from 'firebase/app';
import type { DocumentData, Firestore, FirestoreDataConverter } from 'firebase/firestore';
import type { ICourseData, IObject } from 'types';

class FirebaseService {
  constructor(config: FirebaseOptions) {
    this._app = initializeApp(config);
    this._db = getFirestore(this._app);
  }

  public async getCourse(id: string) {
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

  private _app: FirebaseApp;
  private _db: Firestore;
}

export const firebaseService = new FirebaseService(firebaseConfig);
