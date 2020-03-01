import {
  JOBSEEKER_FORM_REQUEST,
  UPDATE_JOBSEEKER_SIGNUP_EDUCATION_DETAILS,
  UPDATE_JOBSEEKER_SIGNUP_EMPLOYMENT_DETAILS,
  UPDATE_JOBSEEKER_SIGNUP_PERSONAL_DETAILS,
} from '../actions/constants';

const deepCopy = data => JSON.parse(JSON.stringify(data));

const initialState = {
  jobSeekerSignupFormData: {personalDetails: {}, educationalDetails: {}, employmentDetails: {}},
  loading: false,
  error: null,
};

const formReducers = (state = initialState, action = {}) => {
  switch (action.type) {
    case JOBSEEKER_FORM_REQUEST:
      return {
        ...state,
        loading: true,
        jobSeekerSignupFormData: action.payload,
      };

    case UPDATE_JOBSEEKER_SIGNUP_PERSONAL_DETAILS:
      const jobseekerPersonalDetails = action.payload;
      let jobSeekerSignupFormData = deepCopy(state.jobSeekerSignupFormData);
      jobSeekerSignupFormData.personalDetails = jobseekerPersonalDetails;
      return {
        ...state,
        jobSeekerSignupFormData,
      };

    case UPDATE_JOBSEEKER_SIGNUP_EDUCATION_DETAILS:
      const jobseekerEducationalDetails = action.payload;
      jobSeekerSignupFormData = deepCopy(state.jobSeekerSignupFormData);
      jobSeekerSignupFormData.educationalDetails = jobseekerEducationalDetails;
      return {
        ...state,
        jobSeekerSignupFormData,
      };

    case UPDATE_JOBSEEKER_SIGNUP_EMPLOYMENT_DETAILS:
      const jobseekerEmploymentDetails = action.payload;
      jobSeekerSignupFormData = deepCopy(state.jobSeekerSignupFormData);
      jobSeekerSignupFormData.employmentDetails = jobseekerEmploymentDetails;
      return {
        ...state,
        jobSeekerSignupFormData,
      };

    default:
      return state;
  }
};

export default formReducers;
