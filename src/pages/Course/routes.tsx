import { TRouteConfig, URLSections } from 'types';

import Lesson from './Lesson/Lesson';
import Lessons from './Lessons/Lessons';

const routes: TRouteConfig[] = [
    {
        element: <Lesson/>,
        path: URLSections.Course.Lesson.index,
    },
    {
        element: <Lessons/>,
        path: URLSections.Course.Lessons.index,
    },
];

export default routes;
