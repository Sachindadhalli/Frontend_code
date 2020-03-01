import subUserConstants from './constants';

const initialState = {
  loading: false,
  subUsersListResponse: null,
  error: null,
  selectedTab: 'active',
  rowsPerPage: 10,
  pageNumber: 0
}

export function getSubUsersListReducer(state = initialState, action) {
  switch (action.type) {
    case subUserConstants.GET_SUBUSERS_REQUEST:
      return {
        ...state,
        loading: true,
        selectedTab: action.payload.status,
        rowsPerPage: action.payload.limit,
        pageNumber: action.payload.page
      };

    case subUserConstants.GET_SUBUSERS_SUCCESS:
      return {...state, loading: false, subUsersListResponse: action.payload};

    case subUserConstants.GET_SUBUSERS_ERROR:
      return {...state, loading: false, error: action.error};

    default:
      return state;
  }
}

export function deleteSubUsersReducer(state = initialState, action) {
  switch (action.type) {
    case subUserConstants.DELETE_SUBUSERS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case subUserConstants.DELETE_SUBUSERS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case subUserConstants.DELETE_SUBUSERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function subUsersDataReducer(state = initialState, action) {
  switch (action.type) {
    case subUserConstants.GET_SUBUSER_DATA_REQUEST:
      return {
        ...state,
        loading: true
      };
    case subUserConstants.GET_SUBUSER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case subUserConstants.GET_SUBUSER_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function userPermissionReducer(state = initialState, action) {
  switch (action.type) {
    case subUserConstants.GET_USER_PERMISSIONS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case subUserConstants.GET_USER_PERMISSIONS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case subUserConstants.GET_USER_PERMISSIONS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function updateSubUsersDataReducer(state = initialState, action) {
  switch (action.type) {
    case subUserConstants.UPDATE_SUBUSER_DATA_REQUEST:
      return {
        ...state,
        loading: true
      };
    case subUserConstants.UPDATE_SUBUSER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case subUserConstants.UPDATE_SUBUSER_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
