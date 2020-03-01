//library dependency
import React, {Component} from 'react';
import {Modal} from '@material-ui/core';
import {toast} from 'react-toastify';
//custom components
import EmployerHomeRight from './components/EmployerHomeRight/EmployerHomeRight';
import MoreAboutEmployer from './components/MoreAboutEmployer/MoreAboutEmployer';
import EmployerJobPage from './components/EmployerJobPage/EmployerJobPage';
import EmployerPersonalDetails from './components/EmployerPersonalDetails/EmployerPersonalDetails';
import EmployerSideNav from '../../components/EmployerSideNav';
//styles
import './style.scss';
//utilities
import {apiCall, handleLocalStorage} from '../../Utilities';

//customized react toast message
toast.configure({
  position: 'top-center', toastClassName: 'toast-inner-container', bodyClassName: 'toast-body-name',
  closeButton: false, progressClassName: 'toast-progress-bar'
});

class EmployerHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {personal_details: true, moreAboutEmpDialog: false, userStatus: null};
  }

  /**
   * To validate the user is login or not
   * @returns {Promise<void>}
   */
  getUserStatus = async () => {
    const token = await handleLocalStorage('get', 'employerLogin');
    const headers = {'authorization': token, 'Content-Type': 'application/json'};
    try {
      const responseData = await apiCall('get', null, 'employer-homepage/homepage-status/', headers);
      this.setState({userStatus: responseData.data, moreAboutEmpDialog: !responseData.data.more_about_emp_status});
    } catch (e) {
    }
  };

  componentWillMount() {
    //initially validate the user is login or not
    this.getUserStatus();
  }

  /**
   * on click of career detail validate all the required fields are filled
   * @param value
   * @returns {Promise<void>}
   */
  toggleEmployerHomePage = async value => {
    await this.getUserStatus();
    const {business_email_verified_status, mobile_number_verified_status, pan_card_status} = this.state.userStatus;
    if (!value && !(business_email_verified_status && mobile_number_verified_status && pan_card_status)) {
      toast('Career Details page shall be active once you verify your business email Id, Mobile Number and upload your documents', {})
    }
    this.setState({
      personal_details: value ? value : !(business_email_verified_status && mobile_number_verified_status && pan_card_status),
    });
  };
  /**
   * on close the dialog box
   */
  closeDialog = () => {
    this.setState({moreAboutEmpDialog: false});
  };
  /**
   * on click of post job button ,redirecting the post job modal
   */
  goToPostJobs = () => {
    this.props.history.push({pathname: '/post-job-modal'});
  };

  render() {
    const {personal_details, userStatus, moreAboutEmpDialog} = this.state;
    const {history} = this.props;
    return (
      <div className="employer-home">
        <EmployerSideNav history={history} selected={1}>
          <div className="employer-home-right-side">
            <div className="employer-home-right-container px-20 px-sm-40">
              <div className="home-right-wraper">
                <div className="detail-button">
                  <div className={`first-btn btn ${personal_details ? ' btn-active' : ' btn-inactive'}`}
                       onClick={() => this.toggleEmployerHomePage(true)}>
                    My Details
                  </div>
                  <div className={`last-btn btn${!personal_details ? ' btn-active-last' : ' btn-inactive'}`}
                       onClick={() => {
                         this.toggleEmployerHomePage(false);
                       }}>
                    Career Details
                  </div>
                </div>
                {personal_details ? (
                  <div className="employer-home-details">
                    <EmployerPersonalDetails toast={toast}/>
                  </div>
                ) : (
                  <div className="employer-job-details">
                    <EmployerJobPage userStatus={userStatus} toast={toast}/>
                  </div>
                )}
              </div>
              <div className="employer-home-right-containers">
                <EmployerHomeRight {...this.props} userStatus={userStatus} goToPostJobs={this.goToPostJobs}/>
              </div>
              <Modal open={moreAboutEmpDialog}>
                <MoreAboutEmployer
                  closeDialog={this.closeDialog}
                  header="Let us know more about you"
                  headerHint="We are taking these details to let the jobseeker find you"
                />
              </Modal>
            </div>
          </div>
        </EmployerSideNav>
      </div>
    );
  }
}

export default EmployerHomePage;
