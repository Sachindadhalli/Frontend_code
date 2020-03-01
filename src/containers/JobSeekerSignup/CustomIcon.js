import React from 'react';

export default function CustomIcon(props) {
  return (
    <div>
      <img src={props.icon} {...props}/>
    </div>
  );
}
