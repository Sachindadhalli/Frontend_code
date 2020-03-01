//library dependency
import React, {Component} from 'react';
import {FormHelperText, TextField, Radio} from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import {toast} from 'react-toastify';

//custom components
import CustomIcon from "../../../../../../components/CustomIcon/CustomIcon";

//styles
import './styles.scss';

//utilities
import {
  EMPLOYER_JOB_PAGE_CUSTOMISE_URL_VALIDATION,
  EMPLOYER_JOB_PAGE_GET_RECOMMENDED_URL,
  SERVER_URL
} from '../../../../../../../config/constants';
import {handleLocalStorage, apiCall} from '../../../../../../Utilities';

//icons
import decline from '../../../../../../../assets/media/icons/decline.png';

/**
 * To split the customised url
 * @param string
 * @returns {*}
 * @constructor
 */
function GetUrlString(string) {
  let array_value = string.split('recruiters/');
  if (array_value.length === 2) {
    return <div><span className="employer-job-page-customize-urls">{array_value[0]}recruiters/</span><span
      className="employer-job-page-customize-urls-edit">{array_value[1]}</span></div>
  }
  else {
    return <div><span className="employer-job-page-customize-urls">{SERVER_URL}/recruiters/</span><span
      className="employer-job-page-customize-urls-edit">{string}</span></div>
  }
}

