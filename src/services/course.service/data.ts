import { isDefined } from 'utils';
import { ICourseDataDB } from './types/index';

export function getData(courseIds: string[]) {
  return courseIds
    .map(courseId => allCourses.find(l => l.id === courseId))
    .filter(isDefined);
}

const courseDB1: ICourseDataDB = {
  id: 'how-to-draw',
  type: 'course',
  title: 'Композиция: как выделить главное',
  startDate: '2024.05.26 21:00:00 GMT',
  endDate: '2024.06.23 20:59:00 GMT',
  accessDeadline: '2024.06.23 20:59:00 GMT',
  duration: {
    unit: 'week',
    value: 4,
  },
  homeworksNumber: 3,
  level: 'beginner',
  discount: {
    amountPrc: 5,
  },
  productOptions: {
    BASE: {
      price: 3_000,
    },
    OPTIMAL: {
      price: 12_000,
    },
  },
  feild: 'Иллюстрация',
  tags: ['композиция', 'рисование по фото', 'наброски', 'персонаж'],
  introImage: {
    imageId: {
      desktop: 'introImage.jpg',
      mobile: 'introImage.jpg',
    },
    imageAlt: 'introImage',
  },
  introDescription: 'Научитесь ясно выражать свою идею в рисунке и поймете, как управлять вниманием зрителей',
  cardImage: {
    imageId: 'introImage.jpg',
    imageAlt: 'introImage',
  },
  telegramLink: 'https://t.me/+yIvKOdKrLYdlYzMy',
  content: {
    about: [
      {
        icon: 'Highlight',
        text: 'познакомитесь с инструментами иллюстратора: линия, пятно, цвет',
      },
      {
        icon: 'Sketching',
        text: 'узнаете, как выделять главное в рисунке'
      },
      {
        icon: 'Portfolio',
        text: 'научитесь применять навыки на практике и сделаете серию работ для портфолио'
      },
    ],
    description: [
      {
        answer: 'Будем учиться работать базовыми инструментами: линией, пятном и цветом. Разберемся, чем они отличаются, как их использовать. Сделаем упражнения, чтобы разрисоваться.',
        question: 'Не знает с чего начать'
      },
      {
        answer: 'Разница - это средство выразительности. Если разница велика - это контраст. Если мала - нюанс. Когда мы подчеркиваем разницу - размеров, форм, яркости, чего угодно - мы делаем рисунок более выразительным.',
        question: 'Хочет научиться управлять вниманием зрителей'
      },
      {
        answer: 'Разберемся, как искать композицию и организовывать лист для рисунка по воображению. Будем практиковать упражнения, которые помогают свободно гнуть, тянуть и поворачивать натуру.',
        question: 'Хочет рисовать по воображению'
      },
    ],
    modules: [
      {
        meta: [
          {
            content: '5 уроков・5 часов',
            tag: 'span',
          }
        ],
        title: 'Этапы работы над иллюстрацией',
        lessonsNumber: 5,
        homeworksNumber: 1,
        description: '1 модуль — бесплатно, чтобы понять, подходит ли вам иллюстрация. А после бесплатной части выберете подходящий формат курса: самостоятельный или с обратной связью.',
        tags: ['Поиск идеи', 'Мудборд', 'Референсы', 'Портрет аудитории'],
        duration: {
          unit: 'hour',
          value: 5,
        },
        subsectionDescription: 'На примере постера пройдете ключевые этапы работы над иллюстрацией',
        subsection: [
          { subsectionTitle: 'Как придумать идею для проекта', subsectionText: 'Портрет аудитории. Мудборд и референсы.' },
          { subsectionTitle: 'Знакомство с Photoshop', subsectionText: 'Что умеет Photoshop. Основные функции Photoshop.'},
          { subsectionTitle: 'Базовые навыки иллюстратора', subsectionText: 'Подбор инструментов, работа с цветом, поиск композиции'},
        ],
      },
      {
        meta: [
          {
            content: '1 практическая работа・5 уроков・15 часов',
            tag: 'span',
          }
        ],
        title: 'Линия',
        lessonsNumber: 5,
        homeworksNumber: 1,
        tags: ['Быстрые наброски', 'Характер линии', 'Выделение главного', 'Photoshop'],
        duration: {
          unit: 'hour',
          value: 16,
        },
        subsectionDescription: '5-6 иллюстраций, в которых главный инструмент выразительности — линия',
        subsection: [
          { subsectionTitle: 'Уражнения', subsectionText: 'Познакомимся с упражнениями, которые помогают чувствовать себя увереннее в рисовании. Их можно делать для разминки перед рисованием или целенаправленно тренировать то, что плохо получается' },
          { subsectionTitle: 'Свойства линии', subsectionText: 'Основные свойства линий: контроль, светлота, толщина. Разберемся, как с помощью этих свойств, можно разнообразить свои рисунки'},
          { subsectionTitle: 'Контраст, нюанс', subsectionText: 'Разберемся, как создавать контрасты и акценты в линейном рисунке'},
          { subsectionTitle: 'Photoshop', subsectionText: 'Узнаем, как оцифровать линейный рисунок в Photoshop и довести его до завершенной иллюстрации'},
        ],
      },
      {
        meta: [
          {
            content: '1 практическая работа・5 уроков・10 часов',
            tag: 'span',
          }
        ],
        title: 'Пятно',
        lessonsNumber: 5,
        homeworksNumber: 1,
        tags: ['Быстрые наброски', 'Светлота', 'Фактура', 'Photoshop'],
        duration: {
          unit: 'hour',
          value: 16,
        },
        subsectionDescription: '5-6 иллюстраций, в которых главный инструмент выразительности — пятно',
        subsection: [
          { subsectionTitle: 'Линия и пятно', subsectionText: 'Линия и пятно — два слоя, из которых складывается изображение. Будем учиться совмещать линейное и пятновое рисование в одной работе' },
          { subsectionTitle: 'Свойства пятна', subsectionText: 'Основные свойства пятен: контроль, светлота, прозрачность, фактура. Разберемся, как с помощью этих свойств, можно разнообразить свои рисунки'},
          { subsectionTitle: 'Контраст, нюанс', subsectionText: 'Разберемся, как создавать контрасты и акценты в линейном рисунке'},
          { subsectionTitle: 'Photoshop', subsectionText: 'Узнаем, как оцифровать пятновой рисунок в Photoshop и довести его до завершенной иллюстрации'},
        ],
      },
      {
        meta: [
          {
            content: '1 практическая работа・5 уроков・18 часов',
            tag: 'span',
          }
        ],
        title: 'Цвет',
        lessonsNumber: 5,
        homeworksNumber: 1,
        duration: {
          unit: 'hour',
          value: 16,
        },
        tags: ['Насыщенность', 'Светлота', 'Теплота', 'Хроматический контраст', 'Photoshop'],
        subsectionDescription: '5-6 иллюстраций, в которых главный инструмент выразительности — цвет',
        subsection: [
          { subsectionTitle: 'Свойства цвета', subsectionText: 'Свойства цвета: светлота, насыщенность, теплота, цвет, размер пятна. Разберемся, как с помощью этих свойств, можно разнообразить свои рисунки'},
          { subsectionTitle: 'Контраст, нюанс', subsectionText: 'Разберемся, как создавать контрасты и акценты с помощью цвета'},
          { subsectionTitle: 'Photoshop', subsectionText: 'Узнаем, как рисовать цветом в Photoshop'},
        ],
      },
    ],
    explainMedia: {
      type: 'image',
      imageId: 'SofiUlianova.jpg',
      imageAlt: 'SofiUlianova',
    },
    teacherGallery: [
      {
        imageId: 'SofiUlianova23.jpg',
        imageAlt: 'SofiUlianova23',
      },
      {
        imageId: 'SofiUlianova25.jpg',
        imageAlt: 'SofiUlianova25',
      },
      {
        imageId: 'SofiUlianova22.jpg',
        imageAlt: 'SofiUlianova22',
      },
    ],
    // studentsWorks: [
    //   {
    //     imageId: 'Block1.png',
    //     imageAlt: 'Block1',
    //   },
    //   {
    //     imageId: 'Block2.png',
    //     imageAlt: 'Block2',
    //   },
    //   {
    //     imageId: 'Block3.png',
    //     imageAlt: 'Block3',
    //   },
    //   {
    //     imageId: 'Block4.png',
    //     imageAlt: 'Block4',
    //   },
    // ],
    faq: [
      {
        question: 'Как проходит онлайн обучение',
        answer: ' Всю информацию и практические задания мы собрали в интерактивном учебнике. Проходить его можно в любое удобное время, с компьютера или с телефона. Вопросы, возникающие по ходу задаем в любое время в телеграмм-канале — раз в сутки преподаватель отвечает на них.'
      },
      {
        question: 'Какие материалы нужны',
        answer: 'Линейные: ручка или черный карандаш. Пятновые: черная тушь, круглая кисточка. Бумага плотностью 180-250г/м. Photoshop или Procreate.'
      },
      {
        question: 'Подойдет ли мне курс, если я раньше не рисовал',
        answer: 'Да, подойдет. Курс рассчитан для начинающих рисовальщиков.'
      },
      {
        question: 'Сколько длится доступ к материалам курса',
        answer: 'Доступ к материалам останется навсегда.'
      },
      {
        question: 'Как оплатить зарубежной картой',
        answer: 'Мы принимаем платежи в России и из-за рубежа.'
      },
      {
        question: 'Как вернуть деньги, если мне не понравился курс',
        answer: 'До конца первой недели можно отказаться от курса и вернуть деньги. Для этого напишите нам на почту или в телеграмме.'
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
        title: 'Наглядная теория с бессрочным доступом',
        caption: 'Для самостоятельного изучения',
        description: 'Объясняем теорию простым языком, с иллюстрациями и схемами. Всю информацию и практические задания мы собрали в интерактивном учебнике. Проходить его можно в любое удобное время, с компьютера или с телефона.',
      },
      {
        title: 'Вопросы по ходу',
        caption: 'Каждый день',
        description: 'Вопросы, возникающие по ходу, задаем в любое время в телеграм-чате. В чате можно обсуждать рисование, делиться радостями, горестями, лайфхаками и красивыми картинками, поддерживать друг друга и болтать.',
      },
      {
        title: 'Обратная связь от практикующих экспертов',
        caption: 'По заданиям',
        description: [
          { tag: 'p', content: 'В конце каждого блока вы сдаёте проект, чтобы закрепить пройденное и получить обратную связь от эксперта. Опытные иллюстраторы подробно разберут ваши работы и подскажут, как их развивать дальше.' },
        ],
      },
    ],
  },
}

