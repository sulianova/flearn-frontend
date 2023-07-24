import { connect } from 'react-redux';

import { useFetch } from 'hooks';
import { fetchCourse, fetchLessons } from 'store/actions/sagas';

import Page from 'ui/Page/Page';
import classesContent from './LessonsContent.module.scss';
import classesHeader from './LessonsHeader.module.scss';
import classesList from './LessonsList.module.scss';

import type { ILessonsState, IRootState } from 'types';
export default connect(mapStateToProps)(Lessons);

interface IConnectedProps {
  data?: ILessonsState
}

function mapStateToProps(state: IRootState): IConnectedProps {
  return {
    data: state.lessons,
  };
}

function Lessons({ data }: IConnectedProps) {
  useFetch(({ actionCreator: fetchLessons }));
  console.log(data);
  if (!data || Object.keys(data).length === 0) {
    return (
      <Page header footer wrapper='Lessons'>
        <p>loading lessons</p>
      </Page>
    );
  }

  return (
  <Page header footer wrapper='Lessons'>

    <div className={classesHeader._}>
      <div className={classesHeader.title + ' s-text-36'}>Каждый понедельник здесь появляются ссылки на учебные материалы, тесты и задания курса.</div>
      <div className={classesHeader.links}>
        <a className='key-link  s-text-21'>Об обучении на курсе</a>
        <a className='key-link  s-text-21'>Чат для студентов в Телеграме</a>
      </div>
    </div>
    <div className={classesContent._}>
      <div className={classesContent.info}>
        <h2 className='s-text-21'>Как рисовать свободно</h2>
        <div className='s-text-21'>23 мая — 23 июня</div>
      </div>
      <div className={classesContent.list}>
        <ul className={classesList._}>
          <li className={classesList.item}><a className='inline-link s-text-21' href='lesson.html'>Урок 1. Первая тема</a></li>
          <li className={classesList.item}><a className='inline-link s-text-21' href='homework.html'> Задание недели</a><a className={classesList.itemResults + ' link s-text-18'} href='homework-editor.html'> Моя работа</a></li>
          <li className={classesList.item}><a className='inline-link s-text-21' href='lesson.html'>Урок 2. Вторая тема. Без интересного дополнения</a></li>
          <li className={classesList.item}><a className='inline-link s-text-21' href='homework.html'> Задание недели</a></li>
          <li className={classesList.item}><a className='inline-link s-text-21' href='lesson.html'> Урок 3. Третья тема</a></li>
          <li className={classesList.item}><a className='inline-link s-text-21' href='homework.html'>Задание недели</a></li>
        </ul>
      </div>
    </div>

    <section className={classesContent.editBar}>
      <div className={classesContent.stickyBtnStaff}>
        <div className={classesContent.stickyBtnShaftInner}>
          <div className={classesContent.stickyBtn + ' s-text-24'}>
            Save
          </div>
          <div className={classesContent.stickyBtn + ' s-text-24'}>
            Push
          </div>
        </div>
      </div>
    </section>
  </Page>);
}
