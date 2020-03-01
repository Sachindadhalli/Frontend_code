//library dependency
import React, {Component} from 'react';
import {BetaJSVideoPlayer} from 'react-betajs-media-component';

//custom components

//styles
import './styles.scss';
import {SERVER_API_URL} from "../../../../../config/constants";

//utilities

//icons
import mediaScreen from '../../../../../assets/media/images/mediaScreen.png'


class VideoResume extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }


  render() {
    return (
      <div className='video-resume-wrapper'>
        <div className='inner-head-text'> Video Resume</div>
        <div className=''>
          <BetaJSVideoPlayer
            source={''}
            poster={mediaScreen}
            theme={"cube"}
            locale={'en'}
            width="100%"
            height={"auto"}
          />
        </div>
      </div>
    );
  }
}

export default VideoResume;
