import classes from './TheoryFooter.module.scss';

export default TheoryFooter;

interface IProps {
  onNext: () => void
}

function TheoryFooter(props: IProps) {
  return (
    <div className={classes.__}>
      <div className={classes.buttons}>
        <div className={classes.nestLesson}>
          <button className={classes.button + ' s-text-18'} onClick={props.onNext}>К следующему уроку</button>
        </div>
      </div>
    </div>
  );
}