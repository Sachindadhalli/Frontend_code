//library dependencies
import React, {Component} from 'react';
import {
  TextField, Input, Radio, RadioGroup, FormControlLabel, Button, FormLabel, Checkbox, MenuItem, Select, FormControl,
  FormHelperText, InputLabel, withStyles, InputAdornment, createMuiTheme, MuiThemeProvider
} from '@material-ui/core';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, TimePicker, DatePicker} from 'material-ui-pickers';

//style
import './style.scss';

//icon
import clock from '../../../assets/media/icons/clock.svg'
import calendar from '../../../assets/media/icons/calendar.svg'
import dropdown from '../../../assets/media/icons/dropdown.svg';

//custom component
import CustomIcon from '../../components/CustomIcon';
import CustomTag from '../../components/CustomTag';


/**
 * defines black color to color variable
 * @type {string}
 */
const color = "#000000";

/**
 * used to overrides date picker and time picker theme style color
 */
export const customTheme = createMuiTheme({
  palette: { primary: {main: '#F00360', light: '#212121', dark: '#212121',}, secondary: {main: '#F00360',},},
});

/**
 * used to overrides material ui custom component styles
 * @param theme
 */
const styles = (theme) => ({
  root: {display: 'flex', flexWrap: 'wrap',},
  margin: {},
  withoutLabel: {},
  textField: {marginRight: theme.spacing.unit, width: 200,},
  cssLabel: {
    '&$cssFocused': {color: color,}, color: '#656565 !important', fontSize: '14px', fontWeight: '400', fontFamily: 'Roboto',
  },
  cssFocused: {},
  cssError: { color: '#656565 !important', fontSize: '14px', fontWeight: '400', fontFamily: 'Roboto',},
  cssUnderline: {
    '&:after': {borderBottomColor: color,}, '&:hover:not($disabled):before': {borderBottomColor: `$color !important`,}
  },
  label: { fontSize: '16px', color: "#212121", fontWeight: 'normal', fontStyle: 'normal', fontStretch: 'normal',
    lineHeight: 'normal', letterSpacing: 'normal', fontFamily: 'Roboto'},
  helperText: { color: '#656565', fontSize: '14px', fontFamily: 'Roboto', fontWeight: 'normal', fontStyle: 'normal',
    fontStretch: 'normal', lineHeight: 'normal', letterSpacing: 'normal',},
  selectText: { color: 'black', fontSize: '16px', fontFamily: 'Roboto', fontWeight: 'normal', fontStyle: 'normal',
    fontStretch: 'normal', lineHeight: 'normal', letterSpacing: 'normal', overFlow: 'hidden',},
  paddingTopZero: {paddingTop: 0,},
  input: {marginTop: '9px'}
});

const ignoreLabelFormFields = ["Radio", "Button", "FormLabel", "CheckBox"];

/**
 * field type function used to return custom component function specified by type
 * @param type, name, label, value, endorment, placeholder, classes, input, radioButtons, styleClass, options
 * @param onButtonClick, isDisabled, width, id, api, selectedValues, filterKey, anyValueIsAllowed, focus, showError
 * @returns {*}
 */
const fieldType = (type, name, label, value, endorment, placeholder, classes, input, radioButtons, styleClass, options, onButtonClick, isDisabled, width, id, api, selectedValues, filterKey, anyValueIsAllowed, focus, showError) => {
  switch (type) {
    case 'TextField':
      return TextFieldComponent(name, classes, endorment, placeholder, input, styleClass, isDisabled, width);
    case 'TextArea':
      return TextAreaComponent(name, classes, input, placeholder);
    case 'Radio':
      return RadioFieldComponent(name, label, classes, input, radioButtons, styleClass, value);
    case 'TimePicker':
      return TimeFieldComponent(name, value, classes, input);
    case 'DatePicker':
      return DateFieldComponent(name, value, classes, input);
    case 'Button':
      return ButtonFieldComponent(name, label, classes, input, styleClass, onButtonClick);
    case 'FormLabel':
      return FormLabelField(label, styleClass, input);
    case 'CheckBox':
      return FormCheckBoxField(name, label, styleClass, input, classes);
    case 'DropDown':
      return DropDownField(name, options, styleClass, input, classes);
    case 'DropDownSearch':
      return DropDownSearch(name, label, id, api, selectedValues, filterKey, anyValueIsAllowed, focus, showError);
  }
};


