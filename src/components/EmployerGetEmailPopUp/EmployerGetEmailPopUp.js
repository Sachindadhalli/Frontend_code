// library dependencies
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, FormControl, FormHelperText, Grid, Input, InputLabel, withStyles} from '@material-ui/core';
//style
import './style.scss';
import customisedMaterial from '../../styles/customisedMaterial';
//icon
import close from '../../../assets/media/images/close.png';
//custom component
import validateEmail from '../../Utilities/validateEmail';
import LoadingIcon from '../../components/LoadingIcon';
//utilities
import apiCall from '../../Utilities/apiCall';


// use to overrides material ui component style
const styles = theme => ({
  root: {display: 'flex', flexWrap: 'wrap',},
  margin: {margin: theme.spacing.unit,},
  withoutLabel: {marginTop: theme.spacing.unit * 3,},
  textField: {flexBasis: 200,},
  button: {margin: '11px', borderRadius: '20px'},
  input: {display: 'none',},
  ...customisedMaterial
});

class EmployerGetEmailPopUp extends Component {
  constructor(props) {
    super(props);
    this.resetErrors();
    this.state = {
      popup_email: '',
      popup_email_error: '',
      is_email_valid: false,
      forgot_password_otp: 'validate',
      forgot_password_otp_error: '',
      input_one: '',
      input_two: '',
      input_three: '',
      input_four: '',
      is_received_otp: false,
      show_loading: false,
      is_resend_enable: false,
      is_get_otp_enable: false,
      isSubmitEnable: false,
      leftTime: 45,
      isResendClicked: false,
    }
    this.otpTimer = null;
  }

  /**
   * this function used to reset error for pop up email field
   */
  resetErrors = () => {
    this.setState({popup_email_error: '',})
  };

  /**
   * this function used to manipulate loading in popup
   * @param newState
   */
  setLoading = (newState) => {
    this.setState({show_loading: newState})
  };

  /**
   * this function used to handle key press and move focus depending upon key
   * @param e
   */
  handlePressKey = (e) => {
    const keyCode = e.keyCode || e.charCode;
    const {id} = e.target;
    if (keyCode === 8 || keyCode === 46 && this.state[id] === "") {
      setTimeout(() => this.setFocusToPrevious(id), 10)
    }
  };

  /**
   * on otp input change stored in state and enable submit button depends on all inputs receives
   * @param e
   */
  onOtpInputChange = e => {
    const {id} = e.target;
    this.setState({
      [id]: !isNaN(e.target.value) && e.target.value !== '' ? (e.target.value) % 10 : e.target.value,
    }, () => {
      if ((this.state.input_four || this.state.input_four === "0") && (this.state.input_one || this.state.input_one === "0") && (this.state.input_two || this.state.input_two === "0") && (this.state.input_three || this.state.input_three === "0")) {
        this.setState({isSubmitEnable: true});
      } else {
        this.setState({isSubmitEnable: false})
      }
    }, e.target.value !== "" ? this.setFocusToInput(id) : null);
  };

  /**
   * set focus to input field call function by previous focus field
   * @param previousFocus
   */
  setFocusToInput = (previousFocus) => {
    switch (previousFocus) {
      case 'input_one':
        this.input_two.focus();
        break;
      case 'input_two':
        this.input_three.focus();
        break;
      case 'input_three':
        this.input_four.focus();
        break;
    }
  };

  /**
   * add focus to filed defined by current focus field
   * @param currentFocus
   */
  setFocusToPrevious = (currentFocus) => {
    switch (currentFocus) {
      case 'input_two':
        this.input_one.focus();
        break;
      case 'input_three':
        this.input_two.focus();
        break;
      case 'input_four':
        this.input_three.focus();
        break;
    }
  };

  /**
   * set error for defined field by specified by name
   * @param name
   * @param value
   */
  setParticularField = (name, value) => {
    const errorName = name + '_error';
    this.setState({[errorName]: value,});
  };
  /**
   * remove error field from specified target name
   * @param e
   */
  removeErrorFocus = (e) => {
    this.setParticularField(e.target.name, '');
  };

  /**
   * get otp function send data to parent component to call get otp api
   * @param e
   * @returns {Promise<void>}
   */
  getOTP = async (e) => {
    e.preventDefault();
    this.emailValidations();
    if (this.state.popup_email_error === '' && this.state.popup_email !== "") {
      this.setLoading(true);
      const data = await this.props.onGetOTP(this.state.popup_email);
      this.setLoading(false);
      this.setState({
        isResendClicked: data.status,
        is_received_otp: data.status,
        is_get_otp_enable: !data.status
      })
      this.handleResendButton(true, 45000);
    }
  };

