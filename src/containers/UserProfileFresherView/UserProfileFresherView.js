// import React, { Component } from 'react';
// // import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// // import Paper from '@material-ui/core/Paper';
// import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
// //import Typography from '@material-ui/core/Typography';
// import Link from '@material-ui/core/Link';
// import NavigateNextIcon from '@material-ui/icons/NavigateNext';
// // import NotFound from 'routes/NotFound';
// // import { Switch, Route, BrowserRouter } from 'react-router-dom';
// import CustomIcon from '../../components/CustomTag';
// // import JobDetails from './components/JobDetails';
// // import CreateJobRouter from './components/CreateJobRouter';
// // import CandidateProfile from './components/CandidateProfile';
// // import queryString from 'query-string';
// // import EmployerTopMenu from '../EmployerTopMenu';
// // import EmployerLeftMenu from '../EmployerLeftMenu';
// // import Button from '@material-ui/core/Button';
// import CustomBreadcrumb from '../../components/CustomBreadcrumb';
// import EmployerSideNav from '../../components/EmployerSideNav';
// import UserBasicDetailsView from '../UserProfileFresherView/components/UserBasicDetailsView/UserBasicDetailsView';
// import UserEmploymentView from '../UserProfileFresherView/components/UserEmploymentView/UserEmploymentView';
// //import UserKeySkillsView from './components/UserKeySkillsView/UserKeySkillsView;
// import UserKeySkills from '../UserProfileExperienced/components/UserKeySkills/UserKeySkills';
// import UserTechnologies from '../UserProfileFreshers/components/UserTechnologies/UserTechnlogies';
// import UserEducationView from '../UserProfileFresherView/components/UserEducationView/UserEducationView';
// import UserProjectsView from '../UserProfileFresherView/components/UserProjectsView/UserProjectsView';
// import UserMyAchievementView from '../UserProfileFresherView/components/UserMyAchievementView/UserMyAchievementView';
// import UserDesiredCareerProfileView from '../UserProfileFresherView/components/UserDesiredCareerProfileView/UserDesiredCareerProfileView';
// import UserPersonalDetailsView from '../UserProfileFresherView/components/UserPersonalDetailsView/UserPersonalDetailsView';
// import ProfileSummary from '../../containers/EmployerInbox/AppliedUserProfile/Components/ProfileSummary';
// import ResumeHeadline from '../../containers/EmployerInbox/AppliedUserProfile/Components/ResumeHeadline/ResumeHeadline';
// import Employment from '../../containers/EmployerInbox/AppliedUserProfile/Components/Employment/Employment';
// import TechnologiesWorkedOn from '../../containers/EmployerInbox/AppliedUserProfile/Components/TechnologiesWorkedOn';
// import Education from '../../containers/EmployerInbox/AppliedUserProfile/Components/Education';
// import PersonalDetails from '../../containers/EmployerInbox/AppliedUserProfile/Components/PersonalDetails';
// import DesiredCareerProfile from '../../containers/EmployerInbox/AppliedUserProfile/Components/DesiredCareerProfile';
// import AppliedUserProfileSideCard from '../../containers/EmployerInbox/AppliedUserProfile/Components/AppliedUserProfileSideCard';
// import MyAchievements from '../../containers/EmployerInbox/AppliedUserProfile/Components/MyAchievements';
// import Projects from '../../containers/EmployerInbox/AppliedUserProfile/Components/Projects';
// import UserKeySkillsView from './components/UserKeySkillsView/UserKeySkillsView';
// import UserSideBarView from './components/UserSideBarView/UserSideBarView';
// import { EMPLOYMENT } from '../../../config/constants';

// // import Technologies from '../../containers/EmployerInbox/AppliedUserProfile/Components/Technologies/Technologies';
// import { apiCall, handleLocalStorage } from '../../Utilities';
// //import './style.scss';
// let globalJobId = undefined;
// const styles = theme => ({
//   root: {
//     justifyContent: 'center',
//     flexWrap: 'wrap',
//   },
//   paper: {
//     padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
//   },
// });

// const selectedButtton = {
//   background: 'linear-gradient(105deg, #f0582b, #ec0586)',
//   color: '#ffffff',
//   fontWeight: 500,
// };

// const unSelectedButton = {
//   color: '#e73a9e',
// };