/**
 * dummy drop down function
 * @param name, label, api, selectedValues, filterKey, anyValueIsAllowed, focus, showError, styleClass, input, classes
 * @returns {*}
 * @constructor
 */
const DropDownSearch = (name, label, api, selectedValues, filterKey, anyValueIsAllowed, focus, showError, styleClass, input, classes) => {
  return (  <div>Hello world</div> );
};

/**
 * this is custom text field component function used in redux form
 * @param name, classes, endorment, placeholder, input, styleClass, isDisabled
 * @returns {*}
 * @constructor
 */
const TextFieldComponent = (name, classes, endorment, placeholder, input, styleClass, isDisabled) => {
  return (
    <Input
      name={name}
      type={styleClass.number ? 'number' : styleClass.password ? 'password' : 'text'}
      {...input}
      classes={{underline: classes.cssUnderline, focused: classes.cssFocused, input: classes.input}}
      value={input.value}
      autoComplete="off"
      disabled={isDisabled}
      multiline={styleClass.multiline ? true : false}
      margin="normal"
      placeholder={placeholder}
      className={styleClass.field1 ? styleClass.field : null}
      endAdornment={typeof endorment !== undefined ? <InputAdornment position="end">
        <CustomTag text={endorment} className={styleClass.endorment}/>
      </InputAdornment> : null}
      className="textfield"
    />
  )
};

/**
 * this is custom radio field component function used in redux form
 * @param name, label, classes, input, radioButtons, styleClass, value
 * @returns {*}
 * @constructor
 */
const RadioFieldComponent = (name, label, classes, input, radioButtons, styleClass, value) => {
  return (
    <FormControlLabel
      control={
        <RadioGroup
          value={value}
          name={name}
          aria-label="A"
          {...input}
          className={styleClass.field}
        >
          {
            radioButtons.map((radioItem) => {
              return (
                <FormControlLabel
                  classes={{label: classes.label}}
                  value={radioItem.value}
                  label={radioItem.label}
                  control={<Radio color="secondary"/>}
                  labelPlacement="end"
                />
              )
            })
          }
        </RadioGroup>
      }
    />
  )
}

/**
 * this is custom time picker field component function used in redux form
 * @param name, value, classes, input
 * @returns {*}
 * @constructor
 */
const TimeFieldComponent = (name, value, classes, input) => {
  if (input.name === 'time_from') {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <MuiThemeProvider theme={customTheme}>
          <TimePicker
            margin="normal"
            value={input.value === 'Invalid Date' ? new Date('2014-08-18T09:00:00') : input.value}
            onChange={(e) => input.onChange(e)}
            InputProps={{
              endAdornment: <InputAdornment position="end">
                <CustomIcon icon={clock} className="search-icon"/>
              </InputAdornment>,
            }}
            name={name}
          />
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    )
  }
  else if (input.name === 'time_to') {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <MuiThemeProvider theme={customTheme}>
          <TimePicker
            margin="normal"
            value={input.value === 'Invalid Date' ? new Date('2014-08-18T18:00:00') : input.value}
            onChange={(e) => input.onChange(e)}
            InputProps={{
              endAdornment: <InputAdornment position="end">
                <CustomIcon icon={clock} className="search-icon"/>
              </InputAdornment>,
            }}
            name={name}
          />
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    )
  }
  else {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <MuiThemeProvider theme={customTheme}>
          <TimePicker
            margin="normal"
            value={input.value === 'Invalid Date' ? null : input.value}
            onChange={(e) => input.onChange(e)}
            InputProps={{
              endAdornment: <InputAdornment position="end">
                <CustomIcon icon={clock} className="search-icon"/>
              </InputAdornment>,
            }}
            name={name}
          />
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    )
  }

};

/**
 * this is custom date picker field component function used in redux form
 * @param name,  value,  classes, input
 * @returns {*}
 * @constructor
 */
const DateFieldComponent = (name, value, classes, input) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <MuiThemeProvider theme={customTheme}>
        <DatePicker
          margin="normal"
          clearable={true}
          value={input.value === '' ? null : input.value}
          onChange={(e) => input.onChange(e)}
          name={name}
          InputProps={{
            endAdornment: <InputAdornment position="end">
              <CustomIcon icon={calendar} className="search-icon"/>
            </InputAdornment>,
          }}
        />
      </MuiThemeProvider>
    </MuiPickersUtilsProvider>
  )
};

