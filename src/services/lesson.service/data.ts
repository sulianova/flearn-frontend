import { text } from 'stream/consumers';
import type { IFetchLessonsProps, ILessonDataDB } from './types';
import classNames from 'classnames';

export function getData(filter: Partial<IFetchLessonsProps>) {
  return allLessons
    .filter(l => filter.courseId ? l.courseId === filter.courseId : true)
    .filter(l => filter.id ? l.id === filter.id : true)
    .filter(l => filter.topic ? l.topic === filter.topic : true)
    .filter(l => filter.topicOrder ? l.topicOrder === filter.topicOrder : true)
    .filter(l => filter.orderInTopic ? l.orderInTopic === filter.orderInTopic : true);
}

const lessonData11: ILessonDataDB = {
  id: 'About',
  courseId: 'how-to-draw',
  title: 'Привет!',
  type: 'Theory',
  icon: {
    icon: '/png/3d_emoji_HuggingFace.png',
  },
  topic: 'Как устроено обучение',
  topicOrder: 1,
  topicIcon: 'FAQ',
  orderInTopic: 1,
  duration: {
    unit: 'minutes',
    value: 5
  },
  isFree: true,
  isUnderDevelopment: false,
  content: [
    {
      type: 'chat',
      chat: {
        blocks: [
          {
            showThisBlockButtonContent: '',
            messages: [
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Меня зовут Соня, я иллюстратор и автор обучающих программ в flearn.'
              },
            ],
          },
          {
            showThisBlockButtonContent: 'Привет!',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Привет!'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Я буду помогать разбираться с теорией и задавать уточняющие вопросы, чтобы убедиться, что мы правильно друг друга поняли)'
              },
            ],
          },
          {
            showThisBlockButtonContent: 'Здорово, мне подходит)',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Здорово, мне подходит)'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Сначала расскажу, как всё устроено. А потом будем учиться.'
              },
            ],
          },
        ]
      }
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Если коротко, обучение в flearn — это 10-15 минут в день, много практических заданий и живой обратной связи. Вот что предстоит делать на курсах:',
        },
      ]
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'самостоятельно осваивать короткие уроки в учебнике;'
        },
        {
          tag: 'p',
          content: 'сдавать финальные задания на проверку;'
        },
        {
          tag: 'p',
          content: 'получать персональную и бережную обратную связь от ревьюера и вносить правки.'
        },
      ]
    },
    {
      type: 'chat',
      chat: {
        blocks: [
          {
            showThisBlockButtonContent: '',
            messages: [
            ],
          },
          {
            showThisBlockButtonContent: 'Что значит «учебник»? Придётся много читать?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Что значит «учебник»? Придётся много читать?'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Не совсем. В учебнике можно проходить квизы и расширять кругозор в игровом формате.'
              },
            ],
          },
          {
            showThisBlockButtonContent: 'А кто написал учебник?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'А кто написал учебник?'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Я вместе с другими иллюстраторами. Мы постоянно обновляем и дополняем его, чтобы информация была актуальной)'
              },
            ],
          },
          {
            showThisBlockButtonContent: 'С учебником — понятно) Расскажи про тарифы. Я правильно понимаю, что можно учиться бесплатно?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'С учебником — понятно) Расскажи про тарифы. Я правильно понимаю, что можно учиться бесплатно?'
              },

            ],
          },
        ]
      }
    },
    {
      type: 'title',
      title: 'Бесплатный первый модуль для всех курсов'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'С бесплатным аккаунтом можно пройти уроки первого модуля на любом курсе. В конце модуля вы сможете выполнить самостоятельный проект и получить по нему обратную связь — совсем как на платном курсе. Но бесплатно.',
        },
      ]
    },
    {
      type: 'chat',
      chat: {
        blocks: [
          {
            showThisBlockButtonContent: '',
            messages: [
            ],
          },
          {
            showThisBlockButtonContent: 'Постой, то есть в бесплатном профиле есть обратная связь?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Постой, то есть в бесплатном профиле есть обратная связь?'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Да, все так. В конце первого модуля вы сможете сдать на проверку свой самостоятельный проект и получить обратную связь от иллюстратора)'
              },
            ],
          },
        ]
      }
    },
    {
      type: 'title',
      title: 'Платная подписка flearn Pro'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Если понравится, можно оплатить подписку flearn Pro. Она открывает доступ ко всем материлам в школе и снимает ограничение на количество обратной связи от преподавателя. Материалы спроектированы так, чтобы учиться было интересно как совсем новичкам, так и тем, кто уже пробует себя в иллюстрации.'
        },
        {
          tag: 'p',
          content: 'Дальше расскажу про куратора и ревьюера и отвечу на частые вопросы. Если интересно, жмите к следующему уроку. А если все и так понятно — смело пропускайте онбординг и переходите к обучению.'
        },
      ]
    },
    {
      type: 'textImportant',
      text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Кстати, мы рассказываем про обучение не только в учебнике. У нас есть '
            },
            {
              tag: 'a',
              content: 'телеграм-канал',
              props: { className: 'key-link', target: "_blank", to: 'https://t.me/sofiulyanova' },
            },
            {
              tag: 'span',
              content: ' для всех, кто хочет развиваться в сфере иллюстрации. В нем мы публикуем анонсы мероприятий, интересные факты об учебе и иллюстрации в целом.'
            }
          ]
        },
      ]
    },
  ],
}

const lessonData12: ILessonDataDB = {
  id: 'SupportTeam',
  courseId: 'how-to-draw',
  title: 'Команда сопровождения',
  type: 'Theory',
  icon: {
    icon: '/png/3d_emoji_Clap.png',
  },
  topic: 'Как устроено обучение',
  topicOrder: 1,
  topicIcon: 'FAQ',
  orderInTopic: 2,
  duration: {
    unit: 'minutes',
    value: 5
  },
  isFree: true,
  isUnderDevelopment: false,
  content: [
    {
      type: 'title',
      title: 'Куратор'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Куратор — знает обо всём, что касается процесса обучения. Поможет решить проблемы со входом в личный кабинет, подскажет, что делать, если проект принят, а прочитать комментарии ревьюера не выходит.'
        },
      ]
    },
    {
      type: 'chat',
      chat: {
        blocks: [
          {
            showThisBlockButtonContent: '',
            messages: [
            ],
          },
          {
            showThisBlockButtonContent: 'А как с ним можно связаться?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'А как с ним можно связаться?'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'В любом мессенджере, который вам подходит: Telegram, WhatsApp, Vk.'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Куратор выслушает и поддержит, а также подскажет, как поступить, если сдать итоговый проект не получается вовремя.'
              },
            ],
          },
          {
            showThisBlockButtonContent: 'Понятно) Если ничего не успеваешь — иди к куратору) А если у меня будут вопросы по заданию? К кому обратиться?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Понятно) Если ничего не успеваешь — иди к куратору) А если у меня будут вопросы по заданию? К кому обратиться?'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Вопросы по заданиям — это к ревьюеру.'
              },
            ],
          },
        ]
      }
    },
    {
      type: 'title',
      title: 'Ревьюер'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Ревьюер проверит финальные проекты и даст обратную связь. Комментарии обычно доступны в течение 1‒2 дней после отправки проекта.  На этой программе с вами будет работать Соня Ульянова, иллюстратор, выпускница БВШД.'
        },
        {
          tag: 'p',
          content: 'Ревьюер смотрит вашу работу и оставляет комментарии о том, как её улучшить. В среднем, чтобы сдать проект, требуется до трёх проверок ревьюера. После каждой проверки у вас будет возможность задать уточняющие вопросы и обсудить сомнительные места в работе.'
        },
        {
          tag: 'p',
          content: 'Команда сопровождения будет с вами в течение всего обучения, её задача — поддерживать вас и помогать. Вы сможете задать любой вопрос по программе или просто поделиться переживаниями. '
        },
        {
          tag: 'p',
          content: 'А сейчас у нас к вам пара вопросов — и сразу продолжим. Вопросы займут 1–2 минуты.'
        },
      ]
    }
  ],
  survey: {
    0: {
      type: 'SELECT',
      variant: 'RADIO',
      title: '1/4. У вас есть опыт работы или учёбы по специальности «Иллюстратор»?',
      options: [
        'Нет, впервые знакомлюсь с профессией',
        'Да, уже в процессе изучения или работаю в этой сфере',
      ],
    },
    1: {
      type: 'SELECT',
      variant: 'RADIO',
      title: '2/4. Какой именно опыт в профессии «Иллюстратор» у вас есть?',
      options: [
        'Пробовал(а) учиться самостоятельно',
        'Получаю эту профессию в университете или на профессиональных курсах',
        'Работаю на смежной должности или в команде со специалистами этой профессии',
        'Работаю по этой специальности меньше года',
        'Работаю по этой специальности больше года',
      ],
    },
    2: {
      type: 'SELECT',
      variant: 'RADIO',
      title: '3/4. Какая у вас цель в учёбе?',
      options: [
        'Освоить новую профессию',
        'Получить повышение и развиваться в карьере',
        'Расширить компетенции и чувствовать себя увереннее',
        'Получить навыки для работы над собственным проектом, идеей или бизнесом',
        'Просто хочу научиться чему-то новому',
      ],
    },
    3: {
      type: 'SELECT',
      variant: 'CHECKBOX',
      title: '4/4. Что вы уже видели, слышали или читали о flearn?',
      options: [
        'Сайт, соцсети (Телеграм, Тикток)',
        'Рекомендации от знакомых, которые учились в flearn',
        'Другие источники',
        'Узнал(а) о вас только что и пока только начинаю знакомиться',
      ],
    },
  }
}

const lessonData13: ILessonDataDB = {
  id: 'FAQ',
  courseId: 'how-to-draw',
  title: 'Частые вопросы и ответы на них',
  type: 'Theory',
  icon: {
    icon: '/png/3d_emoji_ThinkingFace1.png',
  },
  topic: 'Как устроено обучение',
  topicOrder: 1,
  topicIcon: 'FAQ',
  orderInTopic: 3,
  duration: {
    unit: 'minutes',
    value: 5
  },
  isFree: true,
  isUnderDevelopment: false,
  content: [
    {
      type: 'chat',
      chat: {
        blocks: [
          {
            showThisBlockButtonContent: '',
            messages: [
            ],
          },
          {
            showThisBlockButtonContent: 'Как быть, если я не умею рисовать?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Как быть, если я не умею рисовать?'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Сейчас иллюстратору необязательно владеть классическим рисунком. Достаточно освоить базовые принципы визуальной коммуникации.'
              },
            ],
          },
        ]
      }
    },
    {
      type: 'chat',
      chat: {
        blocks: [
          {
            showThisBlockButtonContent: '',
            messages: [
            ],
          },
          {
            showThisBlockButtonContent: 'Что если я недостаточно творческий и креативный?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Что если я недостаточно творческий и креативный?'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Креативность — такой же навык, как композиция или работа с цветом. Её мы будем прокачивать на протяжении всего обучения — на практике и с обратной связью.'
              },
            ],
          },
        ]
      }
    },
    {
      type: 'chat',
      chat: {
        blocks: [
          {
            showThisBlockButtonContent: '',
            messages: [
            ],
          },
          {
            showThisBlockButtonContent: 'Что входит в стоимость платной подписки?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Что входит в стоимость платной подписки?'
              },
            ],
          },
        ]
      }
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Уроки и практические задания ',
              props: {className: ' bold'}
            },
            {
              tag: 'span',
              content: '— всё, что поможет усвоить знания на практике. Мы следим за трендами в индустрии и постоянно их обновляем.'
            }
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Обратная связь и поддержка. ',
              props: {className: ' bold'}
            },
            {
              tag: 'span',
              content: 'Это куратор, который в процессе обучения готов ответить на любые вопросы и ревьюеры, которые дают обратную связь по проектам и помогают довести их до уровня портфолио.'
            }
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Чат студентов ',
              props: {className:' bold'}
            },
            {
              tag: 'span',
              content: '— телеграм-чат, где можно общаться с сокурсниками, обсуждать проекты и теорию, делиться интересными материалами, помогать друг другу советами.'
            }
          ],
        },
        {
          tag: 'p',
          content: 'Чтобы было понятнее, чем платная подписка отличается от бесплатного аккаунта, мы нарисовали эту схему:',
        }
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'Comparison.png',
        alt: 'Comparison'
      },
    },
    {
      type: 'button',
      handlerId: 'open-buy-source-popup',
      content: 'Перейти к оплате',
    },
    {
      type: 'title',
      title: 'Что дальше?'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Знакомство с процессом обучения в flearn завершено! Дальше мы будем поэтапно погружать вас в мир иллюстрации. Поехали!'
        },
      ]
    },
  ]
}

const lessonData21: ILessonDataDB = {
  id: 'DrawingExercises_h3dx7k',
  courseId: 'how-to-draw',
  title: 'Упражнения, чтобы разрисоваться',
  type: 'Theory',
  icon: {
    icon: '/png/3d_emoji_HuggingFace.png',
  },
  topic: 'Линия',
  topicOrder: 2,
  topicIcon: 'Lesson',
  orderInTopic: 1,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
  isUnderDevelopment: false,
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

const lessonData22: ILessonDataDB = {
  id: 'LineIntroduction_gBpaFa',
  courseId: 'how-to-draw',
  title: 'Линия: знакомство',
  type: 'Theory',
  icon: {
    icon: '/png/3d_emoji_HuggingFace.png',
  },
  topic: 'Линия',
  topicOrder: 2,
  topicIcon: 'Lesson',
  orderInTopic: 2,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
  isUnderDevelopment: false,
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

const lessonData23: ILessonDataDB = {
  id: 'LineShape_RY7PQ3',
  courseId: 'how-to-draw',
  title: 'Линия: как рисовать объемно',
  type: 'Theory',
  icon: {
    icon: '/png/3d_emoji_HuggingFace.png',
  },
  topic: 'Линия',
  topicOrder: 2,
  topicIcon: 'Lesson',
  orderInTopic: 3,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
  isUnderDevelopment: false,
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

const lessonData24: ILessonDataDB = {
  id: 'HowToDrawSimilarPicture_bah4tw',
  courseId: 'how-to-draw',
  title: 'Как рисовать похоже',
  type: 'Theory',
  icon: {
    icon: '/png/3d_emoji_HuggingFace.png',
  },
  topic: 'Линия',
  topicOrder: 2,
  topicIcon: 'Lesson',
  orderInTopic: 4,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
  isUnderDevelopment: false,
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
      type: 'quote',
      quote: [
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
      type: 'quote',
      quote: [
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

const lessonData25: ILessonDataDB = {
  id: 'HowToDrawSimilarPictureLine_t6qrnq',
  courseId: 'how-to-draw',
  title: 'Как рисовать похоже. Линия',
  type: 'Theory',
  icon: {
    icon: '/png/3d_emoji_HuggingFace.png',
  },
  topic: 'Линия',
  topicOrder: 2,
  topicIcon: 'Lesson',
  orderInTopic: 5,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
  isUnderDevelopment: false,
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
      type: 'quote',
      quote: [
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
      type: 'quote',
      quote: [
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

const lessonData26: ILessonDataDB = {
  id: 'HowToDrawSimilarPictureLine_t6qrnq_Practice_iqln35',
  courseId: 'how-to-draw',
  title: 'Практика первой недели',
  type: 'Practice',
  icon: {
    icon: '/png/3d_emoji_HuggingFace.png',
  },
  topic: 'Линия',
  topicOrder: 2,
  topicIcon: 'Lesson',
  orderInTopic: 6,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
  isUnderDevelopment: false,
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
      type: 'quote',
      quote: [
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
      type: 'quote',
      quote: [
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

const lessonData31: ILessonDataDB = {
  id: 'DifferencesLineSpot_W4baHU',
  courseId: 'how-to-draw',
  title: 'Про разницу между линией и пятном',
  type: 'Theory',
  icon: {
    icon: '/png/3d_emoji_HuggingFace.png',
  },
  topic: 'Пятно',
  topicOrder: 3,
  topicIcon: 'Lesson',
  orderInTopic: 1,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
  isUnderDevelopment: false,
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
      type: 'quote',
      quote: [
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

const lessonData32: ILessonDataDB = {
  id: 'SpotIntroduction_R4vzDr',
  courseId: 'how-to-draw',
  title: 'Пятно: знакомство',
  type: 'Theory',
  icon: {
    icon: '/png/3d_emoji_HuggingFace.png',
  },
  topic: 'Пятно',
  topicOrder: 3,
  topicIcon: 'Lesson',
  orderInTopic: 2,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
  isUnderDevelopment: false,
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

const lessonData33: ILessonDataDB = {
  id: 'HowToDrawSimilarPictureSpot_p6hXtt',
  courseId: 'how-to-draw',
  title: 'Как рисовать похоже. Пятно',
  type: 'Theory',
  icon: {
    icon: '/png/3d_emoji_HuggingFace.png',
  },
  topic: 'Пятно',
  topicOrder: 3,
  topicIcon: 'Lesson',
  orderInTopic: 3,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
  isUnderDevelopment: false,
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

const lessonData34: ILessonDataDB = {
  id: 'SpotShape_dftUrH',
  courseId: 'how-to-draw',
  title: 'Как рисовать объемно. Пятно',
  type: 'Theory',
  icon: {
    icon: '/png/3d_emoji_HuggingFace.png',
  },
  topic: 'Пятно',
  topicOrder: 3,
  topicIcon: 'Lesson',
  orderInTopic: 4,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
  isUnderDevelopment: false,
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

const lessonData35: ILessonDataDB = {
  id: 'SpotPractice_kfKAEY',
  courseId: 'how-to-draw',
  title: 'Практика второй недели',
  type: 'Practice',
  icon: {
    icon: '/png/3d_emoji_HuggingFace.png',
  },
  topic: 'Пятно',
  topicOrder: 3,
  topicIcon: 'Lesson',
  orderInTopic: 5,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
  isUnderDevelopment: false,
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
          content: 'Выберите одну тему: кошки, собаки, чайники, лягушки. Нарисуйте 30 законченных работ.',
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
      type: 'quote',
      quote: [
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
      type: 'quote',
      quote: [
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

const lessonData41: ILessonDataDB = {
  id: 'LineAndSpot_jr2WYu',
  courseId: 'how-to-draw',
  title: 'Линия и пятно: как совмещать',
  type: 'Theory',
  icon: {
    icon: '/png/3d_emoji_HuggingFace.png',
  },
  topic: 'Линия и пятно',
  topicOrder: 4,
  topicIcon: 'Lesson',
  orderInTopic: 1,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
  isUnderDevelopment: false,
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
    // {
    //   type: 'factoid',
    //   factoid: [
    //     {
    //       tag: 'a',
    //       content: 'Графический плэнэр Димы Горелышева про линию и пятно',
    //       props: { className: 'nav-link', target: "_blank", to: 'https://www.notion.so/8d1b632581a04417a9cb6d10b3e681cb?pvs=4' },
    //     },
    //   ],
    // },
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

const lessonData42: ILessonDataDB = {
  id: 'ContrastNuance_9rP6Yl',
  courseId: 'how-to-draw',
  title: 'Как выделить главное: контраст, нюанс',
  type: 'Theory',
  icon: {
    icon: '/png/3d_emoji_HuggingFace.png',
  },
  topic: 'Линия и пятно',
  topicOrder: 4,
  topicIcon: 'Lesson',
  orderInTopic: 2,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
  isUnderDevelopment: false,
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

const lessonData43: ILessonDataDB = {
  id: 'LineSpotPractice_L8A8Jk',
  courseId: 'how-to-draw',
  title: 'Практика третьей недели',
  type: 'Practice',
  icon: {
    icon: '/png/3d_emoji_HuggingFace.png',
  },
  topic: 'Линия и пятно',
  topicOrder: 4,
  topicIcon: 'Lesson',
  orderInTopic: 3,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
  isUnderDevelopment: false,
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
      type: 'quote',
      quote: [
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
      type: 'quote',
      quote: [
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
          id: 'activeSpot1.jpg',
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
          id: 'activeSpot4.jpg',
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
          id: 'activeSpot15.jpg',
          alt: 'activeSpot15',
        },
      ]
    }
  ]
}

const lessonDataFYS11: ILessonDataDB = {
  id: 'About',
  courseId: 'finding-your-style',
  title: 'Привет!',
  type: 'Theory',
  icon: {
    icon: '/png/3d_emoji_HuggingFace.png',
  },
  topic: 'Как устроено обучение',
  topicOrder: 1,
  topicIcon: 'FAQ',
  orderInTopic: 1,
  duration: {
    unit: 'minutes',
    value: 5
  },
  isFree: true,
  isUnderDevelopment: false,
  content: [
    {
      type: 'chat',
      chat: {
        blocks: [
          {
            showThisBlockButtonContent: '',
            messages: [
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Меня зовут Соня, я иллюстратор и автор обучающих программ в flearn.'
              },
            ],
          },
          {
            showThisBlockButtonContent: 'Привет!',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Привет!'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Я буду помогать разбираться с теорией и задавать уточняющие вопросы, чтобы убедиться, что мы правильно друг друга поняли)'
              },
            ],
          },
          {
            showThisBlockButtonContent: 'Здорово, мне подходит)',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Здорово, мне подходит)'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Сначала расскажу, как всё устроено. А потом будем учиться.'
              },
            ],
          },
        ]
      }
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Если коротко, обучение в flearn — это 10-15 минут в день, много практических заданий и живой обратной связи. Вот что предстоит делать на курсах:',
        },
      ]
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'самостоятельно осваивать короткие уроки в учебнике;'
        },
        {
          tag: 'p',
          content: 'сдавать финальные задания на проверку;'
        },
        {
          tag: 'p',
          content: 'получать персональную и бережную обратную связь от ревьюера и вносить правки.'
        },
      ]
    },
    {
      type: 'chat',
      chat: {
        blocks: [
          {
            showThisBlockButtonContent: '',
            messages: [
            ],
          },
          {
            showThisBlockButtonContent: 'Что значит «учебник»? Придётся много читать?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Что значит «учебник»? Придётся много читать?'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Не совсем. В учебнике можно проходить квизы и расширять кругозор в игровом формате.'
              },
            ],
          },
          {
            showThisBlockButtonContent: 'А кто написал учебник?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'А кто написал учебник?'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Я вместе с другими иллюстраторами. Мы постоянно обновляем и дополняем его, чтобы информация была актуальной)'
              },
            ],
          },
          {
            showThisBlockButtonContent: 'С учебником — понятно) Расскажи про тарифы. Я правильно понимаю, что можно учиться бесплатно?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'С учебником — понятно) Расскажи про тарифы. Я правильно понимаю, что можно учиться бесплатно?'
              },

            ],
          },
        ]
      }
    },
    {
      type: 'title',
      title: 'Бесплатный первый модуль для всех курсов'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'С бесплатным аккаунтом можно пройти уроки первого модуля на любом курсе. В конце модуля вы сможете выполнить самостоятельный проект и получить по нему обратную связь — совсем как на платном курсе. Но бесплатно.',
        },
      ]
    },
    {
      type: 'chat',
      chat: {
        blocks: [
          {
            showThisBlockButtonContent: '',
            messages: [
            ],
          },
          {
            showThisBlockButtonContent: 'Постой, то есть в бесплатном профиле есть обратная связь?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Постой, то есть в бесплатном профиле есть обратная связь?'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Да, все так. В конце первого модуля вы сможете сдать на проверку свой самостоятельный проект и получить обратную связь от иллюстратора)'
              },
            ],
          },
        ]
      }
    },
    {
      type: 'title',
      title: 'Платная подписка flearn Pro'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Если понравится, можно оплатить подписку flearn Pro. Она открывает доступ ко всем материлам в школе и снимает ограничение на количество обратной связи от преподавателя. Материалы спроектированы так, чтобы учиться было интересно как совсем новичкам, так и тем, кто уже пробует себя в иллюстрации.'
        },
        {
          tag: 'p',
          content: 'Дальше расскажу про куратора и ревьюера и отвечу на частые вопросы. Если интересно, жмите к следующему уроку. А если все и так понятно — смело пропускайте онбординг и переходите к обучению.'
        },
      ]
    },
    {
      type: 'textImportant',
      text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Кстати, мы рассказываем про обучение не только в учебнике. У нас есть '
            },
            {
              tag: 'a',
              content: 'телеграм-канал',
              props: { className: 'key-link', target: "_blank", to: 'https://t.me/sofiulyanova' },
            },
            {
              tag: 'span',
              content: ' для всех, кто хочет развиваться в сфере иллюстрации. В нем мы публикуем анонсы мероприятий, интересные факты об учебе и иллюстрации в целом.'
            }
          ]
        },
      ]
    },
  ],
}

