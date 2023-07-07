import Page from 'ui/Page/Page';
import classesHeader from './LessonHeader.module.scss';
import classesContent from './LessonContent.module.scss';
import classesTextPageSection from './TextPageSection.module.scss';
import classesVideo from './LessonVideo.module.scss';

export default Lesson;

function Lesson() {
  return (
    <Page header footer wrapper="Lesson">
      <div className={classesHeader._}>
        <div className={classesHeader.titleCol}> 
          <h1 className={classesHeader.title + " s-text-21"}>Как рисовать свободно</h1>
          <div className="s-text-21">23 мая — 23 июня</div>
        </div>
        <div className={classesHeader.lesson}>
          <div className={classesHeader.lessonNumber + " s-text-21"}>Урок 1</div>
          <div className={classesHeader.lessonNav}><a className={classesHeader.lessonNavLink + "inline-link s-text-21-uppercase"} href="lessons.html"><span className="inline-link-text">Все уроки</span><span className="inline-link-arrow">&rarr;</span></a><a className={classesHeader.lessonNavLink + " inline-link s-text-21-uppercase blue"}><span className="inline-link-text">Следующий урок</span><span className="inline-link-arrow">→</span></a></div>
        </div>
      </div>
      <div className={classesContent._}> 
        <h2 className={classesContent.title + " s-text-56"}>Тема первая</h2>
        <div className={classesContent.duration}>
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="7.5" cy="7.5" r="7" stroke="#131313"></circle>
            <path d="M11 7.5L5.75 10.5311V4.46891L11 7.5Z" fill="#131313"></path>
          </svg><span className="s-text-18">00:20:01</span>
        </div>
          <section className={classesContent.videoSection}>
            <div className={classesVideo._}>
                <div className={classesVideo.videoWrapper}>
                  <iframe src="https://www.youtube.com/embed/ag6PuGjJdbU?loop=1" title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                </div>
            </div>
          </section>
          <section className={classesTextPageSection._}> 
            <h2 className={classesTextPageSection.title + " s-text-21-uppercase"}>таймкоды</h2>
            <div className={classesTextPageSection.content}>
              <p className="s-text-21"> 00:47 — Эффекты 3D.</p>
              <p className="s-text-21"> 02:23 — Настройки освещения.</p>
              <p className="s-text-21"> 4:30 — Настройка Map Art.</p>
              <p className="s-text-21"> 09:03 — Эффект построения по сечению (Revolve).</p>
              <p className="s-text-21"> 10:54 — Эффект «Повернуть фигуру» (Rotate).</p>
              <p className="s-text-21"> 12:14 — Панель оформления.</p>
            </div>
          </section>
          <section className={classesTextPageSection._}> 
            <h2 className={classesTextPageSection.title + " s-text-21-uppercase"}>описание</h2>
            <div className={classesTextPageSection.content}>
              <p className="s-text-21"> Поговорим о свободе в рисунке, сделаем упражнения и 3-4 законченные работы. Будем анализировать рисовальный опыт, отмечать, что вызывает сопротивление, скуку, интерес.</p>
            </div>
          </section>
          <section className={classesTextPageSection._}> 
            <h2 className={classesTextPageSection.title + " s-text-21-uppercase"}>узнать больше</h2>
            <div className={classesTextPageSection.content}><a className="inline-link s-text-21"> Ссылка 1</a><a className="inline-link s-text-21"> Ссылка 2</a><a className="inline-link s-text-21"> Ссылка 3</a></div>
          </section>
          <section className={classesTextPageSection._}> 
            <h2 className={classesTextPageSection.title + " s-text-21-uppercase"}>материалы</h2>
            <div className={classesTextPageSection.content}><a className="inline-link s-text-21"> Скавать презентацию</a></div>
          </section>
      </div>
    </Page>);
}