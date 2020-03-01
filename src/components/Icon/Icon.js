//library dependencies
import React from "react";
import PropTypes from "prop-types";

/**
 * functional component to customize svg icon
 * @param icon
 * @param color
 * @param className
 * @return {XML}
 * @constructor
 */
const Icon = ({icon, color,className})=> {
    switch (icon) {
        case 'down':
            icon = <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8">
                <path fill="#B1B1B1" fillRule="nonzero"
                      d="M7.321 7.677l6.321-5.949A1 1 0 0 0 12.957 0H1a1 1 0 0 0-.685 1.728l6.32 5.95a.5.5 0 0 0 .686 0z"/>
            </svg>;
            break;
    }
    return (
        <i className={className} style={{color: color}}>{icon}</i>
    )
};
Icon.propTypes = {
    icon: PropTypes.any,
    color: PropTypes.any,
};
export default Icon;
