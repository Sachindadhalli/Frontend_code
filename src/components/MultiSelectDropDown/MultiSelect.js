//library dependencies
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import {emphasize} from '@material-ui/core/styles/colorManipulator';
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable';
import {Input, InputLabel, Chip, Paper, TextField, NoSsr, Typography, MenuItem} from '@material-ui/core';

//styles
import classNames from 'classnames';
import './styles.scss';

//utilities
import {apiCall, handleLocalStorage} from '../../Utilities'

const styles = theme => ({
  root: {flexGrow: 1,},
  root1: {flexGrow: 1,},
  input: {display: 'flex', padding: 0,},
  valueContainer: {display: 'flex', flexWrap: 'wrap', flex: 1, alignItems: 'center', overflow: 'hidden',},
  chip: {margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,},
  chipFocused: {backgroundColor: emphasize(theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700], 0.08,),},
  noOptionsMessage: {padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,},

  placeholder: {left: 2, fontSize: 16,},
  paper: {position: 'absolute', zIndex: 1, marginTop: theme.spacing.unit, left: 0, right: 0,},
});

/**
 *
 * @function to show customised no option message
 * @param props
 * @returns {*}
 * @constructor
 */
function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}
/**
 * @function to create input reference
 * @param inputRef
 * @param props
 * @returns {*}
 */
function inputComponent({inputRef, ...props}) {
  return <div ref={inputRef} {...props} />;
}

/**
 * @function to show customised textField
 * @param props
 * @returns {*}
 * @constructor
 */
function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}
/**
 * @function component ,to show customised List of Options
 * @param props
 * @returns {*}
 * @constructor
 */
function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

/**
 * @function component, to show customised Placeholder
 * @param props
 * @returns {*}
 * @constructor
 */
function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

/**
 * @function component, to show customised container of list
 * @param props
 * @returns {*}
 * @constructor
 */
function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

/**
 * @function component, to show customised multiple selected option list
 * @param props
 * @returns {*}
 * @constructor
 */
function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

/**
 * @function component,to show customised menu items
 * @param props
 * @returns {*}
 * @constructor
 */
function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

/**
 * @constant assign all custom components to a customComponents
 * @type {{Control: function(*): *, Menu: function(*): *, NoOptionsMessage: function(*): *, DropdownIndicator: function(ElementConfig<components.DropdownIndicator>): *, ClearIndicator: function(ElementConfig<components.ClearIndicator>): *, Placeholder: function(*): *, SingleValue: function(*): *, ValueContainer: function(*): *}}
 */
const components = {
  Control,
  MultiValue,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  ValueContainer,
};

class MultiSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      multi: null,
      multi1: null,
      input: '',
      suggestions: [],
      city: '',
      data: [],
      nonApiDropDownData: [],
    };
  }

  handleInputChange = input =>
    this.state.suggestions.filter(i => i.label.toLowerCase().includes(input.toLowerCase()));

  state = {input: ''};
  /**
   * To get the  data from an api
   * @param inputValue
   * @returns {Promise<*>}
   */
  promiseOptions = async inputValue => {
    if (inputValue) {
      new Promise(resolve => {
        setTimeout(() => {
          resolve(this.handleInputChange(inputValue));
        }, 1000);
      });
      const headers = {
        authorization: handleLocalStorage('get', 'employerLogin'),
        'Content-Type': 'application/json',
      };
      const dataToBeSend = {};
      dataToBeSend.search = '';
      dataToBeSend.state = '';
      dataToBeSend.country = '';

      try {
        const responseData = await apiCall('get', dataToBeSend, inputValue, headers);
        const suggestions = responseData.data.map(suggestion => ({
          type: suggestion.type,
          key: suggestion.key,
          label: suggestion.value,
        }));
        this.setState({
          suggestions,
        });
        return this.state.suggestions;
      } catch (e) {
      }
      try {
        const responseData = await apiCall('get', dataToBeSend, inputValue, headers);
        this.setState({
          city: responseData.data.value,
        });
        return this.state.city;
      } catch (e) {
      }
      try {
        const responseData = await apiCall('get', dataToBeSend, inputValue, headers);
        this.setState({
          data: responseData.data.value,
        });
        return this.state.data;
      } catch (e) {
      }
    } else {
      try {
        this.setState({
          data: this.props.nonApiDropDownData,
        });
        return this.state.data;
      } catch (e) {
      }
    }
  };

  render() {
    const {classes, theme, apiUrl, fieldWidth, label, placeholder} = this.props;
    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };
    return (
      <div className="multi-select-main-container">
        <div className={classes.root} style={{width: fieldWidth}}>
          <NoSsr>
            <div className={classes.divider}/>
            <InputLabel className="input-lable" htmlFor="select-multiple">{this.props.label}</InputLabel>
            <AsyncCreatableSelect
              id="code"
              isMulti
              cacheOptions
              defaultOptions
              placeholder={null}
              loadOptions={() => this.promiseOptions(apiUrl)}
              classes={classes}
              styles={selectStyles}
              input={<Input id="select-multiple"/>}
              onInputChange={this.handleChange}
              className=""
            />
          </NoSsr>
        </div>
      </div>
    );
  }
}

MultiSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(MultiSelect);
