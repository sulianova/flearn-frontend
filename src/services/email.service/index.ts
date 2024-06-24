import { v4 } from 'uuid';
import Handlebars from 'handlebars';

import { firebaseService } from 'services/firebase.service';
import { i18n } from 'shared/translations';
import { ECollections } from 'types';
import { URLSections } from 'router';
import { formatCourseCredit, formatDate, getDiscountedPrice } from 'utils';

import { EEmail } from './types';
import type { IEmail, IEmailContact, TSendEmailProps } from './types';
import type {
  TWelcomeToCourseProps,
  TWelcomeToPaidCourseProps,
  TDiscontSolveFreeLessonsInWeekProps,
  THomeworkSentForReviewProps,
  THomeworkSentForReviewToReviewerProps,
  THomeworkReviewedProps,
  THomeworkReviewedToReviewerProps
} from './types';
import EmailTemplateService from './emailTemplate.service';


class EmailService {
  public EEmail = EEmail;

  public async sendEmail(props: TSendEmailProps): Promise<void> {
    try {
      const email = this.getEmail(props);
      const id = this.getId(props);
      await firebaseService.setDoc(ECollections.Email, id, email);
    } catch (error) {
      console.log('Failed to send email', { props, error });
      throw error;
    }
  }

  private reviewerContact: IEmailContact = {
    email: 'ulianova.sofi@gmail.com',
    name: 'Sofiia Ulianova',
  };

  private senderContact: IEmailContact = {
    email: 'info@flearn.net',
    name: 'Sofiia Ulianova',
  };

  private getId(props: TSendEmailProps) {
    const id = v4().slice(0, 4);
    switch (props.type) {
      case this.EEmail.WelcomeToCourse:
      case this.EEmail.WelcomeToPaidCourse:
      case this.EEmail.DiscontSolveFreeLessonsInWeek:
        return `${props.type}-${props.course.id}-${props.to.email}-${id}`;
      case this.EEmail.HomeworkSentForReview:
      case this.EEmail.HomeworkReviewed:
        return `${props.type}-${props.course.id}-${props.lesson.id}-${props.to.email}-${id}`;
      case this.EEmail.HomeworkSentForReviewToReviewer:
      case this.EEmail.HomeworkReviewedToReviewer:
          return `${props.type}-${props.course.id}-${props.lesson.id}-${props.homeworkUser.email}-${id}`;
      default:
        throw new Error('Unknown email type');
    }
  }

  private getEmail(props: TSendEmailProps): IEmail {
    switch (props.type) {
      case EEmail.WelcomeToCourse:
        return this.getWelcomeToCourseEmail(props);
      case EEmail.WelcomeToPaidCourse:
        return this.getWelcomeToPaidCourseEmail(props);
      case EEmail.DiscontSolveFreeLessonsInWeek:
        return this.getDiscontSolveFreeLessonsInWeekEmail(props);
      case EEmail.HomeworkSentForReview:
        return this.getHomeworkSentForReviewEmail(props);
      case EEmail.HomeworkReviewed:
        return this.getHomeworkReviewedEmail(props);
      case EEmail.HomeworkSentForReviewToReviewer:
        return this.getHomeworkSentForReviewToReviewerEmail(props);
      case EEmail.HomeworkReviewedToReviewer:
        return this.getHomeworkReviewedToReviewerEmail(props);
      default:
        throw new Error('Unknown email type');
    }
  }

