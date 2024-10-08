import type { ICourseData, ICourseDataDB } from 'services/course.service';
import type { ILessonDataDB } from './lesson.service';

import { courseDataDB2FR } from './utils/course';
import { lessonDataDB2FR } from './utils/lesson';


import type { IObject } from 'types';

class LocalFilesService {
  public Course = ({
    async localToFR(courseDB: ICourseDataDB): Promise<ICourseData> {
      return courseDataDB2FR(courseDB);
    },
    test(dataLocal: IObject | undefined) {
      if (dataLocal === undefined) {
        return false;
      }
      const res = true;
        // typeof dataLocal.startDate === 'string'
        // && typeof dataLocal.durationWeeks === 'number'
        // && typeof dataLocal.homeworksNumber === 'number'
        // && typeof dataLocal.videosNumber === 'number'
        // && (dataLocal.feild === 'Иллюстрация' || dataLocal.feild === 'Adobe')
        // && typeof dataLocal.title === 'string'
        // && typeof dataLocal.introDescription === 'string'
        // && typeof dataLocal.introImageSrc === 'string'
        // && typeof dataLocal.introImageAlt === 'string'
        // && typeof dataLocal.discontAmount === 'number'
        // && typeof dataLocal.discontDeadline === 'string'
        // && typeof dataLocal.creditWas === 'number'
        // && typeof dataLocal.creditPrice === 'number';
      // TODO add other tests
      return res;
    },
  });

  public Lesson = ({
    async localToFR(lessonDB: ILessonDataDB) {
      try {
        return await lessonDataDB2FR(lessonDB);
      } catch(err) {
        console.log('Failed to translate lesson DB data to FR data', { err });
        throw err;
      }
    },
    test(dataLocal: IObject | undefined) {
      if (dataLocal === undefined) {
        return false;
      }
      const res = true;
      // TODO add other tests
      return res;
    },
  });
}

export const localFilesServise = new LocalFilesService();
