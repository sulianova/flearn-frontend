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
  title: 'Что здесь происходит',
  type: 'Theory',
  topic: 'Как устроено обучение',
  topicOrder: 1,
  orderInTopic: 1,
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
          content: 'Добро пожаловать в бесплатный блок! Мы рады, что вы с нами.',
        },
        {
          tag: 'p',
          content: 'Совсем скоро вы погрузитесь в интерактивный учебник и создадите ваш первый проект. Но сначала расскажем, как всё устроено.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Бесплатный вводный курс'
    },
    {
      type: 'text',
      text: 'Вводный курс — это возможность прожить один день из жизни иллюстратора. Вы узнаете, как он рассуждает и какие задачи решает, а ещё — попробуете самостоятельно нарисовать обложку к песне.'
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
          content: 'Если понравится, можно прийти на платный курс — он длится 2 месяца. Курс спроектирован так, чтобы учиться было интересно как совсем новичкам, так и тем, кто уже пробует себя в иллюстрации.'
        },
        {
          tag: 'p',
          content: 'А теперь — давайте попробуем понять, нужно ли вам проходить этот ознакомительный курс. Выберите все вопросы, которые волнуют вас прямо сейчас. '
        }
      ]
    },
    {
      type: 'list',
      items: [
        'Можно ли стать иллюстратором, если не умеешь рисовать?',
        'Сколько времени нужно тратить на учёбу?',
        'Как устроен процесс обучения на курсе?',
        'Что входит в стоимость курса?',
        'Когда можно начать обучение?',
      ]
    },
    {
      type: 'text',
      text: 'В этом ознакомительном курсе мы ответим на все эти вопросы. Если волнует хотя бы один из них, советуем остаться, чтобы расставить все точки над i.'
    }
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
    // 0: {
    //   type: 'SELECT',
    //   variant: 'RADIO',
    //   title: 'У\u00A0вас есть опыт работы или учёбы по\u00A0специальности «Иллюстратор»?',
    //   options: [
    //     'Нет, впервые знакомлюсь с профессией',
    //     'Да, уже в процессе изучения или работаю в этой сфере',
    //   ],
    // },
    // 1: {
    //   type: 'SELECT',
    //   variant: 'CHECKBOX',
    //   title: 'У\u00A0вас есть опыт работы или учёбы по\u00A0специальности «Иллюстратор»?',
    //   options: [
    //     'Нет, впервые знакомлюсь с профессией',
    //     'Да, уже в процессе изучения или работаю в этой сфере',
    //   ],
    // },
    // 2: {
    //   type: 'SELECT',
    //   variant: 'CARD',
    //   subtitle: 'Хотим зафиксировать цель, с которой вы проходите вводную часть. А в конце спросим, получилось ли её достичь.',
    //   description: 'Выберите цель:',
    //   options: [
    //     {
    //       title: 'Пройти и оплатить',
    //       subtitle: 'Подготовиться к стартру курса',
    //     },
    //     {
    //       title: 'Попробовать формат',
    //       subtitle: 'Понять, понравится ли мне учеба в Flearn',
    //     },
    //     {
    //       title: 'Пройти только вводную часть',
    //       subtitle: 'Бесплатно научиться чему-нибудь новому',
    //     },
    //   ],
    // },
  },
}

