//library dependencies
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';
import {reduxForm} from 'redux-form';
import {
  withStyles,
  InputLabel,
  Input,
  FormHelperText,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl
} from '@material-ui/core';

//styles
import './styles.scss';

//custom components
import AdvanceSearch from './AdvanceSearch/AdvanceSearch';
import ChipsForFields
  from '../../../EmployerHomePage/components/EmployerJobPage/components/SectorsRoles/ChipsForFields';
import NonCreatableRemoteDataMultiSelectDropdown
  from '../../../../components/MultiSelectDropdownWrapper/components/NonCreatableRemoteDataMultiSelectDropdown';
import CreatableRemoteMultiDropDown
  from '../../../../components/MultiSelectDropdownWrapper/components/CreatableRemoteMultiDropDown/CreatableRemoteMultiDropDown';

//utilities
import {JOB_LISTING_SKILLS_COMPANY_DESIGNATION, CITY, KEY_SKILLS,} from '../../../../../config/constants';
import {handleLocalStorage, apiCall} from '../../../../Utilities';

// initialisations
let experience_error_timer, salary_error_timer;

//toast message styles
toast.configure({
  "position": "top-center", toastClassName: "toast-inner-container", bodyClassName: "toast-body-name",
  closeButton: false, progressClassName: 'toast-progress-bar'
});

// styles used to overrides material ui styles
const styles = theme => ({
  container: {display: 'flex', flexWrap: 'wrap',},
  textField: {marginLeft: theme.spacing.unit, marginRight: theme.spacing.unit, width: 200, minHeight: "35px"},
  input: {minHeight: "22px"},
  dense: {marginTop: 19,},
  menu: {width: 200,},
  cssLabel: {color: '#656565 !important', fontSize: '14px', fontFamily: 'Roboto', fontWeight: 400,},
  cssError: {color: '#656565 !important', fontSize: '14px', fontFamily: 'Roboto', fontWeight: 400,},
  newLabel: {
    color: '#656565 !important', fontSize: '14px', fontFamily: 'Roboto', fontWeight: 400, overflow: 'hidden',
    whiteSpace: 'nowrap', textOverflow: 'ellipsis'
  }
});

