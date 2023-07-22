import { combineReducers } from 'redux';
import { createReducer } from './utils';

import { IObject, TStateName } from 'types';

export default combineReducers({
    course: createReducer('course'),
} as { [key in TStateName]: () => IObject });
