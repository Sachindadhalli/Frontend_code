//library dependencies
import React from 'react';
import PropTypes from 'prop-types';
import {hot} from 'react-hot-loader/root';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
// import styled, { css } from 'styled-components';
import treeChanges from 'tree-changes';
// import { utils } from 'styled-minimal';
import {headerHeight} from 'modules/theme';
//utilities
import {showAlert} from 'actions/index';
//custom components
import PageNotFound from '../components/PageNotFound'
import RegistrationPage from './RegistrationPage/RegistrationPage';
import JobSeekerWrapper from './JobSeekerSignup/JobSeekerWrapper';
import EmployerSignUp from './EmployerSignUp';
import EmployerSignIn from './EmployerSignIn';
import SuccessPage from '../components/SuccessPage';
import EmployerLoginCallback from '../components/EmployerLoginCallback';
import EmployerGmailLoginCallback from '../components/EmployerGmailLoginCallback';
import EmployerProfilePage from '../components/EmployerProfilePage';
import EmployerHomePage from './EmployerHomePage';
import AutoComplete from './AutoComplete';
import EmployeeSignIn from './EmployeeSignIn';
import CreateJob from './CreateJob';
import SubUser from './SubUser';
import AccountSettingsRouter from './AccountSettings';
import EmployeeHomePage from './EmployeeHomePage/EmployeeHomePage';
import EmployerInboxRouter from './EmployerInbox';
import SharedAppliedUserProfile from './EmployerInbox/component/SharedAppiledUserProfile';
import PostJobModalComponent from './EmployerHomePage/components/EmployerJobPage/components/PostJobModal/PostJobModalComponent';
import JobSeekerJobDetails from './JobSeekerJobDetails/JobSeekerJobDetails';
import JobApplicationStatus from './JobApplicationStatus/JobApplicationStatusRoutes';
import UserProfileFreshers from '../containers/UserProfileFreshers/UserProfileFreshers';
import UserProfileFresherView from './UserProfileFresherView/UserProfileFresherView';
import UserProfileExperienced from './UserProfileExperienced/UserProfileExperienced';
import UserProfileExperiencedView from './UserProfileExperiencedView/UserProfileExperiencedView';
import EmployerDashboard from "./EmployerDashboard";
import VideoRecorder from "../components/VideoRecorder";
import UnderProgress from './UnderProgress';
import LandingPage from './LandingPage/LandingPage/LandingPage';
import EmployerSavedJobs from './EmployerSavedJobs/EmployerSavedJobs';
import SavedJobs from "./JobSeekerJobDetails/components/SavedJobs/SavedJobs";
import EmployerDraftedJobs from './EmployerDraftedJobs/EmployerDraftedJobs';
import JobSeekerProfile from './JobSeekerProfile';

export class App extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      is_job_seeker_selected_tab: false,
    };
  }

  setIsJobSeekerSelectedTab = (value = true) => {
    this.setState({
      is_job_seeker_selected_tab: value,
    });
  };

  componentWillReceiveProps(nextProps) {
    const {dispatch} = this.props;
    const {changedTo} = treeChanges(this.props, nextProps);

    /* istanbul ignore else */
    if (changedTo('user.isAuthenticated', true)) {
      dispatch(showAlert('Hello! And welcome!', {variant: 'success', icon: 'bell'}));
    }
  }

  render() {
    const {dispatch, user} = this.props;
    const {is_job_seeker_selected_tab} = this.state;
    return (
      <BrowserRouter basename="/">
        <Switch>
          <Route
            path="/employee-signup"
            exact
            render={props => (
              <RegistrationPage
                setIsJobSeekerSelectedTab={this.setIsJobSeekerSelectedTab}
                {...props}
              />
            )}
          />
          <Route path="/employer-signup" exact component={EmployerSignUp}/>
          <Route path="/employer-signin" exact component={EmployerSignIn}/>
          <Route
            path="/jobseeker-signup"
            render={props => (
              <JobSeekerWrapper
                setIsJobSeekerSelectedTab={this.setIsJobSeekerSelectedTab}
                is_job_seeker_selected_tab={is_job_seeker_selected_tab}
                {...props}
              />
            )}
          />
          <Route path="/success-page" exact component={SuccessPage}/>
          <Route path="/employer-profile-page" exact component={EmployerProfilePage}/>
          <Route
            path="/employer-login/linkedin-callback/:code?"
            exact
            component={EmployerLoginCallback}
          />
          <Route
            path="/employer-login/gmail-callback/:state?/:code?/:scope?"
            exact
            component={EmployerGmailLoginCallback}
          />
          <Route path="/employer-home-page" exact component={EmployerHomePage}/>
          <Route path="/auto-complete" exact component={AutoComplete}/>
          <Route path="/employee-signin" exact
                 render={props => (
                   <EmployeeSignIn
                     setIsJobSeekerSelectedTab={this.setIsJobSeekerSelectedTab}
                     {...props}
                   />
                 )}/>
          <Route path="/create-a-job" component={CreateJob}/>
          <Route path="/saved-jobs" component={SavedJobs}/>
          <Route path="/employer-saved-jobs" component={EmployerSavedJobs}/>
          <Route path="/employer-drafted-jobs" component={EmployerDraftedJobs}/>
          <Route path="/subuser" component={SubUser}/>
          <Route path="/jobs" component={JobSeekerJobDetails}/>
          <Route path="/employer-inbox" component={EmployerInboxRouter}/>
          <Route path="/employer-dashboard/" component={EmployerDashboard}/>
          <Route path="/account-settings" component={AccountSettingsRouter}/>
          <Route
            path="/employee-home-page"
            exact
            render={props => (
              <EmployeeHomePage
                setIsJobSeekerSelectedTab={this.setIsJobSeekerSelectedTab}
                {...props}
              />
            )}
          />
          <Route path="/post-job-modal" component={PostJobModalComponent}/>
          <Route path="/job-application-status" component={JobApplicationStatus}/>
          <Route path="/user-profile" component={UserProfileFreshers}/>
          <Route path="/view-profile" component={UserProfileFresherView}/>
          <Route path="/exp-profile" component={UserProfileExperienced}/>
          <Route path="/view-exp-profile" component={UserProfileExperiencedView}/>
          <Route path="/video-recorder" component={VideoRecorder}/>
          <Route path="/user-profile-view" component={SharedAppliedUserProfile}/>
          <Route path="/job-seeker-profile" component={JobSeekerProfile}/>
          <Route
            path="/"
            exact
            render={props => (
              <LandingPage
                setIsJobSeekerSelectedTab={this.setIsJobSeekerSelectedTab}
                {...props}
              />
            )}
          />
          <Route path="/under-progress" component={UnderProgress}/>
          <Route component={PageNotFound}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default hot(connect(mapStateToProps)(App));