class SearchType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'search', experience: '', salary: '', result: [], skillsDesignations: [], location: [], location_error: "",
      filter_by: [], text: '', experience_error: '', salary_error: ''
    };
  }

  /**
   * used to handle input changes, for experience and salary it is first validating value before storing in state
   * whenever input changes this functions call and update state variable depends on state variable name
   * @param e
   */
  handleInputValueChange = e => {
    const {id} = e.target;
    if (id === 'experience') {
      if (e.target.value > 50) {
        this.setParticularField("experience", "Please enter experience in between 1 to 50 years");
        clearTimeout(experience_error_timer);
        experience_error_timer = setTimeout(() => {
          this.state.experience_error === "Please enter experience in between 1 to 50 years" ? this.setParticularField("experience", "") : ""
        }, 4000);
        return;
      }
      if (e.target.value.includes('.')) {
        let array_values = e.target.value.split(".");
        if (array_values[1].length > 1) return;
      }
      this.setState({[id]: event.target.value});
    } else if (id === 'salary') {
      if (e.target.value > 100) {
        this.setParticularField("salary", "Range must be between 0.1 to 100");
        clearTimeout(salary_error_timer);
        salary_error_timer = setTimeout(() => {
          this.state.salary_error === "Range must be between 0.1 to 100" ? this.setParticularField("salary", "") : ""
        }, 4000);
        return;
      }
      if (e.target.value.includes('.')) {
        let array_values = e.target.value.split(".");
        if (array_values[1].length > 2) return;
      }
      this.setState({[id]: event.target.value});
    }
  };

  /**
   * saves radio button value in state variable
   * radio buttons are search and advanced search
   */
  handleChange = () => {
    this.setState({value: event.target.value});
  };
  /**
   * used to send req body to parent component using props
   * @param reqBody
   * @returns {*|void}
   */
  updateSearch = (reqBody) => this.props.updateSearch(reqBody);

  /**
   * on search button press arrange api request body and send ro update search function
   * @param e
   */
  onSearchSubmit = (e) => {
    e.preventDefault();
    const {experience, salary, location, skillsDesignations} = this.state;
    if (experience || salary || location.length > 0 || skillsDesignations.length > 0) {
      let skillsDesignationsCompanies = '';
      skillsDesignations.length > 0 && skillsDesignations.map((item, index) => {
        if (index === skillsDesignations.length - 1) skillsDesignationsCompanies += item.value;
        else skillsDesignationsCompanies += item.value + ", ";
      });
      const dataToBeSend = {};
      dataToBeSend.result_per_page = 20;
      dataToBeSend.pagination = 1;
      dataToBeSend.is_advanced = false;
      dataToBeSend.skills = skillsDesignations;
      dataToBeSend.skill_designation_com = skillsDesignationsCompanies;
      dataToBeSend.location = location;
      dataToBeSend.min_exp = experience ? parseFloat(experience) : experience;
      dataToBeSend.min_salary = salary ? parseFloat(salary) : salary;
      dataToBeSend.sort = 'date';
      dataToBeSend.filter_by = [];
      this.updateSearch(dataToBeSend);
    } else toast('Kindly select at least one input', {});
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
    apiCall('get', null, JOB_LISTING_SKILLS_COMPANY_DESIGNATION, this.headers).then(res => {
      // toast(`${res.message}`, {});
    });
    apiCall('get', null, CITY, this.headers).then(res => {
      // toast(`${res.message}`, {});
    });
  }


  /**
   * this function used to save selected values in state variable to shown by chips
   * @param fieldName
   * @param fieldError
   * @param selectedOption
   */
  setValuetoChips = (fieldName, fieldError, selectedOption) => {
    const opt = this.state[fieldName];
    if (selectedOption) {
      for (let option of selectedOption) {
        let index = opt.findIndex((optionSeleced) => optionSeleced.key === option.value);
        if (index > -1) {
        }
        else opt.push({key: option.value, value: option.label});
      }
      this.setState({[fieldName]: opt})
    }
  };

  /**
   * this function used to validate error for particular field
   * if filed in location the it will check for selected values
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
    } else dropDownError[fieldError] = "";
    this.setState({dropDownError});
    return !!dropDownError[fieldError];
  }

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
   * this function used to set defined field error in state variable
   * @param name
   * @param value
   */
  setParticularField = (name, value) => {
    const errorName = name + '_error';
    this.setState({[errorName]: value,})
  };

  /**
   * used to validate salary is in between 0.1 to 100 or not
   */
  validateSalary = () => {
    const {salary} = this.state;
    if (salary !== '' && (salary > 100 || salary < 0.1))
      this.setParticularField("salary", "Range must be between 0.1 to 100");
  };

  /**
   * used to validate experience is in between 1 to 50 or not
   */
  validateExperience = () => {
    const {experience} = this.state;
    if (experience !== '' && (experience > 50 || experience < 1))
      this.setParticularField("experience", "Please enter experience in between 1 to 50 years");
  };

  /**
   * this function used to call validate function depends on field name
   * @param fieldName
   */
  validateFields = fieldName => {
    switch (fieldName) {
      case 'salary':
        this.validateSalary();
        break;
      case 'experience':
        this.validateExperience();
        break;
    }
  };

  /**
   * used to remove error from defined state variable by target id whenever focus removed from field
   * @param e
   */
  removeErrorFocus = (e) => {
    let errorValue = '';
    this.setParticularField(e.target.id, errorValue);
  };

  render() {
    const {classes} = this.props;
    const {experience_error, salary_error} = this.state;
    return (
      <div className="search-type-main-container">
        <div>
          <div className="search-type-radio-buttons">
            <FormControl component="fieldset" className="radio-button-control">
              <RadioGroup
                aria-label="Gender"
                name="gender1"
                className="search-radio-buttons"
                value={this.state.value}
                onChange={this.handleChange}
              >
                <FormControlLabel
                  className="padding-right-40px" //"search-button"
                  value="search"
                  control={<Radio/>}
                  label="Search"
                />
                <FormControlLabel
                  // className="advance-button"
                  value="advance"
                  control={<Radio/>}
                  label="Advanced"
                />
              </RadioGroup>
            </FormControl>
          </div>
          {this.state.value === 'search' ? (
            <React.Fragment>
              <ChipsForFields
                values={this.state.skillsDesignations}
                isItEditMode={true}
                onDelete={key => {
                  this.removeElementFromState('skillsDesignations', key);
                }}
              />
              <div className="search-type-fields-div">
                <div className="search-type-skill-multiselect ">
                  <div className="search-type-skills">
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
                      getSelectedOption={(option) => this.setValuetoChips('skillsDesignations', 'skillsDesignations_error', option)}
                      updateRemovalValue={this.state.removableItem}
                      editable={true}
                      defaultValue={[]}
                      error={this.state.skillsDesignations_error}
                      maxOptions={4}
                      gettingError={(error) => this.onErrorChange('skillsDesignations_error', error)}
                    />
                  </div>
                  <div className="search-type-location">
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
                      apiUrl={CITY}
                      queryParams={{search: '', format: 'json', state: '', country: ''}}
                      getSelectedOption={(option) => this.setValuetoChips('location', 'location_error', option)}
                      updateRemovalValue={this.state.removableItem}
                      editable={true}
                      defaultValue={this.state.location ? this.state.location : []}
                      error={this.state.location_error}
                      maxOptions={4}
                      gettingError={(error) => this.onErrorChange('location_error', error)}
                    />
                  </div>
                </div>
                <div className="search-type-textfields">
                  <div className="search-type-req-experience">
                    <InputLabel
                      classes={{
                        root: classes.newLabel,
                        focused: classes.cssFocused,
                      }}
                    >
                      Experience (in years)
                    </InputLabel>
                    <Input
                      name="standard-name"
                      id="experience"
                      classes={{
                        underline: classes.cssUnderline,
                        focused: classes.cssFocused,
                        input: classes.input
                      }}
                      value={this.state.experience}
                      onChange={this.handleInputValueChange}
                      margin="normal"
                      style={{marginTop: '0px'}}
                      type="number"
                      onBlur={() => this.validateFields('experience')}
                      onFocus={this.removeErrorFocus}
                    />
                    {experience_error &&
                    <FormHelperText style={{color: "#f0582b", width: '134px'}}>{experience_error}</FormHelperText>}
                  </div>
                  <div className="search-type-salary">
                    <InputLabel
                      classes={{
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                      }}
                    >
                      Salary (in lacs)
                    </InputLabel>
                    <Input
                      name="standard-name"
                      id="salary"
                      styles={{minHeight: "35px"}}
                      classes={{
                        underline: classes.cssUnderline,
                        focused: classes.cssFocused,
                        input: classes.input
                      }}
                      value={this.state.salary}
                      onChange={this.handleInputValueChange}
                      margin="normal"
                      style={{marginTop: '0px'}}
                      type="number"
                      onBlur={() => this.validateFields('salary')}
                      onFocus={this.removeErrorFocus}
                    />
                    {salary_error &&
                    <FormHelperText style={{color: "#f0582b", width: '124px'}}>{salary_error}</FormHelperText>}
                  </div>
                </div>
              </div>
              <div className="search-type-button">
                <button
                  className="shenzyn-btn outline-primary-button px-40 mr-20 "
                  onClick={this.onSearchSubmit}
                >
                  Search
                </button>
              </div>
            </React.Fragment>
          ) : (
            <AdvanceSearch updateSearch={(reqBody) => this.updateSearch(reqBody)}/>
          )}
        </div>
      </div>
    );
  }
}

SearchType = reduxForm({
  form: 'SearchType',
  enableReinitialize: true,
  validate: values => {
    const errors = {};
    return errors;
  },
})(SearchType);

SearchType.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchType);
