
import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import close from '../../../assets/media/images/close.png';
import '../../styles/global-styles.scss';
import './style.scss';
import CustomIcon from '../../components/CustomIcon';

export default class RegistrationPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      modalOpen: true,
    };
  }

  // @function for opening the modal
  handleOpen = () => {
    this.setState({ modalOpen: true });
  };

  // @function for closing the modal
  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  // @function if the user clicks on professional button
  clickProfessional = () => {
    this.props.setIsJobSeekerSelectedTab();
    this.props.history.push({
      pathname: '/jobseeker-signup',
      // pathname: '/employee-home-page',
      state: { experienceType: 'professional' },
    });
  };

  // clicks on freser button
  clickFresher = () => {
    this.props.setIsJobSeekerSelectedTab();
    this.props.history.push({
      pathname: '/jobseeker-signup',
      state: { experienceType: 'fresher' },
    });
  };

  render() {
    return (
      <div className="contents">
        <div className="container">
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
                            <CustomIcon icon={close} onclick={this.handleClose}/>
                        </div>
                        <div className="title-wrapper shenzyn-title-wrapper">
                            <div className="title font-size-24 font-size-500 mb-12" style={{fontFamily:'Roboto',fontWeight:'500',fontSize:'24px',marginTop:'12px'}}>
                                {"Sign up with Shenzyn"}
                            </div>
                        </div>
                    </div>
                    <div className="footer mt-32 mx-40">
                        <div className="action-btn-wrapper">
                            <div className="item  mb-28">
                              <button className="filled-primary-button shenzyn-btn px-24 px-sm-48 mb-12" onClick={this.clickFresher} >
                                I'm a Fresher
                              </button>
                              <div className="hint">
                                  If you just graduated or haven’t worked after graduation, sign up as a fresher
                              </div>
                            </div>
                            <div className="item  mb-28">
                              <button className="filled-primary-button shenzyn-btn px-16 px-sm-32 mb-12" onClick={this.clickProfessional} >
                                I'm an Experienced
                              </button>
                              <div className="hint">
                                If you worked at least for a month, <br/> sign up as an Experienced
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
      </div>
    );
  }
}
