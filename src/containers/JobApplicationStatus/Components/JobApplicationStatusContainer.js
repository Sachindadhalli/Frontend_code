//library dependencies
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import TablePagination from '@material-ui/core/TablePagination';
import {DatePicker, MuiPickersUtilsProvider} from 'material-ui-pickers';
import InputAdornment from '@material-ui/core/InputAdornment';
import DateFnsUtils from '@date-io/date-fns';
import {createMuiTheme, FormControl, InputLabel, MuiThemeProvider,} from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
//styles
import './styles.scss';
//custom components
import EmployeeSideNav from '../../../components/EmployeeSideNav';
import CustomIcon from '../../../components/CustomIcon';
import JobApplicationComponent from './JobApplicationComponent/JobApplicationComponent';
import CustomTag from '../../../components/CustomTag';
import AutoCompleteSearch from '../../../components/AutoCompleteSearch';
import ChipsForFields from '../../EmployerHomePage/components/EmployerJobPage/components/SectorsRoles/ChipsForFields';
import NonCreatableSingleSelectDropdown from '../../../components/SingleSelectDropdownWrapper/components/NonCreatableSingleSelectDropdown';
//icons
import calendar from '../../../../assets/media/icons/calendar.svg';
//utilities
import {JOB_APPLICATION_STATUS, JOB_APPLICATION_STATUS_FILTER_BY} from '../../../../config/constants';
import {apiCall, calculateTotalCount, handleLocalStorage, isObjectAlreadyExist} from '../../../Utilities';

//customised material ui date picker
export const customTheme = createMuiTheme({
  palette: {
    primary: {main: '#e73a9e', light: '#212121', dark: '#212121',},
    secondary: {main: '#e73a9e',},
  },
});

//customised material ui style
const styles = (theme) => ({
  root: {justifyContent: 'center', flexWrap: 'wrap',},
  paper: {padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,},
  userTable: {boxShadow: 'none',},
  spacer: {flex: '1 1 50%', border: '1px solid black',},
  cssLabel: {color: '#656565 !important', fontSize: '14px', fontFamily: 'Roboto', fontWeight: 400, marginTop: '-16px',},
  helperText: {
    color: '#656565', fontSize: '16px', fontFamily: 'Roboto', fontWeight: 'normal', fontStyle: 'normal',
    fontStretch: 'normal', lineHeight: 'normal', letterSpacing: 'normal',
  },
  cssError: {color: '#656565 !important', fontSize: '14px', fontFamily: 'Roboto', fontWeight: 400,},
  selectRoot: {marginLeft: '6px', marginRight: '6px', "&:focused": {backgroundColor: "blue !important"}},
  menuItem: {border: 'none !important', borderColor: 'white !important'},
  select: {border: 'none !important', borderColor: 'white !important'},
  input: {"&:focus": {backgroundColor: "blue !important"},},
});

// style customizations for TablePaginationActions component
const actionsStyles = theme => ({
  root: {flexShrink: 0, color: theme.palette.text.secondary, marginLeft: '24px',},
  spacer: {flex: '1 1 50%', border: '1px solid black',},
});

class TablePaginationActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: props.page || props.page == 0 ? props.page : ''
    }
  }

  //on click First page button
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  // on click previous button
  handleBackButtonClick = event => {
    if (this.state.page - 1 >= 0) this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    const lastPage = Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1);
    if (this.state.page + 1 <= lastPage) this.props.onChangePage(event, this.props.page + 1);
  };
  //On click Last page button
  handleLastPageButtonClick = event => {
    this.props.onChangePage(event, Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),);
  };

  componentWillReceiveProps(nextProps) {

    // on change in page,receiving next props
    this.setState({page: nextProps.page || nextProps.page === 0 ? nextProps.page : ''});
  }

  /**
   * on change Page,validate the page
   * @param e
   */
  onPageChange = (e) => {
    if (e.target.value === "" || e.target.value < Math.ceil(this.props.count / this.props.rowsPerPage) || e.target.value === Math.ceil(this.props.count / this.props.rowsPerPage)) {
      this.setState({page: e.target.value ? parseInt(e.target.value) - 1 : null});
    }
  };
  /**
   * to handle enter key in box to go direct page
   * @param e
   */
  onEnterCheck = (e) => {
    if ((this.state.page || this.state.page === 0) && e.key === 'Enter') {
      this.props.onChangePage(e, this.state.page,);
    }
  };

  render() {
    const {classes, count, page, rowsPerPage, theme} = this.props;
    return (
      <div className={classes.root}>
        <span
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
          className="mr-16"
          style={{color: '#e73a9e', cursor: 'pointer'}}
        >
          {theme.direction === 'rtl' ? 'Last Page' : 'First Page'}
        </span>
        <span
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
          className="mr-16"
          style={{color: '#e73a9e', cursor: 'pointer'}}
        >
          {theme.direction === 'rtl' ? 'Next' : 'Prev'}
        </span>
        <span className="mr-16">
          Page <input className="pagination-input-box" type='number' onKeyDown={this.onEnterCheck}
                      onChange={this.onPageChange}
                      value={this.state.page ? this.state.page + 1 : this.state.page == 0 ? this.state.page + 1 : ''}/> of {Math.ceil(count / rowsPerPage)}
        </span>
        <span
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
          className="mr-16"
          style={{color: '#e73a9e', cursor: 'pointer'}}
        >
          {theme.direction === 'rtl' ? 'Prev' : 'Next'}
        </span>
        <span
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
          style={{color: '#e73a9e', cursor: 'pointer'}}
        >
          {theme.direction === 'rtl' ? 'First Page' : 'Last Page'}
        </span>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, {withTheme: true})(
  TablePaginationActions,
);

const breakDurationList = [{value: 'Oldest', key: 1}, {value: 'Newest', key: 2}]

class JobApplicationStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowsPerPage: 20,
      page: 0,
      count: 25,
      status: [],
      sort_by: 'newest',
      value: 'search',
      filter_by_values: [],
      from_date: null,
      break_reason: '',
      to_date: null,
      from_date_error: '',
      filter_by_error: '',
      to_date_error: '',
      min_From_date: null,
      min_to_date: null,
      max_from_Date: null,
      allFieldsStatus: {
        filter_by_status: false
      },
      data: [],
    };
  }

  /**
   * on change the page, calling a function to get data of next page
   * @param event
   */
  handleChangePage = (event, page) => {
    this.setState({page}, () => this.makeAnApiCall());
  };

  componentWillMount() {

    //initially calling a function to get the data from an api
    this.makeAnApiCall();
    let d = new Date();
    let d1 = new Date();
    d.setMonth(d.getMonth() - 3);
    d.setDate(d.getDate() - 1);
    this.setState({
      min_From_date: d,
      min_to_date: d,
      max_from_Date: d1,
    });
  }

  /**
   * on click preview icon,redirecting to preview page
   * @param data
   */
  jobDetails = data => {
    this.props.history.push(`/job-application-status/${data.job_id}/job-application-status-preview`,);
  };
  /**
   * on click of delete icon to remove chips
   * @param fieldName
   * @param key
   */
  removeElementFromState = (fieldName, key) => {
    let fieldDataFromState = JSON.parse(JSON.stringify(this.state[fieldName]));
    fieldDataFromState.splice(key, 1)
    if (this.state.from_date && this.state.to_date) {
      this.setState({[fieldName]: fieldDataFromState}, () => this.makeAnApiCall());
    }
    else if (!this.state.from_date && !this.state.to_date) {
      this.setState({[fieldName]: fieldDataFromState}, () => this.makeAnApiCall());
    }
    else if (!this.state.from_date && this.state.to_date) {
      this.setState({[fieldName]: fieldDataFromState})
    }
    else if (this.state.from_date && !this.state.to_date) {
      this.setState({[fieldName]: fieldDataFromState})
    }
  };
  /**
   * updating state for particular field error
   * @param name
   * @param value
   */
  setParticularState = (name, value) => {
    if (value === null || value === "" && name.includes('error') === false) {
      return
    }
    this.setState({[name]: value})
  };
  /**
   * on change the filter by value in drop down
   * @param name
   * @param value
   * @returns {Promise<void>}
   */
  setMultiState = async (name, value) => {
    let valueArray = this.state[name];
    let newValue = 0;
    if (value.value && !value.key) {
      if (["location"].includes(name))
        return; //for industries and fucntional areas all values are not allowed
      value.key = value.value
    }
    try {
      newValue = value.value.length;
      if (!isObjectAlreadyExist(value, valueArray) && 250 - calculateTotalCount(valueArray) - newValue >= 0) {
        valueArray.unshift(value);
        await this.setParticularState(name, valueArray);
        if (this.state.from_date && this.state.to_date) this.makeAnApiCall();
        else if (!this.state.from_date && !this.state.to_date) this.makeAnApiCall();
      }
    } catch (exc) {
    }
  };

  /**
   * On change in filter calling an api tp get the data
   * @returns {Promise<void>}
   */
  makeAnApiCall = async () => {
    const headers = {
      Authorization: handleLocalStorage('get', 'employeeLogin'),
    };
    const dataToBeSend = {};
    dataToBeSend.status = this.state.filter_by_values;
    dataToBeSend.from = this.state.from_date ? this.state.from_date : '';
    dataToBeSend.to = this.state.to_date ? this.state.to_date : '';
    dataToBeSend.page = this.state.page + 1;
    dataToBeSend.limit = parseInt(this.state.rowsPerPage);
    dataToBeSend.sort = this.state.sort_by.toLowerCase() == 'newest' ? true : false;
    const response = await apiCall('post', dataToBeSend, JOB_APPLICATION_STATUS, headers);
    this.setState({data: response.data, count: response.count});
  };
  /**
   * on change the rows per page option in pagination
   * @param event
   */

  handleChangeRowsPerPage = event => {
    this.setState({page: 0, rowsPerPage: event.target.value}, () => this.makeAnApiCall());
  };
  /**
   * on change in input field
   * @param e
   * @param validatorAfterSave
   */
  handleInput = (e, validatorAfterSave = null) => {
    const {name} = e.target;
    if (e.target.value === null) {
      this.setState({[name]: null,});
    } else {
      let d = new Date();
      let d1 = new Date();
      d.setMonth(d.getMonth() - 3);
      d.setDate(d.getDate() - 1);
      this.setState({
        min_From_date: d,
        min_to_date: d,
        max_from_Date: d1,
      });
      let value = e.target.value;
      if (['from_date', 'to_date'].includes(e.target.name)) {
        value = new Date(value).getTime();
      }
      this.setState({[name]: value,}, () => {
          if (validatorAfterSave) {
            this.validateFields(name);
          }
        },
      );
    }
  };

  /**
   * validating all the fields
   * @returns {Promise<boolean>}
   */
  validateFromDateForm = async () => {
    let errorValue = '', errorName = '';
    if (!this.state.from_date) {
      errorValue = 'Kindly select a valid date range';
      errorName = 'from_date';
    }
    else if (this.state.from_date && this.state.to_date) {
      let to_date = new Date(this.state.to_date).getTime(),
        from_date = new Date(this.state.from_date).getTime();
      if (to_date < from_date) {
        errorValue = "'To Date' must be greater than 'From Date'";
        errorName = 'from_date';
      } else if (to_date >= from_date) {
        this.setParticularField('from_date', '');
        this.setParticularField('to_date', '');
        this.makeAnApiCall();
      }
    }

    this.setParticularField(errorName, errorValue);
    return !!errorValue;
  };
  /**
   * on click to change the sort by option
   * @param option
   */
  setSortByOption = (option) => {
    this.setState({sort_by: option.label, page: 0}, () => this.makeAnApiCall());
  };

  /**
   * To validating the fields
   * @returns {Promise<boolean>}
   */
  validateToDateForm = async () => {
    let errorValue = '',
      errorName = '';
    if (!this.state.to_date) {
      errorValue = 'Kindly select a valid date range';
      errorName = 'to_date';
    }
    else if (!this.state.from_date && this.state.to_date) {
      errorValue = 'Kindly select a valid date range';
      errorName = 'from_date';
    }
    else if (this.state.from_date && this.state.to_date) {
      let to_date = new Date(this.state.to_date).getTime(),
        from_date = new Date(this.state.from_date).getTime();
      if (to_date < from_date) {
        errorValue = "'To Date' must be greater than 'From Date'";
        errorName = 'to_date';
      } else if (to_date >= from_date) {
        this.setParticularField('from_date', '');
        this.setParticularField('to_date', '');
        this.makeAnApiCall();
      }
    }

    this.setParticularField(errorName, errorValue);
    return !!errorValue;
  };
  /**
   * To validate all fields calling a particular function
   * @param fieldName
   */
  validateFields = fieldName => {
    switch (fieldName) {
      case 'from_date':
        this.validateFromDateForm();
        break;
      case 'to_date':
        this.validateToDateForm();
        break;
    }
  };

  /**
   * updating the state with particular error field
   * @param name
   * @param value
   */
  setParticularField = (name, value) => {
    const errorName = name + '_error';
    this.setState({[errorName]: value,});
  };
  /**
   * to remove the error on focus
   * @param e
   */
  removeErrorFocus = e => {
    let errorValue = '';
    if (this.state.to_date && this.state[e.target.name]) {
      this.setParticularField(e.target.name, errorValue);
    } else if (this.state.from_date && this.state[e.target.name]) {
      this.setParticularField(e.target.name, errorValue);
    }
    this.setParticularField(e.target.name, errorValue);
  };

  render() {
    const {
      count,
      rowsPerPage,
      page,
      from_date,
      to_date,
      from_date_error,
      to_date_error,
      min_to_date,
    } = this.state;
    const {classes} = this.props
    return (
      <div className="sub-user-page">
        <EmployeeSideNav history={this.props.history} selected={3}>
          <div>
            <div className="sub-user-wrapper px-20 px-sm-40 pb-20 sub-user-style-manual">
              <div className="sub-user-container ">
                <div>
                  <div className="sub-user-text">Job Application Status</div>
                  <div className="sub-user-nav">
                    <Breadcrumbs
                      separator={<NavigateNextIcon fontSize="small"/>}
                      arial-label="Breadcrumb"
                    >
                      <Link
                        style={{color: '#656565', fontSize: '16px'}}
                        href="#"
                        onClick={this.handleNavigationClick}
                      >
                        Jobs
                      </Link>
                      <Link color="inherit" href="#" onClick={this.handleNavigationClick}>
                        <CustomTag
                          text="Job Application Status"
                          className="nav-create-a-job-text"
                        />
                      </Link>
                    </Breadcrumbs>
                  </div>
                </div>
              </div>
              <div className="total-jobs-sort-by-select-status">
                <div className="total-jobs-count">
                  <div className="total-jobs-count-title">Total No. of Jobs Applied :</div>
                  <div className="total-jobs-count-data">{count}</div>
                </div>
                <div className="job-application-status-select-fields">
                  <div className="job-application-status-select-fields-filter-sort">
                    <div className="sort-by-text-field" style={{width: '137px'}}>
                      <FormControl style={{width: '100%'}}>
                        <InputLabel
                          style={{marginTop: '-16px'}}
                          className="change-label-style"
                          shrink={true}
                          classes={{
                            root: classes.cssLabel,
                            focused: classes.cssFocused,
                            error: classes.cssError
                          }}
                        >
                          {'Sort By'}
                        </InputLabel>
                        <NonCreatableSingleSelectDropdown
                          getSelectedOption={(option) => this.setSortByOption(option)}
                          options={breakDurationList}
                          error={''}
                        />
                      </FormControl>
                    </div>
                    <div className="filter-by-text-field" style={{width: '137px'}}>
                      <FormControl className={classes.formControl_0_margin}>
                        <label className="lebal-text margin-bottom--16px">Filter By</label>
                        <AutoCompleteSearch
                          label={""}
                          type="text"
                          selectedValues={[]}
                          filterKey={"value"}
                          apiUrl={JOB_APPLICATION_STATUS_FILTER_BY}
                          width={'100%'}
                          onClose={(name, data) => {
                            if (data != null && data.value !== '')
                              this.setMultiState('filter_by_values', data);
                          }}
                          queryWith={'search'}
                          otherData={{format: 'json'}}
                          showError={""}
                        />
                        <ChipsForFields
                          values={this.state.filter_by_values}
                          isItEditMode={true}
                          onDelete={(key) => {
                            this.removeElementFromState('filter_by_values', key)
                          }}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className="total-jobs-from-to-date-picker">
                    <div className="total-jobs-from-date-picker">
                      <FormControl
                        className="total-jobs-from-date-picker"
                        error={from_date_error ? true : false}
                      >
                        <label style={{color: '#656565'}} className="lable-for-to-from-date">
                          From
                        </label>
                        <MuiThemeProvider theme={customTheme}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                              className="from-to-date-picker"
                              margin="normal"
                              value={from_date}
                              clearable={true}
                              onChange={value =>
                                this.handleInput({target: {value: value, name: 'from_date'}}, true)
                              }
                              onBlur={() => this.validateFields('from_date')}
                              onFocus={this.removeErrorFocus}
                              style={{marginBottom: '0px'}}
                              maxDate={new Date()}
                              minDate={min_to_date}
                              format="dd/MM/yyyy"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end" style={{paddingRight: '5px'}}>
                                    <CustomIcon icon={calendar} className="search-icon"/>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </MuiPickersUtilsProvider>
                        </MuiThemeProvider>
                        {from_date_error && <FormHelperText className="field_error"
                                                            style={{paddingBottom: '7px'}}>{from_date_error}</FormHelperText>}
                      </FormControl>
                    </div>
                    <div className="total-jobs-to-date-picker">
                      <FormControl
                        className="total-jobs-to-date-picker"
                        error={to_date_error ? true : false}
                      >
                        <label style={{color: '#656565'}} className="lable-for-to-from-date">
                          To
                        </label>
                        <MuiThemeProvider theme={customTheme}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                              className="from-to-date-picker"
                              margin="normal"
                              value={to_date}
                              clearable={true}
                              onChange={value =>
                                this.handleInput({target: {value: value, name: 'to_date'}}, true)
                              }
                              onBlur={() => this.validateFields('to_date')}
                              onFocus={this.removeErrorFocus}
                              minDate={min_to_date}
                              maxDate={new Date()}
                              format="dd/MM/yyyy"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end" style={{paddingRight: '7px'}}>
                                    <CustomIcon icon={calendar} className="search-icon"/>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </MuiPickersUtilsProvider>
                        </MuiThemeProvider>
                        {to_date_error && <FormHelperText style={{paddingBottom: '7px'}}
                                                          className="field_error">{to_date_error}</FormHelperText>}
                      </FormControl>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{display: 'flex', justifyContent: 'flex-end', paddingRight: '30px'}}>
                <TablePagination
                  rowsPerPageOptions={[20, 40, 60]}
                  labelDisplayedRows={({from, to, count}) => 'per page'}
                  colSpan={7}
                  count={count}
                  rowsPerPage={rowsPerPage}
                  labelRowsPerPage="Showing"
                  page={page}
                  classes={{selectRoot: classes.selectRoot, menuItem: classes.menuItem, select: classes.select}}
                  SelectProps={{
                    native: true,
                  }}
                  style={{border: 'none'}}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                  align="center"
                />
              </div>
              <div className="job-application-component">
                {this.state.data.map((data, index) => (
                  <JobApplicationComponent data={data} jobDetails={() => this.jobDetails(data)}/>
                ))}
              </div>
            </div>
          </div>
        </EmployeeSideNav>
      </div>
    );
  }
}

JobApplicationStatus.propTypes = {classes: PropTypes.object.isRequired,};

export default withStyles(styles)(JobApplicationStatus);
