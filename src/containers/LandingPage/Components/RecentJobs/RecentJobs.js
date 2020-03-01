//library dependencies
import React, {Component} from 'react';
import {CarouselProvider, Slider, Slide, ButtonBack, ButtonNext} from 'pure-react-carousel';

//icon
import sentMail from '../../../../../assets/media/icons/sent-mail.svg';

//style
import './styles.scss';
import 'pure-react-carousel/dist/react-carousel.es.css';

//custom component
import LandingPageCard from '../../../../components/LandingPagCard/LandingPageCard';
import LandingButtons from '../../../../components/LandingButtons/LandingButtons';
import LandingPageInputField from '../../../../components/LandingPageInputField';

class RecentJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [
        {
          icon: 'C',
          title: "Citica",
          description:
            " Vestibulum rutrum quam vitae fringilla tincidunt. Suspendisse nec tortor urna. Ut laoreet sodales nisi, quis iaculis nulla iaculis vitae. Donec sagittis faucibus lacus eget blandit. Mauris vitae ultricies metus, at condimentum nulla. Donec quis ornare lacus. Etiam gravida mollis tortor quis porttitor.",
        },
        {
          icon: 'C',
          title: "Citica",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.",
        },
        {
          icon: 'C',
          title: "Citica",
          description:
            "We believe that recruitment should be kept simple Our job is to connect our clients with the best people available on the market.",
        },
        {
          icon: 'C',
          title: "Citica",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.",
        },
        {
          icon: 'C',
          title: "Citica",
          description:
            "We believe that recruitment should be kept simple Our job is to connect our clients with the best people available on the market.",
        },
        {
          icon: 'C',
          title: "Citica",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.",
        },
        {
          icon: 'C',
          title: "Citica",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.",
        },
        {
          icon: 'C',
          title: "Citica",
          description:
            "We believe that recruitment should be kept simple Our job is to connect our clients with the best people available on the market.",
        },
        {
          icon: 'C',
          title: "Citica",
          description:
            " Vestibulum rutrum quam vitae fringilla tincidunt. Suspendisse nec tortor urna. Ut laoreet sodales nisi, quis iaculis nulla iaculis vitae. Donec sagittis faucibus lacus eget blandit. Mauris vitae ultricies metus, at condimentum nulla. Donec quis ornare lacus. Etiam gravida mollis tortor quis porttitor.",
        },
        {
          icon: 'C',
          title: "Citica",
          description:
            " Vestibulum rutrum quam vitae fringilla tincidunt. Suspendisse nec tortor urna. Ut laoreet sodales nisi, quis iaculis nulla iaculis vitae. Donec sagittis faucibus lacus eget blandit. Mauris vitae ultricies metus, at condimentum nulla. Donec quis ornare lacus. Etiam gravida mollis tortor quis porttitor.",
        },
        {
          icon: 'C',
          title: "Citica",
          description:
            " Vestibulum rutrum quam vitae fringilla tincidunt. Suspendisse nec tortor urna. Ut laoreet sodales nisi, quis iaculis nulla iaculis vitae. Donec sagittis faucibus lacus eget blandit. Mauris vitae ultricies metus, at condimentum nulla. Donec quis ornare lacus. Etiam gravida mollis tortor quis porttitor.",
        },
        {
          icon: 'C',
          title: "Citica",
          description:
            " Vestibulum rutrum quam vitae fringilla tincidunt. Suspendisse nec tortor urna. Ut laoreet sodales nisi, quis iaculis nulla iaculis vitae. Donec sagittis faucibus lacus eget blandit. Mauris vitae ultricies metus, at condimentum nulla. Donec quis ornare lacus. Etiam gravida mollis tortor quis porttitor.",
        },
      ],
      click_button: ''
    };
  }

  /**
   * on click of back button
   */
  backButtonClick = () => {
    this.backButton.instance.handleOnClick();
    this.setState({click_button: 'back'})
  };
  /**
   * on click of next button
   */
  nextButtonClick = () => {
    this.nextButton.instance.handleOnClick();
    this.setState({click_button: 'next'})
  };

  render() {
    const {content, click_button} = this.state;
    return (
      <div className="recent-jobs-main-container">
        <div className="recent-jobs-title-text">Recent Jobs</div>
        <div className="recent-job-content-wrapper">
          <div className="recent-jobs-let-me-know-wrapper">
            <div className="recent-jobs-let-me-know-title-text">Let Me Know</div>
            <p className="recent-jobs-let-me-know-paragraph">
              To get the latest updates regarding your job search. Subscribe to our newsletter to
              grab the opportunities first.
            </p>
            <LandingPageInputField
              placeholder={'Your email address'}
              type={'email'}
              buttonText={'Notify'}
              iconName={sentMail}
              iconStyle="landing-page-custom-icon"
              buttonTextClassName="landing-page-resume-search-field"
            />
          </div>
          <div className="recent-job-landing-page-card-button-wrapper">
            <CarouselProvider naturalSlideWidth={680} naturalSlideHeight={980} totalSlides={content.length}
                              visibleSlides={3} step={1}>
              <Slider style={{height: '75%'}}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                  {content.map((item, i) => (
                    <Slide className="landing-page-recent-job-cards" index={i}>
                      <div className="recent-job-landing-page-card1">
                        <LandingPageCard data={item}/>
                      </div>
                    </Slide>
                  ))}
                </div>
              </Slider>
              <div className="landing-page-recent-job-buttons">
                <ButtonBack ref={(backButton) => {
                  this.backButton = backButton;
                }} style={{visibility: 'hidden', padding: 'unset'}}>Back</ButtonBack>
                <ButtonNext ref={(nextButton) => {
                  this.nextButton = nextButton;
                }} style={{visibility: 'hidden', padding: 'unset'}}>Next</ButtonNext>
              </div>
            </CarouselProvider>
            <div className="landing-page-recent-job-buttons">
              <LandingButtons
                buttonType={"floating-default-btn"}
                onClick={this.backButtonClick}
                value={click_button === 'back'}
              />
              <LandingButtons
                className="landing-page-recent-job-button"
                buttonType={"floating-solid-btn"}
                onClick={this.nextButtonClick}
                value={click_button === 'next'}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RecentJobs;