  private getWelcomeToCourseEmail(props: TWelcomeToCourseProps): IEmail {
    const { to, course, firstLesson } = props;
    const courseTypeStr = i18n.t(`courseType.${course.type}`);
    const startLink = firstLesson
      ? URLSections.Study.to({ courseId: course.id, lessonId: firstLesson.id, full: true })
      : URLSections.Profile.to({ courseId: course.id, full: true });
    const html = this.ts.Layout({
      title: 'Добро пожаловать на вводную часть',
      content: this.ts.WelcomeToCourse({
        courseType: courseTypeStr,
        courseTitle: course.title,
        startLink,
      }),
    });
  //   const original_html = `
  //   <!DOCTYPE html>
  //     <html lang="ru">
  //     <head>
  //       <meta charset="UTF-8">
  //       <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
  //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //       <title>Добро пожаловать на вводную часть</title>
  //     </head>
  //     <body>
  //       <table width="100%" style="padding:0;margin:0;overflow-x:hidden;">
  //         <tr>
  //           <td>
  //             <table align="center"  width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top=8px;line-height:normal;word-break:normal;">
  //               <tbody>
  //                 <tr>
  //                   <td align="center" bgcolor="#f5f5f5" style="background-color:#f5f5f5;padding:10px">
  //                     <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px">
  //                       <tbody>
  //                         <tr>
  //                           <td>
  //                             <table align="center"  width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top=8px;line-height:normal;word-break:normal;">
  //                               <tbody>
  //                                 <tr>
  //                                   <td align="center" bgcolor="#f5f5f5" style="background-color:#f5f5f5;padding:10px">
  //                                     <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px">
  //                                       <tbody>
  //                                         <tr>
  //                                           <td style="background-color:#f5f5f5;padding:26px 8px 0px;border-top-left-radius:25px;border-top-right-radius:25px" bgcolor:"#f5f5f5" align="center">
  //                                             <table style="max-width:540px;border-spacing:0px" width="100%" cellspacing="0" cellpadding="0" border="0">
  //                                               <tbody>
  //                                                 <tr>
  //                                                   <td align="left">
  //                                                     <table width="100%" cellspacing="0" cellpadding="0" border="0">
  //                                                       <tbody>
  //                                                         <tr>
  //                                                           <td style="font-size:0px;line-height:0px" valign="middle" align="left">
  //                                                             <table width="100%" cellspacing="0" cellpadding="0" border="0">
  //                                                               <tbody>
  //                                                                 <tr>
  //                                                                   <td style="font-size:14px;line-height:16px" align="left">
  //                                                                     <table width="100%" cellspacing="0" cellpadding="0" border="0">
  //                                                                       <tbody>
  //                                                                         <tr>
  //                                                                           <td align="left">
  //                                                                             <a style="font-family:Arial,Tahoma,Helvetica,sans-serif;font-size:18px;text-decoration:none;color:#262626" href="https://flearn.net">
  //                                                                               Freadom to Learn
  //                                                                             </a>
  //                                                                           </td>
  //                                                                         </tr>
  //                                                                       </tbody>
  //                                                                     </table>
  //                                                                   <table width="100%" cellspacing="0" cellpadding="0" border="0">
  //                                                                 <tbody>
  //                                                               <tr>
  //                                                             <td style="font-size:0;line-height:25px" height="25">
  //                                                           </td>
  //                                                         </tr>
  //                                                       </tbody>
  //                                                     </table>
  //                                                   </td>
  //                                                 </tr>
  //                                               </tbody>
  //                                             </table>
  //                                           </td>
  //                                         </tr>
  //                                       </tbody>
  //                                     </table>
  //                                   </td>
  //                                 </tr>
  //                               </tbody>
  //                             </table>
  //                           </td>
  //                         </tr>
  //                       </tbody>
  //                     </table>
  //                     <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px">
  //                       <tbody>
  //                         <tr>
  //                           <td style="background-color:#ffffffff;padding:30px 20px 20px;border-top-left-radius:25px;border-top-right-radius:25px" bgcolor="#ffffffff"  align="center">
  //                             <table style="max-width:540px;border-spacing:0px" width="100%" border="0" cellspacing="0" cellpadding="0">
  //                               <tbody>
  //                                 <tr>
  //                                   <td style="font-family:Helvetica,Arial,sans-serif;font-size:32px;line-height:38px;color:#000000" align="left">
  //                                     <span>Добро пожаловать на ${courseTypeStr} </span>
  //                                     <span style="color:#262626">«${course.title}»</span>
  //                                   </td>
  //                                 </tr>
  //                               </tbody>
  //                             </table>
  //                           </td>
  //                         </tr>
  //                         <tr>
  //                           <td style="background-color:#ffffffff;padding:0 20px 10px" bgcolor=#ffffffff" align="center">
  //                             <table style="max-width:540px;border-spacing:0px" width="100%" border="0" cellspacing="0" cellpadding="0">
  //                               <tbody>
  //                                 <tr>
  //                                   <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:20px;color:#000000" align="left">
  //                                     <span>
  //                                       Перед тем, как приступить к&nbsp;основному курсу, мы&nbsp;предлагаем всем студентам пройти бесплатную вводную часть. 
  //                                       <br>
  //                                       <br>
  //                                       За&nbsp;10&nbsp;часов
  //                                       <br>
  //                                       <br>
  //                                       → познакомитесь с&nbsp;форматом обучения в&nbsp;flearn
  //                                       <br>
  //                                       <br>
  //                                       → пройдете ключевые этапы работы над иллюстрацией
  //                                       <br>
  //                                       <br>
  //                                       → нарисуете обложку к любимой песне
  //                                       </span>
  //                                   </td>
  //                                 </tr>
  //                               </tbody>
  //                             </table>
  //                           </td>
  //                         </tr>
  //                         <tr>
  //                           <td style="background-color:#ffffff;padding:20px 20px 30px;border-bottom-left-radius:25px;border-bottom-right-radius:25px" bgcolor="#ffffff" align="center">
  //                             <table style-"max-width:540px;border-spacing:0px" width="100%" border="0" cellspacing="0" cellpadding="0">
  //                               <tbody>
  //                                 <tr>
  //                                   <td align="left">
  //                                     <table border="0" cellspacing="0" cellpadding="0" width="100%">
  //                                       <tbody>
  //                                         <tr>
  //                                           <td style="border-radius:100px;background-color:#262626" valign="middle" height="60" bgcolor="#262626" align="center" width="100%">
  //                                             <a href="${startLink}" style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:52px;font-weight:normal;white-space:nowrap;text-decoration:none;display:block;padding:0px 32px;color:#ffffff" target="_blank">
  //                                               <span style="color:#ffffffff;text-decoration:none" color="#ffffffff">
  //                                                 <span style="color:##ffffffff">Начать учиться</span>
  //                                               </span>
  //                                             </a>
  //                                           </td>
  //                                         </tr>
  //                                       </tbody>
  //                                     </table>
  //                                   </td>
  //                                 </tr>
  //                               </tbody>
  //                             </table>
  //                           </td>
  //                         </tr>
  //                         <tr>
  //                           <td align="center">
  //                           <table width="100%" border="0" cellspacing="0" cellpadding="0">
  //                             <tbody>
  //                               <tr>
  //                                 <td style="line-height:20px;font-size:0" height="20"></td>
  //                               </tr>
  //                             </tbody>
  //                           </table>
  //                           </td>
  //                         </tr>
  //                         <tr>
  //                           <td style="background-color:#ffffffff;padding:30px 20px 20px;border-top-left-radius:25px;border-top-right-radius:25px" bgcolor="#ffffffff" align="center">
  //                             <table style="max-width:540px;border-spacing:0px" width="100%" border="0" cellspacing="0" cellpadding="0">
  //                               <tbody>
  //                                 <tr>
  //                                   <td style="font-family:Helvetica,Arial,sans-serif;font-size:32px;line-height:38px;color:#000000" align="left">
  //                                     <span>
  //                                       Присоединяйтесь к нам в Telegram
  //                                     </span>
  //                                   </td>
  //                                 </tr>
  //                               </tbody>
  //                             </table>
  //                           </td>
  //                         </tr>
  //                         <tr>
  //                           <td style="background-color:#ffffff;padding:0 20px 20px" bgcolor="#ffffffff" align="center">
  //                             <table style="max-width:540px;border-spacing:0px" width="100%" border="0" cellspacing="0" cellpadding="0">
  //                               <tbody>
  //                                 <tr>
  //                                   <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:20px;color:#000000" valign="top" align="left">
  //                                     <span>
  //                                       Там мы рассказываем про анонсы и скидки на ранние запуски курсов в flearn. А также наш преподаватель, Соня Ульянова пишет про свои личные проекты и отвечает на вопросы студентов.
  //                                     </span>
  //                                   </td> 
  //                                 </tr>
  //                               </tbody>
  //                             </table>
  //                           </td>
  //                         </tr>
  //                         <tr>
  //                           <td style="background-color:#ffffff;padding:20px 20px 30px;border-bottom-left-radius:25px;border-bottom-right-radius:25px" bgcolor="#ffffff" align="center">
  //                             <table style-"max-width:540px;border-spacing:0px" width="100%" border="0" cellspacing="0" cellpadding="0">
  //                               <tbody>
  //                                 <tr>
  //                                   <td align="left">
  //                                     <table border="0" cellspacing="0" cellpadding="0" width="100%">
  //                                       <tbody>
  //                                         <tr>
  //                                           <td style="border-radius:100px;background-color:#262626" valign="middle" height="60" bgcolor="#262626" align="center">
  //                                             <a href="https://t.me/sofiulyanova" style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:52px;font-weight:normal;white-space:nowrap;text-decoration:none;display:block;padding:0px 32px;color:#ffffff" target="_blank">
  //                                               <span style="color:#ffffffff;text-decoration:none" color="#ffffffff">
  //                                                 <span style="color:#ffffffff">Присоединиться к телеграм-каналу</span>
  //                                               </span>
  //                                             </a>
  //                                           </td>
  //                                         </tr>
  //                                       </tbody>
  //                                     </table>
  //                                   </td>
  //                                 </tr>
  //                               </tbody>
  //                             </table>
  //                           </td>
  //                         </tr>
  //                         <tr>
  //                           <td>
  //                             <table width="100%" border="0" cellspacing="0" cellpadding="0">
  //                               <tbody>
  //                                 <tr>
  //                                   <td style="padding:30px 20px 50px;font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:16px;color:#808080" align="left">
  //                                     <span>
  //                                       ©&nbsp;2023-2024&nbsp;flearn
  //                                       <br>
  //                                       <br>
  //                                       Письмо создано автоматически, пожалуйста, не отвечайте на него. Чтобы отписаться от рассылки, перейдите
  //                                       <a href="#" style="font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:16px;font-weight:normal;white-space:nowrap;text-decoration:underline;color:#808080" target="_blank">
  //                                         <span style="color:#808080;text-decoration:none" color=#808080">
  //                                           <span style="color:#808080">по этой ссылке.</span>
  //                                         </span>
  //                                       </a>
  //                                     </span>
  //                                   </td>
  //                                 </tr>
  //                               </tbody>
  //                             </table>
  //                           </td>
  //                         </tr>
  //                       </tbody>
  //                     </table>
  //                   </td>
  //                 </tr>
  //               </tbody>
  //             </table>
  //           </td>
  //         </tr>
  //       </table>
  //     </body>
  //   </html>
  // `;
    return {
        to: [to],
        from: this.senderContact,
        subject: i18n.t(`emails.${props.type}.subject.${course.type}`, { title: course.title }),
        html,
    };
  }

