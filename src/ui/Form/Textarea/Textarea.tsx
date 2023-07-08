import classnames from 'classnames/bind';
import React, { useEffect, useRef } from 'react';

import classes from './Textarea.module.scss';

export default Textarea;

const cx = classnames.bind(classes);

export interface IProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    resizable?: 'vertical' | 'vertical-auto'
    heightLimit?: number
}

function Textarea(props: Readonly<IProps>) {
    const { resizable, heightLimit, className, ...nativeProps } = props;

    const ref = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (ref.current && resizable === 'vertical-auto') {
            const textarea = ref.current;

            const autoResize = () => {
                textarea.style.height = '';
                const newHeight = textarea.scrollHeight;

                textarea.style.height =
                    heightLimit === undefined || newHeight < heightLimit
                        // this correction (+3) is necessary so that the scroll bar does not appear
                        ? `${newHeight + 3}px`
                        : `${heightLimit}px`;
            };

            autoResize();
            textarea.addEventListener('input', autoResize);

            return () => {
                textarea.removeEventListener('input', autoResize);
            };
        }
    }, [resizable, heightLimit]);

    const element = (
        <textarea
            {...nativeProps}
            ref={ref}
            className={cx(classes.Textarea, className, {
                VerticallyResizable: resizable === 'vertical',
            })}
        />
    );

    if (resizable !== undefined && resizable !== 'vertical-auto') {
        return <div className={classes.Container}>{element}</div>;
    }

    return element;
}
