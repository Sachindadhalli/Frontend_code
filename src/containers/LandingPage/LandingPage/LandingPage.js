//library dependencies
import React, {Component} from 'react';
//style
import './styles.scss';

//custom component
import AboutUs from '../Components/AboutUs/AboutUs'
import JobByTitle from '../Components/JobByTitle/JobByTitle';
import NavBar from '../Components/NavBar';
import LandingCarousel from '../Components/LandingCarousel/LandingCarousel'
import Clients from '../Components/Clients/Clients';
import Footer from '../Components/Footer';
import LandingPageBlog from '../../../components/LandingPageBlog';
import RecentJobs from '../Components/RecentJobs';
import OurFeatures from '../Components/OurFeatures';
import LandingPageApplyJobs from '../Components/LandingPageApplyJobs';
import LandingPageResumes from '../Components/LandingPageResumes';
import ChatBot from '../Components/Chat-bot';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollHeight: 0
    }
  }

  /**
   * on scrolling the page
   * @param e
   */
  handleScroll = (e) => {
    this.setState({
      scrollHeight: e.target.scrollTop
    })
  };

  /**
   * on scrolling the page at top
   * @param e
   */
  scrollToTop = (e) => {
    this._gotoTop.scrollTop = 0;
  };

  render() {
    return (
      <div className="landing-page-main-container" onScroll={this.handleScroll}>
        <NavBar setIsJobSeekerSelectedTab={() => this.props.setIsJobSeekerSelectedTab()}
                scrollToTop={this.scrollToTop}
                setScrollHeight={this.state.scrollHeight} history={this.props.history}> </NavBar>
        <div className="set-landing-page-scroller" ref={ref => this._gotoTop = ref}>
          <LandingCarousel history={this.props.history}> </LandingCarousel>
          <AboutUs/>
          <JobByTitle/>
          <RecentJobs/>
          <OurFeatures/>
          <LandingPageApplyJobs/>
          <LandingPageResumes/>
          <Clients> </Clients>
          <LandingPageBlog/>
          <Footer/>
        </div>
        <ChatBot history={this.props.history}> </ChatBot>
      </div>
    );
  }
}

export default LandingPage;