const courseDB2: ICourseDataDB = {
  id: 'finding-your-style',
  type: 'intensive',
  title: 'Стиль в иллюстрации',
  startDate: '2024.05.16 21:00:00 GMT',
  endDate: '2024.05.26 20:59:00 GMT',
  accessDeadline: '2024.05.26 20:59:00 GMT',
  duration: {
    unit: 'day',
    value: 10,
  },
  homeworksNumber: 1,
  feild: 'Иллюстрация',
  tags: ['иллюстрация', 'рисование по воображению', 'серия'],
  level: 'beginner',
  discount: {
    amountPrc: 5,
  },
  productOptions: {
    BASE: {
      price: 1_000,
    },
    OPTIMAL: {
      price: 5_000,
    },
  },
  introImage: {
    imageId: {
      desktop: 'introImage.jpg',
      mobile: 'introImage.jpg',
    },
    imageAlt: 'introImage',
  },
  introDescription: 'Разберемся, из чего состоит авторский стиль и сделаем  серию для портфолио',
  cardImage: {
    imageId: 'introImage.jpg',
    imageAlt: 'introImage',
  },
  telegramLink: 'https://t.me/+Pi3lxGTKYdhkZmYy',
  content: {
    about: [
      {
        icon: 'Highlight',
        text: 'познакомитесь с основами иллюстрации\n— узнаете, из чего состоит авторский стиль',
      },
      {
        icon: 'Sketching',
        text: 'узнаете, как улучшить вашу изобразительную манеру.'
      },
      {
        icon: 'Portfolio',
        text: 'научитесь применять навыки на практике и сделаете серию работ для портфолио'
      },
    ],
    description: [
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
    modules: [
      {
        meta: [
          {
            content: '5 уроков・5 часов',
            tag: 'span',
          }
        ],
        title: 'Этапы работы над иллюстрацией',
        lessonsNumber: 5,
        homeworksNumber: 1,
        description: '1 модуль — бесплатно, чтобы понять, подходит ли вам иллюстрация. А после бесплатной части выберете подходящий формат курса: самостоятельный или с обратной связью.',
        tags: ['Поиск идеи', 'Мудборд', 'Референсы', 'Портрет аудитории'],
        duration: {
          unit: 'hour',
          value: 5,
        },
        subsectionDescription: 'На примере постера пройдете ключевые этапы работы над иллюстрацией',
        subsection: [
          { subsectionTitle: 'Как придумать идею для проекта', subsectionText: 'Портрет аудитории. Мудборд и референсы.' },
          { subsectionTitle: 'Знакомство с Photoshop', subsectionText: 'Что умеет Photoshop. Основные функции Photoshop.'},
          { subsectionTitle: 'Базовые навыки иллюстратора', subsectionText: 'Подбор инструментов, работа с цветом, поиск композиции'},
        ],
      },
      {
        meta: [
          {
            content: '3 урока・1 неделя',
            tag: 'span',
          }
        ],
        title: 'Что такое иллюстрация, серия, стиль',
        lessonsNumber: 3,
        homeworksNumber: 0,
        duration: {
          unit: 'hour',
          value: 5,
        },
        description: 'Разберемся из чего складывается иллюстрация, проанализируем работы других художников. Подумаем, какие ценности важны для нас, из чего может складываться наш собственный стиль',
      },
      {
        meta: [
          {
            content: '3 урока・1 неделя',
            tag: 'span',
          }
        ],
        title: 'Литературный сюжет — то, что изображаем',
        lessonsNumber: 3,
        homeworksNumber: 0,
        duration: {
          unit: 'hour',
          value: 5,
        },
        description: 'Разберемся, как придумывать острые, запоминающиеся сюжеты',
        tags: ['конфликт в графике', 'сюжет в один кадр']
      },
      {
        meta: [
          {
            content: '3 урока・1 неделя',
            tag: 'span',
          }
        ],
        title: 'Пластический сюжет — то, как мы это изображаем',
        lessonsNumber: 3,
        homeworksNumber: 0,
        duration: {
          unit: 'hour',
          value: 5,
        },
        description: 'Научимся анализировать работы других иллюстраторов и применять находки в своих рисунках',
        tags: ['композиция', 'контрастность', 'формообразование', 'модульность', 'силуэт', 'контрформа']
      },
    ],
    explainMedia: {
      type: 'image',
      imageId: 'SofiUlianova.jpg',
      imageAlt: 'SofiUlianova',
    },
    teacherGallery: [
      {
        imageId: 'SofiUlianova23.jpg',
        imageAlt: 'SofiUlianova23',
      },
      {
        imageId: 'SofiUlianova25.jpg',
        imageAlt: 'SofiUlianova25',
      },
      {
        imageId: 'SofiUlianova22.jpg',
        imageAlt: 'SofiUlianova22',
      },
    ],
    studentsWorks: [],
    studyProcess: [
      {
        title: 'Наглядная теория с бессрочным доступом',
        caption: 'Для самостоятельного изучения',
        description: 'Объясняем теорию простым языком, с иллюстрациями и схемами. Всю информацию и практические задания мы собрали в интерактивном учебнике. Проходить его можно в любое удобное время, с компьютера или с телефона.',
      },
      {
        title: 'Вопросы по ходу',
        caption: 'Каждый день',
        description: 'Вопросы, возникающие по ходу, задаем в любое время в телеграм-чате. В чате можно обсуждать рисование, делиться радостями, горестями, лайфхаками и красивыми картинками, поддерживать друг друга и болтать.',
      },
      {
        title: 'Обратная связь от практикующих экспертов',
        caption: 'По заданиям',
        description: [
          { tag: 'p', content: 'В конце каждого блока вы сдаёте проект, чтобы закрепить пройденное и получить обратную связь от эксперта. Опытные иллюстраторы подробно разберут ваши работы и подскажут, как их развивать дальше.' },
        ],
      },
    ],
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
        author: { name: 'Irina Ozolina', description: 'выпускница набора 8 янв 2024' },
        quote: [
          { tag: 'p', content: 'Я новичок в иллюстрации, пыталась разбираться сама. 3 дня интенсива мне дали путь, знание куда нужно идти, мотивацию рисовать и веру в себя. София эксперт во всем, о чем говорит. Информация очень полезная и логичная. Огромная польза от общения. Спасибо!' },
        ],
        excerpt: '3 дня интенсива мне дали путь, знание куда нужно идти, мотивацию рисовать и веру в себя'
      },
      {
        author: { name: 'aalinaaly', description: 'выпускница набора 8 янв 2024' },
        quote: [
          { tag: 'p', content: 'Спасибо вам большое за все комментарии и за этот чудесный интенсив! Супер полезно и важно для моего развития, как иллюстраторши.' },
        ],
      },
      {
        author: { name: 'Анастасия Баранова', description: 'выпускница набора 9 февраля 2024' },
        quote: [
          { tag: 'p', content: 'На интенсиве я научилась более системно относиться к проработке иллюстраций. Обычно я рисую бездумно, по вдохновению, и обычно по первому эскизу. Но благодаря курсу я смогла вспомнить о том, как важно словами формулировать идею, рисовать как можно больше эскизов, заранее подбирать референсы. И конечно я поняла, что насмотренность — наше все. Очень классно было рассказано о том как анализировать чужие работы, просто смотреть недостаточно.' },
        ],
        excerpt: 'Очень классно было рассказано о том как анализировать чужие работы, просто смотреть недостаточно'
      },
      {
        author: { name: 'Dora Zeev', description: 'выпускница набора 9 февраля 2024' },
        quote: [
          { tag: 'p', content: 'Интенсив получился очень интересный, много материала на подумать. Мои представления о серии несколько расширились. Раньше мне казалось, что все работы должны быть чуть ли не одинаковыми, чтоб считаться серией.' },
          { tag: 'p', content: 'Мне оказалось очень сложно делать много вариантов одного и того же, я на первом же более-менее удачном залипаю и не могу уйти. Пример с кружочком, который по разному изменяется по разным осям, мне очень помог не останавливаться на одном-двух эскизах.' }
        ],
      },
      {
        author: { name: 'Wambanuka', description: 'выпускница набора 9 февраля 2024' },
        quote: [
          { tag: 'p', content: 'Интенсив состоит из трёх блоков, каждый из которых позволяет понять грани, из которых складывается авторский стиль или одна серия работ. Всё описано очень понятно, с примерами. Для меня было много новой информации. Форма подачи материала максимально удобная - без лишней воды, сделан упор на разбор примеров, на тренировку способности анализировать работы других авторов и свои. Интенсив помог мне лучше анализировать работы, это, как мне кажется, самый важный навык для художника.' },
        ],
        excerpt: 'Интенсив помог мне лучше анализировать работы, это, как мне кажется, самый важный навык для художника'
      }
    ],
    faq: [
      {
        question: 'Как проходит онлайн обучение',
        answer: ' Всю информацию и практические задания мы собрали в интерактивном учебнике. Проходить его можно в любое удобное время, с компьютера или с телефона. Вопросы, возникающие по ходу задаем в любое время в телеграмм-канале — раз в сутки преподаватель отвечает на них.'
      },
      {
        question: 'Какие материалы нужны',
        answer: 'Берите те материалы, с которыми уже работали, знаете, как ими управлять. Цель интенсива — подсобрать и оформить наши текущие навыки, а не научиться новым. Если рисуете в цифре — рисуйте в цифре, рисуете маслом — отличный вариант. Если никогда не рисовали, возьмите черную тушь для пятна, ручку — для линии.'
      },
      {
        question: 'Подойдет ли мне курс, если я раньше не рисовал',
        answer: 'Да, подойдет. Курс рассчитан для начинающих рисовальщиков.'
      },
      {
        question: 'Сколько длится доступ к материалам курса',
        answer: 'Доступ к материалам останется навсегда.'
      },
      {
        question: 'Как оплатить зарубежной картой',
        answer: 'Мы принимаем платежи в России и из-за рубежа.'
      },
    ],
  }
}
  
export const allCourses = [
  courseDB1,
  courseDB2
];
