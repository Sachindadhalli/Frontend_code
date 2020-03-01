import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import CustomTag from '../../../../../components/CustomTag';
import CustomIcon from '../../../../../components/CustomIcon/CustomIcon';
import validateDesignation from '../../../../../Utilities/validateDesignation';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AutoCompleteNew from '../../../../../components/AutoCompleteNew';
//import './style.scss';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import { TextField, withStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
// import UserBasicDetailsView from '../../../UserProfileFresherView/components/UserBasicDetailsView/UserBasicDetailsView';
import LabelValueComponent from '../../../../../components/ReusableComponents/LabelValueComponent/LabelValueComponent';
import { withRouter } from 'react-router-dom';
import customisedMaterial from '../../../../../styles/customisedMaterial';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import dropdown from '../../../../../../assets/media/icons/dropdown.svg';
import axios from 'axios';
import {
  CURRENCY,
  SERVER_API_URL,
  SERVER_API_PATH,
  EMPLOYEE_EDUCATION_DETAILS,
  INDUSTRY,
  GRADING_SYSTEM,
} from '../../../../../../config/constants';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { apiCall, isObjectAlreadyExist, calculateTotalCount } from '../../../../../Utilities/';
import deleteIcon from '../../../../../../assets/media/icons/deleteIcon.svg';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import InputAdornment from '@material-ui/core/InputAdornment';
import calendar from '../../../../../../assets/media/icons/calendar.svg';
import CreatableRemoteDataSingleSelectDropdown from '../../../../../components/SingleSelectDropdownWrapper/components/CreatableRemoteDataSingleSelectDropdown/CreatableRemoteDataSingleSelectDropdown';

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
  Input: {
    flexBasis: 200,
  },
  button: {
    margin: '11px',
    borderRadius: '20px',
  },
  input: {
    display: 'none',
  },
  formControl: {
    marginBottom: '5px',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  ...customisedMaterial,
  label: {
    fontWeight: 'normal',
    fontSize: '16px',
    color: 'black',
  },
});
const allDropDownWidth = {
  rightHalf: '100%',
  leftHalf: '47.5%',
  fullWidth: '100%',
};
const experiences_year = [];
for (let i = 1; i <= 30; i++) {
  experiences_year.push(i.toString());
}
const experiences_month = [];
for (let i = 1; i <= 12; i++) {
  experiences_month.push(i.toString());
}
const majorTypes = [
  { key: 1, value: 'B.Tech' },
  { key: 2, value: 'Diploma' },
  { key: 3, value: 'M.Tech' },
  { key: 4, value: 'BE' },
  { key: 5, value: 'Phd' },
];
const boardTypes = [
  { key: 1, value: 'ICSE' },
  { key: 2, value: 'CBSE' },
  { key: 3, value: 'State' },
  { key: 4, value: 'BE' },
  { key: 5, value: 'Phd' },
];
const mediumTypes = [
  { key: 1, value: 'English' },
  { key: 2, value: 'Hindi' },
  { key: 3, value: 'kannada' },
];
class EducationEdit extends React.Component {
  constructor(props) {
    super(props);
    this.resetErrors();
    this.state = {
      majors: [],
      desired_profile: [],
      //creating array with object
      educationList: [
        {
          qualification: '',
          start_date: '',
          com_date: '',
          major: '',
          university: '',
          institute: '',
          grading: '',
          marks: '',
          board: '',
          passing_out: '',
          medium: '',
          total_marks: '',
        },
      ],
      name_error: '',
      start_date: '',
      com_date: '',
      start_date_error: '',
      com_date_error: '',
      qualification_error: '',
      major_error: '',
      university_error: '',
      institute_error: '',
      grading_error: '',
      marks_error: '',
      board_error: '',
      passing_out_error: '',
      medium_error: '',
      total_marks_error: '',
      qualification: '',
      major: '',
      university: '',
      institute: '',
      grading: '',
      marks: '',
      board: '',
      passing_out: '',
      medium: '',
      total_marks: '',
    };
    this.checkForErrors = this.checkForErrors.bind(this);
    this.getUniversities = this.getUniversities.bind(this);
    this.getMajors = this.getMajors.bind(this);
  }
  componentWillMount() {
    const yearsArray = [];
    for (let i = 1950; i <= new Date().getFullYear(); i++) {
      yearsArray.push({ value: i, key: i });
    }
    this.setState({
      passoutyears: yearsArray,
    });

    this.getMajors(this.state.major);
  }

