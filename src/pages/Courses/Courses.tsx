
import Page, { EPageVariant } from 'ui/Page/Page';

import classes from './Courses.module.scss'

export default function Courses() {
  return (
      <>
        <Page 
          variant={EPageVariant.LMS}
          header
          footer
          backgroundColor='var(--color-background-alternate)'
        >
          <div className={classes.coursesPage}>
            <div className={classes.coursesPageContent}>
            </div>
          </div>
        </Page>
      </>
  );
}