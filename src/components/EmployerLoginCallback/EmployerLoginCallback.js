//library dependencies
import React, {Component} from 'react'

//style
import './style.scss';

//icon

//custom component
import Header from '../../components/Header/Header';

//utilities
import {handleLocalStorage, apiCall} from '../../Utilities/handleLocalStorage';
import queryString from 'query-string';
import {EMPLOYER_LOGIN_WITH_LINKEDIN} from '../../../config/constants';

const failedPageUrl = '/employer-signin';
const SuccessPageUrl = '/employer-profile-page';

export default class EmployerLoginCallback extends Component {

  /**
   * @function,used to Authenticate the user
   * @param sendingData
   * @param failedRedirectTo
   * @param successRedirectTo
   * @returns {Promise<void>}
   */
  isSociallyAuthenticated = async (sendingData, failedRedirectTo, successRedirectTo) => {
    const responseData = await apiCall('get', sendingData, EMPLOYER_LOGIN_WITH_LINKEDIN);
    if (responseData.status === true) {
      this.reDirectTo(successRedirectTo);
      handleLocalStorage("set", "employerLogin", responseData.data.access_token)
    }
    else this.reDirectTo(failedRedirectTo);
  };

  /**
   * @function,used to redirecting
   * @param redirectPage
   */
  reDirectTo = (redirectPage) => {
    this.props.history.push(redirectPage);
  };

  componentDidMount() {
    const params = queryString.parse(this.props.location.search)
    if (params.code === undefined) {
      this.reDirectTo(failedPageUrl)
    }
    const sendingData = {
      code: params.code
    }
    this.isSociallyAuthenticated(sendingData, failedPageUrl, SuccessPageUrl)
  }

  render() {
    return (
      <div>
        <Header/>
        <div className="success-text">
          <h1>You will be redirected soon</h1>
        </div>
      </div>
    );
  };
}

