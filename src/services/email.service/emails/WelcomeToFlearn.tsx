import { i18n } from 'shared/translations';
import { URLSections } from 'router';

import Button from './components/Button';
import Card from './components/Card';
import JoinTelegramCard from './components/JoinTelegramCard';
import Layout from './components/Layout';
import { IEmailContact } from '../types';

export interface IWelcomeToFlearnEmailProps {
  to: IEmailContact
}

WelcomeToFlearn.getSubject = () => i18n.t('emails.WelcomeToFlearn.subject');

export default function WelcomeToFlearn(props: IWelcomeToFlearnEmailProps) {
  const profileLink = URLSections.Courses.to({ full: true, params: { from: 'WelcomeToFlearnEmail' } });

  const mainCard = (
    <Card
      content={[
        {
          paddingTop: 5,
          paddingBottom: 20,
          value: (
            <tr>
              <td align="left" style={{ fontFamily: 'Helvetica,Arial,sans-serif', fontSize: 32, lineHeight: '38px', color: '#000000' }}>
                <span>Добро пожаловать в Flearn</span>
              </td>
            </tr>
          ),
        }, {
          paddingBottom: 30,
          value: (
            <tr>
              <td align="left" style={{ fontFamily: 'Helvetica,Arial,sans-serif', fontSize: 16, lineHeight: '20px', color: '#000000' }}>
                <span>
                  Привет! Мы рады, что вы к нам присоединились. Мы собрали интерактивные уроки и упражнения, чтобы вам было удобно учиться рисовать и развиваться в иллюстрации.
                </span>
              </td>
            </tr>
          ),
        }, {
          paddingBottom: 5,
          value: (
            <tr>
              <td align="left">
                <Button href={profileLink}>
                  Начать учиться бесплатно
                </Button>
              </td>
            </tr>
          )
        }
      ]}
    />
  );

  return (
    <Layout
      title='Добро пожаловать в Flearn'
      to={props.to}
      gapPx={20}
      content={[
        mainCard,
        <JoinTelegramCard/>,
      ]}
    />
  );
}
