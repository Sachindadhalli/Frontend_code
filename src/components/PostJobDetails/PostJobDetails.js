//library dependencies
import React from 'react';
import {BetaJSVideoPlayer} from 'react-betajs-media-component';
import moment from 'moment';
import {Tooltip} from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles';

//styles
import './style.scss';

//custom components
import SaveAndCancelButton from '../SaveAndCancelButton';
import CustomIcon from '../CustomIcon';
import CustomTag from '../CustomTag';

//icons
import locationIcon from '../../../assets/media/icons/location.svg';
import workExpIcon from '../../../assets/media/icons/work-exp.svg';
import companyIcon from '../../../assets/media/icons/companyblack.svg';
import bookmark from '../../../assets/media/icons/bookmark.svg';
import share from '../../../assets/media/icons/share.svg';
import uncheck from '../../../assets/media/icons/tick-unselected.svg';
import check from '../../../assets/media/icons/tick.svg';
import mediaScreen from '../../../assets/media/images/mediaScreen.png'

//utilities
import {SERVER_API_URL} from "../../../config/constants";

/**
 * @function used to convert array value into string seprated with comma
 * @param arr
 * @returns {string}
 */
function getCommaSeperatedVAlues(arr) {
  let ansStr = '';
  try {
    arr.map(singleItem => {
      ansStr += singleItem.value + ',';
    });
  } catch (exc) {
  }
  return ansStr.slice(0, -1);
}

/**
 * @function,used to convert the date format
 * @param inputDate
 * @returns {string|Date|string}
 */
function getDateToDesiredDate(inputDate) {
  let ansStr = '';
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December',];
  const newDate = new Date(inputDate);
  try {
    ansStr = newDate.getDay() + ' ' + monthNames[newDate.getMonth()] + ', ' + newDate.getFullYear();
  } catch (exc) {
    ansStr = newDate;
  }
  return ansStr;
}
//customised material tooltip style
const styles = theme => ({
  lightTooltip: {
    backgroundColor: theme.palette.common.white,
    color: '#626366',
    boxShadow: theme.shadows[1],
    fontSize: 14,
    padding: '8px 13px 10px 15px',
    fontFamily:'Roboto',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.86,
    letterSpacing: 'normal'
  }
});

/**
 * @function componnet used to preview the job
 * @param props
 * @returns {*}
 * @constructor
 */
