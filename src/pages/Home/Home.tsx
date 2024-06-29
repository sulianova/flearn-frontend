import Page, { EFooter, EPageVariant } from 'ui/Page/Page';

import Catalogue from './blocks/Catalogue/Catalogue';
import Header from './blocks/Header/Header';
import RequestConsultationBanner from './blocks/RequestConsultationBanner/RequestConsultationBanner';
import Career from './blocks/Career/Career';

import classes from './Home.module.scss';

export default Home;

function Home() {
  const blocks = [
    <Career key='career'/>,
    <Catalogue key='catalogue'/>,
    <RequestConsultationBanner key='requestConsultationBanner'/>,
  ];

  return (
    <Page variant={EPageVariant.WEB} header footer={EFooter.Big}>
      {/* <Header key='header'/> */}
        {blocks.map(block => (
          <div className={classes.section} key={block.key}>
            {block}
        </div>
      ))}
    </Page>
  );
}
