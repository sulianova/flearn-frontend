import type { ICourseData, ICourseDataDB } from 'services/course.service';
import { firebaseService } from 'services/firebase.service';
import { dateDB2FR } from '../shared';

export async function courseDataDB2FR(courseDB: ICourseDataDB): Promise<ICourseData> {
  const courseId = courseDB.id;

  return {
    ...courseDB,
    introImageSrc: (await firebaseService.getImageURL({ courseId, folder: 'landing', imageId: courseDB.introImageId })) ?? '',
    startDate: dateDB2FR(courseDB.startDate),
    endDate: dateDB2FR(courseDB.endDate),
    accessDeadline: dateDB2FR(courseDB.accessDeadline),
    discontDeadline: courseDB.discontDeadline ? dateDB2FR(courseDB.discontDeadline) : null,
    modules: await courseModulesDB2FR(courseDB.modules, courseId),
    explainMedia: await courseExplainMediaDB2FR(courseDB.explainMedia, courseId),
    teachers: await courseTeachersDB2FR(courseDB.teachers, courseId),
    teacherGallery: await courseTeacherGallerysDB2FR(courseDB.teacherGallery, courseId),
    studentResults: await studentResultsDB2FR(courseDB.studentResults, courseId),
    studentsWorks: await courseStudentsWorksDB2FR(courseDB.studentsWorks, courseId),
    studyProcess: await courseStudyProcessDB2FR(courseDB.studyProcess, courseId),
  };
};

// modules
async function courseModulesDB2FR(modules: ICourseDataDB['modules'], courseId: string): Promise<ICourseData['modules']> {
  return await Promise.all(modules.map(m => courseModuleDB2FR(m, courseId)));
}

async function courseModuleDB2FR(module: ICourseDataDB['modules'][number], courseId: string): Promise<ICourseData['modules'][number]> {
  if (module.imageId === undefined) {
    return {
      ...module,
    };
  }

  const imageSrc = typeof module.imageId === 'string' ?
    (await firebaseService.getImageURL({ courseId, folder: 'landing', imageId: module.imageId })) ?? ''
    : {
      desktop: (await firebaseService.getImageURL({ courseId, folder: 'landing', imageId: module.imageId.desktop })) ?? '',
      mobile: (await firebaseService.getImageURL({ courseId, folder: 'landing', imageId: module.imageId.mobile })) ?? '',
    };

  return {
    ...module,
    imageSrc: imageSrc,
  } as ICourseData['modules'][number];
}

async function courseExplainMediaDB2FR(explainMedia: ICourseDataDB['explainMedia'], courseId: string): Promise<ICourseData['explainMedia']> {
  if (explainMedia.type === 'video') {
    return explainMedia;
  }

  return {
    ...explainMedia,
    imageSrc: (await firebaseService.getImageURL({ courseId, folder: 'landing', imageId: explainMedia.imageId })) ?? '',
  };
}

// teachers
async function courseTeachersDB2FR(teachers: ICourseDataDB['teachers'], courseId: string): Promise<ICourseData['teachers']> {
  return await Promise.all(teachers.map(t => courseTeacherDB2FR(t, courseId)));
}

async function courseTeacherDB2FR(teacher: ICourseDataDB['teachers'][number], courseId: string): Promise<ICourseData['teachers'][number]> {
  return {
    ...teacher,
    imageSrc: (await firebaseService.getImageURL({ courseId, folder: 'landing', imageId: teacher.imageId })) ?? '',
  };
}

// teacherGallery
async function courseTeacherGallerysDB2FR(teacherGallerys: ICourseDataDB['teacherGallery'], courseId: string): Promise<ICourseData['teacherGallery']> {
  return await Promise.all(teacherGallerys.map(tg => courseTeacherGalleryDB2FR(tg, courseId)));
}

async function courseTeacherGalleryDB2FR(teacherGallery: ICourseDataDB['teacherGallery'][number], courseId: string): Promise<ICourseData['teacherGallery'][number]> {
  return {
    ...teacherGallery,
    imageSrc: (await firebaseService.getImageURL({ courseId, folder: 'landing', imageId: teacherGallery.imageId })) ?? '',
  };
}

// studentResults
async function studentResultsDB2FR(studentResults: ICourseDataDB['studentResults'], courseId: string): Promise<ICourseData['studentResults']> {
  if (!studentResults) {
    return undefined;
  }

  const imageSrc = typeof studentResults.imageId === 'string' ?
    (await firebaseService.getImageURL({ courseId, folder: 'landing', imageId: studentResults.imageId })) ?? ''
    : {
      desktop: (await firebaseService.getImageURL({ courseId, folder: 'landing', imageId: studentResults.imageId.desktop })) ?? '',
      mobile: (await firebaseService.getImageURL({ courseId, folder: 'landing', imageId: studentResults.imageId.mobile })) ?? '',
    };

  return {
    ...studentResults,
    imageSrc: imageSrc
  } as ICourseData['studentResults'];
}

// studentsWorks
async function courseStudentsWorksDB2FR(studentsWorks: ICourseDataDB['studentsWorks'], courseId: string): Promise<ICourseData['studentsWorks']> {
  return await Promise.all(studentsWorks.map(sw => courseStudentsWorkDB2FR(sw, courseId)));
}

async function courseStudentsWorkDB2FR(studentsWork: ICourseDataDB['studentsWorks'][number], courseId: string): Promise<ICourseData['studentsWorks'][number]> {
  return {
    ...studentsWork,
    imageSrc: (await firebaseService.getImageURL({ courseId, folder: 'landing', imageId: studentsWork.imageId })) ?? '',
  };
}

// studyProcess
async function courseStudyProcessDB2FR(studyProcess: ICourseDataDB['studyProcess'], courseId: string): Promise<ICourseData['studyProcess']> {
  if (!studyProcess) {
    return undefined;
  }
  return await Promise.all(studyProcess.map(spi => courseStudyProcessItemDB2FR(spi, courseId)));
}

async function courseStudyProcessItemDB2FR(studyProcessItem: NonNullable<ICourseDataDB['studyProcess']>[number], courseId: string): Promise<NonNullable<ICourseData['studyProcess']>[number]> {
  if ('imageId' in studyProcessItem) {
    const imageSrc = typeof studyProcessItem.imageId === 'string' ?
      (await firebaseService.getImageURL({ courseId, folder: 'landing', imageId: studyProcessItem.imageId })) ?? ''
      : {
        desktop: (await firebaseService.getImageURL({ courseId, folder: 'landing', imageId: studyProcessItem.imageId.desktop })) ?? '',
        mobile: (await firebaseService.getImageURL({ courseId, folder: 'landing', imageId: studyProcessItem.imageId.mobile })) ?? '',
      };

    return {
      ...studyProcessItem,
      imageSrc: imageSrc
    } as NonNullable<ICourseData['studyProcess']>[number];
  }

  return studyProcessItem;
}
