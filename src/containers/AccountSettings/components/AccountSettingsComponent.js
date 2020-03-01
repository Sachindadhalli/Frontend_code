// library dependencies
import React, {Component} from 'react';
import {container, FormControl, FormHelperText, Input, InputAdornment, InputLabel, Modal} from '@material-ui/core';
import {toast} from 'react-toastify';
// utilities
import {
  ACCOUNT_DETAILS_EMAIL_OTP_VALIDATE,
  ACCOUNT_DETAILS_SEND_OTP,
  CHANGE_PASSWORD,
  DELETE_ACCOUNT,
  EMPLOYER_EMAIL_VERIFICATION,
  GET_EMAIL_ID,
  SUSPEND_ACCOUNT
} from '../../../../config/constants';
import {apiCall, handleLocalStorage, validateEmail} from '../../../Utilities';
// custom components
import ChangePassWordField from './ChangePassword';
import EmailVerificationPopup from '../../../components/EmailVerificationPopup';
import DeleteWithReason from '../../../components/DeleteWithReason/DeleteWithReason';
import CustomTag from '../../../components/CustomTag';
import ConformationDialog from '../../../components/ConformationDialog';
//toast message style customizations
toast.configure({
  "position": "top-center",
  toastClassName: "toast-inner-container",
  bodyClassName: "toast-body-name",
  closeButton: false,
  progressClassName: 'toast-progress-bar'
});

/**
 * This component responsible for account settings like change email and password 
 * delete, suspend, reactivate account and logout
 */
class AccountSettingsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      originalEmail: '',
      isEmailVerified: false,
      emailVerificationStatus: false,
      actionConformation: false,
      actionType: '',
      email_model: false,
      passwordChange: 'old',
      delete_model: false,
      reason: '',
      onUpdateEmailClick: false,
      suspend_model: false,
      emailError: '',
      status: '',
    };
    this.headers = {};
  }

  /**
   * @function to open delete account confirmation modal(popup) and update action type as delete
   */
  deleteAccount = () => {
    this.setState({actionType: 'delete', delete_model: true,});
  };

  closeSuspendDialog = () => {
    this.setState({suspend_model: false,})
  };

  closeDeleteDialog = () => {
    this.setState({delete_model: false})
  };

  closeEmailDialog = () => {
    this.setState({close_model: true})
  };

  /**
   * @function to open suspend account confirmation modal(popup) and update action type as suspend
   */
  suspendAccount = () => {
    this.setState({suspend_model: true, actionType: 'suspend',});
  };

  /**
   *
   * @param modal: modal name
   */
  handleModel = (modal) => {
    this.setState({[modal]: !this.state[modal]})
  };

  // setting the password change type
  changePassword = (type = 'new') => {
    this.setState({passwordChange: type,});
  };

  componentDidMount() {
    // getting token from the localstorage
    const token = handleLocalStorage('get', 'employerLogin');
    if (token) {
      this.headers = {
        'authorization': token,
        'Content-Type': 'application/json',
      };
      // getting email id and account type(suspended or delete or active) from api call
      apiCall('get', null, GET_EMAIL_ID, this.headers).then(response => {
        if (response.data.status == "suspended") {
          this.props.reactivateWindow()
        }
        this.setState({
          status: response.data.status,
          email: response.data.email,
          originalEmail: response.data.email
        });
      });
    } else {
      this.props.logout();
    }
  }

  /**
   * clearing the localstorage and
   * redirecting to the landing page or login page
   */
  logout = () => {
    localStorage.clear();
    this.props.logout();
  };

  /**
   * account type updation is happening here
   * @param accountType
   */
  updateAccount = (accountType) => {
    // getting token from localstorage
    let headers = {
      'authorization': handleLocalStorage('get', 'employerLogin'),
      'Content-Type': 'application/json',
    };
    let dataToBeSend = {}
    if (accountType.actionType == 'delete') {
      dataToBeSend.action = accountType.actionType;
      dataToBeSend.reason = accountType.reason;
      dataToBeSend.time_frame = '';
      dataToBeSend.password = '';

      // sending account type to the server
      apiCall('post', dataToBeSend, DELETE_ACCOUNT, headers).then(res => {
        if (res.status) {
          toast(`${res.message}`, {});
          this.logout();
        }
        else {
          toast(`${res.message}`, {});
        }
        this.closeDeleteDialog()
      });
    } else {
      dataToBeSend.action = accountType.actionType;
      dataToBeSend.reason = '';
      dataToBeSend.time_frame = '';
      dataToBeSend.password = '';

      // sending account type to the server
      apiCall('post', dataToBeSend, SUSPEND_ACCOUNT, headers).then(res => {
        toast(`${res.message}`, {});
        if (res.status) {
          this.props.reactivateWindow();
          this.setState({status: 'suspended'});
        }
        this.closeSuspendDialog()
      });
    }
  };

  /**
   * on submit of change password making an api call
   * @param values
   */
  changePasswordAPI = values => {
    const requestData = {
      old_pwd: values.old_password,
      new_pwd: values.new_password,
      conf_pwd: values.confirm_password,
    };
    apiCall('post', requestData, CHANGE_PASSWORD, this.headers)
      .then(response => {
        if (response && response.status) {
          toast(`The password is changed successfully!`, {});
          this.changePassword('old');
        } else {
          toast(`${response.message}`, {});
        }
      })
      .catch(e => {
      });
  };

  /**
   * storing selected or entered by the user
   * @param values
   */
  getReason = (values) => {
    this.setState({reason: values})
  };

  /**
   * updating email
   * @param responseData
   */
  updateEmail = (responseData) => {
    this.setState({email: responseData.email})
  };

  /**
   * on click of discard changes, changing password change from edit mode to view
   */
  onDiscardChanges = () => {
    this.setState({passwordChange: 'old'})
  };

  componentWillReceiveProps(nextProps) {
    if (!this.state.email_model) {
      // checking reactivate status, if its true setting as active or else its updating as suspended
      this.setState({status: nextProps.reactiveStatus ? 'active' : 'suspended'})
    }
  }

  /**
   * checking whether entered email is available in the server or not by making api call
   * @return {Promise}
   */
  isEmailAvailable = async () => {
    const promise = Promise.resolve(
      apiCall('get', {
          email_id: this.state.email,
          format: 'json',
        }, EMPLOYER_EMAIL_VERIFICATION, {'content-type': 'application/json',},
      ),
    );
    return await promise;
  };

  /**
   * checking whether entered email is valid format or not
   */
  emailValidations = () => {
    const {email} = this.state;
    let emailErrorMessage = '';

    // if entered email is empty string throw specify error
    if (email == '') {
      emailErrorMessage = 'Kindly specify your Email Id';
      this.setState({emailError: emailErrorMessage,});
    } else if (!validateEmail(email)) {

      // if entered email is invalid throw invalid error
      emailErrorMessage = 'Kindly enter a valid Email Id';
      this.setState({emailError: emailErrorMessage,});
    } else {
      this.isEmailAvailable()
        .then(res => {
          emailErrorMessage = res.status == false ? res.message : '';
          this.setState({
            emailError: emailErrorMessage,
            isEmailVerified: res.status
          });
        })
        .catch(e => {
          emailErrorMessage = 'Error while validating';
          this.setState({emailError: emailErrorMessage,});
        });
    }
  };

  /**
   * changing email edit mode to view or vice versa
   * @param status
   */
  onUpdateEmailClick = (status) => {
    this.setState({
      onUpdateEmailClick: status,
      emailError: '',
      email: !status && !this.state.emailVerificationStatus ? this.state.originalEmail : this.state.email
    });
  };

  /**
   * update email when user changes the email in the input box
   * @param e
   */
  onEmailChange = (e) => {
    this.setState({email: e.target.value.trim(), emailError: '', isEmailVerified: false})
  };

  /**
   * verifying whether email is already existed in the server or not
   */
  editEmail = () => {
    const {email} = this.state;
    let emailErrorMessage = '';

    //throw an error if email is ''
    if (email === '') {
      emailErrorMessage = 'Kindly specify your Email Id';
      this.setState({emailError: emailErrorMessage,});
    } else if (!validateEmail(email)) {
      //throw an invalid error if email is invalid format
      emailErrorMessage = 'Kindly enter a valid Email Id';
      this.setState({emailError: emailErrorMessage,});
    } else {
      this.isEmailAvailable()
        .then(res => {
          emailErrorMessage = res.status == false ? res.message : '';
          this.setState({
            emailError: emailErrorMessage,
            email_model: res.status,
            isEmailVerified: res.status,
            emailVerificationStatus: false
          });
        })
        .catch(e => {
          emailErrorMessage = 'Error while validating';
          this.setState({emailError: emailErrorMessage,});
        });
    }
  };

  /**
   *
   * @param status
   */
  emailVerificationStatus = (status) => {
    this.setState({emailVerificationStatus: status})
  };

  render() {
    const {email_model} = this.state;
    const {delete_model} = this.state;
    const {passwordChange} = this.state;
    const {suspend_model} = this.state;
    return (
      <div className="account-settings-mainbody">
        <div className="account-settings-body">
          <div className="account-settings-body-container">Account Status: <span
            style={{textTransform: 'capitalize'}}>{this.state.status}</span></div>
          <div className="account-settings-line"/>
          <div className="account-settings-body-container-part1">
            <div style={{width: '47%'}} className="email-settings-and-change-password">
              <div>
                <div className="account-settings-body-email-div">
                  <div className="account-settings-body-email-dummyemail-div">
                    <div className="body-container-email">Email Settings</div>
                  </div>
                  <div className="body-email-edit-text" style={{display: 'flex'}}>
                    {this.state.onUpdateEmailClick ?
                      <div className="discard-changes-btn mr-16" style={{color: '#757575'}}
                           onClick={() => this.onUpdateEmailClick(false)}>Cancel</div> : null}
                    <div
                      onClick={this.state.status && this.state.status.toLowerCase() == 'active' ? this.onUpdateEmailClick : null}>
                      Update Email
                    </div>
                  </div>
                </div>
                {this.state.onUpdateEmailClick ?
                  <FormControl
                    style={{width: '100%', marginTop: '24px'}}
                  >
                    <InputLabel
                      htmlFor="email"
                      shrink={true}
                      className="change-label-style"
                    >
                      Email
                    </InputLabel>
                    <Input
                      id="email"
                      type="text"
                      autoFocus={false}
                      value={this.state.email}
                      onChange={this.onEmailChange}
                      onBlur={this.emailValidations}
                      autoComplete="off"
                      error={this.state.emailError}
                      endAdornment={
                        <InputAdornment position="end" onClick={this.editEmail}>
                          <CustomTag text="Verify" className="verify-text"/>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText error={this.state.emailError !== ''} id="email_error">
                        <span className="field_error">
                          {this.state.emailError}
                        </span>
                    </FormHelperText>
                  </FormControl> : null
                }
              </div>
              {passwordChange == 'old' && (
                <div className="account-setting-body-password-div">
                  <div className="body-container-password">Password</div>
                  <div className="body-password-changepassword-text"
                       onClick={this.state.status && this.state.status.toLowerCase() == 'active' ? () => this.changePassword('new') : null}>
                    Change Password
                  </div>
                </div>
              )}
              {passwordChange == 'new' &&
              <ChangePassWordField onDiscardChanges={this.onDiscardChanges} onSubmit={this.changePasswordAPI}/>}
            </div>
          </div>
        </div>
        <div className="account-settings-body-buttons">
          {delete_model == false && (
            <div className="body-button-deletebutton"
                 onClick={this.state.status && this.state.status.toLowerCase() != 'active' ? null : this.deleteAccount}
                 style={this.state.status == "deleted" ? {'cursor': 'not-allowed', 'color': '#6d6868'} : null}>
              <div className="account-settings-body-deletebutton-text">Delete My Account</div>
              <div className="account-settings-body-deletebutton-textdescription pr-8">
                You will receive an email to confirm your decision.<br/> Please note that it will permanently delete
                your account, but you can login again within 2 months to restore it.
              </div>
            </div>)}
          {suspend_model == false &&
          <div className="body-button-suspendbutton"
               onClick={this.state.status && this.state.status == 'suspended' ? null : this.suspendAccount}
               style={this.state.status == "suspended" ? {'cursor': 'not-allowed', 'color': '#6d6868'} : null}
          >
            <div className="account-settings-body-suspendbutton-text">Suspend My Account</div>
            <div className="account-settings-body-suspendbutton-textdescription pr-8">
              Please note that it will suspend your account till you reactivate it, but you can reactivate anytime and
              access the account.
            </div>
          </div>}
        </div>
        <Modal open={email_model}>
          <EmailVerificationPopup
            sendOtpUrl={ACCOUNT_DETAILS_SEND_OTP}
            submitOtpUrl={ACCOUNT_DETAILS_EMAIL_OTP_VALIDATE}
            emailVerificationUrl={EMPLOYER_EMAIL_VERIFICATION}
            email={this.state.email}
            isEmailVerified={this.state.isEmailVerified}
            emailVerificationStatus={(data) => this.emailVerificationStatus(data)}
            handleModel={() => this.handleModel('email_model')}
            headingText={this.props.hasOwnProperty('headerText') ? this.props.headerText : "Verify Email"}
          />
        </Modal>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.suspend_model}
          onClose={this.closeSuspendDialog}
          eachUser={this.state}
        >
          <ConformationDialog actionType={this.state.actionType}
                              conformationStatus={() => this.updateAccount({actionType: 'suspend'})}
                              handleClose={this.closeSuspendDialog} Text="Suspend"
                              headingText="Are you sure you want to suspend this account?"></ConformationDialog>
        </Modal>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.delete_model}
          onClose={this.handleClose}
          eachUser={this.state}
        >
          <DeleteWithReason
            closeDeleteDialog={this.closeDeleteDialog}
            isdeleteMyAccount={this.updateAccount}
            headingText="Reasons"
            responseToBeSend={this.getReason}
          />
        </Modal>
      </div>
    );
  }
}

export default AccountSettingsComponent;
