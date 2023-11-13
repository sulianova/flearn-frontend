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
  id: 'how-to-draw',
  title: 'Как рисовать',
  startDate: '2023-11-06T00:00:00.000Z',
  endDate: '2023-11-19T00:00:00.000Z',
  durationWeeks: 3,
  homeworksNumber: 3,
  videosNumber: 3,
  feild: 'Иллюстрация',
  introImageId: 'introImage.jpg',
  introDescription: 'Практический мини-курс для тех, кто хочет рисовать убедительные иллюстрации, не копируя фотографии. Сделаем упражнения и 30-50 законченных работ',
  introImageAlt: 'introImage',
  discontAmount: 70,
  discontDeadline: '2023-11-01T00:00:00.000Z',
  creditWas: 9000,
  creditPrice: 2700,
  description: [
    {
      answer: 'На курсе будем разбираться как ставить перед собой посильные маленькие задачки, с которыми приятно и интересно работать.',
      question: 'Не знает с чего начать'
    },
    {
      answer: 'Необязательно точь в точь перерисовывать каждую деталь. Фотоаппарат справится с этим лучше, чем человек. На курсе будем учиться делать убедительные рисунки, не копируя фотографию.',
      question: 'Уверен, что всё зря, если рисунок «не как на фотографии»'
    },
    {
      answer: 'В условном рисовании мы получаем больше свободы, больше возможностей для жонглирования формой и контрформой. На курсе будем рисовать по упражнениям,  которые сами по себе не дают срисовывать, поощряют упрощение, стилизацию.',
      question: 'Хочет научиться упрощать, уходить от реализма'
    },
    {
      answer: 'На первых этапах в рисовании мешает не столько отсутствие навыков, сколько предубеждения и страхи: «а если не получится», «не знаю, как правильно». Поэтому в начале важна поддержка и рабочий настрой. Мы будем всерьез разбирать каждую работу студента, неважно за сколько времени она нарисована, неважно какими материалами, неважно умеет человек рисовать в привычном понимании или нет.',
      question: 'Боится, что не получится'
    },
    {
      answer: 'Преподаватель лично общается с учениками, обсуждает с ними рисунки. Помогает понять, что пошло не так. Подсказывает, что сделать, чтобы получилось.',
      question: 'Не знает, как передать то, что хочется'
    },
  ],
  modulesDescription: 'Программа рассчитана на 2 недели, ей будет нужно посвящать 5-6 часов в неделю.',
  modules: [
    
  ],
  explainVideo: {
    src: '',
    title: 'fff'
  },
  promoVideo: {
    src: '',
    title: 'fff'
  },
  teachers: [

  ],
  teacherGallery: [
    {
      imageId: 'SofiUlianova2.jpg',
      imageAlt: 'SofiUlianova2',
    },
    {
      imageId: 'SofiUlianova1.jpg',
      imageAlt: 'SofiUlianova1',
    },
    {
      imageId: 'SofiUlianova3.jpg',
      imageAlt: 'SofiUlianova3',
    },
    {
      imageId: 'SofiUlianova4.jpg',
      imageAlt: 'SofiUlianova4',
    },
  ],
  studentsWorks: [
    {
      imageId: 'SpotCat12.jpg',
      imageAlt: 'SpotCat12',
    },
    {
      imageId: 'SpotCat21.jpg',
      imageAlt: 'SpotCat21',
    },
    {
      imageId: 'SpotCat14.jpg',
      imageAlt: 'SpotCat14',
    },
    {
      imageId: 'SpotCat13.jpg',
      imageAlt: 'SpotCat13',
    },
    {
      imageId: 'SpotCat8.jpg',
      imageAlt: 'SpotCat8',
    },
    {
      imageId: 'SpotCat7.jpg',
      imageAlt: 'SpotCat7',
    },
    {
      imageId: 'LineCat3.jpg',
      imageAlt: 'LineCat3',
    },
    {
      imageId: 'LineCat6.jpg',
      imageAlt: 'LineCat6',
    },
    {
      imageId: 'LineCat19.jpg',
      imageAlt: 'LineCat19',
    },
    {
      imageId: 'LineCat17.jpg',
      imageAlt: 'LineCat17',
    },
    {
      imageId: 'LineCat20.jpg',
      imageAlt: 'LineCat20',
    },
    {
      imageId: 'LineCat28.jpg',
      imageAlt: 'LineCat28',
    }
  ],
  faq: [
    {
      question: 'Как проходит онлайн обучение',
      answer: 'Работаем на платформе школы. Каждый понедельник открываются учебные материалы и задание на неделю. Дедлайн загрузки задания — воскресенье, 23:59 по Мск. Вопросы, возникающие по ходу задаем в любое время в телеграмм-канале курса — раз в сутки преподаватель отвечает на них.'
    },
    {
      question: 'Сколько времени в неделю закладывать',
      answer: 'Минимально — 3 часа. Рекомендуемое время — 5-6 часов.'
    },
    {
      question: 'Сколько времени дается на домашние задания',
      answer: '7 дней с момента получения задания.'
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
      answer: 'Чтобы получить обратную связь преподавателя, нужно отправить работу до дедлайна После дедлайна задание на проверку отправить нельзя. Вопросы по заданиям можно задавать и после дедлайна.'
    },
    {
      question: 'Сколько длится доступ к материалам курса',
      answer: 'Если загрузить все задания, доступ к материалам останется навсегда. Если не сдать одно задание и больше — доступ на время курса + 2 недели после. Всего 1 месяц.'
    },

  ]
}
