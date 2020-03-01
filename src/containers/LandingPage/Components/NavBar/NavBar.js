//library dependencies
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles, AppBar, Toolbar, Modal, Popover} from '@material-ui/core';
//style
import './styles.scss';
//icons
import globe from '../../../../../assets/media/icons/globe.svg'
import dropdown from '../../../../../assets/media/icons/dropdown-2.svg';
import close from '../../../../../assets/media/images/close.png';
import shenzynlogo from '../../../../../assets/media/icons/shenzyn-logo.svg';
//custom component
import CustomIcon from '../../../JobSeekerSignup/CustomIcon';
//customised material ui styles
const styles = () => ({
  grow: {flexGrow: 1, color: 'red'},
  popover: {pointerEvents: 'none',},
});

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSignup: false,
      selectLan: false,
      openLogin: false,
      modalOpen: false,
      experienceType: '',
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  signUpTrigger = (e) => {
    this.setState({openSignup: true, anchorEl: e.currentTarget})
  };
  /**
   * on closing the popover
   * @param e
   */
  handlePopoverClose = (e) => {
    this.setState({openSignup: false})
  };

  loginTrigger = (e) => {
    this.setState({
      openLogin: true, anchorEl: e.currentTarget
    })
  };
  /**
   * @function,used to handle mouse leave event
   */
  mouseLeave = () => {
    this.setState({openLogin: false});
  };
  /**
   * on selecting the language from language popover
   * @param e
   */
  onLanguageSelector = (e) => {
    this.setState({selectLan: true, anchorEl: e.currentTarget})
  };

  /**
   * on close of language popOver
   * @param e
   */
  onLanguageRemoval = (e) => {
    this.setState({selectLan: false, anchorEl: e.currentTarget})
  };

  scrollEvent = (e) => {
  };
  /**
   * @function,used to handling Scroll down event
   * @param event
   */
  handleScroll = (event) => {
  };
  /**
   * on click of buttons under progress,redirecting to under process page
   */
  gotoUnderProgress = () => {
    this.props.history.push("under-progress");
  };
  /**
   * on click of Job Seeker button in SIgnIn
   */
  jobSeekerLogin = () => {
    this.props.history.push("employee-signin");
  };
  /**
   * on click of Job Seeker button in SIgnIn
   */
  employerLogin = () => {
    this.props.history.push("employer-signin");
  };
  /**
   * on click of Job Seeker button in SIgnUp
   */
  jobSeekerSignup = () => {
    this.setState({modalOpen: true})
  };

  /**
   * on click of Employer button in SignUp
   */
  employerSignup = () => {
    this.props.history.push("employer-signup")
  };

  /**
   * on click of Professional button
   */
  clickProfessional = () => {
    this.props.setIsJobSeekerSelectedTab();
    this.props.history.push({
      pathname: '/jobseeker-signup',
      state: {experienceType: 'professional'},
    });
  };

  /**
   * on click of close button,closing modal
   */
  handleClose = () => {
    this.setState({modalOpen: false});
  };

  /**
   * on click of fresher button
   */
  clickFresher = () => {
    this.props.setIsJobSeekerSelectedTab();
    this.props.history.push({
      pathname: '/jobseeker-signup',
      state: {experienceType: 'fresher'},
    });
  };

  render() {
    const {classes, match, history, setScrollHeight} = this.props;
    return (
      <div className={classes.grow}>
        <AppBar position="static" style={{
          backgroundColor: 'white',
          position: "absolute",
          top: '0',
          zIndex: '1',
          display: 'flex',
          flexDirection: 'row',
          height: '96px',
          boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 8px'
        }}>
          <div className="landing-page-header-logo-wrapper">
            <img src={shenzynlogo} className="landing-page-header-logo"
                 onClick={this.props.scrollToTop}/>
            {/*<div className="shenzyn-logo">*/}
            {/*<span style={{marginLeft:'27px',width:'100%',textAlign:'start'}}>Shenzyn</span>*/}
            {/*</div>*/}
          </div>
          <Toolbar className="toolbar">
            <div className="toolbar-content">
              <ul className="nav-menu">
                <li className="list-item"><a className={'text2'}
                                             onClick={this.gotoUnderProgress}>Jobs</a></li>
                <li className="list-item"><a className={'text2'}
                                             onClick={this.gotoUnderProgress}>Resumes</a></li>
                <li className="list-item"><a className={'text2'}
                                             onClick={this.gotoUnderProgress}>Companies</a></li>
                <li className="list-item"><a className={'text2'}
                                             onClick={this.gotoUnderProgress}>Blogs</a></li>
              </ul>
            </div>
            <div className="toolbar-content2">
              <ul className="nav-menu">

                <li className="list-item1 login">
                  {/*<a className={setScrollHeight > 50 ? 'login-text2' : "login-text"} onMouseEnter={this.loginTrigger}>Login</a>*/}
                  <div className="dropdown">
                    <button className="dropbtn landing-login-button">Login</button>
                    <div className="dropdown-content">
                      <div style={{padding: '10px 0px 12px 0px'}}>
                        <div className="sign-up-text" onClick={this.jobSeekerLogin}>Job Seeker</div>
                        <div className="sign-up-text" onClick={this.employerLogin}>Employer</div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className='list-item1 login'>
                  <div className="dropdown">
                    <button className="dropbtn landing-signup-button">Sign Up</button>
                    <div className="dropdown-content">
                      <div style={{padding: '10px 0px 12px 0px'}}>
                        <div className="sign-up-text" onClick={this.jobSeekerSignup}>Job Seeker</div>
                        <div className="sign-up-text" onClick={this.employerSignup}>Employer</div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className='list-item1 login '>
                  <div className="dropdown">
                    <button className="dropbtn1" style={{
                      display: 'flex',
                      flexDirection: 'row',
                      background: 'transparent',
                      alignItems: 'center'
                    }}>
                      <CustomIcon title="globe" icon={globe}
                                  style={{cursor: 'pointer', paddingRight: '5px', paddingLeft: '5px'}}/>
                      <div className="language">English</div>
                      <CustomIcon icon={dropdown} style={{
                        cursor: 'pointer',
                        paddingRight: '5px',
                        paddingLeft: '5px',
                        display: 'flex'
                      }}/>
                    </button>
                    <div className="dropdown-content">
                      <div style={{padding: '10px 0px 12px 0px'}}>
                        <div className="sign-up-text">English</div>
                        <div className="sign-up-text">हिंदी</div>
                        <div className="sign-up-text">मराठी</div>
                        <div className="sign-up-text">اردو</div>
                        <div className="sign-up-text">ਪੰਜਾਬੀ</div>
                        <div className="sign-up-text">ગુજરાતી</div>
                        <div className="sign-up-text">తెలుగు</div>
                        <div className="sign-up-text">മലയാളം</div>
                        <div className="sign-up-text">ಕನ್ನಡ</div>
                      </div>
                    </div>
                  </div>
                </li>

                {/*<LandingButtons*/}
                {/*buttonType={setScrollHeight > 50 ? 'solid-btn' : 'default-btn' }*/}
                {/*buttonText="Sign Up" */}
                {/*className="sign-up-button"*/}
                {/*onMouseEnter={this.signUpTrigger}*/}
                {/*onMouseLeave={this.mouseLeave}*/}
                {/*onClick={this.signUpTrigger}*/}
                {/*/>*/}
                {/*<div   onMouseEnter={this.onLanguageSelector}  style={{display:'flex',flexDirection:'row',background:'transparent',alignItems:'center',marginLeft:'50px'}}>*/}
                {/*<CustomIcon title="globe" icon={globe} style={{ cursor: 'pointer', paddingRight: '5px' , paddingLeft:'5px' }} ></CustomIcon>*/}
                {/*<div className="language">English</div>*/}
                {/*<CustomIcon icon={dropdown}  style={{ cursor: 'pointer', paddingRight: '5px' , paddingLeft:'5px' , display:'flex' }}></CustomIcon>*/}
                {/*</div>*/}
                <Popover
                  id="mouse-over-popover"
                  open={this.state.openSignup}
                  onClose={this.handlePopoverClose}
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  style={{marginTop: '20px'}}
                >
                  <div style={{padding: '10px 0px 12px 0px'}}>
                    <div className="sign-up-text" onClick={this.jobSeekerSignup}>Job Seeker</div>
                    <div className="sign-up-text" onClick={this.employerSignup}>Employer</div>
                  </div>

                </Popover>
                <Popover
                  id="mouse-over-popover"
                  open={this.state.openLogin}
                  onClose={this.mouseLeave}
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  style={{marginTop: '20px'}}
                >
                  <div style={{padding: '10px 0px 12px 0px'}}>
                    <div className="sign-up-text" onClick={this.jobSeekerLogin}>Job Seeker</div>
                    <div className="sign-up-text" onClick={this.employerLogin}>Employer</div>
                  </div>

                </Popover>
                <Popover
                  id="mouse-over-popover"
                  open={this.state.selectLan}
                  anchorEl={this.state.anchorEl}
                  onClose={this.onLanguageRemoval}
                  style={{marginTop: '10px'}}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <div style={{padding: '10px 0px 12px 0px'}}>
                    <div className="sign-up-text">English</div>
                    <div className="sign-up-text">हिंदी</div>
                    <div className="sign-up-text">मराठी</div>
                    <div className="sign-up-text">اردو</div>
                    <div className="sign-up-text">ਪੰਜਾਬੀ</div>
                    <div className="sign-up-text">ગુજરાતી</div>
                    <div className="sign-up-text">తెలుగు</div>
                    <div className="sign-up-text">മലയാളം</div>
                    <div className="sign-up-text">ಕನ್ನಡ</div>
                  </div>

                </Popover>

              </ul>
            </div>

          </Toolbar>
        </AppBar>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.modalOpen}
          onClose={this.handleClose}
        >
          <div className="signup-dialog-wrapper">
            <div className="shenzyn-dialog-box shenzyn-emp-type-dialog">
              <div className="header">
                <div className="close-icon">
                  <CustomIcon icon={close} onClick={this.handleClose}/>
                </div>
                <div className="title-wrapper shenzyn-title-wrapper">
                  <div className="title font-size-24 font-size-500 mb-12"
                       style={{fontFamily: 'Roboto', fontWeight: '500', fontSize: '24px', marginTop: '12px'}}>
                    {"Sign up with Shenzyn"}
                  </div>
                </div>
              </div>
              <div className="footer mt-32 mx-40">
                <div className="action-btn-wrapper">
                  <div className="item  mb-28">
                    <button className="filled-primary-button shenzyn-btn px-24 px-sm-48 mb-12"
                            onClick={this.clickFresher}>
                      I'm a Fresher
                    </button>
                    <div className="hint">
                      If you just graduated or haven’t worked after graduation, sign up as a fresher
                    </div>
                  </div>
                  <div className="item  mb-28">
                    <button className="filled-primary-button shenzyn-btn px-16 px-sm-32 mb-12"
                            onClick={this.clickProfessional}>
                      I'm an Experienced
                    </button>
                    <div className="hint">
                      If you worked at least for a month, <br/> sign up as an experienced
                    </div>
                  </div>
                </div>
                <div className="action-btn-wrapper">

                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
