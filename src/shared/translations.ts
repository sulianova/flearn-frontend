import i18next, { TFunction } from 'i18next';

import ru from 'assets/translations/ru.json';

i18next.init({
  lng: 'ru',
  fallbackLng: 'ru',
  resources: {
    ru: {
      translation: ru,
    }
  }
});

// const i18n = new I18n({ ru });
// i18n.defaultLocale = 'ru';
// i18n.locale = 'ru';

// i18n.pluralization.register('ru', (_i18n, count) => {
//   const mod10 = count % 10;
//   const mod100 = count % 100;
//   let key;

//   const one = mod10 === 1 && mod100 !== 11;
//   const few = [2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100);
//   const many =
//     mod10 === 0 ||
//     [5, 6, 7, 8, 9].includes(mod10) ||
//     [11, 12, 13, 14].includes(mod100);

//   if (one) {
//     key = 'one';
//   } else if (few) {
//     key = 'few';
//   } else if (many) {
//     key = 'many';
//   } else {
//     key = 'other';
//   }

//   return [key];
// });

type Ttargs = Parameters<TFunction>;
const formatI18nT = (keyStart: string) => (...args: Ttargs) => {
  const keyEnd = args[0] as string | string[];
  const [, ...restArgs] = args;
  const key =  [keyStart, ...(typeof keyEnd === 'string' ? [keyEnd] : keyEnd)].join('.');
  return i18next.t(key, ...restArgs);
}

const i18n = i18next;

export { i18n, formatI18nT };
