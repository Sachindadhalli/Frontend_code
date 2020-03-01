import {reducer as formReducer} from 'redux-form'
import * as reducers from './reducers';
import empHomePage from './homePageEmp'
import createAJob from './createAJob';
import postJobModal from './PostJobModal'
import {employeeLoginReducer} from '../containers/EmployeeSignIn/reducers'
import {employerLoginReducer} from '../containers/EmployerSignIn/reducers'
import {getSubUsersListReducer} from '../containers/SubUser/reducers'

export default {
  ...reducers,
  empHomePage,
  createAJob,
  form: formReducer,
  postJobModal,
  employeeLogin: employeeLoginReducer,
  employerLogin: employerLoginReducer,
  subUsersList: getSubUsersListReducer
};
