import Popup from 'ui/Popup/Popup';

import ModalCross from 'assets/images/Svg/ModalCross';

import { ILessonsData, URLSections, type ILessonData } from 'types';

import classes from './LessonsPopup.module.scss';
import Link from 'ui/Link/Link';
import { useEffect, useState } from 'react';
import Spinner from 'ui/Spinner/Spinner';
import { lessonService } from 'services/lesson.service';
import { Subscription } from 'rxjs';
import { dataService } from 'services';

type TProps = {
  courseId: string
  onClose: () => void
} & (
  {
    lessons: ILessonData[]
  } 