//library dependencies
import React from "react";
import PropTypes from "prop-types";
import {withStyles,Input,InputAdornment,InputLabel,FormControl,FormHelperText} from "@material-ui/core";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import "rxjs/add/observable/of";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import axios from "axios";

//style
import "./style.scss";
import customisedMaterial from '../../styles/customisedMaterial';

//icon
import down from "../../../assets/media/icons/down.svg";
import add_skill from "../../../assets/media/icons/add-skill.svg";

//custom component
import CustomIcon from "../../components/CustomIcon";

//utilities
import handleLocalStorage from "../../Utilities/handleLocalStorage";
import {SERVER_API_URL, SERVER_API_PATH} from "../../../config/constants";


const header = { 'authorization': handleLocalStorage("get", "employerLogin"), 'content-Type': 'application/json', }

export class APISearchService {
  constructor() {
    this.searchTerm = new Subject();
  }

  search({ term, url, method, otherData}) { this.searchTerm.next({term, url, method, otherData}); }

  doSearch = (query) => {
    const apiUrl = SERVER_API_URL + SERVER_API_PATH + query.url;
    let promise = axios.get(apiUrl, {params: {search: query.term, ...query.otherData}, headers: header})
    return Observable
      .fromPromise(promise)
  }

  getResults() {
    return this.searchTerm
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap((query) => query ? this.doSearch(query) : Observable.of([]))
      .catch(error => { return Observable.of([]); });
  }
}

const styles = (theme) => ({
  ...customisedMaterial,
  root: { display: 'flex', flexWrap: 'wrap',  marginTop: 0 },
  margin: {},
  label: { color: '#656565', },
  cssLabel: {  color: '#656565 !important', fontSize: '14px', fontFamily: 'Roboto', fontWeight:400,},
  cssError: { color: '#656565 !important', fontSize: '14px',fontFamily: 'Roboto',fontWeight:400, },
  greenLabel: { color: '#0f0',},
  greenUnderline: { '&:after': {  backgroundColor: '#0f0', }, },
  greenInkbar: {  '&:after': {  backgroundColor: '#0f0',  }, },
  helperText: {  color: '#656565', fontSize: '14px',   fontFamily: 'Roboto',   fontWeight: 'normal',   fontStyle: 'normal',   
   fontStretch: 'normal',    lineHeight: 'normal', letterSpacing: 'normal',  },
  withoutLabel: {   marginTop: theme.spacing.unit * 3 },
  textField: {  flexBasis: 70 },
  input: {  display: 'none' },
  padding: {},
});

class DropDown extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      list: []
    };
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hasOwnProperty('list') && nextProps.list && nextProps.list.length > 0) {
      this.setState({ list: nextProps.list })
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef(node) { this.wrapperRef = node;  }
  
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      let focus=false;
      let res='';
      if(event.target.tagName){
        res=event.target.tagName.toLowerCase();
        if(event.target.tagName==="INPUT") focus=true;
        else focus=false;
      }
      this.props.onClose(this.props.name, null,focus);
      document.removeEventListener("mousedown", this.handleClickOutside);
    }
  }

  render() {
    const {list} = this.state;
    const {width, filterKey, selectedValues} = this.props;
    return (
      <React.Fragment>
        {
          list && list.length > 0 ?
            <ul className={"autocomplete-card"} style={{width: `100%`}} ref={this.setWrapperRef}>
              { list.map((listItem, key)=> {
                return (
                  <li className={
                    selectedValues.filter((selected)=> {
                      return listItem[filterKey] === selected[filterKey]
                    }).length > 0 ? "autocomplete-row selected" : "autocomplete-row"}
                      key={key}
                      onClick={(e)=> {
                        this.handleItemClick(e, listItem);
                      }}>
                    <div>
                      {listItem[filterKey]}
                    </div>
                  </li>
                )
              })}
            </ul> : null
        }
      </React.Fragment>
    )
  }

  handleItemClick(e, data) { this.props.onClose(this.props.name, data); } }

