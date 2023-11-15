import { dateFR2DB } from '../shared';

import type { ICourseData, ICourseDataDB } from 'types';

export function courseDataFR2DB(course: ICourseData): ICourseDataDB {
  const { introImageSrc, ...courseRest } = course;

  return {
    ...courseRest,
    startDate: dateFR2DB(course.startDate),
    endDate: dateFR2DB(course.endDate),
    discontDeadline: dateFR2DB(course.discontDeadline),
    modules: courseModulesFR2DB(course.modules),
    explainMedia: courseExplainMediaFR2DB(course.explainMedia),
    teachers: courseTeachersFR2DB(course.teachers),
    teacherGallery: courseTeacherGallerysFR2DB(course.teacherGallery),
    studentsWorks: courseStudentsWorksFR2DB(course.studentsWorks),
  };
};

// modules
function courseModulesFR2DB(modules: ICourseData['modules']): ICourseDataDB['modules'] {
  return modules.map(m => courseModuleFR2DB(m));
}

function courseModuleFR2DB(module: ICourseData['modules'][number]): ICourseDataDB['modules'][number] {
  const { imageSrc, ...restModule } = module;
  return restModule;
}

function courseExplainMediaFR2DB(explainMedia: ICourseData['explainMedia']): ICourseDataDB['explainMedia'] {
  if (explainMedia.type === 'video') {
    return explainMedia;
  }

  const { imageSrc, ...restExplainMedia } = explainMedia;
  return restExplainMedia;
}

// teachers
function courseTeachersFR2DB(teachers: ICourseData['teachers']): ICourseDataDB['teachers'] {
  return teachers.map(t => courseTeacherFR2DB(t));
}

function courseTeacherFR2DB(teacher: ICourseData['teachers'][number]): ICourseDataDB['teachers'][number] {
  const { imageSrc, ...restTeacher } = teacher;
  return restTeacher;
}

// teacherGallery
function courseTeacherGallerysFR2DB(teacherGallerys: ICourseData['teacherGallery']): ICourseDataDB['teacherGallery'] {
  return teacherGallerys.map(tg => courseTeacherGalleryFR2DB(tg));
}

function courseTeacherGalleryFR2DB(teacherGallery: ICourseData['teacherGallery'][number]): ICourseDataDB['teacherGallery'][number] {
  const { imageSrc, ...restTeacherGallery } = teacherGallery;
  return restTeacherGallery;
}

// studentsWorks
function courseStudentsWorksFR2DB(studentsWorks: ICourseData['studentsWorks']): ICourseDataDB['studentsWorks'] {
  return studentsWorks.map(courseStudentsWorkFR2DB);
}

function courseStudentsWorkFR2DB(studentsWork: ICourseData['studentsWorks'][number]): ICourseDataDB['studentsWorks'][number] {
  const { imageSrc, ...restStudentWork } = studentsWork;
  return restStudentWork;
}