// class UserProfileFresherView extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loading: false,
//       result: {
//         is_fresher: false,
//         training_internship: {
//           internship: [
//             {
//               role: 'UX Designer', // name of role
//               company: 'DesignCoz Studio', // name of organization
//               tenure_in_years: 2,
//               tenure_in_months: 3,
//             },
//             {
//               role: 'UX Designer', // name of role
//               company: 'DesignCoz Studio', // name of organization
//               tenure_in_years: 2,
//               tenure_in_months: 3,
//             },
//           ],
//           training: [
//             {
//               name: '', // 50 character text
//               institute: '', // 50 character text
//               start_date: 1559700476000, // timestamp
//               end_date: 1559700476000, // timestamp
//             },
//           ],
//         },
//         achievements: {
//           online_profile: [
//             {
//               profile: 'john_doe16', // linkedin/ reddit/ etc.
//               url: 'www.springers.com/johndoe/homeautomation', // url of profile
//               description:
//                 'Managed a team consisting of 5 people, guided the project into completion', // 250 character text
//             },
//           ],
//           work_sample: [
//             {
//               title: 'Home Automation',
//               url: 'www.springers.com/johndoe/homeautomation',
//               currently_working: true,
//               start_date: 1559700476000, // timestamp
//               end_date: 1559801476000, // timestamp
//               description:
//                 'Developed a home automation system using Internet of Things for Smart Homes', // 500 character text
//             },
//             {
//               title: 'Home Automation',
//               url: 'www.springers.com/johndoe/homeautomation',
//               currently_working: false,
//               start_date: 1559700476000, // timestamp
//               end_date: 1559801476000, // timestamp
//               description:
//                 'Developed a home automation system using Internet of Things for Smart Homes', // 500 character text
//             },
//           ],
//           publication: [
//             {
//               title: 'Home Automation',
//               url: 'www.springers.com/johndoe/homeautomation',
//               currently_working: true,
//               start_date: 1559801476000, // timestamp
//               end_date: 1559801476000, // timestamp
//               duration_in_year: 3,
//               duration_in_month: 3,
//               description:
//                 'Managed a team consisting of 5 people, guided the project into completion', // 500 character text
//             },
//             {
//               title: 'Home Automation',
//               url: 'www.springers.com/johndoe/homeautomation',
//               currently_working: false,
//               start_date: 1559801476000, // timestamp
//               end_date: 1559801476000, // timestamp
//               duration_in_year: 0,
//               duration_in_month: 3,
//               description:
//                 'Managed a team consisting of 5 people, guided the project into completion', // 500 character text
//             },
//           ],
//           presentation: [
//             {
//               title: 'Designcoz',
//               url: 'www.patent.com/johndoe',
//               description:
//                 'Managed a team consisting of 5 people, guided the project into completion', // 500 character text
//             },
//           ],
//           patent: [
//             {
//               title: 'Employee of the Year',
//               url: 'www.patent.com/johndoe',
//               office: 'Mumbai', // 200 character text
//               issued: true,
//               applcation_number: 'A12343456',
//               issued_date_in_year: 2019,
//               issued_date_in_month: 11,
//               description:
//                 'Managed a team consisting of 5 people, guided the project into completion', // 500 character text
//             },
//             {
//               title: 'Employee of the Year',
//               url: 'www.patent.com/johndoe',
//               office: 'Mumbai', // 200 character text
//               issued: false,
//               applcation_number: 'A12345567',
//               issued_date_in_year: 2019,
//               issued_date_in_month: 11,
//               description:
//                 'Managed a team consisting of 5 people, guided the project into completion', // 500 character text
//             },
//           ],
//           certification: [
//             {
//               name: 'Miccorsoft Associate',
//               body: 'Managed a team consisting of 5 people, guided the project into completion',
//               year: 2019,
//             },
//           ],
//           reward: [
//             {
//               title: 'Employee of the Year', // 50 character text
//               description:
//                 'Managed a team consisting of 5 people, guided the project into completion', // 500 character text
//             },
//           ],
//         },
//         desired_profile: {
//           industry: 'Information Technology', // name of industry
//           functional_area: 'PeopleSoft', // name of func area
//           role: 'Project Lead', // name of role
//           job_type: 'permanent',
//           employment_type: 'FT',
//           shift: 'day',
//           availability: 'immediate',
//           available_date: 23456781, // timestamp
//           desired_location: 'Mumbai',
//           desired_industry: 'Information Technology',
//           expected_salary: {
//             currency: '₹', // name of currency
//             value: 12, // in lakhs
//           },
//         },
//         personal_details: {
//           birth_date: 1234567,
//           gender: 'Male',
//           address: 'Shop No 43, Greenfields Avillion (A), JV Link Road, Mumbai 400093',
//           pincode: 123456,
//           hometown: 'name of city',
//           permanent_residency: 'NA',
//           passport_number: '',
//           marital_status: true,
//           category: 'general',
//           differently_abled: true,
//           language: [
//             {
//               language: 'English', // name of language
//               read: true,
//               write: false,
//               speak: true,
//             },
//             {
//               language: 'Hindi', // name of language
//               read: true,
//               write: true,
//               speak: true,
//             },
//           ],
//         },
//         projects: [
//           {
//             title: 'Home Automation',
//             role: 'Project Lead', // name of role
//             qualification: 'Bachelors of Engineering', // name of qualification
//             client: 'Vanke', // name of current organization
//             status: 'completed',
//             start_date: 1559801476000, // timestamp
//             end_date: 1559801476000, // timestamp
//             details: 'Managed a team consisting of 5 people, guided the project into completion', // 300 character text
//             site: 'Offsite', // location
//             location: 'Mumbai',
//             nature: 'PartTime/Trainee',
//             team_size: 5,
//             team_role: '', // name of role
//             description:
//               'Managed a team consisting of 5 people, guided the project into completion', // 250 character text
//             skills: [
//               'Team Management',
//               'People Skills',
//               'Software Development',
//               'Team Management',
//               'People Skills',
//               'Software Development',
//             ], // names of skills in array
//             upload_document: ['Resume.pdf'],
//           },
//           {
//             title: 'Home Automation',
//             role: 'Project Lead', // name of role
//             qualification: 'Bachelors of Engineering', // name of qualification
//             client: 'Vanke', // name of current organization
//             status: 'in progress',
//             start_date: 1559801476000, // timestamp
//             end_date: 1559801476000, // timestamp
//             details: 'Managed a team consisting of 5 people, guided the project into completion', // 300 character text
//             site: 'Offsite', // location
//             location: 'Mumbai',
//             nature: 'FullTime',
//             team_size: 5,
//             team_role: '', // name of role
//             description:
//               'Managed a team consisting of 5 people, guided the project into completion', // 250 character text
//             skills: ['Team Management', 'People Skills', 'Software Development'], // names of skills in array
//             upload_document: ['Resume.pdf'],
//           },
//         ],
//         basic_profile: {
//           experience: 'Experienced ( 3 years & 4 months )', // total experience in years+month format
//           annual_salary: '5.5', // currency(inr/usd)+ number + lacs
//           mobile_number: '83010 98257', // primary mobile number from profile
//         },
//         resume_headline:
//           "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets.", // 300 character text
//         skills: ['Android Development', 'Sketch App', 'Adobe Suite'], // listed in an array, in alphabetical order
//         employment_details: [
//           {
//             job_title: 'UX designer',
//             organization: 'Designcoz - service based',
//             currently_working: true, // if currently working here or not
//             start_date: 1559700476000, // timestamp
//             end_date: 1559700476000, // timestamp
//             organization_type: '', // text value
//             roles:
//               'Responsible for designing the user interface and enhancing the user experience of digital products', // one line description of job
//             notice_period: 4, // id of option selected, based on the status saved
//             last_working_day: 1559700476000, // timestamp
//             designation_offered: '', // name of the designation, as saved
//             next_employer: 'McKinsey - Project Manager', // name of next employing organization, as saved
//             buy_out_option: true / false, // as available
//             notice_period_negotiable: true / false,
//           },
//           {
//             job_title: 'UX designer',
//             organization: 'Designcoz - service based',
//             currently_working: true, // if currently working here or not
//             start_date: 12314345423, // timestamp
//             end_date: 12343453634, // timestamp
//             organization_type: '', // text value
//             roles:
//               'Responsible for designing the user interface and enhancing the user experience of digital products', // one line description of job
//             notice_period: 4, // id of option selected, based on the status saved
//             last_working_day: 1234567889, // timestamp
//             designation_offered: '', // name of the designation, as saved
//             next_employer: 'McKinsey - Project Manager', // name of next employing organization, as saved
//             buy_out_option: true / false, // as available
//             notice_period_negotiable: true / false,
//           },
//         ],
//         education: [
//           {
//             qualification: 'Bachelors in Computer Engineering ', // name for qualificaiton, as post grad = 4
//             major: '', // name of majors
//             university: 'Mumbai University', // name of university
//             institute: 'Ruparel College of Engineering', // name of institute
//             start_date: 123456787654, // timestamp
//             end_date: 121345567654, // timestamp
//             grading_system: 'cgpa/percentage',
//             marks: 4.7,
//           },
//           {
//             qualification: 'Bachelors in Computer Engineering ', // name for qualificaiton, as post grad = 4
//             major: '', // name of majors
//             university: 'Mumbai University', // name of university
//             institute: 'Ruparel College of Engineering', // name of institute
//             start_date: 123456787654, // timestamp
//             end_date: 121345567654, // timestamp
//             grading_system: 'cgpa/percentage',
//             marks: 4.7,
//           },
//           {
//             qualification: '12', // name for qualification
//             board: 'Maharashtra Board', // name of board of education
//             end_date: 2019, // year of passing
//             medium: 'English', // name of language of education
//             marks: 555, // total marks
//           },
//           {
//             qualification: '10', // name for qualification
//             board: 'Maharashtra Board', // name of board of education
//             end_date: 2019, // year of passing
//             medium: 'English', // name of language of education
//             marks: 555, // total marks
//           },
//         ],
//         technologies: [
//           {
//             technology: '', // name of technology
//             experience_in_years: 3,
//             experience_in_months: 5,
//           },
//         ],
//         resumes: {
//           resume_document1: 'http://www.pdf995.com/samples/pdf.pdf',
//           resume_video1: 'https://www.youtube.com/embed/tgbNymZ7vqY',
//           resume_document2:
//             'https://drive.google.com/file/d/0BxJLI1Vn7p10YjdfVk9NOGFhVnc/view?usp=sharing',
//           resume_video2: 'https://www.youtube.com/embed/tgbNymZ7vqY',
//         },
//         snippet: {
//           profile_image: '', // url of profile image
//           full_name: 'John Wick', // first_name+" "+lastname
//           title: 'Interior designer', // current title
//           email: 'john@gmail.com', // primary email
//           location: 'Mumbai, India', // city+", "+country
//         },
//       },
//     };
//   }
//   componentWillMount() {
//     this.callEmployerUserProfileApi();
//   }

