//library dependencies
import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

//style
import './style.scss';

//custom component
import DocumentUpload from './component/DocumentUpload/DocumentUpload';
import VideoUpload from './component/VideoUpload/VideoUpload';

//utilities
import {apiCall, handleLocalStorage, isEmptyObject} from '../../../../Utilities';
import {POST_JOB, POST_JOBS_GET_DETAILS} from '../../../../../config/constants';
import LoadingIcon from "../../../../components/LoadingIcon";
import * as actions from "../../../../actions/createAJob";

class DocumentAndVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {document: props.createAJob.document ? props.createAJob.document : [], video: [], loading: false,};
  }

  componentWillMount() {

    //receiving video path from url params,updating state
    // to get the data of previous job, calling a function,
    // creating reference of this component
    if (this.props.location.state && this.props.location.state.videoUrl) {
      this.setState({document: [...this.props.createAJob.document],})
    }
    this.getInitialData();
    this.props.onRef(this)
  }

  componentWillUnMount() {

    //removing the reference while unmount this component
    this.props.onRef(null)
  }

  /**
   * to get the data of previous job from an api
   * @return: updating state with documents and video
   * */
  getInitialData = async () => {
    try {
      this.setState({loading: true});
      const id = this.props.match.params.jobId;
      const token = await handleLocalStorage('get', 'employerLogin');
      const AUTH_HEADER = {authorization: token, 'Content-Type': 'application/json',};
      const newSendingData = {id: id};
      const jobData = await apiCall('get', newSendingData, POST_JOBS_GET_DETAILS, AUTH_HEADER);
      if (jobData.status) {
        if (jobData.data.job_description_documents.length > 0) { //splitting document url into fields
          jobData.data.job_description_documents.forEach((value) => {
            let newNameArray = value.name.split("/");
            value.url = value.name;
            value.name = newNameArray[newNameArray.length - 1];
            value.uploaded_on = value.lastModified
          });
          if (this.props.location.state && this.props.location.state.videoUrl) {
          } else {
            this.setState({
              document: [...jobData.data.job_description_documents],
            }, () => this.props.UpdateDocuments([...this.state.document]))
          }
        } else {
          if (this.props.location.state && this.props.location.state.videoUrl) {
          } else {
            this.setState({document: this.props.createAJob.document ? [...this.props.createAJob.document] : []})
          }
        }
        if (!isEmptyObject(jobData.data.job_description_video)) {//splitting a video url into fields
          const videoUrl = jobData.data.job_description_video.video;
          const videoDate = jobData.data.job_description_video.video_updated_on;
          let videoname = videoUrl.split("/");
          const newVideoName = videoname[videoname.length - 1].replace(/_/g, " ");
          const video = [{"name": newVideoName, "lastModified": videoDate, url: videoUrl, uploaded_on: videoDate}];
          this.setState({video: video})
        } else this.setState({video: [],})
      }
    } catch (e) {
    } finally {
      this.setState({loading: false})
    }
  };

  /**
   * TO make form of document and video to send the data for api
   * @return: form(list of document and video)
   * */
  prepareTheDataForApi = () => {
    const id = {id: this.props.match.params.jobId,};
    const files = {};
    const video = {};
    this.state.video.map((value) => {
      video["video"] = value
    });
    this.state.document.map((value, index) => {
      const doc = `doc_${index + 1}`;
      files[doc] = value;
    });
    const formData = new FormData();
    for (const key in files) { // adding document in form
      if (files[key].hasOwnProperty("url") && !files[key]["url"].includes("blob:http")) {
        formData.append(key, JSON.stringify(files[key]))
      } else formData.append(key, files[key]);
    }
    for (const jobId in id) { // adding id in form
      formData.append(jobId, id[jobId]);
    }
    for (const videoname in video) { // adding video in form
      if (video[videoname].hasOwnProperty("url") && !video[videoname]["url"].includes("blob:http")) {
        formData.append(videoname, JSON.stringify(video[videoname]))
      } else formData.append(videoname, video[videoname])
    }
    formData.append("docs", "docs");
    return formData
  };

  /**
   * on click of save as draft button
   * @return {Promise<void>}
   */
  saveAsDraft = async () => {
    try {
      const token = await handleLocalStorage('get', 'employerLogin');
      const AUTH_HEADER = {
        authorization: token,
        'Content-Type': 'application/json',
      };

      const preparedData = this.prepareTheDataForApi();
      const ducument_upload = await apiCall('post', preparedData, POST_JOB, AUTH_HEADER);
      if (ducument_upload.status) {
        if (this.props.location.state && this.props.location.state.videoUrl) {
          this.props.location.state.videoUrl = ""
        }
        this.props.history.push(this.props.match.url.replace(`create-a-job/${this.props.match.params.jobId}/document-video-upload`, 'employer-saved-jobs'));
      }
    } catch (e) {
      this.setState({loading: false});
    }
  };

  /**
   * on click of next button
   * @return: redirect to new tab after successfully saved
   * */
  SaveDocumentVideo = async () => {
    try {
      const token = await handleLocalStorage('get', 'employerLogin');
      const AUTH_HEADER = {authorization: token, 'Content-Type': 'application/json',};
      const preparedData = this.prepareTheDataForApi();
      const ducument_upload = await apiCall('post', preparedData, POST_JOB, AUTH_HEADER);
      if (ducument_upload.status) {
        if (this.props.location.state && this.props.location.state.videoUrl) {
          this.props.location.state.videoUrl = ""
        }
        this.props.history.push(this.props.match.url.replace('document-video-upload', 'candidate-profile'));
      }
    } catch (e) {
      this.setState({loading: false});
    }
  };

  recorderVideo = (data) => {
    this.setState({video: data})
  };

  render() {
    return (
      <div>
        {!this.state.loading
          ?
          <div className="my-document-video-upload">
            <div className="my-document-video-container">
              <DocumentUpload document={this.state.document}/>
              <VideoUpload {...this.props} recorderVideo={this.recorderVideo} video={this.state.video}/>
            </div>
            <div className="form-hr-line"></div>
            <div className="next-documnet-upload">
              <button className="shenzyn-btn filled-primary-button px-48" saveText="Next"
                      onClick={this.SaveDocumentVideo}>
                Next
              </button>
            </div>
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

const mapStateToProps = (state) => state;

const mapDispatchToProps = dispatch => ({
  UpdateDocuments: bindActionCreators(
    actions.UpdateDocuments,
    dispatch,
  ),
});


export default connect(mapStateToProps, mapDispatchToProps)(DocumentAndVideo);
