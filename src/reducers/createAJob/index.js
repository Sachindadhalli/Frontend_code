import {
  UPDATE_A_JOB_CANDIDATE_PROFILE,
  UPDATE_A_JOB_DOCUMENT,
  UPDATE_A_JOB_JOB_DETAILS,
  UPDATE_A_JOB_JOB_ID,
  UPDATE_A_JOB_MY_ORGANISATION,
  UPDATE_A_JOB_MY_QUESTIONNAIRE,
  UPDATE_I_HIRED_FOR
} from '../../actions/createAJob/constants';

const locationObject = {country: {key: '19306', value: 'india'}, location: {key: '', value: ''}}
const shiftObject = {shift: 'Regular', start: new Date('2014-08-18T09:00:00'), end: new Date('2014-08-18T18:00:00')}
const jobTypes = ['Full time', 'Part time', 'full-time work from home', 'part-time work from home', 'freelancer'];
const requirementUrgency = ['Immediate', 'Within 15 days', 'Within a month', 'Within 2 months', 'Within 3 months'];

const initialState = {
  job_id: null,
  hired_for: '',
  job_details: {
    locations: [locationObject],
    timings: [shiftObject],
    title: '',
    job_role: {key: '', value: ''},
    job_description: '',
    key_skills: [],
    job_type: [],
    number_of_vacancy: '',
    industry: [],
    functional_area: [],
    how_soon: '',
    work_experience_min: '',
    work_experience_max: '',
    is_fresher: false,
    currency: {key: '', value: ''},
    minimum_ctc: null,
    maximum_ctc: null,
    visible_to_no_one: false
  },
  candidate_profile: {
    back_to_work: true,
    job_for_specified_organisation: false,
    job_not_visible_for_specified_organisation: false,
    organisation_name: [],
    qualification: [],
    qualification_specialization: [{key: "", parent_key: "", value: "Any"}],
    phd_qualification: [],
    phd_qualification_specialization: [{key: "", parent_key: "", value: "Any"}],
    qualification_premier: false,
    qualification_phd_premier: false,
    desired_candidate: '',
    name: [],
    specialisation_data_source: [],
    phd_specialisation_data_source: [],
  },
  manage_response: {
    email_or_walkin: "email",
    forward_application_to_email: false,
    reference_code: "",
    selected_email: "",
    time_from: new Date('2014-08-18T09:00:00'),
    time_to: new Date('2014-08-18T18:00:00'),
    date_from: null,
    date_to: null,
    address_url: "",
    venue: ""
  },
  my_questionnaire: {page: 0, selectedQuestionnaire: 0},
  my_organisation: {page: 0, selectedOrganisation: 0},
  document: [],
  publish_job: {job_type: "", refresh_time: ""}
};

const CreateAJobReducers = (state = initialState, action = {}) => {
  const acceptingState = action.payload;
  switch (action.type) {
    case 'UPDATE_A_JOB_JOB_DETAILS':
      return {
        ...state,
        job_details: {
          ...state.job_details,
          ...acceptingState
        }
      };
    case 'UPDATE_A_JOB_CANDIDATE_PROFILE':
      return {
        ...state,
        candidate_profile: {
          ...state.candidate_profile,
          ...acceptingState,
        }
      };
    case 'UPDATE_A_JOB_JOB_ID':
      return {
        ...state,
        job_id: acceptingState
      };
    case 'UPDATE_A_JOB_MY_ORGANISATION':
      return {
        ...state,
        my_organisation: acceptingState
      };
    case 'UPDATE_A_JOB_MY_QUESTIONNAIRE':
      return {
        ...state,
        my_questionnaire: acceptingState
      };
    case 'UPDATE_A_JOB_CREATE_A_DETAILS':
      return {
        ...state,
        ...acceptingState
      };
    case 'UPDATE_I_HIRED_FOR':
      return {
        ...state,
        hired_for: acceptingState
      };
    case 'UPDATE_A_JOB_DOCUMENT':
      return {
        ...state,
        document: [...acceptingState]
      };
    default:
      return state
  }
};

export default CreateAJobReducers;


// return produce(state, (draftState) => {
//     draftState.candidate_profile = acceptingState
//     draftState.candidate_profile.qualification = [...acceptingState.qualification]
//  });
