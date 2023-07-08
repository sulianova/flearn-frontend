import { URLSections, TRouteConfig } from 'types';

import My from './My';

const routes: TRouteConfig[] = [
    {
        element: <My mode='Profile'/>,
        path: URLSections.My.Profile.index,
    },
    {
        element: <My mode='Settings'/>,
        path: URLSections.My.Settings.index,
    },
];

export default routes;
