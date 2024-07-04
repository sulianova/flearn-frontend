import type { ICourseData, TCourseProductOptionTypes } from 'services/course.service';
import { i18n } from 'shared/translations';
import { formatCourseCredit, formatDate, getDiscountedPrice } from 'utils';

import Card from './components/Card';
import JoinTelegramCard from './components/JoinTelegramCard';
import Layout from './components/Layout';

export interface IWelcomeToPaidCourseEmailProps {
  course: ICourseData
  paymentOption: 'CARD_RU' | 'PAYPAL'
  productOption: TCourseProductOptionTypes
  dateOfPaiment: Date
}

WelcomeToPaidCourse.getSubject = function(props: IWelcomeToPaidCourseEmailProps) {
  return i18n.t(`emails.WelcomeToPaidCourse.subject.${props.course.type}`, { title: props.course.title });
}

export default function WelcomeToPaidCourse(props: IWelcomeToPaidCourseEmailProps) {
  const { course, paymentOption, productOption, dateOfPaiment } = props;

  const courseTypeStr = i18n.t(`courseType.${course.type}`);
  const option = course.productOptions[productOption]!;
  const { creditPrice: creditPriceRub } = getDiscountedPrice(course.discount, option);
  const creditPrice = Math.round(paymentOption === 'CARD_RU' ? creditPriceRub : creditPriceRub / 100);
  const currencySign = paymentOption === 'CARD_RU' ? '\u20BD' : '\u20AC';
  const creditPriceStr = formatCourseCredit(creditPrice, currencySign);
  const paymentMethodStr = {
    CARD_RU: 'Карта Тинькофф',
    PAYPAL: 'PayPal',
  }[paymentOption];
  const dateOfPaymentStr = formatDate(dateOfPaiment, { timeZone: 'Europe/Moscow', wTime: true });

  const mainCard = (
    <Card
      content={[
        {
          paddingTop: 5,
          paddingBottom: 20,
          value: (
            <tr>
              <td align="left" style={{ fontFamily: 'Helvetica,Arial,sans-serif', fontSize: 32, lineHeight: '38px', color: '#000000' }}>
                <span>Вы записались на {courseTypeStr} </span>
                <span style={{ color: '#262626' }}>«{course.title}»</span>
              </td>
            </tr>
          ),
        }, {
          paddingBottom: 5,
          value: (
            <tr>
              <td align="left" style={{ fontFamily: 'Helvetica,Arial,sans-serif', fontSize:16, lineHeight: '20px', color: '#000000' }}>
              <span>
                Вы сделали первый шаг на пути к новым навыкам, поздравляем! Мы получили ваше
                подтверждение об оплате. В течении 1-2 рабочих дней откроем доступ к материалам и
                пришлем письмо со ссылкой на первый платный урок.
                <br/>
                <br/>
                Сумма: {creditPriceStr}
                <br/>
                <br/>
                Способ оплаты: {paymentMethodStr}
                <br/>
                <br/>
                Дата и время (MSK): {dateOfPaymentStr}
              </span>
              </td>
            </tr>
          ),
        },
      ]}
    />
  );

  return (
    <Layout
      title='Подтверждение записи'
      gapPx={20}
      content={[
        mainCard,
        <JoinTelegramCard/>,
      ]}
    />
  );
}
