//library dependencies
import React, {Component} from 'react';
import {get} from 'https';

//custom component
import PostJobDetails from '../../../../components/PostJobDetails';
import LoadingIcon from '../../../../components/LoadingIcon/LoadingIcon';

//utilities
import {apiCall, handleLocalStorage} from '../../../../Utilities';
import {POST_JOBS_GET_DETAILS, POST_JOB, JOB_LISTING_GET_DETAILS} from '../../../../../config/constants';
import DialogQuestionnaire from '../../../../components/DialogQuestionnaire';

const header = {'authorization': handleLocalStorage("get", "employerLogin"), 'Content-Type': 'application/json',};

class PostJobPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job_details: null,
      data: {},
      Loading: false,
      openDialog: false,
      accountType: this.props.TypeOfUser,
      application_status: '',
      open: true,
      id: '',
    }
  }

  /**
   * on click of Edit button,redirecting to create job page
   */
  onEdit = () => {
    this.props.history.push(this.props.match.url.replace('post-job-preview', ''));
  };

  componentWillMount() {
    //checking the user type and getting the data according to type of user by calling function
    if (this.state.accountType === "jobSeeker" || this.state.accountType === "jobApplicationStatus") {
      this.getJobDetailOfJobList();
    } else {
      this.getInitialisedData();
    }
  }

  changeButtonStatus = () => {
    this.getJobDetailOfJobList();
  };

  /**
   * To get the data of particular job id,calling an api
   * @return {Promise<void>}
   */
  getJobDetailOfJobList = async () => {

    this.setState({Loading: true,});
    const headers = {
      'authorization': handleLocalStorage('get', 'employeeLogin'),
      'Content-Type': 'application/json',
    };
    if (this.state.accountType === "jobSeeker" || this.state.accountType === "jobApplicationStatus") {
      const dataToBeSend = {
        id: this.props.match.params.jobId,
      };
      const get_data = await apiCall('get', dataToBeSend, JOB_LISTING_GET_DETAILS, headers);

      this.setState({
        data: get_data.data,
        Loading: false,
        application_status: get_data.application_status,
        id: this.props.match.params.jobId,
      })
    }
  };

  /**
   * To get the data of particular job id,calling an api
   * @param id
   * @return {Promise<void>}
   */
  getInitialisedData = async (id = this.props.match.params.jobId) => {
    this.setState({Loading: true,});
    const newSendingData = {id: id};
    const jobData = await apiCall('get', newSendingData, JOB_LISTING_GET_DETAILS, header);
    if (jobData.status) {
      this.setState({
        data: jobData.data,
        Loading: false,
      })
    }
  };

  /**
   * To open questionnaire dialog box
   */
  openQuestionnaireDialog = () => {
    this.setState({openDialog: !this.state.openDialog})
  };

  /**
   * To change the status of dialog box
   */
  handleQuestionnairemodel = () => {
    this.setState({openDialog: !this.state.openDialog})
  };

  /**
   * To click on save button
   * @param refresh_time
   * @return {Promise<void>}
   */
  onSave = async (refresh_time) => {
    try {
      const sendingData = {
        id: this.props.match.params.jobId,
        publish_job: {
          job_type: "Post",
          refresh_time: refresh_time
        }
      };
      const headers = {
        'authorization': handleLocalStorage("get", "employerLogin"),
        'Content-Type': 'application/json',
      };
      const jobData = await apiCall('post', sendingData, POST_JOB, headers);
      if (jobData.status) {
        this.props.history.push(this.props.match.url.replace(`create-a-job/${this.props.match.params.jobId}/post-job-preview`, 'employer-home-page'));
      }
    } catch (e) {
    }
  };

  render() {
    const {openDialog} = this.state;
    return (
      <div>
        {(!this.state.Loading) ?
          <div>
            <PostJobDetails userType={this.props} informations={this.state.data} onEdit={this.onEdit}
                            applicationStatus={this.state.application_status} onSave={this.onSave}
                            openQuestionnaireDialog={this.openQuestionnaireDialog}/>
            {openDialog === true ? <DialogQuestionnaire handleQuestionnairemodel={this.handleQuestionnairemodel}
                                                        changeButtonStatus={this.changeButtonStatus}
                                                        openDialog={openDialog} id={this.state.id}/> : null}
          </div>
          :
          <div>
            <LoadingIcon/>
          </div>
        }
      </div>
    );
  }
}

export default PostJobPreview;
