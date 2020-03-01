//library dependency
import React, {Component} from 'react';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {toast} from "react-toastify";
import {createMuiTheme} from "@material-ui/core/styles/index";
import {Tooltip} from "@material-ui/core";
import {MuiThemeProvider} from "@material-ui/core/styles";

//custom components
import CustomIcon from '../../../../components/CustomTag';
import EmployerSideNav from '../../../../components/EmployerSideNav/EmployerSideNav';
import PersonalDetails from './Components/PersonalDetails';
import DesiredCareerProfile from './Components/DesiredCareerProfile';
import MyAchievements from './Components/MyAchievements';
import Projects from './Components/Projects';
import AppliedUserProfileSideCard from './Components/AppliedUserProfileSideCard';
import BasicDetails from './Components/BasicDetails/BasicDetails';
import ResumeHeadline from './Components/ResumeHeadline/ResumeHeadline';
import Technologies from './Components/Technologies/Technologies';
import Employment from './Components/Employment/Employment';
import TechnologiesWorkedOn from './Components/TechnologiesWorkedOn';
import ProfileSummary from './Components/ProfileSummary';
import Education from './Components/Education';
import LoadingIcon from "../../../../components/LoadingIcon/LoadingIcon";

//styles
import './styles.scss';

//utilities
import {apiCall, handleLocalStorage} from "../../../../Utilities";
import {EMPLOYER_USER_PROFILE} from "../../../../../config/constants";

//icons
import SharableWhite from '../../../../../assets/media/icons/sharableWhite.svg'
import SharablePink from '../../../../../assets/media/icons/sharablePink.svg'

/**
 * used to override custom material theme styles
 * @type {Theme}
 */
const theme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        'min-width': '200px',
        'min-height': '38px',
        'fontFamily': 'Roboto',
        'fontSize': '14px',
        'fontWeight': 'normal',
        'fontStyle': 'normal',
        'fontStretch': 'normal',
        'lineHeight': 'normal',
        'letterSpacing': 'normal',
        'textAlign': 'center',
        'color': '#626366',
        'backgroundColor': '#FFFFFF',
        'borderRadius': '4px',
        'boxShadow': `0 1px 2px 0 rgba(0, 0, 0, 0.1)`,
        'border': ` solid 1px #dbdbdb`,
        'paddingTop': '12px',
        'paddingRight': '9px',
        'paddingBottom': '18px',
        'paddingLeft': '14px',
        'boxSizing': 'border-box'
      }
    }
  }
});

class AppliedUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      copy: false,
      result: {
        is_fresher: false,
        url: '',
        application_status: "",
        training_internship: {
          internship: [],
          training: []
        },
        achievements: {
          online_profile: [],
          work_sample: [],
          publication: [],
          presentation: [],
          patent: [],
          certification: [],
          reward: []
        },
        desired_profile: {},
        personal_details: {},
        projects: [],
        basic_profile: {},
        resume_headline: "",
        profile_summary: "",
        skills: [],
        employment_details: [],
        education: [],
        technologies: [],
        resumes: {},
        snippet: {},
      }
    };
  }

  componentWillMount() {
    //before component mount call callEmployerUserProfileAPi function
    this.callEmployerUserProfileApi();
  }

  /**
   * This will call employer user profile api and stored details in state variable
   * @returns {Promise<void>}
   */
  callEmployerUserProfileApi = async () => {
    this.setState({loading: true});
    let headers = {'authorization': handleLocalStorage('get', 'employerLogin'), 'Content-Type': 'application/json'};
    const requestData = {};
    try {
      const USerProfileData = await apiCall('get', requestData, EMPLOYER_USER_PROFILE.replace("<job_id>", this.props.match.params.job_id).replace("<applicant_id>", this.props.match.params.user_id), headers);
      if (USerProfileData.status) {
        USerProfileData.data["is_fresher"] = !USerProfileData.is_experienced;
        this.setState({result: USerProfileData.data, loading: false});
      } else this.setState({result1: USerProfileData.data, loading: false})
    } catch (e) {
    }
  };

  /**
   * This function used to copy specified text to clipboard
   */
  copyToClipboard = () => {
    this.setState({copy: true});
    let textField = document.createElement('textarea');
    textField.innerText = this.state.result.url;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    toast('Copied to clipboard!', {});
  };

  render() {
    const {history} = this.props;
    const {loading, result, copy} = this.state;
    return (
      <div className="inbox-user-profile-page">
        <EmployerSideNav history={history} selected={3}>
          {
            !loading ?
              <div>
                <div className="inbox-user-profile-auto-overflow">
                  <div className="inbox-user-profile-border-padding">
                    <div className="inbox-head-text-alignment">
                      <div style={{width: "100%"}}>
                        <div
                          className="head-text-padding inbox-user-profile-text">{result.snippet ? result.snippet.full_name : ""}</div>
                        <div className="sharable-with-name">
                          <div className="head-text-padding inbox-user-profile-nav">
                            <Breadcrumbs
                              separator={<NavigateNextIcon fontSize="small"/>}
                              arial-label="Breadcrumb"
                            >
                              <Link color="inherit" href="#" onClick={this.handleNavigationClick}>
                                User Profile
                              </Link>
                              <Link color="inherit" href="#" onClick={this.handleNavigationClick}>
                                <CustomIcon text={result.snippet ? result.snippet.full_name : ""}
                                            className="nav-create-a-job-text"/>
                              </Link>
                            </Breadcrumbs>
                          </div>
                          <div className="shared-with-any-one" onClick={this.copyToClipboard}>
                            <MuiThemeProvider theme={theme}>
                              <Tooltip title="click to copy sharable link" disableFocusListener disableTouchListener
                                       placement="bottom">
                                <div className="share-with-everyone-main"><span className="share-with-everyone">Share with anyone </span>
                                  <span>
                                <img src={copy ? SharableWhite : SharablePink}
                                     className={copy ? "share-with-everyone-image1" : "share-with-everyone-image"}/>
                              </span>
                                </div>
                              </Tooltip>
                            </MuiThemeProvider>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="inbox-user-profile-right-container">
                      <div className="inbox-user-profile-left-wraper">
                        <div className="component-div-padding">
                          <BasicDetails
                            fresher_experienced={result.is_fresher}
                            basic_profile={result.basic_profile}
                          />
                        </div>
                        <div className="component-div-padding">
                          <ResumeHeadline resume_headline={result.resume_headline}/>
                        </div>
                        <div className="component-div-padding">
                          <ProfileSummary profile_summary={result.profile_summary}/>
                        </div>
                        <div className="component-div-padding">
                          <Technologies skills={result.skills}/>
                        </div>
                        <div className="component-div-padding">
                          <Employment
                            employment_details={result.employment_details}
                            fresher_experienced={result.is_fresher}
                            training_internship={result.training_internship}
                          />
                        </div>
                        <div className="component-div-padding">
                          <Education education={result.education}/>
                        </div>
                        <div className="component-div-padding">
                          <TechnologiesWorkedOn technologies={result.technologies}/>
                        </div>
                        <div className="component-div-padding">
                          <Projects projects={result.projects}/>
                        </div>
                        {!result.is_fresher &&
                        <div className="component-div-padding">
                          <MyAchievements
                            training_internship={result.training_internship}
                            achievements={result.achievements}
                          />
                        </div>
                        }
                        <div className="component-div-padding">
                          <DesiredCareerProfile desired_profile={result.desired_profile}/>
                        </div>
                        <div className="component-div-padding">
                          <PersonalDetails personal_details={result.personal_details}/>
                        </div>
                      </div>
                      <div className="inbox-user-profile-right-wraper">
                        <AppliedUserProfileSideCard {...this.props} snippet={result.snippet}
                                                    application_status={result.application_status}
                                                    resumes={result.resumes} viewOnly={false}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div> : <div><LoadingIcon/></div>}
        </EmployerSideNav>
      </div>
    );
  }
}

export default AppliedUserProfile;
