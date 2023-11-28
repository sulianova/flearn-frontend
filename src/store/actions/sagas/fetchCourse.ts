import { put, select } from 'redux-saga/effects';
import { dataService, localFilesServise } from 'services';
import { createAction } from 'store/utils';
import { updateState } from '../redux';

import { ECommonErrorTypes, ICourseDataDB, type ICourseData, type ICourseState, type IRootState, type TAction } from 'types';

export interface IFetchCoursePayload {
  courseId: string
  source?: 'local' | 'remote'
}

export const fetchCourse = createAction<'saga', IFetchCoursePayload>(
  '***saga*** fetch Course',
  function* execute(action: TAction<IFetchCoursePayload>) {
    const { courseId, source = 'remote' } = action.payload;

    try {
      // put pending state
      const prevState: ICourseState = yield select((state: IRootState): ICourseState => state.course);
      const pendingState: ICourseState = { ...prevState, state: { type: 'pending' } };
      yield put(updateState({ stateName: 'course', payload: pendingState }));

      if (source === 'remote') {
        const data: ICourseData = yield dataService.course.get(courseId);
        const state: ICourseState = { courseId, source, data, state: { type: 'idle' } };
  
        yield put(updateState({ stateName: 'course', payload: state }));
      // } else {
      //   // @ts-ignore
      //   const file = yield import(`edit-files/course-${courseId}.json`);
      //   const isValid = localFilesServise.Course.test(file.courseData);
      //   if (!isValid) {
      //     throw new Error(ECommonErrorTypes.DataIsCorrupted);
      //   }

      //   const data: ICourseData = yield localFilesServise.Course.localToFR(file.courseData);
      //   const state: ICourseState = { courseId, source, data, state: { type: 'idle' } };
  
      //   yield put(updateState({ stateName: 'course', payload: state }));
      } else {
        const newCourseDB = getData(courseId);
        if (!newCourseDB) {
          throw new Error('Cannot find local file');
        }

        const data: ICourseData = yield localFilesServise.Course.localToFR(newCourseDB);
        const state: ICourseState = { courseId, source, data, state: { type: 'idle' } };
  
        yield put(updateState({ stateName: 'course', payload: state }));
      }
    } catch(err) {
      const error = err as Error;
      const errorIsUnknown = !(Object.values(ECommonErrorTypes) as string[]).includes(error.message);
      const state: ICourseState = {
        courseId,
        source,
        data: undefined,
        state: {
          type: 'error',
          error,
          errorType: errorIsUnknown ? ECommonErrorTypes.Other : error.message as ECommonErrorTypes.DataIsCorrupted | ECommonErrorTypes.FailedToFindData,
        },
      };

      yield put(updateState({ stateName: 'lesson', payload: state }));

      // tslint:disable-next-line
      console.log(`Failed to fetch course: ${action.payload.courseId}`, { action, state });
    }
  }
);

function getData(id: string) {
  return newCourseDB.id === id ? newCourseDB: undefined;
}

