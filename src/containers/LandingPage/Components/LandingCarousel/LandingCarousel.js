//library dependencies
import React, {Component} from 'react';
//style
import './styles.scss';
import './slider-animations.scss'
//icons
import carouselUrl from '../../../../../assets/media/carousels/landing-page1.png'
import pinkRightArrow from '../../../../../assets/media/icons/pink-right-arrow.svg';
import search from '../../../../../assets/media/icons/search.png'
import search1 from '../.././../../../assets/media/icons/search-pink.png'
//custom component
import LandingButtons from '../../../../components/LandingButtons/LandingButtons';
import CustomIcon from '../../../JobSeekerSignup/CustomIcon';

class LandingCarousel extends Component {
  timerVar;

  constructor(props) {
    super(props);
    this.state = {
      ImageUrls: [
        {url: carouselUrl},
        {url: carouselUrl},
        {url: carouselUrl},
        {url: carouselUrl},
        {url: carouselUrl}
      ],
      content: [
        {
          title: "We  walk the path with you.",
          description:
            "We believe that recruitment should be kept simple Our job is to connect our clients with the best people available on the market.",
          button: "Read More",
          image: carouselUrl,
          user: "Luan Gjokaj",
          userProfile: "https://i.imgur.com/JSW6mEk.png",
          search: false,
          id: 1
        },
      ],
      isDataFetching: false,
      search: false,
      searchText: ''
    }
  }

  /**
   * on click of search job,trigger seacrh input
   * @param element
   */
  searchTrigger = (element) => {
    this.setState({search: true});
    this.timerVar = setTimeout(() => {
      this.setState({
        search: false
      })
    }, 10000);
  };
  /**
   * on click of button ,redirect to under process page
   */
  gotoUnderProgress = () => {
    this.props.history.push("under-progress");
  };
  /**
   * on chnage of key,trigger a function
   * @param e
   */
  searchJobTrigger = (e) => {
    clearTimeout(this.timerVar);
    this.setState({search: true, searchText: e.target.value})
  };
  /**
   * on leaving the pointer
   */
  pointerOut = () => {
    setTimeout(() => {
      this.setState({search: false})
    }, 10000)
  };
  /**
   * on click of search job button
   * @param e
   */
  searchJob = (e) => {
    if (this.state.searchText) {
      this.props.history.push("employee-signin");
    }
  };

  render() {
    const {content} = this.state;
    return (
      <div style={{position: 'relative'}}>
        {content.map((item, index) => (
          <div
            key={index}
            className="slider-content"
            style={{background: `url('${item.image}') no-repeat`, backgroundPosition: 'top'}}
          >
            <div className="inner" style={{position: "absolute"}}>
              <div className="title" style={{textAlign: 'start'}}>
                <p className={[0, 1].includes(index) ? "slider-text" : 'slider-text-pink'}>We</p>
                <p className={[0, 1].includes(index) ? "slider-text" : 'slider-text-pink'}>walk the</p>
                <p className={[0, 1].includes(index) ? "slider-text" : 'slider-text-pink'}>path with you.</p>
              </div>
              <div className="description" style={{textAlign: 'start', paddingTop: '22px'}}>
                <p className={[0, 1].includes(index) ? "slider-description" : 'slider-description-pink'}>We believe that
                  recruitment should be kept simple.</p>
                <p className={[0, 1].includes(index) ? "slider-description" : 'slider-description-pink'}>Our job is to
                  connect our clients with the best people</p>
                <p className={[0, 1].includes(index) ? "slider-description" : 'slider-description-pink'}>available on
                  the market.</p>
              </div>
              {this.state.search ?
                <div className="search-wrapper">
                  <div style={{display: 'flex', flexDirection: 'row'}}>
                    <CustomIcon icon={search1}/>
                    <input onKeyUp={this.searchJobTrigger} onPointerLeave={this.pointerOut} type="text"
                           style={{boxShadow: 'none', padding: 'unset', border: 'none', marginLeft: '15px'}}
                           placeholder="Search Jobs"/>
                  </div>
                  <LandingButtons buttonType="solid-btn"
                                  buttonText="Search"
                                  className="search-button"
                                  onClick={this.searchJob}>
                  </LandingButtons>
                </div>
                :
                <div style={{display: 'flex', flexDirection: 'row', marginTop: '45px'}}>
                  <div style={{width: '174px', marginRight: '20px'}}>
                    <LandingButtons buttonType="default-arrow-btn"
                                    buttonText="View Jobs"
                                    className="job-by-title-buttons"
                                    icon={pinkRightArrow}
                                    onClick={this.gotoUnderProgress}>
                      style={{width: '174px'}}
                    </LandingButtons>
                  </div>
                  <div style={{width: '174px', marginRight: '20px'}}>
                    <LandingButtons buttonType="default-arrow-btn"
                                    buttonText="Upload Resume"
                                    className="job-by-title-buttons"
                                    icon={pinkRightArrow}
                                    onClick={this.gotoUnderProgress}>
                      style={{width: '174px'}}
                    </LandingButtons>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <CustomIcon icon={search}/>
                    <div onClick={() => this.searchTrigger()} className="search-jobs">Search Jobs</div>
                  </div>
                </div>
              }
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default LandingCarousel;
