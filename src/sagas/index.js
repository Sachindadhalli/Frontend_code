import {all, fork} from 'redux-saga/effects';
import {map, unary} from 'lodash/fp';
import saga from './saga';
import employeeLoginSaga from '../containers/EmployeeSignIn/saga'
import employerLoginSaga from '../containers/EmployerSignIn/saga'
import subUsersSaga from '../containers/SubUser/saga'

/**
 * rootSaga
 */
export default function* root() {
  const _sagas = [
    saga,
    employeeLoginSaga,
    employerLoginSaga,
    subUsersSaga
  ];

  yield all(map(unary(fork), _sagas));
}
