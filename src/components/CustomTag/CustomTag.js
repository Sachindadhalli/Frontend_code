//library dependencies
import React from 'react';

export default function CustomTag(props) {
  return <div
    onClick={props.onclick ? () => props.onclick(props.id) : null}
    className={props.className}>
    {props.text}
  </div>;
}
