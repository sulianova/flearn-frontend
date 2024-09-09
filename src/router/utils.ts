import { RouteObject } from 'react-router-dom';

import type { TGetObjectValues } from 'utils';

interface IBaseProps {
  params?: Record<string, any>
  full?: boolean 
}

export const URLSections = {
  Home: {
    index: '/',
    to: () => '/',
    regex: /^\/$/,
    getParams: (_pathname: string) => ({}),
  },
  Landing: {
    index: '/landing/:courseId',
    to: (props: { courseId: string } & IBaseProps) =>
      assemble({ ...props, path: `/landing/${props.courseId}` }),
    regex: /^\/landing\/([^\/]+)$/,
    getParams(pathname: string) {
      const res = this.regex.exec(pathname);
      return !res
        ? null
        : {
          courseId: res[1],
        };
    },
  },
  Courses: {
    index: '/courses',
    to: () => '/courses',
    regex: /^\/courses$/,
    getParams: (_pathname: string) => ({}),
  },
  Course: {
    index: '/courses/:courseId',
    to: (props: { courseId: string } & IBaseProps) =>
      assemble({ ...props, path: `/courses/${props.courseId}` }),
    regex: /^\/courses\/([^\/]+)$/,
    getParams(pathname: string) {
      const res = this.regex.exec(pathname);
      return !res
        ? null
        : {
          courseId: res[1],
        };
    },
  },
  Profile: {
    index: '/profile/:courseId',
    to: (props: { courseId: string } & IBaseProps) =>
      assemble({ ...props, path: `/profile/${props.courseId}` }),
    regex: /^\/profile\/([^\/]+)$/,
    getParams(pathname: string) {
      const res = this.regex.exec(pathname);
      return !res
        ? null
        : {
          courseId: res[1],
        };
    },
  },
  EmptyProfile: {
    index: '/profile',
    to: () => '/profile',
    regex: /^\/profile$/,
    getParams: (_pathname: string) => ({}),
  },
  Study: {
    index: '/study/:courseId/:lessonId',
    to: (props: { courseId: string, lessonId: string } & IBaseProps) =>
      assemble({ ...props, path: `/study/${props.courseId}/${props.lessonId}` }),
    regex: /^\/study\/([^\/]+)\/([^\/]+)$/,
    getParams(pathname: string) {
      const res = this.regex.exec(pathname);
      return !res
        ? null
        : {
          courseId: res[1],
          lessonId: res[2],
        };
    },

    Results: {
      index: '/study/:courseId/:lessonId/results',
      to: (props: { courseId: string, lessonId: string } & IBaseProps) =>
        assemble({ ...props, path: `/study/${props.courseId}/${props.lessonId}/results` }),
      regex: /^\/study\/([^\/]+)\/([^\/]+)\/results$/,
      getParams(pathname: string) {
        const res = this.regex.exec(pathname);
        return !res
          ? null
          : {
            courseId: res[1],
            lessonId: res[2],
          };
      },
    },
  },
  Static: {
    Policy: { index: '/policy' },
    Oferta: { index: '/oferta' },
    Unsubscribe: {
      index: '/unsubscribe',
      to: (props: IBaseProps) => assemble({ ...props, path: `/unsubscribe` }),
    },
    TikTokLogin: {
      index: '/tiktokLogin',
      to: (props: IBaseProps) => assemble({ ...props, path: `/tiktokLogin` }),
    },
  },
} as const;

function assemble(props: {
  path: string,
  params?: Record<string, any>,
  full?: boolean,
}) {
  return [
    props.full ? window.location.origin : '',
    props.path,
    getSearchQuery(props.params),
  ].join('');
}

export type TRouteConfig = RouteObject & {
  path: TGetObjectValues<typeof URLSections>
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
