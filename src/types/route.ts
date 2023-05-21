import { RouteObject } from 'react-router-dom';

export enum EAppSections {
    Catalogue = 'catalogue',
    Course = 'course',
    FreeZone = 'free-zone',
    Homework = 'homework',
    HomeworkEditor = 'homework-editor',
    Lesson = 'lesson',
    Lessons = 'lessons',
    LessonWorkProfile = 'lesson-work-profile',
    Profile = 'profile',
    Work = 'work',
    WorkProfile = 'work-profile',
}

export enum EURLSection {
    Catalogue = '/catalogue',
    Course = '/course',
    FreeZone = '/',
    Homework = '/homework',
    HomeworkEditor = '/homework-editor',
    Lesson = '/lesson',
    Lessons = '/lessons',
    LessonWorkProfile = '/lesson-work-profile',
    Profile = '/profile',
    Work = '/work',
    WorkProfile = '/work-profile',
}

export type TRouteConfig = RouteObject & {
    section: EAppSections
    path: EURLSection
};
