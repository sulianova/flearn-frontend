import classes from './InPageFallback.module.scss';

interface IProps {
    children: React.ReactNode
}

export default function InPageFallback(props: IProps) {
  return (
    <div className={classes.Container}>
      {props.children}
    </div>
  );
}
