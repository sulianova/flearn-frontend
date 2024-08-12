import { lessonService } from 'services/lesson.service';
import type { ICourseData } from './types';

export async function getCourseMeta(id: string) {
  const lessons = await lessonService.fetch({ courseId: id });
  const lessonsDurationMinutes = lessons.reduce((acc, l) => acc + l.duration.value * (l.duration.unit === 'hours' ? 60 : 1), 0);
  const metaData: ICourseData['metaData'] = {
    lessonsAmount: lessons.length,
    lessonsDuration: {
      unit: lessonsDurationMinutes >= 60 ? 'hour' : 'minute',
      value: Math.round(lessonsDurationMinutes / (lessonsDurationMinutes >= 60 ? 60 : 1)),
    },
  };
  return metaData;
}
