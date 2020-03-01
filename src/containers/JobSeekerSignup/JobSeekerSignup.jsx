// library dependencies
import React, {Component} from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Modal
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import axios from 'axios';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//styles
import customisedMaterial from '../../styles/customisedMaterial';
import './style.scss';
//custom components
import MobileVerification from '../../components/MobileVerification';
import CustomIcon from './CustomIcon';
import CustomTag from '../../components/CustomTag';
import DateTimePicker from '../../components/DateTimePicker';
import CountryCodeDropdown from '../../components/SingleSelectDropdownWrapper/components/CountryCodeDropdown'
//icons
import green_tick from '../../../assets/media/icons/green_tick.svg';
import close from '../../../assets/media/images/close.png';
//utilities
import {
  apiCall,
  browserValidation,
  fileValidation,
  validateEmail,
  validateName,
  validatePassword
} from '../../Utilities';
import {
  AADHAR_UPDATE,
  JOBSEEKER_EMAIL_VERIFICATION,
  JOBSEEKER_MOBILE_OTP_VERIFICATION,
  JOBSEEKER_MOBILE_VERIFICATION,
  SERVER_API_PATH,
  SERVER_API_URL,
} from '../../../config/constants';
import * as actions from '../../actions';

// overriding the material ui classes
const styles = theme => ({
  root: {display: 'flex', flexWrap: 'wrap'},
  margin: {},
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
  greenLabel: {color: '#0f0'},
  greenUnderline: {
    '&:after': {
      backgroundColor: '#0f0',
    },
  },
  greenInkbar: {
    '&:after': {
      backgroundColor: '#0f0',
    },
  },
  helperText: {
    color: '#656565',
    fontSize: '14px',
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
  },
  withoutLabel: {marginTop: theme.spacing.unit * 3},
  textField: {flexBasis: 70},
  input: {display: 'none'},
  padding: {},
  ...customisedMaterial,
});

class JobSeekerSignup extends Component {
  /**
   * getting coutry code and country name from ipapi server
   * setting country code as default value before mobile number field
   */
  getCountyCode = () => {
    axios
      .get('https://ipapi.co/json/')
      .then(res => {
        if (res.data && res.data.hasOwnProperty('country_calling_code')) {
          this.setState({
            code: res.data.country_calling_code + " " + res.data.country_name,
            updateCountryCode: true
          });
          this.forceUpdate();
        }
      }).catch(err => {
    });
  };

  /**
   * handling date change of date of birth and updating required format in the state
   * or else throwing an error
   * @param date
   */
  handleDateChange = date => {
    if (date && date !== '') {
      const today = (new Date().getMonth() + 1) + " " + new Date().getDate() + ", " + new Date().getFullYear() + " 00:00:00";
      if (date.getTime() < new Date(today).getTime()) {
        this.setState({dateOfBirth: date, dateOfBirth_error: ''});
      } else {
        this.setState({dateOfBirth_error: "You can not select today's date"})
      }
    }
  };

  /**
   * Here validating the mobile number and country code,
   * if it is empty string throwing specify error or
   * if it's invalid format then invalid error will be thrown
   * after valid mobile number and country code only we will show modal
   */
  handleOpen = () => {
    if (this.state.mobileno === '') {
      this.setState({
        mobileno_error: 'Kindly specify your mobile number',
      });
    }
    else if (this.state.mobileno.toString().length !== 10 || !/^[6-9][0-9]{9}$/.test(this.state.mobileno)) {
      this.setState({
        mobileno_error: 'Kindly enter a valid mobile number'
      });
    } else if (this.state.code === '') {
      this.setState({
        code_error: 'Kindly specify a valid country code',
      });
    } else {
      this.setState({otpModal: true});
    }
  };

  /**
   * closing modal
   */
  handleClose = () => {
    this.setState({otpModal: false});
  };

  /**
   * used to call on change of input fields and checking the limitations of the fields
   * @param e
   */
  onInputChange = e => {
    const {id} = e.target;
    if (id === 'firstName' && e.target.value.length <= 30) {
      this.setState({[id]: e.target.value, [`${id}_error`]: ''});
    } else if (id === 'lastName' && e.target.value.length <= 20) {
      this.setState({[id]: e.target.value, [`${id}_error`]: ''});
    } else if (id !== 'firstName' && id !== 'lastName') {
      this.setState({
        [id]: e.target.value,
        [`${id}_error`]: '',
        otpVerified: id === 'mobileno' ? false : this.state.otpVerified,
        isValidMobile: id === 'mobileno' && e.target.value.length === 10 ? true : this.state.isValidMobile,
      });
    }
  };
  /**
   * to change state of checkbox and password visibility
   * @param id
   */
  changeState = id => {
    this.setState({
      [id]: !this.state[id],
    });
  };

  /**
   * validating file format and size
   * valid files are storing in the state and for invalid files showing errors
   * @param event
   * @return {Promise.<void>}
   */
  onFileUpload = async (event) => {
    const {target} = event;
    const {files} = target;
    const filesize = (files[0].size) / (1024 * 1024);
    if (filesize > 2) {
      return this.setState({
        file_error: "Document size cannot be more than 2 MB",
        aadhar_file_name: ''
      })
    }
    if (files && files[0]) {
      if (!fileValidation(files[0], 2, ["png", "pdf"])) {
        return this.setState({
          file_error: "Only PDF and PNG type files are allowed",
          aadhar_file_name: ''
        })
      }
      const reader = new FileReader();
      reader.onloadstart = () => this.setState({loading: true});
      reader.onload = event => {
        if (browserValidation() === 'IE' && this.checkFileSizeIE(files)) {
          this.setState({
            file_error: 'Document size cannot be more than 2 MB',
          });
        } else if (this.checkFileSizeFF(files)) {
          this.setState({
            file_error: 'Document size cannot be more than 2 MB',
          });
        } else {
          let formData = new FormData();
          formData.append('document', files[0]);
          apiCall('post', formData, AADHAR_UPDATE).then(res => {
            if (true) this.setState({aadharFileName: res.data});
          }).catch((e) => {
          });
          this.setState({
              aadhar_file_name: files[0].name,
              file_error: '',
            }, () => {
              event.target.value = null;
            },
          );
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  /**
   * @function to check for fields and go to next page
   * @param e
   */
  goToNextPage = e => {
    const {
      firstName,
      lastName,
      email,
      code,
      mobileno,
      aadhar_file,
      dateOfBirth,
      password,
      otpVerified,
      aadharFileName,
      aadhar_file_name
    } = this.state;
    let error = false;
    if (firstName === '') {
      this.setState({
        firstName_error: 'Kindly specify your first name',
      });
      error = true;
    }
    if (lastName === '') {
      this.setState({
        lastName_error: 'Kindly specify your last name',
      });
      error = true;
    }

    if (email === '') {
      this.setState({
        email_error: 'Kindly specify your Email Id',
      });
      error = true;
    }

    if (password === '') {
      this.setState({
        password_error: 'Kindly specify your password',
      });
      error = true;
    }
    if (code === '') {
      this.setState({
        code_error: 'Kindly specify a valid country code',
      });
      error = true;
    }

    if (mobileno === '') {
      this.setState({
          mobileno_error: 'Kindly specify your mobile number',
        }
      );
      error = true;
    }
    else if (mobileno.toString().length !== 10) {
      this.setState({
        mobileno_error: 'Kindly enter a valid mobile number'
      })
    }

    if (!dateOfBirth) {
      this.setState({
        dateOfBirth_error: 'Kindly enter your date of birth',
      });
      error = true;
    }

    if (mobileno && otpVerified == false) {
      this.setState({
        mobileno_error: 'Mobile number is not verified, Kindly verify it to proceed',
      });
      error = true;
    }
    if (this.state.email_error) {
      error = true
    }
    if (!error) {
      this.props.updateJobSeekerSignupPersonalDetails(
        Object.assign({}, this.state.jobSeekerPersonalDetailsData, {
          firstName,
          lastName,
          email,
          code,
          mobileno,
          aadhar_file,
          dateOfBirth,
          password,
          otpVerified,
          aadharFileName
        }),
      );
      this.props.history.push({
        pathname: '/jobseeker-signup/education',
        state: {
          experienceType: this.props.location.state.experienceType,
        },
      });
    }
  };

  /**
   * @function to check email validations
   * @return {string}
   */
  emailValidations = () => {
    const {email} = this.state;
    let emailErrorMessage = '';
    if (email == '') {
      emailErrorMessage = 'Kindly specify your Email Id';
      return emailErrorMessage;
    }
    if (!validateEmail(email)) {
      emailErrorMessage = 'Kindly enter a valid Email Id';
      return emailErrorMessage;
    }

    // checking email existance in the server
    this.isEmailAvailable()
      .then(res => {
        emailErrorMessage = res.status === false ? res.message : '';
        this.setState({
          email_error: emailErrorMessage,
        });
      })
      .catch(e => {
        emailErrorMessage = 'Error while validating';
        this.setState({
          email_error: emailErrorMessage,
        });
      });
  };

  /**
   * making an api call to check is entered email already available or not
   * @return {Promise}
   */
  isEmailAvailable = async () => {
    const promise = Promise.resolve(
      apiCall('get', {
          email_id: this.state.email,
          format: 'json',
        }, JOBSEEKER_EMAIL_VERIFICATION, {'content-type': 'application/json'},
      ),
    );
    return await promise;
  };

  /**
   * @function to set selected country code from the dropdown
   * @param option
   */
  setCoutryCode = (option) => {
    this.setState({
      code: option.value,
      code_error: '',
      updateCountryCode: false
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      jobSeekerPersonalDetailsData: {
        firstName: '',
        lastName: '',
        countyCode: '',
        emailAddress: '',
        mobileNumber: '',
        aadharFileName: null,
        dateOfBirth: null,
        aadharFile: null,
      },
      email_error: '',
      firstName_error: '',
      lastName_error: '',
      password_error: '',
      code_error: '',
      firstName: '',
      password: '',
      lastName: '',
      code: '',
      updateCountryCode: false,
      email: '',
      mobileno: '',
      mobileno_error: '',
      otpModal: false,
      aadhar_file_name: null,
      aadhar_file: null,
      file_error: '',
      experienceType: (props.location.state && props.location.state.experienceType) || null,
      selectedDate: '',
      dateOfBirth: null,
      nextRoute: '',
      otpVerified: false,
      otpReceived: false,
      isValidMobile: false,
      headers: {}
    };
    this.checkForErrors = this.checkForErrors.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
    this.onFileClear = this.onFileClear.bind(this);
    this.getCountyCode = this.getCountyCode.bind(this);
    this.isEmailAvailable = this.isEmailAvailable.bind(this);
    this.getOtp = this.getOtp.bind(this);
    this.validateOtp = this.validateOtp.bind(this);
  }

  componentWillMount() {
    // checking experience type in the url state, if its null redirecting to the personal details
    if (this.state.experienceType == null) {
      this.props.history.push({
        pathname: '/',
      });
    }
    this.getCountyCode();
  }

  /**
   * @function to check file size in firefox
   * @param files
   * @return {boolean}
   */
  checkFileSizeFF(files) {
    const filesize = files[0].size;
    return filesize / (1024 * 1024) > 2;
  }

  /**
   * @function to check file size in IE
   * @param file
   * @return {boolean}
   */
  checkFileSizeIE(file) {
    const myFSO = new ActiveXObject('Scripting.FileSystemObject');
    const filepath = file.value;
    const thefile = myFSO.getFile(filepath);
    const size = thefile.size / (1024 * 1024);
    return size > 2;
  }

  /**
   * @function to clear the file and file name from the state
   * @param e
   */
  onFileClear(e) {
    this.setState({
      aadhar_file_name: null,
      aadhar_file: null,
      file_error: ''
    });
  }

  /**
   * @function to get the otp
   * @param data
   */
  getOtp(data) {
    axios
      .post(SERVER_API_URL + SERVER_API_PATH + JOBSEEKER_MOBILE_VERIFICATION, data, {
        'content-type': 'application/json',
      })
      .then(res => {
        this.setState({otpReceived: res.data.status,});
      }).catch(e => {
    });
  }

  /**
   * @function to validate the entered otp
   * @param data
   */
  validateOtp(data) {
    axios
      .post(SERVER_API_URL + SERVER_API_PATH + JOBSEEKER_MOBILE_OTP_VERIFICATION, data, {
        'content-type': 'application/json',
      })
      .then(res => {
        if (res) localStorage.setItem("mobile_Verification_token", res.data.token)
        this.setState({
          otpVerified: res.data.status == true ? res.data.status : res.data.message,
          mobileno_error: res.data.status == true ? '' : res.data.message,
        });
      }).catch(e => {
    });
  }

  /**
   * @function check for form errors
   * @param e
   */
  checkForErrors(e) {
    if (typeof e.target === undefined) return;

    const elementId = e.target.id;
    const errorElementId = `${elementId}_error`;
    let currentFieldError = '';

    if (elementId === 'firstName') {
      if (this.state.firstName === '') {
        currentFieldError = 'Kindly specify your first name';
      } else if (validateName(this.state.firstName, 30) === false) {
        currentFieldError =
          'Numeric and special Characters(except one dot, and one apostrophe) are not allowed';
      } else {
        currentFieldError = '';
      }
    } else if (elementId === 'lastName') {
      if (this.state.lastName === '') {
        currentFieldError = 'Kindly specify your last name';
      } else if (validateName(this.state.lastName, 20) === false) {
        currentFieldError =
          'Numeric and special Characters(except one dot, and one apostrophe) are not allowed';
      } else {
        currentFieldError = '';
      }
    } else if (elementId === 'email') {
      if (this.state.email === '') {
        currentFieldError = 'Kindly specify your Email Id';
      } else if (validateEmail(this.state.email) === false) {
        currentFieldError = 'Kindly enter a valid Email Id';
      } else {
        currentFieldError = this.emailValidations();
      }
    } else if (elementId === 'password') {
      if (this.state.password === '') {
        currentFieldError = 'Kindly specify your password';
      } else if (validatePassword(this.state.password) === false) {
        currentFieldError =
          'Password should be combination of atleast 1 Alphabet and 1 Number and should be between 8 to 20 characters';
      } else {
        currentFieldError = '';
      }
    } else if (elementId === 'mobileno') {
      if (this.state.mobileno === '') {
        currentFieldError = 'Kindly specify your mobile number';
      }
      else if (this.state.mobileno.toString().length !== 10 || !/^[6-9][0-9]{9}$/.test(this.state.mobileno)) {
        currentFieldError = "Kindly enter a valid mobile number"
      }
      else {
        currentFieldError = '';
      }
    }
    this.setState({
      [errorElementId]: currentFieldError,
    });
  }

  render() {
    const {classes} = this.props;
    const showCorrectTick =
      this.state.email !== '' && this.state.email_error === '' && validateEmail(this.state.email);
    return (
      <div className="jobseeker-signup">
        <div className="jobseeker-form">
          <div className="jobseeker-heading">Sign up for Employee</div>
          <Grid
            container
            spacing={16}
            direction="row"
            style={{marginTop: 22}}
            justify="space-between"
          >
            <Grid item xs={6}>
              <FormControl
                style={{width: '100%'}}
                className="form-control-child"
                error={this.state.firstName_error !== ''}
              >
                <InputLabel
                  htmlFor="firstName"
                  className="change-label-style"
                  shrink={true}
                  classes={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                    error: classes.cssError
                  }}
                >
                  First Name
                </InputLabel>
                <Input
                  id="firstName"
                  type="text"
                  classes={{
                    underline: classes.cssUnderline,
                    focused: classes.cssFocused,
                  }}
                  onChange={this.onInputChange}
                  value={this.state.firstName}
                  onBlur={this.checkForErrors}
                  required={true}
                  aria-describedby="firstName_error"
                />
                <FormHelperText error={this.state.firstName_error !== ''} id="firstName_error">
                  <span className="field_error">
                    {this.state.firstName_error}
                  </span>
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl
                style={{width: '100%'}}
                className={classes.margin}
                error={this.state.lastName_error !== ''}
              >
                <InputLabel
                  htmlFor="lastName"
                  shrink={true}
                  className="change-label-style"
                  classes={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                    error: classes.cssError
                  }}
                >
                  Last Name
                </InputLabel>
                <Input
                  id="lastName"
                  type="text"
                  onChange={this.onInputChange}
                  value={this.state.lastName}
                  onBlur={this.checkForErrors}
                  required={true}
                  classes={{
                    underline: classes.cssUnderline,
                    focused: classes.cssFocused,
                  }}
                />
                <FormHelperText error={this.state.lastName_error !== ''} id="lastName_error">
                  <span className="field_error">
                    {this.state.lastName_error}
                  </span>
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container className="mt-12">
            <FormControl
              style={{width: '100%', marginTop: '10px'}}
              className={classes.formControl}
              error={this.state.email_error !== ''}
            >
              <InputLabel
                htmlFor="email"
                shrink={true}
                className="change-label-style"
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
                autoFocus={false}
                onChange={this.onInputChange}
                value={this.state.email}
                onBlur={this.checkForErrors}
                autoComplete="off"
                classes={{
                  underline: classes.cssUnderline,
                  focused: classes.cssFocused,
                }}
                endAdornment={
                  showCorrectTick ? (
                    <InputAdornment position="end">
                      <IconButton aria-label="Toggle password visibility">
                        <CustomIcon icon={green_tick}/>
                      </IconButton>
                    </InputAdornment>
                  ) : null
                }
              />
              <FormHelperText error={this.state.email_error !== ''} id="email_error">
                <span className="field_error">
                  {this.state.email_error}
                </span>
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid container spacing={16} className="mt-16">
            <Grid item xs={4} style={{marginTop: '-3px'}}>
              <InputLabel
                className="change-label-style"
                shrink={true}
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                  error: classes.cssError
                }}
              >
                {'Code'}
              </InputLabel>
              <CountryCodeDropdown
                isSearchable={true}
                updateCountryCode={this.state.updateCountryCode}
                getSelectedOption={(option) => this.setCoutryCode(option)}
                defaultValue={this.state.code ? {value: this.state.code, label: this.state.code} : ''}
                isClearable={false}
                error={this.state.code_error}
              />
              {this.state.code_error ? <FormHelperText error={this.state.code_error} id="firstName_error">
                  <span className="field_error">
                    {this.state.code_error}
                  </span>
              </FormHelperText> : null}
            </Grid>
            <Grid item xs={8}>
              <FormControl
                style={{width: '100%'}}
                className={classes.formControl}
                error={this.state.mobileno_error !== ''}
              >
                <InputLabel
                  htmlFor="mobile"
                  shrink={true}
                  className="change-label-style"
                  classes={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                    error: classes.cssError
                  }}
                >
                  Mobile
                </InputLabel>
                <Input
                  id="mobileno"
                  value={this.state.mobileno}
                  type="number"
                  autoFocus={false}
                  classes={{
                    underline: classes.cssUnderline,
                    focused: classes.cssFocused,
                  }}
                  endAdornment={
                    this.state.mobileno.length == 10 && this.state.otpVerified ? (
                      <InputAdornment position="end">
                        <IconButton aria-label="Toggle password visibility">
                          <CustomIcon icon={green_tick}/>
                        </IconButton>
                      </InputAdornment>
                    ) : (
                      <InputAdornment position="end" onClick={this.handleOpen}>
                        <CustomTag text="Verify" className="verify-text"/>
                      </InputAdornment>
                    )
                  }
                  onBlur={this.checkForErrors}
                  style={{width: '100%'}}
                  onChange={this.onInputChange}
                />
                <FormHelperText error={this.state.mobileno_error !== ''} id="mobile_no_error">
                  <span className="field_error">
                    {this.state.mobileno_error}
                  </span>
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <FormControl style={{width: '100%', marginTop: '16px'}}>
                <DateTimePicker
                  id="dateOfBirth"
                  label="Date of Birth"
                  date={this.state.dateOfBirth}
                  onChangeDate={this.handleDateChange}
                  error={this.state.dateOfBirth_error}
                  selected={this.state.dateOfBirth ? this.state.dateOfBirth : null}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={16}>
            <Grid item xs={12} className="mt-36">
              <FormControl
                style={{width: '100%'}}
                error={this.state.password_error !== ''}
              >
                <InputLabel
                  htmlFor="password"
                  shrink={true}
                  className="change-label-style"
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
                  onBlur={this.checkForErrors}
                  classes={{
                    underline: classes.cssUnderline,
                    focused: classes.cssFocused,
                  }}
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
                />
                <FormHelperText error={this.state.password_error !== ''} id="password_error">
                  <span className="field_error">
                    {this.state.password_error}
                  </span>
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <FormControl style={{width: '100%'}} error={this.state.file_error !== ''}>
                <InputLabel className="change-label-style"
                            classes={{
                              root: classes.cssLabel,
                              focused: classes.cssFocused,
                              error: classes.cssError
                            }}
                            htmlFor="adornment-password">
                  Aadhar Card
                </InputLabel>
                <label htmlFor="contained-button-file" style={{width: '132px', height: '0px'}}>
                  <Button
                    style={{marginTop: '45px'}}
                    variant="contained"
                    component="span"
                    className="default_button"
                  >
                    Upload
                  </Button>
                </label>
                {this.state.aadhar_file_name ? (
                  <span id="aadhar-upload">
                    {this.state.aadhar_file_name}
                    <CustomIcon icon={close} onClick={this.onFileClear}/>
                  </span>
                ) : null}
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple={false}
                  type="file"
                  onChange={e => {
                    this.onFileUpload(e);
                  }}
                  onClick={event => {
                    event.target.value = null;
                  }}
                />
                <FormHelperText error={this.state.file_error !== ''} className="mt-92" id="file_error">
                  <span className="field_error">
                    {this.state.file_error}
                  </span>
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <FormControl>
            <button className="solid_button" onClick={this.goToNextPage}>
              Next
            </button>
          </FormControl>
        </div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.otpModal}
          onClose={this.handleClose}
        >
          <MobileVerification
            handleModel={e => {
              this.handleClose();
            }}
            onGetOTP={data => {
              this.setState({
                otpReceived: false,
                otpVerified: false,
              });
              this.getOtp(data);
            }}
            otpReceived={this.state.otpReceived}
            otpVerified={this.state.otpVerified}
            countryCode={this.state.code}
            headingText="Verify Mobile"
            mobileNumber={this.state.mobileno}
            onValidateEmailOTP={(mob, otp) => {
              this.validateOtp(mob, otp);
            }}
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  qualificationList: state.default.jobSeekerSignupFormData.educationalDetails,
  personalDetails: state.default.jobSeekerSignupFormData.personalDetails,
});

const mapDispatchToProps = dispatch => ({
  updateJobSeekerSignupPersonalDetails: bindActionCreators(
    actions.EmpSignUpFormActions.updateJobSeekerSignupPersonalDetails,
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(JobSeekerSignup));
