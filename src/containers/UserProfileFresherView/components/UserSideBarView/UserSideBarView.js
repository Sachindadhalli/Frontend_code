import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import './styles.scss';
// import SingleSelectDropDown from '../../../InboxJobSeeker/Component/SingleSelectDropdown/SingleSelectDropdown';
import display_picture from '../../../../../assets/media/icons/displayPicture.svg';
import CustomIcon from '../../../../components/CustomIcon/CustomIcon';
import { IconButton } from '@material-ui/core';
import IconValueComponent from '../../../../components/ReusableComponents/IconValueComponent';
import blackenvelope from '../../../../../assets/media/icons/black-envelope.svg';
import Download from '../../../../../assets/media/icons/download.svg';
import company from '../../../../../assets/media/icons/company.svg';
import location from '../../../../../assets/media/icons/location.svg';
import mediaScreen from '../../../../../assets/media/images/mediaScreen.png';
import {
  EMPLOYER_GET_JOB_STATUS,
  EMPLOYER_CHANGE_USER_STATUS,
  SERVER_API_URL,
} from '../../../../../config/constants';
import NonCreatableRemoteDataSingleSelectDropdown from '../../../../components/SingleSelectDropdownWrapper/components/NonCreatableRemoteDataSingleSelectDropdown/NonCreatableRemoteDataSingleSelectDropdown';
import { apiCall, handleLocalStorage } from '../../../../Utilities';
import { toast } from 'react-toastify';
import { BetaJSVideoPlayer } from 'react-betajs-media-component';

const styles = theme => ({
  root: {
    marginTop: 0,
  },
  chip: {},
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
});

class UserSideBarView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  selectedData = data => {};
  setDropdownOption = (options, name) => {
    //console.log(options,name, this.props)
    this.CallChangeStatusApi(options.value, options.label);
  };
  CallChangeStatusApi = async (key, value) => {
    let headers = {
      authorization: handleLocalStorage('get', 'employerLogin'),
      'Content-Type': 'application/json',
    };
    const requestData = {
      status: { key: key, value: value },
    };
    const USerProfileData = await apiCall(
      'post',
      requestData,
      EMPLOYER_CHANGE_USER_STATUS.replace('<job_id>', this.props.match.params.job_id).replace(
        '<applicant_id>',
        this.props.match.params.user_id,
      ),
      headers,
    );
    if (USerProfileData.status) {
      toast(`${USerProfileData.message}`, {});
    } else {
      toast(`${USerProfileData.message}`, {});
    }
  };
  playerLoaded = () => {
    console.log('Player loaded');
  };
  playing = () => {
    console.log("it's playing, your action here");
  };

  render() {
    const { classes, resumes, snippet, application_status } = this.props;
    return (
      <div className="applied-user-side-body">
        <div className="user-details-card">
          <div className="profile-picture-container">
            <div className="profile-rectangle">
              <CustomIcon
                icon={
                  this.props.snippet.profile_image
                    ? SERVER_API_URL + this.props.snippet.profile_image
                    : display_picture
                }
                iconStyle="profile-img"
              />
            </div>
          </div>
          <div className="user-details-name-and-info">
            <div className="user-details-name">{snippet.full_name}</div>
            {snippet.title ? (
              <div className="user-details-info">
                <IconValueComponent iconName={company} text={snippet.title} />
              </div>
            ) : (
              <div> </div>
            )}
            {snippet.email ? (
              <div className="user-details-info">
                <IconValueComponent iconName={blackenvelope} text={snippet.email} />
              </div>
            ) : (
              <div> </div>
            )}
            {snippet.location ? (
              <div className="user-details-info">
                <IconValueComponent iconName={location} text={snippet.location} />
              </div>
            ) : (
              <div> </div>
            )}
          </div>
        </div>
        <div className="user-documents-card">
          <div className="user-document-title">Documents</div>
          {resumes.resume_document1 ? (
            <div className="user-document-resume-icon-div">
              <div className="user-document-resume">Resume</div>
              <a target="_blank" download="resume" href={SERVER_API_URL + resumes.resume_document1}>
                <CustomIcon icon={Download} iconStyle="job-list-company-image" />
              </a>
            </div>
          ) : (
            <div> </div>
          )}
        </div>
        <div className="user-video-resume-card">
          <div className="user-video-resume-title">Video Resume</div>
          <div className="user-video-resume" />
          {resumes.resume_video1 ? (
            <BetaJSVideoPlayer
              source={
                resumes.resume_video1.includes('shenzyn')
                  ? resumes.resume_video1.replace('https%3A/', 'http://')
                  : SERVER_API_URL + resumes.resume_video1.replace('https%3A/', 'http://')
              }
              poster={mediaScreen}
              theme={'cube'}
              locale={'en'}
              onLoaded={this.playerLoaded}
              onPlaying={this.playing}
              width="100%"
              height={'auto'}
            />
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}

UserSideBarView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserSideBarView);
