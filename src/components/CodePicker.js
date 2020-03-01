//library dependencies
import React from "react";
import PropTypes from "prop-types";
import deburr from "lodash/deburr";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import {InputAdornment, MenuItem, Paper, Popper, TextField} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import countryData from "country-telephone-data";
//style
import "../components/CountryCodePicker/country-picker.scss";
//icons
import flagImage from "../../assets/media/images/flags32.png";
import down from "../../assets/media/icons/down.svg";
//custom component
import CustomIcon from "../components/CustomIcon";

const allCountries = countryData.allCountries;
const getFlagStyle = (flagsImagePath = flagImage) => ({
  backgroundImage: `url(${flagsImagePath})`
});

const FlagIcon = ({inputFlagClasses}) => {
  return (
    <div className="flags">
      <div className={inputFlagClasses} style={getFlagStyle()}/>
    </div>)
};

FlagIcon.propTypes = {
  inputFlagClasses: PropTypes.string,
};

FlagIcon.defaultProps = {
  inputFlagClasses: '',
};

function renderInputComponent(inputProps) {
  const {
    classes, inputRef = () => {
    }, ref, value, ...other
  } = inputProps;
  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);

        },
        classes: {
          input: classes.input,
        },
      }}
      value={value}
      endAdornment={
        <InputAdornment position="end">
          <CustomIcon
            icon={down}/>
        </InputAdornment>
      }
      {...other}
    />
  );
}

function renderSuggestion(suggestion, {query, isHighlighted}) {
  const matches = match(`+${suggestion.dialCode}  ${suggestion.name}`, query);
  const parts = parse(`+${suggestion.dialCode}  ${suggestion.name}`, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div style={{width: 250, display: 'flex'}}>
        <div style={{textOverflow: 'ellipsis'}}>
          {parts.map((part, index) =>
            part.highlight ? (
              <span key={String(index)} style={{fontWeight: 500}}>
                                  {part.text}
                                </span>
            ) : (
              <React.Fragment>
                <strong key={String(index)} style={{fontWeight: 300}}>
                  {part.text}
                </strong>
              </React.Fragment>
            ),
          )}
        </div>
        <FlagIcon inputFlagClasses={`${suggestion.iso2}`}/>
      </div>
    </MenuItem>
  );
}

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : allCountries.filter(suggestion => {
      const str = `${suggestion.dialCode} ${suggestion.name}`;
      const keep =
        str.slice(0, inputLength).toLowerCase() === inputValue;
      if (keep) {
        count += 1;
      }

      return keep;
    });
}

function getSuggestionValue(suggestion) {
  return `+${suggestion.dialCode}`;
}

const styles = theme => ({
  root: {
    height: 250,
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
    overflow: 'scroll'
  },
  suggestion: {
    display: 'block',
    position: 'relative'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    position: 'relative'
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
  zIndex: {
    zIndex: theme.zIndex.modal + 200,
  }
});

class CodePicker extends React.Component {
  state = {
    single: '',
    popper: this.props.default,
    suggestions: [],
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.default) {
      if (this.state.popper !== nextProps.default) {
        this.setState({
          popper: nextProps.default
        })
      }
    }
  }

  handleSuggestionsFetchRequested = ({value}) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = name => (event, {newValue}) => {
    this.setState({
      [name]: newValue,
    });
  };

  render() {
    const {classes} = this.props;
    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion,
    };

    return (
      <Autosuggest
        {...autosuggestProps}
        inputProps={{
          classes,
          label: 'Code *',
          placeholder: 'Code',
          value: this.state.popper,
          onChange: this.handleChange('popper'),
          inputRef: node => {
            this.popperNode = node;
          },
          InputLabelProps: {
            shrink: true,
          },
        }}
        theme={{
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderSuggestionsContainer={options => (
          <Popper anchorEl={this.popperNode}
                  open={Boolean(options.children)} placeholder="bottom-start" className={classes.zIndex}>
            <Paper
              square
              {...options.containerProps}
              style={{}}
            >
              {options.children}
            </Paper>
          </Popper>
        )}
      />
    );
  }
}

CodePicker.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CodePicker);
