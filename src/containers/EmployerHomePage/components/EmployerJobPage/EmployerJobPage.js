//library dependencies
import React, {Component} from 'react';
import {Modal} from '@material-ui/core';

//style
import './style.scss';

//utilities
import {handleLocalStorage, apiCall} from '../../../../Utilities';
import {EMPLOYER_JOB_PAGE_CUSTOMISE_URL, EMPLOYER_JOB_PAGE_CUSTOMISE_SEND_URL} from '../../../../../config/constants';

//custom components
import SectorsRoles from './components/SectorsRoles'
import ProfileHeadLine from './components/ProfileHeadLine';
import CustomizeURL from './components/CustomizeURL';

/**
 * To make a customized url,split the url
 * @param string
 * @returns {*}
 * @constructor
 */
function GetUrlForTextField(string) {
  let array_data = string.split('employer/')
  if (array_data.length === 2) {
    return array_data[1]
  }
  else {
    return string;
  }
}

class EmployerJobPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      is_post_job_model_open: true,
      skills: [],
      sectorsRolesEditMode: false,
      profileHeadLine: false,
      openModal: false,
      url: "",
      modalURl: ''
    }
  }

  /**
   * To open a customized public url model, updating the state
   */
  openModal = () => {
    this.setState({
      openModal: true,
      modalURl: this.state.url
    })
  };

  /**
   *on change in input field, updating state
   * @param e
   */
  handleChange = (e) => {
    this.setState({
      modalURl: e.target.value
    })
  };

  /**
   * To close a customized public url model, updating the state
   */
  closeModal = () => {
    this.setState({
      openModal: false
    })
  };

  componentWillMount() {

    //validating the career detail ,user can go after updating all the required field
    const {business_email_verified_status, mobile_number_verified_status, pan_card_status} = this.props.userStatus
    if (!business_email_verified_status || !mobile_number_verified_status || !pan_card_status) {
      this.props.toast("Career Details page shall be active once you verify your business email Id, Mobile Number and upload your documents", {})
    }
    this.getCustomizeUrl();
  }

  /**
   * On click of save, after changed the customised url,calling an api to update
   * @param url
   * @returns {Promise<void>}
   */
  changeCustomiseUrl = async (url) => {
    const token = await handleLocalStorage('get', 'employerLogin');
    const headers = {
      'authorization': token,
      'Content-Type': 'application/json',
    }
    const dataToBeSend = {url}
    try {
      const responseData = await apiCall('post', dataToBeSend, EMPLOYER_JOB_PAGE_CUSTOMISE_SEND_URL, headers);
      this.getCustomizeUrl();
    } catch (e) {
    }

  };

  /**
   * Getting previously saved or default url from an api
   */
  getCustomizeUrl = () => {
    const token = handleLocalStorage('get', 'employerLogin');
    let headers = {
      'authorization': token,
      'Content-Type': 'application/json',
    };

    const dataToBeSend = {}
    apiCall('get', dataToBeSend, EMPLOYER_JOB_PAGE_CUSTOMISE_URL, headers).then(res => {
      this.setState({
        url: res.url
      })
    });
  };

  /**
   * on click of Edit button,updating edit view
   * @param fieldName
   */
  toggleEditMode = (fieldName) => {
    this.setState({
      [fieldName]: !this.state[fieldName]
    })
  }

  render() {
    const {openModal} = this.state;
    const {business_email_verified_status, mobile_number_verified_status, pan_card_status} = this.props.userStatus;
    let isUserVerified = business_email_verified_status && mobile_number_verified_status && pan_card_status;
    return (
      <div className="employer-job-page">
        <div className="employer-job-page-customize-url">
          <div className="employer-job-page-customize-url-in-text">Your default URL is
            <span style={{paddingLeft: '4px'}}>
                                {this.state.url}
                            </span>
          </div>
          <div className="employer-job-page-customize-url-btn" onClick={this.openModal}>
            Customize URL
          </div>
        </div>
        <hr className="employer-job-page-customize-url-line"></hr>
        <Modal open={openModal} close={this.closeModal}
               style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <CustomizeURL closeModal={this.closeModal} url={this.state.url}
                        GetUrlForTextField={GetUrlForTextField(this.state.url)}
                        changeCustomiseUrl={this.changeCustomiseUrl} getCustomizeUrl={this.getCustomizeUrl}/>
        </Modal>
        <div className={isUserVerified ? "employer-job-page" : "employer-job-page  disabled-view"}>
          <ProfileHeadLine
            toggleEditMode={() => this.toggleEditMode('profileHeadLine')}
            isItEditMode={this.state.profileHeadLine}
            toast={this.props.toast}
          />
          <SectorsRoles
            toggleEditMode={() => this.toggleEditMode('sectorsRolesEditMode')}
            isItEditMode={this.state.sectorsRolesEditMode}
          />
        </div>
      </div>
    );
  }
}

export default EmployerJobPage;
