/******************************************SERVER ENDPOINTS*************************************/
//DEV
const SERVER_API_URL = 'https://dev-api.shenzyn.com/';
const SERVER_URL = 'https://dev.shenzyn.com';
const EMPLOYER_LOGIN_REDIRECT_URL =
  'https://www.linkedin.com/oauth/v2/authorization?scope=r_liteprofile+r_emailaddress&redirect_uri=https%3A%2F%2Fdev.shenzyn.com%2Femployer-login%2Flinkedin-callback%2F&client_id=81bydvlq8vfgo4&response_type=code';
const EMPLOYER_LOGIN_GMAIL_REDIRECT_URL =
  'http://dev-api.shenzyn.com/pinkjob/employer-login/gmail/gmailAuthenticate';

//Local
// const EMPLOYER_LOGIN_REDIRECT_URL = "https://www.linkedin.com/oauth/v2/authorization?scope=r_liteprofile+r_emailaddress&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Femployer-login%2Flinkedin-callback%2F&client_id=81bydvlq8vfgo4&response_type=code"
// const SERVER_API_URL = 'https://dev-api.shenzyn.com/';
// const EMPLOYER_LOGIN_GMAIL_REDIRECT_URL = "http://dev-api.shenzyn.com/pinkjob/employer-login/gmail/gmailAuthenticate"

//TEST
// const SERVER_API_URL = 'https://test-api.shenzyn.com/';
// const SERVER_URL='https://test.shenzyn.com';
// const EMPLOYER_LOGIN_REDIRECT_URL = "https://www.linkedin.com/oauth/v2/authorization?scope=r_liteprofile+r_emailaddress&redirect_uri=https%3A%2F%2Ftest.shenzyn.com%2Femployer-login%2Flinkedin-callback%2F&client_id=81bydvlq8vfgo4&response_type=code";
// const EMPLOYER_LOGIN_GMAIL_REDIRECT_URL = "http://test-api.shenzyn.com/pinkjob/employer-login/gmail/gmailAuthenticate"

//UAT
// const SERVER_API_URL = 'https://uat-api.shenzyn.com/';
// const SERVER_URL='https://uat.shenzyn.com';
// const EMPLOYER_LOGIN_REDIRECT_URL = "https://www.linkedin.com/oauth/v2/authorization?scope=r_liteprofile+r_emailaddress&redirect_uri=https%3A%2F%2Fuat.shenzyn.com%2Femployer-login%2Flinkedin-callback%2F&client_id=81bydvlq8vfgo4&response_type=code";
// const EMPLOYER_LOGIN_GMAIL_REDIRECT_URL = "http://uat-api.shenzyn.com/pinkjob/employer-login/gmail/gmailAuthenticate"

/********************************JOB SEEKER ENDPOINTS*******************************************/
  //SIGN UP
const JOBSEEKER_EMAIL_VERIFICATION = 'job-seeker-registration/email-verification/';
const JOBSEEKER_MOBILE_VERIFICATION = 'job-seeker-registration/mobile-otp-send/';
const JOBSEEKER_MOBILE_OTP_VERIFICATION = 'job-seeker-registration/mobile-otp-verification/';
const GRADING_SYSTEM = 'job-seeker-registration/get-grading-system/';
const COUNTRY = 'job-seeker-registration/get-country/';
const STATE = 'job-seeker-registration/get-state/';
const CITY = 'job-seeker-registration/get-city/';
const COMPANY = 'job-seeker-registration/get-company-name/';
const JOB_ROLE = 'job-seeker-registration/get-designation/';
const AADHAR_UPDATE = 'job-seeker-registration/store-aadhar/';
const KEY_SKILLS = 'job-seeker-registration/get-skill-set/';
const UPLOAD_VIDEO_RESUME = "job-seeker-registration/store-aadhar/";

//LOGIN
const EMPLOYEE_LOGIN = 'job-seeker-login/login/';
const EMPLOYEE_FORGOT_PASSWORD = 'job-seeker-login/forgot-password/';
const EMPLOYEE_OTP_VALIDATE = 'job-seeker-login/otp-validate/';
const EMPLOYEE_NEW_PASSWORD = 'job-seeker-login/new-password/';

