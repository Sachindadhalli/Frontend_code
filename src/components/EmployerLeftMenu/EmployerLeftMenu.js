//library dependencies
import React, {Component} from 'react';

//style
import './style.scss';

//icon
import company from '../../../assets/media/icons/company.svg';
import home from '../../../assets/media/icons/home.svg';
import inbox from '../../../assets/media/icons/inbox.svg';
import profile from '../../../assets/media/icons/profile.svg';
import settings from '../../../assets/media/icons/settings.svg';
import shape from '../../../assets/media/icons/Shape.svg';
import menu from '../../../assets/media/images/menu.png';

//custom component
import CustomIcon from '../../components/CustomIcon';
import SideMenuItem from '../../components/SideMenuItem';

class EmployerLeftMenu extends Component {
  render() {
    return (
      <div className="employer-left-menu">
        <div className="menu-and-logo">
          <div className="menu-shenzyn-wrapper">
            <div className="shenzyn-logo-home"><CustomIcon icon={shape}/></div>
            <div className="menu"><CustomIcon icon={menu} iconStyle=""/></div>
            <div className="shenzyn"> Shenzyn</div>
          </div>
        </div>
        <div className="selected">
          <div className="selected-line"></div>
          <SideMenuItem icon={home} text="Home" className="Home"/>
        </div>
        <div className="selected1">
          <div className="selected-line1"></div>
          <SideMenuItem icon={profile} text="Profile" className="Profile"/>
        </div>
        <div className="selected1">
          <div className="selected-line1"></div>
          <SideMenuItem icon={company} text="Jobs" className="Jobs"/>
        </div>
        <div className="selected1">
          <div className="selected-line1"></div>
          <SideMenu Itemicon={inbox} text="Inbox" className="Inbox"/>
        </div>
        <div className="selected1">
          <div className="selected-line1"></div>
          <SideMenuItem icon={settings} text="Account Settings" className="Account-Settings"/>
        </div>
      </div>
    );
  }
}

export default EmployerLeftMenu;
