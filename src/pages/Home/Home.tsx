import { useState } from 'react';

import type { TCourseProductOptionTypes } from 'services/course.service';
import { lessonService } from 'services/lesson.service';
import { URLSections } from 'router';

import Page, { EPageVariant, EFooter } from 'ui/Page/Page';

import Catalogue from './blocks/Catalogue/Catalogue';
import BannerStart from './blocks/BannerStart/BannerStart'
import Header from './blocks/Header/Header';
import About from './blocks/About/About';
import DecisionForm from './blocks/DecisionForm/DecisionForm';
import StudyProcess from './blocks/StudyProcess/StudyProcess';
import Community from './blocks/Community/Community';
import FAQ from './blocks/FAQ/FAQ';
import SocialValidation from './blocks/SocialValidation/SocialValidation';
import type { ICourseData } from 'services/course.service';

import classes from './Home.module.scss';
import SignupToFlearnPopup from 'components/SignupToFlearnPopup/SignupToFlearnPopup';

type TStep =
  | 'DECISION'
  | 'PAYMENT'
  | 'ORDER_INFO';

export default function Home() {
  const [chosenProductOptionType, setChosenProductOptionType] = useState<TCourseProductOptionTypes | undefined> ( undefined);
  const [step, setStep] = useState<TStep>('DECISION');
  const firstLesson = lessonService.useLessons({ courseId: 'how-to-draw', topicOrder: 1, orderInTopic: 1 }).at(0);
  const linkToFreeCourse = firstLesson
    ? URLSections.Study.to({ courseId: 'how-to-draw', lessonId: firstLesson.id })
    : URLSections.Profile.to({ courseId: 'how-to-draw' });
  const [popupVisible, setPopupVisible] = useState(false);
  const onNotAuthedClick = () => setPopupVisible(true);

  const [submited, setSubmited] = useState(false);

  const blocks: JSX.Element[] = [
    <Header
    onNotAuthedClick={onNotAuthedClick}
    />,
    <About 
    key='About'
    />,
    <BannerStart
    key='BannerStart'
    linkToFreeCourse={linkToFreeCourse}
    onNotAuthedClick={onNotAuthedClick}
    />,
    <StudyProcess 
      key='StudyProcess'
    />,
    <Catalogue
      key='Catalogue'
      linkToFreeCourse={linkToFreeCourse}
      onNotAuthedClick={onNotAuthedClick}
    />,
    <Community
    key='Community'
    />,
    <SocialValidation
      key='SocialValidation'
    />,
    <DecisionForm
      key='DecisionForm'
      linkToFreeCourse={linkToFreeCourse}
      onNotAuthedClick={onNotAuthedClick}
      next={productOptionType => {
      setStep('PAYMENT');
      setChosenProductOptionType(productOptionType);
      }}
    />,
    <FAQ
      key='FAQ'
    />,
  ];

  return (
    <>
      <Page
        variant={EPageVariant.WEB}
        header
        footer={EFooter.Big}
        backgroundColor='var(--color-background-alternate)'
      >
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
