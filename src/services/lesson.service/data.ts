import { text } from 'stream/consumers';
import type { IFetchLessonsProps, ILessonDataDB } from './types';

export function getData(filter: Partial<IFetchLessonsProps>) {
  return allLessons
    .filter(l => filter.courseId ? l.courseId === filter.courseId : true)
    .filter(l => filter.id ? l.id === filter.id : true)
    .filter(l => filter.topic ? l.topic === filter.topic : true)
    .filter(l => filter.topicOrder ? l.topicOrder === filter.topicOrder : true)
    .filter(l => filter.orderInTopic ? l.orderInTopic === filter.orderInTopic : true);
}

const lessonData11: ILessonDataDB = {
  id: 'About_3QFOpt',
  courseId: 'how-to-draw',
  title: 'Привет!',
  type: 'Theory',
  topic: 'Как устроено обучение',
  topicOrder: 1,
  orderInTopic: 1,
  duration: {
    unit: 'minutes',
    value: 5
  },
  isFree: true,
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
                content: 'Добро пожаловать в бесплатный блок.  Меня зовут Соня, я иллюстратор и автор обучающих программ в flearn.'
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
          {
            showThisBlockButtonContent: 'Супер) Расскажи, что меня ждет в бесплатном блоке.',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Супер) Расскажи, что меня ждет в бесплатном блоке.'
              }
            ],
          },
        ]
      }
    },
    // {
    //   type: 'quiz',
    //   steps: [
    //     {
    //       type: 'SELECT',
    //       variant: 'RADIO',
    //       title: 'Can fish fly?',
    //       options: [
    //         {
    //           value: 'Yes',
    //           shouldBeSelected: false,
    //           negativeExplanation: 'Are you dumb???',
    //         },
    //         {
    //           value: 'No',
    //           shouldBeSelected: true,
    //           positiveExplanation: 'Good job!',
    //           negativeExplanation: 'Are you dumb???',
    //         },
    //         {
    //           value: 'Some can',
    //           shouldBeSelected: false,
    //           negativeExplanation: 'Are you dumb???',
    //         },
    //       ],
    //     },
    //   ],
    // },
    {
      type: 'title',
      title: 'Бесплатный вводный курс'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'В бесплатной части вы познакомитесь с форматом обучения и попробуете самостоятельно нарисовать иллюстрацию для рекламного баннера.',
        },
        {
          tag: 'p',
          content: 'Баннер — отличная проверка того, умеет ли иллюстратор управлять вниманием пользователя, ведь условия его существования — дефицит этого самого внимания.'
        },
        {
          tag: 'p',
          content: 'В конце вводной части вы можете выполнить самостоятельный проект и получить по нему обратную связь — совсем как на платном курсе. Но бесплатно.'
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
            showThisBlockButtonContent: 'Постой, то есть в бесплатном блоке будет обратная связь?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Постой, то есть в бесплатном блоке будет обратная связь?'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Да, все так. В конце бесплатного модуля вы сможете сдать на проверку свой самостоятельный проект и получить обратную связь от меня)'
              },
            ],
          },
        ]
      }
    },
    {
      type: 'title',
      title: 'Платный курс'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Если понравится, можно прийти на платный курс: «Композиция: как выделить главное». Курс спроектирован так, чтобы учиться было интересно как совсем новичкам, так и тем, кто уже пробует себя в иллюстрации.'
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
              content: 'Кстати, мы рассказываем про обучение в не только в учебнике. У нас есть '
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
  id: 'AboutProgram_ITUg9y',
  courseId: 'how-to-draw',
  title: 'Подробнее о платной программе',
  type: 'Theory',
  topic: 'Как устроено обучение',
  topicOrder: 1,
  orderInTopic: 2,
  duration: {
    unit: 'minutes',
    value: 5
  },
  isFree: true,
  content: [
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Если коротко, обучение в flearn — это 10-15 минут в день, много практических заданий и живой обратной связи. Вот что предстоит делать на курсе:'
        }
      ]
    },
    {
      type: 'list',
      items: [
        'самостоятельно осваивать теорию в учебнике;',
        'выполнять мини-проекты и сдавать финальные задания на проверку;',
        'получать персональную и бережную обратную связь от ревьюера и вносить правки.'
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Чтобы было понятнее, чем большие платные программы отличаются от вводного курса, мы нарисовали эту схему:'
        }
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'Comparison.png',
        alt: 'Comparison',
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
            showThisBlockButtonContent: 'Что значит «учебник»? Придётся много читать?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Что значит «учебник»? Придётся много читать?'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Не совсем. В учебнике можно проходить квизы, выполнять мини-проекты для отработки навыков и расширять кругозор в игровом формате.'
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
                content: 'Я вместе с другими экспертами из индустрии. Мы постоянно обновляем и дополняем его с учётом актуальных трендов в иллюстрации.'
              },
            ],
          },
          {
            showThisBlockButtonContent: 'С учебником — понятно) Расскажи про тарифы. Я правильно понимаю, что можно учиться "самостоятельно" или "с обратной связью"?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'С учебником — понятно) Расскажи про тарифы. Я правильно понимаю, что можно учиться "самостоятельно" или "с обратной связью"?'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Да, все так.'
              },
            ],
          },
          {
            showThisBlockButtonContent: 'То есть, если я выберу учиться самостоятельно, я буду учиться совсем один?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'То есть, если я выберу учиться самостоятельно, я буду учиться совсем один?'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Мы не оставим вас с теорией и практикой один на один.'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Вместе с учебником вы получите доступ в чат студентов школы — телеграм-чат, где можно общаться с сокурсниками, обсуждать проекты и теорию, делиться интересными материалами, помогать друг другу советами.'
              },
            ]
          },
          {
            showThisBlockButtonContent: 'Звучит неплохо) А если в процессе я пойму, что мне не хватает обратной связи, можно будет поменять тариф?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Звучит неплохо) А если в процессе я пойму, что мне не хватает обратной связи, можно будет поменять тариф?'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Да, конечно) Если захотите сменить тариф, напишите об этом куратору программы. В следующем уроке как раз расскажу, кто такой куратор и как с ним связаться)'
              },
            ],
          },
        ]
      }
    },
  ],
  survey: {
    0: {
      type: 'SELECT',
      variant: 'CARD',
      subtitle: 'Хотим зафиксировать цель, с которой вы проходите вводную часть. А в конце спросим, получилось ли её достичь.',
      description: 'Выберите цель:',
      options: [
        {
          title: 'Пройти и оплатить',
          subtitle: 'Подготовиться к стартру курса',
        },
        {
          title: 'Попробовать формат',
          subtitle: 'Понять, понравится ли мне учеба в flearn',
        },
        {
          title: 'Пройти только вводную часть',
          subtitle: 'Бесплатно научиться чему-нибудь новому',
        },
      ],
    },
  }
}

const lessonData13: ILessonDataDB = {
  id: 'SupportTeam_voQiUx',
  courseId: 'how-to-draw',
  title: 'Команда сопровождения',
  type: 'Theory',
  topic: 'Как устроено обучение',
  topicOrder: 1,
  orderInTopic: 3,
  duration: {
    unit: 'minutes',
    value: 5
  },
  isFree: true,
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
                content: 'На прошлом уроке я уже упомянула, что на платном курсе есть куратор. Сейчас расскажу кто это и чем отличается от ревьюера.'
              },
            ],
          },
          {
            showThisBlockButtonContent: 'Ага, рассказывай)',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Ага, рассказывай)'
              },
            ],
          },
        ]
      }
    },
    {
      type: 'title',
      title: 'Куратор'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Куратор — первый, с кем вы познакомитесь на платном курсе. Он ещё раз расскажет, как устроено обучение и добавит вас во все нужные каналы.'
        },
        {
          tag: 'p',
          content: 'Куратор знает обо всём, что касается процесса обучения. Поможет решить проблемы со входом в личный кабинет, подскажет, что делать, если проект принят, а прочитать комментарии ревьюера не выходит.'
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
            showThisBlockButtonContent: 'А где мы будем общаться?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'А где мы будем общаться?'
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
            showThisBlockButtonContent: 'Понятно) Если ничего не успеваешь — иди к куратору) А если у меня будут вопросы по заданию? Кому писать?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Понятно) Если ничего не успеваешь — иди к куратору) А если у меня будут вопросы по заданию? К кому обратиться?'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Вопросы по заданиям — это к ревьюеру. Сейчас расскажу о нем подробнее.'
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
          content: [
            {
              tag: 'span',
              content: ' Первые рекомендации вы получите уже в конце бесплатного блока, ',
              props: {className: ' bold'}
            },
            {
              tag: 'span',
              content: 'когда отправите на проверку финальное задание.',
            }
          ]
        },
        {
          tag: 'p',
          content: 'Команда сопровождения будет с вами в течение всего обучения, её задача — поддерживать вас и помогать. Вы сможете задать любой вопрос по программе или просто поделиться переживаниями. '
        },
      ]
    }
  ],
  survey: {
    0: {
      type: 'SELECT',
      variant: 'RADIO',
      subtitle: 'А сейчас у нас к вам пара вопросов — и сразу продолжим. Вопросы займут 1–2 минуты.',
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

const lessonData14: ILessonDataDB = {
  id: 'FAQ_Xs0Qb5',
  courseId: 'how-to-draw',
  title: 'Частые вопросы и ответы на них',
  type: 'Theory',
  topic: 'Как устроено обучение',
  topicOrder: 1,
  orderInTopic: 4,
  duration: {
    unit: 'minutes',
    value: 5
  },
  isFree: true,
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
            showThisBlockButtonContent: 'А что если я не справлюсь с нагрузкой?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'А что если я не справлюсь с нагрузкой?'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Курс построен так, чтобы у вас хватало времени на изучение материала: учебная программа делится на завершённые отрезки — модули, которые длятся 1-2 недели.'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Но если вы поймете, что нужно сделать паузу или требуется дополнительное время для закрепления материала, можно написать куратору и продолжить обучение со следующей группой. В этом нет ничего страшного.'
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
            showThisBlockButtonContent: 'Что входит в стоимость платной программы?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Что входит в стоимость платной программы?'
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
              content: 'В курс входят'
            },
            {
              tag: 'span',
              content: ' уроки и практические задания ',
              props: {className: ' bold'}
            },
            {
              tag: 'span',
              content: '— всё, что поможет усвоить знания на практике. За каждым курсом стоит большая команда, которая следит за качеством материалов и постоянно их дополняет.'
            }
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'В стоимость курса входит'
            },
            {
              tag: 'span',
              content: ' работа команды сопровождения. ',
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
              content: 'Кроме того, в стоимость курса входит'
            },
            {
              tag: 'span',
              content: ' бессрочное использование интерактивного учебника. ',
              props: {className:' bold'}
            },
            {
              tag: 'span',
              content: 'Мы следим за трендами в индустрии и постоянно его обновляем.'
            }
          ],
        }
      ]
    },
    {
      type: 'button',
      handlerId: 'open-buy-source-popup',
      content: 'Купить полный курс',
    },
    {
      type: 'title',
      title: 'Что дальше?'
    },
    {
      type: 'image',
      imageData: {
        id: 'IntroSteps.png',
        alt: 'IntroSteps',
      }
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Вот дорога, по которой мы предлагаем отправиться дальше. На примере баннера вы освоите ключевые навыки, без которых иллюстратору никуда: работу с мудбордом, композицией и цветом. А затем сможете определиться, хотите ли продолжить обучение на платном курсе.'
        },
        {
          tag: 'p',
          content: 'А пока всё. Знакомство с процессом обучения в flearn завершено! Мы будем поэтапно погружать вас в мир иллюстрации. Поехали!'
        },
      ]
    },
  ]
}