//JOB LISTING
const GET_JOB_LIST = "job-listing/search-jobs/";
const SEARCH_SKILLS_DESIGNATION_COMPANIES = "https://test-api.shenzyn.com/";
const JOB_LISTING_QUICK_APPLY = "job-listing/quick-apply-jobs/";
const JOB_LISTING_SAVE_JOBS = "job-listing/save-jobs/";
const JOB_LISTING_SKILLS_COMPANY_DESIGNATION = "job-listing/get-skill-company-designation/";
const JOB_LISTING_SEARCH_JOB = "job-listing/search-jobs/";
const JOB_LISTING_SAVED_JOBS = "job-listing/get-saved-jobs/";
const JOB_LISTING_GET_DETAILS = "job-listing/preview-jobs/";
const GET_SKILLS = "skills/";
const JOB_LISTING_GET_QUESTIONNAIRE = "job-listing/get-questionnaire/";
const EMPLOYER_INBOX_SOCKET = "pinkjob/job-listing/live-count-update/";

//APPLICATION STATUS
const JOB_APPLICATION_STATUS = "job-seeker/check-application-status/";

/***********************************EMPLOYER ENDPOINTS*****************************************/

//SIGN UP
const EMPLOYER_EMAIL_VERIFICATION = 'employer-registration/email-verification/';
const EMPLOYER_REGISTRATION = 'employer-registration/join-recruiter/';

//LOGIN
const EMPLOYER_LOGIN = 'employer-login/login/';
const EMPLOYER_FORGOT_PASSWORD = 'employer-login/forgot-password/';
const EMPLOYER_OTP_VALIDATE = 'employer-login/otp-validate/';
const EMPLOYER_NEW_PASSWORD = 'employer-login/new-password/';
const EMPLOYER_LOGIN_WITH_LINKEDIN = 'employer-login/linkedin-callback/';
const SERVER_API_PATH = 'pinkjob/';
const EMPLOYER_LOGIN_WITH_GMAIL = 'employer-login/gmail/oauth2callback/';

//HOME PAGE
const EMPLOYER_UPDATE_CONTACT_DETAILS = 'employer-homepage/update-contact-details/';
const EMPLOYER_JOB_PAGE_CUSTOMISE_URL = "employer-homepage/url-view/";
const EMPLOYER_JOB_PAGE_CUSTOMISE_URL_VALIDATION = "employer-homepage/url-validity/";
const EMPLOYER_JOB_PAGE_CUSTOMISE_SEND_URL = "employer-homepage/url-view/";
const EMPLOYER_JOB_PAGE_GET_RECOMMENDED_URL = "employer-homepage/url-recommendation/";
const EMPLOYER_GET_CONTACT_DETAILS = 'employer-homepage/get-contact-details/';
const CHECK_SECONDATY_EMAIL = "employer-homepage/check-secondary-email/";
const INDUSTRY = 'employer-homepage/get-industries/';
const FUNCTIONAL_AREA = 'employer-homepage/get-functional-areas/';
const ORGANISATION = 'employer-homepage/get-organisations/';
const EMPLOYER_HOMEPAGE_EMAIL_VERIFICATION_GET_OTP = 'employer-homepage/personal-info-email-otp/';
const EMPLOYER_HOMEPAGE_EMAIL_VERIFICATION_VERIFY_OTP =
  'employer-homepage/personal-info-email-otp-validate/';
const EMPLOYER_HOMEPAGE_MOBILE_VERIFICATION_GET_OTP = 'employer-homepage/personal-info-phone-otp/';
const EMPLOYER_HOMEPAGE_MOBILE_VERIFICATION_VERIFY_OTP =
  'employer-homepage/personal-info-phone-otp-validate/';