function PostJobDetails(props) {
  const {job_details, candidate_profile, manage_response, publish_job, get_in_touch, about_organisation,
    job_description_documents} = props.informations;

  const application_status = props.applicationStatus;
  const { work_experience_max, visible_to_no_one, maximum_ctc, minimum_ctc, is_fresher, work_experience_min, locations,
    how_soon, timings, functional_area, currency, key_skills, job_description, title, job_role, industry, job_type,
    number_of_vacancy} = job_details;

  const {we_encourage, job_for_specified_organisation, job_not_visible_for_specified_organisation, organisation_name, qualification,
    qualification_specialization, phd_qualification, phd_qualification_specialization, qualification_premier,
    qualification_phd_premier, desired_candidate, name,} = candidate_profile;

  const {selected_email, venue, forward_application_to_email, reference_code, address_url, questioner_id, time_from,
    time_to, date_from, date_to, email_or_walkin,} = manage_response;

  const {refresh_time} = publish_job;
  const {walkin_date, walkin_time, venue_get_in, response_on} = get_in_touch;
  const {description, address, organisation_name1, website, file_url} = about_organisation;
  const locationMore = locations.length;
  const {classes} = props;
  const functionAreaConcat = functional_area.map(value => { return value.value }).join(',');
  const industryConcat = industry.map(value => { return value.value }).join(',');
  return (
    <div className="post-job-details">
      <div className="profile-title">
        <div className="role-location post-job-details-left">
          <div className="role">{job_details.job_role.value}</div>
          <div className="locations-etc">
            <div>
              <CustomIcon icon={companyIcon} iconStyle="icon-margin-right"/>
              <CustomTag text={'Cygnet Infotech Pvt. Ltd.'}/>
            </div>
            <div>
              <CustomIcon icon={locationIcon} iconStyle="icon-margin-right"/>
              <CustomTag
                text={`${locations[0]['location']['value']}, ${locations[0]['country']['value']}`}
              />
              {locationMore > 1 ?
                <Tooltip title={locations.map((key, index) => {
                  if (index !== 0) {
                    return <div>
                      {key.location.value} , {key.country.value}
                    </div>
                  }
                })}
                         placement="right-end" classes={{tooltip: classes.lightTooltip}}>
                  <div className="location-more-tooltip"> +{locationMore - 1}</div>
                </Tooltip>
                :
                null
              }
            </div>
            <div>
              <CustomIcon icon={workExpIcon} iconStyle="icon-margin-right"/>
              <CustomTag
                text={
                  is_fresher ? 'Fresher' : `${work_experience_min}-${work_experience_max} years`
                }
              />
            </div>
          </div>
        </div>
        {props.userType.TypeOfUser === 'jobSeeker' ||
        props.userType.TypeOfUser === 'jobApplicationStatus' ? (
          <div
            className="save-and-cancel-button-container"
          >
            <CustomIcon icon={bookmark} className="mr-32" iconStyle="margin-right"/>
            <CustomIcon icon={share} className="mr-32" iconStyle="margin-right"/>
            {application_status === 'Apply' ? (
              <button
                className="shenzyn-btn filled-primary-button px-44 py-8"
                onClick={props.openQuestionnaireDialog}
              >
                Apply
              </button>
            ) : (
              <div className="job-listing-and-application-status">{application_status}</div>
            )}
          </div>
        ) : (
          <div className="save-and-cancel-button-container">
            <SaveAndCancelButton
              cancelText="Edit"
              saveText="Post Job"
              onCancel={props.onEdit}
              onSave={() => {
                props.onSave(refresh_time)
              }}
            />
          </div>
        )}
      </div>
      <div className="post-job-details-hr-line"/>
      <div className="remaining-all">
        <div className="post-job-details-left">
          <div className="job-description-text">Job Description</div>
          <div className="job-description-details-text">{job_description}</div>
          <div className="left-hr-line"/>
          <div className="desired-candidate-profile-text">Desired Candidate Profile</div>
          <div className="desired-candidate-profile-container">
            <div className="candidate-row">
              <div className="candidate-col">
                <div className="heading-text">We encourage back to work</div>
                <div className="actual-value">{we_encourage ? 'Yes' : 'No'}</div>
              </div>
              <div className="candidate-col">
                <div className="heading-text">
                  {job_for_specified_organisation === 0
                    ? 'This job should not be visible for the organizations:'
                    : job_for_specified_organisation === 1
                      ? 'This job should be visible for the organizations'
                      : 'This job is for all'}
                </div>
                <div className="actual-value">
                  {job_for_specified_organisation === 2
                    ? 'Yes'
                    : getCommaSeperatedVAlues(organisation_name)}
                </div>
              </div>
            </div>
            <div className="candidate-row">
              <div className="candidate-col">
                <div className="heading-text">Qualifications</div>
                <div className="actual-value">
                  {qualification_premier === true
                    ? getCommaSeperatedVAlues(qualification) + ' from Premier Universities/Colleges'
                    : getCommaSeperatedVAlues(qualification)}
                </div>
              </div>
              <div className="candidate-col">
                <div className="heading-text">PhD Qualification</div>
                <div className="actual-value">
                  {phd_qualification.length === 0
                    ? 'Not Required'
                    : qualification_phd_premier
                      ? getCommaSeperatedVAlues(phd_qualification) +
                      ' from Premier Universities/Colleges'
                      : getCommaSeperatedVAlues(phd_qualification)}
                </div>
              </div>
            </div>
          </div>
          <div className="heading-text">Desired Candidate Profile</div>
          <div className="content-text">{desired_candidate}</div>
          <div className="left-hr-line"/>
          <div className="dark-text-heading">About Organisation</div>
          <div className="organisation-name-text">{about_organisation.organisation_name}</div>
          <div className="desired-candidate-profile-container">
            <div className="candidate-row">
              <div className="candidate-col">
                <div className="heading-text">
                  <CustomIcon/>
                  <div>Website</div>
                </div>
                <div className="actual-value">{website}</div>
              </div>
              {props.userType.TypeOfUser === 'jobSeeker' ||
              props.userType.TypeOfUser === 'jobApplicationStatus' ? null : (
                <div className="candidate-col">
                </div>
              )}
            </div>
            {props.userType.TypeOfUser === 'jobSeeker' ||
            props.userType.TypeOfUser === 'jobApplicationStatus' ? null : (
              <div className="candidate-row">
              </div>
            )}
          </div>
          <div className="heading-text">Description</div>
          <div className="content-text">{description}</div>
          {props.userType.TypeOfUser === 'jobSeeker' ||
          props.userType.TypeOfUser === 'jobApplicationStatus' ? null : (
            <div>
            </div>
          )}
          {props.userType.TypeOfUser === 'jobSeeker' ||
          props.userType.TypeOfUser === 'jobApplicationStatus' ? (
            <div/>
          ) : (
            <div>
              <div className="left-hr-line"/>
              <div className="dark-text-heading">Schedule a Refresh & Post the Job</div>
              <div className="heading-teext">
                Schedule a refresh on the website for the current job, once every {refresh_time}
              </div>
            </div>
          )}
        </div>
        <div className="post-job-details-right">
          {job_description_documents && job_description_documents.hasOwnProperty('video') && job_description_documents.video ?
            <div className="user-video-resume-card">
              <div className="user-video-resume-title dark-text-heading">Video Resume</div>
              <BetaJSVideoPlayer
                source={job_description_documents.video.includes("shenzyn") ? job_description_documents.video.replace("https%3A/", "http://") : SERVER_API_URL + job_description_documents.video.replace("https%3A/", "http://")}
                poster={mediaScreen}
                theme={"cube"}
                locale={'en'}
                width="100%"
                height={"auto"}
              />
              <div className="left-hr-line"/>
            </div>
            : null}
          <div className="dark-text-heading">Skills</div>
          {key_skills.map(skillItem => {
            return (
              <div style={{display: 'flex'}}>
                {skillItem.match ? (
                  <CustomIcon icon={check} iconStyle="check-uncheck-style"/>
                ) : (
                  <CustomIcon iconStyle="check-uncheck-style" className="mr-12" icon={uncheck}/>
                )}
                <div className="actual-value skills-item">{skillItem.value}</div>
              </div>
            );
          })}
          <div className="left-hr-line"/>
          <div className="dark-text-heading">Job Details</div>
          <div className="job-details">
            <div>
              <div className="heading-text">Job type</div>
              <div className="actual-value">{job_type}</div>
            </div>
            <div>
              <div className="heading-text">Number of vacancies</div>
              <div className="actual-value">{number_of_vacancy}</div>
            </div>
            <div>
              <div className="heading-text">Functional Area</div>
              <div className="actual-value">{functionAreaConcat}</div>
            </div>
            <div>
              <div className="heading-text">Industry</div>
              <div className="actual-value">{industryConcat}</div>
            </div>
            <div>
              <div className="heading-text">How soon required to join?</div>
              <div className="actual-value">{how_soon}</div>
            </div>
            <div>
              <div className="heading-text">Annual CTC</div>
              {visible_to_no_one ? (<div className="actual-value">{minimum_ctc}</div>) : (
                <div className="actual-value">
                  {currency.value + ' ' + minimum_ctc + '-' + maximum_ctc}
                </div>)}
            </div>
            <div>
              <div className="heading-text">Shift Time</div>
              <div className="actual-value">
                {timings.map(singleTiming => {
                  return (
                    <div style={{marginBottom: '8px'}}>
                      {singleTiming.shift} ({moment(singleTiming.start).format('h:mm A')} -{' '}
                      {moment(singleTiming.end).format('h:mm A')})
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {props.userType.TypeOfUser === 'jobSeeker' ||
          props.userType.TypeOfUser === 'jobApplicationStatus' ? (
            response_on !== 'Email' ? (
              <div>
                <div className="left-hr-line"/>
                <div className="dark-text-heading">Get in touch</div>
                <div className="job-details">
                  <div>
                    <div className="heading-text">Receive responses on</div>
                    <div className="actual-value">{response_on}</div>
                  </div>
                  <div>
                    <div className="heading-text">Walk-in date</div>
                    <div className="actual-value">{walkin_date}</div>
                  </div>
                  <div>
                    <div className="heading-text">Timings</div>
                    <div className="actual-value">{walkin_time}</div>
                  </div>
                  <div>
                    <div className="heading-text">Venue</div>
                    <div className="actual-value">{venue_get_in}</div>
                  </div>
                </div>
                <div className="left-hr-line"/>
                <div className="Document-div">
                  <div className="dark-text-heading">Documents</div>
                  <div className="employer-docs">
                    <div className="employer-docs-custom-icon">
                      <CustomIcon icon={companyIcon} iconStyle="icon-margin-right"/>
                    </div>
                    <div className="custom-tag-employer-doc">
                      <CustomTag text="Doc 123.pdf" className="document-item"/>
                      <div className="employer-doc">
                        <CustomTag text="Doc 124.pdf" className="document-item"/>
                      </div>
                    </div>
                  </div>
                  <div className="employer-docs-video">
                    <div className="employer-docs-custom-icon-video">
                      <CustomIcon icon={share} iconStyle="icon-margin-right"/>
                    </div>
                    <CustomTag text="Video.mp4" className="document-item"/>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="left-hr-line"/>
                <div className="Document-div">
                  <div className="dark-text-heading">Documents</div>
                  {job_description_documents && job_description_documents.hasOwnProperty('document_1') ? (
                    <div className="employer-docs">
                      <div className="employer-docs-custom-icon mt-8">
                        <CustomIcon icon={companyIcon} iconStyle="icon-margin-right"/>
                      </div>
                      <div className="custom-tag-employer-doc">
                        {job_description_documents && job_description_documents.hasOwnProperty('document_1') && job_description_documents.document_1 ?
                          <CustomTag
                            text={job_description_documents.document_1.split('/')[job_description_documents.document_1.split('/').length - 1]}
                            className="document-item mt-8"/> : null
                        }
                        {job_description_documents && job_description_documents.hasOwnProperty('document_2') && job_description_documents.document_2 ?
                          <CustomTag
                            text={job_description_documents.document_2.split('/')[job_description_documents.document_2.split('/').length - 1]}
                            className="document-item mt-8"/> : null
                        }
                        {job_description_documents && job_description_documents.hasOwnProperty('document_3') && job_description_documents.document_3 ?
                          <CustomTag
                            text={job_description_documents.document_3.split('/')[job_description_documents.document_3.split('/').length - 1]}
                            className="document-item mt-8"/> : null
                        }
                        {job_description_documents && job_description_documents.hasOwnProperty('document_4') && job_description_documents.document_4 ?
                          <CustomTag
                            text={job_description_documents.document_4.split('/')[job_description_documents.document_4.split('/').length - 1]}
                            className="document-item mt-8"/> : null
                        }
                        {job_description_documents && job_description_documents.hasOwnProperty('document_5') && job_description_documents.document_5 ?
                          <CustomTag
                            text={job_description_documents.document_5.split('/')[job_description_documents.document_5.split('/').length - 1]}
                            className="document-item mt-8"/> : null
                        }
                      </div>
                    </div>) : null
                  }
                </div>
              </div>
            )
          ) : (
            <div>
              <div className="dark-text-heading">Manage Responses</div>
              <div className="manage-responses-items">
                {email_or_walkin === 'email' ? (
                  <div className="email-responses">
                    <div>
                      <div className="heading-text">Email</div>
                      <div className="actual-value">{selected_email}</div>
                    </div>
                    <div>
                      <div className="heading-text">Forward mail to</div>
                      <div className="actual-value">{selected_email}</div>
                    </div>
                  </div>
                ) : (
                  <div className="walk-in-responses">
                    <div>
                      <div className="heading-text">Receive responses on</div>
                      <div className="actual-value">Walk-in</div>
                    </div>
                    <div>
                      <div className="heading-text">Walk-in date</div>
                      <div className="actual-value">
                        {getDateToDesiredDate(date_from) + ' - ' + getDateToDesiredDate(date_to)}
                      </div>
                    </div>
                    <div>
                      <div className="heading-text">Walk-in time</div>
                      <div className="actual-value">
                        {moment('2014-08-18T' + time_from).format('h:mm A') +
                        ' - ' +
                        moment('2014-08-18T' + time_to).format('h:mm A')}
                      </div>
                    </div>
                    <div>
                      <div className="heading-text">Venue</div>
                      <div className="actual-value venue-pinkish" style={{color: '#e73a9e'}}>
                        {venue}
                      </div>
                    </div>
                  </div>
                )}
                <div>
                  <div className="heading-text">Reference Code</div>
                  <div className="actual-value">{reference_code}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(PostJobDetails);
