//library dependency
import React from 'react';

//custom components
import CustomIcon from '../../../../../../components/CustomIcon';
import CustomTag from '../../../../../../components/CustomTag';

//styles
import './style.scss';

//icons
import error_icon from '../../../../../../../assets/media/icons/errorIcon.svg';

/**
 * To show the List of documents for view only
 * @param props
 * @returns {*}
 * @constructor
 */
function DocumentList(props) {
  return (
    <div className="document-instance">
        <CustomTag text={props.text} className="document-name" />
        <CustomIcon icon={error_icon} />
    </div>
  )
}

export default DocumentList
