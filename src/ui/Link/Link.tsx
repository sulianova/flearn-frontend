import Tippy, { TippyProps } from '@tippyjs/react';
import classnames from 'classnames/bind';
import { LocationDescriptor } from 'history';
import React from 'react';
import { Link as RouterLink, LinkProps as IRouterLinkProps } from 'react-router-dom';


import classes from './Link.module.scss';

export default Link;

const cx = classnames.bind(classes);

export interface IProps extends Partial<IRouterLinkProps> {
    to?: LocationDescriptor
    styled?: boolean
    block?: boolean
    tooltip?: TippyProps
}

function Link(props: Readonly<IProps>) {
    const {
        to,
        onClick,
        onMouseDown,
        onContextMenuCapture = e => e.preventDefault(), // prevent context menu by default
        className = '',
        block = false,
        tooltip,
        styled = true,
        ...childProps
    } = props;

    let clickHandler: ((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void) | undefined;

    if (onClick !== undefined) {
        clickHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            if (to === undefined) {
                e.preventDefault();
            }
            onClick(e);
        };
    }

    if (onMouseDown !== undefined && clickHandler === undefined && to === undefined) {
        clickHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            e.preventDefault();
        };
    }

    return (
        <Tippy {...tooltip}>
            <RouterLink
                className={cx(className, styled && {
                    Link: true,
                    Block: block,
                })}
                to={to === undefined ? '' : to}
                onClick={clickHandler}
                onMouseDown={onMouseDown}
                onContextMenuCapture={onContextMenuCapture}
                {...childProps}
            >
                {props.children}
            </RouterLink>
        </Tippy>
    );
}
