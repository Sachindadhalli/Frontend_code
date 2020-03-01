/**
 * src/api/http.js
 */
import axios from 'axios';
import qs from 'qs';
import * as constants from "../../config/constants";
const BASE_URL=constants.SERVER_API_URL+constants.SERVER_API_PATH;

/**
 * parse error response
 */
function parseError(messages) {
  // error
  if (messages) {
    if (messages instanceof Array) {
      return Promise.reject({ messages });
    }
    return Promise.reject({ messages: [messages] });
  }
  return Promise.reject({ messages: ['got errors'] });
}

/**
 * parse response
 */
function parseBody(response) {
  //  if (response.status === 200 && response.data.status.code === 200) { // - if use custom status code
  if (response.status === 200) {
    return response;
  } else if (response.status === 401) {
    getNewAccessToken();
  } else {
    return this.parseError(response.data.messages);
  }
}

/**
 * axios instance
 */
const instance = axios.create({
  baseURL: `${BASE_URL}`,
  paramsSerializer(params) {
    return qs.stringify(params, { indices: false });
  },
});

// request header
instance.interceptors.request.use(
  (config) => {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem('employerToken')}`,
    };
    return config;
  },
  error => Promise.reject(error),
);

/**
 * get refresh token
 */
function getNewAccessToken() {
  instance
    .post(BASE_URL+constants.EMPLOYER_LOGIN, {
      refresh_token: localStorage.getItem('employerRefreshToken'),
    }).then((res) => {
    if (res.data.hasOwnProperty('Status') && res.data.Status) {
      localStorage.setItem('employerLogin', res.data.data.accessToken);
      localStorage.setItem('employerToken', res.data.data.accessToken);
      localStorage.setItem('employerRefreshToken', res.data.data.refreshToken);
      window.location.reload();
    } else {
      localStorage.removeItem('employerLogin');
      localStorage.removeItem('employerToken');
      window.location.reload();
    }
  }).catch((err) => {
    localStorage.removeItem('employerLogin');
    localStorage.removeItem('employerToken');
    window.location.reload();
  });
}

// response parse
instance.interceptors.response.use(
  response => parseBody(response),
  (error) => {
    if (error.response) {
      if (error.response.status == 401) {
        getNewAccessToken();
      }
      return parseError(error.response.data);
    }
    return Promise.reject(error);
  },
);


export const http = instance;
