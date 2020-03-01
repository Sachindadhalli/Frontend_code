//library dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles,InputLabel,Input,InputAdornment,FormControl,FormHelperText} from '@material-ui/core';

// style
import './style.scss';
import customisedMaterial from '../../styles/customisedMaterial';

//icon
import add_skill from '../../../assets/media/icons/add-skill.svg';
import down from '../../../assets/media/icons/down.svg';

//custom component
import CustomIcon from '../CustomIcon';

//utilities
import { SearchService } from '../../api/SearchService';

const styles = theme => ({
  root: { display: 'flex', flexWrap: 'wrap', marginTop: 0, },
  margin: {},
  greenLabel: {  color: '#0f0',},
  cssLabel: { color: '#656565 !important',fontSize: '14px', fontFamily: 'Roboto', fontWeight: 400, },
  greenUnderline: { '&:after': {  backgroundColor: '#0f0',}, },
  greenInkbar: { '&:after': {  backgroundColor: '#0f0', }, },
  helperText: {  color: '#656565',fontSize: '14px', fontFamily: 'Roboto', fontWeight: 'normal',fontStyle: 'normal',
  fontStretch: 'normal',lineHeight: 'normal', letterSpacing: 'normal', },
  withoutLabel: {  marginTop: theme.spacing.unit * 3,},
  textField: {   flexBasis: 70, },
  input: {   display: 'none'  },

  padding: {},
  ...customisedMaterial,
  cssError: { color: '#656565 !important', fontSize: '14px',fontFamily: 'Roboto', fontWeight: 400, },
});

class DropDown extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      list: props.list || [],
    };
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  componentWillMount() {
    this.setState({
      list: this.props.list || [],
    });
  }

  componentDidMount() {
    this.setState({
      list: this.props.list || [],
    });
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillReceiveProps(nextProps) {
    try {
      if (nextProps && nextProps.hasOwnProperty('list') && nextProps.list.length > 0) {
        this.setState({  list: nextProps.list, });
      }
    } catch (e) { }
  }

  componentWillUnmount() { document.removeEventListener('mousedown', this.handleClickOutside); }

  setWrapperRef(node) { this.wrapperRef = node; }
  
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      let focus = false;
      let res = '';
      if (event.target.tagName) {
        res = event.target.tagName.toLowerCase();
        if (event.target.tagName === 'INPUT') {  focus = true;}
         else { focus = false; }
      }
      if (this.props.anyValueIsAllowed) this.props.onClose(this.props.name, null, focus);
      else this.props.onClose(this.props.name, this.props.selectedValues[0], focus);
      document.removeEventListener('mousedown', this.handleClickOutside);
    }
  }

  render() {
    const { list } = this.state;
    const { width, filterKey, selectedValues } = this.props;
    return (
      <React.Fragment>
        {list && list.length > 0 ? (
          <ul className="autocomplete-card" style={{ width: '100%' }} ref={this.setWrapperRef}>
            {list.map((listItem, key) => (
              <li
                className={
                  selectedValues.filter(
                    selected => listItem && selected && listItem[filterKey] === selected[filterKey],
                  ).length > 0
                    ? 'autocomplete-row selected'
                    : 'autocomplete-row'
                }
                key={key}
                onClick={e => {
                  this.handleItemClick(e, listItem);
                }}
              >
                <div>{listItem[filterKey]}</div>
              </li>
            ))}
          </ul>
        ) : null}
      </React.Fragment>
    );
  }

  handleItemClick(e, data) {
    this.props.onClose(this.props.name, data);
  }
}

