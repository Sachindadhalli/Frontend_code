//library dependencies
import React from 'react';
import countryData from 'country-telephone-data';
import { Input, InputLabel, InputAdornment, FormControl, FormHelperText } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//style
import './country-picker.scss';

//icons
import down from '../../../assets/media/icons/down.svg';
import flagImage from '../../../assets/media/images/flags32.png';

//custom components
import CustomIcon from '../CustomIcon';
import { SearchService } from '../../api/SearchService';
import customisedMaterial from '../../styles/customisedMaterial';

const { allCountries } = countryData;
const suggestions = allCountries.map(country => ({
  av: country.iso2,
  value: country.dialCode,
  label: `+${country.dialCode} ${country.name}`,
}));

const getFlagStyle = (flagsImagePath = flagImage) => ({
  backgroundImage: `url(${flagsImagePath})`,
});
const FlagIcon = ({ inputFlagClasses }) => (
  <div className="flags">
    <div className={inputFlagClasses} style={getFlagStyle()} />
  </div>
);

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 0,
  },
  margin: {},
  cssLabel: {
    color: '#656565 !important',
    fontSize: '14px',
    fontFamily: 'Roboto',
    fontWeight:400,
  },
  cssError: {
    color: '#656565 !important',
    fontSize: '14px',
    fontFamily: 'Roboto',
    fontWeight:400,
  },
  greenLabel: {
    color: '#0f0',
  },
  greenUnderline: {
    '&:after': {
      backgroundColor: '#0f0',
    },
  },
  greenInkbar: {
    '&:after': {
      backgroundColor: '#0f0',
    },
  },
  helperText: {
    color: '#656565',
    fontSize: '14px',
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flexBasis: 70,
  },
  input: {
    display: 'none',
  },
  padding: {},
  ...customisedMaterial,
});

class DropDown extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      suggestions,
      suggestionsCpy: suggestions,
    };
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.query && nextProps.query != null) {
      const suggestions = [...this.state.suggestions].filter((suggestion, key) =>
        suggestion.label.toLowerCase().includes(nextProps.query.toLowerCase()),
      );
      this.setState({
        suggestionsCpy: suggestions,
      });
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }
  
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.onClose(this.props.query, null);
      document.removeEventListener('mousedown', this.handleClickOutside);
    }
  }

  render() {
    const { suggestionsCpy } = this.state;
    const { width, filterKey, selectedValues } = this.props;
    return (
      <React.Fragment>
        {suggestionsCpy && suggestionsCpy.length > 0 ? (
          <ul
            className="autocomplete-card"
            style={{ width: '300px', maxHeight: 300 }}
            ref={this.setWrapperRef}
          >
            {suggestionsCpy.map((listItem, key) => (
              <li
                className="autocomplete-row"
                key={key}
                onClick={e => {
                  this.handleItemClick(e, `+${listItem.value}`);
                }}
              >
                <div className="flag_dropdown">
                  {listItem.label}
                  <FlagIcon inputFlagClasses={listItem.av} />
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </React.Fragment>
    );
  }

  handleItemClick(e, data) {
    this.props.onClose(data);
  }
}

class CountryCodePicker extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      list: [],
      selected: props.default,
      focused: false,
      showError: '',
      stopInputChange:false
    };
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.searchService = new SearchService();
  }

  handleQueryChange(e) {
    if (e.target && e.target !== null) {
      this.setState({
        selected: e.target.value,
        showError: '',
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.default) {
      if (this.state.selected !== nextProps.default) {
        this.setState({
          selected: nextProps.default,
        });
      }
    }
    if (nextProps && nextProps.showError) {
      if (this.state.showError !== nextProps.showError) {
        this.setState({
          showError: nextProps.showError,
        });
      }
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  render() {
    const { label, icon, width, filterKey, selectedValues, classes } = this.props;
    const { su, selected, focused } = this.state;
    return (
      <div className="country-drop-down" style={{ width: `${width}` }}>
        <FormControl
          style={{ width: '100%', marginTop: 0 }}
          classes={{ root: classes.root }}
          error={this.state.showError !== ''}
        >
          <InputLabel htmlFor="code" style={{ marginTop: 0 }}
                      shrink={true}
                      className="change-label-style"
                      classes={{
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                        error:classes.cssError
                      }}>
            Code
          </InputLabel>
          <Input
            id="code"
            type="text"
            autoFocus={false}
            style={{ marginTop: 0 }}
            onChange={this.handleQueryChange}
            autoComplete="off"
            value={selected}
            onFocus={() => {
              this.setState({
                focused: true,
              });
            }}
            disabled={this.props.disabled ? true : false}
            classes={{
              underline: classes.cssUnderline,
              focused: classes.cssFocused,
            }}
            endAdornment={
              <InputAdornment position="end" className="country-code-drop-icon">
                <CustomIcon icon={down} className="down-icon"  />
              </InputAdornment>
            }
          />
          <FormHelperText error={this.state.showError !== ''} id="showError">
            <span className="field_error">
              {this.state.showError}
            </span>
          </FormHelperText>
        </FormControl>
        {focused ? (
          <DropDown
            {...this.props}
            query={this.state.selected}
            onClose={data => {
              this.setState(
                {
                  focused: false,
                  selected: data == null ? this.state.selected : data,
                },
                () => {
                  this.props.onClose(data == null ? this.state.selected : data);
                },
              );
            }}
          />
        ) : null}
      </div>
    );
  }
}

CountryCodePicker.defaultProps = {
  label: 'Code',
  method: 'get',
  width: '',
  filterKey: 'key',
  selectedValues: [],
  name: '',
};

CountryCodePicker.propTypes = {
  apiUrl: PropTypes.any,
  filterKey: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  selectedValues: PropTypes.any.isRequired,
  width: PropTypes.any,
};

export default withStyles(styles)(CountryCodePicker);
