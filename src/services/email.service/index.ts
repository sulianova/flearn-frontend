import { firebaseService } from 'services/firebase.service';
import { ECollections } from 'types';
import { v4 } from 'uuid';
import { EEmail, type TEmail, type TContact } from './types';
import { formatDate, getDiscountedPrice } from 'utils';
import { ICourseData } from 'services/course.service';
import { i18n } from 'shared/translations'

export { EEmail } from './types';

type TProps = { to: TContact } & (
  | { type: EEmail.OrderCreated, orderId: string }
  | { type: EEmail.WelcomeToCourse, orderId: string, course: ICourseData }
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
      case EEmail.WelcomeToCourse:
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
      case EEmail.WelcomeToCourse:
        return this.getWelcomeToCourseEmail(props)
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

  private getWelcomeToCourseEmail(props: { to: TContact, course: ICourseData }): TEmail {
    const { to, course } = props;
    const courseTypeStr = i18n.t(`courseType.${course.type}`);
    return {
      to: [to],
      from: this.senderContact,
      subject: i18n.t(`emails.WelcomeToCourse.subject.${course.type}`, { title: course.title }),
      html: `
      <!DOCTYPE html>
        <html lang="ru">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Добро пожаловать на вводную часть</title>
        </head>
        <body>
          <table width="100%" style="padding:0;margin:0;overflow-x:hidden;">
            <tr>
              <td>
                <table align="center"  width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top=8px;line-height:normal;word-break:normal;">
                  <tbody>
                    <tr>
                      <td align="center" bgcolor="#f5f5f5" style="background-color:#f5f5f5;padding:10px">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px">
                          <tbody>
                            <tr>
                              <td style="background-color:#f5f5f5;padding:26px 20px 26px" bgcolor="#f5f5f5"  align="center">
                                <table style="max-width:540px;border-spacing:0px" width="100%" border="0" cellspacing="0" cellpadding="0">
                                  <tbody>
                                    <tr>
                                      <td align="left">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                          <tbody>
                                            <tr>
                                              <td syle="font-size:0px;line-height:0px" valign="midle" align="left">
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                  <tbody>
                                                    <tr>
                                                      <td style="width:100%;max-width:280px"></td>
                                                      <td style="font-size:14px;line-height:16px;width:260px" align="left">
                                                        <table style="width:260px;border-spacing:0px" width="260" border="0" cellspacing="0" cellpadding="0">
                                                          <tbody>
                                                            <tr>
                                                              <td style="border-radius:100px;background-color:#262626" valign="middle" height="35" align="center" bgcolor="#262626">
                                                                <a href="#" style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:35px;font-weight:normal;white-space:nowrap;text-decoration:none;display:block;text-transform:uppercase" target="_blank">
                                                                  <span style="color:#ffffffff;text-decoration:none">иллюстрация
                                                                  </span>
                                                                </a>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td style="background-color:#ffffffff;padding:30px 20px 20px;border-top-left-radius:25px;border-top-right-radius:25px" bgcolor="#ffffffff"  align="center">
                                <table style="max-width:540px;border-spacing:0px" width="100%" border="0" cellspacing="0" cellpadding="0">
                                  <tbody>
                                    <tr>
                                      <td style="font-family:Helvetica,Arial,sans-serif;font-size:32px;line-height:38px;color:#000000" align="left">
                                        <span>Добро пожаловать на  ${courseTypeStr} </span>
                                        <span style="color:#5282ff">«${course.title}»</span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td style="background-color:#ffffffff;padding:0 20px 10px" bgcolor=#ffffffff" align="center">
                                <table style="max-width:540px;border-spacing:0px" width="100%" border="0" cellspacing="0" cellpadding="0">
                                  <tbody>
                                    <tr>
                                      <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:20px;color:#000000" align="left">
                                        <span>
                                          Перед тем, как приступить к&nbsp;основному курсу, мы&nbsp;предлагаем всем студентам пройти бесплатную вводную часть. 
                                          <br>
                                          <br>
                                          За&nbsp;10&nbsp;часов
                                          <br>
                                          <br>
                                          → познакомитесь с&nbsp;форматом обучения в&nbsp;flearn
                                          <br>
                                          <br>
                                          → пройдете ключевые этапы работы над иллюстрацией
                                          <br>
                                          <br>
                                          → нарисуете постер
                                          </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td style="background-color:#ffffff;padding:20px 20px 30px;border-bottom-left-radius:25px;border-bottom-right-radius:25px" bgcolor="#ffffff" align="center">
                                <table style-"max-width:540px;border-spacing:0px" width="100%" border="0" cellspacing="0" cellpadding="0">
                                  <tbody>
                                    <tr>
                                      <td align="left">
                                        <table border="0" cellspacing="0" cellpadding="0">
                                          <tbody>
                                            <tr>
                                              <td style="border-radius:6px;background-color:#5282ff" valign="middle" height="52" bgcolor="#5282ff" align="center">
                                                <a href="#" style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:52px;font-weight:normal;white-space:nowrap;text-decoration:none;display:block;padding:0px 32px;color:#ffffff" target="_blank">
                                                  <span style="color:#ffffffff;text-decoration:none" color="#ffffffff">
                                                    <span style="color:##ffffffff">Начать учиться</span>
                                                  </span>
                                                </a>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td align="center">
                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                  <tr>
                                    <td style="line-height:20px;font-size:0" height="20"></td>
                                  </tr>
                                </tbody>
                              </table>
                              </td>
                            </tr>
                            <tr>
                              <td style="background-color:#ffffffff;padding:30px 20px 20px;border-top-left-radius:25px;border-top-right-radius:25px" bgcolor="#ffffffff" align="center">
                                <table style="max-width:540px;border-spacing:0px" width="100%" border="0" cellspacing="0" cellpadding="0">
                                  <tbody>
                                    <tr>
                                      <td style="font-family:Helvetica,Arial,sans-serif;font-size:32px;line-height:38px;color:#000000" align="left">
                                        <span>
                                          Приглашаем в&nbsp;телеграм-канал flearn
                                        </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td style="background-color:#ffffff;padding:0 20px 20px" bgcolor="#ffffffff" align="center">
                                <table style="max-width:540px;border-spacing:0px" width="100%" border="0" cellspacing="0" cellpadding="0">
                                  <tbody>
                                    <tr>
                                      <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:20px;color:#000000" valign="top" align="left">
                                        <span>
                                          → Про опыт и личные проекты&nbsp;автора курсов. Часть матетериала мы публикуем только в&nbsp;телеграм-канале
                                          <br>
                                          <br>
                                          → Анонсы и скидки на раннии запуски курсов в flearn
                                          <br>
                                          <br>
                                          → Вдохновение и поддержка для начинающих иллюстраторов
                                        </span>
                                      </td> 
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td style="background-color:#ffffff;padding:20px 20px 30px;border-bottom-left-radius:25px;border-bottom-right-radius:25px" bgcolor="#ffffff" align="center">
                                <table style-"max-width:540px;border-spacing:0px" width="100%" border="0" cellspacing="0" cellpadding="0">
                                  <tbody>
                                    <tr>
                                      <td align="left">
                                        <table border="0" cellspacing="0" cellpadding="0">
                                          <tbody>
                                            <tr>
                                              <td style="border-radius:6px;background-color:#262626" valign="middle" height="52" bgcolor="#262626" align="center">
                                                <a href="https://t.me/sofiulyanova" style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:52px;font-weight:normal;white-space:nowrap;text-decoration:none;display:block;padding:0px 32px;color:#ffffff" target="_blank">
                                                  <span style="color:#ffffffff;text-decoration:none" color="#ffffffff">
                                                    <span style="color:#ffffffff">Присоединиться к телеграм-каналу</span>
                                                  </span>
                                                </a>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                  <tbody>
                                    <tr>
                                      <td style="padding:30px 20px 50px;font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:16px;color:#808080" align="left">
                                        <span>
                                          ©&nbsp;flearn
                                          <br>
                                          <br>
                                          Вы получили это письмо, потому что регистрировались на нашем сайте. Чтобы отписаться, перейдите
                                          <a href="#" style="font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:16px;font-weight:normal;white-space:nowrap;text-decoration:underline;color:#808080" target="_blank">
                                            <span style="color:#808080;text-decoration:none" color=#808080">
                                              <span style="color:#808080">по этой ссылке.</span>
                                            </span>
                                          </a>
                                        </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  };
}

  // private getWelcomeToCourseEmail(props: { to: TContact, course: ICourseData, chosenProductOption: keyof ICourseData['productOptions'] }): TEmail {
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
