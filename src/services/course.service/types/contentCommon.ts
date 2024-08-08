import { TIcon } from 'ui/Icon/Icon'
import { TText } from 'ui/Text/types'

export interface ICourseAbout {
  text: TText
  icon: TIcon
}

export interface ICourseDescription {
  question: string
  answer: string
}

export interface ICoursePrize {
  title: TText
  content?: TText
}

export interface ICourseModule {
  meta: TText
  title: TText
  homeworksNumber?: number
  lessonsNumber: number
  duration: {
    unit: 'hour'
    value: number
  }
  tags?: string[]
  description?: TText
  subsectionDescription?: string
  subsection?: Array<{ subsectionTitle?: string, subsectionText?: TText }>
}

export interface ICoursePromoVideo {
  title: string
  src: string
}

export interface ICourseFaqItem {
  question: TText
  answer: TText
}

export interface ICourseFeedback {
  author: {
    name: string
    description?: string
  }
  quote: TText
  excerpt?: string
}
