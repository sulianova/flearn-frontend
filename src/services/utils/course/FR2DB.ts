import { dateFR2DB } from '../shared';

import type { ICourseData, ICourseDataDB } from 'services/course.service';

export function courseDataFR2DB(course: ICourseData): ICourseDataDB {
  const { introImageSrc, ...courseRest } = course;

  return {
    ...courseRest,
    cardImage: cardImageFR2DB(course.cardImage),
    startDate: dateFR2DB(course.startDate),
    endDate: dateFR2DB(course.endDate),
    accessDeadline: dateFR2DB(course.accessDeadline),
    discontDeadline: course.discontDeadline ? dateFR2DB(course.discontDeadline) : null,
    modules: courseModulesFR2DB(course.modules),
    explainMedia: courseExplainMediaFR2DB(course.explainMedia),
    teacherGallery: courseTeacherGallerysFR2DB(course.teacherGallery),
    studentResults: studentResultsFR2DB(course.studentResults),
    studentsWorks: courseStudentsWorksFR2DB(course.studentsWorks),
    studyProcess: courseStudyProcessFR2DB(course.studyProcess),
  };
};

// modules
function courseModulesFR2DB(modules: ICourseData['modules']): ICourseDataDB['modules'] {
  if (!modules) {
    return modules;
  }

  return modules.map(m => courseModuleFR2DB(m));
}

function courseModuleFR2DB(module: NonNullable<ICourseData['modules']>[number]): NonNullable<ICourseDataDB['modules']>[number] {
  const { imageSrc, ...restModule } = module;
  return restModule;
}

function courseExplainMediaFR2DB(explainMedia: ICourseData['explainMedia']): ICourseDataDB['explainMedia'] {
  if (!explainMedia) {
    return explainMedia;
  }

  if (explainMedia.type === 'video') {
    return explainMedia;
  }

  const { imageSrc, ...restExplainMedia } = explainMedia;
  return restExplainMedia;
}

// teacherGallery
function courseTeacherGallerysFR2DB(teacherGallerys: ICourseData['teacherGallery']): ICourseDataDB['teacherGallery'] {
  if (!teacherGallerys) {
    return teacherGallerys;
  }

  return teacherGallerys.map(tg => courseTeacherGalleryFR2DB(tg));
}

function courseTeacherGalleryFR2DB(teacherGallery: NonNullable<ICourseData['teacherGallery']>[number]): NonNullable<ICourseDataDB['teacherGallery']>[number] {
  const { imageSrc, ...restTeacherGallery } = teacherGallery;
  return restTeacherGallery;
}

// studentResults
function studentResultsFR2DB(studentResults: ICourseData['studentResults']): ICourseDataDB['studentResults'] {
  if (!studentResults) {
    return studentResults;
  }

  const { imageSrc, ...restStudentResults } = studentResults;
  return restStudentResults;
}

// studentsWorks
function courseStudentsWorksFR2DB(studentsWorks: ICourseData['studentsWorks']): ICourseDataDB['studentsWorks'] {
  if (!studentsWorks) {
    return studentsWorks;
  }

  return studentsWorks.map(courseStudentsWorkFR2DB);
}

function courseStudentsWorkFR2DB(studentsWork: NonNullable<ICourseData['studentsWorks']>[number]): NonNullable<ICourseDataDB['studentsWorks']>[number] {
  const { imageSrc, ...restStudentWork } = studentsWork;
  return restStudentWork;
}

// studyProcess
function courseStudyProcessFR2DB(studyProcess: ICourseData['studyProcess']): ICourseDataDB['studyProcess'] {
  if (!studyProcess) {
    return studyProcess;
  }
  return studyProcess.map(courseStudyProcessItemFR2DB);
}

function courseStudyProcessItemFR2DB(studyProcessItem: NonNullable<ICourseData['studyProcess']>[number]): NonNullable<ICourseDataDB['studyProcess']>[number] {
  if ('imageSrc' in studyProcessItem) {
    const { imageSrc, ...restStudyProcessItem } = studyProcessItem;
    return restStudyProcessItem;
  }

  return studyProcessItem;
}

function cardImageFR2DB(cardImage: ICourseData['cardImage']): ICourseDataDB['cardImage'] {
  if (cardImage && 'imageSrc' in cardImage) {
    const { imageSrc, ...restStudyProcessItem } = cardImage;
    return restStudyProcessItem;
  }

  return cardImage;
}
