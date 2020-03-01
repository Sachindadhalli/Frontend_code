import employerLoginConstants from './constants';

const initialState = {loading: false, response: null, error: null}

export function employerLoginReducer(state = initialState, action) {
  switch (action.type) {
    case employerLoginConstants.EMPLOYER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case employerLoginConstants.EMPLOYER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload
      };
    case employerLoginConstants.EMPLOYER_LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
