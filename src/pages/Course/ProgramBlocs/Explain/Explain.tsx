import classes from './Explain.module.scss';

export default Explain;

function Explain() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <div className={classes['headerTitle'] + ' s-text-56'}>Любой может научиться иллюстрации</div>
        <div className={classes['headerDesc'] + ' s-text-24'}>Чтобы рисовать, необязательно иметь релевантный опыт или творческие способности.</div>
      </div>
      <div className={classes.cards}>
        <div className={classes.videoCard}>
          <div className={classes.videoCardContainer}>
            <iframe src="https://www.youtube.com/embed/ag6PuGjJdbU?autoplay=1&amp;mute=1&amp;loop=1" title="YouTube video player"> </iframe>
          </div>
          <div className={classes['videoCardDesc'] + ' s-text-18'}>София Ульянова — иллюстратор и преподаватель курсов об иллюстрации. </div>
        </div>
        <div className={classes.introCard}>
          <div className={classes['introCardQuote'] + ' s-text-28'}>“У меня не было академического образования, когда я начала рисовать. Я училась на курсах,  которые казались мне интересными, постепенно собирая свой личный набор инструментов.”</div>
        </div>
      </div>
    </div>
  );
}