//   callEmployerUserProfileApi = async () => {
//     this.setState({ loading: true });
//     let headers = {
//       authorization: handleLocalStorage('get', 'employerLogin'),
//       'Content-Type': 'application/json',
//     };
//     const requestData = {};
//     try {
//       const USerProfileData = await apiCall(
//         'get',
//         requestData,
//         EMPLOYER_USER_PROFILE.replace('<job_id>', this.props.match.params.job_id).replace(
//           '<applicant_id>',
//           this.props.match.params.user_id,
//         ),
//         headers,
//       );
//       if (USerProfileData.status) {
//         toast(`${USerProfileData.message}`, {});
//         USerProfileData.data['is_fresher'] = !USerProfileData.is_experienced;
//         this.setState({ result: USerProfileData.data, loading: false });
//       } else {
//         toast(`${USerProfileData.message}`, {});
//         this.setState({ result1: USerProfileData.data, loading: false });
//       }
//     } catch (e) {
//       // console.log(e);
//     }
//   };
//   // constructor(props) {
//   //   super(props);
//   //   this.state = {
//   //     currently_opened_tab: 0,
//   //     user_save_state: false,
//   //   };
//   // }

//   // componentDidMount() {
//   //   try {
//   //     const job_id = this.props.location.pathname.split('/', 3);
//   //     // console.log('this.props.match', job_id);
//   //     if (isNaN(job_id[2])) {
//   //       console.log('not numeric');
//   //     } else {
//   //       globalJobId = job_id[2];
//   //     }
//   //   } catch (exc) {
//   //     this.props.history.push('/');
//   //   } finally {
//   //     this.getCurrentlyOpenTab();
//   //   }
//   // }

