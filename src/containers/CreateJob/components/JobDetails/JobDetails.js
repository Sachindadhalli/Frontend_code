//library dependencies
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  createMuiTheme, MuiThemeProvider, withStyles, Input, FormHelperText, FormControl, InputLabel,
  FormControlLabel, InputAdornment, Checkbox, Tooltip
} from '@material-ui/core';
import {toast} from "react-toastify";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

//style
import customisedMaterial from '../../../../styles/customisedMaterial';
import './style.scss';

//icon
import selectedCircle from '../../../../../assets/media/icons/selectedcircle.svg';
import unselected from '../../../../../assets/media/icons/unselected.svg'
import question from '../../../../../assets/media/icons/question.svg'

//custom component
import Location from '../Location';
import Timing from '../Timing';
import CustomTag from '../../../../components/CustomTag';
import CustomIcon from '../../../../components/CustomIcon';
import CreatableRemoteDataSingleSelectDropdown
  from '../../../../components/SingleSelectDropdownWrapper/components/CreatableRemoteDataSingleSelectDropdown/CreatableRemoteDataSingleSelectDropdown';
import NonCreatableSingleSelectDropdown
  from "../../../../components/SingleSelectDropdownWrapper/components/NonCreatableSingleSelectDropdown/NonCreatableSingleSelectDropdown";
import NonCreatableRemoteDataSingleSelectDropdown
  from "../../../../components/SingleSelectDropdownWrapper/components/NonCreatableRemoteDataSingleSelectDropdown/NonCreatableRemoteDataSingleSelectDropdown";
import LoadingIcon from "../../../../components/LoadingIcon";
import CreatableRemoteMultiDropDown
  from "../../../../components/MultiSelectDropdownWrapper/components/CreatableRemoteMultiDropDown/CreatableRemoteMultiDropDown";
import NonCreatableMultiSelectDropDown
  from '../../../../components/MultiSelectDropdownWrapper/components/NonCreatableMultiSelectDropDown/NonCreatableMultiSelectDropDown';
import NonCreatableRemoteDataMultiSelectDropdown
  from "../../../../components/MultiSelectDropdownWrapper/components/NonCreatableRemoteDataMultiSelectDropdown/NonCreatableRemoteDataMultiSelectDropdown";


//utilities
import {
  handleLocalStorage,
  apiCall,
  isObjectAlreadyExist,
  calculateTotalCount,
  AlphaSpaceHypenNumber
} from '../../../../Utilities';
import {
  POST_JOB,
  JOB_ROLE,
  KEY_SKILLS,
  CURRENCY,
  INDUSTRY,
  FUNCTIONAL_AREA,
  POST_JOBS_GET_DETAILS
} from '../../../../../config/constants';
import * as actions from '../../../../actions/createAJob';

toast.configure({
  "position": "top-center",
  toastClassName: "toast-inner-container",
  bodyClassName: "toast-body-name",
  closeButton: false,
  progressClassName: 'toast-progress-bar'
});

// customised material ui style
const theme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        'fontFamily': 'Roboto',
        'fontSize': '14px',
        'fontWeight': 'normal',
        'fontStyle': 'normal',
        'fontStretch': 'normal',
        'lineHeight': 'normal',
        'letterSpacing': 'normal',
        'textAlign': 'start',
        'color': '#626366',
        'backgroundColor': '#FFFFFF',
        'borderRadius': '4px',
        'boxShadow': `0 1px 2px 0 rgba(0, 0, 0, 0.1)`,
        'border': ` solid 1px #dbdbdb`,
        'paddingTop': '12px',
        'paddingRight': '12px',
        'paddingBottom': '12px',
        'paddingLeft': '12px',
        'boxSizing': 'border-box',
      }
    }
  }
});

// customised material ui style
const styles = theme => ({
  root: {display: 'flex', flexWrap: 'wrap',},
  margin: {margin: theme.spacing.unit,},
  withoutLabel: {marginTop: theme.spacing.unit * 3,},
  Input: {flexBasis: 200,},
  button: {margin: '11px', borderRadius: '20px'},
  input: {display: 'none',},
  formControl: {marginBottom: '5px',},
  paper: {padding: theme.spacing.unit * 2, textAlign: 'center', color: theme.palette.text.secondary,},
  ...customisedMaterial,
  label: {fontWeight: 'normal', fontSize: '16px', color: 'black'},
  tootipQuestionMark: {marginTop: '6px', cursor: 'pointer', width: '12.6px!important'}
});

const allDropDownWidth = {rightHalf: '100%', leftHalf: '47.5%', fullWidth: '100%',};
const jobTypes = [{key: 1, value: 'Full time'}, {key: 2, value: 'Part time'}, {
  key: 3,
  value: 'Full-time work from home'
},
  {key: 4, value: 'Part-time work from home'}, {key: 5, value: 'Freelancer'}];
const requirementUrgency = [{key: 1, value: 'Immediate'}, {key: 2, value: 'Within 15 days'}, {
  key: 3,
  value: 'Within a month'
}, {key: 4, value: 'Within 2 months'}, {key: 5, value: 'Within 3 months'}];

const experiences = [];
for (let i = 1; i <= 51; i++) {
  experiences.push({key: i, value: i - 1});
}
const locationObject = {country: {key: '19306', value: 'India'}, location: {key: '', value: ''}}
const shiftObject = {shift: 'Regular', start: new Date('2014-08-18T09:00:00'), end: new Date('2014-08-18T18:00:00')}

class JobDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.job_details,
      hired_for: this.props.hired_for,
      allData: props.allData,
      title_error: '',
      job_role_error: '',
      job_description_error: '',
      key_skills_error: '',
      shifts: '',
      job_type_error: '',
      number_of_vacancy_error: '',
      industry_error: '',
      functional_area_error: '',
      how_soon_error: '',
      work_experience_min_error: '',
      work_experience_max_error: '',
      is_fresher_error: '',
      currency_error: '',
      minimum_ctc_error: '',
      maximum_ctc_error: '',
      visible_to_no_one_error: '',
      locations_error: '',
      timings_error: '',
      validateLocation: false,
      canSubmit: true,
      timeSubmit: true,
    }
  }

  /**
   * TO add location
   * @return: update state
   * */
  addLocation = () => {
    const {locations} = this.state;
    this.setState({locations: [...locations, locationObject]})
  };

  /**
   * TO remove location
   * @param: index
   * @return: updating state after removed
   * */
  removeLocation = (index) => {
    let {locations} = this.state;
    locations.splice(index, 1);
    this.setState({locations: locations})
  };

  /**
   * TO modify location
   * @param: index, location (object)
   * @return: updating state with new loaction
   * */
  modifyLocation = (index, location) => {
    let {locations} = this.state;
    locations[index] = location;
    this.setState({locations: locations})
  };

  /**
   * TO add shift time
   * @return: updating state with time object
   * */
  addTiming = () => {
    const {timings} = this.state;
    this.setState({timings: [...timings, shiftObject]})
  };

  /**
   * TO remove the shift time
   * @param: index
   * @return: updating state after removed
   * */
  removeTiming = (index) => {
    let {timings} = this.state;
    timings.splice(index, 1);
    this.setState({timings: timings})
  };

  /**
   * TO modify shift timing
   * @param: index timing(object)
   * @return: updating state with new shift time
   * */
  modifyTiming = (index, timing) => {
    let {timings} = this.state;
    timings[index] = timing;
    this.setState({timings: timings})
  };

  /**
   * On change in CreatableRemoteDataSingleSelectDropdown,updating state
   * @param: name, value
   * @return: updating state and calling a function to validate
   * */
  setParticularState = (name, value) => {
    if (value === null || value === "" && name.includes('error') === false) return;

    this.setState({[name]: value,}, () => this.validateFormData(name))
  };

  /**
   * on change in CreatableRemoteMultiDropDown, updating state
   * @param: fieldName
   * @param: fieldError
   * @param: selectedOption
   * @return: updating state and call a function to validate
   * */
  setValuetoChips = (fieldName, fieldError, selectedOption) => {
    const opt = this.state[fieldName];
    const last = selectedOption.length;
    if (selectedOption.length > 0) {
      if (fieldName === 'key_skills') {
        const new_value = selectedOption[selectedOption.length - 1];
        if (new_value.label.length > 20) { //validation
          this.setState({key_skills_error: "Key Skill should be 20 character"});
          setTimeout(() => {
            this.setState({key_skills_error: ''})
          }, 3000)
        } else {
          for (let option of selectedOption) {
            let index = opt.findIndex((optionSeleced) => optionSeleced.key === option.value);
            if (index > -1) {
            } else {
              opt.push({key: option.value, value: option.label})
            }
          }
          this.setState({[fieldName]: opt}, () => {
            this.validateFormData(fieldName)
          })
        }
      } else {
        for (let option of selectedOption) {
          let index = opt.findIndex((optionSeleced) => optionSeleced.key === option.value);
          if (index > -1) {
          } else {
            opt.push({key: option.value, value: option.label})
          }
        }
        this.setState({[fieldName]: opt}, () => {
          this.validateFormData(fieldName)
        })
      }
    }
  };

  onErrorChange(fieldError, errorHandler) {
  }

  /**
   * On change in input field ,updating state
   * @param: event
   * @return: updating state and call a function to validate
   * */
  onInputChange = e => {
    const {name, value} = e.target;
    this.setState({[name]: value,}, () => this.validateFormData(name))
  };

  /**
   * On change in job descreption
   * @param: event
   * @return: updating state and call a function to validate
   * */
  onJobDescriptionChange = e => {
    const {name, value} = e.target;
    if (value.length <= 900) {
      this.setState({[name]: value,}, () => this.validateFormData(name))
    }
  };

  /**
   * TO validate Job tittle
   * @return: updating state with an error
   * */
  validateJobTitle = () => {
    const {title} = this.state;
    let errorHere = '';
    if (title === '') {
      errorHere = 'Kindly specify your job title'
    } else {
      if (!AlphaSpaceHypenNumber(title)) {
        errorHere = 'Only Alphabet, Number and one space are allowed'
      }
    }
    this.setState({'title_error': errorHere})
  };

  /**
   * TO validate Job role
   * @return: updating state with an error
   * */
  validateJobRole = () => {
    const job_role = this.state.job_role.value;
    let errorHere = '';
    if (job_role === "" || job_role === undefined) errorHere = 'Kindly specify your job role';
    this.setState({'job_role_error': errorHere})
  };

  /**
   * TO validate Job description
   * @return: updating state with an error
   * */
  validateJobDescription = () => {
    const {job_description} = this.state;
    let errorHere = '';
    if (job_description === '') errorHere = "Kindly specify your job description";
    this.setState({'job_description_error': errorHere})
  };

  /**
   * TO validate key skills
   * @return: updating state with an error
   * */
  validateKeySkills = () => {
    const {key_skills} = this.state;
    let errorHere = "";
    if (key_skills.length === 0) errorHere = "Kindly enter at least one skills/roles here";
    this.setState({'key_skills_error': errorHere})
  };

  /**
   * TO validate functional area
   * @return: updating state with an error
   * */
  validateFunctionalArea = () => {
    if (this.state.functional_area.length === 0) {
      let errorHere = "Kindly specify your Functional area";
      this.setState({'functional_area_error': errorHere,})
    } else this.setState({'functional_area_error': ''})
  };

  /**
   * TO validate industry
   * @return: updating state with an error
   * */
  validateIndustry = () => {
    if (this.state.industry.length === 0) {
      let errorHere = "Kindly specify your Industry";
      this.setState({'industry_error': errorHere,})
    } else this.setState({'industry_error': ''});
  };

  /**
   * TO validate Job type
   * @return: updating state with an error
   * */
  validateJobType = () => {
    const job_type = this.state.job_type;
    let errorHere = "";
    if (job_type.length === 0) {
      errorHere = "Kindly specify Job Type";
    }
    this.setState({'job_type_error': errorHere,})
  };

  /**
   * TO validate max work experience
   * @return: updating state with an error
   * */
  validateMaximumExperience = () => {
    const {work_experience_max, work_experience_min, is_fresher} = this.state;
    let errorHere = "";
    if (!is_fresher) {
      if (work_experience_max === '' || work_experience_max === undefined) {
        errorHere = 'Kindly select a valid work Experience';
      } else if (parseInt(work_experience_min) >= parseInt(work_experience_max)) {
        errorHere = 'Max experience should be more than min Experience';
      }
    }
    this.setState({'work_experience_max_error': errorHere,})
  };

  /**
   * TO validate min work experience
   * @return: updating state with an error
   * */
  validateMinimumExperience = () => {
    const {work_experience_min, is_fresher} = this.state;
    let errorHere = "";
    if (!is_fresher) {
      if (work_experience_min === '' || work_experience_min === undefined) {
        errorHere = 'Kindly select valid work Experience';
      }
    }
    this.setState({'work_experience_min_error': errorHere,})
  };

  /**
   * TO validate vacancy
   * @return: updating state with an error
   * */
  validateVacancy = () => {
    const {number_of_vacancy} = this.state;
    let errorHere = "";
    if (number_of_vacancy === "" || number_of_vacancy < 1) {
      errorHere = "Kindly specify number of vacancies";
    } else if (number_of_vacancy > 1000) {
      errorHere = "Number should be less than 1000";
    }
    this.setState({number_of_vacancy_error: errorHere})
  };

  /**
   * TO validate currency
   * @return: updating state with an error
   * */
  valdiateCurrency = () => {
    const currency = this.state.currency.value;
    let errorHere = '';
    if (currency === '') {
      errorHere = 'Kindly specify currency';
    }
    this.setParticularState('currency_error', errorHere);
  };

  /**
   * TO validate min salary
   * @return: updating state with an error
   * */
  valdiateMinimumSalary = () => {
    const {minimum_ctc} = this.state;
    let errorHere = '';

    if (minimum_ctc === '' || minimum_ctc === undefined || minimum_ctc === null) {
      errorHere = 'Kindly specify a valid CTC';
    } else if (parseFloat(minimum_ctc) < 0.1 || parseFloat(minimum_ctc) > 100) {
      errorHere = "Range must be between 0.1 to 100";
    }
    this.setParticularState('minimum_ctc_error', errorHere);
  };

  /**
   * TO validate max salary
   * @return: updating state with an error
   * */
  valdiateMaximumSalary = () => {
    const {maximum_ctc, minimum_ctc} = this.state;
    let errorHere = '';
    if (maximum_ctc === '' || maximum_ctc === undefined || maximum_ctc === null) {
      errorHere = 'Kindly specify a valid CTC';
    } else if (parseFloat(maximum_ctc) < 0.1 || parseFloat(maximum_ctc) > 100) {
      errorHere = "Range must be between 0.1 to 100";
    } else if (parseFloat(maximum_ctc) < parseFloat(minimum_ctc)) {
      errorHere = "Min CTC should be less than Max CTC";
    }
    this.setParticularState('maximum_ctc_error', errorHere);
  };

  /**
   * TO validate  how soon candidate join
   * @return: updating state with an error
   * */
  validateHowSoon = () => {
    const how_soon = this.state.how_soon;
    let errorHere = "";
    if (how_soon === "" || how_soon === undefined) {
      errorHere = "Kindly specify how soon you can join";
    }
    this.setState({'how_soon_error': errorHere,})
  };

  /**
   * TO validate all form fields and calling a relevant function
   * @param: name
   * @return: calling a function
   * */
  validateFormData = async name => {
    switch (name) {
      case 'title':
        await this.validateJobTitle();
        return;
      case 'how_soon':
        await this.validateHowSoon();
        return;
      case 'job_role':
        await this.validateJobRole();
        return;
      case 'job_description':
        await this.validateJobDescription();
        return;
      case 'industry':
        await this.validateIndustry();
        return;
      case 'job_type':
        await this.validateJobType();
        return;
      case 'functional_area':
        await this.validateFunctionalArea();
        return;
      case 'key_skills':
        await this.validateKeySkills();
        return;
      case 'work_experience_max':
        await this.validateMaximumExperience();
        return;
      case 'work_experience_min':
        await this.validateMinimumExperience();
        return;
      case 'number_of_vacancy':
        await this.validateVacancy();
        return;
      case 'currency':
        await this.valdiateCurrency();
        return;
      case 'minimum_ctc':
        await this.valdiateMinimumSalary();
        return;
      case 'maximum_ctc':
        await this.valdiateMaximumSalary();
        return;
    }
  };

  /**
   * TO validate all locations using reference
   * @return {Promise<void>}
   */
  validateLocation = async () => {
    for (let child in this.allLocations) {
      if (this.allLocations != null) {
        if (this.allLocations[child]) {// with help of ref validate all locatuions
          if (await this.allLocations[child].validateLocationCountry()) {//calling a function of child component
            this.setState({canSubmit: false,})
          }
        }
      }
    }
  };

  /**
   * TO validate all shift timings
   * @return {Promise<void>}
   * */
  validateTimings = async () => {
    for (let child in this.allTimings) {
      if (this.allTimings != null) {
        if (this.allTimings[child]) {// with help of ref validate all timings
          let isItInvalid = await this.allTimings[child].validateShiftTimings();//calling a function of child component
          if (isItInvalid) {
            this.setState({timeSubmit: false,})
          }
        }
      }
    }
  };

  /**
   * TO validate the field on blur
   * @param: event
   * @return: calling a function to validate field
   * */
  handleBlur = e => this.validateFormData(e.target.name);

  /**
   * TO validate all the fields
   * @return: calling a function for each field where relevant function called for particular field
   * */
  validateAllForm = () => {
    const fields = ['work_experience_max', 'visible_to_no_one', 'maximum_ctc', 'minimum_ctc', 'is_fresher', 'work_experience_min',
      'industry', 'functional_area', 'how_soon', 'key_skills', 'job_description', 'title', 'job_role', 'job_type', 'number_of_vacancy',
      'currency', 'minimum_salary', 'maximum_salary'];
    fields.map(async (value) => {
      await this.validateFormData(value);
    })
  };

  /**
   *on click Next button , validating all fields and child component
   * @param: event
   * @return: redirect to new tab after successfully update the data
   * */
  onSubmitForm = async (e) => {
    e.preventDefault();
    this.setState({canSubmit: true});
    this.setState({timeSubmit: true});
    await this.validateLocation();
    await this.validateTimings();
    await this.validateAllForm();
    const isFormValidate = await this.isFormValidated();
    if (!isFormValidate) {
    } else {
      this.setState({loading: true});
      let sendingData = {
        job_details: this.state,
        hired_for: this.state.hired_for,
        id: this.props.match.params.jobId || ""
      };
      if (this.state.allData) {
        if (this.state.allData.advertise_company_details) {
          sendingData["advertise_company_details"] = this.state.allData.advertise_company_details
        }
        if (this.state.allData.candidate_profile) {
          sendingData["candidate_profile"] = this.state.allData.candidate_profile
        }
        if (this.state.allData.job_description_documents) {
          sendingData["job_description_documents"] = this.state.allData.job_description_documents
        }
        if (this.state.allData.manage_response) {
          sendingData["manage_response"] = this.state.allData.manage_response
        }
        if (this.state.allData.questionnaire_details) {
          sendingData["questionnaire_details"] = this.state.allData.questionnaire_details
        }

      }
      try {
        const headers = {
          'authorization': handleLocalStorage("get", "employerLogin"),
          'Content-Type': 'application/json',
        };
        const data = await apiCall('post', sendingData, POST_JOB, headers);

        if (data.status) {
          this.props.updateJobId(data.id);
          const newSendingData = {id: data.id};
          const jobData = await apiCall('get', newSendingData, POST_JOBS_GET_DETAILS, headers);
          if (jobData.status) {
            this.props.updateJobDetails(jobData.data.job_details);
          }
          this.setState({loading: false});
          this.props.history.push('/create-a-job/' + `${data.id}/document-video-upload`);
        }
      } catch (e) {
      }
    }
  };

  /**
   * on change the option of how soon candidate can join
   * @param: option
   * @return: updating state and call a function to validate.
   * */
  setRequirementUrgency = (option) => {
    const value = option.label;
    this.setState({how_soon: value}, () => this.validateFormData('how_soon'))
  };

  /**
   * on change the option of max work experience can join
   * @param: option
   * @return: updating state and call a function to validate.
   * */
  setMaximumExperience = (option) => {
    const value = option.label;
    this.setState({work_experience_max: value}, () => this.validateFormData('work_experience_max'))
  };

  /**
   * on change the option of min work experience can join
   * @param: option
   * @return: updating state and call a function to validate.
   * */
  setMinimumExperience = (option) => {
    const value = option.label;
    this.setState({work_experience_min: value}, () => this.validateFormData('work_experience_min'))
  };


  /**
   * To remove the duplicate value from an array
   * @param array
   * @return {Array}
   */
  getUnique = (array) => {
    const uniqueArray = [];
    for (let value of array) {
      if (uniqueArray.indexOf(value) === -1) {
        uniqueArray.push(value);
      }
    }
    return uniqueArray;
  };

  /**
   * on change the option of job role
   * @param: option
   * @return: updating state and call a function to validate.
   * */
  setJobRole = (option) => {
    if (option.length > 0) {
      const values = option.map(value => {
        return value.label
      });
      const removedDuplicateEl = this.getUnique(values);
      this.setState({job_type: removedDuplicateEl}, () => this.validateJobType())
    } else this.setState({job_type: []});
  };
  /**
   * on click of save as draft button
   * @return: call an api to save the data and redirect to saved jobs
   * */
  saveAsDraft = async () => {
    let sendingData = {
      job_details: this.state,
      id: this.props.match.params.jobId || "",
      hired_for: this.state.hired_for
    };
    let location_data = sendingData.job_details.locations.filter(function (values) {
      return (values.country.key !== "" || values.location.key !== "");
    });
    sendingData.job_details["locations"] = location_data;
    if (this.state.allData) {
      if (this.state.allData.advertise_company_details) {
        sendingData["advertise_company_details"] = this.state.allData.advertise_company_details
      }
      if (this.state.allData.candidate_profile) {
        sendingData["candidate_profile"] = this.state.allData.candidate_profile
      }
      if (this.state.allData.job_description_documents) {
        sendingData["job_description_documents"] = this.state.allData.job_description_documents
      }
      if (this.state.allData.manage_response) {
        sendingData["manage_response"] = this.state.allData.manage_response
      }
      if (this.state.allData.questionnaire_details) {
        sendingData["questionnaire_details"] = this.state.allData.questionnaire_details
      }
    }
    const headers = {'authorization': handleLocalStorage("get", "employerLogin"), 'Content-Type': 'application/json',};
    const data = await apiCall('post', sendingData, POST_JOB, headers);
    if (data.status) {
      if (this.props.match.params.jobId) {
        this.props.history.push(this.props.match.url.replace(`create-a-job/${this.props.match.params.jobId}`, 'employer-saved-jobs'));
      } else {
        this.props.history.push(this.props.match.url.replace(`create-a-job`, 'employer-saved-jobs'));
      }
    } else {
    }
  };

  componentDidMount() {

    // creating reference of this component for save as draft
    this.getInitialisedData();
    this.props.onRef(this);
  }

  componentWillUnMount() {
    //removing the reference of this component
    this.props.onRef(null)
  }

  /**
   * performing the validation, for each field checking error
   * @return {Promise<boolean>}
   */
  isFormValidated = async () => {
    const errorList = ['industry_error', 'work_experience_max_error', 'visible_to_no_one_error', 'maximum_ctc_error', 'minimum_ctc_error', 'is_fresher_error', 'work_experience_min_error',
      'locations_error', 'how_soon_error', 'timings_error', 'key_skills_error', 'job_description_error', 'title_error', 'job_role_error', 'job_type_error', 'number_of_vacancy_error',
      'functional_area_error'];
    let isValidatedState = true;
    errorList.forEach(value => {
      if (this.state[value] !== "") {
        isValidatedState = false;
        return false
      }
      if (!this.state.canSubmit) {
        isValidatedState = false;
        return false
      }
      if (!this.state.timeSubmit) {
        isValidatedState = false;
        return false
      }
    });
    return isValidatedState
  };

  componentWillMount() {

    // receiving a job id in url,if it is not a number then redirect to first tab
    const full_url = window.location.pathname;
    try {
      const full_url_arr = full_url.split('/');
      if (isNaN(full_url_arr[2]) === true) {
        this.props.history.push('/create-a-job');
      }
    } catch (exc) {
      this.props.history.push('/create-a-job');
    }
  }

  /*
   * To get initial data of previous job id
   * */
  getInitialisedData = () => {
    const jobId = this.props.match.params.jobId;
    if (jobId) {
      this.changeReduxStore()
    } else {
      this.setState({...this.props.job_details_from_previous_job})
    }
  };

  /**
   * To get the data of previous job id from an api
   * @param: id
   * @return: updating state with coming data
   * */
  changeReduxStore = async (id = this.props.match.params.jobId) => {
    try {
      const newSendingData = {
        id: id
      };
      const headers = {
        'authorization': handleLocalStorage("get", "employerLogin"),
        'Content-Type': 'application/json',
      };
      const jobData = await apiCall('get', newSendingData, POST_JOBS_GET_DETAILS, headers);
      if (jobData.status) {
        this.setState({...jobData.data.job_details,})
      }
    } catch (e) {
    }
  };

  allLocations = {};
  allTimings = {};

  render() {
    const {classes} = this.props;
    const {
      work_experience_max, visible_to_no_one, maximum_ctc, minimum_ctc, is_fresher, work_experience_min,
      locations, how_soon, timings, functional_area, currency, job_description, title, job_role, job_type, number_of_vacancy,
      industry
    } = this.state;

    const {
      industry_error, work_experience_max_error, maximum_ctc_error, minimum_ctc_error, is_fresher_error, work_experience_min_error,
      currency_error, how_soon_error, key_skills_error, job_description_error, title_error, job_role_error, job_type_error, number_of_vacancy_error,
      functional_area_error
    } = this.state;

    const {rightHalf, leftHalf, fullWidth} = allDropDownWidth;
    if (this.state.loading) {
      return <div><LoadingIcon/></div>
    } else
      return (
        <div className={"job-details-container"}>
          <div className="first full-form-child" style={{"paddingBottom": "7px"}}>
            <FormControl
              className={"form-child left-child-form " + classes.formControl}
              error={title_error !== ""}
            >
              <InputLabel shrink={true} classes={{root: classes.cssLabel, focused: classes.cssFocused,}}> Job
                Title </InputLabel>
              <Input
                name="title"
                value={title}
                margin="normal"
                onChange={this.onInputChange}
                classes={{
                  underline: classes.cssUnderline,
                  focused: classes.cssFocused,
                }}
                autoComplete="off"
                onBlur={this.handleBlur}
              />
              <FormHelperText><span className="field_error">{title_error}</span></FormHelperText>
            </FormControl>
            <FormControl
              className="form-child"
              error={job_role_error !== ""}
              style={{marginTop: '13px'}}
            >
              <InputLabel
                style={{marginTop: '-12px'}}
                className="change-label-style"
                shrink={true}
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                  error: classes.cssError
                }}
              >
                {'Job Role'}
              </InputLabel>
              <CreatableRemoteDataSingleSelectDropdown
                isSearchable={true}
                apiUrl={JOB_ROLE}
                queryParams={{search: ''}}
                defaultValue={job_role ? {value: job_role.key, label: job_role.value} : {}}
                getSelectedOption={(option) => this.setParticularState('job_role', {
                  key: option.value,
                  value: option.label
                })}
                isClearable={false}
                error={job_role_error}
              />
              <FormHelperText><span className="field_error">{job_role_error}</span></FormHelperText>
            </FormControl>
          </div>
          <div className="second" style={{position: 'relative'}}>
            <FormControl
              className={"full-form-child " + classes.formControl}
              error={job_description_error !== ""}
            >
              <InputLabel
                shrink={true}
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                }}
              >Job Description</InputLabel>
              <Input
                name="job_description"
                value={job_description}
                margin="normal"
                multiline={true}
                onChange={this.onJobDescriptionChange}
                classes={{
                  underline: classes.cssUnderline,
                  focused: classes.cssFocused,
                }}
                onBlur={this.handleBlur}
              />
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                {job_description_error === "" ? null :
                  <FormHelperText><span className="field_error">{job_description_error}</span></FormHelperText>}
                <div className="character-info-section change-character-info-section">
                  <CustomTag text="Character left : " className="character-left"/>
                  <CustomTag
                    text={job_description === "" || job_description === null ? 900 : 900 - job_description.length}
                    className="count"/>
                </div>
              </div>
            </FormControl>

          </div>
          <div className="third">
            <FormControl
              className={"full-form-child " + classes.formControl}
              error={key_skills_error !== ""}
              style={{marginTop: '20px'}}
            >
              <InputLabel
                style={{marginTop: '-12px'}}
                className="change-label-style"
                shrink={true}
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                  error: classes.cssError
                }}
              >
                {'Key Skills'}
              </InputLabel>
              <MuiThemeProvider theme={theme}>
                <Tooltip disableFocusListener disableTouchListener
                         title="Enter & Search for the skills/roles you hire for" placement="right">
                  <span className="combined-shape" style={{marginTop: '-15px', marginLeft: '70px'}}><CustomIcon
                    iconStyle={classes.tootipQuestionMark} icon={question}/></span>
                </Tooltip>
              </MuiThemeProvider>
              <CreatableRemoteMultiDropDown
                isSearchable={true}
                apiUrl={KEY_SKILLS}
                queryParams={{search: ''}}
                getSelectedOption={(option) =>
                  this.setValuetoChips('key_skills', 'key_skills_error', option)}
                editable={true}
                maxOptions={50}
                ShowkeySkills={false}
                defaultValue={this.state.key_skills}
                error={this.state.key_skills_error}
                gettingError={(error) => this.onErrorChange('skills_error', error)}
              >
              </CreatableRemoteMultiDropDown>
            </FormControl>

          </div>
          <div className="fourth full-form-child">
            <FormControl
              className={"form-child left-child-form " + classes.formControl}
              error={job_type_error !== ""}
              style={{marginTop: '13px'}}
            >
              <InputLabel shrink
                          style={{marginTop: '-12px'}}
                          classes={{
                            root: classes.cssLabel,
                            focused: classes.cssFocused,
                          }}
              >Job type</InputLabel>
              <NonCreatableMultiSelectDropDown
                name={job_type}
                id={job_type}
                editable={true}
                isSearchable={false}
                defaultValue={job_type.length > 0 ? job_type.map(item => {
                  return {key: item, value: item}
                }) : []}
                getSelectedOption={(option) => this.setJobRole(option)}
                options={jobTypes}
                isClearable={false}
                error={job_type_error}
              />

              {/*<FormHelperText><span className="field_error">{job_type_error}</span></FormHelperText>*/}
            </FormControl>
            <FormControl
              className={"form-child " + classes.formControl}
              error={number_of_vacancy_error !== ""}
            >
              <InputLabel
                shrink={true}
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                }}
              >Number of vacancies</InputLabel>
              <Input
                name="number_of_vacancy"
                value={number_of_vacancy}
                classes={{
                  underline: classes.cssUnderline,
                  focused: classes.cssFocused,
                }}
                type="number"
                margin="normal"
                onChange={this.onInputChange}
                onBlur={this.handleBlur}
              />
              <FormHelperText><span className="field_error">{number_of_vacancy_error}</span></FormHelperText>
            </FormControl>
          </div>
          <div className="fifth full-form-child">
            <FormControl
              className={"form-child left-child-form " + classes.formControl}
              error={industry_error !== ""}
              style={{marginTop: '13px'}}
            >
              <InputLabel
                style={{marginTop: '-12px'}}
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
                getSelectedOption={(option) =>
                  this.setValuetoChips('industry', 'industry_error', option)}
                editable={true}
                defaultValue={industry}
                error={this.state.industry_error}
                gettingError={(error) => this.onErrorChange('industry_error', error)}
              >
              </NonCreatableRemoteDataMultiSelectDropdown>
              {/*<FormHelperText><span className="field_error">{industry_error}</span></FormHelperText>*/}
            </FormControl>
            <FormControl
              className="form-child"
              error={functional_area_error !== ""}
              style={{marginTop: '13px'}}
            >
              <InputLabel
                style={{marginTop: '-12px'}}
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
                getSelectedOption={(option) => this.setValuetoChips('functional_area', 'functional_area_error', option)}
                editable={true}
                defaultValue={functional_area}
                error={this.state.functional_area_error}
                maxOptions={4}
                gettingError={(error) => this.onErrorChange('functional_area_error', error)}
              >
              </NonCreatableRemoteDataMultiSelectDropdown>

              {/*<FormHelperText><span className="field_error">{functional_area_error}</span></FormHelperText>*/}
            </FormControl>
          </div>
          <div className={"fourth full-form-child " + classes.formControl}>
            <FormControl
              className="form-child left-child-form"
              error={how_soon_error !== ""}
              style={{marginTop: '13px'}}
            >
              <InputLabel shrink
                          style={{marginTop: '-12px'}}
                          classes={{root: classes.cssLabel, focused: classes.cssFocused,}}
              >How soon required? </InputLabel>
              <NonCreatableSingleSelectDropdown
                isSearchable={false}
                getSelectedOption={(option) => this.setRequirementUrgency(option)}
                defaultValue={how_soon ? {key: 1, label: how_soon} : {}}
                options={requirementUrgency}
                isClearable={false}
                error={how_soon_error}
              />
              <FormHelperText><span className="field_error">{how_soon_error}</span></FormHelperText>
            </FormControl>
          </div>
          <div className="hr-line"></div>
          <div className="work-experience">
            <div className="work-experience-text">
              Work Experience
            </div>
            <div className="full-form-child work-experience-fields">
              <div className="form-child">
                <FormControl
                  className={"one-forth-form one-forth-form-left " + classes.formControl}
                  style={{marginTop: '13px'}}
                >
                  {!is_fresher ? <React.Fragment><InputLabel
                      shrink={true}
                      style={{marginTop: '-13px'}}
                      classes={{
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                      }}
                    >Minimum</InputLabel>
                      <NonCreatableSingleSelectDropdown
                        isSearchable={false}
                        isDisabled={is_fresher}
                        getSelectedOption={(option) => this.setMinimumExperience(option)}
                        defaultValue={work_experience_min ? work_experience_min.label !== '' ? {
                          key: work_experience_min,
                          label: work_experience_min
                        } : {} : {}}
                        options={experiences}
                        isClearable={false}
                        error={work_experience_min_error}
                      /></React.Fragment> :
                    <React.Fragment><InputLabel
                      shrink={true}
                      style={{
                        marginTop: '-13px',
                        color: ' #A9A9A9 !important',
                        fontSize: '14px',
                        fontFamily: 'Roboto',
                        fontWeight: '400',
                        opacity: '0.4'
                      }}
                      classes={{
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                      }}
                    >Minimum</InputLabel>
                      <NonCreatableSingleSelectDropdown
                        isSearchable={false}
                        isDisabled={true}
                        getSelectedOption={(option) => this.setMinimumExperience(option)}
                        defaultValue={work_experience_min ? work_experience_min.label !== '' ? {
                          key: work_experience_min,
                          label: work_experience_min
                        } : {} : {}}
                        options={experiences}
                        isClearable={false}
                        error={work_experience_min_error}
                      />
                    </React.Fragment>
                  }
                  <FormHelperText><span className="field_error">{work_experience_min_error}</span></FormHelperText>
                </FormControl>

                <FormControl
                  className={"one-forth-form one-forth-form-left" + classes.formControl}
                  style={{marginTop: '13px'}}
                >
                  {!is_fresher ? <React.Fragment><InputLabel
                      style={{marginTop: '-36px'}}
                      classes={{
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                      }}
                    >Maximum</InputLabel>
                      <NonCreatableSingleSelectDropdown
                        isSearchable={false}
                        isDisabled={is_fresher}
                        getSelectedOption={(option) => this.setMaximumExperience(option)}
                        defaultValue={work_experience_max ? {key: work_experience_max, label: work_experience_max} : {}}
                        options={experiences}
                        isClearable={false}
                        error={work_experience_max_error}
                      /></React.Fragment> :
                    <React.Fragment>
                      <InputLabel
                        style={{
                          marginTop: '-36px',
                          color: ' #A9A9A9 !important',
                          fontSize: '14px',
                          fontFamily: 'Roboto',
                          fontWeight: '400',
                          opacity: '0.4'
                        }}
                      >Maximum</InputLabel>
                      <NonCreatableSingleSelectDropdown
                        isSearchable={false}
                        isDisabled={true}
                        getSelectedOption={(option) => this.setMaximumExperience(option)}
                        defaultValue={work_experience_max ? {key: work_experience_max, label: work_experience_max} : {}}
                        options={experiences}
                        isClearable={false}
                        error={work_experience_max_error}
                      />
                    </React.Fragment>
                  }
                  <FormHelperText><span className="field_error">{work_experience_max_error}</span></FormHelperText>
                </FormControl>
              </div>
              <div className={"form-child one-forth-form-right " + classes.formControl}>
                <FormControl
                  className="one-forth-form"
                >
                  <FormControlLabel
                    classes={{label: classes.label}}
                    control={
                      <Checkbox
                        name="is_fresher"
                        defaultChecked={false}
                        checked={is_fresher}
                        value={is_fresher}
                        icon={<CustomIcon icon={unselected}/>}
                        checkedIcon={<CustomIcon icon={selectedCircle}/>}
                        onClick={() => {
                          this.setState({
                            is_fresher: !is_fresher,
                            work_experience_max_error: '',
                            work_experience_min_error: '',
                            work_experience_max: '',
                            work_experience_min: ''
                          })
                        }}
                      />
                    }
                    label="Fresher"
                  />
                </FormControl>
              </div>
            </div>
          </div>
          <div className="hr-line"></div>
          <div className="annual-ctc">
            <div className="annual-ctc-text">
              Annual CTC
            </div>
            <div className="full-form-child annual-ctc-fields">
              <div className="form-child">
                <FormControl
                  className={"one-forth-form one-forth-form-left " + classes.formControl}
                  error={currency_error !== ""}
                  style={{marginTop: '13px'}}
                >
                  <InputLabel
                    style={{marginTop: '-36px'}}
                    classes={{
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    }}
                  >Currency</InputLabel>
                  <NonCreatableRemoteDataSingleSelectDropdown
                    isSearchable={true}
                    apiUrl={CURRENCY}
                    queryParams={{search: ''}}
                    getSelectedOption={(option) => this.setParticularState('currency', {
                      key: option.value,
                      value: option.label
                    })}
                    isClearable={false}
                    defaultValue={currency ? {value: currency.key, label: currency.value} : {}}
                    error={currency_error}
                  />
                  <FormHelperText><span className="field_error">{currency_error}</span></FormHelperText>
                </FormControl>
                <FormControl
                  className={"one-forth-form " + classes.formControl}
                  error={minimum_ctc_error !== ""}
                >
                  <InputLabel shrink
                              classes={{
                                root: classes.cssLabel,
                                focused: classes.cssFocused,
                              }}
                  >Minimum</InputLabel>
                  <Input
                    name="minimum_ctc"
                    value={minimum_ctc}
                    classes={{
                      underline: classes.cssUnderline,
                      focused: classes.cssFocused,
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        Lacs
                      </InputAdornment>
                    }
                    onChange={this.onInputChange}
                    margin="normal"
                    onBlur={this.handleBlur}
                    type="number"
                  />
                  <FormHelperText><span className="field_error">{minimum_ctc_error}</span></FormHelperText>
                </FormControl>
              </div>
              <div className={"form-child one-forth-form-right " + classes.formControl}>
                <div className="form-child1">
                  <FormControl
                    className={"one-forth-form one-forth-form-left " + classes.formControl}
                    error={maximum_ctc_error !== ""}
                  >
                    <InputLabel
                      shrink
                      classes={{
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                      }}
                    >Maximum</InputLabel>
                    <Input
                      name="maximum_ctc"
                      value={maximum_ctc}
                      classes={{
                        underline: classes.cssUnderline,
                        focused: classes.cssFocused,
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          Lacs
                        </InputAdornment>
                      }
                      onChange={this.onInputChange}
                      margin="normal"
                      onBlur={this.handleBlur}
                      type="number"
                    />
                    <FormHelperText><span className="field_error">{maximum_ctc_error}</span></FormHelperText>
                  </FormControl>
                  <FormControl
                    className={"one-forth-form form-checkbox-image " + classes.formControl}
                  >
                    <FormControlLabel
                      classes={{label: classes.label}}
                      control={
                        <Checkbox
                          name="visible_to_no_one"
                          classes={{root: classes.root}}
                          defaultChecked={false}
                          checked={visible_to_no_one}

                          onClick={() => {
                            this.setState({visible_to_no_one: !visible_to_no_one})
                          }}
                        />
                      }
                      label="Visible to No One"
                    />
                  </FormControl>
                </div>
              </div>
            </div>
          </div>
          <div className="hr-line"></div>
          <div className="locations-container">
            <div className="location-text-icon">
              <div className="location-text">Location</div>
              <div className="shape" onClick={this.addLocation}>
                <div className="plus" style={{marginTop: '-1px', cursor: 'pointer'}}>+</div>
              </div>
            </div>
            {
              locations.map((value, key) => {
                return <Location {...value} key={key}
                                 index={key}
                                 onRef={ref => (this.allLocations[key] = ref)}
                                 removeLocation={() => this.removeLocation(key)}
                                 modifyLocation={this.modifyLocation}/>
              })
            }
          </div>
          <div className="hr-line"/>
          <div className="timing-container">
            <div className="timing-text-icon">
              <div className="timing-text">Timings</div>
              <div className="shape" onClick={this.addTiming}>
                <div className="plus" style={{marginTop: '-1px', marginLeft: '-1px', cursor: 'pointer'}}>+</div>
              </div>
            </div>
            {
              timings.map((value, key) => {
                return <Timing {...value} key={key} index={key}
                               onRef={ref => (this.allTimings[key] = ref)}
                               removeTiming={() => this.removeTiming(key)} modifyTiming={this.modifyTiming}/>
              })
            }
          </div>
          <div className="hr-line"></div>
          <div className="next-job-details">
            <button
              className="shenzyn-btn filled-primary-button px-48"
              saveText="Next"
              onClick={this.onSubmitForm}
            >
              Next
            </button>
          </div>
          <div className="last-child-of-job-details"/>
        </div>
      );
  }
}

JobDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return {
    job_details: state.createAJob.job_details ? JSON.parse(JSON.stringify(state.createAJob.job_details)) : state.createAJob.job_details,
    job_details_from_previous_job: state.postJobModal.job_details ? JSON.parse(JSON.stringify(state.postJobModal.job_details)) : state.postJobModal.job_details,
    allData: state.postJobModal ? JSON.parse(JSON.stringify(state.postJobModal)) : state.postJobModal,
    hired_for: state.createAJob.hired_for ? JSON.parse(JSON.stringify(state.createAJob.hired_for)) : state.createAJob.hired_for
  }
};

const mapDispatchToProps = dispatch => ({
  updateJobDetails: bindActionCreators(
    actions.updateJobDetails,
    dispatch,
  ),
  updateJobId: bindActionCreators(
    actions.updateJobId,
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(JobDetails))
