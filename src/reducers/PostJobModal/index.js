import {SET_POST_JOB_MODAL} from '../../actions/PostJobModal/constants';

const initialState = {
  job_details: {},
  candidate_profile: {},
  manage_response: {},
  advertise_company_details: {},
  publish_job: {}
};

const PostJobModalReducer = (state = initialState, action = {}) => {
  const jobDetails = action.payload;
  switch (action.type) {
    case SET_POST_JOB_MODAL:
      return {...jobDetails};
    default:
      return state
  }
};

export default PostJobModalReducer;