const lessonDataFYS12: ILessonDataDB = {
  id: 'SupportTeam',
  courseId: 'finding-your-style',
  title: 'Команда сопровождения',
  type: 'Theory',
  icon: {
    icon: '/png/3d_emoji_Clap.png',
  },
  topic: 'Как устроено обучение',
  topicOrder: 1,
  topicIcon: 'FAQ',
  orderInTopic: 2,
  duration: {
    unit: 'minutes',
    value: 5
  },
  isFree: true,
  isUnderDevelopment: false,
  content: [
    {
      type: 'title',
      title: 'Куратор'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Куратор — знает обо всём, что касается процесса обучения. Поможет решить проблемы со входом в личный кабинет, подскажет, что делать, если проект принят, а прочитать комментарии ревьюера не выходит.'
        },
      ]
    },
    {
      type: 'chat',
      chat: {
        blocks: [
          {
            showThisBlockButtonContent: '',
            messages: [
            ],
          },
          {
            showThisBlockButtonContent: 'А как с ним можно связаться?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'А как с ним можно связаться?'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'В любом мессенджере, который вам подходит: Telegram, WhatsApp, Vk.'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Куратор выслушает и поддержит, а также подскажет, как поступить, если сдать итоговый проект не получается вовремя.'
              },
            ],
          },
          {
            showThisBlockButtonContent: 'Понятно) Если ничего не успеваешь — иди к куратору) А если у меня будут вопросы по заданию? К кому обратиться?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Понятно) Если ничего не успеваешь — иди к куратору) А если у меня будут вопросы по заданию? К кому обратиться?'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Вопросы по заданиям — это к ревьюеру.'
              },
            ],
          },
        ]
      }
    },
    {
      type: 'title',
      title: 'Ревьюер'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Ревьюер проверит финальные проекты и даст обратную связь. Комментарии обычно доступны в течение 1‒2 дней после отправки проекта.  На этой программе с вами будет работать Соня Ульянова, иллюстратор, выпускница БВШД.'
        },
        {
          tag: 'p',
          content: 'Ревьюер смотрит вашу работу и оставляет комментарии о том, как её улучшить. В среднем, чтобы сдать проект, требуется до трёх проверок ревьюера. После каждой проверки у вас будет возможность задать уточняющие вопросы и обсудить сомнительные места в работе.'
        },
        {
          tag: 'p',
          content: 'Команда сопровождения будет с вами в течение всего обучения, её задача — поддерживать вас и помогать. Вы сможете задать любой вопрос по программе или просто поделиться переживаниями. '
        },
        {
          tag: 'p',
          content: 'А сейчас у нас к вам пара вопросов — и сразу продолжим. Вопросы займут 1–2 минуты.'
        },
      ]
    }
  ],
  survey: {
    0: {
      type: 'SELECT',
      variant: 'RADIO',
      title: '1/4. У вас есть опыт работы или учёбы по специальности «Иллюстратор»?',
      options: [
        'Нет, впервые знакомлюсь с профессией',
        'Да, уже в процессе изучения или работаю в этой сфере',
      ],
    },
    1: {
      type: 'SELECT',
      variant: 'RADIO',
      title: '2/4. Какой именно опыт в профессии «Иллюстратор» у вас есть?',
      options: [
        'Пробовал(а) учиться самостоятельно',
        'Получаю эту профессию в университете или на профессиональных курсах',
        'Работаю на смежной должности или в команде со специалистами этой профессии',
        'Работаю по этой специальности меньше года',
        'Работаю по этой специальности больше года',
      ],
    },
    2: {
      type: 'SELECT',
      variant: 'RADIO',
      title: '3/4. Какая у вас цель в учёбе?',
      options: [
        'Освоить новую профессию',
        'Получить повышение и развиваться в карьере',
        'Расширить компетенции и чувствовать себя увереннее',
        'Получить навыки для работы над собственным проектом, идеей или бизнесом',
        'Просто хочу научиться чему-то новому',
      ],
    },
    3: {
      type: 'SELECT',
      variant: 'CHECKBOX',
      title: '4/4. Что вы уже видели, слышали или читали о flearn?',
      options: [
        'Сайт, соцсети (Телеграм, Тикток)',
        'Рекомендации от знакомых, которые учились в flearn',
        'Другие источники',
        'Узнал(а) о вас только что и пока только начинаю знакомиться',
      ],
    },
  }
}

const lessonDataFYS13: ILessonDataDB = {
  id: 'FAQ',
  courseId: 'finding-your-style',
  title: 'Частые вопросы и ответы на них',
  type: 'Theory',
  icon: {
    icon: '/png/3d_emoji_ThinkingFace1.png',
  },
  topic: 'Как устроено обучение',
  topicOrder: 1,
  topicIcon: 'FAQ',
  orderInTopic: 3,
  duration: {
    unit: 'minutes',
    value: 5
  },
  isFree: true,
  isUnderDevelopment: false,
  content: [
    {
      type: 'chat',
      chat: {
        blocks: [
          {
            showThisBlockButtonContent: '',
            messages: [
            ],
          },
          {
            showThisBlockButtonContent: 'Как быть, если я не умею рисовать?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Как быть, если я не умею рисовать?'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Сейчас иллюстратору необязательно владеть классическим рисунком. Достаточно освоить базовые принципы визуальной коммуникации.'
              },
            ],
          },
        ]
      }
    },
    {
      type: 'chat',
      chat: {
        blocks: [
          {
            showThisBlockButtonContent: '',
            messages: [
            ],
          },
          {
            showThisBlockButtonContent: 'Что если я недостаточно творческий и креативный?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Что если я недостаточно творческий и креативный?'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Креативность — такой же навык, как композиция или работа с цветом. Её мы будем прокачивать на протяжении всего обучения — на практике и с обратной связью.'
              },
            ],
          },
        ]
      }
    },
    {
      type: 'chat',
      chat: {
        blocks: [
          {
            showThisBlockButtonContent: '',
            messages: [
            ],
          },
          {
            showThisBlockButtonContent: 'Что входит в стоимость платной подписки?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Что входит в стоимость платной подписки?'
              },
            ],
          },
        ]
      }
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Уроки и практические задания ',
              props: {className: ' bold'}
            },
            {
              tag: 'span',
              content: '— всё, что поможет усвоить знания на практике. Мы следим за трендами в индустрии и постоянно их обновляем.'
            }
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Обратная связь и поддержка. ',
              props: {className: ' bold'}
            },
            {
              tag: 'span',
              content: 'Это куратор, который в процессе обучения готов ответить на любые вопросы и ревьюеры, которые дают обратную связь по проектам и помогают довести их до уровня портфолио.'
            }
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Чат студентов ',
              props: {className:' bold'}
            },
            {
              tag: 'span',
              content: '— телеграм-чат, где можно общаться с сокурсниками, обсуждать проекты и теорию, делиться интересными материалами, помогать друг другу советами.'
            }
          ],
        },
        {
          tag: 'p',
          content: 'Чтобы было понятнее, чем платная подписка отличается от бесплатного аккаунта, мы нарисовали эту схему:',
        }
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'Comparison.png',
        alt: 'Comparison'
      },
    },
    {
      type: 'button',
      handlerId: 'open-buy-source-popup',
      content: 'Перейти к оплате',
    },
    {
      type: 'title',
      title: 'Что дальше?'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Знакомство с процессом обучения в flearn завершено! Дальше мы будем поэтапно погружать вас в мир иллюстрации. Поехали!'
        },
      ]
    },
  ]
}

const lessonDataFYS21: ILessonDataDB = {
  id: 'Illustration_6BedkV',
  courseId: 'finding-your-style',
  title: 'Иллюстрация',
  type: 'Theory',
  icon: {
    icon: '/png/3d_food_Cherry.png',
  },
  topic: 'Что такое иллюстрация, серия, стиль',
  topicOrder: 2,
  topicIcon: 'Lesson',
  orderInTopic: 1,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: true,
  isUnderDevelopment: false,
  hasQuiz: true,
  content: [
    // {
    //   type: 'video',
    //   videoData: {
    //     src: 'https://www.youtube.com/embed/AewDkjBBW64?si=i7wLe8W9y7eFwFu1',
    //     title: 'YouTube video player',
    //   },
    // },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Иллюстрация — это визуальный инструмент, который рассказывает истории, передаёт эмоции и помогает воспринимать информацию через образы. Она может быть выполнена в разных стилях и техниках: от реализма до абстракции, от цифрового рисования до акварели. Но вне зависимости от формы, иллюстрация всегда говорит о чём-то.',
        },
        {
          tag: 'p',
          content: 'Один из первых вопросов, с которого начинается работа: «Про что эта картинка?»',
        },
      ]
    },
    {
      type: 'title',
      title: 'Почему просто «похоже» — недостаточно',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'В рисунке важна не только узнаваемость. Одного сходства недостаточно, чтобы иллюстрация работала. Фотография все равно будет более похожа. Поэтому художнику важно задать себе другой вопрос:'
        },
        {
          tag: 'p',
          content: 'Что может сказать моя иллюстрация, чего не может сказать фотография?',
          props: { className: 'keyText' }
        }
      ]
    },
    {
      type: 'quote',
      quote: [
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
      title: 'Из чего складывается впечатление от иллюстрации',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Каждая работа строится на двух вещах:',
        },
      ]
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Литературный сюжет',
              props: { className:'keyText' }
            },
            {
              tag: 'span',
              content: ' — что происходит, кто герои, где они находятся, какой посыл заложен.',
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Пластическая идея',
              props: { className:'keyText' }
            },
            {
              tag: 'span',
              content: ' — как это нарисовано, в каком визуальном языке и с какими выразительными средствами.',
            },
          ]
        },
      ]
    },
    {
      type: 'title',
      title: 'Литературный сюжет',
    },
    {
      type: 'image',
      imageData: {
        id: 'TomGauld1.webp',
        alt: 'TomGauld1',
        caption: [
          {
            tag: 'a',
            content: 'Tom Gauld',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.tomgauld.com' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Литературный сюжет рассказывает о том, что происходит в рисунке:',
        },
      ]
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'сколько в рисунке персонажей',
        },
        {
          tag: 'p',
          content: 'что персонажи делают',
        },
        {
          tag: 'p',
          content: 'какое время суток',
        },
        {
          tag: 'p',
          content: 'мы в комнате или в лесу',
        },
      ]
    },
    {
      type: 'title',
      title: 'Пластическая идея',
    },
    {
      type: 'image',
      imageData: {
        id: 'CharleyHarper6.jpeg',
        alt: 'CharleyHarper6',
        caption: [
          {
            tag: 'a',
            content: 'Charley Harper',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/charleyharperart/?hl=en' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Пластическая идея — это попытка показать стилизацию, утрировать ощущение от картинки. Утрируем всегда то, что можем проговорить. Некий аспект, который нам важен.',
        },
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Пластический сюжет рассказывает о том, как рисовать:',
        },
      ]
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'цветовая палитра',
        },
        {
          tag: 'p',
          content: 'техника',
        },
        {
          tag: 'p',
          content: 'формат, размер листа',
        },
        {
          tag: 'p',
          content: 'формообразование',
        },
        {
          tag: 'p',
          content: 'логика построения пространства',
        },
        {
          tag: 'p',
          content: 'фактура',
        },
        {
          tag: 'p',
          content: 'светотень',
        },
        {
          tag: 'p',
          content: 'количество воздуха в листе',
        },
        {
          tag: 'p',
          content: 'температура',
        },
        {
          tag: 'p',
          content: 'контрастность',
        },
        {
          tag: 'p',
          content: 'синестезия',
        },
        {
          tag: 'p',
          content: 'ритмы',
        },
        {
          tag: 'p',
          content: 'скорость, с которой делается вещь, легкость',
        },
        {
          tag: 'p',
          content: 'динамика в листе',
        },
        {
          tag: 'p',
          content: 'умение рисовать.',
        },
      ]
    },
    {
      type: 'text',
      text: 'Это не просто “стиль” — это художественный выбор, который помогает рассказать историю.'
    },
    {
      type: 'title',
      title: 'Когда сюжет важнее пластики',
    },
    {
      type: 'image',
      imageData: {
        id: 'AmyHwang1.webp',
        alt: 'AmyHwang1',
        caption: [
          {
            tag: 'p',
            content: '“Between shorter daylight hours and longer times for getting dressed, it’s easier to stay inside.”',
          },
          {
            tag: 'a',
            content: 'Cartoon by Amy Hwang',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.newyorker.com/cartoon/a60949' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Когда автору нужно сделать сложную мысль простой, он использует ясный, минималистичный визуальный язык. Например, карикатуры в журнале NewYorker — это простые чёрно-белые рисунки с остроумными подписями, которые передают сложные идеи через минимализм.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Когда пластика важнее сюжета',
    },
    {
      type: 'image',
      imageData: {
        id: 'MashaTitova.webp',
        alt: 'MashaTitova',
        caption: [
          {
            tag: 'a',
            content: 'Art by Masha Titova',
            props: { className: 's-hoverable', target: "_blank", to: 'http://www.newyorker.com/contributors/masha-titova' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Если цель — создать атмосферу, настроение, звучание, пластическая идея становится главной. Сюжет отходит на второй план, а визуальные ритмы и формы начинают "звучать", как музыка.',
        },
        {
          tag: 'p',
          content: 'Например, иллюстрация Марии Титовой на обложке музыкального выпуска журнала The New Yorker.'
        }
      ]
    },
    {
      type: 'quote',
      quote: [
        {
          tag: 'p',
          content: 'Эта работа про разнообразные элементы как музыкальные стили, соединяющиеся в великолепном миксе «звуков», формирующих окружающее пространство как красивую и уродливую параллельную реальность.',
        },
        {
          tag: 'p',
          content: '… я сосредоточилась на ритме и расположении элементов на обложке, играя с различиями в форме и масштабе. Было очень весело перемещать и масштабировать фигуры, добиваясь разных звуков кавера: нежных и резких, шумных и громких.',
        },
        {
          tag: 'p',
          content: 'Мария Титова',
        },
      ]
    },
    {
      type: 'title',
      title: 'Когда сюжет и пластика дополняют друг друга',
    },
    {
      type: 'image',
      imageData: {
        id: 'JohnPatrickByrne.webp',
        alt: 'JohnPatrickByrne',
        caption: [
          {
            tag: 'p',
            content: 'John Patrick Byrne',
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'При работе над персонажами, пластическая идея и сюжет часто работают вместе. Например, игривый и легкий персонаж, игривая и легкая интонация рисунка в работе Патрика Бирна.',
        },
        {
          tag: 'p',
          content: 'Художник открывает нестереотипную сторону персонажа.  В фильмах Тильда Суинтон обычно играет холодную злодейку, как в фильме Хроники Нарнии или Докторе Стрэйнже. Но ее муж Патрик Бирн изображает Тильду игривой и легкой. Такой, какую он знает ее в жизни.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Когда пластическая идея и сюжет спорят друг с другом',
    },
    {
      type: 'image',
      imageData: {
        id: 'ZhiyongJing7.jpg',
        alt: 'ZhiyongJing6',
        caption: [
          {
            tag: 'a',
            content: 'Zhiyong Jing',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.jingzhiyong.com/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Противопоставление идеи и исполнения создают напряжение. Например, Zhiyong Jing создает конфликт между интонацией и самой историей. Литературный сюжет про криминал. И супер спокойная интонация наивной живописи.',
        },
        {
          tag: 'p',
          content: 'Такой конфликт между формой и содержанием создаёт напряжение и глубину. Зритель «цепляется» и остаётся дольше.',
        },
      ]
    },
    {
      type: 'textImportant',
      text: [
          {
            tag: 'p',
            content: 'Иллюстрация всегда «про что-то». Просто «похоже» — это ещё не работа.',
          },
          {
            tag: 'p',
            content: 'Литературный сюжет отвечает на вопрос «Что здесь происходит?»',
          },
          {
            tag: 'p',
            content: 'Пластическая идея — на вопрос «Как это нарисовано и почему именно так?»',
          },
          {
            tag: 'p',
            content: 'Иногда один компонент важнее, иногда они равны, иногда — спорят друг с другом. И это тоже работает',
          },
          {
            tag: 'p',
            content: 'Сильная иллюстрация рождается из того, как именно пластика и сюжет взаимодействуют между собой.',
          },
      ]
    }
  ],
  survey: {
    0: {
      type: 'SELECT',
      variant: 'CARD',
      subtitle: 'Хотим зафиксировать цель, с которой вы проходите бесплатные уроки. А в конце спросим, получилось ли её достичь.',
      description: 'Выберите цель:',
      options: [
        {
          title: 'Пройти и оплатить',
          subtitle: 'Подготовиться к платным урокам',
        },
        {
          title: 'Попробовать формат',
          subtitle: 'Понять, понравится ли мне учеба в flearn',
        },
        {
          title: 'Пройти только бесплатные уроки',
          subtitle: 'Бесплатно научиться чему-нибудь новому',
        },
      ],
    },
  }
}

const lessonDataFYS22: ILessonDataDB = {
  id: 'Series_1JYKwX',
  courseId: 'finding-your-style',
  title: 'Серия',
  type: 'Theory',
  icon: {
    icon: '/png/3d_food_ChocolateCake.png',
  },
  topic: 'Что такое иллюстрация, серия, стиль',
  topicOrder: 2,
  topicIcon: 'Lesson',
  orderInTopic: 2,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: true,
  isUnderDevelopment: false,
  hasQuiz: false,
  content: [
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Серия — это группа работ, объединённых общей интонацией, стилем исполнения, форматом, сюжетом или материалом.',
        },
        {
          tag: 'p',
          content: 'Чтобы изображения воспринимались как серия, в них должно быть:',
        },
      ]
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'что-то общее, что держит их вместе,',
        },
        {
          tag: 'p',
          content: 'и что-то разное, что делает их интересными по отдельности.',
        },
      ]
    },
    {
      type: 'text',
      text: 'Минимальное количество работ в серии — 3–5 изображений. Этого уже достаточно, чтобы создать ритм и узнаваемость.'
    },
    {
      type: 'title',
      title: 'Чем серия отличается от одиночной иллюстрации',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Одиночная иллюстрация передаёт мысль или эмоцию одним изображением. Серия раскрывает идею через несколько вариаций, ракурсов, состояний. Например:',
        },
      ]
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'Одна картинка с лесом — это иллюстрация.',
        },
        {
          tag: 'p',
          content: 'Набор иллюстраций, где лес изображен в разное время суток или сезоны — это серия.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Что объединяет работы в серию',
    },
    {
      type: 'image',
      imageData: {
        id: 'Zulma.webp',
        alt: 'zulma',
        caption: [
          {
            tag: 'a',
            content: 'Книги издательства Zulma',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.zulma.fr/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'На всех книгах издательства Zulma стоит треугольная плашка. Она дает понять, что книги относятся к одному и тому же издательству. При этом иллюстрации на обложках значительно различаются между собой.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'tapiorum.jpg',
        alt: 'tapiorum',
        caption: [
          {
            tag: 'a',
            content: 'tapiorum',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/tapiorum/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Студия tapiorum делает керамическую посуду: кружки, тарелки, вазы, подсвечники. В серии с грибами форма, размер, расположение и количество грибов различаются в зависимости от предмета. Самого факта наличия гриба — достаточно, чтобы сохранить серийность.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'tinayuartist2.jpeg',
        alt: 'tinayuartist2',
        caption: [
          {
            tag: 'a',
            content: 'Tina',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/tapiorum/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Серия скульптур “Зодиак” от китайской художница Тины. Мы видим три общие линии: литературный сюжет, форма, материал. Каждая фигурка изображает один из знаков зодиака. Каждая фигурка — это голова человека в шапке или маске животного. Все фигурки сделаны из керамики, в схожей манере.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Что может быть «константой», общим элементом'
    },
    {
      type: 'text',
      text: 'То, что остаётся стабильным от работы к работе:'
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'цветовая палитра',
        },
        {
          tag: 'p',
          content: 'техника',
        },
        {
          tag: 'p',
          content: 'формат, размер листа',
        },
        {
          tag: 'p',
          content: 'формообразование',
        },
        {
          tag: 'p',
          content: 'логика построения пространства',
        },
        {
          tag: 'p',
          content: 'фактура',
        },
        {
          tag: 'p',
          content: 'светотень',
        },
        {
          tag: 'p',
          content: 'количество воздуха в листе',
        },
        {
          tag: 'p',
          content: 'температура',
        },
        {
          tag: 'p',
          content: 'контрастность',
        },
        {
          tag: 'p',
          content: 'синестезия',
        },
        {
          tag: 'p',
          content: 'ритмы',
        },
        {
          tag: 'p',
          content: 'скорость, с которой делается вещь, легкость',
        },
        {
          tag: 'p',
          content: 'динамика в листе',
        },
        {
          tag: 'p',
          content: 'умение рисовать.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Что дает разнообразие',
    },
    {
      type: 'image',
      imageData: {
        id: 'EddyRosas.jpeg',
        alt: 'EddyRosas',
        caption: [
          {
            tag: 'a',
            content: 'Eddy Rosas',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/ertilu' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Все, что не константа. Чтобы серия получилась, автор должен выбрать набор параметров, которые он зафиксирует — это станет единой интонацией серии. И определиться с параметрами, за счет которых он сделает серию разнообразной.',
        },
      ]
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'Положение объекта',
        },
        {
          tag: 'p',
          content: 'Время суток или сезон',
        },
        {
          tag: 'p',
          content: 'Местоположение, фон',
        },
        {
          tag: 'p',
          content: 'Количество персонажей',
        },
        {
          tag: 'p',
          content: 'Детали и аксессуары',
        },
        {
          tag: 'p',
          content: 'Угол зрения',
        },
        {
          tag: 'p',
          content: 'Эмоция героя',
        },
        {
          tag: 'p',
          content: 'Визуальный темп, быстро–медленно, плотно–воздушно',
        },
      ]
    },
    {
      type: 'textImportant',
      text: [
        {
          tag: 'p',
          content: 'Серия — это не повтор, а вариации вокруг общего.'
        },
        {
          tag: 'p',
          content: 'Чтобы работы смотрелись как серия, в них должно быть достаточно общего — и достаточно разного.'
        },
        {
          tag: 'p',
          content: 'Общим может быть всё: цвет, формат, идея, пластика, настроение.'
        },
        {
          tag: 'p',
          content: 'Меняться должны детали, ситуации, позы, ракурсы, времена.'
        },
        {
          tag: 'p',
          content: 'Прежде чем рисовать, решите: что фиксируете, а что будете варьировать. Это и есть основа серии.'
        }
      ]
    }
  ],
}

const lessonDataFYS23: ILessonDataDB = {
  id: 'Style_oPVK1S',
  courseId: 'finding-your-style',
  title: 'Стиль',
  type: 'Theory',
  icon: {
    icon: '/png/3d_emoji_SmilingFaceWithSunglasses.png',
  },
  topic: 'Что такое иллюстрация, серия, стиль',
  topicOrder: 2,
  topicIcon: 'Lesson',
  orderInTopic: 3,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: true,
  isUnderDevelopment: false,
  content: [
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Стиль — это то, что автор осознанно повторяет в своих работах. Это не про “рисовать одинаково”, а про узнаваемую систему художественных решений, которая проявляется из раза в раз — даже в разных техниках и проектах.',
        },
      ]
    },
    {
      type: 'title',
      title: 'От частного к общему: иллюстрация → серия → стиль',
    },
    {
      type: 'image',
      imageData: {
        id: 'DmitriyGorelyshev.webp',
        alt: 'DmitriyGorelyshev',
        caption: [
          {
            tag: 'a',
            content: 'Дмитрий Горелышев',
            props: { className: 's-hoverable', target: "_blank", to: 'https://t.me/s/dima_gorelyshev?before=2439' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Иллюстрация может быть выполнена в каком-то стиле — но это не обязательно стиль автора. Это может быть разовый эксперимент или работа под задачу.',
        },
        {
          tag: 'p',
          content: 'Серия показывает единый подход: техника, цвет, композиция работают в одном ключе. Но это всё ещё отдельный пример, как 2 + 4.',
        },
        {
          tag: 'p',
          content: 'Стиль — это уже система. Как формула с переменными: x + 2x.',
        },
        {
          tag: 'p',
          content: 'Он складывается из того, что автор считает важным. И проявляется через разные проекты, темы, материалы, но остаётся узнаваемым.',
        },
      ]
    },
    {
      type: 'quote',
      quote: 'Стиль — это серия серий.'
    },
    {
      type: 'title',
      title: 'Как формируется стиль',
    },
    {
      type: 'text',
      text: 'Стиль не выбирается заранее. Он появляется со временем, как побочный эффект:'
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'повторяющихся тем, которые вам интересны;'
        },
        {
          tag: 'p',
          content: 'визуальных решений, которые вы считаете выразительными;'
        },
        {
          tag: 'p',
          content: 'ограничений, в которых вы работаете осознанно (например, “без контура” или “только тёплая палитра”).'
        }
      ]
    },
    {
      type: 'text',
      text: 'Но вы можете осознанно направлять этот процесс, если научитесь формулировать свои ценности.'
    },
    {
      type: 'title',
      title: 'Лозунги и метафоры: как описать свой стиль',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Один из способов понять, что вы делаете — придумать себе лозунг или метафору. Это 2–4 слова, которые концентрируют вашу интонацию.',
        },
      ]
    },
    {
      type: 'text',
      text: 'Такое описание помогает:'
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'лучше выбирать технику,'
        },
        {
          tag: 'p',
          content: 'понять, где ваш голос сильный,'
        },
        {
          tag: 'p',
          content: 'обрезать всё лишнее.'
        }
      ]
    },
    {
      type: 'text',
      text: 'Тесная, шумная тусовка Брехт Эванса.'
    },
    {
      type: 'image',
      imageData: {
        id: 'BrechtEvens1.webp',
        alt: 'BrechtEvens1',
        caption: [
          {
            tag: 'a',
            content: 'BRECHT EVENS',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.brechtevens.com/illustration/2017/9/17/vinyl-cover-unik-ubik' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Уютное, родное пространство Анны Десницкой.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'AnnaDesnitskaya1.webp',
        alt: 'AnnaDesnitskaya1',
        caption: [
          {
            tag: 'a',
            content: 'Anna Desnitskaya',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/anyadesnitskaya/?g=5' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Скрежет когтей, шибуршание шерсти от Léo Forest.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'LéoForest1.webp',
        alt: 'LéoForest1',
        caption: [
          {
            tag: 'a',
            content: 'Léo Forest',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/leo___forest/' },
          },
        ],
      },
    },
    {
      type: 'textImportant',
      text: [
        {
          tag: 'p',
          content: 'Стиль — это не техника. Это повторяющаяся логика выбора, которая проявляется в разных проектах.',
        },
        {
          tag: 'p',
          content: 'Он складывается из ваших ценностей, интересов, предпочтений и ограничений.',
        },
        {
          tag: 'p',
          content: 'Серия — это способ временно зафиксировать стиль. Но сам стиль — шире, глубже, подвижнее.',
        },
        {
          tag: 'p',
          content: 'Придумайте себе лозунг — он поможет сфокусироваться.',
        },
        {
          tag: 'p',
          content: 'Задавайте себе вопрос перед началом работы: из чего она будет состоять? Что важно для меня в этой иллюстрации?',
        },
      ]
    },
  ],
}

const lessonDataFYS31: ILessonDataDB = {
  id: 'Plot_wRlhiz',
  courseId: 'finding-your-style',
  title: 'Сюжет есть всегда',
  type: 'Theory',
  icon: {
    icon: '/png/3d_food_Lollipop.png',
  },
  topic: 'Как сделана иллюстрация. Литературный сюжет',
  topicOrder: 3,
  topicIcon: 'Lesson',
  orderInTopic: 1,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
  isUnderDevelopment: false,
  content: [
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Даже если вы этого не планировали, в вашей иллюстрации уже есть сюжет. Просто потому, что зритель смотрит на изображение и строит предположения: кто здесь, что происходит, почему именно так?'
        },
        {
          tag: 'p',
          content: 'Уровень присутствия сюжета может быть разным — и это выбор художника. Давайте разберёмся, какие есть подходы.'
        },
      ]
    },
    {
      type: 'title',
      title: 'Иллюстрация без ярко выраженного сюжета'
    },
    {
      type: 'image',
      imageData: {
        id: 'RiccardoGuasco2.webp',
        alt: 'RiccardoGuasco2',
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
          content: 'Здесь нет истории, а есть настроение, текстура, цвет, форма. Это может быть орнамент, абстракция, пейзаж без действия или декоративная композиция.'
        },
        {
          tag: 'p',
          content: 'Пример:',
          props: {className: 'keyText'}
        },
      ]
    },
    {
      type: 'quote',
      quote: [
        {
          tag: 'p',
          content: 'Лес в тумане. Никаких героев, никакого действия.'
        },
        {
          tag: 'p',
          content: 'Впечатление: спокойно, можно «войти в атмосферу».'
        }
      ]
    },
    {
      type: 'text',
      text: 'Такой подход работает, когда вы хотите передать состояние, а не рассказ. Это часто используют в иллюстрациях к стихам, в артбуках, на обложках.'
    },
    {
      type: 'title',
      title: 'Иллюстрация, в которой сюжет — лишь фон'
    },
    {
      type: 'image',
      imageData: {
        id: 'AnnaDesnitskaya1.webp',
        alt: 'AnnaDesnitskaya1',
        caption: [
          {
            tag: 'a',
            content: 'Anna Desnitskaya',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/anyadesnitskaya/?g=5' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'История есть, но она не доминирует. Например, это может быть портрет персонажа в среде, из которой можно догадаться, кто он и чем занимается. Или серия бытовых сцен, в которых зритель сам достраивает смысл.'
        },
        {
          tag: 'p',
          content: 'Пример:',
          props: {className: 'keyText'}
        },
      ]
    },
    {
      type: 'quote',
      quote: [
        {
          tag: 'p',
          content: 'Девочка на кухне ест суп, рядом сидит кот.'
        },
        {
          tag: 'p',
          content: 'Мы видим только один момент, но в голове зрителя начинает разворачиваться: «Она, может быть, одна дома? Кот ждёт угощения? А что за записка приклеена на холодильнике?..»'
        }
      ]
    },
    {
      type: 'title',
      title: 'Иллюстрация с сильным литературным сюжетом'
    },
    {
      type: 'image',
      imageData: {
        id: 'DmitriyGorelyshev10.png',
        alt: 'DmitriyGorelyshev10',
        caption: [
          {
            tag: 'a',
            content: 'Dmitriy Gorelyshev',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/gdmitry' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Здесь сюжет — основа работы. Без него картинка теряет смысл. Художник сознательно строит визуальный рассказ, заложив в него конфликт, интригу или неожиданность.'
        },
        {
          tag: 'p',
          content: 'Пример:',
          props: {className: 'keyText'}
        },
      ]
    },
    {
      type: 'quote',
      quote: [
        {
          tag: 'p',
          content: 'Гигантский голубь садится на крышу небоскрёба и разрушает её. Люди бегут в панике.'
        },
        {
          tag: 'p',
          content: 'Это может быть метафора власти, страха, экологии — и у зрителя запускается внутренняя интерпретация.'
        }
      ]
    },
    {
      type: 'title',
      title: 'Что выбрать'
    },
    {
      type: 'text',
      text: 'Вы как автор решаете:'
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'хотите ли вы рассказать историю или просто создать настроение;'
        },
        {
          tag: 'p',
          content: 'должен ли зритель сразу понять сюжет или достраивать его сам;'
        },
        {
          tag: 'p',
          content: 'будет ли история на первом плане или второстепенной.'
        }
      ]
    }
  ]
}

