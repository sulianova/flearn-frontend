import { RouteObject } from 'react-router-dom';

export const URLSections = {
    FreeZone: { index: '/' },
    Catalogue: { index: '/catalogue' },
    Course: {
        index: '/course/:courseId',
        Lessons: { index: '/course/:courseId/lessons' },
        Lesson: { index: '/course/:courseId/lesson/:lessonId' },
        Homework: { index: '/course/:courseId/homework/:homeworkId' },
    },
    My: {
        index: '/my',
        Profile: { index: '/my/profile' },
        Settings: { index: '/my/settings' },
    },
} as const;

type TGetObjectValues<T extends {}, Keys extends keyof T = keyof T> =
    Keys extends Keys ?
        T[Keys] extends string ?
            T[Keys]
        : T[Keys] extends {} ? TGetObjectValues<T[Keys]> : never
    : never;

export type TURLs = TGetObjectValues<typeof URLSections>;

export type TRouteConfig = RouteObject & {
    path: TURLs
    children?: TRouteConfig[]
};
