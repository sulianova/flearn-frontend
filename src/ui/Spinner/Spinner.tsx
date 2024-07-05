import Icon from '../Icon/Icon';

interface IProps {
  variant?: 'local' | 'global'
}

export default function Spinner({ variant = 'local' }: Readonly<IProps>) {
  const size = variant === 'local' ? 16 : 32;

  return <Icon
    icon='Spinner'
    height={size}
    width={size}
  />;
}