const lessonDataFYS32: ILessonDataDB = {
  id: 'VisualConflictAsThePlot_japhuH',
  courseId: 'finding-your-style',
  title: 'Визуальный конфликт как основа сюжета',
  type: 'Theory',
  icon: {
    icon: '/png/3d_emoji_ExplodingHead.png',
  },
  topic: 'Как сделана иллюстрация. Литературный сюжет',
  topicOrder: 3,
  topicIcon: 'Lesson',
  orderInTopic: 2,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
  isUnderDevelopment: false,
  content: [
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Одна из главных особенностей графики — в том, что зритель видит всю картинку сразу. В отличие от кино или текста, вы не можете вести его по сценам. Поэтому сюжет в иллюстрации работает иначе.'
        },
        {
          tag: 'p',
          content: 'Сюжет строится на моменте, в котором заложен конфликт, переключение внимания, необычное столкновение смыслов или форм. Такой визуальный конфликт — это крючок. Он вызывает у зрителя внутренний вопрос, который хочется разрешить.'
        },
        {
          tag: 'p',
          content: 'Такие приёмы создают внутренний диалог в иллюстрации, побуждая зрителя к размышлениям. Когда в работе получается создать конфликт, зритель надолго задерживается перед рисунком. Он как бы задает себе вопрос, отвечает на него, но затем вопрос появляется заново. В особо хороших случаях, даже после того, как зритель уходит, этот конфликт все еще крутится у него в голове.'
        }
      ]
    },
    {
      type: 'title',
      title: 'Конфликт в графике'
    },
    {
      type: 'image',
      imageData: {
        id: 'DavidShrigley1.webp',
        alt: 'DavidShrigley1',
        caption: [
          {
            tag: 'a',
            content: 'David Shrigley',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/davidshrigley/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Конфликт — столкновение двух или более разных смыслов, форм, настроений или масштабов в одном изображении.'
        },
        {
          tag: 'p',
          content: 'Визуальный конфликт может быть:'
        },
      ]
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'Смысловым: пушистый кот среди крокодилов'
        },
        {
          tag: 'p',
          content: 'Композиционным: огромный предмет среди мелких'
        },
        {
          tag: 'p',
          content: 'Колористическим: кислотные цвета на пастельном фоне'
        },
        {
          tag: 'p',
          content: 'Стилевым: реалистичный объект в плоской декоративной среде'
        },
        {
          tag: 'p',
          content: 'Ситуативным: что-то привычное, помещённое в неподходящий контекст.'
        }
      ]
    },
    {
      type: 'title',
      title: 'Приёмы создания визуального конфликта'
    },
    {
      type: 'image',
      imageData: {
        id: 'ArneHopfner4.jpeg',
        alt: 'ArneHopfner4',
        caption: [
          {
            tag: 'a',
            content: 'Arne Höpfner',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/arnehoepfner' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Ситуационный парадокс. ',
          props: { className: 'keyText'}
        },
        {
          tag: 'span',
          content: 'Создаём конфликт между тем, что происходит, и тем, кто это наблюдает — или как это устроено.'
        }
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Пример:',
          props: { className: 'keyText'}
        },
      ]
    },
    {
      type: 'quote',
      quote: 'Люди в ресторане едят рыбу, наблюдая за живыми рыбами в аквариуме. Это вызывает одновременно дискомфорт и иронию.'
    },
    {
      type: 'image',
      imageData: {
        id: 'ArneHopfner3.jpeg',
        alt: 'ArneHopfner3',
        caption: [
          {
            tag: 'a',
            content: 'Arne Höpfner',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/arnehoepfner' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Неожиданные детали. ',
          props: { className: 'keyText'}
        },
        {
          tag: 'span',
          content: 'Например, старинный чайник с USB-портом или балет в троллейбусе. Смешение эпох, культур или смыслов вызывает вопрос: «почему?»'
        }
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Пример:',
          props: { className: 'keyText'}
        },
      ]
    },
    {
      type: 'quote',
      quote: 'Автомобиль представлен как скелет — будто это ископаемое существо. Техника становится частью естественной истории.'
    },
    {
      type: 'image',
      imageData: {
        id: 'ArneHopfner6.jpg',
        alt: 'ArneHopfner6',
        caption: [
          {
            tag: 'a',
            content: 'Arne Höpfner',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/arnehoepfner' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Предмет в неправильной роли. ',
          props: { className: 'keyText'}
        },
        {
          tag: 'span',
          content: 'Когда привычный объект начинает выполнять необычную функцию, это вызывает улыбку — или лёгкое недоумение.'
        }
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Пример:',
          props: { className: 'keyText'}
        },
      ]
    },
    {
      type: 'quote',
      quote: 'Дом с глазами в окнах и ухом вместо гаража. Дом буквально смотрит и слушает, и зритель оказывается в роли того, за кем наблюдают.'
    },
    {
      type: 'title',
      title: 'Почему это работает'
    },
    {
      type: 'text',
      text: 'Когда вы задаёте в иллюстрации вопрос через конфликт, зритель:'
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'Задерживается на изображении: хочет понять, что не так.'
        },
        {
          tag: 'p',
          content: 'Начинает строить историю: домысливает, что произошло.'
        },
        {
          tag: 'p',
          content: 'Запоминает вашу работу: потому что она вызвала мышление, а не просто прошла фоном.'
        },
      ]
    },
    {
      type: 'quote',
      quote: 'В хорошем визуальном конфликте вопрос остаётся даже после того, как зритель закрыл страницу. Это и делает работу сильной.'
    }
  ]
}

