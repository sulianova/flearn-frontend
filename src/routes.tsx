import { TRouteConfig } from 'types';

import Catalogue from 'pages/Catalogue';
import Course from 'pages/Course/Landing/Course';
import SubRoutesCourse from 'pages/Course/routes';
import FreeZone from 'pages/FreeZone';
import SubRoutesMy from 'pages/My/routes';

import { URLSections } from 'types';

const routes: TRouteConfig[] = [
    {
        element: <Catalogue/>,
        path: URLSections.Catalogue.index,
    },
    {
        element: <Course/>,
        path: URLSections.Course.index,
        // children: SubRoutesCourse,
    },
    ...SubRoutesCourse,
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
