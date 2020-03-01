//library dependencies
import React, {Component} from 'react';
//style
import './styles.scss';
//icon
import facebookLogo from '../../../../../assets/media/icons/facebook.png';
import twitterLogo from '../../../../../assets/media/icons/twitter.png';
import linkedinLogo from '../../../../../assets/media/icons/linkedin.png';
import googlePlay from '../../../../../assets/media/icons/google-play.svg';
import iosStore from '../../../../../assets/media/icons/ios-store.svg';
//custom component
import CustomIcon from '../../../../components/CustomIcon';

class Footer extends Component {
  render() {
    return (
      <div className="footer-main-container">
        <div className="footer-clip-path-division"> </div>
        <div className="footer-wrapper-division">
          <div className="footer-about-us-contact-div">
            <div className="footer-about-us-title">About Us</div>
            <div className="footer-text-right-border"> </div>
            <div className="footer-contact-title">Contact</div>
          </div>
          <div className="footer-any-question-privacy-policy-wrapper">
            <div className="footer-any-question-icons-email-wrapper">
              <span className="footer-any-quetion-title">Any Questions?<span
                className="footer-any-quetion-email">info@shenzyn.com</span></span>
              <div className="footer-any-quetion-icons">
                <CustomIcon iconStyle="footer-linkedin-icon" icon={facebookLogo}/>
                <CustomIcon iconStyle="footer-linkedin-icon" icon={twitterLogo}/>
                <CustomIcon iconStyle="footer-linkedin-icon" icon={linkedinLogo}/>
              </div>
              <div className="footer-text-right-border"> </div>
            </div>
            <span className="privacy-policy-title">Privacy Policy</span>
          </div>
          <div className="footer-information-jobseeker-employer-apps">
            <div className="footer-information-div">
              <div className="unordered-list-information-title">Information</div>
              <ul className="footer-list-information-wrapper">
                <li className="list-option"><a className="list-option-link">About Us</a></li>
                <li className="list-option"><a className="list-option-link">Terms & Conditions</a></li>
                <li className="list-option"><a className="list-option-link">Privacy Policy</a></li>
                <li className="list-option"><a className="list-option-link">Careers with Us</a></li>
                <li className="list-option"><a className="list-option-link">Video Resume</a></li>
                <li className="list-option"><a className="list-option-link">Video Job Description</a></li>
                <li className="list-option"><a className="list-option-link">Grieviences</a></li>
                <li className="list-option"><a className="list-option-link">Fraud Alert</a></li>
              </ul>
            </div>
            <div className="footer-text-right-border"> </div>
            <div className="footer-information-div">
              <div className="footer-unordered-list-1">
                <div className="unordered-list-jobseeker-title">Jobseekers</div>
                <ul className="footer-list-information-wrapper">
                  <li className="list-option"><a className="list-option-link">Upload Resume</a></li>
                  <li className="list-option"><a className="list-option-link">Search Jobs</a></li>
                  <li className="list-option"><a className="list-option-link">Create Job Alert</a></li>
                </ul>
              </div>
              <div className="footer-unordered-list-2">
                <div className="unordered-list-employer-title">Employer</div>
                <ul className="footer-list-information-wrapper">
                  <li className="list-option"><a className="list-option-link">Post Jobs</a></li>
                  <li className="list-option"><a className="list-option-link">Toll Free # 0000-010-0001</a></li>
                </ul>
              </div>
            </div>
            <div className="footer-text-right-border"> </div>
            <div className="footer-mobile-app-icon">
              <div className="unordered-list-app-title">Shenzyn on Mobile</div>
              <div className="footer-google-play-icon">
                <CustomIcon icon={googlePlay}/>
              </div>
              <div className="footer-ios-store-icon">
                <CustomIcon icon={iosStore}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
