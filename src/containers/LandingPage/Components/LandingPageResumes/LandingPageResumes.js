//library dependencies
import React, {Component} from 'react';
//icons
import landingPageResumes from '../../../../../assets/media/icons/landing-page-resumes.svg';
//styles
import './styles.scss';
//custom component
import CustomIcon from '../../../JobSeekerSignup/CustomIcon';
import LandingButtons from '../../../../components/LandingButtons/LandingButtons';
import LandingPageInputField from '../../../../components/LandingPageInputField';

class LandingPageResumes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      click_button: ''
    }
  }

  /**
   * on click of back button
   */
  backButtonClick = () => {
    this.setState({click_button: 'back'})
  };

  /**
   * on click of next button
   */
  nextButtonClick = () => {
    this.setState({click_button: 'next'})
  };

  render() {
    const {click_button} = this.state;
    return (
      <div className="landing-page-resumes-main-container">
        <CustomIcon icon={landingPageResumes}/>
        <div className="landing-page-resumes-content-wrapper">
          <div className="landing-page-resumes-content">
            <div className="landing-page-resumes-title-text">Profile Strength: <span
              className="landing-page-resumes-title-text-bold">Intermediate</span></div>
            <div className="landing-page-resumes-sub-title-text">Add skills to showcase what you are great at</div>
            <div className="landing-page-resumes-paragraph-text">
              Members with 5 or more skills are 27x more likely to be discovered in search by recruiters
            </div>
          </div>
          <div className="landing-page-resumes-buttons-textfield">
            <div className="landing-page-resumes-buttons">
              <LandingButtons
                className="landing-page-resumes-button"
                buttonType={"floating-solid-btn"}
                onClick={this.backButtonClick}
                value={click_button === 'back'}
              />
              <LandingButtons
                buttonType={"floating-default-btn"}
                onClick={this.nextButtonClick}
                value={click_button === 'next'}
              />
            </div>
            <LandingPageInputField
              buttonTextClassName="landing-page-resume-search-field"
              placeholder={"Search here"}
              type={"text"}
              buttonText={"Add Skills +"}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPageResumes;
