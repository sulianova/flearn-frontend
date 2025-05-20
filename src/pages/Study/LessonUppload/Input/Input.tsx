import { useGetId } from 'hooks';
import { formatI18nT } from 'shared';
import InputField from 'ui/Form/Input/InputField';

import classes from './Input.module.scss';

export default Input;

const t = formatI18nT('courseLesson.upload');

interface IProps {
  value: string
  onChange: (value: string) => void
}

function Input(props: Readonly<IProps>) {
  return (
    <div className={classes._}>
      <InputField
        variant='Link'
        value={props.value}
        className={classes.input}
        caption={'Ссылка на задание'}
      />
    </div>
  );
}