const EMPLOYER_HOMEPAGE_LEVELS_LIST = 'employer-homepage/get-levels/';
const EMPLOYER_HOMEPAGE_UPDATE_SECTOR_ROLES_HIRE_FOR = 'employer-homepage/update-sector-roles/';
const EMPLOYER_HOMEPAGE_GET_SECTOR_ROLES_HIRE_FOR = 'employer-homepage/get-sector-roles/';
const EMPLOYER_GET_BASIC_PROFILE_DETAILS = 'employer-homepage/get-basic-profile-details/';
const EMPLOYER_UPDATE_BASIC_PROFILE_DETAILS = 'employer-homepage/update-basic-profile-details/';
<<<<<<< HEAD
const EMPLOYER_UPDATE_WORK_EXP_DETAILS = "employer-homepage/update-work-experience-details/";
const EMPLOYER_GET_WORK_EXP_DETAILS = "employer-homepage/get-work-experience-details/";
const EMPLOYER_ADD_WORK_EXP_DETAILS = "employer-homepage/add-work-experience-details/";
const EMPLOYER_DELETE_WORK_EXP_DETAILS = "employer-homepage/delete-work-experience-details/";
=======
const EMPLOYEE_LOGIN = 'job-seeker-login/login/';
const EMPLOYEE_FORGOT_PASSWORD = 'job-seeker-login/forgot-password/';
const EMPLOYEE_OTP_VALIDATE = 'job-seeker-login/otp-validate/';
const EMPLOYEE_NEW_PASSWORD = 'job-seeker-login/new-password/';
const EMPLOYER_POST_JOB_MODAL = '';
const EMPLOYER_UPDATE_CONTACT_DETAILS = 'employer-homepage/update-contact-details/';
const EMPLOYER_GET_CONTACT_DETAILS = 'employer-homepage/get-contact-details/';
const UPLOAD_VIDEO_RESUME = 'job-seeker-registration/store-aadhar/';
>>>>>>> user-profile-integration

//POST JOB
const POST_JOB = 'post-jobs/post-jobs/';
<<<<<<< HEAD
const CURRENCY = 'post-jobs/get-currency/';
const POST_JOB_GET_ORGANISATION = "post-jobs/get-organisations/";
const POST_JOB_SPECIFY_QUALIFICATION = "post-jobs/get-qualifications/";
const POST_JOB_SPECIFY_PHD_QUALIFICATION = "post-jobs/get-phd-qualification/";
const POST_JOB_SPECIFY_SPECIALISATION = "post-jobs/get-specialisations/";
const JOB_SEEKER_REGISTRATION = "job-seeker-registration/register/";
const POST_JOBS_EMAIL_EXIST = "post-jobs/get-existing-email/";
const POST_JOBS_GET_DETAILS = "post-jobs/get-post-job-details/";
const CURRENT_SIMILAR_TO_PREVIOUS = "post-jobs/current-similar-to-previous/";
const EMPLOYEE_EDUCATION_DETAILS = "job-seeker-registration/get-qualifications/";
const GET_ORAGANISATION = "post-jobs/get-advertise/";
const CREATE_ORGANISATION = "post-jobs/create-advertise/";
const DELETE_ORGANISATION = "post-jobs/delete-advertise/";
const UPDATE_ORGANISATION = "post-jobs/update-advertise/";
const QUESTIONNAIRE_NAME = "post-jobs/get-questionnaire-names/";
const DELETE_QUESTIONNAIRE = "post-jobs/delete-questionnaire/";
const GET_QUESTIONNAIRE = "post-jobs/get-questionnaire/";
const EDIT_QUESTIONNAIRE = "post-jobs/edit-questionnaire/";
const CREATE_QUESTIONNAIRE = "post-jobs/create-questionnaire/";
const GET_TAB_COUNT = "post-jobs/get-tab-count/";
const EMPLOYER_GET_SAVED_JOBS = "post-jobs/get-saved-jobs/";
const EMPLOYER_POST_JOB_MODAL = '';

//ACCOUNT SETTING
=======
const COUNTRY = 'job-seeker-registration/get-country/';
const STATE = 'job-seeker-registration/get-state/';
const CITY = 'job-seeker-registration/get-city/';
const COMPANY = 'job-seeker-registration/get-company-name/';
const ORGANISATION = 'employer-homepage/get-organisations/';
const GRADING_SYSTEM = 'job-seeker-registration/get-grading-system/';

