import Page from 'ui/Page/Page';
import classesHeader from './LessonsHeader.module.scss';
import classesContent from './LessonsContent.module.scss';
import classesList from './LessonsList.module.scss';

export default Lessons;

function Lessons() {
  return (<Page header footer wrapper="Lessons">
    <div className={classesHeader._}>
      <h1 className={classesHeader.title + " s-text-56"}>Как рисовать свободно</h1>
    </div>
    <div className={classesContent._}>
      <div className={classesContent.date + " s-text-21-uppercase"}><span>23 мая — 23 июня</span></div>
      <div className={classesContent.list}> 
        <ol className={classesList._}>
          <li className={classesList.item}><a className="inline-link s-text-21" href="lesson.html">Урок 1. Первая тема</a></li>
          <li className={classesList.item}><a className="inline-link s-text-21" href="homework.html"> Задание недели</a><a className={classesList.itemResults + " inline-link s-text-16"} href="homework-editor.html"> Результаты</a></li>
          <li className={classesList.item}><a className="inline-link s-text-21" href="lesson.html">Урок 2. Вторая тема. Без интересного дополнения</a></li>
          <li className={classesList.item}><a className="inline-link s-text-21" href="homework.html"> Задание недели</a></li>
          <li className={classesList.item}><a className="inline-link s-text-21" href="lesson.html"> Урок 3. Третья тема</a></li>
          <li className={classesList.item}><a className="inline-link s-text-21" href="homework.html">Задание недели</a></li>
        </ol>
      </div>
    </div>
    <div className={classesContent.chat}>
      <div className={classesContent.chatTitle + " s-text-21-uppercase"}><span>Учебная группа</span></div>
      <div className={classesContent.chatLink}><a className="inline-link s-text-21">Ссылка на группу в Телеграм</a></div>
    </div>
  </Page>);
}
