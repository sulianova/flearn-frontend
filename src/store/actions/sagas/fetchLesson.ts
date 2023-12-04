import { put, select } from 'redux-saga/effects';
import { dataService, localFilesServise } from 'services';
import { createAction } from 'store/utils';
import { updateState } from '../redux';

import { ECommonErrorTypes, ILessonData, ILessonDataDB, ILessonState, IRootState, TAction } from 'types';

export interface IFetchLessonPayload {
  courseId: string
  lessonId: string
  source?: 'local' | 'remote'
}

export const fetchLesson = createAction<'saga', IFetchLessonPayload>(
  '***saga*** fetch Lesson',
  function* execute(action: TAction<IFetchLessonPayload>) {
    const { courseId, lessonId, source = 'remote' } = action.payload;

    const prevState: ILessonState = yield select((state: IRootState): ILessonState => state.lesson);
    const pendingState: ILessonState = { ...prevState, state: { type: 'pending' } };
    yield put(updateState({ stateName: 'lesson', payload: pendingState }));

    try {
      if (source === 'remote') {
        const data: ILessonData = yield dataService.lesson.get(courseId, lessonId);
  
        const state: ILessonState = { courseId, lessonId, source, data, state: { type: 'idle' } };
  
        yield put(updateState({ stateName: 'lesson', payload: state }));
      } else {
      //   const fullId = dataService.lesson.getFullId(courseId, lessonId);
      //   let file: any
      //   try {
      //     // @ts-ignore
      //     file = yield import(`edit-files/lesson-${fullId}.json`);
      //   } catch (e) {
      //     throw new Error(ELessonErrorTypes.FailedToFindLesson);
      //   }

      //   const isValid = localFilesServise.Lesson.test(file.lessonData);
      //   if (!isValid) {
      //     throw new Error(ELessonErrorTypes.LessonDataIsCorrupted);
      //   }
      //   const data = localFilesServise.Lesson.localToFR(file.lessonData);
      //   if (!data) {
      //     throw new Error(ELessonErrorTypes.LessonDataIsCorrupted);
      //   }
      //   const state: ILessonState = { courseId, lessonId, source, data, state: { type: 'idle' } };
  
      //   yield put(updateState({ stateName: 'lesson', payload: state }));
      // } else {
        const fullId = dataService.lesson.getFullId(courseId, lessonId);
        const dataDB = getData(courseId, lessonId);
        const data: ILessonData | undefined = dataDB ? (yield localFilesServise.Lesson.localToFR(dataDB, dataDB.courseId)) : undefined
        const state: ILessonState = { courseId, lessonId, source, data, state: { type: 'idle' } };
  
        yield put(updateState({ stateName: 'lesson', payload: state }));
      }
    } catch(e) {
      const error = e as Error;
      const errorIsUnknown = !(Object.values(ECommonErrorTypes) as string[]).includes(error.message);
      const state: ILessonState = {
        courseId,
        lessonId,
        source,
        data: undefined,
        state: {
          type: 'error',
          error,
          errorType: errorIsUnknown ? ECommonErrorTypes.Other : error.message as ECommonErrorTypes
        },
      };
  
      yield put(updateState({ stateName: 'lesson', payload: state }));

      const fullId = dataService.lesson.getFullId(action.payload.courseId, action.payload.lessonId);
      // tslint:disable-next-line
      console.log(`Failed to fetch lesson: ${fullId}`, state);
    }
  }
);

function getData(courseId: string, lessonId: string) {
  return allLessons.find(l => l.courseId === courseId && l.id === lessonId);
}

const lessonData10: ILessonDataDB = {
  orderInWeek: 0,
  id: 'Checklist_hUpx7v',
  courseId: 'how-to-draw-free', // how-to-draw
  title: 'Чек-лист продуктивного обучения',
  type: 'Theory',
  week: 1,
  startDate: '2023.12.03 21:00:00 GMT', // 2024.01.08,
  endDate: '2023.12.10 20:59:00 GMT', // 2024.01.14,
  resultsEndDate: '2023.12.12 21:00:00 GMT', // 2024.01.17,
  content: [
    {
      type: 'title',
      title: 'Учиться так, как хочется',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'У каждого из нас свой уникальный опыт, свои ожидания от обучения и свои цели относительно рисования.',
        },
        {
          tag: 'p',
          content: 'Есть силы только на то, чтобы посмотреть видео — отлично, значит сейчас этого достаточно. Я буду рада любому вашему выбору.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Беспокоиться о количестве, а не качестве',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Над одной работой слишком много трясешься, боишься исправлять, принимать радикальные решения. В большинстве случаев полезнее сделать следующий рисунок, чем сидеть и думать, как улучшить старый.',
        },
        {
          tag: 'p',
          content: 'Когда работа одна, ее легко испортить. Когда работ 10, среди них можно выбрать.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Мыслить серией',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Одна удачная работа может быть случайностью. 5 удачных работ — признак того, что автор умело использует визуальное решение.',
        },
        {
          tag: 'p',
          content: 'Когда вы нашли удачный прием, попробуйте повторить его еще в 4-5 рисунках. Изучайте возможности этого приема: выкручивайте его на максимум, наоборот, приглушайте.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Задавать вопросы',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Мы лучше понимаем то, что можем сформулировать. Поэтому верно заданный вопрос — половина успеха. Сразу после того, как появилась мысль — “не получилось”. Задайте вопросы — что я делала? Чего я хотела? Как я планировала этого достичь? В какой момент рисунок перестал работать?',
        },
      ]
    },
  ]
}