const lessonData12: ILessonDataDB = {
  id: 'IntroANDProgram_ITUg9y',
  courseId: 'how-to-draw',
  title: 'Подробнее о платной программе',
  type: 'Theory',
  topic: 'Как устроено обучение',
  topicOrder: 1,
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
          content: 'Если коротко, обучение в flearn — это 5‒10 часов в неделю, много практических заданий и живой обратной связи. Вот что предстоит делать на курсе:'
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
          content: 'Программа платного обучения длится 2 месяца. Обучение на платной программе будет сложным, но интересным. Больше теории, больше практики, больше самостоятельности. К концу учёбы в вашем портфолио появится серия иллюстраций для медиа.'
        },
        {
          tag: 'p',
          content: 'Мы не оставим вас с теорией и практикой один на один. Вместе с учебником вы получите доступ в чат студентов школы — телеграм-чат, где можно общаться с сокурсниками, обсуждать проекты и теорию, делиться интересными материалами, помогать друг другу советами.'
        },
        {
          tag: 'p',
          content: [
            {
              tag: 'span',
              content: 'Кстати, мы рассказываем про обучение в flearn не только в учебнике. У нас есть '
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
    {
      type: 'text',
      text: 'А сейчас у нас к вам пара вопросов — и сразу продолжим. Вопросы займут 1–2 минуты.'
    },
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
      type: 'text',
      text: 'Мы понимаем, как сложно учиться чему-то новому — тем более в сжатые сроки и в незнакомой обстановке. Чтобы вам не казалось, что вы двигаетесь на ощупь и ничего не понимаете, вас будет поддерживать команда сопровождения. Расскажем про нее чуть подробнее.'
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
          content: 'Куратор — первый, с кем вы познакомитесь на платном курсе. Он ещё раз расскажет, как будет устроено обучение и добавит вас во все нужные каналы.'
        },
        {
          tag: 'p',
          content: 'Куратор знает обо всём, что касается процесса обучения: поможет решить проблемы со входом в личный кабинет, подскажет, что делать, если проект принят, а прочитать комментарии ревьюера не получается.'
        },
      ]
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
          content: 'Первые рекомендации вы получите уже в конце бесплатного блока, когда отправите на проверку финальное задание.'
        },
        {
          tag: 'p',
          content: 'Команда сопровождения будет с вами в течение всего обучения, её задача — поддерживать вас и помогать. Вы сможете задать любой вопрос по программе или просто поделиться переживаниями. '
        },
      ]
    },
  ]
}

const lessonData14: ILessonDataDB = {
  id: 'StudyProcess_Omtryq',
  courseId: 'how-to-draw',
  title: 'Процесс обучения',
  type: 'Theory',
  topic: 'Как устроено обучение',
  topicOrder: 1,
  orderInTopic: 4,
  duration: {
    unit: 'minutes',
    value: 15
  },
  isFree: true,
  content: [
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'В обучении новому есть много вдохновляющего — перемены, интерес, выход за рамки привычного. В то же время быть новичком не всегда просто.'
        },
        {
          tag: 'p',
          content: 'Cтолкнуться с трудностями, особенно в первые недели обучения, — это нормально. Давайте попробуем разобраться, что может помочь с ними справиться.'
        }
      ]
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
          content: 'У каждого из нас свой уникальный опыт, свои ожидания от обучения и свои цели относительно рисования.'
        },
        {
          tag: 'p',
          content: 'Есть силы только на то, чтобы посмотреть видео — отлично, значит сейчас этого достаточно. Мы будем рады любому вашему выбору.'
        }
      ]
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