const POST_JOB_GET_ORGANISATION = 'post-jobs/get-organisations/';
const POST_JOB_SPECIFY_QUALIFICATION = 'post-jobs/get-qualifications/';
const POST_JOB_SPECIFY_PHD_QUALIFICATION = 'post-jobs/get-phd-qualification/';
const POST_JOB_SPECIFY_SPECIALISATION = 'post-jobs/get-specialisations/';
const JOB_SEEKER_REGISTRATION = 'job-seeker-registration/register/';
const POST_JOBS_EMAIL_EXIST = 'post-jobs/get-existing-email/';
const POST_JOBS_GET_DETAILS = 'post-jobs/get-post-job-details/';
const CURRENT_SIMILAR_TO_PREVIOUS = 'post-jobs/current-similar-to-previous/';
const EMPLOYEE_EDUCATION_DETAILS = 'job-seeker-registration/get-qualifications/';
const GET_ORAGANISATION = 'post-jobs/get-advertise/';
const CREATE_ORGANISATION = 'post-jobs/create-advertise/';
const DELETE_ORGANISATION = 'post-jobs/delete-advertise/';
const UPDATE_ORGANISATION = 'post-jobs/update-advertise/';
const QUESTIONNAIRE_NAME = 'post-jobs/get-questionnaire-names/';
const DELETE_QUESTIONNAIRE = 'post-jobs/delete-questionnaire/';
const GET_QUESTIONNAIRE = 'post-jobs/get-questionnaire/';
const EDIT_QUESTIONNAIRE = 'post-jobs/edit-questionnaire/';
const CREATE_QUESTIONNAIRE = 'post-jobs/create-questionnaire/';
const GET_TAB_COUNT = 'post-jobs/get-tab-count/';

const EMPLOYER_UPDATE_WORK_EXP_DETAILS = 'employer-homepage/update-work-experience-details/';
const EMPLOYER_GET_WORK_EXP_DETAILS = 'employer-homepage/get-work-experience-details/';
const EMPLOYER_ADD_WORK_EXP_DETAILS = 'employer-homepage/add-work-experience-details/';
const EMPLOYER_DELETE_WORK_EXP_DETAILS = 'employer-homepage/delete-work-experience-details/';
//Local
// const EMPLOYER_LOGIN_REDIRECT_URL = "https://www.linkedin.com/oauth/v2/authorization?scope=r_liteprofile+r_emailaddress&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Femployer-login%2Flinkedin-callback%2F&client_id=81bydvlq8vfgo4&response_type=code"
// const SERVER_API_URL = 'https://dev-api.shenzyn.com/';
// const EMPLOYER_LOGIN_GMAIL_REDIRECT_URL = "http://dev-api.shenzyn.com/pinkjob/employer-login/gmail/gmailAuthenticate"

// dev
const SERVER_API_URL = 'http://127.0.0.1:8000/';
const SERVER_URL = 'http://127.0.0.1:8000/';
const EMPLOYER_LOGIN_REDIRECT_URL =
  'https://www.linkedin.com/oauth/v2/authorization?scope=r_liteprofile+r_emailaddress&redirect_uri=https%3A%2F%2Fdev.shenzyn.com%2Femployer-login%2Flinkedin-callback%2F&client_id=81bydvlq8vfgo4&response_type=code';
const EMPLOYER_LOGIN_GMAIL_REDIRECT_URL =
  'http://dev-api.shenzyn.com/pinkjob/employer-login/gmail/gmailAuthenticate';

