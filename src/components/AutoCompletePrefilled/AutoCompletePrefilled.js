//library dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles,Input,InputAdornment,InputLabel,FormControl,FormHelperText } from '@material-ui/core';

//style
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
  root: { display: 'flex', flexWrap: 'wrap', marginTop: 0,},
  margin: {},
  label: { color: '#656565', },
  cssLabel: { color: '#656565 !important', fontSize: '14px', fontFamily: 'Roboto', fontWeight:400,},
  cssError: { color: '#656565 !important',fontSize: '14px',fontFamily: 'Roboto',fontWeight:400, },
  greenLabel: {  color: '#0f0', },
  greenUnderline: {
    '&:after': {   backgroundColor: '#0f0', },
  },
  greenInkbar: {
    '&:after': { backgroundColor: '#0f0',},
  },
  helperText: {  color: '#656565',  fontSize: '14px',  fontFamily: 'Roboto',  fontWeight: 'normal',  fontStyle: 'normal',  fontStretch: 'normal',
   lineHeight: 'normal', letterSpacing: 'normal', },
  withoutLabel: { marginTop: theme.spacing.unit * 3, },
  textField: { flexBasis: 70, },
  input: {  display: 'none',},
  padding: {},
  ...customisedMaterial,
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
    this.setState({ list: this.props.list || [], });
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.hasOwnProperty('list')) {
      this.setState({  list: nextProps.list, });
    }
  }

  componentWillUnmount() { document.removeEventListener('mousedown', this.handleClickOutside);}

  setWrapperRef(node) { this.wrapperRef = node; }
  
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.onClose(this.props.name, null);
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
                  selectedValues.filter(selected => listItem[filterKey] === selected[filterKey])
                    .length > 0
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

class AutoCompletePrefilled extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      list: props.defaultValues || [],
      listCpy: props.defaultValues || [],
      selected:
        props.selectedValues && props.selectedValues[0] && props.selectedValues[0].value
          ? props.selectedValues[0].value
          : '',
      focused: false,
      showError: '',
    };
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.searchService = new SearchService();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.defaultValues) {
      if (this.state.listCpy.length !== nextProps.defaultValues) {
        this.setState({
          listCpy: nextProps.defaultValues,
          list: nextProps.defaultValues,
        });
      }
      if (nextProps && nextProps.showError) {
        this.setState({ showError: nextProps.showError, });
      }
    }
  }

  handleQueryChange(e) {
    const { filterKey } = this.props;
    if (this.props.apiUrl != '') {
      if (e.target && e.target !== null) {
        this.searchService.search({
          url: this.props.apiUrl,
          term: e.target.value,
          method: this.props.method,
          otherData: this.props.otherData,
        });
        this.setState({
          selected: e.target.value,
          showError: '',
        });
      }
    } else if (e.target && e.target !== null) {
      const suggestions = [...this.state.list].filter((listItem, key) =>
        listItem[filterKey]
          .toString()
          .toLowerCase()
          .includes(e.target.value.toLowerCase().trim()),
      );
      this.setState({  listCpy: suggestions, selected: e.target.value,showError: '', });
    }
  }

  componentDidMount() {
    this.setState({
      selected:
        this.props.selectedValues && this.props.selectedValues[0]
          ? this.props.selectedValues[0][this.props.filterKey]
          : '',
    });
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  onDropClicked() {
    if(this.state.listCpy.length===0) {
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
  }

  onDropDownKeyDown=(e)=>{
    if(e.key.toLowerCase()==='tab'){
      this.setState({focused:false});
    }
  }

  dropDownVisibility=()=>{
      this.searchService.search({
        term: '',
        url: this.props.apiUrl,
        method: this.props.method,
        otherData: {
          ...this.props.otherData,
          queryKey: this.props.queryWith,
        },
      });
    this.setState({focused: !this.state.focused});
  }

  render() {
    const { label, icon, width, filterKey, selectedValues, classes } = this.props;
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
            classes={{ root: classes.cssLabel, focused: classes.cssFocused, error:classes.cssError }} >
            {label}
          </InputLabel>
          <Input
            id="code"
            type="text"
            autoFocus={false}
            autoComplete="off"
            value={selected}
            onChange={e => { this.handleQueryChange(e); }}
            onClick={this.dropDownVisibility}
            onKeyDown={this.onDropDownKeyDown}
            classes={{ underline: classes.cssUnderline,focused: classes.cssFocused, }}
            endAdornment={ <InputAdornment position="end" onClick={e => this.onDropClicked(e)}>
                {this.props.icon == 'add' ? ( <CustomIcon icon={add_skill} className="down-icon" />  ) 
                : (<CustomIcon icon={down} className="down-icon" />)}
              </InputAdornment> } 
               />
        {this.state.showError !== '' ? (
            <FormHelperText error={this.state.showError !== ''} id="firstName_error">
              <span className="field_error"> {this.state.showError} </span>
            </FormHelperText>
          ) : null}
        </FormControl>
        {focused == true ? (
          <DropDown
            {...this.props}
            list={listCpy}
            onClose={(name, data) => { this.setState({ focused: false, showError: '',
                   selected: data == null ? this.state.selected : data[this.props.filterKey], },
                   () => { this.props.onClose(name, data == null ? this.state.selected : data); },); }}
          />
        ) : null}
      </div>
    );
  }
}

AutoCompletePrefilled.defaultProps = {
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

AutoCompletePrefilled.propTypes = {
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

export default withStyles(styles)(AutoCompletePrefilled);
