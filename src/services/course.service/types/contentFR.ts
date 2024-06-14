import type { AddOptionalObject } from 'types';
import type { TText } from 'ui/Text/types';

import type {
  ICourseAbout,
  ICourseDescription,
  ICourseFaqItem,
  ICourseFeedback,
  ICourseModule,
  ICoursePrize,
  ICoursePromoVideo
} from './contentCommon';

export type TImageData = {
  imageId: string
  imageSrc: string
  imageAlt: string
}

export type TImageDataAdjustable = (
  {
    imageId: string
    imageSrc: string
  } |
  {
    imageId: { desktop: string, mobile: string }
    imageSrc: { desktop: string, mobile: string }
  }
) & {
  imageAlt: string
}

export type TCourseExplainMedia = 
  | ({ type: 'image' } & TImageData)
  | { type: 'video', title: string, src: string };

export type TCourseStudentResult = { content: TText } & TImageDataAdjustable;

export type TCourseStudyProcessItem = AddOptionalObject<{ caption?: TText, title: TText, description: TText }, TImageDataAdjustable>;

export interface ICourseDataContent {
  about?: ICourseAbout[]
  description?: ICourseDescription[]
  prizes?: ICoursePrize[]
  modules?: ICourseModule[]
  explainMedia?: TCourseExplainMedia
  promoVideo?: ICoursePromoVideo
  teacherGallery?: TImageData[]
  studentResults?: TCourseStudentResult
  studentsWorks?: TImageData[]
  faq?: ICourseFaqItem[]
  feedbacks?: ICourseFeedback[]
  studyProcess?: TCourseStudyProcessItem[]
}
