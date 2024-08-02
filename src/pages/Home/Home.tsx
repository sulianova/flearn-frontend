import { useState } from 'react';

import { courseService } from 'services/course.service';
import { lessonService } from 'services/lesson.service';
import { URLSections } from 'router';

import SignupToCoursePopup from 'components/SignupToCoursePopup/SignupToCoursePopup';
import Page, { EFooter, EPageVariant } from 'ui/Page/Page';

import Catalogue from './blocks/Catalogue/Catalogue';
import Career from './blocks/Career/Career';
import Header from './blocks/Header/Header';
import RequestConsultationBanner from './blocks/RequestConsultationBanner/RequestConsultationBanner';
// import Career from './blocks/Career/Career';

import classes from './Home.module.scss';

export default function Home() {
  const freeCourse = courseService.useCourses({ ids: ['how-to-draw'] }).at(0);
  const firstLesson = lessonService.useLessons({ courseId: 'how-to-draw', topicOrder: 1, orderInTopic: 1 }).at(0);
  const linkToFreeCourse = firstLesson
    ? URLSections.Study.to({ courseId: 'how-to-draw', lessonId: firstLesson.id })
    : URLSections.Profile.to({ courseId: 'how-to-draw' });
  const [popupVisible, setPopupVisible] = useState(false);
  const onNotAuthedClick = () => setPopupVisible(true);

  const blocks = [
    <Catalogue
    key='catalogue'
    linkToFreeCourse={linkToFreeCourse}
    onNotAuthedClick={onNotAuthedClick}
  />,
    <Career
    key='career'
    linkToFreeCourse={linkToFreeCourse}
    onNotAuthedClick={onNotAuthedClick}
  />,
    // <RequestConsultationBanner key='requestConsultationBanner'/>,
  ];

  return (
    <>
      {freeCourse && popupVisible &&
        <SignupToCoursePopup
          course={freeCourse}
          option={'OPTIMAL'}
          close={() => setPopupVisible(false)}
        />
      }
      <Page variant={EPageVariant.WEB} header footer={EFooter.Default}>
        <Header
          linkToFreeCourse={linkToFreeCourse}
          onNotAuthedClick={onNotAuthedClick}
        />
        {blocks.map(block => (
          <div className={classes.section} key={block.key}>
            {block}
          </div>
        ))}
      </Page>
    </>
  );
}
