//library dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles,Input, Button, Fab,Grid,FormHelperText,FormControl,InputLabel } from '@material-ui/core';
import { toast } from 'react-toastify';

//style
import './style.scss';

//custom component
import CountryCodePicker from '../CountryCodePicker';
import CustomIcon from '../CustomIcon';
import LoadingIcon from '../LoadingIcon';

//icon
import green_tick from '../../../assets/media/icons/green_tick.svg';
import close from '../../../assets/media/images/close.png';



toast.configure({
  position: 'top-center',
  toastClassName: 'toast-inner-container',
  bodyClassName: 'toast-body-name',
  closeButton: false,
  progressClassName: 'toast-progress-bar',
});

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  cssLabel: {
    color: '#656565 !important',
    fontSize: '14px',
    fontFamily: 'Roboto',
    fontWeight:400,
  },
  cssError: {
    color: '#656565 !important',
    fontSize: '14px',
    fontFamily: 'Roboto',
    fontWeight:400,
  },
  textField: {
    flexBasis: 200,
  },
  button: {
    margin: '11px',
    borderRadius: '20px',
  },
  disableButton: {
    backgroundImage: 'none',
    backgroundColor: '#656565',
  },
  input: {
    display: 'none',
  },
});

const otpInputs = ['input_one', 'input_two', 'input_three', 'input_four'];

class MobileVerificationPopUpEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popup_mobile: props.mobileNumber,
      popup_mobile_error: '',
      popup_code: '',
      popup_code_error: '',
      is_email_valid: false,
      forgot_password_otp: 'validate',
      otp_error: '',
      input_one: '',
      input_two: '',
      input_three: '',
      input_four: '',
      enableMobile: true,
      is_received_otp: false,
      show_loading: false,
      is_resend_enable: false,
      is_get_otp_enable: true,
      countryCode: props.countryCode,
      disableResend: true,
      leftTime: 45,
      otpVerified: false,
      isSubmitEnable:false,
      enableOTP:true,
      isResendClicked:false
    };
    this.otpTimer = null;

    this.getOTP = this.getOTP.bind(this);
    this.enableMobile = this.enableMobile.bind(this);
    this.reSendOTP = this.reSendOTP.bind(this);
    this.validateOtp = this.validateOtp.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.otpReceived) {
      this.setState({
        otpReceived: nextProps.otpReceived,
        is_received_otp: nextProps.otpReceived,
      });
    }

    if (nextProps && nextProps.otpVerified) {
      this.setState(
        {
          otpVerified: nextProps.otpVerified,
          otp_error: this.state.otp_error == ' ' ? ' ' : nextProps.otpVerified,
        },
        () => {
          if (nextProps.otpVerified == true) {
            toast('OTP verified Successfully');
            clearInterval(this.otpTimer);
            this.props.handleModel();
          }
        },
      );
    }
  }

  onInputChange = e => {
    const { name } = e.target;
    this.setState({
      [name]: e.target.value,
    });
    if (name == 'popup_mobile') {
      if(e.target.value.length==10){
        this.setState({enableOTP : true})
      }
      else{
        this.setState({enableOTP:false});
      }
    }
  };

  enableGetOTPButton = () => {
    this.setState({
      is_get_otp_enable:true
    });
  };

  setLoading = newState => {
    this.setState({
      show_loading: newState,
    });
  };

  handlePressKey = e => {
    const keyCode = e.keyCode || e.charCode;
    const { id } = e.target;
    if (keyCode == 8 || (keyCode == 46 && this.state[id] == '')) {
      setTimeout(() => this.setFocusToPrevious(id), 10);
    }
  };

  onOtpInputChange = e => {
    const { id } = e.target;
    let { value } = e.target;
    this.setState(
      {
        [id]: !isNaN(e.target.value) && e.target.value != '' ? e.target.value % 10 : e.target.value,
        otp_error: '',
      },()=>{
        if((this.state.input_four || this.state.input_four=="0") && (this.state.input_one || this.state.input_one=="0") && (this.state.input_two || this.state.input_two=="0") && (this.state.input_three || this.state.input_three=="0")){
          this.setState({isSubmitEnable:true});
        }else {
          this.setState ({isSubmitEnable:false})
        }},
      value != '' ? this.setFocusToInput(id) : null,
    );
  };

  setFocusToInput = previousFocus => {
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

  setFocusToPrevious = currentFocus => {
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

  handleResendButton(newState, timeOut) {
    setTimeout(() => {
      this.setState({
        is_resend_enable: newState,
      });
    }, timeOut);
  }

  reSendOTP() {
    this.setState(
      {
        enableMobile: false,
        disableResend: true,
        otp_error: '',
        input_two: '',
        input_three: '',
        input_four: '',
        input_one: '',
        isSubmitEnable:false,
      },
      () => {
        setTimeout(() => {
          this.setState({
            disableResend: false,
            leftTime: 45,
          });
          clearInterval(this.otpTimer);
        }, 45000);
      },
    );
    this.otpTimer = setInterval(() => {
      this.setState({
        leftTime: this.state.leftTime - 1,
      });
    }, 1000);
    this.props.onGetOTP({
      mobile_no: this.state.popup_mobile,
      country_code: this.state.countryCode,
      otp_state: 'resend',
    });
  }

  validateOtp(e) {
    e.preventDefault();
    const otp = [
      this.state.input_one,
      this.state.input_two,
      this.state.input_three,
      this.state.input_four,
    ];
    if (!this.state.popup_mobile || !this.state.countryCode) {
      this.setState({
        popup_mobile_error: 'Kindly specify mobile number',
      });
    } else if (this.state.popup_mobile.toString().length != 10) {
      this.setState({
        popup_mobile_error: 'Kindly enter a valid mobile number',
      });
    } else if (otp.indexOf('') >= 0 || otp.length < 4) {
      this.setState({
        otp_error: 'Mobile number is not verified, please verify it to proceed ',
      });
    } else {
      this.props.onValidateEmailOTP({
        mobile_no: this.state.popup_mobile,
        country_code: this.state.countryCode,
        otp_number: otp.join(''),
      });
    }
  }

  enableMobile() {
    this.setState({
      enableMobile: true,
      input_two: '',
      input_three: '',
      input_four: '',
      input_one: '',
    });
  }

  getOTP(e) {
    if (!this.state.popup_mobile || !this.state.countryCode) {
      this.setState({
        popup_mobile_error: 'Kindly specify mobile number',
      });
      return;
    }
    if (this.state.popup_mobile.toString().length != 10) {
      this.setState({
        popup_mobile_error: 'Kindly enter a valid mobile number',
      });
      return;
    }
    this.setState({
      popup_mobile_error: '',
    });
    clearInterval(this.otpTimer);
    this.setState(
      {
        enableMobile: false,
        disableResend: true,
        leftTime: 45,
        isResendClicked:true
      },
      () => {
        setTimeout(() => {
          this.setState({
            disableResend: false,
            leftTime: 45,
          });
          clearInterval(this.otpTimer);
        }, 45000);
      },
    );
    this.otpTimer = setInterval(() => {
      this.setState({
        leftTime: this.state.leftTime - 1,
      });
    }, 1000);
    this.props.onGetOTP({
      mobile_no: this.state.popup_mobile,
      country_code: this.state.countryCode,
      otp_state: 'send',
    });
  }

  closeModal=()=>{
    this.setState({isResendClicked:false});
    this.props.handleModel();
  }

  render() {
    const { classes } = this.props;
    const receivedOtp = !this.state.is_received_otp;
    const {
      popup_mobile,
      popup_code,
      enableMobile,
      otp_error,
      countryCode,
      disableResend,
      leftTime,
      otpVerified,
      mobile_number_error,
      popup_mobile_error,
      enableOTP,

    } = this.state;
    return (
      <form className="mobile-sign-in-email-model pb-28">
        <div className="email-modal-close">
          <img src={close} className="close" alt="close" onClick={this.props.handleModel} />
        </div>
        <div className="Forgot-Password">{this.props.headingText}</div>
        <div className="forgot-password-email" style={{ boxSizing: 'borderBox' }}>
          <Grid container spacing={4} alignItems="space-between">
            <Grid container spacing={15} direction="row" justify="center">
              <Grid item xs={2} style={{ marginTop: '9px' }}>
                <CountryCodePicker
                  default={countryCode}
                  disabled={false}
                  onClose={countryCode => {
                    this.setState({ countryCode });
                  }}
                />
              </Grid>
              <Grid item xs={8} className="ml-24" style={{display:'flex'}}>
                <FormControl
                  style={{ width: '72%' }}
                  className={classes.margin}
                  error={popup_mobile_error != ''}
                >
                  <InputLabel
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                      error:classes.cssError
                    }}
                    className="change-label-style"
                    htmlFor="mobile">Mobile</InputLabel>
                  <Input
                    id="mobile"
                    type="number"
                    name="popup_mobile"
                    onChange={this.onInputChange}
                    value={this.state.popup_mobile}
                    onBlur={this.checkForErrors}
                    required={true}
                    disabled={false}
                  />
                  <FormHelperText>{popup_mobile_error}</FormHelperText>
                </FormControl>
                <div style={{width:'124px',marginTop:'8px'}}>
                  <FormControl
                    className={classes.formControl}
                    error={false}
                  >
                    {this.state.isResendClicked ?
                      <Button color="secondary" className={classes.button}
                              onClick={this.state.disableResend == false ? this.reSendOTP : null}
                              style={this.state.disableResend == true ? {'cursor': 'not-allowed', 'color': 'gray',width:'108px',textTransform:'none'} : {width:'108px',textTransform:'none'}}
                      >
                        Resend OTP
                      </Button>
                      :<Button color="secondary" className={classes.button}
                               onClick={enableMobile == true? this.getOTP : null}
                               style={this.state.disableResend == false? {
                                 'cursor': 'not-allowed',
                                 'color': '#6d6868',
                                 textTransform:'none'
                               } : {textTransform:'none'}}
                      >
                        Get OTP
                      </Button>
                    }
                  </FormControl>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <div />
        </div>
        {this.state.show_loading ? <LoadingIcon /> : null}
        {receivedOtp === true ? null : (
          <div className="hide-fields">
            <div className="input-otp">
            <span>
              <Grid container justify="center">
                <Grid item xs={1} style={{ paddingRight: '10px' }}>
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
                  />
                </Grid>
                <Grid item xs={1} style={{ paddingRight: '10px' }}>
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
                  />
                </Grid>
                <Grid item xs={1} style={{ paddingRight: '10px' }}>
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
                  />
                </Grid>
                <Grid item xs={1} style={{ paddingRight: '10px' }}>
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
                  />
                </Grid>
                {otpVerified == true ? (
                  <Grid item xs={1} style={{ paddingRight: '10px' }}>
                    <CustomIcon icon={green_tick} />
                  </Grid>
                ) : null}
              </Grid>
            </span>
              <div>
                <FormControl error={otp_error != ''}>
                  <FormHelperText style={{ textAlign: 'center' }} id="pop-email-error">
                    {otp_error}
                  </FormHelperText>
                </FormControl>
              </div>
            </div>
            <div className="did-not-received mt-16">
              <div className="You-will-receive-a-c">
                If you do not receive your OTP in {leftTime} sec, click on Resend OTP
              </div>
            </div>
            <div className="">
              <Fab
                variant="extended"
                size="medium"
                className={this.state.isSubmitEnable == true && this.state.disableResend == true ? "submit-button" : "submit-button disable-button"}
                onClick={this.validateOtp}
              >
                Submit
              </Fab>
            </div>
          </div>
        )}
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    popup_mobile: state.popup_mobile,
    popup_mobile_error: state.popup_mobile_error,
    is_email_valid: state.is_email_valid,
  };
}

MobileVerificationPopUpEdit.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MobileVerificationPopUpEdit);
