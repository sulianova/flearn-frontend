import { firebaseService } from 'services/firebase.service';
import { dateDB2FR } from '../shared';

import type { ICourseData, ICourseDataDB } from 'types';

export async function courseDataDB2FR(courseDB: ICourseDataDB): Promise<ICourseData> {
  const courseId = courseDB.id;

  return {
    ...courseDB,
    introImageSrc: (await firebaseService.getImageURL({ courseId, imageId: courseDB.introImageId })) ?? '',
    startDate: dateDB2FR(courseDB.startDate),
    discontDeadline: dateDB2FR(courseDB.discontDeadline),
    modules: await courseModulesDB2FR(courseDB.modules, courseId),
    teachers: await courseTeachersDB2FR(courseDB.teachers, courseId),
    teacherGallery: await courseTeacherGallerysDB2FR(courseDB.teacherGallery, courseId),
  };
};

// modules
async function courseModulesDB2FR(modules: ICourseDataDB['modules'], courseId: string): Promise<ICourseData['modules']> {
  return await Promise.all(modules.map(m => courseModuleDB2FR(m, courseId)));
}

async function courseModuleDB2FR(module: ICourseDataDB['modules'][number], courseId: string): Promise<ICourseData['modules'][number]> {
  return {
    ...module,
    imageSrc: (await firebaseService.getImageURL({ courseId, imageId: module.imageId })) ?? '',
  };
}

// teachers
async function courseTeachersDB2FR(teachers: ICourseDataDB['teachers'], courseId: string): Promise<ICourseData['teachers']> {
  return await Promise.all(teachers.map(t => courseTeacherDB2FR(t, courseId)));
}

async function courseTeacherDB2FR(teacher: ICourseDataDB['teachers'][number], courseId: string): Promise<ICourseData['teachers'][number]> {
  return {
    ...teacher,
    imageSrc: (await firebaseService.getImageURL({ courseId, imageId: teacher.imageId })) ?? '',
  };
}

// teacherGallery
async function courseTeacherGallerysDB2FR(teacherGallerys: ICourseDataDB['teacherGallery'], courseId: string): Promise<ICourseData['teacherGallery']> {
  return await Promise.all(teacherGallerys.map(tg => courseTeacherGalleryDB2FR(tg, courseId)));
}

async function courseTeacherGalleryDB2FR(teacherGallery: ICourseDataDB['teacherGallery'][number], courseId: string): Promise<ICourseData['teacherGallery'][number]> {
  return {
    ...teacherGallery,
    imageSrc: (await firebaseService.getImageURL({ courseId, imageId: teacherGallery.imageId })) ?? '',
  };
}
