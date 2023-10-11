import classnames from 'classnames/bind';

import Icon from '../Icon/Icon';

import classes from './Spinner.module.scss';

const cx = classnames.bind(classes);

interface IProps {
  className?: string
  variant?: 'local' | 'global'
}

export default function Spinner({ variant = 'local', className = '' }: Readonly<IProps>) {
  const spinnerClasses = cx({
    Base: true,
    Local: variant === 'local',
    Global: variant === 'global',
    [className]: className !== '',
  });

  return <Icon icon='Spinner' className={spinnerClasses} />;
}