  /**
   * on input change stored in state variable value
   * @param e
   */
  onInputChange = e => {
    const {id} = e.target;
    if (validateEmail(e.target.value)) {
      if (!this.props.isApicall) {
        this.isEmailAvailable(e.target.value);
      }
      this.setState({
        [id]: e.target.value,
      });
    } else {
      this.setState({
        [id]: e.target.value,
        is_get_otp_enable: false
      });
    }
  };

  /**
   * check if email is valid
   * @param email
   * @returns {Promise<*>}
   */
  isEmailAvailable = async (email) => {
    const sendingData = {
      email_id: email
    };
    const data = await apiCall('get', sendingData, this.props.emailVerificationUrl);
    this.setState({
      is_get_otp_enable: !data.status,
      is_email_valid: !data.status,
      popup_email_error: data.status === true ? 'Email is not registered with us' : '',
    });
    return data.status;
  };

  /**
   * handle resend button disable for 45 second
   * @param newState
   * @param timeOut
   */
  handleResendButton(newState, timeOut) {
    this.setState(
      {
        popup_email_error: '',
        input_two: '',
        input_three: '',
        input_four: '',
        input_one: '',
        isSubmitEnable: false,
      });
    this.setState(() => {
        setTimeout(() => {
          this.setState({is_resend_enable: newState, leftTime: 45,});
          clearInterval(this.otpTimer);
        }, timeOut);
      },
    ),
      this.otpTimer = setInterval(() => {
        this.setState({leftTime: this.state.leftTime - 1,});
      }, 1000);
  };

  /**
   * calls whenever user click on resend button and send data to parent component through props for resend otp api call
   * @returns {Promise<void>}
   */
  reSendOTP = async () => {
    this.setLoading(true);
    this.handleResendButton(false, 0)
    await this.props.onGetOTP(this.state.popup_email);
    this.setLoading(false);
    this.handleResendButton(true, 45000)
  };


  /**
   * to validate all the aspect of email and assign error depends on value
   * @returns {boolean}
   */
  emailValidations = () => {
    const {popup_email} = this.state;
    let emailErrorMessage = '';
    if (popup_email == '') {
      emailErrorMessage = 'Kindly specify your Email Id';
      this.setState({
        popup_email_error: emailErrorMessage,
        isOTPEnable: true
      })
    } else if (!validateEmail(popup_email)) {
      emailErrorMessage = 'Kindly Enter a valid Email Id';
      this.setState({
        popup_email_error: emailErrorMessage,
        isOTPEnable: true
      })
    } else {
      this.isEmailAvailable(popup_email);
      this.setState({
        popup_email_error: emailErrorMessage,
        isOTPEnable: true
      })
    }
    this.setParticularField('popup_email', emailErrorMessage);
    return emailErrorMessage ? true : false
  };

  /**
   * this function used to validate otp from validate otp api call
   * @param e
   * @returns {Promise<void>}
   */
  validateOtp = async (e) => {
    e.preventDefault();
    const forgot_password_otp = this.state.input_one + '' + this.state.input_two + this.state.input_three + this.state.input_four
    if (forgot_password_otp.length === 0) {
      this.setState({
        forgot_password_otp_error: 'Kindly specify OTP'
      })
    }
    else {
      const sendingData = {
        email_id: this.state.popup_email,
        otp: forgot_password_otp
      };
      const responseData = await apiCall('get', sendingData, this.props.otpValidationUrl);
      if (responseData.status === false) {
        this.setState({
          forgot_password_otp_error: responseData.message,
        })
      }
      else {
        this.props.openNewPasswordPopUp(responseData.token);
      }
    }
  };

  /**
   * this function calls when close icon click for closing model
   */
  closeModal = () => {
    this.setState({isResendClicked: false});
    this.props.onModalClose();
  };

