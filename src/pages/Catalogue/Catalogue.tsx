import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { ICourseData, courseService } from 'services/course.service';
import Page, { EFooter } from 'ui/Page/Page';

import List from './List/List';

import classes from './Catalogue.module.scss';

export default Catalogue;

function Catalogue() {
  return (
    <Page header footer={EFooter.Big} wrapper='Catalogue'>
      <div className={classes.headerWrapper}>
          <h1 className={classes.headerTitle }>Программы обучения</h1>
      </div>
      <div className={classes.descriptionWrapper }>
        <div className={classes.description + ' s-text-24'}>Познакомимся с иллюстрацией, погрузимся в конкретные темы, потренируемся в цифровом и обычном рисовании</div>
      </div>
      <List></List>
    </Page>
  );
}


