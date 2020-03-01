//library dependency
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Modal,
  withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
//styles
import customisedMaterial from '../../styles/customisedMaterial';
import './style.scss';
//custom components
import CustomIcon from '../../components/CustomIcon';
import Header from '../../components/Header/Header';
import CustomTag from '../../components/CustomTag';
import EmployerGetEmailPopUp from '../../components/EmployerGetEmailPopUp';
import NewPasswordPopUp from '../../components/NewPasswordPopUp';
//icons
import untick from '../../../assets/media/icons/untick.svg';
import close from '../../../assets/media/images/close.png';
//utilities
import {apiCall, handleLocalStorage, validateEmail, validatePassword} from '../../Utilities';
import {
  EMPLOYEE_FORGOT_PASSWORD,
  EMPLOYEE_NEW_PASSWORD,
  EMPLOYEE_OTP_VALIDATE,
  JOBSEEKER_EMAIL_VERIFICATION
} from '../../../config/constants';
import * as loginActions from './actions';
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

class EmployeeSignIn extends Component {
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
      modalOpen: false
    };
  }

  /**
   * on change of input fields(username or password), updating the state variables
   * @param e
   */
  onInputChange = e => {
    const {id} = e.target;
    this.setState({
      [id]: e.target.value,
      [`${id}_error`]: '',
      failed_error: '',
    });
  };

  // on submit click validating form fields(username or password).
  validateFormData = () => {
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

  componentWillMount() {
    // check whether user already logged in or not
    // if logged in, redirect to job application status page
    if (handleLocalStorage('get', 'employeeLogin')) {
      this.props.history.push('/job-application-status');
    }
  }

  /**
   * on login form submit, checking validation, email validity. After valid email calling login api
   * @param e
   * */
  onFormSubmit = async e => {
    e.preventDefault();
    let isFormValid = true;
    await this.validateFormData();
    isFormValid = this.checkFormValidity();
    if (isFormValid === true) {
      await this.checkLogin();
    }
  };

  /**
   * to change state of checkbox and password visibility
   * @param id
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
    if (email === '') {
      emailErrorMessage = 'Kindly specify your Email Id';
    }
    else if (!validateEmail(email)) {
      emailErrorMessage = 'Kindly Enter a valid Email Id';
    }
    return emailErrorMessage;
  };

  /**
   * Performing the password validations
   * @return error message
   * */
  passwordValidator = () => {
    let passwordErrorMessage = '';
    const {password} = this.state;
    if (password === '') {
      passwordErrorMessage = 'Kindly enter the password';
    }
    else if (validatePassword(this.state.password) === false) {
      passwordErrorMessage =
        'Password should be combination of atleast 1 Alphabet and 1 Number and should be between 8 to 20 characters';
    }
    return passwordErrorMessage;
  };

  /**
   * Performing the terms validations
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
   *
   * @param id
   * @return error updating in the state
   * */
  checkForErrors = id => {
    const elementId = id;
    const errorElementId = `${elementId}_error`;
    let currentFieldError = '';
    if (elementId === 'email') {
      currentFieldError = this.emailValidations();
    }
    else if (elementId === 'password') {
      currentFieldError = this.passwordValidator();
    }
    else if (elementId === 'remember_me') {
      currentFieldError = this.termsValidator(elementId);
    }
    this.setState({[errorElementId]: currentFieldError,});
    return !!currentFieldError
  };

  /**
   * on click of new user, sign up, redirecting to the given path
   * */
  reDirectToEmployeeSignUp = () => {
    this.setState({modalOpen: true});
  };

  /**
   * on click of close or cross icon in the modal, changing the all modal open state to false
   * */
  onModalClose = () => {
    this.setState({
      get_otp_modal: false,
      new_password_modal: false,
      set_password_modal: false,
      modalOpen: false
    })
  };

  /**
   * redirecting to the signup page with experience type as professional, when clicks on professional button in the modal
   */
  clickProfessional = () => {
    this.props.setIsJobSeekerSelectedTab();
    this.props.history.push({
      pathname: '/jobseeker-signup',
      state: {experienceType: 'professional'},
    });
  };

  /**
   * redirecting to the signup page with experience type as fresher, when clicks on fresher button in the modal
   */
  clickFresher = () => {
    this.props.setIsJobSeekerSelectedTab();
    this.props.history.push({
      pathname: '/jobseeker-signup',
      state: {experienceType: 'fresher'},
    });
  };

  /**
   * updating the component state variable with variable name and value of the variable
   * @param name
   * @param value
   */
  setParticularField = (name, value) => {
    const errorName = name + '_error';
    this.setState({[errorName]: value,})
  };

  /**
   * updating the error as '', when user focus the input form field
   * @param e
   */
  removeErrorFocus = (e) => {
    this.setParticularField(e.target.name, '');
  };

  /**
   * on click of sendotp in the modal, calling send OTP api with validated data
   * @param popup_email
   * @return updating all modal states as false
   * */
  onGetOTP = async (popup_email) => {
    this.setState({otp_email: popup_email,});
    const sendingData = {email_id: popup_email};
    return await apiCall('get', sendingData, EMPLOYEE_FORGOT_PASSWORD);
  };

  openNewPasswordPopUp = (token) => {
    this.setState({token: token, new_password_modal: false, set_password_modal: true,})
  };

  /**
   * updating the modal open status
   * @param name
   */
  handleModel = (name) => {
    this.setState({[name]: !this.state[name],})
  };

  /**
   * calling new password change api
   * @param newPassword
   * @return {Promise.<*>}
   */
  changePassword = async (newPassword) => {
    const sendingData = {new_password: newPassword ? newPassword.value : '', token: this.state.token};
    return await apiCall('post', sendingData, EMPLOYEE_NEW_PASSWORD, null);
  };

  componentWillReceiveProps(newProps) {
    if (!newProps.loginData.isLoading && newProps.loginData.tokens) {
      //getting tokens from redux state tree
      const {access_token, refresh_token} = newProps.loginData.tokens;
      //storing tokens in localstorage
      handleLocalStorage("set", "employeeToken", access_token);
      handleLocalStorage("set", "employeeRefreshToken", refresh_token);
      handleLocalStorage("set", "employeeLogin", access_token);
      handleLocalStorage("set", "employeeLogin", refresh_token);
      //redirecting to the dashboard
      this.props.history.push('/job-application-status');
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
              <div className="employer-sign-in-text mb-40">Join to Empower</div>
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
                    name="email"
                    onChange={this.onInputChange}
                    value={this.state.email}
                    onBlur={() => this.checkForErrors('email')}
                    required={true}
                    onFocus={this.removeErrorFocus}
                    classes={{
                      underline: classes.cssUnderline,
                      focused: classes.cssFocused,
                    }}
                  />
                  <FormHelperText className="field_error">{this.state.email_error}</FormHelperText>
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
                    name="adornment-password"
                    type={this.state.show_password ? 'text' : 'password'}
                    label="Password"
                    onChange={this.onInputChange}
                    value={this.state.password}
                    onFocus={this.removeErrorFocus}
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
                      />
                    </div>
                  </div>
                </FormControl>
              </div>
              <div className="employer-sign-in-terms form-child" style={{visibility: 'hidden'}}>
                <FormControl error={this.state.remember_me_error !== ''}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="remember_me"
                        classes={{checked: 'tick-checkbox'}}
                        defaultChecked={true}
                        icon={<CustomIcon icon={untick} iconStyle="untick-checkbox"/>}
                        onClick={() => this.changeState('remember_me')}
                      />
                    }
                    label="Remember Me"
                  />
                  <FormHelperText id="email-error"
                                  className="field_error">{this.state.remember_me_error}</FormHelperText>
                </FormControl>
              </div>
              <div className="wrapper">
                <div className="employer-sign-in-button">
                  <button className="solid_button" id="submit" onClick={this.onFormSubmit}>
                    Sign In
                  </button>
                </div>
                <div className="employer-sign-in-new-user">
                  Not yet at Shenzyn?
                  <span className="Sign-Up-here" style={{marginLeft: '4px'}}
                        onClick={() => this.reDirectToEmployeeSignUp('/')}>
                    Join Now
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
                emailVerificationUrl={JOBSEEKER_EMAIL_VERIFICATION}
                otpValidationUrl={EMPLOYEE_OTP_VALIDATE}
                openNewPasswordPopUp={this.openNewPasswordPopUp}
              />
            </Modal>

            <Modal open={this.state.set_password_modal}>
              <NewPasswordPopUp
                onModalClose={this.onModalClose}
                token={this.state.token}
                newPasswordUrl={EMPLOYEE_NEW_PASSWORD}
                reDirectToEmployeeSignUp={this.reDirectToEmployeeSignUp}
                changePassword={this.changePassword}
              />
            </Modal>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.modalOpen}
              onClose={this.onModalClose}
            >
              <div className="signup-dialog-wrapper">
                <div className="shenzyn-dialog-box shenzyn-emp-type-dialog">
                  <div className="header">
                    <div className="close-icon" onClick={this.onModalClose}>
                      <CustomIcon icon={close}/>
                    </div>
                    <div className="title-wrapper shenzyn-title-wrapper">
                      <div className="title font-size-24 font-size-500 mb-12"
                           style={{fontFamily: 'Roboto', fontWeight: '500', fontSize: '24px', marginTop: '12px'}}>
                        {"Sign up with Shenzyn"}
                      </div>
                    </div>
                  </div>
                  <div className="footer mt-32 mx-40">
                    <div className="action-btn-wrapper">
                      <div className="item  mb-28">
                        <button className="filled-primary-button shenzyn-btn px-24 px-sm-48 mb-12"
                                onClick={this.clickFresher}>
                          I'm a Fresher
                        </button>
                        <div className="hint">
                          If you just graduated or haven’t worked after graduation, sign up as a fresher
                        </div>
                      </div>
                      <div className="item  mb-28">
                        <button className="filled-primary-button shenzyn-btn px-16 px-sm-32 mb-12"
                                onClick={this.clickProfessional}>
                          I'm an Experienced
                        </button>
                        <div className="hint">
                          If you worked at least for a month, <br/> sign up as an experienced
                        </div>
                      </div>
                    </div>
                    <div className="action-btn-wrapper">

                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

EmployeeSignIn.propTypes = {classes: PropTypes.object.isRequired,};

const mapStateToProps = (state) => isLoggedIn(state);

const mapDispatchToProps = (dispatch) => {
  return {makeLoginApiCall: bindActionCreators(loginActions.loginRequest, dispatch)}
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EmployeeSignIn));
