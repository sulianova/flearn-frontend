import { RouteObject } from 'react-router-dom';

export const URLSections = {
    FreeZone: { index: '/' },
    Catalogue: { index: '/catalogue' },
    Course: {
        index: '/course/:courseId',
        to: ({ courseId }: { courseId: string }) => `/course/${courseId}`,
        Lessons: {
            index: '/course/:courseId/lessons',
            to: ({ courseId }: { courseId: string }) => `/course/${courseId}/lessons`,
        },
        Lesson: {
            index: '/course/:courseId/lesson/:lessonId',
            to: ({ courseId, lessonId }: { courseId: string, lessonId: string }) => `/course/${courseId}/lesson/${lessonId}`,
            Results: {
                index: '/course/:courseId/lesson/:lessonId/results',
                to: ({ courseId, lessonId }: { courseId: string, lessonId: string }) => `/course/${courseId}/lesson/${lessonId}/results`,
            },
        },
    },
    My: {
        index: '/my',
        Profile: { index: '/my/profile' },
        Settings: { index: '/my/settings' },
    },
    Static: {
        Policy: { index: '/policy' },
        Oferta: { index: '/oferta' },
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