const lessonDataFYS33: ILessonDataDB = {
  id: 'HowToComeUpWithPlot_cHUBlt',
  courseId: 'finding-your-style',
  title: 'Как придумать сюжет: от идеи к серии',
  type: 'Theory',
  icon: {
    icon: '/png/3d_emoji_FaceWithMonocle.png',
  },
  topic: 'Как сделана иллюстрация. Литературный сюжет',
  topicOrder: 3,
  topicIcon: 'Lesson',
  orderInTopic: 3,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
  isUnderDevelopment: false,
  content: [
    {
      type: 'text',
      text: 'Часто сложно придумать историю целиком. Гораздо легче оттолкнуться от одного элемента, зафиксировать его и начать играть с остальными параметрами. Такой приём называют генератором сюжетов.'
    },
    {
      type: 'title',
      title: 'Генератор сюжетов'
    },
    {
      type: 'text',
      text: 'Генератор помогает создавать разнообразные вариации внутри серии. Принцип простой: фиксируем один параметр — меняем всё остальное.'
    },
    {
      type: 'title',
      title: 'Разберем на примере кружочков'
    },
    {
      type: 'text',
      text: 'Отправная точка — черный кружок в центре. Фиксируем форму, меняем светлоту.'
    },
    {
      type: 'image',
      imageData: {
        id: 'generator2.webp',
        alt: 'generator2',
      },
    },
    {
      type: 'text',
      text: 'Фиксируем размер и светлоту, меняем форму.'
    },
    {
      type: 'image',
      imageData: {
        id: 'generator3.webp',
        alt: 'generator3',
      },
    },
    {
      type: 'text',
      text: 'Фиксируем светлоту и форму, меняем размер.'
    },
    {
      type: 'image',
      imageData: {
        id: 'generator4.webp',
        alt: 'generator4',
      },
    },
    {
      type: 'text',
      text: 'Через одну картинку можно провести бесконечное количество генераторов. Все три генератора сразу: фиксируем цвет (чёрно-белый), меняем форму, светлоту и размер.'
    },
    {
      type: 'image',
      imageData: {
        id: 'generator5.webp',
        alt: 'generator5',
      },
    },
    {
      type: 'text',
      text: 'Так можно поступать и с визуальным сюжетом.'
    },
    {
      type: 'title',
      title: 'Пример 1'
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Генератор: ',
              props: { className: 'keyText' }
            },
            {
              tag: 'span',
              content: 'игрушки живут своей жизнью'
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Фиксировано: ',
              props: { className: 'keyText' }
            },
            {
              tag: 'span',
              content: 'тема — «детские игрушки»'
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Меняем: ',
              props: { className: 'keyText' }
            },
            {
              tag: 'span',
              content: 'комнаты, ситуации, время суток'
            },
          ]
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'BrockDavis7.webp',
        alt: 'BrockDavis7',
        caption: [
          {
            tag: 'a',
            content: 'Brock Davis',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/laserbread' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'BrockDavis6.webp',
        alt: 'BrockDavis6',
        caption: [
          {
            tag: 'a',
            content: 'Brock Davis',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/laserbread' },
          },
        ],
      },
    },
    {
      type: 'title',
      title: 'Пример 2'
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Генератор: ',
              props: { className: 'keyText' }
            },
            {
              tag: 'span',
              content: ' еда как персонаж'
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Фиксировано: ',
              props: { className: 'keyText' }
            },
            {
              tag: 'span',
              content: 'герой — еда'
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Меняем: ',
              props: { className: 'keyText' }
            },
            {
              tag: 'span',
              content: 'жизненные роли, среду, стиль'
            },
          ]
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'BrockDavis1.webp',
        alt: 'BrockDavis1',
        caption: [
          {
            tag: 'a',
            content: 'Brock Davis',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/laserbread' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'BrockDavis8.webp',
        alt: 'BrockDavis8',
        caption: [
          {
            tag: 'a',
            content: 'Brock Davis',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/laserbread' },
          },
        ],
      },
    },
    {
      type: 'title',
      title: 'Пример 3'
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Генератор: ',
              props: { className: 'keyText' }
            },
            {
              tag: 'span',
              content: 'праздники и существа'
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Фиксировано: ',
              props: { className: 'keyText' }
            },
            {
              tag: 'span',
              content: 'темы праздников'
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Меняем: ',
              props: { className: 'keyText' }
            },
            {
              tag: 'span',
              content: 'кто герой (осьминог, кактус, человек), что происходит'
            },
          ]
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'EdwardSteed1.webp',
        alt: 'EdwardSteed1',
        caption: [
          {
            tag: 'a',
            content: 'Edward Steed',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.newyorker.com/contributors/edward-steed' },
          },
        ],
      },
    },
    {
      type: 'title',
      title: 'Пример 4'
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Генератор: ',
              props: { className: 'keyText' }
            },
            {
              tag: 'span',
              content: 'овощи с человеческими чертами'
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Фиксировано: ',
              props: { className: 'keyText' }
            },
            {
              tag: 'span',
              content: 'персонажи — овощи'
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Меняем: ',
              props: { className: 'keyText' }
            },
            {
              tag: 'span',
              content: 'социальную роль, контекст, эмоции'
            },
          ]
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'IlyaKazakov10.webp',
        alt: 'IlyaKazakov10',
        caption: [
          {
            tag: 'a',
            content: 'Ilya Kazakov',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/ilyakazakov' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'IlyaKazakov9.webp',
        alt: 'IlyaKazakov9',
        caption: [
          {
            tag: 'a',
            content: 'Ilya Kazakov',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/ilyakazakov' },
          },
        ],
      },
    },
    {
      type: 'title',
      title: 'Пример 5'
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Генератор: ',
              props: { className: 'keyText' }
            },
            {
              tag: 'span',
              content: 'весна в разное время'
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Фиксировано: ',
              props: { className: 'keyText' }
            },
            {
              tag: 'span',
              content: 'идея — «приход весны»'
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Меняем: ',
              props: { className: 'keyText' }
            },
            {
              tag: 'span',
              content: 'время суток, месяц, температуру'
            },
          ]
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'DavidHockney1.webp',
        alt: 'DavidHockney1',
        caption: [
          {
            tag: 'a',
            content: 'David Hockney',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.hockney.com/works/digital/arrival-of-spring-woldgate' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'DavidHockney2.webp',
        alt: 'DavidHockney2',
        caption: [
          {
            tag: 'a',
            content: 'David Hockney',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.hockney.com/works/digital/arrival-of-spring-woldgate' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'DavidHockney3.webp',
        alt: 'DavidHockney3',
        caption: [
          {
            tag: 'a',
            content: 'David Hockney',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.hockney.com/works/digital/arrival-of-spring-woldgate' },
          },
        ],
      },
    },
    {
      type: 'title',
      title: 'Пример 6'
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Генератор: ',
              props: { className: 'keyText' }
            },
            {
              tag: 'span',
              content: 'животные с человеческими чертами'
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Фиксировано: ',
              props: { className: 'keyText' }
            },
            {
              tag: 'span',
              content: 'персонажи — животные'
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Меняем: ',
              props: { className: 'keyText' }
            },
            {
              tag: 'span',
              content: 'социальную роль, контекст, эмоции'
            },
          ]
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'SashaAnanas1.webp',
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
        id: 'SashaAnanas2.webp',
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
      type: 'image',
      imageData: {
        id: 'SashaAnanas3.webp',
        alt: 'SashaAnanas3',
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
      type: 'title',
      title: 'Пример 7'
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Генератор: ',
              props: { className: 'keyText' }
            },
            {
              tag: 'span',
              content: 'криминальная жизнь в бытовых условиях'
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Фиксировано: ',
              props: { className: 'keyText' }
            },
            {
              tag: 'span',
              content: 'настроение — тревога'
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Меняем: ',
              props: { className: 'keyText' }
            },
            {
              tag: 'span',
              content: 'антураж, детали, героев'
            },
          ]
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'ZhiyongJing2.webp',
        alt: 'ZhiyongJing2',
        caption: [
          {
            tag: 'a',
            content: 'Zhiyong Jing',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.jingzhiyong.com/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'ZhiyongJing5.webp',
        alt: 'ZhiyongJing5',
        caption: [
          {
            tag: 'a',
            content: 'Zhiyong Jing',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.jingzhiyong.com/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'ZhiyongJing6.webp',
        alt: 'ZhiyongJing6',
        caption: [
          {
            tag: 'a',
            content: 'Zhiyong Jing',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.jingzhiyong.com/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: 'Генератор сюжетов — это рабочий инструмент, а не творческий трюк. Он нужен, чтобы:'
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'избежать страха белого листа, когда не знаете, с чего начать;'
        },
        {
          tag: 'p',
          content: 'придумать серию, которая выглядит цельно, но не скучно;'
        },
        {
          tag: 'p',
          content: 'научиться работать с ограничением как с точкой роста — фиксируя один элемент, вы открываете свободу в остальном.'
        }
      ]
    }
  ]
}

const lessonDataFYS34: ILessonDataDB = {
  id: 'Practice_tIcrup',
  courseId: 'finding-your-style',
  title: 'Практика. Литературный сюжет',
  type: 'Practice',
  icon: {
    icon: '/png/3d_hands_7.png',
  },
  topic: 'Как сделана иллюстрация. Литературный сюжет',
  topicOrder: 3,
  topicIcon: 'Lesson',
  orderInTopic: 4,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
  isUnderDevelopment: false,
  content: [
    {
      type: 'text',
      text: 'В этом задании вы шаг за шагом придумаете идею для серии. Наша цель — не одна картинка, а серия работ, объединённых общей логикой или героем.'
    },
    {
      type: 'title',
      title: 'Шаг 1. Выберите, что вы фиксируете'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Чтобы запустить генератор, начните с одного устойчивого элемента.'
        },
        {
          tag: 'p',
          content: 'Выберите только один из вариантов ниже:'
        },
      ]
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'Герой, например, кот, робот, бабушка, осьминог'
        },
        {
          tag: 'p',
          content: 'Тема, например, страх, взросление, одиночество, сезон года'
        },
        {
          tag: 'p',
          content: 'Среда, например, общественный транспорт, спальня, дно океана'
        },
        {
          tag: 'p',
          content: 'Настроение, например, тревога, радость, абсурд, ностальгия'
        },
        {
          tag: 'p',
          content: 'Объект или пара объектов, например, «чайник и кактус», «рыба и велосипед»'
        }
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Запишите, что вы выбираете',
          props: { className: 'keyText' }
        }
      ]
    },
    {
      type: 'title',
      title: 'Шаг 2. Придумайте 5 сюжетных вариантов'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Теперь составьте 5 коротких описаний сцен, в которых сохраняется ваш фиксированный элемент, а остальное меняется.'
        },
        {
          tag: 'p',
          content: 'Пишите в духе: «Герой делает Х в ситуации Y».'
        },
        {
          tag: 'p',
          content: 'Пример:',
          props: { className: 'keyText' }
        },
        {
          tag: 'p',
          content: 'Если фиксируем героя — робот-почтальон:'
        },
      ]
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'Доставляет письма исчезающим домам'
        },
        {
          tag: 'p',
          content: 'Ошибается и влюбляется в ящик'
        },
        {
          tag: 'p',
          content: 'Работает в городе, где никто не умеет читать'
        },
      ]
    },
    {
      type: 'title',
      title: 'Шаг 3. Посмотрите на них как на серию'
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'Есть ли в этих сценах повторяющаяся логика?'
        },
        {
          tag: 'p',
          content: 'Хочется ли вам развить одну из идей в визуальный образ?'
        },
        {
          tag: 'p',
          content: 'Какая сцена кажется вам самой сильной — с неё можно будет начать эскизы.'
        }
      ]
    },
    {
      type: 'title',
      title: 'Шаг 4. Сформулируйте литературный сюжет вашей серии'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Сделайте одно предложение, в котором будет понятно:',
        }
      ]
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'Кто в ней герой или что объединяет сцены?'
        },
        {
          tag: 'p',
          content: 'Что с ним происходит?'
        },
        {
          tag: 'p',
          content: 'Какой характер у этой серии: ироничный, тревожный, нежный, абсурдный?'
        }
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Примеры',
          props: { className: 'keyText' }
        }
      ]
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'Все мои иллюстрации — про странные праздники, в которых участвуют морские существа.'
        },
        {
          tag: 'p',
          content: 'Это серия о том, как обычные предметы неожиданно обретают жизнь.'
        }
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Запишите ваш итоговый сюжет.',
          props: { className: 'keyText' }
        }
      ]
    },
    {
      type: 'title',
      title: 'Итог'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'По итогам упражнения у вас должен быть:',
        }
      ]
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'выбранный принцип генератора,'
        },
        {
          tag: 'p',
          content: '5 идей для сюжетов,'
        },
        {
          tag: 'p',
          content: 'и финальная формулировка вашего литературного сюжета для серии.'
        }
      ]
    },
    {
      type: 'text',
      text: 'Этот сюжет вы и будете реализовывать в иллюстрациях в рамках курса.'
    },
    {
      type: 'title',
      title: 'Как оформить результат'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: '1. Оформите ответы в Google Docs, Figma, Miro или любом удобном сервисе.',
        },
        {
          tag: 'p',
          content: '2. Включите доступ по ссылке на просмотр.',
        },
        {
          tag: 'p',
          content: '3. Прикрепите ссылку в задание модуля.',
        },
        {
          tag: 'p',
          content: '4. Проверьте, что доступ открыт — иначе преподаватель не сможет прочитать и дать обратную связь.',
        },
      ]
    },
  ]
}

const lessonDataFYS41: ILessonDataDB = {
  id: 'PlasticPlot_giToya',
  courseId: 'finding-your-style',
  title: 'Пластический сюжет',
  type: 'Theory',
  icon: {
    icon: '/png/3d_abstract_CubeWireframe.png',
  },
  topic: 'Пластический сюжет: как рисовать',
  topicOrder: 4,
  topicIcon: 'Lesson',
  orderInTopic: 1,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
  isUnderDevelopment: false,
  content: [
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Иллюстрация работает не только за счёт сюжета, но и благодаря тому, как она сделана. Цвет, форма, ритм, композиция, техника исполнения — всё это кирпичики, из которых складывается пластическая идея.'
        },
        {
          tag: 'p',
          content: 'Пластическая идея отвечает за интонацию и ощущение от работы. Иногда мы не можем сразу сформулировать сюжет, но чётко чувствуем: рисунок кажется тяжёлым, быстрым, уютным, тревожным, холодным. Это всё — результат работы пластической идеи.'
        },
        {
          tag: 'p',
          content: 'Пластическая идея — это язык иллюстрации. Она рассказывает, как именно подан сюжет. Если сюжет — это содержание, то пластическая идея — форма подачи. Как голос в аудиокниге или режиссура в кино.'
        }
      ]
    },
    {
      type: 'title',
      title: 'Из чего состоит пластическая идея'
    },
    {
      type: 'image',
      imageData: {
        id: 'RiccardoGuasco5.webp',
        alt: 'RiccardoGuasco5',
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
      text: 'Это может быть любая комбинация визуальных инструментов:'
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Цвет: ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'палитра, контрасты, насыщенность, температура.',
            }
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Форма: ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'силуэты, модульность, текучесть, угловатость.',
            }
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Композиция: ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'массы, ритмы, расположение, движение.',
            }
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Пространство: ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'ковровая плоскость, перспектива, ракурсы.',
            }
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Техника: ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'живопись, коллаж, графика, цифровая или ручная.',
            }
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Фактура: ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'гладкое, шероховатое, пустое, насыщенное.',
            }
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Темп и ритм: ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'быстрые линии, плотность штрихов, паузы.',
            }
          ]
        }
      ]
    },
    {
      type: 'text',
      text: 'Чем точнее художник осознаёт, какие средства он использует — тем увереннее иллюстрация.'
    },
    {
      type: 'title',
      title: 'Как применять это на практике'
    },
    {
      type: 'image',
      imageData: {
        id: 'MashaTitova1.webp',
        alt: 'MashaTitova1',
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
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Необязательно владеть всеми инструментами.'
        },
        {
          tag: 'p',
          content: 'Можно сосредоточиться на одном-двух и использовать их осознанно:'
        }
      ]
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'Кто-то работает только с формой, почти без цвета.'
        },
        {
          tag: 'p',
          content: 'Кто-то делает акцент на фактуре.'
        },
        {
          tag: 'p',
          content: 'Кто-то — на цветовых решениях и нюансах освещения.'
        }
      ]
    },
    {
      type: 'text',
      text: 'Ваша задача — выбрать, что вам интересно, и развивать это.'
    },
    {
      type: 'quote',
      quote: 'Пластическая идея — это ваш авторский голос. Чем точнее он сформулирован, тем узнаваемее и выразительнее ваша работа.'
    },
    {
      type: 'textImportant',
      text: [
        {
          tag: 'p',
          content: 'Пластическая идея — это то, как нарисована иллюстрация.'
        },
        {
          tag: 'p',
          content: 'Она складывается из цвета, формы, композиции, техники и других визуальных решений.'
        },
        {
          tag: 'p',
          content: 'Она формирует настроение, интонацию и эмоциональное впечатление.'
        },
        {
          tag: 'p',
          content: 'Не нужно владеть всем сразу. Найдите то, что вам интересно, и углубляйтесь.'
        },
        {
          tag: 'p',
          content: 'Пластическая идея делает вашу иллюстрацию уникальной даже при простом сюжете.'
        }
      ]
    }
  ]
}

const lessonDataFYS42: ILessonDataDB = {
  id: 'Shape_FrAbij',
  courseId: 'finding-your-style',
  title: 'Работа с формой: от референса к стилизации',
  type: 'Theory',
  icon: {
    icon: '/png/3d_abstract_Abstract3.png',
  },
  topic: 'Пластический сюжет: как рисовать',
  topicOrder: 4,
  topicIcon: 'Lesson',
  orderInTopic: 2,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
  isUnderDevelopment: false,
  content: [
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Форма — это один из первых и самых сильных выразительных инструментов в иллюстрации. Мы видим её до цвета, до сюжета, до фактуры. Именно форма создаёт первое впечатление, задаёт настроение и часто определяет, насколько выразительной будет работа.'
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Но что значит «работать с формой»? Это значит — не просто срисовывать, '
            },
            {
              tag: 'span',
              content: 'а осознанно стилизовать. ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'Искать тот способ изображения, который соответствует вашей идее.'
            }
          ]
        }
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'VictorMelamed1.webp',
        alt: 'VictorMelamed1',
        caption: [
          {
            tag: 'a',
            content: 'Victor Melamed',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/melamed' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: '1. Геометризация',
          props: { className: 'keyText'}
        },
        {
          tag: 'p',
          content: 'Фигура разбита на простые формы: круги, треугольники, прямоугольники. Такой приём помогает упростить и структурировать изображение, делая его конструктивным и понятным.',
        },
        {
          tag: 'p',
          content: '2. Силуэт',
          props: { className: 'keyText'}
        },
        {
          tag: 'p',
          content: 'Здесь главное — выразительный контур. Вся форма читается одним пятном. Такой подход делает изображение заметным и легко узнаваемым с первого взгляда.',
        },
        {
          tag: 'p',
          content: '3. Модульная логика',
          props: { className: 'keyText'}
        },
        {
          tag: 'p',
          content: 'Фигура собрана из повторяющихся элементов, как из конструктора. Этот приём задаёт ритм, делает форму «собранной» и организованной.',
        },
        {
          tag: 'p',
          content: '4. Контрформа',
          props: { className: 'keyText'}
        },
        {
          tag: 'p',
          content: 'Фокус смещён с фигуры на пространство вокруг неё. Например, треугольник между рукой и телом становится самостоятельным выразительным элементом.',
        },
        {
          tag: 'p',
          content: '5. Метафорическая стилизация',
          props: { className: 'keyText'}
        },
        {
          tag: 'p',
          content: 'Форма переосмыслена через метафору. Персонаж напоминает перевёрнутый самолёт — такой подход создаёт новый образ, усиливает впечатление.',
        }
      ]
    },
    {
      type: 'title',
      title: 'Геометризация'
    },
    {
      type: 'image',
      imageData: {
        id: 'RiccardoGuasco1.webp',
        alt: 'RiccardoGuasco1',
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
          content: [
            {
              tag: 'span',
              content: 'Что это: ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'разбиение сложной формы на простые геометрические элементы: круги, квадраты, треугольники.',
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Что даёт: ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'конструктивность, чёткость, логичность. Такая форма легко читается и запоминается.',
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Пример: ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'фигура построена из овалов и прямоугольников, напоминает героев Малевича или персонажей в изометрии.',
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Антипример: ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'фигура срисована с фотографии, формы повторяют реальность, но не работают как единое целое. Нет стилизации — нет выразительности.',
            },
          ]
        }
      ]
    },
    {
      type: 'title',
      title: 'Поиск выразительного силуэта'
    },
    {
      type: 'image',
      imageData: {
        id: 'NADIIAZHELIEZNOVA1.jpeg',
        alt: 'NADIIAZHELIEZNOVA1',
        caption: [
          {
            tag: 'a',
            content: 'Nadiia Zhelieznova',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/zhelieznova' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Что это: ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'обобщение формы до одного силуэта, который будет узнаваем даже без деталей.',
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Что даёт: ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'узнаваемость, быстроту считывания. Особенно важно для книжной и журнальной иллюстрации, когда у зрителя мало времени.',
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Пример: ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'силуэт с активными углами или характерным изгибом, например, как у персонажей Тима Бартона.',
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Антипример: ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'слишком мелкие детали в силуэте, нечёткие края, «плюшевый» контур — такой силуэт расплывается, не держит внимание.',
            },
          ]
        }
      ]
    },
    {
      type: 'title',
      title: 'Логика конструктора или модуля'
    },
    {
      type: 'image',
      imageData: {
        id: 'CharleyHarper8.webp',
        alt: 'CharleyHarper8',
        caption: [
          {
            tag: 'a',
            content: 'Charley Harper',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/charleyharperart/?hl=en' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Что это: ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'форма собирается из повторяющихся элементов. У каждого объекта — одна логика сборки.',
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Что даёт: ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'ритм, ощущение упорядоченности, интерес в деталях.',
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Пример: ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'персонаж собран из «лепестков», каждый новый образ — вариация на один модуль. Как у Riccardo Guasco или Charley Harper.',
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Антипример: ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'детали не поддерживают друг друга, форма «разваливается», ощущается случайной.',
            },
          ]
        }
      ]
    },
    {
      type: 'title',
      title: 'Работа с контрформой'
    },
    {
      type: 'image',
      imageData: {
        id: 'escher2.webp',
        alt: 'escher2',
        caption: [
          {
            tag: 'a',
            content: 'M.C. Escher',
            props: { className: 's-hoverable', target: "_blank", to: 'https://mcescher.com/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Что это: ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'фокус не на самой фигуре, а на пространстве вокруг неё — между руками, ногами, предметами.',
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Что даёт: ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'воздух, лёгкость, графическую выразительность. Контрформа — отличный способ управлять вниманием.',
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Пример: ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'между рукой и телом — чёткий треугольник. Он создаёт ритм и усиливает позу.',
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Антипример: ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'все элементы слиплись в одно пятно, между ними нет воздуха, нет направлений. Форма кажется тяжёлой и неразборчивой.',
            },
          ]
        }
      ]
    },
    {
      type: 'title',
      title: 'Метафорическая стилизация'
    },
    {
      type: 'image',
      imageData: {
        id: 'NadiiaZhelieznova6.webp',
        alt: 'NadiiaZhelieznova6',
        caption: [
          {
            tag: 'a',
            content: 'Nadiia Zhelieznova',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/zhelieznova' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Что это: ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'фигура стилизуется не по форме, а по смыслу или образу. Иллюстратор видит в герое дерево, рыбу, самолёт — и рисует его так.',
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Что даёт: ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'авторское высказывание, настроение, глубину.',
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Пример: ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'персонаж — как кактус. И не только внешне: поза, форма, линия — всё подчёркивает его колючесть.',
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Антипример: ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'Антипример: случайное превращение — персонаж стал вертолётом, но почему — неясно. Нет связи между формой и идеей.',
            },
          ]
        }
      ]
    },
    {
      type: 'title',
      title: 'Как выбрать подход'
    },
    {
      type: 'text',
      text: 'Если вы только начинаете, попробуйте один референс и сделайте из него 3–4 разных стилизации. Например:'
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'геометрическая,'
        },
        {
          tag: 'p',
          content: 'силуэтная,'
        },
        {
          tag: 'p',
          content: 'модульная,'
        },
        {
          tag: 'p',
          content: 'метафорическая.'
        },
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Сравните: как меняется настроение? Что ближе вам? Где вы чувствуете интерес?'
        },
        {
          tag: 'p',
          content: 'Каждый из этих путей — возможность выразить идею. Но важно не просто «украсить» форму, а сделать её осмысленной. Форма работает, когда она работает на смысл.'
        }
      ]
    },
    {
      type: 'textImportant',
      text: [
        {
          tag: 'p',
          content: 'Форма — один из главных выразительных инструментов. Именно она создаёт первое впечатление.'
        },
        {
          tag: 'p',
          content: 'Один и тот же референс можно стилизовать десятками способов.'
        },
        {
          tag: 'p',
          content: 'Основные подходы: геометризация, силуэт, модуль, контрформа, метафора.'
        },
        {
          tag: 'p',
          content: 'Форма работает тогда, когда помогает донести вашу идею. Не украсьте — а выразите.'
        },
        {
          tag: 'p',
          content: 'Начинайте с малого: выберите одну стратегию и попробуйте применить её к нескольким рисункам. Затем сравните эффект.'
        }
      ]
    }
  ]
}

