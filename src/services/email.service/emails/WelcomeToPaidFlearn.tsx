import type { TCourseProductOptionTypes } from 'services/course.service';
import { i18n } from 'shared/translations';
import { formatCourseCredit, formatDate } from 'utils';

import Card from './components/Card';
import JoinTelegramCard from './components/JoinTelegramCard';
import Layout from './components/Layout';
import { IEmailContact } from '../types';
import { IDiscount } from 'services/data.service/Discount/types';
import { getDiscount } from 'components/BuyPopup/steps/utils';

export interface IWelcomeToPaidFlearnEmailProps {
  to: IEmailContact
  paymentOption: 'CARD_RU' | 'PAYPAL'
  productOption: TCourseProductOptionTypes
  dateOfPaiment: Date
  discount: IDiscount | null
}

WelcomeToPaidFlearn.getSubject = function(props: IWelcomeToPaidFlearnEmailProps) {
  return i18n.t(`emails.WelcomeToPaidFlearn.subject`);
}

export default function WelcomeToPaidFlearn(props: IWelcomeToPaidFlearnEmailProps) {
  const { paymentOption, productOption, dateOfPaiment, to, discount } = props;

  const { creditPrice: creditPriceRub } = getDiscount(discount, productOption);
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
                <span>Вы подтвердили оплату подписки</span>
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
      title='Подтверждение оплаты'
      to={to}
      gapPx={20}
      content={[
        mainCard,
        <JoinTelegramCard/>,
      ]}
    />
  );
}