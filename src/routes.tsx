import { TRouteConfig } from 'types';

import Catalogue from 'pages/Catalogue';
import Course from 'pages/Course/Landing/Course';
import SubRoutesCourse from 'pages/Course/routes';
import FreeZone from 'pages/FreeZone';
import SubRoutesMy from 'pages/My/routes';

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

const routes: TRouteConfig[] = [
    {
        element: <Catalogue/>,
        path: URLSections.Catalogue.index,
    },
    {
        element: <Course/>,
        path: URLSections.Course.index,
        children: SubRoutesCourse,
    },
    {
        element: <FreeZone/>,
        path: URLSections.FreeZone.index,
    },
    {
        path: URLSections.My.index,
        children: SubRoutesMy,
    },
];

export default routes;
