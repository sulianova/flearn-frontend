import { connect } from 'react-redux';
import { useParams } from 'react-router';

import { useFetch } from 'hooks';
import type { ICourseData } from 'services/course.service';
import { fetchCourse, type IFetchCoursePayload } from 'store/actions/sagas';

import Page, { EFooter } from 'ui/Page/Page';

import DiscountBanner from './DiscountBanner/DiscountBanner';
import ProgramBlocks from './ProgramBlocs/ProgramBlocks';
import ProgramIntro from './ProgramIntro/ProgramIntro';

import type { IRootState } from 'types';
import { useEffect } from 'react';
import { analyticsService, EAnalyticsEvent } from 'services/analytics.service';
import { envService } from 'services';

export default connect(mapStateToProps)(Course);

interface IConnectedProps {
  data?: ICourseData
}

function mapStateToProps(state: IRootState): IConnectedProps {
  return {
    data: state.course?.data,
  };
}

function Course({ data }: IConnectedProps) {
  const { courseId } = useParams();

  useFetch<IFetchCoursePayload>(({
    actionCreator: fetchCourse,
    payload: { courseId: courseId! },
  }));

  useEffect(() => {
    analyticsService.logEvent({
      type: EAnalyticsEvent.PageVisited,
      data: {
        type: 'landing_page',
        courseId: courseId!,
      },
    });
  }, []);

  if (!data) {
    return (
      <Page header footer={EFooter.Big} wrapper='Course'>
        <p>loading course</p>
      </Page>
    );
  }

  return (
    <Page header footer={EFooter.Big} wrapper='Course'>
      <ProgramIntro data={data}/>
      {data.discontDeadline && (
        <DiscountBanner
          discontAmount={data.discontAmount}
          discontDeadline={data.discontDeadline}
        />
      )}
      <ProgramBlocks data={data} />
    </Page>
  );
}
