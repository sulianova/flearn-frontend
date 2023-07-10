import classes from './LessonHeader.module.scss'

export default LessonHeader;

function LessonHeader() {
  return (
    <div className={classes._}>
      <div className={classes.titleCol}> 
        <h1 className={classes.title + " s-text-21"}>Как рисовать свободно</h1>
        <div className="s-text-21">23 мая — 23 июня</div>
      </div>
      <div className={classes.lesson}>
        <div className={classes.lessonNumber + " s-text-21"}>Урок 1</div>
        <div className={classes.lessonNav}><a className={classes.lessonNavLink + "inline-link s-text-21-uppercase"} href="lessons.html"><span className="inline-link-text">Все уроки</span><span className="inline-link-arrow">&rarr;</span></a><a className={classes.lessonNavLink + " inline-link s-text-21-uppercase blue"}><span className="inline-link-text">Следующий урок</span><span className="inline-link-arrow">→</span></a></div>
      </div>
    </div>
  );
}