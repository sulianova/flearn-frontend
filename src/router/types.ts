import type { Entries } from 'utils';
import type { URLSections } from './utils';

export type ParamsToSectionMap = {
  [Key in Exclude<keyof typeof URLSections, 'Static'>]: NonNullable<ReturnType<typeof URLSections[Key]['getParams']>>
} & {
  'Other': {}
};

export type TURLSection = keyof ParamsToSectionMap;

export type TURLSectionObj<T = Entries<ParamsToSectionMap>[number]> =
  T extends [infer SectionName, infer SectionParams]
    ? { name: SectionName, params: SectionParams }
  : never;
