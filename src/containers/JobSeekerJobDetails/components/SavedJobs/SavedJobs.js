//library dependencies
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormControl, InputLabel, Link, TablePagination, withStyles} from '@material-ui/core';
import {toast} from 'react-toastify';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
//styles
import './styles.scss';
//custom components
import CustomIcon from '../../../../components/CustomTag';
import FilterJobs from '../../../../components/FilterJobs/FilterJobs';
import EmployeeSideNav from '../../../../components/EmployeeSideNav';
import JobCard from '../../../../components/JobCard/JobCard';
import DialogQuestionnaire from '../../../../components/DialogQuestionnaire';
import NonCreatableSingleSelectDropdown from '../../../../components/SingleSelectDropdownWrapper/components/NonCreatableSingleSelectDropdown';
import LoadingIcon from "../../../../components/LoadingIcon";
//utilities
import {JOB_LISTING_SAVED_JOBS,} from '../../../../../config/constants';
import {apiCall, handleLocalStorage} from '../../../../Utilities';
//SavedJobs material ui theme customisations
const styles = theme => ({
  root: {justifyContent: 'center', flexWrap: 'wrap',},
  paper: {padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,},
  userTable: {boxShadow: 'none',},
  spacer: {flex: '1 1 50%', border: '1px solid black',},
  cssLabel: {
    color: '#656565 !important',
    fontSize: '14px',
    fontFamily: 'Roboto',
    fontWeight: 400,
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
  selectRoot: {}
});

// TablePaginationActions material ui theme customisations
const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: '0px',
    padding: '0px',
    '&>div': {padding: '0px !important'}
  },
  spacer: {},
  gutters: {padding: '0px'},
  caption: {display: 'none'}
});

/**
 * custom paginations component
 */
class TablePaginationActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {page: props.page || props.page === 0 ? props.page : ''}
  }

  /**
   * @function to handle first page click
   * @param event
   */
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  /**
   * @function to handle previous page click
   * @param event
   */
  handleBackButtonClick = event => {
    if (this.state.page - 1 >= 0) this.props.onChangePage(event, this.props.page - 1);
  };

  /**
   * @function to handle the next page click
   * @param event
   */
  handleNextButtonClick = event => {
    const lastPage = Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1);
    if (this.state.page + 1 <= lastPage) this.props.onChangePage(event, this.props.page + 1);
  };

  /**
   * @function to handle the last page click
   * @param event
   */
  handleLastPageButtonClick = event => {
    this.props.onChangePage(event, Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),);
  };

  componentWillReceiveProps(nextProps) {
    this.setState({page: nextProps.page || nextProps.page === 0 ? nextProps.page : ''});
  }

  /**
   * @function to update page number in the state
   * @param e
   */
  onPageChange = (e) => {
    if (e.target.value === "" || e.target.value < Math.ceil(this.props.count / this.props.rowsPerPage) || e.target.value === Math.ceil(this.props.count / this.props.rowsPerPage)) {
      this.setState({page: e.target.value ? parseInt(e.target.value) - 1 : null});
    }
  };

  /**
   * @function to update entered page number in the state
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

//oldest and latest filter data
const oldLatestFilterData = [{value: 'Latest', key: 1}, {value: 'Oldest', key: 2}];

class SavedJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type_of_user: 'jobSeeker',
      rowsPerPage: 20,
      reqBody: {},
      page: 0,
      sort_by: {},
      jobList: [],
      filter_by: [],
      filteredOptionRecieved: [],
      openQuestionnaireDialog: false,
      job: '',
      counts: " ",
      loading: false
    };
  }

  /**
   * @function to handle api call, manage filters
   * @param reqBody
   */
  makeAnApiCall = (reqBody) => {
    const headers = {
      authorization: handleLocalStorage('get', 'employeeLogin'),
      'Content-Type': 'application/json',
    };
    apiCall('post', reqBody, JOB_LISTING_SAVED_JOBS, headers).then(res => {
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
        if (reqBody.location && reqBody.location.length > 0) {
          for (let resIndex = 0; resIndex < responseArr.length; resIndex++) {
            if (responseArr[resIndex].title === 'Location') {
              let locationsArr = reqBody.location;
              for (let resValIndex = 0; resValIndex < responseArr[resIndex].values.length; resValIndex++) {
                for (let selValIndex = 0; selValIndex < locationsArr.length; selValIndex++) {
                  if (responseArr[resIndex].values[resValIndex].key === locationsArr[selValIndex].key || (responseArr[resIndex].values[resValIndex].hasOwnProperty("isChecked") && responseArr[resIndex].values[resValIndex].isChecked)) {
                    responseArr[resIndex].values[resValIndex]['isChecked'] = true;
                  } else {
                    responseArr[resIndex].values[resValIndex]['isChecked'] = false;
                  }
                }
              }
            }
          }
        }
        if (reqBody.industry && reqBody.industry.length > 0) {
          for (let resIndex = 0; resIndex < responseArr.length; resIndex++) {
            if (responseArr[resIndex].title === 'Industry') {
              let industryArr = reqBody.industry;
              for (let resValIndex = 0; resValIndex < responseArr[resIndex].values.length; resValIndex++) {
                for (let selValIndex = 0; selValIndex < industryArr.length; selValIndex++) {
                  if (responseArr[resIndex].values[resValIndex].key === industryArr[selValIndex].key || (responseArr[resIndex].values[resValIndex].hasOwnProperty("isChecked") && responseArr[resIndex].values[resValIndex].isChecked)) {
                    responseArr[resIndex].values[resValIndex]['isChecked'] = true;
                  } else {
                    responseArr[resIndex].values[resValIndex]['isChecked'] = false;
                  }
                }
              }
            }
          }
        }
        if (reqBody.functional_area && reqBody.functional_area.length > 0) {
          for (let resIndex = 0; resIndex < responseArr.length; resIndex++) {
            if (responseArr[resIndex].title === 'Functional Area') {
              let functionalAreaArr = reqBody.functional_area;
              for (let resValIndex = 0; resValIndex < responseArr[resIndex].values.length; resValIndex++) {
                for (let selValIndex = 0; selValIndex < functionalAreaArr.length; selValIndex++) {
                  if (responseArr[resIndex].values[resValIndex].key === functionalAreaArr[selValIndex].key || (responseArr[resIndex].values[resValIndex].hasOwnProperty("isChecked") && responseArr[resIndex].values[resValIndex].isChecked)) {
                    responseArr[resIndex].values[resValIndex]['isChecked'] = true;
                  } else {
                    responseArr[resIndex].values[resValIndex]['isChecked'] = false;
                  }
                }
              }
            }
          }
        }
        if (reqBody.hasOwnProperty('skills') && reqBody.skills && reqBody.skills.length > 0) {
          let skillsArr = reqBody.skills;
          for (let resIndex = 0; resIndex < responseArr.length; resIndex++) {
            for (let resValIndex = 0; resValIndex < responseArr[resIndex].values.length; resValIndex++) {
              for (let selValIndex = 0; selValIndex < skillsArr.length; selValIndex++) {
                if (responseArr[resIndex].values[resValIndex].name === skillsArr[selValIndex].value || (responseArr[resIndex].values[resValIndex].hasOwnProperty("isChecked") && responseArr[resIndex].values[resValIndex].isChecked)) {
                  responseArr[resIndex].values[resValIndex]['isChecked'] = true;
                } else {
                  responseArr[resIndex].values[resValIndex]['isChecked'] = false;
                }
              }
            }
          }
        }
        if (reqBody.min_salary && reqBody.min_salary.length > 0) {
          for (let resIndex = 0; resIndex < responseArr.length; resIndex++) {
            for (let resValIndex = 0; resValIndex < responseArr[resIndex].values.length; resValIndex++) {
              if (responseArr[resIndex].values[resValIndex] === 'Salary') {
                for (let selValIndex = 0; selValIndex < skillsArr.length; selValIndex++) {
                  if (responseArr[resIndex].values[resValIndex].name === skillsArr[selValIndex].value || (responseArr[resIndex].values[resValIndex].hasOwnProperty("isChecked") && responseArr[resIndex].values[resValIndex].isChecked)) {
                    responseArr[resIndex].values[resValIndex]['isChecked'] = true;
                  } else {
                    responseArr[resIndex].values[resValIndex]['isChecked'] = false;
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
   * @function to handle api call
   * @param reqBody
   */
  makeInitialApiCall = (reqBody) => {
    this.setState({loading: true});
    const headers = {
      authorization: handleLocalStorage('get', 'employeeLogin'),
      'Content-Type': 'application/json',
    };
    apiCall('post', reqBody, JOB_LISTING_SAVED_JOBS, headers).then(res => {
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
    const dataToBeSend = {};
    dataToBeSend.result_per_page = 5;
    dataToBeSend.pagination = this.state.page + 1;
    dataToBeSend.is_advanced = false;
    dataToBeSend.skill_designation_com = '';
    dataToBeSend.location = [];
    dataToBeSend.min_exp = '';
    dataToBeSend.sort = 'date';
    dataToBeSend.min_salary = '';
    dataToBeSend.filter_by = [];
    this.makeInitialApiCall(dataToBeSend);
  }

  /**
   * @function to handle sort by dropdown change
   * @param option
   */
  setSortByOption = (option) => {
    const {reqBody} = this.state;
    reqBody.sort = option.label.toLowerCase();
    this.makeAnApiCall(reqBody);
    this.setState({sort_by: option});
  };

  changeButtonStatus = () => {
    this.makeAnApiCall(this.state.reqBody);
  };

  /**
   * @function to handle input field changes
   * @param event
   */
  handleChange = event => {
    const {reqBody} = this.state;
    reqBody.sort = event.target.value;
    this.makeAnApiCall(reqBody);
    this.setState({[event.target.name]: event.target.value});
  };

  /**
   * @function to handle checkbox changes in filter by
   * @param modifiedFilter
   */
  sendCheckedFilters = (modifiedFilter) => {
    const tempArray = this.state.filteredOptionRecieved;
    if (this.state.filteredOptionRecieved.length === 0) {
      tempArray.push(modifiedFilter);
    }
    else {
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
      if (!flag) {
        tempArray.push(modifiedFilter);
      }
    }
    const {reqBody} = this.state;
    reqBody.filter_by = tempArray;
    reqBody.location = [];
    reqBody.skill_designation_com = [];
    reqBody.skills = "";
    reqBody.industry = [];
    reqBody.functional_area = [];
    this.makeAnApiCall(reqBody);
    this.setState({
      filteredOptionRecieved: tempArray,
    });
  };

  /**
   * @function to make an api call while page change
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
   * to close modal
   */
  handleClose = () => this.setState({otpModal: false});

  /**
   * handle redirection
   * @param job
   */
  jobDetails = (job) => this.props.history.push(`/jobs/${job.key}/job-preview`);

  dummyFunction = () => {};

  saveJobs = () => {
    const headers = {
      authorization: handleLocalStorage('get', 'employeeLogin'),
      'Content-Type': 'application/json',
    };
    const dataToSend = {};
    dataToSend.id = '';
    apiCall('post', dataToSend, JOB_LISTING_SAVE_JOBS, headers).then(res => {
      toast(`${res.message}`, {});
    });
  };

  /**
   * @function to handle the click of quick apply
   * @param job
   */
  quickApply = job => this.setState({job: job, openQuestionnaireDialog: true});

  /**
   * close questionnaire dialog
   */
  handleQuestionnaireDialog = () => this.setState({openQuestionnaireDialog: false});

  render() {
    const {classes, history} = this.props;
    const {rowsPerPage, page, counts} = this.state;

    return (

      <div className="sub-user-page">
        <EmployeeSideNav history={history} selected={2}>
          <div>
            <div className="sub-user-wrapper px-20 px-sm-40 pb-20">
              <div className="sub-user-container">
                <div>
                  <div className="sub-user-text">Saved Jobs</div>
                  <div className="sub-user-nav">
                    <Breadcrumbs
                      separator={<NavigateNextIcon fontSize="small"/>}
                      arial-label="Breadcrumb"
                    >
                      <Link color="inherit" href="#" onClick={this.handleNavigationClick}>
                        Jobs
                      </Link>
                      <Link color="inherit" href="#" onClick={this.handleNavigationClick}>
                        <CustomIcon text="Saved jobs" className="nav-create-a-job-text"/>
                      </Link>
                    </Breadcrumbs>
                  </div>
                </div>
              </div>
              <div className="saved-jobs-inner-wrapper">
                <div className="saved-job-selector-wrapper">
                  <div className='status-pagination-wrapper'>
                    <div className="saved-jobs-detail-present table-and-text-css-text">
                      Current Date to Last 90 days jobs shall be present
                    </div>
                    <div className='table-and-text-css-table'>
                      <TablePagination
                        classes={{selectRoot: classes.selectRoot}}
                        disableGutters={true}
                        style={{border: 'none', float: 'right'}}
                        labelRowsPerPage=''
                        labelDisplayedRows={({from, to, count}) => ''}
                        rowsPerPageOptions={[]}
                        colSpan={7}
                        count={this.state.counts.total_result}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          native: true,
                        }}
                        onChangePage={this.handleChangePage}
                        ActionsComponent={TablePaginationActionsWrapped}
                        align="center"
                      />
                    </div>
                  </div>
                  <div className='total-result-sort-by-wrapper'>
                    <div className='total-result-container'>
                      <div className="text-total-count">
                        <span className="total-result-title">Total Results:</span>
                        <span> {counts.total_result}</span>
                      </div>
                    </div>
                    <div className='sort-by-container'>
                      <FormControl className={classes.formControl} style={{width: '100%'}}>
                        <InputLabel
                          style={{marginTop: '-13px'}}
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
                          options={oldLatestFilterData}
                          defaultValue={this.state.sort_by}
                          error={''}
                          isSearchable={false}
                          isClearable={false}
                        />
                      </FormControl>
                    </div>
                  </div>
                </div>
                <div className='card-filter-by-wrapper'>
                  <div className='card-container-wrapper'>
                    {!this.state.loading ? this.state.jobList.length > 0 ? this.state.jobList.map((job, index) => (
                      <JobCard
                        jobListing={job}
                        saved={true}
                        applyJob={() => this.quickApply(job)}
                        saveJobs={() => this.saveJobs()}
                        sendToCards={this.state.jobList}
                        jobDetails={() => this.jobDetails(job)}
                      />
                    )) : <div className="sorry-warning-message" style={{height: '60vh'}}>
                      <h3>Sorry, No data found </h3>
                    </div> : <LoadingIcon/>}
                  </div>
                  <div className='filter-by-container-wrapper'>
                    <div className="filter-container px-20 py-20 mb-20 padding-top-0">
                      <div className="filter_by">Filter By</div>
                      {this.state.filter_by.map((filter, index) => (
                        <div>
                          <FilterJobs
                            filterData={filter}
                            sendCheckedFilters={this.sendCheckedFilters}
                            updateSearch={() => this.dummyFunction()}
                          />
                          <hr className="line-seperator"/>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
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

export default withStyles(styles)(SavedJobs);
