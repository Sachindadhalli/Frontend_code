//library dependencies
import React, {Component} from 'react';
import {Tooltip} from '@material-ui/core';
import moment from 'moment';
//styles
import './styles.scss';
//custom components
import CustomIcon from '../../../../components/CustomIcon';
//icons
import company from '../../../../../assets/media/icons/company.svg';
import location from '../../../../../assets/media/icons/location.svg';
import tooltipIcon from '../../../../../assets/media/icons/tooltip-2.svg';

class JobApplicationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {textChange: false,};
  }

  /**
   * On change of view less or more,updating state
   * @param e
   */
  handleChange = e => {
    this.setState({textChange: !this.state.textChange});
  };

  render() {
    const {data} = this.props;
    return (
      <div className="job-application-component-main-container">
        <div className="job-application-component-view-less-part">
          <div className="job-application-component-heading-div">
            <div className="job-application-component-job-heading" onClick={this.props.jobDetails}>
              {data.job_title}
            </div>
            <div className="job-application-component-company-applied-div">
              <div className="job-application-component-company-image-div">
                <CustomIcon icon={company} iconStyle="job-application-component-company-image"/>
                <div className="job-application-component-company-name">{data.company}</div>
              </div>
              <div className="job-application-date-of-applied">
                {'Applied on ' + moment(data.applied_on).format('Do MMM YYYY')}
              </div>
            </div>
          </div>
          <div className="job-application-componenting-location-review-view-more">
            <div className="job-application-component-location-review">
              <div className="job-application-component-location-img">
                <CustomIcon icon={location} iconStyle="job-application-component-location-image"/>
                <div className="job-application-component-location">{data.location}</div>
              </div>
              <div className="review-later-tool-tip">
                <div className="job-application-component-review">{data.status}</div>
                {data.status === 'Applied' ? (
                  <Tooltip
                    disableFocusListener disableTouchListener
                    title="You have applied for this job, and nothing has come from the recruiter."
                    placement="right"
                  >
                    <span className="ml-8">
                      <CustomIcon icon={tooltipIcon}/>
                    </span>
                  </Tooltip>
                ) : data.status === 'In Review' ? (
                  <Tooltip disableFocusListener disableTouchListener title="Your job application is in review."
                           placement="right">
                    <span className="ml-8">
                      <CustomIcon icon={tooltipIcon}/>
                    </span>
                  </Tooltip>
                ) : data.status === 'On Hold' ? (
                  <Tooltip disableFocusListener disableTouchListener title="Your job application is on hold for now."
                           placement="right">
                    <span className="ml-8">
                      <CustomIcon icon={tooltipIcon}/>
                    </span>
                  </Tooltip>
                ) : data.status === 'Shortlisted' ? (
                  <Tooltip disableFocusListener disableTouchListener title="Your job application is shortlisted."
                           placement="right">
                    <span className="ml-8">
                      <CustomIcon icon={tooltipIcon}/>
                    </span>
                  </Tooltip>
                ) : data.status === 'Rejected' ? (
                  <Tooltip disableFocusListener disableTouchListener title="Your job application is rejected."
                           placement="right">
                    <span className="ml-8">
                      <CustomIcon icon={tooltipIcon}/>
                    </span>
                  </Tooltip>
                ) : data.status === 'Review Later' ? (
                  <Tooltip
                    disableFocusListener disableTouchListener
                    title="Your job application has been put aside to review later."
                    placement="right"
                  >
                    <span className="ml-8">
                      <CustomIcon icon={tooltipIcon}/>
                    </span>
                  </Tooltip>
                ) : data.status === 'Offered' ? (
                  <Tooltip disableFocusListener disableTouchListener title="You have been offered this job, congrats!"
                           placement="right">
                    <span className="ml-8">
                      <CustomIcon icon={tooltipIcon}/>
                    </span>
                  </Tooltip>
                ) : null}
              </div>
            </div>
            <div className="job-application-component-view-less-more" onClick={this.handleChange}>
              {this.state.textChange === true ? 'View Less' : 'View More'}
            </div>
          </div>
        </div>
        {this.state.textChange === false ? null : <hr className="job-application-component-line"/>}
        {this.state.textChange === false ? null : (
          <div className="job-application-component-view-more-part">
            <div className="job-application-component-recruiting-name-company">
              <div className="job-application-component-recruiter-name-div">
                <div className="job-application-component-recruiter-name-heading">
                  Recruiter Name:
                </div>
                <div className="job-application-component-recruiter-name">
                  {data.recruiter_name}
                </div>
              </div>
              <div className="job-application-component-recruiting-company-div">
                <div className="job-application-component-recruiting-company-heading">
                  Recruting Company:
                </div>
                <div className="job-application-component-recruiting-company">
                  {data.recruiting_company}
                </div>
              </div>
            </div>
            <div className="job-application-component-view-more-count-send-message">
              <div className="job-application-component-view-more-count">
                <span className="job-application-component-view-count-heading">
                  How many times have I applied for the jobs posted by the same employer :
                  <span className="job-application-component-count">{data.posted_job}</span>
                </span>

              </div>
              <div className="job-application-component-button">
                <button className="shenzyn-btn outline-primary-button px-28 mr-20 ">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default JobApplicationComponent;
