//library dependencies
import React from 'react';
import {components} from 'react-select';
import CreatableSelect from "react-select/lib/Creatable";
import {makeStyles, useTheme, withStyles} from '@material-ui/core/styles';
import {Typography, NoSsr, TextField, Paper, MenuItem} from '@material-ui/core';
import {emphasize} from '@material-ui/core/styles/colorManipulator';
import PropTypes from 'prop-types';

//style
import './style.scss'

//icons
import CustomSvgIcon from '../../../CustomSvgIcon';

//utilities
import {apiCall, handleLocalStorage, debounce} from '../../../../Utilities';

const useStyles = theme => ({
  root: {flexGrow: 1,},
  root1: {flexGrow: 1,},
  input: {display: 'flex', padding: 0,},
  valueContainer: {display: 'flex', flexWrap: 'wrap', flex: 1, alignItems: 'center', overflow: 'hidden',},
  chip: {margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,},
  chipFocused: {margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,},
  chipFocused: {
    backgroundColor: emphasize(theme.palette.type === 'light' ? theme.palette.grey[300]
      : theme.palette.grey[700], 0.08,),
  },
  noOptionsMessage: {padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,},

  placeholder: {left: 2, fontSize: 16,},
  paper: {position: 'absolute', zIndex: 1, marginTop: theme.spacing.unit, left: 0, right: 0,},
  singleValue: {
    color: '#212121', fontSize: '16px', fontFamily: 'Roboto', fontWeight: '400',
    marginLeft: '2px', marginRight: '2px', maxWidth: 'calc(100% - 32px)', overflow: 'hidden', position: 'absolute',
    textOverflow: 'ellipsis', whiteSpace: 'nowrap', top: '50%', transform: 'translateY(-50%)', boxSizing: 'border-box'
  }
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
 * defining the propTypes to NoOptionsMessage component
 * @type {{children: shim, innerProps: shim, selectProps: *}}
 */
NoOptionsMessage.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired,
};

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
 * defining the propTypes to inputComponent component
 * @type {{children: shim, innerProps: shim, selectProps: *}}
 */
inputComponent.propTypes = {
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

/**
 * @function to show customised textField
 * @param props
 * @returns {*}
 * @constructor
 */
function Control(props) {
  return (
    <TextField
      error={props.selectProps.errorProps.error}
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
      {...props.selectProps.TextFieldProps}
    />
  );
}

/**
 * defining the propTypes to Control component
 * @type {{children: shim, innerProps: shim, innerRef, selectProps: *}}
 */
Control.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  selectProps: PropTypes.object.isRequired,
};

/**
 * @function component ,to show customised List of Options
 * @param props
 * @returns {*}
 * @constructor
 */
function Option(props) {
  return (
    <MenuItem
      ref={props.innerRef}
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
 * defining the propTypes to Option component
 * @type {{children: shim, innerProps: shim, innerRef, isFocused: shim, isSelected: shim}}
 */
Option.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  isFocused: PropTypes.bool,
  isSelected: PropTypes.bool,
};

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
 * defining the propTypes to Placeholder component
 * @type {{children: shim, innerProps: shim, selectProps: *}}
 */
Placeholder.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired,
};

/**
 * @function component, to show customised selected option
 * @param props
 * @returns {*}
 * @constructor
 */
function SingleValue(props) {
  return (
    <div className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </div>
  );
}

/**
 * defining the propTypes to SingleValue component
 * @type {{children: shim, innerProps: shim, selectProps: *}}
 */
SingleValue.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired,
};

/**
 * @function component, to show customised container= of list
 * @param props
 * @returns {*}
 * @constructor
 */
function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

/**
 * defining the propTypes to ValueContainer component
 * @type {{children: shim, selectProps: *}}
 */
ValueContainer.propTypes = {
  children: PropTypes.node,
  selectProps: PropTypes.object.isRequired,
};

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
 * defining the propTypes to Menu component
 * @type {{children: shim, innerProps: shim, selectProps: shim}}
 */
Menu.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object,
};

/**
 * @function component, to show customised Drop down indicator
 * @param props
 * @returns {*}
 * @constructor
 */
const DropdownIndicator = (
  props: ElementConfig<typeof components.DropdownIndicator>
) => {
  return (
    <components.DropdownIndicator {...props}>
      <CustomSvgIcon icon={'dropdown-icon'} height="7.8px" width="14px" color="#B1B1B1"/>
    </components.DropdownIndicator>
  );
};

/**
 * @function to clear the text
 * @returns {string}
 * @constructor
 */
const CustomClearText = () => '';

/**
 * @function component, to customised the indicator in drop down
 * @param props
 * @returns {*}
 * @constructor
 */
const ClearIndicator = (props: ElementConfig<typeof components.ClearIndicator>) => {
  const {
    children = <CustomClearText/>,
    getStyles,
    innerProps: {ref, ...restInnerProps},
  } = props;
  return (
    <div
      {...restInnerProps}
      ref={ref}
      style={getStyles('clearIndicator', props)}
    >
      <div style={{padding: '0px 5px'}}>{children}</div>
    </div>
  );
};

