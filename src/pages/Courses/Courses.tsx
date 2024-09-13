import { useState } from 'react';

import { courseService } from 'services/course.service';
import { userService } from 'services/user.service';

import SignupToCoursePopup from 'components/SignupToCoursePopup/SignupToCoursePopup';
import Page, { EPageVariant } from 'ui/Page/Page';

import IntroBanner from './blocks/IntroBanner/IntroBanner';
import Catalogue from './blocks/Catalogue/Catalogue';
import SocialValidation from './blocks/SocialValidation/SocialValidation';
import BannerStart from './blocks/BannerStart/BannerStart';
import FAQ from './blocks/FAQ/FAQ';

import classes from './Courses.module.scss'

export default function Courses() {
  const [popupVisible, setPopupVisible] = useState(false);
  const onNotAuthedClick = () => setPopupVisible(true);

  const freeCourse = courseService.useCourses({ ids: ['how-to-draw'] }).at(0);
  const user = userService.useAuthedUser();
  const blocks = [
    !user && <IntroBanner
      key='IntroBanner'
      onNotAuthedClick={onNotAuthedClick}
    />,
    <Catalogue
      key='catalogue'
    />,
    <SocialValidation
      key='SocialValidation'
    />,
    !user && <BannerStart
      key='BannerStart'
      onNotAuthedClick={onNotAuthedClick}
    />,
    <FAQ
      key='FAQ'
    />,
  ].filter(c => c !== false);

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
          variant={EPageVariant.LMS}
          header
          footer
          backgroundColor='var(--color-background-alternate)'
        >
          <div className={classes.coursesPage}>
            <div className={classes.coursesPageContent}>
              {blocks.map(block => (
                <div className={classes.section} key={block.key}>
                  {block}
                </div>
              ))}
            </div>
          </div>
        </Page>
      </>
  );
}
