import {call, put, takeLatest} from "redux-saga/effects";
import api from "../../api/employeeApiCall";
import {EMPLOYEE_LOGIN} from '../../../config/constants'
import {loginConstants} from './constants';
import * as loginActions from './actions'

function* callLoginApi(action) {
  try {
    const response = yield call(api.post, EMPLOYEE_LOGIN, action.payload);
    if (response.data.status) {
      yield put(loginActions.loginSuccess(response.data));
    } else {
      yield put(loginActions.loginFailure(response.data));
    }
  } catch (e) {
    yield put(loginActions.loginFailure(e.message()));
  }
}

export default function* () {
  yield takeLatest(loginConstants.LOGIN_REQUEST, callLoginApi);
}
