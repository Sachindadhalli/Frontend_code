//library dependencies
import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import {InputLabel, TextField, Paper, FormHelperText, MenuItem, Popper} from '@material-ui/core';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import {withStyles} from '@material-ui/core/styles';

//utilities
import {COUNTRY} from "../../../config/constants";

//custom components
import CheckboxMultiSelectDropdown from '../../components/MultiSelectDropdownWrapper/components/CheckboxMultiSelectDropdown'


const suggestions = [
  {label: 'Afghanistan'},
  {label: 'Aland Islands'},
  {label: 'Albania'},
  {label: 'Algeria'},
  {label: 'American Samoa'},
  {label: 'Andorra'},
  {label: 'Angola'},
  {label: 'Anguilla'},
  {label: 'Antarctica'},
  {label: 'Antigua and Barbuda'},
  {label: 'Argentina'},
  {label: 'Armenia'},
  {label: 'Aruba'},
  {label: 'Australia'},
  {label: 'Austria'},
  {label: 'Azerbaijan'},
  {label: 'Bahamas'},
  {label: 'Bahrain'},
  {label: 'Bangladesh'},
  {label: 'Barbados'},
  {label: 'Belarus'},
  {label: 'Belgium'},
  {label: 'Belize'},
  {label: 'Benin'},
  {label: 'Bermuda'},
  {label: 'Bhutan'},
  {label: 'Bolivia, Plurinational State of'},
  {label: 'Bonaire, Sint Eustatius and Saba'},
  {label: 'Bosnia and Herzegovina'},
  {label: 'Botswana'},
  {label: 'Bouvet Island'},
  {label: 'Brazil'},
  {label: 'British Indian Ocean Territory'},
  {label: 'Brunei Darussalam'},
];

function renderInputComponent(inputProps) {
  const {
    classes, inputRef = () => {
    }, ref, ...other
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
      {...other}
    />
  );
}

function renderSuggestion(suggestion, {query, isHighlighted}) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) =>
          part.highlight ? (
            <span key={String(index)} style={{fontWeight: 500}}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{fontWeight: 300}}>
              {part.text}
            </strong>
          ),
        )}
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
    : suggestions.filter(suggestion => {
      const keep =
        count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

      if (keep) {
        count += 1;
      }

      return keep;
    });
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
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
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
  cssLabel: {
    color: '#656565 !important',
    fontSize: '14px',
    fontFamily: 'Roboto',
    fontWeight: 400,
  },
  cssError: {
    color: '#656565 !important',
    fontSize: '14px',
    fontFamily: 'Roboto',
    fontWeight: 400,
  },
});

class AutoComplete extends React.Component {
  state = {
    single: '',
    popper: '',
    suggestions: [],
    selectedCheckList: [{key: 114, value: "Albania"}]
  };

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

  onMultiOptionsChange = (options) => {
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
      <div className={classes.root}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            label: 'Label',
            placeholder: 'With Popper',
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
            <Popper anchorEl={this.popperNode} open={Boolean(options.children)}>
              <Paper
                square
                {...options.containerProps}
                style={{width: this.popperNode ? this.popperNode.clientWidth : null}}
              >
                {options.children}
              </Paper>
            </Popper>
          )}
        />
        <div style={{width: '300px'}}>
          <InputLabel
            htmlFor="firstName"
            className="change-label-style"
            shrink={true}
            classes={{
              root: classes.cssLabel,
              error: classes.cssError
            }}
          >
            First Name
          </InputLabel>
          <CheckboxMultiSelectDropdown
            apiUrl={COUNTRY}
            defaultValue={[{key: 1, value: 'Hello'}, {key: 2, value: 'world'}]}
            queryParams={{search: ''}}
            onMultiOptionsChange={this.onMultiOptionsChange}
            numberDisplayed={2}
            error={''}
          />
          <FormHelperText id="firstName_error">
                  <span className="field_error">
                    {''}
                  </span>
          </FormHelperText>
        </div>
      </div>
    );
  }
}

AutoComplete.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AutoComplete);
