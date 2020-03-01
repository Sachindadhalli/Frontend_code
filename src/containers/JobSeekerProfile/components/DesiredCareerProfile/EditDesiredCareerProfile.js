//library dependency
import React, {Component} from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import {Input, InputAdornment} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';


//custom components
import NonCreatableSingleSelectDropdown
  from '../../../../components/SingleSelectDropdownWrapper/components/NonCreatableSingleSelectDropdown';
import NonCreatableRemoteDataSingleSelectDropdown
  from '../../../../components/SingleSelectDropdownWrapper/components/NonCreatableRemoteDataSingleSelectDropdown';

//styles
import './styles.scss';


//utilities
import {CURRENCY} from "../../../../../config/constants";
import {withStyles} from "@material-ui/core/styles/index";


//icons

/**
 * used to overrides styles of material custom components styles
 */
const styles = () => ({
  root: {},
  CheckboxLabel: {
    fontFamily: 'Roboto',
    fontSize: '16px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#212121'
  }
});

/**
 * drop down options from year and month
 * @type {*[]}
 */
const year_options = [{value: 1, key: 1}, {value: 2, key: 2}, {value: 3, key: 3}, {value: 4, key: 4}];
const month_options = [{value: 1, key: 1}, {value: 2, key: 2}, {value: 3, key: 3}, {value: 4, key: 4}];

/**
 * custom checkbox function having shenzyn theme color
 */
const GreenCheckbox = withStyles({
  root: {
    color: "#e0e0e0",
    '&$checked': {
      color: "#e73a9e",
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);


class EditDesiredCareerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radio_out: 'Immediate',
      year: '',
      month: '',
      currency: '',
      currency_error: '',
      salary: '',
      salary_error: '',
      flexible: true,
      day: false,
      night: true
    }
  }

  /**
   * update radio btton change in state variable
   * @param e
   */
  handleChangeRadio = (e) => {
    this.setState({radio_out: e.target.value})
  };
  /**
   * update state variable values, variable name defined by label and value defined bu options
   * @param options
   * @param label
   * @constructor
   */
  SelectedOptions = (options, label) => {
    this.setState({[label]: options})
  };
  /**
   * update salary value in state depend on event value
   * @param e
   */
  onInputChange = (e) => {
    this.setState({salary: e.target.value})
  };
  /**
   * toggle variable value in state, variable name specified by field_name
   * @param field_name
   */
  handleChange = (field_name) => {
    this.setState({[field_name]: !this.state[field_name]})
  };

  /**
   * under development
   * @param e
   */
  handleBlur = (e) => {
  };


  render() {
    const {radio_out, year, month, currency, currency_error, salary} = this.state;
    const {classes} = this.props;
    return (
      <div className='edit-desire-career-profile-container'>
        <div className='edit-profile-item-align-1'>
          <Grid container spacing={16}>
            <Grid item xs={12} md={6}>

            </Grid>
            <Grid item xs={12} md={6}>

            </Grid>
          </Grid>
        </div>
        <div className='edit-profile-item-align-2'>
          <Grid container spacing={16}>
            <Grid item xs={12} md={6}>

            </Grid>
            <Grid item xs={12} md={6}>

            </Grid>
          </Grid>
        </div>
        <div className='edit-profile-item-align-3'>
          <Grid container spacing={16}>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                control={
                  <GreenCheckbox
                    checked={this.state.day}
                    onChange={() => this.handleChange('day')}
                    value="day"
                  />
                }
                classes={{label: classes.CheckboxLabel}}
                label="Day (9 AM - 5 PM)"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                control={
                  <GreenCheckbox
                    checked={this.state.night}
                    onChange={() => this.handleChange('night')}
                    value="night"
                  />
                }
                classes={{label: classes.CheckboxLabel}}
                label="Night (10 PM - 7 PM)"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                control={
                  <GreenCheckbox
                    checked={this.state.flexible}
                    onChange={() => this.handleChange('flexible')}
                    value="flexible"
                  />
                }
                classes={{label: classes.CheckboxLabel}}
                label="Flexible"
              />
            </Grid>
          </Grid>
        </div>
        <div className='edit-profile-item-align-4'>
          <Grid container spacing={16}>
            <Grid item xs={12} md={6}>
              <FormControl style={{width: '100%'}}>
                <label className='experience-radio-button-label'>Availability to Join</label>
                <RadioGroup aria-label="position" name="position" value={radio_out} onChange={this.handleChangeRadio}
                            row>
                  <FormControlLabel
                    style={{width: '45%'}}
                    value="Immediate"
                    control={<Radio/>}
                    label="Immediate"
                    classes={{label: classes.RadioButtonLabel}}
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    style={{width: '45%'}}
                    value="Select Date"
                    control={<Radio/>}
                    label="Select Date"
                    classes={{label: classes.RadioButtonLabel}}
                    labelPlacement="end"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <label className='edit-Basic-details-dropdown-label'>Years</label>
              <div style={{width: "90%"}}>
                <NonCreatableSingleSelectDropdown
                  getSelectedOption={(option) => this.SelectedOptions(option, 'year')}
                  defaultValue={year ? year : ''}
                  options={year_options}
                  error={''}
                  style={{width: "90%"}}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <label className='edit-Basic-details-dropdown-label'>Months</label>
              <div style={{width: "90%"}}>
                <NonCreatableSingleSelectDropdown
                  getSelectedOption={(option) => this.SelectedOptions(option, 'month')}
                  defaultValue={month ? month : ''}
                  options={month_options}
                  error={''}
                />
              </div>
            </Grid>
          </Grid>
        </div>
        <div className='edit-profile-item-align-5'>
          <Grid container spacing={16}>
            <Grid item xs={12} md={6}>
              <label className='edit-Basic-details-dropdown-label'>Currency</label>
              <div style={{width: '80%'}}>
                <NonCreatableRemoteDataSingleSelectDropdown
                  isSearchable={true}
                  apiUrl={CURRENCY}
                  queryParams={{search: ''}}
                  getSelectedOption={(option) => this.SelectedOptions({
                    key: option.value,
                    value: option.label
                  }, 'currency')}
                  isClearable={false}
                  defaultValue={currency ? {value: currency.key, label: currency.value} : {}}
                  error={currency_error}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <label className='edit-Basic-details-dropdown-label'>Salary</label>
              <div style={{display: "flex", alignItems: 'baseline'}}>
                <Input
                  name="salary"
                  value={salary}
                  classes={{underline: classes.cssUnderline, focused: classes.cssFocused}}
                  // endAdornment={<InputAdornment position="end">Lacs</InputAdornment>}
                  onChange={this.onInputChange}
                  margin="normal"
                  onBlur={this.handleBlur}
                  type="number"
                /><label>Lakhs</label></div>
            </Grid>
          </Grid>
        </div>
        <div className='edit-profile-item-align-6'>
          <Grid container spacing={16}>
            <Grid item xs={12} md={6}>

            </Grid>
            <Grid item xs={12} md={6}>

            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(EditDesiredCareerProfile);
