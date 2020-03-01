//library dependency
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import TablePagination from "@material-ui/core/TablePagination";
import PropTypes from "prop-types";

//custom components
import CustomIcon from '../../../../components/CustomTag';
import InboxJobSeekerRight from './Component/InboxJobSeekerRight'
import InboxJobSeekerCard from './Component/InboxJobSeekerCard'
import EmployerSideNav from "../../../../components/EmployerSideNav/EmployerSideNav";
import LoadingIcon from "../../../../components/LoadingIcon/LoadingIcon";

//styles
import './styles.scss';

//utilities
import {apiCall, handleLocalStorage} from "../../../../Utilities";
import {EMPLOYER_APPLIED_PROFILES} from "../../../../../config/constants";

//used to override material ui custom component styles
const styles = theme => ({
  root: {justifyContent: 'center', flexWrap: 'wrap'},
  paper: {padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`},
  userTable: {boxShadow: 'none'},
  spacer: {flex: '1 1 50%', border: '1px solid black'},
  cssLabel: {color: '#656565 !important', fontSize: '14px', fontFamily: 'Roboto', fontWeight: 400},
  helperText: {
    color: '#656565', fontSize: '14px', fontFamily: 'Roboto', fontWeight: 'normal', fontStyle: 'normal',
    fontStretch: 'normal', lineHeight: 'normal', letterSpacing: 'normal'
  },
  selectRoot: {marginLeft: '6px', marginRight: '6px'}
});

// used to convert into title case
function titleCase(str) {
  return str.split(' ').map(function (val) {
    return val.charAt(0).toUpperCase() + val.substr(1).toLowerCase();
  }).join(' ');
}

//used to override material ui tablepagination component styles
const actionsStyles = theme => ({
  root: {flexShrink: 0, color: theme.palette.text.secondary, marginLeft: '24px'},
  spacer: {flex: '1 1 50%', border: '1px solid black'},
  selectRoot: {marginRight: '6px', marginLeft: '6px'}
});

class TablePaginationActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {page: props.page || props.page === 0 ? props.page : ''}
  }

  /**
   * on first page button click of pagination, send event through props
   * @param event
   * @returns {*}
   */
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0)
  };

  /**
   * on back page button click of pagination, send event through props
   * @param event
   * @returns {*}
   */
  handleBackButtonClick = event => {
    if (this.state.page - 1 >= 0) this.props.onChangePage(event, this.state.page - 1);
  };

  /**
   * on next page button click of pagination, send event through props
   * @param event
   * @returns {*}
   */
  handleNextButtonClick = event => {
    const lastPage = Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1);
    if (this.state.page + 1 <= lastPage) this.props.onChangePage(event, this.state.page + 1);
  };

  /**
   * on last page button click of pagination, send event through props
   * @param event
   * @returns {*}
   */
  handleLastPageButtonClick = event => {
    this.props.onChangePage(event, Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1));
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
    if (e.target.value === "" || e.target.value <= Math.ceil(this.props.count / this.props.rowsPerPage)) {
      this.setState({page: e.target.value ? parseInt(e.target.value) : null});
    }
  };

  /**
   * on enter key press send event through props
   * @param e
   */
  onEnterCheck = (e) => {
    if (this.state.page && e.key === 'Enter') this.props.onChangePage(e, this.state.page - 1);
  };

  render() {
    const {classes, count, page, rowsPerPage, theme} = this.props;
    return (
      <div className={classes.root}>
        <span
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
          className={screen.width < 480 ? "mr-12" : "mr-16"}
          style={{color: '#e73a9e', cursor: 'pointer'}}
        >
          {theme.direction === 'rtl' ? 'Last Page' : 'First Page'}
        </span>
        <span
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
          className={screen.width < 480 ? "mr-12" : "mr-16"}
          style={{color: '#e73a9e', cursor: 'pointer'}}
        >
          {theme.direction === 'rtl' ? 'Next' : 'Prev'}
        </span>
        <span className={screen.width < 480 ? "mr-12" : "mr-16"}>
          Page <input className="pagination-input-box" type='number' onKeyDown={this.onEnterCheck}
                      onChange={this.onPageChange} value={this.state.page + 1}/> of {Math.ceil(count / rowsPerPage)}
        </span>
        <span
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
          className={screen.width < 480 ? "mr-12" : "mr-16"}
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

class InboxJobSeeker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job_title: "",
      rows: [],
      page: 0,
      rowsPerPage: 20,
      total_card_count: 100,
      search_data: {},
      loading: false,
      from_date: "",
      to_date: "",
      current_ctc_max: "",
      current_ctc_min: "",
      expected_ctc_max: "",
      expected_ctc_min: "",
      experience_max: "",
      experience_min: "",
      status: [],
      search_text: "",
      organisation: [],
      location: [],
      card_result: []
    }
  }

  /**
   * after receiving page number in this function setting state value of page
   * after that calling employer inbox api
   * @param event
   * @param page
   */
  handleChangePage = (event, page) => {
    this.setState({page}, () => this.callEmployerInboxApi());
  };

  /**
   * this function sets state value for row per page
   * @param event
   */
  handleChangeRowsPerPage = event => {
    this.setState({page: 0, rowsPerPage: event.target.value}, () => this.callEmployerInboxApi())
  };

  /**
   * this function modify min, max of salary and experience to int in state data before sending in api params
   * after mofifying state data calling employer inbox api
   * @param data
   */
  handleSearchParameters = data => {
    this.setState({
      "current_ctc_max": data.current_ctc_max ? parseInt(data.current_ctc_max) : data.current_ctc_max,
      "current_ctc_min": data.current_ctc_min ? parseInt(data.current_ctc_min) : data.current_ctc_min,
      "expected_ctc_max": data.expected_ctc_max ? parseInt(data.expected_ctc_max) : data.expected_ctc_max,
      "expected_ctc_min": data.expected_ctc_min ? parseInt(data.expected_ctc_min) : data.expected_ctc_min,
      "experience_max": data.experience_max ? parseInt(data.experience_max) : data.experience_max,
      "experience_min": data.experience_min ? parseInt(data.experience_min) : data.experience_min,
      "from_date": data.from_date,
      "to_date": data.to_date,
      "status": data.status,
      "search_text": data.search_text,
      "organisation": data.organisation,
      "location": data.location
    }, () => this.callEmployerInboxApi())
  };


  componentDidMount() {
    /**
     * this function all employer inbox api will component did mount
     */
    this.callEmployerInboxApi();
  }

  /**
   * this is api call function, in this function we are calling employer inbox api and setting state data depends on response data
   * @returns {Promise<void>}
   */
  callEmployerInboxApi = async () => {
    this.setState({loading: true});
    let headers = {'authorization': handleLocalStorage('get', 'employerLogin'), 'Content-Type': 'application/json'};
    let all_status = false, all_status_location = false;
    for (let i = 0; i < this.state.organisation.length; i++) {
      if (this.state.organisation[i].value === "All") all_status = true;
    }
    for (let i = 0; i < this.state.location.length; i++) {
      if (this.state.location[i].value === "All") all_status_location = true;
    }
    const requestData = {
      "search_key": this.state.search_text,
      "start_date": this.state.from_date !== "" && this.state.from_date !== null && this.state.to_date !== "" && this.state.to_date !== null ? this.getFromDate(this.state.from_date) : "",
      "end_date": this.state.to_date !== "" && this.state.to_date !== null && this.state.from_date !== "" && this.state.from_date !== null ? this.getToDate(this.state.to_date) : "",
      "application_status": this.state.status,
      "location": all_status_location ? [] : this.state.location,
      "min_experience": this.state.experience_min,
      "max_experience": this.state.experience_max,
      "min_expected_salary": this.state.expected_ctc_min,
      "max_expected_salary": this.state.expected_ctc_max,
      "min_current_salary": this.state.current_ctc_min,
      "max_current_salary": this.state.current_ctc_max,
      "organization": all_status ? [] : this.state.organisation, // specific organisation to be searched, 0 for fresher, [] for all
      "results_per_page": this.state.rowsPerPage,
      "page": this.state.page + 1
    };
    try {
      const EmployerInboxData = await apiCall('post', requestData, EMPLOYER_APPLIED_PROFILES.replace("<job_id>", this.props.match.params.job_id), headers);
      if (EmployerInboxData.status) {
        this.setState({
          card_result: EmployerInboxData.data,
          total_card_count: EmployerInboxData.count,
          job_title: EmployerInboxData.job_title,
          loading: false
        })
      } else {
        this.setState({
          card_result: EmployerInboxData.data,
          total_card_count: EmployerInboxData.count,
          job_title: EmployerInboxData.job_title,
          loading: false
        })
      }
    }
    catch (e) {
    }
  };

  /**
   * this is convert any date to start date means time will be 00:00:00
   * @param timestamp
   * @returns {number}
   */
  getFromDate = (timestamp) => {
    let today = new Date(timestamp);
    let to_date = today.getDate();
    let to_month = today.getMonth() + 1;
    let to_year = today.getFullYear();
    let original_date = to_month + '-' + to_date + '-' + to_year + " 00:00:00";
    return new Date(original_date).getTime()
  };

  /**
   * this is convert any date to end date means time will be 23:59:59
   * @param timestamp
   * @returns {number}
   */
  getToDate = (timestamp) => {
    let today = new Date(timestamp);
    let to_date = today.getDate();
    let to_month = today.getMonth() + 1;
    let to_year = today.getFullYear();
    let original_date = to_month + '-' + to_date + '-' + to_year + " 23:59:59";
    return new Date(original_date).getTime()
  };

  /**
   * after clicking inbox name in breadcrumb it will redirect to inbox page
   * @constructor
   */
  InboxClickEvent = () => {
    this.props.history.push(this.props.match.url.replace(`employer-inbox/${this.props.match.params.job_id}`, `employer-inbox`))
  };

  render() {
    const {rowsPerPage, page, total_card_count, card_result, job_title, loading} = this.state;
    const {history} = this.props;
    return (
      <div className="inbox-jobseeker-page">
        <EmployerSideNav history={history} selected={3}>
          <div>
            <div className="inbox-jobseeker-auto-overflow">
              <div className="inbox-jobseeker-border-padding">
                <div className="head-text-padding inbox-jobseeker-text">{titleCase(job_title)}</div>
                <div className="head-text-padding inbox-jobseeker-nav">
                  <Breadcrumbs separator={<NavigateNextIcon fontSize="small"/>} arial-label="Breadcrumb">
                    <Link color="inherit" href="#" onClick={this.InboxClickEvent}>Inbox</Link>
                    <Link color="inherit" href="#" onClick={this.handleNavigationClick}><CustomIcon
                      text={titleCase(job_title)} className="nav-create-a-job-text"/></Link>
                  </Breadcrumbs>
                </div>
                <div className="inbox-jobseeker-right-container">
                  <div className="home-right-wraper">
                    <div className="inbox-jobseeker-pagination-content">
                      <TablePagination
                        rowsPerPageOptions={[20, 40, 60]}
                        colSpan={7}
                        count={total_card_count}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{native: true}}
                        onChangePage={(e, page) => this.handleChangePage(e, page)}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActionsWrapped}
                        align="center"
                        style={{"border": "none"}}
                        labelRowsPerPage="Showing cards per page"
                        labelDisplayedRows={({from, to, count}) => ` ${from}-${to} of ${count}`}
                      />
                    </div>
                    {
                      !loading ?
                        card_result.length === 0 ?
                          <div className="inbox-jobseeker-card-allignment">
                            <div className="no-message-card">Sorry, No result found with your search query.</div>
                          </div> :
                          <div className="inbox-jobseeker-card-allignment">
                            {card_result.map((data, index) => {
                              return <InboxJobSeekerCard {...this.props} key={index} data={data}/>
                            })}
                          </div>
                        :
                        <div><LoadingIcon/></div>
                    }
                  </div>
                  <div className="inbox-jobseeker-right-containers">
                    <InboxJobSeekerRight {...this.props} onSelectSearch={this.handleSearchParameters}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </EmployerSideNav>
      </div>
    );
  }
}

export default withStyles(styles)(InboxJobSeeker);