class CustomizeURL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success_message: '', is_post_job_model_open: true, skills: [], sectorsRolesEditMode: false,
      profileHeadLine: false, openModal: false, values: '', disableTextfield: true, id: "", status: false,
      url: this.props.url, textFieldUrl: this.props.GetUrlForTextField, modalURl: '', message: '', radioOptions: []
    }
  }

  /**
   * To open customised url modal
   */
  openModal = () => {
    this.setState({openModal: true, modalURl: this.state.url})
  };

  /**
   * on click of Radio button to customised url
   * @param event
   * @param values
   * @param index
   */
  handleRadioChange = (event, values, index) => {
    this.setState({values: event.target.value, disableTextfield: true});
    if (event.target.value === "own") {
      this.setState({disableTextfield: false})
    }
  };

  /**
   * on change in customised url input field
   * @param e
   */
  handleChange = (e) => {
    this.setState({textFieldUrl: e.target.value});
    this.validateUrl(e.target.value)
  };

  /**
   * To validate customised url form backend
   * @param value
   */
  validateUrl = (value) => {
    let headers = {'authorization': handleLocalStorage('get', 'employerLogin'), 'Content-Type': 'application/json'};
    const dataToBeSend = {url: value};
    apiCall('get', dataToBeSend, EMPLOYER_JOB_PAGE_CUSTOMISE_URL_VALIDATION, headers).then(res => {
      if (res.status) this.setState({status: res.status, message: ''});
      else this.setState({status: false, message: res.message});
    })
  };

  /**
   * To close the customised url modal
   */
  closeModal = () => {
    this.setState({openModal: false})
  };

  componentWillMount() {
    // initially getting all recommended url from an api,calling a function
    this.getAllRecommendedUrl()
  }

  /**
   * To get the Recommended url from an api
   */
  getAllRecommendedUrl = () => {
    let headers = {'authorization': handleLocalStorage('get', 'employerLogin'), 'Content-Type': 'application/json'};
    const dataToBeSend = {};
    apiCall('get', dataToBeSend, EMPLOYER_JOB_PAGE_GET_RECOMMENDED_URL, headers).then(res => {
      this.setState({radioOptions: res.all_url})
    })
  };
  /**
   * on click of customise button,calling an api to update
   */

  customizeUrlCall = () => {
    if (this.state.values) {
      if (this.state.values === "own" && this.state.status) {
        this.props.changeCustomiseUrl(this.state.textFieldUrl);
        this.setState({success_message: 'Your Public Profile URL has been updated!'});
        setTimeout(() => {
          this.setState({success_message: ''})
        }, 3000)
      }
      else if (this.state.values === "own" && !this.state.status) {
      }
      else {
        if (this.state.values.includes('recruiters/')) {
          let newvalue = this.state.values.split('recruiters/');
          this.props.changeCustomiseUrl(newvalue[1])
        }
        else this.props.changeCustomiseUrl(this.state.values);
        this.setState({success_message: 'Your Public Profile URL has been updated!'});
        setTimeout(() => {
          this.setState({success_message: ''})
        }, 3000)
      }
    }
    else toast('Please select any one option', {});
  };

  /**
   * updating state on focus the customised input field
   */
  setCustomiseRadioButton = () => {
    this.setState({values: "own"})
  };

  /**
   * on click of url ,copied the url
   * @param url
   */
  copyToClipboard = (url) => {
    let textField = document.getElementById('copyId');
    textField.value = url;
    textField.select();
    document.execCommand('copy');
    textField.blur();
    toast('Copied to clipboard!', {})
  };
  /**
   * on close,reset the toast message
   */
  closeSuccessMessage = () => {
    this.setState({success_message: ''})
  };

  closeSuccessMessage = () => {
    this.setState({success_message: ''})
  };

  render() {
    const {radioOptions, success_message, values, status, message, disableTextfield, textFieldUrl} = this.state;
    const {url, closeModal} = this.props;
    return (
      <div className="employer-job-page-customize-url-main-container">
        <div className="employer-job-page-customize-url-head-title">
          Customise your Public Profile URL
        </div>
        {success_message ? <div className="update-profile-message-div">
          <div className="update-profile-message">
            <div className="update-profile-message-text">{success_message}</div>
            <div className="update-profile-message-icon" onClick={this.closeSuccessMessage}>
              <CustomIcon icon={decline}> </CustomIcon>
            </div>
          </div>
        </div> : ''}
        <div className="employer-job-page-customize-url-description">
          Enhance your personal brand by creating a custom URL. you can also use it as a signature in your business
          communication.
        </div>
        <span className="employer-job-page-customize-url-text">
                   Your public profile URL is
                   <span className="employer-job-page-url" onClick={() => {
                     this.copyToClipboard(url)
                   }}>{url}</span>.
                   Please choose a new URL from the options mentioned below.</span>
        <div className="employer-job-page-customize-url-provided-urls-title">The following URLs are available:</div>
        <div className="employer-job-page-customize-url-provided-urls-wrapper">
          {radioOptions.map((values) => (
            <div className="customize-url-provided-radio-buttons">
              <RadioGroup aria-label="position" name="position"
                          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} value={values}
                          onChange={(event, values, index) => this.handleRadioChange(event, values, index)} row>
                <Radio value={values}/><span>{GetUrlString(values)}</span>
              </RadioGroup>
            </div>))}
          <div className="customize-url-provided-radio-button-specify-own-textfield-radio">
            <div className="customize-url-provided-radio-button-specify-own">
              <RadioGroup aria-label="position" name="position"
                          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} value={values}
                          onChange={(e) => this.handleRadioChange(e)} row>
                <Radio value={'own'}/><span>Specify my own URL:</span>
              </RadioGroup>
            </div>
            <div className="customize-url-provided-radio-button-specify-own-url-and-textfield">
              <div className="customize-url-provided-radio-button-specify-own-textfield-title">
                http://www.shenzyn.com/recruiters/
              </div>
              <div className="customize-url-provided-radio-button-specify-own-textfield-label">
                <label className="customize-url-provided-radio-button-specify-own-textfield-label-text">Specify your
                  name</label>
                <TextField className="customize-url-provided-radio-button-specify-own-textfield"
                           onFocus={this.setCustomiseRadioButton} disabled={disableTextfield}
                           onChange={(e) => this.handleChange(e)} value={textFieldUrl}/>
                {!status ? <FormHelperText
                  className="customize-url-provided-radio-button-specify-own-textfield-error">{message}</FormHelperText> : ''}
              </div>
              <input id="copyId" value="{{this.state.url}}" style={{opacity: '0'}}/>
            </div>
          </div>
        </div>
        <div className="employer-job-page-modal-btn">
          <button className="shenzyn-btn outline-primary-button px-40 py-8" onClick={closeModal}>Cancel</button>
          <button className="shenzyn-btn filled-primary-button px-32 py-8" style={{marginLeft: '20px'}}
                  onClick={this.customizeUrlCall}>Customise
          </button>
        </div>
      </div>
    );
  }
}

export default CustomizeURL;
