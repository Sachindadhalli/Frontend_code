//library dependency
import React, {Component} from 'react';

//custom components
import CustomIcon from '../../../../components/CustomIcon/CustomIcon';

//styles
import './styles.scss';

//utilities

//icons
import displayPicture from '../../../../../assets/media/icons/profile-girl.svg';


class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {chat_list: ['', '', '', '']}
  }


  render() {
    return (
      <div className='chat-wrapper'>
        <div className='inner-head-text'> Chat</div>
        <div className='chat-wrapper-container'>
          {this.state.chat_list.map((value, index) => {
            return <div index={index} value={value}>
              <div className='one-person-chat-body'>
                <div className='person-user-profile-icon'>
                  <div className="profile-rectangle">
                    <CustomIcon icon={displayPicture} iconStyle="profile-img"/>
                  </div>
                </div>
                <div className='person-text-body'>
                  <div className='person-name-text-count-container'>
                    <div className='person-name-text'>
                      Mr.Rahul Mahajan
                    </div>
                    <div className='message-count'>
                      2
                    </div>
                  </div>
                  <div className='person-chat-message'>
                    Hello! I’m looking for a job in youuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu...
                  </div>
                </div>
              </div>
              <hr className='hr-class'/>
            </div>
          })}

        </div>
      </div>
    );
  }
}

export default Chat;
