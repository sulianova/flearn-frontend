import { useParams } from 'react-router';

import { URLSections } from 'types';

import Link from 'ui/Link/Link';
import Page, { EPageVariant } from 'ui/Page/Page';

export default function Restricted() {
  const { courseId } = useParams();

  return (
    <Page variant={EPageVariant.Fallback} header footer>
      <p>Access to this page is restricted</p>
      <p>You have to buy course to be able to see content</p>
      {courseId && (<Link to={URLSections.Course.to({ courseId })}>Buy course</Link>)}
    </Page>
  );
}
