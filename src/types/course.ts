export interface ICourseData {
  startDate: Date
  durationWeeks: number
  feild: 'Иллюстрация' | 'Adobe'
  title: string
  description: string
  discontAmount: number
  discontDeadline: Date
}

export interface ILessonData {
  type: 'Theory' | 'Practice'
}
