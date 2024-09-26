import type { ICourseCardInfo } from "services/course.service"
import CourseCardBase from "./CourseCardBase/CourseCardBase"
import CourseCardExtended from "./CourseCardExtended/CourseCardExtended"

const CourseCard = {
  BASE: CourseCardBase,
  EXTENDED: CourseCardExtended,
};

export default CourseCard;
