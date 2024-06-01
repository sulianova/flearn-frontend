import classes from './TheoryFooter.module.scss';

export default TheoryFooter;

function TheoryFooter() {
  return (
    <div className={classes.__}>
      <div className={classes.buttons}>
        <div className={classes.nestLesson}>
          <button className={classes.button + ' s-text-18'}>К следующему уроку</button>
        </div>
      </div>
    </div>
  );
}