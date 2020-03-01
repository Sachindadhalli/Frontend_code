import {loginConstants} from './constants';

const initialState = {loading: false, response: null, error: null}

export function employeeLoginReducer(state = initialState, action) {
  switch (action.type) {
    case loginConstants.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case loginConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload
      };
    case loginConstants.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state
  }
}
