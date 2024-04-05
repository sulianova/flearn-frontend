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
    teachers: courseTeachersFR2DB(course.teachers),
    teacherGallery: courseTeacherGallerysFR2DB(course.teacherGallery),
    studentResults: studentResultsFR2DB(course.studentResults),
    studentsWorks: courseStudentsWorksFR2DB(course.studentsWorks),
    studyProcess: courseStudyProcessFR2DB(course.studyProcess),
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
  return studentsWorks.map(courseStudentsWorkFR2DB);
}

function courseStudentsWorkFR2DB(studentsWork: ICourseData['studentsWorks'][number]): ICourseDataDB['studentsWorks'][number] {
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
