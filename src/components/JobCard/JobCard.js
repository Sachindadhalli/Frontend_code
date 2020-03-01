//library dependencies
import React, { Component } from 'react';
import { Grid,Popover,Tooltip,withStyles } from '@material-ui/core';
import {BetaJSVideoPlayer} from 'react-betajs-media-component';

//style
import './styles.scss';

//icons
import company from '../../../assets/media/icons/company.svg';
import location from '../../../assets/media/icons/location.svg';
import close from '../../../assets/media/icons/close.svg';
import workExpIcon from '../../../assets/media/icons/work-exp.svg';
import share from '../../../assets/media/icons/share.svg';
import star from '../../../assets/media/icons/star.svg';
import YellowStar from '../../../assets/media/icons/star-yellow.svg';
import rupee from '../../../assets/media/icons/rupee.svg';
import videoCamera from '../../../assets/media/icons/video-camera.svg';
import file from '../../../assets/media/icons/file.svg';
import mediaScreen from "../../../assets/media/images/mediaScreen.png";

//custom component
import CustomIcon from '../CustomIcon';
import IconValueComponent from "../ReusableComponents/IconValueComponent/IconValueComponent";

//utilities
import {SERVER_API_URL} from '../../../config/constants'


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
    this.state = {openVideoResumePreview:false,ShowVideo:false};
  }
  closeVideoPreview=(e)=>{ this.setState({ShowVideo:false}) };

  openVideoResumePreview=(e)=>{ this.setState({ShowVideo:true}) };

  handlePopoverClose=()=>{  this.setState({openVideoResumePreview:false}); };

  saveJobs=(id)=>{ this.props.saveJobs(id); };
  render() {
    const { jobListing,saved,classes,draftedJobs} = this.props;
    return (
      <div className="job-list-main-container px-20 py-sm-32  mb-sm-20    px-sm-44">
        {!this.state.ShowVideo?<div> <Grid className="job-list-heading-div">
          <Grid className="job-list-job-heading-match-div">
            <div className="job-list-job-heading" onClick={this.props.jobDetails}>{`${jobListing.job_title} - ${jobListing.job_Role}`}</div>
          </Grid>
          <Grid className="job-list-item-documents-icons">
            {jobListing.job_description_documents && jobListing.job_description_documents.video? <div className="job-list-item-documents-icons--video-icon-wrapper" onClick={this.openVideoResumePreview}>
              <CustomIcon icon={videoCamera} iconStyle="job-list-item-documents-icons--video-icon" />
            </div>:""}
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
            {jobListing.job_description_documents && jobListing.job_description_documents.document_1?  <Grid className="job-list-item-documents-icons--document-icon-wrapper" onClick={this.props.jobDetails}>
                <CustomIcon icon={file} iconStyle="job-list-item-documents-icons--document-icon" />
              </Grid>
              :""}
            {jobListing.application_status=='Apply'?
              <Grid className="job-list-apply-button" onClick={this.props.applyJob}>
                Quick Apply
              </Grid>:<Grid className="job-list-apply-button" style={{cursor:'default'}}>
                Applied
              </Grid>}
          </Grid>
        </Grid>
          <Grid container spacing={16} className="job-list-company-name-wrapper">
            <Grid item xs={12} md={4}>
              <IconValueComponent iconName={company} text={jobListing.company_name}/>
            </Grid>
            <Grid item xs={12} md={4} style={{display:"flex"}}>
              <span className="job-type-title-new">Job Type :</span>
              <span className="job-type-subtitle-new">{` ${jobListing.job_type.length>0?jobListing.job_type[0]:''}`}</span>
              {jobListing.job_type.length > 1 ?
                <Tooltip  disableFocusListener disableTouchListener  title={jobListing.job_type.map((key, index)=> {if(index!==0){return <div>{key}</div>}})}
                  placement="right-end" classes={{ tooltip: classes.lightTooltip }}>
                  <div className="location-more-tooltip"> +{jobListing.job_type.length - 1}</div>
                </Tooltip>
                :
                null
              }
            </Grid>
            <Grid item xs={12} md={4}>
              <div className="job-list-criteria-match">
                <span className="job-list-match">Match:</span>
                <span className="job-list-percentage">{`${jobListing.match}%`}</span>
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={16} className="job-listing-loc-sal-exp">
            {!draftedJobs?
            <Grid item xs={12} md={4}>
              <div className="icon-value-body">
                <div className="icon-value-wrapper" >
                  <div className="icon-styles"> <CustomIcon icon={location}></CustomIcon> </div>
                  <div className="value-styles1">{jobListing.location.length>0?jobListing.location[0]:''}</div>
                    {jobListing.location.length > 1 ?
                      <Tooltip  disableFocusListener disableTouchListener  title={jobListing.location.map((key, index)=> {if(index!==0){return <div>{key}</div>}})}
                        placement="right-end" classes={{ tooltip: classes.lightTooltip }}>
                        <div className="location-more-tooltip"> +{jobListing.location.length - 1}</div>
                      </Tooltip>
                      :
                      null
                    }
                </div>
              </div>
            </Grid>
              :null
            }
            <Grid item xs={12} md={4}>
              <IconValueComponent iconName={workExpIcon} text={jobListing.experience_details}/>
            </Grid>
            <Grid item xs={12} md={4}>
              <IconValueComponent iconName={rupee} text={jobListing.expected_salary}/>
            </Grid>
          </Grid>   
          <div className="job-list-job-post">{jobListing.job_description}</div>
          <div className="job-list-skill-div">
            <div className="job-list-skill">Skills:</div>
            <div className="job-list-req-skill">{jobListing.skills}</div>
          </div>
          <div className="job-list-recruiter-share-bookmark">
            <div className="job-list-recruiter">{jobListing.posted_by}</div>
            {!saved? <div className="job-list-share-bookmark">
              <div onClick={()=>this.saveJobs(jobListing.key)}>
                <CustomIcon icon={!jobListing.saved?star:YellowStar} iconStyle="job-list-bookmark-image" />
              </div>
              <div className="job-list-share-bookmark-img">
                <CustomIcon icon={share} iconStyle="job-list-share-image" />
              </div>
            </div>:<div className="job-list-recruiter">
              {jobListing.saved_on}
            </div>}
           
          </div>
        </div>:
        jobListing.job_description_documents && jobListing.job_description_documents.video?
          <div className="show-video-style" >
            <img src={close} className="close-video-preview" onClick={(e)=>this.closeVideoPreview(e)} />
            <BetaJSVideoPlayer
              source={jobListing.job_description_documents.video.includes("shenzyn")?jobListing.job_description_documents.video.replace("https%3A/","http://"):SERVER_API_URL+jobListing.job_description_documents.video.replace("https%3A/","http://")}
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
