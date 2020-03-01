//library dependencies
import React from 'react';

//style
import './style.scss';

//custom component
import CustomIcon from '../../components/CustomIcon';
import CustomTag from '../../components/CustomTag'

function SideMenuItem(props) {
  return (
    <div className="side-menu-item">
      <CustomIcon icon={props.icon}/>
      <CustomTag text={props.text} className={props.className}/>
    </div>
  );
}

export default SideMenuItem;

