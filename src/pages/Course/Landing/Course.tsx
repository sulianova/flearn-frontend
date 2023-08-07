import { connect } from 'react-redux';

import { useFetch } from 'hooks';
import { fetchCourse } from 'store/actions/sagas';

import Page from 'ui/Page/Page';

import DiscountBanner from './DiscountBanner/DiscountBanner';
import ProgramBlocks from './ProgramBlocs/ProgramBlocks';
import ProgramIntro from './ProgramIntro/ProgramIntro';

import type { ICourseData, IRootState } from 'types';

export default connect(mapStateToProps)(Course);

interface IConnectedProps {
  data?: ICourseData
}

function mapStateToProps(state: IRootState): IConnectedProps {
  return {
      data: state.course,
  };
}

function Course({ data }: IConnectedProps) {

  useFetch(({ actionCreator: fetchCourse }));

  if (!data || Object.keys(data).length === 0) {
    return (
      <Page header footer wrapper='Course'>
        <p>loading course</p>
      </Page>
    );
  }

  return (
    <Page header footer wrapper='Course'>
      <ProgramIntro data={data}/>
      <DiscountBanner data={data}/>
      <ProgramBlocks data={data} />
    </Page>
  );
}
