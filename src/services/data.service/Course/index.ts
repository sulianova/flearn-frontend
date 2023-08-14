import { firebaseService } from 'services';

import { courseConverter } from './courseConverter';

import { ECollections } from 'types';
import type { ICourseData } from 'types';

class Course {
  public async get(id: string) {
    return await firebaseService.getDoc(ECollections.Course, id, courseConverter);
  }

  public async set(id: string, data: ICourseData) {
    return await firebaseService.setDoc(ECollections.Course, id, data, courseConverter);
  }
};

export default Course;
