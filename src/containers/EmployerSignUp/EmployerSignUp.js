//library dependencies
import React, {Component} from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel
} from '@material-ui/core';
import {Visibility, VisibilityOff} from '@material-ui/icons';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
//style
import './style.scss';
import customisedMaterial from '../../styles/customisedMaterial';
//custom components
import CustomIcon from '../../components/CustomIcon';
import Header from '../../components/Header/Header';
import LoadingIcon from '../../components/LoadingIcon';
//icons
import green_tick from '../../../assets/media/icons/green_tick.svg';
import untick from '../../../assets/media/icons/untick.svg';
import default_untick from '../../../assets/media/icons/default_untick.svg';
//utilities
import validateEmail from '../../Utilities/validateEmail';
import validatePassword from '../../Utilities/validatePassword';
import apiCall from '../../Utilities/apiCall';
import {EMPLOYER_EMAIL_VERIFICATION, EMPLOYER_REGISTRATION} from '../../../config/constants';

// material ui customised styles
const styles = theme => ({
  root: {display: 'flex', flexWrap: 'wrap',},
  margin: {margin: theme.spacing.unit},
  withoutLabel: {marginTop: theme.spacing.unit * 3},
  textField: {flexBasis: 200},
  ...customisedMaterial
});

class EmployerSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      show_password: false,
      terms_accepted: false,
      email_error: '',
      password_error: '',
      terms_accepted_error: '',
      is_email_valid: false,
      show_loading: false,
    };
  }

  /**
   * @function on input form field change, update state with given value and set error as ''
   * @param e
   */
  onInputChange = e => {
    const {id} = e.target;
    this.setState({[id]: e.target.value, [`${id}_error`]: ''});
  };

  /**
   * validate form on submit click
   * @param checkForErrors
   */
  validateFormData = checkForErrors => {
    const elementIds = ['email', 'password', 'terms_accepted'];
    elementIds.forEach(elementId => {
      this.checkForErrors(elementId);
    });
  };

  /**
   * check if any error before submit
   * @return {boolean}
   */
  checkFormValidity = () => {
    const errorIds = ['email_error', 'password_error', 'terms_accepted_error'];
    let isFormValid = true;
    errorIds.forEach(errorId => {
      if (this.state[errorId] !== '') {
        isFormValid = false;
      }
    });
    return isFormValid;
  };

  /**
   * onsubmit click, making api and if valid redirect to success page
   * else through errors
   * @param e
   * @return {Promise.<void>}
   */
  onFormSubmit = async e => {
    e.preventDefault();
    let isFormValid = true;
    await this.validateFormData();
    isFormValid = this.checkFormValidity();
    if (isFormValid === true) {
      this.setLoading(true);
      const receivingData = await this.EmployerSignUpApi();
      this.setLoading(false);
      if (receivingData.status) {
        this.props.history.push('/success-page');
      }
    }
  };

  /**
   * to change state of checkbox and password visibility
   * @param id
   */
  changeState = id => {
    this.setState({
      [id]: !this.state[id],
    }, () => {
      if (id == 'terms_accepted') {
        this.checkForErrors(id);
      }
    });
  };

  /**
   * to validate all the aspect of email
   * @return {string}
   */
  emailValidations = () => {
    const {email} = this.state;
    let emailErrorMessage = '';
    if (email == '') {
      emailErrorMessage = 'Kindly specify your Email Id';
    } else if (!validateEmail(email)) {
      emailErrorMessage = 'Kindly enter a valid Email Id';
    }
    else if (!this.isEmailAvailable()) {
      emailErrorMessage = "Kindly specify your Email Id";
    }
    return emailErrorMessage;
  };

  /**
   * check for password error by calling password checker regular expression
   * @return {string}
   */
  passwordValidator = () => {
    let passwordErrorMessage = '';
    const {password} = this.state;
    if (password == '') {
      passwordErrorMessage = 'Kindly enter the password';
    } else {
      const isPasswordValid = validatePassword(this.state.password);
      if (!isPasswordValid) {
        passwordErrorMessage =
          'Password Should Contain At Least One Alphabet And One Digit, And Should Be 8-20 Characters Long';
      }
    }
    return passwordErrorMessage;
  };

  /**
   * to check if terms is accepted.
   * @param id
   * @return {*}
   */
  termsValidator = id => {
    if (!this.state[id]) {
      return 'Please accept the terms and conditions';
    }
    return '';
  };

  /**
   * check for form errors
   * @param id
   */
  checkForErrors = id => {
    const elementId = id;
    const errorElementId = `${elementId}_error`;
    let currentFieldError = '';
    if (elementId == 'email') {
      currentFieldError = this.emailValidations();
    } else if (elementId == 'password') {
      currentFieldError = this.passwordValidator();
    } else if (elementId == 'terms_accepted') {
      currentFieldError = this.termsValidator(elementId);
    }
    this.setState({
      [errorElementId]: currentFieldError,
    });
  };

  /**
   * check if email is valid
   * @return {Promise.<void>}
   */
  isEmailAvailable = async () => {
    const sendingData = {email_id: this.state.email};
    if (sendingData.email_id) sendingData.email_id = sendingData.email_id.trim()
    const data = await apiCall('get', sendingData, EMPLOYER_EMAIL_VERIFICATION);
    this.setState({
      is_email_valid: data.status,
      email_error: data.status === false ? data.message : '',
    });
    return data.status;
  };

  /**
   * sign up api call
   * @return {Promise.<*>}
   * @constructor
   */
  EmployerSignUpApi = async () => {
    const sendingData = {
      email_id: this.state.email.trim(),
      password: this.state.password
    };
    const responseData = await apiCall('post', sendingData, EMPLOYER_REGISTRATION);
    return responseData;
  };

  /**
   * update loadin loading status
   * @param newState
   */
  setLoading = (newState) => {
    this.setState({show_loading: newState})
  };

  render() {
    const {classes} = this.props;
    const showCorrectTick =
      this.state.email !== '' && this.state.email_error === '' && validateEmail(this.state.email) && this.state.is_email_valid;
    return (
      <div className="employer-sign-in-main">
        <Header/>
        <div className="employer-signup">
          <div className="employer-signup-content">
            <form className="employer-signup-form">
              {this.state.show_loading ? <LoadingIcon/> : null}
              <div className="employer-signup-text">Sign up for Employer</div>
              <div className="employer-signup-email mt-20">
                <FormControl
                  error={this.state.email_error !== ''}
                  name="employer-signup-form"
                  className="form-child"
                >
                  <InputLabel htmlFor="email"
                              shrink={true}
                              classes={{
                                root: classes.cssLabel,
                                focused: classes.cssFocused,
                              }}
                  >
                    Email
                  </InputLabel>
                  <Input
                    id="email"
                    type="text"
                    autoComplete="nope"
                    onChange={this.onInputChange}
                    value={this.state.email}
                    onBlur={() => this.checkForErrors('email')}
                    required={true}
                    endAdornment={
                      showCorrectTick ? (
                        <InputAdornment position="end">
                          <CustomIcon icon={green_tick}/>
                        </InputAdornment>
                      ) : null
                    }
                    classes={{
                      underline: classes.cssUnderline,
                      focused: classes.cssFocused,
                    }}
                  />
                  <FormHelperText id="email-error" className="field_error">{this.state.email_error}</FormHelperText>
                </FormControl>
              </div>
              <div className="employer-signup-password mt-24">
                <FormControl
                  className="form-child"
                  error={this.state.password_error !== ''}
                >
                  <InputLabel htmlFor="password"
                              shrink={true}
                              classes={{
                                root: classes.cssLabel,
                                focused: classes.cssFocused,
                              }}
                  >
                    Password
                  </InputLabel>
                  <Input
                    className="form-child"
                    id="password"
                    type={this.state.show_password ? 'text' : 'password'}
                    onChange={this.onInputChange}
                    value={this.state.password}
                    onBlur={() => this.checkForErrors('password')}
                    autoComplete="new-password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={() => this.changeState('show_password')}
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
                  <div className="password-error-message">
                    <FormHelperText id="email-error"
                                    className="field_error">{this.state.password_error}</FormHelperText>
                  </div>
                </FormControl>
              </div>
              <div className="employer-signup-terms form-child mt-16">
                <FormControl error={this.state.terms_accepted_error !== ''}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="terms_accepted"
                        classes={{checked: 'tick-checkbox'}}
                        defaultChecked={false}
                        icon={
                          this.state.terms_accepted === false && this.state.terms_accepted_error == '' ?
                            <CustomIcon icon={default_untick} iconStyle="untick-checkbox"/> :
                            <CustomIcon icon={untick} iconStyle="untick-checkbox"/>
                        }
                        onClick={() => this.changeState('terms_accepted')}
                      />
                    }
                    label="I agree with terms and conditions of Shenzyn"/>
                  <FormHelperText id="terms-error" style={{marginTop: 0}}
                                  className="terms-error field_error">{this.state.terms_accepted_error}</FormHelperText>
                </FormControl>
              </div>
              <div className="employer-signup-button">
                <button className="solid_button" id="submit" onClick={this.onFormSubmit}>
                  Join Recruiter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

EmployerSignUp.propTypes = {classes: PropTypes.object.isRequired};

export default withStyles(styles)(EmployerSignUp);
