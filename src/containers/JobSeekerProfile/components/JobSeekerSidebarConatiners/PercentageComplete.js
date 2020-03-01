//library dependency
import React, {Component} from 'react';

//custom components
import CustomIcon from '../../../../components/CustomIcon/CustomIcon';

//styles
import './styles.scss';

//utilities

//icons
import tick from '../../../../../assets/media/icons/tick.svg';
import untick from '../../../../../assets/media/icons/tick-unselected.svg';


class PercentageComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }


  render() {
    return (
      <div className='percentage-complete-wrapper'>
        <div className='inner-head-text'> Percentage Complete</div>
        <div className='percentage-slider-wrapper'>
          <div className='percentage-count'>
            60% Completed
          </div>
          <div className='slider-styles'>

          </div>
        </div>
        <div className='skill-set-box'>
          <div className='step-selected-text'> Steps Completed</div>
          <div className='tick-name-wrapper'>
            <div className='tick-icon'><CustomIcon icon={untick} iconStyle="profile-img"/></div>
            <div className='headline-text'> Resume Headline</div>
          </div>
          <div className='tick-name-wrapper'>
            <div className='tick-icon'><CustomIcon icon={tick} iconStyle="profile-img"/></div>
            <div className='headline-text'> Key Skills</div>
          </div>
          <div className='tick-name-wrapper'>
            <div className='tick-icon'><CustomIcon icon={untick} iconStyle="profile-img"/></div>
            <div className='headline-text'> Employment</div>
          </div>
          <div className='tick-name-wrapper'>
            <div className='tick-icon'><CustomIcon icon={tick} iconStyle="profile-img"/></div>
            <div className='headline-text'> Education</div>
          </div>
          <div className='tick-name-wrapper'>
            <div className='tick-icon'><CustomIcon icon={tick} iconStyle="profile-img"/></div>
            <div className='headline-text'> IT Skills</div>
          </div>
          <div className='tick-name-wrapper'>
            <div className='tick-icon'><CustomIcon icon={untick} iconStyle="profile-img"/></div>
            <div className='headline-text'> Profile Summary</div>
          </div>
          <div className='tick-name-wrapper'>
            <div className='tick-icon'><CustomIcon icon={untick} iconStyle="profile-img"/></div>
            <div className='headline-text'> Desired Career Profile</div>
          </div>
          <div className='tick-name-wrapper'>
            <div className='tick-icon'><CustomIcon icon={untick} iconStyle="profile-img"/></div>
            <div className='headline-text'> Attach Resume</div>
          </div>
          <div className='tick-name-wrapper'>
            <div className='tick-icon'><CustomIcon icon={untick} iconStyle="profile-img"/></div>
            <div className='headline-text'> Aadhar/LinkedIn Verification</div>
          </div>
        </div>
      </div>
    );
  }
}

export default PercentageComplete;
