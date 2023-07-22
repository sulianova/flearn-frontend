import { call, put } from 'redux-saga/effects';
import { firebaseService } from 'services';
import { createAction } from 'store/utils';
import { updateState } from '../redux';

import type { ICourseData, TAction } from 'types';

const delay = async (ms: number) => new Promise<void>(res => setTimeout(res, ms));

export interface IFetchCoursePayload {
  courseId: string
}

export const fetchCourse = createAction<'saga', IFetchCoursePayload>(
  '***saga*** fetch Course',
  function* execute(action: TAction<IFetchCoursePayload>) {
    try {
      const { courseId } = action.payload;
      yield call(delay, 1000);

      const data: ICourseData = yield call(getData);
      const remoteData = yield firebaseService.getCourse(courseId);

      console.log('remoteData: ', remoteData);

      yield put(updateState({ stateName: 'course', payload: data}));
    } catch(e) {
      console.log(`Faild to fetch course: ${action.payload.courseId}`);
    }
  }
);

function getData() {
  return courseData;
}

const courseData: ICourseData = {
  startDate: new Date('2023-05-27'),
  durationWeeks: 5,
  homeworksNumber: 8,
  videosNumber: 10,
  feild: 'Иллюстрация',
  title: 'Как рисовать свободно',
  introDescription: 'Разберемся, как сделать выразительный рисунок, не срисовывая с фото. Обсудим за счет чего происходит узнавание предметов, и почему в лягушке мы видим лягушку. Сделаем упражнения и 3-4 законченные работы.',
  discontAmount: 30,
  discontDeadline: new Date(),
  creditWas: 14000,
  creditPrice: 7000,
  description: [
    {
      question: 'Не знает с чего начать',
      answer: 'Преподаватель подскажет, какие материалы купить, как держать ручку, ответит на вопросы, поддержит.',
    },
    {
      question: 'Уверен, что всё зря, если рисунок «не как на фотографии».',
      answer: 'Фотографическая точность — одно из возможных средств выразительности. Еще есть контраст, выразительные линии, фактура. На вебинаре будем учиться делать выразительные рисунки, не копируя фотографию.',
    },
    {
      question: 'Боится, что не получится.',
      answer: 'На первых этапах в рисовании мешает не столько отсутствие навыков, сколько предубеждения и страхи: «а если не получится», «не знаю, как правильно». Поэтому в начале важна поддержка и дружелюбная атмосфера. Будем анализировать рисовальный опыт, отмечать, что вызывает сопротивление, скуку, интерес',
    },
    {
      question: 'Не знает, как передать то, что хочется.',
      answer: 'Преподаватель лично общается с учениками, обсуждает с ними рисунки. Помогает понять, что пошло не так. Подсказывает, что сделать, чтобы получилось.',
    },
  ],
  modulesDescription: 'Программа рассчитана на 1 месяц, ей будет нужно посвящать 5-6 часов в неделю.',
  modules: [
    {
      meta: [
        {tag: 'span', content: 'Неделя 1'},
      ],
      title: 'Тема первой недели',
      content: 'На первых этапах в рисовании мешает не столько отсутствие навыков, сколько предубеждения и страхи: «а если не получится», «не знаю, как правильно». Поэтому в начале важна поддержка и дружелюбная атмосфера. На вебинаре можно все, преподаватель поддержит любые идеи и эксперименты.',
      imageDesc: 'София Ульянова',
      imageSrc: 'TheStrangerVisitingNatureSusl',
      imageAlt: 'TheStrangerVisitingNatureSusl',
    },
    {
      meta: [
        {tag: 'span', content: 'Неделя 2'},
      ],
      title: 'Тема второй недели',
      content: [
        { tag: 'p', content: 'На первых этапах в рисовании мешает не столько отсутствие навыков, сколько предубеждения и страхи: «а если не получится», «не знаю, как правильно». Поэтому в начале важна поддержка и дружелюбная атмосфера. На вебинаре можно все, преподаватель поддержит любые идеи и эксперименты'},
        { tag: 'p', content: 'На первых этапах в рисовании мешает не столько отсутствие навыков, сколько предубеждения и страхи: «а если не получится», «не знаю, как правильно». Поэтому в начале важна поддержка и дружелюбная атмосфера. На вебинаре можно все, преподаватель поддержит любые идеи и эксперименты'},
      ],
      imageDesc: 'София Ульянова',
      imageSrc: 'TheStrangerVisitingNatureSusl',
      imageAlt: 'TheStrangerVisitingNatureSusl',
    },
  ],
  teachers: [
    {
      title: 'София Ульянова',
      description: 'Художник, автор курса. Закончила Британскую Высшую Школу Дизайна по курсу иллюстрация. Участвую в международных конкурсах для иллюстраторов. Рисую для себя и творческих проектов.',
      imageSrc: 'Author',
      imageAlt: 'Author',
    },
  ],
  teacherGallery: [
    {
      imageSrc: 'SummerTime',
      imageAlt: 'TSummerTime',
    },
    {
      imageSrc: 'TheStrangerVisitingNatureTiger',
      imageAlt: 'TheStrangerVisitingNatureTiger',
    },
    {
      imageSrc: 'TheStrangerVisitingNatureSusl',
      imageAlt: 'TheStrangerVisitingNatureSusl',
    },
    {
      imageSrc: 'FromTheWarmLights1',
      imageAlt: 'FromTheWarmLights1',
    },
    {
      imageSrc: 'FromTheWarmLights2',
      imageAlt: 'FromTheWarmLights2',
    },
  ],
  faq: [
    {
      question: 'Как проходит онлайн обучение',
      answer: [
        { tag: 'p', content: 'Ответ на вопросы'},
        { tag: 'p', content: 'Ответ на вопросы'},
      ],
    },
    {
      question: 'Сколько времени дается на домашние задания',
      answer: 'Ответ на вопросы',
    },
    {
      question: 'Какие материалы нужны для курса',
      answer: 'Ответ на вопросы',
    },
    {
      question: 'Подойдет ли мне курс, если я раньше не рисовал',
      answer: 'Ответ на вопросы',
    },
    {
      question: 'Что будет, если я пропустил вебинар',
      answer: 'Ответ на вопросы',
    },
  ],
};
