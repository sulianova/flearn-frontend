import { initializeApp } from 'firebase/app';
import { doc as getDocRef, getDoc, getFirestore, setDoc, collection } from 'firebase/firestore';
import firebaseConfig from './firebase.config.json';

import { ECollections } from 'types';

import type { FirebaseApp, FirebaseOptions } from 'firebase/app';
import type { DocumentData, Firestore, FirestoreDataConverter } from 'firebase/firestore';
import type { IObject } from 'types';

export class FirebaseService {
  constructor(config: FirebaseOptions) {
    this._app = initializeApp(config);
    this._db = getFirestore(this._app);
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

  public async createWithGeneratedId(collectionName: ECollections, data: IObject, converter: FirestoreDataConverter<DocumentData, DocumentData> | null = null) {
    try {
      const collectionRef = collection(this._db, collectionName);
      const id = collectionRef.id;
      console.log('createWithGeneratedId: id: ', id);
      // const res = await this._db.collection('cities').add({
      //   name: 'Tokyo',
      //   country: 'Japan'
      // });

      // const docRef = converter ? getDocRef(this._db, collectionName).withConverter(converter) : getDocRef(this._db, collectionName);
      // const erty = await setDoc(docRef, data);
      // const savedDoc = await this.getDoc(collectionName, id, converter);
      // return savedDoc;
    } catch(e) {
      // tslint:disable-next-line
      console.error(e);
    }
  }

  private _app: FirebaseApp;
  private _db: Firestore;
}

export const firebaseService = new FirebaseService(firebaseConfig);
