//library dependency
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {debug} from 'util';
import {toast} from 'react-toastify';
import {connect} from 'react-redux'
import {Fab} from '@material-ui/core';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
//styles
import './styles.scss';
//custom components
import CustomIcon from '../../../../components/CustomTag';
import ProfileSection from './components/ProfileSection';
import Permission from './components/Permission';
//utilities
import {apiCall, handleLocalStorage} from '../../../../Utilities';
import {GET_PERMISSIONS, SUB_USER_LIST} from '../../../../../config/constants';

import EmployerSideNav from '../../../../components/EmployerSideNav';

toast.configure({
  "position": "top-center",
  toastClassName: "toast-inner-container",
  bodyClassName: "toast-body-name",
  closeButton: false,
  progressClassName: 'toast-progress-bar'
});

/**
 * This component represents the add new subuser and edit subuser page
 */
class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permissionData: '',
      singleUserData: {},
      rows: [],
      is_email_valid: '',
      checkboxpermission: false
    };
    this.permissionsData = this.permissionsData.bind(this)
  }

  permissionData = '';

  /**
   * @function append checked permission names to permissionData variable
   * @param permissionData
   */
  permissionsData(permissionData) {
    this.permissionData = '';
    for (let permission of permissionData)
      if (permission.isPermissionChecked) this.permissionData += ',' + permission.permission_name;
  }

  componentWillMount = () => {
    let headers = {
      'authorization': handleLocalStorage("get", "employerLogin"),
      'Content-Type': 'application/json',
    };
    this.getPermissionsData(headers)
  };

  /**
   * @function to get subuser data from the backend and check subuser permissions
   * @param headers: token and
   */
  getSingleUserData(headers) {
    if (this.props.match.params.userId) {
      let apiUrl = SUB_USER_LIST + this.props.match.params.userId + '/';
      apiCall('get', null, apiUrl, headers).then(res => {
        this.setState({
          singleUserData: res.data
        }, () => {
          const {rows} = this.state;
          for (let permission of this.state.singleUserData.permissions.split(',')) {
            let row = rows.find(row => row.permission_name === permission);
            if (row) row.isPermissionChecked = true
          }
          this.setState({ rows })
        })
      })
    }
  }

  /**
   * @function to get the permissions of a user from backend
   * @param headers: token and content-type as headers
   */
  getPermissionsData(headers) {
    apiCall('get', null, GET_PERMISSIONS, headers).then(res => {
      for (let permission of res.data) {
        permission.isPermissionChecked = false
      }
      this.setState({
        rows: res.data
      }, () => {
        this.getSingleUserData(headers)
      })
    })
  }

  /**
   * @function to send updated subuser data to the backend and
   * if response status true redirect it to subusers list page
   * @param method: http method
   * @param dataToBeSend: request body
   * @param apiUrl: api end point
   * @param headers: headers for the api call
   */
  saveOrUpdatedSubUserData(method, dataToBeSend, apiUrl, headers) {
    apiCall(method, dataToBeSend, apiUrl, headers).then(res => {
      if (res.status) {
        this.props.history.push({ pathname: '/subuser' })
      }
    })
  }

  /**
   * @function to validate permissions and create request body before make an api call
   */
  saveUserData = () => {
    // checking permissions change
    if (!this.permissionData) {
      if (this.props.match.params.userId) {
        toast("Permission is same as before, kindly Edit it or click on Cancel", {});
      } else {
        toast("Kindly specify atleast one permission", {});
      }
      return;
    }

    let dataToBeSend;
    if (this.props.formData) {
      dataToBeSend = {email_id: this.props.formData.values.email, permissions: this.permissionData.slice(1)}
    }
    let headers = {
      'authorization': handleLocalStorage("get", "employerLogin"),
      'Content-Type': 'application/json',
    };
    let apiUrl = SUB_USER_LIST;
    if (this.props.match.params.userId) {
      apiUrl = apiUrl + this.props.match.params.userId + '/';
      this.saveOrUpdatedSubUserData('patch', dataToBeSend, apiUrl, headers)
    } else {
      this.saveOrUpdatedSubUserData('post', dataToBeSend, apiUrl, headers)
    }
  };

  /**
   * redirect to subusers list page, if user doesn't want to change or create subuser.
   */
  cancelUser = () => this.props.history.push({pathname: '/subuser'});

  /**
   * @function to handle email input field and permission checkboxes enable or disable
   * @param emailError: email error
   * @param allowed: flag to enable or disable checkboxes
   */
  isEmaildisabled = (emailError, allowed) => {
    this.setState({
      is_email_valid: emailError,
      checkboxpermission: allowed
    })
  };

  render() {
    return (
      <div className="sub-user-page">
        <EmployerSideNav history={history} selected={4}>
          <div style={{
            overflow: 'auto',
            height: '700px',
            paddingLeft: '40px',
            paddingRight: '40px',
            paddingBottom: '40px'
          }}>
            <div className="sub-user-container add-sub-user-responsive-container">
              <div>
                <div className="sub-user-text">Add Sub User</div>
                <div className="sub-user-nav">
                  <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small"/>}
                    arial-label="Breadcrumb"
                  >
                    <Link color="inherit" href="#" onClick={this.handleNavigationClick}>
                      Profile
                    </Link>
                    <Link color="inherit" href="/subuser" onClick={this.handleNavigationClick}>
                      Sub Users
                    </Link>
                    <Link color="inherit" href="#" onClick={this.handleNavigationClick}>
                      <CustomIcon text="Add Sub User" className="nav-create-a-job-text"/>
                    </Link>
                  </Breadcrumbs>
                </div>
              </div>
              <div className="btn-wrapper">
                <button className="shenzyn-btn outline-primary-button px-40 py-8" onClick={this.cancelUser}> Cancel
                </button>
                {this.props.formData && this.props.formData.syncErrors || this.state.checkboxpermission ? <Fab
                  variant="extended"
                  size="medium"
                  className="disable-button">Save{this.state.checkboxpermission}</Fab> : <Fab
                  variant="extended"
                  size="medium"
                  className="submit-button"
                  onClick={this.saveUserData}
                  disabled={this.props.formData && this.props.formData.syncErrors || this.state.checkboxpermission == true}>
                  {this.props.match.params.userId ? 'Update' : 'Save'}
                </Fab>}
              </div>
            </div>
            <div className="profile-section">
              <ProfileSection match={this.props.match} singleUserData={this.state.singleUserData}
                              isEmailValid={this.isEmaildisabled} cancelPopup={this.cancelUser}/>
              <Permission savedData={this.permissionsData} permissionData={this.state.rows}
                          checkboxEnable={this.state.checkboxpermission} isEmailValidCheck={this.state.is_email_valid}
                          isEmailValidUpdateCheck={this.props.formData && this.props.formData.syncErrors}/>
            </div>
          </div>
        </EmployerSideNav>
      </div>
    );
  }
}

AddUser.propTypes = {
  classes: PropTypes.object,
};
const mapStateToProps = state => ({
  formData: state.form.ProfileSection
});

export default connect(mapStateToProps)(AddUser);
