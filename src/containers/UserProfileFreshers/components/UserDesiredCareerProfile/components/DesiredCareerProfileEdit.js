import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import CustomTag from '../../../../../components/CustomTag';
import CustomIcon from '../../../../../components/CustomIcon/CustomIcon';
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
import { CURRENCY } from '../../../../../../config/constants';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { apiCall, isObjectAlreadyExist, calculateTotalCount } from '../../../../../Utilities/';

import CreatableRemoteDataSingleSelectDropdown from '../../../../../components/SingleSelectDropdownWrapper/components/CreatableRemoteDataSingleSelectDropdown/CreatableRemoteDataSingleSelectDropdown';
import NonCreatableSingleSelectDropdown from '../../../../../components/SingleSelectDropdownWrapper/components/NonCreatableSingleSelectDropdown/NonCreatableSingleSelectDropdown';
import { POST_JOB, JOB_ROLE, INDUSTRY, FUNCTIONAL_AREA } from '../../../../../../config/constants';
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
  //experiences_year.push(i.toString());
  experiences_year.push({ key: i, value: i });
}
const experiences_month = [];
for (let i = 1; i <= 12; i++) {
  //experiences_month.push(i.toString());
  experiences_month.push({ key: i, value: i });
}
const jobTypes = [
  { key: 1, value: 'Full time' },
  { key: 2, value: 'Part time' },
  { key: 3, value: 'full-time work from home' },
  { key: 4, value: 'part-time work from home' },
  { key: 5, value: 'freelancer' },
];
class DesiredCareerProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      desired_profile: [],
      desired_career: props.desired_career,
      industry: '',
      functional_area: '',
      role: '',
      job_type: '',
      month: '',
      year: '',
      expected_salary: '',
      salary: '',
      desired_location: '',
      desired_industry: '',
      industry_error: '',
      functional_area_error: '',
      role_error: '',
      job_type_error: '',
      month_error: '',
      year_error: '',
      expected_salary_error: '',
      salary_error: '',
      desired_location_error: '',
      desired_industry_error: '',
      //checkForErrors: props.checkForErrors,
      // allFieldsStatus: {
      //   industry: false,
      //   functional_area: false,
      //   role: false,
      //   job_type: false,
      //   month: false,
      //   year: false,
      //   desired_location: false,
      //   desired_industry: false,
      //   expected_salary: false,
      //   salary: false,
      // },
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
    if (typeof this.state.industry === 'string' || this.state.industry == '') {
      error = true;
      this.setState({
        industry_error: 'Kindly specify your Industry',
      });
    }
    if (typeof this.state.functional_area === 'string' || this.state.functional_area == '') {
      error = true;
      this.setState({
        functional_area_error: 'Kindly specify your Functional Area',
      });
    }
    if (typeof this.state.role === 'string' || this.state.role == '') {
      error = true;
      this.setState({
        role_error: 'Kindly specify your role',
      });
    }
    if (typeof this.state.job_type === 'string' || this.state.job_type == '') {
      error = true;
      this.setState({
        job_type_error: 'Kindly specify your Job Type',
      });
    }
    if (typeof this.state.expected_salary === 'string' || this.state.expected_salary == '') {
      error = true;
      this.setState({
        expected_salary_error: 'Kindly specify your Expected Salary',
      });
    }
    if (typeof this.state.salary === 'string' || this.state.salary == '') {
      error = true;
      this.setState({
        salary_error: 'Kindly specify your Salary',
      });
    }
    if (typeof this.state.desired_location === 'string' || this.state.desired_location == '') {
      error = true;
      this.setState({
        desired_location_error: 'Kindly specify your Desired Location',
      });
    }
    if (typeof this.state.desired_industry === 'string' || this.state.desired_industry == '') {
      error = true;
      this.setState({
        desired_industry_error: 'Kindly specify your Desired Industry',
      });
    }
  }
  resetErrors = () => {
    this.setState({
      industry_error: '',
      functional_area_error: '',
      role_error: '',
      job_type_error: '',
      month_error: '',
      year_error: '',
      expected_salary_error: '',
      salary_error: '',
      desired_location_error: '',
      desired_industry_error: '',
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
        // debugger;
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
      case 'industry':
        this.validateIndustryForm();
        break;
      case 'functional_area':
        this.validateFunctionalAreaForm();
        break;
      case 'role':
        this.validateRoleForm();
        break;
      case 'job_type':
        this.validateJobTypeForm();
        break;
      case 'month':
        this.validateMonthForm();
        break;
      case 'year':
        this.validateYearForm();
        break;
      case 'expected_salary':
        this.validateExpectedSalaryForm();
        break;
      case 'salary':
        this.validateSalaryForm();
        break;
      case 'desired_location':
        this.validateDesiredLocationForm();
        break;
      case 'desired_industry':
        this.validateDesiredIndustryForm();
        break;
    }
  };
  //Remove Error on focus
  removeErrorFocus = e => {
    this.setParticularField(e.target.name, '');
  };

  validateIndustryForm = async () => {
    let errorValue = '';
    if (!this.state.industry || !this.state.industry.value) {
      errorValue = 'Kindly specify your Industry';
    }
    this.setParticularField('industry', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateFunctionalAreaForm = async () => {
    let errorValue = '';
    if (!this.state.functional_area || !this.state.functional_area.value) {
      errorValue = 'Kindly specify your Functional Area';
    }
    this.setParticularField('functional_area', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateRoleForm = async () => {
    let errorValue = '';
    if (!this.state.role || !this.state.role.value) {
      errorValue = 'Kindly specify your Role';
    }
    this.setParticularField('role', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateJobTypeForm = async () => {
    let errorValue = '';
    if (!this.state.job_type || !this.state.job_type.value) {
      errorValue = 'Kindly specify your Job Type';
    }
    this.setParticularField('job_type', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateMonthForm = async () => {
    let errorValue = '';
    if (!this.state.month) {
      errorValue = 'Kindly specify number of Months';
    }
    this.setParticularField('month', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateYearForm = async () => {
    let errorValue = '';
    if (!this.state.year) {
      errorValue = 'Kindly specify number of Years';
    }
    this.setParticularField('year', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateExpectedSalaryForm = async () => {
    let errorValue = '';
    if (!this.state.expected_salary || !this.state.expected_salary.value) {
      errorValue = 'Kindly specify your Industry';
    }
    this.setParticularField('expected_salary', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateSalaryForm = async () => {
    // debugger;
    let errorValue = '';
    if (!this.state.salary) {
      errorValue = 'Kindly specify your Salary';
    }
    this.setParticularField('salary', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateDesiredLocationForm = async () => {
    let errorValue = '';
    if (!this.state.desired_location || !this.state.desired_location.value) {
      errorValue = 'Kindly specify your Desired Location';
    }
    this.setParticularField('desired_location', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateDesiredIndustryForm = async () => {
    let errorValue = '';
    if (!this.state.desired_industry || !this.state.desired_industry.value) {
      errorValue = 'Kindly specify your Desired Industry';
    }
    this.setParticularField('desired_industry', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  setMonths = option => {
    const value = option.label;
    this.setState(
      {
        month: value,
      },
      () => this.validateFields('month'),
    );
  };
  setYears = option => {
    const value = option.label;
    this.setState(
      {
        year: value,
      },

      () => this.validateFields('year'),
    );
  };
  setParticularField = (name, value) => {
    const errorName = name + '_error';
    this.setState({
      [errorName]: value,
    });
  };
  // validateOnSave() {
  //   //debugger;

  //   // let { allFieldsStatus } = this.state;
  //   // for (let field in allFieldsStatus) {
  //   //   allFieldsStatus[field] = true;
  //   // }
  //   // this.setState({ allFieldsStatus: allFieldsStatus });
  //   return this.checkForErrors();
  // }
  render() {
    const { rightHalf, dropdown, leftHalf, fullWidth, allDropDownWidth } = this.props;
    const {
      year1,
      month1,
      industry,
      functional_area,
      role,
      job_type,
      month,
      year,
      expected_salary,
      salary,
      desired_location,
      desired_industry,
      industry_error,
      functional_area_error,
      role_error,
      job_type_error,
      month_error,
      year_error,
      expected_salary_error,
      salary_error,
      desired_location_error,
      desired_industry_error,
    } = this.state;
    const { classes } = this.props;
    return (
      <div className={'basic-emp-container'}>
        {/* <div className="save-emp-header">
          <div className="save-discard">
            <CustomTag
              text="Save"
              //onClick={this.createItem}
              className="save"
              onclick={this.props.onclick}
            />
            <CustomTag text="Cancel" className="cancel_btn" onclick={this.props.onclick} />
          </div>
          <div className="save-emp-details">
            <img src={dropdown} />
            <CustomTag text="Desired Career Profile" className="mx-15" />
            <div className="shape">
              <div className="plus">+</div>
            </div>
          </div>
        </div>
        <div className="hr-line" /> */}
        <div className="fifth full-form-child">
          {/* <FormControl
              style={{ marginRight: '30px' }}
              className={'form-child left-child-form ' + classes.formControl}
            >
              <AutoCompleteNew label="Industry" width={fullWidth} method="get" />
            </FormControl>
            <FormControl className="form-child">
              <AutoCompleteNew label="Functional Area" width={rightHalf} method="get" />
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
                {'Industry'}
              </InputLabel>

              <CreatableRemoteDataSingleSelectDropdown
                isSearchable={true}
                apiUrl={INDUSTRY}
                queryParams={{ search: '' }}
                getSelectedOption={option => this.setDropdownOption(option, 'industry')}
                defaultValue={industry ? { value: industry.key, label: industry.value } : {}}
                isClearable={true}
                error={industry_error ? industry_error : false}
              />
              {industry_error ? (
                <FormHelperText error={industry_error} id="firstName_error">
                  <span className="field_error">{industry_error}</span>
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
                {'Functional Area'}
              </InputLabel>
              <CreatableRemoteDataSingleSelectDropdown
                isSearchable={true}
                apiUrl={FUNCTIONAL_AREA}
                queryParams={{ search: '' }}
                getSelectedOption={option => this.setDropdownOption(option, 'functional_area')}
                defaultValue={
                  functional_area
                    ? { value: functional_area.key, label: functional_area.value }
                    : {}
                }
                isClearable={true}
                error={functional_area_error ? functional_area_error : false}
              />
              {functional_area_error ? (
                <FormHelperText error={functional_area_error} id="firstName_error">
                  <span className="field_error">{functional_area_error}</span>
                </FormHelperText>
              ) : null}
            </FormControl>
          </div>
        </div>
        <div className="fifth full-form-child">
          {/* <FormControl
              style={{ marginRight: '30px' }}
              className={'form-child left-child-form ' + classes.formControl}
            >
              <AutoCompleteNew label="Role" width={fullWidth} method="get" />
            </FormControl>
            <FormControl className="form-child">
              <AutoCompleteNew label="Job Type" width={rightHalf} method="get" />
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
                {'Role'}
              </InputLabel>

              <CreatableRemoteDataSingleSelectDropdown
                isSearchable={true}
                apiUrl={JOB_ROLE}
                queryParams={{ search: '' }}
                getSelectedOption={option => this.setDropdownOption(option, 'role')}
                defaultValue={role ? { value: role.key, label: role.value } : {}}
                isClearable={true}
                error={role_error ? role_error : false}
              />
              {role_error ? (
                <FormHelperText error={role_error} id="firstName_error">
                  <span className="field_error">{role_error}</span>
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
                {'Job Type'}
              </InputLabel>
              <CreatableRemoteDataSingleSelectDropdown
                isSearchable={true}
                queryParams={{ search: '' }}
                getSelectedOption={option => this.setDropdownOption(option, 'job_type')}
                defaultValue={job_type ? { value: job_type.key, label: job_type.value } : {}}
                isClearable={true}
                options={jobTypes}
                error={job_type_error ? job_type_error : false}
              />
              {job_type_error ? (
                <FormHelperText error={job_type_error} id="firstName_error">
                  <span className="field_error">{job_type_error}</span>
                </FormHelperText>
              ) : null}
            </FormControl>
          </div>
        </div>
        <div className="fres-text">Availability to join</div>
        <div className="full-form-child career-fields">
          <div className="box-imm">
            <FormControl component="fieldset" className="radio-button-control">
              <RadioGroup
                aria-label="Gender"
                className="search-radio-buttons"
                //value={this.state.value}
                onChange={this.handleChange}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Immediate" />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="form-child box1">
            <FormControl component="fieldset" className="radio-button-control">
              <RadioGroup
                aria-label="Gender"
                className="search-radio-buttons"
                //value={this.state.value}
                onChange={this.handleChange}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Select Date" />
              </RadioGroup>
            </FormControl>
            <FormControl
              style={{ marginRight: '30px' }}
              className={'one-forth-form one-forth-form-left ' + classes.formControl}
            >
              <InputLabel
                shrink={true}
                style={{ marginTop: '-13px' }}
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                }}
              >
                Months
              </InputLabel>
              {/* <Select
                classes={{
                  // underline: classes.cssUnderline,
                  focused: classes.cssFocused,
                  root: classes.selectText,
                }}
                value={month1}
                onChange={this.onInputChange}
                name="month1"
                // IconComponent={props => (
                //     <i {...props} className={`material-icons ${props.className}`}>
                //     <img src={dropdown} />
                //     </i>
                // )}
                getSelectedOption={option => this.setDropdownOption(option, 'month')}
                defaultValue={month ? { value: month.key, label: month.value } : {}}
                isClearable={true}
                error={month_error ? month_error : false}
              >
                <MenuItem value={'0'}>{'0'}</MenuItem>
                {experiences_month.map(value => {
                  return (
                    <MenuItem classes={{ root: classes.selectText }} value={value}>
                      {value}
                    </MenuItem>
                  );
                })}
              </Select> */}
              <NonCreatableSingleSelectDropdown
                isSearchable={false}
                getSelectedOption={option => this.setMonths(option)}
                defaultValue={month ? { key: month, label: month } : {}}
                options={experiences_month}
                isClearable={false}
                error={month_error}
              />
              {month_error ? (
                <FormHelperText error={month_error} id="firstName_error">
                  <span className="field_error">{month_error}</span>
                </FormHelperText>
              ) : null}
            </FormControl>
            <FormControl
              style={{ marginRight: '30px' }}
              className={'one-forth-form one-forth-form-left ' + classes.formControl}
            >
              <InputLabel
                shrink={true}
                style={{ marginTop: '-13px' }}
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                }}
              >
                Years
              </InputLabel>

              <NonCreatableSingleSelectDropdown
                isSearchable={false}
                getSelectedOption={option => this.setYears(option)}
                defaultValue={year ? { key: year, label: year } : {}}
                options={experiences_year}
                isClearable={false}
                error={year_error}
              />
              {year_error ? (
                <FormHelperText error={year_error} id="firstName_error">
                  <span className="field_error">{year_error}</span>
                </FormHelperText>
              ) : null}
            </FormControl>
          </div>
        </div>
        <div className="fourth full-form-child">
          {/* <FormControl
              style={{ marginRight: '30px' }}
              className={'form-child left-child-form ' + classes.formControl}
            >
              <InputLabel
                classes={{ root: classes.helperText }}
                shrink
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                }}
              >
                Expected Salary
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
              {'Expected Salary'}
            </InputLabel>

            <CreatableRemoteDataSingleSelectDropdown
              isSearchable={true}
              //apiUrl={INDUSTRY}
              queryParams={{ search: '' }}
              getSelectedOption={option => this.setDropdownOption(option, 'expected_salary')}
              defaultValue={
                expected_salary ? { value: expected_salary.key, label: expected_salary.value } : {}
              }
              isClearable={true}
              error={expected_salary_error ? expected_salary_error : false}
            />
            {expected_salary_error ? (
              <FormHelperText error={expected_salary_error} id="firstName_error">
                <span className="field_error">{expected_salary_error}</span>
              </FormHelperText>
            ) : null}
          </FormControl>

          <FormControl className={'form-child ' + classes.formControl}>
            <InputLabel
              classes={{ root: classes.helperText }}
              classes={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
              }}
              shrink={true}
              htmlFor="salary"
            >
              Salary
            </InputLabel>
            <Input
              name="salary"
              type="number"
              value={salary}
              onChange={this.handleInput}
              onBlur={() => this.validateFields('salary')}
              onFocus={this.removeErrorFocus}
              autoComplete="off"
              error={salary_error ? salary_error : false}
            />
            {salary_error ? (
              <FormHelperText error={salary_error} id="firstName_error">
                <span className="field_error">{salary_error}</span>
              </FormHelperText>
            ) : null}
          </FormControl>
        </div>
        <div className="fifth full-form-child">
          {/* <FormControl
              style={{ marginRight: '30px' }}
              className={'form-child left-child-form ' + classes.formControl}
            >
              <AutoCompleteNew label="Desired Location" width={fullWidth} method="get" />
            </FormControl>
            <FormControl className="form-child">
              <AutoCompleteNew label="Desired Industry" width={rightHalf} method="get" />
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
                {'Desired Location'}
              </InputLabel>

              <CreatableRemoteDataSingleSelectDropdown
                isSearchable={true}
                //apiUrl={INDUSTRY}
                queryParams={{ search: '' }}
                getSelectedOption={option => this.setDropdownOption(option, 'desired_location')}
                defaultValue={
                  desired_location
                    ? { value: desired_location.key, label: desired_location.value }
                    : {}
                }
                isClearable={true}
                error={desired_location_error ? desired_location_error : false}
              />
              {desired_location_error ? (
                <FormHelperText error={desired_location_error} id="firstName_error">
                  <span className="field_error">{desired_location_error}</span>
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
                {'Desired Industry'}
              </InputLabel>
              <CreatableRemoteDataSingleSelectDropdown
                isSearchable={true}
                apiUrl={INDUSTRY}
                queryParams={{ search: '' }}
                getSelectedOption={option => this.setDropdownOption(option, 'desired_industry')}
                defaultValue={
                  desired_industry
                    ? { value: desired_industry.key, label: desired_industry.value }
                    : {}
                }
                isClearable={true}
                error={desired_industry_error ? desired_industry_error : false}
              />
              {desired_industry_error ? (
                <FormHelperText error={desired_industry_error} id="firstName_error">
                  <span className="field_error">{desired_industry_error}</span>
                </FormHelperText>
              ) : null}
            </FormControl>
          </div>
        </div>
      </div>
    );
  }
}

export default DesiredCareerProfileEdit;
