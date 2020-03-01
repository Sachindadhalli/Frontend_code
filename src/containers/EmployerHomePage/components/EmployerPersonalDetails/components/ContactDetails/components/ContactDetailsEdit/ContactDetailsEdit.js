//library dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles,InputLabel,Input,FormControl,FormHelperText,Grid,InputAdornment,Modal,IconButton } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//style
import './style.scss';


//icon
import green_tick from '../../../../../../../../../assets/media/icons/green_tick.svg';

//custom component
import CustomIcon from '../../../../../../../../components/CustomIcon';
import EmailVerification from '../../../../../../../../components/EmailVerification';
import MobileVerification from '../../../../../../../../components/MobileVerification';
import CustomTag from '../../../../../../../../components/CustomTag';
import CountryCodeDropdown from '../../../../../../../../components/SingleSelectDropdownWrapper/components/CountryCodeDropdown'

//utilities
import { handleLocalStorage,urlValidation,validateEmail,apiCall } from '../../../../../../../../Utilities';
import {
  EMPLOYER_UPDATE_CONTACT_DETAILS,
  EMPLOYER_EMAIL_VERIFICATION,
  EMPLOYER_HOMEPAGE_EMAIL_VERIFICATION_GET_OTP,
  EMPLOYER_HOMEPAGE_EMAIL_VERIFICATION_VERIFY_OTP,
  EMPLOYER_HOMEPAGE_MOBILE_VERIFICATION_VERIFY_OTP,
  EMPLOYER_HOMEPAGE_MOBILE_VERIFICATION_GET_OTP,
  CHECK_SECONDATY_EMAIL
} from '../../../../../../../../../config/constants';
import * as actions from '../../../../../../../../actions/homePageEmp';


//customised material ui style
const styles = theme => ({
  root: { display: 'flex',  flexWrap: 'wrap',flexGrow: 1, },
  paper: { padding: theme.spacing.unit * 2, textAlign: 'center', color: theme.palette.text.secondary, },
  margin: { margin: theme.spacing.unit, },
  withoutLabel: { marginTop: theme.spacing.unit * 3, },
  textField: { flexBasis: 200, },
  formControl: { margin: theme.spacing.unit,  minWidth: 120, },
  selectEmpty: { marginTop: theme.spacing.unit * 2, },
  cssLabel: { color: '#656565 !important', fontSize: '14px', fontFamily: 'Roboto', fontWeight:400,},
  cssError: { color: '#656565 !important', fontSize: '14px', fontFamily: 'Roboto', fontWeight:400, },
});

class ContactDetailsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.contactDetails,
      business_email_error: '',
      secondary_email_error: '',
      number_error: '',
      code_error: '',
      facebook_url_error: '',
      linkedin_url_error: '',
      email_model: false,
      mobile_model: false,
    };
  }

  /**
   * To reset the errors
   */
  resetErrors = () => {
    this.setState({
      business_email_error: '',
      secondary_email_error: '',
      number_error: '',
      code_error: '',
      facebook_url_error: '',
      linkedin_url_error: '',
    });
  };

  /**
   * on click discard changes
   * @param e
   */
  discardChanges = e => {
    this.resetErrors();
    this.props.onclick();
  };

  /**
   * On click save button,validating,calling an api
   * @returns {Promise<void>}
   */
  saveChanges = async () => {
    await this.checkForErrors('number')
    await this.checkForErrors('business_email')
    await this.checkForErrors('secondary_email')
    const {number_error,business_email_error,secondary_email_error,facebook_url_error,linkedin_url_error}=this.state;
    if(!number_error && !business_email_error && !secondary_email_error) {
      const finalData = {
        id: this.state.id,
        secondary_email: this.state.secondary_email,
        facebook_url: this.state.facebook_url,
        linkedin_url: this.state.linkedin_url
      };
      try {
        const header = {
          authorization: handleLocalStorage('get', 'employerLogin'),
        };
        const response = await apiCall('get', finalData, EMPLOYER_UPDATE_CONTACT_DETAILS, header);
        if (response.status) {
          this.props.onclick();
        }
      } catch (e) {
      }
    }
  };
  /**
   * on change in input field
   * @param e
   */
  handleInput = e => {
    const { name } = e.target;
    this.setState({
      [name]: e.target.value,
      [`${name}_error`]:''
    });
  };

  /**
   * on change in input field of mobile Number
   * @param e
   */
  handleMobile = e => {
    if(e.target.value.length<=10) {
      let mob = this.state.mobile;
      mob['number'] = e.target.value;
      mob['code'] = this.state.mobile.code;
      this.setState({
        mobile: mob,
        otpVerified:false,
      });
    }
  };

  /**
   * on change in country code of mobile number
   * @param option
   */
  setCoutryCode=(option)=>{
    let mob=this.state.mobile;
    mob['number']=this.state.mobile.number;
    mob['code']=option.label;
    this.setState({
      mobile: mob,
    });
  }

  /**
   * To validate business Email id
   * @returns {string}
   */
  business_emailValidations = () => {
    const { business_email } = this.state;
    let emailErrorMessage = '';
    if (business_email == '') {
      emailErrorMessage = 'Kindly specify your Email Id';
    } else if (!validateEmail(business_email)) {
      emailErrorMessage = 'Kindly enter a valid Email Id';
    } else if (!this.isEmailAvailable()) {
      emailErrorMessage = 'Email Id is already registered with us';
    }
    return emailErrorMessage;
  };

  /**
   * To validate mobile number
   * @returns {string}
   */
   validateMobile = ()=> {
    const { number } = this.state.mobile;
    let number_error = '';
    if( number == ""){
      number_error = "Kindly specify your number";
    }else if(number && (number.length!=10 || !/^[6-9][0-9]{9}$/.test(number))){
      number_error = "Kindly enter a valid mobile number";
    }
   return number_error;
  };

  /**
   * To validate secondary email id
   * @returns {Promise<string>}
   */
  emailValidations = async () => {
    const { secondary_email } = this.state;
    let emailErrorMessage = '';
    let secondatyUrl=await this.secondaryEmailValidateUrl();
    if (secondary_email == '') {
      emailErrorMessage = 'Kindly specify your Email Id';
    } else if (!(await validateEmail(secondary_email))) {
      emailErrorMessage = 'Kindly enter a valid Email Id';
    } else if (!secondatyUrl.status) {
      emailErrorMessage = secondatyUrl.message;
    }
    return emailErrorMessage;
  };

  /**
   * To validate all fields of contact detail
   * @param name
   * @returns {Promise<boolean>}
   */
  checkForErrors = async name => {
    const elementId = name;
    const errorElementId = `${elementId}_error`;
    let currentFieldError = '';
    if (elementId === 'business_email') {
      currentFieldError = this.business_emailValidations();
    }
    else if (elementId === 'number') {
      currentFieldError = this.validateMobile();
    }
      else if (elementId === 'secondary_email') {
      currentFieldError = await this.emailValidations();
      // currentFieldError = this.emailMatchWithBusinessEmail();
    } else if (elementId === 'facebook_url') {
      if(this.state.facebook_url===''){
        currentFieldError='Kindly specify you Facebook Url'
      } else {
        currentFieldError = await this.validateUrlForm(elementId, this.state.facebook_url);
      }
    } else if (elementId === 'linkedin_url') {
      if(this.state.linkedin_url===''){
        currentFieldError='Kindly specify you LinkedIn Url'
      } else {
        currentFieldError = await this.validateUrlForm(elementId, this.state.linkedin_url);
      }
    }
    this.setState({
      [errorElementId]: currentFieldError,
    });
    return currentFieldError ? true:false
  };

  /**
   * TO check secondary email id not match with business email
   * @returns {Promise<*>}
   */
  isEmailAvailable = async () => {
    const sendingData = {
      email_id: this.state.secondary_email,
    };
    const data = await apiCall('get', sendingData, EMPLOYER_EMAIL_VERIFICATION);
    this.setState({
      is_email_valid: data.status,
      email_error: data.status === false ? data.message : '',
    });
    return data.status;
  };

  /**
   * To validate the secondary email
   * @returns {Promise<*>}
   */
  secondaryEmailValidateUrl=async()=>{
    const finalData = {
      email_id:this.state.secondary_email,
    };
    try {
      const header = {
        authorization: handleLocalStorage('get', 'employerLogin'),
      };
      const data = await apiCall('get', finalData, CHECK_SECONDATY_EMAIL, header);
      // this.setState({
      //   is_email_valid: data.status,
      //   email_error: data.status === false ? data.message : '',
      // });
      return data;
    } catch (e) {}
  };

  /**
   * TO validate url Validation
   * @param name
   * @param targetUrl
   * @returns {Promise<string>}
   */
  validateUrlForm = async (name, targetUrl) => {
    const data = this.state[name];
    if(!data){
      return '';
    }
    const isValid = await urlValidation(data, targetUrl);
    if (!isValid) {
      return 'Kindly specify a valid url';
    }
    return '';
  };

  // to return error incase of email availability
  returnEmailError = status => (status === false ? 'Email Id already exists in the system' : '');

  // isValidity check as it depends upon conditon
  returnErrorStatus = status => status;

  // called when user clicks on send on otp popup with validated data.
  onGetEmailOTP = async popup_email => {
    popup_email=popup_email.trim()
    const sendingData = {
      email_id: popup_email,
    };
    const header = {
      'authorization': handleLocalStorage("get", "employerLogin"),
      'content-Type': 'application/json',
    }
    const data = await apiCall('get', sendingData, EMPLOYER_HOMEPAGE_EMAIL_VERIFICATION_GET_OTP, header);
    return data;
  };

  /**
   * on click get an otp in mobile verification
   * @param mobileNumber
   * @param countryCode
   * @returns {Promise<*>}
   */
  onGetMobileOTP = async (mobileNumber, countryCode) => {
    const sendingData = {
      mobile_no: mobileNumber,
      country_code:countryCode
    };
    const header = {
      'authorization': handleLocalStorage("get", "employerLogin"),
      'content-Type': 'application/json',
    }
    try{
      const data = await apiCall('get', sendingData, EMPLOYER_HOMEPAGE_MOBILE_VERIFICATION_GET_OTP, header);
      if(data && data.status){
        this.setState({otpReceived:true})
      }
      else{
        this.setState({otpReceived:false})
      }
      return data;
    }
    catch(e){
      this.setState({otpReceived:false})
    }
  };

  /**
   * To validate the mobile number in opening modal
   * @param name
   */
  handleModel = name => {
    if (name=='mobile_model' && this.state.mobile.number == '') {
      this.setState({
        number_error: 'Kindly specify your mobile number',
      });
    }
    else if(name=='mobile_model' && (this.state.mobile.number.length != 10 || !/^[6-9][0-9]{9}$/.test(this.state.mobile.number))){
      this.setState({
        number_error: 'Kindly enter a valid mobile number'
      });
    }else {
      this.setState({
        [name]: !this.state[name],
      });
    }
  };

  /**
   * To validate the email otp is correct or not
   * @param email
   * @param otp
   * @returns {Promise<*>}
   */
  onValidateEmailOTP = async (email, otp) => {
    const sendingData = {
      email_id: email,
      otp,
    };
    const header = {
        'authorization': handleLocalStorage('get', 'employerLogin'),
        'Content-Type': 'application/json',
    };
    const responseData = await apiCall('get', sendingData, EMPLOYER_HOMEPAGE_EMAIL_VERIFICATION_VERIFY_OTP, header);

    if (responseData.status === false) {
      return responseData;
    }
    this.setState({business_email:email,business_email_error:''})
    this.handleModel('email_model');
    return responseData;
  };

  /**
   * To validate the mobile otp is correct or not
   * @param mobileNumber
   * @param otp
   * @param countryCode
   * @returns {Promise<*>}
   */
  onValidateMobileOTP = async (mobileNumber, otp, countryCode) => {
    const sendingData = {
      mobile_no: mobileNumber,
      country_code: countryCode,
      otp,
    };
    const header = {
        'authorization': handleLocalStorage('get', 'employerLogin'),
        'Content-Type': 'application/json',
    };
    try{
      const responseData = await apiCall('get', sendingData, EMPLOYER_HOMEPAGE_MOBILE_VERIFICATION_VERIFY_OTP, header);
      if (responseData.status === false) {
        this.setState({ otpVerified: responseData.message })
        return responseData;
      }
      const { mobile } = this.state;
      mobile.number = sendingData.mobile_no;
      mobile.code = sendingData.country_code;
      this.setState({ mobile, otpVerified:true })
    }
    catch(e){
    }
  };

  render() {
    const { classes } = this.props;
    const { business_email, secondary_email, mobile, facebook_url, linkedin_url } = this.state;
    const {
      business_email_error,
      secondary_email_error,
      code_error,
      number_error,
      facebook_url_error,
      linkedin_url_error,
    } = this.state;
    return (
      <div>
        <div className="row">
          <div className="save-discard">
            <CustomTag text="Save" className="save" onclick={this.saveChanges} />
            <CustomTag
              text="Discard Changes"
              className="discard-changes"
              onclick={this.discardChanges}
            />
          </div>
          <div className="your-contact-details">Your Contact Details</div>
        </div>
        
        <div className="contact-details-form">
          <form>
            <Grid container spacing={32}>
              <Grid item xs={12} md={6} >
                <FormControl error={business_email_error !== ''} className="form-child">
                  <InputLabel
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                      error:classes.cssError
                    }}
                    shrink={true}>
                    Business Email
                  </InputLabel>
                  <Input
                    name="business_email"
                    type="text"
                    value={business_email}
                    disabled
                    endAdornment={
                      <InputAdornment position="end">
                        <CustomTag
                          text="Edit"
                          className="edit"
                          onclick={() => this.handleModel('email_model')}
                        />
                      </InputAdornment>
                    }
                    onBlur={()=>this.checkForErrors('business_email')}
                    onChange={this.handleInput}
                  />
                  <FormHelperText className="field_error">{business_email_error}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} >
                <FormControl error={secondary_email_error !== ''} className="form-child">
                  <InputLabel
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                      error:classes.cssError
                    }}
                    shrink={true}>
                    Secondary Email
                  </InputLabel>
                  <Input
                    name="secondary_email"
                    type="text"
                    value={secondary_email}
                    onChange={this.handleInput}
                    onBlur={() => this.checkForErrors('secondary_email')}
                  />
                  <FormHelperText className="field_error">{secondary_email_error}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={32}>
              <Grid item xs={4} md={2}>
                <InputLabel
                  className="change-label-style"
                  shrink={true}
                  classes={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                    error:classes.cssError
                  }}
                >
                  {'Code'}
                </InputLabel>
                <CountryCodeDropdown
                  isSearchable={true}
                  updateCountryCode={this.state.updateCountryCode}
                  getSelectedOption={(option)=>this.setCoutryCode(option)}
                  defaultValue={mobile?{value:mobile.code,label:mobile.code}:''}
                  isClearable={false}
                  error={this.state.code_error}
                />
                {this.state.code_error ? <FormHelperText error={this.state.code_error} id="firstName_error" className="field_error">
                  <span className="field_error">
                    {this.state.code_error}
                  </span>
                </FormHelperText> : null}
              </Grid>
              <Grid item md={4} xs={8}>
                <FormControl error={number_error !== ''} className="form-child">
                  <InputLabel
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                      error:classes.cssError
                    }}
                    shrink={true}>
                    Mobile Number
                  </InputLabel>
                  <Input
                    name="number"
                    type="number"
                    endAdornment={
                      this.state.mobile.number && this.state.mobile.number.length==10 && this.state.otpVerified==true? (
                        <InputAdornment position="end">
                          <IconButton aria-label="Toggle password visibility">
                            <CustomIcon icon={green_tick} />
                          </IconButton>
                        </InputAdornment>
                      ) : (
                        <InputAdornment position="end" onClick={()=>this.handleModel('mobile_model')}>
                          <CustomTag text="Verify" className="verify-text" />
                        </InputAdornment>
                      )
                    }
                    value={mobile.number}
                    onBlur={()=>this.checkForErrors('number')}
                    onChange={this.handleMobile}
                  />
                  <FormHelperText className="field_error">{number_error}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} >
                <FormControl error={facebook_url_error !== ''} className="form-child">
                  <InputLabel
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                      error:classes.cssError
                    }}
                    shrink={true}>
                    Facebook URL
                  </InputLabel>
                  <Input
                    name="facebook_url"
                    type="text"
                    value={facebook_url}
                    onChange={this.handleInput}
                  />
                  <FormHelperText className="field_error">{facebook_url_error}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={32}>
              <Grid item xs={12} md={6} >
                <FormControl error={linkedin_url_error !== ''} className="form-child">
                  <InputLabel
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                      error:classes.cssError
                    }}
                    shrink={true}>
                    LinkedIn URL
                  </InputLabel>
                  <Input
                    name="linkedin_url"
                    type="text"
                    value={linkedin_url}
                    onChange={this.handleInput}
                  />
                  <FormHelperText className="field_error">{linkedin_url_error}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </form>
          <Modal open={this.state.email_model}>
            <EmailVerification
              onGetEmailOTP={this.onGetEmailOTP}
              onValidateEmailOTP={this.onValidateEmailOTP}
              returnEmailError={this.returnEmailError}
              emailAvailbleChecker = {
                'employer-homepage/check-bussiness-email/'
              }
              returnErrorStatus={this.returnErrorStatus}
              handleModel={() => this.handleModel('email_model')}
              headingText="Verify Email"
            />
          </Modal>
          <Modal
            open={this.state.mobile_model}
          >
            <MobileVerification
              handleModel={() => this.setState({'mobile_model':false, otpReceived:false})}
              
              onGetOTP={(data) => {
                this.onGetMobileOTP(data.mobile_no, data.country_code);
              }}
              otpReceived={this.state.otpReceived}
              otpVerified={this.state.otpVerified}
              countryCode={mobile.code}
              headingText="Verify Mobile"
              mobileNumber={mobile.number}
              onValidateEmailOTP={(data) => {
                this.onValidateMobileOTP(data.mobile_no, data.otp_number, data.country_code);
              }}
            />
          </Modal>
        </div>
      </div>
    );
  }
}

ContactDetailsEdit.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  contactDetails: JSON.parse(JSON.stringify(state.empHomePage.personalDetails.contactDetails))
});
const mapDispatchToProps = dispatch => ({
  updateEmpContactDetails: bindActionCreators(actions.updateEmpContactDetails, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ContactDetailsEdit));
