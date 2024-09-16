import { useState } from 'react';

import { courseService } from 'services/course.service';
import { lessonService } from 'services/lesson.service';
import { URLSections } from 'router';

import SignupToCoursePopup from 'components/SignupToCoursePopup/SignupToCoursePopup';
import Page, { EFooter, EPageVariant } from 'ui/Page/Page';

import Catalogue from './blocks/Catalogue/Catalogue';
import  BannerStart from './blocks/BannerStart/BannerStart'
import Header from './blocks/Header/Header';
import DecisionForm from './blocks/DecisionForm/DecisionForm';
import StudyProcess from './blocks/StudyProcess/StudyProcess';
import FAQ from './blocks/FAQ/FAQ';
import Explain from './blocks/Explain/Explain';
import SocialValidation from './blocks/SocialValidation/SocialValidation';

import classes from './Home.module.scss';
import SignupToFlearnPopup from 'components/SignupToFlearnPopup/SignupToFlearnPopup';


export default function Home() {
  const firstLesson = lessonService.useLessons({ courseId: 'how-to-draw', topicOrder: 1, orderInTopic: 1 }).at(0);
  const linkToFreeCourse = firstLesson
    ? URLSections.Study.to({ courseId: 'how-to-draw', lessonId: firstLesson.id })
    : URLSections.Profile.to({ courseId: 'how-to-draw' });
  const [popupVisible, setPopupVisible] = useState(false);
  const onNotAuthedClick = () => setPopupVisible(true);

  const blocks = [
    <StudyProcess 
      key='StudyProcess'
    />,
    <Explain 
      key='Explain'
    />,
    <Catalogue
      key='Catalogue'
      linkToFreeCourse={linkToFreeCourse}
      onNotAuthedClick={onNotAuthedClick}
    />,
    <BannerStart
      key='BannerStart'
      linkToFreeCourse={linkToFreeCourse}
      onNotAuthedClick={onNotAuthedClick}
    />,
    <SocialValidation
      key='SocialValidation'
    />,
    <DecisionForm
      key='DecisionForm'
      linkToFreeCourse={linkToFreeCourse}
      onNotAuthedClick={onNotAuthedClick}
    />,
    <FAQ
      key='FAQ'
    />,
    // <RequestConsultationBanner key='requestConsultationBanner'/>,
  ];

  return (
    <>
      <Page
        variant={EPageVariant.WEB}
        header
        footer={false}
        // footer={EFooter.Default}
        backgroundColor='var(--color-background-default)'
      >
        <Header
          onNotAuthedClick={onNotAuthedClick}
        />
        {blocks.map(block => (
          <div className={classes.section} key={block.key}>
            {block}
          </div>
        ))}
      </Page>
      {popupVisible &&
        <SignupToFlearnPopup
          close={() => setPopupVisible(false)}
        />
      }
    </>
  );
}
