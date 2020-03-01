//library modules
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Modal,
  withStyles
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
//styles
import customisedMaterial from '../../styles/customisedMaterial';
import './style.scss';
//custom components
import CustomIcon from '../../components/CustomIcon';
import EmployerGetEmailPopUp from '../../components/EmployerGetEmailPopUp';
import EmployerTypeEmailPopUp from '../../components/EmployerTypeEmailPopUp';
import NewPasswordPopUp from '../../components/NewPasswordPopUp';
import Header from '../../components/Header/Header';
import CustomTag from '../../components/CustomTag';
//icons
import googleIcon from '../../../assets/media/icons/googleIcon.svg';
import linkedin from '../../../assets/media/icons/linkedin.svg';
import validateEmail from '../../Utilities/validateEmail';
//utilities
import {apiCall, handleLocalStorage, validatePassword} from '../../Utilities';
import {
  EMPLOYER_EMAIL_VERIFICATION,
  EMPLOYER_FORGOT_PASSWORD,
  EMPLOYER_LOGIN_GMAIL_REDIRECT_URL,
  EMPLOYER_LOGIN_REDIRECT_URL,
  EMPLOYER_OTP_VALIDATE
} from '../../../config/constants';
import * as employerLoginActions from './actions';
import {isLoggedIn} from './selectors.js';

//material ui style customizations
const styles = theme => ({
  ...customisedMaterial,
  root: {display: 'flex', flexWrap: 'wrap',},
  margin: {margin: theme.spacing.unit,},
  withoutLabel: {marginTop: theme.spacing.unit * 3,},
  textField: {flexBasis: 200,},
  cssLabel: {
    color: '#656565 !important',
    fontSize: '14px',
    fontFamily: 'Roboto',
    fontWeight: 400,
  },
  cssError: {
    color: '#656565 !important',
    fontSize: '14px',
    fontFamily: 'Roboto',
    fontWeight: 400,
  },
});

class EmployerSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      remember_me: true,
      email_error: '',
      password_error: '',
      show_password: false,
      failed_error: '',
      email_modal: false,
      get_otp_modal: false,
      new_password_modal: false,
      otp_email: '',
      set_password_modal: false,
      token: '',
    };
    this.windowStatus = null;
  }

  /**
   * on change of input fields(username or password), updating the state variables
   * @param e
   * @return updating the username and password state fields
   */
  onInputChange = e => {
    const {id} = e.target;
    this.setState({[id]: e.target.value, failed_error: '', [`${id}_error`]: '',});
  };

  /**
   * on submit click validating form fields(username or password).
   * @param checkForErrors
   * @return validating username and password
   */
  validateFormData = checkForErrors => {
    const elementIds = ['email', 'password'];
    elementIds.forEach(elementId => {
      this.checkForErrors(elementId);
    });
  };

  // check if any error before submit
  checkFormValidity = () => {
    const errorIds = ['email_error', 'password_error'];
    let isFormValid = true;
    errorIds.forEach(errorId => {
      if (this.state[errorId] !== '') isFormValid = false;
    });
    return isFormValid;
  };

  componentWillMount() {
    // check whether user already logged in or not
    // if logged in, redirect to dashboard page
    if (handleLocalStorage('get', 'employerLogin')) this.props.history.push('/employer-dashboard');
  }

  /**
   * making login api call
   * @return {Promise.<*|any>}
   */
  checkLogin = async () => {
    const sendingData = {
      email_id: this.state.email.trim(),
      password: this.state.password,
      remember: this.state.remember_me
    };
    return this.props.makeLoginApiCall(sendingData);
  };

  /**
   * Redirecting to dashboard page, if oAuth happened successfully
   * @param event
   * @return redirection to dashboard
   * */
  closeRenderWindow = (event) => {
    if (event.data === 'closeWindowStatus') {
      this.windowStatus.close();
      this.windowStatus = "";
      if (localStorage.getItem('employerLogin')) this.props.history.push('/employer-dashboard');
    }
  };

  componentDidMount() {
    // added widow message event listener to capture oAuth event of google and linked in
    this.windowStatus = window.addEventListener('message', this.closeRenderWindow, false);
  }

  /**
   * on login form submit, checking validation, email validity. After valid email calling login api
   * @param e
   * @return form validation, email validity and login
   * */
  onFormSubmit = async e => {
    e.preventDefault();
    let isFormValid = true;
    await this.validateFormData();
    isFormValid = this.checkFormValidity();
    if (isFormValid === true) await this.checkLogin();
  };

  /**
   * to change state of checkbox and password visibility
   * @param id
   * @return password visibility
   * */
  changeState = id => {
    this.setState({[id]: !this.state[id],});
  };

  /**
   * Performing the email validations
   * @return error message
   * */
  emailValidations = () => {
    const {email} = this.state;
    let emailErrorMessage = '';
    if (email === '') emailErrorMessage = 'Kindly specify your Email Id';
    else if (!validateEmail(email)) emailErrorMessage = 'Kindly Enter a valid Email Id';
    return emailErrorMessage;
  };

  /**
   * Performing the password validations
   * @return error message
   * */
  passwordValidator = () => {
    let passwordErrorMessage = '';
    const {password} = this.state;
    if (password === '') passwordErrorMessage = 'Kindly enter the password';
    else if (validatePassword(this.state.password) === false) {
      passwordErrorMessage =
        'Password should be combination of atleast 1 Alphabet and 1 Number and should be between 8 to 20 characters';
    }
    return passwordErrorMessage;
  };

  /**
   * Performing the terms and conditions validation
   * @return error message
   * */
  termsValidator = id => {
    if (this.state[id]) {
      return 'Kindly accept the terms and conditions';
    }
    return '';
  };

  /**
   * onBlur and after submit, calling validation functions from this functions.
   * if any error occured, updating the error in the state.
   * @param id
   * @return error updating in the state
   * */
  checkForErrors = id => {
    const elementId = id;
    const errorElementId = `${elementId}_error`;
    let currentFieldError = '';
    if (elementId === 'email') currentFieldError = this.emailValidations();
    else if (elementId === 'password') currentFieldError = this.passwordValidator();
    else if (elementId === 'remember_me') currentFieldError = this.termsValidator(elementId);
    this.setState({
      [errorElementId]: currentFieldError
    });
  };

  /**
   * on click of new user, sign up, redirecting to the given path
   * @param path
   * */
  reDirectToEmployeeSignUp = (path) => {
    this.props.history.push(path);
  };

  /**
   * on click of close or cross icon in the modal, changing the modal open state
   * @return updating all modal states as false
   * */
  onModalClose = () => {
    this.setState({
      get_otp_modal: false,
      new_password_modal: false,
      set_password_modal: false,
    })
  };

  /**
   * on click of sendotp in the modal, calling send OTP api with validated data
   * @param popup_email
   * @return updating all modal states as false
   * */
  onGetOTP = async (popup_email) => {
    this.setState({otp_email: popup_email});
    const sendingData = {email_id: popup_email};
    return await apiCall('get', sendingData, EMPLOYER_FORGOT_PASSWORD);
  };

  //when otp is valided
  openNewPasswordPopUp = (token) => {
    this.setState({
      token: token,
      new_password_modal: false,
      set_password_modal: true
    })
  };

  /**
   * on click of sign in with google, opening the new window with redirect url
   * @return opening redirect url in new window
   * */
  onSignWithGoogle = () => {
    let y = window.outerHeight / 2 + window.screenY - ( 640 / 2);
    let x = window.outerWidth / 2 + window.screenX - (512 / 2);
    this.windowStatus = window.open(EMPLOYER_LOGIN_GMAIL_REDIRECT_URL, 'name', `width=512,height=600,left=${x},top=${y}`);
  };

  /**
   * on click of sign in with linked in, opening the new window with redirect url
   * @return opening redirect url in new window
   * */
  onSignWithLinkedIn = () => {
    let y = window.outerHeight / 2 + window.screenY - ( 640 / 2);
    let x = window.outerWidth / 2 + window.screenX - (512 / 2);
    this.windowStatus = window.open(EMPLOYER_LOGIN_REDIRECT_URL, 'name', `width=512,height=600,left=${x},top=${y}`);
  };

  componentWillReceiveProps(newProps) {
    if (!newProps.loginData.isLoading && newProps.loginData.tokens) {
      //getting tokens from redux state tree
      const {access_token, refresh_token} = newProps.loginData.tokens;
      //storing tokens in localstorage
      handleLocalStorage("set", "employerToken", access_token);
      handleLocalStorage("set", "employerRefreshToken", refresh_token);
      handleLocalStorage("set", "employerLogin", access_token);
      //redirecting to the dashboard
      this.props.history.push('/employer-dashboard');
    } else this.setState({failed_error: newProps.loginData.message});
  }

  render() {
    const {classes} = this.props;
    return (
      <div className="main">
        <Header/>
        <div className="employer-sign-in">
          <div className="employer-sign-in-content">
            <form className="employer-sign-in-form">
              <div className="employer-sign-in-text mb-40">Sign in for Employer</div>
              <div className="employer-sign-in-email">
                <FormControl
                  className={`form-child`}
                  classes={classes.root}
                  error={this.state.email_error !== ''}
                  name="employer-sign-in-form"
                >
                  <InputLabel htmlFor="email"
                              shrink={true}
                              classes={{
                                root: classes.cssLabel,
                                focused: classes.cssFocused,
                                error: classes.cssError
                              }}
                  >
                    Email
                  </InputLabel>
                  <Input
                    id="email"
                    type="text"
                    onChange={this.onInputChange}
                    value={this.state.email}
                    onBlur={() => this.checkForErrors('email')}
                    required={true}
                    classes={{
                      underline: classes.cssUnderline,
                      focused: classes.cssFocused,
                    }}
                  />
                  <FormHelperText id="email-error" className="field_error">{this.state.email_error}</FormHelperText>
                </FormControl>
              </div>
              <div className="employer-sign-in-password mt-48">
                <FormControl
                  className="form-child"
                  error={this.state.password_error !== "" || this.state.failed_error !== ""}
                >
                  <InputLabel htmlFor="adornment-password"
                              shrink={true}
                              classes={{
                                root: classes.cssLabel,
                                focused: classes.cssFocused,
                                error: classes.cssError
                              }}
                  >
                    Password
                  </InputLabel>
                  <Input
                    id="password"
                    type={this.state.show_password ? 'text' : 'password'}
                    label="Password"
                    onChange={this.onInputChange}
                    value={this.state.password}
                    onBlur={() => this.checkForErrors('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={() => this.setState({show_password: !this.state.show_password})}
                        >
                          {this.state.show_password ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                      </InputAdornment>
                    }
                    classes={{
                      underline: classes.cssUnderline,
                      focused: classes.cssFocused,
                    }}
                  />
                  <div className="password-error">
                    <FormHelperText id="email-error" className="field_error">{this.state.failed_error}</FormHelperText>
                    <FormHelperText id="email-error"
                                    className="field_error">{this.state.password_error}</FormHelperText>
                    <div className="employer-sign-in-forgot-password">
                      <CustomTag
                        text="Forgot Password?"
                        className="forgot-password"
                        onclick={this.changeState}
                        id="get_otp_modal"
                      >
                      </CustomTag>
                    </div>
                  </div>
                </FormControl>
              </div>
              <div className="wrapper mt-40">
                <div className="employer-sign-in-button">
                  <button className="shenzyn-btn filled-primary-button px-32 px-sm-64" id="submit"
                          onClick={this.onFormSubmit}>
                    Sign In
                  </button>
                </div>
                <div className="employee-sign-in-or">
                  <div className="or">or</div>
                </div>
                <div className="employer-sign-in-social-login">
                  <div className="social-buttons">
                    <span className="google-sign-in" onClick={this.onSignWithGoogle}>
                      <div className="rectangle">
                        <CustomIcon icon={googleIcon} iconStyle="Shape"/>
                      </div>
                      <div className="Sign-in-with-Google">Sign in with Google</div>
                    </span>
                    <span className="linkedin-sign-in" onClick={this.onSignWithLinkedIn}>
                      <div className="linkedin-icon">
                        <div className="rectangle">
                          <CustomIcon icon={linkedin} iconStyle="Shape"/>
                        </div>
                      </div>
                      <div className="Sign-in-with">Sign in with Linkedin</div>
                    </span>
                  </div>
                </div>
                <div className="employer-sign-in-new-user">
                  If you are a new user
                  <span className="Sign-Up-here" style={{marginLeft: '4px'}}
                        onClick={() => this.reDirectToEmployeeSignUp('/employer-signup')}>
                    Sign Up here
                  </span>
                </div>
              </div>
            </form>
            <Modal
              open={this.state.get_otp_modal}
              onClose={this.onModalClose}
            >
              <EmployerGetEmailPopUp
                onModalClose={this.onModalClose}
                onGetOTP={this.onGetOTP}
                emailVerificationUrl={EMPLOYER_EMAIL_VERIFICATION}
                otpValidationUrl={EMPLOYER_OTP_VALIDATE}
                openNewPasswordPopUp={this.openNewPasswordPopUp}
              />
            </Modal>
            <Modal
              open={this.state.new_password_modal}
              onClose={this.onModalClose}
            >
              <EmployerTypeEmailPopUp
                onModalClose={this.onModalClose}
                otp_email={this.state.otp_email}
                onGetOTP={this.onGetOTP}
                openNewPasswordPopUp={this.openNewPasswordPopUp}
              />
            </Modal>
            <Modal
              open={this.state.set_password_modal}
              onClose={this.onModalClose}
            >
              <NewPasswordPopUp
                onModalClose={this.onModalClose}
                token={this.state.token}
                reDirectToEmployeeSignUp={this.reDirectToEmployeeSignUp}
              />
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

EmployerSignIn.propTypes = {classes: PropTypes.object.isRequired,};

const mapStateToProps = (state) => isLoggedIn(state);

const mapDispatchToProps = (dispatch) => {
  return {
    makeLoginApiCall: bindActionCreators(employerLoginActions.employerLoginRequest, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EmployerSignIn));
