//library dependencies
import React from "react";
import PropTypes from "prop-types";
import {MenuItem, Paper, TextField, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import countryData from "country-telephone-data";
import Select, {components} from "react-select";
import {emphasize} from "@material-ui/core/styles/colorManipulator";
//style
import "../components/CountryCodePicker/country-picker.scss";
//custom component
import CustomIcon from "./CustomIcon";
//icons
import down from "../../assets/media/icons/down.svg";
import up from "../../assets/media/icons/down.svg";
import flagImage from "../../assets/media/images/flags32.png";

const allCountries = countryData.allCountries;
const suggestions = allCountries.map(country => ({
  av: country.iso2,
  value: country.dialCode,
  label: `+${country.dialCode} ${country.name}`
}));

const getFlagStyle = (flagsImagePath = flagImage) => ({
  backgroundImage: `url(${flagsImagePath})`
});
const FlagIcon = ({inputFlagClasses}) => {
  return (
    <div className="flags">
      <div className={inputFlagClasses} style={getFlagStyle()}/>
    </div>
  )
};

FlagIcon.propTypes = {
  inputFlagClasses: PropTypes.string,
};
FlagIcon.defaultProps = {
  inputFlagClasses: '',
};
//material theme customisations
const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  input: {
    display: 'flex',
    padding: 0,
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
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
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
  divider: {
    height: theme.spacing.unit * 2,
  },
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function inputComponent({inputRef, ...props}) {
  return <div ref={inputRef} {...props} />;
}

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
        }
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{fontWeight: props.isSelected ? 500 : 400}}
      {...props.innerProps}>
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const DropdownIndicator = props => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <CustomIcon icon={props.selectProps.menuIsOpen ? down : up}/>
      </components.DropdownIndicator>
    )
  );
};

const component = {
  Control,
  DropdownIndicator,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

class CountryDialCode extends React.Component {
  state = {
    single: null,
    multi: null,
  };

  handleChange = name => {
    this.setState({
      [name]: "91"
    }, () => {
    })
  };

  render() {
    const {classes, theme, single} = this.props;

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };

    return (<Select
      classes={classes}
      styles={selectStyles}
      placeholder=""
      InputLabelProps={{
        shrink: false
      }}
      options={suggestions}
      components={component}
      getOptionValue={(option) => option.av}
      value={this.state.single}
      onChange={this.handleChange("single")}
      isClearable={single}
    />)
  }
}

CountryDialCode.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, {withTheme: true})(CountryDialCode);
