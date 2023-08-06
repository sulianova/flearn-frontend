import { ICourseData, ICourseDataLocal, IObject } from 'types';

class LocalFilesService {
  public Course = ({
    localToFR(dataLocal: ICourseDataLocal) {
      try {
        const startDate = new Date(dataLocal.startDate);
        const discontDeadline = new Date(dataLocal.discontDeadline);

        const dataFr: ICourseData = {
          ...dataLocal,
          startDate,
          discontDeadline,
        };

        return dataFr;
      } catch(e) {
        return undefined;
      }
    },
    test(dataLocal: IObject | undefined) {
      if (dataLocal === undefined) {
        return false;
      }
      const res =
        typeof dataLocal.startDate === 'string'
        && typeof dataLocal.durationWeeks === 'number'
        && typeof dataLocal.homeworksNumber === 'number'
        && typeof dataLocal.videosNumber === 'number'
        && (dataLocal.feild === 'Иллюстрация' || dataLocal.feild === 'Adobe')
        && typeof dataLocal.title === 'string'
        && typeof dataLocal.introDescription === 'string'
        && typeof dataLocal.introImageSrc === 'string'
        && typeof dataLocal.introImageAlt === 'string'
        && typeof dataLocal.discontAmount === 'number'
        && typeof dataLocal.discontDeadline === 'string'
        && typeof dataLocal.creditWas === 'number'
        && typeof dataLocal.creditPrice === 'number';
      // TODO add other tests
      return res;
    },
  });
}

export const localFilesServise = new LocalFilesService();
