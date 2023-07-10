import { EAppSections, EURLSection, TRouteConfig } from 'types';

import Catalogue from 'pages/Catalogue';
import Course from 'pages/Course/Landing/Course';
import Homework from 'pages/Course/Lesson/Homework';
import Lesson from 'pages/Course/Lesson/Lesson';
import Lessons from 'pages/Course/Lessons/Lessons';
import FreeZone from 'pages/FreeZone';
import My from 'pages/My/My';

const routes: TRouteConfig[] = [
    {
        section: EAppSections.Catalogue,
        element: <Catalogue/>,
        path: EURLSection.Catalogue,
    },
    {
        section: EAppSections.Course,
        element: <Course/>,
        path: EURLSection.Course,
    },
    {
        section: EAppSections.Lessons,
        element: <Lessons/>,
        path: EURLSection.Lessons,
    },
    {
        section: EAppSections.Lesson,
        element: <Lesson/>,
        path: EURLSection.Lesson,
    },
    {
        section: EAppSections.Homework,
        element: <Homework/>,
        path: EURLSection.Homework,
    },
    {
        section: EAppSections.FreeZone,
        element: <FreeZone/>,
        path: EURLSection.FreeZone,
    },
    {
        section: EAppSections.MyProfile,
        element: <My mode='Profile'/>,
        path: EURLSection.MyProfile,
    },
    {
        section: EAppSections.MySettings,
        element: <My mode='Settings'/>,
        path: EURLSection.MySettings,
    },
];

export default routes;
