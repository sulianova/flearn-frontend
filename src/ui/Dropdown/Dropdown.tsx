import Tippy, { type TippyProps } from '@tippyjs/react';
import classnames from 'classnames/bind';
import { forwardRef, memo, useLayoutEffect, useMemo, useState } from 'react';
import type { ForwardedRef, MouseEvent, ReactElement, ReactNode } from 'react';

import classes from './Dropdown.module.scss';

export default memo(forwardRef(Dropdown));

interface IApi {
    opened: boolean
    closing: boolean
    open: () => void
    close: () => void
    hide: () => void
    preventAndToggle: (event: MouseEvent) => void
}

export interface IProps {
    content: ReactNode | ((api: Omit<IApi, 'opened' | 'closing'>) => ReactNode)
    children: ReactElement | ((api: IApi) => ReactElement)
    preventContentOverflow?: boolean
    dropdownPlacement?: TippyProps['placement']
    containerClassName?: string
}

const cx = classnames.bind(classes);

function Dropdown(props: Readonly<IProps>, ref: ForwardedRef<HTMLDivElement>) {
    const { content, children, preventContentOverflow = false, dropdownPlacement = 'bottom-end', containerClassName = '' } = props;

    const [state, setState] = useState({
        opened: false,
        closing: false,
    });

    const modifiers: NonNullable<TippyProps['popperOptions']>['modifiers'] = useMemo(() => {
        return [
            {
                name: 'flip',
                enabled: true,
                options: {
                    flipVariations: false,
                },
            },
            {
                name: 'preventOverflow',
                enabled: preventContentOverflow,
            },
        ];
    }, [preventContentOverflow]);

    const methods = useMemo(() => ({
        open: () => setState({
            opened: true,
            closing: false,
        }),
        close: () => setState({
            opened: false,
            closing: true,
        }),
        hide: () => setState({
            opened: false,
            closing: false,
        }),
        preventAndToggle: (event: MouseEvent) => {
            event.preventDefault();
            setState(({ opened }) => ({
                opened: !opened,
                closing: opened,
            }));
        },
    }), []);

    useLayoutEffect(() => {
        if (typeof children !== 'function') {
            if (content) {
                methods.open();
            } else {
                methods.close();
            }
        }
    }, [content, children, methods]);

    const renderedContent = useMemo(() => {
        if (!state.opened && !state.closing) {
            return null;
        }

        return typeof content !== 'function' ? content : content(methods);
    }, [content, state, methods]);

    return (
        <div ref={ref} className={cx({ [containerClassName]: Boolean(containerClassName) }, classes.Container)}>
            <Tippy
                className={classes.Tippy}
                content={renderedContent}
                visible={state.opened}
                onHidden={methods.hide}
                onClickOutside={methods.close}
                interactive
                arrow={false}
                theme='none'
                maxWidth='none'
                animation='none'
                duration={0}
                offset={[0, 0]}
                placement={dropdownPlacement}
                popperOptions={{ modifiers }}
            >
                {typeof children === 'function' ? children({ ...state, ...methods }) : children}
            </Tippy>
        </div>
    );
}
