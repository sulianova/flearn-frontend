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

const lessonData1: ILessonDataDB = {
  id: 'draw-doodles',
  courseId: 'illustration',
  title: '1.1. Упражнения, чтобы разрисоваться',
  type: 'Theory',
  week: 1,
  startDate: '2023.07.12', //new Date('2023.07.12'),
  endDate: '2023.07.22', //new Date('2023.07.22'),
  resultsEndDate: '2023.07.25', //new Date('2023.07.25'),
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
          content: 'Нарисуйте прямую линию. Когда проводите линию, не отрывайте руку от листа. Смотрите на точку, к которой должны прийти, а не место, где находится рука. Рисуйте линии разной длины: крошечные, во весь лист.',
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
        id: '1.1.Tasks1.png',
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
        id: '1.1.Tasks2.png',
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
          content: 'Нарисовать идеальный круг или овал от руки нельзя. Все, что мы можем, натренироваться рисовать что-то похоже на круг и овал.',
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
        id: '1.1.Tasks3.jpg',
        alt: 'Tasks3',
        caption: [
          {
            tag: 'p',
            content: 'Светлое-темное',
          },
        ],
      },
    },
  ],
};

const lessonData2: ILessonDataDB = {
  id: 'draw-noodles',
  courseId: 'illustration',
  title: '1.2. Как рисовать похоже',
  type: 'Theory',
  week: 1,
  startDate: '2023.07.12', //new Date('2023.07.12'),
  endDate: '2023.07.22', //new Date('2023.07.22'),
  resultsEndDate: '2023.07.25', //new Date('2023.07.25'),
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
          content: 'Зритель узнает портрет и при отсутствии сходства, например, по контексту или формальным признакам: очки, цвет волос, одежда.',
        },
        {
          tag: 'p',
          content: 'Примеры узнавания без сходства:',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: '1.2.ХанояПивен1.png',
        alt: '1.2.ХанояПивен1',
        caption: [
          {
            tag: 'a',
            content: 'Ханоя Пивен, портерт Мадонны',
            props: { className: 's-hoverable', to: 'https://pivenworld.com/art' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: '1.2.MariaPicassóiPiquer1.jpeg',
        alt: '1.2.MariaPicassóiPiquer1',
        caption: [
          {
            tag: 'a',
            content: 'Maria Picassó i Piquer, портрет Минервы Макгонагалл',
            props: { className: 's-hoverable', to: 'https://www.instagram.com/maria_picasso_piquer/?ysclid=ln30o7h1q7888015831' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: '1.2.NataliaAverianova1.jpeg',
        alt: '1.2.NataliaAverianova1',
        caption: [
          {
            tag: 'a',
            content: 'Natalia Averianova',
            props: { className: 's-hoverable', to: 'https://www.instagram.com/averianova_works/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: '1.2.NataliaAverianova2.jpg',
        alt: '1.2.NataliaAverianova2',
        caption: [
          {
            tag: 'a',
            content: 'Natalia Averianova',
            props: { className: 's-hoverable', to: 'https://www.instagram.com/averianova_works/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Рисование, в котором нет сходства, использует детское узнавание. Для детского узнавания подойдут первые ассоциации: высокий, худой, черные волосы, квадратные очки, ходит с палочкой, носит широкую шляпу.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Сходство — результат того, что автор смог разглядеть в натуре',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Рисование, основанное на сходстве — использует взрослое узнавание. Например, когда мама двух близнецов может различить их между собой.',
        },
        {
          tag: 'p',
          content: 'Чтобы поймать взрослое узнавание нужно научиться смотреть на натуру, не узнавая ее. Забыть, что мы рисуем  голову, руку. Рисовать абстрактную форму, которая крепится к форме побольше снизу. Изучать изгибы этой формы. Это помогает видеть новое, не повторять заученные формы из головы: “палочка, палочка, огуречек, вот и вышел человечек”.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Сходство в изображении поз:',
    },
    {
      type: 'text',
      text: [
        {
        tag: 'p',
        content: 'Чтобы нарисовать сложную позу, нужно забыть, что мы о ней помним. И рисовать только то, что видим перед собой.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: '1.2.hannaleejoshi1.jpeg',
        alt: '1.2.hannaleejoshi1',
        caption: [
          {
            tag: 'a',
            content: 'H A N N A / 이 한 나',
            props: { className: 's-hoverable', to: 'https://www.instagram.com/hannaleejoshi/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: '1.2.VaryaYakovleva3.jpeg',
        alt: '1.2.VaryaYakovleva3',
        caption: [
          {
            tag: 'a',
            content: 'Varya Yakovleva',
            props: { className: 's-hoverable', to: 'https://www.instagram.com/varya__yakovleva/?g=5' },
          },
        ],
      },
    },
    {
      type: 'title',
      title: 'Сходство в портретах:',
    },
    {
      type: 'image',
      imageData: {
        id: '1.2.VictorMelamed3.jpg',
        alt: '1.2.VictorMelamed3',
        caption: [
          {
            tag: 'a',
            content: 'Victor Melamed, Frank Zappa Hot Rats',
            props: { className: 's-hoverable', to: 'https://www.behance.net/melamed' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: '1.2.VictorMelamed2.jpg',
        alt: '1.2.VictorMelamed2',
        caption: [
          {
            tag: 'a',
            content: 'Victor Melamed, портрет Стивена Хокинга',
            props: { className: 's-hoverable', to: 'https://www.behance.net/melamed' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: '1.2.VictorMelamed1.jpg',
        alt: '1.2.VictorMelamed1',
        caption: [
          {
            tag: 'a',
            content: 'Victor Melamed, портрет Sean Penn',
            props: { className: 's-hoverable', to: 'https://www.behance.net/melamed' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: '1.2.MashaShishova1.jpg',
        alt: '1.2.MashaShishova1',
        caption: [
          {
            tag: 'a',
            content: 'Masha Shishova, автопортрет',
            props: { className: 's-hoverable', to: 'https://www.behance.net/MariaShishova' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: '1.2.MashaShishova4.jpg',
        alt: '1.2.MashaShishova4',
        caption: [
          {
            tag: 'a',
            content: 'Masha Shishova, портрет Zinaida Gippius',
            props: { className: 's-hoverable', to: 'https://www.behance.net/MariaShishova' },
          },
        ],
      },
    },
    {
      type: 'title',
      title: 'Сходство в рисунках животных:',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'На правой странице разворота портреты по фото, которые подписчики прислали Лене. Каждая собака уникальна, и все портреты получились разными.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: '1.2.ElenaBulay2.jpg',
        alt: '1.2.ElenaBulay2',
        caption: [
          {
            tag: 'a',
            content: 'Elena Bulay',
            props: { className: 's-hoverable', to: 'https://www.instagram.com/elena_bulay/?hl=ru' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: '1.2.ElenaBulay1.jpg',
        alt: '1.2.ElenaBulay1',
        caption: [
          {
            tag: 'a',
            content: 'Elena Bulay, разные позы одной собаки',
            props: { className: 's-hoverable', to: 'https://www.instagram.com/elena_bulay/?hl=ru' },
          },
        ],
      },
    },
  ],
};

const lessonData3: ILessonDataDB = {
  id: 'draw-poodles',
  courseId: 'illustration',
  title: '1.3. Как рисовать похоже. Линия',
  type: 'Theory',
  week: 1,
  startDate: '2023.07.12', //new Date('2023.07.12'),
  endDate: '2023.07.22', //new Date('2023.07.22'),
  resultsEndDate: '2023.07.25', //new Date('2023.07.25'),
  content: [
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'В предыдущем уроке мы разобрались, что бывает детское узнавание, когда у рисунка с предметом нет сходства и мы узнаем его по особым приметам и ситуациям. И есть взрослое узнавание, основанное на сходстве. На этой неделе будет тренировать взрослое узнавание в линейном рисунке.',
        },
      ]
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
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: '1.3.Comparison.jpg',
        alt: '1.3.Comparison',
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
        },
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
          content: 'В какой мере они будут схожи решает автор.',
        },
      ],
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
        id: '1.3.DetailsLine1.jpeg',
        alt: '1.3.DetailsLine1',
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
        id: '1.3.ProportionLine1.png',
        alt: '1.3.ProportionLine1',
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
        id: '1.3.ProportionLine3.png',
        alt: '1.3.ProportionLine3',
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
        id: '1.3.ProportionLine4.png',
        alt: '1.3.ProportionLine4',
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
        id: '1.3.ProportionLine5.png',
        alt: '1.3.ProportionLine5',
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
        id: '1.3.ProportionLine6.png',
        alt: '1.3.ProportionLine6',
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
        id: '1.3.ProportionLine7.png',
        alt: '1.3.ProportionLine7',
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
        id: '1.3.ProportionLine2.jpeg',
        alt: '1.3.ProportionLine2',
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
        id: '1.3.DetailsLine2.png',
        alt: '1.3.DetailsLine2',
      },
    },
    {
      type: 'title',
      title: 'Как рисовать объемно',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Когда мы рисуем объемную форму, мы рисуем, как поверхность объекта меняет направление. Например, простой лист А4 на столе выглядит плоским. Но если его согнуть пополам и поставить, он будет казаться объемным.',
        },
        {
          tag: 'p',
          content: 'Чтобы нарисованный предмет казался объемным, нужно нарисовать, как его поверхность меняет направление.',
        },
        {
          tag: 'p',
          content: 'Чтобы показать объем линией, нужно:',
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
        id: '1.3.ShapeLine1.jpeg',
        alt: '1.3.ShapeLine1',
        caption: [
          {
            tag: 'a',
            content: 'Robert Henderson Blyth',
            props: { className: 's-hoverable', to: 'https://all-drawings.livejournal.com/867721.html' },
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
        id: '1.3.ShapeLine2.jpeg',
        alt: '1.3.ShapeLine2',
        caption: [
          {
            tag: 'a',
            content: 'David Hockney',
            props: { className: 's-hoverable', to: 'https://all-drawings.livejournal.com/869696.html' },
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
        id: '1.3.ShapeLine3.png',
        alt: '1.3.ShapeLine3',
        caption: [
          {
            tag: 'a',
            content: 'Дмитрий Горелышев',
            props: { className: 's-hoverable', to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: '1.3.DimaGorelyshev5.jpeg',
        alt: '1.3.DimaGorelyshev5',
        caption: [
          {
            tag: 'a',
            content: 'Дмитрий Горелышев',
            props: { className: 's-hoverable', to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: '1.3.DimaGorelyshev6.jpeg',
        alt: '1.3.DimaGorelyshev6',
        caption: [
          {
            tag: 'a',
            content: 'Дмитрий Горелышев',
            props: { className: 's-hoverable', to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: '1.3.DimaGorelyshev7.jpeg',
        alt: '1.3.DimaGorelyshev7',
        caption: [
          {
            tag: 'a',
            content: 'Дмитрий Горелышев',
            props: { className: 's-hoverable', to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: '1.3.DimaGorelyshev14.jpeg',
        alt: '1.3.DimaGorelyshev14',
        caption: [
          {
            tag: 'a',
            content: 'Дмитрий Горелышев',
            props: { className: 's-hoverable', to: 'https://www.instagram.com/dima_gorelyshev/' },
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
        id: '1.3.DimaGorelyshev18.jpeg',
        alt: '1.3.DimaGorelyshev18',
        caption: [
          {
            tag: 'a',
            content: 'Дмитрий Горелышев',
            props: { className: 's-hoverable', to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: '1.3.DimaGorelyshev40.jpeg',
        alt: '1.3.DimaGorelyshev40',
        caption: [
          {
            tag: 'a',
            content: 'Дмитрий Горелышев',
            props: { className: 's-hoverable', to: 'https://www.instagram.com/dima_gorelyshev/' },
          },
        ],
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
          id: '1.3.DimaGorelyshev40.jpeg',
          alt: '1.3.DimaGorelyshev40',
        },
      ]
    },
  ],
};

const lessonData4: ILessonDataDB = {
  id: 'draw-poodles-2',
  courseId: 'illustration',
  title: '1.3. Как рисовать похоже. Линия',
  type: 'Practice',
  week: 1,
  startDate: '2023.07.12', //new Date('2023.07.12'),
  endDate: '2023.07.22', //new Date('2023.07.22'),
  resultsEndDate: '2023.07.25', //new Date('2023.07.25'),
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
      title: 'Что выкладываем',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: '1. Сфотографируйте рисунки и приложите к заданию. Выкладывайте все, что есть: в получившихся рисунках отметим и запомним удачные приемы; в неполучившихся разберем, что не нравится, вместе придумаем, как улучшить.',
        },
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
  ]
}


const lessonData5: ILessonDataDB = {
  id: 'draw-poodles-3',
  courseId: 'illustration',
  title: '1.3. Как рисовать похоже. gzd',
  type: 'Practice',
  week: 1,
  startDate: '2023.07.12', //new Date('2023.07.12'),
  endDate: '2023.07.22', //new Date('2023.07.22'),
  resultsEndDate: '2023.07.25', //new Date('2023.07.25'),
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
  lessonData1,
  lessonData2,
  lessonData3,
  lessonData4,
];
