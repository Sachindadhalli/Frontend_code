//library dependency
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import {DatePicker, MuiPickersUtilsProvider} from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core'

//custom components
import CustomIcon from "../../../../../../components/CustomIcon/CustomIcon";

//styles
import './styles.scss'

//icons
import search from "../../../../../../../assets/media/icons/search.svg";
import calendar from "../../../../../../../assets/media/icons/calendar.svg";

/**
 * used to override date picker theme color
 */
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
})

/**
 *used to override material ui custom components style
 * @returns {{root: {display: string, justifyContent: string, flexWrap: string}, input: {"&::placeholder": {width: string, height: string, fontFamily: string, fontSize: string, fontWeight: string, fontStyle: string, fontStretch: string, lineHeight: string, letterSpacing: string, color: string, opacity: string}, width: string}, formControl: {margin: string}}}
 */
const styles = () => ({
  root: {display: 'flex', justifyContent: 'center', flexWrap: 'wrap'},
  input: {
    '&::placeholder': {
      width: '100%', height: '19px', fontFamily: 'Roboto', fontSize: '16px', fontWeight: 'normal',
      fontStyle: 'normal', fontStretch: 'normal', lineHeight: 'normal', letterSpacing: 'normal',
      color: '#656565', opacity: '1'
    },
    width: "100%"
  },
  formControl: {margin: "0px"}
});

class EmployerInboxDetailsSearchCard extends Component {
  constructor(props) {
    super(props);
    this.state = {search_text: "", from_date: null, from_date_error: "", to_date: null, to_date_error: ''}
  }

  /**
   * this function change value for defined name in state and send state values through props
   * @param name
   * @returns {Function}
   */
  handleChange = name => event => {
    this.setState({[name]: event.target.value}, () => this.props.onSelectSearch(this.state));
  };

  /**
   * this function used to set value depending on target name and value
   * @param e
   * @param validatorAfterSave
   */
  handleInput = (e, validatorAfterSave = null) => {
    const {name} = e.target;
    let value = e.target.value;
    if (["from_date", "to_date"].includes(e.target.name)) {
      if (value === null) {
        value = null
      } else {
        value = new Date(value)
      }
    }
    this.setState({[name]: value,}, () => {
      if (validatorAfterSave) {
        this.validateFields(name);
      }
    })
  };

  /**
   * validate from date and set error based on error values
   * @returns {Promise<boolean>}
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
        let to_date = this.getToDate(this.state.to_date), from_date = this.getFromDate(this.state.from_date);
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
   * Validate to date and set error based on value
   * @returns {Promise<boolean>}
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
      let to_date = this.getToDate(this.state.to_date), from_date = this.getFromDate(this.state.from_date);
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
   * based on filed name calling validate function
   * @param fieldName
   */
  validateFields = fieldName => {
    switch (fieldName) {
      case 'from_date':
        this.validateFromDateForm();
        break;
      case 'to_date':
        this.validateToDateForm();
        break;
    }
  };

  /**
   * assign error value for particular field
   * @param name
   * @param value
   */
  setParticularField = (name, value) => {
    const errorName = name + '_error';
    this.setState({[errorName]: value})
  };

  /**
   * remove error from fields with following conditions
   * @param e
   */
  removeErrorFocus = (e) => {
    let errorValue = '';
    if (this.state.to_date && this.state[e.target.name]) this.setParticularField(e.target.name, errorValue);
    else if (this.state.from_date && this.state[e.target.name]) this.setParticularField(e.target.name, errorValue);
  };

  /**
   * this is convert any date to start date means time will be 00:00:00
   * @param timestamp
   * @returns {number}
   */
  getFromDate = (timestamp) => {
    let today = new Date(timestamp);
    let to_date = today.getDate();
    let to_month = today.getMonth() + 1;
    let to_year = today.getFullYear();
    let original_date = to_month + '-' + to_date + '-' + to_year + " 00:00:00";
    return new Date(original_date).getTime()
  };

  /**
   * this is convert any date to end date means time will be 23:59:59
   * @param timestamp
   * @returns {number}
   */
  getToDate = (timestamp) => {
    let today = new Date(timestamp);
    let to_date = today.getDate();
    let to_month = today.getMonth() + 1;
    let to_year = today.getFullYear();
    let original_date = to_month + '-' + to_date + '-' + to_year + " 23:59:59";
    return new Date(original_date).getTime()
  };

  render() {
    const {classes} = this.props;
    const {from_date_error, to_date_error, search_text, from_date, to_date} = this.state;
    return (
      <div className="employer-inbox-search-card">
        <div className="employer-inbox-search-inner-allignment">
          <div className="employer-inbox-flex-space-between">
            <div className="job-title-text-margin">
              <FormControl className={classes.formControl}>
                <label className="search-label-text padding-bottom-job-role-label"> Job Title</label>
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
            <div className="date-alignments date-time-margin">
              <div>
                <label className="search-label-text" style={{"paddinBottom": "10px"}}> Posted on</label>
                <Grid container spacing={16}>
                  <Grid item xs={6}>
                    <FormControl fullWidth={true} error={!!from_date_error}>
                      <label className="search-label-text1" style={{"marginBottom": "-16px"}}>From</label>
                      <MuiThemeProvider theme={customTheme}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <DatePicker
                            id="from_date"
                            name="from_date"
                            margin="normal"
                            clearable={true}
                            value={from_date}
                            format="yyyy/MM/dd"
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
                    <FormControl fullWidth={true} error={!!from_date_error}>
                      <label className="search-label-text1" style={{"marginBottom": "-16px"}}> To</label>
                      <MuiThemeProvider theme={customTheme}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <DatePicker
                            id="to_date"
                            name="to_date"
                            margin="normal"
                            value={to_date}
                            format="yyyy/MM/dd"
                            maxDate={new Date()}
                            clearable={true}
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(EmployerInboxDetailsSearchCard);
