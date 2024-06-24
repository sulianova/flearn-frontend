import Handlebars from 'handlebars';

import Layout from './templates/Layout.html';
import WelcomeToCourse from './templates/WelcomeToCourse.html';
import WelcomeToPaidCourse from './templates/WelcomeToPaidCourse.html';
import DiscontSolveFreeLessonsInWeek from './templates/DiscontSolveFreeLessonsInWeek.html';
import HomeworkSentForReview from './templates/HomeworkSentForReview.html';
import HomeworkReviewed from './templates/HomeworkReviewed.html';
import HomeworkSentForReviewToReviewer from './templates/HomeworkSentForReviewToReviewer.html';
import HomeworkReviewedToReviewer from './templates/HomeworkReviewedToReviewer.html';

class EmailTemplateService {
  constructor() {
    Handlebars.registerPartial("Layout", Layout);
    Handlebars.registerPartial("WelcomeToCourse", WelcomeToCourse);
    Handlebars.registerPartial("WelcomeToPaidCourse", WelcomeToPaidCourse);
    Handlebars.registerPartial("DiscontSolveFreeLessonsInWeek", DiscontSolveFreeLessonsInWeek);
    Handlebars.registerPartial("HomeworkSentForReview", HomeworkSentForReview);
    Handlebars.registerPartial("HomeworkReviewed", HomeworkReviewed);
    Handlebars.registerPartial("HomeworkSentForReviewToReviewer", HomeworkSentForReviewToReviewer);
    Handlebars.registerPartial("HomeworkReviewedToReviewer", HomeworkReviewedToReviewer);
  }

  public Layout(props: { title: string, content: string }) {
    return Handlebars.compile(`{{>Layout }}`, { noEscape: true })(props);
  }

  public WelcomeToCourse(props: { courseType: string, courseTitle: string, startLink: string }) {
    return Handlebars.compile(`{{>WelcomeToCourse }}`, { noEscape: true })(props);
  }

  public WelcomeToPaidCourse(props: { courseType: string, courseTitle: string, creditPrice: string, paymentMethod: string, dateOfPayment: string }) {
    return Handlebars.compile(`{{>WelcomeToPaidCourse }}`, { noEscape: true })(props);
  }

  public DiscontSolveFreeLessonsInWeek() {
    return Handlebars.compile(`{{>DiscontSolveFreeLessonsInWeek }}`, { noEscape: true })({});
  }

  public HomeworkSentForReview() {
    return Handlebars.compile(`{{>HomeworkSentForReview }}`, { noEscape: true })({});
  }

  public HomeworkReviewed(props: { reviewLink: string }) {
    return Handlebars.compile(`{{>HomeworkReviewed }}`, { noEscape: true })(props);
  }

  public HomeworkSentForReviewToReviewer(props: {
    homeworkUserEmail: string
    courseTitle: string
    lessonTitle: string
    homework: {
      id: string
      externalHomeworkLink: string
    }
  }) {
    return Handlebars.compile(`{{>HomeworkSentForReviewToReviewer }}`, { noEscape: true })(props);
  }

  public HomeworkReviewedToReviewer(props: { courseTitle: string, lessonTitle: string, homeworkUserEmail: string }) {
    return Handlebars.compile(`{{>HomeworkReviewedToReviewer }}`, { noEscape: true })(props);
  }
}

export default EmailTemplateService;
