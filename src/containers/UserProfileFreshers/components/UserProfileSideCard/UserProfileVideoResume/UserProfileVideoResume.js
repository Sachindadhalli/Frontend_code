{
  /* <div className="user-video-resume-card">
  <div className="user-video-resume-title">Video Resume</div>
  <div className="user-video-resume" />
  {resumes.resume_video1 ? (
    <iframe width="100%" height="161" src={resumes.resume_video1} />
  ) : (
    <div> </div>
  )}
  {resumes.resume_video2 ? (
    <iframe width="100%" height="161" src={resumes.resume_video2} />
  ) : (
    <div> </div>
  )}
</div>; */
}
import React, { Component } from 'react';
import { BetaJSVideoPlayer } from 'react-betajs-media-component';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import mediaScreen from '../../../../../../assets/media/images/mediaScreen.png';
import DateFnsUtils from '@date-io/date-fns';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import CustomTag from '../../../../../components/CustomTag';
import CustomBreadcrumb from '../../../../../components/CustomBreadcrumb/CustomBreadcrumb';
import CustomIcon from '../../../../../components/CustomIcon/CustomIcon';
// import AutoCompleteNew from '../../../../../components/AutoCompleteNew/AutoCompleteNew';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AutoCompleteNew from '../../../../../components/AutoCompleteNew';
// import InputLabel from '@material-ui/core/InputLabel';
//import './style.scss';
import Input from '@material-ui/core/Input';
import calendar from '../../../../../../assets/media/icons/calendar.svg';
import { TextField, withStyles } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import untick from '../../../../../../assets/media/icons/untick.svg';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
// import UserBasicDetailsView from '../../../UserProfileFresherView/components/UserBasicDetailsView/UserBasicDetailsView';
//import customisedMaterial from '../../../../styles/customisedMaterial';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import dropdown from '../../../../../../assets/media/icons/dropdown.svg';
import DateTimePicker from '../../../../../components/DateTimePicker';
import MultiSelect from '../../../../../components/MultiSelectDropDown/MultiSelect';

class UserProfileVideoResume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {
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
      value: 'search',
    };
  }
  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes, resumes, snippet } = this.state;
    return (
      <div className="user-video-resume-card">
        <div className="user-video-resume-title dark-text-heading">Video Resume</div>
        <BetaJSVideoPlayer
          source={'https://dev.shenzyn.com/shenzyn-media-server/files/video-1560846278158.mp4'}
          // source={
          //   job_description_documents.video.includes('shenzyn')
          //     ? job_description_documents.video.replace('https%3A/', 'http://')
          //     : SERVER_API_URL + job_description_documents.video.replace('https%3A/', 'http://')
          // }
          poster={mediaScreen}
          theme={'cube'}
          locale={'en'}
          width="100%"
          height={'auto'}
        />
        <div className="left-hr-line" />
      </div>
    );
  }
}

export default UserProfileVideoResume;
