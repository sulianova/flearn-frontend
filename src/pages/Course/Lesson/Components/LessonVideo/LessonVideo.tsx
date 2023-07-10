import classes from './LessonVideo.module.scss';

export default LessonVideo;

function LessonVideo() {
  return (
    <div className={classes._}>
      <div className={classes.videoWrapper}>
        <iframe src='https://www.youtube.com/embed/ag6PuGjJdbU?loop=1' title='YouTube video player' allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'/>
      </div>
    </div>
  );
}
