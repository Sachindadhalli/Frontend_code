//library dependencies
import React from 'react';
import { Tooltip } from '@material-ui/core';

//style
import './style.scss';

function FieldLabel(props) {
  return (
    <div className="lable-wrapper">
      <span className="title">
        {props.label}
      </span>
      {props.hintMessage &&
        <Tooltip  disableFocusListener disableTouchListener  title={props.hintMessage} placement="bottom">
          <span className="icon" >
            ?
        </span>
        </Tooltip>
      }
    </div>
  )
}

export default FieldLabel;
