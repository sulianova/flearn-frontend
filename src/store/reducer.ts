import { combineReducers } from 'redux';
import { createReducer } from './utils';

import { IObject, TStateName } from 'types';

export default combineReducers({
    course: createReducer('course'),
    homework: createReducer('homework'),
    homeworks: createReducer('homeworks'),
} as { [key in TStateName]: () => IObject });
