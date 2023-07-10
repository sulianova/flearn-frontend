import { URLSections } from 'routes';
import { TRouteConfig } from 'types';

import Homework from './Lesson/Homework';
import Lesson from './Lesson/Lesson';
import Lessons from './Lessons/Lessons';

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
