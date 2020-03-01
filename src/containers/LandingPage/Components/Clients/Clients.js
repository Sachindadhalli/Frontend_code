//libray dependencies
import React, {Component} from 'react';
import {CarouselProvider, Slider, Slide, ButtonBack, ButtonNext} from 'pure-react-carousel';

//style
import './styles.scss';
import 'pure-react-carousel/dist/react-carousel.es.css';
//icons
import alfa from '../../../../../assets/media/images/alfa.png'
import dw from '../../../../../assets/media/images/dw.png';
import mcd from '../../../../../assets/media/carousels/mcd.png';
import telestram from '../../../../../assets/media/images/telestream.png'
import clients from '../../../../../assets/media/icons/clients.svg'
import google from '../../../../../assets/media/carousels/google.png';
import airbnb from '../../../../../assets/media/carousels/airbnb.png';
import angular from '../../../../../assets/media/carousels/angular.png';
//custom component
import CustomIcon from '../../../JobSeekerSignup/CustomIcon';
import LandingButtons from '../../../../components/LandingButtons/LandingButtons';

class Clients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [
        {
          title: "We  walk the path with you.",
          description:
            "We believe that recruitment should be kept simple Our job is to connect our clients with the best people available on the market.",
          button: "Read More",
          image: alfa,
          user: "Luan Gjokaj",
          userProfile: "https://i.imgur.com/JSW6mEk.png",
          search: false,
          id: 1
        },
        {
          title: "Tortor Dapibus Commodo Aenean Quam",
          description:
            "Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.",
          button: "Discover",
          image: dw,
          user: "Erich Behrens",
          userProfile: "https://i.imgur.com/0Clfnu7.png",
          search: true,
          id: 2
        },
        {
          title: "Phasellus volutpat metus",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.",
          button: "Buy now",
          image: mcd,
          user: "Bruno Vizovskyy",
          userProfile: "https://i.imgur.com/4KeKvtH.png",
          search: true,
          id: 3
        },
        {
          title: "Phasellus volutpat metus",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.",
          button: "Buy now",
          user: "Bruno Vizovskyy",
          image: telestram,
          search: true,
          id: 4
        },
        {
          title: "We  walk the path with you.",
          description:
            "We believe that recruitment should be kept simple Our job is to connect our clients with the best people available on the market.",
          button: "Read More",
          image: google,
          user: "Luan Gjokaj",
          userProfile: "https://i.imgur.com/JSW6mEk.png",
          search: false,
          id: 1
        },
        {
          title: "Tortor Dapibus Commodo Aenean Quam",
          description:
            "Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.",
          button: "Discover",
          image: airbnb,
          user: "Erich Behrens",
          userProfile: "https://i.imgur.com/0Clfnu7.png",
          search: true,
          id: 2
        },
        {
          title: "Phasellus volutpat metus",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.",
          button: "Buy now",
          image: angular,
          user: "Bruno Vizovskyy",
          userProfile: "https://i.imgur.com/4KeKvtH.png",
          search: true,
          id: 3
        },
      ],
      click_button: ''
    }
  }

  backButtonClick = () => {
    this.backButton.instance.handleOnClick();
    this.setState({click_button: 'back'})
  }

  nextButtonClick = () => {
    this.nextButton.instance.handleOnClick();
    this.setState({click_button: 'next'})
  }

  render() {
    const {content, click_button} = this.state
    return (
      <div style={{background: 'rgba(216, 216, 216, 0.1)', paddingTop: '45px', paddingRight: '72px'}}>
        <div className="out-clients-text">Our Clients</div>
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={50}
          totalSlides={content.length}
          dragStep={1}
          step={1}
          visibleSlides={5}
        >
          <Slider>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              {content.map((item, i) => <Slide index={i}>
                <div style={{
                  height: '100%',
                  background: `url('${item.image}')`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'contain',
                  backgroundPosition: '50% 50%',
                  marginLeft: '50px',
                  marginRight: '50px'
                }}/>
              </Slide>)}
            </div>
          </Slider>
          <div className="landing-page-toggle-clients">
            <div style={{display: 'flex', alignItems: 'center', width: '57%', justifyContent: 'flex-end'}}>
              <ButtonBack ref={(backButton) => {
                this.backButton = backButton;
              }} style={{visibility: 'hidden', padding: 'unset'}}>Back</ButtonBack>
              <ButtonNext ref={(nextButton) => {
                this.nextButton = nextButton;
              }} style={{visibility: 'hidden', padding: 'unset'}}>Next</ButtonNext>
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
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '50%'}}>
              <CustomIcon icon={clients}/>
            </div>
          </div>
        </CarouselProvider>
      </div>
    );
  }
}

export default Clients;
