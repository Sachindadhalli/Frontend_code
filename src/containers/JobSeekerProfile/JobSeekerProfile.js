//library dependency
import React, {Component} from 'react';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

//custom components
import EmployeeSideNav from '../../components/EmployeeSideNav';
import CustomIcon from '../../components/CustomTag';
import BasicDetails from "./components/BasicDetails/BasicDetails";
import ProfileSummary from "./components/ProfileSummary/ProfileSummary";
import ResumeHeadline from "./components/ResumeHeadline/ResumeHeadline";
import KeySkills from "./components/KeySkills/KeySkills";
import Employment from "./components/Employment/Employment";
import Education from "./components/Education/Education";
import TechnologiesIHaveWorkedOn from "./components/TechnologiesIHaveWorkedOn/TechnologiesIHaveWorkedOn";
import Projects from "./components/Projects/Projects";
import MyAchievements from "./components/MyAchievements/MyAchievements";
import DesiredCareerProfile from "./components/DesiredCareerProfile/DesiredCareerProfile";
import PersonalDetails from "./components/PersonalDetails/PersonalDetails";
import ProfileDetails from "./components/ProfileDetails/ProfileDetails";
import Chat from "./components/JobSeekerSidebarConatiners/Chat";
import PendingActions from "./components/JobSeekerSidebarConatiners/PendingActions";
import PercentageComplete from "./components/JobSeekerSidebarConatiners/PercentageComplete";
import QuickLinks from "./components/JobSeekerSidebarConatiners/QuickLinks";
import VideoResume from "./components/JobSeekerSidebarConatiners/VideoResume";

//styles
import './styles.scss';

//utilities

//icons


class JobSeekerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const {history} = this.props;
    return (
      <div className='job-seeker-profile-main-container'>
        <EmployeeSideNav history={history} selected={1}>
          <div>
            <div className="job-seeker-profile-auto-overflow">
              <div className="job-seeker-profile-border-padding">
                <div className="head-text-padding job-seeker-profile-text">Edit Profile</div>
                <div className="head-text-padding job-seeker-profile-nav">
                  <Breadcrumbs separator={<NavigateNextIcon fontSize="small"/>} arial-label="Breadcrumb">
                    <Link color="inherit" href="#" onClick={this.InboxClickEvent}>User Profile</Link>
                    <Link color="inherit" href="#" onClick={this.handleNavigationClick}><CustomIcon
                      text={'Edit Profile'} className="nav-create-a-job-text"/></Link>
                  </Breadcrumbs>
                </div>
                <div className='job-seeker-profile-main-wrapper'>
                  <div className='job-seeker-profile-wrapper-left'>
                    <div className='job-seeker-profile-info-wrapper'>
                      <BasicDetails/>
                    </div>
                    <div className='job-seeker-profile-info-wrapper'>
                      <ProfileSummary/>
                    </div>
                    <div className='job-seeker-profile-info-wrapper'>
                      <ResumeHeadline/>
                    </div>
                    <div className='job-seeker-profile-info-wrapper'>
                      <KeySkills/>
                    </div>
                    <div className='job-seeker-profile-info-wrapper'>
                      <Employment/>
                    </div>
                    <div className='job-seeker-profile-info-wrapper'>
                      <Education/>
                    </div>
                    <div className='job-seeker-profile-info-wrapper'>
                      <TechnologiesIHaveWorkedOn/>
                    </div>
                    <div className='job-seeker-profile-info-wrapper'>
                      <Projects/>
                    </div>
                    <div className='job-seeker-profile-info-wrapper'>
                      <MyAchievements/>
                    </div>
                    <div className='job-seeker-profile-info-wrapper'>
                      <DesiredCareerProfile/>
                    </div>
                    <div className='job-seeker-profile-info-wrapper'>
                      <PersonalDetails/>
                    </div>
                  </div>
                  <div className='job-seeker-profile-wrapper-right'>
                    <div className='job-seeker-profile-container-wrapper'><ProfileDetails/></div>
                    <div className='job-seeker-profile-container-wrapper'><PendingActions/></div>
                    <div className='job-seeker-profile-container-wrapper'><PercentageComplete/></div>
                    <div className='job-seeker-profile-container-wrapper'><QuickLinks/></div>
                    {/*<div className='job-seeker-profile-container-wrapper'> <VideoResume /> </div>*/}
                    <div className='job-seeker-profile-container-wrapper'><Chat/></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </EmployeeSideNav>
      </div>

    );
  }
}

export default JobSeekerProfile;
