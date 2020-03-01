//library dependencies
import React from 'react';
import { Chip } from '@material-ui/core';

//style
import './style.scss';

/**
 * To show selected values in chips
 * @param props
 * @returns {*}
 * @constructor
 */
 export default function ChipsForFields(props) {
  const { values, isItEditMode, onDelete, fieldName } = props;
  return (
    <div className="chips-div">
      {values && values.map((item, key) => (
        <span className="skill-list" key={key}>
          {isItEditMode ? <Chip
            label={item.value}
            onDelete={() => {
              onDelete(item,key)
            }}
          /> : <Chip
              label={item.value}
            />
          }
        </span>
      ))}      
    </div>
  )
};

