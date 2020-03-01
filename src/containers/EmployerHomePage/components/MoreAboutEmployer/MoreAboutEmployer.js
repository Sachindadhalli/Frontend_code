//library dependency
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {toast} from 'react-toastify';

//styles
import './style.scss'

//utilities
import {apiCall, handleLocalStorageAsync, handleLocalStorage} from '../../../../Utilities';

//customised react toast message
toast.configure({
  position: "top-center", toastClassName: "toast-inner-container", bodyClassName: "toast-body-name",
  closeButton: false, progressClassName: 'toast-progress-bar'
});

class MoreAboutEmployer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moreAboutEmp: [{key: 1, value: "Recruitment Consultant", status: true},
        {key: 2, value: "Company Recruiter", status: false}, {key: 3, value: "Acquisition Manager", status: false},
        {key: 4, value: "Entrepreneur", status: false}, {key: 5, value: "Freelancer", status: false}], loading: false,
    }
  }

  /**
   * on Change in option
   * @param option
   */
  toggleOption = (option) => {
    let moreAboutEmp = JSON.parse(JSON.stringify(this.state.moreAboutEmp));
    for (let opt of moreAboutEmp) {
      opt.status = opt.key === option.key;
    }
    this.setState({moreAboutEmp});
  };
  /**
   * On click save button
   * @returns {Promise<void>}
   */
  handleSave = async () => {
    const token = await handleLocalStorage('get', 'employerLogin');
    const AUTH_HEADER = {'authorization': token, 'Content-Type': 'application/json'};
    try {
      this.setState({loading: true});
      const preparedData = this.prepareTheDataForApi();
      let responseAfterSave = await apiCall('get', preparedData, 'employer-homepage/know-about-employer/', AUTH_HEADER);
      this.setState({loading: false});
      if (responseAfterSave && responseAfterSave.status) {
        toast(`${responseAfterSave.message}`, {});
        this.props.closeDialog();
      } else toast(`${responseAfterSave.message}`, {})
    } catch (e) {
      toast(`Error Occurred during change`, {});
      this.setState({loading: false})
    }
  };
  /**
   * prepared the data for an api
   * @returns {{about_employer: string}}
   */
  prepareTheDataForApi = () => {
    let preparedData = "";
    for (let more of this.state.moreAboutEmp) {
      if (more.status) preparedData += ' / ' + more.value;
    }
    preparedData = preparedData ? preparedData.slice(3) : '';
    return {about_employer: preparedData}
  };

  render() {
    const {header, headerHint} = this.props;
    const {moreAboutEmp, loading} = this.state;
    return (
      <div className="dialog-wrapper-more-about-emp">
        <div className="shenzyn-dialog-box">
          <div className="header">
            <div className="close-icon">
            </div>
            <div className="title-wrapper mb-24">
              <div className="title font-size-24 font-size-500 mb-16">
                {header}
              </div>
              {headerHint && <div className="hint-title font-size-14 mx-12">
                {headerHint}
              </div>}
            </div>
          </div>
          <div className="body ml-40">
            {moreAboutEmp.map((option, index) => (
              <RenderOption
                className={option.status ? "item mb-20 selected-chip" : "item mb-20"}
                key={index}
                option={option}
                toggleOption={() => this.toggleOption(option)}
              />)
            )}
          </div>
          <div className="footer mb-20 mt-12">
            <div className="action-btn-wrapper">
              <button className="filled-primary-button shenzyn-btn px-24 px-sm-48" onClick={this.handleSave}
                      disabled={loading}>
                {loading ? 'Saving' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const RenderOption = (props) => {
  return (
    <div className={props.className + " file-chip-wrapper-more-info px-20 py-8"} onClick={props.toggleOption}>
            <span className="file-chip">
               {props.option.value}
            </span>
    </div>
  )
};
const mapSateToProps = (state) => state;

MoreAboutEmployer = connect(mapSateToProps, null)(MoreAboutEmployer);
export default MoreAboutEmployer;
