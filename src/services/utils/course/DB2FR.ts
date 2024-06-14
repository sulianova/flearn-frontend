import type { ICourseData, ICourseDataContent, ICourseDataContentDB, ICourseDataDB, ICourseProductOption, ICourseProductOptionDB, TCourseStudyProcessItem, TCourseStudyProcessItemDB, TImageData, TImageDataDB } from 'services/course.service';
import { firebaseService } from 'services/firebase.service';

import { dateDB2FR } from '../shared';

export async function courseDataDB2FR(courseDB: ICourseDataDB): Promise<ICourseData> {
  const courseId = courseDB.id;

  try {
    return {
      ...courseDB,
      introImage: await courseIntoImageDB2FR(courseDB.introImage, courseId),
      cardImage: await cardImageDB2FR(courseDB.cardImage, courseId),
      startDate: dateDB2FR(courseDB.startDate),
      endDate: dateDB2FR(courseDB.endDate),
      accessDeadline: dateDB2FR(courseDB.accessDeadline),
      discount: courseDiscountDB2FR(courseDB.discount),
      productOptions: courseProductOptionsDB2FR(courseDB.productOptions),
      content: {
        ...courseDB.content,
        explainMedia: await courseExplainMediaDB2FR(courseDB.content.explainMedia, courseId),
        teacherGallery: await courseTeacherGallerysDB2FR(courseDB.content.teacherGallery, courseId),
        studentResults: await studentResultsDB2FR(courseDB.content.studentResults, courseId),
        studentsWorks: await courseStudentsWorksDB2FR(courseDB.content.studentsWorks, courseId),
        studyProcess: await courseStudyProcessDB2FR(courseDB.content.studyProcess, courseId),
      }
    };
  } catch (error) {
    console.log('Failed to translate course from DB to FR', { courseDB });
    throw error;
  }
};

// intro image
async function courseIntoImageDB2FR(introImage: ICourseDataDB['introImage'], courseId: string): Promise<ICourseData['introImage']> {
  const imageSrc = typeof introImage.imageId === 'string' ?
    (await firebaseService.getImageURL({ courseId, folder: 'landing', imageId: introImage.imageId })) ?? ''
    : {
      desktop: (await firebaseService.getImageURL({ courseId, folder: 'landing', imageId: introImage.imageId.desktop })) ?? '',
      mobile: (await firebaseService.getImageURL({ courseId, folder: 'landing', imageId: introImage.imageId.mobile })) ?? '',
    };

  return {
    ...introImage,
    imageSrc: imageSrc,
  } as ICourseData['introImage'];
}

async function cardImageDB2FR(cardImageData: ICourseDataDB['cardImage'], courseId: string): Promise<ICourseData['cardImage']> {
  if (!cardImageData) {
    return undefined;
  }

  const imageSrc = typeof cardImageData.imageId === 'string' ?
    (await firebaseService.getImageURL({ courseId, folder: 'landing', imageId: cardImageData.imageId })) ?? ''
    : {
      desktop: (await firebaseService.getImageURL({ courseId, folder: 'landing', imageId: cardImageData.imageId.desktop })) ?? '',
      mobile: (await firebaseService.getImageURL({ courseId, folder: 'landing', imageId: cardImageData.imageId.mobile })) ?? '',
    };

  return {
    ...cardImageData,
    imageSrc: imageSrc
  } as ICourseData['cardImage'];
}

function courseDiscountDB2FR(discount: ICourseDataDB['discount']): ICourseData['discount'] {
  if (!discount) {
    return discount;
  }
  const { amountPrc, deadline } = discount;
  return {
    amountPrc,
    ...deadline && { deadline: dateDB2FR(deadline) },
  }
}

function courseProductOptionsDB2FR(productOptions: ICourseDataDB['productOptions']): ICourseData['productOptions'] {
  return {
    BASE: courseProductOptionDB2FR(productOptions.BASE),
    OPTIMAL: courseProductOptionDB2FR(productOptions.OPTIMAL),
    ...productOptions.EXTENDED && { EXTENDED: courseProductOptionDB2FR(productOptions.EXTENDED) },
  };

  function courseProductOptionDB2FR(productOption: ICourseProductOptionDB): ICourseProductOption {
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
        ...deadline && { deadline: dateDB2FR(deadline) },
      },
    };
  }
}

// CONTENT
async function courseExplainMediaDB2FR(explainMedia: ICourseDataContentDB['explainMedia'], courseId: string): Promise<ICourseDataContent['explainMedia']> {
  if (!explainMedia) {
    return explainMedia;
  }

  if (explainMedia.type === 'video') {
    return explainMedia;
  }

  return {
    ...explainMedia,
    imageSrc: (await firebaseService.getImageURL({ courseId, folder: 'landing', imageId: explainMedia.imageId })) ?? '',
  };
}

async function courseTeacherGallerysDB2FR(teacherGallerys: ICourseDataContentDB['teacherGallery'], courseId: string): Promise<ICourseDataContent['teacherGallery']> {
  if (!teacherGallerys) {
    return teacherGallerys;
  }

  return await Promise.all(teacherGallerys.map(tg => itemDB2FR(tg, courseId)));

  async function itemDB2FR(teacherGallery: TImageDataDB, courseId: string): Promise<TImageData> {
    return {
      ...teacherGallery,
      imageSrc: (await firebaseService.getImageURL({ courseId, folder: 'landing', imageId: teacherGallery.imageId })) ?? '',
    };
  }
}

async function studentResultsDB2FR(studentResults: ICourseDataContentDB['studentResults'], courseId: string): Promise<ICourseDataContent['studentResults']> {
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
  } as ICourseDataContent['studentResults'];
}

async function courseStudentsWorksDB2FR(studentsWorks: ICourseDataContentDB['studentsWorks'], courseId: string): Promise<ICourseDataContent['studentsWorks']> {
  if (!studentsWorks) {
    return studentsWorks;
  }

  return await Promise.all(studentsWorks.map(sw => itemDB2FR(sw, courseId)));

  async function itemDB2FR(studentsWork: TImageDataDB, courseId: string): Promise<TImageData> {
    return {
      ...studentsWork,
      imageSrc: (await firebaseService.getImageURL({ courseId, folder: 'landing', imageId: studentsWork.imageId })) ?? '',
    };
  }
}

async function courseStudyProcessDB2FR(studyProcess: ICourseDataContentDB['studyProcess'], courseId: string): Promise<ICourseDataContent['studyProcess']> {
  if (!studyProcess) {
    return undefined;
  }
  return await Promise.all(studyProcess.map(spi => itemDB2FR(spi, courseId)));

  async function itemDB2FR(studyProcessItem: TCourseStudyProcessItemDB, courseId: string): Promise<TCourseStudyProcessItem> {
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
      } as TCourseStudyProcessItem;
    }
  
    return studyProcessItem;
  }
}
