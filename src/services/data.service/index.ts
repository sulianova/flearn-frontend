import Course from './Course';
import Lesson from './Lesson';
import User from './User';

class DataService {
  public course: Course;
  public lesson: Lesson;
  public user: User;

  constructor() {
    this.course = new Course();
    this.lesson = new Lesson();
    this.user = new User();
  }
}

export const dataService = new DataService();
