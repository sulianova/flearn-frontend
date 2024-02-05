import { put, select } from 'redux-saga/effects';
import { dataService, localFilesServise } from 'services';
import { ICourseData, ICourseDataDB } from 'services/course.service';
import { createAction } from 'store/utils';
import { updateState } from '../redux';

import { ECommonErrorTypes, type ICourseState, type IRootState, type TAction } from 'types';

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
  return allCourses.find(course => course.id === id);
}

const courseDB1: ICourseDataDB = {
  id: 'how-to-draw', // how-to-draw-free
  type: 'course',
  title: 'Как рисовать',
  startDate: '2024.03.18 21:00:00 GMT', // '2023.12.03 21:00:00 GMT'
  endDate: '2024.04.07 20:59:00 GMT', // '2023.12.31 20:59:00 GMT'
  accessDeadline: '2024.04.14 20:59:00 GMT', // '2023.12.31 20:59:00 GMT'
  duration: {
    unit: 'week',
    value: 3,
  },
  homeworksNumber: 3,
  videosNumber: 3,
  feild: 'Иллюстрация',
  introImageId: 'LineCat6.jpg',
  introDescription: 'Практический курс для тех, кто хочет освоить навыки иллюстрации. За 3 недели научимся уверенно рисовать любые сюжеты. Узнаем, как управлять вниманием зрителя',
  introImageAlt: 'SpotCat27',
  discontAmount: 20,
  discontDeadline: '2024.03.08 20:59:00 GMT',
  creditWas: 12000,
  creditPrice: 9600,
  telegramLink: 'https://t.me/+yIvKOdKrLYdlYzMy',
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
    // {
    //   answer: 'Преподаватель лично общается с учениками, обсуждает с ними рисунки. Помогает понять, что пошло не так. Подсказывает, что сделать, чтобы получилось.',
    //   question: 'Не знает, как передать то, что хочется'
    // },
  ],
  modulesDescription: 'Программа рассчитана на 3 недели, ей нужно посвящать 5-6 часов в неделю.',
  modules: [
    {
      content: [
        { tag: 'p', content: 'Познакомимся с упражнениями, которые помогают чувствовать себя увереннее в рисовании. Узнаем, что отвечает за узнавание и сходство. Разберемся, как управлять вниманием зрителя и потренируемся выделять главное с помощью линий.' },
        { tag: 'span', content: '• Упражнения, чтобы разрисоваться' },
        { tag: 'span', content: '• Линия: знакомство' },
        { tag: 'span', content: '• Линия: как рисовать объемно' },
        { tag: 'span', content: '• Как рисовать похоже' },
        { tag: 'span', content: '• Линия: как попадать в пропорции' },
        { tag: 'span', content: '• Как выделить главное: контраст, нюанс' },
        { tag: 'span', content: '• Линия: как выделить главное' },
        { tag: 'span', content: '• Как оцифровать линейный рисунок в Photoshop' },
      ],
      activities: [
        {
          tag: 'p',
          content: 'Вебинар: скоростные рисунки линией за 5, 10, 15 минут'
        },
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
          content: '18 марта – 24 марта',
          tag: 'span',
        }
      ],
    },
    {
      content: [
        { tag: 'p', content: 'Проанализируем результаты первой недели. Продолжим тренироваться рисовать похоже и выделять главное, но уже в пятновом рисунке.' },
        { tag: 'span', content: '• Про разницу между линией и пятном' },
        { tag: 'span', content: '• Пятно: знакомство' },
        { tag: 'span', content: '• Пятно: как рисовать объемно' },
        { tag: 'span', content: '• Пятно: как попадать в пропорции' },
        { tag: 'span', content: '• Пятно: как выделить главное' },
        { tag: 'span', content: '• Как оцифровать пятновой рисунок в Photoshop' },
      ],
      activities: [
        {
          tag: 'p',
          content: 'Вебинар: скоростные рисунки пятном за 5, 10, 15 минут'
        },
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
          content: '25 марта —31 марта',
          tag: 'span',
        }
      ],
    },
    {
      content: [
        { tag: 'p', content: 'Будем учиться совмещать линейное и пятновое рисование в одной работе.' },
        { tag: 'span', content: '• Линия и пятно: как совмещать' },
        { tag: 'span', content: '• Какие задачи могут решать линии и пятна' },
      ],
      activities: [
        {
          tag: 'p',
          content: 'Вебинар: скоростные рисунки линией и пятном за 5, 10, 15 минут'
        },
        {
          tag: 'p',
          content: 'Задание недели: 30 котов линией и пятном'
        },
      ],
      imageId: { desktop: 'Block3.jpg', mobile: 'Block3-mobile.jpg' },
      imageAlt: 'Block3',
      imageDesc: 'Рисунки преподавателя',
      title: 'Линия и пятно',
      meta: [
        {
          content: '1 апреля — 7 апреля',
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
  ],
  feedbacks: [
    {
      author: { name: 'Светлана Блок', description: 'выпускница набора 4 дек 2023' },
      quote: [
        { tag: 'p', content: 'Всё, что было обещано — было в курсе: поддержка преподавателя, обратная связь по домашнему заданию буквально на каждый рисунок, помощь с любым творческим вопросом, сомнениями, сильная мотивация и опора. Понравилось, что курс с момента открытия подробный: есть цитаты и изображения, которые прикладываются для удобства. Автор детально изъясняется, а в конце ждёт видео, где показывается процесс рисования котиков с подсказками: как лучше сделать при рисовании своих котиков.' },
        { tag: 'p', content: 'Я научилась не бояться испортить холст бумаги, спокойно эксперементировать до того момента, пока не буду довольна изображением. Не переживать и отслеживать поведение краски, куда она потечёт, и насколько серьёзно её нужно будет контролировать в зависимости от количества воды. Научилась встречать первых котиков, которые "мои", а не "красивые, как у преподавателя", не расстраиваться и упорствовать в том, чтобы сделать их эффектнее.' },
        { tag: 'p', content: 'Приобрела принцип: "нет лучше того варианта, чем есть сейчас у меня". Когда хороший результат достигнут, не надо мучать себя и ещё котиков из себя вырисовывать. Не зря говорят, что "лучшее враг хорошего". Есть моменты, когда стоит нарисовать одно и тоже несколько раз, и выйдет отлично. Вот не надо продолжать иногда в такие моменты, а научиться говорить себе " стоп", разглядеть все плюсы и гордиться собой! Потому что минусы всегда найдутся, важно, чтобы нравилось самому. Потому что проверено — никакая похвала, будь она от близкого человека или авторитетного профессионала, не заставит вас полюбить свою работу, при первичном неудовольствии. Наоборот, одни неудобства, стеснения, неловкость и желание испариться, потому что ощущение будто льют сладкую ложь. В общем, научилась грамотно анализировать себя, свои ощущения и работы, видеть плюсы, находить крутые приёмы, которые получаются у меня так, как не получатся у других. Мы же все индивидуальны, надо этим конкретно пользоваться!))' },
        { tag: 'p', content: 'Буду после курса активно рисовать-рисовать, перерисовывать свои работы, чтобы закрепить понимание поведения материалов, оттачивать собственный стиль и любить его, не пытаясь делать, как кто-то другой.' },
        { tag: 'p', content: 'Курс помог справится с внутренним конфликтующим "Я", гордиться собой и не заниматься самопоеданием.' },
      ],
      excerpt: 'Я научилась не бояться испортить холст бумаги, спокойно эксперементировать до того момента, пока не буду довольна изображением'
    },
    {
      author: { name: 'Юлия', description: 'выпускница набора 4 дек 2023' },
      quote: [
        { tag: 'p', content: 'Увеличение количества попыток и поиски дают намного лучший результат, чем копирование самой красивой работы другого автора, даже в мелочах. В каждой работе есть удачные моменты и нужно уметь проанализировать и найти их, понять как можно применить это дальше.' },
      ],
      excerpt: 'В каждой работе есть удачные моменты и нужно уметь проанализировать и найти их, понять как можно применить это дальше'
    },
  ],
  studyProcess: [
    {
      title: 'Задания и теория',
      caption: 'Для самостоятельного изучения',
      description: 'Работаем на платформе школы. Все учебные материалы: текст, фото и видео-уроки доступны в личном кабинете на сайте. Их можно пересматривать в любое время.',
      imageId: {
        mobile: 'studyProcess1.jpg',
        desktop: 'studyProcess1.jpg',
      },
      imageAlt: 'studyProcess2',
    },
    {
      title: 'Вопросы по ходу',
      caption: 'Каждый день',
      description: 'Вопросы, возникающие по ходу, задаем в любое время в телеграм-чате. В чате можно задавать любые вопросы по рисованию, делиться радостями, горестями, лайфхаками и красивыми картинками, поддерживать друг друга и болтать.',
      imageId: {
        mobile: 'studyProcess2-mobile.jpg',
        desktop: 'studyProcess2.jpg',
      },
      imageAlt: 'studyProcess2',
    },
    {
      title: 'Обратная связь',
      caption: 'По домашним заданиям',
      description: [
        { tag: 'p', content: 'Индивидуальная обратная связь по домашним заданиям. Преподаватель создает для каждого участника рабочий холст в Figma, где можно писать комментарии, прикладывать фото и ссылки.' },
        { tag: 'p', content: 'Чтобы отвечать на комментарии, вести диалог, нужно залогиниться под любой почтой в Figma. С ноутбука это можно сделать в любом браузере, с телефона вначале нужно скачать приложение Figma и установить его.' },
      ],
      imageId: {
        mobile: 'studyProcess3-mobile.jpg',
        desktop: 'studyProcess3.jpg',
      },
      imageAlt: 'studyProcess3',
    },
    {
      title: 'Вебинары',
      caption: 'Для практики с преподавателем',
      description: 'Онлайн-созвоны с участниками в Skype на 1-1,5 часа. Вместе разбираем теорию, а затем делаем короткие рисовальные упражнения.',
    },
  ],
}

const courseDB2: ICourseDataDB = {
  id: 'finding-your-style',
  type: 'webinar',
  title: 'Как найти стиль',
  startDate: '2024.02.08 21:00:00 GMT',
  endDate: '2024.02.18 20:59:00 GMT',
  accessDeadline: '2024.02.18 20:59:00 GMT',
  duration: {
    unit: 'day',
    value: 10,
  },
  homeworksNumber: 1,
  videosNumber: 3,
  feild: 'Иллюстрация',
  introImageId: 'introImage.jpg',
  introDescription: 'Разберемся, из чего состоит авторский стиль и сделаем  серию графических работ для портфолио',
  introImageAlt: 'introImage',
  discontAmount: 100,
  discontDeadline: null,
  creditWas: 4000,
  creditPrice: 0,
  telegramLink: 'https://t.me/+LZp7VXnGjUQ3ZTRi',
  about: [
    {
      tag: 'p',
      content: 'Иллюстратор София Ульянова расскажет, как формируется собственный стиль в иллюстрации и поможет улучшить вашу изобразительную манеру.'
    },
    {
      tag: 'p',
      content: 'На интенсиве вы:\n— познакомитесь с основами иллюстрации\n— узнаете, из чего состоит авторский стиль\n— создадите графическую серию для портфолио и получите обратную связь от преподавателя'
    },
  ],
  description: [
    {
      answer: 'На интенсиве будем разбираться, как ставить перед собой посильные маленькие задачки. А затем развивать из них готовые графические серии.',
      question: 'Не знает с чего начать'
    },
    {
      answer: 'На интенсиве пошагово разберем, из чего состоит иллюстрация, что делает рисунок выразительным, интересным для разглядывания. Будем анализировать работы других иллюстраторов, пробовать новые подходы в собственных рисунках. По итогу, у студентов останется алгоритм, по которому можно разбирать иллюстрации любимых художников, самостоятельно у них учиться и развивать свой графический язык.',
      question: 'Хочет найти свой стиль в иллюстрации'
    },
    {
      answer: 'Фотографическая точность — одно из возможных средств выразительности. Еще есть контраст, формообразование, силуэт, ритмы. На интенсиве будем учиться делать выразительные рисунки, не копируя фотографию.',
      question: 'Уверен, что всё зря, если рисунок «не как на фотографии»'
    },
    {
      answer: 'На первых этапах в рисовании мешает не столько отсутствие навыков, сколько предубеждения и страхи: «а если не получится», «не знаю, как правильно». Поэтому в начале важна поддержка и рабочий настрой.',
      question: 'Боится, что не получится'
    },
  ],
  prizes: [
    { title:
      [
        {
          tag: 'span',
          content: 'Cкидка 50% на курс '
        },
        {
          tag: 'a',
          content: '“Как рисовать”',
          props: { className: 'key-link', target: "_blank", to: 'https://flearn.net/course/how-to-draw' },
        },
      ],
      content: 'Практический курс для тех, кто хочет освоить навыки иллюстрации. За 3 недели научимся уверенно рисовать любые сюжеты. Узнаем, как управлять вниманием зрителя'
    },
    {
      title: 'Приглашение в телеграм-чат выпускников школы flearn',
      content: 'В чате мы задаем любые вопросы по рисованию, делимся радостями, горестями, лайфхаками и красивыми картинками, поддерживаем друг друга и болтаем',
    },
  ],
  modulesDescription: 'Программа рассчитана на 10 дней, ей нужно посвятить 10-12 часов.',
  modules: [
    {
      content: [
        { tag: 'p', content: 'Разберемся из чего складывается иллюстрация, проанализируем работы других художников. Подумаем, какие ценности важны для нас, из чего может складываться наш собственный стиль.' },
        { tag: 'p', content: [
          { tag: 'span',
          content: '1. Что такое иллюстрация, серия, стиль'
          },
          { tag: 'span', props: { className: 'blue' }, content: 'Консультация с преподавателем на 5-10 мин: ставим цели на интенсив' },
          ]
        },
        { tag: 'p', content: [
          { tag: 'span',
          content: '2. Литературный сюжет — то, что изображаем',
          },
          { tag: 'span', content: '• сюжет в один кадр' },
          { tag: 'span', content: '• конфликт в графике' },
          { tag: 'span', props: { className: 'blue' }, content: 'Упражнение: "Генератор сюжетов"' },
          ]
        },
        { tag: 'p', content: [
          { tag: 'span',
          content: '3. Пластический сюжет — то, как мы это изображаем',
          },
          { tag: 'span', content: '• композиция' },
          { tag: 'span', content: '• контрастность' },
          { tag: 'span', content: '• формообразование' },
          { tag: 'span', content: '• модульность' },
          { tag: 'span', content: '• силуэт' },
          { tag: 'span', content: '• контрформа' },
          { tag: 'span', props: { className: 'blue' }, content: 'Упражнение: "Дневник наблюдений"' },
          ]
        },
      ],
      title: 'Теория: из чего складывается стиль',
      meta: [
        {
          content: '9, 10, 11 февраля в 20:00 по Мск',
          tag: 'span',
        }
      ],
    },
    {
      content: [],
      title: 'Практика: серия графических работ из 3-5 иллюстраций',
      meta: [
        {
          content: '12 – 17 февраля',
          tag: 'span',
        }
      ],
    },
    {
      content: [],
      title: 'Итоги и разбор работ участников',
      meta: [
        {
          content: '18 февраля',
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
  promoVideo: null,
  teachers: [],
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
  studentResults: {
    content: 'Вы создадите серию графических работ из 3-5 иллюстраций, которая продемонстрирует ваши хард-скилы и подчеркнет ценности. Тема серии свободная: от лягушки до автопортрета.',
    imageId: {
      desktop: 'StudentsResult.jpg',
      mobile: 'StudentsResult-mobile.jpg',
    },
    imageAlt: 'StudentsResult',
  },
  studentsWorks: [],
  studyProcess: [
    {
      title: 'Задания и теория',
      caption: 'Для самостоятельного изучения',
      description: 'Работаем на платформе школы. Все учебные материалы: текст, фото и видео-уроки доступны в личном кабинете на сайте. Их можно пересматривать в любое время.',
      imageId: {
        mobile: 'studyProcess1.jpg',
        desktop: 'studyProcess1.jpg',
      },
      imageAlt: 'studyProcess2',
    },
    {
      title: 'Вопросы по ходу',
      caption: 'Каждый день',
      description: 'Вопросы, возникающие по ходу, задаем в любое время в телеграм-чате. В чате можно задавать любые вопросы по рисованию, делиться радостями, горестями, лайфхаками и красивыми картинками, поддерживать друг друга и болтать.',
      imageId: {
        mobile: 'studyProcess2-mobile.jpg',
        desktop: 'studyProcess2.jpg',
      },
      imageAlt: 'studyProcess2',
    },
    {
      title: 'Обратная связь',
      caption: 'По домашним заданиям',
      description: [
        { tag: 'p', content: 'Индивидуальная обратная связь по домашним заданиям. Преподаватель создает для каждого участника рабочий холст в Figma, где можно писать комментарии, прикладывать фото и ссылки.' },
        { tag: 'p', content: 'Чтобы отвечать на комментарии, вести диалог, нужно залогиниться под любой почтой в Figma. С ноутбука это можно сделать в любом браузере, с телефона вначале нужно скачать приложение Figma и установить его.' },
      ],
      imageId: {
        mobile: 'studyProcess3-mobile.jpg',
        desktop: 'studyProcess3.jpg',
      },
      imageAlt: 'studyProcess3',
    },
    {
      title: 'Вебинары',
      caption: 'Для практики с преподавателем',
      description: 'Онлайн-созвоны с участниками в Skype на 1-1,5 часа. Вместе разбираем теорию, а затем делаем короткие рисовальные упражнения.',
    },
  ],
  faq: [],
  feedbacks: [
    {
      author: { name: 'Дарья', description: 'выпускница набора 8 янв 2024' },
      quote: [
        { tag: 'p', content: 'Несмотря на сжатые сроки, интенсив оказался наполненным и очень полезным. Для бесплатного даже очень. Все понравилось! Единственное, что напрягало, — это маленькие сроки, но считаю это скорее плюсом, потому что тоже интересный и полезный опыт, особенно для привыкших работать медленно.' },
        { tag: 'p', content: 'До занятий были несколько абстрактные и скорее интуитивные представления о стиле, сюжете и серии. Теперь они куда более структурированные, и я могу подходить ко всему этому более осознанно. Плюс, было много важных комментариев про процесс и интересные обсуждения. Знаю новые подходы к работе. Планирую применять это все в дальнейшем! И делать серии. До этого не бралась за такое, а теперь хочется поисследовать некоторые темы и попробовать инструменты, которые узнала тут. А их много.' },
        { tag: 'p', content: 'Интенсив помог меньше бояться совершать ошибки в процессе работы. Не зацикливаться и делать акцент на количестве, чтобы было из чего выбирать и от чего отталкиваться. Еще хочется упомянуть, что у меня были переживания насчет того, что я не могу определиться с материалом, а теперь понимаю, что ограничений нет, и мне гораздо спокойнее.' },
      ],
      excerpt: 'Интенсив помог меньше бояться совершать ошибки в процессе работы. Не зацикливаться и делать акцент на количестве, чтобы было из чего выбирать и от чего отталкиваться'
    },
    {
      author: { name: 'aalinaaly', description: 'выпускница набора 8 янв 2024' },
      quote: [
        { tag: 'p', content: 'Спасибо вам большое за все комментарии и за этот чудесный интенсив! Супер полезно и важно для моего развития, как иллюстраторши.' },
      ],
    },
    {
      author: { name: 'Irina Ozolina', description: 'выпускница набора 8 янв 2024' },
      quote: [
        { tag: 'p', content: 'Я новичок в иллюстрации, пыталась разбираться сама. 3 дня интенсива мне дали путь, знание куда нужно идти, мотивацию рисовать и веру в себя. София эксперт во всем, о чем говорит. Информация очень полезная и логичная. Огромная польза от общения. Спасибо!' },
      ],
      excerpt: '3 дня интенсива мне дали путь, знание куда нужно идти, мотивацию рисовать и веру в себя'
    }
  ],
}

const allCourses = [
  courseDB1,
  courseDB2
];