//   getCurrentlyOpenTab = () => {
//     const full_url = window.location.pathname;
//     let currently_opened_tab = 0;
//     if (full_url.includes('candidate-profile')) {
//       currently_opened_tab = 1;
//     } else if (full_url.includes('manage-responses')) {
//       currently_opened_tab = 2;
//     } else if (full_url.includes('my-organisation')) {
//       currently_opened_tab = 3;
//     } else if (full_url.includes('publish-job')) {
//       currently_opened_tab = 4;
//     } else if (full_url.includes('post-job-preview')) {
//       currently_opened_tab = 5;
//     }
//     // this.setState({
//     //   currently_opened_tab: currently_opened_tab
//     // })
//     return currently_opened_tab;
//   };

//   handleNavigationClick = (url, currently_opened_tab) => {
//     //debugger;
//     this.props.history.push({ pathname: 'user-profile' });
//   };
//   render() {
//     const currently_opened_tab = this.getCurrentlyOpenTab();
//     return (
//       <div className="inbox-user-profile-page">
//         <EmployerSideNav>
//           {/* <div className="user-profile-container"> */}
//           <div className="inbox-user-profile-auto-overflow">
//             <div className="inbox-user-profile-border-padding">
//               <div>
//                 <div className="breadcrumb-save-as-draft">
//                   <div className="edit-profile-new">Profile </div>
//                 </div>
//                 <div className="user-profile-nav">
//                   <Breadcrumbs
//                     separator={<NavigateNextIcon fontSize="small" />}
//                     arial-label="Breadcrumb"
//                   >
//                     <Link color="inherit" href="#">
//                       User Profile view
//                     </Link>
//                     <Link color="inherit" href="#" onClick={this.handleNavigationClick}>
//                       <CustomIcon text="Profile" className="nav-user-profile-text" />
//                     </Link>
//                   </Breadcrumbs>
//                 </div>
//               </div>
//               {/* <UserBasicDetailsSave   />  */}
//               {/* {this.state.user_save_state ? (
//               <UserBasicDetailsView
//                 activeItem={this.state.activeItem}
//                 toggle={this.toggle}
//                 //onSave={this.handleSubmit}
//               />
//             ) : null} */}
//               <div className="inbox-user-profile-right-container">
//                 <div className="inbox-user-profile-left-wraper">
//                   <div className="component-div-padding">
//                     <UserBasicDetailsView
//                       fresher_experienced={this.state.result.is_fresher}
//                       basic_profile={this.state.result.basic_profile}
//                     />
//                   </div>
//                   {/* <div className="component-div-padding">
//                     <ProfileSummary />
//                   </div>
//                   <div className="component-div-padding">
//                     <ResumeHeadline resume_headline={this.state.result.resume_headline} />
//                   </div> */}
//                   <div className="component-div-padding">
//                     <UserKeySkills />
//                   </div>
//                   <div className="component-div-padding">
//                     <UserEmploymentView
//                       employment_details={this.state.result.employment_details}
//                       fresher_experienced={this.state.result.is_fresher}
//                       training_internship={this.state.result.training_internship}
//                     />
//                   </div>
//                   <div className="component-div-padding">
//                     <UserEducationView education={this.state.result.education} />
//                   </div>
//                   {/* <div className="component-div-padding">
//                     <TechnologiesWorkedOn
//                       technologies={[
//                         {
//                           technology: 'Internet of Things', // name of technology
//                           experience_in_years: 3,
//                           experience_in_months: 5,
//                         },
//                         {
//                           technology: 'JAVA', // name of technology
//                           experience_in_years: 3,
//                           experience_in_months: 5,
//                         },
//                       ]}
//                     />
//                   </div> */}
//                   {/* <div className="component-div-padding">
//                     <Projects projects={this.state.result.projects} />
//                   </div> */}
//                   {/* {!this.state.result.is_fresher ? (
//                     <div className="component-div-padding">
//                       <MyAchievements
//                         training_internship={this.state.result.training_internship}
//                         achievements={this.state.result.achievements}
//                       />
//                     </div>
//                   ) : (
//                     <div />
//                   )} */}
//                   {/* <div className="component-div-padding">
//                     <UserMyAchievementView
//                       // training_internship={this.state.result.training_internship}
//                       achievements={this.state.result.achievements}
//                     />
//                   </div> */}
//                   <UserProjectsView projects={this.state.result.projects} />
//                   <div className="component-div-padding">
//                     <UserDesiredCareerProfileView
//                       desired_profile={this.state.result.desired_profile}
//                     />
//                   </div>
//                   <UserProjectsView />
//                   <div className="component-div-padding">
//                     <PersonalDetails personal_details={this.state.result.personal_details} />
//                   </div>
//                   {/* <UserEmploymentView />
//             <UserEducationView />
//             <UserProjectsView projects={this.state.result.projects} />
//                   <UserDesiredCareerProfileView /> */}
//                   <div className="component-div-padding">
//                     <UserTechnologies />
//                   </div>
//                   <div className="component-div-padding">
//                     <UserMyAchievementView
//                       training_internship={this.state.result.training_internship}
//                       achievements={this.state.result.achievements}
//                     />
//                   </div>