const lessonData32: ILessonDataDB = {
  id: 'WorkSteps_fawKxs',
  courseId: 'how-to-draw',
  title: 'Этапы работы над иллюстрацией',
  type: 'Theory',
  topic: 'Рисуем иллюстрацию для баннера',
  topicOrder: 3,
  orderInTopic: 2,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: true,
  content: [
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'В прошлом уроке мы рассказали, в каких сферах применяется иллюстрация. Самое время погрузиться в работу иллюстратора и узнать, как устроен этот процесс.  Иллюстратор работает над задачей в несколько этапов:',
        }
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'AllSteps.png',
        alt: 'Steps',
      }
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'В следующих уроках мы подробно изучим каждый этап и поможем выполнить финальное заданием. Задание можно отправить на проверку. Ревьюер оставит комментарии, по которым вы сможете доработать иллюстрацию и положить её в портфолио.',
        }
      ]
    },
  ]
}

const lessonData41: ILessonDataDB = {
  id: 'DrawingExercises_h3dx7k',
  courseId: 'how-to-draw',
  title: 'Упражнения, чтобы разрисоваться',
  type: 'Theory',
  topic: 'Линия',
  topicOrder: 4,
  orderInTopic: 1,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
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

const lessonData42: ILessonDataDB = {
  id: 'LineIntroduction_gBpaFa',
  courseId: 'how-to-draw',
  title: 'Линия: знакомство',
  type: 'Theory',
  topic: 'Линия',
  topicOrder: 4,
  orderInTopic: 2,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
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

const lessonData43: ILessonDataDB = {
  id: 'LineShape_RY7PQ3',
  courseId: 'how-to-draw',
  title: 'Линия: как рисовать объемно',
  type: 'Theory',
  topic: 'Линия',
  topicOrder: 4,
  orderInTopic: 3,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
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

const lessonData44: ILessonDataDB = {
  id: 'HowToDrawSimilarPicture_bah4tw',
  courseId: 'how-to-draw',
  title: 'Как рисовать похоже',
  type: 'Theory',
  topic: 'Линия',
  topicOrder: 4,
  orderInTopic: 4,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
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

const lessonData45: ILessonDataDB = {
  id: 'HowToDrawSimilarPictureLine_t6qrnq',
  courseId: 'how-to-draw',
  title: 'Как рисовать похоже. Линия',
  type: 'Theory',
  topic: 'Линия',
  topicOrder: 4,
  orderInTopic: 5,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
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

const lessonData46: ILessonDataDB = {
  id: 'StudyProcess_Omtryq',
  courseId: 'how-to-draw',
  title: 'Процесс обучения',
  type: 'Theory',
  topic: 'Линия',
  topicOrder: 4,
  orderInTopic: 6,
  duration: {
    unit: 'minutes',
    value: 5
  },
  isFree: false,
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
                content: 'Cтолкнуться с трудностями, особенно в первые недели обучения, — это нормально.'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Давайте попробуем разобраться, что может с этим помочь.'
              },
            ],
          },
          {
            showThisBlockButtonContent: 'А давай!',
            messages: [
              {
                sender: { isSelf: true },
                content: 'А давай!'
              },

            ],
          },
        ]
      }
    },
    {
      type: 'title',
      title: 'Учитесь так, как хочется'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'У каждого из нас свой уникальный опыт, свои ожидания от обучения и свои цели относительно рисования. Есть силы только на то, чтобы посмотреть учебник — отлично, значит сейчас этого достаточно.'
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
            showThisBlockButtonContent: 'Подожди, а как же «регулярная практика», «много повторений». Разве это не обязательно?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Подожди, а как же «регулярная практика», «много повторений». Разве это не обязательно?'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Регулярная практика и повторения — это отлично. Но фишка в том, что тренировать можно миллион разных вещей. Да еще и в разных последовательностях.'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Поэтому прислушивайтесь к себе. Задавайте вопросы. И выбирайте то, что вам нужно.'
              },
            ],
          },
        ]
      }
    },
    {
      type: 'title',
      title: 'Беспокойтесь о количестве, а не качестве'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Над одной работой слишком много трясешься, боишься исправлять, принимать радикальные решения. В большинстве случаев полезнее сделать следующий рисунок, чем сидеть и думать, как улучшить старый.'
        },
        {
          tag: 'p',
          content: 'Когда работа одна, ее легко испортить. Когда работ 10, среди них можно выбрать.'
        }
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
            showThisBlockButtonContent: 'Да я и одну-то работу рисую 1-2 недели. Как успеть сделать 10?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Да я и одну-то работу еле могу нарисовать. Как успеть сделать 10?'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Переход от 2 рисунков к 10 действительно непростой. Возможно, что-то придется изменить. Рисовать эскизы размером 2х2 см, использовать 3 цвета вместо 6, взять другие материалы.'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Но в итоге, все это развяжет нам руки. И у нас появится способ быстро перебирать разные идеи, находить нестандартные решения.'
              },
            ],
          },
        ]
      }
    },
    {
      type: 'title',
      title: 'Мыслите серией'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Одна удачная работа может быть случайностью. 5 удачных работ — признак того, что автор умело использует визуальное решение.'
        },
        {
          tag: 'p',
          content: 'Когда вы нашли удачный прием, попробуйте повторить его еще в 4-5 рисунках. Изучайте возможности этого приема: выкручивайте его на максимум, наоборот, приглушайте.'
        }
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
            showThisBlockButtonContent: 'Постой, а что такое серия?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Постой, а что такое серия?'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Серия — группа работ, объединенных интонацией, средствами выразительности, форматом, материалом.'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Рисунки внутри серии должны быть достаточно похожими, чтобы их можно было объединить в группу.'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Рисунки должны отличаться между собой, чтобы серию было интересно разглядывать, изучать.'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Если пойдете на платную программу, то мы подробно разберем эту тему)'
              },
            ],
          },
        ]
      }
    },
    {
      type: 'title',
      title: 'Задавайте вопросы'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Мы лучше понимаем то, что можем сформулировать. Поэтому верно заданный вопрос — половина успеха. Сразу после того, как появилась мысль — “не получилось”. Задайте вопросы — что я делала? Чего я хотела? Как я планировала этого достичь? В какой момент рисунок перестал работать?'
        },
      ]
    },
    {
      type: 'title',
      title: 'Может, что-то ещё?'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Если у вас есть вопросы по организации обучения, вы можете задать их куратору.'
        },
        {
          tag: 'p',
          content: 'Чем может помочь куратор:'
        }
      ]
    },
    {
      type: 'list',
      items: [
        'Расскажет о профессии и программе обучения.',
        'Опишет учебный процесс и ответит на все вопросы.',
        'Вместе с вами рассчитает нагрузку и оценит, подойдет ли для вас этот курс.'
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
              content: 'Если хотите поговорить с куратором, напишите нам '
            },
            {
              tag: 'a',
              content: 'в телеграм.',
              props: { className: 'key-link', target: "_blank", to: 'https://t.me/ulianova_sofia' },
            },
          ]
        }
      ]
    }
  ]
}

