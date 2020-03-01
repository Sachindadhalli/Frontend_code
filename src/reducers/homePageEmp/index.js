import {
  UPDATE_EMP_BASIC_DETAILS,
  UPDATE_EMP_CONTACT_DETAILS,
  UPDATE_EMP_WORK_EXP,
  UPDATE_SECTOR_ROLES_HIRE_FOR,
} from '../../actions/homePageEmp/constants';

const deepCopy = data => JSON.parse(JSON.stringify(data));

const initialState = {
  personalDetails: {
    basicDetails: {
      profile_pic: '',
      name: '',
      current_country: '',
      current_city: '',
      current_employer: {key: '', value: ''},
      current_designation: {key: '', value: ''},
    },
    contactDetails: {
      business_email: '',
      secondary_email: '',
      mobile: {code: '+91', number: ''},
      facebook_url: '',
      linkedin_url: '',
      id: '',
    },
    workExp: [],
  },
  jobDetails: {sectors_roles: {}},
  loading: false,
  error: null,
};

const EmpHomePageReducers = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_EMP_BASIC_DETAILS:
      const basicDetails = action.payload;
      return {
        ...state,
        personalDetails: {
          ...state.personalDetails,
          basicDetails: {
            ...state.personalDetails.basicDetails,
            ...basicDetails,
          },
        },
      };

    case UPDATE_EMP_CONTACT_DETAILS:
      const contactDetails = action.payload;
      return {
        ...state,
        personalDetails: {
          ...state.personalDetails,
          contactDetails: {
            ...state.personalDetails.contactDetails,
            ...contactDetails,
          },
        },
      };

    case UPDATE_EMP_WORK_EXP:
      const workExp = action.payload;
      let personalDetails = deepCopy(state.personalDetails)
      personalDetails.workExp = workExp;
      return {
        ...state,
        personalDetails: {
          ...state.personalDetails,
          workExp: {
            ...state.personalDetails.workExp,
            ...workExp,
          },
        },
      }

    case UPDATE_SECTOR_ROLES_HIRE_FOR:
      const sectors_roles = action.payload;
      return {
        ...state,
        jobDetails: {
          ...state.jobDetails,
          sectors_roles: {
            ...state.jobDetails.sectors_roles,
            ...sectors_roles,
          },
        },
      };

    default:
      return state;
  }
};

export default EmpHomePageReducers;
