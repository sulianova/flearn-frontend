import { RouteObject } from 'react-router-dom';

import type { TGetObjectValues } from 'utils';

interface IBaseProps {
  params?: Record<string, any>
  full?: boolean 
}

export const URLSections = {
  Home: { index: '/' },
  Course: {
    index: '/course/:courseId',
    to: (props: { courseId: string } & IBaseProps) =>
      assemble({ ...props, path: `/course/${props.courseId}` }),
  },
  Profile: {
    index: '/profile/:courseId',
    to: (props: { courseId: string } & IBaseProps) =>
      assemble({ ...props, path: `/profile/${props.courseId}` }),
  },
  EmptyProfile: {
    index: '/profile',
  },
  Study: {
    index: '/study/:courseId/:lessonId',
    to: (props: { courseId: string, lessonId: string } & IBaseProps) =>
      assemble({ ...props, path: `/study/${props.courseId}/${props.lessonId}` }),
      Results: {
        index: '/study/:courseId/:lessonId/results',
        to: (props: { courseId: string, lessonId: string } & IBaseProps) =>
          assemble({ ...props, path: `/study/${props.courseId}/${props.lessonId}/results` }),
      },
  },
  Static: {
    Policy: { index: '/policy' },
    Oferta: { index: '/oferta' },
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
