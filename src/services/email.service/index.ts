import { firebaseService } from 'services/firebase.service';
import { ECollections } from 'types';
import { v4 } from 'uuid';
import { EEmail, type TEmail, type TContact } from './types';

export { EEmail } from './types';

type TProps = { to: TContact } & (
  | { type: EEmail.OrderCreated, orderId: string }
  | { type: EEmail.FindingYourStyle1, orderId: string }
);

class EmailService {
  public EEmail = EEmail;

  public async sendEmail(props: TProps): Promise<void> {
    const email = this.getEmail(props);
    const id = this.getId(props);
    await firebaseService.setDoc(ECollections.EmailCollection, id, email);
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
      case EEmail.FindingYourStyle1:
        return `${props.orderId}-${id}`;
      default:
        throw new Error('Unknown email type');
    }
  }

  private getEmail(props: TProps): TEmail {
    switch (props.type) {
      case EEmail.OrderCreated:
        return this.getOrderEmail(props);
      case EEmail.FindingYourStyle1:
        return this.getFindingYourStyle1Email(props);
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

  private getFindingYourStyle1Email(props: { to: TContact }): TEmail {
    return {
      to: [props.to],
      from: this.senderContact,
      subject: 'Интенсив "Как найти стиль" 9 февраля',
      html: `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
        </head>
        <body>
          <p>Здравствуйте!</p>
        
          <p>Мы получили вашу заявку на интенсив “Как найти стиль”. Переходите по ссылке ниже, в группе будет вся дальнейшая информация по интенсиву.</p>
        
          <p><a href="https://t.me/+84BAabO9pZE5YTFi">Ссылка на телеграм-чат интенсива</a></p>
        
          <p style="white-space: pre-line;">София&#10;Преподаватель, график-иллюстратор</p>
        </body>
        </html>
      `,
    };
  }
}

export const emailService = new EmailService();