const lessonData11: ILessonDataDB = {
  orderInWeek: 1,
  id: 'DrawingExercises_h3dx7k',
  courseId: 'how-to-draw-free', // how-to-draw
  title: '1.1 Упражнения, чтобы разрисоваться',
  type: 'Theory',
  week: 1,
  startDate: '2023.12.03 21:00:00 GMT', // 2024.01.08,
  endDate: '2023.12.10 20:59:00 GMT', // 2024.01.14,
  resultsEndDate: '2023.12.12 21:00:00 GMT', // 2024.01.17,
  content: [
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'На этой неделе познакомимся с упражнениями, которые помогают чувствовать себя увереннее в рисовании. Их можно делать для разминки перед рисованием или целенаправленно тренировать то, что плохо получается.',
        },
        {
          tag: 'p',
          content: 'Предлагаю по чуть-чуть попробовать каждое упражнение, чтобы понять с чем оно может вам помочь. Дальше возвращайтесь к тем упражнениям, которые нужны.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Упражнения на рисование линией',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Прямые линии. ',
          props: { className: 'keyText' },
        },
        {
          tag: 'span',
          content: 'Нарисуйте прямую линию. Когда проводите линию, не отрывайте руку от листа. Смотрите на точку, к которой должны прийти, а не место, где находится рука. Рисуйте линии разной длины: крошечные, во весь лист.',
        },
      ],
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Параллельные линии. ',
          props: { className: 'keyText' },
        },
        {
          tag: 'span',
          content: 'Нарисуйте параллельные вертикальные линии во всю ширину листа. Следите, чтобы расстояние между линиями было одинаковым. Рисуйте без исправлений, одна линия — одно движение.',
        },
      ],
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Повторите упражнение с горизонтальными линиями.',
        },
        {
          tag: 'p',
          content: 'Подсказка 1. Прежде чем провести линию, мысленно наметьте точку, в которую она должна прийти. Смотрите на эту точку, когда рисуете линию.',
        },
        {
          tag: 'p',
          content: 'Подсказка 2. Чтобы соблюсти параллельность, смотрите на линию, которая уже нарисована.',
        },
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Симметричные линии. ',
          props: { className: 'keyText' },
        },
        {
          tag: 'span',
          content: 'Нарисуйте любую волнообразную, кривую линию. Справа от нее проведите вертикальную прямую. Справа от прямой нарисуйте зеркальное отражение кривой линии. Следите за тем, чтобы расстояние от кривых линий до прямой было симметричным.',
        },
      ],
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Подсказка. Смотрите на ту линию, которую нужно повторить, а не место, где рисуете.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'Tasks1.jpg',
        alt: 'Tasks1',
        caption: [
          {
            tag: 'p',
            content: 'Симметричные линии',
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Непрерывные линии. ',
          props: { className: 'keyText' },
        },
        {
          tag: 'span',
          content: 'Нарисуйте контур предмета, не отрывая руку от листа, без исправлений. Линия должна вернуться в точку, откуда начался рисунок.',
        },
      ],
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Разная толщина. ',
          props: { className: 'keyText' },
        },
        {
          tag: 'span',
          content: 'Нарисуйте прямые линии с меняющейся толщиной. Начните рисовать толстой линией, закончите тонкой. Одна линия — одно движение.',
        },
      ],
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Затем сделайте наоборот. Начните рисовать тонкой линией, закончите толстой.',
        },
      ],
    },
    {
      type: 'title',
      title: 'Упражнения на развитие глазомера',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Упражнение 1. ',
          props: { className: 'keyText' },
        },
        {
          tag: 'span',
          content: 'Нарисуйте горизонтальный отрезок и разделите его пополам. На четыре части. На три, пять, шесть. Делите отрезки разной длины: совсем короткие, во весь лист.',
        },
      ],
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Повторите упражнение для вертикальных отрезков.',
        },
      ],
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Упражнение 2. ',
          props: { className: 'keyText' },
        },
        {
          tag: 'span',
          content: 'Нарисуйте горизонтальный отрезок любой длины. Продлите справа от него отрезок такой же длины, а затем еще один и еще один.',
        },
      ],
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Повторите упражнение для вертикальных отрезков.',
        },
      ],
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Упражнение 3. ',
          props: { className: 'keyText' },
        },
        {
          tag: 'span',
          content: 'Нарисуйте квадрат, прямоугольник с соотношением сторон 1:2, 2:1, 1:3, 3:1, 2:3.',
        },
      ],
    },
    {
      type: 'title',
      title: 'Круги, овалы',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Нарисуйте круг, овал за одно-два движения.',
        },
        {
          tag: 'p',
          content: 'Подсказка 1. Чтобы нарисовать симметричный круг, поставьте точку в центре. Ориентируйтесь на нее.',
        },
        {
          tag: 'p',
          content: 'Подсказка 2. У овалов нет острых концов и ровных прямых участков.',
        },
      ],
    },
    {
      type: 'image',
      imageData: {
        id: 'Tasks2.jpg',
        alt: 'Tasks2',
        caption: [
          {
            tag: 'p',
            content: 'Овал',
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Нарисовать идеальный круг или овал от руки нельзя. Все, что мы можем, натренироваться рисовать что-то похожеe на круг и овал.',
        },
      ],
    },
    {
      type: 'title',
      title: 'Упражнение на рисование пятном',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Силуэт и контрформа. ',
          props: { className: 'keyText' },
        },
        {
          tag: 'span',
          content: 'Возьмите любой предмет простой формы: кружку, вазу, фрукт, овощ. Нарисуйте его силуэт от пятна. Двигайтесь от центра к краям предмета.',
        },
      ],
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Теперь возьмите тот же самый предмет и нарисуйте пустоту вокруг предмета, сам предмет оставьте незакрашенным.',
        },
      ],
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Cветлое-темное. ',
          props: { className: 'keyText' },
        },
        {
          tag: 'span',
          content: 'Возьмите простой карандаш или тушь. Если работаете тушью, регулируйте светлоту тона не нажимом, а добавлением воды.',
        },
      ],
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Нарисуйте самый светлый короткий штрих, который можете. На расстоянии 10 см от него нарисуйте самый темный штрих, параллельный первому. Мы получили тональный диапазон.',
        },
        {
          tag: 'p',
          content: 'Нарисуйте между этими штрихами третий – средний между ними по тону. Повторяйте, пока у вас не получится 10 отрезков. В итоге должен получиться равномерный тональный переход. Каждый отрезок немного отличается от соседнего по тону, нет двух одинаковых. Повторяйте упражнение, пока у вас не получится ровный градиент.',
        },
        {
          tag: 'p',
          content: 'Подсказка 1. Чтобы понять, насколько градиент ровный, прищурьте глаза.',
        },
        {
          tag: 'p',
          content: 'Подсказка 2. Тушь меняет светлоту после полного высыхания, прежде чем продолжать, дождитесь пока она высохнет.',
        },
      ],
    },
    {
      type: 'image',
      imageData: {
        id: 'Tasks3.jpg',
        alt: 'Tasks3',
        caption: [
          {
            tag: 'p',
            content: 'Светлое-темное',
          },
        ],
      },
    },
    {
      type: 'title',
      title: 'Упражнения на тренировку объема',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Сечения. ',
          props: { className: 'keyText' },
        },
        {
          tag: 'span',
          content: 'Если мы разрежем предмет перпендикулярно оси, получим срез определенной формы — сечение. Сечения показывают, как поверхность предмета меняет направление.',
        },
      ],
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Возьмите предмет простой формы, например, овощ или фрукт. Тонкой линией нарисуйте силуэт предмета.',
        },
        {
          tag: 'p',
          content: 'Врисуйте в силуэт сечения по форме, как если бы они были прозрачные. Рисуйте насквозь: видимую часть и ту, что за предметом.  Видимую часть рисуйте толще, темнее. Невидимую — светлее, тоньше.',
        },
      ],
    },
    {
      type: 'image',
      imageData: {
        id: 'DimaGorelyshev1.png',
        alt: 'DimaGorelyshev1',
        caption: [
          {
            tag: 'a',
            content: 'Дмитрий Горелышев',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'title',
      title: 'Дополнительно',
    },
    // {
    //   type: 'text',
    //   text: [
    //     {
    //       tag: 'a',
    //       content: 'Простые упражнения в кружке скорого рисунка',
    //       props: { className: 'link', target: "_blank", to: 'https://kruzhokskorogorisunka.ru/tag/*%20Простые%20упражнения?ysclid=lo5f33rkux242200573' },
    //     },
    //   ]
    // },
    {
      type: 'text',
      text: [
        {
          tag: 'a',
          content: 'Книга простое рисование Димы Горелышева',
          props: { className: 'link', target: "_blank", to: 'https://vk.com/wall-100760089_6620?ysclid=lo5fawz49e843963862' },
        },
      ]
    },
  ],
};

const lessonData12: ILessonDataDB = {
  orderInWeek: 2,
  id: 'LineIntroduction_gBpaFa',
  courseId: 'how-to-draw-free', // how-to-draw
  title: '1.2 Линия: знакомство',
  type: 'Theory',
  week: 1,
  startDate: '2023.12.03 21:00:00 GMT', // 2024.01.08,
  endDate: '2023.12.10 20:59:00 GMT', // 2024.01.14,
  resultsEndDate: '2023.12.12 21:00:00 GMT', // 2024.01.17,
  content: [
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Линия и пятно — два основных приема в рисовании. Любой рисунок состоит из линий, пятен и их комбинаций. Если разобраться, как их рисовать, получится нарисовать все, что угодно.',
        },
        {
          tag: 'p',
          content: 'Основные свойства линий: контроль, светлота, толщина. Ниже посмотрим, как с помощью этих свойств, можно разнообразить свои рисунки.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Контроль, моторика',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Линия может быть точной, контролируемой:',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'DimaGorelyshev29.jpg',
        alt: 'DimaGorelyshev29',
        caption: [
          {
            tag: 'a',
            content: 'Dima Gorelyshev',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'DimaGorelyshev9.jpg',
        alt: 'DimaGorelyshev9',
        caption: [
          {
            tag: 'a',
            content: 'Dima Gorelyshev',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'DimaGorelyshev26.jpg',
        alt: 'DimaGorelyshev26',
        caption: [
          {
            tag: 'a',
            content: 'Dima Gorelyshev',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'MashaTitova5.png',
        alt: 'MashaTitova5',
        caption: [
          {
            tag: 'a',
            content: 'Masha Titova',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/mashatitovaprint' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'MashaTitova6.png',
        alt: 'MashaTitova6',
        caption: [
          {
            tag: 'a',
            content: 'Masha Titova',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/mashatitovaprint' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'MashaTitova7.png',
        alt: 'MashaTitova7',
        caption: [
          {
            tag: 'a',
            content: 'Masha Titova',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/mashatitovaprint' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'SashaAnanas1.jpeg',
        alt: 'SashaAnanas1',
        caption: [
          {
            tag: 'a',
            content: 'Sasha Ananas',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/sasha.ananas.sktch/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'SashaAnanas2.jpeg',
        alt: 'SashaAnanas2',
        caption: [
          {
            tag: 'a',
            content: 'Sasha Ananas',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/sasha.ananas.sktch/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Линия может быть случайной, живой:',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'ELENAFEKLISTOVA6.jpg',
        alt: 'ELENAFEKLISTOVA6',
        caption: [
          {
            tag: 'a',
            content: 'ELENA FEKLISTOVA',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/e.feklistova/?g=5' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'DimaGorelyshev41.jpg',
        alt: 'DimaGorelyshev41',
        caption: [
          {
            tag: 'a',
            content: 'Dima Gorelyshev',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'VictoriaSemykina2.jpg',
        alt: 'VictoriaSemykina2',
        caption: [
          {
            tag: 'a',
            content: 'Victoria Semykina',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/viksa' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'VictoriaSemykina3.jpg',
        alt: 'VictoriaSemykina3',
        caption: [
          {
            tag: 'a',
            content: 'Victoria Semykina',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/viksa' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'VictoriaSemykina1.jpg',
        alt: 'VictoriaSemykina1',
        caption: [
          {
            tag: 'a',
            content: 'Victoria Semykina',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/viksa' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'VictoriaSemykina4.jpg',
        alt: 'VictoriaSemykina4',
        caption: [
          {
            tag: 'a',
            content: 'Victoria Semykina',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/viksa' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Регулируя контроль над инструментом, можно выделять главное в рисунке. Например, на рисунке ниже, основная часть рассказана точной линией. Главное — дверь, выделена дрожащей, плохо контролируемой линией.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'DimaGorelyshev35.jpg',
        alt: 'DimaGorelyshev35',
        caption: [
          {
            tag: 'a',
            content: 'Dima Gorelyshev',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Время, потраченное на рисунок, влияет на точность линий. На рисунке ниже я за 5 минут нарисовала задний план: деревья, электрический столб. А затем 15 минут аккуратно рисовала забор: много-много точных параллельных линий. В итоге забор читается другим слоем, явно отличится от заднего плана.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'SofiUlianova1.jpg',
        alt: 'SofiUlianova1',
        caption: [
          {
            tag: 'a',
            content: 'Sofia Ulianova',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/sofiulianova' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Чтобы нарисовать живую, случайную линию, нужно ограничить контроль над инструментом.',
          props: { className: 'listHeader' },
        },
        {
          tag: 'p',
          content: 'Взять карандаш в кулак.',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Рисовать левой рукой.',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Рисовать плохоуправляемым материалом: круглой кисточкой, кисточкой большого размера, кисточкой с большим количеством воды, держать кисть за самый край, держать карандаш в кулаке.',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Не отрывать руку от листа на протяжении всего рисования.',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Рисовать с ограничением по времени: за 1 минуту, за 3 минуты.',
          props: { className: 'listItem' },
        },
      ],
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Низкий контроль над инструментом не означает, что автор плохо рисует или не понимает, что рисует. Низкий контроль дает линии больше живости и свободы. Но даже в этом случае рисунок по прежнему должен быть убедительным.',
        },
        {
          tag: 'p',
          content: 'Чтобы получить убедительную картинку с плохо контролируемым материалом, нужно увеличить количество итераций. Тогда мы получим легкость + убедительность. Чтобы нарисовать убедительную кошку легкой, летящей линий. Нужно нарисовать 10 минутных рисунков разных кошек. И выбрать среди них один, самый лучший.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Тон: темное, светлое',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Тон — светлота линии. Самый светлый тон — белый, самый темный — черный.',
        },
        {
          tag: 'p',
          content: 'Более темной линией можно выделить детали, привлечь внимание к главному.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'DimaGorelyshev41.jpg',
        alt: 'DimaGorelyshev41',
        caption: [
          {
            tag: 'a',
            content: 'Dima Gorelyshev',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'nastya_q1.jpeg',
        alt: 'nastya_q1',
        caption: [
          {
            tag: 'a',
            content: 'Настя Варава',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/nastya_q/?g=5' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Чтобы осветлить линию, можно изменить нажим, взять другой цвет карандаша, разбавить краску водой или добавить в нее белил.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Толстое, тонкое',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Есть карандаши, кисти, которые могут менять толщину линии в зависимости от нажима. Есть моноширинные инструменты, например, линеры. Тогда чтобы изменить толщину, нужно взять другой линер.',
        },
        {
          tag: 'p',
          content: 'С помощью разной толщины можно привлечь внимание, выделить главное.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'nastya_q3.jpeg',
        alt: 'nastya_q1',
        caption: [
          {
            tag: 'a',
            content: 'Настя Варава',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/nastya_q/?g=5' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'SofiUlianova2.jpg',
        alt: 'SofiUlianova2',
        caption: [
          {
            tag: 'a',
            content: 'Sofiia Ulianova',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/sofiulianova' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Разной толщиной линии можно разделить рисунок на планы. Более толстые линии — передний план, более легкие, тонкие — задний.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'ArinaSerebriakova.jpeg',
        alt: 'ArinaSerebriakova',
        caption: [
          {
            tag: 'a',
            content: 'Arina Serebriakova',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/ri.silver/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'KirillZiman12.jpeg',
        alt: 'KirillZiman12',
        caption: [
          {
            tag: 'a',
            content: 'Kirill Ziman',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/kirillziman/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'ELENAFEKLISTOVA2.jpeg',
        alt: 'ELENAFEKLISTOVA2',
        caption: [
          {
            tag: 'a',
            content: 'ELENA FEKLISTOVA',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/e.feklistova/?g=5' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Толстые и тонкие линии могут решать разные задачи. Толстые — ритмы. Тонкие — фигуратив, детали.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'AleksandraWirch.jpeg',
        alt: 'AleksandraWirch',
        caption: [
          {
            tag: 'a',
            content: 'Aleksandra Wirch',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/art_alexandra.k/?g=5' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Толстые — силуэт. Тонкие — детали.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'ELENAFEKLISTOVA4.jpg',
        alt: 'ELENAFEKLISTOVA4',
        caption: [
          {
            tag: 'a',
            content: 'ELENA FEKLISTOVA',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/e.feklistova/?g=5' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Толстые — силуэт, тонкие — фактура.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'ELENAFEKLISTOVA5.jpeg',
        alt: 'ELENAFEKLISTOVA5',
        caption: [
          {
            tag: 'a',
            content: 'ELENA FEKLISTOVA',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/e.feklistova/?g=5' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'ELENAFEKLISTOVA1.jpg',
        alt: 'ELENAFEKLISTOVA1',
        caption: [
          {
            tag: 'a',
            content: 'ELENA FEKLISTOVA',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/e.feklistova/?g=5' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Контролируя толщину, можно показать, как объект расположен в пространстве. То, что ближе к зрителю — толще, темнее. Дальше — легче, тоньше.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'VaryaYakovleva3.jpeg',
        alt: 'VaryaYakovleva3',
        caption: [
          {
            tag: 'a',
            content: 'Varya Yakovleva',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/varya__yakovleva/?g=5' },
          },
        ],
      },
    },
    // {
    //   type: 'title',
    //   title: 'Дополнительно',
    // },
    // {
    //   type: 'text',
    //   text: [
    //     {
    //       tag: 'a',
    //       content: 'Про 4 типа линии: силуэт, конструкция, форма, фактура',
    //       props: { className: 'link', target: "_blank", to: 'https://kruzhokskorogorisunka.ru/202377.html?ysclid=lo5eh1vgp6502216306' },
    //     },
    //   ]
    // }
  ]
}

const lessonData13: ILessonDataDB = {
  orderInWeek: 3,
  id: 'LineShape_RY7PQ3',
  courseId: 'how-to-draw-free', // how-to-draw
  title: '1.3 Линия: как рисовать объемно',
  type: 'Theory',
  week: 1,
  startDate: '2023.12.03 21:00:00 GMT', // 2024.01.08,
  endDate: '2023.12.10 20:59:00 GMT', // 2024.01.14,
  resultsEndDate: '2023.12.12 21:00:00 GMT', // 2024.01.17,
  content: [
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Чтобы нарисованный линией предмет казался объемным, нужно:',
        },
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Рисовать легкий, тонкий контур. ',
          props: { className: 'keyText' },
        },
        {
          tag: 'span',
          content: 'Даже если внутри предмет нарисован объемно, толстый внешний контур уплостит рисунок.',
        },
      ],
    },
    {
      type: 'image',
      imageData: {
        id: 'RobertHendersonBlyth1.jpeg',
        alt: 'RobertHendersonBlyth1',
        caption: [
          {
            tag: 'a',
            content: 'Robert Henderson Blyth',
            props: { className: 's-hoverable', target: "_blank", to: 'https://all-drawings.livejournal.com/867721.html' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Рисовать толщинки предметов. ',
          props: { className: 'keyText' },
        },
        {
          tag: 'span',
          content: 'Толщина есть у всего: подноса, усика креветки, корочки хлеба.',
        },
      ],
    },
    {
      type: 'image',
      imageData: {
        id: 'DavidHockney1.jpeg',
        alt: 'DavidHockney1',
        caption: [
          {
            tag: 'a',
            content: 'David Hockney',
            props: { className: 's-hoverable', target: "_blank", to: 'https://all-drawings.livejournal.com/869696.html' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Показывать место, где поверхность резко меняет направление. ',
          props: { className: 'keyText' },
        },
        {
          tag: 'span',
          content: 'У предметов есть плоские, ровные поверхности и сломы, где поверхность резко меняет направление. Чтобы показать объем предмета в линейном рисунке, достаточно нарисовать место слома поверхности.',
        },
      ],
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Для куба — обозначить грани.',
        },
        {
          tag: 'p',
          content: 'Для шара, конуса, цилиндра — показать, как заворачивается поверхность.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'DimaGorelyshev41.png',
        alt: 'DimaGorelyshev41',
        caption: [
          {
            tag: 'a',
            content: 'Дмитрий Горелышев',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'DimaGorelyshev6.jpg',
        alt: 'DimaGorelyshev6',
        caption: [
          {
            tag: 'a',
            content: 'Дмитрий Горелышев',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'DimaGorelyshev5.jpg',
        alt: 'DimaGorelyshev5',
        caption: [
          {
            tag: 'a',
            content: 'Дмитрий Горелышев',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'DimaGorelyshev7.jpg',
        alt: 'DimaGorelyshev7',
        caption: [
          {
            tag: 'a',
            content: 'Дмитрий Горелышев',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'DimaGorelyshev14.jpg',
        alt: 'DimaGorelyshev14',
        caption: [
          {
            tag: 'a',
            content: 'Дмитрий Горелышев',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Рисовать ближние к зрителю линии толще, темнее.',
          props: { className: 'keyText' },
        },
      ],
    },
    {
      type: 'image',
      imageData: {
        id: 'DimaGorelyshev18.jpg',
        alt: 'DimaGorelyshev18',
        caption: [
          {
            tag: 'a',
            content: 'Дмитрий Горелышев',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'DimaGorelyshev40.jpg',
        alt: 'DimaGorelyshev40',
        caption: [
          {
            tag: 'a',
            content: 'Дмитрий Горелышев',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
  ]
}

const lessonData14: ILessonDataDB = {
  orderInWeek: 4,
  id: 'HowToDrawSimilarPicture_bah4tw',
  courseId: 'how-to-draw-free', // how-to-draw
  title: '1.4. Как рисовать похоже',
  type: 'Theory',
  week: 1,
  startDate: '2023.12.03 21:00:00 GMT', // 2024.01.08,
  endDate: '2023.12.10 20:59:00 GMT', // 2024.01.14,
  resultsEndDate: '2023.12.12 21:00:00 GMT', // 2024.01.17,
  content: [
    {
      type: 'title',
      title: 'Рисовать похоже — не значит срисовывать',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Необязательно точь в точь перерисовывать каждую деталь. Фотоаппарат справится с этим лучше, чем человек. Если рисунок критикуют за огрехи в анатомии, перспективе, значит у автора не получилось впечатлить зрителя. Зрителю скучно, но он не знает к чему придраться, поэтому говорит о самом простом — отличии рисунка от фото.',
        }
      ]
    },
    {
      type: 'qoute',
      qoute: [
        {
          tag: 'p',
          content: 'Если представить ось, на одном конце которой смайл, а на другом — реалистичный портрет, то чем ближе мы к полюсу реалистичного портрета, тем важнее убедительность светотени, анатомии, пространства, тем выше цена ошибки и склонность зрителя судить работу по уровню технических навыков. Двигаясь в обратную сторону, мы получаем больше свободы, больше возможностей для вовлечения в портрет посторонних форм и знаков, для метаморфоз, метафор и подмен, для жонглирования формой и контрформой. Здесь размыта граница межу графикой и письменным языком. … Простота не освобождает от ответственности за убедительность портрета, но создает другие категории ответственности, другие сценарии взаимодействия со зрителем, другие правила игры.',
        },
        {
          tag: 'p',
          content: 'Виктор Меламед, “Машинерия портрета”.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Примеры убедительных портретов, далеких от реализма',
    },
    {
      type: 'image',
      imageData: {
        id: 'MashaShishova1.jpg',
        alt: 'MashaShishova1',
        caption: [
          {
            tag: 'a',
            content: 'Masha Shishova, автопортрет',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/MariaShishova' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'VictorMelamed4.jpeg',
        alt: 'VictorMelamed4',
        caption: [
          {
            tag: 'a',
            content: 'Victor Melamed, портрет Гаррета Лиддиарда',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/melamed' },
          },
        ],
      },
    },
    {
      type: 'title',
      title: 'Рисунок — всегда условность',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Просто хотя бы потому что рисунок — это нечто, изображенное на двумерном листочке. И задача художника — работать с этой условностью.',
        }
      ]
    },
    {
      type: 'qoute',
      qoute: [
        {
          tag: 'p',
          content: '… изображение никогда не равно прототипу (нарисованная трубка — это не трубка), в нем всегда появляется дистанция, метаморфоза; она-то и становится предметом искусства.',
        },
        {
          tag: 'p',
          content: 'Виктор Меламед, “Машинерия портрета”.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Чтобы рисовать похоже, нужно научиться смотреть на натуру, не узнавая ее',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Чтобы поймать сходство, нужно забыть, что мы рисуем  голову, руку. Рисовать абстрактную форму, которая крепится к форме побольше снизу. Изучать изгибы этой формы. Это помогает видеть новое, не повторять заученные формы из головы: “палочка, палочка, огуречек, вот и вышел человечек”.',
        }
      ]
    },
    {
      type: 'title',
      title: 'Сходство в изображении поз',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Чтобы нарисовать сложную позу, нужно забыть, что мы о ней помним. И рисовать только то, что видим перед собой. Каким бы странным оно нам не казалось.',
        }
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'hannaleejoshi1.jpeg',
        alt: 'hannaleejoshi1',
        caption: [
          {
            tag: 'a',
            content: 'H A N N A / 이 한 나',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/hannaleejoshi/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'VaryaYakovleva3.jpeg',
        alt: 'VaryaYakovleva3',
        caption: [
          {
            tag: 'a',
            content: 'Varya Yakovleva',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/varya__yakovleva/?g=5' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'StasyaSokolovskaya2.jpeg',
        alt: 'StasyaSokolovskaya2',
        caption: [
          {
            tag: 'a',
            content: 'Stasya Sokolovskaya',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/Stasya_Sokolovskaya' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'ElenaBulay1.jpg',
        alt: 'ElenaBulay1',
        caption: [
          {
            tag: 'a',
            content: 'Elena Bulay',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/elena_bulay/?hl=ru' },
          },
        ],
      },
    },
    {
      type: 'title',
      title: 'Сходство в портретах',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Чтобы сделать портрет похожим, нужно смотреть на персонажа, как на какую-то интересную, новую форму. Рисовать то, что удивляет, запоминается.',
        }
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'VictorMelamed3.jpg',
        alt: 'VictorMelamed3',
        caption: [
          {
            tag: 'a',
            content: 'Victor Melamed, Frank Zappa Hot Rats',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/melamed' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'MashaShishova4.jpg',
        alt: 'MashaShishova4',
        caption: [
          {
            tag: 'a',
            content: 'Masha Shishova, портрет Zinaida Gippius',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/MariaShishova' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: 'И с собаками, чайниками, мягкими игрушками будет все тоже самое',
    },
    {
      type: 'image',
      imageData: {
        id: 'ElenaBulay2.jpg',
        alt: 'ElenaBulay2',
        caption: [
          {
            tag: 'a',
            content: 'Elena Bulay',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/elena_bulay/?hl=ru' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Проект Кати, в котором она нарисовала 32 портрета кошек своих подписчиков.',
        }
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'KatyaKlimova9.jpg',
        alt: 'KatyaKlimova9',
        caption: [
          {
            tag: 'a',
            content: 'Katya Klimova',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/KatyaKlimova' },
          },
        ],
      },
    },
    {
      type: 'title',
      title: 'Что отвечает за сходство',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'В плоском рисовании за сходство отвечают пропорции, размер. В объемном — расположение теней.',
        },
        {
          tag: 'p',
          content: 'Сравните предметы на рисунке ниже. Какие чаши больше похожи друг на друга, какие меньше? Чем чаши похожи, чем отличаются?',
        }
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'Comparison.jpg',
        alt: 'Comparison',
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'В первую очередь мы замечаем размер и пропорции: высота, ширина. Во вторую — детали: количество ободков на чаше, элементы, из которых состоит ручка.',
        },
        {
          tag: 'p',
          content: 'Если попасть в пропорции, но не нарисовать детали, предметы будут похожи. Если не попасть в пропорции, но нарисовать детали, будет казаться, что что-то не так.',
        }
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Пропорции нужны, чтобы сделать предметы схожими. ',
          props: { className: 'keyText' },
        },
        {
          tag: 'span',
          content: ' В какой мере они будут схожи решает автор.',
        },
      ],
    },
    {
      type: 'title',
      title: 'Дополнительно',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'a',
          content: '“Машинерия портрета”, Виктор Меламед',
          props: { className: 'link', target: "_blank", to: 'https://www.litres.ru/book/viktor-melamed/mashineriya-portreta-opyt-zritelya-prepodavatelya-i-hudozhn-51820460/?ysclid=lp0xg2v0qe373268414' },
        },
      ]
    },
  ],
};

const lessonData15: ILessonDataDB = {
  orderInWeek: 5,
  id: 'HowToDrawSimilarPictureLine_t6qrnq',
  courseId: 'how-to-draw-free', // how-to-draw
  title: '1.5. Как рисовать похоже. Линия',
  type: 'Theory',
  week: 1,
  startDate: '2023.12.03 21:00:00 GMT', // 2024.01.08,
  endDate: '2023.12.10 20:59:00 GMT', // 2024.01.14,
  resultsEndDate: '2023.12.12 21:00:00 GMT', // 2024.01.17,
  content: [
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'На этой неделе будет тренироваться рисовать похоже линией, отбирать с рисунка только ту информацию, которая нужна.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Как попадать в пропорции',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'На примере кружки разберем, как попадать в пропорции.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'DetailsLine1.jpeg',
        alt: 'DetailsLine1',
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: '1. Опишите, что видите. Из чего состоит предмет, что у него больше: ширина или высота? В какую фигуру его можно вписать?',
        },
        {
          tag: 'p',
          content: 'У кружки есть чаша, ручка и подставка. Все вместе можно вписать в квадрат.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'ProportionLine1.png',
        alt: 'ProportionLine1',
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Кружку и подставку можно вписать в прямоугольник, у которого высота в 1,5 раза больше ширины.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'ProportionLine3.png',
        alt: 'ProportionLine3',
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: '2. Мысленно проводите горизонтальные и вертикальные прямые, чтобы сравнить размеры предметов, расстояние между ними. Если сложно, можно потренировать упражнения с отрезками.',
        },
        {
          tag: 'p',
          content: 'Самая широкая часть чаши в 2 раза шире самой широкой части ручки.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'ProportionLine4.png',
        alt: 'ProportionLine4',
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Высота чаши в 3 раза больше, чем высота ножки.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'ProportionLine5.png',
        alt: 'ProportionLine5',
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: '3. Смотрите на контрформу, дырки между предметами. Нарисовать форму дырки может быть проще, чем нарисовать контур предмета.',
        },
      ]
    },
    {
      type: 'qoute',
      qoute: [
        {
          tag: 'p',
          content: 'Контраформа — главный инструмент раз-узнавания, способ смотреть так, чтобы изображение освобождалось от сопровождающих слов.',
        },
        {
          tag: 'p',
          content: 'Виктор Меламед, Машинерия портрета.',
        },
      ],
    },
    {
      type: 'image',
      imageData: {
        id: 'ProportionLine6.png',
        alt: 'ProportionLine6',
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: '4. Рисуйте от общего к частному, чтобы сохранить цельность большой формы. Например, сначала чаша и ножка, потом ручка.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'ProportionLine7.png',
        alt: 'ProportionLine7',
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Сходство добавляет выразительности рисунку. Но лишь в той мере, в какой автору это необходимо. Рисунок с искаженными пропорциями может быть выразительным.',
        },
      ]
    },
    {
      type: 'qoute',
      qoute: [
        {
          tag: 'p',
          content: '… изображение никогда не равно прототипу (нарисованная трубка — это не трубка), в нем всегда появляется дистанция, метаморфоза; она-то и становится предметом искусства.',
        },
        {
          tag: 'p',
          content: 'Виктор Меламед, Машинерия портрета.',
        },
      ],
    },
    {
      type: 'title',
      title: 'Как рисовать детали',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Детали рассказывают из чего состоит предмет. Например, ножка состоит из двух ярусов, у ручки есть завитушки.',
        },
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Детали добавляют выразительности, делают предмет интересным для разглядывания. ',
          props: { className: 'keyText' },
        },
        {
          tag: 'span',
          content: 'Сколько и где будет деталей решает автор. Можно равномерно распределить детали по всему предмету, тогда в нем все будет одинаковое. Можно добавить детали только там, куда хотим привлечь внимание, остальное оставить пустым.',
        },
      ],
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: '1. Посмотрите на предмет, решите, о какой его части хочется рассказать подробнее. Опишите вслух, из чего состоит эта часть, что будете рисовать. Например, ободок у чаши, большая завитушка у ручки, крепление и подставка у ножки.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'ProportionLine2.jpeg',
        alt: 'ProportionLine2',
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: '2. Рисуйте только то, что перечислили. Сначала - важные, потом - второстепенные. Больше деталей - в том месте, которое вам важно и интересно.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'DetailsLine2.png',
        alt: 'DetailsLine2',
      },
    },
  ],
};

const lessonData16: ILessonDataDB = {
  orderInWeek: 6,
  id: 'HowToDrawSimilarPictureLine_t6qrnq_Practice_iqln35',
  courseId: 'how-to-draw-free', // how-to-draw
  title: 'Практика первой недели',
  type: 'Practice',
  week: 1,
  startDate: '2023.12.03 21:00:00 GMT', // 2024.01.08,
  endDate: '2023.12.10 20:59:00 GMT', // 2024.01.14,
  resultsEndDate: '2023.12.12 21:00:00 GMT', // 2024.01.17,
  content: [
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'На этой неделе рисуем линией. Учимся управлять пропорциями в листе, тренируемся отбирать с фото только ту информацию, которая нужна.',
        },
        {
          tag: 'p',
          content: 'Выберите одну тему: кошки, собаки, чайники, лягушки. Нарисуйте сразу начисто, без исправлений 30 законченных работ.',
        },
        {
          tag: 'p',
          content: 'Возьмите референсы из своего фотоархива или интернета.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Как действовать',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: '1. Опишите вслух, как выглядит предмет, в какую фигуру его можно вписать. Как соотносятся его части, что происходит с контрформами. После этого рисуйте.',
        },
        {
          tag: 'p',
          content: '2. Начинайте от общего и двигайтесь к частному, чтобы сохранить цельность большой формы. Общая форма важнее деталей. Детали можно вообще не рисовать.',
        },
        {
          tag: 'p',
          content: '3. Сравнивайте пропорции относительно того, что уже нарисовано на листе. Если на листе чаша получилась длиннее, чем на фото, остальные предметы рисуйте чуть длиннее.',
        },
        {
          tag: 'p',
          content: '4. Рисуйте до конца, даже если кажется, что вы ошиблись. Мы тренируемся, исследуем как каждая новая линия влияет на общее впечатление. Чем больше неудачных линий мы сделаем, тем быстрее разберемся почему они появляются.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Дополнительно *',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Если чувствуете себя уверено, сделайте дополнительное задание.',
        },
        {
          tag: 'p',
          content: 'Покажите условный объем линией.',
        },
        {
          tag: 'p',
          content: 'Совместите в одной работе две разные линии. Придерживайтесь правила 70-30. Одной линии должны быть значимо больше, другой меньше.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Что выкладываем',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: '1. Сфотографируйте рисунки и приложите к заданию. Выкладывайте все, что есть:',
          props: {className: 'listHeader'}
        },
        {
          tag: 'p',
          content: 'в получившихся рисунках отметим и запомним удачные приемы;',
          props: {className: 'listItem'}
        },
        {
          tag: 'p',
          content: 'в неполучившихся разберем, что не нравится, вместе придумаем, как улучшить.',
          props: {className: 'listItem'}
        },
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: '2. Расскажите, что за чем делали, в какой последовательности рисовали. Что получилось, а что нет. Что понравилось, что осталось непонятным.',
        },
        {
          tag: 'p',
          content: '3. Задайте вопросы.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Необязательно точь в точь перерисовывать каждую деталь',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Фотоаппарат справится с этим лучше, чем человек. Если мы хотим, чтобы наш рисунок не оценивали по тому как точно мы повторили каждую деталь, нужно придумать что-то новое. Например, заметить что силуэт чайника напоминает кошку, нарисовать чайник который одновременно чайник и кошка.',
        },
        {
          tag: 'p',
          content: 'Если рисунок критикуют за огрехи в анатомии, перспективе, значит у автора не получилось впечатлить зрителя. Зрителю скучно, но он не знает к чему придраться, поэтому говорит о самом простом — отличии рисунка от фото.',
        },
      ]
    },
    {
      type: 'qoute',
      qoute: [
        {
          tag: 'p',
          content: '… изображение никогда не равно прототипу (нарисованная трубка — это не трубка), в нем всегда появляется дистанция, метаморфоза; она-то и становится предметом искусства.',
        },
        {
          tag: 'p',
          content: 'Виктор Меламед, Машинерия портрета.',
        },
      ],
    },
    {
      type: 'title',
      title: 'Любая степень реалистичности подходит. Рисуйте, как вам комфортно',
    },
    {
      type: 'qoute',
      qoute: [
        {
          tag: 'p',
          content: 'Если представить ось, на одном конце которой смайл, а на другом — реалистичный портрет, то чем ближе мы к полюсу реалистичного портрета, тем важнее убедительность светотени, анатомии, пространства, тем выше цена ошибки и склонность зрителя судить работу по уровню технических навыков. Двигаясь в обратную сторону, мы получаем больше свободы, больше возможностей для вовлечения в портрет посторонних форм и знаков, для метаморфоз, метафор и подмен, для жонглирования формой и контрформой. Здесь размыта граница межу графикой и письменным языком. … Простота не освобождает от ответственности за убедительность портрета, но создает другие категории ответственности, другие сценарии взаимодействия со зрителем, другие правила игры.',
        },
        {
          tag: 'p',
          content: 'Виктор Меламед, Машинерия портрета.',
        },
      ],
    },
    {
      type: 'title',
      title: 'Не преукрашайте своих персонажей',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Преукрашивание — это обычно усреднение. Лучше рассказать неприятную правду, чем нарисовать еще одного миленького котика.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Рисуйте сразу начисто, без исправлений',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Рисовать без исправлений сложно, непривычно. Это может показаться бессмысленным. Зачем рисовать криво, косо, непропорционально, если я могу стереть неверную линию и сделать хорошо. Но в этом и дело. Как только мы поставим себя в условия, где рисовать хорошо нужно сразу, начнется настоящая тренировка руки.',
        },
        {
          tag: 'p',
          content: 'Я впервые попробовала это упражнение 3 года назад. Около полугода я рисовала исключительно ручкой. И когда  я снова стала использовать карандаш, я просто не поверила в то, как я теперь могу рисовать! Попробуйте, хотя бы в рамках курса.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Рисуйте привычными для вас материалами',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'На этом курсе нет цели освоить новый материал или технику. Рисуйте теми материалами, к которым привыкли. Если вы никогда не рисовали, возьмите обычную шариковую ручку, рисуйте ей.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Не стесняйтесь загружать свои работы',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Часто так бывает, что нам больше нравятся рисунки других, чем свои собственные. Поэтому важно делиться работами. Работа, которая кажется нам скучной, может удивит и вдохновит кого-то другого. А после этого может и мы сами сможем заметить в ней что-то интересное.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Рисуйте вместе со мной',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'У меня нет цели научиться вас рисовать так же, как я. В этих видео к заданиям я  рисую вместе с вами за компанию. Так же как и вы изучаю возможности инструмента, ищу интересное в референсах, придумываю как это передать в рисунке.',
        },
        {
          tag: 'p',
          content: 'Не все получается с первого раза, и не важно как давно мы рисуем. Нарисовать 10 раз, чтобы выбрать один — нормальный, рабочий процесс. Когда я смотрела блоги других иллюстраторов, или онлайн-курсы, я думала, что у них-то все всегда получается. Но это не так. Мы все люди, что-то получается лучше, что-то хуже. Если всегда делать только то, что получается, ничему новому не научишься.',
        },
      ]
    },
    {
      type: 'video',
      videoData: {
        src: 'https://www.youtube.com/embed/ZrhaCN6-91Q?si=ZxU0otzNubj_ivqT?loop=1',
        title: 'YouTube video player',
      },
    },
    {
      type: 'title',
      title: 'Примеры линейных рисунков',
    },
    {
      type: 'gallery',
      images: [
        {
          id: 'LineCat1.jpg',
          alt: 'LineCat1',
        },
        {
          id: 'LineCat2.jpg',
          alt: 'LineCat2',
        },
        {
          id: 'LineCat3.jpg',
          alt: 'LineCat3',
        },
        {
          id: 'LineCat4.jpg',
          alt: 'LineCat4',
        },
        {
          id: 'LineCat5.jpg',
          alt: 'LineCat5',
        },
        {
          id: 'LineCat6.jpg',
          alt: 'LineCat6',
        },
        {
          id: 'LineCat7.jpg',
          alt: 'LineCat7',
        },
        {
          id: 'LineCat8.jpg',
          alt: 'LineCat8',
        },
        {
          id: 'LineCat9.jpg',
          alt: 'LineCat9',
        },
        {
          id: 'LineCat10.jpg',
          alt: 'LineCat10',
        },
        {
          id: 'LineCat11.jpg',
          alt: 'LineCat11',
        },
        {
          id: 'LineCat12.jpg',
          alt: 'LineCat12',
        },
        {
          id: 'LineCat13.jpg',
          alt: 'LineCat13',
        },
        {
          id: 'LineCat14.jpg',
          alt: 'LineCat14',
        },
        {
          id: 'LineCat15.jpg',
          alt: 'LineCat15',
        },
        {
          id: 'LineCat16.jpg',
          alt: 'LineCat16',
        },
        {
          id: 'LineCat17.jpg',
          alt: 'LineCat17',
        },
        {
          id: 'LineCat18.jpg',
          alt: 'LineCat18',
        },
        {
          id: 'LineCat19.jpg',
          alt: 'LineCat19',
        },
        {
          id: 'LineCat20.jpg',
          alt: 'LineCat20',
        },
        {
          id: 'LineCat21.jpg',
          alt: 'LineCat21',
        },
        {
          id: 'LineCat22.jpg',
          alt: 'LineCat22',
        },
        {
          id: 'LineCat23.jpg',
          alt: 'LineCat23',
        },
        {
          id: 'LineCat24.jpg',
          alt: 'LineCat24',
        },
        {
          id: 'LineCat25.jpg',
          alt: 'LineCat25',
        },
        {
          id: 'LineCat26.jpg',
          alt: 'LineCat26',
        },
        {
          id: 'LineCat27.jpg',
          alt: 'LineCat27',
        },
        {
          id: 'LineCat28.jpg',
          alt: 'LineCat28',
        },
        {
          id: 'LineCat29.jpg',
          alt: 'LineCat29',
        },
        {
          id: 'LineCat30.jpg',
          alt: 'LineCat30',
        },
      ]
    },
  ]
}

const lessonData21: ILessonDataDB = {
  orderInWeek: 1,
  id: 'DifferencesLineSpot_W4baHU',
  courseId: 'how-to-draw-free', // how-to-draw
  title: '2.1 Про разницу между линией и пятном',
  type: 'Theory',
  week: 2,
  startDate: '2023.12.10 21:00:00 GMT', // 2024.01.15,
  endDate: '2023.12.17 20:59:00 GMT', // 2024.01.21,
  resultsEndDate: '2023.12.19 21:00:00 GMT', // 2024.01.24,
  content: [
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Линейные инструменты: карандаш, ручка подталкивают к точному рисованию. Пятновые — аппликация, тушь к более условному.',
        },
      ]
    },
    {
      type: 'qoute',
      qoute: [
        {
          tag: 'p',
          content: 'Линия отвечает за информативность, строение. Идеальная линия — чертеж. Пятно отвечает за первое впечатление, эмоцию. Идеальное пятно — клякса.',
        },
        {
          tag: 'p',
          content: 'Дмитрий Горелышев',
        },
      ],
    },
    {
      type: 'title',
      title: 'Примеры набросков линией и пятном',
    },
    {
      type: 'image',
      imageData: {
        id: 'KirillZiman6.jpeg',
        alt: 'KirillZiman6',
        caption: [
          {
            tag: 'a',
            content: 'Kirill Ziman',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/kirillziman/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'KirillZiman7.jpeg',
        alt: 'KirillZiman7',
        caption: [
          {
            tag: 'a',
            content: 'Kirill Ziman',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/kirillziman/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'KirillZiman8.jpeg',
        alt: 'KirillZiman8',
        caption: [
          {
            tag: 'a',
            content: 'Kirill Ziman',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/kirillziman/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'KirillZiman9.jpeg',
        alt: 'KirillZiman9',
        caption: [
          {
            tag: 'a',
            content: 'Kirill Ziman',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/kirillziman/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'KirillZiman10.jpg',
        alt: 'KirillZiman10',
        caption: [
          {
            tag: 'a',
            content: 'Kirill Ziman',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/kirillziman/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'KirillZiman11.jpeg',
        alt: 'KirillZiman11',
        caption: [
          {
            tag: 'a',
            content: 'Kirill Ziman',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/kirillziman/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Это условное разделение. В рисунках встречаются четкие, информативные пятна и свободные, бегущие линии. Но это, скорее, особое поведение линий и пятен.',
        },
      ]
    },
  ]
}

const lessonData22: ILessonDataDB = {
  orderInWeek: 2,
  id: 'SpotIntroduction_R4vzDr',
  courseId: 'how-to-draw-free', // how-to-draw
  title: '2.2 Пятно: знакомство',
  type: 'Theory',
  week: 2,
  startDate: '2023.12.10 21:00:00 GMT', // 2024.01.15,
  endDate: '2023.12.17 20:59:00 GMT', // 2024.01.21,
  resultsEndDate: '2023.12.19 21:00:00 GMT', // 2024.01.24,
  content: [
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Основные свойства пятна: контроль, светлота, плотность, фактура.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Контроль, случайность',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Пятно может быть четким, контролируемым:',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'AndreaSerio1.webp',
        alt: 'AndreaSerio1',
        caption: [
          {
            tag: 'a',
            content: 'Andrea Serio',
            props: { className: 's-hoverable', target: "_blank", to: 'https://andreaserio.wordpress.com/portfolio-2/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'AndreaSerio5.webp',
        alt: 'AndreaSerio5',
        caption: [
          {
            tag: 'a',
            content: 'Andrea Serio',
            props: { className: 's-hoverable', target: "_blank", to: 'https://andreaserio.wordpress.com/portfolio-2/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'AndreaSerio4.webp',
        alt: 'AndreaSerio4',
        caption: [
          {
            tag: 'a',
            content: 'Andrea Serio',
            props: { className: 's-hoverable', target: "_blank", to: 'https://andreaserio.wordpress.com/portfolio-2/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'AndreaSerio3.webp',
        alt: 'AndreaSerio3',
        caption: [
          {
            tag: 'a',
            content: 'Andrea Serio',
            props: { className: 's-hoverable', target: "_blank", to: 'https://andreaserio.wordpress.com/portfolio-2/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'AndreaSerio2.webp',
        alt: 'AndreaSerio2',
        caption: [
          {
            tag: 'a',
            content: 'Andrea Serio',
            props: { className: 's-hoverable', target: "_blank", to: 'https://andreaserio.wordpress.com/portfolio-2/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'ArinaSerebriakova.jpeg',
        alt: 'ArinaSerebriakova',
        caption: [
          {
            tag: 'a',
            content: 'Arina Serebriakova',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/ri.silver/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'DimaGorelyshev19.jpg',
        alt: 'DimaGorelyshev19',
        caption: [
          {
            tag: 'a',
            content: 'Dima Gorelyshev',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'DimaGorelyshev20.jpg',
        alt: 'DimaGorelyshev20',
        caption: [
          {
            tag: 'a',
            content: 'Dima Gorelyshev',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'ELENAFEKLISTOVA.jpg',
        alt: 'ELENAFEKLISTOVA',
        caption: [
          {
            tag: 'a',
            content: 'ELENA FEKLISTOVA',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/e.feklistova/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'таняборисова.jpeg',
        alt: 'таняборисова',
        caption: [
          {
            tag: 'a',
            content: 'таня борисова',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/ta_boris/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Пятно может быть случайным, непредсказуемым:',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'StasyaSokolovskaya2.jpg',
        alt: 'StasyaSokolovskaya2',
        caption: [
          {
            tag: 'a',
            content: 'Stasya Sokolovskaya',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/stasyasokolovska/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'KseniaKopalova1.jpeg',
        alt: 'KseniaKopalova1',
        caption: [
          {
            tag: 'a',
            content: 'Ksenia Kopalova',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/ksenia.kopalova/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'shevolya_illustration.jpg',
        alt: 'shevolya_illustration',
        caption: [
          {
            tag: 'a',
            content: 'shevolya_illustration',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/shevolya_illustration/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'JeanMallard1.jpeg',
        alt: 'JeanMallard1',
        caption: [
          {
            tag: 'a',
            content: 'Jean Mallard',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/jean.mallard/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'MartynaCzub.jpeg',
        alt: 'MartynaCzub',
        caption: [
          {
            tag: 'a',
            content: 'Martyna Czub',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/martyna.czub/?hl=ru' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'LiliyaBusarova.jpeg',
        alt: 'LiliyaBusarova',
        caption: [
          {
            tag: 'a',
            content: 'Liliya Busarova',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/liliya_busarova/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'ElenaNovoselova1.jpeg',
        alt: 'ElenaNovoselova1',
        caption: [
          {
            tag: 'a',
            content: 'Elena Novoselova',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/novoelena/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Регулируя контроль над инструментом, можно выделять главное в рисунке. Например, на рисунке ниже, основная часть свободным, живым пятном. Главное — выделено аппликацией.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'bayduzha2.jpeg',
        alt: 'bayduzha2',
        caption: [
          {
            tag: 'a',
            content: 'Наташа Байдужа',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/bayduzha/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'SofiUlyanova1.png',
        alt: 'SofiUlyanova1',
        caption: [
          {
            tag: 'a',
            content: 'Sofi Ulyanova',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/sofiulianova' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Чтобы нарисовать случайное, непредсказуемое пятно, нужно ограничить контроль над инструментом.',
          props: { className: 'listHeader' },
        },
        {
          tag: 'p',
          content: 'Взять широкую кисть.',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Сильно разбавить краску водой.',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Рисовать с ограничением по времени: за 1 минуту, за 3 минуты.',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Постоянно двигать рукой, не делать пауз.',
          props: { className: 'listItem' },
        },
      ],
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Низкий контроль над инструментом не означает, что автор плохо рисует или не понимает, что рисует. Низкий контроль дает линии больше живости и свободы. Но даже в этом случае рисунок по прежнему должен быть убедительным.',
        },
        {
          tag: 'p',
          content: 'Чтобы получить убедительную картинку с плохо контролируемым материалом, нужно увеличить количество итераций. Тогда мы получим легкость + убедительность. Чтобы нарисовать убедительную кошку текучим пятном. Нужно нарисовать 10 минутных рисунков разных кошек. И выбрать среди них один, самый лучший.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Тон: темное, светлое',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Тон — светлота пятна. Самый светлый тон — белый, самый темный — черный.',
        },
        {
          tag: 'p',
          content: 'У цветных красок тоже есть светлота. Чтобы ее увидеть, нужно сфотографировать рисунок и перевести фото в чб:',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'JOZEF _AN_RUYSSEVELT1.jpeg',
        alt: 'JOZEF _AN_RUYSSEVELT1',
        caption: [
          {
            tag: 'a',
            content: 'Jozeph Van Ruyssevelt',
            props: { className: 's-hoverable', target: "_blank", to: 'http://jozefvanruyssevelt.be/sketches.php' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Исходный рисунок:',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'JOZEF _AN_RUYSSEVELT2.jpeg',
        alt: 'JOZEF _AN_RUYSSEVELT2',
        caption: [
          {
            tag: 'a',
            content: 'Jozeph Van Ruyssevelt',
            props: { className: 's-hoverable', target: "_blank", to: 'http://jozefvanruyssevelt.be/sketches.php' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Если тона в рисунке отличаются слабо, рисунок нюансный:',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'AndrewGraves1.jpeg',
        alt: 'AndrewGraves1',
        caption: [
          {
            tag: 'a',
            content: 'Andrew Graves',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.andrewjgraves.com/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'NadyaDrobysheva2.jpeg',
        alt: 'NadyaDrobysheva2',
        caption: [
          {
            tag: 'a',
            content: 'Nadya Drobysheva',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/nadyadrobysheva' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Если тона в рисунке отличаются сильно, рисунок контрастный:',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'ArinaSerebriakova1.jpeg',
        alt: 'ArinaSerebriakova1',
        caption: [
          {
            tag: 'a',
            content: 'Arina Serebriakova',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/ri.silver/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'ArinaSerebriakova2.jpg',
        alt: 'ArinaSerebriakova2',
        caption: [
          {
            tag: 'a',
            content: 'Arina Serebriakova',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/ri.silver/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Чтобы осветлить пятно, можно:',
          props: {className: 'listHeader'}
        },
        {
          tag: 'p',
          content: 'Изменить нажим.',
          props: {className: 'listItem'}
        },
        {
          tag: 'p',
          content: 'Взять другой цвет.',
          props: {className: 'listItem'}
        },
        {
          tag: 'p',
          content: 'Разбавить краску водой или добавить в нее белил.',
          props: {className: 'listItem'}
        },
        {
          tag: 'p',
          content: 'Поверх покрасить белым карандашом или белой краской.',
          props: {className: 'listItem'}
        },
        {
          tag: 'p',
          content: 'Приклеить поверх пятна прозрачную белую кальку.',
          props: {className: 'listItem'}
        },
        {
          tag: 'p',
          content: 'Осветлить нужные участки в Photoshop.',
          props: {className: 'listItem'}
        },
      ]
    },
    {
      type: 'title',
      title: 'Плотное, прозрачное',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Пятно может быть плотным, глухим:',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'ИринаГеннадиевна.jpeg',
        alt: 'ИринаГеннадиевна',
        caption: [
          {
            tag: 'a',
            content: 'Ирина Геннадиевна Васильева',
            props: { className: 's-hoverable', target: "_blank", to: 'https://all-drawings.livejournal.com/961191.html?ysclid=lp9fnwo9nd541324099' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'ClareYoungs7.jpeg',
        alt: 'ClareYoungs7',
        caption: [
          {
            tag: 'a',
            content: 'Clare Youngs',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.clareyoungs.co.uk/shop' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Пятно может быть прозрачным, просвечивающим:',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'FrancescoPoiana1.jpeg',
        alt: 'FrancescoPoiana1',
        caption: [
          {
            tag: 'a',
            content: 'Francesco Poiana',
            props: { className: 's-hoverable', target: "_blank", to: 'http://drawing-museum.org/2019/09/14/francesco-poiana-%d1%80%d0%be%d0%b4-1990%d0%b3/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'JeanMallard1.jpeg',
        alt: 'JeanMallard1',
        caption: [
          {
            tag: 'a',
            content: 'Jean Mallard',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/jean.mallard/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Чтобы получить плотное, непрозрачное пятно, можно:',
          props: { className:'listHeader' }
        },
        {
          tag: 'p',
          content: 'Покрыть пятно в несколько слоев.',
          props: { className:'listItem' }
        },
        {
          tag: 'p',
          content: 'Рисовать штрихи очень близко друг к другу.',
          props: { className:'listItem' }
        },
        {
          tag: 'p',
          content: 'Взять укрывистую, плотную краску.',
          props: { className:'listItem' }
        },
        {
          tag: 'p',
          content: 'Рисовать неразбавленной краской из тюбика, кюветки.',
          props: { className:'listItem' }
        },
      ]
    },
    {
      type: 'title',
      title: 'Фактура',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Пятно может быть фактурным:',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'ClareYoungs5.jpg',
        alt: 'ClareYoungs5',
        caption: [
          {
            tag: 'a',
            content: 'Clare Youngs',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.clareyoungs.co.uk/shop' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'ClareYoungs6.jpeg',
        alt: 'ClareYoungs6',
        caption: [
          {
            tag: 'a',
            content: 'Clare Youngs',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.clareyoungs.co.uk/shop' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'ClareYoungs7.jpeg',
        alt: 'ClareYoungs7',
        caption: [
          {
            tag: 'a',
            content: 'Clare Youngs',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.clareyoungs.co.uk/shop' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'MashaShishova7.jpg',
        alt: 'MashaShishova7',
        caption: [
          {
            tag: 'a',
            content: 'Masha Shishova',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/MariaShishova' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Может быть гладким, равномерным:',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'RiccardoGuasco7.jpeg',
        alt: 'RiccardoGuasco7',
        caption: [
          {
            tag: 'a',
            content: 'Riccardo Guasco',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/guascoriccardo/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'RiccardoGuasco3.jpeg',
        alt: 'RiccardoGuasco3',
        caption: [
          {
            tag: 'a',
            content: 'Riccardo Guasco',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/guascoriccardo/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Контраст фактурного пятна и однородного фона:',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'AndréCarrilho8.jpeg',
        alt: 'AndréCarrilho8',
        caption: [
          {
            tag: 'a',
            content: 'André Carrilho',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/andre_carrilho/?ysclid=ln321z8cus372402208' },
          },
        ],
      },
    },
  ]
}

const lessonData23: ILessonDataDB = {
  orderInWeek: 3,
  id: 'HowToDrawSimilarPictureSpot_p6hXtt',
  courseId: 'how-to-draw-free', // how-to-draw
  title: '2.3 Как рисовать похоже. Пятно',
  type: 'Theory',
  week: 2,
  startDate: '2023.12.10 21:00:00 GMT', // 2024.01.15,
  endDate: '2023.12.17 20:59:00 GMT', // 2024.01.21,
  resultsEndDate: '2023.12.19 21:00:00 GMT', // 2024.01.24,
  content: [
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Разберем рисунок от пятна на примере кружки:',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'ProportionSpot1.jpeg',
        alt: 'ProportionSpot',
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Первый этап такой же, как и в линейном рисунке. Нужно внимательно рассмотреть и описать предмет.',
        },
        {
          tag: 'p',
          content: '1. Опишите, что видите. Из чего состоит предмет, что у него больше: ширина или высота? В какую фигуру его можно вписать?',
        },
        {
          tag: 'p',
          content: 'У кружки есть чаша, ручка и подставка. Все вместе можно вписать в квадрат.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'ProportionSpot2.png',
        alt: 'ProportionSpot2',
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Кружку и подставку можно вписать в прямоугольник, у которого высота в 1,5 раза больше ширины.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'ProportionSpot3.png',
        alt: 'ProportionSpot3',
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: '2. Мысленно проводите горизонтальные и вертикальные прямые, чтобы сравнить размеры предметов, расстояние между ними. Если сложно, можно потренировать упражнения с отрезками.',
        },
        {
          tag: 'p',
          content: 'Самая широкая часть чаши в 2 раза шире самой широкой части ручки.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'ProportionSpot4.png',
        alt: 'ProportionSpot4',
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Высота чаши в 3 раза больше, чем высота ножки.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'ProportionSpot5.png',
        alt: 'ProportionSpot5',
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: '3. Смотрите на контрформу, дырки между предметами. Нарисовать форму дырки может быть проще, чем нарисовать контур предмета.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'ProportionSpot6.png',
        alt: 'ProportionSpot6',
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: '4. Рисуйте от общего к частному. Набирайте пятно-силуэт из центра, постепенно двигаясь к краям.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'ProportionSpot7.png',
        alt: 'ProportionSpot7',
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Другим тоном покажите строение предмета внутри:',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'ProportionSpot8.png',
        alt: 'ProportionSpot8',
      },
    },
  ]
}

const lessonData24: ILessonDataDB = {
  orderInWeek: 4,
  id: 'SpotShape_dftUrH',
  courseId: 'how-to-draw-free', // how-to-draw
  title: '2.4 Как рисовать объемно. Пятно',
  type: 'Theory',
  week: 2,
  startDate: '2023.12.10 21:00:00 GMT', // 2024.01.15,
  endDate: '2023.12.17 20:59:00 GMT', // 2024.01.21,
  resultsEndDate: '2023.12.19 21:00:00 GMT', // 2024.01.24,
  content: [
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Чтобы показать объем пятном, нужно изобразить свет и тень на предмете. На месте слома формы освещенная часть переходит в тень. Это помогает понять, как выглядит поверхность предмета.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'Shape1.png',
        alt: 'Shape1',
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Есть 6 тонов светотени: блик и свет, полутень, собственная тень, рефлекс, падающая тень.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'Shape2.png',
        alt: 'Shape2',
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'Shape3.png',
        alt: 'Shape3',
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'Shape4.png',
        alt: 'Shape4',
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'В условном, нематериальном рисовании можно сократить количество тонов до 2-3.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'Example1.jpg',
        alt: 'Example1',
        caption: [
          {
            tag: 'a',
            content: 'Sofia Ulianova',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/sofiulianova' },
          },
        ],
      },
    },
    {
      type: 'title',
      title: 'Дополнительно',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'a',
          content: 'Как рисовать "Свет" - А. Рыжкин',
          props: { className: 'link', target: "_blank", to: 'https://www.youtube.com/watch?v=UXIu8n1iT1Y&list=PLcxiCEpRkKE2yM-gRH6FXyCwlsuJd35hR&index=3' },
        },
      ]
    },
  ]
}

const lessonData25: ILessonDataDB = {
  orderInWeek: 5,
  id: 'SpotPractice_kfKAEY',
  courseId: 'how-to-draw-free', // how-to-draw
  title: 'Практика второй недели',
  type: 'Practice',
  week: 2,
  startDate: '2023.12.10 21:00:00 GMT', // 2024.01.15,
  endDate: '2023.12.17 20:59:00 GMT', // 2024.01.21,
  resultsEndDate: '2023.12.19 21:00:00 GMT', // 2024.01.24,
  content: [
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'На этой неделе рисуем пятном. Учимся управлять пропорциями в листе, тренируемся отбирать с фото только ту информацию, которая нужна.',
        },
        {
          tag: 'p',
          content: 'Выберите одну тему: кошки, собаки, чайники, лягушки. Нарисуйте 5-6 законченных работ.',
        },
        {
          tag: 'p',
          content: 'Возьмите референсы из своего фотоархива или интернета.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Как действовать',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: '1. Опишите вслух, как выглядит предмет, в какую фигуру его можно вписать. Как соотносятся его части, что происходит с контрформами.',
        },
        {
          tag: 'p',
          content: '2. Прежде чем рисовать, решите, сколько тонов будет в вашем рисунке. Ограничение: от 2 (черно-белый рисунок) до 4, включая белый. Соблюдайте ограничение.',
        },
        {
          tag: 'p',
          content: '3. Начинайте от общего и двигайтесь к частному, чтобы сохранить цельность большой формы. Общая форма важнее деталей. Детали можно вообще не рисовать.',
        },
        {
          tag: 'p',
          content: '4. Сравнивайте пропорции относительно того, что уже нарисовано на листе. Если на листе чаша получилась длиннее, чем на фото, остальные предметы рисуйте чуть длиннее.',
        },
        {
          tag: 'p',
          content: '5. Рисуйте до конца, даже если кажется, что вы ошиблись. Мы тренируемся, исследуем как каждая новая линия влияет на общее впечатление. Чем больше неудачных линий мы сделаем, тем быстрее разберемся почему они появляются.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Дополнительно *',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Если чувствуете себя уверено, сделайте дополнительное задание.',
        },
        {
          tag: 'p',
          content: 'Покажите условный объем пятном.',
        },
        {
          tag: 'p',
          content: 'Совместите в одной работе два разных пятна. Придерживайтесь правила 70-30. Одного типа пятен должны быть значимо больше, другого меньше.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Что выкладываем',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: '1. Сфотографируйте рисунки и приложите к заданию. Выкладывайте все, что есть:',
          props: {className: 'listHeader'}
        },
        {
          tag: 'p',
          content: 'в получившихся рисунках отметим и запомним удачные приемы;',
          props: {className: 'listItem'}
        },
        {
          tag: 'p',
          content: 'в неполучившихся разберем, что не нравится, вместе придумаем, как улучшить.',
          props: {className: 'listItem'}
        },
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: '2. Расскажите, что за чем делали, в какой последовательности рисовали. Что получилось, а что нет. Что понравилось, что осталось непонятным.',
        },
        {
          tag: 'p',
          content: '3. Задайте вопросы.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Необязательно точь в точь перерисовывать каждую деталь',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Фотоаппарат справится с этим лучше, чем человек. Если мы хотим, чтобы наш рисунок не оценивали по тому как точно мы повторили каждую деталь, нужно придумать что-то новое. Например, заметить что силуэт чайника напоминает кошку, нарисовать чайник который одновременно чайник и кошка.',
        },
        {
          tag: 'p',
          content: 'Если рисунок критикуют за огрехи в анатомии, перспективе, значит у автора не получилось впечатлить зрителя. Зрителю скучно, но он не знает к чему придраться, поэтому говорит о самом простом — отличии рисунка от фото.',
        },
      ]
    },
    {
      type: 'qoute',
      qoute: [
        {
          tag: 'p',
          content: '… изображение никогда не равно прототипу (нарисованная трубка — это не трубка), в нем всегда появляется дистанция, метаморфоза; она-то и становится предметом искусства.',
        },
        {
          tag: 'p',
          content: 'Виктор Меламед, Машинерия портрета.',
        },
      ],
    },
    {
      type: 'title',
      title: 'Любая степень реалистичности подходит. Рисуйте, как вам комфортно',
    },
    {
      type: 'qoute',
      qoute: [
        {
          tag: 'p',
          content: 'Если представить ось, на одном конце которой смайл, а на другом — реалистичный портрет, то чем ближе мы к полюсу реалистичного портрета, тем важнее убедительность светотени, анатомии, пространства, тем выше цена ошибки и склонность зрителя судить работу по уровню технических навыков. Двигаясь в обратную сторону, мы получаем больше свободы, больше возможностей для вовлечения в портрет посторонних форм и знаков, для метаморфоз, метафор и подмен, для жонглирования формой и контрформой. Здесь размыта граница межу графикой и письменным языком. … Простота не освобождает от ответственности за убедительность портрета, но создает другие категории ответственности, другие сценарии взаимодействия со зрителем, другие правила игры.',
        },
        {
          tag: 'p',
          content: 'Виктор Меламед, Машинерия портрета.',
        },
      ],
    },
    {
      type: 'title',
      title: 'Не преукрашайте своих персонажей',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Преукрашивание — это обычно усреднение. Лучше рассказать неприятную правду, чем нарисовать еще одного миленького котика.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Рисуйте сразу начисто, без исправлений',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Рисовать без исправлений сложно, непривычно. Это может показаться бессмысленным. Зачем рисовать криво, косо, непропорционально, если я могу стереть неверную линию и сделать хорошо. Но в этом и дело. Как только мы поставим себя в условия, где рисовать хорошо нужно сразу, начнется настоящая тренировка руки.',
        },
        {
          tag: 'p',
          content: 'Я впервые попробовала это упражнение 3 года назад. Около полугода я рисовала исключительно ручкой. И когда  я снова стала использовать карандаш, я просто не поверила в то, как я теперь могу рисовать! Попробуйте, хотя бы в рамках курса.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Рисуйте привычными для вас материалами',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Рисуйте теми материалами, к которым привыкли. Если вы никогда не рисовали, возьмите черную тушь и мягкую кисть 3-4 размера.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Не стесняйтесь загружать свои работы',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Часто так бывает, что нам больше нравятся рисунки других, чем свои собственные. Поэтому важно делиться работами. Работа, которая кажется нам скучной, может удивит и вдохновит кого-то другого. А после этого может и мы сами сможем заметить в ней что-то интересное.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Рисуйте вместе со мной',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'У меня нет цели научиться вас рисовать так же, как я. В этих видео к заданиям я  рисую вместе с вами за компанию. Так же как и вы изучаю возможности инструмента, ищу интересное в референсах, придумываю как это передать в рисунке.',
        },
        {
          tag: 'p',
          content: 'Не все получается с первого раза, и не важно как давно мы рисуем. Нарисовать 10 раз, чтобы выбрать один — нормальный, рабочий процесс. Когда я смотрела блоги других иллюстраторов, или онлайн-курсы, я думала, что у них-то все всегда получается. Но это не так. Мы все люди, что-то получается лучше, что-то хуже. Если всегда делать только то, что получается, ничему новому не научишься.',
        },
      ]
    },
    {
      type: 'video',
      videoData: {
        src: 'https://www.youtube.com/embed/7dWHIzukE7o?si=c0RUM6UYzf7mS7we?loop=1',
        title: 'YouTube video player',
      },
    },
    {
      type: 'title',
      title: 'Примеры рисунков пятном',
    },
    {
      type: 'gallery',
      images: [
        {
          id: 'SpotCat1.jpg',
          alt: 'SpotCat1',
        },
        {
          id: 'SpotCat2.jpg',
          alt: 'SpotCat2',
        },
        {
          id: 'SpotCat3.jpg',
          alt: 'SpotCat3',
        },
        {
          id: 'SpotCat4.jpg',
          alt: 'SpotCat4',
        },
        {
          id: 'SpotCat5.jpg',
          alt: 'SpotCat5',
        },
        {
          id: 'SpotCat6.jpg',
          alt: 'SpotCat6',
        },
        {
          id: 'SpotCat7.jpg',
          alt: 'SpotCat7',
        },
        {
          id: 'SpotCat8.jpg',
          alt: 'SpotCat8',
        },
        {
          id: 'SpotCat9.jpg',
          alt: 'SpotCat9',
        },
        {
          id: 'SpotCat10.jpg',
          alt: 'SpotCat10',
        },
        {
          id: 'SpotCat11.jpg',
          alt: 'SpotCat11',
        },
        {
          id: 'SpotCat12.jpg',
          alt: 'SpotCat12',
        },
        {
          id: 'SpotCat13.jpg',
          alt: 'SpotCat13',
        },
        {
          id: 'SpotCat14.jpg',
          alt: 'SpotCat14',
        },
        {
          id: 'SpotCat15.jpg',
          alt: 'SpotCat15',
        },
        {
          id: 'SpotCat16.jpg',
          alt: 'SpotCat16',
        },
        {
          id: 'SpotCat17.jpg',
          alt: 'SpotCat17',
        },
        {
          id: 'SpotCat18.jpg',
          alt: 'SpotCat18',
        },
        {
          id: 'SpotCat19.jpg',
          alt: 'SpotCat19',
        },
        {
          id: 'SpotCat20.jpg',
          alt: 'SpotCat20',
        },
        {
          id: 'SpotCat21.jpg',
          alt: 'SpotCat21',
        },
        {
          id: 'SpotCat22.jpg',
          alt: 'SpotCat22',
        },
        {
          id: 'SpotCat23.jpg',
          alt: 'SpotCat23',
        },
        {
          id: 'SpotCat24.jpg',
          alt: 'SpotCat24',
        },
        {
          id: 'SpotCat25.jpg',
          alt: 'SpotCat25',
        },
        {
          id: 'SpotCat26.jpg',
          alt: 'SpotCat26',
        },
        {
          id: 'SpotCat27.jpg',
          alt: 'SpotCat27',
        },
        {
          id: 'SpotCat28.jpg',
          alt: 'SpotCat28',
        },
        {
          id: 'SpotCat29.jpg',
          alt: 'SpotCat29',
        },
        {
          id: 'SpotCat30.jpg',
          alt: 'SpotCat30',
        },
      ]
    },
  ]
}

const lessonData31: ILessonDataDB = {
  orderInWeek: 1,
  id: 'LineAndSpot_jr2WYu',
  courseId: 'how-to-draw-free', // how-to-draw
  title: '3.1 Линия и пятно: как совмещать',
  type: 'Theory',
  week: 3,
  startDate: '2023.12.17 21:00:00 GMT', // 2024.01.22,
  endDate: '2023.12.24 20:59:00 GMT', // 2024.01.28,
  resultsEndDate: '2023.12.26 21:00:00 GMT', // 2024.02.01,
  content: [
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'На третьей неделе будем учиться совмещать линейное и пятновое рисование в одной работе.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Одного должно быть больше, другого меньше',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Чтобы линия и пятно не спорили друг с другом, чего-то должно быть значимо больше. Например, основной рисунок пятном, главное — линией.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'LisWatkins2.jpeg',
        alt: 'LisWatkins2',
        caption: [
          {
            tag: 'a',
            content: 'Lis Watkins',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/lineandwash/' },
          },
        ],
      },
    },
    {
      type: 'title',
      title: 'Линия и пятно должны играть разные роли, не дублируя друг друга',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Линия и пятно — два слоя, из которых складывается изображение. Если мы все делаем правильно, у каждого свойства своя роль. Рисунок перестает читаться и выглядит незавершенным, если мы мысленно убираем любой из этих слоев. Если мы убираем слой линии или пятна, а изображение ничего не теряет, значит, линии и пятна дублируют друг друга.',
        },
      ]
    },
    {
      type: 'factoid',
      factoid: [
        {
          tag: 'a',
          content: 'Графический плэнэр Димы Горелышева про линию и пятно',
          props: { className: 'nav-link', target: "_blank", to: 'https://www.notion.so/8d1b632581a04417a9cb6d10b3e681cb?pvs=4' },
        },
      ],
    },
    {
      type: 'title',
      title: 'Примеры линии и пятна в одном рисунке',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Пятно организует лист: отвечает за то, сколько в листе пустого-заполненного, на сколько рисунок контрастный. Точная линия отделяет и выделяет второй план с домиками.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'DimaGorelyshev2.jpg',
        alt: 'DimaGorelyshev2',
        caption: [
          {
            tag: 'a',
            content: 'Dima Gorelyshev',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Пятно организует лист: масса расположена в центре листа, она устойчива, статична. Линия рассказывает фигуратив, по ней мы понимаем, что изображена девушка.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'DimaGorelyshev8.jpg',
        alt: 'DimaGorelyshev8',
        caption: [
          {
            tag: 'a',
            content: 'Dima Gorelyshev',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Линия организует лист, рассказывает про фигуратив. Пятно выделяет главное — позирующую девушку на набросках.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'DimaGorelyshev4.jpg',
        alt: 'DimaGorelyshev4',
        caption: [
          {
            tag: 'a',
            content: 'Dima Gorelyshev',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Пятно задает динамику, ощущение пространства в листе. Линия рассказывает о строении, самолета. По линии становится понятно, что изображено в листе.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'DimaGorelyshev10.jpg',
        alt: 'DimaGorelyshev10',
        caption: [
          {
            tag: 'a',
            content: 'Dima Gorelyshev',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Верхняя часть иллюстрации организована линией. Пятно показывает светотень, объем. Нижняя часть иллюстрации организована пятном, главное выделено линией.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'DimaGorelyshev13.jpg',
        alt: 'DimaGorelyshev13',
        caption: [
          {
            tag: 'a',
            content: 'Dima Gorelyshev',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Пятно организует лист, создает пульсацию между большой светлой комнатой и маленьким просветом в глубине комнаты. Линия обозначает фигуратив, детали для более длительного разглядывания.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'DimaGorelyshev23.jpg',
        alt: 'DimaGorelyshev23',
        caption: [
          {
            tag: 'a',
            content: 'Dima Gorelyshev',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Пятно организует лист, задает контрастность, выделяет зеркало и тонкую полоску света. Линия обозначает фигрутив.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'DimaGorelyshev24.jpg',
        alt: 'DimaGorelyshev24',
        caption: [
          {
            tag: 'a',
            content: 'Dima Gorelyshev',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Пятно организует лист, задает контрастность в рисунке, показывает тени. Линия обозначает фигуратив, задает акцент на маленькой женщине в центре листа.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'DimaGorelyshev25.jpg',
        alt: 'DimaGorelyshev25',
        caption: [
          {
            tag: 'a',
            content: 'Dima Gorelyshev',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Линия отвечает за фигуратив, детали. Пятно обозначает тени, объем.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'DimaGorelyshev26.jpg',
        alt: 'DimaGorelyshev26',
        caption: [
          {
            tag: 'a',
            content: 'Dima Gorelyshev',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Пятно отвечает за пространство в листе. Линия обозначает фигуратив, детали.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'DimaGorelyshev3.jpeg',
        alt: 'DimaGorelyshev3',
        caption: [
          {
            tag: 'a',
            content: 'Dima Gorelyshev',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'DimaGorelyshev30.jpeg',
        alt: 'DimaGorelyshev30',
        caption: [
          {
            tag: 'a',
            content: 'Dima Gorelyshev',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Четкая строгая линия противопоставляется мягкому человеческому телу. Тонкая, маленькая линия, прорисовывающая пальчики на ногах подчеркивает хрупкость девушки.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'DimaGorelyshev29.jpg',
        alt: 'DimaGorelyshev29',
        caption: [
          {
            tag: 'a',
            content: 'Dima Gorelyshev',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Пятно организует лист, линия рассказывает про фигуратив, подчеркивает обхемность шляпы.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'DimaGorelyshev33.jpg',
        alt: 'DimaGorelyshev33',
        caption: [
          {
            tag: 'a',
            content: 'Dima Gorelyshev',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Пятно организует лист, линия рассказывает про фигуратив.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'DimaGorelyshev38.jpg',
        alt: 'DimaGorelyshev38',
        caption: [
          {
            tag: 'a',
            content: 'Dima Gorelyshev',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Пятно организует лист, линия рассказывает про фигуратив. Линия выделяет главное в рисунке — малюсенькую машинку рядом с домом.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'DimaGorelyshev36.jpg',
        alt: 'DimaGorelyshev36',
        caption: [
          {
            tag: 'a',
            content: 'Dima Gorelyshev',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Пятно организует лист, линия рассказывает про фигуратив. Линия выделяет главное в рисунке — кривоватую дверцу.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'DimaGorelyshev35.jpg',
        alt: 'DimaGorelyshev35',
        caption: [
          {
            tag: 'a',
            content: 'Dima Gorelyshev',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Пятно организует лист, задает ритм в рисунке. Линия обозначает фигуратив.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'BlairThornley4.jpeg',
        alt: 'BlairThornley4',
        caption: [
          {
            tag: 'a',
            content: 'Blair Thornley',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/blairthornley/?ysclid=lpaxspy82x322169082s' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Пятно организует лист. Линия обозначает фигуратив, выделяет главное.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'BlairThornley6.jpeg',
        alt: 'BlairThornley6',
        caption: [
          {
            tag: 'a',
            content: 'Blair Thornley',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/blairthornley/?ysclid=lpaxspy82x322169082s' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Пятно организует лист, линия выделяет главное — глаза.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'bayduzha1.jpeg',
        alt: 'bayduzha1',
        caption: [
          {
            tag: 'a',
            content: 'Наташа Байдужа',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/bayduzha/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'bayduzha3.jpeg',
        alt: 'bayduzha3',
        caption: [
          {
            tag: 'a',
            content: 'Наташа Байдужа',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/bayduzha/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'bayduzha4.jpeg',
        alt: 'bayduzha4',
        caption: [
          {
            tag: 'a',
            content: 'Наташа Байдужа',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/bayduzha/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Весь рисунок пятном, линия выделяет главное — цветочек.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'Sasha89 gradusov.jpeg',
        alt: 'Sasha89 gradusov',
        caption: [
          {
            tag: 'a',
            content: 'Sasha 🐯 89 gradusov',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/89gradusov/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Весь рисунок пятном, линия выделяет главное — паучка.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'NataliaMoryzeva3.jpeg',
        alt: 'NataliaMoryzeva3',
        caption: [
          {
            tag: 'a',
            content: 'Natalia Moryzeva',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/yantarem/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Пятно организует лист, задает движение, линия обозначает фигуратив.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'NataliaMoryzeva1.jpeg',
        alt: 'NataliaMoryzeva1',
        caption: [
          {
            tag: 'a',
            content: 'Natalia Moryzeva',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/yantarem/' },
          },
        ],
      },
    },
  ]
}

const lessonData32: ILessonDataDB = {
  orderInWeek: 2,
  id: 'ContrastNuance_9rP6Yl',
  courseId: 'how-to-draw-free', // how-to-draw
  title: '3.2 Как выделить главное: контраст, нюанс',
  type: 'Theory',
  week: 3,
  startDate: '2023.12.17 21:00:00 GMT', // 2024.01.22,
  endDate: '2023.12.24 20:59:00 GMT', // 2024.01.28,
  resultsEndDate: '2023.12.26 21:00:00 GMT', // 2024.02.01,
  content: [
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Разница - это средство выразительности. Если разница велика - это контраст. Если мала - нюанс. Когда мы подчеркиваем разницу - размеров, форм, яркости, чего угодно - мы делаем рисунок более выразительным.',
        },
        {
          tag: 'p',
          content: 'Контраст — большая разница в листе. Объемное и плоское, фактурное и однородное, толстое и тонюсенькое, заполненное и пустое. С помощью контраста можно направить внимание зрителя, выделить главное в листе, разделить планы, объединить персонажей.',
        },
        {
          tag: 'p',
          content: 'Нюанс — едва заметная разница. Она обогащает рисунок, наполняет его деталями.',
        },
        {
          tag: 'p',
          content: 'Акцент — самый сильный контраст в листе. Акцент всегда маленький, всегда один.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Примеры контрастов, нюансов, акцентов',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Контрас линии и пятна. Нюансные различия в светлоте, чтобы показать фигуратив внутри пятен.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'таняборисова.jpeg',
        alt: 'таняборисова',
        caption: [
          {
            tag: 'a',
            content: 'таня борисова',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/ta_boris/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Акцент линией в пятновом рисунке. Контраст по светлоте.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'ArinaSerebriakova.jpeg',
        alt: 'ArinaSerebriakova',
        caption: [
          {
            tag: 'a',
            content: 'Arina Serebriakova',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/ri.silver/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Контраст по светлоте. Нюанс по информативности. По разнице в светлоте мы можем отделить главную группу объектов от фона. Затем в этой группе мы высматриваем людей, они более информативные, чем скала.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'StasyaSokolovskaya2.jpeg',
        alt: 'StasyaSokolovskaya2',
        caption: [
          {
            tag: 'a',
            content: 'Stasya Sokolovskaya',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/stasyasokolovska/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Контраст линии и пятна. Самый сильный контраст между линейным текстом и пятновыми собаками. При боле бизком рассмотрении, понятно, что  главные детали на собаках также выделены линией.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'ElenaBulay1.jpg',
        alt: 'ElenaBulay1',
        caption: [
          {
            tag: 'a',
            content: 'Elena Bulay',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/elena_bulay/?hl=ru' },
          },
        ],
      },
    },
    {
      type: 'title',
      title: 'Иерархия',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Когда в листе всего пополам, например, 50% жирных линий, 50% тонких, половинки спорят между собой. Зрителю непонятно, куда смотреть. Глаз бегает от одного к другому.',
        },
        {
          tag: 'p',
          content: 'Когда в листе все линии, формы, размеры одинаковые, рисунок выглядит монотонно, ничто не притягивает внимания.',
        },
        {
          tag: 'p',
          content: 'Когда в рисунке чего-то очевидно больше, например, 80% тонких линий, 20% жирных, зритель рассматривает рисунок последовательно. Что-то замечает сразу, что-то потом, что-то видит только при внимательном смотрении.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Что выделять',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Когда мы что-то выделяем, мы должны понимать — зачем. Если выделяем предмет недетальностью, у него должно быть что-то интересное, например силуэт.',
        },
        {
          tag: 'p',
          content: 'То, что мы выделяем должно быть вишенкой на торте, самым интересным, важным и маленьким.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Как выделять',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Когда мы очень мало говорим об окружающей среде и очень много о главном объекте, он смотрится на листе чужим. Это ни хорошо, ни плохо, это нужно учитывать.',
        },
        {
          tag: 'p',
          content: 'Если хочется, чтобы объект и среда дружили друг с другом, нужно делать более мягкий контраст.',
        },
      ]
    },
  ]
}

const lessonData33: ILessonDataDB = {
  orderInWeek: 3,
  id: 'LineSpotPractice_L8A8Jk',
  courseId: 'how-to-draw-free', // how-to-draw
  title: 'Практика третьей недели',
  type: 'Practice',
  week: 3,
  startDate: '2023.12.17 21:00:00 GMT', // 2024.01.22,
  endDate: '2023.12.24 20:59:00 GMT', // 2024.01.28,
  resultsEndDate: '2023.12.26 21:00:00 GMT', // 2024.02.01,
  content: [
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'На этой неделе практикуемся совмещать линии и пятна в одном рисунке. Будем учиться рисовать сложные позы, ракурсы, объекты в движении.',
        },
        {
          tag: 'p',
          content: 'Выберите одну тему: кошки, собаки, чайники, лягушки.',
        },
        {
          tag: 'p',
          content: 'Нарисуйте 30 законченных работ, в которых пятно отвечает за эмоцию, движение. Линия — конкретизирует детали.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Как действовать',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: '1. Наскриньте стоп-кадры двигающихся объектов или подоберите фото животных, людей в движении, сложной позе.',
        },
        {
          tag: 'p',
          content: '2. Пятном зарисуйте основное движение-иероглиф, оно необязательно должно совпадать с силуэтом объекта. Пятно отвечает за динамику, а не узнавание.',
        },
        {
          tag: 'p',
          content: '3. Дорисуйте поверх пятна детали линией, чтобы предмет стал узнаваемым.',
        },
        {
          tag: 'p',
          content: '4. Рисуйте до конца, даже если кажется, что вы ошиблись.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Дополнительно *',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Если чувствуете себя уверено, сделайте дополнительное задание. Подумайте, что вы хотите выделить в рисунке, сделайте в этом месте контраст с помощью разницы в информативности / в светлоте / в количестве делатей (заполненное — пустое) / в характере линий (толстое-тонкое).',
        },
        {
          tag: 'p',
          content: 'Можно выделить что-то одно, что-то маленькое. Например, глаз, коготь на лапе. Можно выделить целый слой — пятна, полоски, фактуру шерсти.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Что выкладываем',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: '1. Сфотографируйте рисунки и приложите к заданию. Выкладывайте все, что есть:',
          props: {className: 'listHeader'}
        },
        {
          tag: 'p',
          content: 'в получившихся рисунках отметим и запомним удачные приемы;',
          props: {className: 'listItem'}
        },
        {
          tag: 'p',
          content: 'в неполучившихся разберем, что не нравится, вместе придумаем, как улучшить.',
          props: {className: 'listItem'}
        },
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: '2. Расскажите, что за чем делали, в какой последовательности рисовали. Что получилось, а что нет. Что понравилось, что осталось непонятным.',
        },
        {
          tag: 'p',
          content: '3. Задайте вопросы.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Необязательно точь в точь перерисовывать каждую деталь',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Фотоаппарат справится с этим лучше, чем человек. Если мы хотим, чтобы наш рисунок не оценивали по тому как точно мы повторили каждую деталь, нужно придумать что-то новое. Например, заметить что силуэт чайника напоминает кошку, нарисовать чайник который одновременно чайник и кошка.',
        },
        {
          tag: 'p',
          content: 'Если рисунок критикуют за огрехи в анатомии, перспективе, значит у автора не получилось впечатлить зрителя. Зрителю скучно, но он не знает к чему придраться, поэтому говорит о самом простом — отличии рисунка от фото.',
        },
      ]
    },
    {
      type: 'qoute',
      qoute: [
        {
          tag: 'p',
          content: '… изображение никогда не равно прототипу (нарисованная трубка — это не трубка), в нем всегда появляется дистанция, метаморфоза; она-то и становится предметом искусства.',
        },
        {
          tag: 'p',
          content: 'Виктор Меламед, Машинерия портрета.',
        },
      ],
    },
    {
      type: 'title',
      title: 'Любая степень реалистичности подходит. Рисуйте, как вам комфортно',
    },
    {
      type: 'qoute',
      qoute: [
        {
          tag: 'p',
          content: 'Если представить ось, на одном конце которой смайл, а на другом — реалистичный портрет, то чем ближе мы к полюсу реалистичного портрета, тем важнее убедительность светотени, анатомии, пространства, тем выше цена ошибки и склонность зрителя судить работу по уровню технических навыков. Двигаясь в обратную сторону, мы получаем больше свободы, больше возможностей для вовлечения в портрет посторонних форм и знаков, для метаморфоз, метафор и подмен, для жонглирования формой и контрформой. Здесь размыта граница межу графикой и письменным языком. … Простота не освобождает от ответственности за убедительность портрета, но создает другие категории ответственности, другие сценарии взаимодействия со зрителем, другие правила игры.',
        },
        {
          tag: 'p',
          content: 'Виктор Меламед, Машинерия портрета.',
        },
      ],
    },
    {
      type: 'title',
      title: 'Не преукрашайте своих персонажей',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Преукрашивание — это обычно усреднение. Лучше рассказать неприятную правду, чем нарисовать еще одного миленького котика.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Рисуйте сразу начисто, без исправлений',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Рисовать без исправлений сложно, непривычно. Это может показаться бессмысленным. Зачем рисовать криво, косо, непропорционально, если я могу стереть неверную линию и сделать хорошо. Но в этом и дело. Как только мы поставим себя в условия, где рисовать хорошо нужно сразу, начнется настоящая тренировка руки.',
        },
        {
          tag: 'p',
          content: 'Я впервые попробовала это упражнение 3 года назад. Около полугода я рисовала исключительно ручкой. И когда  я снова стала использовать карандаш, я просто не поверила в то, как я теперь могу рисовать! Попробуйте, хотя бы в рамках курса.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Рисуйте привычными для вас материалами',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'На этом курсе нет цели освоить новый материал или технику. Рисуйте теми материалами, к которым привыкли. Если вы никогда не рисовали, возьмите черную тушь для пятна, ручку — для линии.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Не стесняйтесь загружать свои работы',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Часто так бывает, что нам больше нравятся рисунки других, чем свои собственные. Поэтому важно делиться работами. Работа, которая кажется нам скучной, может удивит и вдохновит кого-то другого. А после этого может и мы сами сможем заметить в ней что-то интересное.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Рисуйте вместе со мной',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'У меня нет цели научиться вас рисовать так же, как я. В этих видео к заданиям я  рисую вместе с вами за компанию. Так же как и вы изучаю возможности инструмента, ищу интересное в референсах, придумываю как это передать в рисунке.',
        },
        {
          tag: 'p',
          content: 'Не все получается с первого раза, и не важно как давно мы рисуем. Нарисовать 10 раз, чтобы выбрать один — нормальный, рабочий процесс. Когда я смотрела блоги других иллюстраторов, или онлайн-курсы, я думала, что у них-то все всегда получается. Но это не так. Мы все люди, что-то получается лучше, что-то хуже. Если всегда делать только то, что получается, ничему новому не научишься.',
        },
      ]
    },
    {
      type: 'video',
      videoData: {
        src: 'https://www.youtube.com/embed/69zhLMWMpxE?si=t3bLdhkgJxEn3RUB?loop=1',
        title: 'YouTube video player',
      },
    },
    {
      type: 'title',
      title: 'Примеры рисунков линией и пятном',
    },
    {
      type: 'gallery',
      images: [
        {
          id: 'activeSpot.jpg',
          alt: 'activeSpot1',
        },
        {
          id: 'activeSpot2.jpg',
          alt: 'activeSpot2',
        },
        {
          id: 'activeSpot3.jpg',
          alt: 'activeSpot3',
        },
        {
          id: 'activeSpott4.jpg',
          alt: 'activeSpot4',
        },
        {
          id: 'activeSpot5.jpg',
          alt: 'activeSpot5',
        },
        {
          id: 'activeSpot6.jpg',
          alt: 'activeSpot6',
        },
        {
          id: 'activeSpot7.jpg',
          alt: 'activeSpot7',
        },
        {
          id: 'activeSpot8.jpg',
          alt: 'activeSpot8',
        },
        {
          id: 'activeSpot9.jpg',
          alt: 'activeSpot9',
        },
        {
          id: 'activeSpot10.jpg',
          alt: 'activeSpot10',
        },
        {
          id: 'activeSpot11.jpg',
          alt: 'activeSpot11',
        },
        {
          id: 'activeSpot12.jpg',
          alt: 'activeSpot12',
        },
        {
          id: 'activeSpot13.jpg',
          alt: 'activeSpot13',
        },
        {
          id: 'activeSpot14.jpg',
          alt: 'activeSpot14',
        },
        {
          id: 'activeSpot15.jpg',
          alt: 'activeSpot15',
        },
      ]
    }
  ]
}

const lessonData5: ILessonDataDB = {
  id: 'draw-poodles-3',
  courseId: 'illustration',
  title: '1.3. Как рисовать похоже. gzd',
  type: 'Practice',
  week: 1,
  orderInWeek: 3,
  startDate: '2023.12.17 21:00:00 GMT', // 2024.01.22,
  endDate: '2023.12.24 20:59:00 GMT', // 2024.01.28,
  resultsEndDate: '2023.12.26 21:00:00 GMT', // 2024.02.01,
  content: [
    {
      type: 'title',
      title: 'Супер интересная подтема подтема',
    },
    {
      type: 'factoid',
      factoid: [
        {
          tag: 'a',
          content: 'Книжный разворот',
          props: { className: 'link', to: 'https://google.com' },
        },
        {
          tag: 'a',
          content: 'Книжный разворот',
          props: { className: 'link', to: 'https://google.com' },
        },
      ],
    },
    {
      type: 'image',
      imageData: {
        id: 'TheStrangerVisitingNatureSusl.jpg',
        alt: 'TheStrangerVisitingNatureSusl',
        caption: [
          {
            tag: 'a',
            content: 'Книжный разворот',
            props: { className: 'link', to: 'https://google.com' },
          },
        ],
      },
    },
    {
      type: 'qoute',
      qoute: [
        {
          tag: 'p',
          content: 'Книжный разворот — это цельная система, как двухстволка или двухколёсный велосипед. Его половинки традиционно согласованы — поля ',
        },
        {
          tag: 'p',
          content: 'Книжный разворот',
        },
      ],
    },
    {
      type: 'factoid',
      factoid: [
        {
          tag: 'p',
          content: 'Книжный разворот это цельная система, как двухстволка или двухколёсный велосипед. Его половинки традиционно согласованы',
        },
        {
          tag: 'p',
          content: 'Книжный разворот',
        },
      ],
    },
    {
      type: 'image',
      imageData: {
        id: 'TheStrangerVisitingNatureSusl.jpg',
        alt: 'TheStrangerVisitingNatureSusl',
      },
    },
  ]
}

const allLessons = [
  lessonData10,
  lessonData11,
  lessonData12,
  lessonData13,
  lessonData14,
  lessonData15,
  lessonData16,
  lessonData21,
  lessonData22,
  lessonData23,
  lessonData24,
  lessonData25,
  lessonData31,
  lessonData32,
  lessonData33,
];
