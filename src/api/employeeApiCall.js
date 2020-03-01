import querystring from "query-string";
import {http} from "./axiosInstance";

import * as constants from "../../config/constants";

const API_ENDPOINT = constants.SERVER_API_URL+constants.SERVER_API_PATH;

/**
 * request to server
 * @param props
 */
function request(props) {
  const {url, init, query, option} = props;
  let strQuery = query ? `?${querystring.stringify(query)}` : "",
    fetchUrl = `${API_ENDPOINT}${url}${strQuery}`;
  if (init.method == "POST") {
    return http.post(fetchUrl, option);
  } else if (init.method == "PATCH") {
    return http.patch(fetchUrl, option);
  } else if (init.method == "DELETE") {
    return http.delete(fetchUrl, option);
  }
  return http.get( fetchUrl, {data: option} );
}

/**
 * type of method to call
 * @type {{get: (function(*, *)), post: (function(*, *)), patch: (function(*, *)), delete: (function(*, *))}}
 */
const Api = {
  get: (url, option) =>
    request({
      url,
      init: {
        method: "GET"
      },
      option
    }),

  post: (url, option) =>
    request({
      url,
      init: {
        method: "POST"
      },
      option
    }),
  patch: (url, option) =>
    request({
      url,
      init: {
        method: "PATCH"
      },
      option
    }),
  delete: (url, option) =>
    request({
      url,
      init: {
        method: "DELETE"
      },
      option
    })
};

export default Api;