class AutoCompleteNew extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      list: props.defaultValues || [],
      listCpy: props.defaultValues || [],
      selected: '',
      focused: false,
      showError: props.showError,
    };
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.onDropClicked = this.onDropClicked.bind(this);
    this.searchService = new SearchService();
  }

  componentWillReceiveProps(nextProps) {
    try {
      if (nextProps && nextProps.defaultValues) {
        if (this.state.list && this.state.list.length !== nextProps.defaultValues) {
          this.setState({
            listCpy: nextProps.defaultValues,
          });
        }
        if (nextProps.selectedValues && nextProps.selectedValues.length > 0) {
          this.setState({ selected: nextProps.selectedValues[0][this.props.filterKey], });
        }
      }
    } 
    catch (exc) { }
    this.setState({ showError: nextProps.showError, });
  }
 onDropClicked() {
    if (this.props.icon === 'add') {
      this.setState({ listCpy: this.props.defaultValues, });
    }
  }

  handleQueryChange(e) {
    if (this.props.apiUrl !== '') {
      if (e.target && e.target !== null) {
        this.searchService.search({
          url: this.props.apiUrl,
          term: e.target.value,
          method: this.props.method,
          otherData: {
            ...this.props.otherData,
            queryKey: this.props.queryWith,
          },
        });
      }
    } else if (e.target && e.target !== null) {
      const suggestions = [...this.state.list].filter((listItem, key) =>
        listItem[this.props.filterKey].toLowerCase().includes(e.target.value.toLowerCase().trim()),
      );
      this.setState({ listCpy: suggestions, });
    }
    this.setState({  selected: e.target.value, showError: '', });
  }

  componentDidMount() {
    if (this.props.apiUrl !== '') {
      this.searchService.getResults().subscribe(res => {
        try {  this.setState({ listCpy: res.data.data, }, () => { }, ); } 
        catch (e) { }
      });
    }
    this.setState({
      selected:
        this.props.selectedValues && this.props.selectedValues[0]
          ? this.props.selectedValues[0][this.props.filterKey]
          : '',
    });
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  
  onDropDownKeyDown = e => {
    if (e.key.toLowerCase() === 'tab') { this.setState({ focused: false });}
  };

  dropDownVisibility = () => {
    if (this.props.apiUrl != '') {
      this.searchService.search({
        term: '',
        url: this.props.apiUrl,
        method: this.props.method,
        otherData: {
          ...this.props.otherData,
          queryKey: this.props.queryWith,
        },
      });
    }
    this.setState({ focused: !this.state.focused });
  };

  onBlurVisibility = () => {
    this.setState({ focused: false });
  };

  render() {
    const { label, icon, width, filterKey, selectedValues, classes, hintMessage } = this.props;
    const { list, selected, focused, listCpy } = this.state;
    return (
      <div className="drop-down" style={{ width: `${width}` }}>
        <FormControl
          style={{ width: '100%', marginTop: 0 }}
          classes={{ root: classes.root }}
          error={this.state.showError !== ''}
        >
          <InputLabel
            htmlFor="code"
            style={{ marginTop: 0 }}
            className="change-label-style"
            shrink={true}
            classes={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
              error: classes.cssError,
            }}
          >
            {label}
          </InputLabel>
          <Input
            id="code"
            error={false}
            type="text"
            autoFocus={false}
            autoComplete="off"
            value={selected}
            onChange={e => {
              this.handleQueryChange(e);
            }}
            classes={{
              underline: classes.cssUnderline,
              focused: classes.cssFocused,
            }}
            onClick={this.dropDownVisibility}
            onKeyDown={this.onDropDownKeyDown}
            endAdornment={
              <InputAdornment position="end" onClick={e => this.onDropClicked(e)}>
                {this.props.icon == 'add' ? (
                  <CustomIcon icon={add_skill} className="down-icon" />
                ) : (
                  <CustomIcon icon={down} className="down-icon" />
                )}
              </InputAdornment>
            }
          />
          {this.state.showError !== '' ? (
            <FormHelperText error={this.state.showError !== ''} id="firstName_error">
              <span className="field_error">
                {this.state.showError}
              </span>
            </FormHelperText>
          ) : null}
        </FormControl>
        {focused ? (
          <DropDown
            {...this.props}
            list={listCpy}
            onClose={(name, data, focus) => {
              this.setState(
                {
                  focused: focus,
                  selected: data == null ? this.state.selected : data[this.props.filterKey],
                  showError: '',
                },
                () => {
                  this.props.onClose(name, data == null ? this.state.selected : data);
                },
              );
            }}
          />
        ) : null}
      </div>
    );
  }
}

AutoCompleteNew.defaultProps = {
  label: 'Label',
  method: 'get',
  queryWith: 'key',
  width: '',
  filterKey: 'key',
  selectedValues: [],
  name: '',
  apiUrl: '',
  defaultValues: [],
};

AutoCompleteNew.propTypes = {
  apiUrl: PropTypes.any,
  defaultValues: PropTypes.any,
  filterKey: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  otherData: PropTypes.any,
  queryWith: PropTypes.string.isRequired,
  selectedValues: PropTypes.any.isRequired,
  width: PropTypes.any,
};

export default withStyles(styles)(AutoCompleteNew);
