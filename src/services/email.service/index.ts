import { firebaseService } from "services/firebase.service";
import { ECollections } from "types";
import { v4 } from "uuid";
import type { TEmail, TContact } from "./types";

class EmailService {
  public async sendEmail(emailTo: string) {
    const id = v4().slice(0, 4);
    const email = {
      to: [{
        email: emailTo,
        name: 'Vladimir Fyodorov',
      }],
      from: {
        email: 'MS_aXZ7Sh@flearn.net',
        // email: 'info@flearn.net',
        name: 'Sofi',
      },
      subject: 'Hello from Firebase!',
      html: 'This is an HTML email body.',
      text: 'This is an TEXT email body.',
    };
    console.log('try to send email', { email, id });
    await firebaseService.setDoc(ECollections.EmailCollection, id, email);
  }

  private senderContact: TContact = {
    email: 'info@flearn.net',
    name: 'Sofi',
  };

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
