import TextPageSection from '../TextPageSection/TextPageSection';
import LessonVideo from './../LessonVideo/LessonVideo';
import classes from './LessonContent.module.scss';

export default LessonContent;

function Uppload() {
  return (
    <div className={classes.uppload}>
      <div className={classes.upploadDeadline + ' s-text-21-uppercase'}>
        загрузить до воскресенья,
        <br/>
        4 сентября, 23:59 по мск
      </div>
      <a className={classes.upploadBtn + ' s-text-21-uppercase'} href='#upload-form'>Загрузить работу</a>
    </div>
  );
}

function Duration() {
  return (
    <div className={classes.duration}>
      <svg width='15' height='15' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <circle cx='7.5' cy='7.5' r='7' stroke='#131313'/>
        <path d='M11 7.5L5.75 10.5311V4.46891L11 7.5Z' fill='#131313'/>
      </svg><span className='s-text-18'>00:20:01</span>
    </div>
  );
}

function LessonContent() {
  return (
    <div className={classes._}>
      <h2 className={classes.title + ' s-text-56'}>Тема первая</h2>
        <section className={classes.videoSection}>
          <LessonVideo/>
        </section>
        <TextPageSection/>
    </div>
  );
}
