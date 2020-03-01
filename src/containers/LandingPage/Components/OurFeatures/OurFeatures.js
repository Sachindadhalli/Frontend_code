//library dependencies
import React, {Component} from 'react';
//icon
import feature from '../../../../../assets/media/icons/feature.svg';
//style
import './styles.scss';
//custom component
import CustomIcon from '../../../JobSeekerSignup/CustomIcon';
import LandingPageCardWithButton from '../../../../components/LandingPageCardWithButton/LandingPageCardWithButton';
import LandingButtons from '../../../../components/LandingButtons/LandingButtons';

class OurFeatures extends Component {
  render() {
    return (
      <div className="our-features-main-container">
        <div className="our-features-title-text">Our Features</div>
        <div className="our-features-icon-content-wrapper">
          <div className="our-features-icon">
            <CustomIcon icon={feature}/>
          </div>
          <div className="our-features-content-wrapper">
            <div className="our-features-content-heading">Grab the best.</div>
            <div className="our-features-content-button-wrapper">
              <div className="our-features-button-1-div">
                <LandingButtons
                  buttonType={"solid-btn"}
                  buttonText={"Fresh Job"}
                  className="our-features-button-1"
                />
              </div>
              <div className="our-features-button-2-div">
                <LandingButtons
                  buttonType={"solid-btn"}
                  buttonText={"Your matches"}
                  className="our-features-button-2"
                />
              </div>
              <div className="our-features-button-3-div">
                <LandingButtons
                  buttonType={"solid-btn"}
                  buttonText={"Applied"}
                  className="our-features-button-3"
                />
              </div>
            </div>
            <LandingPageCardWithButton/>
          </div>
        </div>
      </div>
    );
  }
}

export default OurFeatures;
