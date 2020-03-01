//library dependencies
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles, Input, FormControl, InputLabel, FormHelperText} from '@material-ui/core';
import {toast} from 'react-toastify';

//style
import classNames from 'classnames';
import './style.scss';

//utilities
import apiCall from '../../Utilities/apiCall';
import {EMPLOYER_NEW_PASSWORD} from '../../../config/constants';
import validatePassword from '../../Utilities/validatePassword';

//icons
import close from '../../../assets/media/images/close.png';

//customised react toast message
toast.configure({
  "position": "top-center",
  toastClassName: "toast-inner-container",
  bodyClassName: "toast-body-name",
  closeButton: false,
  progressClassName: 'toast-progress-bar'
});
// customised material ui style
const styles = theme => ({
  root: {display: 'flex', flexWrap: 'wrap',},
  margin: {margin: theme.spacing.unit,},
  withoutLabel: {marginTop: theme.spacing.unit * 3,},
  textField: {flexBasis: 200,},
  cssLabel: {color: '#656565 !important', fontSize: '14px', fontFamily: 'Roboto', fontWeight: 400,},
  cssError: {color: '#656565 !important', fontSize: '14px', fontFamily: 'Roboto', fontWeight: 400,},
});

class NewPasswordPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.token,
      new_password: '',
      confirm_new_password: '',
      new_password_error: '',
      confirm_new_password_error: '',
      confirm_new_password_success: '',
      submitting: false
    }
  }

  /**
   * on change in input field of password,confirm password
   * @param e
   */
  onInputChange = e => {
    const {id} = e.target;
    this.setState({
      [id]: e.target.value,
    });
  };
  /**
   * on click of Submit new password button
   * @param e
   * @returns {Promise<void>}
   */
  onFormSubmit = async (e) => {
    e.preventDefault();
    await this.validatePasswords();
    const isFormValid = await this.validateForm();
    if (isFormValid) {
      this.setState({submitting: true})
      const sendingData = {
        new_password: this.state.new_password,
        token: this.state.token
      }
      let responseData = {}
      if (!this.props.changePassword || typeof this.props.changePassword === undefined) {
        responseData = await apiCall('post', sendingData, EMPLOYER_NEW_PASSWORD);
      }
      else {
        responseData = await this.props.changePassword(new_password);
      }
      if (responseData.status) {
        toast("Password changed successfully!", {})
        this.setState({submitting: false})
        this.props.onModalClose();
      }
      else {
        toast("Error occured while changing the password.", {})
      }
    }
    else {
    }
  };
  /**
   * to validate the password fields
   */
  validatePasswords = () => {
    const formIds = ['new_password', 'confirm_new_password'];
    formIds.forEach(formId => {
      this.passwordValidator(formId);
    })
  };
  /**
   * To validate all fields of forms
   * @returns {boolean}
   */
  validateForm = () => {
    const errorIds = ['new_password_error', 'confirm_new_password_error'];
    let isFormValid = true;
    errorIds.forEach(errorId => {
      if (this.state[errorId] != '') {
        isFormValid = false;
      }
    });
    return isFormValid;
  };
  /**
   * To validate the password match with confirm password field
   * @param password_id
   */
  passwordValidator = (password_id) => {
    let passwordErrorMessage = '';
    const passwordIdError = `${password_id}_error`;
    const fieldId = password_id;
    password_id = this.state[password_id];
    if (password_id == '') {
      passwordErrorMessage = 'Password field cannot be left blank';
    }
    else if (fieldId == 'confirm_new_password' && password_id !== this.state.new_password) {
      passwordErrorMessage = 'Entered Password doesn’t match';
    }
    else {
      const isPasswordValid = validatePassword(password_id);
      if (!isPasswordValid) {
        passwordErrorMessage =
          'Password Should Contain At Least One Alphabet And One Digit, And Should Be 8-20 Characters Long';
      }
    }
    this.setState({
      [passwordIdError]: passwordErrorMessage
    })
  };

  render() {
    const {classes} = this.props;
    const isDataEmpty = this.state.new_password == '' || this.state.confirm_new_password == '';
    const {submitting} = this.state;
    return (
      <form className="employer-forgot-password-model px-4 py-12">
        <div className="email-modal-close">
          <img src={close}
               className="close"
               alt="close"
               onClick={this.props.onModalClose}
          />
        </div>
        <div className="Create-New-Password">
          Create New Password
        </div>

        <div className="">
          <div className="forgot-password-password mt-8">
            <FormControl
              className={classNames(classes.margin, classes.textField)}
              error={this.state.new_password_error !== ''}
            >
              <InputLabel
                htmlFor="adornment-password"
                shrink={true}
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                  error: classes.cssError
                }}
              >New Password</InputLabel>
              <Input
                className="form-child"
                id="new_password"
                type="password"
                label="Password"
                onChange={this.onInputChange}
                value={this.state.password}
                onBlur={() => this.passwordValidator('new_password')}
              />
              <div className="password-error-message">
                <FormHelperText id="password-error"
                                className="field_error">{this.state.new_password_error}</FormHelperText>
              </div>
            </FormControl>
          </div>
          <div className="forgot-password-confirm-password mt-8">
            <FormControl
              className={classNames(classes.margin, classes.textField)}
              error={this.state.confirm_new_password_error !== ''}
            >
              <InputLabel
                htmlFor="adornment-password"
                shrink={true}
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                  error: classes.cssError
                }}
              >Confirm New Password</InputLabel>
              <Input
                className="form-child"
                id="confirm_new_password"
                type="password"
                label="Password"
                onChange={this.onInputChange}
                value={this.state.password}
                onBlur={() => this.passwordValidator('confirm_new_password')}
              />
              <div className="password-error-message">
                <FormHelperText id="confirm-password-error"
                                className="field_error">{this.state.confirm_new_password_success == '' ? this.state.confirm_new_password_error : this.state.confirm_new_password_success}</FormHelperText>
              </div>
            </FormControl>
          </div>
        </div>

        <div className="">
          <button
            className="solid_button"
            id="submit_new_Password"
            onClick={this.onFormSubmit}
            disabled={isDataEmpty || submitting}
            style={isDataEmpty ? {'cursor': 'not-allowed'} : submitting ? {'cursor': 'progress'} : null}
          >
            {submitting ? 'Submitting' : 'Submit'}
          </button>
        </div>
        <div className="">

        </div>
      </form>
    )
  }
}

NewPasswordPopUp.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(NewPasswordPopUp);

