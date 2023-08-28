import { combineReducers } from 'redux';
import { createReducer } from './utils';

import { IObject, TStateName } from 'types';

export default combineReducers({
    course: createReducer('course'),
    lesson: createReducer('lesson'),
    lessons: createReducer('lessons'),
    homework: createReducer('homework'),
} as { [key in TStateName]: () => IObject });
