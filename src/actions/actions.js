import {
  JOBSEEKER_FORM_REQUEST,
  JOBSEEKER_FORM_UPDATE_REQUEST,
  UPDATE_JOBSEEKER_SIGNUP_EDUCATION_DETAILS,
  UPDATE_JOBSEEKER_SIGNUP_EMPLOYMENT_DETAILS,
  UPDATE_JOBSEEKER_SIGNUP_PERSONAL_DETAILS
} from "./constants";

export function getJobSeekerSignupForm(req) {
  return {
    type: JOBSEEKER_FORM_REQUEST,
    payload: req
  }
}

export function updateJobSeekerSignupForm(req) {
  return {
    type: JOBSEEKER_FORM_UPDATE_REQUEST,
    payload: req
  }
}

export function updateJobSeekerSignupPersonalDetails(personalDetails) {
  return {
    type: UPDATE_JOBSEEKER_SIGNUP_PERSONAL_DETAILS,
    payload: personalDetails
  }
}

export function updateJobSeekerSignupEducationalDetails(educationalDetails) {
  return {
    type: UPDATE_JOBSEEKER_SIGNUP_EDUCATION_DETAILS,
    payload: educationalDetails
  }
}

export function updateJobSeekerSignupExperienceDetails(employmentDetails) {
  return {
    type: UPDATE_JOBSEEKER_SIGNUP_EMPLOYMENT_DETAILS,
    payload: employmentDetails
  }
}
