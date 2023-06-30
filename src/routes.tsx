import { EAppSections, EURLSection, TRouteConfig } from 'types';

import Catalogue from 'pages/Catalogue';
import Course from 'pages/Course/Course';
import FreeZone from 'pages/FreeZone';
import Profile from 'pages/Profile';

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
        section: EAppSections.FreeZone,
        element: <FreeZone/>,
        path: EURLSection.FreeZone,
    },
    {
        section: EAppSections.Profile,
        element: <Profile/>,
        path: EURLSection.Profile,
    },
];

export default routes;
