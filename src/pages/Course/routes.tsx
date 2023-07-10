import { URLSections, TRouteConfig } from 'types';

import Lessons from './Lessons/Lessons';
import Lesson from './Lesson/Lesson';
import Homework from './Lesson/Homework';

const routes: TRouteConfig[] = [
    {
        element: <Lesson/>,
        path: URLSections.Course.Lesson.index,
    },
    {
        element: <Homework/>,
        path: URLSections.Course.Homework.index,
    },
    {
        element: <Lessons/>,
        path: URLSections.Course.Lessons.index,
    },
];

export default routes;
