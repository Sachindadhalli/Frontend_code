//library dependency
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Modal} from '@material-ui/core';
import {toast} from 'react-toastify';

//custom components
import CustomTag from '../../../../components/CustomTag';
import UploadDocuments from './components/UploadDocuments/UploadDocuments';
import PostJobModal from "../EmployerJobPage/components/PostJobModal";

//styles
import './style.scss'

//customized material ui style
const styles = (theme) => ({
  root: {display: 'flex', flexWrap: 'wrap'},
  margin: {margin: theme.spacing.unit},
  withoutLabel: {marginTop: theme.spacing.unit * 3},
  textField: {flexBasis: 70},
  input: {display: 'none'}
});

class EmployerHomeRight extends Component {
  constructor(props) {
    super(props);
    this.state = {isDocumentUploadOpen: false, isPostJobOpen: false}
  }

  /**
   * on click of Upload Document, opening a Dialog
   * @param value
   */
  toggleDialog = (value) => {
    this.setState({isDocumentUploadOpen: value})
  };

  /**
   * on click of post Job link, opening a post job model
   * @param value
   */
  togglePostJobModel = (value) => {
    this.setState({isPostJobOpen: value})
  };

  /**
   * performing validation before post a job
   */
  goToPostJobs = () => {
    try {
      if (this.props.userStatus.business_email_verified_status && this.props.userStatus.mobile_number_verified_status && this.props.userStatus.pan_card_status) {
        this.props.goToPostJobs()
      }
      else {
        toast.error("Job Posting page shall be active once you verify your business email Id, Mobile Number and upload your documents");
      }
    } catch (e) {
    }
  };

  render() {
    const {isDocumentUploadOpen, isPostJobOpen} = this.state;
    return (
      <div className="employer-right-wraper">
        <div className="card">
          <div className="header">
            Reports
          </div>
          <div className="item-content">
            <div className="item">
              Job Posting
            </div>
            <CustomTag text="View" className="action-btn"/>
          </div>
          <div className="hr-line"></div>
          <div className="item-content">
            <div className="item">
              Hiring Velocity
            </div>
            <CustomTag text="View" className="action-btn"/>
          </div>
        </div>
        <div className="card">
          <div className="">
            Uploads Documents
          </div>
          <div>
            <button className="shenzyn-btn outline-primary-button px-32 mt-12" onClick={() => this.toggleDialog(true)}>
              Upload Documents
            </button>
          </div>
        </div>
        <div className="card quick-links">
          <div className="header">Quick Links</div>
          <button text="Post Jobs" className="quick-links-item" onClick={() => this.togglePostJobModel(false)}
                  style={{"border": "none", background: "white", "text-align": "left", "padding": 0}}>Post Jobs
          </button>
          <CustomTag text="Current Job opening" className="quick-links-item"/>
          <CustomTag text="Previous Job opening" className="quick-links-item"/>
          <CustomTag text="Hiring Manager" className="quick-links-item"/>
        </div>
        <div className="card">
          <div className="header">Chats</div>
        </div>
        <Modal open={isDocumentUploadOpen}>
          <UploadDocuments
            closeDialog={() => {
              this.toggleDialog(false)
            }}
            header="Upload Documents"
            headerHint="The file should not be more than a 2 MB. The file shall only be in the form of DocX, PPT, PDF. "
          />
        </Modal>
        <Modal open={isPostJobOpen}>
          <PostJobModal
            {...this.props}
            closeDialog={() => {
              this.togglePostJobModel(false)
            }}
          />
        </Modal>
      </div>
    );
  }
}

EmployerHomeRight.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EmployerHomeRight);
