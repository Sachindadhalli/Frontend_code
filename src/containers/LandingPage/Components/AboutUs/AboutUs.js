//library dependencies
import React, {Component} from 'react';
//style
import './styles.scss';

class AboutUs extends Component {
  render() {
    return (
      <div className="about-us-main-cotainer">
        <div className="about-us-heading-text">
          About Us
        </div>
        <div className="about-us-content-text-wrapper">
          <p className="about-us-content-text2-item">
            Reinvent your thousand-mile journey with us!
          </p>
          <p className="about-us-content-text1-item">
            Bringing to you for the first time ever, a women centric full-service marketplace focusing on self-sureness
            and re-cultivation of the lost career path for the female aspirants.
          </p>
          <p className="about-us-content-text2-item">
            What Shenzyn does?
          </p>
          <p className="about-us-content-text3-item">
            Shenzyn stands by its brand’s literal meaning ‘She-Engine’. Having a technology focussed application with
            Artificial Intelligence, Machine Learning and Analytics at its heart, Shenzyn is a platform that stands
            above the contemporary portals and facilitates corporate events, campus conferences, women leadership
            hiring, certifications. Upskill your talent with resume building capabilities and curated job roles to fit
            your needs aptly and attain a perfect work-life balance.
          </p>
        </div>
        <hr className="about-us-bottom-line"/>
      </div>
    );
  }
}

export default AboutUs;
