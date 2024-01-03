import { initializeApp } from 'firebase/app';
import { collection, doc as getDocRef, getDoc, getDocs, getFirestore, setDoc, query, where } from 'firebase/firestore';
import { deleteObject, getStorage, ref as getStorageRef, getDownloadURL, uploadBytes } from 'firebase/storage';
import { getFirebaseConfig } from './firebase.config';

import { ECollections } from 'types';

import type { FirebaseApp, FirebaseOptions } from 'firebase/app';
import type { DocumentData, Firestore, FirestoreDataConverter, WhereFilterOp } from 'firebase/firestore';
import type { FirebaseStorage } from 'firebase/storage';
import type { IObject } from 'types';
import type { TWhereProps } from './types';

export { type TWhereProps } from './types';

export class FirebaseService {
  constructor(config: FirebaseOptions) {
    this._app = initializeApp(config);
    this._db = getFirestore(this._app);
    this._storage = getStorage(this._app);
  }

  public async docExists(collectionName: ECollections, id: string, throws?: boolean) {
    try {
      const docRef = getDocRef(this._db, collectionName, id);
      const doc = await getDoc(docRef);
      const docExists = doc.exists();

      if (!docExists && throws) {
        throw new Error(`Doc doesn't exist`);
      } else {
        return docExists;
      }
    } catch(e) {
      // tslint:disable-next-line
      console.error(e);
      throw new Error(`Failed to get doc`);
    }
  }

  public async getDoc(collectionName: ECollections, id: string, converter: FirestoreDataConverter<DocumentData, DocumentData> | null = null) {
    try {
      const docRef = converter ? getDocRef(this._db, collectionName, id).withConverter(converter) : getDocRef(this._db, collectionName, id);
      const doc = await getDoc(docRef);
      return doc.data();
    } catch(e) {
      // tslint:disable-next-line
      console.error(e);
      throw new Error(`Failed to get doc`);
    }
  }

  public async getDocOrThrow(collectionName: ECollections, id: string, converter: FirestoreDataConverter<DocumentData, DocumentData> | null = null) {
    try {
      const docRef = converter ? getDocRef(this._db, collectionName, id).withConverter(converter) : getDocRef(this._db, collectionName, id);
      const doc = await getDoc(docRef);
      if (doc.exists()) {
        return doc.data();
      } else {
        throw new Error(`Doc doesn't exist`);
      }
    } catch(e) {
      // tslint:disable-next-line
      console.error(e);
      throw new Error(`Failed to get doc`);
    }
  }

  public async setDoc(collectionName: ECollections, id: string, data: IObject, converter: FirestoreDataConverter<DocumentData, DocumentData> | null = null) {
    try {
      const docRef = converter ? getDocRef(this._db, collectionName, id).withConverter(converter) : getDocRef(this._db, collectionName, id);
      await setDoc(docRef, filterData(data));
      const savedDoc = await this.getDoc(collectionName, id, converter);
      return savedDoc;
    } catch(e) {
      // tslint:disable-next-line
      console.error(e);
      throw new Error('Failed to save doc');
    }
  }

  public async getDocs(collectionName: ECollections, whereProps: TWhereProps ) {
    try {
      const queryConstraints = whereProps
        .filter(({ value, operator }) => operator !== 'in' || (Array.isArray(value) && value.length))
        .map(({ param, value, operator }) => where(param, operator ?? '==', value));
      const q = query(collection(this._db, collectionName), ...queryConstraints);
      const querySnapshot = await getDocs(q);
      const data = [] as { id: string, data: DocumentData }[];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, data: doc.data() });
      });

      return data;
    } catch(e) {
      // tslint:disable-next-line
      console.error(e);
      throw new Error('Failed to get docs');
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

  public async _getImageURL(props: { path: string }) {
    try {
      const ref = getStorageRef(this._storage, props.path);
      return await getDownloadURL(ref);;
    } catch(err) {
        // tslint:disable-next-line
        console.error('Failed to get image from storage', { props, err });
        throw new Error('Failed to get image from storage');
    }
  }

  public async uploadImage(props: { courseId: string, folder: TLessonId | 'landing', imageId: string, variant?: 'images' | 'homeworks', file: File }) {
    try {
      const { courseId, folder, imageId, variant = 'images', file } = props;
      const path = `${courseId}/${folder}/${variant}/${imageId}`;
      const ref = getStorageRef(this._storage, path);
      await uploadBytes(ref, file);
    } catch(e) {
        // tslint:disable-next-line
        console.error('Failed to upload image to storage', { props, e });
    }
  }

  public async _uploadImage(props: { path: string, file: File }) {
    try {
      const ref = getStorageRef(this._storage, props.path);
      await uploadBytes(ref, props.file);
    } catch(err) {
        // tslint:disable-next-line
        console.error('Failed to upload image to storage', { props, err });
        throw new Error('Failed to upload image to storage');
    }
  }

  public async _deleteImage(props: { path: string }) {
    try {
      const ref = getStorageRef(this._storage, props.path);
      await deleteObject(ref);
    } catch(err) {
        // tslint:disable-next-line
        console.error('Failed to delete image from storage', { props, err });
        throw new Error('Failed to delete image from storage');
    }
  }

  private _app: FirebaseApp;
  private _db: Firestore;
  private _storage: FirebaseStorage;
}

export const firebaseService = new FirebaseService(getFirebaseConfig());

type TLessonId = string;

function filterData(data: IObject<unknown>) {
  const filteredData = {} as IObject;
  Object.keys(data).forEach(key => {
    if (data[key] !== undefined) {
      const value = data[key];
      filteredData[key] = isSimpleObject(value) ? filterData(value) : value;
    }
  });

  return filteredData;
}

function isSimpleObject(obj: unknown): obj is IObject<unknown> {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj) && !(obj instanceof Date);
}
