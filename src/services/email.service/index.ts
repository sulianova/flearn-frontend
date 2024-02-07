import { firebaseService } from 'services/firebase.service';
import { ECollections } from 'types';
import { v4 } from 'uuid';
import { EEmail, type TEmail, type TContact } from './types';

export { EEmail } from './types';
class EmailService {
  public EEmail = EEmail;
  public async sendEmail(props: { type: EEmail.OrderCreated, to: TContact, orderId: string }) {
    if ((window as any)?.sendEmail !== true) {
      console.log('skip email sending', props);
      return;
    }
    const email = this.getEmail(props);
    const id = this.getId(props);
    console.log('try to send email', props);
    await firebaseService.setDoc(ECollections.EmailCollection, id, email);
  }

  private senderContact: TContact = {
    email: 'info@flearn.net',
    name: 'Sofi',
  };

  private getId(props: { type: EEmail.OrderCreated, orderId: string }) {
    const id = v4().slice(0, 4);
    switch (props.type) {
      case EEmail.OrderCreated:
        return `order-created-${props.orderId}-${id}`;
      default:
        throw new Error('Unknown email type');
    }
  }

  private getEmail(props: { type: EEmail.OrderCreated, to: TContact, orderId: string }): TEmail {
    switch (props.type) {
      case EEmail.OrderCreated:
        return this.getOrderEmail(props);
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
}

export const emailService = new EmailService();
