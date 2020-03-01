
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
import UserBasicDetails from '../UserProfileFreshers/components/UserBasicDetails/UserBasicDetails';
import UserTechnologies from '../UserProfileFreshers/components/UserTechnologies/UserTechnlogies';
import UserEmployment from '../UserProfileFreshers/components/UserEmployment/UserEmployment';
import UserEducation from '../UserProfileFreshers/components/UserEducation/UserEducation';
import UserProjects from '../UserProfileFreshers/components/UserProjects/UserProjects';
import UserMyAchievement from '../UserProfileFreshers/components/UserMyAchievement/UserMyAchievement';
import UserPersonalDetails from '../UserProfileFreshers/components/UserPersonalDetails/UserPersonalDetails';
import UserDesiredCareerProfile from '../UserProfileFreshers/components/UserDesiredCareerProfile/UserDesiredCareerProfile';
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
    this.setState({
      currently_opened_tab,
    });
    // alert(this.props.match.url)
    try {
      const job_id = this.props.location.pathname.split('/', 3);
      // console.log('this.props.match', job_id);
      if (isNaN(job_id[2]) || job_id[2] == '') {
        throw 'exception occured';
      } else {
        globalJobId = job_id[2];
      }
      // console.log('global url', globalJobId)
      if (globalJobId !== undefined) {
        this.props.history.push(this.props.match.url + `/${globalJobId}` + url);
      }
    } catch (exc) {
      this.props.history.push(this.props.match.url);
    }
  };
  render() {
    const currently_opened_tab = this.getCurrentlyOpenTab();
    return (
      <div className="user-profile-page">
        <EmployerSideNav>
          <div className="user-profile-container">
            {currently_opened_tab == 5 ? (
              <div>
                <CustomBreadcrumb
                  breadcrumb_text="Edit Profile"
                  breadcrumbs={[{ text: 'Jobs', link: '' }, { text: 'JobDetails', link: '' }]}
                />
              </div>
            ) : (
                <div>
                  <div className="breadcrumb-save-as-draft">
                    <div className="user-profile-text">Edit Profile</div>
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
              )}
            <UserBasicDetails
              type="experienced"
            // onclick={e => {
            //   // On click of save, go to another page.
            //   this.props.history.push('/exp-profile');
            //   // try again
            //   // this.setState({
            //   //   user_save_state: true,
            //   // });
            // }}
            />
            <UserEmployment type="experienced" />
            <UserEducation />
            <UserTechnologies />
            <UserProjects />
            <UserMyAchievement type="experienced" />
            <UserDesiredCareerProfile />
            <UserPersonalDetails />
          </div>
        </EmployerSideNav>
      </div>
    );
  }
}
export default withStyles(styles)(UserProfileExperienced);