  componentDidMount() {
    if (this.props.checkForErrors == true) {
      this.checkForErrors();
    }
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(null);
  }
  getMajors(data) {
    axios
      .get(`${SERVER_API_URL + SERVER_API_PATH}job-seeker-registration/get-majors/`, {
        params: { key: data.key, format: 'json' },
        headers: { 'content-Type': 'application/json' },
      })
      .then(res => {
        // console.log(res);
        if ([1, 2, 3].indexOf(data.key) >= 0) {
          this.setState({
            majors: res.data && res.data.data ? res.data.data : [],
          });
        } else if ([4, 5].indexOf(data.key) >= 0) {
          this.setState({
            boards: res.data && res.data.data && res.data.data.board ? res.data.data.board : [],
            mediums: res.data && res.data.data && res.data.data.medium ? res.data.data.medium : [],
          });
        }
      })
      .catch(err => {
        // console.log(err);
      });
  }
  checkForErrors() {
    let error = false;
    if (typeof this.state.qualification === 'string' || this.state.qualification == '') {
      error = true;
      this.setState({
        qualification_error: 'Kindly specify your Qualification',
      });
    }
    if (typeof this.state.major === 'string' || this.state.major == '') {
      error = true;
      this.setState({
        major_error: 'Kindly specify your Major',
      });
    }
    if (typeof this.state.university === 'string' || this.state.university == '') {
      error = true;
      this.setState({
        university_error: 'Kindly specify your University',
      });
    }
    if (typeof this.state.institute === 'string' || this.state.institute == '') {
      error = true;
      this.setState({
        institute_error: 'Kindly specify your Institute',
      });
    }
    if (typeof this.state.start_date === 'string' || this.state.start_date == '') {
      error = true;
      this.setState({
        start_date_error: 'Kindly specify your Start Date',
      });
    }
    if (typeof this.state.com_date === 'string' || this.state.com_date == '') {
      error = true;
      this.setState({
        com_date_error: 'Kindly specify your Completion Date',
      });
    }
    if (typeof this.state.grading === 'string' || this.state.grading == '') {
      error = true;
      this.setState({
        grading_error: 'Kindly specify your Grading System',
      });
    }
    if (typeof this.state.marks === 'string' || this.state.marks == '') {
      error = true;
      this.setState({
        marks_error: 'Kindly specify your Marks',
      });
    }
    if (typeof this.state.board === 'string' || this.state.board == '') {
      error = true;
      this.setState({
        board_error: 'Kindly specify your Board',
      });
    }
    if (typeof this.state.passing_out === 'string' || this.state.passing_out == '') {
      error = true;
      this.setState({
        passing_out_error: 'Kindly specify your Passing Out Year',
      });
    }
    if (typeof this.state.medium === 'string' || this.state.medium == '') {
      error = true;
      this.setState({
        medium_error: 'Kindly specify your Medium',
      });
    }
    if (typeof this.state.total_marks === 'string' || this.state.total_marks == '') {
      error = true;
      this.setState({
        total_marks_error: 'Kindly specify your Total Marks',
      });
    }
  }
  resetErrors = () => {
    // console.log('reset errors called.')
    this.setState({
      name_error: '',
      start_date_error: '',
      com_date_error: '',
      qualification_error: '',
      major_error: '',
      university_error: '',
      institute_error: '',
      grading_error: '',
      marks_error: '',
      board_error: '',
      passing_out_error: '',
      medium_error: '',
      total_marks_error: '',
    });
  };
  handleInput = (e, validatorAfterSave = null) => {
    const { name } = e.target;
    this.setState(
      {
        [name]: e.target.value,
        [`${name}_error`]: '',
      },
      () => {
        //debugger;
        this.validateFields(name);
      },
    );
  };
  setDropdownOption = (option, name, validatorAfterSave = null) => {
    const opt = option ? { key: option.value, value: option.label } : '';
    this.setState(
      {
        [name]: opt,
        [`${name}_error`]: '',
      },
      () => {
        this.validateFields(name);
      },
    );
  };
  validateFields = fieldName => {
    switch (fieldName) {
      case 'qualification':
        this.validateQualificationForm();
        break;
      case 'major':
        this.validateMajorForm();
        break;
      case 'university':
        this.validateUniversityForm();
        break;
      case 'institute':
        this.validateInstituteForm();
        break;
      case 'start_date':
        this.validateStartDateForm();
        break;
      case 'com_date':
        this.validateCompletionDateForm();
        break;
      case 'grading':
        this.validateGradingForm();
        break;
      case 'marks':
        this.validateMarksForm();
        break;
      case 'board':
        this.validateBoardForm();
        break;
      case 'passing_out':
        this.validatePassingOutForm();
        break;
      case 'medium':
        this.validateMediumForm();
        break;
      case 'total_marks':
        this.validateTotalMarksForm();
        break;
    }
  };
  //Remove Error on focus
  removeErrorFocus = e => {
    this.setParticularField(e.target.name, '');
  };
  validateQualificationForm = async () => {
    let errorValue = '';
    if (!this.state.qualification || !this.state.qualification.value) {
      errorValue = 'Kindly specify your Qualification';
    }
    this.setParticularField('qualification', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateMajorForm = async () => {
    let errorValue = '';
    if (!this.state.major || !this.state.major.value) {
      errorValue = 'Kindly specify your Major';
    }
    this.setParticularField('major', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateUniversityForm = async () => {
    let errorValue = '';
    if (!this.state.university || !this.state.university.value) {
      errorValue = 'Kindly specify your University';
    }
    this.setParticularField('university', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateInstituteForm = async () => {
    let errorValue = '';
    if (!this.state.institute || !this.state.institute.value) {
      errorValue = 'Kindly specify your Institute';
    }
    this.setParticularField('institute', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateStartDateForm = async () => {
    let errorValue = '';
    if (!this.state.start_date) {
      errorValue = 'Kindly specify your Start Date';
    }
    this.setParticularField('start_date', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };

  validateCompletionDateForm = async () => {
    let errorValue = '';
    if (!this.state.com_date) {
      errorValue = 'Kindly specify your Completion Date';
    }
    this.setParticularField('com_date', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateGradingForm = async () => {
    let errorValue = '';
    if (!this.state.grading || !this.state.grading.value) {
      errorValue = 'Kindly specify your Grading';
    }
    this.setParticularField('grading', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };

  validateMarksForm = async () => {
    let errorValue = '';
    if (!this.state.marks) {
      errorValue = 'Kindly specify your Marks';
    }
    this.setParticularField('marks', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateBoardForm = async () => {
    let errorValue = '';
    if (!this.state.board || !this.state.board.value) {
      errorValue = 'Kindly specify your Board';
    }
    this.setParticularField('board', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validatePassingOutForm = async () => {
    let errorValue = '';
    if (!this.state.passing_out || !this.state.passing_out.value) {
      errorValue = 'Kindly specify your Passing out year';
    }
    this.setParticularField('passing_out', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateMediumForm = async () => {
    let errorValue = '';
    if (!this.state.medium || !this.state.medium.value) {
      errorValue = 'Kindly specify your Medium';
    }
    this.setParticularField('medium', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateTotalMarksForm = async () => {
    let errorValue = '';
    if (!this.state.total_marks) {
      errorValue = 'Kindly specify your Total Marks';
    }
    this.setParticularField('total_marks', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  //assign error value
  setParticularField = (name, value) => {
    const errorName = name + '_error';
    this.setState({
      [errorName]: value,
    });
  };
  getUniversities() {
    axios
      .get('https://test-api.shenzyn.com/pinkjob/job-seeker-registration/get-university/', {
        params: { format: 'json' },
        headers: { 'content-Type': 'application/json' },
      })
      .then(res => {
        // console.log(res);
        this.setState({
          universities: res.data && res.data.data ? res.data.data : [],
        });
      })
      .catch(err => {
        // console.log(err);
      });
  }
  // setUniversityOption = option => {
  //   if (option) {
  //     const { qualification } = this.state;
  //     university = { key: option.value, value: option.label };
  //     this.setState(
  //       {
  //         qualification,
  //         university_error: '',
  //       },
  //       () => {
  //         this.checkForErrors();
  //       },
  //     );
  //   }
  // };
  render() {
    const { rightHalf, year, month, dropdown, leftHalf, fullWidth, allDropDownWidth } = this.props;
    const {
      year1,
      month1,
      qualification,
      major,
      university,
      institute,
      start_date,
      com_date,
      grading,
      marks,
      board,
      passing_out,
      medium,
      total_marks,
      name_error,
    } = this.state;
    const { classes } = this.props;
    const { qualification_id } = this.props;
    const {
      start_date_error,
      com_date_error,
      qualification_error,
      major_error,
      university_error,
      institute_error,
      grading_error,
      marks_error,
      board_error,
      passing_out_error,
      medium_error,
      total_marks_error,
    } = this.state;
    return (
      <div className={'basic-edu-container'}>
        {this.state.educationList.map((educationItem, key) => (
          <div>hello world</div>
        ))}
        <div className="edu-box-1">
          <div style={{ textAlign: 'right' }}>
            <CustomIcon
              style={{ float: 'right' }}
              icon={deleteIcon}
              className="delete-icon"
              // onclick={e => {
              //   this.props.deleteQualifications(qualification_id);
              // }}
            />
          </div>
          <div className="box1">
            <div className="fifth full-form-child">
              <FormControl
                className={'form-child left-child-form ' + classes.formControl}
                // error={industry_error != ''}
                style={{ marginTop: '13px', marginRight: '35px' }}
              >
                <InputLabel
                  style={{ marginTop: '-12px' }}
                  className="change-label-style"
                  shrink={true}
                  classes={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                    error: classes.cssError,
                  }}
                >
                  {'Qualification'}
                </InputLabel>

                <CreatableRemoteDataSingleSelectDropdown
                  isSearchable={true}
                  apiUrl={EMPLOYEE_EDUCATION_DETAILS}
                  queryParams={{ search: '' }}
                  getSelectedOption={option => this.setDropdownOption(option, 'qualification')}
                  defaultValue={
                    qualification.value
                      ? { value: qualification.key, label: qualification.value }
                      : {}
                  }
                  isClearable={true}
                  error={qualification_error ? qualification_error : false}
                />
                {/* {console.log('hint', qualification_error)} */}

                {qualification_error ? (
                  <FormHelperText error={qualification_error} id="firstName_error">
                    <span className="field_error">{qualification_error}</span>
                  </FormHelperText>
                ) : null}
              </FormControl>
              <FormControl
                className="form-child"
                //error={functional_area_error != ''}
                style={{ marginTop: '13px' }}
              >
                <InputLabel
                  style={{ marginTop: '-12px' }}
                  className="change-label-style"
                  shrink={true}
                  classes={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                    error: classes.cssError,
                  }}
                >
                  {'Major'}
                </InputLabel>
                <CreatableRemoteDataSingleSelectDropdown
                  isSearchable={true}
                  // apiUrl={FUNCTIONAL_AREA}
                  queryParams={{ search: '' }}
                  getSelectedOption={option => this.setDropdownOption(option, 'major')}
                  defaultValue={major ? { value: major.key, label: major.value } : {}}
                  options={majorTypes}
                  //options={this.state.majors}
                  isClearable={true}
                  error={major_error ? major_error : false}
                />
                {major_error ? (
                  <FormHelperText error={major_error} id="firstName_error">
                    <span className="field_error">{major_error}</span>
                  </FormHelperText>
                ) : null}
              </FormControl>
            </div>
          </div>
          <div className="box1">
            {/* <FormControl className="form-child">
                <AutoCompleteNew
                  label="University"
                  // onClose={(name, data) => {
                  //   if (data != null && data.value !== '') this.setParticularState('job_role', data);
                  // }}
                  //width={rightHalf}
                  //apiUrl={JOB_ROLE}
                  filterKey={'value'}
                  method="get"
                  //selectedValues={[job_role]}
                />
              </FormControl>
              <FormControl className="form-child">
                <AutoCompleteNew
                  label="Institute"
                  onClose={(name, data) => {
                    if (data != null && data.value !== '') this.setParticularState(data);
                  }}
                  //width={rightHalf}
                  //apiUrl={JOB_ROLE}
                  filterKey={'value'}
                  method="get"
                  //selectedValues={[job_role]}
                />
              </FormControl> */}
            <div className="fifth full-form-child">
              <FormControl
                className={'form-child left-child-form ' + classes.formControl}
                // error={industry_error != ''}
                style={{ marginTop: '13px', marginRight: '35px' }}
              >
                <InputLabel
                  style={{ marginTop: '-12px' }}
                  className="change-label-style"
                  shrink={true}
                  classes={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                    error: classes.cssError,
                  }}
                >
                  {'University'}
                </InputLabel>

                <CreatableRemoteDataSingleSelectDropdown
                  isSearchable={true}
                  apiUrl="job-seeker-registration/get-university/"
                  queryParams={{ search: '' }}
                  getSelectedOption={option => this.setDropdownOption(option, 'university')}
                  // getSelectedOption={option => this.setUniversityOption(option)}
                  defaultValue={
                    university ? { value: university.key, label: university.value } : {}
                  }
                  isClearable={true}
                  error={university_error ? university_error : false}
                />
                {/* {console.log('hint', qualification_error)} */}

                {university_error ? (
                  <FormHelperText error={university_error} id="firstName_error">
                    <span className="field_error">{university_error}</span>
                  </FormHelperText>
                ) : null}
              </FormControl>
              <FormControl
                className="form-child"
                //error={functional_area_error != ''}
                style={{ marginTop: '13px' }}
              >
                <InputLabel
                  style={{ marginTop: '-12px' }}
                  className="change-label-style"
                  shrink={true}
                  classes={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                    error: classes.cssError,
                  }}
                >
                  {'Institute'}
                </InputLabel>
                <CreatableRemoteDataSingleSelectDropdown
                  isSearchable={true}
                  apiUrl="job-seeker-registration/get-institutes/"
                  queryParams={{ search: '' }}
                  getSelectedOption={option => this.setDropdownOption(option, 'institute')}
                  defaultValue={institute ? { value: institute.key, label: institute.value } : {}}
                  isClearable={true}
                  error={institute_error ? institute_error : false}
                />
                {/* {console.log('hint', qualification_error)} */}

                {institute_error ? (
                  <FormHelperText error={institute_error} id="firstName_error">
                    <span className="field_error">{institute_error}</span>
                  </FormHelperText>
                ) : null}
              </FormControl>
            </div>
          </div>

          <Grid container spacing={32}>
            <Grid item xs={12} md={6}>
              <FormControl
                style={{ width: '100%' }}
                className="form-child"
                error={start_date_error ? true : false}
              >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    id="start_date"
                    name="start_date"
                    margin="normal"
                    label="Start Date"
                    //value={start_date}
                    views={['year', 'month']}
                    style={{ marginBottom: '0px', width: '100%' }}
                    maxDate={new Date()}
                    onChange={value =>
                      this.handleInput({ target: { value: value, name: 'start_date' } }, true)
                    }
                    onBlur={() => this.validateFields('start_date')}
                    onFocus={this.removeErrorFocus}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CustomIcon icon={calendar} className="search-icon" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </MuiPickersUtilsProvider>
                {start_date_error && <FormHelperText>{start_date_error}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                style={{ width: '100%' }}
                className="form-child"
                error={com_date_error ? true : false}
              >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    id="com_date"
                    name="com_date"
                    margin="normal"
                    label="Completion Date"
                    // value={com_date}
                    views={['year', 'month']}
                    style={{ marginBottom: '0px', width: '100%' }}
                    maxDate={new Date()}
                    minDate={new Date(start_date)}
                    onChange={value =>
                      this.handleInput({ target: { value: value, name: 'com_date' } }, true)
                    }
                    onBlur={() => this.validateFields('com_date')}
                    onFocus={this.removeErrorFocus}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CustomIcon icon={calendar} className="search-icon" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </MuiPickersUtilsProvider>
                {com_date_error && <FormHelperText>{com_date_error}</FormHelperText>}
              </FormControl>
            </Grid>
          </Grid>

          <div className="fourth full-form-child">
            {/* <FormControl className={'form-child  '}>
                <InputLabel
                  classes={{ root: classes.helperText }}
                  shrink
                  classes={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  }}
                >
                  Grading System
                </InputLabel>
                <Select
                  //value={job_type}
                  //onChange={this.onInputChange}
                  IconComponent={props => (
                    <i {...props} className={`material-icons ${props.className}`}>
                      <img src={dropdown} />
                    </i>
                  )}
                  //name="job_type"
                  classes={{
                    // underline: classes.cssUnderline,
                    focused: classes.cssFocused,
                    root: classes.selectText,
                  }}
                />
              </FormControl> */}
            <FormControl
              className="form-child"
              //error={functional_area_error != ''}
              style={{ marginTop: '13px' }}
            >
              <InputLabel
                style={{ marginTop: '-12px' }}
                className="change-label-style"
                shrink={true}
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                  error: classes.cssError,
                }}
              >
                {'Grading System'}
              </InputLabel>
              <CreatableRemoteDataSingleSelectDropdown
                isSearchable={true}
                apiUrl={GRADING_SYSTEM}
                queryParams={{ search: '' }}
                getSelectedOption={option => this.setDropdownOption(option, 'grading')}
                defaultValue={grading ? { value: grading.key, label: grading.value } : {}}
                isClearable={true}
                error={grading_error ? grading_error : false}
              />
              {/* {console.log('hint', qualification_error)} */}

              {grading_error ? (
                <FormHelperText error={grading_error} id="firstName_error">
                  <span className="field_error">{grading_error}</span>
                </FormHelperText>
              ) : null}
            </FormControl>

            <FormControl
              //error={marks_error !== ''}
              className={'form-child '}
              style={{ marginLeft: '35px' }}
            >
              <InputLabel
                classes={{ root: classes.helperText }}
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                }}
                shrink={true}
                htmlFor="marks"
              >
                Marks
              </InputLabel>
              <Input
                name="marks"
                type="number"
                value={marks}
                onChange={this.handleInput}
                onBlur={() => this.validateFields('marks')}
                onFocus={this.removeErrorFocus}
                autoComplete="off"
                //name="number_of_vacancy"
                //className={classes.Input}
                //value={number_of_vacancy}
                // classes={{
                //   underline: classes.cssUnderline,
                //   focused: classes.cssFocused,
                // }}
                // type="number"
                // margin="normal"
                // onChange={this.onInputChange}
                // onBlur={this.handleBlur}
                error={marks_error ? marks_error : false}
              />
              {/* <FormHelperText className="field_error">{marks_error}</FormHelperText> */}
              {marks_error ? (
                <FormHelperText error={marks_error} id="firstName_error">
                  <span className="field_error">{marks_error}</span>
                </FormHelperText>
              ) : null}
            </FormControl>
          </div>
        </div>
        <div className="edu-box-2">
          <div style={{ textAlign: 'right' }}>
            <CustomIcon
              style={{ float: 'right' }}
              icon={deleteIcon}
              className="delete-icon"
              // onclick={e => {
              //   this.props.deleteQualifications(qualification_id);
              // }}
            />
          </div>
          <div className="box1">
            {/* <FormControl className="form-child">
                <AutoCompleteNew
                  label="Qualification"
                  // onClose={(name, data) => {
                  //   if (data != null && data.value !== '') this.setParticularState('job_role', data);
                  // }}
                  //width={rightHalf}
                  //apiUrl={JOB_ROLE}
                  filterKey={'value'}
                  method="get"
                  //selectedValues={[job_role]}
                />
              </FormControl>
              <FormControl className="form-child">
                <AutoCompleteNew
                  label="Board"
                  //width={rightHalf}
                  //apiUrl={JOB_ROLE}
                  filterKey={'value'}
                  method="get"
                  //selectedValues={[job_role]}
                />
              </FormControl> */}
            <div className="fifth full-form-child">
              <FormControl
                className={'form-child left-child-form ' + classes.formControl}
                // error={industry_error != ''}
                style={{ marginTop: '13px', marginRight: '35px' }}
              >
                <InputLabel
                  style={{ marginTop: '-12px' }}
                  className="change-label-style"
                  shrink={true}
                  classes={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                    error: classes.cssError,
                  }}
                >
                  {'Qualification'}
                </InputLabel>

                <CreatableRemoteDataSingleSelectDropdown
                  isSearchable={true}
                  //apiUrl={INDUSTRY}
                  queryParams={{ search: '' }}
                  getSelectedOption={option => this.setDropdownOption(option, 'qualification')}
                  defaultValue={
                    qualification ? { value: qualification.key, label: qualification.value } : {}
                  }
                  isClearable={true}
                  error={qualification_error ? qualification_error : false}
                />
                {/* {console.log('hint', qualification_error)} */}

                {qualification_error ? (
                  <FormHelperText error={qualification_error} id="firstName_error">
                    <span className="field_error">{qualification_error}</span>
                  </FormHelperText>
                ) : null}
              </FormControl>
              <FormControl
                className="form-child"
                //error={functional_area_error != ''}
                style={{ marginTop: '13px' }}
              >
                <InputLabel
                  style={{ marginTop: '-12px' }}
                  className="change-label-style"
                  shrink={true}
                  classes={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                    error: classes.cssError,
                  }}
                >
                  {'Board'}
                </InputLabel>
                <CreatableRemoteDataSingleSelectDropdown
                  isSearchable={true}
                  // apiUrl={FUNCTIONAL_AREA}
                  queryParams={{ search: '' }}
                  getSelectedOption={option => this.setDropdownOption(option, 'board')}
                  defaultValue={board ? { value: board.key, label: board.value } : {}}
                  options={boardTypes}
                  isClearable={true}
                  error={board_error ? board_error : false}
                />
                {/* {console.log('hint', qualification_error)} */}

                {board_error ? (
                  <FormHelperText error={board_error} id="firstName_error">
                    <span className="field_error">{board_error}</span>
                  </FormHelperText>
                ) : null}
              </FormControl>
            </div>
          </div>
          <div className="box1">
            <div className="fifth full-form-child">
              <FormControl
                className={'form-child left-child-form ' + classes.formControl}
                // error={industry_error != ''}
                style={{ marginTop: '13px', marginRight: '35px' }}
              >
                <InputLabel
                  style={{ marginTop: '-12px' }}
                  className="change-label-style"
                  shrink={true}
                  classes={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                    error: classes.cssError,
                  }}
                >
                  {'Passing out Year'}
                </InputLabel>

                <CreatableRemoteDataSingleSelectDropdown
                  isSearchable={true}
                  //apiUrl={INDUSTRY}
                  queryParams={{ search: '' }}
                  getSelectedOption={option => this.setDropdownOption(option, 'passing_out')}
                  defaultValue={
                    passing_out ? { value: passing_out.key, label: passing_out.value } : {}
                  }
                  isClearable={true}
                  error={passing_out_error ? passing_out_error : false}
                />
                {/* {console.log('hint', qualification_error)} */}

                {passing_out_error ? (
                  <FormHelperText error={passing_out_error} id="firstName_error">
                    <span className="field_error">{passing_out_error}</span>
                  </FormHelperText>
                ) : null}
              </FormControl>
              <FormControl
                className="form-child"
                //error={functional_area_error != ''}
                style={{ marginTop: '13px' }}
              >
                <InputLabel
                  style={{ marginTop: '-12px' }}
                  className="change-label-style"
                  shrink={true}
                  classes={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                    error: classes.cssError,
                  }}
                >
                  {'Medium'}
                </InputLabel>
                <CreatableRemoteDataSingleSelectDropdown
                  isSearchable={true}
                  // apiUrl={FUNCTIONAL_AREA}
                  queryParams={{ search: '' }}
                  getSelectedOption={option => this.setDropdownOption(option, 'medium')}
                  defaultValue={medium ? { value: medium.key, label: medium.value } : {}}
                  isClearable={true}
                  options={mediumTypes}
                  error={medium_error ? medium_error : false}
                />
                {/* {console.log('hint', qualification_error)} */}

                {medium_error ? (
                  <FormHelperText error={medium_error} id="firstName_error">
                    <span className="field_error">{medium_error}</span>
                  </FormHelperText>
                ) : null}
              </FormControl>
            </div>
          </div>
          {/* <Input
            id="marks"
            placeholder="Total Marks"
            className="marks"
            style={{ width: '47.5%' }}
            // onChange={this.handleChange('name')}
            margin="normal"
            //style={{ marginTop: '30px' }}
          /> */}
          <FormControl
            //error={marks_error !== ''}
            className={'form-child '}
            // style={{ marginLeft: '35px' }}
          >
            <InputLabel
              classes={{ root: classes.helperText }}
              classes={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
              }}
              shrink={true}
              htmlFor="total_marks"
            >
              Total Marks
            </InputLabel>
            <Input
              name="total_marks"
              type="number"
              value={total_marks}
              onChange={this.handleInput}
              onBlur={() => this.validateFields('total_marks')}
              onFocus={this.removeErrorFocus}
              autoComplete="off"
              //name="number_of_vacancy"
              //className={classes.Input}
              //value={number_of_vacancy}
              // classes={{
              //   underline: classes.cssUnderline,
              //   focused: classes.cssFocused,
              // }}
              // type="number"
              // margin="normal"
              // onChange={this.onInputChange}
              // onBlur={this.handleBlur}
              error={total_marks_error ? total_marks_error : false}
            />
            {/* <FormHelperText className="field_error">{marks_error}</FormHelperText> */}
            {total_marks_error ? (
              <FormHelperText error={total_marks_error} id="firstName_error">
                <span className="field_error">{total_marks_error}</span>
              </FormHelperText>
            ) : null}
          </FormControl>
        </div>
        <div className="edu-box-3">
          <div style={{ textAlign: 'right' }}>
            <CustomIcon
              style={{ float: 'right' }}
              icon={deleteIcon}
              className="delete-icon"
              // onclick={e => {
              //   this.props.deleteQualifications(qualification_id);
              // }}
            />
          </div>
          <div className="box1">
            {/* <FormControl className="form-child">
                <AutoCompleteNew
                  label="Qualification"
                  // onClose={(name, data) => {
                  //   if (data != null && data.value !== '') this.setParticularState('job_role', data);
                  // }}
                  //width={rightHalf}
                  //apiUrl={JOB_ROLE}
                  filterKey={'value'}
                  method="get"
                  //selectedValues={[job_role]}
                />
              </FormControl> */}
            <FormControl
              className={'form-child left-child-form ' + classes.formControl}
              // error={industry_error != ''}
              style={{ marginTop: '13px', marginRight: '35px' }}
            >
              <InputLabel
                style={{ marginTop: '-12px' }}
                className="change-label-style"
                shrink={true}
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                  error: classes.cssError,
                }}
              >
                {'Qualification'}
              </InputLabel>

              <CreatableRemoteDataSingleSelectDropdown
                isSearchable={true}
                //apiUrl={INDUSTRY}
                queryParams={{ search: '' }}
                getSelectedOption={option => this.setDropdownOption(option, 'qualification')}
                defaultValue={
                  qualification ? { value: qualification.key, label: qualification.value } : {}
                }
                isClearable={true}
                error={qualification_error ? qualification_error : false}
              />
              {/* {console.log('hint', qualification_error)} */}

              {qualification_error ? (
                <FormHelperText error={qualification_error} id="firstName_error">
                  <span className="field_error">{qualification_error}</span>
                </FormHelperText>
              ) : null}
            </FormControl>
          </div>
        </div>
      </div>
    );
  }
}
export default EducationEdit;
