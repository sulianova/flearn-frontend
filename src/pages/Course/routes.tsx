import { URLSections, TRouteConfig } from 'types';

import Lessons from './Lessons/Lessons';
import Lesson from './Lesson/Lesson';

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
