import { firebaseService } from "services/firebase.service";
import { ECollections } from "types";
import { v4 } from "uuid";

class EmailService {
  public async sendEmail(emailTo: string) {
    const id = v4();
    const email = {
      to: [{
        email: emailTo,
        name: 'Vladimir Fyodorov',
      }],
      from: {
        email: 'ulianova.sofia@gmail.com',
        name: 'Sofi',
      },
      subject: 'Hello from Firebase!',
      html: 'This is an HTML email body.',
      text: 'This is an TEXT email body.',
    };
    console.log('try to send email', { email, id });
    await firebaseService.setDoc(ECollections.EmailCollection, id, email);
  }
}

export const emailService = new EmailService();
