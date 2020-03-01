import {createSelector} from "reselect";

const employerLogin = state => state.employerLogin;

function checkUserLogin(data) {
  let loginData = {isLoading: true, tokens: null, message: ''};
  if (data.response && data.response.hasOwnProperty("status") && data.response.status) {
    loginData.isLoading = data.loading;
    loginData.message = data.response.message;
    loginData.tokens = data.response.data;
  }
  if (data.error && data.error.hasOwnProperty('status') && !data.error.status) {
    loginData.message = data.error.message;
  }
  return loginData;
}

export const isLoggedIn = createSelector(
  employerLogin,
  (employerLoginData) => ({
    loginData: checkUserLogin(employerLoginData)
  })
);
