import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import CustomTag from '../../../../../components/CustomTag';
import CustomIcon from '../../../../../components/CustomIcon/CustomIcon';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AutoCompleteNew from '../../../../../components/AutoCompleteNew';
//import './style.scss';
import Input from '@material-ui/core/Input';
import calendar from '../../../../../../assets/media/icons/calendar.svg';
import { TextField, withStyles } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import untick from '../../../../../../assets/media/icons/untick.svg';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
// import UserBasicDetailsView from '../../../UserProfileFresherView/components/UserBasicDetailsView/UserBasicDetailsView';
import customisedMaterial from '../../../../../styles/customisedMaterial';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import dropdown from '../../../../../../assets/media/icons/dropdown.svg';
import DateTimePicker from '../../../../../components/DateTimePicker';
import MultiSelect from '../../../../../components/MultiSelectDropDown/MultiSelect';
import { apiCall, isObjectAlreadyExist, calculateTotalCount } from '../../../../../Utilities/';
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
const experiences = [];
for (let i = 1; i <= 30; i++) {
  experiences.push(i.toString());
}
class BoxTraining extends Component {
  constructor(props) {
    super(props);
    this.resetErrors();
    this.state = {
      // joined_on: this.getValueFromProp('joined_on'),
      // left_on: this.getValueFromProp('current_designation'),
      // current_designation: this.getValueFromProp('current_designation'),
      // joined_on_error: '',
      // current_designation_error: '',
      course_name: '',
      institute_name: '',
      course_name_error: '',
      institute_name_error: '',
      start_date: '',
      left_date: '',
      start_date_error: '',
      left_date_error: '',
    };
    this.checkForErrors = this.checkForErrors.bind(this);
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
  checkForErrors() {
    let error = false;
    if (typeof this.state.course_name === 'string' || this.state.course_name == '') {
      error = true;
      this.setState({
        course_name_error: 'Kindly specify your Course Name',
      });
    }
    if (typeof this.state.institute_name === 'string' || this.state.institute_name == '') {
      error = true;
      this.setState({
        institute_name_error: 'Kindly specify your Institute Name',
      });
    }
    if (typeof this.state.start_date === 'string' || this.state.start_date == '') {
      error = true;
      this.setState({
        start_date_error: 'Kindly specify your Joined In Date',
      });
    }
    if (typeof this.state.left_date === 'string' || this.state.left_date == '') {
      error = true;
      this.setState({
        left_date_error: 'Kindly specify your Left On Date',
      });
    }
  }
  resetErrors = () => {
    this.setState({
      course_name_error: '',
      institute_name_error: '',
      start_date_error: '',
      left_date_error: '',
    });
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
      case 'course_name':
        this.validateCourseNameForm();
        break;
      case 'institute_name':
        this.validateInstituteNameForm();
        break;
      case 'start_date':
        this.validateStartDateForm();
        break;
      case 'left_date':
        this.validateLeftDateForm();
        break;
    }
  };
  //Remove Error on focus
  removeErrorFocus = e => {
    this.setParticularField(e.target.name, '');
  };
  validateCourseNameForm = async () => {
    let errorValue = '';
    if (!this.state.course_name) {
      errorValue = 'Kindly specify your Course Name';
    }
    this.setParticularField('course_name', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateInstituteNameForm = async () => {
    let errorValue = '';
    if (!this.state.institute_name) {
      errorValue = 'Kindly specify your Institute Name';
    }
    this.setParticularField('institute_name', errorValue);
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

  validateLeftDateForm = async () => {
    let errorValue = '';
    if (!this.state.left_date) {
      errorValue = 'Kindly specify your Left Date';
    }
    this.setParticularField('left_date', errorValue);
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
  // getValueFromProp = key => {
  //   if (!this.props.experience) return null;
  //   return this.props.experience[key] ? this.props.experience[key] : null;
  // };
  // handleInput = (e, validatorAfterSave = null) => {
  //   // const { allFieldsStatus } = this.state;
  //   const { name } = e.target;

  //   // allFieldsStatus[name] = true; //change the touch status of field
  //   let value = e.target.value;
  //   if (['joined_on', 'left_on'].includes(e.target.name)) {
  //     value = new Date(value);
  //   }
  //   this.setState(
  //     {
  //       [name]: value,
  //       // allFieldsStatus
  //     },
  //     () => {
  //       if (validatorAfterSave) {
  //         this.validateFields(name);
  //       }
  //     },
  //   );
  // };
  // validateJoinedInForm = async () => {
  //   let errorValue = '';
  //   if (!this.state.joined_on) {
  //     errorValue = 'Kindly specify your joined date';
  //   }
  //   this.setParticularField('joined_on', errorValue);
  //   return errorValue ? true : false;
  // };
  // //Validate left on Form
  // validateLeftInForm = async () => {
  //   let errorValue = '';

  //   let left_on = new Date(this.state.left_on).getTime(),
  //     joined_on = new Date(this.state.joined_on).getTime();
  //   if (!this.state.left_on) {
  //     errorValue = 'Kindly specify your left date';
  //   } else if (left_on <= joined_on) {
  //     errorValue = 'Left date must be greater than the joined date';
  //   }
  //   this.setParticularField('left_on', errorValue);

  //   return errorValue ? true : false;
  // };
  // validateFields = fieldName => {
  //   switch (fieldName) {
  //     case 'joined_on':
  //       this.validateJoinedInForm();
  //       break;
  //     case 'left_on':
  //       this.validateLeftInForm();
  //       break;
  //     case 'current_designation':
  //       this.validateCurrentDesignationForm();
  //       break;
  //   }
  // };
  //Remove Error on focus
  removeErrorFocus = e => {
    this.setParticularField(e.target.name, '');
  };
  handleInput = (e, validatorAfterSave = null) => {
    const { name } = e.target;
    this.setState(
      {
        [name]: e.target.value,
        [`${name}_error`]: '',
      },
      () => {
        // debugger;
        this.validateFields(name);
      },
    );
  };
  setParticularField = (name, value) => {
    const errorName = name + '_error';
    this.setState({
      [errorName]: value,
    });
  };

  render() {
    const { course_name, classes } = this.props;
    const {
      // joined_on_error,
      // left_on_error,

      // current_designation,
      // current_designation_error,
      start_date,
      left_date,
      start_date_error,
      left_date_error,
      course_name_error,
      institute_name_error,
      institute_name,
    } = this.state;
    //const { joined_on, left_on } = this.state;
    return (
      <div>
        <div className="fres-training">
          Training
          <div className="shape mx-15">
            <div className="plus">+</div>
          </div>
        </div>
        <div className="fres-text">Freshers can enter their training details here</div>
        <div className="training-box">
          {/* <div>
            <FormControl className="full-form-child">
              <AutoCompleteNew
                label="Course Name"
                // onClose={(name, data) => {
                //   if (data != null && data.value !== '')
                //     this.setParticularState('job_role', data);
                // }}
                //width={rightHalf}
                //apiUrl={JOB_ROLE}
                //filterKey={'value'}
                //value={course_name}
                method="get"
                //selectedValues={[job_role]}
                name="current_designation"
                onClose={(name, data) => {
                  if (data) {
                    if (typeof data === 'string') {
                      this.handleInput(
                        { target: { value: { value: data, key: data }, name } },
                        true,
                      );
                    } else this.handleInput({ target: { value: data, name } }, true);
                  } else {
                    this.validateFields(name);
                  }
                }}
                onFocus={this.removeErrorFocus}
                showError={current_designation_error}
              />
            </FormControl>

            <div className="character-info-section">
              <CustomTag text="Minimum Character left : " className="character-left" />
              <CustomTag
                text={course_name === '' ? 50 : 50 - course_name.length}
                className="count"
              />
            </div>
          </div> */}
          <FormControl className="full-form-child" style={{ marginTop: '13px' }}>
            <InputLabel
              classes={{ root: classes.helperText }}
              style={{ marginTop: '-12px' }}
              //className="change-label-style"
              shrink={true}
              classes={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
                error: classes.cssError,
              }}
              shrink={true}
              htmlFor="course_name"
            >
              {'Course Name'}
            </InputLabel>
            <Input
              name="course_name"
              type="text"
              //value={course_name}
              onChange={this.handleInput}
              onBlur={() => this.validateFields('course_name')}
              onFocus={this.removeErrorFocus}
              autoComplete="off"
              error={course_name_error ? course_name_error : false}
            />

            {course_name_error ? (
              <FormHelperText error={course_name_error} id="firstName_error">
                <span className="field_error">{course_name_error}</span>
              </FormHelperText>
            ) : null}
            <div className="character-info-section">
              <CustomTag text="Minimum Character left : " className="character-left" />
              <CustomTag
                text={course_name === '' ? 50 : 50 - course_name.length}
                className="count"
              />
            </div>
          </FormControl>

          <FormControl className="full-form-child" style={{ marginTop: '13px' }}>
            <InputLabel
              classes={{ root: classes.helperText }}
              style={{ marginTop: '-12px' }}
              //className="change-label-style"
              shrink={true}
              classes={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
                error: classes.cssError,
              }}
              shrink={true}
              htmlFor="institute_name"
            >
              {'Institute Name'}
            </InputLabel>
            <Input
              // isSearchable={true}
              // //apiUrl={JOB_ROLE}
              // getSelectedOption={option => this.setDropdownOption(option, 'institute_name')}
              // defaultValue={
              //   institute_name ? { value: institute_name.key, label: institute_name.value } : {}
              // }
              // isClearable={true}
              // error={institute_name_error ? institute_name_error : false}
              name="institute_name"
              type="text"
              //value={institute_name}
              onChange={this.handleInput}
              onBlur={() => this.validateFields('institute_name')}
              onFocus={this.removeErrorFocus}
              autoComplete="off"
              error={institute_name_error ? institute_name_error : false}
            />

            {institute_name_error ? (
              <FormHelperText error={institute_name_error} id="firstName_error">
                <span className="field_error">{institute_name_error}</span>
              </FormHelperText>
            ) : null}
            <div className="character-info-section">
              <CustomTag text="Minimum Character left : " className="character-left" />
              <CustomTag
                text={course_name === '' ? 50 : 50 - course_name.length}
                className="count"
              />
            </div>
          </FormControl>

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
                    label="Joined in"
                    //value={joined_on}
                    views={['year', 'month']}
                    style={{ marginBottom: '0px' }}
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
                error={left_date_error ? true : false}
              >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    id="left_date"
                    name="left_date"
                    margin="normal"
                    label="Left on"
                    //value={left_on}
                    views={['year', 'month']}
                    style={{ marginBottom: '0px' }}
                    maxDate={new Date()}
                    minDate={new Date(left_date)}
                    onChange={value =>
                      this.handleInput({ target: { value: value, name: 'left_date' } }, true)
                    }
                    onBlur={() => this.validateFields('left_date')}
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
                {left_date_error && <FormHelperText>{left_date_error}</FormHelperText>}
              </FormControl>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(BoxTraining);