const lessonData15: ILessonDataDB = {
  id: 'FAQ_Xs0Qb5',
  courseId: 'how-to-draw',
  title: 'Часто задаваемые вопросы (и ответы на них)',
  type: 'Theory',
  topic: 'Как устроено обучение',
  topicOrder: 1,
  orderInTopic: 5,
  duration: {
    unit: 'minutes',
    value: 15
  },
  isFree: true,
  content: [
    {
      type: 'title',
      title: 'Как быть, если я не умею рисовать?'
    },
    {
      type: 'text',
      text: 'Сейчас иллюстратору необязательно владеть классическим рисунком. Достаточно освоить базовые принципы визуальной коммуникации. С этим мы и будем работать в рамках курса.'
    },
    {
      type: 'title',
      title: 'Что если я недостаточно творческий и креативный человек?'
    },
    {
      type: 'text',
      text: 'Креативность — такой же навык, как композиция или работа с цветом. Её мы будем прокачивать на протяжении всего обучения — на практике и с обратной связью.'
    },
    {
      type: 'title',
      title: 'А что если я не справлюсь с нагрузкой?'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Курс построен так, чтобы у вас хватало времени на изучение материала: учебная программа делится на завершённые отрезки — модули, которые длятся 1-2 недели.'
        },
        {
          tag: 'p',
          content: 'Но если вы поймете, что нужно сделать паузу или требуется дополнительное время для закрепления материала, можно написать куратору и продолжить обучение со следующей группой. В этом нет ничего страшного.'
        }
      ]
    },
    {
      type: 'title',
      title: 'Что входит в стоимость платной программы?'
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'В курс входят уроки и практические задания — всё, что поможет усвоить знания на практике. За каждым курсом стоит большая команда, которая следит за качеством материалов и постоянно их дополняет.'
        },
        {
          tag: 'p',
          content: 'Но пройти этот путь до конца будет сложно без поддержки, поэтому в стоимость курса входит работа команды сопровождения. Это куратор, который в процессе обучения готов ответить на любые вопросы и ревьюеры, которые дают обратную связь по проектам и помогают довести их до уровня портфолио.'
        },
        {
          tag: 'p',
          content: 'Кроме того, в стоимость курса входит бессрочное использование интерактивного учебника. Мы следим за трендами в индустрии и постоянно его обновляем.'
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
          content: 'Вот дорога, по которой мы предлагаем отправиться дальше. Вы узнаете, какие задачи решает иллюстратор и как он помогает нам ориентироваться в этом мире. Потом на примере обложки музыкального альбома освоите ключевые навыки, без которых иллюстратору никуда: работу с мудбордом, композицией и цветом. А затем сможете определиться, хотите ли продолжить обучение на платном курсе.'
        },
        {
          tag: 'p',
          content: 'А пока всё. Знакомство с процессом обучения в flearn завершено! Мы будем поэтапно погружать вас в мир иллюстрации. Поехали!'
        },
      ]
    },
  ]
}

