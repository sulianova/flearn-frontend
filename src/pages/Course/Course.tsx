import Page from 'ui/Page/Page';

import ProgramIntro from './ProgramIntro/ProgramIntro';
import ProgramBlocks from './ProgramBlocs/ProgramBlocks';

export default Course;

function Course() {
    return (
        <Page header footer wrapper='Course'>
            <ProgramIntro />
            <ProgramBlocks />
        </Page>
    );
}
