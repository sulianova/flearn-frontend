import { combineReducers } from 'redux';
import { courseReducer } from './reducers';

import { IObject, TStateName } from 'types';

export default combineReducers({
    course: courseReducer
} as { [key in TStateName]: () => IObject });