// test
// const SERVER_API_URL = 'https://test-api.shenzyn.com/';
// const SERVER_URL='https://test.shenzyn.com';
// const EMPLOYER_LOGIN_REDIRECT_URL = "https://www.linkedin.com/oauth/v2/authorization?scope=r_liteprofile+r_emailaddress&redirect_uri=https%3A%2F%2Ftest.shenzyn.com%2Femployer-login%2Flinkedin-callback%2F&client_id=81bydvlq8vfgo4&response_type=code";
// const EMPLOYER_LOGIN_GMAIL_REDIRECT_URL = "http://test-api.shenzyn.com/pinkjob/employer-login/gmail/gmailAuthenticate"
//uat
// const SERVER_API_URL = 'https://uat-api.shenzyn.com/';
// const SERVER_URL = 'https://uat.shenzyn.com';
// const EMPLOYER_LOGIN_REDIRECT_URL =
//   'https://www.linkedin.com/oauth/v2/authorization?scope=r_liteprofile+r_emailaddress&redirect_uri=https%3A%2F%2Fuat.shenzyn.com%2Femployer-login%2Flinkedin-callback%2F&client_id=81bydvlq8vfgo4&response_type=code';
// const EMPLOYER_LOGIN_GMAIL_REDIRECT_URL =
//   'http://uat-api.shenzyn.com/pinkjob/employer-login/gmail/gmailAuthenticate';

//Account Settings
>>>>>>> user-profile-integration
const GET_EMAIL_ID = 'account-settings/get-email/';
const DELETE_ACCOUNT = 'account-settings/alter-account/';
const SUSPEND_ACCOUNT = 'account-settings/alter-account/';
const CHANGE_PASSWORD = 'account-settings/change-password/';
const UPDATE_EMAILID = 'account-settings/change-email/)';
const ACCOUNT_DETAILS_EMAIL_OTP_VALIDATE = 'account-settings/email-otp-validate/';
const ACCOUNT_DETAILS_SEND_OTP = 'account-settings/send-otp/';
<<<<<<< HEAD

//SUB USER
const SUB_USER_LIST = "sub_user/";
const GET_PERMISSIONS = "sub_user/permissions/";
const VALIDATE_SUB_USER_EMAIL = "sub_user/email-permissions/";

//EMPLOYER INBOX
const EMPLOYER_INBOX_HOME = "employer-inbox/home/";
const EMPLOYER_APPLIED_PROFILES = "employer-inbox/<job_id>/";
const EMPLOYER_USER_PROFILE = "employer-inbox/<job_id>/<applicant_id>/get-profile/";
const EMPLOYER_GET_JOB_STATUS = "employer-inbox/get-status/";
const EMPLOYER_CHANGE_USER_STATUS = "employer-inbox/<job_id>/<applicant_id>/change-status/";
const EMPLOYER_INBOX_ORGANISATION = "employer-inbox/<job_id>/organization-list/";
const EMPLOYER_INBOX_LOCATION = "employer-inbox/<job_id>/location-list/";
const EMPLOYER_SHARED_USER_PROFILE = "employer-inbox/user-profile/";

//USER PROFILE
const USER_PROFILE_BASIC_DETAILS_GET = 'user-profile/basic-details/';
const USER_PROFILE_PROFILE_SUMMARY_GET = 'user_profile/fresher/profile_summary';
const USER_PROFILE_RESUME_HEADLINE_GET = 'user_profile/resume-headline/';
const USER_PROFILE_TECHNOLOGIES_GET = 'user-profile/technologies';

//APPLICATION STATUS
const JOB_APPLICATION_STATUS_FILTER_BY = "employer-inbox/get-status/";

