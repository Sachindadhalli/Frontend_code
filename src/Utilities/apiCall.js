//library dependencies
import axios from 'axios';
<<<<<<< HEAD
//utilities
import {SERVER_API_PATH, SERVER_API_URL} from '../../config/constants';
=======
import { SERVER_API_URL, SERVER_API_PATH } from '../../config/constants';
>>>>>>> user-profile-integration
import handleLocalStorage from './handleLocalStorage';

const EMP_AUTH_HEADER = {
<<<<<<< HEAD
  'authorization': handleLocalStorage("get", "employerLogin"),
  'Content-Type': 'application/json',
};
/**
 * make an type of api call
 * @param methodName
 * @param sendingData
 * @param apiPath
 * @param header
 * @return {Promise.<void>}
 */
export default async function apiCall(methodName, sendingData, apiPath, header = null) {
  try {
    const apiUrl = SERVER_API_URL + SERVER_API_PATH + apiPath;
    let responseData;
    let headers = header ? header : EMP_AUTH_HEADER;
    switch (methodName) {
      case 'get':
        responseData = await axios.get(apiUrl, {params: sendingData, headers: headers})
        break;
      case 'post':
        responseData = await axios.post(apiUrl, sendingData, {headers: header})
        break;
      case 'patch':
        responseData = await axios.patch(apiUrl, sendingData, {headers: header})
        break;
      case 'delete':
        responseData = await axios.delete(apiUrl, {params: sendingData, headers: header})
        break;
      default:
    }
    return responseData.data;
  }
  catch (e) {
    if (e.message == "Request failed with status code 401") {
    }
  }
};
=======
  authorization: handleLocalStorage('get', 'employerLogin'),
  'Content-Type': 'application/json',
};
export default async function apiCall(methodName, sendingData, apiPath, header = null) {
  try {
    // console.log('api',apiPath)
    // const apiUrl = SERVER_API_URL + SERVER_API_PATH + apiPath;
    const apiUrl = 'http://127.0.0.1:8000/pinkjob/' + apiPath;
    // debugger;
    let responseData;
    let headers = header ? header : EMP_AUTH_HEADER;
    // console.log('header, ', apiPath)
    switch (methodName) {
      case 'get':
        responseData = await axios.get(apiUrl, { params: sendingData, headers: headers });
        break;
      case 'post':
        responseData = await axios.post(apiUrl, sendingData, { headers: header });
        break;
      case 'patch':
        responseData = await axios.patch(apiUrl, sendingData, { headers: header });
        break;
      case 'delete':
        responseData = await axios.delete(apiUrl, { params: sendingData, headers: header });
        break;
      default:
      //console.log('something went wrong', methodName);
    }
    return responseData.data;
  } catch (e) {
    if (e.message == 'Request failed with status code 401') {
      // debugger
      // localStorage.clear()
      // window.location.href = '/employer-signin'
    }
  }
}
>>>>>>> user-profile-integration