const lessonDataFYS43: ILessonDataDB = {
  id: 'Contrast_bResPA',
  courseId: 'finding-your-style',
  title: 'Контраст: как выделить главное',
  type: 'Theory',
  icon: {
    icon: '/png/3d_hands_2.png',
  },
  topic: 'Пластический сюжет: как рисовать',
  topicOrder: 4,
  topicIcon: 'Lesson',
  orderInTopic: 3,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
  isUnderDevelopment: false,
  content: [
    {
      type: 'text',
      text: 'Разница - это средство выразительности. Она помогает выделить главное, организовать композицию, усилить эмоциональное воздействие. Если разница велика - это контраст. Если мала - нюанс. Когда мы подчеркиваем разницу - размеров, форм, яркости, чего угодно - мы делаем рисунок более выразительным.'
    },
    {
      type: 'title',
      title: 'Что такое контраст'
    },
    {
      type: 'image',
      imageData: {
        id: 'ArinaSerebriakova2.webp',
        alt: 'ArinaSerebriakova2',
        caption: [
          {
            tag: 'a',
            content: 'Arina Serebriakova',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/ri.silver/?g=5' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Контраст — это '
        },
        {
          tag: 'span',
          content: 'большая разница между элементами на листе. ',
          props: { className: 'keyText'}
        },
        {
          tag: 'span',
          content: 'Он может проявляться в:'
        },
      ]
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'светлоте: светлое и тёмное,'
        },
        {
          tag: 'p',
          content: 'цвете: насыщенное и блеклое,'
        },
        {
          tag: 'p',
          content: 'форме: острое и округлое,'
        },
        {
          tag: 'p',
          content: 'фактуре: гладкое и шероховатое,'
        },
        {
          tag: 'p',
          content: 'размере: большое и маленькое,'
        },
        {
          tag: 'p',
          content: 'линии: толстая и тонкая,'
        },
        {
          tag: 'p',
          content: 'плотности: пустое и заполненное пространство,'
        },
        {
          tag: 'p',
          content: 'технике: жесткое и мягкое, пятно и линия.'
        }
      ]
    },
    {
      type: 'text',
      text: 'С помощью контраста можно направить внимание зрителя, выделить главное в листе, разделить планы, объединить персонажей.'
    },
    {
      type: 'title',
      title: 'Что такое нюанс'
    },
    {
      type: 'image',
      imageData: {
        id: 'AndrewGraves1.webp',
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
      type: 'text',
      text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Нюанс — это '
            },
            {
              tag: 'span',
              content: 'тонкая, почти незаметная разница. ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'В рисунке нюансы проявляются в оттенках цвета, в ритмах, в фактуре. Это не инструмент “в лоб”, но именно нюансы наполняют рисунок глубиной, делают его сложным, деликатным, медитативным.'
            },
          ]
        },
        {
          tag: 'p',
          content: 'Например, в работе Andrew Graves  тоновые различия минимальны, но они создают атмосферу тишины, мягкости, лёгкой грусти.'
        },
      ]
    },
    {
      type: 'title',
      title: 'Что такое акцент'
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
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/yantarem/?hl=en' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Акцент — это '
            },
            {
              tag: 'span',
              content: 'самая сильная разница ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'в изображении. Это точка, в которую вы хотите притянуть внимание зрителя. Акцент всегда один, и он работает именно потому, что контрастен остальной части рисунка.'
            },
          ]
        },
        {
          tag: 'p',
          content: 'Например, в работе Натальи паучок сделан линейно — это и есть акцент. Всё остальное работает как фон, на его фоне эта деталь буквально "вспыхивает".'
        },
      ]
    },
    {
      type: 'title',
      title: 'Как создавать контраст'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Контраст времени',
          props: { className: 'keyText'}
        },
        {
          tag: 'p',
          content: 'Главное можно выделить с помощью временных ограничений. На рисунке ниже я за 5 минут нарисовала задний план: деревья, электрический столб. А затем 15 минут аккуратно рисовала забор: много-много точных параллельных линий. В итоге забор читается другим слоем, явно отличится от заднего плана.',
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
          content: 'Контраст толщины линии',
          props: { className: 'keyText'}
        },
        {
          tag: 'p',
          content: 'Главное можно выделить с помощью разницы в толщине линии. Толстая линия задаёт форму, тонкая — показывает детали.',
        },
      ]
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
          content: 'Контраст задач в рисунке',
          props: { className: 'keyText'}
        },
        {
          tag: 'p',
          content: 'Главное можно выделить с помощью различия в задачах, которые решают линии. Толстая линия — силуэт, тонкая линия — фактура, форма.',
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
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/e.feklistova/' },
          },
        ],
      },
    },
    {
      type: 'title',
      title: 'Как использовать контраст в работе'
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'Прежде чем рисовать, решите: где вы хотите, чтобы зритель задержал взгляд?'
        },
        {
          tag: 'p',
          content: 'Создайте контраст в этом месте.'
        },
        {
          tag: 'p',
          content: 'Не переборщите: если всё контрастно, ничего не будет главным.'
        },
        {
          tag: 'p',
          content: 'Добавьте нюансы — они обогатят изображение.'
        },
        {
          tag: 'p',
          content: 'Найдите один акцент — он станет эмоциональной точкой входа.'
        }
      ]
    },
    {
      type: 'textImportant',
      text: [
        {
          tag: 'p',
          content: 'Контраст — это большая разница. Он усиливает выразительность, структурирует рисунок, привлекает внимание.'
        },
        {
          tag: 'p',
          content: 'Нюанс — это едва уловимая разница. Он добавляет глубину и сложность.'
        },
        {
          tag: 'p',
          content: 'Акцент — самый сильный контраст. Он должен быть один и работать как фокус.'
        },
        {
          tag: 'p',
          content: 'Контраст можно создавать через цвет, светлоту, размер, ритм, технику, фактуру, время, линию и многое другое.'
        }
      ]
    }
  ]
}

const lessonDataFYS44: ILessonDataDB = {
  id: 'Composition_hIxEkI',
  courseId: 'finding-your-style',
  title: 'Композиция',
  type: 'Theory',
  icon: {
    icon: '/png/3d_abstract_Emitter.png',
  },
  topic: 'Пластический сюжет: как рисовать',
  topicOrder: 4,
  topicIcon: 'Lesson',
  orderInTopic: 4,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
  isUnderDevelopment: false,
  content: [
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Композиция — это то, как вы собираете элементы на листе, как они взаимодействуют между собой и с пустым пространством. Это архитектура вашей иллюстрации, её основа. Даже если рисунок спонтанный или хаотичный, он всё равно строится на композиционных решениях — осознанных или интуитивных.'
        },
        {
          tag: 'p',
          content: 'Зачем нужна композиция',
          props: { className: 'keyText'}
        }
      ]
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'Помогает выделить главное в изображении'
        },
        {
          tag: 'p',
          content: 'Создаёт движение, напряжение или покой'
        },
        {
          tag: 'p',
          content: 'Помогает управлять вниманием зрителя'
        },
        {
          tag: 'p',
          content: 'Формирует ритм, плотность, интонацию'
        },
        {
          tag: 'p',
          content: 'Делает рисунок читаемым и выразительным'
        },
      ]
    },
    {
      type: 'title',
      title: 'Композиция — это взаимодействие масс'
    },
    {
      type: 'image',
      imageData: {
        id: 'NadiiaZhelieznova5.png',
        alt: 'NadiiaZhelieznova5',
        caption: [
          {
            tag: 'a',
            content: 'Nadiia Zhelieznova',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/zhelieznova' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: 'Представьте, что вы расставляете мебель в комнате:'
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Стол, диван, кресло — это '
            },
            {
              tag: 'span',
              content: 'массы.',
              props: { className: 'keyText'}
            }
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Расстановка, расстояния между ними, их размер и форма — это '
            },
            {
              tag: 'span',
              content: 'композиция.',
              props: { className: 'keyText'}
            }
          ]
        }
      ]
    },
    {
      type: 'text',
      text: 'На листе всё работает так же. Массы — это строительный материал. Композиция — это способ сложить из них гармоничное (или нарочно дисгармоничное) целое.'
    },
    {
      type: 'title',
      title: 'Что такое масса'
    },
    {
      type: 'image',
      imageData: {
        id: 'MashaShishova6.webp',
        alt: 'MashaShishova6',
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
          content: [
            {
              tag: 'span',
              content: 'Масса — это '
            },
            {
              tag: 'span',
              content: 'заполненная область на листе, ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'которая воспринимается как одно пятно. Не важно, один это объект или несколько — главное, что зритель считывает это как '
            },
            {
              tag: 'span',
              content: 'единое целое.',
              props: { className: 'keyText'}
            },
          ]
        },
        {
          tag: 'p',
          content: 'Масса может быть:'
        }
      ]
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'одним объектом,'
        },
        {
          tag: 'p',
          content: 'группой объектов,'
        },
        {
          tag: 'p',
          content: 'частью объекта.'
        },
      ]
    },
    {
      type: 'title',
      title: 'Масса — один объект'
    },
    {
      type: 'image',
      imageData: {
        id: 'MashaShishova9.webp',
        alt: 'MashaShishova9',
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
      text: 'Масса может равняться одному объекту. У Masha Shishova: фигура девушки — одна масса.'
    },
    {
      type: 'title',
      title: 'Масса — несколько объектов'
    },
    {
      type: 'image',
      imageData: {
        id: 'StasyaSokolovskaya1.webp',
        alt: 'StasyaSokolovskaya1',
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
      text: 'Масса может состоять из нескольких объектов. У Stasya Sokolovskaya: группа предметов — одна масса благодаря общему цвету и светлоте.'
    },
    {
      type: 'title',
      title: 'Масса — часть объекта'
    },
    {
      type: 'image',
      imageData: {
        id: 'АлександрДейнека1.webp',
        alt: 'АлександрДейнека1',
        caption: [
          {
            tag: 'a',
            content: 'Александр Дейнека',
          },
        ],
      },
    },
    {
      type: 'text',
      text: 'Масса может быть частью объекта. У Дейнеки: купальник читается как отдельная масса, хотя это часть тела.'
    },
    {
      type: 'title',
      title: 'Масса или фигуратив'
    },
    {
      type: 'image',
      imageData: {
        id: 'MashaShishova8.webp',
        alt: 'MashaShishova8',
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
      text: 'Масса — это абстрактное пятно. Фигуратив — это изображённый объект (например, дерево, человек, предмет). Иллюстратор может:'
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'либо подчинить массу объекту — фигура = масса,'
        },
        {
          tag: 'p',
          content: 'либо вписать объект в абстрактную форму и разрушить узнаваемость.'
        }
      ]
    },
    {
      type: 'text',
      text: 'Это создаёт интересные возможности для стилизации, ритма и работы с пространством.'
    },
    {
      type: 'title',
      title: 'Как тренировать композицию'
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'Ставьте себе ограничения: рисовать на квадратном, вытянутом формате, с одной большой массой, с симметрией или без неё.'
        },
        {
          tag: 'p',
          content: 'Смотрите, как устроены работы других художников. Обводите массы на кальке или в Procreate.'
        },
        {
          tag: 'p',
          content: 'Разбирайте, какие массы притягивают взгляд, какие — создают фон, а какие — «молчат».'
        }
      ]
    },
    {
      type: 'textImportant',
      text: [
        {
          tag: 'p',
          content: 'Композиция — это то, как вы собираете изображение на листе.'
        },
        {
          tag: 'p',
          content: 'Масса — это единица композиции. Масса может быть объектом, группой или пятном.'
        },
        {
          tag: 'p',
          content: 'Композиция = взаимодействие масс. Важно их расположение, размер, форма и воздух между ними.'
        },
        {
          tag: 'p',
          content: 'Массы могут быть конкретными или абстрактными — и в том, и в другом случае они управляют вниманием.'
        },
        {
          tag: 'p',
          content: 'Композиция влияет на настроение, читаемость и выразительность работы.'
        },
        {
          tag: 'p',
          content: 'Композицию можно тренировать — с помощью наблюдения, ограничений и разборов.'
        }
      ]
    }
  ]
}

const lessonDataFYS45: ILessonDataDB = {
  id: 'Connections_SPUjor',
  courseId: 'finding-your-style',
  title: 'Как массы взаимодействуют друг с другом',
  type: 'Theory',
  icon: {
    icon: '/png/3d_hands_11.png',
  },
  topic: 'Пластический сюжет: как рисовать',
  topicOrder: 4,
  topicIcon: 'Lesson',
  orderInTopic: 5,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
  isUnderDevelopment: false,
  content: [
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'После того как мы разобрались, что такое масса и как она формирует композицию, важно научиться видеть отношения между массами. Ведь именно эти отношения управляют вниманием зрителя, создают ритм, иерархию и настроение в иллюстрации.'
        },
        {
          tag: 'p',
          content: 'В этом уроке вы узнаете:'
        }
      ]
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'как размер масс влияет на восприятие,'
        },
        {
          tag: 'p',
          content: 'как работают форма и направление,'
        },
        {
          tag: 'p',
          content: 'как создаётся ритм через повторения,'
        },
        {
          tag: 'p',
          content: 'какую роль играет пустота.'
        }
      ]
    },
    {
      type: 'title',
      title: 'Размер и иерархия'
    },
    {
      type: 'image',
      imageData: {
        id: 'NadiiaZhelieznova9.webp',
        alt: 'adiiaZhelieznova9',
        caption: [
          {
            tag: 'a',
            content: 'Nadiia Zhelieznova',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/zhelieznova' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Масса на листе воспринимается не сама по себе, а в сравнении с другими массами, пустым пространством и границами листа. Один и тот же объект может казаться огромным или крошечным — всё зависит от окружения.'
        },
        {
          tag: 'p',
          content: 'Композиция работает за счёт соотношений. Именно они создают визуальную иерархию: порядок, в котором глаз зрителя считывает изображение.'
        },
        {
          tag: 'p',
          content: 'Как работает размер массы:'
        }
      ]
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Одна большая масса ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: '— создаёт устойчивую, собранную композицию.',
            }
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Несколько больших масс ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: '— могут конкурировать за внимание, создавать напряжение.',
            }
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Много маленьких масс ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'дают ощущение ритма или «шума», но без фокуса могут рассыпать восприятие.',
            }
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Контраст размеров ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: '— помогает выстроить иерархию: сначала главное, потом второстепенное.',
            }
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Массы примерно одного размера ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: '— визуально уравновешивают друг друга, но лишают композицию акцента.',
            }
          ]
        }
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Например, в иллюстрации Nadiia Zhelieznova композиция построена на крупной оранжевой массе, которая занимает весь лист. Внутри этой массы работает '
            },
            {
              tag: 'span',
              content: 'иерархия деталей.',
              props: { className: 'keyText'}
            },
          ]
        },
        {
          tag: 'p',
          content: 'Морда зверя — главный визуальный акцент. Она выделяется:'
        }
      ]
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'тоном — самый контрастный участок рисунка,'
        },
        {
          tag: 'p',
          content: 'цветом — яркая тёплая область, обрамлённая темными пятнами,'
        },
        {
          tag: 'p',
          content: 'детализацией — проработаны глаза, зубы.'
        }
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Маленький белый персонаж внутри зверя — тоже заметен, но он скорее служит смысловым акцентом, дополняющим рассказ.'
        },
        {
          tag: 'p',
          content: 'Глаз зрителя сначала цепляется за большую форму, затем концентрируется на морде, а потом начинает исследовать второстепенные детали.'
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Этот пример показывает, как '
            },
            {
              tag: 'span',
              content: 'размер массы ',
              props: {className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'определяет структуру, а '
            },
            {
              tag: 'span',
              content: 'внутренние контрасты ',
              props: {className: 'keyText'}
            },
            {
              tag: 'span',
              content: '— формируют точку фокуса.'
            },
          ]
        }
      ]
    },
    {
      type: 'title',
      title: 'Форма и направление'
    },
    {
      type: 'image',
      imageData: {
        id: 'LorenzoMattotti2.webp',
        alt: 'LorenzoMattotti2',
        caption: [
          {
            tag: 'a',
            content: 'Lorenzo Mattotti',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.mattotti.com/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Массы в композиции бывают разной формы — круглые, угловатые, вытянутые, острые. Каждая из них несёт своё '
        },
        {
          tag: 'span',
          content: 'настроение:',
          props: { className: 'keyText'}
        }
      ]
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'округлая форма — мягкость, плавность, безопасность,'
        },
        {
          tag: 'p',
          content: 'угловатая — острота, напряжение, конфликт,'
        },
        {
          tag: 'p',
          content: 'вытянутая — грациозность, динамика,'
        },
        {
          tag: 'p',
          content: 'сжатая или асимметричная — неловкость, дискомфорт.'
        }
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Но особенно важно — '
            },
            {
              tag: 'span',
              content: 'в каком направлении работает масса. ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'Именно направление ведёт взгляд зрителя по листу и задаёт движение композиции.'
            },
          ]
        },
        {
          tag: 'p',
          content: 'Основные направления:'
        }
      ]
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Горизонталь ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: ' — ощущение покоя, устойчивости, широты.'
            }
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Вертикаль',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: ' — статичность, напряжение, строгость'
            }
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Диагональ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: ' — энергия, тревожность, активность, движение.'
            }
          ]
        }
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Например, в иллюстрации Lorenzo Mattotti на переднем плане — одна вытянутая вертикальная масса: фигуры героев объединены в общее пятно. Эта масса стройная, устремлённая вверх, создаёт ощущение устойчивости и сосредоточенности.'
        },
        {
          tag: 'p',
          content: 'Фон построен на повторяющихся вертикалях деревьев, которые усиливают ощущение покоя и глубины.'
        },
        {
          tag: 'p',
          content: 'А вот диагональные красные плоскости, ведущие в перспективу, придают сцене движение и драматизм, словно сжимают композицию к центру.'
        },
        {
          tag: 'p',
          content: 'Таким образом, взаимодействие вертикалей и диагоналей формирует напряжённую, но уравновешенную композицию.'
        }
      ]
    },
    {
      type: 'title',
      title: 'Ритм и повторение'
    },
    {
      type: 'image',
      imageData: {
        id: 'BenShahn1.webp',
        alt: 'BenShahn1',
        caption: [
          {
            tag: 'a',
            content: 'Ben Shahn',
            props: { className: 's-hoverable', target: "_blank", to: 'https://en.wikipedia.org/wiki/Ben_Shahn' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Когда массы в иллюстрации '
            },
            {
              tag: 'span',
              content: 'повторяются,',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: ' они создают ритм. Это могут быть повторы форм, направлений, размеров, цветов, светлот или даже пауз между элементами.'
            },
          ]
        },
        {
          tag: 'p',
          content: 'Повтор может быть:'
        }
      ]
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'однородным',
              props: { className: 'keyText' }
            },
            {
              tag: 'span',
              content: ' — когда повторяется одна и та же форма, например, круги или линии,',
            }
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'разнородным',
              props: { className: 'keyText' }
            },
            {
              tag: 'span',
              content: ' — когда сочетаются несколько типов элементов, например, прямоугольники + линии + цветовые пятна,',
            }
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'идентичным',
              props: { className: 'keyText' }
            },
            {
              tag: 'span',
              content: ' — элементы абсолютно одинаковы,',
            }
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'вариативным',
              props: { className: 'keyText' }
            },
            {
              tag: 'span',
              content: ' — элементы схожи, но каждый немного отличается.',
            }
          ]
        }
      ]
    },
    {
      type: 'text',
      text: 'Задачи, которые можно решить с помощью ритма:'
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'задать основу, структуру иллюстрации,'
        },
        {
          tag: 'p',
          content: 'управлять скоростью восприятия — ускорять или замедлять движение взгляда по изображению,'
        },
        {
          tag: 'p',
          content: 'задать движение, динамику в рисунке.'
        }
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'На иллюстрации Ben Shahn мы видим ряды пустых продуктовых корзин. Все они похожи — прямоугольная форма, решётка, ножки. Но ни одна не повторяет другую дословно: одна наклонена, другая деформирована, линии идут под разными углами.'
        },
        {
          tag: 'p',
          content: 'Это живой ритм, который делает композицию пластичной и дышащей. Повторение не механическое — в нём есть вариативность.'
        }
      ]
    },
    {
      type: 'title',
      title: 'Взаимодействие с пустотой'
    },
    {
      type: 'image',
      imageData: {
        id: 'NadiiaZhelieznova10.webp',
        alt: 'NadiiaZhelieznova10',
        caption: [
          {
            tag: 'a',
            content: 'Nadiia Zhelieznova',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/zhelieznova' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: 'Пустота в листе — это активная часть композиции. Она:'
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'создаёт '
            },
            {
              tag: 'span',
              content: 'паузы и дыхание ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'между объектами,'
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'помогает '
            },
            {
              tag: 'span',
              content: 'структурировать пространство,',
              props: { className: 'keyText'}
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'делает изображение '
            },
            {
              tag: 'span',
              content: 'читаемым и выразительным,',
              props: { className: 'keyText'}
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'помогает '
            },
            {
              tag: 'span',
              content: 'подчеркнуть форму ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: '— через контур, вырез, силуэт.'
            },
          ]
        }
      ]
    },
    {
      type: 'text',
      text: 'Например, в иллюстрации Nadiia Zhelieznova практически нет пустоты. Пространство сжато, формы сплетены друг с другом. Такое решение работает на содержание:'
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'Иллюстрация выглядит тревожно и напряжённо.'
        },
        {
          tag: 'p',
          content: 'Композиция становится плотной и замкнутой, словно пространство схлопывается.'
        }
      ]
    },
    {
      type: 'text',
      text: 'Даже те участки, где остаётся светлая бумага, — это не воздух, а вырезанные щели, через которые с трудом «дышит» изображение.'
    },
    {
      type: 'textImportant',
      text: [
        {
          tag: 'p',
          content: 'Размер массы задаёт её визуальный вес и иерархию.'
        },
        {
          tag: 'p',
          content: 'Форма и направление определяют настроение и движение взгляда.'
        },
        {
          tag: 'p',
          content: 'Ритм рождается в повторении — и оживает через вариативность.'
        },
        {
          tag: 'p',
          content: 'Пустота может структурировать композицию — или подчеркнуть её сжатость.'
        },
        {
          tag: 'p',
          content: 'Композиция — это взаимодействие масс. А значит, главное — не просто формы, а отношения между ними.'
        }
      ]
    }
  ]
}

const lessonDataFYS46: ILessonDataDB = {
  id: 'HowToPaint_zoJosp',
  courseId: 'finding-your-style',
  title: 'Как развивать визуальное мышление',
  type: 'Theory',
  icon: {
    icon: '/png/3d_abstract_HexagonalSphere.png',
  },
  topic: 'Пластический сюжет: как рисовать',
  topicOrder: 4,
  topicIcon: 'Lesson',
  orderInTopic: 6,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
  isUnderDevelopment: false,
  content: [
    {
      type: 'title',
      title:'Смотреть много и разное'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Чем шире кругозор, тем богаче наш внутренний визуальный словарь.'
        },
        {
          tag: 'p',
          content: 'Что смотреть:'
        }
      ]
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'Иллюстраторов, работающих в похожей технике — чтобы найти нюансы, близкие вам.'
        },
        {
          tag: 'p',
          content: 'Художников, работающих непохоже — чтобы расширять границы.'
        },
        {
          tag: 'p',
          content: 'Дизайнеров, керамистов, скульпторов — чтобы найти неочевидные решения.'
        }
      ]
    },
    {
      type: 'title',
      title: 'Анализировать работы, которые вызывают эмоции'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Если работа вас зацепила — это сигнал. Даже если эмоция неприятная — важно понять, '
            },
            {
              tag: 'span',
              content: 'почему ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'вы отреагировали.'
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Цель иллюстрации — '
            },
            {
              tag: 'span',
              content: 'вызвать отклик. ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'И чтобы самому уметь его создавать, важно понимать, как это работает у других.'
            },
          ]
        }
      ]
    },
    {
      type: 'title',
      title: 'Учиться конкретным инструментам'
    },
    {
      type: 'text',
      text: 'Не бойтесь повторять. Короткие мастер-классы и лекции — отличный способ заглянуть в процесс. Особенно полезны курсы по конкретным приёмам: линогравюра, коллаж с акварелью, цветной карандаш. Или курсы по композиции, серийности, работе с текстом.'
    },
    {
      type: 'textImportant',
      text: [
        {
          tag: 'p',
          content: 'Насмотренность делает язык иллюстратора богаче и выразительнее.'
        },
        {
          tag: 'p',
          content: 'Анализ эмоций учит понимать, что работает и почему.'
        },
        {
          tag: 'p',
          content: 'Обучение у практиков даёт конкретные инструменты.'
        },
        {
          tag: 'p',
          content: 'Смотреть, думать, учиться — три простых действия, которые ведут к сильной авторской позиции.'
        }
      ]
    }
  ]
}

