//library dependencies
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles, Link, FormControl, InputLabel, TablePagination} from '@material-ui/core';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {toast} from 'react-toastify';

//style
import './style.scss';

//custom component
import CustomIcon from '../../components/CustomTag';
import FilterJobs from '../../components/FilterJobs/FilterJobs';
import EmployerSideNav from '../../components/EmployerSideNav';
import Employercard from '../../components/JobCard/Employercard';
import LoadingIcon from "../../components/LoadingIcon";

//utilities
import {apiCall, handleLocalStorage} from '../../Utilities';
import DialogQuestionnaire from '../../components/DialogQuestionnaire';
import {EMPLOYER_GET_SAVED_JOBS} from '../../../config/constants';
import NonCreatableSingleSelectDropdown
  from '../../components/SingleSelectDropdownWrapper/components/NonCreatableSingleSelectDropdown';

//customised material ui style
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
  selectRoot: {marginLeft: '6px', marginRight: '6px'}
});

//customised material ui style
const actionsStyles = theme => ({
  root: {flexShrink: 0, color: theme.palette.text.secondary, marginLeft: '24px'},
  spacer: {flex: '1 1 50%', border: '1px solid black',},
  selectRoot: {marginRight: '6px', marginLeft: '6px'}
});

//Table Pagination
class TablePaginationActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: props.page || props.page == 0 ? props.page : '',
    }
  }

  // on click of First page button
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  // on click of previous page button
  handleBackButtonClick = event => {
    if (this.state.page - 1 >= 0)
      this.props.onChangePage(event, this.props.page - 1);
  };

  // on click of Next page button
  handleNextButtonClick = event => {
    const lastPage = Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1);
    if (this.state.page + 1 <= lastPage)
      this.props.onChangePage(event, this.props.page + 1);
  };

  //on click of last page button
  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  componentWillReceiveProps(nextProps) {
    //on change in page, receiving next props
    this.setState({page: nextProps.page || nextProps.page == 0 ? nextProps.page : ''});
  }

  /**
   * on change in page ,validate the page
   * @param e
   */
  onPageChange = (e) => {
    if (e.target.value == "" || e.target.value < Math.ceil(this.props.count / this.props.rowsPerPage) || e.target.value == Math.ceil(this.props.count / this.props.rowsPerPage)) {
      this.setState({page: e.target.value ? parseInt(e.target.value) - 1 : null});
    }
  };

  /**
   * handeling the Enter key
   * @param e
   */
  onEnterCheck = (e) => {
    if ((this.state.page || this.state.page == 0) && e.key == 'Enter')
      this.props.onChangePage(e, this.state.page,);
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

const breakDurationList = [{value: 'Newest', key: 1}, {value: 'Oldest', key: 2}]


class EmployerSavedJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type_of_user: 'employer',
      rowsPerPage: 10,
      reqBody: {},
      page: 0,
      sort_by: {label: 'Newest', value: 1},
      jobList: [],
      filter_by: [],
      filteredOptionRecieved: [],
      openQuestionnaireDialog: false,
      job: '',
      counts: " ",
      loading: false,
    };
  }

  /**
   * To get the data filter by from an api
   * @param reqBody
   */
  makeAnApiCall = (reqBody) => {
    const headers = {
      authorization: handleLocalStorage('get', 'employerLogin'),
      'Content-Type': 'application/json',
    };
    apiCall('post', reqBody, EMPLOYER_GET_SAVED_JOBS, headers).then(res => {
      if (res.status) {
        let responseArr = res.data.filter_by;
        let filteredArr = this.state.filteredOptionRecieved;
        if (this.state.filteredOptionRecieved.length > 0) {
          for (let resIndex = 0; resIndex < responseArr.length; resIndex++) {
            for (let selIndex = 0; selIndex < filteredArr.length; selIndex++) {
              if (responseArr[resIndex].title == filteredArr[selIndex].title) {
                for (let resValIndex = 0; resValIndex < responseArr[resIndex].values.length; resValIndex++) {
                  for (let selValIndex = 0; selValIndex < filteredArr[selIndex].values.length; selValIndex++) {
                    if (responseArr[resIndex].values[resValIndex].key == filteredArr[selIndex].values[selValIndex].key || (responseArr[resIndex].values[resValIndex].hasOwnProperty("isChecked") && responseArr[resIndex].values[resValIndex].isChecked)) {
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
            if (responseArr[resIndex].title == 'Location') {
              let locationsArr = reqBody.location;
              for (let resValIndex = 0; resValIndex < responseArr[resIndex].values.length; resValIndex++) {
                for (let selValIndex = 0; selValIndex < locationsArr.length; selValIndex++) {
                  if (responseArr[resIndex].values[resValIndex].key == locationsArr[selValIndex].key || (responseArr[resIndex].values[resValIndex].hasOwnProperty("isChecked") && responseArr[resIndex].values[resValIndex].isChecked)) {
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
            if (responseArr[resIndex].title == 'Industry') {
              let industryArr = reqBody.industry;
              for (let resValIndex = 0; resValIndex < responseArr[resIndex].values.length; resValIndex++) {
                for (let selValIndex = 0; selValIndex < industryArr.length; selValIndex++) {
                  if (responseArr[resIndex].values[resValIndex].key == industryArr[selValIndex].key || (responseArr[resIndex].values[resValIndex].hasOwnProperty("isChecked") && responseArr[resIndex].values[resValIndex].isChecked)) {
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
            if (responseArr[resIndex].title == 'Functional Area') {
              let functionalAreaArr = reqBody.functional_area;
              for (let resValIndex = 0; resValIndex < responseArr[resIndex].values.length; resValIndex++) {
                for (let selValIndex = 0; selValIndex < functionalAreaArr.length; selValIndex++) {
                  if (responseArr[resIndex].values[resValIndex].key == functionalAreaArr[selValIndex].key || (responseArr[resIndex].values[resValIndex].hasOwnProperty("isChecked") && responseArr[resIndex].values[resValIndex].isChecked)) {
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
            // for (let selIndex = 0; selIndex < skillsArr.length; selIndex++) {
            for (let resValIndex = 0; resValIndex < responseArr[resIndex].values.length; resValIndex++) {
              for (let selValIndex = 0; selValIndex < skillsArr.length; selValIndex++) {
                if (responseArr[resIndex].values[resValIndex].name == skillsArr[selValIndex].value || (responseArr[resIndex].values[resValIndex].hasOwnProperty("isChecked") && responseArr[resIndex].values[resValIndex].isChecked)) {
                  responseArr[resIndex].values[resValIndex]['isChecked'] = true;
                } else {
                  responseArr[resIndex].values[resValIndex]['isChecked'] = false;
                }
                // }
              }
            }
          }
        }
        if (reqBody.min_salary && reqBody.min_salary.length > 0) {
          for (let resIndex = 0; resIndex < responseArr.length; resIndex++) {
            for (let resValIndex = 0; resValIndex < responseArr[resIndex].values.length; resValIndex++) {
              if (responseArr[resIndex].values[resValIndex] == 'Salary') {
                for (let selValIndex = 0; selValIndex < skillsArr.length; selValIndex++) {
                  if (responseArr[resIndex].values[resValIndex].name == skillsArr[selValIndex].value || (responseArr[resIndex].values[resValIndex].hasOwnProperty("isChecked") && responseArr[resIndex].values[resValIndex].isChecked)) {
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
          loading: false,
        });
      }
    });
  };
  /**
   * To get the all the drafted jobs from an api
   * @param reqBody
   */
  makeInitialApiCall = (reqBody) => {
    this.setState({loading: true})
    const headers = {
      authorization: handleLocalStorage('get', 'employerLogin'),
      'Content-Type': 'application/json',
    };
    apiCall('post', reqBody, EMPLOYER_GET_SAVED_JOBS, headers).then(res => {
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

    //initially getting the draft jobs,sending initial data
    const dataToBeSend = {};
    dataToBeSend.result_per_page = 10;
    dataToBeSend.pagination = this.state.page + 1;
    dataToBeSend.sort = true;
    dataToBeSend.filter_by = [];
    this.makeInitialApiCall(dataToBeSend);
  }

  /**
   * on change the sort
   * @param option
   */
  setSortByOption = (option) => {
    const dataToBeSend = {};
    dataToBeSend.result_per_page = 10;
    dataToBeSend.pagination = this.state.page + 1;
    dataToBeSend.sort = true;
    dataToBeSend.filter_by = [];
    if (option.label === 'Newest') {
      dataToBeSend.sort = true;
    }
    else {
      dataToBeSend.sort = false;
    }
    this.makeAnApiCall(dataToBeSend);
    this.setState({sort_by: option});
  };

  /**
   * on change in the FIlter from an api
   * @param modifiedFilter
   */
  sendCheckedFilters = (modifiedFilter) => {
    const tempArray = this.state.filteredOptionRecieved;
    if (this.state.filteredOptionRecieved.length == 0) {
      tempArray.push(modifiedFilter);
    } else {
      let flag = false;
      this.state.filteredOptionRecieved.map((option, index) => {
        if (modifiedFilter.title == option.title && modifiedFilter.values.length == 0) {
          tempArray.splice(index, 1);
          flag = true;
        }
        if (modifiedFilter.title == option.title && modifiedFilter.values.length > 0) {
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
   * on click of next page ,calling a function to get the data from an api
   */
  handleChangePage = (event, page) => {
    this.setState({loading: true})
    this.setState({page: page}, () => {
      const {reqBody} = this.state;
      reqBody.pagination = page + 1;
      this.makeAnApiCall(reqBody);
    });
  };

  /**
   * TO handle the rows per page in table pagination
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

  jobDetails = (job) => {
    this.props.history.push(`/jobs/${job.key}/job-preview`);
  };
  /**
   * On click of Edit button ,redirecting the create job page
   * @param job
   */
  editJob = (job) => {
    console.log(job.key)
    debugger
    this.props.history.push(this.props.match.url.replace('/employer-saved-jobs', '/create-a-job/' + job.key))
  };

  render() {
    const {classes, history} = this.props;
    const {rowsPerPage, page} = this.state;
    return (
      <div className="sub-user-page">
        <EmployerSideNav history={history} selected={2}>
          <div>
            <div className="sub-user-wrapper px-20 px-sm-40 pb-20">
              <div className="sub-user-container">
                <div>
                  <div className="sub-user-text">Drafted Jobs</div>
                  <div className="sub-user-nav">
                    <Breadcrumbs
                      separator={<NavigateNextIcon fontSize="small"/>}
                      arial-label="Breadcrumb"
                    >
                      <Link color="inherit" href="#" onClick={this.handleNavigationClick}>
                        Jobs
                      </Link>
                      <Link color="inherit" href="#" onClick={this.handleNavigationClick}>
                        <CustomIcon text="Drafted jobs" className="nav-create-a-job-text"/>
                      </Link>
                    </Breadcrumbs>
                  </div>
                </div>
              </div>
              {!this.state.loading ? <div>
                {this.state.jobList && this.state.jobList.length > 0 ?
                  <div className="py-32" style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{display: 'flex', flexDirection: 'column'}} className="search-job-cards-wrapper">
                      <div
                        className="pb-16"
                        style={{display: 'flex', justifyContent: 'space-between'}}
                      >
                        <div className="saved-jobs-detail-present">
                          Current Date to Last 90 days jobs shall be present
                        </div>
                        <div>
                          <TablePagination
                            rowsPerPageOptions={[]}
                            labelDisplayedRows={({from, to, count}) => ''}
                            colSpan={7}
                            count={this.state.counts.total_result}
                            rowsPerPage={rowsPerPage}
                            labelRowsPerPage=''
                            page={page}
                            classes={{selectRoot: classes.selectRoot}}
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
                      </div>
                      <div>
                        {this.state.jobList.map((job, index) => (
                          <Employercard
                            jobListing={job}
                            sendToCards={this.state.jobList}
                            jobDetails={() => this.jobDetails(job)}
                            draftedJobs={true}
                            editJob={() => this.editJob(job)}
                          />
                        ))}
                      </div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '29px', alignItems: 'flex-end'}}
                         className="search-job-sidebar">
                      <div style={{width: '50%', marginBottom: '35px'}}>
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
                            options={breakDurationList}
                            defaultValue={this.state.sort_by}
                            error={''}
                            isSearchable={false}
                            isClearable={false}
                          />
                        </FormControl>
                      </div>
                      <div className="filter-container px-20 py-20 mb-20">
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
                  :
                  <div className="sorry-warning-message">
                    <h3>Sorry, No data found </h3>
                  </div>
                }
              </div> : <LoadingIcon/>}
            </div>
          </div>
        </EmployerSideNav>
      </div>
    );
  }
}

export default withStyles(styles)(EmployerSavedJobs);
