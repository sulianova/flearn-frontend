import { put } from 'redux-saga/effects';
import { createAction } from 'store/utils';
import { updateState } from '../redux';
import { authService } from 'services';

export const logout = createAction<'saga'>(
    '**saga*** logout',
    function* execute() {
        authService.logout();
        yield put(updateState({ stateName: 'user', payload: { user: undefined } }));
    }
)
