//library dependencies
import React from 'react';
import moment from 'moment';
//style
import './style.scss';
//icon
import locationIcon from '../../../assets/media/icons/location.svg';
import workExpIcon from '../../../assets/media/icons/work-exp.svg';
import companyIcon from '../../../assets/media/icons/companyblack.svg';
import bookmark from '../../../assets/media/icons/bookmark.svg';
import share from '../../../assets/media/icons/share.svg';
import uncheck from '../../../assets/media/icons/tick-unselected.svg';
import check from '../../../assets/media/icons/tick.svg';
//custom component
import CustomIcon from '../CustomIcon';
import CustomTag from '../CustomTag';

function getCommaSeperatedVAlues(arr) {
  let ansStr = "";
  try {
    arr.map(singleItem => {
      ansStr += singleItem.value + ','
    })
  }
  catch (exc) {
  }
  return ansStr.slice(0, -1)
}

function getDateTimeToTime(timeParam) {
  let derivedTime = "";
  try {
    dateTime = new Date(timeParam);
    let hour = dateTime.getHour();
    let minute = dateTime.getMinute();
    const h = hour % 12 === 0 ? hour % 12 : hour > 12 ? hour % 12 : hour;

  }
  catch (exc) {
  }
  return derivedTime
}

function getDateToDesiredDate(inputDate) {
  let ansStr = "";
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const newDate = new Date(inputDate);
  try {
    ansStr = newDate.getDay() + ' ' + monthNames[newDate.getMonth()] + ', ' + newDate.getFullYear()
  }
  catch (exc) {
    ansStr = newDate;
  }
  return ansStr
}

