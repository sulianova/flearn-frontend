import { TWhereProps, firebaseService } from 'services';
import type { ICourseData, ICourseDataDB } from 'services/course.service';
import type { IUserDataDB } from 'services/user.service';

import { courseConverter } from './courseConverter';

import { ECollections, ECommonErrorTypes } from 'types';

class Course {
  public async get(id: string): Promise<ICourseData> {
    const courseDataDB = (await firebaseService.getDoc(ECollections.Course, id)) as ICourseDataDB | undefined;

    if (!courseDataDB) {
      throw new Error(ECommonErrorTypes.FailedToFindData);
    }

    return await courseConverter.fromFirestore(courseDataDB);
  }

  public async getAll(filter: { ids?: string[], userId?: string }): Promise<ICourseData[]> {
    let usersCoursesIds: string[] | undefined;
    if (filter.userId) {
      const user = await firebaseService.getDoc(ECollections.User, filter.userId) as IUserDataDB | undefined;
      if (!user) {
        throw new Error(ECommonErrorTypes.FailedToFindData);
      }
      const filteredAccess = await firebaseService.getDocs(ECollections.Access, [{ param: ['users', user.email], value: true }]);
      usersCoursesIds = filteredAccess.map(a => a.id);
      if (usersCoursesIds.length === 0) {
        return [];
      }
    }
    const queryConstraints = [
      (filter.ids || usersCoursesIds) && { param: 'id', value: [...filter.ids ?? [], ...usersCoursesIds ?? []], operator: 'in' },
    ].filter(Boolean) as TWhereProps;

    const coursesDataDB = (await firebaseService.getDocs(ECollections.Course, queryConstraints))
      .map(d => d.data) as ICourseDataDB[];
    return await Promise.all(coursesDataDB.map(courseDataDB => courseConverter.fromFirestore(courseDataDB)));
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
