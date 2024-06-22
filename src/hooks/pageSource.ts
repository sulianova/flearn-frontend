import { useEffect } from 'react';
import { useParams } from 'react-router';
import type CourseService from 'services/course.service';
import type LessonService from 'services/lesson.service';
import type UserService from 'services/user.service';
import type UserCourseProgressService from 'services/userCourseProgress.service';

const courseService = require('services/course.service').courseService as InstanceType<typeof CourseService>;
const lessonService = require('services/lesson.service').lessonService as InstanceType<typeof LessonService>;
const userService = require('services/user.service').userService as InstanceType<typeof UserService>;
const userCourseProgressService = require('services/userCourseProgress.service').userCourseProgressService as InstanceType<typeof UserCourseProgressService>;

export function usePageSource() {
  const { courseId, lessonId } = useParams();
  const user = userService.useAuthedUser();
  const currentCourse = courseService.useCourses({ ids: [courseId ?? ''] }).at(0);
  const userCourses = courseService.useCourses({ userId: user?.id });
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