const lessonDataFYS47: ILessonDataDB = {
  id: 'Practice_vEchiT',
  courseId: 'finding-your-style',
  title: 'Практика. Пластический сюжет',
  type: 'Practice',
  icon: {
    icon: '/png/3d_hands_7.png',
  },
  topic: 'Пластический сюжет: как рисовать',
  topicOrder: 4,
  topicIcon: 'Lesson',
  orderInTopic: 7,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
  isUnderDevelopment: false,
  content: [
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'В этом упражнении вы шаг за шагом создадите пластическую концепцию серии — то, как серия будет выглядеть визуально: какой в ней будет цвет, ритм, форма, композиция.'
        },
        {
          tag: 'p',
          content: 'Наша цель — не просто красивая картинка, а цельная серия иллюстраций, в которой повторяются выразительные приёмы.'
        },
      ]
    },
    {
      type: 'title',
      title: 'Шаг 1. Выберите основу пластического сюжета'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Чтобы серия получилась собранной, начните с одного или двух '
            },
            {
              tag: 'span',
              content: 'средств выразительности, ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'которые будут повторяться от картинки к картинке.'
            },
          ]
        },
        {
          tag: 'p',
          content: 'Выберите только 1–2 из списка:'
        }
      ]
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Цветовая палитра, ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'например: много индиго и голубого, немного розового; главное — всегда розовое'
            }
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Модульность, ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'например, все формы состоят из капель и треугольников'
            }
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Композиция, ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'например: пустота всегда вверху, объекты — внизу'
            }
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Форма, ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'например: все фигуры округлые, нет острых углов'
            }
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Ритм и повторы, ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'например: повторяющиеся элементы — окна, пятна, направления'
            }
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Фактура или материал, ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'например: всё выглядит как вырезанное из ткани'
            }
          ]
        }
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Запишите, что вы фиксируете',
          props: { className: 'keyText'}
        },
        {
          tag: 'p',
          content: 'Подумайте, как выбранные приёмы помогут передать настроение серии: тревожность, абсурд, нежность, строгость.'
        }
      ]
    },
    {
      type: 'title',
      title: 'Шаг 2. Выберите, что будет меняться'
    },
    {
      type: 'text',
      text: 'Чтобы серия не стала монотонной, добавьте переменную часть. Это может быть:'
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
           content: 'Герои'
        },
        {
          tag: 'p',
           content: 'Обстановка'
        },
        {
          tag: 'p',
           content: 'Сюжет'
        },
        {
          tag: 'p',
           content: 'Поза персонажа'
        },
        {
          tag: 'p',
           content: 'Мелкие детали'
        }
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Опишите, '
            },
            {
              tag: 'span',
              content: 'что будет меняться от картинки к картинке',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: ' — это и создаст ощущение развития.'
            },
          ]
        }
      ]
    },
    {
      type: 'title',
      title: 'Шаг 3. Проверьте выразительность и цельность'
    },
    {
      type: 'text',
      text: 'Посмотрите на выбранные вами приёмы:'
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'Будет ли эта серия узнаваемой?'
        },
        {
          tag: 'p',
          content: 'Будет ли она живой — за счёт того, что меняется?'
        },
        {
          tag: 'p',
          content: 'Помогают ли выбранные выразительные средства передать характер серии?'
        },
      ]
    },
    {
      type: 'text',
      text: 'Если сомневаетесь — сократите инструменты. Лучше одно выразительное решение, чем три случайных.'
    },
     {
      type: 'title',
      title: 'Шаг 4. Сформулируйте пластическую идею серии'
     },
     {
      type: 'text',
      text: 'Сделайте 1–2 предложения, в которых будет ясно:'
     },
     {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Что объединяет ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'серию визуально?'
            }
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Что в ней меняется?',
              props: { className: 'keyText'}
            }
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Какой '
            },
            {
              tag: 'span',
              content: 'характер ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'у рисунков: спокойный, шумный, плотный, воздушный?'
            }
          ]
        }
      ]
     },
     {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Примеры:',
          props: { className: 'keyText'}
        }
      ]
     },
     {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'В этой серии всегда один и тот же модуль — каплевидная форма, из неё я собираю разных существ.'
        },
        {
          tag: 'p',
          content: 'Цветовая палитра ограничена: всё в зелёных и чёрных пятнах, с одним ярким акцентом.'
        },
        {
          tag: 'p',
          content: 'Все сцены сделаны как плотная сетка из мелких объектов, в которой глаз теряется — хочется передать ощущение перегруженности.'
        }
      ]
     },
     {
      type: 'title',
      title: 'Итог'
     },
     {
      type: 'text',
      text: 'По результатам у вас должно быть:'
     },
     {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: '1–2 фиксированных выразительных средства,',
          props: { className: 'keyText'}
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'понимание, '
            },
            {
              tag: 'span',
              content: 'что будет меняться ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'в серии,'
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'сформулированная '
            },
            {
              tag: 'span',
              content: 'пластическая идея вашей серии.',
              props: { className: 'keyText'}
            },
          ]
        }
      ]
    },
    {
      type: 'text',
      text: 'Эта идея поможет вам в следующих заданиях, когда вы будете делать эскизы и финальные работы.'
    },
    {
      type: 'title',
      title: 'Как оформить результат'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: '1. формите ответы в '
            },
            {
              tag: 'span',
              content: 'Google Docs, Figma, Miro ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'или другом удобном формате.'
            },
          ]
        },
        {
          tag: 'p',
          content: '2. Убедитесь, что вы указали:'
        }
      ]
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'фиксированные средства,'
        },
        {
          tag: 'p',
          content: 'переменные элементы,'
        },
        {
          tag: 'p',
          content: 'краткое описание пластического сюжета.'
        }
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: '3. Включите '
            },
            {
              tag: 'span',
              content: 'доступ по ссылке ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: 'и прикрепите её в задании модуля.'
            },
          ]
        },
        {
          tag: 'p',
          content: '4. Проверьте, что ссылка открывается — иначе преподаватель не сможет дать обратную связь.'
        }
      ]
    },
  ]
}

const lessonDataFYS51: ILessonDataDB = {
  id: 'Practice_ t4jUts',
  courseId: 'finding-your-style',
  title: 'Практика. Как найти стиль',
  type: 'Practice',
  icon: {
    icon: '/png/3d_emoji_SmilingFaceWithSunglasses.png',
  },
  topic: 'Финальный бриф',
  topicOrder: 5,
  topicIcon: 'Lesson',
  orderInTopic: 1,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
  isUnderDevelopment: false,
  content: [
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'В этом задании вы соберёте всё, что мы изучили на курсе — и создадите серию иллюстраций, основанную на ваших сильных сторонах, интересах и выразительных приёмах.'
        },
        {
          tag: 'p',
          content: 'Цель — 3–5 графических работ, объединённых одной интонацией (пластической идеей) и одним литературным сюжетом.'
        }
      ]
    },
    {
      type: 'title',
      title: 'Шаг 1. Сформулируйте лозунг серии'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Это короткая фраза, которая описывает ощущение, эмоцию или настроение серии. Она задаёт интонацию — и помогает принять верные визуальные решения.'
        },
        {
          tag: 'p',
          content: 'Примеры:'
        },
      ]
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'Один в большом пространстве'
        },
        {
          tag: 'p',
          content: 'Шумно и тесно'
        },
        {
          tag: 'p',
          content: 'Скрежет ногтей по стеклу'
        },
        {
          tag: 'p',
          content: 'Пространство после пожара'
        }
      ]
    },
    {
      type: 'title',
      title: 'Шаг 2. Выберите литературный сюжет'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Это логика, которая объединит сцены в серию. Повторяющийся образ, тема или персонаж.'
        },
        {
          tag: 'p',
          content: 'Примеры:'
        },
      ]
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'Звери, которые стесняются своей шерсти'
        },
        {
          tag: 'p',
          content: 'Город, где все окна заколочены'
        },
        {
          tag: 'p',
          content: 'Обычные предметы, уставшие от своей функции'
        },
        {
          tag: 'p',
          content: 'Парадные портреты нелепых монстров'
        }
      ]
    },
    {
      type: 'title',
      title: 'Шаг 3. Выберите пластические приёмы'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Зафиксируйте 1–2 выразительных инструмента, которые будут повторяться во всей серии:'
        },
      ]
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'ограниченная палитра, например, только синий и серый,'
        },
        {
          tag: 'p',
          content: 'форма, например, всё строится из треугольников,'
        },
        {
          tag: 'p',
          content: 'композиционное правило, например, пустота в центре,'
        },
        {
          tag: 'p',
          content: 'материал или фактура.'
        }
      ]
    },
    {
      type: 'text',
      text: 'Меняйте всё остальное — персонажей, сюжеты, обстановку — но не нарушайте выбранную визуальную логику.'
    },
    {
      type: 'title',
      title: 'Шаг 4. Нарисуйте 5–10 работ'
    },
    {
      type: 'text',
      text: 'На этом этапе важна масса, а не чистота исполнения. Рисуйте быстро, экспериментируйте, проверяйте идеи. Позже серию можно будет доработать.'
    },
    {
      type: 'title',
      title: 'Шаг 5. Отберите 3–5 работ, которые:'
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'лучше всего передают ваш '
            },
            {
              tag: 'span',
              content: 'лозунг,',
              props: { className: 'keyText'}
            }
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'раскрывают '
            },
            {
              tag: 'span',
              content: 'литературный сюжет,',
              props: { className: 'keyText'}
            }
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'работают как '
            },
            {
              tag: 'span',
              content: 'цельная серия.',
              props: { className: 'keyText'}
            }
          ]
        },
      ]
    },
    {
      type: 'title',
      title: 'Итог'
    },
    {
      type: 'text',
      text: 'По результатам у вас должны быть:'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Фотографии или сканы',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: ' всех рисунков, включая черновики и неудачи.',
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Краткое описание:',
              props: { className: 'keyText'}
            },
          ]
        },
      ]
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'Какой у вас лозунг?'
        },
        {
          tag: 'p',
          content: 'В чём литературный сюжет?'
        },
        {
          tag: 'p',
          content: 'Какие пластические приёмы вы выбрали?'
        },
        {
          tag: 'p',
          content: 'Что получилось, а что нет?'
        }
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Ваши наблюдения:',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: ' что вы поняли о себе, о своей технике, о своём стиле.',
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Вопросы к преподавателю,',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: ' если они есть.',
            },
          ]
        }
      ]
    },
    {
      type: 'title',
      title: 'Советы'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Любая степень реалистичности подходит.',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: ' Рисуйте, как вам комфортно.',
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Рисуйте привычными для вас материалами.',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: ' На интенсиве нет цели освоить новый материал или технику. Рисуйте теми материалами, к которым привыкли. Если вы никогда не рисовали, возьмите черную тушь для пятна, ручку — для линии.',
            },
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Не стесняйтесь загружать свои работы.',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: ' Часто так бывает, что нам больше нравятся рисунки других, чем свои собственные. Поэтому важно делиться работами. Работа, которая кажется нам скучной, может удивит и вдохновит кого-то другого. А после этого может и мы сами сможем заметить в ней что-то интересное.',
            },
          ]
        }
      ]
    },
    {
      type: 'title',
      title: 'Как оформить результат'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: '1. '
            },
            {
              tag: 'span',
              content: 'Оформите всё в одном файле: Google Docs, Figma, Miro',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: ' или любой другой удобный сервис.'
            },
          ]
        },
        {
          tag: 'p',
          content: '2. Добавьте в этот файл:'
        }
      ]
    },
    {
      type: 'list',
      items: [
        {
          tag: 'p',
          content: 'Лозунг серии'
        },
        {
          tag: 'p',
          content: 'Описание литературного сюжета'
        },
        {
          tag: 'p',
          content: 'Какие выразительные приёмы вы выбрали'
        },
        {
          tag: 'p',
          content: 'Иллюстрации: финальные и черновые'
        },
        {
          tag: 'p',
          content: 'Ваши наблюдения: что получилось, что нет, что было сложно'
        },
        {
          tag: 'p',
          content: 'Вопросы к преподавателю, если есть'
        }
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: '3. Включите '
            },
            {
              tag: 'span',
              content: 'доступ по ссылке. ',
              props: { className: 'keyText'}
            },
            {
              tag: 'span',
              content: ' Убедитесь, что ссылка открыта.'
            },
          ]
        },
        {
          tag: 'p',
          content: '4. Прикрепите ссылку к финальному заданию модуля.'
        }
      ]
    }
  ]
}

const lessonDataCI21: ILessonDataDB = {
  id: 'CommercialIllustrator_2Q1wTR',
  courseId: 'commercial-illustrator',
  title: 'Кто такой иллюстратор и чем он занимается',
  type: 'Theory',
  icon: {
    icon: '/png/3d_emoji_HuggingFace.png',
  },
  topic: 'Иллюстрация как профессия',
  topicOrder: 2,
  topicIcon: 'Lesson',
  orderInTopic: 1,
  duration: {
    unit: 'minutes',
    value: 5
  },
  isFree: true,
  isUnderDevelopment: false,
  content: [
    {
      type: 'textImportant',
      text: 'В конце бесплатного модуля вы сможете сдать на проверку свой самостоятельный проект. Не упустите возможность получить обратную связь от ревьюера и узнать, как работает команда сопровождения в flearn.',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Добро пожаловать на вводную часть курса ',
            },
            {
              tag: 'span',
              content: '«Композиция: как выделить главное»! ',
              props: { className: 'bold'},
            },
            {
              tag: 'span',
              content: 'Совсем скоро вы сделаете свою первую иллюстрацию для рекламного баннера. Но для начала давайте узнаем, кто такой иллюстратор и чем он занимается.',
            }
          ],
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Иллюстратор ',
              props: { className: 'bold'},
            },
            {
              tag: 'span',
              content: 'помогает компаниям и людям выделиться среди конкурентов, привлечь новую аудиторию, сделать текст нагляднее и проще.',
            },
          ]
        },
        {
          tag: 'p',
          content: 'Работы иллюстраторов можно увидеть в книгах, журналах, на обложках альбомов, в рекламе, а также в цифровых продуктах, таких как веб-сайты и приложения. Главная задача иллюстратора — передать идеи, эмоции и информацию через изображения.'
        }
      ]
    },
    {
      type: 'chat',
      chat: {
        blocks: [
          {
            showThisBlockButtonContent: '',
            messages: [],
          },
          {
            showThisBlockButtonContent: 'А можешь показать на примере?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'А можешь показать на примере?'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Конечно!'
              },
            ],
          },
        ],
      },
    },
    {
      type: 'title',
      title: 'Пример из упаковки продуктов'
    },
    {
      type: 'text',
      text: 'Malika Favr известна своими минималистичными и яркими работами. Её иллюстрации часто используются в рекламных плакатах и упаковке продуктов, чтобы привлечь внимание своей уникальной стилистикой.'
    },
    {
      type: 'image',
      imageData: {
        id: 'sephora1.webp',
        alt: 'sephora1',
        caption: [
          {
            tag: 'a',
            content: 'Malika Favr для Sephora',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.malikafavre.com/' },
          }
        ]
      },
    },
    {
      type: 'title',
      title: 'Пример из книжкой иллюстрации'
    },
    {
      type: 'text',
      text: 'Возьмём, например, книгу от издательства Поляндрия «Моё босоногое племя. Прощай, бетон!» Иллюстратор, Стефан Николе, придумал иллюстрации, которые помогают детям и взрослым лучше понять и почувствовать сюжет книги. Его рисунки не только дополняют текст, но и создают особую атмосферу, увлекая читателя.'
    },
    {
      type: 'image',
      imageData: {
        id: 'polyandria1.webp',
        alt: 'polyandria1',
        caption: [
          {
            tag: 'a',
            content: 'Поляндрия',
            props: { className: 's-hoverable', target: "_blank", to: 'https://polyandria.ru/catalog/novinki/moye-bosonogoe-plemya-proshchay-beton/' },
          }
        ]
      },
    },
    {
      type: 'text',
      text: 'Дальше мы подробнее посмотрим, как иллюстрации используются в'
    },
    {
      type: 'list',
      items: [
        'цифровых продуктах;',
        'рекламе;',
        'упаковке;',
        'оформлении пространств;',
        'книгах и журналах.'
      ]
    }
  ],
}

