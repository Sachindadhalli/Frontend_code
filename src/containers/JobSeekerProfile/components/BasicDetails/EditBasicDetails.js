//library dependency
import React, {Component} from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import {Input, InputAdornment} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import {withStyles} from "@material-ui/core/styles/index";

//custom components
import NonCreatableSingleSelectDropdown
  from '../../../../components/SingleSelectDropdownWrapper/components/NonCreatableSingleSelectDropdown';
import NonCreatableRemoteDataSingleSelectDropdown
  from '../../../../components/SingleSelectDropdownWrapper/components/NonCreatableRemoteDataSingleSelectDropdown';
import LabelValueComponent from '../../../../components/ReusableComponents/LabelValueComponent/LabelValueComponent';
import MobileVerificationPopUpEdit from '../../../../components/MobileVerification/MobileVerifivationPopUpEdit';

//styles
import './styles.scss';


//utilities
import {
  CURRENCY,
  JOBSEEKER_MOBILE_VERIFICATION,
  JOBSEEKER_MOBILE_OTP_VERIFICATION
} from "../../../../../config/constants";
import apiCall from "../../../../Utilities/apiCall";
import handleLocalStorage from "../../../../Utilities/handleLocalStorage";

//icons


/**
 * this is used to overrides material ui components style
 * @returns {{root: {}, RadioButtonLabel: {fontFamily: string, fontSize: string, fontWeight: string, fontStyle: string, fontStretch: string, lineHeight: string, letterSpacing: string, color: string}}}
 */
const styles = () => ({
  root: {},
  RadioButtonLabel: {
    fontFamily: 'Roboto',
    fontSize: '16px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#212121'
  }
});

/**
 * this are the drop down options values
 * @type {*[]}
 */
const year_options = [{value: 1, key: 1}, {value: 2, key: 2}, {value: 3, key: 3}, {value: 4, key: 4}];
const month_options = [{value: 1, key: 1}, {value: 2, key: 2}, {value: 3, key: 3}, {value: 4, key: 4}];


class EditBasicDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radio_out: 'Fresher',
      year: '',
      month: '',
      currency: '',
      currency_error: '',
      salary: '',
      salary_error: '',
      mobile_model: false,
      otp_received: false,
      otp_verified: false,
      mobile_number: '9619522338',
      code: '+91'
    }
  }

  /**
   * this function used to handle radio change of fresher and experience
   * @param e
   */
  handleChangeRadio = (e) => {
    this.setState({radio_out: e.target.value})
  };
  /**
   * set options of state variables by specified options and label
   * @param options
   * @param label
   * @constructor
   */
  SelectedOptions = (options, label) => {
    this.setState({[label]: options})
  };
  /**
   * set user defined salary value in state variable
   * @param e
   */
  onInputChange = (e) => {
    let salary = 'salary';
    this.setState({[salary]: e.target.value}, () => {
    })
  };

  /**
   * on blur function under process
   * @param e
   */
  handleBlur = (e) => {
  };

  /**
   * this function used to update mobile number in state  variable
   */
  updateMobileNumber = () => {
    this.setState({mobile_model: true})
  };
  /**
   * this function used to get mobile otp by mobile verification api
   * @param mobile_number
   * @param country_code
   * @returns {Promise<*>}
   */
  onGetMobileOTP = async (mobile_number, country_code) => {
    const sendingData = {
      mobile_no: mobile_number,
      country_code: country_code,
      otp_state: "send"
    };
    const header = {
      'authorization': handleLocalStorage("get", "employeeLogin"),
      'content-Type': 'application/json',
    };
    try {
      const data = await apiCall('post', sendingData, JOBSEEKER_MOBILE_VERIFICATION, header);
      if (data && data.status) {
        this.setState({otp_received: true})
      }
      else {
        this.setState({otp_received: false})
      }
      return data;
    }
    catch (e) {
      this.setState({otp_received: false})
    }
  };

  /**
   * this function used to validate mobile otp through api
   * @param mobile_number
   * @param otp
   * @param country_code
   * @returns {Promise<*>}
   */
  onValidateMobileOTP = async (mobile_number, otp, country_code) => {
    const sendingData = {
      mobile_no: mobile_number,
      country_code: country_code.includes("+") ? country_code : "+" + country_code,
      otp_number: otp,
    };
    const header = {
      'authorization': handleLocalStorage('get', 'employeeLogin'),
      'Content-Type': 'application/json',
    };
    try {
      const responseData = await apiCall('post', sendingData, JOBSEEKER_MOBILE_OTP_VERIFICATION, header);
      if (responseData.status === false) {
        this.setState({otp_verified: responseData.message})
        return responseData;
      }
      this.setState({mobile_number: sendingData.mobile_no, code: sendingData.country_code, otp_verified: true})
    }
    catch (e) {}
  };


  render() {
    const {radio_out, year, month, currency, currency_error, salary, mobile_number, code} = this.state;
    const {classes} = this.props;
    return (
      <div className='edit-Basic-details-main-container'>
        <div className='edit-basic-details-align-items-1'>
          <Grid container spacing={16}>
            <Grid item xs={12} md={6}>
              <FormControl style={{width: '100%'}}>
                <label className='experience-radio-button-label'>Experience</label>
                <RadioGroup aria-label="position" name="position" value={radio_out} onChange={this.handleChangeRadio}
                            row>
                  <FormControlLabel
                    style={{width: '45%'}}
                    value="Fresher"
                    control={<Radio/>}
                    label="Fresher"
                    classes={{label: classes.RadioButtonLabel}}
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    style={{width: '45%'}}
                    value="Experienced"
                    control={<Radio/>}
                    label="Experienced"
                    classes={{label: classes.RadioButtonLabel}}
                    labelPlacement="end"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            {radio_out !== 'Fresher' &&
            <Grid item xs={12} md={3}>
              <label className='edit-Basic-details-dropdown-label'>Years</label>
              <div style={{width: "90%"}}>
                <NonCreatableSingleSelectDropdown
                  getSelectedOption={(option) => this.SelectedOptions(option, 'year')}
                  defaultValue={year ? year : ''}
                  options={year_options}
                  error={''}
                  style={{width: "90%"}}
                />
              </div>
            </Grid>
            }
            {radio_out !== 'Fresher' &&
            <Grid item xs={12} md={3}>
              <label className='edit-Basic-details-dropdown-label'>Months</label>
              <div style={{width: "90%"}}>
                <NonCreatableSingleSelectDropdown
                  getSelectedOption={(option) => this.SelectedOptions(option, 'month')}
                  defaultValue={month ? month : ''}
                  options={month_options}
                  error={''}
                />
              </div>
            </Grid>
            }
            {radio_out === "Fresher" &&
            <Grid item xs={12} md={3} style={{paddingTop: '16px'}}>
              <LabelValueComponent label='Mobile number' value={`${code} - ${mobile_number}`}/>
            </Grid>
            }
            {radio_out === "Fresher" &&
            <Grid item xs={12} md={3} style={{paddingTop: '16px'}}>
              <div className='update-title-button' onClick={this.updateMobileNumber}> update</div>
            </Grid>
            }
          </Grid>
        </div>
        {radio_out !== 'Fresher' &&
        <div className='edit-basic-details-item-align-2'>
          <Grid container spacing={16}>
            <Grid item xs={12} md={6}>
              <label className='edit-Basic-details-dropdown-label'>Currency</label>
              <div style={{width: '80%'}}>
                <NonCreatableRemoteDataSingleSelectDropdown
                  isSearchable={true}
                  apiUrl={CURRENCY}
                  queryParams={{search: ''}}
                  getSelectedOption={(option) => this.SelectedOptions({
                    key: option.value,
                    value: option.label
                  }, 'currency')}
                  isClearable={false}
                  defaultValue={currency ? {value: currency.key, label: currency.value} : {}}
                  error={currency_error}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <label className='edit-Basic-details-dropdown-label'>Salary</label>
              <div style={{display: "flex", alignItems: 'baseline'}}>
                <Input
                  name="salary"
                  value={salary}
                  classes={{underline: classes.cssUnderline, focused: classes.cssFocused}}
                  // endAdornment={<InputAdornment position="end">Lacs</InputAdornment>}
                  onChange={this.onInputChange}
                  margin="normal"
                  onBlur={this.handleBlur}
                  type="number"
                /><label>Lakhs</label></div>
            </Grid>
          </Grid>
        </div>
        }
        {radio_out !== 'Fresher' &&
        <div className='edit-basic-details-item-align-3'>
          <Grid container spacing={16}>
            <Grid item xs={12} md={3}>
              <LabelValueComponent label='Mobile number' value={`${code} - ${mobile_number}`}/>
            </Grid>
            <Grid item xs={12} md={3}>
              <div className='update-title-button' onClick={this.updateMobileNumber}> update</div>
            </Grid>
          </Grid>
        </div>
        }
        <Modal
          open={this.state.mobile_model}
        >
          <MobileVerificationPopUpEdit
            handleModel={() => this.setState({mobile_model: false, otpReceived: false})}
            onGetOTP={(data) => {
              this.onGetMobileOTP(data.mobile_no, data.country_code);
            }}
            otpReceived={this.state.otp_received}
            otpVerified={this.state.otp_verified}
            countryCode={code}
            headingText="Verify Mobile"
            mobileNumber={mobile_number}
            onValidateEmailOTP={(data) => {
              this.onValidateMobileOTP(data.mobile_no, data.otp_number, data.country_code);
            }}
          />
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(EditBasicDetails);
