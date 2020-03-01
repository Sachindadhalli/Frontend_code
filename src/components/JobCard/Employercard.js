//library dependencies
import React, {Component} from 'react';
import {Grid, Popover, Tooltip, withStyles} from '@material-ui/core';
import {BetaJSVideoPlayer} from 'react-betajs-media-component';
//style
import './styles.scss';
//icons
import close from '../../../assets/media/icons/close.svg';
import workExpIcon from '../../../assets/media/icons/work-exp.svg';
import rupee from '../../../assets/media/icons/rupee.svg';
import videoCamera from '../../../assets/media/icons/video-camera.svg';
import file from '../../../assets/media/icons/file.svg';
import mediaScreen from "../../../assets/media/images/mediaScreen.png";
//custom component
import CustomIcon from '../CustomIcon';
import IconValueComponent from "../ReusableComponents/IconValueComponent/IconValueComponent";
//utilities
import {SERVER_API_URL} from '../../../config/constants'
//material ui theme customisations
const styles = theme => ({
  lightTooltip: {
    backgroundColor: theme.palette.common.white,
    color: '#626366',
    boxShadow: theme.shadows[1],
    fontSize: 14,
    padding: '8px 13px 10px 15px',
    fontfamily: 'Roboto',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.86,
    letterSpacing: 'normal'
  }
});

class JobCard extends Component {
  constructor(props) {
    super(props);
    this.state = {openVideoResumePreview: false, ShowVideo: false};
  }

  /**
   * @function to close video preview modal
   * @param e
   */
  closeVideoPreview = (e) => {
    this.setState({ShowVideo: false})
  };

  /**
   * @function to open open video preview modal
   * @param e
   */
  openVideoResumePreview = (e) => {
    this.setState({ShowVideo: true})
  };

  /**
   * @function to close the popover
   */
  handlePopoverClose = () => {
    this.setState({openVideoResumePreview: false});
  };

  /**
   * @function to send job id to the parent component
   * @param id
   */
  saveJobs = (id) => {
    this.props.saveJobs(id);
  };

  render() {
    const {jobListing, saved, classes, draftedJobs} = this.props;
    return (
      <div className="job-list-main-container px-20 py-sm-32  mb-sm-20    px-sm-44">
        {!this.state.ShowVideo ? <div><Grid className="job-list-heading-div">
            <Grid className="job-list-job-heading-match-div">
              <div className="job-list-job-heading"
                   onClick={this.props.jobDetails}>{`${jobListing.job_title} - ${jobListing.job_Role}`}</div>
            </Grid>
            <Grid className="job-list-item-documents-icons">
              {jobListing.job_description_documents && jobListing.job_description_documents.video ?
                <div className="job-list-item-documents-icons--video-icon-wrapper" onClick={this.openVideoResumePreview}>
                  <CustomIcon icon={videoCamera} iconStyle="job-list-item-documents-icons--video-icon"/>
                </div> : ""}
              <Popover
                id="mouse-over-popover"
                open={this.state.openVideoResumePreview}
                anchorEl={this.state.anchorEl}
                onClose={this.handlePopoverClose}
              >
                <BetaJSVideoPlayer
                  source={'https://dev.shenzyn.com/shenzyn-media-server/files/video-1560846278158.mp4'}
                  theme={"cube"}
                  locale={'en'}
                />
              </Popover>
              {jobListing.job_description_documents && jobListing.job_description_documents.document_1 ?
                <Grid className="job-list-item-documents-icons--document-icon-wrapper" onClick={this.props.jobDetails}>
                  <CustomIcon icon={file} iconStyle="job-list-item-documents-icons--document-icon"/>
                </Grid>
                : ""}
              <Grid className="job-list-apply-button" onClick={this.props.editJob}>
                Edit
              </Grid>
            </Grid>

          </Grid>
            <Grid container spacing={16} className="job-list-company-name-wrapper">
              <Grid item xs={12} md={4} style={{display: "flex"}}>
                <span className="job-type-title-new">Job Type :</span>
                <span
                  className="job-type-subtitle-new">{` ${jobListing.job_type.length > 0 ? jobListing.job_type[0] : ''}`}</span>
                {jobListing.job_type.length > 1 ?
                  <Tooltip title={jobListing.job_type.map((key, index) => {
                    if (index !== 0) {
                      return <div>{key}</div>
                    }
                  })}
                           placement="right-end" classes={{tooltip: classes.lightTooltip}}>
                    <div className="location-more-tooltip"> +{jobListing.job_type.length - 1}</div>
                  </Tooltip>
                  :
                  null
                }
              </Grid>
              <Grid item xs={12} md={4}>
                <IconValueComponent iconName={workExpIcon} text={jobListing.experience_details}/>
              </Grid>
              <Grid item xs={12} md={4}>
                <IconValueComponent iconName={rupee} text={jobListing.expected_salary}/>
              </Grid>
            </Grid>
            <div className="job-list-skill-div">
              <div className="job-list-skill">Skills:</div>
              <div className="job-list-req-skill">{jobListing.skills}</div>
            </div>
            <Grid container spacing={16} className="employer-job-card-savedon-div">
              <Grid item xs={12} md={4}>
                <div className="job-list-skill-div">
                  <div className="job-list-skill"> {jobListing.saved_by}</div>
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div className="job-list-skill-div">
                  <div className="job-list-skill">{jobListing.started_on}</div>
                </div>
              </Grid>

              <Grid item xs={12} md={4}>
                <div className="job-list-skill-div">
                  <div className="job-list-skill">{jobListing.saved_on}</div>
                </div>
              </Grid>

            </Grid>
          </div> :
          jobListing.job_description_documents && jobListing.job_description_documents.video ?
            <div className="show-video-style">
              <img src={close} className="close-video-preview" onClick={(e) => this.closeVideoPreview(e)}/>
              <BetaJSVideoPlayer
                source={jobListing.job_description_documents.video.includes("shenzyn") ? jobListing.job_description_documents.video.replace("https%3A/", "http://") : SERVER_API_URL + jobListing.job_description_documents.video.replace("https%3A/", "http://")}
                // source={'https://dev.shenzyn.com/shenzyn-media-server/files/video-1560846278158.mp4'}
                poster={mediaScreen}
                theme={"cube"}
                locale={'en'}
                width={"100%"}
                height={"360px"}
              />
            </div>
            :
            ""
        }
      </div>
    );
  }
}

export default withStyles(styles)(JobCard);