const lessonDataCI22: ILessonDataDB = {
  id: 'IT_fed4TU',
  courseId: 'commercial-illustrator',
  title: 'Цифровые продукты',
  type: 'Theory',
  icon: {
    icon: '/png/3d_emoji_HuggingFace.png',
  },
  topic: 'Иллюстрация как профессия',
  topicOrder: 2,
  topicIcon: 'Lesson',
  orderInTopic: 2,
  duration: {
    unit: 'minutes',
    value: 10
  },
  isFree: true,
  isUnderDevelopment: false,
  content: [
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Иллюстрации в IT могут значительно улучшить пользовательский опыт, помочь визуализировать данные и сделать сложные идеи понятными и доступными. Вот несколько примеров их использования.'
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Помогают быстро ориентироваться в приложении. ',
              props: { className: 'bold'},
            },
            {
              tag: 'span',
              content: 'Представьте, что вы пользуетесь мобильным приложением для доставки еды. На главном экране вы видите иконки разных категорий: пицца, суши, бургеры и т.д. Эти иконки помогают пользователю быстро найти нужный раздел, делая взаимодействие с приложением интуитивно понятным и приятным.',
            },
          ]
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'Vkusvill.webp',
        alt: 'Vkusvill',
        caption: [
          {
            tag: 'a',
            content: 'Vkusvill',
            props: { className: 's-hoverable', target: "_blank", to: 'https://vkusvill.ru/' },
          }
        ]
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Визуализируют данные. ',
              props: { className: 'bold'},
            },
            {
              tag: 'span',
              content: 'В приложениях для аналитики или финансов инфографика помогает легко и понятно представить сложные данные. Например, приложение для учета личных финансов может показывать ваши расходы в виде диаграмм и графиков, где каждый сектор или столбец иллюстрирован иконками продуктов, услуг и т.д.',
            }
          ]
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'PaulaCruz1.webp',
        alt: 'PaulaCruz1',
        caption: [
          {
            tag: 'a',
            content: 'Paula Cruz',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/paulacruz' },
          }
        ]
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Сопровождают онбординг, первоначальное обучение пользователя. ',
              props: { className: 'bold'},
            },
            {
              tag: 'span',
              content: 'Иногда текст сложно понять без визуальной поддержки. Например, когда вы впервые открываете новое приложение, то часто видите серию экранов, объясняющих его основные функции. Иллюстрации на этих экранах помогают понять, что и как делать.',
            }
          ]
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'IvanHaidutski.webp',
        alt: 'IvanHaidutski',
        caption: [
          {
            tag: 'a',
            content: 'Ivan Haidutski',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/ivanhaidutski' },
          }
        ]
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Повышают вовлеченность пользователей с помощью геймификации. ',
              props: { className: 'bold'},
            },
            {
              tag: 'span',
              content: 'Например, в образовательных приложениях можно встретить дружелюбных интерактивных персонажей, которые помогают проходить обучение, вовлекают в процесс и дают обратную связь.',
            }
          ]
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'MinHeo1.webp',
        alt: 'MinHeo1',
        caption: [
          {
            tag: 'a',
            content: 'Min Heo',
            props: { className: 's-hoverable', target: "_blank", to: 'https://minstudio.cargo.site/index' },
          }
        ]
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Объясняют сложные идеи. ',
              props: { className: 'bold'},
            },
            {
              tag: 'span',
              content: 'Например, Dropbox использует иллюстрации, чтобы объяснить, как работает их облачное хранилище и какие функции оно предлагает. Схемы и картинки делают процесс понятным даже для новичков.',
            }
          ]
        },
      ],
    },
    {
      type: 'image',
      imageData: {
        id: 'dropbox.webp',
        alt: 'dropbox',
        caption: [
          {
            tag: 'a',
            content: 'DropBox',
            props: { className: 's-hoverable' },
          }
        ]
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Делают бренд узнаваемым. ',
          props: {className: ' bold'}
        },
        {
          tag: 'span',
          content: 'Например, у Duolingo, платформы для изучения английского, есть главный персонаж — зеленый совенок. Этот совенок делает бренд легко узнаваемым и запоминающимся, а также придает компании дружелюбный и доступный вид.'
        }
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'duolingo.webp',
        alt: 'duolingo',
        caption: [
          {
            tag: 'a',
            content: 'duolingo',
            props: { className: 's-hoverable', target: "_blank", to: 'https://ru.duolingo.com' },
          }
        ]
      }
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Создают эмоциональную связь с аудиторией. ',
          props: {className: ' bold'}
        },
        {
          tag: 'span',
          content: 'Headspace использует яркие и простые иллюстрации, чтобы сделать медитацию доступной и приятной. Картинки помогают создать расслабляющую атмосферу и настроить пользователя на позитивный лад. Дизайнеры выбрали минималистичный стиль, чтобы медитация казалась интересной и привлекательной для широкой аудитории.'
        }
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'headspace2.webp',
        alt: 'headspace2',
        caption: [
          {
            tag: 'a',
            content: 'Headspace',
            props: { className: 's-hoverable', target: "_blank", to: 'https://organizations.headspace.com/employers?origin=nav&_gl=1*9e6e41*_gcl_au*NDUyNTQ1MTU3LjE3MjE3NDU2MjY.*FPAU*NDUyNTQ1MTU3LjE3MjE3NDU2MjY.' },
          }
        ]
      }
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Транслируют эмоции и настроение. ',
          props: {className: ' bold'}
        },
        {
          tag: 'span',
          content: 'Например, компания Airbnb использует иллюстрации, чтобы создать дух путешествий и открытий. Иллюстраторы выбирают яркие, насыщенные цвета, чтобы вызвать у пользователей чувство приключения и исследовательского духа.'
        }
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'airbnb.webp',
        alt: 'airbnb',
        caption: [
          {
            tag: 'a',
            content: 'airbnb',
            props: { className: 's-hoverable', target: "_blank", to: 'https://ru.airbnb.com/giftcards' },
          }
        ]
      }
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Усиливают коммуникацию с брендом. ',
          props: {className: ' bold'}
        },
        {
          tag: 'span',
          content: 'Google Doodles – это временные изменения логотипа Google, которые отражают важные события, праздники и юбилеи. Художники вдохновляются культурными событиями и историческими личностями, создавая уникальные и узнаваемые образы.'
        }
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'GoogleDoodle2.webp',
        alt: 'GoogleDoodle2',
        caption: [
          {
            tag: 'a',
            content: 'Google Doodles',
            props: { className: 's-hoverable', target: "_blank", to: 'https://doodles.google/' },
          }
        ]
      }
    },
    {
      type: 'chat',
      chat: {
        blocks: [
          {
            showThisBlockButtonContent: '',
            messages: [
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Вот вроде и все. Дальше будет пара вопросов, чтобы закрепить материал. Готовы?'
              },
            ],
          },
          {
            showThisBlockButtonContent: 'Ага) Давай вопросы!',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Ага) Давай вопросы!'
              }
            ],
          },
        ]
      }
    },
    {
      type: 'quiz',
      steps: [
        {
          type: 'SELECT',
          variant: 'RADIO',
          title: '1/2. Почему важно учитывать пользовательский опыт при создании иллюстраций?',
          options: [
            {
              value: 'Чтобы иллюстрации выглядели профессионально.',
              shouldBeSelected: false,
            },
            {
              value: 'Чтобы приложение было интуитивно понятным и удобным.',
              shouldBeSelected: true,
            },
            {
              value: 'Чтобы уменьшить количество иллюстраций в приложении.',
              shouldBeSelected: false,
            },
          ],
        },
        {
          type: 'SELECT',
          variant: 'CHECKBOX',
          title: '2/2. Зачем разрабочики приложений используют иллюстрации в интерфейсе? Выберите все верные варианты ответа.',
          description: 'Иллюстрации…',
          options: [
            {
              value: 'улучшают производительность приложения.',
              shouldBeSelected: false,
            },
            {
              value: 'помогают пользователям лучше ориентироваться в приложении.',
              shouldBeSelected: true,
            },
            {
              value: 'заменяют текстовые инструкции наглядными визуальными образами.',
              shouldBeSelected: true,
            },
          ],
        },
      ]
    },
    {
      type: 'chat',
      chat: {
        blocks: [
          {
            showThisBlockButtonContent: '',
            messages: [
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Отлично! Я подобрала еще несколько примеров того, как иллюстрации используются в IT. Смотрим?'
              },
            ],
          },
          {
            showThisBlockButtonContent: 'Да, конечно!',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Да, конечно!'
              }
            ],
          },
        ]
      }
    },
    {
      type: 'gallery',
      maxHeightPx: 900,
      images: [
        {
          id: 'headspace1.webp',
          alt: 'headspace1',
          caption: [
            {
              tag: 'a',
              content: 'Headspace',
              props: { className: 's-hoverable', target: "_blank", to: 'https://organizations.headspace.com/employers?origin=nav&_gl=1*9e6e41*_gcl_au*NDUyNTQ1MTU3LjE3MjE3NDU2MjY.*FPAU*NDUyNTQ1MTU3LjE3MjE3NDU2MjY.' },
            }
          ]
        },
        {
          id: 'GoogleDoodle1.webp',
          alt: 'GoogleDoodle1',
          caption: [
            {
              tag: 'a',
              content: 'Google Doodles',
              props: { className: 'key-link', target: "_blank", to: 'https://doodles.google/' },
            }
          ]
        },
        {
          id: 'ShukaDesign1.webp',
          alt: 'ShukaDesign1',
          caption: [
            {
              tag: 'a',
              content: 'Shuka Design',
              props: { className: 'key-link', target: "_blank", to: 'http://shuka.design' },
            }
          ]
        },
        {
          id: 'ShukaDesign2.webp',
          alt: 'ShukaDesign2',
          caption: [
            {
              tag: 'a',
              content: 'Shuka Design',
              props: { className: 'key-link', target: "_blank", to: 'http://shuka.design' },
            }
          ]
        },
        {
          id: 'ShukaDesign3.webp',
          alt: 'ShukaDesign3',
          caption: [
            {
              tag: 'a',
              content: 'Shuka Design',
              props: { className: 'key-link', target: "_blank", to: 'http://shuka.design' },
            }
          ]
        },
        {
          id: 'ShukaDesign4.webp',
          alt: 'ShukaDesign4',
          caption: [
            {
              tag: 'a',
              content: 'Shuka Design',
              props: { className: 'key-link', target: "_blank", to: 'http://shuka.design' },
            }
          ]
        },
        {
          id: 'ShukaDesign8.webp',
          alt: 'ShukaDesign8',
          caption: [
            {
              tag: 'a',
              content: 'Shuka Design',
              props: { className: 'key-link', target: "_blank", to: 'http://shuka.design' },
            }
          ]
        },
        {
          id: 'ShukaDesign9.webp',
          alt: 'ShukaDesign9',
          caption: [
            {
              tag: 'a',
              content: 'Shuka Design',
              props: { className: 'key-link', target: "_blank", to: 'http://shuka.design' },
            }
          ]
        },
        {
          id: 'naitori4.webp',
          alt: 'naitori4',
          caption: [
            {
              tag: 'a',
              content: 'naitori',
              props: { className: 'key-link', target: "_blank", to: 'https://naitori.ru/#next' },
            }
          ]
        },
      ]
    },
    {
      type: 'chat',
      chat: {
        blocks: [
          {
            showThisBlockButtonContent: '',
            messages: [
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Мы разобрались с тем, как иллюстрации улучшают мобильные приложения. Готовы продолжить?'
              },
            ],
          },
          {
            showThisBlockButtonContent: 'Да, конечно! Давай посмотрим, где еще нужны иллюстрации.',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Да, конечно! Давай посмотрим, где еще нужны иллюстрации.'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Супер, тогда переходим к иллюстрациям в рекламе.'
              },
            ],
          },
        ]
      }
    },
  ]
}

const lessonDataCI23: ILessonDataDB = {
  id: 'Marketing_28EO3M',
  courseId: 'commercial-illustrator',
  title: 'Реклама',
  type: 'Theory',
  icon: {
    icon: '/png/3d_emoji_HuggingFace.png',
  },
  topic: 'Иллюстрация как профессия',
  topicOrder: 2,
  topicIcon: 'Lesson',
  orderInTopic: 3,
  duration: {
    unit: 'minutes',
    value: 10
  },
  isFree: true,
  isUnderDevelopment: false,
  content: [
    {
      type: 'text',
      text: 'Иллюстрации помогают привлечь внимание, быстро донести сообщение и создать эмоциональную связь с потенциальными клиентами. Давайте посмотрим на несколько примеров.',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Помогают отстроиться от конкурентов. ',
              props: { className: 'bold'},
            },
            {
              tag: 'span',
              content: 'Иллюстрации создают уникальный визуальный стиль, который выделяет бренд среди конкурентов. Например, L\'Occitane использует яркие иллюстрации на упаковке, чтобы подчеркнуть индивидуальность. Такой подход помогает бренду запомниться и привлечь внимание клиентов.',
            }
          ]
        },
      ],
    },
    {
      type: 'image',
      imageData: {
        id: 'StevenWilson3.webp',
        alt: 'StevenWilson3',
        caption: [
          {
            tag: 'a',
            content: 'Steven Wilson',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/stevenwilsonstudio' },
          }
        ]
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Усиливают бренд. ',
              props: { className: 'bold'},
            },
            {
              tag: 'span',
              content: 'Иллюстрации создают приятные визуальные ассоциации с продуктом. Например, Mickey Mouse – один из самых узнаваемых маскотов в мире. Его образ вызывает улыбку и усиливает эмоциональную связь с брендом.',
            }
          ]
        },
      ],
    },
    {
      type: 'image',
      imageData: {
        id: 'ZaraMickeyMouse2.webp',
        alt: 'ZaraMickeyMouse2',
        caption: [
          {
            tag: 'a',
            content: 'Футболка с Mickey Mouse в Zara',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.zara.com/rs/sr/majica-mickey-mouse---disney-p07878778.html' },
          }
        ]
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Привлекают внимание. ',
              props: { className: 'bold'},
            },
            {
              tag: 'span',
              content: 'Объявления с картинками привлекают внимание гораздо быстрее, чем текст. Например, афиши для музыкальных фестивалей или выставок часто используют яркие иллюстрации, чтобы задать настроение и создать запоминающееся впечатление у зрителей.',
            }
          ]
        },
      ],
    },
    {
      type: 'image',
      imageData: {
        id: 'AmandaLobos4.webp',
        alt: 'AmandaLobos4',
        caption: [
          {
            tag: 'a',
            content: 'Amanda Lobos',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/maisdeumlobo' },
          }
        ]
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Помогают с принятием решений. ',
              props: { className: 'bold'},
            },
            {
              tag: 'span',
              content: 'Иллюстрации помогают людям быстрее решать, покупать ли продукт. Например, в рекламе психологических услуг картинки могут показать, как работает терапия, и помочь понять, подходит ли она вам.',
            }
          ]
        },
      ],
    },
    {
      type: 'image',
      imageData: {
        id: 'yasno.live.webp',
        alt: 'yasno.live',
        caption: [
          {
            tag: 'a',
            content: 'Реклама психологических услуг Ясно',
            props: { className: 's-hoverable', target: "_blank", to: 'ej&utm_term=ясно%20лайв&gad_source=1&gclid=CjwKCAjwqf20BhBwEiwAt7dtdSi3vhYAjsS2MYP_bfWtYmGeJpShiyTYZ1uzOYvELEcATDeVpwOn-RoCQNsQAvD_BwE' },
          }
        ]
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Объясняют сложные идеи. ',
              props: { className: 'bold'},
            },
            {
              tag: 'span',
              content: 'Иллюстрации помогают легче понять сложную информацию. Например, медицинские компании используют картинки, чтобы показать, как действует лекарство или как работает медицинский прибор. Такие картинки помогают людям лучше понять продукт и его преимущества.',
            }
          ]
        },
      ],
    },
    {
      type: 'image',
      imageData: {
        id: 'SusannaRumiz3.webp',
        alt: 'SusannaRumiz3',
        caption: [
          {
            tag: 'a',
            content: 'Промоматериалы для Komoot. Приложение, чтобы спланировать маршрут и устроить хайкинг',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/susannarumiz/projects' },
          }
        ]
      },
    },
    {
      type: 'chat',
      chat: {
        blocks: [
          {
            showThisBlockButtonContent: '',
            messages: [
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Это все, что я хотела рассказать об иллюстрациях в рекламе. А теперь давайте немного попрактикуемся. Готовы?'
              },
            ],
          },
          {
            showThisBlockButtonContent: 'Да, давай практиковаться!)',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Да, давай практиковаться!)'
              }
            ],
          },
        ]
      }
    },
    {
      type: 'quiz',
      steps: [
        {
          type: 'SELECT',
          variant: 'RADIO',
          title: '1/2. Перед вами реклама Adidas. Подумайте, на какую группу людей она ориентирована.',
          image: {
            id: 'adidas1.webp',
            alt: 'adidas1',
          },
          options: [
            {
              value: 'Любят спортивный стиль и всегда в курсе новых моделей кроссовок.',
              shouldBeSelected: false,
            },
            {
              value: 'Студенты из Азии, которые интересуются современным искусством и музыкой.',
              shouldBeSelected: true,
            },
            {
              value: 'Профессионально занимаются спортом.',
              shouldBeSelected: false,
            },
          ],
        },
        {
          type: 'SELECT',
          variant: 'RADIO',
          title: '2/2. Перед вами реклама Adidas. Подумайте, на какую группу людей она ориентирована.',
          image: {
            id: 'adidas3.webp',
            alt: 'adidas3',
          },
          options: [
            {
              value: 'Любят вечеринки и музыкальные фестивали, возраст до 35 лет.',
              shouldBeSelected: true,
            },
            {
              value: 'Не одеваются в Adidas, но следят за релизами эксклюзивных коллекций кроссовок,  возраст до 30 лет.',
              shouldBeSelected: false,
            },
            {
              value: 'Раньше профессионально занимались спортом, средний возраст — 45-60 лет.',
              shouldBeSelected: false,
            },
          ],
        },
      ]
    },
    {
      type: 'chat',
      chat: {
        blocks: [
          {
            showThisBlockButtonContent: '',
            messages: [
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Отлично! Я подобрала еще несколько примеров того, как иллюстрации используются в рекламе. Смотрим?'
              },
            ],
          },
          {
            showThisBlockButtonContent: 'Да, конечно!',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Да, конечно!'
              }
            ],
          },
        ]
      }
    },
    {
      type: 'gallery',
      maxHeightPx: 4_300,
      images: [
        {
          id: 'SummerSymphiny.webp',
          alt: 'SummerSymphiny',
          caption: [
            {
              tag: 'a',
              content: 'Summer Symphiny',
              props: { className: 'key-link'},
            }
          ]
        },
        {
          id: 'AmandaLobos6.webp',
          alt: 'AmandaLobos6',
          caption: [
            {
              tag: 'a',
              content: 'Amanda Lobos',
              props: { className: 'key-link', target: "_blank", to: 'https://www.behance.net/maisdeumlobo' },
            }
          ]
        },
        {
          id: 'AmandaLobos7.webp',
          alt: 'AmandaLobos7',
          caption: [
            {
              tag: 'a',
              content: 'Amanda Lobos',
              props: { className: 'key-link', target: "_blank", to: 'https://www.behance.net/maisdeumlobo' },
            }
          ]
        },
        {
          id: 'AmandaLobos8.webp',
          alt: 'AmandaLobos8',
          caption: [
            {
              tag: 'a',
              content: 'Amanda Lobos',
              props: { className: 'key-link', target: "_blank", to: 'https://www.behance.net/maisdeumlobo' },
            }
          ]
        },
        {
          id: 'AmandaLobos9.webp',
          alt: 'AmandaLobos9',
          caption: [
            {
              tag: 'a',
              content: 'Amanda Lobos',
              props: { className: 'key-link', target: "_blank", to: 'https://www.behance.net/maisdeumlobo' },
            }
          ]
        },
        {
          id: 'okchizh1.webp',
          alt: 'okchizh1',
          caption: [
            {
              tag: 'a',
              content: 'Юля Чиж',
              props: { className: 's-hoverable', target: "_blank", to: 'https://okchizh.art/' },
            }
          ]
        },
        {
          id: 'StevenWilson1.webp',
          alt: 'StevenWilson1',
          caption: [
            {
              tag: 'a',
              content: 'Steven Wilson',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/stevenwilsonstudio' },
            }
          ]
        },
        {
          id: 'StevenWilson2.webp',
          alt: 'StevenWilson2',
          caption: [
            {
              tag: 'a',
              content: 'Steven Wilson',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/stevenwilsonstudio' },
            }
          ]
        },
        {
          id: 'ETolsma2.webp',
          alt: 'ETolsma2',
          caption: [
            {
              tag: 'a',
              content: 'E. Tolsma',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/ellistolsma' },
            }
          ]
        },
        {
          id: 'AmandaLobos3.webp',
          alt: 'AmandaLobos3',
          caption: [
            {
              tag: 'a',
              content: 'Amanda Lobos',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/maisdeumlobo' },
            }
          ]
        },
        {
          id: 'IlyaMilstein5.webp',
          alt: 'IlyaMilstein5',
          caption: [
            {
              tag: 'a',
              content: 'Ilya Milstein',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.ilyamilstein.com/' },
            }
          ]
        },
        {
          id: 'IlyaMilstein7.webp',
          alt: 'IlyaMilstein7',
          caption: [
            {
              tag: 'a',
              content: 'Ilya Milstein',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.ilyamilstein.com/' },
            }
          ]
        },
        {
          id: 'sasha.ananas.sktch.webp',
          alt: 'sasha.ananas.sktch',
          caption: [
            {
              tag: 'a',
              content: 'Sasha Ananas',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/sasha.ananas.sktch/' },
            }
          ]
        },
        {
          id: 'BarboraIdesova1.webp',
          alt: 'BarboraIdesová1',
          caption: [
            {
              tag: 'a',
              content: 'Barbora Idesová',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/barboraidesova' },
            }
          ]
        },
        {
          id: 'BarboraIdesova2.webp',
          alt: 'BarboraIdesová2',
          caption: [
            {
              tag: 'a',
              content: 'Barbora Idesová',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/barboraidesova' },
            }
          ]
        },
        {
          id: 'BarboraIdesova3.webp',
          alt: 'BarboraIdesová3',
          caption: [
            {
              tag: 'a',
              content: 'Barbora Idesová',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/barboraidesova' },
            }
          ]
        },
        {
          id: 'BarboraIdesova4.webp',
          alt: 'BarboraIdesová4',
          caption: [
            {
              tag: 'a',
              content: 'Barbora Idesová',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/barboraidesova' },
            }
          ]
        },
        {
          id: 'BarboraIdesova5.webp',
          alt: 'BarboraIdesová5',
          caption: [
            {
              tag: 'a',
              content: 'Barbora Idesová',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/barboraidesova' },
            }
          ]
        },
        {
          id: 'BarboraIdesova6.webp',
          alt: 'BarboraIdesová6',
          caption: [
            {
              tag: 'a',
              content: 'Barbora Idesová',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/barboraidesova' },
            }
          ]
        },
        {
          id: 'BarboraIdesova7.webp',
          alt: 'BarboraIdesová7',
          caption: [
            {
              tag: 'a',
              content: 'Barbora Idesová',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/barboraidesova' },
            }
          ]
        },
      ]
    },
  ]
}

