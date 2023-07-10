import classes from './LessonWorks.module.scss'
import classNames from 'classnames/bind'
import WorkCard from './WorkCard';

export default LessonWorks;
const cx = classNames.bind(classes);

function LessonWorks() {
  return (
    <div className={classes._}> 
      <div className={classes.wrapper}>
        <div className={classes.own}> 
          <div className={classes.ownTitle + " s-text-36"}>Моя работа</div><a className={cx({ ownWork: true, ownWorkEmpty: true })} href="homework-editor.html"> 
            <div className="s-text-14">Когда вы сдадите работу, она появится здесь</div></a>
          <div className={classes.ownSubtitle + " s-text-16"}>Нужно сдать до 4 сентября</div>
        </div>
        <div className={classes.list}> 
          <div className={classes.listTitle + " s-text-36"}>Работы других студентов</div>
          <div className={classes.listInner}> 
            <div className={classes.work}><WorkCard/></div>
            <div className={classes.work}><WorkCard/></div>
            <div className={classes.work}><WorkCard/></div>
            <div className={classes.work}><WorkCard/></div>
            <div className={classes.work}><WorkCard/></div>
            <div className={classes.work}><WorkCard/></div>
            <div className={classes.work}><WorkCard/></div>
            <div className={classes.work}><WorkCard/></div>
            <div className={classes.work}><WorkCard/></div>
            <div className={classes.work}><WorkCard/></div>
            <div className={classes.work}><WorkCard/></div>
          </div>
          <div className={classes.showMore}>
            <button className={classes.showMoreBtn + " s-text-21-uppercase inline-link"}><span className="inline-link-text">показать больше</span><span className="inline-link-arrow">↓</span></button>
          </div>
        </div>
      </div>
    </div>
  );
}