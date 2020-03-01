//library dependency
import React, {Component} from 'react';
import {FormControl, FormHelperText, Grid, InputLabel, Input, withStyles} from '@material-ui/core';
import axios from 'axios';
import {DateFormatInput} from 'material-ui-next-pickers';

//custom components
import NonCreatableSingleSelectDropdown
  from '../../../../components/SingleSelectDropdownWrapper/components/NonCreatableSingleSelectDropdown'
import CreatableSingleSelectDropdown
  from '../../../../components/SingleSelectDropdownWrapper/components/CreatableSingleSelectDropdown'
import NonCreatableRemoteDataSingleSelectDropdown
  from '../../../../components/SingleSelectDropdownWrapper/components/NonCreatableRemoteDataSingleSelectDropdown'
import CreatableRemoteDataSingleSelectDropdown
  from '../../../../components/SingleSelectDropdownWrapper/components/CreatableRemoteDataSingleSelectDropdown'

//styles
import './styles.scss';
import customisedMaterial from '../../../../styles/customisedMaterial';

//utilities
import {SERVER_API_PATH, SERVER_API_URL, GRADING_SYSTEM} from '../../../../../config/constants';

//icons
import CustomIcon from '../../../../components/CustomIcon';
import calendar from '../../../../../assets/media/icons/calendar.svg';

