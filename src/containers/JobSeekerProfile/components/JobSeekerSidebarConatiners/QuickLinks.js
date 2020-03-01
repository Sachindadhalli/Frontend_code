//library dependency
import React, {Component} from 'react';

//custom components

//styles
import './styles.scss';

//utilities

//icons


class QuickLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }


  render() {
    return (
      <div className='quick-links-wrapper'>
        <div className='inner-head-text'> Quick Links</div>
        <div className='quick-links-container'>
          <div className='inner-sub-head-text'> Resume Headline</div>
          <div className='inner-sub-head-text'> Key Skills</div>
          <div className='inner-sub-head-text'> Employment</div>
          <div className='inner-sub-head-text'> Education</div>
          <div className='inner-sub-head-text'> IT Skills</div>
          <div className='inner-sub-head-text'> Projects</div>
          <div className='inner-sub-head-text'> Profile Summary</div>
          <div className='inner-sub-head-text'> Accomplishments</div>
          <div className='inner-sub-head-text'> Desired Career Profile</div>
          <div className='inner-sub-head-text'> Personal Details</div>
          <div className='inner-sub-head-text'> Attach Resume</div>
          <div className='inner-sub-head-text'> LinkedIn</div>
          <div className='inner-sub-head-text'> Aadhar</div>
        </div>
      </div>
    );
  }
}

export default QuickLinks;
