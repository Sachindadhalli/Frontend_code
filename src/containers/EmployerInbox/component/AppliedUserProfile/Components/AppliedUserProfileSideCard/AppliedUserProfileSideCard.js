//library dependency
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {toast} from "react-toastify";
import {BetaJSVideoPlayer} from 'react-betajs-media-component';
import FormHelperText from "@material-ui/core/FormHelperText";

//custom components
import CustomIcon from '../../../../../../components/CustomIcon/CustomIcon';
import IconValueComponent from '../../../../../../components/ReusableComponents/IconValueComponent';
import NonCreatableRemoteDataSingleSelectDropdown
  from "../../../../../../components/SingleSelectDropdownWrapper/components/NonCreatableRemoteDataSingleSelectDropdown/NonCreatableRemoteDataSingleSelectDropdown";

//styles
import './styles.scss';

//utilities
import {
  EMPLOYER_GET_JOB_STATUS,
  EMPLOYER_CHANGE_USER_STATUS,
  SERVER_API_URL
} from "../../../../../../../config/constants";
import {apiCall, handleLocalStorage} from "../../../../../../Utilities";

//icons
import displayPicture from '../../../../../../../assets/media/icons/profile-girl.svg';
import blackEnvelope from '../../../../../../../assets/media/icons/black-envelope.svg';
import Download from '../../../../../../../assets/media/icons/download.svg';
import company from '../../../../../../../assets/media/icons/company.svg';
import location from '../../../../../../../assets/media/icons/location.svg';
import mediaScreen from '../../../../../../../assets/media/images/mediaScreen.png'

const styles = () => ({
  root: {marginTop: 0},
  chip: {},
  card: {maxWidth: 345,},
  media: {height: 0, paddingTop: '56.25%',},
});

class AppliedUserProfileSideCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {login_error: ''}
  }

  /**
   * This function calls CallChangeStatusApi api
   * @param options
   */
  setDropDownOption = (options) => {
    this.CallChangeStatusApi(options.value, options.label);
  };

  /**
   * This function call employer user change status api to change status
   * @param key value
   * @returns {Promise<void>}
   * @constructor
   */
  CallChangeStatusApi = async (key, value) => {
    let headers = {'authorization': handleLocalStorage('get', 'employerLogin'), 'Content-Type': 'application/json',};
    const requestData = {"status": {"key": key, "value": value}};
    const USerProfileData = await apiCall('post', requestData, EMPLOYER_CHANGE_USER_STATUS.replace("<job_id>", this.props.match.params.job_id).replace("<applicant_id>", this.props.match.params.user_id), headers);
    if (USerProfileData.status) toast(`${USerProfileData.message}`, {});
    else toast(`${USerProfileData.message}`, {});
  };

  /**
   * this function gives login error if anyone try to download document
   */
  documentClick = () => {
    this.setState({login_error: "Kindly Login to open or download this!"});
    setTimeout(() => {
      this.setState({login_error: ""})
    }, 5000)
  };

  //just specifying because of video player props
  playerLoaded = () => {
  };

  //just specifying because of video player props
  playing = () => {
  };

  render() {
    const {classes, resumes, snippet, application_status, viewOnly} = this.props;
    const {login_error} = this.state;
    return (
      <div className="applied-user-side-body">
        {!viewOnly ?
          <div className="item-align">
            <label className="status-label-text">Status</label>
            <NonCreatableRemoteDataSingleSelectDropdown
              isSearchable={true}
              apiUrl={EMPLOYER_GET_JOB_STATUS}
              queryParams={{search: ''}}
              defaultValue={application_status !== "" ? {value: application_status, label: application_status} : ''}
              getSelectedOption={(option) => this.setDropDownOption(option)}
              isClearable={false}
              error={""}
              classes={classes.root}
              style={{"margin": "0px"}}
            />
          </div> : ''}
        <div className="user-details-card">
          <div className="profile-picture-container">
            <div className="profile-rectangle">
              <CustomIcon icon={snippet.profile_image ? SERVER_API_URL + snippet.profile_image : displayPicture}
                          iconStyle="profile-img"/>
            </div>
          </div>
          <div className="user-details-name-and-info">
            <div className="user-details-name">{snippet.full_name}</div>
            {snippet.title ? <div className="user-details-info">
              <IconValueComponent iconName={company} text={snippet.title}/>
            </div> : <div></div>}
            {snippet.email ? <div className="user-details-info">
              <IconValueComponent iconName={blackEnvelope} text={snippet.email}/>
            </div> : <div></div>}
            {snippet.location ? <div className="user-details-info">
              <IconValueComponent iconName={location} text={snippet.location}/>
            </div> : <div></div>}
          </div>
        </div>
        {!viewOnly ?
          <div className="user-documents-card">
            <div className="user-document-title">Documents</div>
            {resumes.resume_document1 ? <div className="user-document-resume-icon-div">
              <div className="user-document-resume">Resume</div>
              <a target="_blank" download="resume" href={SERVER_API_URL + resumes.resume_document1}>
                <CustomIcon icon={Download} iconStyle="job-list-company-image"> </CustomIcon>
              </a>
            </div> : ''
            }
          </div>
          :
          resumes.resume_document1 ?
            <div className="user-documents-card">
              <div className="user-document-title">Documents</div>
              <div className="user-document-resume-icon-div" onClick={this.documentClick}>
                <div className="user-document-resume">Resume</div>
                <CustomIcon icon={Download} iconStyle="job-list-company-image"> </CustomIcon>
              </div>
              {login_error &&
              <FormHelperText style={{color: "#f0582b", paddingLeft: "20px"}}>{login_error}</FormHelperText>}
            </div>
            : ''
        }
        {!viewOnly ?
          <div className="user-video-resume-card">
            <div className="user-video-resume-title">Video Resume</div>
            <div className="user-video-resume">
              {resumes.resume_video1 && <BetaJSVideoPlayer
                source={resumes.resume_video1.includes("shenzyn") ? resumes.resume_video1.replace("https%3A/", "http://") : SERVER_API_URL + resumes.resume_video1.replace("https%3A/", "http://")}
                poster={mediaScreen}
                theme={"cube"}
                locale={'en'}
                onLoaded={this.playerLoaded}
                onPlaying={this.playing}
                width="100%"
                height={"auto"}
              />}
            </div>
          </div> :
          resumes.resume_video1 ?
            <div className="user-video-resume-card">
              <div className="user-video-resume-title">Video Resume</div>
              <div className="user-video-resume">
                <BetaJSVideoPlayer
                  source={resumes.resume_video1.includes("shenzyn") ? resumes.resume_video1.replace("https%3A/", "http://") : SERVER_API_URL + resumes.resume_video1.replace("https%3A/", "http://")}
                  poster={mediaScreen}
                  theme={"cube"}
                  locale={'en'}
                  onLoaded={this.playerLoaded}
                  onPlaying={this.playing}
                  width="100%"
                  height={"auto"}
                />
              </div>
            </div> : ''
        }
      </div>
    );
  }
}

AppliedUserProfileSideCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppliedUserProfileSideCard);