class AutoCompleteSearch extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      list: props.defaultValues || [],
      listCpy: [],
      selected: '',
      focused: false,
      isFocused:0,
      showError: props.showError || '',
    };
    this.isFocused=false;
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleDropdownClosed = this.handleDropdownClosed.bind(this);
    this.searchService = new APISearchService();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.defaultValues) {
      if (this.state.list.length !== nextProps.defaultValues) {
        this.setState({ list: nextProps.defaultValues })
      }
    }

    if (nextProps && nextProps.showError) {
      this.setState({ showError: nextProps.showError  })
    }
  }

  handleDropdownClosed(name, data, selected,focus) {
    this.props.onClose(name, data == null ? {value: selected} : data);
    this.setState({ focused: focus, selected: '', showError: ''})
  }

  handleQueryChange(e) {
    if (e.target && e.target !== null) {
      this.setState({ showError: '' })
      this.searchService.search({
        term: e.target.value.toLowerCase().trim(),
        url: this.props.apiUrl,
        method: this.props.method,
        otherData: this.props.otherData || null,
      });
      this.setState({ selected: e.target.value, focused: true })
    }
  }

  componentDidMount() {
    this.searchService
      .getResults()
      .subscribe((res) => {
        try { this.setState({ listCpy: res.data.data}); } 
        catch (e) { }
      });
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  dropDownVisibility=()=>{
    this.searchService.search({
      term: "",
      url: this.props.apiUrl,
      method: this.props.method,
      otherData: this.props.otherData,
    });
    if(!this.isFocused) this.setState({ focused: !this.state.focused, })
    else this.isFocused=false; 
  }

  render() {
    const {label, width, classes, name} = this.props;
    const { selected, focused, listCpy} = this.state;
    return (
      <div className="drop-down" style={{width: `${width}`}}>
        <FormControl
          style={{width: '100%', marginTop: 0}}
          classes={{root: classes.root}}
          error={this.state.showError !== ''}>
          <InputLabel htmlFor="code" style={{ marginTop: 0 }}  shrink
            classes={{ root: classes.cssLabel, focused: classes.cssFocused, error:classes.cssError }}
           >
            {label}
          </InputLabel>
          <Input
            id="code"
            type="text"
            autoFocus={false}
            value={selected}
            onChange={this.handleQueryChange}
            autoComplete="off"
            onFocus={(e)=> {
               this.searchService.search({
                 term: "",
                 url: this.props.apiUrl,
                 method: this.props.method,
                 otherData: this.props.otherData,
               });
               this.setState({ focused: true, });
               this.isFocused=true;
            }}
            classes={{ underline: classes.cssUnderline, focused: classes.cssFocused, }}
            onClick={this.dropDownVisibility}
            onKeyDown={(e)=> {
              if (e.keyCode === 13) {
                this.props.onClose(name, {value: selected});
                this.setState({ focused: false, selected: '' })
              }
              else if(e.key.toLowerCase()==='tab') this.setState({ focused: false,});
            }}
            endAdornment={
              <InputAdornment position="end">
                {
                  this.props.icon == 'add' ?
                    <CustomIcon icon={add_skill} className={"down-icon"}/>
                  : this.props.icon == 'none'?
                    null
                    : <CustomIcon icon={down} className={"down-icon"}/>
                }
              </InputAdornment>
            }
          />
          {this.state.showError !== '' ? <FormHelperText error={this.state.showError !== ''}
                                                         id="firstName_error"><span
            className={"field_error"}>{this.state.showError !== '' ?
            null : null}{this.state.showError}</span>
          </FormHelperText> : null}
        </FormControl>
        {
          focused == true ?
            <DropDown {...this.props} list={listCpy}
              onClose={(name, data, focus)=> {
              this.handleDropdownClosed(name, data, selected,focus);
             }}/>
          : null
        }
      </div>
    )
  }
}

AutoCompleteSearch.defaultProps = {
  label: "Label",
  method: "get",
  queryWith: "key",
  width: ``,
  filterKey: "key",
  selectedValues: [],
  name: "",
  apiUrl: "",
  defaultValues: [],
  showError: ''
};

AutoCompleteSearch.propTypes = {
  label: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  width: PropTypes.any,
  apiUrl: PropTypes.any,
  filterKey: PropTypes.string.isRequired,
  queryWith: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  selectedValues: PropTypes.any.isRequired,
  otherData: PropTypes.any,
  defaultValues: PropTypes.any,
  showError: PropTypes.any,
};

export default withStyles(styles)(AutoCompleteSearch);