//                   <UserPersonalDetailsView personal_details={this.state.result.personal_details} />
//                 </div>
//                 <div className="inbox-user-profile-right-wraper">
//                   <UserSideBarView
//                     {...this.props}
//                     snippet={this.state.result.snippet}
//                     resumes={this.state.result.resumes}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </EmployerSideNav>
//       </div>
//     );
//   }
// }

// export default withStyles(styles)(UserProfileFresherView);

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
import UserBasicDetailsView from '../UserProfileFresherView/components/UserBasicDetailsView/UserBasicDetailsView';
import UserEmploymentView from '../UserProfileFresherView/components/UserEmploymentView/UserEmploymentView';
//import UserKeySkillsView from './components/UserKeySkillsView/UserKeySkillsView;
import UserKeySkills from '../UserProfileExperienced/components/UserKeySkills/UserKeySkills';
import UserTechnologies from '../UserProfileFreshers/components/UserTechnologies/UserTechnlogies';
import UserEducationView from '../UserProfileFresherView/components/UserEducationView/UserEducationView';
import UserProjectsView from '../UserProfileFresherView/components/UserProjectsView/UserProjectsView';
import UserMyAchievementView from '../UserProfileFresherView/components/UserMyAchievementView/UserMyAchievementView';
import UserDesiredCareerProfileView from '../UserProfileFresherView/components/UserDesiredCareerProfileView/UserDesiredCareerProfileView';
import UserPersonalDetailsView from '../UserProfileFresherView/components/UserPersonalDetailsView/UserPersonalDetailsView';
import ProfileSummary from '../../containers/EmployerInbox/component/AppliedUserProfile/Components/ProfileSummary';
import ResumeHeadline from '../../containers/EmployerInbox/component/AppliedUserProfile/Components/ResumeHeadline/ResumeHeadline';
import Employment from '../../containers/EmployerInbox/component/AppliedUserProfile/Components/Employment/Employment';
import TechnologiesWorkedOn from '../../containers/EmployerInbox/component/AppliedUserProfile/Components/TechnologiesWorkedOn';
import Education from '../../containers/EmployerInbox/component/AppliedUserProfile/Components/Education';
import PersonalDetails from '../../containers/EmployerInbox/component/AppliedUserProfile/Components/PersonalDetails';
import DesiredCareerProfile from '../../containers/EmployerInbox/component/AppliedUserProfile/Components/DesiredCareerProfile';
import AppliedUserProfileSideCard from '../../containers/EmployerInbox/component/AppliedUserProfile/Components/AppliedUserProfileSideCard';
import MyAchievements from '../../containers/EmployerInbox/component/AppliedUserProfile/Components/MyAchievements';
import Projects from '../../containers/EmployerInbox/component/AppliedUserProfile/Components/Projects';
import UserKeySkillsView from './components/UserKeySkillsView/UserKeySkillsView';
import UserSideBarView from './components/UserSideBarView/UserSideBarView';
import { EMPLOYMENT } from '../../../config/constants';

// import Technologies from '../../containers/EmployerInbox/AppliedUserProfile/JobApplicationComponent/Technologies/Technologies';
import { apiCall, handleLocalStorage } from '../../Utilities';
//import './style.scss';
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