/**
 * this is custom text area field component function used in redux form
 * @param name, classes, input, placeholder
 * @returns {*}
 * @constructor
 */
const TextAreaComponent = (name, classes, input, placeholder) => {
  return (
    <TextField
      margin="normal"
      variant="outlined"
      name={name}
      {...input}
      placeholder={placeholder}
      multiline={true}
    />
  )
};

/**
 * this is custom button field component function used in redux form
 * @param name, label, classes, input, styleClass, onButtonClick
 * @returns {*}
 * @constructor
 */
const ButtonFieldComponent = (name, label, classes, input, styleClass, onButtonClick) => {
  return (
    <Button className={styleClass.field}
            {...input}
            onClick={onButtonClick}
    >
      {label}
    </Button>
  )
};

/**
 * this is custom form label field component function used in redux form
 * @param label, styleClass, input
 * @returns {*}
 * @constructor
 */
const FormLabelField = (label, styleClass, input) => {
  return ( <FormLabel className={styleClass.field}> {label} </FormLabel> )
};

const FormCheckBoxField = (name, label, styleClass, input, classes) => {
  return (
    <FormControlLabel
      name={name}
      classes={{label: classes.label}}
      control={
        <Checkbox
          checked={input.value}
        />
      }
      {...input}
      label={label}
    />
  )
};

/**
 * this is custom drop down field component function used in redux form
 * @param name, options, styleClass, input, classes
 * @returns {*}
 * @constructor
 */
const DropDownField = (name, options, styleClass, input, classes) => {
    return(
        <Select
        classes={{root: classes.paddingTopZero}}
        name={name}
        IconComponent={props => (
            <i {...props} className={`material-icons ${props.className}`}>
              <img src={dropdown} />
            </i>
          )}
          {...input}
        >
        {
            options.map((emailItem) => {
                const value = emailItem.value || emailItem;
                const key = emailItem.key || emailItem;
                return <MenuItem value={key} >{value}</MenuItem>
            })
        }
        </Select>
    )
};

class CustomComponents extends Component {
     constructor(props){
        super(props)
     }

  /**
   * this function used to values for state variable on input changes
   * @param e
   * @param validatorAfterSave
   */
  handleInput = (e,validatorAfterSave=null) => {
        const { allFieldsStatus } = this.state;
        const {name} = e.target;
        allFieldsStatus[name] = true; //change the touch status of field
        this.setState({
            [name]: e.target.value,
            allFieldsStatus
        },()=>{
            if(validatorAfterSave){
                this.validateFields(name);
            }
        })
      };
  /**
   * depends upon fieldName this function calls validation function
   * @param fieldName
   */
  validateFields = fieldName => {
        switch(fieldName){
            
            case 'current_employer':
                this.validateCurrentEmployerForm();
            break;
        }
    };


  render() {
    const {label, classes, error, type, name, value, endorment, placeholder, input, radioButtons, styleClass, options, meta, onButtonClick, isDisabled, id, api, selectedValues, filterKey, anyValueIsAllowed, focus, showError} = this.props;
    return (
      <FormControl
        classes={classes.root}
        className={styleClass ? styleClass.root : null}
        style={{marginTop: '12px'}}
        error={!meta.active && meta.touched && meta.error}
      >
        {ignoreLabelFormFields.indexOf(type) == -1 ?
          <InputLabel htmlFor={name}
                      classes={{
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                        error: classes.cssError
                      }}
                      shrink={true}>
            {label}
          </InputLabel> :
          null
        }
        {fieldType(type, name, label, value, endorment, placeholder, classes, input, radioButtons, styleClass, options, onButtonClick, isDisabled, id, api, selectedValues, filterKey, anyValueIsAllowed, focus, showError)}
        {!meta.active && meta.touched && meta.error ? <FormHelperText>
          <span
            style={{color: '#f0582b', fontFamily: 'Roboto', fontWeight: '400', fontSize: '12px'}}>{meta.error}</span>
        </FormHelperText> : null}
      </FormControl>
    );
  }
};

CustomComponents.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomComponents);






