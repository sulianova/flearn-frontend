import { initializeApp } from 'firebase/app';
import { collection, doc as getDocRef, getDoc, getDocs, getFirestore, setDoc, query, where } from 'firebase/firestore';
import { getStorage, ref as getStorageRef, getDownloadURL } from 'firebase/storage';
import { getFirebaseConfig } from './firebase.config';

import { ECollections } from 'types';

import type { FirebaseApp, FirebaseOptions } from 'firebase/app';
import type { DocumentData, Firestore, FirestoreDataConverter } from 'firebase/firestore';
import type { FirebaseStorage } from 'firebase/storage';
import type { IObject } from 'types';

export class FirebaseService {
  constructor(config: FirebaseOptions) {
    this._app = initializeApp(config);
    this._db = getFirestore(this._app);
    this._storage = getStorage(this._app);
  }

  public async getDoc(collectionName: ECollections, id: string, converter: FirestoreDataConverter<DocumentData, DocumentData> | null = null) {
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

  public async setDoc(collectionName: ECollections, id: string, data: IObject, converter: FirestoreDataConverter<DocumentData, DocumentData> | null = null) {
    try {
      const docRef = converter ? getDocRef(this._db, collectionName, id).withConverter(converter) : getDocRef(this._db, collectionName, id);
      await setDoc(docRef, data);
      const savedDoc = await this.getDoc(collectionName, id, converter);
      return savedDoc;
    } catch(e) {
      // tslint:disable-next-line
      console.error(e);
    }
  }

  public async getDocs(collectionName: ECollections, whereProps: { param: string, value: unknown }[]) {
    try {
      const queryConstraints = whereProps.map(({ param, value}) => where(param, '==', value));
      const q = query(collection(this._db, collectionName), ...queryConstraints);
      const querySnapshot = await getDocs(q);
      const data = [] as DocumentData[];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        data.push(doc.data());
      });

      return data;
    } catch(e) {
      // tslint:disable-next-line
      console.error(e);
    }
  }

  public async getImageURL(props: { courseId: string, folder: TLessonId | 'landing', imageId: string, variant?: 'images' | 'homeworks' }) {
    try {
      const { courseId, folder, imageId, variant = 'images' } = props;
      const path = `${courseId}/${folder}/${variant}/${imageId}`;
      const ref = getStorageRef(this._storage, path);
      const url = await getDownloadURL(ref);

      return url;
    } catch(e) {
        // tslint:disable-next-line
        console.error('Failed to get image from storage', { props, e });
    }
  }

  private _app: FirebaseApp;
  private _db: Firestore;
  private _storage: FirebaseStorage;
}

export const firebaseService = new FirebaseService(getFirebaseConfig());

type TLessonId = string;
