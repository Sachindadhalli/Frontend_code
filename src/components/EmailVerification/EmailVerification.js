//library dependencies
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles, InputLabel, FormControl, FormHelperText, Button, Grid, Input} from '@material-ui/core';

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
import {EMPLOYER_EMAIL_VERIFICATION} from '../../../config/constants';

/**
 * used to overrides material ui components theme style
 * @param theme
 */
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

class EmailVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popup_email: '', popup_email_error: '', is_email_valid: false, forgot_password_otp: 'validate', otp_error: '',
      input_one: '', input_two: '', input_three: '', input_four: '', is_received_otp: false, show_loading: false,
      is_resend_enable: false, is_get_otp_enable: false, isSubmitEnable: false, leftTime: 45, isOTPEnable: false,
      isResendClicked: false,
    };
    this.otpTimer = null;
  }

  /**
   * remove error for specified field by event target name
   * @param e
   */
  removeErrorFocus = (e) => {
    this.setParticularField(e.target.name, '');
  };

  /**
   * on input change, update state variable data with target name and target value
   * @param e
   */
  onInputChange = e => {
    const {id} = e.target;
    if (validateEmail(e.target.value)) {
      if (!this.props.isApicall) this.isEmailAvailable(e.target.value);
      this.setState({[id]: e.target.value,});
    } else this.setState({[id]: e.target.value, is_get_otp_enable: false});

  };

  /**
   * set error for defined field
   * name defines filed name and value defines error text
   * @param name
   * @param value
   */
  setParticularField = (name, value) => {
    const errorName = name + '_error';
    this.setState({
      [errorName]: value,
    })
  };

  /**
   * set loading state value
   * @param newState
   */
  setLoading = (newState) => {
    this.setState({
      show_loading: newState
    })
  };

  /**
   * handle key press and set focus on id
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
   * on otp change set value for defined otp input field in state variable
   * @param e
   */
  onOtpInputChange = e => {
    const {id} = e.target;
    this.setState({
        [id]: !isNaN(e.target.value) && e.target.value !== '' ? (e.target.value) % 10 : e.target.value,
      }, () => {
        if ((this.state.input_four || this.state.input_four === "0") && (this.state.input_one || this.state.input_one === "0") && (this.state.input_two || this.state.input_two === "0") && (this.state.input_three || this.state.input_three === "0")) {
          this.setState({isSubmitEnable: true, otp_error: ''});
        } else {
          this.setState({isSubmitEnable: false, otp_error: ''})
        }
      },
      e.target.value !== "" ? this.setFocusToInput(id) : null);
  };

  /**
   * call set focus on input fields defined by previuos focus field
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
   * call set focus on input fields defined by current focus field
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
   * after clicking on get otp validating email field and sending details to parent component through props for api calling
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
        const data = await this.props.onGetEmailOTP(this.state.popup_email);
        this.setLoading(false);
        this.setState({
          is_received_otp: data.status,
          is_get_otp_enable: !data.status
        });
        if (!data.status) {
          this.setState({popup_email_error: data.message})
        }
      }
      catch (exc) {
        this.setLoading(false);
      }
      this.handleResendButton(true, 45000);
    }
    else {
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
    let emailCheckerUrl = this.props.emailAvailbleChecker ? this.props.emailAvailbleChecker : EMPLOYER_EMAIL_VERIFICATION;
    const data = await apiCall('get', sendingData, emailCheckerUrl);
    this.setState({
      is_get_otp_enable: this.props.returnErrorStatus(data.status),
      popup_email_error: await this.props.returnEmailError(data.status),
    });
    return data.status;

  };

  /**
   * after clicking resend button button get disable for 45 sec, after 45 sec it is enabling button
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
          this.setState({
            is_resend_enable: newState,
            leftTime: 45,
          });
          clearInterval(this.otpTimer);
        }, timeOut);
      },
    );
    this.otpTimer = setInterval(() => {
      this.setState({
        leftTime: this.state.leftTime - 1,
      });
    }, 1000);
  }

  /**
   * this will call on resend otp and send props to parent component to call get otp api
   * and disable otp button get excecuted
   * @returns {Promise<void>}
   */
  reSendOTP = async () => {
    this.setLoading(true);
    this.handleResendButton(false, 0);
    await this.props.onGetEmailOTP(this.state.popup_email);
    this.setLoading(false);
    this.handleResendButton(true, 45000)
  };

  /**
   * this is email  alidation field used to validate email is valid or not and set error in state variable
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
      })
    }
    this.setParticularField('popup_email', emailErrorMessage);
    return !!emailErrorMessage
  };

  /**
   * this function validate otp by sharing with parent componet
   * parent component call validate otp api and transfer status to perform another function
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
      const responseData = await this.props.onValidateEmailOTP(this.state.popup_email, otp);
      if (responseData.status === false) {
        this.setState({
          otp_error: responseData.message
        })
      }
    }
  };

  /**
   * this is used to closed email varification model
   */
  closeModal = () => {
    this.setState({isResendClicked: false});
    this.props.handleModel();
  };

  render() {
    const {classes} = this.props;
    const receivedOtp = !this.state.is_received_otp || this.state.popup_email_error !== "";
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
                          classes={{
                            root: classes.cssLabel,
                            focused: classes.cssFocused,
                            error: classes.cssError,
                          }}
              >Email</InputLabel>
              <Input
                className="form-child"
                id="popup_email"
                name="popup_email"
                type="text"
                value={this.state.id}
                onChange={this.onInputChange}
                onBlur={this.emailValidations}
                onFocus={this.removeErrorFocus}
                disabled={!receivedOtp}
                classes={{
                  underline: classes.cssUnderline,
                  focused: classes.cssFocused,
                }}
              />
              <FormHelperText id="pop-email-error"
                              className="field_error">{this.state.popup_email_error}</FormHelperText>
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
                        classes={{
                          underline: classes.cssUnderline,
                          focused: classes.cssFocused,
                        }}
                      />
                    </Grid>
                    <Grid item xs={2} style={{paddingRight: '10px'}}>
                      <Input
                        onChange={this.onOtpInputChange}
                        id="input_two"
                        type="number"
                        value={this.state.input_two}
                        readOnly={receivedOtp}
                        className="otp-input-value"
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
                        className="otp-input-value"
                        inputRef={ref => {
                          this.input_three = ref;
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
                        id="input_four"
                        type="number"
                        value={this.state.input_four}
                        readOnly={receivedOtp}
                        className="otp-input-value"
                        inputRef={ref => {
                          this.input_four = ref;
                        }}
                        disabled={receivedOtp}
                        onKeyDown={this.handlePressKey}
                        classes={{
                          underline: classes.cssUnderline,
                          focused: classes.cssFocused,
                        }}
                      />
                    </Grid>
                  </Grid>
                </div>
                <div>
                  <FormControl
                    error={this.state.otp_error !== ""}
                  >
                    <FormHelperText style={{"textAlign": "center"}} id="pop-email-error"
                                    className="field_error">{this.state.otp_error}</FormHelperText>
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


EmailVerification.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmailVerification);
