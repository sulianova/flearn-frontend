import { URLSections } from 'router';
import { i18n } from 'shared';

import Link from 'ui/Link/Link';

import classes from './Oferta.module.scss';

export default function Oferta() {
  return (
    <div className={classes.agreement}>
      <Link
        className='s-hoverable'
        to={URLSections.Static.Oferta.index}
        target='_blank'
      >
          {i18n.t('oferta')}
      </Link>
    </div>
  );
}
