//library dependencies
import React, {Component} from 'react';
import {container, Modal} from '@material-ui/core';
//styles
import './styles.scss';
//custom components
import EmailVerification from '../../../../components/EmailVerification';
//utilities
import {apiCall, handleLocalStorage} from '../../../../Utilities';
import {ACCOUNT_DETAILS_EMAIL_OTP_VALIDATE, ACCOUNT_DETAILS_SEND_OTP} from '../../../../../config/constants';

class UpdateEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secondary_email_error: '',
      email_model: false,
      secondary_email: '',
    }
  }

  /**
   * after user submit the otp, sending otp to the server and verifying otp from the server
   * @param email
   * @param otp
   * @return {Promise.<*>}
   */
  onValidateEmailOTP = async (email, otp) => {
    const sendingData = {email_id: email, otp,};
    const header = {
      'authorization': handleLocalStorage('get', 'employerLogin'),
      'Content-Type': 'application/json',
    };
    const responseData = await apiCall('get', sendingData, ACCOUNT_DETAILS_EMAIL_OTP_VALIDATE, header);

    if (responseData.status === false) {
      return responseData;
    }
    this.props.updateEmail({email});
    this.props.handleModel('email_model'); //closing the modal
    return responseData;
  };

  /**
   * requesting to send the otp to given email id
   * @param popup_email
   * @return {Promise.<*>}
   */
  onGetEmailOTP = async popup_email => {
    const sendinonGetEmailOTPgData = {email_id: popup_email,};
    const header = {
      'authorization': handleLocalStorage("get", "employerLogin"),
      'content-Type': 'application/json',
    };
    const data = await apiCall('get', sendinonGetEmailOTPgData, ACCOUNT_DETAILS_SEND_OTP, header);
    return data;
  };

  /**
   * based on the status sending the error
   * @param status
   */
  returnEmailError = status => (status === false ? 'Email Id already exists in the system' : '');

  //returning the status
  returnErrorStatus = status => status;

  render() {
    const {email_model, handleModel} = this.props
    return (
      <form>
        <Modal open={email_model}>
          <EmailVerification
            onGetEmailOTP={this.onGetEmailOTP}
            onValidateEmailOTP={this.onValidateEmailOTP}
            returnEmailError={this.returnEmailError}
            returnErrorStatus={this.returnErrorStatus}
            handleModel={() => handleModel('email_model')}
            headingText={this.props.hasOwnProperty('headerText') ? this.props.headerText : "Verify Email"}
          />
        </Modal>
      </form>
    );
  }
}


export default UpdateEmail;
