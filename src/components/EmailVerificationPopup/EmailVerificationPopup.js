//library dependencies
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles, InputLabel, FormControl, FormHelperText, Button, Grid, Input} from '@material-ui/core';
import {toast} from 'react-toastify';

//style
import '../EmailVerification/style.scss';
import customisedMaterial from '../../styles/customisedMaterial';

//icon
import close from '../../../assets/media/images/close.png';

//custom component
import validateEmail from '../../Utilities/validateEmail';
import LoadingIcon from '../../components/LoadingIcon';

//utilities
import {handleLocalStorage, apiCall} from '../../Utilities';

//customise react toast message
toast.configure({
  "position": "top-center",
  toastClassName: "toast-inner-container",
  bodyClassName: "toast-body-name",
  closeButton: false,
  progressClassName: 'toast-progress-bar'
});

//customised material ui style
const styles = theme => ({
  root: {display: 'flex', flexWrap: 'wrap',},
  margin: {margin: theme.spacing.unit,},
  withoutLabel: {marginTop: theme.spacing.unit * 3,},
  textField: {flexBasis: 200,},
  button: {margin: '11px', borderRadius: '20px'},
  cssLabel: {color: '#656565 !important', fontSize: '14px', fontWeight: '400', fontFamily: 'Roboto',},
  cssError: {color: '#656565 !important', fontSize: '14px', fontWeight: '400', fontFamily: 'Roboto',},
  input: {display: 'none',},
  ...customisedMaterial
});

class EmailVerificationPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popup_email: (props.email ? props.email : ''),
      popup_email_error: '',
      is_email_valid: false,
      forgot_password_otp: 'validate',
      otp_error: '',
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
      isOTPEnable: false,
      isResendClicked: false,
    };
    this.otpTimer = null;
  };

  /**
   * on Focus the field, removing error
   * @param e
   */
  removeErrorFocus = (e) => {
    this.setParticularField(e.target.name, '');
  };
  /**
   * on change in input fields,validating and updating state
   * @param e
   */
  onInputChange = e => {
    const {id} = e.target;
    if (validateEmail(e.target.value)) {
      if (!this.props.isApicall) this.isEmailAvailable(e.target.value);
      this.setState({[id]: e.target.value,});
    }
    else this.setState({[id]: e.target.value, is_get_otp_enable: false});
  };
  /**
   * @function, used to update the error of particular field
   * @param name
   * @param value
   */
  setParticularField = (name, value) => {
    const errorName = name + '_error';
    this.setState({[errorName]: value,})
  };
  /**
   * @function,used to update the state while Loading data
   * @param newState
   */
  setLoading = (newState) => {
    this.setState({show_loading: newState})
  };
  /**
   * on change of key value,validating some key to focus previous otp field
   * @param e
   */
  handlePressKey = (e) => {
    const keyCode = e.keyCode || e.charCode;
    const {id} = e.target;
    if (keyCode == 8 || keyCode == 46 && this.state[id] == "") setTimeout(() => this.setFocusToPrevious(id), 10);
  };
  /**
   * on change in input field of otp ,validating and movimg the focus to next field
   * @param e
   */
  onOtpInputChange = e => {
    const {id} = e.target;
    this.setState({
        [id]: !isNaN(e.target.value) && e.target.value != '' ? (e.target.value) % 10 : e.target.value,
      }, () => {
        if ((this.state.input_four || this.state.input_four == "0") && (this.state.input_one || this.state.input_one == "0") && (this.state.input_two || this.state.input_two == "0") && (this.state.input_three || this.state.input_three == "0")) {
          this.setState({isSubmitEnable: true, otp_error: ''});
        } else this.setState({isSubmitEnable: false, otp_error: ''});
      },
      e.target.value != "" ? this.setFocusToInput(id) : null);
  };
  /**
   * @function, used to update the focus on next field of otp
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
   * @function, used to update the focus on previous field of otp
   * @param previousFocus
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
  }
  /**on click of get otp button
   * @function, used to update the focus on next field of otp
   * @param previousFocus
   */
  onGetEmailOTP = async popup_email => {
    const sendingData = {
      email_id: popup_email,
    };
    const header = {'authorization': handleLocalStorage("get", "employerLogin"), 'content-Type': 'application/json',};
    const data = await apiCall('get', sendingData, this.props.sendOtpUrl, header);
    return data;
  };

  /**
   * after click on otp button
   * @param e
   * @returns {Promise<void>}
   */
  getOTP = async (e) => {
    e.preventDefault();
    await this.isEmailAvailable(this.state.popup_email);
    this.emailValidations();
    if (this.state.popup_email_error === '' && this.state.popup_email !== "") {
      try {
        this.setState({isResendClicked: true});
        this.setLoading(true);
        const data = await this.onGetEmailOTP(this.state.popup_email);
        this.setLoading(false);
        this.setState({
          is_received_otp: data.status,
          is_get_otp_enable: !data.status
        });
        if (!data.status) this.setState({popup_email_error: data.message});
      }
      catch (exc) {
        this.setLoading(false);
      }
      this.handleResendButton(true, 45000);
    }
  };

  // to return error incase of email availability
  returnEmailError = status => (status === false ? 'Email Id already exists in the system' : '');

  // isValidity check as it depends upon conditon
  returnErrorStatus = status => status;
  /**
   * To validate email
   * @param email
   * @returns {Promise<*>}
   */
  isEmailAvailable = async (email) => {
    const sendingData = {
      email_id: email
    };
    let emailCheckerUrl = this.props.emailAvailbleChecker ? this.props.emailAvailbleChecker : this.props.emailVerificationUrl ? this.props.emailVerificationUrl : '';
    const data = await apiCall('get', sendingData, emailCheckerUrl);
    this.setState({
      is_get_otp_enable: this.returnErrorStatus(data.status),
      popup_email_error: await this.returnEmailError(data.status),
    });
    return data.status;
  };

  /**
   * on click of resend button
   * @param newState
   * @param timeOut
   */
  handleResendButton(newState, timeOut) {
    this.setState({
        popup_email_error: '',
        input_two: '',
        input_three: '',
        input_four: '',
        input_one: '',
        isSubmitEnable: false,
        otp_error: ''
      });
    this.setState(() => {
        setTimeout(() => {
          this.setState({is_resend_enable: newState, leftTime: 45,});
          clearInterval(this.otpTimer);
        }, timeOut);
      },
    );
    this.otpTimer = setInterval(() => {
      this.setState({leftTime: this.state.leftTime - 1,});
    }, 1000);
  };

  /**
   * on click of resend otp button
   * @returns {Promise<void>}
   */
  reSendOTP = async () => {
    this.setLoading(true);
    this.handleResendButton(false, 0);
    await this.onGetEmailOTP(this.state.popup_email);
    this.setLoading(false);
    this.handleResendButton(true, 45000)
  };

  /**
   * To validate email in all aspects
   * @returns {boolean}
   */
  emailValidations = () => {
    const {popup_email} = this.state;

    let emailErrorMessage = '';
    if (popup_email === '') {
      emailErrorMessage = 'Kindly specify your Email Id';
      this.setState({
        popup_email_error: emailErrorMessage,
        isOTPEnable: true
      })
    } else if (!validateEmail(popup_email)) {
      emailErrorMessage = 'Kindly enter a valid Email Id';
      this.setState({
        popup_email_error: emailErrorMessage,
        isOTPEnable: true,
      })
    } else {
      if (!this.props.isApicall) {
        this.isEmailAvailable(popup_email);
      }
      this.setState({
        popup_email_error: emailErrorMessage,
        isOTPEnable: true
      });
    }
    ;

    this.setParticularField('popup_email', emailErrorMessage);
    return emailErrorMessage ? true : false
  };
  /**
   * To validate the email otp from an api
   * @param email
   * @param otp
   * @returns {Promise<*>}
   */
  onValidateEmailOTP = async (email, otp) => {
    const sendingData = {email_id: email, otp,};
    const header = {'authorization': handleLocalStorage('get', 'employerLogin'), 'Content-Type': 'application/json',};
    const responseData = await apiCall('get', sendingData, this.props.submitOtpUrl, header);
    if (responseData.status === false) {
      return responseData;
    }
    this.setState({popup_email: email});
    this.props.emailVerificationStatus(responseData.status);
    this.props.handleModel();
    return responseData;
  };
  /**
   * on click of validate otp button
   * @param e
   * @returns {Promise<void>}
   */
  validateOtp = async (e) => {
    e.preventDefault();
    const otp = this.state.input_one + '' + this.state.input_two + this.state.input_three + this.state.input_four;
    if (otp.length === 0) {
      this.setState({
        otp_error: 'Kindly specify OTP'
      })
    }
    else {
      const responseData = await this.onValidateEmailOTP(this.state.popup_email, otp);
      if (responseData.status === false) {
        this.setState({
          otp_error: responseData.message
        })
      }
      if (responseData.status) {
        toast(`${responseData.message}`, {});
      }
    }
  };
  /**
   * on click of close icon in modal
   */
  closeModal = () => {
    this.setState({isResendClicked: false});
    this.props.handleModel();
  };

  componentWillMount() {
    this.setState({popup_email: this.props.email})
  }

  render() {
    const {classes} = this.props;
    const receivedOtp = !this.state.is_received_otp || this.state.popup_email_error !=="";
    return (
      <form className="employer-sign-in-email-model">
        <div className="email-modal-close pr-0">
          <img src={close}
               className="close"
               alt="close"
               onClick={this.closeModal}
          />
        </div>
        <div className="Forgot-Password">
          {this.props.hasOwnProperty('headingText') ? this.props.headingText : null}
        </div>
        <div className="forgot-password-email pl-24 mb-8 mt-24">
          <div>
            <FormControl
              className={classes.formControl}
              error={this.state.popup_email_error !== ''}
              name="employer-sign-in-form"
            >
              <InputLabel htmlFor="popup_email"
                          shrink={true}
                          className="change-label-style"
                          classes={{root: classes.cssLabel, focused: classes.cssFocused, error: classes.cssError,}}>
                Email
              </InputLabel>
              <Input
                className="form-child"
                id="popup_email"
                name="popup_email"
                type="text"
                value={this.state.popup_email}
                onChange={this.onInputChange}
                onBlur={this.emailValidations}
                onFocus={this.removeErrorFocus}
                disabled={!receivedOtp || this.props.isEmailVerified}
                classes={{underline: classes.cssUnderline, focused: classes.cssFocused,}}
              />
              <FormHelperText id="pop-email-error">{this.state.popup_email_error}</FormHelperText>
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
                          onClick={this.state.is_get_otp_enable === true || this.props.isEmailVerified ? this.getOTP : null}
                          style={this.state.is_get_otp_enable === false && !this.props.isEmailVerified ? {
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
        {this.state.show_loading ? <LoadingIcon/> : null}
        {
          receivedOtp === true ? null :
            <div className="hide-fields">
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
                        classes={{underline: classes.cssUnderline, focused: classes.cssFocused,}}
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
                        classes={{
                          underline: classes.cssUnderline,
                          focused: classes.cssFocused,
                        }}
                      />
                    </Grid>
                    <Grid item xs={2} style={{paddingRight: '10px'}}>
                      <Input
                        onChange={this.onOtpInputChange}
                        id="input_three"
                        type="number"
                        value={this.state.input_three}
                        readOnly={receivedOtp}
                        inputRef={ref => {
                          this.input_three = ref;
                        }}
                        disabled={receivedOtp}
                        onKeyDown={this.handlePressKey}

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
                        classes={{underline: classes.cssUnderline, focused: classes.cssFocused,}}
                      />
                    </Grid>
                  </Grid>
                </div>
                <div>
                  <FormControl
                    error={this.state.otp_error !== ""}
                  >
                    <FormHelperText style={{"textAlign": "center"}}
                                    id="pop-email-error">{this.state.otp_error}</FormHelperText>
                  </FormControl>
                </div>
              </div>

              <div className="did-not-received mt-16">
                <div className="You-will-receive-a-c">
                  If you do not receive your OTP in {this.state.leftTime} sec, click on Resend OTP
                </div>
              </div>
              <div className="">
                <button
                  className={this.state.isSubmitEnable === true ? "solid_button" : "solid_button disable-button"}
                  id="send"
                  onClick={this.validateOtp}
                >
                  Submit
                </button>
              </div>
            </div>
        }
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    popup_email: state.popup_email,
    popup_email_error: state.popup_email_error,
    is_email_valid: state.is_email_valid
  }
}

EmailVerificationPopup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmailVerificationPopup);