export {
  SERVER_URL,
  EMPLOYER_EMAIL_VERIFICATION,
  SERVER_API_PATH, SERVER_API_URL,
=======
//sub users

const SUB_USER_LIST = 'sub_user/';
const GET_PERMISSIONS = 'sub_user/permissions/';
const VALIDATE_SUB_USER_EMAIL = 'sub_user/email-permissions/';

//job listing
const GET_JOB_LIST = 'job-listing/search-jobs/';
const SEARCH_SKILLS_DESIGNATION_COMPANIES = 'https://test-api.shenzyn.com/';
const JOB_LISTING_QUICK_APPLY = 'job-listing/quick-apply-jobs/';
const JOB_LISTING_SAVE_JOBS = 'job-listing/save-jobs/';
const JOB_LISTING_SKILLS_COMPANY_DESIGNATION = 'job-listing/get-skill-company-designation/';
const JOB_LISTING_SEARCH_JOB = 'job-listing/search-jobs/';
const JOB_LISTING_GET_DETAILS = 'job-listing/preview-jobs/';
const GET_SKILLS = 'skills/';
const JOB_LISTING_GET_QUESTIONNAIRE = 'job-listing/get-questionnaire/';

//Inbox Employer
const EMPLOYER_INBOX_HOME = 'employer-inbox/home/';
const EMPLOYER_APPLIED_PROFILES = 'employer-inbox/<job_id>/';
const EMPLOYER_USER_PROFILE = 'employer-inbox/<job_id>/<applicant_id>/get-profile/';
const EMPLOYER_GET_JOB_STATUS = 'employer-inbox/get-status/';
const EMPLOYER_CHANGE_USER_STATUS = 'employer-inbox/<job_id>/<applicant_id>/change-status/';
const EMPLOYER_INBOX_ORGANISATION = 'employer-inbox/<job_id>/organization-list/';
const EMPLOYER_INBOX_LOCATION = 'employer-inbox/<job_id>/location-list/';

// User Profile
const USER_PROFILE_KEY_SKILLS = 'user-profile/key-skills/';
const USER_PROFILE_EDUCATION = 'user-profile/education/';
const USER_PROFILE_PHOTO = 'user-profile/photo/';
const USER_PROFILE_AADHAR = 'user-profile/aadhar/';
const USER_PROFILE_RESUME = 'user-profile/resume/';
const USER_PROFILE_DESIRED_CAREER_PROFILE = 'user-profile/desired-career-profile/';
const USER_PROFILE_EMPLOYMENT = 'user-profile/employment/';
const USER_PROFILE_BASIC_DETAILS = 'user-profile/user-details/';
export {
  USER_PROFILE_KEY_SKILLS,
  USER_PROFILE_EDUCATION,
  USER_PROFILE_PHOTO,
  USER_PROFILE_AADHAR,
  USER_PROFILE_RESUME,
  USER_PROFILE_DESIRED_CAREER_PROFILE,
  USER_PROFILE_EMPLOYMENT,
  USER_PROFILE_BASIC_DETAILS,
};
//job application status

const JOB_APPLICATION_STATUS = 'job-seeker/check-application-status/';
const JOB_APPLICATION_STATUS_FILTER_BY = 'employer-inbox/get-status/';
export {
  SERVER_URL,
  EMPLOYER_EMAIL_VERIFICATION,
  SERVER_API_PATH,
  SERVER_API_URL,
>>>>>>> user-profile-integration
  JOBSEEKER_EMAIL_VERIFICATION,
  JOBSEEKER_MOBILE_VERIFICATION,
  JOBSEEKER_MOBILE_OTP_VERIFICATION,
  EMPLOYER_REGISTRATION,
  EMPLOYER_LOGIN,
  EMPLOYER_FORGOT_PASSWORD,
  EMPLOYER_OTP_VALIDATE,
  EMPLOYER_NEW_PASSWORD,
  EMPLOYER_LOGIN_WITH_LINKEDIN,
  EMPLOYER_LOGIN_REDIRECT_URL,
  EMPLOYER_LOGIN_WITH_GMAIL,
  EMPLOYER_LOGIN_GMAIL_REDIRECT_URL,
  EMPLOYER_HOMEPAGE_EMAIL_VERIFICATION_GET_OTP,
  EMPLOYER_HOMEPAGE_EMAIL_VERIFICATION_VERIFY_OTP,
  EMPLOYER_HOMEPAGE_MOBILE_VERIFICATION_GET_OTP,
  EMPLOYER_HOMEPAGE_MOBILE_VERIFICATION_VERIFY_OTP,
  EMPLOYER_HOMEPAGE_LEVELS_LIST,
  EMPLOYER_HOMEPAGE_UPDATE_SECTOR_ROLES_HIRE_FOR,
  EMPLOYER_HOMEPAGE_GET_SECTOR_ROLES_HIRE_FOR,
  EMPLOYER_GET_BASIC_PROFILE_DETAILS,
  EMPLOYER_UPDATE_BASIC_PROFILE_DETAILS,
  EMPLOYEE_LOGIN,
  EMPLOYEE_FORGOT_PASSWORD,
  EMPLOYEE_OTP_VALIDATE,
  EMPLOYEE_NEW_PASSWORD,
  EMPLOYER_POST_JOB_MODAL,
  JOB_ROLE,
  KEY_SKILLS,
  CURRENCY,
  INDUSTRY,
  FUNCTIONAL_AREA,
  COUNTRY,
  STATE,
  CITY,
  POST_JOB,
  POST_JOB_GET_ORGANISATION,
  POST_JOB_SPECIFY_QUALIFICATION,
  POST_JOB_SPECIFY_PHD_QUALIFICATION,
  POST_JOB_SPECIFY_SPECIALISATION,
  POST_JOBS_GET_DETAILS,
  CURRENT_SIMILAR_TO_PREVIOUS,
  JOB_SEEKER_REGISTRATION,
  COMPANY,
  AADHAR_UPDATE,
  POST_JOBS_EMAIL_EXIST,
  GRADING_SYSTEM,
  GET_EMAIL_ID,
  EMPLOYER_UPDATE_CONTACT_DETAILS,
  EMPLOYER_GET_CONTACT_DETAILS,
  EMPLOYER_GET_WORK_EXP_DETAILS,
  EMPLOYER_ADD_WORK_EXP_DETAILS,
  EMPLOYER_UPDATE_WORK_EXP_DETAILS,
  EMPLOYER_DELETE_WORK_EXP_DETAILS,
  SUB_USER_LIST,
  GET_PERMISSIONS,
  VALIDATE_SUB_USER_EMAIL,
  DELETE_ACCOUNT,
  SUSPEND_ACCOUNT,
  CHANGE_PASSWORD,
  UPDATE_EMAILID,
  ACCOUNT_DETAILS_EMAIL_OTP_VALIDATE,
  ACCOUNT_DETAILS_SEND_OTP,
  GET_JOB_LIST,
  SEARCH_SKILLS_DESIGNATION_COMPANIES,
  ORGANISATION,
  EMPLOYEE_EDUCATION_DETAILS,
  GET_ORAGANISATION,
  CREATE_ORGANISATION,
  JOB_LISTING_QUICK_APPLY,
  JOB_LISTING_SAVE_JOBS,
  JOB_LISTING_SKILLS_COMPANY_DESIGNATION,
  JOB_LISTING_SEARCH_JOB,
  JOB_APPLICATION_STATUS,
  DELETE_ORGANISATION,
  UPDATE_ORGANISATION,
  JOB_LISTING_GET_DETAILS,
  EMPLOYER_INBOX_HOME,
  EMPLOYER_APPLIED_PROFILES,
  EMPLOYER_USER_PROFILE,
  EMPLOYER_GET_JOB_STATUS,
  EMPLOYER_CHANGE_USER_STATUS,
  EMPLOYER_INBOX_ORGANISATION,
  EMPLOYER_INBOX_LOCATION,
  QUESTIONNAIRE_NAME,
  DELETE_QUESTIONNAIRE,
  GET_QUESTIONNAIRE,
  EDIT_QUESTIONNAIRE,
  CREATE_QUESTIONNAIRE,
  JOB_APPLICATION_STATUS_FILTER_BY,
  JOB_LISTING_GET_QUESTIONNAIRE,
  GET_TAB_COUNT,
<<<<<<< HEAD
  JOB_LISTING_SAVED_JOBS,
  EMPLOYER_INBOX_SOCKET,
  CHECK_SECONDATY_EMAIL,
  EMPLOYER_SHARED_USER_PROFILE,
  EMPLOYER_JOB_PAGE_CUSTOMISE_URL,
  EMPLOYER_JOB_PAGE_CUSTOMISE_URL_VALIDATION,
  EMPLOYER_JOB_PAGE_CUSTOMISE_SEND_URL,
  EMPLOYER_JOB_PAGE_GET_RECOMMENDED_URL,
  EMPLOYER_GET_SAVED_JOBS,
  USER_PROFILE_BASIC_DETAILS_GET,
  USER_PROFILE_PROFILE_SUMMARY_GET,
  USER_PROFILE_RESUME_HEADLINE_GET,
  USER_PROFILE_TECHNOLOGIES_GET
}
=======
};
>>>>>>> user-profile-integration
