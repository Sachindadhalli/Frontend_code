//library dependencies
import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";

//style
import './styles.scss';

//custom component
import CustomIcon from "../../CustomIcon/CustomIcon";

// for customization of styles
const styles = () => ({
  chip: {}
});

class IconValueComponent extends React.Component {
  render() {
    const {iconName, text} = this.props;
    return (
      <div className="icon-value-body">
        <div className="icon-value-wrapper">
          <div className="icon-styles"><CustomIcon icon={iconName}></CustomIcon></div>
          <div className="value-styles">{text}</div>
        </div>
      </div>
    );
  }
}

IconValueComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IconValueComponent);
