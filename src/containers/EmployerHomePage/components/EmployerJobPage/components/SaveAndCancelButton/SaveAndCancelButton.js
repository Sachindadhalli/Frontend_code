//library dependencies
import React from 'react';

//style
import './style.scss';

/**
 * To create reuse of save and cancel button
 * @param props
 * @returns {*}
 * @constructor
 */
function SaveAndCancelButton(props) {
  return (
    <div className="save-and-cancel">
      <div className="cancel" 
         onClick={props.onCancel}
        >
        <div>{props.cancelText}</div>
      </div>
      <div className="save" 
        onClick={props.onSave}
        >
        <div>{props.saveText}</div>
      </div>
    </div>
  )
}

export default SaveAndCancelButton;
