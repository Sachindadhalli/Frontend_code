//library dependency
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

//custom components
import PersonalDetails from '../AppliedUserProfile/Components/PersonalDetails';
import DesiredCareerProfile from '../AppliedUserProfile/Components/DesiredCareerProfile';
import MyAchievements from '../AppliedUserProfile/Components/MyAchievements';
import Projects from '../AppliedUserProfile/Components/Projects';
import AppliedUserProfileSideCard from '../AppliedUserProfile/Components/AppliedUserProfileSideCard';
import BasicDetails from '../AppliedUserProfile/Components/BasicDetails/BasicDetails';
import ResumeHeadline from '../AppliedUserProfile/Components/ResumeHeadline/ResumeHeadline';
import Technologies from '../AppliedUserProfile/Components/Technologies/Technologies';
import Employment from '../AppliedUserProfile/Components/Employment/Employment';
import TechnologiesWorkedOn from '../AppliedUserProfile/Components/TechnologiesWorkedOn';
import ProfileSummary from '../AppliedUserProfile/Components/ProfileSummary';
import Education from '../AppliedUserProfile/Components/Education';
import PageNotFound from '../../../../components/PageNotFound';
import LoadingIcon from "../../../../components/LoadingIcon/LoadingIcon";

//styles
import './styles.scss';

//utilities
import {apiCall, handleLocalStorage} from "../../../../Utilities";
import {EMPLOYER_SHARED_USER_PROFILE} from "../../../../../config/constants";

/**
 * this function used to check object is empty or not
 * @param obj
 * @returns {boolean}
 */
function isEmpty(obj) {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }
  return true;
}

/**
 * this function used to check array of object is empty or not
 * @param obj
 * @returns {boolean}
 */
function isEmptyObjOfArray(obj) {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) if (obj[prop].length > 0) return false;
  }
  return true;
}

/**
 * this function used to get query parameters from url
 * @param variable
 * @returns {*}
 */
function getQueryVariable(variable) {
  let query = window.location.search.substring(1);
  let vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return (false);
}

// used to overrides material ui components styles
const styles = () => ({
  button: {
    color: " #e73a9e",
    border: "1px solid #e73a9e",
    marginRight: "12px",
    "&:hover": {background: "#e73a9e17 !important"}
  },
  input: {display: 'none'},
});


class SharedAppliedUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false, sorry: false, result: {
        is_fresher: false, application_status: "", training_internship:
          {internship: [], training: []}, achievements: {
          online_profile: [], work_sample: [], publication: [],
          presentation: [], patent: [], certification: [], reward: []
        }, desired_profile: {}, personal_details: {},
        projects: [], basic_profile: {}, resume_headline: "", profile_summary: "", skills: [], employment_details: [],
        education: [], technologies: [], resumes: {}, snippet: {},
      }
    };
  }

  componentWillMount() {
    /**
     * here we are calling user profile details api function to get details
     */
    this.callEmployerUserProfileApi();
  }

  /**
   * this function call user profile api and stores in state variable
   * @returns {Promise<void>}
   */
  callEmployerUserProfileApi = async () => {
    this.setState({loading: true});
    let headers = {'authorization': handleLocalStorage('get', 'employerLogin'), 'Content-Type': 'application/json',};
    const requestData = {token: getQueryVariable('token')};
    try {
      const USerProfileData = await apiCall('get', requestData, EMPLOYER_SHARED_USER_PROFILE, headers);
      if (USerProfileData.status) {
        USerProfileData.data["is_fresher"] = !USerProfileData.is_experienced;
        this.setState({result: USerProfileData.data, loading: false, sorry: false})
      } else this.setState({result1: USerProfileData.data, loading: false, sorry: true})
    } catch (e) {
    }
  };

  render() {
    const {classes} = this.props;
    const {sorry, loading, result} = this.state;
    return (
      <div className="shared-inbox-user-profile-page">
        {
          !loading ? !sorry ?
            <div style={{width: "100%"}}>
              <div className="shared-inbox-user-profile-auto-overflow">
                <div className="shared-inbox-user-profile-border-padding">
                  <div className="shared-inbox-user-profile-name-login">
                    <div
                      className="head-text-padding shared-inbox-user-profile-text">{result.snippet ? result.snippet.full_name : ""}</div>
                    <div>
                      <Button variant="outlined" className={classes.button}>
                        Login
                      </Button>
                    </div>
                  </div>
                  <div className="shared-inbox-user-profile-right-container">
                    <div className="shared-inbox-user-profile-left-wraper">
                      {!isEmpty(result.basic_profile) &&
                      <div className="component-div-padding">
                        <BasicDetails
                          fresher_experienced={result.is_fresher}
                          basic_profile={result.basic_profile}
                        />
                      </div>
                      }
                      {result.resume_headline !== '' && result.resume_headline !== null &&
                      <div className="component-div-padding">
                        <ResumeHeadline resume_headline={result.resume_headline}/>
                      </div>
                      }
                      {result.profile_summary !== '' && result.profile_summary !== null &&
                      <div className="component-div-padding">
                        <ProfileSummary profile_summary={result.profile_summary}/>
                      </div>
                      }
                      {result.skills.length !== 0 &&
                      <div className="component-div-padding">
                        <Technologies skills={result.skills}/>
                      </div>
                      }
                      {result.employment_details.length > 0 || !isEmptyObjOfArray(result.training_internship) ?
                        <div className="component-div-padding">
                          <Employment
                            employment_details={result.employment_details}
                            fresher_experienced={result.is_fresher}
                            training_internship={result.training_internship}
                          />
                        </div> : ''
                      }
                      {result.education.length > 0 &&
                      <div className="component-div-padding">
                        <Education education={result.education}/>
                      </div>
                      }
                      {result.technologies.length !== 0 &&
                      <div className="component-div-padding">
                        <TechnologiesWorkedOn technologies={result.technologies}/>
                      </div>
                      }
                      {result.projects.length !== 0 &&
                      <div className="component-div-padding">
                        <Projects projects={result.projects}/>
                      </div>
                      }
                      {!result.is_fresher && (!isEmptyObjOfArray(result.training_internship) || !isEmptyObjOfArray(result.achievements)) ?
                        <div className="component-div-padding">
                          <MyAchievements
                            training_internship={result.training_internship}
                            achievements={result.achievements}
                          />
                        </div>
                        : ''
                      }
                      {!isEmpty(result.desired_profile) &&
                      <div className="component-div-padding">
                        <DesiredCareerProfile desired_profile={result.desired_profile}/>
                      </div>
                      }
                      {!isEmpty(result.personal_details) &&
                      <div className="component-div-padding">
                        <PersonalDetails personal_details={result.personal_details}/>
                      </div>
                      }
                    </div>
                    <div className="shared-inbox-user-profile-right-wraper">
                      <AppliedUserProfileSideCard {...this.props} snippet={result.snippet}
                                                  application_status={result.application_status}
                                                  resumes={result.resumes} viewOnly={true}/>
                    </div>
                  </div>
                </div>
              </div>
            </div> : <PageNotFound/> : <div><LoadingIcon/>
          </div>}
      </div>
    );
  }
}

export default withStyles(styles)(SharedAppliedUserProfile);
