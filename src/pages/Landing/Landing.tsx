import { courseService } from 'services/course.service';

import Page, { EPageVariant } from 'ui/Page/Page';

import ProgramBlocks from './ProgramBlocks/ProgramBlocks';
import ProgramIntro from './ProgramIntro/ProgramIntro';

import Fallback from 'ui/Fallback';

export default function Landing() {
  const course = courseService.useCurrentCourse();

  if (!course) {
    return (
      <Fallback.Pending
        variant={EPageVariant.WEB}
      />
    );
  }

  return (
    <Page variant={EPageVariant.WEB} header footer={false} currentCourse={course}>
      <ProgramIntro course={course}/>
      <ProgramBlocks course={course} />
    </Page>
  );
}
