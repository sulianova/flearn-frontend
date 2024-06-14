import { dateFR2DB } from '../shared';

import type { ICourseData, ICourseDataContent, ICourseDataContentDB, ICourseDataDB, ICourseProductOption, ICourseProductOptionDB } from 'services/course.service';

export function courseDataFR2DB(course: ICourseData): ICourseDataDB {
  return {
    ...course,
    introImage: courseIntoImageFR2DB(course.introImage),
    cardImage: cardImageFR2DB(course.cardImage),
    startDate: dateFR2DB(course.startDate),
    endDate: dateFR2DB(course.endDate),
    accessDeadline: dateFR2DB(course.accessDeadline),
    discount: courseDiscountFR2DB(course.discount),
    productOptions: courseProductOptionsFR2DB(course.productOptions),
    content: {
      ...course.content,
      explainMedia: courseExplainMediaFR2DB(course.content.explainMedia),
      teacherGallery: courseTeacherGallerysFR2DB(course.content.teacherGallery),
      studentResults: courseStudentResultsFR2DB(course.content.studentResults),
      studentsWorks: courseStudentsWorksFR2DB(course.content.studentsWorks),
      studyProcess: courseStudyProcessFR2DB(course.content.studyProcess),
    },
  };
};

function courseIntoImageFR2DB(introImage: ICourseData['introImage']): ICourseDataDB['introImage'] {
  const { imageSrc, ...restIntroImage } = introImage;
  return restIntroImage;
}

function cardImageFR2DB(cardImage: ICourseData['cardImage']): ICourseDataDB['cardImage'] {
  if (cardImage && 'imageSrc' in cardImage) {
    const { imageSrc, ...restStudyProcessItem } = cardImage;
    return restStudyProcessItem;
  }

  return cardImage;
}

function courseDiscountFR2DB(discount: ICourseData['discount']): ICourseDataDB['discount'] {
  if (!discount) {
    return discount;
  }
  const { amountPrc, deadline } = discount;
  return {
    amountPrc,
    ...deadline && { deadline: dateFR2DB(deadline) },
  }
}

function courseProductOptionsFR2DB(productOptions: ICourseData['productOptions']): ICourseDataDB['productOptions'] {
  return {
    BASE: courseProductOptionFR2DB(productOptions.BASE),
    OPTIMAL: courseProductOptionFR2DB(productOptions.OPTIMAL),
    ...productOptions.EXTENDED && { EXTENDED: courseProductOptionFR2DB(productOptions.EXTENDED) },
  };

  function courseProductOptionFR2DB(productOption: ICourseProductOption): ICourseProductOptionDB {
    const { price, description, discount } = productOption;
    if (!discount) {
      return { price, description };
    }

    const { amountPrc, deadline } = discount;
    return {
      price,
      description,
      discount: {
        amountPrc,
        ...deadline && { deadline: dateFR2DB(deadline) },
      },
    };
  }
}

// content
function courseExplainMediaFR2DB(explainMedia: ICourseDataContent['explainMedia']): ICourseDataContentDB['explainMedia'] {
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
function courseTeacherGallerysFR2DB(teacherGallerys: ICourseDataContent['teacherGallery']): ICourseDataContentDB['teacherGallery'] {
  if (!teacherGallerys) {
    return teacherGallerys;
  }

  return teacherGallerys.map(({ imageSrc, ...rest }) => rest);
}

// studentResults
function courseStudentResultsFR2DB(studentResults: ICourseDataContent['studentResults']): ICourseDataContentDB['studentResults'] {
  if (!studentResults) {
    return studentResults;
  }

  const { imageSrc, ...restStudentResults } = studentResults;
  return restStudentResults;
}

// studentsWorks
function courseStudentsWorksFR2DB(studentsWorks: ICourseDataContent['studentsWorks']): ICourseDataContentDB['studentsWorks'] {
  if (!studentsWorks) {
    return studentsWorks;
  }

  return studentsWorks.map(({ imageSrc, ...rest }) => rest);
}

// studyProcess
function courseStudyProcessFR2DB(studyProcess: ICourseDataContent['studyProcess']): ICourseDataContentDB['studyProcess'] {
  if (!studyProcess) {
    return studyProcess;
  }
  return studyProcess.map(itemFR2DB);

  function itemFR2DB(studyProcessItem: NonNullable<ICourseDataContent['studyProcess']>[number]): NonNullable<ICourseDataContentDB['studyProcess']>[number] {
    if ('imageSrc' in studyProcessItem) {
      const { imageSrc, ...restStudyProcessItem } = studyProcessItem;
      return restStudyProcessItem;
    }
  
    return studyProcessItem;
  }
}
