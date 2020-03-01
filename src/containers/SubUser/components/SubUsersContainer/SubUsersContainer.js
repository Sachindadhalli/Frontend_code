//library dependency
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {Fab, Link, withStyles} from '@material-ui/core';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
//styles
import './styles.scss';
//custom components
import EmployerSideNav from '../../../../components/EmployerSideNav';
import SubUsersTableComponent from '../SubUsersTableComponent/SubUsersTableComponent';
import CustomIcon from '../../../../components/CustomTag';
//utilities
import * as subUserActons from '../../actions';
import {getSubUsersList} from '../../selectors';

//Material ui theme customizations
const styles = theme => ({
  root: {justifyContent: 'center', flexWrap: 'wrap',},
  paper: {padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,},
  userTable: {boxShadow: 'none'}
});

//Selected tab styles
const selectedButtton = {
  background: 'linear-gradient(105deg, #f0582b, #ec0586)',
  color: '#ffffff',
  fontWeight: 500,
};

//Unselected tab styles
const unSelectedButton = {color: '#e73a9e',};

/**
 * This container used to show the type of subusers.
 */
class SubUsersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: 0,
      currently_opened_tab: 'active',
      rows: [],
      pagNo: 0,
      rowsPerPage: 5,
      actionConformation: false,
      deletedUser: '',
      actionType: '',
      table_headers: {}, // table column header in a table
      count: {
        active_count: 0, // default count of active subusers
        deleted_count: 0, // default count of deleted subusers
        suspended_count: 0 // default count of suspended subusers
      }
    };
  }

  //Default page number
  pageNo = 0;

  //Default limit to show number of subusers in a table
  limit = 10;

  //@function to make an api call to get subusers list
  getSubUsersListApi = () => {
    let status = this.state.currently_opened_tab;
    let reqBody = {limit: this.limit, page: this.pageNo + 1, status: status};
    //Dispatch the redux action to get api call
    this.props.getSubUsersList(reqBody);
  };

  componentWillMount() {
    this.getSubUsersListApi();
  }

  /**
   * @function to redirect the add new subuser page
   */
  navigateToUser = () => this.props.history.push(`${this.props.match.url}/user`);

  /**
   * on change of active, deleted and suspended tabs,
   * get the subusers list of respective tab by making api call
   * @param activeTab
   */
  changeUserList = (activeTab) => {
    this.setState({currently_opened_tab: activeTab,}, () => {
      this.getSubUsersListApi()
    })
  };

  /**
   * @function to get updated subusers list on delete or suspend a subuser
   * @param {boolean} status: flag to make an api call or not
   */
  getUpdatedList = (status) => {
    if (status) this.getSubUsersListApi()
  };

  componentWillReceiveProps(nextProps) {
    //Update counts of active, suspended and deleted subusers
    const {count} = this.state;
    count.active_count = nextProps.subUsersData.activeCount;
    count.suspended_count = nextProps.subUsersData.suspendCount;
    count.deleted_count = nextProps.subUsersData.deleteCount;
  }

  render() {
    const {classes, history} = this.props;
    const {currently_opened_tab, count} = this.state;
    return (
      <div className="sub-user-page">
        <EmployerSideNav history={history} selected={4}>
          <div className="sub-user-wrapper sub-user-responsive-wrapper px-20 px-sm-40 pb-20">
            <div className="sub-user-container">
              <div>
                <div className="sub-user-text">Sub Users</div>
                <div className="sub-user-nav">
                  <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small"/>} arial-label="Breadcrumb"
                  >
                    <Link color="inherit" href="#" onClick={this.handleNavigationClick}>
                      Profile
                    </Link>
                    <Link color="inherit" href="#" onClick={this.handleNavigationClick}>
                      <CustomIcon text="Sub Users" className="nav-create-a-job-text"/>
                    </Link>
                  </Breadcrumbs>
                </div>
              </div>
              <Fab variant="extended" size="medium" aria-label="Add" className="save" onClick={this.navigateToUser}>
                Add Sub User
              </Fab>
            </div>
            <div className="sub-users-list">
              <div className="sub-user-list-inner-div">
                <div className="sub-users-list-text">Sub Users List</div>
                <div className="create-job-buttons">
                  <div
                    className="sub-user-active-button"
                    style={currently_opened_tab === 'active' ? selectedButtton : unSelectedButton}
                    onClick={() => this.changeUserList('active')}
                  >
                    <div className="sub-user-active-text">Active ({this.props.subUsersData.activeCount})</div>
                  </div>
                  <div
                    className="sub-user-suspend-button"
                    style={currently_opened_tab === 'suspended' ? selectedButtton : unSelectedButton}
                    onClick={() => this.changeUserList('suspended')}
                  >
                    <div className="sub-user-suspend-text">Suspended ({this.props.subUsersData.suspendCount})</div>
                  </div>
                  <div
                    className="sub-user-delete-button"
                    style={currently_opened_tab === 'deleted' ? selectedButtton : unSelectedButton}
                    onClick={() => this.changeUserList('deleted')}
                  >
                    <div className="sub-user-delete-text">Deleted ({this.props.subUsersData.deleteCount})</div>
                  </div>
                </div>
              </div>
              <SubUsersTableComponent
                history={this.props.history} listCount={this.state.count}
                currentPage={data => {
                  this.pageNo = data.page;
                  this.limit = data.limit;
                  this.getSubUsersListApi()
                }}
                listUpdated={this.getUpdatedList} selectedType={currently_opened_tab}
                rows={this.props.subUsersData.subUsersList} headers={this.props.subUsersData.tableHeaders}
                classes={classes.userTable} className="sub-users-table"/>
            </div>
          </div>
        </EmployerSideNav>
      </div>

    );
  }
}

SubUsersContainer.propTypes = {classes: PropTypes.object.isRequired,};

const mapStateToProps = (state) => getSubUsersList(state);

const mapDispatchToProps = dispatch => {
  return {
    getSubUsersList: bindActionCreators(subUserActons.getSubuserListRequest, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SubUsersContainer));
