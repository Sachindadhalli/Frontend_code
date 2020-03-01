import {call, put, takeLatest} from "redux-saga/effects";
import api from "../../api/employerApiCall";
import {SUB_USER_LIST} from '../../../config/constants';
import subUserConstants from './constants';
import * as subUserActions from './actions';

function* getSubUsersList(action) {
  try {
    const response = yield call(api.get, SUB_USER_LIST, action.payload);
    if (response.data.status) {
      yield put(subUserActions.getSubuserListSuccess(response.data));
    } else {
      yield put(subUserActions.getSubuserListError(response.message));
    }
  } catch (e) {
    yield put(subUserActions.getSubuserListError(e));
  }
}

export default function* () {
  yield takeLatest(subUserConstants.GET_SUBUSERS_REQUEST, getSubUsersList);
}
