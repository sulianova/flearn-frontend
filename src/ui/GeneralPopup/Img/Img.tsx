import Icon, { IPropsWithoutRef as IIconProps } from 'ui/Icon/Icon';

import classes from './Img.module.scss';

interface IProps {
  iconProps: IIconProps
}

export default function Img(props: IProps) {
  return (
    <div className={classes.imgWrapper}>
      <Icon {...props.iconProps}/>
    </div>
  );
}
