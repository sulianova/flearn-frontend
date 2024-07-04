import { TWhereProps, firebaseService } from 'services';
import type { ICourseData, ICourseDataDB } from 'services/course.service';
import type { IUserDataDB } from 'services/user.service';

import { courseConverter } from './courseConverter';

import { ECommonErrorTypes } from 'types';

class Course {
  public async get(id: string): Promise<ICourseData> {
    const courseDataDB = await firebaseService.getDoc<ICourseDataDB>(firebaseService.Collections.Course, id);

    if (!courseDataDB) {
      throw new Error(ECommonErrorTypes.FailedToFindData);
    }

    return await courseConverter.fromFirestore(courseDataDB);
  }

  public async getAll(filter: { ids?: string[], userId?: string }): Promise<ICourseData[]> {
    let usersCoursesIds: string[] | undefined;
    if (filter.userId) {
      const user = await firebaseService.getDoc<IUserDataDB>(firebaseService.Collections.User, filter.userId);
      if (!user) {
        throw new Error(ECommonErrorTypes.FailedToFindData);
      }
      const filteredAccess = await firebaseService.getDocs(firebaseService.Collections.Access, [{ param: user.email, value: ['FREE', 'BASE', 'OPTIMAL', 'EXTENDED'], operator: 'in' }]);
      usersCoursesIds = filteredAccess.map(a => a.id);
      if (usersCoursesIds.length === 0) {
        return [];
      }
    }
    const queryConstraints = [
      (filter.ids || usersCoursesIds) && { param: 'id', value: [...filter.ids ?? [], ...usersCoursesIds ?? []], operator: 'in' },
    ].filter(Boolean) as TWhereProps;

    const coursesDataDB = (await firebaseService.getDocs<ICourseDataDB>(firebaseService.Collections.Course, queryConstraints)).map(d => d.data);
    return await Promise.all(coursesDataDB.map(courseDataDB => courseConverter.fromFirestore(courseDataDB)));
  }

  public async set(id: string, courseData: ICourseData): Promise<ICourseData> {
    const courseDataDB = courseConverter.toFirestore(courseData);
    const newCourseDataDB = await firebaseService.setDoc<ICourseDataDB>(firebaseService.Collections.Course, id, courseDataDB);

    if (!newCourseDataDB) {
      throw new Error('Failed to update course data');
    }

    return await courseConverter.fromFirestore(newCourseDataDB);
  }
};

export default new Course();
