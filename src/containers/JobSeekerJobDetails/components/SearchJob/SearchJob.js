//library dependencies
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {FormControl, InputLabel, TablePagination, Link} from '@material-ui/core';

//styles
import './styles.scss';

//icons
import LoadingIcon from "../../../../components/LoadingIcon";

//utilities
import {apiCall, handleLocalStorage} from '../../../../Utilities';
import {JOB_LISTING_SAVE_JOBS, JOB_LISTING_SEARCH_JOB} from '../../../../../config/constants';

//custom components
import {toast} from 'react-toastify';
import CustomIcon from '../../../../components/CustomTag';
import FilterJobs from '../../../../components/FilterJobs/FilterJobs';
import EmployeeSideNav from '../../../../components/EmployeeSideNav';
import JobCard from '../../../../components/JobCard/JobCard';
import SearchType from '../SearchType/SearchType';
import DialogQuestionnaire from '../../../../components/DialogQuestionnaire';
import NonCreatableSingleSelectDropdown
  from '../../../../components/SingleSelectDropdownWrapper/components/NonCreatableSingleSelectDropdown';

// styles used to overrides material ui styles
const styles = theme => ({
  root: {justifyContent: 'center', flexWrap: 'wrap',},
  paper: {padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,},
  userTable: {boxShadow: 'none',},
  spacer: {flex: '1 1 50%', border: '1px solid black',},
  cssLabel: {color: '#656565 !important', fontSize: '14px', fontFamily: 'Roboto', fontWeight: 400,},
  helperText: {
    color: '#656565', fontSize: '14px', fontFamily: 'Roboto', fontWeight: 'normal', fontStyle: 'normal',
    fontStretch: 'normal', lineHeight: 'normal', letterSpacing: 'normal',
  },
  selectRoot: {marginLeft: '6px', marginRight: '6px'},
  menuItem: {
    border: "solid 1px #e73a9e !important",
    '&:hover': {background: '#e73a9e !important'},
    '&:selected': {background: '#e73a9e !important'},
    '&:active': {background: '#e73a9e !important'}
  }
});

// styles used to overrides material ui table pagination styles
const actionsStyles = theme => ({
  root: {flexShrink: 0, color: theme.palette.text.secondary, marginLeft: '24px'},
  spacer: {flex: '1 1 50%', border: '1px solid black',},
  selectRoot: {marginRight: '6px', marginLeft: '6px'}
});

class TablePaginationActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {page: props.page || props.page === 0 ? props.page : '',}
  }

  /**
   * on first page button click of pagination, send event through props
   * @param event
   * @returns {*}
   */
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };


  /**
   * on back page button click of pagination, send event through props
   * @param event
   * @returns {*}
   */
  handleBackButtonClick = event => {
    if (this.state.page - 1 >= 0) this.props.onChangePage(event, this.props.page - 1);
  };


  /**
   * on next page button click of pagination, send event through props
   * @param event
   * @returns {*}
   */
  handleNextButtonClick = event => {
    const lastPage = Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1);
    if (this.state.page + 1 <= lastPage) this.props.onChangePage(event, this.props.page + 1);
  };


  /**
   * on last page button click of pagination, send event through props
   * @param event
   * @returns {*}
   */
  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  /**
   * after receiving props set page number in state
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    this.setState({page: nextProps.page || nextProps.page === 0 ? nextProps.page : ''});
  }

  /**
   * on page change set page number in state
   * @param e
   */
  onPageChange = (e) => {
    if (e.target.value === "" || e.target.value < Math.ceil(this.props.count / this.props.rowsPerPage) || e.target.value === Math.ceil(this.props.count / this.props.rowsPerPage)) {
      this.setState({page: e.target.value ? parseInt(e.target.value) - 1 : null});
    }
  };

  /**
   * on enter key press send event through props
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
          className="mr-12"
          style={{color: '#e73a9e', cursor: 'pointer'}}
        >
          {theme.direction === 'rtl' ? 'Last Page' : 'First Page'}
        </span>
        <span
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
          className="mr-12"
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
          className="mr-12"
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

const breakDurationList = [{value: 'Date', key: 1}, {value: 'Match', key: 2}]

class SearchJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type_of_user: 'jobSeeker', rowsPerPage: 20, reqBody: {}, page: 0, sort_by: 'Date', jobList: [], filter_by: [],
      filteredOptionRecieved: [], openQuestionnaireDialog: false, job: '', counts: " ", loading: false,
    };
  }

  /**
   * this function used to make api call to server and get details and stored in state variable
   * @param reqBody
   */
  makeAnApiCall = (reqBody) => {
    const headers = {
      authorization: handleLocalStorage('get', 'employeeLogin'),
      'Content-Type': 'application/json',
    };
    apiCall('post', reqBody, JOB_LISTING_SEARCH_JOB, headers).then(res => {
      if (res.status) {
        let responseArr = res.data.filter_by;
        let filteredArr = this.state.filteredOptionRecieved;
        if (this.state.filteredOptionRecieved.length > 0) {
          for (let resIndex = 0; resIndex < responseArr.length; resIndex++) {
            for (let selIndex = 0; selIndex < filteredArr.length; selIndex++) {
              if (responseArr[resIndex].title === filteredArr[selIndex].title) {
                for (let resValIndex = 0; resValIndex < responseArr[resIndex].values.length; resValIndex++) {
                  for (let selValIndex = 0; selValIndex < filteredArr[selIndex].values.length; selValIndex++) {
                    if (responseArr[resIndex].values[resValIndex].key === filteredArr[selIndex].values[selValIndex].key || (responseArr[resIndex].values[resValIndex].hasOwnProperty("isChecked") && responseArr[resIndex].values[resValIndex].isChecked)) {
                      responseArr[resIndex].values[resValIndex]['isChecked'] = true;
                    } else {
                      responseArr[resIndex].values[resValIndex]['isChecked'] = false;
                    }
                  }
                }
              }
            }
          }
        }
        this.setState({
          reqBody: reqBody,
          jobList: res.data.result,
          filter_by: res.data.filter_by,
          counts: res.data.counts,
        });
      }
    });
  };

  /**
   * this function used to call initial data from server to reflect in web page
   * @param reqBody
   */
  makeInitialApiCall = (reqBody) => {
    this.setState({loading: true});
    const headers = {
      authorization: handleLocalStorage('get', 'employeeLogin'),
      'Content-Type': 'application/json',
    };
    apiCall('post', reqBody, JOB_LISTING_SEARCH_JOB, headers).then(res => {
      const filterBy = res.data.filter_by && res.data.filter_by.map((filter, index) => {
        const filterValues = filter.values.map((value, inx) => value['isChecked'] = false);
        return {title: filter.title, values: filterValues};
      });
      this.setState({
        reqBody: reqBody,
        jobList: res.data.result,
        filter_by: res.data.filter_by,
        counts: res.data.counts,
        loading: false,
      });
    });
  };


  componentWillMount() {
    /**
     * arrange initial api call request parameters
     */
    const dataToBeSend = {};
    dataToBeSend.result_per_page = 20;
    dataToBeSend.pagination = this.state.page + 1;
    dataToBeSend.is_advanced = false;
    dataToBeSend.skill_designation_com = '';
    dataToBeSend.location = [];
    dataToBeSend.min_exp = '';
    dataToBeSend.sort = 'date';
    dataToBeSend.min_salary = '';
    dataToBeSend.job_type = [];
    dataToBeSend.filter_by = [];
    this.makeInitialApiCall(dataToBeSend);
  }

  /**
   * this function used to call initial data from server to reflect in web page
   * @param reqBody
   */
  makeAnApiCallInitial = (reqBody) => {
    reqBody.result_per_page = this.state.rowsPerPage;
    reqBody.sort = this.state.sort_by.toLowerCase();
    const headers = {
      authorization: handleLocalStorage('get', 'employeeLogin'),
      'Content-Type': 'application/json',
    };
    apiCall('post', reqBody, JOB_LISTING_SEARCH_JOB, headers).then(res => {
      const filterBy = res.data.filter_by && res.data.filter_by.map((filter, index) => {
        const filterValues = filter.values.map((value, inx) => value['isChecked'] = false);
        return {title: filter.title, values: filterValues};
      });
      this.setState({
        reqBody: reqBody,
        jobList: res.data.result,
        filter_by: res.data.filter_by,
        counts: res.data.counts,
      });
    });
  };

  /**
   * this function used when sort by drop down changes
   * used to get sort by result from server
   * @param option
   */
  setSortByOption = (option) => {
    const {reqBody} = this.state;
    reqBody.sort = option.label.toLowerCase();
    this.makeAnApiCall(reqBody);
    this.setState({sort_by: option.label, reqBody: reqBody});
  };

  /**
   * on button click calls filter data from server
   */
  changeButtonStatus = () => this.makeAnApiCall(this.state.reqBody);

  /**
   * this function used in sort by function whenever it changes it function runs
   * @param event
   */
  handleChange = event => {
    const {reqBody} = this.state;
    reqBody.sort = event.target.value;
    this.makeAnApiCall(reqBody);
    this.setState({[event.target.name]: event.target.value});
  };

  /**
   * whenever any filter checkbox selected or unselected that time this function runs to get filtered data from server
   * @param modifiedFilter
   */
  sendCheckedFilters = (modifiedFilter) => {
    const tempArray = this.state.filteredOptionRecieved;
    if (this.state.filteredOptionRecieved.length === 0) {
      tempArray.push(modifiedFilter);
    } else {
      let flag = false;
      this.state.filteredOptionRecieved.map((option, index) => {
        if (modifiedFilter.title === option.title && modifiedFilter.values.length === 0) {
          tempArray.splice(index, 1);
          flag = true;
        }
        if (modifiedFilter.title === option.title && modifiedFilter.values.length > 0) {
          tempArray[index] = modifiedFilter;
          flag = true;
        }
      });
      if (!flag) tempArray.push(modifiedFilter);
    }
    const {reqBody} = this.state;
    reqBody.filter_by = tempArray;
    reqBody.location = reqBody.hasOwnProperty("location") ? reqBody.location : [];
    reqBody.skill_designation_com = reqBody.hasOwnProperty("skill_designation_com") ? reqBody.skill_designation_com : [];
    reqBody.skills = reqBody.hasOwnProperty("skills") ? reqBody.skills : '';
    reqBody.industry = reqBody.hasOwnProperty("industry") ? reqBody.industry : [];
    reqBody.functional_area = reqBody.hasOwnProperty("functional_area") ? reqBody.functional_area : [];
    this.makeAnApiCall(reqBody);
    this.setState({filteredOptionRecieved: tempArray,});
  };

  /**
   * this function used by table pagination whenever page change this function calls
   * after page change this will call api to get details
   * @param event
   * @param page
   */
  handleChangePage = (event, page) => {
    this.setState({page: page}, () => {
      const {reqBody} = this.state;
      reqBody.pagination = page + 1;
      this.makeAnApiCall(reqBody);
    });
  };

  /**
   * this function used by table pagination whenever row per page change this function calls
   * after row per page change this will call api to get details
   * @param event
   */
  handleChangeRowsPerPage = event => {
    this.setState({page: 0, rowsPerPage: parseInt(event.target.value)}, () => {
      let reqBody = this.state.reqBody;
      reqBody.result_per_page = this.state.rowsPerPage;
      reqBody.pagination = 1;
      this.makeAnApiCall(reqBody);
    });
  };

  /**
   * after onclick this function redirect to job preview page
   * @param job
   * @returns {*}
   */
  jobDetails = (job) => this.props.history.push(`/jobs/${job.key}/job-preview`);

  /**
   * just dummy function
   */
  dummyFunction = () => {
  };

  /**
   * after clicking save job this function calls
   * after clicking api will call to save jobs
   * @param value1
   * @returns {Promise<void>}
   */
  saveJobs = async (value1) => {
    let flag = false;
    await this.state.jobList.forEach((value) => {
      if (value1 === value.key && value.saved) flag = true;
    });
    if (flag) {
      return;
    }
    const headers = {
      authorization: handleLocalStorage('get', 'employeeLogin'),
      'Content-Type': 'application/json',
    };
    const dataToSend = {};
    dataToSend.id = value1;
    apiCall('post', dataToSend, JOB_LISTING_SAVE_JOBS, headers).then(res => {
      toast(`${res.message}`, {});
      let JobListResult = this.state.jobList
      JobListResult.forEach((value) => {
        if (value1 === value.key) value.saved = !value.saved;
      });
      this.setState({jobList: JobListResult})
    });
  };

  /**
   * after clicking quick apply job this function calls and api will call to update in server database
   * @param job
   */
  quickApply = job => this.setState({job: job, openQuestionnaireDialog: true});

  /**
   * used to open questionnaire model for filling questionnaire answers by user if job having questionnaire
   */
  handleQuestionnaireDialog = () => this.setState({openQuestionnaireDialog: false});

  render() {
    const {classes, history} = this.props;
    const {rowsPerPage, page, counts, sort_by} = this.state;
    return (
      <div className="sub-user-page">
        <EmployeeSideNav history={history} selected={2}>
          <div>
            <div className="sub-user-wrapper px-20 px-sm-40 pb-20">
              <div className="sub-user-container">
                <div>
                  <div className="sub-user-text">Job Search</div>
                  <div className="sub-user-nav">
                    <Breadcrumbs
                      separator={<NavigateNextIcon fontSize="small"/>}
                      arial-label="Breadcrumb"
                    >
                      <Link color="inherit" href="#" onClick={this.handleNavigationClick}>
                        Jobs
                      </Link>
                      <Link color="inherit" href="#" onClick={this.handleNavigationClick}>
                        <CustomIcon text="Job Search" className="nav-create-a-job-text"/>
                      </Link>
                    </Breadcrumbs>
                  </div>
                </div>
              </div>
              <div className="search-type">
                <SearchType
                  updateSearch={(reqBody) => this.makeAnApiCallInitial(reqBody)}
                />
              </div>
              {!this.state.loading ? this.state.jobList && this.state.jobList.length > 0 ?
                <div className='search-job-card-text-filter-wrapper'>
                  <div className='pagination-total-count-container'>
                    <div className='total-pagination-sort-by-wrapper'>
                      <div className='sort-by-container'>
                        <FormControl className={classes.formControl} style={{width: '100%'}}>
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
                            name={"sort_by"}
                            getSelectedOption={(option) => this.setSortByOption(option)}
                            options={breakDurationList}
                            error={''}
                            isSearchable={false}
                            defaultValue={sort_by !== "" ? {value: sort_by, label: sort_by} : ''}
                            isClearable={false}
                            classes={classes.root}
                            style={{"margin": "0px"}}
                          />
                        </FormControl>
                      </div>
                      <div className='pagination-container'>
                        <TablePagination
                          rowsPerPageOptions={[20, 40, 60, 80, 100]}
                          labelDisplayedRows={({from, to, count}) => 'per page'}
                          colSpan={7}
                          count={this.state.counts.total_result}
                          rowsPerPage={rowsPerPage}
                          labelRowsPerPage="Showing"
                          page={page}
                          classes={{selectRoot: classes.selectRoot, menuItem: classes.menuItem}}
                          SelectProps={{native: true}}
                          style={{border: 'none', float: 'right'}}
                          onChangePage={this.handleChangePage}
                          onChangeRowsPerPage={this.handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActionsWrapped}
                          align="center"
                        />
                      </div>
                    </div>
                    <div className='total-result-job-applied-count-wrapper'>
                      <div className='total-result-count-container'>
                        <span>{`Total Results: ${counts.total_result ? counts.total_result : 0}`}</span>
                      </div>
                      <div className='today-applied-job-container'>
                        <span> {`${counts.applied_jobs_today ? counts.applied_jobs_today : 0} jobs applied today`}</span>
                      </div>
                    </div>
                  </div>
                  <div className='job-card-filter-by-container'>
                    <div className='job-card-container'>
                      {this.state.jobList.map((job, index) => (
                        <JobCard
                          jobListing={job}
                          applyJob={() => this.quickApply(job)}
                          saveJobs={(id) => this.saveJobs(id)}
                          sendToCards={this.state.jobList}
                          jobDetails={() => this.jobDetails(job)}
                          index={index}
                        />
                      ))}
                    </div>
                    <div className='filter-by-container'>
                      <div className='filter-by-body'>
                        <div className="filter-by-text">Filter By</div>
                        {this.state.filter_by.map((filter, index) => (
                          <div>
                            <FilterJobs
                              filterData={filter}
                              sendCheckedFilters={this.sendCheckedFilters}
                              updateSearch={() => this.dummyFunction()}
                              index={index}
                            />
                            <hr className="line-seperator"/>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div> :
                <div className="sorry-warning-message">
                  <div className='large-text'>Sorry, no results found with your search query.</div>
                  <div className="smallText">
                    Did you enter wrong spelling of any word? <br/>
                    Only cities names are accepted in location field <br/>
                    You can browse jobs by Functional Area, Industry, Company, Skills and Designations
                  </div>
                </div> : <LoadingIcon/>}
            </div>
          </div>
          {this.state.openQuestionnaireDialog ?
            <DialogQuestionnaire handleQuestionnairemodel={this.handleQuestionnaireDialog}
                                 changeButtonStatus={this.changeButtonStatus}
                                 openDialog={this.state.openQuestionnaireDialog} id={this.state.job.key}/> : null}
        </EmployeeSideNav>
      </div>
    );
  }
}

SearchJob.propTypes = {classes: PropTypes.object.isRequired,};

export default withStyles(styles)(SearchJob);