  render() {
    const {classes, id} = this.props;
    const receivedOtp = !this.state.is_received_otp || this.state.popup_email_error !== ""
    return (
      <form className="employer-sign-in-email-model">
        {this.state.show_loading ? <LoadingIcon/> : null}
        <div className="email-modal-close pr-0">
          <img src={close}
               className="close"
               alt="close"
               onClick={this.closeModal}
          />
        </div>
        <div className="Forgot-Password">
          Forgot Password
        </div>
        <div className="forgot-password-email pl-44 mb-8 mt-36">
          <div>
            <FormControl
              className={classes.formControl}
              error={this.state.popup_email_error !== ""}
              name="employer-sign-in-form"
            >
              <InputLabel htmlFor="popup_email"
                          shrink={true}
                          disabled={receivedOtp}
                          classes={{root: classes.cssLabel, focused: classes.cssFocused,}}
              >
                Email
              </InputLabel>
              <Input
                className="form-child"
                id="popup_email"
                name="popup_email"
                type="text"
                disabled={!receivedOtp}
                value={this.state.id}
                onChange={this.onInputChange}
                onBlur={this.emailValidations}
                onFocus={this.removeErrorFocus}
                autoComplete="off"
                classes={{root: classes.cssLabel, focused: classes.cssFocused,}}
              />
              <FormHelperText className="field_error">{this.state.popup_email_error}</FormHelperText>
            </FormControl>
          </div>
          <div>
            <FormControl
              className={classes.formControl}
              error={false}
            >
              {this.state.isResendClicked ?
                <Button color="secondary" className={classes.button}
                        onClick={this.state.is_resend_enable ? this.reSendOTP : null}
                        style={this.state.popup_email_error !== "" || this.state.popup_email === "" || this.state.is_resend_enable === false ? {
                          'cursor': 'not-allowed',
                          'color': 'gray',
                          width: '108px',
                          textTransform: 'none'
                        } : {width: '108px', textTransform: 'none'}}
                >
                  Resend OTP
                </Button>
                : <Button color="secondary" className={classes.button}
                          onClick={this.state.is_get_otp_enable === true ? this.getOTP : null}
                          style={this.state.is_get_otp_enable === false ? {
                            'cursor': 'not-allowed',
                            'color': '#6d6868',
                            textTransform: 'none'
                          } : {textTransform: 'none'}}
                >
                  Get OTP
                </Button>
              }
            </FormControl>
          </div>
        </div>
        {
          receivedOtp === true ? null :
            <div className="hiden-fields">
              <div className="input-otp">
                <div>
                  <Grid container spacing={8} className='gridStyle'
                  >
                    <Grid item xs={2} style={{paddingRight: '10px'}}>
                      <Input
                        onChange={this.onOtpInputChange}
                        id="input_one"
                        type="number"
                        tabIndex="1"
                        className="otp-input-value"
                        readOnly={receivedOtp}
                        value={this.state.input_one}
                        disabled={receivedOtp}
                        onKeyDown={this.handlePressKey}
                        inputRef={ref => {
                          this.input_one = ref;
                        }}
                        classes={{root: classes.cssLabel, focused: classes.cssFocused,}}
                      />
                    </Grid>
                    <Grid item xs={2} style={{paddingRight: '10px'}}>
                      <Input
                        onChange={this.onOtpInputChange}
                        id="input_two"
                        type="number"
                        className="otp-input-value"
                        value={this.state.input_two}
                        readOnly={receivedOtp}
                        inputRef={ref => {
                          this.input_two = ref;
                        }}
                        disabled={receivedOtp}
                        onKeyDown={this.handlePressKey}
                        classes={{root: classes.cssLabel, focused: classes.cssFocused,}}
                      />
                    </Grid>
                    <Grid item xs={2} style={{paddingRight: '10px'}}>
                      <Input
                        onChange={this.onOtpInputChange}
                        id="input_three"
                        type="number"
                        className="otp-input-value"
                        value={this.state.input_three}
                        readOnly={receivedOtp}
                        inputRef={ref => {
                          this.input_three = ref;
                        }}
                        disabled={receivedOtp}
                        onKeyDown={this.handlePressKey}
                        classes={{root: classes.cssLabel, focused: classes.cssFocused,}}
                      />
                    </Grid>
                    <Grid item xs={2} style={{paddingRight: '10px'}}>
                      <Input
                        onChange={this.onOtpInputChange}
                        id="input_four"
                        type="number"
                        className="otp-input-value"
                        value={this.state.input_four}
                        readOnly={receivedOtp}
                        inputRef={ref => {
                          this.input_four = ref;
                        }}
                        disabled={receivedOtp}
                        onKeyDown={this.handlePressKey}
                        classes={{root: classes.cssLabel, focused: classes.cssFocused,}}
                      />
                    </Grid>
                  </Grid>
                </div>
                <div>
                  <FormControl
                    error={this.state.forgot_password_otp_error !== ""}
                  >
                    <FormHelperText style={{"textAlign": "center"}} id="pop-email-error"
                                    className="field_error">{this.state.forgot_password_otp_error}</FormHelperText>
                  </FormControl>
                </div>
              </div>

              <div>
                <div className="did-not-received mt-16">
                  <div className="You-will-receive-a-c">
                    If you do not receive your OTP in {this.state.leftTime} sec, click on Resend OTP
                  </div>
                </div>
                <div className="submit-button-name">
                  <button
                    className={this.state.isSubmitEnable === true && this.state.is_resend_enable === false ? "solid_button" : "solid_button disable-button"}
                    id="send"
                    onClick={this.validateOtp}
                    disabled={receivedOtp}
                    style={receivedOtp ? {'cursor': 'not-allowed', alignItems: 'center'} : null}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
        }
      </form>
    )
  }
}

EmployerGetEmailPopUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmployerGetEmailPopUp);
