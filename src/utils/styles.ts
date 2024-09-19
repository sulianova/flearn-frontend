import classNames from 'classnames/bind';

export type TCx<TClassesNames extends string> = (a: { [key in TClassesNames]?: boolean }, b?: string) => string;
export type TClasses<TClassesNames extends string> = { [key in TClassesNames]: string };
export type TClassesWithCx<TClassesNames extends string> = TClasses<TClassesNames> & { cx: TCx<TClassesNames> };

export const getClassesWithCx = <TClassesNames extends string>(classes: Record<string, string>): TClassesWithCx<TClassesNames> => {
  const cx = classNames.bind(classes) as TCx<TClassesNames>;
  return { ...(classes as TClasses<TClassesNames>), cx };
}