const lessonDataCI24: ILessonDataDB = {
  id: 'Products_303ES4',
  courseId: 'commercial-illustrator',
  title: 'Коллаборации',
  type: 'Theory',
  icon: {
    icon: '/png/3d_emoji_HuggingFace.png',
  },
  topic: 'Иллюстрация как профессия',
  topicOrder: 2,
  topicIcon: 'Lesson',
  orderInTopic: 4,
  duration: {
    unit: 'minutes',
    value: 10
  },
  isFree: true,
  isUnderDevelopment: false,
  content: [
    {
      type: 'chat',
      chat: {
        blocks: [
          {
            showThisBlockButtonContent: '',
            messages: [
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Иллюстраторы рисуют не только для рекламных компаний. Бывает так, что совместная работа иллюстратора и компании переходит в нечто большее.'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Так появляются лимитированные линейки.'
              },
            ],
          },
          {
            showThisBlockButtonContent: 'Звучит интересно. Покажешь примеры?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Звучит интересно. Покажешь примеры?'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Конечно)'
              },
            ],
          },
        ]
      }
    },
    {
      type: 'title',
      title: 'Иллюстрации для продуктов',
    },
    {
      type: 'text',
      text: 'Когда бренды и иллюстраторы работают вместе, они могут создавать уникальные и запоминающиеся продукты. Эти совместные проекты дают иллюстраторам новые возможности для творчества и развития. Давайте посмотрим несколько примеров таких коллабораций.'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Привлекают новую аудиторию. ',
          props: {className: 'bold'}
        },
        {
          tag: 'span',
          content: 'Gucci часто работает с иллюстраторами, чтобы создавать уникальные коллекции. Один из самых запоминающихся проектов был с британской художницей Unskilled Worker. Она стала известна благодаря своим необычным и ярким портретам. В результате их сотрудничества появилась линия одежды и аксессуаров с красочными иллюстрациями, которые помогли привлечь новую аудиторию.'
        }
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'unskilledworker3.webp',
        alt: 'unskilledworker3',
        caption: [
          {
            tag: 'a',
            content: 'Unskilled Worker',
            props: { className: 's-hoverable', target: "_blank", to: 'https://unskilledworker.co.uk/work/' },
          }
        ]
      }
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Повышают популярность в соц.сетях. ',
          props: {className: 'bold'}
        },
        {
          tag: 'span',
          content: 'Известные бренды, как Coca-Cola, работают с художниками, чтобы создать брендированные стикеры для соц. сетей. Эти стикеры могут быть на тему праздников, новых продуктов или акций компании. Они не только привлекают внимание к бренду, но и побуждают людей делиться ими с друзьями, что повышает популярность бренда.'
        }
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'okchizh7.webp',
        alt: 'okchizh7',
        caption: [
          {
            tag: 'a',
            content: 'Юля Чиж',
            props: { className: 's-hoverable', target: "_blank", to: 'https://okchizh.art/' },
          }
        ]
      }
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Стимулируют людей чаще покупать продукты. ',
          props: {className: 'bold'}
        },
        {
          tag: 'span',
          content: 'Starbucks часто работает с иллюстраторами, чтобы создавать уникальные дизайны для своих подарочных карт. Каждый сезон или праздник может быть представлен новой серией карт с оригинальными рисунками. Эти карты становятся не только практичным подарком, но и предметом коллекционирования, что побуждает людей покупать их снова и снова.'
        }
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'BeyaRebai1.webp',
        alt: 'BeyaRebai1',
        caption: [
          {
            tag: 'a',
            content: 'Beya Rebai',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.beyarebai.com/' },
          }
        ]
      }
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Создают эмоциональную связь. ',
          props: {className: 'bold'}
        },
        {
          tag: 'span',
          content: 'Disney часто работает с дизайнерами и иллюстраторами, чтобы вместе создавать уникальные украшения. Например, вместе с Pandora они сделали коллекцию бижутерии с персонажами из известных мультфильмов Disney. Рисунки и иллюстрации любимых персонажей создают настроение, которые особенно радует фанатов.'
        }
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'pandora.jpg',
        alt: 'pandora',
        caption: [
          {
            tag: 'a',
            content: 'DISNEY X PANDORA',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.pandorashop.rs/rs/proizvodi/disney-collection' },
          }
        ]
      }
    },
    {
      type: 'chat',
      chat: {
        blocks: [
          {
            showThisBlockButtonContent: '',
            messages: [
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Про продукты все) Я подобрала еще несколько примеров для вдохновения. Смотрим?'
              },
            ],
          },
          {
            showThisBlockButtonContent: 'Конечно!',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Конечно!'
              }
            ],
          },
        ]
      }
    },
    {
      type: 'gallery',
      maxHeightPx: 2_900,
      images: [
        {
          id: 'okchizh3.webp',
          alt: 'okchizh3',
          caption: [
            {
              tag: 'a',
              content: 'Юля Чиж',
              props: { className: 's-hoverable', target: "_blank", to: 'https://okchizh.art/' },
            }
          ]
        },
        {
          id: 'okchizh8.webp',
          alt: 'okchizh8',
          caption: [
            {
              tag: 'a',
              content: 'Юля Чиж',
              props: { className: 's-hoverable', target: "_blank", to: 'https://okchizh.art/' },
            }
          ]
        },
        {
          id: 'unskilledworker1.webp',
          alt: 'unskilledworker1',
          caption: [
            {
              tag: 'a',
              content: 'Unskilled Worker',
              props: { className: 's-hoverable', target: "_blank", to: 'https://unskilledworker.co.uk/work/' },
            }
          ]
        },
        {
          id: 'unskilledworker2.webp',
          alt: 'unskilledworker2',
          caption: [
            {
              tag: 'a',
              content: 'Unskilled Worker',
              props: { className: 's-hoverable', target: "_blank", to: 'https://unskilledworker.co.uk/work/' },
            }
          ]
        },
        {
          id: 'unskilledworker4.webp',
          alt: 'unskilledworker4',
          caption: [
            {
              tag: 'a',
              content: 'Unskilled Worker',
              props: { className: 's-hoverable', target: "_blank", to: 'https://unskilledworker.co.uk/work/' },
            }
          ]
        },
        {
          id: 'SusannaRumiz5.webp',
          alt: 'SusannaRumiz5',
          caption: [
            {
              tag: 'a',
              content: 'Susanna Rumiz',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/susannarumiz/projects' },
            }
          ]
        },
        {
          id: 'AmandaLobos1.webp',
          alt: 'AmandaLobos1',
          caption: [
            {
              tag: 'a',
              content: 'Amanda Lobos',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/maisdeumlobo' },
            }
          ]
        },
        {
          id: 'AmandaLobos2.webp',
          alt: 'AmandaLobos2',
          caption: [
            {
              tag: 'a',
              content: 'Amanda Lobos',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/maisdeumlobo' },
            }
          ]
        },
        {
          id: 'AsahiNagata3.webp',
          alt: 'AsahiNagata3',
          caption: [
            {
              tag: 'a',
              content: 'Asahi Nagata',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/nagataae6d8' },
            }
          ]
        },
        {
          id: 'AsahiNagata5.webp',
          alt: 'AsahiNagata5',
          caption: [
            {
              tag: 'a',
              content: 'Asahi Nagata',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/nagataae6d8' },
            }
          ]
        },
        {
          id: 'MinHeo2.webp',
          alt: 'MinHeo2',
          caption: [
            {
              tag: 'a',
              content: 'Min Heo',
              props: { className: 's-hoverable', target: "_blank", to: 'https://minstudio.cargo.site/' },
            }
          ]
        },
        {
          id: 'dyreborgstudio.webp',
          alt: 'dyreborgstudio',
          caption: [
            {
              tag: 'a',
              content: 'INA DYREBORG',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.dyreborgstudio.com/' },
            }
          ]
        },
        {
          id: 'projectswatches1.webp',
          alt: 'projectswatches1',
          caption: [
            {
              tag: 'a',
              content: 'Projects Watches',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/projectswatches/' },
            }
          ]
        },
        {
          id: 'projectswatches2.webp',
          alt: 'projectswatches2',
          caption: [
            {
              tag: 'a',
              content: 'Projects Watches',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/projectswatches/' },
            }
          ]
        },
        {
          id: 'projectswatches3.webp',
          alt: 'projectswatches3',
          caption: [
            {
              tag: 'a',
              content: 'Projects Watches',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/projectswatches/' },
            }
          ]
        },
      ]
    },
  ]
}

const lessonDataCI25: ILessonDataDB = {
  id: 'Packaging_80wfHs',
  courseId: 'commercial-illustrator',
  title: 'Упаковка',
  type: 'Theory',
  icon: {
    icon: '/png/3d_emoji_HuggingFace.png',
  },
  topic: 'Иллюстрация как профессия',
  topicOrder: 2,
  topicIcon: 'Lesson',
  orderInTopic: 5,
  duration: {
    unit: 'minutes',
    value: 10
  },
  isFree: true,
  isUnderDevelopment: false,
  content: [
    {
      type: 'text',
      text: 'Упаковка — первое, что видит клиент, и от того, насколько она привлекательна и понятна, зависит решение о покупке. Давайте посмотрим, как это работает.'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Привлекают внимание. ',
          props: {className: ' bold'}
        },
        {
          tag: 'span',
          content: 'Представьте себе полки в магазине, полные товаров. Задача иллюстратора – сделать так, чтобы покупатель обратил внимание именно на ваш продукт. Например, летом 2024 сеть магазинов "Вкусвилл" вместе с фестивалем для иллюстраторов "Морс" провели конкурс для художников. Им нужно было придумать иллюстрации для упаковок напитка "Морс". В результате в магазинах появились яркие и запоминающиеся баночки, которые сразу бросались в глаза покупателям.'
        }
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'mors.webp',
        alt: 'mors',
        caption: [
          {
            tag: 'a',
            content: 'МОРС',
            props: { className: 's-hoverable'},
          }
        ]
      }
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Объясняют особенности продукта. ',
          props: {className: ' bold'}
        },
        {
          tag: 'span',
          content: 'Компания "Moo Free" делает вкусный веганский шоколад и хочет, чтобы их упаковка понравилась и детям, и взрослым. Поэтому они пригласили иллюстратора Сандру Дикманн, которая нарисовала яркие и забавные картинки с животными. Эти иллюстрации не только привлекают внимание детей, но и ясно показывают, что шоколад не содержит молока и подходит для людей с аллергией. Благодаря таким картинкам, покупатели сразу понимают, что это веселый и безопасный продукт для всей семьи.'
        }
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'MooFree.webp',
        alt: 'MooFree',
        caption: [
          {
            tag: 'a',
            content: 'Moo Free',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.moofreechocolates.com/' },
          }
        ]
      }
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Усиливают связь с брендом. ',
          props: {className: ' bold'}
        },
        {
          tag: 'span',
          content: 'Компания "Ben & Jerry\'s" известна своим креативным подходом к упаковке мороженого. Художник Вуди Джексон создал узнаваемые иллюстрации коров и сельской местности для их упаковок. Эти изображения не только создают ощущение деревенской простоты и натуральности, но и подчёркивают философию компании — использовать качественные и экологически чистые ингредиенты. Когда покупатель видит упаковку "Ben & Jerry\'s", он сразу понимает, что этот продукт произведён с заботой о природе.'
        }
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'benjerry.webp',
        alt: 'benjerry',
        caption: [
          {
            tag: 'a',
            content: 'Ben & Jerry',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.benjerry.com/' },
          }
        ]
      }
    },
    {
      type: 'gallery',
      maxHeightPx: 2_400,
      images: [
        {
          id: 'NastyaChernish.webp',
          alt: 'NastyaChernish',
          caption: [
            {
              tag: 'a',
              content: 'Настя Черныш',
              props: { className: 's-hoverable' },
            }
          ]
        },
        {
          id: 'ETolsma3.webp',
          alt: 'ETolsma3',
          caption: [
            {
              tag: 'a',
              content: 'E. Tolsma',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/ellistolsma' },
            }
          ]
        },
        {
          id: 'ETolsma4.webp',
          alt: 'ETolsma4',
          caption: [
            {
              tag: 'a',
              content: 'E. Tolsma',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/ellistolsma' },
            }
          ]
        },
        {
          id: 'ETolsma5.webp',
          alt: 'ETolsma5',
          caption: [
            {
              tag: 'a',
              content: 'E. Tolsma',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/ellistolsma' },
            }
          ]
        },
        {
          id: 'ETolsma6.webp',
          alt: 'ETolsma6',
          caption: [
            {
              tag: 'a',
              content: 'E. Tolsma',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/ellistolsma' },
            }
          ]
        },
        {
          id: 'SusannaRumiz4.webp',
          alt: 'SusannaRumiz4',
          caption: [
            {
              tag: 'a',
              content: 'Susanna Rumiz',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/susannarumiz/projects' },
            }
          ]
        },
        {
          id: 'NickLiefhebber2.webp',
          alt: 'NickLiefhebber2',
          caption: [
            {
              tag: 'a',
              content: 'Nick Liefhebber',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/Liefhebber' },
            }
          ]
        },
        {
          id: 'NickLiefhebber8.webp',
          alt: 'NickLiefhebber8',
          caption: [
            {
              tag: 'a',
              content: 'Nick Liefhebber',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/Liefhebber' },
            }
          ]
        },
        {
          id: 'NickLiefhebber6.webp',
          alt: 'NickLiefhebber6',
          caption: [
            {
              tag: 'a',
              content: 'Nick Liefhebber',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/Liefhebber' },
            }
          ]
        },
        {
          id: 'NatashaBayduzha4.webp',
          alt: 'NatashaBayduzha4',
          caption: [
            {
              tag: 'a',
              content: 'Natasha Bayduzha',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/NataBayduzha' },
            }
          ]
        },
        {
          id: 'NatashaBayduzha2.webp',
          alt: 'NatashaBayduzha2',
          caption: [
            {
              tag: 'a',
              content: 'Natasha Bayduzha',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/NataBayduzha' },
            }
          ]
        },
        {
          id: 'AmandaLobos14.webp',
          alt: 'AmandaLobos14',
          caption: [
            {
              tag: 'a',
              content: 'Amanda Lobos',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/maisdeumlobo' },
            }
          ]
        },
        {
          id: 'AsahiNagata7.webp',
          alt: 'AsahiNagata7',
          caption: [
            {
              tag: 'a',
              content: 'Asahi Nagata',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/nagataae6d8' },
            }
          ]
        },
        {
          id: 'IlyaMilstein1.webp',
          alt: 'IlyaMilstein1',
          caption: [
            {
              tag: 'a',
              content: 'Ilya Milstein',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.ilyamilstein.com/' },
            }
          ]
        },
      ]
    },
  ]
}

const lessonDataCI26: ILessonDataDB = {
  id: 'Murals_V2hxRJ',
  courseId: 'commercial-illustrator',
  title: 'Оформление пространств',
  type: 'Theory',
  icon: {
    icon: '/png/3d_emoji_HuggingFace.png',
  },
  topic: 'Иллюстрация как профессия',
  topicOrder: 2,
  topicIcon: 'Lesson',
  orderInTopic: 6,
  duration: {
    unit: 'minutes',
    value: 10
  },
  isFree: true,
  isUnderDevelopment: false,
  content: [
    {
      type: 'text',
      text: 'Му́рал – это изображение, созданное прямо на поверхности стены или потолка. Му́ралы могут быть нарисованы внутри зданий, например, в офисах, школах или ресторанах, а могут украшать фасады домов, стены гаражей и другие наружные поверхности.'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Создают атмосферу. ',
          props: {className: ' bold'}
        },
        {
          tag: 'span',
          content: 'Starbucks любят украшать свои помещения яркими муралами. Один из известных художников, с которым они работали, — Rohan Dahotre. Его работы можно найти по всему миру, и каждая из них уникальна. Например, в Индии он создал огромный мурал с изображением местной флоры и фауны. Этот мурал не только привлекает внимание прохожих, но и создаёт неповторимую атмосферу для посетителей кафе.'
        }
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'RohanDahotre1.webp',
        alt: 'RohanDahotre1',
        caption: [
          {
            tag: 'a',
            content: 'Rohan Dahotre',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/RohanSharadDahotre' },
          }
        ]
      }
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Привлекают внимание. ',
          props: {className: ' bold'}
        },
        {
          tag: 'span',
          content: 'Летний фестиваль в Буэнос-Айресе под названием «Amor de Verano» каждый год устраивает выставки, концерты и мастер-классы. В 2018 году они пригласили художника Себастьяна Кури, чтобы он создал для них особый образ. Вместе со своей командой Себастьян нарисовал огромную фреску, которая покрыла весь фасад здания. Эти иллюстрации должны были привлечь внимание к фестивалю и создать атмосферу юной, наивной влюбленности.'
        }
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'SebastianCuri1.webp',
        alt: 'SebastianCuri1',
        caption: [
          {
            tag: 'a',
            content: 'Sebastian Curi',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/sebastiancuri' },
          }
        ]
      }
    },
    {
      type: 'gallery',
      maxHeightPx: 1_550,
      images: [
        {
          id: 'ETolsma1.webp',
          alt: 'ETolsma1',
          caption: [
            {
              tag: 'a',
              content: 'E. Tolsma',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/ellistolsma' },
            }
          ]
        },
        {
          id: 'NickLiefhebber4.webp',
          alt: 'NickLiefhebber4',
          caption: [
            {
              tag: 'a',
              content: 'Nick Liefhebber',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/Liefhebber' },
            }
          ]
        },
        {
          id: 'NatashaBayduzha1.webp',
          alt: 'NatashaBayduzha1',
          caption: [
            {
              tag: 'a',
              content: 'Natasha Bayduzha',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/NataBayduzha' },
            }
          ]
        },
        {
          id: 'RohanDahotre2.webp',
          alt: 'RohanDahotre2',
          caption: [
            {
              tag: 'a',
              content: 'Rohan Dahotre',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/RohanSharadDahotre' },
            }
          ]
        },
        {
          id: 'StudioZwupp6.webp',
          alt: 'StudioZwupp6',
          caption: [
            {
              tag: 'a',
              content: 'Studio Zwupp',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/zwupp' },
            }
          ]
        },
        {
          id: 'StudioZwupp7.webp',
          alt: 'StudioZwupp7',
          caption: [
            {
              tag: 'a',
              content: 'Studio Zwupp',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/zwupp' },
            }
          ]
        },
        {
          id: 'okchizh6.webp',
          alt: 'okchizh6',
          caption: [
            {
              tag: 'a',
              content: 'Юля Чиж',
              props: { className: 's-hoverable', target: "_blank", to: 'https://okchizh.art/' },
            }
          ]
        },
        {
          id: 'okchizh5.webp',
          alt: 'okchizh5',
          caption: [
            {
              tag: 'a',
              content: 'Юля Чиж',
              props: { className: 's-hoverable', target: "_blank", to: 'https://okchizh.art/' },
            }
          ]
        },
      ]
    },
  ]
}

const lessonDataCI27: ILessonDataDB = {
  id: 'Editorial_K8Bu8i',
  courseId: 'commercial-illustrator',
  title: 'Книги и журналы',
  type: 'Theory',
  icon: {
    icon: '/png/3d_emoji_HuggingFace.png',
  },
  topic: 'Иллюстрация как профессия',
  topicOrder: 2,
  topicIcon: 'Lesson',
  orderInTopic: 7,
  duration: {
    unit: 'minutes',
    value: 10
  },
  isFree: true,
  isUnderDevelopment: false,
  content: [
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Привлекают внимание. ',
          props: {className: ' bold'}
        },
        {
          tag: 'span',
          content: 'Например, обложка книги «Там гораздо лучше», Виолен Беро — арт-объект, который сначала цепляет формой, а потом содержанием.'
        }
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'polyandria4.webp',
        alt: 'polyandria4',
        caption: [
          {
            tag: 'a',
            content: 'Поляндрия',
            props: { className: 's-hoverable', target: "_blank", to: 'https://polyandria.ru/noage/' },
          }
        ]
      }
    },
    {
      type: 'text',
      text: [
        {
          tag: 'span',
          content: 'Помогают создать имидж книги и издательства. ',
          props: {className: ' bold'}
        },
        {
          tag: 'span',
          content: 'Иллюстрации на обложках книг делают их особенными и легко узнаваемыми. Например, книги серии NoAge x Есть смысл, сделанные вместе с издательством «Есть смысл», объединены в концептуальную серию. Благодаря этому их сразу можно заметить на полке и отличить от других книг NoAge. У этих книг мягкая обложка с клапанами, которые закрывают лицевую сторону и название книги. Штрихкод растянут от лицевой сторонки до края задней, что нарушает ожидание читателя.'
        }
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'polyandria3.webp',
        alt: 'polyandria3',
        caption: [
          {
            tag: 'a',
            content: 'Поляндрия',
            props: { className: 's-hoverable', target: "_blank", to: 'https://polyandria.ru/noage/' },
          }
        ]
      }
    },
    {
      type: 'gallery',
      maxHeightPx: 2_600,
      images: [
        {
          id: 'aplusabooks2.webp',
          alt: 'aplusabooks2',
          caption: [
            {
              tag: 'a',
              content: 'А + А',
              props: { className: 's-hoverable', target: "_blank", to: 'https://aplusabooks.ru/' },
            }
          ]
        },
        {
          id: 'aplusabooks1.webp',
          alt: 'aplusabooks1',
          caption: [
            {
              tag: 'a',
              content: 'А + А',
              props: { className: 's-hoverable', target: "_blank", to: 'https://aplusabooks.ru/' },
            }
          ]
        },
        {
          id: 'samokatbook1.webp',
          alt: 'samokatbook1',
          caption: [
            {
              tag: 'a',
              content: 'Самокат',
              props: { className: 's-hoverable', target: "_blank", to: 'https://samokatbook.ru/' },
            }
          ]
        },
        {
          id: 'samokatbook2.webp',
          alt: 'samokatbook2',
          caption: [
            {
              tag: 'a',
              content: 'Самокат',
              props: { className: 's-hoverable', target: "_blank", to: 'https://samokatbook.ru/' },
            }
          ]
        },
        {
          id: 'samokatbook3.webp',
          alt: 'samokatbook3',
          caption: [
            {
              tag: 'a',
              content: 'Самокат',
              props: { className: 's-hoverable', target: "_blank", to: 'https://samokatbook.ru/' },
            }
          ]
        },
        {
          id: 'polyandria3.webp',
          alt: 'polyandria3',
          caption: [
            {
              tag: 'a',
              content: 'Поляндрия',
              props: { className: 's-hoverable', target: "_blank", to: 'https://polyandria.ru/noage/' },
            }
          ]
        },
        {
          id: 'polyandria1.webp',
          alt: 'polyandria1',
          caption: [
            {
              tag: 'a',
              content: 'Поляндрия',
              props: { className: 's-hoverable', target: "_blank", to: 'https://polyandria.ru/noage/' },
            }
          ]
        },
        {
          id: 'polyandria.webp',
          alt: 'polyandria',
          caption: [
            {
              tag: 'a',
              content: 'Поляндрия',
              props: { className: 's-hoverable', target: "_blank", to: 'https://polyandria.ru/noage/' },
            }
          ]
        },
        {
          id: 'AmandaLobos13.webp',
          alt: 'AmandaLobos13',
          caption: [
            {
              tag: 'a',
              content: 'Amanda Lobos',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/maisdeumlobo' },
            }
          ]
        },
        {
          id: 'bayduzha6.webp',
          alt: 'bayduzha6',
          caption: [
            {
              tag: 'a',
              content: 'Наташа Байдужа',
              props: { className: 's-hoverable', target: "_blank", to: 'http://bayduzha.com/' },
            }
          ]
        },
        {
          id: 'polyandria.no.age2.webp',
          alt: 'polyandria.no.age2',
          caption: [
            {
              tag: 'a',
              content: 'Polyandria NoAge',
              props: { className: 's-hoverable', target: "_blank", to: 'https://polyandria.ru/noage/?fbclid=PAZXh0bgNhZW0CMTEAAabAi9e6KyC7CAY-L2drZK5r471d00tMEufQpVFfQC-qVHTJY-cOJBfRyL4_aem_ZmFrZWR1bW15MTZieXRlcw' },
            }
          ]
        },
        {
          id: 'ta_boris.webp',
          alt: 'ta_boris',
          caption: [
            {
              tag: 'a',
              content: 'Таня Борисова',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/ta_boris/' },
            }
          ]
        },
      ]
    },
  ]
}

const lessonDataCI28: ILessonDataDB = {
  id: 'CommercialIllustratorSummary_CV9ZUs',
  courseId: 'commercial-illustrator',
  title: 'Итоги модуля',
  type: 'Theory',
  icon: {
    icon: '/png/3d_emoji_HuggingFace.png',
  },
  topic: 'Иллюстрация как профессия',
  topicOrder: 2,
  topicIcon: 'Lesson',
  orderInTopic: 8,
  duration: {
    unit: 'minutes',
    value: 5
  },
  isFree: true,
  isUnderDevelopment: false,
  content: [

  ]
}

export const allLessons = [
  lessonData11,
  lessonData12,
  lessonData13,
  lessonData21,
  lessonData22,
  lessonData23,
  lessonData24,
  lessonData25,
  lessonData26,
  lessonData31,
  lessonData32,
  lessonData33,
  lessonData34,
  lessonData35,
  lessonData41,
  lessonData42,
  lessonData43,
  lessonDataFYS11,
  lessonDataFYS12,
  lessonDataFYS13,
  lessonDataFYS21,
  lessonDataFYS22,
  lessonDataFYS23,
  lessonDataFYS31,
  lessonDataFYS32,
  lessonDataFYS33,
  lessonDataFYS34,
  lessonDataFYS41,
  lessonDataFYS42,
  lessonDataFYS43,
  lessonDataFYS44,
  lessonDataFYS45,
  lessonDataFYS46,
  lessonDataFYS47,
  lessonDataFYS51,
];
