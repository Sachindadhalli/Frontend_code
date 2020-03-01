//library dependency
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PropTypes from 'prop-types';
import TablePagination from '@material-ui/core/TablePagination';

//custom components
import CustomIcon from '../../../../components/CustomTag';
import EmployerSideNav from '../../../../components/EmployerSideNav/EmployerSideNav';
import EmployerInboxDetailsCard from './Component/EmployerInboxDetailsCard';
import EmployerInboxDetailsSearchCard from './Component/EmployerInboxDetailsSearchCard';
import LoadingIcon from '../../../../components/LoadingIcon/LoadingIcon';

//styles
import './styles.scss';

//utilities
import {apiCall, handleLocalStorage} from '../../../../Utilities';
import {EMPLOYER_INBOX_HOME} from '../../../../../config/constants';

//used to override material ui custom componet styles
const styles = theme => ({
  root: {justifyContent: 'center', flexWrap: 'wrap'},
  paper: {padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`},
  userTable: {boxShadow: 'none'},
  spacer: {flex: '1 1 50%', border: '1px solid black'},
  cssLabel: { color: '#656565 !important',  fontSize: '14px', fontFamily: 'Roboto', fontWeight: 400, },
  helperText: { color: '#656565', fontSize: '14px', fontFamily: 'Roboto', fontWeight: 'normal', fontStyle: 'normal',
    fontStretch: 'normal', lineHeight: 'normal', letterSpacing: 'normal',},
  selectRoot: {marginLeft: '6px', marginRight: '6px'},
});

//used to overrides table pagination styles
const actionsStyles = theme => ({
  root: {flexShrink: 0, color: theme.palette.text.secondary, marginLeft: '24px'},
  spacer: {flex: '1 1 50%', border: '1px solid black'},
  selectRoot: {marginRight: '6px', marginLeft: '6px'},
});

class TablePaginationActions extends Component {
  constructor(props) {
    super(props);
    this.state = {page: props.page || props.page === 0 ? props.page : ''};
  }

  /**
   * on first page button click of pagination, send event through props
   * @param event
   * @returns {*}
   */
  handleFirstPageButtonClick = event => this.props.onChangePage(event, 0);

  /**
   * on back page button click of pagination, send event through props
   * @param event
   */
  handleBackButtonClick = event => {
    if (this.state.page - 1 >= 0) this.props.onChangePage(event, this.state.page - 1);
  };

  /**
   * on next page button click of pagination, send event through props
   * @param event
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
  handleLastPageButtonClick = event =>
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );

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
  onPageChange = e => {
    if (
      e.target.value === '' ||
      e.target.value <= Math.ceil(this.props.count / this.props.rowsPerPage)
    )
      this.setState({page: e.target.value ? parseInt(e.target.value) : null});
  };

  /**
   * on enter key press send event through props
   * @param e
   */
  onEnterCheck = e => {
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
          className={screen.width < 480 ? 'mr-12' : 'mr-16'}
          style={{color: '#e73a9e', cursor: 'pointer'}}
        >
          {theme.direction === 'rtl' ? 'Last Page' : 'First Page'}
        </span>
        <span
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
          className={screen.width < 480 ? 'mr-12' : 'mr-16'}
          style={{color: '#e73a9e', cursor: 'pointer'}}
        >
          {theme.direction === 'rtl' ? 'Next' : 'Prev'}
        </span>
        <span className={screen.width < 480 ? 'mr-12' : 'mr-16'}>
          Page{' '}
          <input
            className="pagination-input-box"
            type="number"
            onKeyDown={this.onEnterCheck}
            onChange={this.onPageChange}
            value={this.state.page + 1}
          />{' '}
          of {Math.ceil(count / rowsPerPage)}
        </span>
        <span
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
          className={screen.width < 480 ? 'mr-12' : 'mr-16'}
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

class EmployerInboxDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      page: 0,
      rowsPerPage: 20,
      total_card_count: 0,
      search_text: '',
      from_date: '',
      to_date: '',
      loading: false,
      inbox_data: [],
    };
  }

  /**
   * on page change in pagination, set page number in state and call api to get details
   * @param event
   * @param page
   */
  handleChangePage = (event, page) => this.setState({page}, () => this.callEmployerInboxApi());

  /**
   * on rows per page change in pagination, set row per page number in state and call api to get details
   * @param event
   */
  handleChangeRowsPerPage = event =>
    this.setState({page: 0, rowsPerPage: event.target.value}, () => this.callEmployerInboxApi());

  /**
   * on change search text, from date and to date in search component call api here to reflect details
   * @param data
   */
  handleSearchParameters = data =>
    this.setState(
      {search_text: data.search_text, from_date: data.from_date, to_date: data.to_date},
      () => this.callEmployerInboxApi(),
    );


  componentDidMount() {
    /**
     * on component did mount call api to get details from server
     */
    this.callEmployerInboxApi();
  }

  /**
   * this api call function to call api and get employer inbox details to reflect in ui
   * @returns {Promise<void>}
   */
  callEmployerInboxApi = async () => {
    this.setState({loading: true});
    let headers = {
      authorization: handleLocalStorage('get', 'employerLogin'),
      'Content-Type': 'application/json',
    };
    try {
      const requestData = {
        job_title: this.state.search_text,
        applied_on_from:
          this.state.from_date !== '' &&
          this.state.from_date !== null &&
          this.state.to_date !== '' &&
          this.state.to_date !== null
            ? this.getFromDate(this.state.from_date)
            : '',
        applied_on_to:
          this.state.to_date !== '' &&
          this.state.to_date !== null &&
          this.state.from_date !== '' &&
          this.state.from_date !== null
            ? this.getToDate(this.state.to_date)
            : '',
        results_per_page:
          this.state.rowsPerPage !== '' ? parseInt(this.state.rowsPerPage) : this.state.rowsPerPage,
        page: this.state.page + 1,
      };
      const EmployerInboxData = await apiCall('post', requestData, EMPLOYER_INBOX_HOME, headers);
      if (EmployerInboxData.status)
        this.setState({
          inbox_data: EmployerInboxData.data,
          total_card_count: EmployerInboxData.count,
          loading: false,
        });
      else
        this.setState({
          inbox_data: EmployerInboxData.data,
          total_card_count: EmployerInboxData.count,
          loading: false,
        });
    } catch (e) {
    }
  };

  /**
   * this is convert any date to start date means time will be 00:00:00
   * @param timestamp
   * @returns {number}
   */
  getFromDate = timestamp => {
    let today = new Date(timestamp);
    let to_date = today.getDate();
    let to_month = today.getMonth() + 1;
    let to_year = today.getFullYear();
    let original_date = to_month + '-' + to_date + '-' + to_year + ' 00:00:00';
    return new Date(original_date).getTime();
  };

  /**
   * this is convert any date to end date means time will be 23:59:59
   * @param timestamp
   * @returns {number}
   */
  getToDate = timestamp => {
    let today = new Date(timestamp);
    let to_date = today.getDate();
    let to_month = today.getMonth() + 1;
    let to_year = today.getFullYear();
    let original_date = to_month + '-' + to_date + '-' + to_year + ' 23:59:59';
    return new Date(original_date).getTime();
  };

  render() {
    const {rowsPerPage, page, total_card_count, loading, inbox_data} = this.state;
    const {history, classes} = this.props;
    return (
      <div className="employer-inbox-page">
        <EmployerSideNav history={history} selected={3}>
          <div>
            <div className="employer-inbox-auto-overflow">
              <div className="employer-inbox-border-padding">
                <div className="head-text-padding employer-inbox-text">Inbox</div>
                <div className="head-text-padding employer-inbox-nav">
                  <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small"/>}
                    arial-label="Breadcrumb"
                  >
                    <Link color="inherit" href="#" onClick={this.handleNavigationClick}>
                      <CustomIcon text="Inbox" className="nav-create-a-job-text"/>
                    </Link>
                  </Breadcrumbs>
                </div>
                <div>
                  <EmployerInboxDetailsSearchCard onSelectSearch={this.handleSearchParameters}/>
                </div>
                <div className="pagination-alignment">
                  <TablePagination
                    rowsPerPageOptions={[20, 40, 60, 80]}
                    labelDisplayedRows={({from, to, count}) => 'per page'}
                    colSpan={7}
                    count={total_card_count}
                    rowsPerPage={rowsPerPage}
                    labelRowsPerPage="Showing"
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
                {!loading ? (
                  inbox_data.length === 0 ? (
                    <div className="employer-inbox-right-container">
                      <div className="no-message-card">
                        Sorry, No result found with your search query.{' '}
                      </div>
                    </div>
                  ) : (
                    <div className="employer-inbox-right-container">
                      {inbox_data.map((value, index) => {
                        return (
                          <EmployerInboxDetailsCard data={value} key={index} {...this.props} />
                        );
                      })}
                    </div>
                  )
                ) : (
                  <div className="employer-inbox-right-container">
                    <div>
                      <LoadingIcon/>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </EmployerSideNav>
      </div>
    );
  }
}

export default withStyles(styles)(EmployerInboxDetails);
