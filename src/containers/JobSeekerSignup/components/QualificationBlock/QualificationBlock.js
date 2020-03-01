//library dependencies
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormControl, FormHelperText, Grid, Input, InputLabel} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios';
import {DateFormatInput} from 'material-ui-next-pickers';
//styles
import './style.scss';
import customisedMaterial from '../../../../styles/customisedMaterial';
//custom components
import AutoCompletePrefilled from '../../../../components/AutoCompletePrefilled';
import CustomIcon from '../../../../components/CustomIcon';
import NonCreatableSingleSelectDropdown from '../../../../components/SingleSelectDropdownWrapper/components/NonCreatableSingleSelectDropdown'
import CreatableSingleSelectDropdown from '../../../../components/SingleSelectDropdownWrapper/components/CreatableSingleSelectDropdown'
import NonCreatableRemoteDataSingleSelectDropdown from '../../../../components/SingleSelectDropdownWrapper/components/NonCreatableRemoteDataSingleSelectDropdown'
import CreatableRemoteDataSingleSelectDropdown from '../../../../components/SingleSelectDropdownWrapper/components/CreatableRemoteDataSingleSelectDropdown'
//icons
import calendar from '../../../../../assets/media/icons/calendar.svg';
//utilities
import {GRADING_SYSTEM, SERVER_API_PATH, SERVER_API_URL} from '../../../../../config/constants';
// material ui style customizations
const styles = theme => ({
  root: {display: 'flex', flexWrap: 'wrap'},
  margin: {margin: theme.spacing.unit},
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
  withoutLabel: {marginTop: theme.spacing.unit * 3},
  textField: {flexBasis: 70},
  input: {display: 'none'},
  ...customisedMaterial,
});

// dropdown data of grading systems
const gradingSystems = [
  {
    value: 'Scale 10 Grading System',
    key: 1,
  },
  {
    value: 'Scale 4 Grading System',
    key: 2,
  },
  {
    value: '% Marks of 100 Maximum',
    key: 3,
  },
  {
    value: 'Courses Required a Pass',
    key: 4,
  },
];

class QualificationBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: [],
      age: '',
      qualification: props.qualification,
      majors: [],
      boards: [],
      yearPassing: '',
      gradingSystems,
      specializations: [],
      mediums: [],
      passoutyears: [],
      marks: '',
      percent: '',
      qualification_error: '',
      major_error: '',
      marksType: 'marksType1',
      university_error: '',
      board_error: '',
      passoutyear_error: '',
      medium_error: '',
      institute_error: '',
      specialization_error: '',
      grading_system_error: '',
      marks_error: '',
      enddate_error: '',
      startdate_error: '',
      checkForErrors: props.checkForErrors,
      allFieldsStatus: {
        qualification: false,
        major: false,
        university: false,
        institute: false,
        startdate: false,
        enddate: false,
        grading_system: false,
        marks: false,
        passoutyear: false,
        board: false,
        medium: false,
        specialization: false,
      },
    };
    // bind this to functions to access this inside the function
    this.removeQualification = this.removeQualification.bind(this);
    this.setQualification = this.setQualification.bind(this);
    this.renderHighSchoolGraduate = this.renderHighSchoolGraduate.bind(this);
    this.onStartDate = this.onStartDate.bind(this);
    this.onEndDate = this.onEndDate.bind(this);
    this.checkForErrors = this.checkForErrors.bind(this);
    this.getMajors = this.getMajors.bind(this);
    this.getUniversities = this.getUniversities.bind(this);
    this.setSpecializations = this.setSpecializations.bind(this);
    this.setMarks = this.setMarks.bind(this);
  }

  componentWillMount() {
    // dropdown data of year
    const yearsArray = [];
    for (let i = 1950; i <= new Date().getFullYear(); i++) {
      yearsArray.push({value: i, key: i});
    }
    this.setState({passoutyears: yearsArray});
    this.getMajors(this.state.qualification.qualification);
  }

  componentDidMount() {
    if (this.props.checkForErrors == true) {
      this.checkForErrors();
    }
    //send ref to parent component
    this.props.onRef(this)
  }

  componentWillUnmount() {
    // on will unmount send ref as null to parent component
    this.props.onRef(null)
  }

  /**
   * @function validating all work qualification blocks on click of register
   * @return {*}
   */
  validateOnRegister() {
    let {allFieldsStatus} = this.state;
    for (let field in allFieldsStatus) {
      allFieldsStatus[field] = true;
    }
    this.setState({allFieldsStatus: allFieldsStatus});
    return this.checkForErrors()
  }

  componentDidUpdate() {
    // on click of checkExpericeceErrors, validating work experience block form
    if (
      this.state.checkForErrors !== this.props.checkForErrors &&
      this.props.checkForErrors === true
    ) {
      this.fieldTouched('marks');
      this.checkForErrors();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.qualification) {
      this.setState(
        {
          qualification: nextProps.qualification,
        },
        e => {
          if (nextProps.checkForErrors) {
            this.checkForErrors();
          }
          this.getMajors(this.state.qualification.qualification);
        },
      );
    }
  }

  /**
   * @function to check form errors
   * @return {boolean}
   */
  checkForErrors() {
    let error = false;
    if (
      typeof this.state.qualification.qualification === 'string' ||
      this.state.qualification.qualification === ''
    ) {
      error = true;
      this.setState({qualification_error: 'Kindly specify your qualifications'});
    }
    if ([1, 2, 3].indexOf(this.state.qualification.qualification.key) >= 0) {
      if (
        typeof this.state.qualification.major === 'string' ||
        this.state.qualification.major === ''
      ) {
        error = true;
        this.setState({major_error: 'Kindly specify your majors'});
      }
      if (
        typeof this.state.qualification.university === 'string' ||
        this.state.qualification.university === ''
      ) {
        error = true;
        this.setState({university_error: 'Kindly specify your university'});
      }
      if (
        typeof this.state.qualification.institute === 'string' ||
        this.state.qualification.institute === ''
      ) {
        error = true;
        this.setState({institute_error: 'Kindly specify your institute'});
      }
      if (!this.state.qualification.gradingsystem) {
        error = true;
        this.setState({grading_system_error: 'Kindly specify your percentage'});
      } else {
        this.setState({grading_system_error: ''});
      }
      if (this.state.qualification.marks === '' || !parseFloat(this.state.qualification.marks)) {
        if (this.state.qualification.gradingsystem.key !== 4) {
          error = true;
          this.setState({marks_error: 'Kindly specify your marks'});
        }
      } else {
        this.setState({marks_error: ''});
      }
      if (
        this.state.qualification.hasOwnProperty('gradingsystem') &&
        this.state.qualification.gradingsystem.key < 4 &&
        this.state.qualification.marks === ''
      ) {
        error = true;
        this.setState({marks_error: 'Kindly enter a valid score'});
      }
      error = this.state.qualification.gradingsystem.key !== 4 && this.checkMarksField() ? true : error;
      if (
        typeof this.state.qualification.startdate === 'string' ||
        this.state.qualification.startdate === ''
      ) {
        error = true;
        this.setState({startdate_error: 'Kindly specify your Start Date'});
      }
      if (
        Date.parse(this.state.qualification.startdate) >
        Date.parse(this.state.qualification.enddate)
      ) {
        error = true;
        this.setState({enddate_error: 'End date must be bigger than the start date'});
      }
      if (
        typeof this.state.qualification.enddate === 'string' ||
        this.state.qualification.enddate === ''
      ) {
        error = true;
        this.setState({enddate_error: 'Kindly specify your Completion Date'});
      }
    } else if ([4, 5].indexOf(this.state.qualification.qualification.key) >= 0) {
      try {
        let marks = parseFloat(this.state.qualification.marks.replace(/[^0-9.]/g, ''))
        if (!this.state.qualification.marks || !marks) {
          error = true;
          this.setState({marks_error: 'Kindly specify your marks'});
        }
        if (marks < 40 || marks > 100) {
          error = true;
          this.setState({marks_error: 'Kindly enter value between 40 and 100'});
        }
      } catch (e) {
      }
      error = this.state.qualification.gradingsystem.key !== 4 && this.state.marksType !== 'marksType2' && this.checkMarksField() ? true : error;
      if (!this.state.qualification.board
      ) {
        error = true;
        this.setState({board_error: 'Kindly specify your board'});
      }
      if (!this.state.qualification.passoutyear) {
        error = true;
        this.setState({passoutyear_error: 'Kindly specify your passing out year'});
      } else {
        this.setState({passoutyear_error: ''});
      }
      if (!this.state.qualification.medium) {
        error = true;
        this.setState({medium_error: 'Kindly specify your medium'});
      }
    }
    this.props.checkedForErrors(error);
    return error;
  }

  /**
   * @function check validations of user entered marks
   * @return {boolean}
   */
  checkMarksField = () => {
    let error = false;
    if (this.state.qualification.marks && this.state.qualification.gradingsystem) {
      let marks = parseFloat(this.state.qualification.marks)
      let gradeKey = this.state.qualification.gradingsystem.key
      if (gradeKey == 1 && (marks < 0.1 || marks > 10)) {
        error = true;
        this.setState({
          marks_error: 'Kindly enter a score between a range of 0.1 and 10',
        });
      } else if (gradeKey == 2 && (marks < 0.1 || marks > 4)) {
        error = true;
        this.setState({
          marks_error: 'Kindly enter a score between a range of 0.1 and 4',
        });
      }
      else if (gradeKey == 3 && (marks < 1 || marks > 100)) {
        error = true;
        this.setState({
          marks_error: 'Kindly enter a score between a range of 1 and 100',
        });
      }
    }
    return error;
  };

  /**
   * @function to get majors from the server
   * @param data
   */
  getMajors(data) {
    axios
      .get(`${SERVER_API_URL + SERVER_API_PATH}job-seeker-registration/get-majors/`, {
        params: {key: data.key, format: 'json'},
        headers: {'content-Type': 'application/json'},
      })
      .then(res => {
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
      });
  }

  setQualification(name, data) {
    this.fieldTouched('qualification')
    if (data !== null) {
      const {qualification} = this.state;
      qualification.qualification = data;
      this.setState(
        {
          qualification,
          qualification_error: '',
          major_error: '',
          university_error: '',
          board_error: '',
          passoutyear_error: '',
          medium_error: '',
          institute_error: '',
          specialization_error: '',
          grading_system_error: '',
          marks_error: '',
          enddate_error: '',
          startdate_error: '',
        },
        () => {
          this.checkForErrors();
          this.props.setFilteredQualification();
        },
      );
      this.getMajors(data);
    }
  }

  getUniversities() {
    axios
      .get('https://test-api.shenzyn.com/pinkjob/job-seeker-registration/get-university/', {
        params: {format: 'json'},
        headers: {'content-Type': 'application/json'},
      })
      .then(res => {
        this.setState({
          universities: res.data && res.data.data ? res.data.data : [],
        });
      })
      .catch(err => {
      });
  }

  removeQualification() {
    this.props.removeQualification(this.props.indexKey);
    this.props.checkedForErrors(false)
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value}, () => {
    });
  };

  /**
   * @function to update start date and start date error in the state,
   * while change the date in start date field
   * @param event
   */
  onStartDate(event) {
    this.fieldTouched('startdate');
    const {qualification} = this.state;
    qualification.startdate = new Date(event);
    this.setState({
        qualification,
        startdate_error: '',
      }, () => {
        this.checkForErrors();
      },
    );
  }

  /**
   * @function to update end date and end date error in the state,
   * while change the date in end date field
   * @param event
   */
  onEndDate(event) {
    this.fieldTouched('enddate');
    const {qualification} = this.state;
    qualification.enddate = new Date(event);
    const isEndGreater = Date.parse(qualification.startdate) < Date.parse(qualification.enddate);
    if (!isEndGreater) {
      this.setState({
        qualification,
        enddate_error: 'End date must be bigger than the start date',
      });
    } else {
      this.setState({qualification, enddate_error: ''});
    }
    this.checkForErrors();
  }

  /**
   * @function update selected grading system option in the state,
   * on change of grading system dropdown
   * @param option
   */
  setGradingSystemOption = (option) => {
    if (option) {
      const {qualification} = this.state;
      qualification.gradingsystem = {key: option.value, value: option.label};
      this.setState(
        {
          qualification,
          grading_system_error: '',
        }, () => {
          this.checkForErrors()
        },
      );
    }
  };

  /**
   * @function update entered or selected marks in the state,
   * on change of marks input field or dropdown
   * @param name
   * @param data
   */
  setMarks(name, data) {
    this.fieldTouched('marks');
    if (data !== null) {
      const {qualification} = this.state;
      let marksData = data;
      if (name === "marksType1")
        marksData = data.replace(/[^0-9.]/g, '');
      else {
        marksData = data ? data : ''
      }
      qualification.marks = marksData;
      this.setState({
          marksType: name,
          qualification,
          marks_error: '',
        },
        () => {
          this.checkForErrors();
        }
      );
    }
  }

  /**
   * @function update selected marks in the state,
   * on change of marks dropdown
   * @param option
   */
  setMarksOption = (option) => {
    if (option) {
      const {qualification} = this.state;
      qualification.marks = {key: option.value, value: option.label};
      this.setState({
          qualification,
          marks_error: '',
        }, () => {
          this.checkForErrors()
        },
      );
    }
  };

  /**
   * @function update selected major option in the state,
   * on change of majors dropdown
   * @param option
   */
  setMajorOption = (option) => {
    if (option) {
      const {qualification} = this.state;
      qualification.major = {key: option.value, value: option.label};
      this.setState({
          qualification,
          major_error: '',
        }, () => {
          this.checkForErrors()
        },
      );
    }
  };

  /**
   * @function update selected specializations option in the state,
   * on change of specializations dropdown
   * @param name
   * @param data
   */
  setSpecializations(name, data) {
    this.fieldTouched('specialisations');
    if (data !== null) {
      const {qualification} = this.state;
      qualification.specialisations = data;
      this.setState({
          qualification,
        }, () => {
          this.checkForErrors()
        },
      );
    }
  }

  /**
   * @function update selected institute option in the state,
   * on change of institute dropdown
   * @param option
   */
  setInstituteOption = (option) => {
    if (option) {
      const {qualification} = this.state;
      qualification.institute = {key: option.value, value: option.label};
      this.setState({
          qualification,
          institute_error: '',
        }, () => {
          this.checkForErrors()
        },
      );
    }
  };

  /**
   * @function update selected university option in the state,
   * on change of university dropdown
   * @param option
   */
  setUniversityOption = (option) => {
    if (option) {
      const {qualification} = this.state;
      qualification.university = {key: option.value, value: option.label};
      this.setState({
          qualification,
          university_error: '',
        }, () => {
          this.checkForErrors()
        },
      );
    }
  };

  /**
   * @function update selected board option in the state,
   * on change of board dropdown
   * @param option
   */
  setBoardOption = (option) => {
    if (option) {
      const {qualification} = this.state;
      qualification.board = {key: option.value, value: option.label};
      this.setState({
          qualification,
          board_error: '',
        }, () => {
          //this.checkForErrors()
        },
      );
    }
  };

  /**
   * @function update selected medium option in the state,
   * on change of medium dropdown
   * @param option
   */
  setMediumOption = (option) => {
    if (option) {
      const {qualification} = this.state;
      qualification.medium = {key: option.value, value: option.label};
      this.setState({
          qualification,
          medium_error: ''
        }, () => {
          this.checkForMaticErrors('medium')
        },
      );
    }
  };

  /**
   * @function to check form errors
   * @param value
   */
  checkForMaticErrors = (value) => {
    let error = false;
    this.setState({board_error: '', passoutyear_error: '', medium_error: ''});
    switch (value) {
      case 'medium':
        if (!this.state.qualification.board) {
          error = true;
          this.setState({board_error: 'Kindly specify your board'});
        }
        if (!this.state.qualification.passoutyear) {
          error = true;
          this.setState({passoutyear_error: 'Kindly specify your passing out year'});
        }
      case 'passoutyear':
        if (!this.state.qualification.board) {
          error = true;
          this.setState({board_error: 'Kindly specify your board'});
        }
      default:
        break
    }
    this.props.checkedForErrors(error)
  };

  /**
   * @function update selected passout year option in the state,
   * on change of passout year dropdown
   * @param option
   */
  setPassoutYearOption = (option) => {
    if (option) {
      const {qualification} = this.state;
      qualification.passoutyear = {key: option.value, value: option.label};
      this.setState({
          qualification,
          passoutyear_error: '',
        }, () => {
          this.checkForMaticErrors('passoutyear')
        },
      );
    }
  };

  /**
   * @function to update touched fields in the state
   * @param id
   */
  fieldTouched(id) {
    const {allFieldsStatus} = this.state;
    allFieldsStatus[id] = true;
    this.setState({allFieldsStatus});
  }

  /**
   * @function update selected qualification option in the state,
   * on change of qualification dropdown and add new qualification block in the qualificationList
   * @param option
   */
  setQualificationOption = (option) => {
    if (option) {
      const {qualification} = this.state;
      qualification.qualification = {key: option.value, value: option.label};
      this.setState({
        qualification,
        qualification_error: '',
        major_error: '',
        university_error: '',
        board_error: '',
        passoutyear_error: '',
        medium_error: '',
        institute_error: '',
        specialization_error: '',
        grading_system_error: '',
        marks_error: '',
        enddate_error: '',
        startdate_error: '',
      }, () => {
        this.checkForErrors();
        this.props.setFilteredQualification();
      });
      this.getMajors({key: option.value, value: option.label});
    }
  };

  render() {
    const {classes, filteredQualification, indexKey} = this.props;
    const {
      qualification,
      qualification_error,
      major_error,
      enddate_error,
      startdate_error,
      university_error,
      institute_error,
      specialization_error,
      grading_system_error,
      marks_error,
    } = this.state;
    return (
      <div className="qualification-container">
        <Grid container spacing={8} direction="column">
          <Grid item xs={12} style={{marginBottom: 20}}>
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
              {'Qualification'}
            </InputLabel>
            <NonCreatableSingleSelectDropdown
              isSearchable={false}
              getSelectedOption={(option) => this.setQualificationOption(option)}
              options={indexKey === 0 ? [...filteredQualification] : [qualification.qualification, ...filteredQualification]}
              defaultValue={{value: qualification.qualification.key, label: qualification.qualification.value}}
              isClearable={false}
              error={qualification_error}
            />
            {qualification_error ? <FormHelperText error={qualification_error} id="firstName_error">
              <span className="field_error">
                {qualification_error}
              </span>
            </FormHelperText> : null}
          </Grid>
          {/*
          If qualification is 1 or 2 or 3 then we will show specific form according to qualification
          */}
          {[1, 2, 3].indexOf(qualification.qualification.key) >= 0 ? (
            <React.Fragment>
              <Grid item xs={12} style={{marginBottom: 20}}>
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
                  {'Major'}
                </InputLabel>
                <CreatableSingleSelectDropdown
                  isSearchable={true}
                  options={this.state.majors}
                  defaultValue={qualification.major.value ? {
                    value: qualification.major.key,
                    label: qualification.major.value
                  } : ''}
                  getSelectedOption={(option) => this.setMajorOption(option)}
                  isClearable={true}
                  error={major_error}
                />
                {this.state.allFieldsStatus['major'] ? <FormHelperText error={major_error} id="firstName_error">
                  <span className="field_error">
                    {major_error}
                  </span>
                </FormHelperText> : null}
              </Grid>
              {this.state.specializations && this.state.specializations.length > 0 ? (
                <Grid item xs={12} style={{marginBottom: 20}}>
                  <AutoCompletePrefilled
                    id="specialization"
                    label="Specialization"
                    selectedValues={[qualification.specialization]}
                    defaultValues={this.state.specializations}
                    filterKey="value"
                    width="436px"
                    onClose={(name, data) => {
                      if (data !== null) this.setSpecializations(name, data);
                    }}
                    showError={this.state.allFieldsStatus['specialization'] ? specialization_error : null}
                  />
                </Grid>
              ) : null}
              <Grid item xs={12} style={{marginBottom: 20}}>
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
                  {'University'}
                </InputLabel>
                <CreatableRemoteDataSingleSelectDropdown
                  isSearchable={true}
                  apiUrl="job-seeker-registration/get-university/"
                  queryParams={{search: ''}}
                  isDisabled={qualification.major.value ? false : true}
                  defaultValue={qualification.university.value ? {
                    value: qualification.university.key,
                    label: qualification.university.value
                  } : ''}
                  getSelectedOption={(option) => this.setUniversityOption(option)}
                  isClearable={true}
                  error={this.state.allFieldsStatus['university'] && university_error ? university_error : false}
                />
                {this.state.allFieldsStatus['university'] && university_error ?
                  <FormHelperText error={university_error} id="firstName_error">
                  <span className="field_error">
                    {university_error}
                  </span>
                  </FormHelperText> : null}
              </Grid>
              <Grid item xs={12} style={{marginBottom: 20}}>
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
                  {'Institute'}
                </InputLabel>
                <CreatableRemoteDataSingleSelectDropdown
                  isSearchable={true}
                  apiUrl="job-seeker-registration/get-institutes/"
                  defaultValue={qualification.institute.value ? {
                    value: qualification.institute.key,
                    label: qualification.institute.value
                  } : ''}
                  queryParams={{key: qualification.university ? qualification.university.key : '', search: ''}}
                  isDisabled={qualification.major.value && qualification.university.value ? false : true}
                  getSelectedOption={(option) => this.setInstituteOption(option)}
                  isClearable={true}
                  error={this.state.allFieldsStatus['institute'] && institute_error ? institute_error : false}
                />
                {this.state.allFieldsStatus['institute'] && institute_error ?
                  <FormHelperText error={institute_error} id="firstName_error">
                  <span className="field_error">
                    {institute_error}
                  </span>
                  </FormHelperText> : null}
              </Grid>
              <Grid
                container
                spacing={16}
                direction="row"
                justify="space-evenly"
                style={{marginBottom: '20px'}}
              >
                <Grid item xs={6}>
                  <FormControl style={{width: '100%', marginTop: 10}}>
                    <DateFormatInput
                      name="date-input"
                      value={qualification.startdate}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      onChange={this.onStartDate}
                      fullWidth={true}
                      FormControlProps={{
                        error: this.state.allFieldsStatus['startdate'] && startdate_error !== '',
                      }}
                      onBlur={() => {
                        this.fieldTouched('startdate')
                      }}
                      InputLabelProps={{
                        shrink: true,
                        classes: {
                          root: classes.cssLabel,
                          focused: classes.cssFocused,
                          error: classes.cssError
                        },
                      }}
                      errorStyle={{color: '#eaeaea'}}
                      error={this.state.allFieldsStatus['startdate'] ?
                        <span style={{color: '#f0582b'}}>{startdate_error}</span> : null}
                      max={new Date()}
                      label="Start Date"
                      endIcon={<CustomIcon iconStyle="end-icon" icon={calendar}/>}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl style={{width: '100%', marginTop: 10}}>
                    <DateFormatInput
                      name="date-input"
                      value={qualification.enddate}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      onChange={this.onEndDate}
                      onBlur={() => {
                        this.fieldTouched('enddate')
                      }}
                      fullWidth={true}
                      FormControlProps={{
                        error: this.state.allFieldsStatus['enddate'] && enddate_error !== '',
                      }}
                      error={this.state.allFieldsStatus['enddate'] ?
                        <span style={{color: '#f0582b'}}>{enddate_error}</span> : null}
                      InputLabelProps={{
                        shrink: true,
                        classes: {
                          root: classes.cssLabel,
                          focused: classes.cssFocused,
                          error: classes.cssError
                        },
                      }}
                      max={new Date()}
                      label="Completion Date"
                      endIcon={<CustomIcon iconStyle="end-icon" icon={calendar}/>}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item xs={12} style={{marginBottom: 20, padding: '4px 0'}}>
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
                  {'Grading System'}
                </InputLabel>
                <NonCreatableRemoteDataSingleSelectDropdown
                  isSearchable={false}
                  apiUrl={GRADING_SYSTEM}
                  queryParams={{search: ''}}
                  defaultValue={qualification.gradingsystem.value ? {
                    value: qualification.gradingsystem.key,
                    label: qualification.gradingsystem.value
                  } : ''}
                  getSelectedOption={(option) => this.setGradingSystemOption(option)}
                  isClearable={true}
                  error={this.state.allFieldsStatus['grading_system'] && grading_system_error ? grading_system_error : false}
                />
                {this.state.allFieldsStatus['grading_system'] && grading_system_error ?
                  <FormHelperText error={grading_system_error} id="firstName_error">
                  <span className="field_error">
                    {grading_system_error}
                  </span>
                  </FormHelperText> : null}
              </Grid>
              {qualification.gradingsystem &&
              qualification.gradingsystem != '' &&
              qualification.gradingsystem.key != 4 ? (
                <Grid item xs={12} style={{marginBottom: 4}}>
                  <FormControl
                    style={{width: '100%', marginTop: 0}}
                    classes={{root: classes.root}}
                    error={this.state.allFieldsStatus.marks && marks_error !== ''}
                  >
                    <InputLabel
                      htmlFor="code"
                      style={{
                        marginTop: 0,
                        color: '#656565',
                        fontFamily: 'Roboto',
                        fontSize: '14px',
                        fontWeight: '400'
                      }}
                      shrink={true}
                      classes={{
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                      }}
                    >
                      Marks
                    </InputLabel>
                    <Input
                      id="code"
                      type="text"
                      name="marksType1"
                      autoFocus={false}
                      autoComplete="off"
                      value={qualification.marks}
                      onChange={e => {
                        this.setMarks(e.target.name, e.target.value);
                      }}
                      onBlur={e => {
                        this.fieldTouched('marks');
                      }}
                      classes={{
                        underline: classes.cssUnderline,
                        focused: classes.cssFocused,
                      }}
                    />
                    <FormHelperText error={marks_error !== ''} id="firstName_error">
                      <span className="field_error">
                        {this.state.allFieldsStatus.marks && marks_error}
                      </span>
                    </FormHelperText>
                  </FormControl>
                </Grid>
              ) : null}
            </React.Fragment>
          ) : (
            this.renderHighSchoolGraduate()
          )}
          {this.props.indexKey !== 0 && <div className="remove-qualification" onClick={e => this.removeQualification()}>
            Remove
          </div>}
        </Grid>
      </div>
    );
  }

  renderHighSchoolGraduate() {
    const {
      qualification,
      board_error,
      passoutyear_error,
      medium_error,
      marks_error,
      boards,
      mediums,
      passoutyears,
    } = this.state;
    const {classes} = this.props;
    /*
    Here checking qualification key
    if qualification key is 6 means, it's below 10th so we don't need to show any other fields
    if qualification key is 4 or 5 means, it's 12th and 10th respectively
    So based on key we are showing fields
     */
    return qualification.qualification.key !== 6 ? (
      <React.Fragment>
        <Grid item xs={12} style={{marginBottom: 20}}>
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
            {'Board'}
          </InputLabel>
          <NonCreatableSingleSelectDropdown
            isSearchable={false}
            getSelectedOption={(option) => this.setBoardOption(option)}
            defaultValue={qualification.board.value ? {
              value: qualification.board.key,
              label: qualification.board.value
            } : ''}
            options={boards}
            isClearable={false}
            error={board_error}
          />
          {this.state.allFieldsStatus['board'] ? <FormHelperText error={board_error} id="firstName_error">
                  <span className="field_error">
                    {board_error}
                  </span>
          </FormHelperText> : null}
        </Grid>
        <Grid item xs={12} style={{marginBottom: 20}}>
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
            {'Passing out Year'}
          </InputLabel>
          <NonCreatableSingleSelectDropdown
            isSearchable={false}
            getSelectedOption={(option) => this.setPassoutYearOption(option)}
            defaultValue={qualification.passoutyear.value ? {
              value: qualification.passoutyear.key,
              label: qualification.passoutyear.value
            } : ''}
            options={passoutyears}
            isClearable={false}
            error={passoutyear_error}
          />
          {this.state.allFieldsStatus['passoutyear'] ? <FormHelperText error={passoutyear_error} id="firstName_error">
                  <span className="field_error">
                    {passoutyear_error}
                  </span>
          </FormHelperText> : null}
        </Grid>
        <Grid item xs={12} style={{marginBottom: 20}}>
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
            {'Medium'}
          </InputLabel>
          <NonCreatableSingleSelectDropdown
            isSearchable={false}
            getSelectedOption={(option) => this.setMediumOption(option)}
            defaultValue={qualification.medium.value ? {
              value: qualification.medium.key,
              label: qualification.medium.value
            } : ''}
            options={mediums}
            isClearable={false}
            error={medium_error}
          />
          {this.state.allFieldsStatus['medium'] ? <FormHelperText error={medium_error} id="firstName_error">
                  <span className="field_error">
                    {medium_error}
                  </span>
          </FormHelperText> : null}
        </Grid>
        <Grid item xs={12} style={{marginBottom: 20}}>
          <FormControl
            style={{width: '100%', marginTop: 0}}
            classes={{root: classes.root}}
            error={this.state.allFieldsStatus.marks && marks_error !== ''}
          >
            <InputLabel
              htmlFor="code"
              style={{marginTop: 0, color: '#656565', fontFamily: 'Roboto', fontSize: '14px', fontWeight: '400'}}
              shrink={true}
              classes={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
              }}
            >
              Marks
            </InputLabel>
            <Input
              id="code"
              type="text"
              name="marksType2"
              autoFocus={false}
              autoComplete="off"
              value={qualification.marks}
              onChange={e => {
                this.setMarks("marksType2", e.target.value);
              }}
              onBlur={e => {
                this.fieldTouched('marks');
              }}
              classes={{
                underline: classes.cssUnderline,
                focused: classes.cssFocused,
              }}
            />
            <FormHelperText error={marks_error !== ''} id="firstName_error">
                      <span className="field_error">
                        {this.state.allFieldsStatus.marks && marks_error}
                      </span>
            </FormHelperText>
          </FormControl>
        </Grid>
      </React.Fragment>
    ) : null;
  }
}

QualificationBlock.propTypes = {
  checkForErrors: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QualificationBlock);
