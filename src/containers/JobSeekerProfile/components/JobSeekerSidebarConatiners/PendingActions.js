//library dependency
import React, {Component} from 'react';

//custom components

//styles
import './styles.scss';

//utilities

//icons


class PendingActions extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }


  render() {
    return (
      <div className='pending-actions-wrapper'>
        <div className='inner-head-text'> Pending Actions</div>
        <div className='pending-actions-container'>
          <div className='inner-sub-head-text'> Resume Headline</div>
          <div className='inner-sub-head-text'> Education</div>
          <div className='inner-sub-head-text'> IT Skills</div>
          <div className='inner-sub-head-text'> Projects</div>
          <div className='inner-sub-head-text'> Profile Summary</div>
        </div>
      </div>
    );
  }
}

export default PendingActions;