/**
 * @constant assign all custom components to a customComponents
 * @type {{Control: function(*): *, Menu: function(*): *, NoOptionsMessage: function(*): *, DropdownIndicator: function(ElementConfig<components.DropdownIndicator>): *, ClearIndicator: function(ElementConfig<components.ClearIndicator>): *, Placeholder: function(*): *, SingleValue: function(*): *, ValueContainer: function(*): *}}
 */
const customComponents = {
  Control,
  Menu,
  NoOptionsMessage,
  Placeholder,
  ClearIndicator,
  SingleValue,
  ValueContainer,
  DropdownIndicator
};

class CreatableRemoteDataSingleSelectDropdown extends React.Component {
  state = {
    inputValue: '',
    selectedOption: this.props.hasOwnProperty('defaultValue') ? this.props.defaultValue : '',
    options: []
  };
  select: ElementRef<*>;

  /**
   * To get the data from an api
   * @param inputValue
   * @returns {Promise<void>}
   */
  promiseOptions = async (inputValue) => {
    if (this.props.hasOwnProperty('apiUrl')) {
      const headers = {
        authorization: handleLocalStorage('get', 'employerLogin'),
        'Content-Type': 'application/json',
      };
      try {
        const queryParams = this.props.queryParams;
        queryParams.search = inputValue;
        const responseData = await apiCall('get', queryParams, this.props.apiUrl, headers);
        let suggestions = responseData.data.map(suggestion => ({
          value: suggestion.key,
          label: suggestion.value,
        }));
        const filtered = suggestions.filter((s) => s.label.toLowerCase().includes(inputValue.toLowerCase()));
        this.setState({inputValue, options: filtered});
      } catch (e) {
      }
    } else {
      try {
        const options = this.props.options ? this.props.options.map(suggestion => ({
          value: suggestion.key,
          label: suggestion.value,
        })) : [];
        const filtered = options.filter((s) => s.label.toLowerCase().includes(inputValue.toLowerCase()));
        this.setState({inputValue, options: filtered});
      } catch (e) {
      }
    }
  };

  constructor(props) {
    super(props);
    this.promiseOptions = debounce(this.promiseOptions, 150)
  }

  /**
   * on change in input of DropDown ,updating state
   * @param inputValue
   * @returns {*}
   */
  handleInputChange = (inputValue) => {
    this.promiseOptions(inputValue);
    return inputValue;
  };

  /**
   * on change in selected value,updating state
   * @param selectedOption
   * @param action
   */
  handleChange = (selectedOption, {action}) => {
    this.setState({
      selectedOption: selectedOption
    });
    if (this.props.hasOwnProperty('getSelectedOption')) {
      this.props.getSelectedOption(selectedOption);
    }
  };

  /**
   * handling on focus event,updating state with selected value
   * @param e
   */
  handleFocus = element => {
    this.promiseOptions('');
    if (this.state.selectedOption) {
      this.select.state.inputValue = this.state.selectedOption.label;
    }
  };

  /**
   * on close of the menu
   */
  handleMenuClose = () => {
    this.select.blur();
  };

  componentWillReceiveProps(nextProps) {
    //after rendering change in the value,receiving props
    this.setState({
      selectedOption: nextProps.hasOwnProperty('defaultValue') ? nextProps.defaultValue : ''
    })
  }

  render() {
    const {classes, theme} = this.props;
    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };
    const {selectedOption} = this.state;
    return (
      <div className={classes.root}>
        <NoSsr>
          <CreatableSelect
            ref={ref => {
              this.select = ref;
            }}
            classes={classes}
            styles={selectStyles}
            blurInputOnSelect={true}
            isMulti={false}
            defaultValue={this.props.hasOwnProperty('defaultValue') ? this.props.defaultValue : ''}
            value={selectedOption}
            options={this.state.options}
            components={customComponents}
            isClearable={this.props.hasOwnProperty('isClearable') ? this.props.isClearable : false}
            isDisabled={this.props.hasOwnProperty('isDisabled') ? this.props.isDisabled : false}
            isSearchable={this.props.hasOwnProperty('isSearchable') ? this.props.isSearchable : false}
            onInputChange={this.handleInputChange}
            onChange={this.handleChange}
            onMenuClose={this.handleMenuClose}
            onFocus={this.handleFocus}
            placeholder={this.props.hasOwnProperty('placeholder') ? this.props.placeholder : ''}
            className="non-creatable-single-select-dropdown-styles"
            errorProps={{
              error: this.props.hasOwnProperty('error') && this.props.error ? this.props.error : false
            }}
            theme={theme => ({
              ...theme, borderRadius: 0, colors: {
                ...theme.colors, primary: '#f1f1f1', neutral0: '#212121',
                primary25: '#f1f1f1', primary50: '#f1f1f1',
              },
            })}
          />
        </NoSsr>
      </div>
    )
  }
}

CreatableRemoteDataSingleSelectDropdown.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(useStyles, {withTheme: true})(CreatableRemoteDataSingleSelectDropdown);
