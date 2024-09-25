import type { JSXElementConstructor, ReactElement } from 'react';
import { renderToString } from 'react-dom/server';
import { v4 } from 'uuid';

import { dataService } from 'services/data.service';
import { firebaseService } from 'services/firebase.service';
import { lessonService } from 'services/lesson.service';

import { EEmail } from './types';
import type { IEmail, IEmailContact, TCommonProps, TSendEmailProps, TWantToBuyDummyCourseProps, TWelcomeToDummyCourseProps, TWelcomeToFlearnProps, TWelcomeToPaidFlearnProps } from './types';
import type {
  TWelcomeToCourseProps,
  TWelcomeToPaidCourseProps,
  TDiscontSolveFreeLessonsInWeekProps,
  THomeworkSentForReviewProps,
  THomeworkSentForReviewToReviewerProps,
  THomeworkReviewedProps,
  THomeworkReviewedToReviewerProps
} from './types';

import WelcomeToCourse from './emails/WelcomeToCourse';
import WelcomeToPaidCourse from './emails/WelcomeToPaidCourse';
import DiscontSolveFreeLessonsInWeek from './emails/DiscontSolveFreeLessonsInWeek';
import HomeworkSentForReview from './emails/HomeworkSentForReview';
import HomeworkSentForReviewToReviewer from './emails/HomeworkSentForReviewToReviewer';
import HomeworkReviewed from './emails/HomeworkReviewed';
import HomeworkReviewedToReviewer from './emails/HomeworkReviewedToReviewer';
import WantToBuyDummyCourse from './emails/WantToBuyDummyCourse';
import WelcomeToDummyCourse from './emails/WelcomeToDummyCourse';
import WelcomeToFlearn from './emails/WelcomeToFlearn';
import WelcomeToPaidFlearn from './emails/WelcomeToPaidFlearn';

class EmailService {
  public EEmail = EEmail;

  public async sendEmail(props: TSendEmailProps): Promise<void> {
    try {
      const id = this.getId(props);
      const email = await this.getEmail(props);
      if (await this.canSend(email.to[0])) {
        await firebaseService.setDoc(firebaseService.Collections.Email, id, email);
      }
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
      case this.EEmail.WelcomeToFlearn:
      case this.EEmail.WelcomeToPaidFlearn:
        return `${props.type}-${props.to.email}-${id}`;
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
      case this.EEmail.WantToBuyDummyCourse:
        return `${props.type}-${props.course.id}-${id}`;
      case this.EEmail.WelcomeToDummyCourse:
        return `${props.type}-${props.course.id}-${id}`;
      default:
        throw new Error('Unknown email type');
    }
  }

  private async getEmail(props: TSendEmailProps): Promise<IEmail> {
    switch (props.type) {
      case EEmail.WelcomeToFlearn:
        return this.getWelcomeToFlearnEmail(props);
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
      case EEmail.WantToBuyDummyCourse:
        return this.getWantToBuyDummyCourseEmail(props);
      case EEmail.WelcomeToDummyCourse:
        return this.getWelcomeToDummyCourseEmail(props);
      case EEmail.WelcomeToPaidFlearn:
        return this.getWelcomeToPaidFlearn(props);
      default:
        throw new Error('Unknown email type');
    }
  }

  private async canSend(to: IEmailContact) {
    const notificationSettings = await dataService.notificationSettings.get(to.email);
    return notificationSettings.email !== false;
  }

  private async getWelcomeToFlearnEmail(props: TWelcomeToFlearnProps) {
    return this.getEmailObjectFromComponent(WelcomeToFlearn, props);
  }

  private async getWelcomeToCourseEmail(props: TWelcomeToCourseProps) {
    const firstLesson = (await lessonService.fetch({ courseId: props.course.id, topicOrder: 1, orderInTopic: 1 })).at(0);
    return this.getEmailObjectFromComponent(WelcomeToCourse, { ...props, firstLesson });
  }

  private getWelcomeToPaidCourseEmail(props: TWelcomeToPaidCourseProps): IEmail {  
    return this.getEmailObjectFromComponent(WelcomeToPaidCourse, props);
  }

  private getDiscontSolveFreeLessonsInWeekEmail(props: TDiscontSolveFreeLessonsInWeekProps): IEmail {
    return this.getEmailObjectFromComponent(DiscontSolveFreeLessonsInWeek, props);
  }

  private getHomeworkSentForReviewEmail(props: THomeworkSentForReviewProps): IEmail {
    return this.getEmailObjectFromComponent(HomeworkSentForReview, props);
  }

  private getHomeworkReviewedEmail(props: THomeworkReviewedProps): IEmail {
    return this.getEmailObjectFromComponent(HomeworkReviewed, props);
  }

  private getHomeworkSentForReviewToReviewerEmail(props: THomeworkSentForReviewToReviewerProps): IEmail {
    return this.getEmailObjectFromComponent(HomeworkSentForReviewToReviewer, { ...props, to: this.reviewerContact });
  }

  private getHomeworkReviewedToReviewerEmail(props: THomeworkReviewedToReviewerProps): IEmail {
    return this.getEmailObjectFromComponent(HomeworkReviewedToReviewer, { ...props, to: this.reviewerContact });
  }

  private getWantToBuyDummyCourseEmail(props: TWantToBuyDummyCourseProps): IEmail {
    return this.getEmailObjectFromComponent(WantToBuyDummyCourse, { ...props, to: this.reviewerContact });
  }

  private getWelcomeToDummyCourseEmail(props: TWelcomeToDummyCourseProps): IEmail {
    return this.getEmailObjectFromComponent(WelcomeToDummyCourse, props);
  }

  private getWelcomeToPaidFlearn(props: TWelcomeToPaidFlearnProps): IEmail {
    return this.getEmailObjectFromComponent(WelcomeToPaidFlearn, props);
  }

  private getEmailObjectFromComponent<T>(
    Component: {
      (props: T): JSX.Element,
      getSubject(props: T): string,
    },
    props: T & TCommonProps
  ): IEmail {
    return {
      to: [props.to],
      from: this.senderContact,
      subject: Component.getSubject(props),
      html: this.renderEmail(
        <Component
          {...props}
          email={props.to.email}
        />
      ),
    };
  }

  private renderEmail(element: ReactElement<any, string | JSXElementConstructor<any>>) {
    return '<!DOCTYPE html>' + renderToString(element);
  }
}

export const emailService = new EmailService();
(window as any).emailService = emailService;
