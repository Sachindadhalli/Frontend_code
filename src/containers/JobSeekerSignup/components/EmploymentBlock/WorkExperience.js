//library dependencies
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {DateFormatInput} from 'material-ui-next-pickers';
import {debug} from 'util';
import {Checkbox, FormControl, FormHelperText, Grid, InputAdornment, InputLabel, TextField} from "@material-ui/core";
//styles
import "./styles.scss";
//custom components
import CustomIcon from '../../../../components/CustomIcon';
import NonCreatableSingleSelectDropdown from '../../../../components/SingleSelectDropdownWrapper/components/NonCreatableSingleSelectDropdown'
import NonCreatableRemoteDataSingleSelectDropdown from '../../../../components/SingleSelectDropdownWrapper/components/NonCreatableRemoteDataSingleSelectDropdown'
import CreatableRemoteDataSingleSelectDropdown from '../../../../components/SingleSelectDropdownWrapper/components/CreatableRemoteDataSingleSelectDropdown'
//icons
import calendar from '../../../../../assets/media/icons/calendar.svg';
//utilities
import {CITY, COMPANY, COUNTRY, JOB_ROLE, STATE} from "../../../../../config/constants";
import validateDesignation from '../../../../Utilities/validateDesignation';

//material ui customized classes
const styles = theme => ({
  root: {display: 'flex', flexWrap: 'wrap'},
  margin: {margin: theme.spacing.unit},
  withoutLabel: {marginTop: theme.spacing.unit * 3},
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
  textField: {flexBasis: 70,},
  input: {display: 'none',},
});

//static dropdown data of notice period
const noticePeriodList = [
  {value: 'Immediate', key: 1},
  {value: 'Less than 15 days', key: 2},
  {value: '1 month', key: 3},
  {value: '2 months', key: 4},
  {value: '3 months', key: 5},
];

class WorkExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      experience: props.employment,
      is_current_job: false,
      job_title: '',
      annual_salary: '',
      notice_period: '',
      country: '',
      state: '',
      city: '',
      description: '',
      job_title_error: '',
      start_date_error: '',
      end_date_error: '',
      company_name_error: false,
      notice_period_error: '',
      country_error: '',
      city_error: '',
      state_error: '',
      company_name_error_text: '',
      annual_salary_error: false,
      annual_salary_error_text: '',
      description_error: false,
      description_error_text: '',
      checkExpericeceErrors: props.checkExpericeceErrors,
      allFieldsStatus: {
        startDate: false,
        endDate: false,
        jobTitle: false,
        companyName: false,
        annualSalary: false,
        Country: false,
        State: false,
        City: false,
      },
    };
  }

  componentDidMount() {
    if (this.props.checkExpericeceErrors === true) {
      this.checkExpericeceErrors();
    }
    //sending WorkExperience ref to the parent on mount
    this.props.onRef(this)
  }

  componentWillUnmount() {
    // on will unmount sending null as a ref to the parent component
    this.props.onRef(null)
  }

  /**
   * @function validating all work experience blocks on click of register
   * @return {*}
   */
  validateOnRegister() {
    let {allFieldsStatus} = this.state
    for (let field in allFieldsStatus) {
      allFieldsStatus[field] = true;
    }
    this.setState({allFieldsStatus: allFieldsStatus})
    return this.checkExpericeceErrors()
  }

  componentDidUpdate() {
    // on click of checkExpericeceErrors, validating work experience block form
    if (
      this.state.checkExpericeceErrors !== this.props.checkExpericeceErrors &&
      this.props.checkExpericeceErrors === true
    ) {
      this.checkExpericeceErrors();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.experience) {
      this.setState({
          experience: nextProps.experience,
        }, e => {
          if (nextProps.checkExpericeceErrors) {
            this.checkExpericeceErrors();
          }
        },
      );
    }
  }

  /**
   * @function to check form errors
   * @return {boolean}
   */
  checkExpericeceErrors() {
    let error = false;
    if (!this.state.experience.job_title) {
      error = true;
      this.setState({job_title_error: 'Kindly specify your current designation'});
    }
    if (this.state.experience.job_title.value !== '' && !validateDesignation(this.state.experience.job_title.value)) {
      error = true;
      this.setState({
        job_title_error: 'Only Alphabets, Dots And Spaces Are Allowed. Must Start With An Alphabet'
      })
    }
    if (this.state.experience.start_date === '') {
      error = true;
      this.setState({start_date_error: 'Kindly specify your Start Date'})
    }
    if (this.state.experience.company_name === '') {
      error = true;
      this.setState({company_name_error: 'Kindly specify your company name'})
    }
    if (this.state.experience.is_current_job) {
      if (this.state.experience.annual_salary === '') {
        error = true;
        this.setState({
          annual_salary_error: true,
          annual_salary_error_text: 'Kindly specify your annual salary'
        })
      }
      let annual_salary = parseFloat(this.state.experience.annual_salary)
      if (annual_salary <= 0 || annual_salary > 100) {
        error = true;
        this.setState({
          annual_salary_error: true,
          annual_salary_error_text: "Annual salary should be in range of 0.1 to 100"
        })
      }
      if (this.state.experience.country === '') {
        error = true;
        this.setState({country_error: 'Kindly specify your country'})
      }
      if (this.state.experience.state === '') {
        error = true;
        this.setState({state_error: 'Kindly specify your state'})
      }
      if (this.state.experience.city === '') {
        error = true;
        this.setState({city_error: 'Kindly specify your city'})
      }
    } else {
      if (
        Date.parse(this.state.experience.start_date) >=
        Date.parse(this.state.experience.end_date)
      ) {
        error = true;
        this.setState({end_date_error: 'End date must be bigger than the start date'});
      }
      if (this.state.experience.end_date == '') {
        error = true;
        this.setState({end_date_error: 'Kindly specify your End Date'})
      }
    }
    this.props.checkedForErrors(error);
    return error;
  }

  /**
   * @function to send employment index to remove the employment block from list
   */
  removeEmployment() {
    this.props.removeEmployment(this.props.index);
  }

  /**
   * @function to update the changes of annual salary in the component state
   * @param event
   * @constructor
   */
  AnnualChange = (event) => {
    this.fieldTouched('annualSalary');
    const {experience} = this.state;
    experience.annual_salary = event.target.value;
    this.setState({
        experience,
        annual_salary_error: false,
        annual_salary_error_text: ''
      }, () => {
        this.checkExpericeceErrors();
      },
    );
  };

  /**
   * @function to update the selected company name in the state
   * @param option
   */
  setCompanyOption = (option) => {
    if (option) {
      const {experience} = this.state;
      experience.company_name = {key: option.value, value: option.label};
      this.setState({
        experience,
        company_name_error: ''
      }, () => {
        this.checkExpericeceErrors()
      });
    }
  };

  /**
   * @function to update the state date and error as '' string in component state
   * @param event
   */
  onstart_date = (event) => {
    this.fieldTouched('startDate')
    const {experience} = this.state;
    experience.start_date = new Date(event);
    this.setState({
      experience,
      start_date_error: ''
    }, () => {
      this.checkExpericeceErrors()
    });
  };

  /**
   * @function to update the end date and error as '' string in component state
   * @param event
   */
  onend_date(event) {
    this.fieldTouched('endDate');
    const {experience} = this.state;
    experience.end_date = new Date(event);
    this.setState({
      experience,
      end_date_error: ''
    }, () => {
      this.checkExpericeceErrors();
    });
  }

  /**
   * @function to update the current job checkbox state
   * @param event
   */
  chooseCurrentJob(event) {
    const {experience} = this.state;
    if (event.currentTarget.checked) {
      experience.is_current_job = true;
      this.setState({experience})
    } else {
      experience.is_current_job = false;
      this.setState({experience})
    }
  }

  /**
   * @function to update state with the selected job title option from dropdown
   * @param option
   */
  setJotTitleOption = (option) => {
    if (option) {
      const {experience} = this.state
      experience.job_title = {key: option.value, value: option.label};
      this.setState({
        experience,
        job_title_error: ''
      }, () => {
        this.checkExpericeceErrors()
      });
    }
  };

  /**
   * @function to update state with selected country option from dropdown
   * @param option
   */
  setCountryOption = (option) => {
    if (option) {
      const {experience} = this.state;
      experience.country = {key: option.value, value: option.label};
      this.setState({
        experience,
        country_error: ''
      }, () => {
        this.checkExpericeceErrors();
      });
    }
  };

  /**
   * @function to update state with selected state from the dropdown
   * @param option
   */
  setStateOption = (option) => {
    if (option) {
      const {experience} = this.state;
      experience.state = {key: option.value, value: option.label};
      this.setState({
        experience,
        state_error: ''
      }, () => {
        this.checkExpericeceErrors();
      });
    }
  };

  /**
   * @function to update state with selected city option from the dropdown
   * @param option
   */
  setCityOption = (option) => {
    if (option) {
      const {experience} = this.state;
      experience.city = {key: option.value, value: option.label};
      this.setState({
        experience,
        city_error: ''
      }, () => {
        this.checkExpericeceErrors()
      });
    }
  };

  /**
   * @function to update state with entered description
   * @param event
   */
  setDescription = (event) => {
    this.fieldTouched('Description');
    const {experience} = this.state;
    if (event.target.value.length <= 300) {
      experience.description = event.target.value;
      this.setState({
        experience,
        description_error: ''
      }, () => {
        this.checkExpericeceErrors()
      })
    }
  };

  /**
   * @function to update the state with selected notice period from the dropdown
   * @param option
   */
  setNoticePeriodOption = (option) => {
    if (option) {
      const {experience} = this.state
      experience.notice_period = {key: option.value, value: option.label};
      this.setState({
        experience,
      });
    }
  };

  /**
   * @function to update field in state, when form fields are touched
   * @param id
   */
  fieldTouched(id) {
    const {allFieldsStatus} = this.state;
    allFieldsStatus[id] = true;
    this.setState({allFieldsStatus});
  }

  render() {
    const {classes} = this.props;
    const {experience, job_title_error, start_date_error, end_date_error, company_name_error} = this.state;
    const stateVariables = this.state;
    return (
      <div className="employment-container" style={{width: '90%'}}>
        <div>
          <FormControl style={{width: '100%'}}>
            <Grid item xs={12} style={{marginLeft: '-16px'}}>
              <Checkbox checked={experience.is_current_job} onChange={this.chooseCurrentJob.bind(this)}
                        value="current-employment"/>
              <span className="change-label-style">Current job</span>
            </Grid>
          </FormControl>
          <Grid
            container
            spacing={16}
            direction="row"
          >
            <Grid item xs={6}>
              <FormControl style={{width: '100%'}}>
                <DateFormatInput
                  name="date-input"
                  value={experience.start_date && typeof experience.start_date == "string" ? experience.start_date != "" ? new Date(experience.start_date) : new Date() : experience.start_date}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  FormControlProps={{
                    error: this.state.allFieldsStatus['startDate'] && start_date_error !== ''
                  }}
                  onChange={this.onstart_date.bind(this)}
                  fullWidth={true}
                  InputLabelProps={{
                    shrink: true,
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                      error: classes.cssError
                    },
                  }}
                  onBlur={() => {
                    this.fieldTouched('startDate')
                  }}
                  max={new Date()}
                  label="Start Date"
                  errorStyle={{color: '#eaeaea'}}
                  error={this.state.allFieldsStatus['startDate'] ?
                    <span style={{color: '#f0582b'}}>{start_date_error}</span> : null}
                  endIcon={<CustomIcon iconStyle="end-icon" icon={calendar}/>}
                />
              </FormControl>
            </Grid>
            {!experience.is_current_job ? <Grid item xs={6}>
              <FormControl style={{width: '100%'}}>
                <DateFormatInput
                  name="date-input"
                  value={experience.end_date && typeof experience.end_date == "string" ? experience.end_date != "" ? new Date(experience.end_date) : new Date() : experience.end_date}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  FormControlProps={{
                    error: this.state.allFieldsStatus['endDate'] && end_date_error !== ''
                  }}
                  onChange={this.onend_date.bind(this)}
                  fullWidth={true}
                  InputLabelProps={{
                    shrink: true,
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                      error: classes.cssError
                    },
                  }}
                  onBlur={() => {
                    this.fieldTouched('endDate')
                  }}
                  max={new Date()}
                  errorStyle={{color: '#eaeaea'}}
                  error={this.state.allFieldsStatus['endDate'] ?
                    <span style={{color: '#f0582b'}}>{end_date_error}</span> : null}
                  label="End Date"
                  endIcon={<CustomIcon iconStyle="end-icon" icon={calendar}/>}
                />
              </FormControl>
            </Grid> : null}

          </Grid>
          <Grid item xs={12} className="mt-28">
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
              {'Job Title'}
            </InputLabel>
            <CreatableRemoteDataSingleSelectDropdown
              isSearchable={true}
              apiUrl={JOB_ROLE}
              queryParams={{search: ''}}
              defaultValue={experience.job_title.value ? {
                value: experience.job_title.key,
                label: experience.job_title.value
              } : ''}
              getSelectedOption={(option) => this.setJotTitleOption(option)}
              isClearable={true}
              error={this.state.allFieldsStatus['jobTitle'] && job_title_error}
            />
            {this.state.allFieldsStatus['jobTitle'] && job_title_error ?
              <FormHelperText error={job_title_error !== ''} id="firstName_error">
                        <span className="field_error">
                          {job_title_error}
                        </span>
              </FormHelperText> : null}
          </Grid>
          <Grid item xs={12} className="mt-28">
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
              {'Company Name'}
            </InputLabel>
            <CreatableRemoteDataSingleSelectDropdown
              isSearchable={true}
              apiUrl={COMPANY}
              queryParams={{search: ''}}
              defaultValue={experience.company_name.value ? {
                value: experience.company_name.key,
                label: experience.company_name.value
              } : ''}
              getSelectedOption={(option) => this.setCompanyOption(option)}
              isClearable={true}
              error={this.state.allFieldsStatus['companyName'] && company_name_error}
            />
            {this.state.allFieldsStatus['companyName'] && company_name_error ?
              <FormHelperText error={company_name_error !== ''} id="firstName_error">
                        <span className="field_error">
                          {company_name_error}
                        </span>
              </FormHelperText> : null}
          </Grid>
          {experience.is_current_job ? this.CurrentJob(stateVariables) : null}

          {this.props.index !== 0 &&
          <div className='remove-experience' onClick={this.removeEmployment.bind(this)}>Remove</div>}
        </div>
      </div>
    );
  }

  CurrentJob(stateVariables) {
    const prop = stateVariables;
    const {classes} = this.props;
    return (
      <div>
        <Grid container
              spacing={16}
              direction="row">
          <Grid item xs={6} className="mt-32 textfield-specifivity-label">
            <TextField
              id="standard-error"
              label={<span style={{color: '#656565', fontFamily: 'Roboto', fontSize: '14px', fontWeight: '400'}}>Annual Salary</span>}
              value={prop.experience.annual_salary}
              InputLabelProps={{
                shrink: true,
              }}
              style={{marginTop: 3}}
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  Lakhs
                </InputAdornment>,
              }}
              onChange={this.AnnualChange}
              errorStyle={{color: '#eaeaea'}}
              error={this.state.allFieldsStatus['annualSalary'] && prop.annual_salary_error ?
                <span className="field_error">{prop.annual_salary_error}</span> : ''}
              helperText={this.state.allFieldsStatus['annualSalary'] && prop.annual_salary_error ?
                <span className="field_error">{prop.annual_salary_error_text}</span> : ''}
            />
          </Grid>
          <Grid item xs={6} className="mt-32">
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
              {'Notice Period'}
            </InputLabel>
            <NonCreatableSingleSelectDropdown
              isSearchable={false}
              getSelectedOption={(option) => this.setNoticePeriodOption(option)}
              defaultValue={prop.experience.notice_period ? {
                value: prop.experience.notice_period.key,
                label: prop.experience.notice_period.value
              } : ''}
              options={noticePeriodList}
              isClearable={false}
              error={prop.notice_period_error}
            />
            {prop.notice_period_error !== '' ?
              <FormHelperText error={prop.notice_period_error !== ''} id="firstName_error">
                        <span className="field_error">
                          {prop.notice_period_error}
                        </span>
              </FormHelperText> : null}
          </Grid>
        </Grid>
        <Grid container
              spacing={16}
              direction="row">
          <Grid item xs={4} className="mt-28">
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
              {'Country'}
            </InputLabel>
            <NonCreatableRemoteDataSingleSelectDropdown
              isSearchable={true}
              apiUrl={COUNTRY}
              queryParams={{search: ''}}
              defaultValue={prop.experience.country.value ? {
                value: prop.experience.country.key,
                label: prop.experience.country.value
              } : ''}
              getSelectedOption={(option) => this.setCountryOption(option)}
              isClearable={false}
              error={this.state.allFieldsStatus['Country'] && prop.country_error}
            />
            {this.state.allFieldsStatus['Country'] && prop.country_error ?
              <FormHelperText error={prop.country_error !== ''} id="firstName_error">
                        <span className="field_error">
                          {prop.country_error}
                        </span>
              </FormHelperText> : null}
          </Grid>
          <Grid item xs={4} className="mt-28">
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
              {'State'}
            </InputLabel>
            <NonCreatableRemoteDataSingleSelectDropdown
              isSearchable={true}
              apiUrl={STATE}
              queryParams={{country: prop.experience.country.value ? prop.experience.country.value : '1', search: ''}}
              defaultValue={prop.experience.state.value ? {
                value: prop.experience.state.key,
                label: prop.experience.state.value
              } : ''}
              getSelectedOption={(option) => this.setStateOption(option)}
              isDisabled={prop.experience.country.value ? false : true}
              isClearable={false}
              error={this.state.allFieldsStatus['State'] && prop.state_error}
            />
            {this.state.allFieldsStatus['State'] && prop.state_error ?
              <FormHelperText error={prop.state_error !== ''} id="firstName_error">
                        <span className="field_error">
                          {prop.state_error}
                        </span>
              </FormHelperText> : null}
          </Grid>
          <Grid item xs={4} className="mt-28">
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
              {'City'}
            </InputLabel>
            <NonCreatableRemoteDataSingleSelectDropdown
              isSearchable={true}
              apiUrl={CITY}
              queryParams={{
                country: prop.experience.country.value ? prop.experience.country.value : '1',
                state: prop.experience.state.value ? prop.experience.state.value : '1',
                search: ''
              }}
              getSelectedOption={(option) => this.setCityOption(option)}
              defaultValue={prop.experience.city.value ? {
                value: prop.experience.city.key,
                label: prop.experience.city.value
              } : ''}
              isDisabled={prop.experience.country.value && prop.experience.state.value ? false : true}
              isClearable={false}
              error={this.state.allFieldsStatus['City'] && prop.city_error}
            />
            {this.state.allFieldsStatus['City'] && prop.city_error ?
              <FormHelperText error={prop.city_error !== ''} id="firstName_error">
                        <span className="field_error">
                          {prop.city_error}
                        </span>
              </FormHelperText> : null}
          </Grid>
        </Grid>
        <Grid container
              spacing={16}
              direction="row">
          <Grid item xs={12} className="mt-28 textfield-specifivity-label">
            <FormControl style={{width: '100%'}}>
              <TextField
                id="standard-error"
                InputLabelProps={{
                  shrink: true
                }}
                label={<span style={{color: '#656565', fontFamily: 'Roboto', fontSize: '14px', fontWeight: '400'}}>Description</span>}
                value={prop.experience.description}
                onChange={this.setDescription}
                error={this.state.allFieldsStatus['Description'] && prop.description_error ? prop.description_error : ''}
                helperText={this.state.allFieldsStatus['Description'] && prop.description_error ? prop.description_error_text : ''}
              />
            </FormControl>
          </Grid>
          <div className="profile-character-info characters-left-style pb-28 mr-8">
            <div className="characters-left-style-text">Character left: <span
              style={{color: '#f0582b'}}>{300 - prop.experience.description.length}</span></div>
          </div>
        </Grid>
      </div>
    )
  }
}

WorkExperience.propTypes = {
  checkExpericeceErrors: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WorkExperience);
