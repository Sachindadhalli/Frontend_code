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
      Authorization: `Bearer ${localStorage.getItem('employeeLogin')}`,
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
    .post(`${BASE_URL}/helper/getToken`, {
      refreshToken: localStorage.getItem('refreshtkn'),
      agent_id: localStorage.getItem('id'),
    }).then((res) => {
    if (res.data.hasOwnProperty('Status') && res.data.Status) {
      localStorage.setItem('usrid', res.data.tokens.accessToken);
      localStorage.setItem('refreshtkn', res.data.tokens.refreshToken);
      window.location.reload();
    } else {
      localStorage.removeItem('usrid');
      localStorage.removeItem('refreshtkn');
      localStorage.removeItem('id');
      localStorage.removeItem('role');
      localStorage.removeItem('name');
      window.location.reload();
    }
  }).catch((err) => {
    localStorage.removeItem('usrid');
    localStorage.removeItem('refreshtkn');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
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