const newCourseDB: ICourseDataDB = {
  id: 'how-to-draw-free',
  title: 'Как рисовать',
  startDate: '2023.12.04',
  endDate: '2023.12.24',
  durationWeeks: 3,
  homeworksNumber: 3,
  videosNumber: 3,
  feild: 'Иллюстрация',
  introImageId: 'introImage.jpg',
  introDescription: 'Практический мини-курс для тех, кто хочет рисовать убедительные иллюстрации, не копируя фотографии.',
  introImageAlt: 'introImage',
  discontAmount: 100,
  discontDeadline: '2023.11.27',
  creditWas: 12000,
  creditPrice: 0,
  description: [
    {
      answer: 'На курсе будем учиться работать базовыми инструментами: линией и пятном. Разберемся, чем они отличаются, как их использовать. Сделаем упражнения, чтобы разрисоваться.',
      question: 'Не знает с чего начать'
    },
    {
      answer: 'Необязательно точь в точь перерисовывать каждую деталь. Фотоаппарат справится с этим лучше, чем человек. На курсе будем учиться делать убедительные рисунки, не копируя фотографию.',
      question: 'Уверен, что всё зря, если рисунок «не как на фотографии»'
    },
    {
      answer: 'В условном рисовании мы получаем больше свободы, больше возможностей для экспериментов с формой и контрформой. На курсе будем рисовать по упражнениям,  которые сами по себе мешают срисовывать, поощряют упрощение, стилизацию.',
      question: 'Хочет научиться упрощать, уходить от реализма'
    },
    {
      answer: 'На первых этапах в рисовании мешает не столько отсутствие навыков, сколько предубеждения и страхи: «а если не получится», «не знаю, как правильно». Поэтому в начале важна поддержка и рабочий настрой.',
      question: 'Боится, что не получится'
    },
    {
      answer: 'Преподаватель лично общается с учениками, обсуждает с ними рисунки. Помогает понять, что пошло не так. Подсказывает, что сделать, чтобы получилось.',
      question: 'Не знает, как передать то, что хочется'
    },
  ],
  modulesDescription: 'Программа рассчитана на 3 недели, ей нужно посвящать 5-6 часов в неделю.',
  modules: [
    {
      content: [
        { tag: 'p', content: 'Познакомимся с упражнениями, которые помогают чувствовать себя увереннее в рисовании. Узнаем, что отвечает за узнавание и сходство. Разберемся, как показывать объем в линейном рисунке.' },
        { tag: 'span', content: '• Упражнения, чтобы разрисоваться' },
        { tag: 'span', content: '• Линия: знакомство' },
        { tag: 'span', content: '• Линия: как рисовать объемно' },
        { tag: 'span', content: '• Как рисовать похоже' },
        { tag: 'span', content: '• Как рисовать похоже. Линия' },
        {
          tag: 'p',
          content: 'Задание недели: 30 котов линией'
        },
      ],
      imageId: { desktop: 'Block1.jpg', mobile: 'Block1-mobile.jpg' },
      imageAlt: 'Block1',
      imageDesc: 'Рисунки преподавателя',
      title: 'Линия',
      meta: [
        {
          content: 'Неделя 1',
          tag: 'span',
        }
      ],
    },
    {
      content: [
        { tag: 'p', content: 'Проанализируем результаты первой недели. Продолжим тренироваться рисовать похоже, но уже в пятновом рисунке.' },
        { tag: 'span', content: '• Про разницу между линией и пятном' },
        { tag: 'span', content: '• Пятно: знакомство' },
        { tag: 'span', content: '• Пятно: как рисовать объемно' },
        { tag: 'span', content: '• Как рисовать похоже. Пятно' },
        {
          tag: 'p',
          content: 'Задание недели: 30 котов пятном'
        },
      ],
      imageId: { desktop: 'Block2.jpg', mobile: 'Block2-mobile.jpg'},
      imageAlt: 'Block2',
      imageDesc: 'Рисунки преподавателя',
      title: 'Пятно',
      meta: [
        {
          content: 'Неделя 2',
          tag: 'span',
        }
      ],
    },
    {
      content: [
        { tag: 'p', content: 'Будем учиться совмещать линейное и пятновое рисование в одной работе.' },
        { tag: 'span', content: '• Линия и пятно: как совмещать' },
        { tag: 'span', content: '• Как выделить главное: контраст, нюанс' },
        {
          tag: 'p',
          content: 'Задание недели: пятно-иероглиф'
        },
      ],
      imageId: { desktop: 'Block3.jpg', mobile: 'Block3-mobile.jpg' },
      imageAlt: 'Block3',
      imageDesc: 'Рисунки преподавателя',
      title: 'Линия и пятно',
      meta: [
        {
          content: 'Неделя 3',
          tag: 'span',
        }
      ],
    },
  ],
  explainMedia: {
    type: 'image',
    imageId: 'SofiUlianova.jpg',
    imageAlt: 'SofiUlianova',
  },
  promoVideo: {
    src: 'https://www.youtube.com/embed/XQYJAnh6ABU?si=i86TtEisk_kuEUba?autoplay=1&loop=1',
    title: 'Как рисовать – promo'
  },
  teachers: [

  ],
  teacherGallery: [
    {
      imageId: 'SofiUlianova2.jpg',
      imageAlt: 'SofiUlianova2',
    },
    {
      imageId: 'SofiUlianova3.jpg',
      imageAlt: 'SofiUlianova3',
    },
    {
      imageId: 'SofiUlianova5.jpg',
      imageAlt: 'SofiUlianova5',
    },
  ],
  studentsWorks: [
    {
      imageId: 'SpotCat27.jpg',
      imageAlt: 'SpotCat27',
    },
    {
      imageId: 'SpotCat14.jpg',
      imageAlt: 'SpotCat14',
    },
    {
      imageId: 'activeSpot2.jpg',
      imageAlt: 'activeSpot2',
    },
    {
      imageId: 'LineCat3.jpg',
      imageAlt: 'LineCat3',
    },
    {
      imageId: 'SpotCat8.jpg',
      imageAlt: 'SpotCat8',
    },
    {
      imageId: 'activeSpot7.jpg',
      imageAlt: 'activeSpot7',
    },
    {
      imageId: 'SpotCat3.jpg',
      imageAlt: 'SpotCat3',
    },
    {
      imageId: 'SpotCat7.jpg',
      imageAlt: 'SpotCat7',
    },
    {
      imageId: 'SpotCat2.jpg',
      imageAlt: 'SpotCat2',
    },
    {
      imageId: 'LineCat6.jpg',
      imageAlt: 'LineCat6',
    },
    {
      imageId: 'activeSpot14.jpg',
      imageAlt: 'activeSpot14',
    },
    {
      imageId: 'activeSpot16.jpg',
      imageAlt: 'activeSpot16',
    },
    {
      imageId: 'activeSpot8.jpg',
      imageAlt: 'activeSpot8',
    },
    {
      imageId: 'activeSpot9.jpg',
      imageAlt: 'activeSpot9',
    },
    {
      imageId: 'LineCat28.jpg',
      imageAlt: 'LineCat28',
    },
    {
      imageId: 'activeSpot5.jpg',
      imageAlt: 'activeSpot5',
    },
  ],
  faq: [
    {
      question: 'Как проходит онлайн обучение',
      answer: 'Работаем на платформе школы. Каждый понедельник открываются учебные материалы и задание на неделю. Дедлайн загрузки задания — воскресенье, 23:59 по Мск. Вопросы, возникающие по ходу задаем в любое время в телеграмм-канале — раз в сутки преподаватель отвечает на них.'
    },
    {
      question: 'Какие материалы нужны',
      answer: 'Линейные: ручка или черный карандаш. Пятновые: черная тушь, круглая кисточка. Бумага плотностью 180-250г/м. Компьютер или телефон с приложением для обработки фотографий.'
    },
    {
      question: 'Подойдет ли мне курс, если я раньше не рисовал',
      answer: 'Да, подойдет. Курс рассчитан для начинающих рисовальщиков.'
    },
    {
      question: 'Возможно ли совмещать учебу с работой',
      answer: 'Занятия проходят онлайн, все уроки доступны в записи. Вы сможете смотреть лекции или выполнять практические задания в удобное для вас время.'
    },
    {
      question: 'Что будет, если я вовремя не загрузил домашнее задание',
      answer: 'На каждое задание дается 7 дней. Чтобы получить обратную связь преподавателя, нужно отправить работу до дедлайна. После дедлайна задание на проверку отправить нельзя. Вопросы по заданиям можно задавать и после дедлайна.'
    },
    {
      question: 'Сколько длится доступ к материалам курса',
      answer: 'Если загрузить все задания, доступ к материалам останется навсегда. Если не сдать одно задание и больше — доступ на время курса + 1 неделя после. Всего 1 месяц.'
    },
    {
      question: 'Как оплатить зарубежной картой',
      answer: 'Мы принимаем платежи в России и из-за рубежа. После записи на курс вам придет письмо на почту с инструкцией об оплате, и вы сможете выбрать удобный для вас способ.'
    },
    {
      question: 'Как вернуть деньги, если мне не понравился курс',
      answer: 'До конца первой недели можно отказаться от курса и вернуть деньги. Для этого напишите мне на почту или в телеграмме.'
    },

  ]
}