  private getWelcomeToPaidCourseEmail(props: TWelcomeToPaidCourseProps): IEmail {
    const { to, course, paymentOption, productOption, dateOfPaiment } = props;
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
    const html = this.ts.Layout({
      title: 'Подтверждение записи',
      content: this.ts.WelcomeToPaidCourse({
        courseType: courseTypeStr,
        courseTitle: course.title,
        paymentMethod: paymentMethodStr,
        creditPrice: creditPriceStr,
        dateOfPayment: dateOfPaymentStr,
      }),
    });
    return {
      to: [to],
      from: this.senderContact,
      subject: i18n.t(`emails.${props.type}.subject.${course.type}`, { title: course.title }),
      html,
      // html: `
      //   <!DOCTYPE html>
      //     <html lang="ru">
      //     <head>
      //       <meta charset="UTF-8">
      //       <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
      //       <title>Подтверждение записи</title>
      //     </head>
      //     <body>
      //       <table width="100%" style="padding:0;margin:0;overflow-x:hidden;">
      //         <tr>
      //           <td>
      //             <table align="center"  width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top=8px;line-height:normal;word-break:normal;">
      //                       <tbody>
      //                         <tr>
      //                           <td>
      //                             <table align="center"  width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top=8px;line-height:normal;word-break:normal;">
      //                               <tbody>
      //                                 <tr>
      //                                   <td align="center" bgcolor="#f5f5f5" style="background-color:#f5f5f5;padding:10px">
      //                                     <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px">
      //                                       <tbody>
      //                                         <tr>
      //                                           <td style="background-color:#f5f5f5;padding:26px 8px 0px;border-top-left-radius:25px;border-top-right-radius:25px" bgcolor:"#f5f5f5" align="center">
      //                                             <table style="max-width:540px;border-spacing:0px" width="100%" cellspacing="0" cellpadding="0" border="0">
      //                                               <tbody>
      //                                                 <tr>
      //                                                   <td align="left">
      //                                                     <table width="100%" cellspacing="0" cellpadding="0" border="0">
      //                                                       <tbody>
      //                                                         <tr>
      //                                                           <td style="font-size:0px;line-height:0px" valign="middle" align="left">
      //                                                             <table width="100%" cellspacing="0" cellpadding="0" border="0">
      //                                                               <tbody>
      //                                                                 <tr>
      //                                                                   <td style="font-size:14px;line-height:16px" align="left">
      //                                                                     <table width="100%" cellspacing="0" cellpadding="0" border="0">
      //                                                                       <tbody>
      //                                                                         <tr>
      //                                                                           <td align="left">
      //                                                                             <a style="font-family:Arial,Tahoma,Helvetica,sans-serif;font-size:18px;text-decoration:none;color:#262626" href="https://flearn.net">
      //                                                                               Freadom to Learn
      //                                                                             </a>
      //                                                                           </td>
      //                                                                         </tr>
      //                                                                       </tbody>
      //                                                                     </table>
      //                                                                   <table width="100%" cellspacing="0" cellpadding="0" border="0">
      //                                                                 <tbody>
      //                                                               <tr>
      //                                                             <td style="font-size:0;line-height:25px" height="25">
      //                                                           </td>
      //                                                         </tr>
      //                                                       </tbody>
      //                                                     </table>
      //                                                   </td>
      //                                                 </tr>
      //                                               </tbody>
      //                                             </table>
      //                                           </td>
      //                                         </tr>
      //                                       </tbody>
      //                                     </table>
      //                                   </td>
      //                                 </tr>
      //                               </tbody>
      //                             </table>
      //                           </td>
      //                         </tr>
      //                       </tbody>
      //                     </table>
      //                     <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px">
      //                       <tbody>
      //                         <tr>
      //                           <td style="background-color:#ffffffff;padding:30px 20px 20px;border-top-left-radius:25px;border-top-right-radius:25px" bgcolor="#ffffffff"  align="center">
      //                             <table style="max-width:540px;border-spacing:0px" width="100%" border="0" cellspacing="0" cellpadding="0">
      //                               <tbody>
      //                                 <tr>
      //                                   <td style="font-family:Helvetica,Arial,sans-serif;font-size:32px;line-height:38px;color:#000000" align="left">
      //                                     <span>Вы записались на ${courseTypeStr}</span>
      //                                     <span style="color:#262626">«${course.title}»</span>
      //                                   </td>
      //                                 </tr>
      //                               </tbody>
      //                             </table>
      //                           </td>
      //                         </tr>
      //                         <tr>
      //                           <td style="background-color:#ffffffff;padding:0 20px 10px" bgcolor=#ffffffff" align="center">
      //                             <table style="max-width:540px;border-spacing:0px" width="100%" border="0" cellspacing="0" cellpadding="0">
      //                               <tbody>
      //                                 <tr>
      //                                   <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:20px;color:#000000" align="left">
      //                                     <span>
      //                                       Вы сделали первый шаг на пути к новым навыкам, поздравляем! Мы получили ваше подтверждение об оплате. В течении 1-2 рабочих дней откроем доступ к материалам и пришлем письмо со ссылкой на первый платный урок.
      //                                       <br>
      //                                       <br>
      //                                       Сумма: ${creditPriceStr}
      //                                       <br>
      //                                       <br>
      //                                       Способ оплаты: ${paymentMethodStr}
      //                                       <br>
      //                                       <br>
      //                                       Дата и время (MSK): ${dateOfPaymentStr}
      //                                     </span>
      //                                   </td>
      //                                 </tr>
      //                               </tbody>
      //                             </table>
      //                           </td>
      //                         </tr>
      //                         <tr>
      //                           <td style="background-color:#ffffff;padding:20px 20px 30px;border-bottom-left-radius:25px;border-bottom-right-radius:25px" bgcolor="#ffffff" align="center">
      //                             <table style-"max-width:540px;border-spacing:0px" width="100%" border="0" cellspacing="0" cellpadding="0">
      //                               <tbody>
      //                                 <tr>
      //                                   <td align="left">
      //                                   </td>
      //                                 </tr>
      //                               </tbody>
      //                             </table>
      //                           </td>
      //                         </tr>
      //                         <tr>
      //                           <td align="center">
      //                           <table width="100%" border="0" cellspacing="0" cellpadding="0">
      //                             <tbody>
      //                               <tr>
      //                                 <td style="line-height:20px;font-size:0" height="20"></td>
      //                               </tr>
      //                             </tbody>
      //                           </table>
      //                           </td>
      //                         </tr>
      //                         <tr>
      //                           <td style="background-color:#ffffffff;padding:30px 20px 20px;border-top-left-radius:25px;border-top-right-radius:25px" bgcolor="#ffffffff" align="center">
      //                             <table style="max-width:540px;border-spacing:0px" width="100%" border="0" cellspacing="0" cellpadding="0">
      //                               <tbody>
      //                                 <tr>
      //                                   <td style="font-family:Helvetica,Arial,sans-serif;font-size:32px;line-height:38px;color:#000000" align="left">
      //                                     <span>
      //                                       Присоединяйтесь к нам в Telegram
      //                                     </span>
      //                                   </td>
      //                                 </tr>
      //                               </tbody>
      //                             </table>
      //                           </td>
      //                         </tr>
      //                         <tr>
      //                           <td style="background-color:#ffffff;padding:0 20px 20px" bgcolor="#ffffffff" align="center">
      //                             <table style="max-width:540px;border-spacing:0px" width="100%" border="0" cellspacing="0" cellpadding="0">
      //                               <tbody>
      //                                 <tr>
      //                                   <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:20px;color:#000000" valign="top" align="left">
      //                                     <span>
      //                                       Там мы рассказываем про анонсы и скидки на ранние запуски курсов в flearn. А также наш преподаватель, Соня Ульянова пишет про свои личные проекты и отвечает на вопросы студентов.
      //                                     </span>
      //                                   </td> 
      //                                 </tr>
      //                               </tbody>
      //                             </table>
      //                           </td>
      //                         </tr>
      //                         <tr>
      //                           <td style="background-color:#ffffff;padding:20px 20px 30px;border-bottom-left-radius:25px;border-bottom-right-radius:25px" bgcolor="#ffffff" align="center">
      //                             <table style-"max-width:540px;border-spacing:0px" width="100%" border="0" cellspacing="0" cellpadding="0">
      //                               <tbody>
      //                                 <tr>
      //                                   <td align="left">
      //                                     <table border="0" cellspacing="0" cellpadding="0" width="100%">
      //                                       <tbody>
      //                                         <tr>
      //                                           <td style="border-radius:100px;background-color:#262626" valign="middle" height="60" bgcolor="#262626" align="center">
      //                                             <a href="https://t.me/sofiulyanova" style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:52px;font-weight:normal;white-space:nowrap;text-decoration:none;display:block;padding:0px 32px;color:#ffffff" target="_blank">
      //                                               <span style="color:#ffffffff;text-decoration:none" color="#ffffffff">
      //                                                 <span style="color:#ffffffff">Присоединиться к телеграм-каналу</span>
      //                                               </span>
      //                                             </a>
      //                                           </td>
      //                                         </tr>
      //                                       </tbody>
      //                                     </table>
      //                                   </td>
      //                                 </tr>
      //                               </tbody>
      //                             </table>
      //                           </td>
      //                         </tr>
      //                         <tr>
      //                           <td>
      //                             <table width="100%" border="0" cellspacing="0" cellpadding="0">
      //                               <tbody>
      //                                 <tr>
      //                                   <td style="padding:30px 20px 50px;font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:16px;color:#808080" align="left">
      //                                     <span>
      //                                       ©&nbsp;2023-2024&nbsp;flearn
      //                                       <br>
      //                                       <br>
      //                                       Письмо создано автоматически, пожалуйста, не отвечайте на него. Чтобы отписаться от рассылки, перейдите
      //                                       <a href="#" style="font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:16px;font-weight:normal;white-space:nowrap;text-decoration:underline;color:#808080" target="_blank">
      //                                         <span style="color:#808080;text-decoration:none" color=#808080">
      //                                           <span style="color:#808080">по этой ссылке.</span>
      //                                         </span>
      //                                       </a>
      //                                     </span>
      //                                   </td>
      //                                 </tr>
      //                               </tbody>
      //                             </table>
      //                           </td>
      //                         </tr>
      //                       </tbody>
      //                     </table>
      //                   </td>
      //                 </tr>
      //               </tbody>
      //             </table>
      //           </td>
      //         </tr>
      //       </table>
      //     </body>
      //   </html>
      // `,
    };
  }

