import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
//import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
// import NotFound from 'routes/NotFound';
// import { Switch, Route, BrowserRouter } from 'react-router-dom';
import CustomIcon from '../../components/CustomTag';
// import JobDetails from './components/JobDetails';
// import CreateJobRouter from './components/CreateJobRouter';
// import CandidateProfile from './components/CandidateProfile';
// import queryString from 'query-string';
// import EmployerTopMenu from '../EmployerTopMenu';
// import EmployerLeftMenu from '../EmployerLeftMenu';
// import Button from '@material-ui/core/Button';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import EmployerSideNav from '../../components/EmployerSideNav';
//import UserBasicDetails from './components/UserBasicDetails/UserBasicDetails';
import UserBasicDetailsExperienced from '../UserProfileFreshers/components/UserBasicDetails/UserBasicDetailsExperienced';
import UserTechnologies from '../UserProfileFreshers/components/UserTechnologies/UserTechnlogies';
import UserEmployment from '../UserProfileFreshers/components/UserEmployment/UserEmployment';
import UserEducation from '../UserProfileFreshers/components/UserEducation/UserEducation';
import UserProjects from '../UserProfileFreshers/components/UserProjects/UserProjects';
import UserMyAchievement from '../UserProfileFreshers/components/UserMyAchievement/UserMyAchievement';
import UserPersonalDetails from '../UserProfileFreshers/components/UserPersonalDetails/UserPersonalDetails';
import UserDesiredCareerProfile from '../UserProfileFreshers/components/UserDesiredCareerProfile/UserDesiredCareerProfile';
import UserKeySkills from './components/UserKeySkills/UserKeySkills';
import PendingActions from '../UserProfileFreshers/components/UserProfileSideCard/PendingActions/PendingActions';
import PercentageCompleted from '../UserProfileFreshers/components/UserProfileSideCard/PercentageCompleted/PercentageCompleted';
import QuickLink from '../UserProfileFreshers/components/UserProfileSideCard/QuickLink/QuickLink';
import UserProfileSidebar from '../UserProfileFreshers/components/UserProfileSideCard/UserProfileSidebar/UserProfileSidebar';
import UserProfileChat from '../UserProfileFreshers/components/UserProfileSideCard/UserProfileChat/UserProfileChat';
import ProfileSummary from '../UserProfileFreshers/components/ProfileSummary/ProfileSummary';
import UserProfileVideoResume from '../UserProfileFreshers/components/UserProfileSideCard/UserProfileVideoResume/UserProfileVideoResume';
import UserProfileUploadDocuments from '../UserProfileFreshers/components/UserProfileSideCard/UserProfileUploadDocuments/UserProfileUploadDocuments';
import ResumeHeadline from '../UserProfileFreshers/components/ResumeHeadline/ResumeHeadline';
let globalJobId = undefined;
const styles = theme => ({
  root: {
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  paper: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
});

const selectedButtton = {
  background: 'linear-gradient(105deg, #f0582b, #ec0586)',
  color: '#ffffff',
  fontWeight: 500,
};

const unSelectedButton = {
  color: '#e73a9e',
};

class UserProfileExperienced extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currently_opened_tab: 0,
      user_save_state: false,
    };
  }

  componentDidMount() {
    try {
      const job_id = this.props.location.pathname.split('/', 3);
      // console.log('this.props.match', job_id);
      if (isNaN(job_id[2])) {
        //console.log('not numeric');
      } else {
        globalJobId = job_id[2];
      }
    } catch (exc) {
      this.props.history.push('/');
    } finally {
      this.getCurrentlyOpenTab();
    }
  }

  getCurrentlyOpenTab = () => {
    const full_url = window.location.pathname;
    let currently_opened_tab = 0;
    if (full_url.includes('candidate-profile')) {
      currently_opened_tab = 1;
    } else if (full_url.includes('manage-responses')) {
      currently_opened_tab = 2;
    } else if (full_url.includes('my-organisation')) {
      currently_opened_tab = 3;
    } else if (full_url.includes('publish-job')) {
      currently_opened_tab = 4;
    } else if (full_url.includes('post-job-preview')) {
      currently_opened_tab = 5;
    }
    // this.setState({
    //   currently_opened_tab: currently_opened_tab
    // })
    return currently_opened_tab;
  };

  handleNavigationClick = (url, currently_opened_tab) => {
    //debugger;
    this.props.history.push({ pathname: 'view-exp-profile' });
  };

  render() {
    const currently_opened_tab = this.getCurrentlyOpenTab();
    return (
      <div className="inbox-user-profile-page">
        <EmployerSideNav>
          {/* <div className="user-profile-container"> */}
          <div className="inbox-user-profile-auto-overflow">
            <div className="inbox-user-profile-border-padding">
              <div>
                <div className="breadcrumb-save-as-draft">
                  <div className="edit-profile-new">Edit Profile</div>
                </div>
                <div className="user-profile-nav">
                  <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    arial-label="Breadcrumb"
                  >
                    <Link color="inherit" href="#" onClick={this.handleNavigationClick}>
                      User Profile
                    </Link>
                    <Link color="inherit" href="#" onClick={this.handleNavigationClick}>
                      <CustomIcon text="Edit Profile" className="nav-user-profile-text" />
                    </Link>
                  </Breadcrumbs>
                </div>
              </div>

              <div className="inbox-user-profile-right-container">
                <div className="inbox-user-profile-left-wraper">
                  <div className="component-div-padding">
                    <UserBasicDetailsExperienced
                      type="experienced"
                      history={this.props.history}
                      // onclick={e => {
                      //   // On click of save, go to another page.
                      //   this.props.history.push('/exp-profile');
                      //   // try again
                      //   // this.setState({
                      //   //   user_save_state: true,
                      //   // });
                      // }}
                    />
                  </div>
                  {/* <div className="component-div-padding">
                    <ResumeHeadline />
                  </div> */}
                  <div className="component-div-padding">
                    <ProfileSummary
                      profile_summary={
                        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets.'
                      }
                    />
                  </div>
                  <div className="component-div-padding">
                    <ResumeHeadline
                      resume_headline={
                        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets.'
                      }
                    />
                  </div>
                  <div className="component-div-padding">
                    <UserKeySkills />
                  </div>
                  <div className="component-div-padding">
                    <UserEmployment type="experienced" />
                  </div>
                  <div className="component-div-padding">
                    <UserEducation />
                  </div>
                  <div className="component-div-padding">
                    <UserTechnologies
                      technologies={[
                        {
                          technology: 'Internet of Things', // name of technology
                          experience_in_years: 3,
                          experience_in_months: 5,
                        },
                        {
                          technology: 'JAVA', // name of technology
                          experience_in_years: 3,
                          experience_in_months: 5,
                        },
                      ]}
                    />
                  </div>

                  <div className="component-div-padding">
                    <UserProjects />
                  </div>
                  <div className="component-div-padding">
                    <UserMyAchievement type="experienced" />
                  </div>
                  <div className="component-div-padding">
                    <UserDesiredCareerProfile />
                  </div>
                  <div className="component-div-padding">
                    <UserPersonalDetails />
                  </div>
                </div>
                <div className="inbox-user-profile-right-wraper">
                  <div className="applied-user-side-body">
                    <div className="">
                      <UserProfileSidebar />
                    </div>
                    <div className="user-video-resume-card">
                      <UserProfileVideoResume />
                    </div>

                    <div className="user-documents-card">
                      <UserProfileUploadDocuments />
                    </div>
                    <PendingActions
                    // {...this.props}
                    // snippet={this.state.result.snippet}
                    // resumes={this.state.result.resumes}
                    />
                    {/* {/* <PercentageCompleted /> */}
                    <QuickLink />

                    <UserProfileChat />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </EmployerSideNav>
      </div>
    );
  }
}

export default withStyles(styles)(UserProfileExperienced);