class UserProfileFresherView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      result: {
        is_fresher: false,
        training_internship: {
          internship: [
            {
              role: 'UX Designer', // name of role
              company: 'DesignCoz Studio', // name of organization
              tenure_in_years: 2,
              tenure_in_months: 3,
            },
            {
              role: 'UX Designer', // name of role
              company: 'DesignCoz Studio', // name of organization
              tenure_in_years: 2,
              tenure_in_months: 3,
            },
          ],
          training: [
            {
              name: '', // 50 character text
              institute: '', // 50 character text
              start_date: 1559700476000, // timestamp
              end_date: 1559700476000, // timestamp
            },
          ],
        },
        achievements: {
          online_profile: [
            {
              profile: 'john_doe16', // linkedin/ reddit/ etc.
              url: 'www.springers.com/johndoe/homeautomation', // url of profile
              description:
                'Managed a team consisting of 5 people, guided the project into completion', // 250 character text
            },
          ],
          work_sample: [
            {
              title: 'Home Automation',
              url: 'www.springers.com/johndoe/homeautomation',
              currently_working: true,
              start_date: 1559700476000, // timestamp
              end_date: 1559801476000, // timestamp
              description:
                'Developed a home automation system using Internet of Things for Smart Homes', // 500 character text
            },
            {
              title: 'Home Automation',
              url: 'www.springers.com/johndoe/homeautomation',
              currently_working: false,
              start_date: 1559700476000, // timestamp
              end_date: 1559801476000, // timestamp
              description:
                'Developed a home automation system using Internet of Things for Smart Homes', // 500 character text
            },
          ],
          publication: [
            {
              title: 'Home Automation',
              url: 'www.springers.com/johndoe/homeautomation',
              currently_working: true,
              start_date: 1559801476000, // timestamp
              end_date: 1559801476000, // timestamp
              duration_in_year: 3,
              duration_in_month: 3,
              description:
                'Managed a team consisting of 5 people, guided the project into completion', // 500 character text
            },
            {
              title: 'Home Automation',
              url: 'www.springers.com/johndoe/homeautomation',
              currently_working: false,
              start_date: 1559801476000, // timestamp
              end_date: 1559801476000, // timestamp
              duration_in_year: 0,
              duration_in_month: 3,
              description:
                'Managed a team consisting of 5 people, guided the project into completion', // 500 character text
            },
          ],
          presentation: [
            {
              title: 'Designcoz',
              url: 'www.patent.com/johndoe',
              description:
                'Managed a team consisting of 5 people, guided the project into completion', // 500 character text
            },
          ],
          patent: [
            {
              title: 'Employee of the Year',
              url: 'www.patent.com/johndoe',
              office: 'Mumbai', // 200 character text
              issued: true,
              applcation_number: 'A12343456',
              issued_date_in_year: 2019,
              issued_date_in_month: 11,
              description:
                'Managed a team consisting of 5 people, guided the project into completion', // 500 character text
            },
            {
              title: 'Employee of the Year',
              url: 'www.patent.com/johndoe',
              office: 'Mumbai', // 200 character text
              issued: false,
              applcation_number: 'A12345567',
              issued_date_in_year: 2019,
              issued_date_in_month: 11,
              description:
                'Managed a team consisting of 5 people, guided the project into completion', // 500 character text
            },
          ],
          certification: [
            {
              name: 'Miccorsoft Associate',
              body: 'Managed a team consisting of 5 people, guided the project into completion',
              year: 2019,
            },
          ],
          reward: [
            {
              title: 'Employee of the Year', // 50 character text
              description:
                'Managed a team consisting of 5 people, guided the project into completion', // 500 character text
            },
          ],
        },
        desired_profile: {
          industry: 'Information Technology', // name of industry
          functional_area: 'PeopleSoft', // name of func area
          role: 'Project Lead', // name of role
          job_type: 'permanent',
          employment_type: 'FT',
          shift: 'day',
          availability: 'immediate',
          available_date: 23456781, // timestamp
          desired_location: 'Mumbai',
          desired_industry: 'Information Technology',
          expected_salary: {
            currency: '₹', // name of currency
            value: 12, // in lakhs
          },
        },
        personal_details: {
          birth_date: 1234567,
          gender: 'Male',
          address: 'Shop No 43, Greenfields Avillion (A), JV Link Road, Mumbai 400093',
          pincode: 123456,
          hometown: 'name of city',
          permanent_residency: 'NA',
          passport_number: '',
          marital_status: true,
          category: 'general',
          differently_abled: true,
          language: [
            {
              language: 'English', // name of language
              read: true,
              write: false,
              speak: true,
            },
            {
              language: 'Hindi', // name of language
              read: true,
              write: true,
              speak: true,
            },
          ],
        },
        projects: [
          {
            title: 'Home Automation',
            role: 'Project Lead', // name of role
            qualification: 'Bachelors of Engineering', // name of qualification
            client: 'Vanke', // name of current organization
            status: 'completed',
            start_date: 1559801476000, // timestamp
            end_date: 1559801476000, // timestamp
            details: 'Managed a team consisting of 5 people, guided the project into completion', // 300 character text
            site: 'Offsite', // location
            location: 'Mumbai',
            nature: 'PartTime/Trainee',
            team_size: 5,
            team_role: '', // name of role
            description:
              'Managed a team consisting of 5 people, guided the project into completion', // 250 character text
            skills: [
              'Team Management',
              'People Skills',
              'Software Development',
              'Team Management',
              'People Skills',
              'Software Development',
            ], // names of skills in array
            upload_document: ['Resume.pdf'],
          },
          {
            title: 'Home Automation',
            role: 'Project Lead', // name of role
            qualification: 'Bachelors of Engineering', // name of qualification
            client: 'Vanke', // name of current organization
            status: 'in progress',
            start_date: 1559801476000, // timestamp
            end_date: 1559801476000, // timestamp
            details: 'Managed a team consisting of 5 people, guided the project into completion', // 300 character text
            site: 'Offsite', // location
            location: 'Mumbai',
            nature: 'FullTime',
            team_size: 5,
            team_role: '', // name of role
            description:
              'Managed a team consisting of 5 people, guided the project into completion', // 250 character text
            skills: ['Team Management', 'People Skills', 'Software Development'], // names of skills in array
            upload_document: ['Resume.pdf'],
          },
        ],
        basic_profile: {
          experience: 'Experienced ( 3 years & 4 months )', // total experience in years+month format
          annual_salary: '5.5', // currency(inr/usd)+ number + lacs
          mobile_number: '83010 98257', // primary mobile number from profile
        },
        resume_headline:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets.", // 300 character text
        skills: ['Android Development', 'Sketch App', 'Adobe Suite'], // listed in an array, in alphabetical order
        employment_details: [
          {
            job_title: 'UX designer',
            organization: 'Designcoz - service based',
            currently_working: true, // if currently working here or not
            start_date: 1559700476000, // timestamp
            end_date: 1559700476000, // timestamp
            organization_type: '', // text value
            roles:
              'Responsible for designing the user interface and enhancing the user experience of digital products', // one line description of job
            notice_period: 4, // id of option selected, based on the status saved
            last_working_day: 1559700476000, // timestamp
            designation_offered: '', // name of the designation, as saved
            next_employer: 'McKinsey - Project Manager', // name of next employing organization, as saved
            buy_out_option: true / false, // as available
            notice_period_negotiable: true / false,
          },
          {
            job_title: 'UX designer',
            organization: 'Designcoz - service based',
            currently_working: true, // if currently working here or not
            start_date: 12314345423, // timestamp
            end_date: 12343453634, // timestamp
            organization_type: '', // text value
            roles:
              'Responsible for designing the user interface and enhancing the user experience of digital products', // one line description of job
            notice_period: 4, // id of option selected, based on the status saved
            last_working_day: 1234567889, // timestamp
            designation_offered: '', // name of the designation, as saved
            next_employer: 'McKinsey - Project Manager', // name of next employing organization, as saved
            buy_out_option: true / false, // as available
            notice_period_negotiable: true / false,
          },
        ],
        education: [
          {
            qualification: 'Bachelors in Computer Engineering ', // name for qualificaiton, as post grad = 4
            major: '', // name of majors
            university: 'Mumbai University', // name of university
            institute: 'Ruparel College of Engineering', // name of institute
            start_date: 123456787654, // timestamp
            end_date: 121345567654, // timestamp
            grading_system: 'cgpa/percentage',
            marks: 4.7,
          },
          {
            qualification: 'Bachelors in Computer Engineering ', // name for qualificaiton, as post grad = 4
            major: '', // name of majors
            university: 'Mumbai University', // name of university
            institute: 'Ruparel College of Engineering', // name of institute
            start_date: 123456787654, // timestamp
            end_date: 121345567654, // timestamp
            grading_system: 'cgpa/percentage',
            marks: 4.7,
          },
          {
            qualification: '12', // name for qualification
            board: 'Maharashtra Board', // name of board of education
            end_date: 2019, // year of passing
            medium: 'English', // name of language of education
            marks: 555, // total marks
          },
          {
            qualification: '10', // name for qualification
            board: 'Maharashtra Board', // name of board of education
            end_date: 2019, // year of passing
            medium: 'English', // name of language of education
            marks: 555, // total marks
          },
        ],
        technologies: [
          {
            technology: '', // name of technology
            experience_in_years: 3,
            experience_in_months: 5,
          },
        ],
        resumes: {
          resume_document1: 'http://www.pdf995.com/samples/pdf.pdf',
          resume_video1: 'https://www.youtube.com/embed/tgbNymZ7vqY',
          resume_document2:
            'https://drive.google.com/file/d/0BxJLI1Vn7p10YjdfVk9NOGFhVnc/view?usp=sharing',
          resume_video2: 'https://www.youtube.com/embed/tgbNymZ7vqY',
        },
        snippet: {
          profile_image: '', // url of profile image
          full_name: 'John Wick', // first_name+" "+lastname
          title: 'Interior designer', // current title
          email: 'john@gmail.com', // primary email
          location: 'Mumbai, India', // city+", "+country
        },
      },
    };
  }
  componentWillMount() {
    this.callEmployerUserProfileApi();
  }

  callEmployerUserProfileApi = async () => {
    this.setState({ loading: true });
    let headers = {
      authorization: handleLocalStorage('get', 'employerLogin'),
      'Content-Type': 'application/json',
    };
    const requestData = {};
    // try {
    //   const USerProfileData = await apiCall(
    //     'get',
    //     requestData,
    //     EMPLOYER_USER_PROFILE.replace('<job_id>', this.props.match.params.job_id).replace(
    //       '<applicant_id>',
    //       this.props.match.params.user_id,
    //     ),
    //     headers,
    //   );
    //   if (USerProfileData.status) {
    //     toast(`${USerProfileData.message}`, {});
    //     USerProfileData.data['is_fresher'] = !USerProfileData.is_experienced;
    //     this.setState({ result: USerProfileData.data, loading: false });
    //   } else {
    //     toast(`${USerProfileData.message}`, {});
    //     this.setState({ result1: USerProfileData.data, loading: false });
    //   }
    // } catch (e) {
    //   // console.log(e);
    // }
  };
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     currently_opened_tab: 0,
  //     user_save_state: false,
  //   };
  // }

  // componentDidMount() {
  //   try {
  //     const job_id = this.props.location.pathname.split('/', 3);
  //     // console.log('this.props.match', job_id);
  //     if (isNaN(job_id[2])) {
  //       console.log('not numeric');
  //     } else {
  //       globalJobId = job_id[2];
  //     }
  //   } catch (exc) {
  //     this.props.history.push('/');
  //   } finally {
  //     this.getCurrentlyOpenTab();
  //   }
  // }

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
    this.props.history.push({ pathname: 'user-profile' });
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
                  <div className="edit-profile-new">Profile </div>
                </div>
                <div className="user-profile-nav">
                  <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    arial-label="Breadcrumb"
                  >
                    <Link color="inherit" href="#">
                      User Profile view
                    </Link>
                    <Link color="inherit" href="#" onClick={this.handleNavigationClick}>
                      <CustomIcon text="Profile" className="nav-user-profile-text" />
                    </Link>
                  </Breadcrumbs>
                </div>
              </div>
              {/* <UserBasicDetailsSave   />  */}
              {/* {this.state.user_save_state ? (
              <UserBasicDetailsView
                activeItem={this.state.activeItem}
                toggle={this.toggle}
                //onSave={this.handleSubmit}
              />
            ) : null} */}
              <div className="inbox-user-profile-right-container">
                <div className="inbox-user-profile-left-wraper">
                  <div className="component-div-padding">
                    <UserBasicDetailsView
                      fresher_experienced={this.state.result.is_fresher}
                      basic_profile={this.state.result.basic_profile}
                    />
                  </div>
                  {/* <div className="component-div-padding">
                    <ProfileSummary />
                  </div>
                  <div className="component-div-padding">
                    <ResumeHeadline resume_headline={this.state.result.resume_headline} />
                  </div> */}
                  <div className="component-div-padding">
                    <UserKeySkills />
                  </div>
                  <div className="component-div-padding">
                    <UserEmploymentView
                      employment_details={this.state.result.employment_details}
                      fresher_experienced={this.state.result.is_fresher}
                      training_internship={this.state.result.training_internship}
                    />
                  </div>
                  <div className="component-div-padding">
                    <UserEducationView education={this.state.result.education} />
                  </div>
                  {/* <div className="component-div-padding">
                    <TechnologiesWorkedOn
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
                  </div> */}
                  {/* <div className="component-div-padding">
                    <Projects projects={this.state.result.projects} />
                  </div> */}
                  {/* {!this.state.result.is_fresher ? (
                    <div className="component-div-padding">
                      <MyAchievements
                        training_internship={this.state.result.training_internship}
                        achievements={this.state.result.achievements}
                      />
                    </div>
                  ) : (
                    <div />
                  )} */}
                  {/* <div className="component-div-padding">
                    <UserMyAchievementView
                      // training_internship={this.state.result.training_internship}
                      achievements={this.state.result.achievements}
                    />
                  </div> */}
                  <UserProjectsView projects={this.state.result.projects} />
                  <div className="component-div-padding">
                    <UserDesiredCareerProfileView
                      desired_profile={this.state.result.desired_profile}
                    />
                  </div>
                  {/* <div className="component-div-padding">
                    <PersonalDetails personal_details={this.state.result.personal_details} />
                  </div> */}
                  {/* <UserEmploymentView />
            <UserEducationView />
            <UserProjectsView projects={this.state.result.projects} />
                  <UserDesiredCareerProfileView /> */}
                  <div className="component-div-padding">
                    <UserTechnologies />
                  </div>
                  <div className="component-div-padding">
                    <UserMyAchievementView
                      training_internship={this.state.result.training_internship}
                      achievements={this.state.result.achievements}
                    />
                  </div>

                  <UserPersonalDetailsView personal_details={this.state.result.personal_details} />
                </div>
                <div className="inbox-user-profile-right-wraper">
                  <UserSideBarView
                    {...this.props}
                    snippet={this.state.result.snippet}
                    resumes={this.state.result.resumes}
                  />
                </div>
              </div>
            </div>
          </div>
        </EmployerSideNav>
      </div>
    );
  }
}

export default withStyles(styles)(UserProfileFresherView);
