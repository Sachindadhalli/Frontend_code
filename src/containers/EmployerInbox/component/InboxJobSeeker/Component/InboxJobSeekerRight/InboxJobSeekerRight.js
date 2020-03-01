//library dependency
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import FormControl from '@material-ui/core/FormControl';
import Grid from "@material-ui/core/Grid";
import {DatePicker, MuiPickersUtilsProvider} from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import FormHelperText from "@material-ui/core/FormHelperText";
import {toast} from "react-toastify";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core'

//custom components
import AutoCompleteSearch from '../../../../../../components/AutoCompleteSearch'
import ChipsForFields
  from '../../../../../EmployerHomePage/components/EmployerJobPage/components/SectorsRoles/ChipsForFields'
import CustomIcon from "../../../../../../components/CustomIcon/CustomIcon";

//styles
import './styles.scss'

//utilities
import {
  EMPLOYER_INBOX_LOCATION,
  EMPLOYER_GET_JOB_STATUS,
  EMPLOYER_INBOX_ORGANISATION
} from '../../../../../../../config/constants'
import {isObjectAlreadyExist, calculateTotalCount} from '../../../../../../Utilities';

//icons
import search from '../../../../../../../assets/media/icons/search.svg';
import calendar from "../../../../../../../assets/media/icons/calendar.svg";

//used to override date picker theme styles
export const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#e73a9e',
      light: '#212121',
      dark: '#212121',
    },
    secondary: {
      main: '#e73a9e',
    },
  },
});

//used to override material ui custom componet styles
const styles = (theme) => ({
  root: {display: 'flex', flexWrap: 'wrap'},
  margin: {margin: theme.spacing.unit},
  withoutLabel: {marginTop: theme.spacing.unit * 3},
  textField: {marginLeft: theme.spacing.unit * 1, marginRight: theme.spacing.unit * 1, width: 200},
  input: {
    '&::placeholder': {
      width: '100%', height: '19px', fontFamily: 'Roboto', fontSize: '16px', fontWeight: 'normal',
      fontStyle: 'normal', fontStretch: 'normal', lineHeight: 'normal', letterSpacing: 'normal', color: '#656565',
      opacity: '1'
    },
    width: "100%"
  },
  formControl: {margin: theme.spacing.unit},
  formControl_0_margin: {margin: "0px;", width: "100%"},
  formControl_0_left_margin: {margin: theme.spacing.unit, "marginLeft": "0px;", "width": "90%"},
  formControl_0_right_margin: {margin: theme.spacing.unit, "marginRight": "0px;", "width": "90%"},
  formControl_20_top_margin: {"marginTop": "20px", width: "100%"}
});

class InboxJobSeekerRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_city_error: '',
      organisation_error: '',
      status_error: '',
      location_error: '',
      expected_ctc_min_error: '',
      expected_ctc_max_error: '',
      current_ctc_min_error: '',
      current_ctc_max_error: '',
      experience_min_error: '',
      experience_max_error: '',
      location: [],
      organisation: [],
      status: [],
      expected_ctc_min: '',
      expected_ctc_max: '',
      current_ctc_min: '',
      current_ctc_max: '',
      experience_min: '',
      experience_max: '',
      search_text: "",
      from_date: null,
      from_date_error: '',
      to_date: null,
      to_date_error: '',
      age: ''
    }
  }

  /**
   * this function used to set perifular filed data in state
   * name specified field name and value specified data
   * after setting in state sending state data through props to parent component
   * @param name
   * @param value
   */
  setParticularState = (name, value) => {
    if (value === null || value === "" && name.includes('error') === false) {
      return
    }
    this.setState({[name]: value}, () => this.props.onSelectSearch(this.state))
  };

  /**
   * this function used to set multiple value variables data in state, such as location having array of data
   * @param name
   * @param value
   */
  setMultiState = (name, value) => {
    let valueArray = this.state[name];
    let newValue = 0;
    if (["location"].includes(name)) {
      if (valueArray.length === 4) {
        toast('You can only select up to 4 locations ', {});
        return;
      }
    }
    if (value.value && !value.key) {
      if (["location"].includes(name)) {
        if (value.value === "All") value.key = [];
        else if (value.value === "Fresher") value.key = 0;
        else return;
      }
      value.key = value.value;
      if (["organisation"].includes(name)) {
        if (value.value === "All") {
          value.key = []
        }
        if (value.value === "Fresher") {
          value.key = 0
        }
      }
    }
    try {
      newValue = value.value.length;
      if (!isObjectAlreadyExist(value, valueArray) && 250 - calculateTotalCount(valueArray) - newValue >= 0) {
        valueArray.unshift(value);
        this.setParticularState(name, valueArray)
      }
    }
    catch (exc) {
    }
  };

  /**
   * this function used to removed specified element from the multiple value variables in state
   * @param fieldName
   * @param key
   */
  removeElementFromState = (fieldName, key) => {
    let fieldDataFromState = JSON.parse(JSON.stringify(this.state[fieldName])).filter(values => {
      return values.value !== key.value
    });
    this.setState({[fieldName]: fieldDataFromState}, () => this.props.onSelectSearch(this.state))
  };

  /**
   * this functio used to set value to variable in state
   * for experience and salary values it will check for float value exceeding 2 digits or not
   * @param name
   * @returns {Function}
   */
  handleChange = name => event => {
    let value = event.target.value;
    if (name === "experience_min" || name === "experience_max") {
      if (this.handleFloatValues(value)) this.setState({[name]: value});
    }
    else if (name === "expected_ctc_min" || name === "expected_ctc_max" || name === "current_ctc_min" || name === "current_ctc_max") {
      if (this.handleFloatValues(value)) this.setState({[name]: value});
    }
    else this.setState({[name]: value}, () => this.props.onSelectSearch(this.state));
  };

  /**
   * this function used to check float value of variable
   * if float value exceeding 2 digit then return false
   * @param value
   * @returns {boolean}
   */
  handleFloatValues = (value) => {
    if (value.includes('.')) {
      let array = value.split(".");
      return array[1].length <= 2;
    }
    else return true;
  };

  /**
   * this function used to set to date and from date in state also save another field value depends on target name and value
   * @param e
   * @param validatorAfterSave
   */
  handleInput = (e, validatorAfterSave = null) => {
    const {name} = e.target;
    let value = e.target.value;
    if (["from_date", "to_date"].includes(e.target.name)) {
      if (value !== null) value = new Date(value)
    }
    this.setState({[name]: value,}, () => {
      if (validatorAfterSave) this.validateFields(name);
    })
  };

  /**
   * this function validate Min experience and depends upon value, sets error fields
   * @returns {Promise<string>}
   */
  validateExperienceMin = async () => {
    if (this.state.experience_max === "" && this.state.experience_min === "") this.setParticularField('experience_min', "");
    else if (this.state.experience_min > this.state.experience_max && this.state.experience_max !== "" && this.state.experience_min !== "") {
      this.setParticularField('experience_min', "Min Experience should be less than Max Experience");
      this.setParticularField('experience_max', "");
    }
    else if (this.state.experience_min > 50 || this.state.experience_min === "0")
      this.setParticularField('experience_min', "Range must be between 0.1 to 50");
    else if (this.state.experience_min && this.state.experience_max === "")
      this.setParticularField('experience_max', "Please specify Max Experience");
    else {
      if (this.state.experience_max <= 50 && this.state.experience_min <= 50) this.props.onSelectSearch(this.state);
      this.setParticularField('experience_min', "");
      this.setParticularField('experience_max', "");
    }
    return "";
  };

  /**
   * this function validate Max experience and depends upon value, sets error fields
   * @returns {Promise<string>}
   */
  validateExperienceMax = async () => {
    if (this.state.experience_max === "" && this.state.experience_min === "") this.setParticularField('experience_min', "");
    else if (this.state.experience_min > this.state.experience_max && this.state.experience_max !== "" && this.state.experience_min !== "") {
      this.setParticularField('experience_max', "Min Experience should be less than Max Experience");
      this.setParticularField('experience_min', "");
    }
    else if (this.state.experience_max > 50 || this.state.experience_max === "0") {
      this.setParticularField('experience_max', "Range must be between 0.1 to 50");
    }
    else if (this.state.experience_max && this.state.experience_min === "") {
      this.setParticularField('experience_min', "Please specify Min Experience");
    }
    else {
      if (this.state.experience_max <= 50 && this.state.experience_min <= 50) this.props.onSelectSearch(this.state);
      this.setParticularField('experience_max', "");
      this.setParticularField('experience_min', "");
    }
    return "";
  };

  /**
   * this function validate Min expected ctc and depends upon value sets error filed
   * @returns {Promise<string>}
   */
  validateExpectedCTCMin = async () => {
    if (this.state.expected_ctc_max === "" && this.state.expected_ctc_min === "") this.setParticularField('expected_ctc_min', "");
    else if (this.state.expected_ctc_min > this.state.expected_ctc_max && this.state.expected_ctc_min !== "" && this.state.expected_ctc_max !== "") {
      this.setParticularField('expected_ctc_min', "Min CTC should be less than Max CTC");
      this.setParticularField('expected_ctc_max', "");
    }
    else if (this.state.expected_ctc_min > 100 || this.state.expected_ctc_min === "0") {
      this.setParticularField('expected_ctc_min', "Range must be between 0.1 to 100");
    }
    else if (this.state.expected_ctc_min && this.state.expected_ctc_max === "") {
      this.setParticularField('expected_ctc_max', "Please specify Max CTC");
    }
    else {
      if (this.state.expected_ctc_max <= 100 && this.state.expected_ctc_min <= 100) this.props.onSelectSearch(this.state);
      this.setParticularField('expected_ctc_min', "");
      this.setParticularField('expected_ctc_min', "");
    }
    return "";
  };

  /**
   * this function validate Max expected ctc and depends upon value sets error filed
   * @returns {Promise<string>}
   */
  validateExpectedCTCMax = async () => {
    if (this.state.expected_ctc_max === "" && this.state.expected_ctc_min === "") this.setParticularField('expected_ctc_min', "");
    else if (this.state.expected_ctc_min > this.state.expected_ctc_max && this.state.expected_ctc_max !== "" && this.state.expected_ctc_min !== "") {
      this.setParticularField('expected_ctc_max', "Min CTC should be less than Max CTC");
      this.setParticularField('expected_ctc_min', "");
    }
    else if (this.state.expected_ctc_max > 100 || this.state.expected_ctc_max === "0") {
      this.setParticularField('expected_ctc_max', "Range must be between 0.1 to 100");
    }
    else if (this.state.expected_ctc_max && this.state.expected_ctc_min === "") {
      this.setParticularField('expected_ctc_min', "Please specify Min CTC");
    }
    else {
      if (this.state.expected_ctc_max <= 100 && this.state.expected_ctc_min <= 100) this.props.onSelectSearch(this.state);
      this.setParticularField('expected_ctc_min', "");
      this.setParticularField('expected_ctc_min', "");
    }
    return "";
  };

  /**
   * this function validate Min Current ctc and depends upon value sets error filed
   * @returns {Promise<string>}
   */
  validateCurrentCTCMin = async () => {
    if (this.state.current_ctc_max === "" && this.state.current_ctc_min === "") {
      this.setParticularField('current_ctc_min', "");
    }
    else if (this.state.current_ctc_min > this.state.current_ctc_max && this.state.current_ctc_max !== "" && this.state.current_ctc_min !== "") {
      this.setParticularField('current_ctc_min', "Min CTC should be less than Max CTC");
      this.setParticularField('current_ctc_max', "");
    }
    else if (this.state.current_ctc_min > 100 || this.state.current_ctc_min === "0") {
      this.setParticularField('current_ctc_min', "Range must be between 0.1 to 100");
    }
    else if (this.state.current_ctc_min && this.state.current_ctc_max === "") {
      this.setParticularField('current_ctc_max', "Please specify Max CTC");
    }
    else {
      if (this.state.current_ctc_max <= 100 && this.state.current_ctc_min <= 100) this.props.onSelectSearch(this.state);
      this.setParticularField('current_ctc_min', "");
      this.setParticularField('current_ctc_min', "");
    }
    return "";
  };

  /**
   * this function validate Max Current ctc and depends upon value sets error filed
   * @returns {Promise<string>}
   */
  validateCurrentCTCMax = async () => {
    if (this.state.current_ctc_max === "" && this.state.current_ctc_min === "") {
      this.setParticularField('current_ctc_min', "");
    }
    else if (this.state.current_ctc_min > this.state.current_ctc_max && this.state.current_ctc_max !== "" && this.state.current_ctc_min !== "") {
      this.setParticularField('current_ctc_max', "Min CTC should be less than Max CTC");
      this.setParticularField('current_ctc_min', "");
    }
    else if (this.state.current_ctc_max > 100 || this.state.current_ctc_max === "0") {
      this.setParticularField('current_ctc_max', "Range must be between 0.1 to 100");
    }
    else if (this.state.current_ctc_max && this.state.current_ctc_min === "") {
      this.setParticularField('current_ctc_min', "Please specify Min CTC");
    }
    else {
      if (this.state.current_ctc_max <= 100 && this.state.current_ctc_min <= 100) this.props.onSelectSearch(this.state);
      this.setParticularField('current_ctc_min', "");
      this.setParticularField('current_ctc_min', "");
    }
    return "";
  };

  /**
   * this function validate from date and depends upon value sets error filed for form date
   * @returns {Promise<string>}
   */
  validateFromDateForm = async () => {
    let errorValue = "", errorName = '';
    if ((this.state.from_date === null || this.state.from_date === undefined || this.state.from_date === "") && (this.state.to_date === null || this.state.to_date === undefined || this.state.to_date === "")) {
      this.setParticularField('from_date', '');
      this.setParticularField('to_date', '');
      this.props.onSelectSearch(this.state);
    }
    else {
      if (!this.state.from_date && this.state.to_date) {
        errorValue = "Kindly select a valid date range";
        errorName = 'from_date';
        this.setParticularField('to_date', '');
      }
      else if (this.state.from_date && this.state.to_date) {
        let to_date = new Date(this.state.to_date).getTime(), from_date = new Date(this.state.from_date).getTime();
        if (to_date < from_date) {
          errorValue = "To date must be greater than the From date";
          errorName = 'from_date';
          this.setParticularField('to_date', '');
        }
        else if (to_date >= from_date) {
          this.setParticularField('from_date', '');
          this.setParticularField('to_date', '');
          this.props.onSelectSearch(this.state)
        }
      }
    }
    this.setParticularField(errorName, errorValue);
    return !!errorValue;
  };

  /**
   * this function validate to date and depends upon value sets error filed
   * @returns {Promise<string>}
   */
  validateToDateForm = async () => {
    let errorValue = "", errorName = '';
    if ((this.state.from_date === null || this.state.from_date === undefined || this.state.from_date === "") && (this.state.to_date === null || this.state.to_date === undefined || this.state.to_date === "")) {
      this.setParticularField('from_date', '');
      this.setParticularField('to_date', '');
      this.props.onSelectSearch(this.state);
    }
    else if (this.state.to_date === null || this.state.to_date === undefined || this.state.to_date === "") {
      this.setParticularField('from_date', '');
      this.setParticularField('to_date', '');
    }
    else {
      let to_date = new Date(this.state.to_date).getTime(), from_date = new Date(this.state.from_date).getTime();
      if (to_date < from_date) {
        errorValue = "To date must be greater than the From date";
        errorName = 'to_date';
        this.setParticularField('from_date', '')
      }
      else if (!this.state.from_date && this.state.to_date) {
        errorValue = "Kindly select valid date range";
        errorName = 'from_date'
      }
      else if (to_date >= from_date) {
        this.setParticularField('from_date', '');
        this.setParticularField('to_date', '');
        this.props.onSelectSearch(this.state)
      }
    }
    this.setParticularField(errorName, errorValue);
    return !!errorValue;
  };

  /**
   * validate function for location will used in future
   * @returns {Promise<void>}
   */
  validatelocation = async () => {
  };

  /**
   * this is a validate filed function used to call validate field functions depends on field_name
   * @param field_name
   */
  validateFields = field_name => {
    switch (field_name) {
      case 'from_date':
        this.validateFromDateForm();
        break;
      case 'to_date':
        this.validateToDateForm();
        break;
      case 'experience_min':
        this.validateExperienceMin();
        break;
      case 'experience_max':
        this.validateExperienceMax();
        break;
      case 'expected_ctc_min':
        this.validateExpectedCTCMin();
        break;
      case 'expected_ctc_max':
        this.validateExpectedCTCMax();
        break;
      case 'current_ctc_min':
        this.validateCurrentCTCMin();
        break;
      case 'current_ctc_max':
        this.validateCurrentCTCMax();
        break;
      case 'location':
        this.validatelocation();
        break;
    }
  };

  /**
   * this is a set error value function which will set error for specified filed with specified error value
   * @param name
   * @param value
   */
  setParticularField = (name, value) => this.setState({[name + '_error']: value});

  /**
   * this function used removed error values depends on blur event
   * @param e
   */
  removeErrorFocus = (e) => {
    let errorValue = '';
    if (this.state.to_date && this.state[e.target.name]) this.setParticularField(e.target.name, errorValue);
    else if (this.state.from_date && this.state[e.target.name]) this.setParticularField(e.target.name, errorValue);
    else if (e.target.name !== "to_date" && e.target.name !== "from_date") this.setParticularField(e.target.name, errorValue);
  };

  /**
   * this function used to assigned options data in key value format to filed name specified by title in state
   * @param options
   * @param title
   */
  selectedData = (options, title) => {
    this.setState({
      [title.toLowerCase()]: [{
        "key": options.value,
        "value": options.label
      }]
    }, () => this.props.onSelectSearch(this.state));
  };

  render() {
    const {to_date, from_date, to_date_error, location_error, from_date_error, current_city_error, organisation_error, status_error, expected_ctc_min_error, expected_ctc_max_error, current_ctc_min_error, current_ctc_max_error, experience_min_error, experience_max_error} = this.state;
    const {search_text, status, location, experience_min, experience_max, expected_ctc_min, expected_ctc_max, current_ctc_min, current_ctc_max, organisation} = this.state;
    const {classes} = this.props;
    return (
      <div className="inbox-jobseeker-right-wraper">
        <div className="card">
          <div className="item-content">
            <div className="item-align">
              <FormControl className={classes.formControl_20_top_margin}>
                <Input
                  placeholder="Search"
                  value={search_text}
                  onChange={this.handleChange('search_text')}
                  startAdornment={
                    <InputAdornment position="start">
                      <CustomIcon icon={search} className="search-icon"/>
                    </InputAdornment>
                  }
                  classes={{input: classes.input}}
                />
              </FormControl>
            </div>
            <div className="item-align-1">
              <label className="search-label-text"> Applied on</label>
              <Grid container spacing={16}>
                <Grid item xs={6}>
                  <FormControl fullWidth={true} error={!!from_date_error}>
                    <label className="from-to-label-text margin-bottom--16px"> From</label>
                    <MuiThemeProvider theme={customTheme}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                          className="date-picker-margin-0"
                          id="from_date"
                          name="from_date"
                          margin="normal"
                          clearable={true}
                          value={from_date}
                          format="dd/MM/yy"
                          maxDate={new Date()}
                          onChange={(value) => this.handleInput({target: {value: value, name: "from_date"}}, true)}
                          onBlur={() => this.validateFields('from_date')}
                          onFocus={this.removeErrorFocus}
                          error={from_date_error}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">
                              <CustomIcon icon={calendar} className="search-icon"/>
                            </InputAdornment>,
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </MuiThemeProvider>
                    {from_date_error && <FormHelperText style={{color: "#f0582b"}}>{from_date_error}</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth={true} error={!!to_date_error}>
                    <label className="from-to-label-text margin-bottom--16px">To</label>
                    <MuiThemeProvider theme={customTheme}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                          className="date-picker-margin-0"
                          id="to_date"
                          name="to_date"
                          margin="normal"
                          clearable={true}
                          value={to_date}
                          format="dd/MM/yy"
                          maxDate={new Date()}
                          onChange={(value) => this.handleInput({target: {value: value, name: "to_date"}}, true)}
                          onBlur={() => this.validateFields('to_date')}
                          onFocus={this.removeErrorFocus}
                          error={to_date_error}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">
                              <CustomIcon icon={calendar} className="search-icon"/>
                            </InputAdornment>,
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </MuiThemeProvider>
                    {to_date_error && <FormHelperText style={{color: "#f0582b"}}>{to_date_error}</FormHelperText>}
                  </FormControl>
                </Grid>
              </Grid>
            </div>
            <div className="item-align hr-class">
              <hr className=""/>
            </div>
            <div className="item-align">
              <FormControl className={classes.formControl_0_margin}>
                <label className="lebal-text margin-bottom--16px">Status</label>
                <AutoCompleteSearch
                  label={""}
                  type="text"
                  selectedValues={status}
                  filterKey={"value"}
                  apiUrl={EMPLOYER_GET_JOB_STATUS}
                  width={'100%'}
                  onClose={(name, data) => {
                    if (data != null && data.value !== '')
                      this.setMultiState('status', data);
                  }}
                  queryWith={'search'}
                  otherData={{format: 'json'}}
                  showError={status_error}
                />
                <ChipsForFields
                  values={this.state.status}
                  isItEditMode={true}
                  onDelete={(key) => {
                    this.removeElementFromState('status', key)
                  }}
                />
              </FormControl>

            </div>
            <div className="item-align">
              <FormControl className={classes.formControl_0_margin}>
                <label className="lebal-text margin-bottom--16px">Location</label>
                <AutoCompleteSearch
                  label={""}
                  type="text"
                  selectedValues={location}
                  filterKey={"value"}
                  apiUrl={EMPLOYER_INBOX_LOCATION.replace("<job_id>", this.props.match.params.job_id)}
                  width={'100%'}
                  onClose={(name, data) => {
                    if (data != null && data.value !== '')
                      this.setMultiState('location', data);
                  }}
                  queryWith={'search'}
                  otherData={{country: '', state: '', format: 'json'}}
                  showError={current_city_error}
                />
                <ChipsForFields
                  values={this.state.location}
                  isItEditMode={true}
                  onDelete={(key) => {
                    this.removeElementFromState('location', key)
                  }}
                />
                {location_error && <FormHelperText style={{color: "#f0582b"}}>{location_error}</FormHelperText>}
              </FormControl>
            </div>
            <div className="item-align">
              <label className="lebal-text">Experience (in Years)</label>
              <div className="flex-space-between">
                <FormControl className={classes.formControl_0_left_margin}>
                  <label className="label-text-min-max margin-bottom--16px">Min</label>
                  <Input
                    name={"experience_min"}
                    type='number'
                    step="0.1"
                    value={experience_min}
                    onChange={this.handleChange('experience_min')}
                    onBlur={() => this.validateFields('experience_min')}
                    onFocus={this.removeErrorFocus}
                    error={experience_min_error}
                    classes={{input: this.props.classes['input']}}
                  />
                  {experience_min_error &&
                  <FormHelperText style={{color: "#f0582b"}}>{experience_min_error}</FormHelperText>}
                </FormControl>
                <FormControl className={classes.formControl_0_right_margin}>
                  <label className="label-text-min-max margin-bottom--16px">Max</label>
                  <Input
                    name={"experience_max"}
                    type='number'
                    step="0.1"
                    value={experience_max}
                    onChange={this.handleChange('experience_max')}
                    onBlur={() => this.validateFields('experience_max')}
                    onFocus={this.removeErrorFocus}
                    error={experience_max_error}
                    classes={{input: this.props.classes['input']}}
                  />
                  {experience_max_error &&
                  <FormHelperText style={{color: "#f0582b"}}>{experience_max_error}</FormHelperText>}
                </FormControl>
              </div>

            </div>
            <div className="item-align">
              <label className="lebal-text">Expected CTC (in Lacs)</label>
              <div className="flex-space-between">
                <FormControl className={classes.formControl_0_left_margin}>
                  <label className="label-text-min-max margin-bottom--16px">Min</label>
                  <Input
                    name={"expected_ctc_min"}
                    type='number'
                    step="0.1"
                    minValue='0'
                    maxValue='50'
                    value={expected_ctc_min}
                    onChange={this.handleChange('expected_ctc_min')}
                    onBlur={() => this.validateFields('expected_ctc_min')}
                    onFocus={this.removeErrorFocus}
                    classes={{input: this.props.classes['input']}}
                  />
                  {expected_ctc_min_error &&
                  <FormHelperText style={{color: "#f0582b"}}>{expected_ctc_min_error}</FormHelperText>}
                </FormControl>
                <FormControl className={classes.formControl_0_right_margin}>
                  <label className="label-text-min-max margin-bottom--16px">Max</label>
                  <Input
                    name={"expected_ctc_max"}
                    type='number'
                    step="0.1"
                    minValue='0'
                    maxValue='50'
                    value={expected_ctc_max}
                    onChange={this.handleChange('expected_ctc_max')}
                    onBlur={() => this.validateFields('expected_ctc_max')}
                    onFocus={this.removeErrorFocus}
                    classes={{input: this.props.classes['input']}}
                  />
                  {expected_ctc_max_error &&
                  <FormHelperText style={{color: "#f0582b"}}>{expected_ctc_max_error}</FormHelperText>}
                </FormControl>
              </div>
            </div>
            <div className="item-align">
              <label className="lebal-text">Current CTC (in Lacs)</label>
              <div className="flex-space-between">
                <FormControl className={classes.formControl_0_left_margin}>
                  <label className="label-text-min-max margin-bottom--16px">Min</label>
                  <Input
                    name={"current_ctc_min"}
                    type='number'
                    step="0.1"
                    minValue='0'
                    maxValue='50'
                    value={current_ctc_min}
                    onChange={this.handleChange('current_ctc_min')}
                    onBlur={() => this.validateFields('current_ctc_min')}
                    onFocus={this.removeErrorFocus}
                    classes={{input: this.props.classes['input']}}
                  />
                  {current_ctc_min_error &&
                  <FormHelperText style={{color: "#f0582b"}}>{current_ctc_min_error}</FormHelperText>}
                </FormControl>
                <FormControl className={classes.formControl_0_right_margin}>
                  <label className="label-text-min-max margin-bottom--16px">Max</label>
                  <Input
                    name={"current_ctc_max"}
                    type='number'
                    step="0.1"
                    minValue='0'
                    maxValue='50'
                    value={current_ctc_max}
                    onChange={this.handleChange('current_ctc_max')}
                    onBlur={() => this.validateFields('current_ctc_max')}
                    onFocus={this.removeErrorFocus}
                    classes={{input: this.props.classes['input']}}
                  />
                  {current_ctc_max_error &&
                  <FormHelperText style={{color: "#f0582b"}}>{current_ctc_max_error}</FormHelperText>}
                </FormControl>
              </div>
            </div>
            <div className="item-align">
              <FormControl className={classes.formControl_0_margin}>
                <label className="lebal-text margin-bottom--16px">Organisation Name</label>
                <AutoCompleteSearch
                  label={""}
                  type="text"
                  selectedValues={organisation}
                  filterKey={"value"}
                  apiUrl={EMPLOYER_INBOX_ORGANISATION.replace("<job_id>", this.props.match.params.job_id)}
                  width={'100%'}
                  onClose={(name, data) => {
                    if (data != null && data.value !== '')
                      this.setMultiState('organisation', data);
                  }}
                  queryWith={'search'}
                  otherData={{format: 'json'}}
                  showError={organisation_error}
                />
                <ChipsForFields
                  values={organisation}
                  isItEditMode={true}
                  onDelete={(key) => {
                    this.removeElementFromState('organisation', key)
                  }}
                />
              </FormControl>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default withStyles(styles)(InboxJobSeekerRight);
