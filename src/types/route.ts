import { RouteObject } from 'react-router-dom';

export const URLSections = {
    FreeZone: { index: '/' },
    Catalogue: { index: '/catalogue' },
    Course: {
        index: '/course',
        Lessons: { index: '/course/lessons' },
        Lesson: { index: '/course/lesson' },
        Homework: { index: '/course/homework' },
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
