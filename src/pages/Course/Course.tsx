import { courseService } from 'services/course.service';

import Page, { EFooter, EPageVariant } from 'ui/Page/Page';

import ProgramBlocks from './ProgramBlocs/ProgramBlocks';
import ProgramIntro from './ProgramIntro/ProgramIntro';

import Fallback from 'ui/Fallback';

export default function Course() {
  const course = courseService.useCurrentCourse();

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
