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
    Work = 'work',
    WorkProfile = 'work-profile',
    MyProfile = 'my-profile',
    MySettings = 'my-settings',
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
    Work = '/work',
    WorkProfile = '/work-profile',
    MyProfile = '/my/profile',
    MySettings = '/my/settings',
}

export type TRouteConfig = RouteObject & {
    section: EAppSections
    path: EURLSection
};
