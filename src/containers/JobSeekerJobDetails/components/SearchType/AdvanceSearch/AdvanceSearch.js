//library dependencies
import React, {Component} from 'react';
import {withStyles, Input, InputLabel, FormHelperText} from '@material-ui/core';
import {toast} from 'react-toastify';

//styles
import './styles.scss';

//custom components
import ChipsForFields
  from '../../../../EmployerHomePage/components/EmployerJobPage/components/SectorsRoles/ChipsForFields';
import NonCreatableRemoteDataMultiSelectDropdown
  from '../../../../../components/MultiSelectDropdownWrapper/components/NonCreatableRemoteDataMultiSelectDropdown';
import CreatableRemoteMultiDropDown
  from '../../../../../components/MultiSelectDropdownWrapper/components/CreatableRemoteMultiDropDown/CreatableRemoteMultiDropDown';
import NonCreatableMultiSelectDropDown
  from '../../../../../components/MultiSelectDropdownWrapper/components/NonCreatableMultiSelectDropDown/NonCreatableMultiSelectDropDown';

//utilities
import {KEY_SKILLS, CITY, INDUSTRY, FUNCTIONAL_AREA} from '../../../../../../config/constants';
import {handleLocalStorage, apiCall} from '../../../../../Utilities';

//initialisations
let experience_min_error_timer, experience_max_error_timer, salary_min_error_timer, salary_max_error_timer;

//toast message styles
toast.configure({
  "position": "top-center", toastClassName: "toast-inner-container", bodyClassName: "toast-body-name",
  closeButton: false, progressClassName: 'toast-progress-bar'
});

// styles used to overrides material ui styles
const styles = theme => ({
  container: {display: 'flex', flexWrap: 'wrap',},
  textField: {marginLeft: theme.spacing.unit, marginRight: theme.spacing.unit, width: 200,},
  dense: {marginTop: 19,},
  input: {minHeight: "24px"},
  menu: {width: 200,},
  helperText: {
    color: '#656565', fontSize: '14px', fontFamily: 'Roboto', fontWeight: 'normal', fontStyle: 'normal',
    fontStretch: 'normal', lineHeight: 'normal', letterSpacing: 'normal',
  },
  cssLabel: {color: '#656565 !important', fontSize: '14px', fontFamily: 'Roboto', fontWeight: 400,},
});

class AdvanceSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'search',
      experience_min: '',
      experience_max: '',
      salary_min: '',
      salary_max: '',
      salary: '',
      skillsDesignations: [],
      location: [],
      industries: [],
      functionalAreas: [],
      job_type: [],
      jobTypeDropDownData: [
        {value: 'Part time', key: 1}, {value: 'Full time', key: 2}, {value: 'Part-time work from home', key: 3},
        {value: 'Full-time work from home', key: 4}, {value: 'Freelancer', key: 5},
      ],
      experience_min_error: '',
      experience_max_error: '',
      salary_min_error: '',
      salary_max_error: '',
      location_error: '',
      industries_error: '',
      functionalAreas_error: '',
    };
  }

  /**
   * this function used to validate float value digit is greater than specified limit or not
   * @param value
   * @param limit
   * @returns {boolean}
   */
  checkFloatValueLimit = (value, limit) => {
    if (value.includes('.')) {
      let array_split = value.split(".");
      if (array_split[1].length > limit) {
        return true
      }
    }
    return false
  };
  /**
   * used to handle input changes, for experience and salary it is first validating value before storing in state
   * whenever input changes this functions call and update state variable depends on state variable name
   * @param e
   */
  handleInputValueChange = e => {
    const {id} = e.target;
    switch (id) {
      case "experience_min":
        if (e.target.value > 50) {
          this.setParticularField("experience_min", "Please enter experience in between 1 to 50 years");
          clearTimeout(experience_min_error_timer);
          experience_min_error_timer = setTimeout(() => {
            this.state.experience_min_error === "Please enter experience in between 1 to 50 years" ? this.setParticularField("experience_min", "") : ""
          }, 4000);
          return;
        }
        if (this.checkFloatValueLimit(e.target.value, 1)) {
          return;
        }
        this.setState({[id]: event.target.value});
        return;
      case "experience_max":
        if (e.target.value > 50) {
          this.setParticularField("experience_max", "Please enter experience in between 1 to 50 years");
          clearTimeout(experience_max_error_timer);
          experience_max_error_timer = setTimeout(() => {
            this.state.experience_max_error === "Please enter experience in between 1 to 50 years" ? this.setParticularField("experience_max", "") : ""
          }, 4000);
          return;
        }
        if (this.checkFloatValueLimit(e.target.value, 1)) {
          return;
        }
        this.setState({[id]: event.target.value});
        return;
      case "salary_min":
        if (e.target.value > 100) {
          this.setParticularField("salary_min", "Range must be between 0.1 to 100");
          clearTimeout(salary_min_error_timer);
          salary_min_error_timer = setTimeout(() => {
            this.state.salary_min_error === "Range must be between 0.1 to 100" ? this.setParticularField("salary_min", "") : ""
          }, 4000);
          return;
        }
        if (this.checkFloatValueLimit(e.target.value, 2)) {
          return;
        }
        this.setState({[id]: event.target.value});
        return;
      case "salary_max":
        if (e.target.value > 100) {
          this.setParticularField("salary_max", "Range must be between 0.1 to 100");
          clearTimeout(salary_max_error_timer);
          salary_max_error_timer = setTimeout(() => {
            this.state.salary_max_error === "Range must be between 0.1 to 100" ? this.setParticularField("salary_max", "") : ""
          }, 4000);
          return;
        }
        if (this.checkFloatValueLimit(e.target.value, 2)) {
          return;
        }
        this.setState({[id]: event.target.value});
        return;
    }
  };

  /**
   * this function used to set defined field error in state variable
   * @param name
   * @param value
   */  setParticularField = (name, value) => {
    const errorName = name + '_error';
    this.setState({[errorName]: value,})
  };

  /**
   * used to remove error from defined state variable by target id whenever focus removed from field
   * @param e
   */
  removeErrorFocus = (e) => {
    let errorValue = '';
    this.setParticularField(e.target.id, errorValue);
  };

  /**
   * this function used to validate min experience field and set error depends on value
   */
  validateExperienceMin = () => {
    const experience_min = this.state.experience_min !== "" ? parseFloat(this.state.experience_min) : "";
    const experience_max = this.state.experience_max !== "" ? parseFloat(this.state.experience_max) : "";
    if (experience_min !== '' && (experience_min > 50 || experience_min < 1)) {
      this.setParticularField("experience_min", "Please enter experience in between 1 to 50 years");
    } else if (experience_max && experience_min > experience_max) {
      this.setParticularField("experience_max", "");
      this.setParticularField("experience_min", "Min experience field cannot be greater than Max experience");
    } else if (experience_min === '' && experience_max === '') {
      this.setParticularField("experience_min", "");
      this.setParticularField("experience_max", "");
    } else {
      this.setParticularField("experience_min", "");
    }
  };
  /**
   * this function used to validate max experience field and set error depends on value
   * @returns {Promise<void>}
   */
  validateExperienceMax = async () => {
    const experience_min = this.state.experience_min !== "" ? parseFloat(this.state.experience_min) : "";
    const experience_max = this.state.experience_max !== "" ? parseFloat(this.state.experience_max) : "";
    if (experience_max !== '' && (experience_max > 50 || experience_max < 1)) {
      this.setParticularField("experience_max", "Please enter experience in between 1 to 50 years");
    } else if (experience_min && experience_max < experience_min) {
      this.setParticularField("experience_min", "");
      this.setParticularField("experience_max", "Min experience field cannot be greater than Max experience");
    } else if (experience_min === '' && experience_max === '') {
      this.setParticularField("experience_min", "");
      this.setParticularField("experience_max", "");
    } else {
      this.setParticularField("experience_max", "");
    }
  };

  /**
   * this function used to validate min salary field and set error depends on value
   */
  validateSalaryMin = () => {
    const salary_max = this.state.salary_max !== "" ? parseFloat(this.state.salary_max) : "";
    const salary_min = this.state.salary_min !== "" ? parseFloat(this.state.salary_min) : "";
    if (salary_min !== '' && (salary_min > 100 || salary_min < 0.1)) {
      this.setParticularField("salary_min", "Range must be between 0.1 to 100");
    } else if (salary_max && salary_min > salary_max) {
      this.setParticularField("salary_max", "");
      this.setParticularField("salary_min", "Min salary field cannot be greater than Max salary");
    } else if (salary_min === '' && salary_max === '') {
      this.setParticularField("salary_min", "");
      this.setParticularField("salary_max", "");
    } else {
      this.setParticularField("salary_min", "");
    }
  };

  /**
   * this function used to validate max salary field and set error depends on value
   */
  validateSalaryMax = () => {
    const salary_max = this.state.salary_max !== "" ? parseFloat(this.state.salary_max) : "";
    const salary_min = this.state.salary_min !== "" ? parseFloat(this.state.salary_min) : "";
    if (salary_max !== '' && (salary_max > 100 || salary_max < 0.1)) {
      this.setParticularField("salary_max", "Range must be between 0.1 to 100")
    } else if (salary_min && salary_max < salary_min) {
      this.setParticularField("salary_min", "");
      this.setParticularField("salary_max", "Min salary field cannot be greater than Max salary")
    } else if (salary_min === '' && salary_max === '') {
      this.setParticularField("salary_min", "");
      this.setParticularField("salary_max", "");
    } else {
      this.setParticularField("salary_max", "");
    }
  };

  /**
   * this function used to call validate function depends on field name
   * @param fieldName
   */
  validateFields = fieldName => {
    switch (fieldName) {
      case 'experience_min':
        this.validateExperienceMin();
        break;
      case 'experience_max':
        this.validateExperienceMax();
        break;
      case 'salary_max':
        this.validateSalaryMax();
        break;
      case 'salary_min':
        this.validateSalaryMin();
        break;
    }
  };

  /**
   * this function used to save selected values in state variable to shown by chips
   * @param fieldName
   * @param fieldError
   * @param selectedOption
   */
  setValueToChips = (fieldName, fieldError, selectedOption) => {
    const opt = this.state[fieldName];
    if (selectedOption) {
      for (let option of selectedOption) {
        let index = opt.findIndex((optionSeleced) => optionSeleced.key === option.value);
        if (index > -1) {
        } else {
          opt.push({key: option.value, value: option.label})
        }
      }
      this.setState({[fieldName]: opt});
    }
  };

  /**
   * this function used to validate error for particular field
   * filed name specify by fieldError
   * @param fieldError
   * @param errorHandler
   * @returns {boolean}
   */
  onErrorChange(fieldError, errorHandler) {
    let dropDownError = this.state;
    if (errorHandler.error) {
      if (fieldError === 'location_error') {
        dropDownError[fieldError] = "You can select maximum 4 Locations";
        setTimeout(() => {
          this.state.location_error === "You can select maximum 4 Locations" ? this.setParticularField("location", "") : ""
        }, 4000);
      }
      if (fieldError === 'industries_error') {
        dropDownError[fieldError] = "You can select upto 4 industries only";
        setTimeout(() => {
          this.state.industries_error === "You can select upto 4 industries only" ? this.setParticularField("industries", "") : ""
        }, 4000);
      }
      if (fieldError === 'functionalAreas_error') {
        dropDownError[fieldError] = "You can select upto 4 functional areas only";
        setTimeout(() => {
          this.state.functionalAreas_error === "You can select upto 4 functional areas only" ? this.setParticularField("functionalAreas", "") : ""
        }, 4000);
      }
    } else {
      dropDownError[fieldError] = ""
    }
    this.setState({dropDownError}, () => {
    });
    return !!dropDownError[fieldError];

  }

  /**
   * saves job type value in state variable
   */
  handleChange = (option) => {
    this.setState({job_type: option});
  };

  /**
   * this function used to removed elements from state variable
   * key for element key and fieldname is variable name
   * @param fieldName
   * @param key
   */
  removeElementFromState = (fieldName, key) => {
    const fieldDataFromState = JSON.parse(JSON.stringify(this.state[fieldName])).filter(value => {
      return key.key !== value.key && key.value !== value.value
    });
    this.setState({[fieldName]: fieldDataFromState});
  };

  /**
   * on search button press arrange api request body and send ro update search function
   * used to send req body to parent component using props
   * @param e
   */
  updateSearch = (e) => {
    e.preventDefault();
    const {experience_min, experience_max, salary_min, salary_max, functionalAreas, industries, location, skillsDesignations, job_type} = this.state;
    if (experience_min || experience_max || salary_min || salary_max || functionalAreas.length > 0 || industries.length > 0 || location.length > 0 || skillsDesignations.length > 0 || job_type.length > 0) {
      let skillsDesignationsCompanies = '';
      skillsDesignations.length > 0 && skillsDesignations.map((item, index) => {
        if (index === skillsDesignations.length - 1) skillsDesignationsCompanies += item.value;
        else skillsDesignationsCompanies += item.value + ", ";
      });
      let job_type_values = [];
      job_type.map((value) => {
        job_type_values.push(value.value)
      });
      const dataToBeSend = {};
      dataToBeSend.result_per_page = 5;
      dataToBeSend.pagination = 1;
      dataToBeSend.is_advanced = true;
      dataToBeSend.skills = skillsDesignations;
      dataToBeSend.skill_designation_com = skillsDesignationsCompanies;
      dataToBeSend.location = location;
      dataToBeSend.min_exp = experience_min ? parseFloat(experience_min) : experience_min;
      dataToBeSend.min_salary = salary_min ? parseFloat(salary_min) : salary_min;
      dataToBeSend.max_salary = salary_max ? parseFloat(salary_max) : salary_max;
      dataToBeSend.max_exp = experience_max ? parseFloat(experience_max) : experience_max;
      dataToBeSend.industry = industries;
      dataToBeSend.functional_area = functionalAreas;
      dataToBeSend.job_type = job_type_values.length !== 0 ? job_type_values : '';
      dataToBeSend.sort = 'date';
      dataToBeSend.filter_by = [];
      this.props.updateSearch(dataToBeSend);
    } else {
      toast('Kindly select at least one input', {});
    }
  };

  //employer login token from local storage
  token = handleLocalStorage('get', 'employerLogin');

  /**
   * if token is stored then call location and skill company designation drop down data from server
   * @param token
   */
  if(token) {
    this.headers = {
      authorization: token,
      'Content-Type': 'application/json',
    };
    const dataToBeSend = {};
    dataToBeSend.search = '';
    apiCall('get', null, CITY, this.headers).then(res => {
      // toast(`${res.message}`, {});
    });
    apiCall('get', null, INDUSTRY, this.headers).then(res => {
      // toast(`${res.message}`, {});
    });
    apiCall('get', null, FUNCTIONAL_AREA, this.headers).then(res => {
      // toast(`${res.message}`, {});
    });
  }

  render() {
    const {classes} = this.props;
    const {experience_min_error, experience_max_error, salary_min_error, salary_max_error} = this.state;
    return (
      <div className="advance-search-main-container">
        <div>
          <ChipsForFields
            values={this.state.skillsDesignations}
            isItEditMode={true}
            onDelete={key => {
              this.removeElementFromState('skillsDesignations', key);
            }}
          />
          <div className="advance-search-skills-two-textfields">
            <div className="advance-search-multi-select-fields-upper">
              <div className="advance-search-multi-select-field1">

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
                  {'Skills, Designation, Companies'}
                </InputLabel>
                <CreatableRemoteMultiDropDown
                  isSearchable={true}
                  apiUrl={KEY_SKILLS}
                  queryParams={{search: ''}}
                  getSelectedOption={(option) => this.setValueToChips('skillsDesignations', 'skillsDesignations_error', option)}
                  updateRemovalValue={this.state.removableItem}
                  editable={true}
                  defaultValue={[]}
                  error={this.state.skillsDesignations_error}
                  maxOptions={4}
                  gettingError={(error) => this.onErrorChange('skillsDesignations_error', error)}
                />
              </div>
              <div className="advance-search-multi-select-field2 mt-8">
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
                  {'Location'}
                </InputLabel>
                <NonCreatableRemoteDataMultiSelectDropdown
                  isSearchable={true}
                  styles={{height: "31px"}}
                  apiUrl={CITY}
                  queryParams={{search: '', format: 'json', state: '', country: ''}}
                  getSelectedOption={(option) => this.setValueToChips('location', 'location_error', option)}
                  updateRemovalValue={this.state.removableItem}
                  editable={true}
                  defaultValue={this.state.location ? this.state.location : []}
                  error={this.state.location_error}
                  maxOptions={4}
                  gettingError={(error) => this.onErrorChange('location_error', error)}
                />
              </div>
            </div>
            <div className="experience-textfields-text">
              <div className="experience-text mt-4">Experience (in years)</div>
              <div className="experience-textfields">
                <div className="min-exp">
                  <InputLabel
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    }}
                  >
                    Min
                  </InputLabel>
                  <Input
                    id="experience_min"
                    classes={{
                      underline: classes.cssUnderline,
                      focused: classes.cssFocused,
                      input: classes.input
                    }}
                    value={this.state.experience_min}
                    onChange={this.handleInputValueChange}
                    style={{marginTop: '0px', width: '124px'}}
                    type="number"
                    onBlur={() => this.validateFields('experience_min')}
                    onFocus={this.removeErrorFocus}
                  />
                  {experience_min_error &&
                  <FormHelperText style={{color: "#f0582b", width: '124px'}}>{experience_min_error}</FormHelperText>}
                </div>
                <div className="max-exp">
                  <InputLabel
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    }}
                  >
                    Max
                  </InputLabel>
                  <Input
                    id="experience_max"
                    label="Max"
                    classes={{
                      underline: classes.cssUnderline,
                      focused: classes.cssFocused,
                      input: classes.input
                    }}
                    value={this.state.experience_max}
                    onChange={this.handleInputValueChange}
                    style={{marginTop: '0px', width: '124px'}}
                    type="number"
                    onBlur={() => this.validateFields('experience_max')}
                    onFocus={this.removeErrorFocus}
                  />
                  {experience_max_error &&
                  <FormHelperText style={{color: "#f0582b", width: '124px'}}>{experience_max_error}</FormHelperText>}
                </div>
              </div>
            </div>
          </div>
          <div className="salary-multi-select-textfields">
            <div className="salary-textfields-text">
              <div className="salary-text">Salary (in lacs)</div>
              <div className="salary-textfields">
                <div className="min-sal">
                  <InputLabel
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    }}
                  >
                    Min
                  </InputLabel>
                  <Input
                    id="salary_min"
                    label="Min"
                    classes={{
                      underline: classes.cssUnderline,
                      focused: classes.cssFocused,
                      input: classes.input

                    }}
                    value={this.state.salary_min}
                    onChange={this.handleInputValueChange}
                    style={{marginTop: '0px', width: '124px'}}
                    type="number"
                    onBlur={() => this.validateFields('salary_min')}
                    onFocus={this.removeErrorFocus}
                  />
                  {salary_min_error &&
                  <FormHelperText style={{color: "#f0582b", width: '124px'}}>{salary_min_error}</FormHelperText>}
                </div>
                <div className="max-sal">
                  <InputLabel
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    }}
                  >
                    Max
                  </InputLabel>
                  <Input
                    id="salary_max"
                    label="Max"
                    classes={{
                      underline: classes.cssUnderline,
                      focused: classes.cssFocused,
                      input: classes.input
                    }}
                    value={this.state.salary_max}
                    onChange={this.handleInputValueChange}
                    style={{marginTop: '0px', width: '124px'}}
                    type="number"
                    onBlur={() => this.validateFields('salary_max')}
                    onFocus={this.removeErrorFocus}
                  />
                  {salary_max_error &&
                  <FormHelperText style={{color: "#f0582b", width: '124px'}}>{salary_max_error}</FormHelperText>}
                </div>
              </div>
            </div>
            <div className="multi-select-three-fields">
              <div className="multi-select-field1 mt-8">
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
                  {'Industry'}
                </InputLabel>
                <NonCreatableRemoteDataMultiSelectDropdown
                  isSearchable={true}
                  apiUrl={INDUSTRY}
                  queryParams={{search: ''}}
                  getSelectedOption={(option) => this.setValueToChips('industries', 'industries_error', option)}
                  updateRemovalValue={this.state.removableItem}
                  editable={true}
                  maxOptions={4}
                  defaultValue={this.state.industries ? this.state.industries : []}
                  error={this.state.industries_error}
                  gettingError={(error) => this.onErrorChange('industries_error', error)}
                />
              </div>
              <div className="multi-select-field2 mt-8">
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
                  {'Functional Area'}
                </InputLabel>
                <NonCreatableRemoteDataMultiSelectDropdown
                  isSearchable={true}
                  apiUrl={FUNCTIONAL_AREA}
                  queryParams={{search: ''}}
                  getSelectedOption={(option) => this.setValueToChips('functionalAreas', 'functionalAreas_error', option)}
                  updateRemovalValue={this.state.removableItem}
                  editable={true}
                  defaultValue={this.state.functionalAreas ? this.state.functionalAreas : []}
                  error={this.state.functionalAreas_error}
                  maxOptions={4}
                  gettingError={(error) => this.onErrorChange('functionalAreas_error', error)}
                />
              </div>
              <div className="multi-select-field3 mt-8">
                <InputLabel
                  className="change-label-style"
                  shrink={true}
                  classes={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                    error: classes.cssError
                  }}
                >
                  {'Job Type'}
                </InputLabel>
                <NonCreatableMultiSelectDropDown
                  isSearchable={false}
                  options={this.state.jobTypeDropDownData}
                  isClearable={true}
                  editable={true}
                  defaultValue={this.state.job_type}
                  error={''}
                  getSelectedOption={(option) => this.setValueToChips('job_type', 'job_type_error', option)}
                />

              </div>
            </div>
          </div>
          <div className="search-type-button">
            <button
              className="shenzyn-btn outline-primary-button px-40 mr-20 "
              onClick={this.updateSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AdvanceSearch);
