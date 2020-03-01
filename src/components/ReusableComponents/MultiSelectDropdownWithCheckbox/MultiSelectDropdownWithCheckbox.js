//library dependencies
import React from 'react';
import { components } from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';
import { makeStyles, useTheme,withStyles, Typography, TextField, Paper } from '@material-ui/core';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import PropTypes from 'prop-types';

//style
import './styles.scss';

//icons
import CustomSvgIcon from '../../CustomSvgIcon';

const useStyles = theme => ({
  root: { flexGrow: 1, },
  root1: { flexGrow: 1, },
  input: { display: 'flex', padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },

  placeholder: {
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  singleValue:{
    color:'#212121',
    fontSize:'16px',
    fontFamily:'Roboto',
    fontWeight:'400',
    marginLeft: '2px',
    marginRight: '2px',
    maxWidth: 'calc(100% - 32px)',
    overflow: 'hidden',
    position: 'absolute',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    top: '50%',
    transform: 'translateY(-50%)',
    boxSizing: 'border-box'
  }
});

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

NoOptionsMessage.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired,
};

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

inputComponent.propTypes = {
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

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

Control.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  selectProps: PropTypes.object.isRequired,
};

// function Option(props) {
//   return (
//     <MenuItem
//       ref={props.innerRef}
//       selected={props.isFocused}
//       component="div"
//       style={{
//         fontWeight: props.isSelected ? 500 : 400,
//       }}
//       {...props.innerProps}
//     >
//       {props.children}
//     </MenuItem>
//   );
// }
//
// Option.propTypes = {
//   children: PropTypes.node,
//   innerProps: PropTypes.object,
//   innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
//   isFocused: PropTypes.bool,
//   isSelected: PropTypes.bool,
// };

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

Placeholder.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired,
};

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

SingleValue.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired,
};
//
// function ValueContainer(props) {
//   return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
// }
//
// ValueContainer.propTypes = {
//   children: PropTypes.node,
//   selectProps: PropTypes.object.isRequired,
// };

const Input = props => {
    return <components.Input {...props} />;
};

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

Menu.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object,
};

const DropdownIndicator = (
  props: ElementConfig<typeof components.DropdownIndicator>
) => {
  return (
    <components.DropdownIndicator {...props}>
      <CustomSvgIcon icon={'dropdown-icon'} height="7.8px" width="14px" color="#B1B1B1"/>
    </components.DropdownIndicator>
  );
};

const CustomClearText = () => '';
const ClearIndicator = (props:ElementConfig<typeof components.ClearIndicator>) => {
  const {
    children = <CustomClearText />,
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div
      {...restInnerProps}
      ref={ref}
      style={getStyles('clearIndicator', props)}
    >
      <div style={{ padding: '0px 5px' }}>{children}</div>
    </div>
  );
};


const Option = props => {
  return (
    <div>
      <components.Option
        {...props}
        searchBar={true}
        className={props.selectProps.classes.options}
      >
        <div style={{display:"flex"}}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
            width={20}
            height={20}
            style={{width:"20px",height:"20px"}}
          />
          <div style={{width:"10px"}}> </div>
          <label>{props.label}</label></div>
      </components.Option>
    </div>
  );
};

const allOption = {
  label: "Select all",
  value: "*"
};

const ValueContainer = ({ children, ...props }) => {
  const currentValues = props.getValue();
  let toBeRendered = children;
  let result = "",count = 0
  if (currentValues.some(val => val.value === allOption.value)) {
    toBeRendered = [[children[0][0]], children[1]];
  }
  currentValues.map((value,index)=>{
    result = result+value+", "
    count++
  })
  return (
    <components.ValueContainer {...props}>
      {toBeRendered}
    </components.ValueContainer>
  );
};

const customComponents = {
  Control,
  Input,
  NoOptionsMessage,
  Option,
  Placeholder,
  ClearIndicator,
  ValueContainer,
  DropdownIndicator
};

class MultiSelectDropdownWithCheckbox extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      optionSelected: null
    };
  }

  handleChange = selected => {
    this.setState({
      optionSelected: selected
    });
  };

  render() {
    const { classes, theme} = this.props;
    return (
      <div >
        <CreatableSelect
          classes={classes}
          options={[
            { value: "ocean1", label: "Ocean", color: "#00B8D9" },
            { value: "blue", label: "Blue", color: "#0052CC" },
            { value: "purple", label: "Purple", color: "#5243AA" },
            { value: "red", label: "Red", color: "#FF5630" },
            { value: "orange", label: "Orange", color: "#FF8B00" },
            { value: "yellow", label: "Yellow", color: "#FFC400" },
            { value: "green", label: "Green", color: "#36B37E" },
            { value: "forest", label: "Forest", color: "#00875A" },
            { value: "slate", label: "Slate", color: "#253858" },
            { value: "silver", label: "Silver", color: "#666666" }
          ]}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={customComponents}
          onChange={this.handleChange}
          allowSelectAll={true}
          value={this.state.optionSelected}
          errorProps={{error:false}}
          searchBar={true}
          isSearchable={false}
        />
      </div>
    )
  }
}

export default withStyles(useStyles, { withTheme: true })(MultiSelectDropdownWithCheckbox);


