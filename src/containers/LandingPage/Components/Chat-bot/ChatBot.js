//library dependencies
import React, {Component} from 'react';
//style
import './styles.scss';
import {makeStyles} from "@material-ui/core/styles";
import shenzynBotIcon from '../../../../../assets/media/icons/shenzyn-bot-logo.png';

class ChatBot extends Component {
  state = {
    close_notification: false
  };

  /**
   * on click of bot icon
   */
  chatWithShenzyn = () => {
    this.props.history.push("under-progress");
  };

  /**
   * on click of close notification button
   */
  onWelcomeMessageClose = () => {
    this.setState({close_notification: true})
  };

  render() {
    return (
      <>
        <div className={this.state.close_notification ? "bot-wrapper close-bot-notification" : "bot-wrapper"}>
          <div className={"welcome-notification-close"}
               onClick={this.onWelcomeMessageClose}>x
          </div>
          <div className="welcome-notification-wrapper">
            <div className="welcome-notification-message">Chat with She-Expert</div>
          </div>
        </div>
        <div style={{backgroundImage: `url(${shenzynBotIcon})`}}
             className="chat-bot-wrapper" onClick={this.chatWithShenzyn}/>
      </>
    );
  }
}

export default (ChatBot);
