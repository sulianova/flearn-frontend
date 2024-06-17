import classnames from 'classnames/bind';
import React from 'react';

import * as icons from 'assets/images/Svg';

import classes from './Icon.module.scss';

export default React.forwardRef(Icon);

const cx = classnames.bind(classes);

type TNativeProps =
    & React.Attributes
    & React.RefAttributes<SVGSVGElement>
    & React.SVGAttributes<SVGSVGElement>;

export type TIcon = keyof typeof icons;
interface IPropsWithoutRef extends TNativeProps {
    icon: TIcon | React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    rotate?: number
    transition?: ['Flip', boolean]
    sizeVariant?: 'Sm' | 'Md' | 'Lg'
}

export interface IIconProps extends IPropsWithoutRef, React.RefAttributes<SVGSVGElement> {}

function Icon(props: Readonly<IPropsWithoutRef>, ref: React.Ref<SVGSVGElement>) {
    const { icon, color, rotate, transition, sizeVariant, className, ...nativeProps } = props;

    const ConcreteIcon = typeof icon === 'string' ? icons[icon] : icon;

    const transitionType = transition?.[0];
    const transitionEntered = transition?.[1];

    return (
        <ConcreteIcon
            {...nativeProps}
            style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined, ...nativeProps.style }}
            ref={ref}
            className={cx({
                Icon: true,
                [color!]: Boolean(color),
                [className!]: Boolean(className),
                [sizeVariant!]: Boolean(sizeVariant),
                [transitionType!]: Boolean(transitionType),
                TransitionEntered: Boolean(transitionEntered),
            })}
        />
    );
}
