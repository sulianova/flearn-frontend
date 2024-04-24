import { firebaseService } from 'services/firebase.service';
import { ECollections } from 'types';
import { v4 } from 'uuid';
import { EEmail, type TEmail, type TContact } from './types';
import { formatDate } from 'utils';
import { ICourseData } from 'services/course.service';
import { i18n } from 'shared/translations'

export { EEmail } from './types';

type TProps = { to: TContact } & (
  | { type: EEmail.OrderCreated, orderId: string }
  | { type: EEmail.PaymentMethods, orderId: string, course: ICourseData }
  | { type: EEmail.FindingYourStyleCourseIsStartingTomorrow, startDate: Date }
);

class EmailService {
  public EEmail = EEmail;

  public async sendEmail(props: TProps): Promise<void> {
    const email = this.getEmail(props);
    const id = this.getId(props);
    await firebaseService.setDoc(ECollections.Email, id, email);
  }

  private senderContact: TContact = {
    email: 'info@flearn.net',
    name: 'Sofiia Ulianova',
  };

  private getId(props: TProps) {
    const id = v4().slice(0, 4);
    switch (props.type) {
      case EEmail.OrderCreated:
        return `${props.orderId}-${id}`;
      case EEmail.PaymentMethods:
        return `${props.orderId}-${id}`;
      case EEmail.FindingYourStyleCourseIsStartingTomorrow:
        return `finding-your-style-${props.to.email}-course-is-starting-tomorrow-${id}`;
      default:
        throw new Error('Unknown email type');
    }
  }

  private getEmail(props: TProps): TEmail {
    switch (props.type) {
      case EEmail.OrderCreated:
        return this.getOrderEmail(props);
      case EEmail.PaymentMethods:
        return this.getPaymentMethodsEmail(props)
      case EEmail.FindingYourStyleCourseIsStartingTomorrow:
        return this.getCourseIsStartingTomorrowEmail(props);
      default:
        throw new Error('Unknown email type');
    }
  }

  private getOrderEmail(props: { to: TContact, orderId: string }): TEmail {
    const { to, orderId } = props;
    return {
      to: [to],
      from: this.senderContact,
      subject: 'Order created',
      html: `<p>Your order with id ${orderId} has been created.</p>`,
    };  
  }

  private getPaymentMethodsEmail(props: { to: TContact, course: ICourseData }): TEmail {
    const { to, course } = props;
    const startDate = formatDate(course.startDate, { timeZone: 'Europe/Moscow' });
    const price = (course.discontDeadline === null || new Date() < course.discontDeadline) ? course.creditPrice : course.creditWas;
    const courseTypeStr = i18n.t(`courseType.${course.type}`);
    return {
      to: [to],
      from: this.senderContact,
      subject: i18n.t(`emails.PaymentMethods.subject.${course.type}`, { startDate, title: course.title }),
      html: `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
        </head>
        <body>
          <p>Здравствуйте! Мы получили вашу заявку на ${courseTypeStr} “${course.title}”. Оплатить участие можно переводом на российскую карту или через Paypal.</p>
        
          <p style="white-space: pre-line;"><strong>Оплата в России</strong>&#10;На карту Тинькофф по номеру телефона +79162380397 Ульянова София Романовна — ${Math.round(price)} руб.</p>
        
          <p style="white-space: pre-line;"><strong>Оплата с зарубежной карты</strong>&#10;Через Paypal на аккаунт <a href="http://paypal.me/sofiulyanova">paypal.me/sofiulyanova</a> (Ulianova Sofiia) — ${Math.round(price/100)} евро. В назначении платежа не указывайте, пожалуйста, за что и для кого.</p>
        
          <p style="white-space: pre-line;"><strong>После оплаты</strong>&#10;Пришлите мне <a href="https://t.me/ulianova_sofia">в телеграмм</a> чек об оплате и почту, по которой планируете проходить ${courseTypeStr}. К этой почте должен быть привязан гугл-аккаунт.</p>
        
          <p>Если возникнут вопросы и трудности, <a href="https://t.me/ulianova_sofia">пишите мне в телеграмме</a></p>
        
          <p style="white-space: pre-line;">София&#10;Преподаватель, график-иллюстратор</p>
        </body>
        </html>
      `,
    };
  }

  private getCourseIsStartingTomorrowEmail(props: { to: TContact, startDate: Date  }): TEmail {
    const { to, startDate } = props;
    const startDateStr = formatDate(startDate, { timeZone: 'Europe/Moscow' });
    return {
      to: [to],
      from: this.senderContact,
      subject: `Старт ${startDateStr}: “Как найти стиль”, приглашение в телеграм-чат`,
      html: `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
        </head>
        <body>
          <p>Добрый день! Завтра, ${startDateStr}, стартует интенсив “Как найти стиль”.</p>
        
          <p><a href="https://t.me/+Pi3lxGTKYdhkZmYy">Переходите в телеграм-чат</a>, в группе будет вся дальнейшая информация.</p>
        
          <p style="white-space: pre-line;">София&#10;Преподаватель, график-иллюстратор</p>
        </body>
        </html>
      `,
    };
  }
}

export const emailService = new EmailService();

// (window as any).emailService = emailService;
