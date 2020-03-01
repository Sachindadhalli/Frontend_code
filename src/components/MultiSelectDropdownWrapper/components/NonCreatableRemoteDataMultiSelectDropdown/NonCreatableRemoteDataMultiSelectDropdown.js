//library dependencies
import React from 'react';
import Select, {components} from 'react-select';
import {makeStyles, useTheme, withStyles} from '@material-ui/core/styles';
import {emphasize} from '@material-ui/core/styles/colorManipulator';
import PropTypes from 'prop-types';
import {FormHelperText, MenuItem, Paper, TextField, NoSsr, Typography} from '@material-ui/core';

//style
import './style.scss';

//icon
import CustomSvgIcon from '../../../CustomSvgIcon';

//utilities
import keyToValue from '../../../../Utilities/ValueKeyConverstion';
import {apiCall, handleLocalStorage, debounce} from '../../../../Utilities';

//custom components
import ChipsForFields
  from '../../../../containers/EmployerHomePage/components/EmployerJobPage/components/SectorsRoles/ChipsForFields';

//customised the material select component
const useStyles = theme => ({
  root: { flexGrow: 1,},
  root1: { flexGrow: 1, },
  input: { display: 'flex', padding: 0,},
  valueContainer: { display: 'flex', flexWrap: 'wrap', flex: 1, alignItems: 'center', overflow: 'hidden',},
  chip: { margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,},
  chipFocused: {backgroundColor: emphasize( theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700], 0.08,),},
  noOptionsMessage: { padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,},

  placeholder: { left: 2, fontSize: 16,},
  paper: { position: 'absolute', zIndex: 1, marginTop: theme.spacing.unit, left: 0, right: 0,},
  singleValue:{color:'#212121', fontSize:'16px', fontFamily:'Roboto', fontWeight:'400', marginLeft: '2px', marginRight: '2px',
    maxWidth: 'calc(100% - 32px)', overflow: 'hidden', position: 'absolute', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
    top: '50%', transform: 'translateY(-50%)', boxSizing: 'border-box'},
  removeAllText:{fontFamily: 'Roboto', fontSize: '14px', textAlign:'right', width:'30%', color:'#e73a9e', marginTop:'8px',
    cursor:'pointer', marginBottom:'-6px',},
  errorStyleWithRemove:{ display:'flex' },
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
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
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
 * @function component, to show customised container of list
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
  DropdownIndicator,
  ClearIndicator,
  Placeholder,
  SingleValue,
  ValueContainer,
};

class NonCreatableRemoteDataMultiSelectDropdown extends React.Component {
  state = {
    inputValue: '',
    selectedOption: [],
    options: [],
    updatedSelectedValue: [],
    errorValue: '',
    showRemove: false,
  };

  /**
   * To get the data ,calling an api
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
        // return filtered;
      } catch (e) {
      }
    }
  };

  constructor(props) {
    super(props);
    this.promiseOptions = debounce(this.promiseOptions, 150)
  }

  componentDidMount() {
    let actionMetaData = {action: "select-value"};
    let values = this.props.defaultValue.map((item) => keyToValue(item));
    this.handleChange(values, actionMetaData);
    this.setState({
      updatedSelectedValue: this.props.defaultValue,
      selectedOption: this.props.defaultValue,
      showRemove: this.props.showRemove
    })
  }

  /**
   * on change in input of DropDown,calling a function to get the data
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
    if (selectedOption.length < (this.props.maxOptions + 1) || !this.props.maxOptions) {
      this.setState({
        selectedOption: selectedOption
      });
      if (this.props.hasOwnProperty('getSelectedOption')) {
        this.props.getSelectedOption(selectedOption)
      }
      this.props.gettingError({error: false})
    } else if (selectedOption.length == 0) {
      this.setState({
        selectedOption: []
      });
      this.props.getSelectedOption(selectedOption)
      this.props.gettingError({error: false})
    } else {
      this.props.gettingError({error: true})
    }
  };

  /**
   * handling on Focus event,calling function to get the data from an api
   * @param e
   */
  handleFocus = () => {
    this.promiseOptions('');
  };

  /**
   * To remove all the selected option
   */
  removeAllSelectedOption = () => {
    this.setState({
      selectedOption: []
    });
    this.props.getSelectedOption([]);
  };

  componentWillReceiveProps(nextProps) {
    //on change in the value,receiving props and updating the state
    let values = nextProps.defaultValue.map((item) => keyToValue(item))
    this.setState({
      updatedSelectedValue: nextProps.defaultValue,
      errorValue: nextProps.error,
      maxSelected: nextProps.maxOptions,
      selectedOption: values
    })
  }

  /**
   * @function used to remove selected option
   * @param item
   */
  removeElementFromState = (item) => {
    const {selectedOption} = this.state;
    const {updatedSelectedValue} = this.state;
    let optionIndex = selectedOption.findIndex(opt => opt.value == item.key);
    if (optionIndex > -1) {
      selectedOption.splice(optionIndex, 1)
    }
    let updatedOptionIndex = updatedSelectedValue.findIndex((option) => option.key == item.key);
    if (updatedOptionIndex > -1) {
      updatedSelectedValue.splice(updatedOptionIndex, 1)
    }
    let actionMetaData = {action: "remove-value"};
    this.handleChange(selectedOption, actionMetaData)
  };

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
    const {selectedOption, errorValue} = this.state;
    return (
      <div className={classes.root}>
        <NoSsr>
          <Select
            classes={classes}
            styles={selectStyles}
            defaultValue={this.props.hasOwnProperty('defaultValue') ? this.props.defaultValue : ''}
            value={selectedOption}
            isMulti={true}
            components={customComponents}
            clearValue={this.onClearValue}
            options={this.state.options}
            showRemove={this.props.showRemove}
            isDisabled={this.props.hasOwnProperty('isDisabled') ? this.props.isDisabled : false}
            isSearchable={this.props.hasOwnProperty('isSearchable') ? this.props.isSearchable : false}
            onInputChange={this.handleInputChange}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            placeholder={this.props.hasOwnProperty('placeholder') ? this.props.placeholder : ''}
            className="non-creatable-single-select-dropdown-styles"
            errorProps={{
              error: this.props.hasOwnProperty('error') && this.props.error ? this.props.error : false
            }}
            controlShouldRenderValue={false}
            theme={theme => ({
              ...theme, borderRadius: 0, colors: {
                ...theme.colors, primary: '#f1f1f1', neutral0: '#212121',
                primary25: '#f1f1f1', primary50: '#f1f1f1',
              },
            })}
          />
          <div className={classes.errorStyleWithRemove}>
            <div style={{width: '70%'}}>  {errorValue ? <FormHelperText error={errorValue}>
                <span className="field_error">
                  {errorValue}
                </span>
            </FormHelperText> : null}</div>
            {this.state.showRemove ?
              <div className={classes.removeAllText} onClick={this.removeAllSelectedOption}>Remove all</div> : null}
          </div>
          <ChipsForFields
            values={this.state.updatedSelectedValue}
            isItEditMode={this.props.editable}
            onDelete={(item, key) => {
              this.removeElementFromState(item, key)
            }}
          />
        </NoSsr>
      </div>
    )
  }
}

NonCreatableRemoteDataMultiSelectDropdown.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(useStyles, {withTheme: true})(NonCreatableRemoteDataMultiSelectDropdown);
