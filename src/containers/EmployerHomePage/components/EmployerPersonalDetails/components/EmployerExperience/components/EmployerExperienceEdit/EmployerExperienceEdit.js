//library dependencies
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Input,
  InputLabel,
  InputAdornment,
  FormHelperText,
  FormControl,
  Grid,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, TimePicker, DatePicker} from 'material-ui-pickers';
import {connect} from 'react-redux';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core';

//style
import './style.scss'
import CustomTag from '../../../../../../../../components/CustomTag';

//custom component
import CustomIcon from '../../../../../../../../components/CustomIcon';
import CreatableRemoteDataSingleSelectDropdown
  from '../../../../../../../../components/SingleSelectDropdownWrapper/components/CreatableRemoteDataSingleSelectDropdown'

//icon
import deleteIcon from '../../../../../../../../../assets/media/icons/deleteIcon.svg';
import defaultUntick from "../../../../../../../../../assets/media/icons/default_untick.svg";
import calendar from '../../../../../../../../../assets/media/icons/calendar.svg';

//utilities
import {
  JOB_ROLE, ORGANISATION, EMPLOYER_UPDATE_WORK_EXP_DETAILS, EMPLOYER_GET_WORK_EXP_DETAILS,
  EMPLOYER_ADD_WORK_EXP_DETAILS
} from '../../../../../../../../../config/constants';
import {handleLocalStorage, apiCall, validateDesignation} from '../../../../../../../../Utilities';
import {bindActionCreators} from 'redux';
import * as HomePageEmpActions from '../../../../../../../../actions/homePageEmp';


// customised material date picker style

export const customTheme = createMuiTheme({
  palette: {
    primary: {main: '#e73a9e', light: '#212121', dark: '#212121',},
    secondary: {main: '#e73a9e',},
  },
});

//customised material ui style
const styles = theme => ({
  root: {display: 'flex', flexWrap: 'wrap',},
  margin: {margin: theme.spacing.unit,},
  withoutLabel: {marginTop: theme.spacing.unit * 3,},
  textField: {flexBasis: 200,},
  cssLabel: {color: '#656565 !important', fontSize: '14px', fontFamily: 'Roboto', fontWeight: 400,},
  cssError: {color: '#656565 !important', fontSize: '14px', fontFamily: 'Roboto', fontWeight: 400,},
});

class EmployerExperienceEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date('2014-08-18T21:11:54'),
      is_current_job_view: this.getValueFromProp('is_current_job_view') == null ? false : this.getValueFromProp('is_current_job_view'),
      job_profile: this.getValueFromProp('job_profile'),
      current_employer: this.getValueFromProp('current_employer'),
      current_designation: this.getValueFromProp('current_designation'),
      joined_on: this.getValueFromProp('joined_on'),
      left_on: this.getValueFromProp('left_on'),
      id: this.getValueFromProp('id'),
      current_employer_error: '',
      current_designation_error: '',
      job_profile_error: '',
      joined_on_error: '',
      left_on_error: ''
    };
  }

  /**
   * Customised Data if not getting value set the value null
   * @param key
   * @returns {null}
   */
  getValueFromProp = (key) => {
    if (!this.props.experience)
      return null;
    return this.props.experience[key] ? this.props.experience[key] : null
  };
  /**
   * To reset the errors
   */
  resetErrors = () => {
    this.setState({
      current_employer_error: '',
      current_designation_error: '',
      left_on_error: '',
      joined_on_error: '',
      job_profile_error: '',
    })
  };
  /**
   * on change of input fields
   * @param e
   * @param validatorAfterSave
   */
  handleInput = (e, validatorAfterSave = null) => {
    const {name} = e.target;
    let value = e.target.value;
    if (["joined_on", "left_on"].includes(e.target.name)) {
      value = new Date(value)
    }
    this.setState({
      [name]: value,
    }, () => {
      if (validatorAfterSave) {
        this.validateFields(name);
      }
    })
  };
  /**
   * On change of Job profile field
   * @param e
   * @param validatorAfterSave
   */
  handleJobProfileChange = (e, validatorAfterSave = null) => {
    const {name} = e.target;
    let value = e.target.value;
    if (value.length <= 500) {
      this.setState({
        [name]: value,
      }, () => {
        if (validatorAfterSave) {
          this.validateFields(name);
        }
      })
    }
  };
  /**
   * On change in dropDown Updating the state
   * @param option
   * @param name
   * @param validatorAfterSave
   */
  setDropdownOption = (option, name, validatorAfterSave = null) => {
    this.setState({
      [name]: {key: option ? option.value : '', value: option ? option.label : ''},
    }, () => {
      if (validatorAfterSave) {
        this.validateFields(name);
      }
    })
  };

  /**
   * on click discard changes button
   * @param e
   */
  discardChanges = (e) => {
    this.resetErrors();
    this.props.onclick();
  };

  /**
   * To validate job profile Field
   * @returns {Promise<boolean>}
   */
  validateJobProfileForm = async () => {
    let errorValue = '';
    if (!this.state.job_profile) {
      errorValue = "Kindly specify the job profile";
    }
    else if (this.state.job_profile.length > 500) {
      errorValue = "Maximum 500 Characters are allowed";
    }
    this.setParticularField('job_profile', errorValue);
    return !!errorValue
  };

  /**
   * To validate Current designation field
   * @returns {Promise<boolean>}
   */
  validateCurrentDesignationForm = async () => {
    let errorValue = "";
    if (!this.state.current_designation || !this.state.current_designation.value) {
      errorValue = "Kindly specify your current designation";
    }
    else if (await validateDesignation([this.state.current_designation.value], 'current_designation') === false) {
      errorValue = "Only one special character(dot) is allowed"
    }
    this.setParticularField('current_designation', errorValue);
    return !!errorValue;
  };

  /**
   * To validate the all form
   * @returns {Promise<boolean>}
   */
  validateCurrentEmployerForm = async () => {
    let errorValue = "";
    if (!this.state.current_employer || !this.state.current_employer.value) {
      errorValue = "Kindly specify your current company name";
    }
    else if (await validateDesignation([this.state.current_employer.value], 'current_employer') === false) {
      errorValue = "Only one special character(dot) is allowed"
    }
    this.setParticularField('current_employer', errorValue);
    return !!errorValue;
  };

  /**
   * To validate the joined from field
   * @returns {Promise<boolean>}
   */
  validateJoinedInForm = async () => {
    let errorValue = "";
    if (!this.state.joined_on) {
      errorValue = "Kindly specify your joined date";
    }
    this.setParticularField('joined_on', errorValue);
    return !!errorValue;
  };

  /**
   * To validate the Left in field
   * @returns {Promise<boolean>}
   */
  validateLeftInForm = async () => {
    let errorValue = "";
    if (this.state.is_current_job_view) {
      return false;
    }
    let left_on = new Date(this.state.left_on).getTime(), joined_on = new Date(this.state.joined_on).getTime();
    if (!this.state.left_on) {
      errorValue = "Kindly specify your left date";
    } else if (left_on <= joined_on) {
      errorValue = "Left date must be greater than the joined date"
    }
    this.setParticularField('left_on', errorValue);

    return !!errorValue;
  };

  /**
   *  To assign the error of fields
   */
  setParticularField = (name, value) => {
    const errorName = name + '_error';
    this.setState({
      [errorName]: value,
    })
  };

  /**
   * To validate each field calling particular function
   * @param fieldName
   */
  validateFields = fieldName => {
    switch (fieldName) {
      case 'job_profile':
        this.validateJobProfileForm();
        break;
      case 'current_designation':
        this.validateCurrentDesignationForm();
        break;
      case 'current_employer':
        this.validateCurrentEmployerForm();
        break;
      case 'joined_on':
        this.validateJoinedInForm();
        break;
      case 'left_on':
        this.validateLeftInForm();
        break;
    }
  };

  //Remove Error on focus
  removeErrorFocus = (e) => {
    this.setParticularField(e.target.name, '');
  };

  /**
   * on click of save button ,calling an api
   * @returns {Promise<void>}
   */
  handleSave = async () => {
    await this.validateCurrentDesignationForm();
    await this.validateCurrentEmployerForm();
    await this.validateJoinedInForm();
    await this.validateLeftInForm();
    const {current_employer_error, current_designation_error, job_profile_error, joined_on_error, left_on_error} = this.state;
    if (!current_employer_error && !current_designation_error && !joined_on_error && !left_on_error) {
      let join_in = new Date(this.state.joined_on).getFullYear() + "-" + (new Date(this.state.joined_on).getMonth() + 1) + "-" + new Date(this.state.joined_on).getDate();
      let left_on = new Date(this.state.left_on).getFullYear() + "-" + (new Date(this.state.left_on).getMonth() + 1) + "-" + new Date(this.state.left_on).getDate();
      let finalData = [{
        'is_current_job': this.state.is_current_job_view,
        'job_profile': this.state.job_profile,
        'join_in': join_in,
        'left_on': left_on !== "1970-01-01" ? left_on : null,
        'designation': this.state.current_designation.key + '',
        'employer': this.state.current_employer.key + ''
      }];
      try {
        const header = {
          'authorization': handleLocalStorage("get", "employerLogin")
        }
        let type = this.state.id ? 'patch' : 'post';
        let url = EMPLOYER_ADD_WORK_EXP_DETAILS;
        if (type === 'patch') {
          url = EMPLOYER_UPDATE_WORK_EXP_DETAILS;
          finalData[0]["id"] = this.state.id
        }
        let response = await apiCall(type, type == "patch" ? finalData[0] : finalData, url, header)
        if (response.status) {
          let getResponseData = await apiCall("get", null, EMPLOYER_GET_WORK_EXP_DETAILS, header)

          if (getResponseData && getResponseData.status) {
            let finalData = []
            for (let exp of getResponseData.data) {
              let expNew = {
                is_view_mode: true,
                current_designation: exp.designation,
                current_employer: exp.employer,
                job_profile: exp.job_profile,
                joined_on: exp.join_in,
                left_on: exp.left_on,
                is_current_job_view: exp.is_current_job,
                id: exp.id
              }
              finalData.push(expNew)
            }
            this.props.onclick(finalData)
          }
        }
      }
      catch (e) {
      }
    }
  };

  render() {
    const {experience_id, classes} = this.props;
    const {selectedDate, is_current_job_view, job_profile, current_designation, current_employer, joined_on, left_on} = this.state;
    const {current_designation_error, current_employer_error, job_profile_error, joined_on_error, left_on_error} = this.state;

    return (
      <form className="experience  ml-sm-36 ml-16 px-12 px-sm-28"
      >
        <div className="delete-div">
          <FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  id="current_employment"
                  name="current_employment"
                  classes={{checked: 'tick-checkbox-employer-experience-edit'}}
                  defaultChecked={is_current_job_view}
                  onChange={(event) => {
                    this.setState({is_current_job_view: event.target.checked})
                  }}
                  icon={<CustomIcon icon={defaultUntick} iconStyle="untick-checkbox"/>}
                />
              }
              label={<span className="change-label-style">Current Employment</span>}
            />
          </FormControl>
          <p>{is_current_job_view}</p>
          <div>
            <CustomIcon icon={deleteIcon} onclick={(e) => {
              this.props.deleteExperiences(experience_id)
            }}/>
          </div>
        </div>
        <Grid container spacing={32} style={{marginBottom: '17px'}}>
          <Grid item xs={12} md={6}>
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
              {'Current Designation'}
            </InputLabel>
            <CreatableRemoteDataSingleSelectDropdown
              isSearchable={true}
              apiUrl={JOB_ROLE}
              queryParams={{search: ''}}
              defaultValue={current_designation && current_designation.value ? {
                value: current_designation.key,
                label: current_designation.value
              } : ''}
              getSelectedOption={(option) => this.setDropdownOption(option, 'current_designation', true)}
              isClearable={true}
              error={current_designation_error}
            />
            {current_designation_error ? <FormHelperText error={current_designation_error} id="firstName_error">
                        <span className="field_error">
                          {current_designation_error}
                        </span>
            </FormHelperText> : null}
          </Grid>
          <Grid item xs={12} md={6}>
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
              {'Current Employer'}
            </InputLabel>
            <CreatableRemoteDataSingleSelectDropdown
              isSearchable={true}
              apiUrl={ORGANISATION}
              queryParams={{search: ''}}
              defaultValue={current_employer && current_employer.value ? {
                value: current_employer.key,
                label: current_employer.value
              } : ''}
              getSelectedOption={(option) => this.setDropdownOption(option, 'current_employer', true)}
              isClearable={true}
              error={current_employer_error}
            />
            {current_employer_error ? <FormHelperText error={current_employer_error} id="firstName_error">
                        <span className="field_error">
                          {current_employer_error}
                        </span>
            </FormHelperText> : null}
          </Grid>
        </Grid>
        <Grid container spacing={32}>
          <Grid item xs={12}>
            <FormControl className="form-child" error={job_profile_error}>
              <InputLabel
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                  error: classes.cssError
                }}
                htmlFor=""
                shrink={true}>Job Profile</InputLabel>
              <Input
                id="job_profile"
                name="job_profile"
                onChange={this.handleJobProfileChange}
                onFocus={this.removeErrorFocus}
                value={job_profile}
              >
              </Input>
            </FormControl>
          </Grid>
        </Grid>
        <div className="profile-character-info">
          <CustomTag text="Character left:" className="character-left"/>&nbsp;
          <CustomTag text={job_profile ? 500 - job_profile.length : 500} className="count"/>
        </div>
        <Grid container spacing={32}>
          <Grid item xs={12} md={6}>
            <FormControl className="form-child" error={joined_on_error ? true : false}>
              <MuiThemeProvider theme={customTheme}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    id="joined_on"
                    name="joined_on"
                    margin="normal"
                    label={<span className="change-label-style">Joined in</span>}
                    value={joined_on}
                    views={["year", "month"]}
                    style={{marginBottom: '0px'}}
                    maxDate={new Date()}
                    onChange={(value) => this.handleInput({target: {value: value, name: "joined_on"}}, true)}
                    onBlur={() => this.validateFields('joined_on')}
                    onFocus={this.removeErrorFocus}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">
                        <CustomIcon icon={calendar} className="search-icon"/>
                      </InputAdornment>,
                    }}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </MuiPickersUtilsProvider>
              </MuiThemeProvider>
              {joined_on_error && <FormHelperText>{joined_on_error}</FormHelperText>}
            </FormControl>
          </Grid>
          {is_current_job_view === true ? null :
            <Grid item xs={12} md={6}>
              <FormControl className="form-child" error={left_on_error ? true : false}>
                <MuiThemeProvider theme={customTheme}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      id="left_on"
                      name="left_on"
                      margin="normal"
                      label={<span className="change-label-style">Left on</span>}
                      value={left_on !== "1970-01-01" ? left_on : null}
                      views={["year", "month"]}
                      style={{marginBottom: '0px'}}
                      maxDate={new Date()}
                      minDate={new Date(joined_on)}
                      onChange={(value) => this.handleInput({target: {value: value, name: "left_on"}}, true)}
                      onBlur={() => this.validateFields('left_on')}
                      onFocus={this.removeErrorFocus}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">
                          <CustomIcon icon={calendar} className="search-icon"/>
                        </InputAdornment>,
                      }}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </MuiThemeProvider>
                {left_on_error && <FormHelperText>{left_on_error}</FormHelperText>}
              </FormControl>
            </Grid>
          }
        </Grid>
        <div className="save-discard">
          <CustomTag text="Save" className="save" onclick={this.handleSave}/>
          <CustomTag text="Discard Changes" className="discard" onclick={this.discardChanges}/>
        </div>
      </form>
    );
  }
}

EmployerExperienceEdit.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  updateEmpWorkExp: bindActionCreators(
    HomePageEmpActions.updateEmpWorkExp,
    dispatch,
  ),
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(EmployerExperienceEdit));
