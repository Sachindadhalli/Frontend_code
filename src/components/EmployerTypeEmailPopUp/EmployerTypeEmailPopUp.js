//library dependencies
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormControl, FormHelperText, Input, InputLabel} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles';
//style
import './style.scss';
//icon
import close from '../../../assets/media/images/close.png';
//utilities
import apiCall from '../../Utilities/apiCall';
import {EMPLOYER_OTP_VALIDATE} from '../../../config/constants';
//material ui theme customizations
const styles = theme => ({
  root: {display: 'flex', flexWrap: 'wrap',},
  margin: {margin: theme.spacing.unit,},
  withoutLabel: {marginTop: theme.spacing.unit * 3,},
  textField: {flexBasis: 200,},
  palette: {primary: green,},
});

class EmployerTypeEmailPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forgot_password_otp: '',
      forgot_password_otp_error: '',
    }
  }

  /**
   * on change of input field, storing value in the state
   * @param e
   */
  onInputChange = e => {
    const {id} = e.target;
    this.setState({[id]: e.target.value,});
  };

  /**]
   * @function to send otp to the server for validating
   * @param e
   * @return {Promise.<void>}
   */
  validateOtp = async (e) => {
    e.preventDefault();
    if (this.state.forgot_password_otp === '') {
      this.setState({ forgot_password_otp_error: 'Kindly specify OTP' })
    }
    else {
      const sendingData = {
        email_id: this.props.otp_email,
        otp: this.state.forgot_password_otp
      };
      const responseData = await apiCall('get', sendingData, EMPLOYER_OTP_VALIDATE);
      if (responseData.status === false) {
        this.setState({ forgot_password_otp_error: responseData.message })
      }
      else this.props.openNewPasswordPopUp(responseData.token);
    }
  };

  render() {
    const {classes} = this.props;
    return (
      <form className="employer-sign-in-email-model">
        <div className="email-modal-close">
          <img src={close}
               className="close"
               alt="close"
               onClick={this.props.onModalClose}
          />
        </div>
        <div className="Enter-OTP">
          Enter OTP
        </div>
        <div className="OTP-will-be-sent-to">
          OTP has been sent to your registered email {this.props.otp_email}
          . Please check your spam folder also
        </div>
        <div className="">
          <FormControl
            className={classes.formControl}
            error={this.state.forgot_password_otp_error !== ''}
            name="employer-sign-in-form"
          >
            <InputLabel htmlFor="email">OTP</InputLabel>
            <Input
              className="form-child"
              id="forgot_password_otp"
              type="text"
              onChange={this.onInputChange}
              required={true}
            />
            <FormHelperText id="pop-email-error">{this.state.forgot_password_otp_error}</FormHelperText>
          </FormControl>
        </div>
        <div className="did-not-received">
          <div className="You-will-receive-a-c">
            You will receive code in 30 second if you didn't, click
          </div>
          <div className="Resend"
               onClick={() => this.props.onGetOTP(this.props.otp_email)}
          >
            Resend
          </div>
        </div>
        <div className="">
          <button
            className="solid_button"
            id="send"
            onClick={this.validateOtp}
          >
            Submit
          </button>
        </div>
      </form>
    )
  }
}


EmployerTypeEmailPopUp.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(EmployerTypeEmailPopUp);

