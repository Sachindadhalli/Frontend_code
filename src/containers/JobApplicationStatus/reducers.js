import jobApplicationStatusConstants  from './constants';

const initialState={ loading:false, response:null, error:null}

export function jobApplicationListReducer(state = initialState, action) {
  switch (action.type) {
    case jobApplicationStatusConstants.GET_JOB_APPLICATION_LIST_REQUEST:
      return {
        ...state,
        loading:true
      };
    case jobApplicationStatusConstants.GET_JOB_APPLICATION_LIST_SUCCESS:
      return {
        ...state,
        loading:false,
        response: action.payload
      };
    case jobApplicationStatusConstants.GET_JOB_APPLICATION_LIST_ERROR:
      return {
        ...state,
        loading:false,
        error:action.error
      };
    default: return state;
  }
}

export function jobApplicationDataReducer(state = initialState, action) {
  switch (action.type) {
    case jobApplicationStatusConstants.GET_JOB_APPLICATION_DATA_REQUEST:
      return {
        ...state,
        loading:true
      };
    case jobApplicationStatusConstants.GET_JOB_APPLICATION_DATA_SUCCESS:
      return {
        ...state,
        loading:false,
        response: action.payload
      };
    case jobApplicationStatusConstants.GET_JOB_APPLICATION_DATA_ERROR:
      return {
        ...state,
        loading:false,
        error:action.error
      };
    default: return state;
  }
}