  private getDiscontSolveFreeLessonsInWeekEmail(props: TDiscontSolveFreeLessonsInWeekProps): IEmail {
    const { to, course } = props;
    return {
      to: [to],
      from: this.senderContact,
      subject: i18n.t(`emails.${props.type}.subject.${course.type}`, { title: course.title }),
      html: this.ts.Layout({
        title: 'DiscontSolveFreeLessonsInWeek',
        content: this.ts.DiscontSolveFreeLessonsInWeek(),
      }),
    };
  }

  private getHomeworkSentForReviewEmail(props: THomeworkSentForReviewProps): IEmail {
    const { to, course } = props;
    return {
      to: [to],
      from: this.senderContact,
      subject: i18n.t(`emails.${props.type}.subject.${course.type}`, { title: course.title }),
      html: this.ts.Layout({
        title: 'HomeworkSentForReview',
        content: this.ts.HomeworkSentForReview(),
      }),
    };
  }

  private getHomeworkReviewedEmail(props: THomeworkReviewedProps): IEmail {
    const { to, course, reviewLink } = props;
    return {
      to: [to],
      from: this.senderContact,
      subject: i18n.t(`emails.${props.type}.subject.${course.type}`, { title: course.title }),
      html: this.ts.Layout({
        title: 'HomeworkReviewed',
        content: this.ts.HomeworkReviewed({ reviewLink }),
      }),
    };
  }

