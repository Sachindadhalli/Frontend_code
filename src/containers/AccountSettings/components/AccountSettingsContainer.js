//library dependencies
import React, {Component} from 'react';
import {toast} from 'react-toastify';
//styles
import './styles.scss';
//custom components
import AccountSettingsComponent from './AccountSettingsComponent';
import EmployerSideNav from '../../../components/EmployerSideNav';
//utilities
import {SUSPEND_ACCOUNT} from '../../../../config/constants';
import {apiCall, handleLocalStorage} from '../../../Utilities';

toast.configure({
  "position": "top-center",
  toastClassName: "toast-inner-container",
  bodyClassName: "toast-body-name",
  closeButton: false,
  progressClassName: 'toast-progress-bar'
});

class AccountSettingsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: false,
      showReactivateBtn: false,
      reactiveButtonClick: false,
      accountSettigsStatus: false,
    }
  }

  changeTitle = () => {
    this.setState({email: true, status: true})
  };

  headers = {
    'authorization': handleLocalStorage('get', 'employerLogin'),
    'Content-Type': 'application/json',
  };

  // clearing the localstorage and redirecting to the login page
  logout = () => {
    localStorage.clear();
    this.props.history.push({pathname: '/employer-signin'})
  };

  // updating email in the state
  changeText = (changeSettingText) => {
    this.setState({email: changeSettingText})
  };

  // updating reactivate status in the state
  toggleReactivate = () => {
    this.setState({
      showReactivateBtn: !this.state.showReactivateBtn,
      reactiveButtonClick: false,
      accountSettigsStatus: false
    })
  };

  /**
   * making an api call for reactivate account
   * @return {Promise.<void>}
   */
  reactivateMyAccount = async () => {
    this.setState({reactiveButtonClick: true});
    try {
      let dataToBeSend = {'action': 'activate', 'reason': '', 'time_frame': '', 'password': ''};
      const responseData = await apiCall('post', dataToBeSend, SUSPEND_ACCOUNT, this.headers);
      if (responseData.status) {
        toast(`Account Reactivated Successfully!`, {});
        this.toggleReactivate();
        this.setState({accountSettigsStatus: true});
      }
      else {
        this.setState({active: true});
        toast(`${responseData.message}`, {});
      }
    }
    catch (e) {
      toast(`Unable to reach our servers at this moment`, {})
    }
  };

  render() {
    const {classes, match, history} = this.props;
    return (
      <div className="account-settings-page">
        <EmployerSideNav history={history} selected={4}>
          <div className="account-settings-maincontainer">
            <div className="account-settings-container">
              <div className="account-settings-text">Account Settings</div>
            </div>
            <div>
              <AccountSettingsComponent
                changeEmailTitle={this.changeText}
                reactivateWindow={this.toggleReactivate}
                logout={this.logout}
                toast={toast}
                reactiveStatus={this.state.accountSettigsStatus}
              />
            </div>
            {this.state.showReactivateBtn &&
            <div className="account-settings-body-reactivate-text" style={{color: '#e73a9e'}}
                 onClick={this.reactivateMyAccount}> Reactivate User </div>}
            <div className="account-setting-box-logout-button">
              <div className="account-setting-logout-button" onClick={this.logout}>
                Logout
              </div>
            </div>
          </div>
        </EmployerSideNav>
      </div>
    );
  }
}

export default AccountSettingsContainer;