function JobSeekerProfileDetails(props) {
  const myOrganisation = [{name: 'Document1', path: ''}, {name: 'Document2', path: ''}, {name: 'Document13', path: ''}]
  const keySkills = [{key: 0, value: 'Recruitement'}, {key: 1, value: 'Technology'}]
  const {job_details, candidate_profile, manage_response, publish_job} = props.informations;
  const {
    work_experience_max, visible_to_no_one, maximum_ctc, minimum_ctc, is_fresher, work_experience_min,
    locations, how_soon, timings, functional_area, currency, key_skills, job_description, title, job_role, job_type, number_of_vacancy,
    industry
  }
    = job_details;
  const {
    we_encourage, job_for_specified_organisation, job_not_visible_for_specified_organisation, organisation_name, qualification, qualification_specialization,
    phd_qualification, phd_qualification_specialization, qualification_premier, qualification_phd_premier, desired_candidate,
    name,
  } = candidate_profile
  const {
    selected_email, venue, forward_application_to_email, reference_code, address_url, questioner_id
    , time_from, time_to, date_from, date_to, email_or_walkin
  } = manage_response
  const {refresh_time} = publish_job
  return (
    <div className="post-job-details">
      <div className="profile-title">
        <div className="role-location post-job-details-left">
          <div className="role"> {job_details.job_role.value} </div>
          <div className="locations-etc">
            <div>
              <CustomIcon icon={companyIcon} iconStyle="icon-margin-right"/>
              <CustomTag text={"Cygnet Infotech Pvt. Ltd."}/>
            </div>
            <div>
              <CustomIcon icon={locationIcon} iconStyle="icon-margin-right"/>
              <CustomTag text={`${locations[0]['location']['value']}, ${locations[0]['country']['value']}`}/>
            </div>
            <div>
              <CustomIcon icon={workExpIcon} iconStyle="icon-margin-right"/>
              <CustomTag text={is_fresher ? 'Fresher' : `${work_experience_min}-${work_experience_max} years`}/>
            </div>
          </div>
        </div>
        <div className="save-and-cancel-button-container"
             style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
          <CustomIcon icon={bookmark} className="mr-32" iconStyle="margin-right"></CustomIcon>
          <CustomIcon icon={share} className="mr-32" iconStyle="margin-right"></CustomIcon>
          <button className="shenzyn-btn filled-primary-button px-44 py-8">Apply</button>
        </div>
      </div>
      <div className="post-job-details-hr-line"></div>
      <div className="remaining-all">
        <div className="post-job-details-left">
          <div className="job-description-text"> Job Description</div>
          <div className="job-description-details-text"> {job_description} </div>
          <div className="left-hr-line"></div>
          <div className="desired-candidate-profile-text"> Desired Candidate Profile</div>
          <div className="desired-candidate-profile-container">
            <div className="candidate-row">
              <div className="candidate-col">
                <div className="heading-text"> We encourage back to work</div>
                <div className="actual-value"> {we_encourage ? 'Yes' : 'No'} </div>
              </div>
              <div className="candidate-col">
                <div className="heading-text">
                  {
                    job_for_specified_organisation === 0 ?
                      'This job should not be visible for the organizations:' :
                      job_for_specified_organisation === 1 ?
                        'This job should be visible for the organizations' : 'This job is for all'
                  }
                </div>
                <div className="actual-value">
                  {job_for_specified_organisation === 2 ? "Yes" :
                    getCommaSeperatedVAlues(organisation_name)
                  }
                </div>
              </div>

            </div>
            <div className="candidate-row">
              <div className="candidate-col">
                <div className="heading-text">
                  Qualifications
                </div>
                <div className="actual-value">
                  {qualification_premier === true ? getCommaSeperatedVAlues(qualification) + " from Premier Universities/Colleges" : getCommaSeperatedVAlues(qualification)}
                </div>
              </div>
              <div className="candidate-col">
                <div className="heading-text">
                  PhD Qualification
                </div>
                <div className="actual-value">
                  {phd_qualification.length === 0 ? "Not Required" :
                    qualification_phd_premier ? getCommaSeperatedVAlues(phd_qualification) + " from Premier Universities/Colleges" : getCommaSeperatedVAlues(phd_qualification)
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="heading-text"> Desired Candidate Profile</div>
          <div className="content-text"> {desired_candidate} </div>
          <div className="left-hr-line"></div>
          <div className="dark-text-heading"> About Organisation</div>
          <div className="organisation-name-text"> Cygnet Infotech Pvt. Ltd</div>
          <div className="desired-candidate-profile-container">
            <div className="candidate-row">
              <div className="candidate-col">
                <div className="heading-text"><CustomIcon/>
                  <div> Website</div>
                </div>
                <div className="actual-value"> loremipsum.com</div>
              </div>
              <div className="candidate-col">
                <div className="heading-text">
                  <CustomIcon/>
                  <div> Contact Person</div>
                </div>
                <div className="actual-value"> John Oliver</div>
              </div>

            </div>
            <div className="candidate-row">
              <div className="candidate-col">
                <div className="heading-text"><CustomIcon/>
                  <div> Address</div>
                </div>
                <div className="actual-value"> 101, Shavari, MG Road, White House - 400098.</div>
              </div>
              <div className="candidate-col">
                <div className="heading-text"><CustomIcon/>
                  <div>Contact Number</div>
                </div>
                <div className="actual-value"> 4000988765</div>
              </div>
            </div>
          </div>
          <div className="heading-text"> About Organisation</div>
          <div className="content-text">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
            sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </div>
          <div className="heading-text about-organisation-margin"> About Organisation</div>
          <div className="employer-docs">
            {
              myOrganisation.map((documentItem => {
                return <CustomTag text={documentItem.name} className="document-item"/>
              }))
            }
          </div>
          <div className="left-hr-line"></div>
          <div className="dark-text-heading"> Schedule a Refresh & Post the Job</div>
          <div className="heading-teext">
            Schedule a refresh on the website for the current job, once every {refresh_time}
          </div>
        </div>
        <div className="post-job-details-right">
          <div className="dark-text-heading"> Skills</div>
          {
            key_skills.map(skillItem => {
              return (
                <div style={{display: 'flex'}}>
                  {skillItem.checked ? <CustomIcon icon={check} iconStyle="check-uncheck-style"></CustomIcon> :
                    <CustomIcon iconStyle="check-uncheck-style" className="mr-12" icon={uncheck}></CustomIcon>}
                  <div className="actual-value skills-item">{skillItem.value}</div>
                </div>
              )
            })
          }
          <div className="left-hr-line"></div>
          <div className="dark-text-heading"> Job Details</div>
          <div className="job-details">
            <div>
              <div className="heading-text"> Job type</div>
              <div className="actual-value"> {job_type} </div>
            </div>
            <div>
              <div className="heading-text"> Number of vacancies</div>
              <div className="actual-value"> {number_of_vacancy} </div>
            </div>
            <div>
              <div className="heading-text"> Industry (Functional Area)</div>
              <div className="actual-value"> {functional_area.value} </div>
            </div>
            <div>
              <div className="heading-text"> How soon required to join?</div>
              <div className="actual-value"> {how_soon} </div>
            </div>
            <div>
              <div className="heading-text"> Annual CTC</div>
              <div className="actual-value"> {currency.value + ' ' + minimum_ctc + '-' + maximum_ctc} </div>
            </div>
            <div>
              <div className="heading-text"> Timings</div>
              <div className="actual-value">
                {
                  timings.map(singleTiming => {
                    return <div style={{marginBottom: '8px'}}>
                      {singleTiming.shift} ({moment(singleTiming.start).format('h:mm A')}
                      - {moment(singleTiming.end).format('h:mm A')})
                    </div>
                  })
                }
              </div>
            </div>
          </div>
          <div className="dark-text-heading"> Manage Responses</div>
          <div className="manage-responses-items">
            {
              email_or_walkin == "email" ?
                <div className="email-responses">
                  <div>
                    <div className="heading-text"> Email</div>
                    <div className="actual-value"> {selected_email} </div>
                  </div>
                  <div>
                    <div className="heading-text"> Forward mail to</div>
                    <div className="actual-value"> {selected_email} </div>
                  </div>
                </div> :
                <div className="walk-in-responses">
                  <div>
                    <div className="heading-text"> Receive responses on</div>
                    <div className="actual-value"> Walk-in</div>
                  </div>
                  <div>
                    <div className="heading-text"> Walk-in date</div>
                    <div className="actual-value">
                      {getDateToDesiredDate(date_from) + ' - ' + getDateToDesiredDate(date_to)}
                    </div>
                  </div>
                  <div>
                    <div className="heading-text"> Walk-in time</div>
                    <div className="actual-value">
                      {moment('2014-08-18T' + time_from).format('h:mm A') + ' - ' + moment('2014-08-18T' + time_to).format('h:mm A')}
                    </div>
                  </div>
                  <div>
                    <div className="heading-text"> Venue</div>
                    <div className="actual-value venue-pinkish" style={{color: '#e73a9e'}}> {venue} </div>
                  </div>
                </div>
            }
            <div>
              <div className="heading-text"> Reference Code</div>
              <div className="actual-value"> {reference_code} </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobSeekerProfileDetails
