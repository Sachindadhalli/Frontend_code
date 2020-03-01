// library dependencies
import React, {Component} from "react";
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid"
import {FormControl, InputLabel, Modal, TextField} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {Button} from "styled-minimal";
import FormHelperText from '@material-ui/core/FormHelperText';
import uuid from 'uuid/v4';
//styles
import "./style.scss";
//utitlies
import {AADHAR_UPDATE, JOB_SEEKER_REGISTRATION} from "../../../config/constants";
import * as actions from '../../actions';
import {apiCall, fileValidation} from "../../Utilities";
//custom components
import WorkExperience from "./components/EmploymentBlock/WorkExperience";
import UploadDialog from "./components/UploadDialog/UploadDialog";
import CustomIcon from "./CustomIcon";
import NonCreatableSingleSelectDropdown from '../../components/SingleSelectDropdownWrapper/components/NonCreatableSingleSelectDropdown'
//icons
import close from '../../../assets/media/images/close.png';

// overriding the material ui style classes
const styles = (theme) => ({
  root: {display: 'flex', flexWrap: 'wrap'},
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  margin: {margin: theme.spacing.unit},
  withoutLabel: {marginTop: theme.spacing.unit * 3},
  textField: {flexBasis: 70},
  input: {display: 'none'},
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
  padding: {},
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

const breakReasonList = [
  {value: 'Maternity leave', key: 1},
  {value: 'Others', key: 2},
];

const breakDurationList = [
  {value: '1 month', key: 1},
  {value: '2 months', key: 2},
  {value: '3 months', key: 3},
  {value: '6 months', key: 4},
  {value: '1 year', key: 5},
  {value: '1-2 years', key: 6},
  {value: '2-4 years', key: 7},
];

class JobSeekerEmploymentDetails extends Component {
  checkValidation = false;

  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      tempSkill: '',
      employmentList: [
        {
          start_date: '',
          end_date: '',
          job_title: '',
          annual_salary: '',
          notice_period: '',
          country: '',
          state: '',
          city: '',
          description: '',
          company_name: '',
        },
      ],
      armedForces: false,
      checkExpericeceErrors: false,
      showSkillsError: false,
      break_reason: '',
      open: false,
      file_name: '',
      file_error: '',
      resume: '',
      resumeType: 'document',
      resumes: {document: '', video: ''},
      break_reason_check: false,
      break_reason_error: '',
      breakReasonOption: '',
      is_details_valid: false,
      terms_and_conditions: false,
      termAndConditionStatus: {
        is_details_valid_touched: false,
        terms_and_conditions_touched: false
      },
    };
    this.handleErrors = this.handleErrors.bind(this);
    this.addEmployment = this.addEmployment.bind(this);
    this.removeEmployment = this.removeEmployment.bind(this);
    this.addEmployment = this.addEmployment.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.changeExperienceData = this.changeExperienceData.bind(this);
  }

  // creating a copy of some data
  deepCopy = data => JSON.parse(JSON.stringify(data));

  onValidationChange = (status) => {
  };

  /**
   * @function to show resume modal
   */
  handleClickOpen = () => {
    this.setState({open: true});
  };

  /**
   * @function to close resume modal
   * @param value
   */
  handleClose = value => {
    this.setState({selectedValue: value, open: false});
  };

  /**
   *
   * @return {boolean}
   */
  isExperienceValid() {
    for (let child in this.allFormsRefs) {
      if (this.allFormsRefs[child]) {
        let isItInvalid = this.allFormsRefs[child].validateOnRegister();
        if (isItInvalid)
          return false;
      }
    }
    return true;
  }

  handleErrors = async (e) => {
    let canSubmit = true;
    if (this.state.terms_and_conditions && this.state.is_details_valid) {
      canSubmit = this.isExperienceValid()
      this.employeeSignup(canSubmit)
    } else {
      const {termAndConditionStatus} = this.state;
      if (!this.state.terms_and_conditions)
        termAndConditionStatus.terms_and_conditions_touched = true;
      if (!this.state.is_details_valid)
        termAndConditionStatus.is_details_valid_touched = true;

      this.setState({
        termAndConditionStatus
      }, () => {
        canSubmit = this.isExperienceValid();
        this.employeeSignup(canSubmit);
      })
    }
  }

  employeeSignup(canSubmit) {
    if (!this.isEntireFormValid() || !canSubmit || !this.state.terms_and_conditions || !this.state.is_details_valid) {
      return;
    }
    let dataTobesend = {}
    let setpersonalDetails = {}
    setpersonalDetails.first_name = this.props.personalDetails.firstName,
      setpersonalDetails.last_name = this.props.personalDetails.lastName,
      setpersonalDetails.email_id = this.props.personalDetails.email,
      setpersonalDetails.mobile_number = localStorage.getItem('mobile_Verification_token'),
      setpersonalDetails.country_code = this.props.personalDetails.code,
      setpersonalDetails.date_of_birth = this.props.personalDetails.dateOfBirth.split('T')[0]
    setpersonalDetails.password = this.props.personalDetails.password
    setpersonalDetails.aadhar_card_file_data = this.props.personalDetails.aadharFileName
    dataTobesend["personal_details"] = setpersonalDetails
    let finalEducationList = []
    for (let value of this.props.qualificationList.educationList) {
      let finalEducation = {}
      finalEducation.qualification = value.qualification.key;
      finalEducation.major = value.major.key;
      finalEducation.specialization = value.specialization.key || 1;
      finalEducation.university = value.university.key;
      finalEducation.institute = value.institute.key;
      finalEducation.grading_system = value.gradingsystem.key;
      finalEducation.start_date = this.setdateFormat(value.startdate);
      finalEducation.completion_date = this.setdateFormat(value.enddate);
      finalEducation.board = value.board;
      finalEducation.percentage = value.marks;
      finalEducation.passed_year = value.passoutyear;
      finalEducation.medium = value.medium;
      finalEducationList.push(finalEducation)
    }
    const {employmentList} = this.state
    let finalEmploymentList = []
    for (let experience of employmentList) {
      let finalExp = {}
      finalExp.is_current_job = experience.hasOwnProperty('is_current_job') ? experience.is_current_job : false;
      finalExp.job_title = experience.job_title.key;
      finalExp.notice_period = experience.notice_period;
      finalExp.annual_salary = experience.annual_salary;
      finalExp.company_name = experience.company_name.key;
      finalExp.description = experience.description;
      finalExp.country = experience.country.key;
      finalExp.city = experience.city.key;
      finalExp.state = experience.state.key;
      finalExp.start_date = this.setdateFormat(experience.start_date);
      finalExp.end_date = this.setdateFormat(experience.end_date);
      finalEmploymentList.push(finalExp)
    }
    dataTobesend["education_details"] = finalEducationList
    dataTobesend["is_fresher"] = false;
    dataTobesend["skills"] = this.props.qualificationList.skills
    dataTobesend["break"] = {'break_reason': this.state.break_reason, 'break_duration': this.state.break_duration}
    dataTobesend["work_details"] = finalEmploymentList;
    dataTobesend["armed_forces"] = this.state.armedForces
    let resumeData = [];
    try {
      if (this.state.resumes.document) {
        let docResume = {resume_type: '', data: ''};
        docResume.resume_type = 'document';
        docResume.data = this.state.resumes.document;
        resumeData.push(docResume);
      }
      if (this.props.location.state.videoUrl) {
        let videoResume = {resume_type: '', data: ''};
        videoResume.resume_type = 'video';
        videoResume.data = this.state.resumes.video;
        resumeData.push(videoResume);
      }
    } catch (e) {
    }
    dataTobesend['resume'] = resumeData;
    apiCall('post', dataTobesend, JOB_SEEKER_REGISTRATION).then(res => {
      if (res.status) {
        this.props.history.push({
            pathname: '/success-page'
          }
        )
      }
      else {
      }
    }).catch((e) => {
    })
  }

  isEntireFormValid = () => {
    for (let formId in this.errorsInForms) {
      if (this.errorsInForms[formId]) return false;
    }
    return true
  };

  setdateFormat(date) {
    return new Date(date).getFullYear() + "-" + new Date(date).getMonth() + "-" + new Date(date).getDate()
  }

  /**
   * @function to add new employment block to the list
   * @param event
   */
  addEmployment(event) {
    event.preventDefault();
    const employmentList = [...this.state.employmentList];
    employmentList.push({
      is_current_job: false,
      start_date: '',
      end_date: '',
      job_title: '',
      annual_salary: '',
      notice_period: '',
      country: '',
      state: '',
      city: '',
      description: '',
      company_name: ''
    });
    this.setState({employmentList});
  }

  /**
   * @function to update experience data
   * @param data
   * @param key
   */
  changeExperienceData(data, key) {
    const experience = [...this.state.employmentList];
    experience.splice(key, 1, data);
    this.setState({employmentList: experience, checkExpericeceErrors: false});
  }

  componentWillMount() {
    if (!this.props.personalDetails || !this.props.personalDetails.code) {
      this.props.history.push({
        pathname: '/jobseeker-signup',
      });
    }
    if (this.props.employmentDetails.hasOwnProperty('experienceList')) {
      const employmentDetails = this.deepCopy(this.props.employmentDetails);
      const {experienceList, break_reason_check, is_details_valid, terms_and_conditions, breakReasonOption, termAndConditionStatus, resumes} = employmentDetails;
      let resums = this.state.resumes;
      resums.document = resumes.document;
      this.setState({
        employmentList: experienceList,
        break_reason_check,
        is_details_valid,
        terms_and_conditions,
        breakReasonOption,
        termAndConditionStatus,
        resumes: resums
      });
    }

    //Here checking recorded video url is exist or not
    if (this.props.location.state.hasOwnProperty('videoUrl')) {
      let resumes = this.state.resumes;
      resumes.video = this.props.location.state.videoUrl;
      this.setState({resumeType: 'video', resume: {name: this.props.location.state.videoUrl, resumes: resumes}});
    }
  }

  /**
   * @function to remove employment block from the employment list
   * @param experienceIndex
   */
  removeEmployment(experienceIndex) {
    if (experienceIndex > 0) {
      const employmentList = this.state.employmentList;
      employmentList.splice(experienceIndex, 1);
      this.setState({employmentList: employmentList})
    }

  }

  /**
   * @function to add new selected skill to the existing skills list
   * @param e
   */
  addSkill = (e) => {
    let newArray = [...this.state.skills];
    newArray = [...newArray, e];
    this.setState({skills: newArray, tempSkill: ''});
  };

  /**
   * @function to remove skill from selected skills
   * @param e
   */
  removeSkill = (e) => {
    let newArray = [...this.state.skills];
    var index = newArray.indexOf(e);
    if (index !== -1) {
      newArray.splice(index, 1);
      this.setState({skills: newArray});
    }
  };

  /**
   * @function to set the break reason in the state
   * @param event
   */
  setBreakReason(event) {
    if (event.currentTarget.checked) {
      this.setState({break_reason_check: true, break_reason_error: ''})
    } else {
      this.setState({break_reason_check: false, break_reason_error: ''})
    }
  }

  /**
   * @function to check, whether checkboxes are checked or not
   * @param event
   */
  setCorrectDetails(event) {
    if (event.currentTarget.checked) {
      this.setState({
        is_details_valid: true,
      })
    } else {
      this.setState({
        is_details_valid: false
      })
    }
  }

  /**
   * @function to set the terms and conditions of the checkbox
   * @param event
   */
  setTermsandConditions(event) {
    if (event.currentTarget.checked) {
      this.setState({
        terms_and_conditions: true,
      })
    } else {
      this.setState({
        terms_and_conditions: false,
      })
    }
  }

  /**
   * @function to check the file size in firefox
   * @param files
   * @return {boolean}
   */
  checkFileSizeFF(files) {
    const filesize = files[0].size;
    return filesize / (1024 * 1024) > 2;
  }

  /**
   * @function to check the file size in IE
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
   * @function to check, file size and format. if valid sending file to the server and
   * storing the file name in the state
   * @param files
   */
  uploadOnChange = (files) => {
    const filesize = (files[0].size) / (1024 * 1024);
    if (filesize > 2) {
      let resumes = this.state.resumes;
      resumes['document'] = '';
      return this.setState({
        file_error: "Document size cannot be more than 2 MB",
        resume: '',
        resumes: resumes
      })
    }
    if (files && files[0]) {
      if (!fileValidation(files[0], 2, ["doc", "docx", "ppt", "pdf"])) {
        let resumes = this.state.resumes;
        resumes['document'] = '';
        return this.setState({
          file_error: "Only PDF, DOC, DOCX and PPT type files are allowed",
          resume: '',
          resumes: resumes
        })
      }
      let formData = new FormData();
      formData.append('document', files[0]);
      apiCall('post', formData, AADHAR_UPDATE).then(res => {
        let resumes = this.state.resumes;
        resumes['document'] = res.data;
        this.setState({
          resumes: resumes
        });
      }).catch((e) => {
      })
    }
  };

  /**
   * @function to reset the file in the state
   * @param e
   */
  onFileClear = (e) => {
    let resumes = this.state.resumes;
    switch (e) {
      case 'document':
        resumes.document = '';
        this.setState({resumes: resumes, file_error: '', resumeType: 'document'});
        break;

      case 'video':
        resumes.video = '';
        this.setState({resumes: resumes, file_error: '', resumeType: 'document'});
        break;

      default:
        break
    }
  };

  /**
   * @function to update break down list in the state
   * @param name
   * @param data
   */
  setBreakDownList = (name, data) => {
    if (data !== null) {
      this.setState({
        break_reason: data.value,
      });
    }
  };

  /**
   * @function to set selected breakdown option in the state
   * @param option
   */
  setBreakDownListOption = (option) => {
    if (option) {
      this.setState({
        breakReasonOption: option.label,
        break_reason: option.label === 'Others' ? '' : option.label,
      });
    }
  };

  /**
   * @function to set selected breakdown reason in the state
   * @param e
   */
  setBreakDownListReason = (e) => {
    if (e.target.value.length <= 300) {
      this.setState({
        break_reason: e.target.value,
      });
    }
  };

  /**
   * @function to set break duration in the state
   * @param name
   * @param data
   */
  setBreakDuration = (name, data) => {
    if (data !== null) {
      this.setState({
        break_duration: data.value,
      });
    }
  };

  /**
   * @function to set the selected break duration option in the state
   * @param option
   */
  setBreakDurationOption = (option) => {
    if (option) {
      const {experience} = this.state
      this.setState({
        break_duration: option.label,
      });
    }
  };

  /**
   * @function to update all experience details of jobseeker in the redux store
   */
  sendExpDetailsToRedux = () => {
    let experienceDetails = {
      experienceList: this.state.employmentList,
      is_details_valid: this.state.is_details_valid,
      terms_and_conditions: this.state.terms_and_conditions,
      break_reason_check: this.state.break_reason_check,
      breakReasonOption: this.state.breakReasonOption,
      termAndConditionStatus: this.state.termAndConditionStatus,
      resumes: this.state.resumes
    };
    this.props.updateJobSeekerSignupExperienceDetails(JSON.parse(JSON.stringify(experienceDetails)));
  };

  errorsInForms = [];
  allFormsRefs = {};

  render() {
    const {employmentList, checkExpericeceErrors} = this.state;
    const stateVariable = this.state;
    return (
      <div className="jobseeker-signup">
        <form className="jobseeker-education">
          <div className="jobseeker-heading">Sign up for Employee</div>
          {employmentList.map((employment, key) => (
            <WorkExperience
              employment={employment}
              onRef={ref => (this.allFormsRefs[key] = ref)}
              key={uuid()}
              checkExpericeceErrors={checkExpericeceErrors}
              onChange={data => {
                this.changeExperienceData(data, key);
              }}
              index={key}
              validationCheck={this.onValidationChange}
              checkedForErrors={error => {
                this.checkValidation = error
                this.errorsInForms[key] = error
              }}
              removeEmployment={this.removeEmployment}
            />
          ))}
          <table className="add-experience">
            <tbody>
            <tr>
              <td>
                <button className="default_button" onClick={(e) => this.addEmployment(e)}>
                  Add More
                </button>
              </td>
            </tr>
            </tbody>
          </table>
          {this.renderBlock(employmentList, stateVariable)}
        </form>
      </div>
    );
  }

  /**
   * @function to update the armed forces checkbox state
   * @param e
   */
  onArmedForcesChange = (e) => {
    this.setState({armedForces: e.target.checked});
  };

  /**
   * @function is employment block, which indicates the each jobseeeker experience
   * @param employmentList
   * @param stateVariable
   * @return {XML}
   */
  renderBlock(employmentList, stateVariable) {
    const {classes} = this.props;
    return (
      <div className="static-div">
        <Grid container spacing={16}>
          <Grid item xs={12} style={{marginBottom: '23px'}}>
            <FormControl style={{width: '100%'}}>
              <InputLabel htmlFor="adornment-password" style={{fontSize: '14px'}}>
                Resume
              </InputLabel>
              <label style={{width: '132px', height: 0}}>
                <Button
                  style={{marginTop: '45px'}}
                  variant="contained"
                  component="span"
                  className="default_button"
                  onClick={this.handleClickOpen}>Upload</Button>
              </label>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                {this.state.resumes.document ? <span id="aadhar-upload" style={{bottom: '36%'}}>
                  {this.state.resumes.hasOwnProperty('document') && this.state.resumes.document.split('/')[this.state.resumes.document.split('/').length - 1]}
                  <CustomIcon icon={close} onClick={() => this.onFileClear("document")}/>
                  </span> : null}
                {this.state.resumes.video ? <span id="aadhar-upload" style={{bottom: '4%'}}>
                     {this.state.resumes.hasOwnProperty('video') && this.state.resumes.video.split('/')[this.state.resumes.video.split('/').length - 1]}
                  <CustomIcon icon={close} onClick={() => this.onFileClear("video")}/>
                  </span> : null}
              </div>
              <FormHelperText className="mt-92" error={this.state.file_error !== ''} id="file_error">
                  <span className="field_error">
                    {this.state.file_error}
                  </span>
              </FormHelperText>
            </FormControl>
          </Grid>
          <Modal
            open={this.state.open}
            onClose={this.handleClose}
          >
            <div>
              <UploadDialog handleClose={this.handleClose} sendExpDetailsToRedux={this.sendExpDetailsToRedux}
                            onFileUpload={this.uploadOnChange} {...this.props}></UploadDialog>
            </div>
          </Modal>
        </Grid>
        <Grid item xs={12}>
          <Checkbox style={{paddingLeft: '0px'}} onChange={this.setBreakReason.bind(this)}></Checkbox>
          <span>Back from break</span>
        </Grid>
        {stateVariable.break_reason_check ?
          <Grid container spacing={16}>
            <Grid item xs={6} className="pb-24">
              <InputLabel
                style={{marginTop: 0}}
                className="change-label-style"
                shrink={true}
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                  error: classes.cssError
                }}
              >
                {'Reason'}
              </InputLabel>
              <NonCreatableSingleSelectDropdown
                getSelectedOption={(option) => this.setBreakDownListOption(option)}
                defaultValue={stateVariable.break_reason ? {
                  value: stateVariable.break_reason,
                  label: stateVariable.break_reason
                } : ''}
                options={breakReasonList}
                error={''}
              />
            </Grid>
            <Grid item xs={6} style={{marginBottom: 0}}>
              <InputLabel
                style={{marginTop: 0}}
                className="change-label-style"
                shrink={true}
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                  error: classes.cssError
                }}
              >
                {'Since'}
              </InputLabel>
              <NonCreatableSingleSelectDropdown
                getSelectedOption={(option) => this.setBreakDurationOption(option)}
                defaultValue={stateVariable.break_duration ? {
                  value: stateVariable.break_duration,
                  label: stateVariable.break_duration
                } : ''}
                options={breakDurationList}
                error={''}
              />
            </Grid>
          </Grid> : null
        }
        {stateVariable.break_reason_check && stateVariable.breakReasonOption == 'Others' ?
          <Grid container spacing={16}>
            <FormControl className="px-8 mt-16" style={{width: '100%'}}>
              <TextField
                id="standard-error"
                InputLabelProps={{
                  shrink: true
                }}
                label={<span style={{color: '#656565', fontFamily: 'Roboto', fontSize: '14px', fontWeight: '400'}}>Reason</span>}
                value={stateVariable.break_reason}
                onChange={this.setBreakDownListReason}
              />
            </FormControl>
            <div className="profile-character-info characters-left-style pb-28 mr-8">
              <div className="characters-left-style-text">Character left: <span
                style={{color: '#f0582b'}}>{300 - stateVariable.break_reason.length}</span></div>
            </div>
          </Grid>
          : null}
        <Grid item xs={12}>
          <Checkbox style={{paddingLeft: '0px'}} onChange={this.onArmedForcesChange}></Checkbox>
          <span>Armed forces</span>
        </Grid>
        <Grid item xs={12} style={{marginTop: '0px'}}>
          {!stateVariable.is_details_valid && stateVariable.termAndConditionStatus.is_details_valid_touched ?
            <Checkbox onChange={this.setCorrectDetails.bind(this)} labelStyle={{fill: 'black'}}
                      iconStyle={{color: 'green'}} style={{paddingLeft: '0px', color: 'red'}}></Checkbox>
            :
            <Checkbox onChange={this.setCorrectDetails.bind(this)} labelStyle={{fill: 'black'}}
                      iconStyle={{color: 'green'}} checked={stateVariable.is_details_valid}
                      style={{paddingLeft: '0px'}}></Checkbox>
          }
          <span>I agree with all the details entered above</span>
        </Grid>
        <Grid item xs={12} style={{marginTop: '0px'}}>
          {!stateVariable.terms_and_conditions && stateVariable.termAndConditionStatus.terms_and_conditions_touched ?
            <Checkbox onChange={this.setTermsandConditions.bind(this)} labelStyle={{fill: 'black'}}
                      iconStyle={{color: 'green'}} style={{paddingLeft: '0px', color: 'red'}}></Checkbox>
            :
            <Checkbox onChange={this.setTermsandConditions.bind(this)} labelStyle={{fill: 'black'}}
                      iconStyle={{color: 'green'}} checked={stateVariable.terms_and_conditions}
                      style={{paddingLeft: '0px'}}></Checkbox>
          }
          <span>I agree with terms and conditions of Shenzyn</span>
        </Grid>
        <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
          <button type="button" className="solid_button" onClick={(e) => this.handleErrors(e)}>
            Register
          </button>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  qualificationList: state.default.jobSeekerSignupFormData.educationalDetails,
  personalDetails: state.default.jobSeekerSignupFormData.personalDetails,
  employmentDetails: state.default.jobSeekerSignupFormData.employmentDetails,
});

const mapDispatchToProps = dispatch => ({
  updateJobSeekerSignupPersonalDetails: bindActionCreators(
    actions.EmpSignUpFormActions.updateJobSeekerSignupPersonalDetails,
    dispatch,
  ),
  updateJobSeekerSignupExperienceDetails: bindActionCreators(
    actions.EmpSignUpFormActions.updateJobSeekerSignupExperienceDetails,
    dispatch,
  ),
});

JobSeekerEmploymentDetails.propTypes = {classes: PropTypes.object.isRequired};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(JobSeekerEmploymentDetails));
