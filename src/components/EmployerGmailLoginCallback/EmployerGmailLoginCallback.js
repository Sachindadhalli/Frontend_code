//library dependencies
import React, {Component} from 'react';

//style
import './style.scss';

//custom component
import Header from '../../components/Header/Header';

//utilities
import queryString from 'query-string';
import {EMPLOYER_LOGIN_WITH_GMAIL} from '../../../config/constants';
import {handleLocalStorage, apiCall} from '../../Utilities';

const failedPageUrl = '/employer-signin';
const SuccessPageUrl = '/employer-profile-page';

export default class EmployerGmailLoginCallback extends Component {

  /**
   * Performing validation of user login with gmail from an api
   * @param sendingData
   * @param failedRedirectTo
   * @param successRedirectTo
   * @returns {Promise<void>}
   */
  isSociallyAuthenticated = async (sendingData, failedRedirectTo, successRedirectTo) => {
    const responseData = await apiCall('get', sendingData, EMPLOYER_LOGIN_WITH_GMAIL);
    if (responseData.status === true) {
      this.reDirectTo(successRedirectTo);
      handleLocalStorage("set", "employerLogin", responseData.data.access_token)
    }
    else this.reDirectTo(failedRedirectTo);
  };
  /**
   * @function,used to redirecting the success or failed page
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
      code: params.code,
      state: params.state,
      scope: params.state
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
  }
}