  private getHomeworkSentForReviewToReviewerEmail(props: THomeworkSentForReviewToReviewerProps): IEmail {
    const { course, lesson, homework, homeworkUser } = props;
    return {
      to: [this.reviewerContact],
      from: this.senderContact,
      subject: i18n.t(`emails.${props.type}.subject.${course.type}`, { title: course.title }),
      html: this.ts.Layout({
        title: 'HomeworkSentForReviewToReviewer',
        content: this.ts.HomeworkSentForReviewToReviewer({
          courseTitle: course.title,
          lessonTitle: lesson.title,
          homeworkUserEmail: homeworkUser.email,
          homework,
        }),
      }),
    };
  }

  private getHomeworkReviewedToReviewerEmail(props: THomeworkReviewedToReviewerProps): IEmail {
    const { course, lesson, homeworkUser } = props;
    return {
      to: [this.reviewerContact],
      from: this.senderContact,
      subject: i18n.t(`emails.${props.type}.subject.${course.type}`, { title: course.title }),
      html: this.ts.Layout({
        title: 'HomeworkReviewedToReviewer',
        content: this.ts.HomeworkReviewedToReviewer({
          courseTitle: course.title,
          lessonTitle: lesson.title,
          homeworkUserEmail: homeworkUser.email,
        }),
      }),
    };
  }

