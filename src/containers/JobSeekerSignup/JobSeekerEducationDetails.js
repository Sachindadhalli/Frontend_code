//library dependencies
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import uuid from 'uuid/v4';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
//styles
import './style.scss';
//custom components
import AutoCompleteSearch from '../../components/AutoCompleteSearch';
import QualificationBlock from './components/QualificationBlock';
//utilities
import * as actions from '../../actions';
import {EMPLOYEE_EDUCATION_DETAILS, JOB_SEEKER_REGISTRATION} from "../../../config/constants";
import {apiCall, FilterAlreadySelectedOnes, handleLocalStorage} from "../../Utilities";

// material ui style customizations
const styles = theme => ({
  root: {display: 'flex', flexWrap: 'wrap'},
});

class EducationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      tempSkill: '',
      qualificationList: [
        {
          qualification: {value: 'Graduation/Diploma', key: 1},
          major: '',
          specialization: '',
          gradingsystem: '',
          institute: '',
          university: '',
          startdate: '',
          enddate: '',
          marks: '',
          board: '',
          medium: '',
          passoutyear: '',
        },
      ],
      filteredQualification: [],
      originalQualification: [],
      checkForErrors: false,
      showSkillsError: false,
    };
    this.addSkill = this.addSkill.bind(this);
    this.removeSkill = this.removeSkill.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addQualification = this.addQualification.bind(this);
    this.removeQualification = this.removeQualification.bind(this);
    this.userType = 1;
  }

  errorsInForms = {};

  /**
   * @function to update filtered qualifications,
   * means removing selected qualifications from the dropdown and
   */
  setFilteredQualification = () => {
    const result = FilterAlreadySelectedOnes(this.state.qualificationList, this.state.originalQualification, 'qualification');
    this.setState({
      filteredQualification: result
    })
  };

  /**
   * @function getting matched skills with user entered text
   * @param data
   */
  onInputChange(data) {
    if (data && data.value) {
      const {skills} = this.state;
      if (skills.length >= 50) return this.setState({showSkillsError: "Maximum 50 skills are allowed"});
      if (data.value.length > 20) return this.setState({showSkillsError: "Skill Must be lesser than 20 characters"});
      this.setState({showSkillsError: ''});
      const idx = skills.findIndex(skill => skill.value === data.value);
      if (idx < 0 && data.value.trim().length <= 300) {
        this.setState({
          skills: [...skills, {...data}],
        });
      }
    }
  }

  /**
   * @function to check validations of eductionBlocks(form fields) by calling child function validateOnRegister
   * if all blocks valid sending data to the server
   * @param e
   * @return {Promise.<void>}
   */
  async handleSubmit(e) {
    let canSubmit = true;
    for (let child in this.allFormsRefs) {
      if (this.allFormsRefs[child]) {
        /*
        checking each qualification block validations
         */
        let isItInvalid = this.allFormsRefs[child].validateOnRegister();
        if (isItInvalid) canSubmit = false;
      }
    }
    // if any error occur, returning without api call
    if (!this.isEntireFormValid() || !canSubmit) {
      return;
    }
    e.preventDefault();
    let skilsError = false;
    const idx = [...this.state.qualificationList].findIndex(
      qualification => qualification.qualification.key === 6,
    );
    if (idx >= 0) {
      if (this.state.skills.length <= 0) {
        skilsError = true;
        this.setState({
          showSkillsError: 'Kindly specify your Skills',
        });
      }
    }
    if (skilsError) return;
    let finalSkills = [];
    for (let skill of this.state.skills) {
      if (skill.key) finalSkills.push(skill.key);
      else finalSkills.push(skill.value);
    }

    /*
    checking experience type,
    if type is fresher, form data will go to the server
     */
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.experienceType === 'fresher'
    ) {
      let dataTobesend = {};
      let setpersonalDetails = {};
      setpersonalDetails.first_name = this.props.personalDetails.firstName,
        setpersonalDetails.last_name = this.props.personalDetails.lastName,
        setpersonalDetails.email_id = this.props.personalDetails.email,
        setpersonalDetails.mobile_number = localStorage.getItem('mobile_Verification_token'),
        setpersonalDetails.country_code = this.props.personalDetails.code,
        setpersonalDetails.date_of_birth = this.props.personalDetails.dateOfBirth.getFullYear() + '-' + (this.props.personalDetails.dateOfBirth.getMonth() + 1) + '-' + this.props.personalDetails.dateOfBirth.getDate()
      setpersonalDetails.password = this.props.personalDetails.password
      setpersonalDetails.aadhar_card_file_data = this.props.personalDetails.aadharFileName
      dataTobesend["personal_details"] = setpersonalDetails
      let finalEducationList = [];
      for (let value of this.state.qualificationList) {
        let finalEducation = {};
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
      dataTobesend["education_details"] = finalEducationList;
      dataTobesend["is_fresher"] = true;
      dataTobesend["skills"] = finalSkills;
      apiCall('post', dataTobesend, JOB_SEEKER_REGISTRATION).then(res => {
        if (res.status) {
          this.props.history.push({pathname: '/success-page'})
        }
      }).catch((e) => {
      });
      return;
    }

    // if type is experienced, form data will be store in the redux store and
    // redirect to the next step(employment details)
    let educationalDetails = {educationList: this.state.qualificationList, skills: finalSkills};
    this.props.updateJobSeekerEducationDetails(educationalDetails);
    this.props.history.push({
      pathname: '/jobseeker-signup/employment',
      state: {
        experienceType: this.props.location.state.experienceType,
      },
    });
  }

  /**
   * @function to check form data is valid or not
   * @return {boolean}
   */
  isEntireFormValid = () => {
    for (let formId in this.errorsInForms) {
      if (this.errorsInForms[formId]) return false;
    }
    return true
  };

  /**
   * @function convert date into required format
   * @param date
   * @return {string}
   */
  setdateFormat(date) {
    return new Date(date).getFullYear() + "-" + new Date(date).getMonth() + "-" + new Date(date).getDate()
  }

  componentWillMount() {
    // getting user type
    this.userType =
      this.props.location.state && this.props.location.state.experienceType === 'professional' ? 2 : 1;
    // get token from local storage
    const token = handleLocalStorage('get', 'employerLogin');
    this.headers = {
      'authorization': token,
      'Content-Type': 'application/json',
    };
    // api  call to get qualifications
    apiCall('get', {"format": "json"}, EMPLOYEE_EDUCATION_DETAILS, this.headers).then(response => {
      this.setState({
        filteredQualification: response.data,
        originalQualification: response.data
      }, () => {
        this.setFilteredQualification()
      });
    });
    if (!this.props.personalDetails || !this.props.personalDetails.code) {
      this.props.history.push({
        pathname: '/jobseeker-signup',
      });
    }
  }

  /**
   * @function add new qualification to the existing qualificationList
   * @return {number}
   */
  addQualification() {
    const qualificationList = [...this.state.qualificationList];
    if (qualificationList.length >= 6) {
      return 0
    }
    qualificationList.push({
      qualification: this.state.filteredQualification[0],
      major: '',
      specialization: '',
      gradingsystem: '',
      institute: '',
      university: '',
      startdate: '',
      enddate: '',
      marks: '',
      board: '',
      medium: '',
      passoutyear: '',
    });
    this.setState({ qualificationList }, () => {
        this.setFilteredQualification();
      });
    this.errorsInForms[qualificationList.length - 1]
  }

  /**
   * @function to update qualificationList on qualification dropdown change
   * @param data
   * @param key
   */
  changeQualificationData(data, key) {
    const qualification = [...this.state.qualificationList];
    qualification.splice(key, 1, data);
    this.setState({
      qualificationList: qualification,
      checkForErrors: false,
    });
  }

  /**
   * @function to delete qualification block from the created qualification blocks
   * @param key
   */
  removeQualification(key) {
    if (this.state.qualificationList.length >= 2) {
      const qualificationList = [...this.state.qualificationList];
      qualificationList.splice(key, 1);
      this.setState({
        qualificationList,
      }, () => {
        this.setFilteredQualification();
      });
    }
  }

  /**
   * @function to add new skill to existing skills list
   * @param e
   */
  addSkill(e) {
    if (this.state.tempSkill !== '' && this.state.tempSkill !== null && e) {
      let newArray = [...this.state.skills];
      newArray = [...newArray, e];
      this.setState({skills: newArray, tempSkill: ''});
    }
  }

  /**
   * @function to delete required skill from the skills list
   * @param item
   */
  removeSkill(item) {
    const newArray = [...this.state.skills];
    const index = newArray.findIndex(arrayItem => item.key == arrayItem.key);
    if (index !== -1) {
      newArray.splice(index, 1);
      this.setState({skills: newArray});
    } else {
    }
  }

  allFormsRefs = {};
  render() {
    const {classes} = this.props;
    const {qualificationList, checkForErrors, showSkillsError, filteredQualification} = this.state;
    return (
      <div className="jobseeker-signup">
        <div className="jobseeker-education">
          <div className="jobseeker-heading">Sign up for Employee</div>
          {qualificationList.map((qualification, key) => (
            <QualificationBlock
              onRef={ref => (this.allFormsRefs[key] = ref)}
              qualification={qualification}
              key={uuid()}
              indexKey={key}
              checkForErrors={checkForErrors}
              onChange={data => {
                this.changeQualificationData(data, key);
              }}
              checkedForErrors={error => {
                this.errorsInForms[key] = error;
              }}
              removeQualification={this.removeQualification}
              filteredQualification={filteredQualification}
              setFilteredQualification={this.setFilteredQualification}
            />
          ))}
          <AutoCompleteSearch
            label="Add Skills"
            id="tempSkill"
            type="text"
            selectedValues={[]}
            filterKey="value"
            apiUrl="job-seeker-registration/get-skill-set/"
            width="90%"
            icon="none"
            onClose={(name, data) => {
              if (data != null && data.value !== '')
                this.onInputChange(data);
            }}
            queryWith="search"
            otherData={{format: 'json'}}
            showError={showSkillsError}
          />
          <div className="added-skills">
            {this.state.skills.map(item => (
              <span className="skill-list">
                <Chip
                  label={item.value}
                  onDelete={() => this.removeSkill(item)}
                  className={classes.chip}
                />
              </span>
            ))}
          </div>
          <table>
            <tbody>
            <tr>
              <td>
                <button className="default_button" onClick={this.addQualification}
                        disabled={qualificationList.length >= 6}
                        style={qualificationList.length >= 6 ? {'cursor': 'not-allowed'} : null}>
                  Add More
                </button>
              </td>
              <td>
                <button className="solid_button" onClick={this.handleSubmit}>
                  {this.userType === 2 ? 'Next' : 'Register'}
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  personalDetails: state.default.jobSeekerSignupFormData.personalDetails,
});

const mapDispatchToProps = dispatch => ({
  updateJobSeekerEducationDetails: bindActionCreators(
    actions.EmpSignUpFormActions.updateJobSeekerSignupEducationalDetails,
    dispatch,
  ),
});

EducationDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(EducationDetails));
