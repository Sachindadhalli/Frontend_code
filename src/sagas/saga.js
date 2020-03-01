import {put, select, takeLatest} from "redux-saga/effects";
import * as jobseekerSignupForms from "../actions";
import {
  JOBSEEKER_FORM_REQUEST,
  UPDATE_JOBSEEKER_SIGNUP_EDUCATION_DETAILS,
  UPDATE_JOBSEEKER_SIGNUP_EMPLOYMENT_DETAILS,
  UPDATE_JOBSEEKER_SIGNUP_PERSONAL_DETAILS
} from "../actions/constants";

const deepCopy = (data) => {
  return JSON.parse(JSON.stringify(data));
}

export const getJobSeekerSignupForm = (state) => state.jobSeekerSignupFormData;

function* getJobSeekerSignupFormData(action) {
  let jobSeekerSignupForm = yield select(getJobSeekerSignupForm);
  let jobSeekerSignupFormCopy = deepCopy(jobSeekerSignupForm);

  yield put(jobseekerSignupForms.getJobSeekerSignupForm(jobSeekerSignupFormCopy))
}

function* updateJobSeekerSignupPersonalDetailsForm(action) {
  const {personalDetails} = action.payload;
  const jobSeekerSignupFormData = yield select(getJobSeekerSignupForm);
  let jobSeekerSignupFormDataCopy = jobSeekerSignupFormData ? deepCopy(jobSeekerSignupFormData) : jobSeekerSignupFormData;
  jobSeekerSignupFormData.personalDetails = personalDetails;

  yield put(jobseekerSignupForms.updateJobSeekerSignupForm(jobSeekerSignupFormDataCopy));
}

function* updateJobSeekerSignupEducationDetailsForm(action) {
  const {educationalDetails} = action.payload;
  const jobSeekerSignupFormData = yield select(getJobSeekerSignupForm);
  let jobSeekerSignupFormDataCopy = deepCopy(jobSeekerSignupFormData);
  jobSeekerSignupFormData.educationalDetails = educationalDetails;

  yield put(jobseekerSignupForms.updateJobSeekerSignupForm(jobSeekerSignupFormDataCopy));
}

function* updateJobSeekerSignupEmploymentDetailsForm(action) {
  const {employmentDetails} = action.payload;
  const jobSeekerSignupFormData = yield select(getJobSeekerSignupForm);
  let jobSeekerSignupFormDataCopy = deepCopy(jobSeekerSignupFormData);
  jobSeekerSignupFormData.employmentDetails = employmentDetails;

  yield put(jobseekerSignupForms.updateJobSeekerSignupForm(jobSeekerSignupFormDataCopy));
}

export default function* () {
  yield takeLatest(JOBSEEKER_FORM_REQUEST, getJobSeekerSignupFormData);
  yield takeLatest(UPDATE_JOBSEEKER_SIGNUP_PERSONAL_DETAILS, updateJobSeekerSignupPersonalDetailsForm);
  yield takeLatest(UPDATE_JOBSEEKER_SIGNUP_EDUCATION_DETAILS, updateJobSeekerSignupEducationDetailsForm);
  yield takeLatest(UPDATE_JOBSEEKER_SIGNUP_EMPLOYMENT_DETAILS, updateJobSeekerSignupEmploymentDetailsForm);
}