  // private getWelcomeToCourseEmail(props: { to: IEmailContact, course: ICourseData, chosenProductOption: keyof ICourseData['productOptions'] }): IEmail {
  //   const { to, course, chosenProductOption } = props;
  //   const option = course.productOptions[chosenProductOption]!;
  //   const startDate = formatDate(course.startDate, { timeZone: 'Europe/Moscow' });
  //   const price = (!option.discount || (option.discount.deadline && new Date() < option.discount.deadline)) ? option.price : (option.price * (1 - option.discount.amountPrc / 100));
  //   const courseTypeStr = i18n.t(`courseType.${course.type}`);
  //   return {
  //     to: [to],
  //     from: this.senderContact,
  //     subject: i18n.t(`emails.WelcomeToCourse.subject.${course.type}`, { startDate, title: course.title }),
  //     html: `
  //       <!DOCTYPE html>
  //       <html lang="ru">
  //       <head>
  //         <meta charset="UTF-8">
  //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //         <title>Document</title>
  //       </head>
  //       <body>
  //         <p>Здравствуйте! Мы получили вашу заявку на ${courseTypeStr} “${course.title}”. Оплатить участие можно переводом на российскую карту или через Paypal.</p>
        
  //         <p style="white-space: pre-line;"><strong>Оплата в России</strong>&#10;На карту Тинькофф по номеру телефона +79162380397 Ульянова София Романовна — ${Math.round(price)} руб.</p>
        
  //         <p style="white-space: pre-line;"><strong>Оплата с зарубежной карты</strong>&#10;Через Paypal на аккаунт <a href="http://paypal.me/sofiulyanova">paypal.me/sofiulyanova</a> (Ulianova Sofiia) — ${Math.round(price/100)} евро. В назначении платежа не указывайте, пожалуйста, за что и для кого.</p>
        
  //         <p style="white-space: pre-line;"><strong>После оплаты</strong>&#10;Пришлите мне <a href="https://t.me/ulianova_sofia">в телеграмм</a> чек об оплате и почту, по которой планируете проходить ${courseTypeStr}. К этой почте должен быть привязан гугл-аккаунт.</p>
        
  //         <p>Если возникнут вопросы и трудности, <a href="https://t.me/ulianova_sofia">пишите мне в телеграмме</a></p>
        
  //         <p style="white-space: pre-line;">София&#10;Преподаватель, график-иллюстратор</p>
  //       </body>
  //       </html>
  //     `,
  //   };
  // }

  private ts = new EmailTemplateService();
}

export const emailService = new EmailService();
(window as any).emailService = emailService;
