//library dependencies
import React, {Component} from 'react';
import {Modal, TableHead, Table, TableRow, TableCell, TableBody, withStyles} from '@material-ui/core';
import {toast} from 'react-toastify';
import {BetaJSVideoPlayer} from "react-betajs-media-component";
import Moment from "react-moment";

//style
import './style.scss';

//icon
import deleteicon from '../../../../../../../assets/media/icons/deleteIcon.svg';
import recordIcon from '../../../../../../../assets/media/icons/record.svg';
import Upload from '../../../../../../../assets/media/icons/upload.svg';
import Play from '../../../../../../../assets/media/icons/play1.svg';
import mediaScreen from "../../../../../../../assets/media/images/mediaScreen.png";
import close from '../../../../../../../assets/media/icons/close.svg';

//custom component
import CustomIcon from '../../../../../../components/CustomIcon/CustomIcon';
import ConformationDialog from "../../../../../../components/ConformationDialog/ConformationDialog";

//utilities
import {SERVER_API_URL} from "../../../../../../../config/constants";

//customised react toast message
toast.configure({
  position: 'top-center',
  toastClassName: 'toast-inner-container',
  bodyClassName: 'toast-body-name',
  closeButton: false,
  progressClassName: 'toast-progress-bar',
});

// customised material ui style
const styles = theme => ({
  colorPrimary: {color: '#b5b5b5', cursor: 'pointer',},
  input: {display: 'none',},
  tableCell: {
    paddingRight: '0px !important', paddingLeft: '0px', fontFamily: 'Roboto', fontSize: '14px',
    border: '0px', "word-break": "break-all"
  },
  tableChildCell: {
    paddingRight: '0px !important', paddingLeft: '0px', fontFamily: 'Roboto', fontSize: '14px',
    border: '0px', "word-break": "break-all"
  },
  tableCellEnd: {
    paddingRight: '0px !important', paddingLeft: '0px', fontFamily: 'Roboto', fontSize: '14px',
    border: '0px', textAlign: 'right!important', "word-break": "break-all"
  },
  tableChildCellEnd: {
    paddingRight: '0px !important', paddingLeft: '0px', fontFamily: 'Roboto', fontSize: '14px',
    border: '0px', textAlign: 'right!important', "word-break": "break-all"
  }
});

class VideoUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: props.video,
      videoDeleteModel: false,
      videoDeleteId: '',
      date: '',
      openVideoResumePreview: false,
      videoObj: '',
      openVideoPlayModal: false
    };
  }

  /**
   * on click of Delete icon,opening a confirmation dialog box
   * @return: updating state and open a delete modal
   * */
  deleteVideo = value => {
    if (this.props.location.state && this.props.location.state.videoUrl) this.props.location.state.videoUrl = "";
    this.setState({videoDeleteModel: true, videoDeleteId: value,});
  };

  /**
   * on click of cancel buttom and close icon of confirmation dialog box
   * @return: updating state and close delete modal
   * */
  closeDeleteVideoModel = () => {
    this.setState({videoDeleteModel: false,});
  };

  /**
   * on click of delete button of confirmation dialog box
   * @return: update state and close a modal
   * */
  deleteVideoFromTable = () => {
    const {videoDeleteId} = this.state;
    const Video = this.state.video;
    Video.splice(videoDeleteId, 1);
    this.setState({...this.state.document, video: Video, videoDeleteModel: false,});
  };

  /**
   * On click of upload icon to upload video,validating size and type
   * @return: validate and update the state
   * */
  onFileUpload = async event => {
    this.setState({loading: true,});
    const {target} = event;
    const {files} = target;
    const filesize = files[0].size / (1024 * 1024);
    const ext = files[0].name.toString().split('.').pop().toLowerCase();
    if (files && files[0]) {
      if (filesize > 30) {// validate the size of video
        toast("The file you are uploading has exceeded the size limit, kindly upload the file again", {});
      } else if (ext !== "mp4") {
        toast("video should be in mp4 ", {}); // validate type
      } else {// update the state
        const {video} = this.state;
        files[0]["url"] = URL.createObjectURL(event.target.files[0]);
        files[0]["uploaded_on"] = new Date().getTime();
        video.push(files[0]);
        this.setState({video,});
      }
    }
  };

  /**
   *on click of upload icon, validating maximum limit of uploading videos
   * @return: a toast and message or event
   * */
  handleClickUpload = e => {
    if (this.state.video.length === 1) {
      toast('You have already uploaded 1 video, kindly delete one to upload one', {});
      event.preventDefault();
    } else {
      event.target.value = null;
    }
  };

  /**
   * on click of record icon to record a video
   * @return: video url in state of url params
   * */
  videoRecorder = () => {
    if (this.state.video.length === 0) {
      this.props.history.push({
        pathname: "/video-recorder",
        state: {previousPath: `create-a-job/${this.props.match.params.jobId}/document-video-upload`},
      })
    } else {
      toast('You have already uploaded 1 video, kindly delete one to upload one', {});
    }
  };

  componentDidMount() {

    // receiving recorded video path in url params, updating parent state by call back function
    if (this.props.location.state && this.props.location.state.videoUrl) {
      let name = this.props.location.state.videoUrl.split("/");
      this.setState({
        video: [{
          name: name[5], url: this.props.location.state.videoUrl, lastModified: new Date(),
          uploaded_on: new Date()
        }]
      }, () => this.props.recorderVideo(this.state.video))
    }
  }

  /**
   * TO open player to play video file
   * @return: updating the state
   * */
  openVideoResumePreview = (videoObj) => {
    this.setState({openVideoResumePreview: true, videoObj: videoObj})
  };

  /**
   * TO close the video player
   * @return: updating state and close a delete modal
   * */
  handlePopoverClose = () => {
    this.setState({openVideoResumePreview: false});
  };

  render() {
    const {classes} = this.props;
    const {isVideoPlayOpen} = this.state;
    return (
      <div className="my-video-upload">
        <div className="video-header-container">
          <div className="video-header">
            <div className="video-name">Video Description</div>
          </div>
          <div style={{display: 'flex'}}>
            <img src={recordIcon} style={{marginRight: '21px', cursor: 'pointer', marginBottom: '4px'}}
                 onClick={this.videoRecorder}/>
            <label htmlFor="uploadVideo"><img style={{height: '24px', cursor: 'pointer'}} src={Upload}/> </label>
            <input accept=".mp4" className={classes.input} id="uploadVideo" multiple={false} type="file"
                   onChange={e => {
                     this.onFileUpload(e);
                   }} onClick={this.handleClickUpload}/>
          </div>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell} width={"40%"}>Video Name</TableCell>
              <TableCell className={classes.tableCell} width={"30%"}>Uploaded On</TableCell>
              <TableCell className={classes.tableCellEnd} width={"20%"}>Actions</TableCell>
            </TableRow>
          </TableHead>
          {this.state.video.length > 0 ? (
            <TableBody>
              {this.state.video.map((value, index) => (
                <TableRow style={{fontFamily: 'Roboto', fontSize: '14px'}}>
                  <TableCell className={classes.tableChildCell}>{value.name}</TableCell>
                  <TableCell className={classes.tableChildCell}><Moment format="Do MMM YYYY">
                    {new Date(value.uploaded_on)} </Moment></TableCell>
                  <TableCell className={classes.tableChildCellEnd}>
                    <div className="view-delete-container">
                      <img src={Play} style={{marginRight: '23px', cursor: 'pointer'}}
                           onClick={() => this.openVideoResumePreview(value)}/>
                      <div>
                        <img src={deleteicon} style={{cursor: 'pointer'}} onClick={() => this.deleteVideo(index)}/>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={3} style={{border: '0px'}}>
                  <div style={{marginTop: '20px', textAlign: 'center'}}>No Video Uploaded</div>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.videoDeleteModel}
          onClose={this.closeDeleteVideoModel}
        >
          <ConformationDialog
            actionType={this.state.actionType}
            conformationStatus={this.deleteVideoFromTable}
            handleClose={this.closeDeleteVideoModel}
            Text="Delete"
            headingText="Are you sure you want to delete the video?"
          />
        </Modal>
        <Modal
          open={this.state.openVideoResumePreview}
          onClose={this.handlePopoverClose}
        >
          <div className="conform-dialog-container">
            <div className="confirm-dialog video-dialog-container">
              <div className="video-dialog-close" onClick={this.handlePopoverClose}>
                <CustomIcon icon={close}/>
              </div>
              <BetaJSVideoPlayer
                source={this.state.videoObj && this.state.videoObj.url.includes("shenzyn") ? this.state.videoObj.url.replace("https%3A/", "http://") : this.state.videoObj && this.state.videoObj.url.includes("blob:http") ?
                  this.state.videoObj.url : this.state.videoObj && SERVER_API_URL + this.state.videoObj.url}
                poster={mediaScreen} theme={"cube"} locale={'en'} width={'100%'} height={'auto'}
              />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(VideoUpload);
