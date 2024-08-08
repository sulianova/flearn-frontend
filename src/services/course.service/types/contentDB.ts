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

export type TImageDataDB = {
  imageId: string
  imageAlt: string
}

export type TImageDataAdjustableDB = {
  imageId: string | { desktop: string, mobile: string }
  imageAlt: string
}

export type TCourseExplainMediaDB = 
  | ({ type: 'image' } & TImageDataDB)
  | { type: 'video', title: string, src: string };

export type TCourseStudentResultDB = { content: TText } & TImageDataAdjustableDB;

export type TCourseStudyProcessItemDB = AddOptionalObject<{ caption?: TText, title: TText, description: TText }, TImageDataAdjustableDB>;

export interface ICourseDataContentDB {
  about?: ICourseAbout[]
  description?: ICourseDescription[]
  prizes?: ICoursePrize[]
  modules?: ICourseModule[]
  explainMedia?: TCourseExplainMediaDB
  promoVideo?: ICoursePromoVideo
  teacherGallery?: TImageDataDB[]
  studentResults?: TCourseStudentResultDB
  studentsWorks?: TImageDataDB[]
  faq?: ICourseFaqItem[]
  feedbacks?: ICourseFeedback[]
  studyProcess?: TCourseStudyProcessItemDB[]
}
