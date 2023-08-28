import { TRouteConfig, URLSections } from 'types';

import Lesson from './Lesson/Lesson';
import Lessons from './Lessons/Lessons';

const routes: TRouteConfig[] = [
    {
        element: <Lessons/>,
        path: URLSections.Course.Lessons.index,
    },
    {
        element: <Lesson practice='task'/>,
        path: URLSections.Course.Lesson.index,
    },
    {
        element: <Lesson practice='results'/>,
        path: URLSections.Course.Lesson.Results.index,
    },
];

export default routes;
