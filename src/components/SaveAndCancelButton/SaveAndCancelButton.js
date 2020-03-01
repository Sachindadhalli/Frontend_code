//library dependencies
import React from 'react';

//style
import './style.scss';

/**
 * @function component,creating cancel and text button with text props
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
           disabled={props.isDisabled}
           style={props.isDisable ? {cursor: 'not-allowed'} : null}
      >
        <div>{props.saveText}</div>
      </div>
    </div>
  )
}

export default SaveAndCancelButton;
