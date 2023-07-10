import { RouteObject } from 'react-router-dom';
import { URLSections } from 'routes';

type TGetObjectValues<T extends {}, Keys extends keyof T = keyof T> =
    Keys extends Keys ?
        T[Keys] extends string ?
            T[Keys]
        : T[Keys] extends {} ? TGetObjectValues<T[Keys]> : never
    : never;

export type TURLs = TGetObjectValues<typeof URLSections>;

export type TRouteConfig = RouteObject & {
    path: TURLs
    children?: TRouteConfig[]
};
