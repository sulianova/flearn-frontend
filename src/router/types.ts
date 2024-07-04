import { URLSections } from './utils';

export type ParamsToSectionMap = {
  [Key in Exclude<keyof typeof URLSections, 'Static'>]: NonNullable<ReturnType<typeof URLSections[Key]['getParams']>>
} & {
  'Other': {}
};

export type TURLSection = keyof ParamsToSectionMap;
