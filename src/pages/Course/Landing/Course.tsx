import Page from 'ui/Page/Page';

import ProgramIntro from './ProgramIntro/ProgramIntro';
import ProgramBlocks from './ProgramBlocs/ProgramBlocks';

import type { ICourseData } from 'types';

export default Course;

const courseData: ICourseData = {
    startDate: new Date('27.05.2023'),
    durationWeeks: 4,
    feild: 'Иллюстрация',
    title: 'Как рисовать свободно',
    description: 'Поговорим о свободе в рисунке, сделаем упражнения и 3-4 законченные работы. Будем анализировать рисовальный опыт, отмечать, что вызывает сопротивление, скуку, интерес.',
    discontAmount: 30,
    discontDeadline: new Date(),
}

function Course() {
    return (
        <Page header footer wrapper='Course'>
            <ProgramIntro data={courseData}/>
            <ProgramBlocks />
        </Page>
    );
}
