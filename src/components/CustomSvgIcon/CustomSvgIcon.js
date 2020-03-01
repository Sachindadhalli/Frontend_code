//library dependencies
import React from "react";
import PropTypes from "prop-types";

const CustomSvgIcon = (props) => {
  let icon = null;
  /**
   * used to select custom svg icons specified by props.icon name
   * In this component we are using custom width, height, color of svg icon,
   */
  switch (props.icon) {
    case 'dropdown-icon':
      icon = (
        <svg width={props.width}
             height={props.height}
             viewBox="0 0 14 8">
          <path fill={props.color}
                d="M7.321 7.677l6.321-5.949A1 1 0 0 0 12.957 0H1a1 1 0 0 0-.685 1.728l6.32 5.95a.5.5 0 0 0 .686 0z"/>
        </svg>
      );
      break;
    default:
      icon = (
        <svg x="0px" y="0px" viewBox="0 0 491.86 491.86"
             width={props.size}
             height={props.size}>
          <path
            d="M465.167,211.614H280.245V26.691c0-8.424-11.439-26.69-34.316-26.69s-34.316,18.267-34.316,26.69v184.924H26.69
                C18.267,211.614,0,223.053,0,245.929s18.267,34.316,26.69,34.316h184.924v184.924c0,8.422,11.438,26.69,34.316,26.69    s34.316-18.268,34.316-26.69V280.245H465.17c8.422,0,26.69-11.438,26.69-34.316S473.59,211.614,465.167,211.614z"
            fill={props.color}/>
        </svg>
      );
      break;
  }
  return (<i className="question-icon" {...props}>  {icon} </i>)
};
CustomSvgIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  hoverColor: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.any,
  active: PropTypes.bool
};

export default CustomSvgIcon;