const lessonData51: ILessonDataDB = {
  id: 'HowToDrawSimilarPictureLine_t6qrnq_Practice_iqln35',
  courseId: 'how-to-draw',
  title: 'Практика первой недели',
  type: 'Practice',
  topic: 'Линия: Практика',
  topicOrder: 5,
  orderInTopic: 1,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
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

const lessonData61: ILessonDataDB = {
  id: 'DifferencesLineSpot_W4baHU',
  courseId: 'how-to-draw',
  title: 'Про разницу между линией и пятном',
  type: 'Theory',
  topic: 'Пятно',
  topicOrder: 6,
  orderInTopic: 1,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
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

const lessonData62: ILessonDataDB = {
  id: 'SpotIntroduction_R4vzDr',
  courseId: 'how-to-draw',
  title: 'Пятно: знакомство',
  type: 'Theory',
  topic: 'Пятно',
  topicOrder: 6,
  orderInTopic: 2,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
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

const lessonData63: ILessonDataDB = {
  id: 'HowToDrawSimilarPictureSpot_p6hXtt',
  courseId: 'how-to-draw',
  title: 'Как рисовать похоже. Пятно',
  type: 'Theory',
  topic: 'Пятно',
  topicOrder: 6,
  orderInTopic: 3,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
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

const lessonData64: ILessonDataDB = {
  id: 'SpotShape_dftUrH',
  courseId: 'how-to-draw',
  title: 'Как рисовать объемно. Пятно',
  type: 'Theory',
  topic: 'Пятно',
  topicOrder: 6,
  orderInTopic: 4,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
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

const lessonData71: ILessonDataDB = {
  id: 'SpotPractice_kfKAEY',
  courseId: 'how-to-draw',
  title: 'Практика второй недели',
  type: 'Practice',
  topic: 'Пятно: Практика',
  topicOrder: 7,
  orderInTopic: 1,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
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

const lessonData81: ILessonDataDB = {
  id: 'LineAndSpot_jr2WYu',
  courseId: 'how-to-draw',
  title: 'Линия и пятно: как совмещать',
  type: 'Theory',
  topic: 'Линия и пятно',
  topicOrder: 8,
  orderInTopic: 1,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
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

const lessonData82: ILessonDataDB = {
  id: 'ContrastNuance_9rP6Yl',
  courseId: 'how-to-draw',
  title: 'Как выделить главное: контраст, нюанс',
  type: 'Theory',
  topic: 'Линия и пятно',
  topicOrder: 8,
  orderInTopic: 2,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
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

const lessonData91: ILessonDataDB = {
  id: 'LineSpotPractice_L8A8Jk',
  courseId: 'how-to-draw',
  title: 'Практика третьей недели',
  type: 'Practice',
  topic: 'Линия и пятно: Практика',
  topicOrder: 9,
  orderInTopic: 1,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
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
  id: 'About_3v4PD7',
  courseId: 'finding-your-style',
  title: 'Привет!',
  type: 'Theory',
  topic: 'Как устроено обучение',
  topicOrder: 1,
  orderInTopic: 1,
  duration: {
    unit: 'minutes',
    value: 5
  },
  isFree: true,
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
                content: 'Добро пожаловать в бесплатный блок.  Меня зовут Соня, я иллюстратор и автор обучающих программ в flearn.'
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
          {
            showThisBlockButtonContent: 'Супер) Расскажи, что меня ждет в бесплатном блоке.',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Супер) Расскажи, что меня ждет в бесплатном блоке.'
              }
            ],
          },
        ]
      }
    },
    {
      type: 'title',
      title: 'Бесплатный вводный курс'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Вводный курс — это возможность прожить один день из жизни иллюстратора. Вы узнаете, как он рассуждает и какие задачи решает, а ещё — познакомитесь с форматом обучения в flearn.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Платный курс'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Если понравится, можно прийти на платный курс: «Как найти стиль». Курс спроектирован так, чтобы учиться было интересно как совсем новичкам, так и тем, кто уже пробует себя в иллюстрации.'
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
              content: 'Кстати, мы рассказываем про обучение в не только в учебнике. У нас есть '
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
  id: 'AboutProgram_8S9m4K',
  courseId: 'finding-your-style',
  title: 'Подробнее о платной программе',
  type: 'Theory',
  topic: 'Как устроено обучение',
  topicOrder: 1,
  orderInTopic: 2,
  duration: {
    unit: 'minutes',
    value: 5
  },
  isFree: true,
  content: [
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Если коротко, обучение в flearn — это 10-15 минут в день, много практических заданий и живой обратной связи. Вот что предстоит делать на курсе:'
        }
      ]
    },
    {
      type: 'list',
      items: [
        'самостоятельно осваивать теорию в учебнике;',
        'выполнять мини-проекты и сдавать финальные задания на проверку;',
        'получать персональную и бережную обратную связь от ревьюера и вносить правки.'
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Чтобы было понятнее, чем большие платные программы отличаются от вводного курса, мы нарисовали эту схему:'
        }
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'Comparison.png',
        alt: 'Comparison',
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
            showThisBlockButtonContent: 'Что значит «учебник»? Придётся много читать?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Что значит «учебник»? Придётся много читать?'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Не совсем. В учебнике можно проходить квизы, выполнять мини-проекты для отработки навыков и расширять кругозор в игровом формате.'
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
                content: 'Я вместе с другими экспертами из индустрии. Мы постоянно обновляем и дополняем его с учётом актуальных трендов в иллюстрации.'
              },
            ],
          },
          {
            showThisBlockButtonContent: 'С учебником — понятно) Расскажи про тарифы. Я правильно понимаю, что можно учиться "самостоятельно" или "с обратной связью"?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'С учебником — понятно) Расскажи про тарифы. Я правильно понимаю, что можно учиться "самостоятельно" или "с обратной связью"?'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Да, все так.'
              },
            ],
          },
          {
            showThisBlockButtonContent: 'То есть, если я выберу учиться самостоятельно, я буду учиться совсем один?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'То есть, если я выберу учиться самостоятельно, я буду учиться совсем один?'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Мы не оставим вас с теорией и практикой один на один.'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Вместе с учебником вы получите доступ в чат студентов школы — телеграм-чат, где можно общаться с сокурсниками, обсуждать проекты и теорию, делиться интересными материалами, помогать друг другу советами.'
              },
            ]
          },
          {
            showThisBlockButtonContent: 'Звучит неплохо) А если в процессе я пойму, что мне не хватает обратной связи, можно будет поменять тариф?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Звучит неплохо) А если в процессе я пойму, что мне не хватает обратной связи, можно будет поменять тариф?'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Да, конечно) Если захотите сменить тариф, напишите об этом куратору программы. В следующем уроке как раз расскажу, кто такой куратор и как с ним связаться)'
              },
            ],
          },
        ]
      }
    },
  ],
  survey: {
    0: {
      type: 'SELECT',
      variant: 'CARD',
      subtitle: 'Хотим зафиксировать цель, с которой вы проходите вводную часть. А в конце спросим, получилось ли её достичь.',
      description: 'Выберите цель:',
      options: [
        {
          title: 'Пройти и оплатить',
          subtitle: 'Подготовиться к стартру курса',
        },
        {
          title: 'Попробовать формат',
          subtitle: 'Понять, понравится ли мне учеба в flearn',
        },
        {
          title: 'Пройти только вводную часть',
          subtitle: 'Бесплатно научиться чему-нибудь новому',
        },
      ],
    },
  }
}

const lessonDataFYS13: ILessonDataDB = {
  id: 'SupportTeam_xHG827',
  courseId: 'finding-your-style',
  title: 'Команда сопровождения',
  type: 'Theory',
  topic: 'Как устроено обучение',
  topicOrder: 1,
  orderInTopic: 3,
  duration: {
    unit: 'minutes',
    value: 5
  },
  isFree: true,
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
                content: 'На прошлом уроке я уже упомянула, что на платном курсе есть куратор. Сейчас расскажу кто это и чем отличается от ревьюера.'
              },
            ],
          },
          {
            showThisBlockButtonContent: 'Ага, рассказывай)',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Ага, рассказывай)'
              },
            ],
          },
        ]
      }
    },
    {
      type: 'title',
      title: 'Куратор'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Куратор — первый, с кем вы познакомитесь на платном курсе. Он ещё раз расскажет, как устроено обучение и добавит вас во все нужные каналы.'
        },
        {
          tag: 'p',
          content: 'Куратор знает обо всём, что касается процесса обучения. Поможет решить проблемы со входом в личный кабинет, подскажет, что делать, если проект принят, а прочитать комментарии ревьюера не выходит.'
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
            showThisBlockButtonContent: 'А где мы будем общаться?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'А где мы будем общаться?'
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
            showThisBlockButtonContent: 'Понятно) Если ничего не успеваешь — иди к куратору) А если у меня будут вопросы по заданию? Кому писать?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Понятно) Если ничего не успеваешь — иди к куратору) А если у меня будут вопросы по заданию? К кому обратиться?'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Вопросы по заданиям — это к ревьюеру. Сейчас расскажу о нем подробнее.'
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
          content: [
            {
              tag: 'span',
              content: ' Первые рекомендации вы получите уже в конце бесплатного блока, ',
              props: {className: ' bold'}
            },
            {
              tag: 'span',
              content: 'когда отправите на проверку финальное задание.',
            }
          ]
        },
        {
          tag: 'p',
          content: 'Команда сопровождения будет с вами в течение всего обучения, её задача — поддерживать вас и помогать. Вы сможете задать любой вопрос по программе или просто поделиться переживаниями. '
        },
      ]
    }
  ],
  survey: {
    0: {
      type: 'SELECT',
      variant: 'RADIO',
      subtitle: 'А сейчас у нас к вам пара вопросов — и сразу продолжим. Вопросы займут 1–2 минуты.',
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

const lessonDataFYS14: ILessonDataDB = {
  id: 'FAQ_MaijCs',
  courseId: 'finding-your-style',
  title: 'Частые вопросы и ответы на них',
  type: 'Theory',
  topic: 'Как устроено обучение',
  topicOrder: 1,
  orderInTopic: 4,
  duration: {
    unit: 'minutes',
    value: 5
  },
  isFree: true,
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
            showThisBlockButtonContent: 'А что если я не справлюсь с нагрузкой?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'А что если я не справлюсь с нагрузкой?'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Курс построен так, чтобы у вас хватало времени на изучение материала: учебная программа делится на завершённые отрезки — модули, которые длятся 1-2 недели.'
              },
              {
                sender: { name: 'Соня Ульянова', isSelf: false },
                content: 'Но если вы поймете, что нужно сделать паузу или требуется дополнительное время для закрепления материала, можно написать куратору и продолжить обучение со следующей группой. В этом нет ничего страшного.'
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
            showThisBlockButtonContent: 'Что входит в стоимость платной программы?',
            messages: [
              {
                sender: { isSelf: true },
                content: 'Что входит в стоимость платной программы?'
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
              content: 'В курс входят'
            },
            {
              tag: 'span',
              content: ' уроки и практические задания ',
              props: {className: ' bold'}
            },
            {
              tag: 'span',
              content: '— всё, что поможет усвоить знания на практике. За каждым курсом стоит большая команда, которая следит за качеством материалов и постоянно их дополняет.'
            }
          ]
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'В стоимость курса входит'
            },
            {
              tag: 'span',
              content: ' работа команды сопровождения. ',
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
              content: 'Кроме того, в стоимость курса входит'
            },
            {
              tag: 'span',
              content: ' бессрочное использование интерактивного учебника. ',
              props: {className:' bold'}
            },
            {
              tag: 'span',
              content: 'Мы следим за трендами в индустрии и постоянно его обновляем.'
            }
          ],
        }
      ]
    },
    {
      type: 'button',
      handlerId: 'open-buy-source-popup',
      content: 'Купить полный курс',
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
          content: 'Знакомство с процессом обучения в flearn завершено! Дальше будем разбираться кто такой иллюстратор и чем он занимается. Поехали!'
        },
      ]
    },
  ]
}

const lessonDataFYS21: ILessonDataDB = {
  id: 'CommercialIllustrator_2Q1wTR',
  courseId: 'finding-your-style',
  title: 'Кто такой иллюстратор и чем он занимается',
  type: 'Theory',
  topic: 'Иллюстрация как профессия',
  topicOrder: 2,
  orderInTopic: 1,
  duration: {
    unit: 'minutes',
    value: 5
  },
  isFree: true,
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
  ]
}

