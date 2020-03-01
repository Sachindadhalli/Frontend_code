import {call, put, takeLatest} from "redux-saga/effects";
import api from "../../api/employerApiCall";
import {EMPLOYER_LOGIN} from '../../../config/constants'
import loginConstants from './constants';
import * as employerLoginActions from './actions'

function* callLoginApi(action) {
  try {
    const response = yield call(api.post, EMPLOYER_LOGIN, action.payload);
    if (response.data.status) {
      yield put(employerLoginActions.employerLoginSuccess(response.data));
    } else {
      yield put(employerLoginActions.employerLoginError(response.data));
    }
  } catch (e) {
    yield put(employerLoginActions.employerLoginError(e.message()));
  }
}

export default function* () {
  yield takeLatest(loginConstants.EMPLOYER_LOGIN_REQUEST, callLoginApi);
}
