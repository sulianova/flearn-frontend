import Course from './Course';
import Lesson from './Lesson';
import Order from './Order';
import User from './User';

class DataService {
  public course: Course;
  public lesson: Lesson;
  public order: Order;
  public user: User;

  constructor() {
    this.course = new Course();
    this.lesson = new Lesson();
    this.order = new Order();
    this.user = new User();
  }
}

export const dataService = new DataService();