// used to overrides material ui components styles
const styles = theme => ({
  root: {
    display: 'flex', flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  cssLabel: {
    color: '#656565 !important', fontSize: '14px', fontFamily: 'Roboto', fontWeight: 400,
  },
  cssError: {
    color: '#656565 !important', fontSize: '14px', fontFamily: 'Roboto', fontWeight: 400,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flexBasis: 70,
  },
  input: {
    display: 'none',
  },
  ...customisedMaterial,
});

class EditEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qualification: props.qualification,
      majors: [],
      boards: [],
      specializations: [],
      mediums: [],
      passoutyears: [],
      marks: '',
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
      }
    }
  }

  /**
   * this function used to get majors values from server and set in state
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

  /**
   * this function used to stored status of field is touched or not
   * @param id
   */
  fieldTouched(id) {
    const {allFieldsStatus} = this.state;
    allFieldsStatus[id] = true;
    this.setState({allFieldsStatus});
  }

  componentWillMount() {
    /**
     * called get majors values api for update values in state
     */
    this.getMajors(this.state.qualification.qualification);
  }

  /**
   * validate marks field with following specified conditions and set error depends on marks value
   * @returns {boolean}
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
   * this function used to validate all field and if any one field is having error then set error value
   * @returns {boolean}
   */
  checkForErrors() {
    let error = false;
    if (
      typeof this.state.qualification.qualification === 'string' ||
      this.state.qualification.qualification == ''
    ) {
      error = true;
      this.setState({
        qualification_error: 'Kindly specify your qualifications',
      });
    }
    if ([1, 2, 3].indexOf(this.state.qualification.qualification.key) >= 0) {
      if (
        typeof this.state.qualification.major === 'string' ||
        this.state.qualification.major == ''
      ) {
        error = true;
        this.setState({
          major_error: 'Kindly specify your majors',
        });
      }
      if (
        typeof this.state.qualification.university === 'string' ||
        this.state.qualification.university == ''
      ) {
        error = true;
        this.setState({
          university_error: 'Kindly specify your university',
        });
      }
      if (
        typeof this.state.qualification.institute === 'string' ||
        this.state.qualification.institute == ''
      ) {
        error = true;
        this.setState({
          institute_error: 'Kindly specify your institute',
        });
      }
      if (!this.state.qualification.gradingsystem) {
        error = true;
        this.setState({
          grading_system_error: 'Kindly specify your percentage',
        });
      } else {
        this.setState({
          grading_system_error: '',
        });
      }
      if (this.state.qualification.marks == '' || !parseFloat(this.state.qualification.marks)) {
        if (this.state.qualification.gradingsystem.key != 4) {
          error = true;
          this.setState({
            marks_error: 'Kindly specify your marks',
          });
        }
      } else {
        this.setState({
          marks_error: '',
        });
      }
      if (
        this.state.qualification.hasOwnProperty('gradingsystem') &&
        this.state.qualification.gradingsystem.key < 4 &&
        this.state.qualification.marks == ''
      ) {
        error = true;
        this.setState({
          marks_error: 'Kindly enter a valid score',
        });
      }
      error = this.state.qualification.gradingsystem.key != 4 && this.checkMarksField() ? true : error;
      if (
        typeof this.state.qualification.startdate === 'string' ||
        this.state.qualification.startdate == ''
      ) {
        error = true;
        this.setState({
          startdate_error: 'Kindly specify your Start Date',
        });
      }
      if (
        Date.parse(this.state.qualification.startdate) >
        Date.parse(this.state.qualification.enddate)
      ) {
        error = true;
        this.setState({
          enddate_error: 'End date must be bigger than the start date',
        });
      }
      if (
        typeof this.state.qualification.enddate === 'string' ||
        this.state.qualification.enddate == ''
      ) {
        error = true;
        this.setState({
          enddate_error: 'Kindly specify your Completion Date',
        });
      }
    } else if ([4, 5].indexOf(this.state.qualification.qualification.key) >= 0) {
      try {
        let marks = parseFloat(this.state.qualification.marks.replace(/[^0-9.]/g, ''))
        if (!this.state.qualification.marks || !marks) {
          error = true;
          this.setState({
            marks_error: 'Kindly specify your marks',
          });
        }
        if (marks < 40 || marks > 100) {
          error = true;
          this.setState({
            marks_error: 'Kindly enter value between 40 and 100',
          });
        }
      } catch (e) {
      }
      error = this.state.qualification.gradingsystem.key != 4 && this.state.marksType != 'marksType2' && this.checkMarksField() ? true : error;
      if (!this.state.qualification.board
      ) {
        error = true;
        this.setState({
          board_error: 'Kindly specify your board',
        });
      }
      if (!this.state.qualification.passoutyear) {
        error = true;
        this.setState({
          passoutyear_error: 'Kindly specify your passing out year',
        });
      } else {
        this.setState({
          passoutyear_error: '',
        });
      }
      if (!this.state.qualification.medium) {
        error = true;
        this.setState({
          medium_error: 'Kindly specify your medium',
        });
      }
    }
    return error;
  }

  /**
   * set qualification details if data is not null and then call get majors api
   * @param name
   * @param data
   */
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

  /**
   * set medium value in state variable and removing error value for medium
   * @param name
   * @param data
   */
  setMedium(name, data) {
    this.fieldTouched('medium');
    if (data !== null) {
      const {qualification} = this.state;
      qualification.medium = data;
      this.setState({qualification, medium_error: ''}, () => {
        this.checkForErrors()
      });
    }
  }

  /**
   * set board value in state variable and removing error value for board
   * @param name
   * @param data
   */
  setBoard(name, data) {
    this.fieldTouched('board')
    if (data !== null) {
      const {qualification} = this.state;
      qualification.board = data;
      this.setState({qualification, board_error: ''}, () => {
        this.checkForErrors()
      });
    }
  }

  /**
   * set university value in state variable and removing error value for university
   * @param name
   * @param data
   */
  setUniversity(name, data) {
    this.fieldTouched('university');
    if (data !== null) {
      const {qualification} = this.state;
      qualification.university = data;
      this.setState({qualification, university_error: ''}, () => {
        this.checkForErrors()
      });
    }
  }

  /**
   * set institute value in state variable and removing error value for institute
   * @param name
   * @param data
   */
  setInstitutes(name, data) {
    this.fieldTouched('institute');
    if (data !== null) {
      const {qualification} = this.state;
      qualification.institute = data;
      this.setState({qualification, institute_error: ''}, () => {
        this.checkForErrors()
      });
    }
  }

  /**
   * set major value in state variable and removing error value for major
   * @param name
   * @param data
   */
  setMajors(name, data) {
    this.fieldTouched('major');
    if (data !== null) {
      const {qualification} = this.state;
      qualification.major = data;
      this.setState({qualification, major_error: ''}, () => {
        this.checkForErrors()
      });
    }
  }

  /**
   * set marks value in state variable and removing error value for marks
   * @param name
   * @param data
   */
  setMarks = (name, data) => {
    this.fieldTouched('marks');
    if (data !== null) {
      const {qualification} = this.state;
      let marksData = data;
      if (name === "marksType1") marksData = data.replace(/[^0-9.]/g, '');
      else {
        marksData = data ? data : ''
      }

      qualification.marks = marksData;
      this.setState({marksType: name, qualification, marks_error: ''},
        () => {
          this.checkForErrors();
        });
    }
  };

  /**
   * set grading system value in state variable and removing error value for grading system
   * @param name
   * @param data
   */
  setGradingSystem = (name, data) => {
    this.fieldTouched('grading_system');
    if (data !== null) {
      const {qualification} = this.state;
      qualification.gradingsystem = data;
      this.setState({qualification, grading_system_error: ''},
        () => {
          this.checkForErrors();
        });
    }
  };

  /**
   * used to update field variables of state where field name is target value and value is target value
   * @param event
   */
  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  /**
   * set start date value in state variable and removing error value for start date
   * @param event
   */
  onStartDate = (event) => {
    this.fieldTouched('startdate');
    const {qualification} = this.state;
    qualification.startdate = new Date(event);
    this.setState({qualification, startdate_error: ''},
      () => {
        this.checkForErrors();
      });
  };

  /**
   * set end date value in state variable and removing error value for grading end adat
   * @param event
   */
  onEndDate = (event) => {
    this.fieldTouched('enddate');
    const {qualification} = this.state;
    qualification.enddate = new Date(event);
    const isEndGreater = Date.parse(qualification.startdate) < Date.parse(qualification.enddate);
    if (!isEndGreater) {
      this.setState({
        qualification,
        enddate_error: 'End date must be bigger than the start date',
      });
    } else this.setState({qualification, enddate_error: '',});
    this.checkForErrors();
  };

  /**
   * get universities names from server and save in state
   */
  getUniversities = () => {
    axios
      .get('https://test-api.shenzyn.com/pinkjob/job-seeker-registration/get-university/', {
        params: {format: 'json'},
        headers: {'content-Type': 'application/json'},
      })
      .then(res => {
        this.setState({universities: res.data && res.data.data ? res.data.data : []});
      })
      .catch(err => {
      });
  };

  /**
   * set qualification options details if data is not null and then call get majors api
   * @param option
   */
  setQualificationOption = (option) => {
    if (option) {
      const {qualification} = this.state;
      qualification.qualification = {key: option.value, value: option.label};
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
      this.getMajors({key: option.value, value: option.label});
    }
  };

  /**
   * after clicking on save calling check all error function
   * @constructor
   */
  SaveButtonClick = () => {
    this.checkForErrors();
  };

  render() {
    const {classes, filteredQualification, indexKey} = this.props;
    const {
      qualification,
      startdate,
      endDate,
      gradingSystems,
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
      <div className="education-block-wrapper">
        <div className='save-edit-wrapper'>
          <span className='save-button' onClick={this.SaveButtonClick}>Save</span>
          <span className='cancel-button' onClick={this.props.changeQualificationMode}>Cancel</span>
        </div>
        <Grid>
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
          {qualification_error && <FormHelperText error={qualification_error} id="firstName_error">
                <span className="field_error">
                  {qualification_error}
                </span>
          </FormHelperText>}
        </Grid>
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
              {major_error && <FormHelperText error={major_error} id="firstName_error">
                  <span className="field_error">
                    {major_error}
                  </span>
              </FormHelperText>}
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
                    if (data != null) this.setSpecializations(name, data);
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
                error={university_error}
              />
              {university_error && <FormHelperText error={university_error} id="firstName_error">
                  <span className="field_error">
                    {university_error}
                  </span>
              </FormHelperText>}
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
                error={institute_error}
              />
              {institute_error && <FormHelperText error={institute_error} id="firstName_error">
                  <span className="field_error">
                    {institute_error}
                  </span>
              </FormHelperText>}
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
                    error={startdate_error && <span style={{color: '#f0582b'}}>{startdate_error}</span>}
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
              {grading_system_error && <FormHelperText error={grading_system_error} id="firstName_error">
                  <span className="field_error">
                    {grading_system_error}
                  </span>
              </FormHelperText>}
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
                        {marks_error}
                      </span>
                  </FormHelperText>
                </FormControl>
              </Grid>
            ) : null}
          </React.Fragment>
        ) : (
          this.renderHighSchoolGraduate()
        )}
      </div>
    );
  }

  renderHighSchoolGraduate() {
    const {
      qualification,
      board_error,
      passoutyear_error,
      medium_error,
      total_marks,
      marks_error,
      boards,
      mediums,
      passoutyears,
    } = this.state;
    const {classes} = this.props;
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
          {board_error && <FormHelperText error={board_error} id="firstName_error">
                  <span className="field_error">
                    {board_error}
                  </span>
          </FormHelperText>}
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
          {passoutyear_error && <FormHelperText error={passoutyear_error} id="firstName_error">
                  <span className="field_error">
                    {passoutyear_error}
                  </span>
          </FormHelperText>}
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
          {medium_error && <FormHelperText error={medium_error} id="firstName_error">
                  <span className="field_error">
                    {medium_error}
                  </span>
          </FormHelperText>}
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
              classes={{underline: classes.cssUnderline, focused: classes.cssFocused,}}
            />
            <FormHelperText error={marks_error !== ''} id="firstName_error">
                      <span className="field_error">
                        {marks_error}
                      </span>
            </FormHelperText>
          </FormControl>
        </Grid>
      </React.Fragment>
    ) : null;
  }
}

export default withStyles(styles)(EditEducation);
