import Page, { EFooter } from 'ui/Page/Page';

import Catalogue from './blocks/Catalogue/Catalogue';
import Feedback from './blocks/Feedback/Feedback';
import Header from './blocks/Header/Header';
import RequestConsultationBanner from './blocks/RequestConsultationBanner/RequestConsultationBanner';
import Career from './blocks/Career/Career';
import Bullets from './blocks/Bullets/Bullets';

import classes from './Home.module.scss';

export default Home;

function Home() {
  const blocks = [
    <Bullets key='bullets'/>,
    <Career key='catalogue'/>,
    <Feedback key='feedback'/>,
    <Catalogue key='catalogue'/>,
    <RequestConsultationBanner key='requestConsultationBanner'/>,
  ];

  return (
    <Page header footer={EFooter.Big} wrapper='Home'>
      <Header key='header'/>
      <div className={classes.blocks}>
        {blocks.map(block => (
          <div className={classes.section}>
            {block}
        </div>
      ))}
      </div>
    </Page>
  );
}
