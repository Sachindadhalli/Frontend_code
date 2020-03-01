//library dependencies
import React from 'react';

//style
import './style.scss';

//icon
import error_icon from '../../../assets/media/icons/errorIcon.svg';

//custom component
import CustomIcon from '../CustomIcon';
import CustomTag from '../CustomTag';

function DocumentList(props) {
  return (
    <div className={props.className ? props.className : "document-instance"}>
      <CustomTag text={props.text} className="document-name"/>
      <CustomIcon icon={error_icon} onclick={props.onclick}/>
    </div>
  );
}

export default DocumentList
