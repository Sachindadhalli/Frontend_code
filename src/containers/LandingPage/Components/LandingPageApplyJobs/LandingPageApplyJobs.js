//library dependencies
import React, {Component} from 'react';
//icons
import applyJob from '../../../../../assets/media/icons/apply-job.svg';
//styles
import './styles.scss';
//custom component
import CustomIcon from '../../../JobSeekerSignup/CustomIcon';
import LandingPageCardWithoutIcon from '../../../../components/LandingPageCardWithoutIcon';

class LandingPageApplyJobs extends Component {
  render() {
    return (
      <div className="landing-page-apply-jobs-main-container">
        <LandingPageCardWithoutIcon/>
        <CustomIcon icon={applyJob}/>
      </div>
    );
  }
}

export default LandingPageApplyJobs;
