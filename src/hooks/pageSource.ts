import { useParams } from 'react-router';
import type CourseService from 'services/course.service';
import type LessonService from 'services/lesson.service';
import type UserCourseProgressService from 'services/userCourseProgress.service';

const courseService = require('services/course.service').courseService as InstanceType<typeof CourseService>;
const lessonService = require('services/lesson.service').lessonService as InstanceType<typeof LessonService>;
const userCourseProgressService = require('services/userCourseProgress.service').userCourseProgressService as InstanceType<typeof UserCourseProgressService>;

export function usePageSource() {
  const { courseId, lessonId } = useParams();
  const currentCourse = courseService.useCurrentCourse()
  const userCourses = courseService.useUserCourses() ?? [];
  const firstNotSolvedLesson = userCourseProgressService.useFirstNotSolvedLesson();
  const currentLesson = lessonService.useLessons({ courseId, id: lessonId }).at(0);
  const topicLessons = lessonService.useTopicLessons({ courseId, lessonId });

  return {
    currentCourse,
    userCourses,
    firstNotSolvedLesson,
    currentLesson,
    topicLessons,
  };
}