const lessonDataFYS22: ILessonDataDB = {
  id: 'IT_fed4TU',
  courseId: 'finding-your-style',
  title: 'Цифровые продукты',
  type: 'Theory',
  topic: 'Иллюстрация как профессия',
  topicOrder: 2,
  orderInTopic: 2,
  duration: {
    unit: 'minutes',
    value: 10
  },
  isFree: true,
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

const lessonDataFYS23: ILessonDataDB = {
  id: 'Marketing_28EO3M',
  courseId: 'finding-your-style',
  title: 'Реклама',
  type: 'Theory',
  topic: 'Иллюстрация как профессия',
  topicOrder: 2,
  orderInTopic: 3,
  duration: {
    unit: 'minutes',
    value: 10
  },
  isFree: true,
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

const lessonDataFYS24: ILessonDataDB = {
  id: 'Products_303ES4',
  courseId: 'finding-your-style',
  title: 'Коллаборации',
  type: 'Theory',
  topic: 'Иллюстрация как профессия',
  topicOrder: 2,
  orderInTopic: 4,
  duration: {
    unit: 'minutes',
    value: 10
  },
  isFree: true,
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

const lessonDataFYS25: ILessonDataDB = {
  id: 'Packaging_80wfHs',
  courseId: 'finding-your-style',
  title: 'Упаковка',
  type: 'Theory',
  topic: 'Иллюстрация как профессия',
  topicOrder: 2,
  orderInTopic: 5,
  duration: {
    unit: 'minutes',
    value: 10
  },
  isFree: true,
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

const lessonDataFYS26: ILessonDataDB = {
  id: 'Murals_V2hxRJ',
  courseId: 'finding-your-style',
  title: 'Оформление пространств',
  type: 'Theory',
  topic: 'Иллюстрация как профессия',
  topicOrder: 2,
  orderInTopic: 6,
  duration: {
    unit: 'minutes',
    value: 10
  },
  isFree: true,
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

const lessonDataFYS27: ILessonDataDB = {
  id: 'Editorial_K8Bu8i',
  courseId: 'finding-your-style',
  title: 'Книги и журналы',
  type: 'Theory',
  topic: 'Иллюстрация как профессия',
  topicOrder: 2,
  orderInTopic: 7,
  duration: {
    unit: 'minutes',
    value: 10
  },
  isFree: true,
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

const lessonDataFYS28: ILessonDataDB = {
  id: 'CommercialIllustratorSummary_CV9ZUs',
  courseId: 'finding-your-style',
  title: 'Итоги модуля',
  type: 'Theory',
  topic: 'Иллюстрация как профессия',
  topicOrder: 2,
  orderInTopic: 8,
  duration: {
    unit: 'minutes',
    value: 5
  },
  isFree: true,
  content: [

  ]
}

const lessonDataFYS3: ILessonDataDB = {
  id: 'IllustrationSeriesStyle_C4qFhu',
  courseId: 'finding-your-style',
  title: 'Что такое иллюстрация, серия, стиль',
  type: 'Theory',
  topic: 'Что такое иллюстрация, серия, стиль',
  topicOrder: 3,
  orderInTopic: 1,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
  content: [
    {
      type: 'video',
      videoData: {
        src: 'https://www.youtube.com/embed/AewDkjBBW64?si=i7wLe8W9y7eFwFu1',
        title: 'YouTube video player',
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Иллюстрации складываются в серии. Серии собираются в авторский стиль. От маленького к большому. Поэтому и мы начнем с самого маленького элемента — одной картинки. И первый вопрос, который появляется в голове, когда мы садимся рисовать — про что будет картинка?',
        },
      ]
    },
    {
      type: 'title',
      title: 'Помимо сходства в рисунке всегда должно быть что-то еще',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Одного сходства или узнавания недостаточно, чтобы рисунок состоялся. Важный вопрос, который стоит перед художником — “Про что картинка?” Нельзя просто сказать — я нарисовала похоже. Фотография все равно будет более похожа. Что мы можем сказать, что не может сказать фотография?',
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
          content: 'Виктор Меламед, “Машинерия портрета”.',
        },
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Впечатление, которое мы получаем от иллюстрации складывается из двух вещей: литературного и пластического сюжета.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Литературный сюжет',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'У любой картинки есть пересказываемая часть — литературный сюжет. Есть не пересказываемая — пластический сюжет.',
        },
        {
          tag: 'p',
          content: 'Литературный сюжет рассказывает о том, что происходит в рисунке:',
          props: { className: 'listHeader' },
        },
        {
          tag: 'p',
          content: 'сколько в рисунке персонажей',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'что персонажи делают',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'какое время суток',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'мы в комнате или в лесу',
          props: { className: 'listItem' },
        },
      ]
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
      type: 'title',
      title: 'Пластический сюжет',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Пластический сюжет = попытка показать стилизацию, утрировать ощущение от картинки. Утрируем всегда то, что можем проговорить. Некий аспект, который нам важен.',
        },
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Пластический сюжет рассказывает о том, как рисовать:',
          props: { className: 'listHeader' },
        },
        {
          tag: 'p',
          content: 'цветовая палитра',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'техника',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'формат, размер листа',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'формообразование',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'логика построения пространства',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'фактура',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'светотень',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'количество воздуха в листе',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'температура',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'контрастность',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'синестезия',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'ритмы',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'скорость, с которой делается вещь, легкость',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'динамика в листе',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'умение рисовать',
          props: { className: 'listItem' },
        },
      ]
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
      type: 'title',
      title: 'Пластический и литературный сюжет могут дополнять друг друга',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Игривый и легкий персонаж, игривая и легкая интонация рисунка в работе John Patrick Byrne.',
        },
      ]
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
          content: 'John Patrick Byrne открывает нестереотипную сторону персонажа.  В фильмах Тильда Суинтон обычно играет холодную злодейку, как в фильме Хроники Нарнии или Докторе Стрэйнже. Но ее муж John Patrick Byrne, изображает Тильду игривой и легкой. Такой, какую он знает ее в жизни.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Пластический и литературный сюжет могут контрастировать друг с другом',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Zhiyong Jing создает конфликт между интонацией и самой историей. Литературный сюжет про криминал. И супер спокойная интонация наивной живописи.',
        },
      ]
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
      type: 'title',
      title: 'Серия',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Серия — группа работ, объединенных интонацией, средствами выразительности, форматом, материалом. Рисунки внутри серии должны быть достаточно похожими, чтобы их можно было объединить в группу. Рисунки должны отличаться между собой, чтобы серию было интересно разглядывать, изучать. Обычно серия начинается от 3-5 работ.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Что объединяет рисунки',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Литературный сюжет:',
          props: { className: 'listHeader' },
        },
        {
          tag: 'p',
          content: 'сколько в рисунке персонажей',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'что персонажи делают',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'какое время суток',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'мы в комнате или в лесу',
          props: { className: 'listItem' },
        },
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Пластический сюжет:',
          props: { className: 'listHeader' },
        },
        {
          tag: 'p',
          content: 'цветовая палитра',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'техника',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'формат, размер листа',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'формообразование',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'логика построения пространства',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'фактура',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'светотень',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'количество воздуха в листе',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'температура',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'контрастность',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'синестезия',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'ритмы',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'скорость, с которой делается вещь, легкость',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'динамика в листе',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'умение рисовать',
          props: { className: 'listItem' },
        },
      ]
    },
    {
      type: 'title',
      title: 'Что дает разнообразие',
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
      type: 'title',
      title: 'Примеры серий',
    },
    {
      type: 'image',
      imageData: {
        id: 'hannaleejoshi_Seria2.webp',
        alt: 'hannaleejoshi_Seria2',
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
        id: 'ZhiyongJing_Seria1.webp',
        alt: 'ZhiyongJing_Seria1',
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
        id: 'MashaTitova_Seria1.webp',
        alt: 'MashaTitova_Seria1',
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
        id: 'hannaleejoshi_Seria1.webp',
        alt: 'hannaleejoshi_Seria1',
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
        id: 'NadiiaZhelieznova_Seria1.webp',
        alt: 'NadiiaZhelieznova_Seria1',
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
      type: 'image',
      imageData: {
        id: 'MikeLee_Seria1.webp',
        alt: 'MikeLee_Seria1',
        caption: [
          {
            tag: 'a',
            content: 'Mike Lee',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.mikelee.one/group-exhibitions-1' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'JustasJelisejevas_Seria1.webp',
        alt: 'JustasJelisejevas_Seria1',
        caption: [
          {
            tag: 'a',
            content: 'Justas Jelisejevas',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/JustasJ' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'AlenaDemchenko_Seria2.webp',
        alt: 'AlenaDemchenko_Seria2',
        caption: [
          {
            tag: 'a',
            content: 'Alena Demchenko',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/alenademchenko' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'AlenaDemchenko_Seria4.webp',
        alt: 'AlenaDemchenko_Seria4',
        caption: [
          {
            tag: 'a',
            content: 'Alena Demchenko',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/alenademchenko' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'AlenaDemchenko_Seria3.webp',
        alt: 'AlenaDemchenko_Seria3',
        caption: [
          {
            tag: 'a',
            content: 'Alena Demchenko',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/alenademchenko' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'AnnaFadeeva_Seria1.webp',
        alt: 'AnnaFadeeva_Seria1',
        caption: [
          {
            tag: 'a',
            content: 'Anna Fadeeva',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/sofislon' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'ZhenyaMoroz_Seria2.webp',
        alt: 'ZhenyaMoroz_Seria2',
        caption: [
          {
            tag: 'a',
            content: 'Zhenya Moroz',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/9a95f1c4' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'EddyRosas_Seria1.webp',
        alt: 'EddyRosas_Seria1',
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
      type: 'image',
      imageData: {
        id: 'JuditZengővári_Seria1.webp',
        alt: 'JuditZengővári_Seria1',
        caption: [
          {
            tag: 'a',
            content: 'Judit Zengővári',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/juditzengovari' },
          },
        ],
      },
    },
    {
      type: 'title',
      title: 'Стиль',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Стиль — набор готовых пластических решений. То есть как бы серия серий. Стиль собирается из ценностей, которые перетекают из одного проекта в другой. Если взять все-все работы художника и составить диаграмму того, что он считает важным, мы получим его стиль. При этом, наличие стиля не означает, что все работы будут одинаковыми. В зависимости от задачи, автор меняет набор инструментов.',
        },
        {
          tag: 'p',
          content: 'Разные работы Маши Шишовой.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'MashaShishova1.webp',
        alt: 'MashaShishova1',
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
      type: 'image',
      imageData: {
        id: 'MashaShishova2.webp',
        alt: 'MashaShishova2',
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
      type: 'image',
      imageData: {
        id: 'MashaShishova3.webp',
        alt: 'MashaShishova3',
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
      type: 'image',
      imageData: {
        id: 'MashaShishova4.webp',
        alt: 'MashaShishova4',
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
          content: 'Разные работы Тима Бискап.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'TimBiskup1.webp',
        alt: 'TimBiskup1',
        caption: [
          {
            tag: 'a',
            content: 'Tim Biskup',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.timbiskup.com/wop' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'TimBiskup2.webp',
        alt: 'TimBiskup2',
        caption: [
          {
            tag: 'a',
            content: 'Tim Biskup',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.timbiskup.com/wop' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'TimBiskup3.webp',
        alt: 'TimBiskup3',
        caption: [
          {
            tag: 'a',
            content: 'Tim Biskup',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.timbiskup.com/wop' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'TimBiskup4.webp',
        alt: 'TimBiskup4',
        caption: [
          {
            tag: 'a',
            content: 'Tim Biskup',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.timbiskup.com/wop' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'TimBiskup5.webp',
        alt: 'TimBiskup5',
        caption: [
          {
            tag: 'a',
            content: 'Tim Biskup',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.timbiskup.com/wop' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'TimBiskup6.webp',
        alt: 'TimBiskup6',
        caption: [
          {
            tag: 'a',
            content: 'Tim Biskup',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.timbiskup.com/wop' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Разные работы Димы Горелышева.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'DmitriyGorelyshev1.webp',
        alt: 'DmitriyGorelyshev1',
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
      type: 'image',
      imageData: {
        id: 'DmitriyGorelyshev2.webp',
        alt: 'DmitriyGorelyshev2',
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
      type: 'image',
      imageData: {
        id: 'DmitriyGorelyshev3.webp',
        alt: 'DmitriyGorelyshev3',
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
      type: 'image',
      imageData: {
        id: 'DmitriyGorelyshev4.webp',
        alt: 'DmitriyGorelyshev4',
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
      type: 'image',
      imageData: {
        id: 'DmitriyGorelyshev5.webp',
        alt: 'DmitriyGorelyshev5',
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
      type: 'image',
      imageData: {
        id: 'DmitriyGorelyshev6.webp',
        alt: 'DmitriyGorelyshev6',
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
      type: 'image',
      imageData: {
        id: 'DmitriyGorelyshev7.webp',
        alt: 'DmitriyGorelyshev7',
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
      type: 'image',
      imageData: {
        id: 'DmitriyGorelyshev8.webp',
        alt: 'DmitriyGorelyshev8',
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
      type: 'image',
      imageData: {
        id: 'DmitriyGorelyshev9.webp',
        alt: 'DmitriyGorelyshev9',
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
      type: 'image',
      imageData: {
        id: 'DmitriyGorelyshev10.webp',
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
          content: 'Разные работы Nadiia Zhelieznova.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'NadiiaZhelieznova1.webp',
        alt: 'NadiiaZhelieznova1',
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
      type: 'image',
      imageData: {
        id: 'NadiiaZhelieznova2.webp',
        alt: 'NadiiaZhelieznova2',
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
      type: 'image',
      imageData: {
        id: 'NadiiaZhelieznova3.webp',
        alt: 'NadiiaZhelieznova3',
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
      type: 'image',
      imageData: {
        id: 'NadiiaZhelieznova4.webp',
        alt: 'NadiiaZhelieznova4',
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
      type: 'title',
      title: 'Как найти свой стиль',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Стиль формируется сам собой, меняется и трансформируется. А чтобы помочь этому процессу, можно перед каждой следующей иллюстрацией задавать себе вопрос — а из чего будет состоять моя работа? Что для меня важно?',
        },
      ]
    },
    {
      type: 'title',
      title: 'Лозунги и метафоры',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Творческие ценности и интересы удобно формулировать в лозунги и метафоры. Формулировка из 2-4 слов поможет сконцентрироваться на нужном, обрежет лишнее.',
        },
        {
          tag: 'p',
          content: 'Тесная, шумная тусовка Брехт Эванса.',
        },
      ]
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
      type: 'image',
      imageData: {
        id: 'BrechtEvens2.webp',
        alt: 'BrechtEvens2',
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
      type: 'image',
      imageData: {
        id: 'BrechtEvens3.webp',
        alt: 'BrechtEvens3',
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
      type: 'image',
      imageData: {
        id: 'BrechtEvens4.webp',
        alt: 'BrechtEvens4',
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
      type: 'image',
      imageData: {
        id: 'BrechtEvens5.webp',
        alt: 'BrechtEvens5',
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
      type: 'image',
      imageData: {
        id: 'AnnaDesnitskaya2.webp',
        alt: 'AnnaDesnitskaya2',
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
      type: 'image',
      imageData: {
        id: 'AnnaDesnitskaya3.webp',
        alt: 'AnnaDesnitskaya3',
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
      type: 'image',
      imageData: {
        id: 'AnnaDesnitskaya4.webp',
        alt: 'AnnaDesnitskaya4',
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
      type: 'image',
      imageData: {
        id: 'AnnaDesnitskaya5.webp',
        alt: 'AnnaDesnitskaya5',
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
      type: 'image',
      imageData: {
        id: 'AnnaDesnitskaya6.webp',
        alt: 'AnnaDesnitskaya6',
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
      type: 'image',
      imageData: {
        id: 'LéoForest2.webp',
        alt: 'LéoForest2',
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
      type: 'image',
      imageData: {
        id: 'LéoForest3.webp',
        alt: 'LéoForest3',
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
      type: 'title',
      title: 'Сформулируйте свой лозунг из 2-4 слов',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Придумайте лозунг для серии, которую будете рисовать на интенсиве.',
        },
        {
          tag: 'p',
          content: 'Можно подобрать лозунг, который хорошо описывает ваши прошлые рисунки. Тогда на интенсиве будет задача — а как усилить сформулированное впечатление?',
        },
        {
          tag: 'p',
          content: 'Можно сформулировать лозунг вашего любимого художника. Тогда задача будет другая. Как создать сформулированное впечатление в моих собственных работах, используя те навыки, которые у меня уже есть?',
        },
        {
          tag: 'p',
          content: 'Лозунг описывает ощущения, эмоции. По нему мы будем выстраивать пластический сюжет. Например,',
          props: { className: 'listHeader' },
        },
        {
          tag: 'p',
          content: 'Теплое, родное пространство',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Шумно и тесно',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Скрежет ногтей по стеклу',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Один в большом пространстве',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Холодный, леденящий душу сквозняк',
          props: { className: 'listItem' },
        },
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Бывает так, что лозунг задает направление. Вначале мы придумываем формулировку, потом под нее ищем инструменты. Бывает наоборот. Путем экспериментов мы находим интересное визуальное решение. Анализируем его, формулируем для себя в виде лозунга. И после этого развиваем. Делайте то, что ближе. Правильного пути нет, есть ваш путь.',
        },
        {
          tag: 'p',
          content: 'Пришлите свои идеи в телеграм-чат группы.',
          props: { className: 'listHeader' },
        },
      ]
    },
  ]
}

const lessonDataFYS4: ILessonDataDB = {
  id: 'Narrative_ stPfNE',
  courseId: 'finding-your-style',
  title: 'Литературный сюжет: что рисовать',
  type: 'Theory',
  topic: 'Литературный сюжет: что рисовать',
  topicOrder: 4,
  orderInTopic: 1,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
  content: [
    {
      type: 'video',
      videoData: {
        src: 'https://www.youtube.com/embed/Htk0qwFkpMg?si=u2ja6ROVeH1Jiumb',
        title: 'YouTube video player',
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'В этом уроке мы подробнее разберем литературный сюжет в графике. Что это такое и как его придумать.',
        },
        {
          tag: 'p',
          content: 'В графической серии каждая картинка — полноценная, завершенная работа. Это значит, что история должна начаться, развиться и завершиться в одном кадре.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Литературный сюжет есть везде, но насколько он значим — зависит от автора',
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
      type: 'image',
      imageData: {
        id: 'MashaShishova7.webp',
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
      type: 'image',
      imageData: {
        id: 'MashaTitova5.webp',
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
        id: 'MashaTitova6.webp',
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
      type: 'title',
      title: 'Сюжет в один кадр',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'В графике нельзя заставить зрителя пройти определенным путем. Зритель сразу видит всю картинку целиком. Поэтому сюжет сокращается до минимального конфликта, переключения с одного на другое.',
        },
        {
          tag: 'p',
          content: 'Когда в работе получается создать конфликт, зритель надолго задерживается перед рисунком. Он как бы задает себе вопрос, отвечает на него, но затем вопрос появляется заново. В особо хороших случаях, даже после того, как зритель уходит, этот конфликт все еще крутится у него в голове.',
        },
      ]
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
          content: 'Конфликт = новость для нас и наших зрителей. Милые и пушистые котики = не новость. Бедствия как милые животные = новость.',
        },
        {
          tag: 'p',
          content: 'Примеры литературных сюжетов, в которых есть конфликт:',
          props: { className: 'listHeader' },
        },
        {
          tag: 'p',
          content: 'большие головы растут из земли в разных климатических зонах',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'персонажи детских книг на социальном дне',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'здания используются гигантскими людьми как предметы',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'веселые мертвецы на грани смерти',
          props: { className: 'listItem' },
        },
      ]
    },
    {
      type: 'title',
      title: 'Как придумать идею',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Любую составляющую можно взять за основу. Например, все мои истории будут про что-то жуткое в общественном транспорте. И дальше думаем, что там может быть различного.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'unoMoralez2.webp',
        alt: 'unoMoralez2',
        caption: [
          {
            tag: 'a',
            content: 'unomoralez',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/unomoralez/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'unoMoralez4.webp',
        alt: 'unoMoralez4',
        caption: [
          {
            tag: 'a',
            content: 'unomoralez',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/unomoralez/' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Все мои истории будут про приход весны.',
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
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Все мои истории будут про животных из коряги.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'NadiiaZhelieznova1.webp',
        alt: 'NadiiaZhelieznova1',
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
      type: 'image',
      imageData: {
        id: 'NadiiaZhelieznova2.webp',
        alt: 'NadiiaZhelieznova2',
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
      type: 'image',
      imageData: {
        id: 'NadiiaZhelieznova3.webp',
        alt: 'NadiiaZhelieznova3',
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
      type: 'image',
      imageData: {
        id: 'NadiiaZhelieznova4.webp',
        alt: 'NadiiaZhelieznova4',
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
          content: 'Все истории будут про животных, наделенных человеческими свойствами.',
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
      type: 'image',
      imageData: {
        id: 'SashaAnanas5.webp',
        alt: 'SashaAnanas5',
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
          content: 'Все истории будут про какой-то криминал, помещенный в спокойную жизнь.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'ZhiyongJing1.webp',
        alt: 'ZhiyongJing1',
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
        id: 'ZhiyongJing3.webp',
        alt: 'ZhiyongJing3',
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
        id: 'ZhiyongJing4.webp',
        alt: 'ZhiyongJing4',
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
      text: [
        {
          tag: 'p',
          content: 'Все истории будут про разные сущности, которые представлены, как реально существующие национальности.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'EdwardSteed2.webp',
        alt: 'EdwardSteed2',
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
      type: 'image',
      imageData: {
        id: 'EdwardSteed3.webp',
        alt: 'EdwardSteed3',
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
      type: 'image',
      imageData: {
        id: 'EdwardSteed4.webp',
        alt: 'EdwardSteed4',
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
      type: 'image',
      imageData: {
        id: 'EdwardSteed5.webp',
        alt: 'EdwardSteed5',
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
      type: 'image',
      imageData: {
        id: 'EdwardSteed6.webp',
        alt: 'EdwardSteed6',
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
      type: 'image',
      imageData: {
        id: 'EdwardSteed7.webp',
        alt: 'EdwardSteed7',
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
      type: 'image',
      imageData: {
        id: 'EdwardSteed8.webp',
        alt: 'EdwardSteed8',
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
      type: 'image',
      imageData: {
        id: 'EdwardSteed9.webp',
        alt: 'EdwardSteed9',
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
      type: 'image',
      imageData: {
        id: 'EdwardSteed10.webp',
        alt: 'EdwardSteed10',
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
      type: 'image',
      imageData: {
        id: 'EdwardSteed11.webp',
        alt: 'EdwardSteed11',
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
      type: 'image',
      imageData: {
        id: 'EdwardSteed12.webp',
        alt: 'EdwardSteed12',
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
      type: 'image',
      imageData: {
        id: 'EdwardSteed13.webp',
        alt: 'EdwardSteed13',
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
      type: 'image',
      imageData: {
        id: 'EdwardSteed14.webp',
        alt: 'EdwardSteed14',
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
      title: 'Связь литературного и пластического сюжета',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Интересно, когда литературный сюжет начинает взаимодействовать с пластическим.',
          props: { className: 'listHeader' },
        },
        {
          tag: 'p',
          content: '“Собаки” — скучно',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: '“Собаки, ищущие еду” — нормально',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: '“Несимметричные собаки, ищущие еду” — интересно. Тема не ограничивается перебором ситуаций, в которых собака ищет еду. Она также задает вопросы к устройству пространства в листе, формообразованию, контрформам.',
          props: { className: 'listItem' },
        },
      ]
    },
    {
      type: 'title',
      title: 'Генератор сюжетов',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Генератор нужен, чтобы нарастить максимальное разнообразие в серии. Чтобы сделать генератор, нужно зафиксировать какой-то параметр, все остальное — менять.',
        },
        {
          tag: 'p',
          content: 'Разберем на примере кружочков. Отправная точка — черный кружок в центре.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'generator1.webp',
        alt: 'generator1',
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Мы можем зафиксировать форму, менять светлоту.',
        },
      ]
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
      text: [
        {
          tag: 'p',
          content: 'Мы можем зафиксировать размер и светлоту, менять форму.',
        },
      ]
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
      text: [
        {
          tag: 'p',
          content: 'Мы можем зафиксировать светлоту и форму, менять размер.',
        },
      ]
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
      text: [
        {
          tag: 'p',
          content: 'Через одну картинку можно провести бесконечное количество генераторов. На иллюстрации ниже постоянное для трех генераторов: черно-белый цвет. Меняются: форма, светлота, размер.',
        },
      ]
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
      text: [
        {
          tag: 'p',
          content: 'Аналогично для придумывания сюжета. Например, мои истории будут про детские игрушки, которые живут своей жизнью в доме. Фиксируем идею, меняем комнаты, жизненные ситуации.',
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
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Берем еду, берем обыденные ситуации из жизни и перебираем.',
        },
      ]
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
        id: 'BrockDavis2.webp',
        alt: 'BrockDavis2',
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
        id: 'BrockDavis5.webp',
        alt: 'BrockDavis5',
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
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Берем список существ, берем список праздников и смотрим, где у нас возникнет искра. Кальмар испугался, сюрприз не удался. Такие находки получаются большим перебором разных вариантов.',
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
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Берем котиков, берем кофе, смотрим, что тут может быть интересного. Меняем роли, одушевляем то одного, то другого. Меняем кофе и кошку ролями.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'IlyaKazakov3.webp',
        alt: 'IlyaKazakov3',
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
        id: 'IlyaKazakov4.webp',
        alt: 'IlyaKazakov4',
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
        id: 'IlyaKazakov5.webp',
        alt: 'IlyaKazakov5',
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
        id: 'IlyaKazakov6.webp',
        alt: 'IlyaKazakov6',
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
        id: 'IlyaKazakov7.webp',
        alt: 'IlyaKazakov7',
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
        id: 'IlyaKazakov8.webp',
        alt: 'IlyaKazakov8',
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
        id: 'IlyaKazakov2.webp',
        alt: 'IlyaKazakov2',
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
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Берем овощи, фрукты, наделяем их человеческими свойствами. Меняем ситуации, место действия, сами фрукты.',
        },
      ]
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
      type: 'title',
      title: 'Сформулируйте свой литературный сюжет',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Придумайте литературный сюжет для серии, которую будете рисовать на интенсиве. Сюжет может быть с конфликтом. Например,',
          props: { className: 'listHeader' },
        },
        {
          tag: 'p',
          content: 'Неподходящие животные с крыльями',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Фон отдельно, а персонажи все перемешаны',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Несимметричные животные',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Парадные портреты нелепых монстров',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Части тела как растения',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Проблемы из женских журналов, преувеличенные до перебора',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Да, но',
          props: { className: 'listItem' },
        },
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Сюжет может быть простым. Например,',
          props: { className: 'listHeader' },
        },
        {
          tag: 'p',
          content: 'Кошки, Новый год и фейверк',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Автопортреты через зеркало',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Жизнь кошки в своей-моей квартире',
          props: { className: 'listItem' },
        },
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Оба варианта подходят. Берите тот, что ближе.',
        },
      ]
    },
  ]
}

const lessonDataFYS5: ILessonDataDB = {
  id: 'VisualConcept_WeYEGw',
  courseId: 'finding-your-style',
  title: 'Пластический сюжет: как рисовать',
  type: 'Theory',
  topic: 'Пластический сюжет: как рисовать',
  topicOrder: 5,
  orderInTopic: 1,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
  content: [
    {
      type: 'video',
      videoData: {
        src: 'https://www.youtube.com/embed/C76aFfYdNgs?si=1fq8amy5YpCpUhQX',
        title: 'YouTube video player',
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'В этом уроке мы подробнее разберем кирпичики пластической идеи. Посмотрим, как разные иллюстраторы используют их в своих работах.',
        },
        {
          tag: 'p',
          content: 'Визуальные инструменты выразительности — широкая тема. В одном уроке невозможно охватить каждый инструмент, даже по верхам. Хорошая новость в том, что чтобы быть иллюстратором, искать свой стиль, не нужно знать и владеть всем этим арсеналом. Достаточно разобраться в том, что вам близко, интересно, во что хочется закопаться.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Что входит в пластический сюжет',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'На первом уроке мы уже затрагивали тему пластического сюжета. Если попытаться обобщить все возможные инструменты, то получится следующий список:',
        },
        {
          tag: 'p',
          content: 'Композиция: ритмы, массы',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Контрасты: выделение главного, иерархия, интонация',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Форма: силуэт, контрформа, формообразование',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Цвет: хроматический контраст, светлотный контраст, контраст насыщенности, контраст пестрого-однотонного ',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Пространство: ковровая композиция, фронтальная проекция, регистры, поднятый пол, изометрическое пространство, обратная перспектива, совмещение нескольких точек зрения',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Техника: коллаж, живопись, цифровое рисование, скульптура, вышивка',
          props: { className: 'listItem' },
        },
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Любая комбинация этих навыков позволяет заниматься иллюстрацией на профессиональном уровне. Можно углубиться в одно направление, можно по верхам владеть каждым инструментом. Стоит идти по тому пути, который интересен, с которым хочется работать на регулярной основе. Есть большой пласт художников, который вообще не использует цвет или не работает с формой. И это не мешает им быть иллюстраторами.',
        },
        {
          tag: 'p',
          content: 'Дальше разберем несколько примеров того, как иллюстраторы используют различные пластические инструменты в своих работах.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Поиск пластической идеи на примере изучения формы',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'От одного референса можно пойти разными путями.',
        },
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
          content: 'Первый — разбиение фигуры на более простые формы.',
        },
        {
          tag: 'p',
          content: 'Второй — работа с силуэтом.',
        },
        {
          tag: 'p',
          content: 'Третий — логика конструктора, модуля.',
        },
        {
          tag: 'p',
          content: 'Четвертый — акцент на контрформе (треугольники).',
        },
        {
          tag: 'p',
          content: 'Последний — стилизация через метафору (перевернутый самолет).',
        },
      ]
    },
    {
      type: 'title',
      title: 'Форма: формообразование',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Формообразование отвечает на вопрос, из каких материалов будет состоять наш придуманный мир. Например, я создаю мир из пластилина, все в нем будет пластилиновое. Я создаю мир из стекла, все будет стеклянное. Часто формообразование создает узнаваемость художника.',
        },
        {
          tag: 'p',
          content: 'Nadiia Zhelieznova делает своих персонажей текучими.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'NadiiaZhelieznova5.webp',
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
      type: 'image',
      imageData: {
        id: 'NadiiaZhelieznova7.webp',
        alt: 'NadiiaZhelieznova7',
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
      type: 'image',
      imageData: {
        id: 'NadiiaZhelieznova8.webp',
        alt: 'NadiiaZhelieznova8',
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
          content: 'Сравнивает животных с корягой дерева.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'NadiiaZhelieznova1.webp',
        alt: 'NadiiaZhelieznova1',
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
      type: 'image',
      imageData: {
        id: 'NadiiaZhelieznova2.webp',
        alt: 'NadiiaZhelieznova2',
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
      type: 'image',
      imageData: {
        id: 'NadiiaZhelieznova3.webp',
        alt: 'NadiiaZhelieznova3',
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
      type: 'image',
      imageData: {
        id: 'NadiiaZhelieznova4.webp',
        alt: 'NadiiaZhelieznova4',
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
          content: 'Elicia Edijanto рисует работы в тумане.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'EliciaEdijanto1.webp',
        alt: 'EliciaEdijanto1',
        caption: [
          {
            tag: 'a',
            content: 'Elicia Edijanto',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/eliciaedijanto' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'EliciaEdijanto2.webp',
        alt: 'EliciaEdijanto2',
        caption: [
          {
            tag: 'a',
            content: 'Elicia Edijanto',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/eliciaedijanto' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Формообразование Mike Lee напоминает плавящийся воск.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'MikeLee1.webp',
        alt: 'MikeLee1',
        caption: [
          {
            tag: 'a',
            content: 'Mike Lee',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.mikelee.one/group-exhibitions-1' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'MikeLee2.webp',
        alt: 'MikeLee2',
        caption: [
          {
            tag: 'a',
            content: 'Mike Lee',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.mikelee.one/group-exhibitions-1' },
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Слегка кривоватая, дрожащая линия создает ощущение ручной работы. Это особенно живо смотрится в цифровых рисунках.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'MattHouston2.webp',
        alt: 'MattHouston2',
        caption: [
          {
            tag: 'a',
            content: 'Matt Houston',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/mg.houston/?hl=en' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'MattHouston3.webp',
        alt: 'MattHouston3',
        caption: [
          {
            tag: 'a',
            content: 'Matt Houston',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/mg.houston/?hl=en' },
          },
        ],
      },
    },
    {
      type: 'title',
      title: 'Форма: модульность',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Модуль — это логика движения самого контура. Правила сборки могут более или менее жесткими, зависит от автора.',
        },
        {
          tag: 'p',
          content: 'Чем меньше модуль картинки, тем скучнее игра. Самый маленький модуль — пиксель.',
        },
        {
          tag: 'p',
          content: 'Чем модуль крупнее — тем больше пространства для метаморфоз. Все детали нужно уложить, за этим интересно наблюдать.',
        },
        {
          tag: 'p',
          content: 'Riccardo Guasco собирает рисунок из долек. В этой форме сразу заложен пластический контраст. Есть прямота и круглота, они друг другу контрастируют.',
        },
      ]
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
      type: 'image',
      imageData: {
        id: 'RiccardoGuasco3.webp',
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
      type: 'image',
      imageData: {
        id: 'RiccardoGuasco6.webp',
        alt: 'RiccardoGuasco6',
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
        id: 'RiccardoGuasco7.webp',
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
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Charley Harper идет до предела стилизации. На всем пути верно изображает животное, не превращает в котика с глазками.',
        },
      ]
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
      type: 'image',
      imageData: {
        id: 'CharleyHarper2.webp',
        alt: 'CharleyHarper2',
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
          content: 'Пластическая идея для каждого животного своя, свой подход.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'CharleyHarper3.webp',
        alt: 'CharleyHarper3',
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
      type: 'image',
      imageData: {
        id: 'MashaTitova2.webp',
        alt: 'MashaTitova2',
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
      type: 'title',
      title: 'Форма: силуэт',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Силуэт — заполненный или пустой контур, произвольной формы. Работа с силуэтом — движение от абстракции к фигуративу. Аналогично массам, автора в первую очередь волнует впечатление, во вторую — реалистичность.',
        },
        {
          tag: 'p',
          content: 'Например, Маша Шишова в своих работах идет от силуэта, формы. И затем вписывает в него фигуратив.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'MashaShishova5.webp',
        alt: 'MashaShishova5',
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
      type: 'image',
      imageData: {
        id: 'MashaShishova7.webp',
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
      type: 'image',
      imageData: {
        id: 'BrechtEvens6.webp',
        alt: 'BrechtEvens6',
        caption: [
          {
            tag: 'a',
            content: 'Brecht Evens',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/brecht_evens_/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'BrechtEvens7.webp',
        alt: 'BrechtEvens7',
        caption: [
          {
            tag: 'a',
            content: 'Brecht Evens',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/brecht_evens_/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'BrechtEvens8.webp',
        alt: 'BrechtEvens8',
        caption: [
          {
            tag: 'a',
            content: 'Brecht Evens',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.instagram.com/brecht_evens_/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'AlHirschfeld1.webp',
        alt: 'AlHirschfeld1',
        caption: [
          {
            tag: 'a',
            content: 'Al Hirschfeld',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.alhirschfeldfoundationshop.org/stage/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'AlHirschfeld3.webp',
        alt: 'AlHirschfeld3',
        caption: [
          {
            tag: 'a',
            content: 'Al Hirschfeld',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.alhirschfeldfoundationshop.org/stage/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'AlHirschfeld5.webp',
        alt: 'AlHirschfeld5',
        caption: [
          {
            tag: 'a',
            content: 'Al Hirschfeld',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.alhirschfeldfoundationshop.org/stage/' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'SonjaGajic1.jpeg',
        alt: 'SonjaGajic1',
        caption: [
          {
            tag: 'a',
            content: 'Sonja Gajić',
            props: { className: 's-hoverable', target: "_blank", to: 'https://sonjagajicart.com/aquarelles/' },
          },
        ],
      },
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
      type: 'image',
      imageData: {
        id: 'ClareYoungs6.webp',
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
        id: 'ClareYoungs7.webp',
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
      type: 'title',
      title: 'Форма: контрформа',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Контрформа — пространство, обволакивающее силуэт, антисилуэт.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'CarlaPetelski1.jpeg',
        alt: 'CarlaPetelski1',
        caption: [
          {
            tag: 'a',
            content: 'Carla Petelski',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/carlapetelski' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'SveinNyhus4.webp',
        alt: 'SveinNyhus4',
        caption: [
          {
            tag: 'a',
            content: 'Svein Nyhus',
            props: { className: 's-hoverable', target: "_blank", to: 'https://sveinnyhus.blogspot.com/p/summary-in-english-signed-a2-size.html' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'SveinNyhus3.webp',
        alt: 'SveinNyhus3',
        caption: [
          {
            tag: 'a',
            content: 'Svein Nyhus',
            props: { className: 's-hoverable', target: "_blank", to: 'https://sveinnyhus.blogspot.com/p/summary-in-english-signed-a2-size.html' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'SveinNyhus2.webp',
        alt: 'SveinNyhus2',
        caption: [
          {
            tag: 'a',
            content: 'Svein Nyhus',
            props: { className: 's-hoverable', target: "_blank", to: 'https://sveinnyhus.blogspot.com/p/summary-in-english-signed-a2-size.html' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'SveinNyhus1.webp',
        alt: 'SveinNyhus1',
        caption: [
          {
            tag: 'a',
            content: 'Svein Nyhus',
            props: { className: 's-hoverable', target: "_blank", to: 'https://sveinnyhus.blogspot.com/p/summary-in-english-signed-a2-size.html' },
          },
        ],
      },
    },
    {
      type: 'image',
      imageData: {
        id: 'escher3.webp',
        alt: 'escher3',
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
      type: 'image',
      imageData: {
        id: 'escher1.webp',
        alt: 'escher1',
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
      type: 'image',
      imageData: {
        id: 'mcescher7.webp',
        alt: 'mcescher7',
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
      type: 'image',
      imageData: {
        id: 'mcescher8.webp',
        alt: 'mcescher8',
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
      type: 'image',
      imageData: {
        id: 'ClareYoungs1.webp',
        alt: 'ClareYoungs1',
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
        id: 'ClareYoungs2.webp',
        alt: 'ClareYoungs2',
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
      type: 'title',
      title: 'Контраст',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Разница - это средство выразительности. Если разница велика - это контраст. Если мала - нюанс. Когда мы подчеркиваем разницу - размеров, форм, яркости, чего угодно - мы делаем рисунок более выразительным.',
        },
        {
          tag: 'p',
          content: 'Контраст — большая разница в листе. Объемное и плоское, фактурное и однородное, толстое и тонюсенькое, заполненное и пустое, чб и цветное, пятно и линия. С помощью контраста можно направить внимание зрителя, выделить главное в листе, разделить планы, объединить персонажей.',
        },
        {
          tag: 'p',
          content: 'Нюанс — едва заметная разница. Она обогащает рисунок, наполняет его деталями.',
        },
        {
          tag: 'p',
          content: 'Акцент — самый сильный контраст в листе. Акцент всегда маленький, всегда один.',
        },
        {
          tag: 'p',
          content: 'Например, если тона в рисунке отличаются слабо, рисунок нюансный:',
        },
      ]
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
      type: 'image',
      imageData: {
        id: 'NadyaDrobysheva2.webp',
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
        id: 'ArinaSerebriakova1.webp',
        alt: 'ArinaSerebriakova1',
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
          tag: 'p',
          content: 'Разница в рисунке — способ разнобразить иллюстрацию, привлечь внимание зрителя к нужному месту.',
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
          content: 'Главное можно выделить с помощью разницы в толщине линии.',
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
      type: 'image',
      imageData: {
        id: 'ELENAFEKLISTOVA2.jpeg',
        alt: 'ELENAFEKLISTOVA2',
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
      type: 'text',
      text: [
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
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Акцент — способ притянуть внимание зрителя в одну точку. В иллюстрации ниже акцент — линейные реснички в пятновом рисунке птицы.',
        },
      ]
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
        id: 'ArinaSerebriakova.webp',
        alt: 'ArinaSerebriakova',
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
      type: 'title',
      title: 'Композиция',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Композиция — организация листа, которую автор делает сознательно и целенаправленно. На композицию влияют: размер, форма масс, их взаимодействие друг с другом и с пустым пространством листа.',
        },
        {
          tag: 'p',
          content: 'Масса может равняться одному объекту.',
        },
      ]
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
      text: [
        {
          tag: 'p',
          content: 'Масса может состоять из нескольких объектов. В этом случае несколько объектов воспринимаются как одна масса.',
        },
      ]
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
          content: 'Масса может быть частью объекта. Купальник — масса, но он лишь часть тела девушки.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'АлександрДейнека1.webp',
        alt: 'АлександрДейнека1',
        caption: [
          {
            tag: 'p',
            content: 'Александр Дейнека',
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Объекты объединяются в одну массу, когда они схожи по какому-то признаку: светлота, цвет, техника исполнения.',
        },
      ]
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
      text: [
        {
          tag: 'p',
          content: 'Четкие границы массы могут упрощать чтение сюжета.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'LorenzoMattotti1.jpeg',
        alt: 'LorenzoMattotti1',
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
          tag: 'p',
          content: 'Масса может затруднять восприятие. Абстрактная масса — хороший способ устранения. Мощный куб некера.',
        },
      ]
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
      text: [
        {
          tag: 'p',
          content: 'Персонажи рифмуются с деревьями, встают в один ряд, создают равномерный ритм.',
        },
      ]
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
          tag: 'p',
          content: 'Масса и фигуратив (объект) — два инструмента художника. Их необязательно жестко привязывать друг к другу. Иллюстратор может в любую форму врисовать нужный ему сюжет.',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'MašaAvramović2.webp',
        alt: 'MašaAvramović2',
        caption: [
          {
            tag: 'a',
            content: 'Maša Avramović',
            props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/mashta' },
          },
        ],
      },
    },
    {
      type: 'title',
      title: 'Как учиться инструментам, из которых складывается пластический сюжет',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Смотреть много-много разных работ. В разных техниках, с отличной интонацией, в разных форматах. Смотреть иллюстраторов в близкой для вас технике. Смотреть дизайнеров, скульпторов, которые используют совершенно непривычные инструменты. Я знаю много историй, когда человек приходил в Британку с маслом, а уходил уверенным керамистом.',
        },
        {
          tag: 'p',
          content: 'Анализировать работы, которые вызывают сильные эмоции: приятные, жуткие, разочаровывающие, бодрящие. Финальная цель работы иллюстратора — эмоции, которые он смог вызвать у зрителей. И эти эмоции необязательно должны быть приятными.',
        },
        {
          tag: 'p',
          content: 'Ходить на мастер-классы и курсы к иллюстраторам, у которых хотите научиться конкретным инструментам. Например, в Простой школе проходят небольшие курсы, на которых иллюстраторы рассказывают о специфичных техниках и подходах. Такой курс — хороший способ узнать от первого лица о том, как думает иллюстратор.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Дневник наблюдений, анализируем иллюстрации свои и чужие',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Дневник наблюдений — это небольшая анкета, которая помогает связать ощущения зрителя и инструменты автора. Она состоит из трех блоков: “Что я вижу?”, “Что я чувствую?”, “Как автор это сделал?”',
        },
        {
          tag: 'p',
          content: 'Ниже пример такой анкеты для анализа композиции. Первый раз я познакомилась с этим подходом на курсах у Марины Бородиной и Натальи Гриценко. Сейчас они преподают иллюстрацию в НИУ ВШЭ.',
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'strong',
              content: 'Что я вижу',
            },
          ],
        },
        {
          tag: 'p',
          content: 'Буквально опишите массы и их положения в листе. Говорите о том, что видите перед собой.',
          props: { className: 'listHeader' },
        },
        {
          tag: 'p',
          content: 'Сколько масс мы видим? Масса состоит из одного объекта или из нескольких? Если из нескольких — почему мы воспринимаем их одной массой?',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Сколько места каждая масса занимает в листе? Большая она или маленькая, насколько?',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Где масса расположена относительно центра, краев листа, других масс?',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Чем массы похожи, чем отличаются?',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Как массы взаимодействуют? Загораживают друг друга, соприкасаются, сливаются, находятся на расстоянии?',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Насколько массы однородные? Насколько они темные или светлые?',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Какой массы формы?',
          props: { className: 'listItem' },
        },
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'strong',
              content: 'Что я чувствую',
            },
          ],
        },
        {
          tag: 'p',
          content: 'Опишите свои впечатления. Говорите о том, что чувствуете, когда смотрите на иллюстрацию.',
          props: { className: 'listHeader' },
        },
        {
          tag: 'p',
          content: 'Масса тяжелая или легкая?',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Масса подвижная или нет? Если подвижная — в каком направлении движется? Как быстро движется?',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Как далеко масса расположена от зрителя? Как я могу охарактеризовать ее взаимодействие со зрителем?',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Как масса взаимодействует с пространством? Что мы видим — простор или тесноту, покой, движение, ситуацию',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Как массы взаимодействуют? Они движутся? Вместе или по отдельности? Друг на друга, на зрителя, в противоположном или одном направлении? Что происходит между ними? Какое ощущение это вызывает?',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Что я чувствую?',
          props: { className: 'listItem' },
        },
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: [
            {
              tag: 'strong',
              content: 'Как автор это сделал',
            },
          ],
        },
        {
          tag: 'p',
          content: 'Прочитайте ваши ответы на первые два раздела. Сопоставьте то, что вы видите, с тем, что чувствуете. Предположите связи первого со вторым.',
        },
        {
          tag: 'p',
          content: 'По этой схеме я разбирала иллюстрации других художников, когда рисовала серии в Британке. Ниже кусочек такого разбора. Я опустила первые два блока, попробуйте самостоятельно ответить на вопросы "что я вижу?" и "что я чувствую?"',
        },
      ]
    },
    {
      type: 'image',
      imageData: {
        id: 'LorenzoMattotti21.jpeg',
        alt: 'LorenzoMattotti21',
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
      type: 'image',
      imageData: {
        id: 'gconspect.png',
        alt: 'gconspect',
        caption: [
          {
            tag: 'a',
            content: 'Графический конспект',
          },
        ],
      },
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          props: { className: 'listHeader' },
          content: [
            {
              tag: 'strong',
              content: 'Как автор это сделал',
            },
          ],
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'strong',
              content: 'Первая масса тяжелая, нависающая. ',
            },
            {
              tag: 'span',
              content: 'Первая масса закрывает верхнюю часть листа, вытягивается к центру вниз.',
            },
          ],
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'strong',
              content: 'Вторая масса устойчивая. ',
            },
            {
              tag: 'span',
              content: 'Расположена по центру, симметрична.',
            },
          ],
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'strong',
              content: 'Третья масса тяжелая, устойчивая. ',
            },
            {
              tag: 'span',
              content: 'Масса сплошная, полностью закрывает нижнюю границу листа.',
            },
          ],
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'strong',
              content: 'Вторая масса статична, зажата. ',
            },
            {
              tag: 'span',
              content: 'Две тяжелые массы, которые закрывают верх и низ листа. Вторая масса симметричная в центре листа.',
            },
          ],
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'strong',
              content: 'Давление, тревога, тяжесть. ',
            },
            {
              tag: 'span',
              content: 'Две тяжелые массы, которые закрывают верх и низ листа. Первая масса едва касается второй, что создает напряжение, давление. Жест движения объектов конфликтует со статичностью силуэта.',
            },
          ],
          props: { className: 'listItem' },
        },
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Последний блок анкеты можно воспринимать как прямые инструкции к действию, использовать их в своих следующих работах.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Выберите одно-два средства выразительности, из которых сложится пластический сюжет',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Что-то зафиксируйте, чтобы серия смотрелась цельной. Что-то меняйте, чтобы за серией было интересно наблюдать. Например,',
          props: { className: 'listHeader' },
        },
        {
          tag: 'p',
          content: 'Постоянное: цветовая палитра (голубого и индиго — много, розового — мало, розовым выделяю главное), модульность (все объекты стремятся стать треугольниками)',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Меняется: персонажи, которых я рисую',
          props: { className: 'listItem' },
        },
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Берите те инструменты, с которыми уже работали, знаете, как ими управлять. Цель серии — подсобрать и оформить наши текущие навыки, а не научиться новым.',
        },
        {
          tag: 'p',
          content: 'Лозунг должен помочь ограничить набор инструментов. Что стоит оставить, чтобы получилось задуманное вами впечатление от рисунка? От чего можно отказаться?',
        },
      ]
    },
  ]
}

const lessonDataFYS6: ILessonDataDB = {
  id: 'FindingYourStyle_Practice_ t4jUts',
  courseId: 'finding-your-style',
  title: 'Финальное задание',
  type: 'Practice',
  topic: 'Финальное задание',
  topicOrder: 6,
  orderInTopic: 1,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: false,
  content: [
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'В этом задании будем учиться делать серию рисунков, в которой используются наши сильные стороны.',
        },
        {
          tag: 'p',
          content: 'В итоге нам нужно получить 3-5 графических работ, объединенных одной интонацией (пластической идеей) и одним литературным сюжетом.',
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
          content: '1. Сформулируйте лозунг для своей серии. Лозунг описывает ощущения, эмоции. По нему мы будем выстраивать пластический сюжет. Например,',
          props: { className: 'listHeader' },
        },
        {
          tag: 'p',
          content: 'Теплое, родное пространство',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Шумно и тесно',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Скрежет ногтей по стеклу',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Один в большом пространстве',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Холодный, леденящий душу сквозняк',
          props: { className: 'listItem' },
        },
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: '2. Выберите литературный сюжет. Например,',
          props: { className: 'listHeader' },
        },
        {
          tag: 'p',
          content: 'Неподходящие животные с крыльями',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Несимметричные животные',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Фон отдельно, а персонажи все перемешаны',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Парадные портреты нелепых монстров',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Части тела как растения',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Проблемы из женских журналов, преувеличенные до перебора',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Да, но',
          props: { className: 'listItem' },
        },
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: '3. Выберите одно-два средства выразительности, из которых сложится пластический сюжет. Что-то зафиксируйте, чтобы серия смотрелась цельной. Что-то меняйте, чтобы за серией было интересно наблюдать. Например,',
          props: { className: 'listHeader' },
        },
        {
          tag: 'p',
          content: 'Постоянное: цветовая палитра (голубого и индиго — много, розового — мало, розовым выделяю главное), модульность (все объекты стремятся стать треугольниками)',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Меняется: персонажи, которых я рисую',
          props: { className: 'listItem' },
        },
        {
          tag: 'p',
          content: 'Берите те инструменты, с которыми уже работали, знаете, как ими управлять. Цель серии — подсобрать и оформить наши текущие навыки, а не научиться новым.',
        },
      ]
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: '4. Нарисуйте 5-10 работ. Думайте о количестве, а не качестве. На первом этапе мы экспериментируем, ищем идеи, собираем материал. После интенсивна серию можно перерисовать и доработать. Сейчас — главное разобраться, в каком направлении двигаться.',
        },
        {
          tag: 'p',
          content: '5. Разложите все работы перед глазами, отберите 3-5, которые лучше всего отражают первоначальную задумку.',
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
  ]
}

export const allLessons = [
  lessonData11,
  lessonData12,
  lessonData13,
  lessonData14,
  lessonData32,
  lessonData41,
  lessonData42,
  lessonData43,
  lessonData44,
  lessonData45,
  lessonData46,
  lessonData51,
  lessonData61,
  lessonData62,
  lessonData63,
  lessonData64,
  lessonData71,
  lessonData81,
  lessonData82,
  lessonData91,
  lessonDataFYS11,
  lessonDataFYS12,
  lessonDataFYS13,
  lessonDataFYS14,
  lessonDataFYS21,
  lessonDataFYS22,
  lessonDataFYS23,
  lessonDataFYS24,
  lessonDataFYS25,
  lessonDataFYS26,
  lessonDataFYS27,
  lessonDataFYS28,
  lessonDataFYS3,
  lessonDataFYS4,
  lessonDataFYS5,
  lessonDataFYS6,
];
