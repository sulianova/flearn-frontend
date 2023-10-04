import { firebaseService } from 'services';

import { courseConverter } from './courseConverter';

import {
  ECollections,
  type ICourseData,
  type ICourseDataDB
} from 'types';

class Course {
  public async get(id: string): Promise<ICourseData> {
    const courseDataDB = (await firebaseService.getDoc(ECollections.Course, id)) as ICourseDataDB | undefined;
    console.log({ courseDataDB });
    if (!courseDataDB) {
      throw new Error('Failed to fetch course data');
    }

    return await courseConverter.fromFirestore(courseDataDB);
  }

  public async getAll(ids: string[]): Promise<ICourseData[]> {
    return Promise.all(ids.map(id => this.get(id)));
  }

  public async set(id: string, courseData: ICourseData): Promise<ICourseData> {
    const courseDataDB = courseConverter.toFirestore(courseData);
    const newCourseDataDB = (await firebaseService.setDoc(ECollections.Course, id, courseDataDB)) as ICourseDataDB | undefined;

    if (!newCourseDataDB) {
      throw new Error('Failed to update course data');
    }

    return await courseConverter.fromFirestore(newCourseDataDB);
  }
};

export default new Course();
