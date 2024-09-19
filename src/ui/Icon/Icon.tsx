import React from 'react';

import * as icons from 'assets/images/Svg';

export default React.forwardRef(Icon);

type TNativeProps =
  & React.Attributes
  & React.RefAttributes<SVGSVGElement>
  & React.SVGAttributes<SVGSVGElement>;

export type TIcon = keyof typeof icons;
export interface IPropsWithoutRef extends TNativeProps {
  icon: TIcon | React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  rotate?: number
  height?: number
  width?: number
}

export interface IIconProps extends IPropsWithoutRef, React.RefAttributes<SVGSVGElement> {}

function Icon(props: Readonly<IPropsWithoutRef>, ref: React.Ref<SVGSVGElement>) {
  const { icon, rotate, height, width, ...nativeProps } = props;

  const ConcreteIcon = typeof icon === 'string' ? icons[icon] : icon;

  return (
    <ConcreteIcon
      {...nativeProps}
      height={height}
      width={width}
      style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined, ...nativeProps.style }}
      ref={ref}
    />
  );
}
