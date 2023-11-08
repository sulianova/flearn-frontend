import { RouteObject } from 'react-router-dom';

export const URLSections = {
    FreeZone: { index: '/' },
    Catalogue: { index: '/catalogue' },
    Course: {
        index: '/course/:courseId',
        to: (props: { courseId: string, params?: Record<string, any> }) => `/course/${props.courseId}${getSearchQuery(props.params)}`,
        Lessons: {
            index: '/course/:courseId/lessons',
            to: (props: { courseId: string, params?: Record<string, any> }) => `/course/${props.courseId}/lessons${getSearchQuery(props.params)}`,
        },
        Lesson: {
            index: '/course/:courseId/lesson/:lessonId',
            to: (props: { courseId: string, lessonId: string, params?: Record<string, any> }) => `/course/${props.courseId}/lesson/${props.lessonId}${getSearchQuery(props.params)}`,
            Results: {
                index: '/course/:courseId/lesson/:lessonId/results',
                to: (props: { courseId: string, lessonId: string, params?: Record<string, any> }) => `/course/${props.courseId}/lesson/${props.lessonId}/results${getSearchQuery(props.params)}`,
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

function getSearchQuery(params?: Record<string, any>) {
    if (!params) {
        return '';
    }

    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (
            value === undefined ||
            value === '' ||
            (Array.isArray(value) && value.length === 0)
        ) {
            return;
        }

        if (typeof value === 'object') {
            try {
                value = JSON.stringify(value);
            } catch (error) {
                console.error('Got error while stringifing URL search param', { error, value, key })
            }
        }

        searchParams.set(key, value);
    });

    const q = searchParams.toString();
    return q.length ? `?${q}` : '';
}
