import Course from './Course';
import Lesson from './Lesson';

class DataService {
  public course: Course;
  public lesson: Lesson;

  constructor() {
    this.course = new Course();
    this.lesson = new Lesson();
  }
}

export const dataService = new DataService();
