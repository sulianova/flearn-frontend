import { useState } from 'react';

import { courseService } from 'services/course.service';
import { lessonService } from 'services/lesson.service';
import { URLSections } from 'router';

import SignupToCoursePopup from 'components/SignupToCoursePopup/SignupToCoursePopup';
import Page, { EFooter, EPageVariant } from 'ui/Page/Page';

import Catalogue from './blocks/Catalogue/Catalogue';
import  BannerStart from './blocks/BannerStart/BannerStart'
import Header from './blocks/Header/Header';
import RequestConsultationBanner from './blocks/RequestConsultationBanner/RequestConsultationBanner';
import StudyProcess from './blocks/StudyProcess/StudyProcess';
import FAQ from './blocks/FAQ/FAQ';
import Explain from './blocks/Explain/Explain';

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
    <StudyProcess 
    key='studyProcess'
    />,
    <Explain 
    key='explain'
    />,
    <Catalogue
    key='catalogue'
    linkToFreeCourse={linkToFreeCourse}
    onNotAuthedClick={onNotAuthedClick}
    />,
    < BannerStart
    key='bannerStart'
    linkToFreeCourse={linkToFreeCourse}
    onNotAuthedClick={onNotAuthedClick}
    />,
    <FAQ key='faq'/>,
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
      <Page
        variant={EPageVariant.WEB}
        header
        footer={EFooter.Default}
        backgroundColor='var(--color-background-default)'
      >
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