const lessonData21: ILessonDataDB = {
  id: 'CommercialIllustratorTasks_2Q1wTR',
  courseId: 'how-to-draw',
  title: 'Какие задачи решает иллюстратор',
  type: 'Theory',
  topic: 'Как это — быть иллюстратором',
  topicOrder: 2,
  orderInTopic: 1,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: true,
  content: [
    {
      type: 'textImportant',
      text: 'В конце бесплатного модуля вы сможете сдать на проверку свой самостоятельный проект. Воспользуйтесь этой возможностью, чтобы получить обратную связь от ревьюера и увидеть, как работает команда сопровождения в flearn.',
    },
    {
      type: 'text',
      text: [
        {
          tag: 'p',
          content: 'Добро пожаловать на вводную часть курса «Композиция: как выделить главное». Совсем скоро вы сделаете свою обложку для любимой песни. Ну а в начале давайте разберемся, кто такой иллюстратор и чем он занимается.',
        },
        {
          tag: 'p',
          content: 'Иллюстратор помогает компаниям и людям выделиться среди конкурентов, передать настроение бренда, сделать текст нагляднее и проще.',
        },
      ]
    },
    {
      type: 'title',
      title: 'Иллюстрации в рекламе',
    },
    {
      type: 'text',
      text: 'Иллюстрацию используют для особых случаев: запуска новых кампаний, праздников и коллабораций. Иллюстрации помогают привлечь новую аудиторию и вновь заинтересовать старую.',
    },
    {
      type: 'gallery',
      maxHeightPx: 3_000,
      images: [
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
          id: 'SusannaRumiz3.webp',
          alt: 'SusannaRumiz3',
          caption: [
            {
              tag: 'a',
              content: 'Susanna Rumiz',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/susannarumiz/projects' },
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
    {
      type: 'title',
      title: 'Иллюстрации для продуктов',
    },
    {
      type: 'gallery',
      maxHeightPx: 2_300,
      images: [
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
          id: 'NickLiefhebber3.webp',
          alt: 'NickLiefhebber3',
          caption: [
            {
              tag: 'a',
              content: 'Nick Liefhebber',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/Liefhebber' },
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
    {
      type: 'title',
      title: 'Иллюстрации для айдентики',
    },
    {
      type: 'gallery',
      maxHeightPx: 1_300,
      images: [
        {
          id: 'bayduzha1.webp',
          alt: 'bayduzha1',
          caption: [
            {
              tag: 'a',
              content: 'Наташа Байдужа',
              props: { className: 'key-link', target: "_blank", to: 'http://bayduzha.com/' },
            }
          ]
        },
        {
          id: 'bayduzha4.webp',
          alt: 'bayduzha4',
          caption: [
            {
              tag: 'a',
              content: 'Наташа Байдужа',
              props: { className: 'key-link', target: "_blank", to: 'http://bayduzha.com/' },
            }
          ]
        },
        {
          id: 'AmandaLobos4.webp',
          alt: 'AmandaLobos4',
          caption: [
            {
              tag: 'a',
              content: 'Amanda Lobos',
              props: { className: 'key-link', target: "_blank", to: 'https://www.behance.net/maisdeumlobo' },
            }
          ]
        },
        {
          id: 'AmandaLobos5.webp',
          alt: 'AmandaLobos5',
          caption: [
            {
              tag: 'a',
              content: 'Amanda Lobos',
              props: { className: 'key-link', target: "_blank", to: 'https://www.behance.net/maisdeumlobo' },
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
          id: 'AmandaLobos10.webp',
          alt: 'AmandaLobos10',
          caption: [
            {
              tag: 'a',
              content: 'Amanda Lobos',
              props: { className: 'key-link', target: "_blank", to: 'https://www.behance.net/maisdeumlobo' },
            }
          ]
        },
      ]
    },
    {
      type: 'title',
      title: 'Иллюстрации для упаковки',
    },
    {
      type: 'gallery',
      maxHeightPx: 2_300,
      images: [
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
    {
      type: 'title',
      title: 'Иллюстрации для оформления пространств',
    },
    {
      type: 'gallery',
      maxHeightPx: 1_500,
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
          id: 'RohanDahotre1.webp',
          alt: 'RohanDahotre1',
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
    {
      type: 'title',
      title: 'Иллюстрации для обложек альбомов или подкастов',
    },
    {
      type: 'text',
      text: 'Дизайн обложки — визуальный ключ к музыке. Это изображение создаёт первое впечатление об альбоме и сопровождает слушателей на каждом этапе пути. Обложка — это обещание эмоций, которые человек получит от музыки, и шанс мгновенно привлечь внимание.',
    },
    {
      type: 'gallery',
      maxHeightPx: 900,
      images: [
        {
          id: ' EllaMezule1.webp',
          alt: ' EllaMezule1',
          caption: [
            {
              tag: 'a',
              content: 'Jazz music band "Anders Bast & The Bast\'ards" album',
              props: { className: 's-hoverable', target: "_blank", to: 'https://music.yandex.ru/album/14889733/track/80939520' },
            }
          ]
        },
        {
          id: 'EllaMezule2.webp',
          alt: 'EllaMezule2',
          caption: [
            {
              tag: 'a',
              content: 'Swedish contemporary folk band\'s Trio Rop album',
              props: { className: 's-hoverable', target: "_blank", to: 'https://music.yandex.ru/album/14889733/track/80939520' },
            }
          ]
        },
        {
          id: 'OlgaRodzik.webp',
          alt: 'OlgaRodzik',
          caption: [
            {
              tag: 'a',
              content: 'Сингл “Вимкни телефон”, Tvorchi',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/gallery/157088495/TVORCHI' },
            }
          ]
        },
        {
          id: 'AdaZielinska1.webp',
          alt: 'AdaZielińska1',
          caption: [
            {
              tag: 'a',
              content: 'Polish Jazz Bend Bled',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/gallery/136226431/BLED-Visual-Identity' },
            }
          ]
        },
      ]
    },
    {
      type: 'title',
      title: 'Иллюстрации для книг',
    },
    {
      type: 'gallery',
      maxHeightPx: 1_100,
      images: [
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
          id: 'AmandaLobos12.webp',
          alt: 'AmandaLobos12',
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
    {
      type: 'title',
      title: 'Иллюстрации для медиа',
    },
    {
      type: 'gallery',
      maxHeightPx: 1_600,
      images: [
        {
          id: 'AsahiNagata8.webp',
          alt: 'AsahiNagata8',
          caption: [
            {
              tag: 'a',
              content: 'Asahi Nagata',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/nagataae6d8' },
            }
          ]
        },
        {
          id: 'StudioZwupp5.webp',
          alt: 'StudioZwupp5',
          caption: [
            {
              tag: 'a',
              content: 'Studio Zwupp',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.behance.net/zwupp' },
            }
          ]
        },
        {
          id: 'IlyaMilstein10.webp',
          alt: 'IlyaMilstein10',
          caption: [
            {
              tag: 'a',
              content: 'Ilya Milstein',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.ilyamilstein.com/' },
            }
          ]
        },
        {
          id: 'IlyaMilstein8.webp',
          alt: 'IlyaMilstein8',
          caption: [
            {
              tag: 'a',
              content: 'Ilya Milstein',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.ilyamilstein.com/' },
            }
          ]
        },
        {
          id: 'IlyaMilstein4.webp',
          alt: 'IlyaMilstein4',
          caption: [
            {
              tag: 'a',
              content: 'Ilya Milstein',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.ilyamilstein.com/' },
            }
          ]
        },
        {
          id: 'IlyaMilstein3.webp',
          alt: 'IlyaMilstein3',
          caption: [
            {
              tag: 'a',
              content: 'Ilya Milstein',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.ilyamilstein.com/' },
            }
          ]
        },
        {
          id: 'IlyaMilstein6.webp',
          alt: 'IlyaMilstein6',
          caption: [
            {
              tag: 'a',
              content: 'Ilya Milstein',
              props: { className: 's-hoverable', target: "_blank", to: 'https://www.ilyamilstein.com/' },
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
      ]
    }
  ]
}

const lessonData22: ILessonDataDB = {
  id: 'WorkSteps_fawKxs',
  courseId: 'how-to-draw',
  title: 'Этапы работы над иллюстрацией',
  type: 'Theory',
  topic: 'Как это — быть иллюстратором',
  topicOrder: 2,
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

const lessonData31: ILessonDataDB = {
  id: 'DrawingExercises_h3dx7k',
  courseId: 'how-to-draw',
  title: 'Упражнения, чтобы разрисоваться',
  type: 'Theory',
  topic: 'Линия',
  topicOrder: 3,
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

const lessonData32: ILessonDataDB = {
  id: 'LineIntroduction_gBpaFa',
  courseId: 'how-to-draw',
  title: 'Линия: знакомство',
  type: 'Theory',
  topic: 'Линия',
  topicOrder: 3,
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

const lessonData33: ILessonDataDB = {
  id: 'LineShape_RY7PQ3',
  courseId: 'how-to-draw',
  title: 'Линия: как рисовать объемно',
  type: 'Theory',
  topic: 'Линия',
  topicOrder: 3,
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

const lessonData34: ILessonDataDB = {
  id: 'HowToDrawSimilarPicture_bah4tw',
  courseId: 'how-to-draw',
  title: 'Как рисовать похоже',
  type: 'Theory',
  topic: 'Линия',
  topicOrder: 3,
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

const lessonData35: ILessonDataDB = {
  id: 'HowToDrawSimilarPictureLine_t6qrnq',
  courseId: 'how-to-draw',
  title: 'Как рисовать похоже. Линия',
  type: 'Theory',
  topic: 'Линия',
  topicOrder: 3,
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

const lessonData41: ILessonDataDB = {
  id: 'HowToDrawSimilarPictureLine_t6qrnq_Practice_iqln35',
  courseId: 'how-to-draw',
  title: 'Практика первой недели',
  type: 'Practice',
  topic: 'Линия: Практика',
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

const lessonData51: ILessonDataDB = {
  id: 'DifferencesLineSpot_W4baHU',
  courseId: 'how-to-draw',
  title: 'Про разницу между линией и пятном',
  type: 'Theory',
  topic: 'Пятно',
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

const lessonData52: ILessonDataDB = {
  id: 'SpotIntroduction_R4vzDr',
  courseId: 'how-to-draw',
  title: 'Пятно: знакомство',
  type: 'Theory',
  topic: 'Пятно',
  topicOrder: 5,
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

const lessonData53: ILessonDataDB = {
  id: 'HowToDrawSimilarPictureSpot_p6hXtt',
  courseId: 'how-to-draw',
  title: 'Как рисовать похоже. Пятно',
  type: 'Theory',
  topic: 'Пятно',
  topicOrder: 5,
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

const lessonData54: ILessonDataDB = {
  id: 'SpotShape_dftUrH',
  courseId: 'how-to-draw',
  title: 'Как рисовать объемно. Пятно',
  type: 'Theory',
  topic: 'Пятно',
  topicOrder: 5,
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

const lessonData61: ILessonDataDB = {
  id: 'SpotPractice_kfKAEY',
  courseId: 'how-to-draw',
  title: 'Практика второй недели',
  type: 'Practice',
  topic: 'Пятно: Практика',
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

const lessonData71: ILessonDataDB = {
  id: 'LineAndSpot_jr2WYu',
  courseId: 'how-to-draw',
  title: 'Линия и пятно: как совмещать',
  type: 'Theory',
  topic: 'Линия и пятно',
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

const lessonData72: ILessonDataDB = {
  id: 'ContrastNuance_9rP6Yl',
  courseId: 'how-to-draw',
  title: 'Как выделить главное: контраст, нюанс',
  type: 'Theory',
  topic: 'Линия и пятно',
  topicOrder: 7,
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

const lessonData81: ILessonDataDB = {
  id: 'LineSpotPractice_L8A8Jk',
  courseId: 'how-to-draw',
  title: 'Практика третьей недели',
  type: 'Practice',
  topic: 'Линия и пятно: Практика',
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

const lessonDataFYS0: ILessonDataDB = {
  id: 'Checklist_hUpx7l',
  courseId: 'finding-your-style',
  title: 'Чек-лист продуктивного обучения',
  type: 'Theory',
  topic: 'Чек-лист продуктивного обучения',
  topicOrder: 1,
  orderInTopic: 1,
  duration: {
    unit: 'hours',
    value: 1
  },
  isFree: true,
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

const lessonDataFYS1: ILessonDataDB = {
  id: 'IllustrationSeriesStyle_C4qFhu',
  courseId: 'finding-your-style',
  title: '1. Что такое иллюстрация, серия, стиль',
  type: 'Theory',
  topic: 'Что такое иллюстрация, серия, стиль',
  topicOrder: 2,
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

const lessonDataFYS2: ILessonDataDB = {
  id: 'Narrative_ stPfNE',
  courseId: 'finding-your-style',
  title: '2. Литературный сюжет: что рисовать',
  type: 'Theory',
  topic: '2. Литературный сюжет: что рисовать',
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

const lessonDataFYS3: ILessonDataDB = {
  id: 'VisualConcept_WeYEGw',
  courseId: 'finding-your-style',
  title: '3. Пластический сюжет: как рисовать',
  type: 'Theory',
  topic: 'Пластический сюжет: как рисовать',
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

const lessonDataFYS4: ILessonDataDB = {
  id: 'FindingYourStyle_Practice_ t4jUts',
  courseId: 'finding-your-style',
  title: 'Практика интенсива',
  type: 'Practice',
  topic: 'Практика интенсива',
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
  lessonData15,
  lessonData21,
  lessonData22,
  lessonData31,
  lessonData32,
  lessonData33,
  lessonData34,
  lessonData35,
  lessonData41,
  lessonData51,
  lessonData52,
  lessonData53,
  lessonData54,
  lessonData61,
  lessonData71,
  lessonData72,
  lessonData81,
  lessonDataFYS0,
  lessonDataFYS1,
  lessonDataFYS2,
  lessonDataFYS3,
  lessonDataFYS4,
];
