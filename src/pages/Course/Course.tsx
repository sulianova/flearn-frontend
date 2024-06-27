import { useEffect } from 'react';
import { useParams } from 'react-router';

import { analyticsService, EAnalyticsEvent } from 'services/analytics.service';
import { courseService, ICourseData } from 'services/course.service';

import Page, { EFooter, EPageVariant } from 'ui/Page/Page';

import ProgramBlocks from './ProgramBlocs/ProgramBlocks';
import ProgramIntro from './ProgramIntro/ProgramIntro';

import Fallback from 'ui/Fallback';

export default function Course() {
  const { courseId } = useParams();

  const course = courseService.useCourses({ ids: [courseId!] }).at(0)

  useEffect(() => {
    analyticsService.logEvent({
      type: EAnalyticsEvent.PageVisited,
      data: {
        type: 'landing_page',
        courseId: courseId!,
      },
    });
  }, []);

  if (!course) {
    return <Fallback.Pending text={'loading course'}/>;
  }

  return (
    <Page variant={EPageVariant.WEB} header footer={EFooter.Big} currentCourse={course}>
      <ProgramIntro course={course}/>
      <ProgramBlocks course={course} />
    </Page>
  );
}
