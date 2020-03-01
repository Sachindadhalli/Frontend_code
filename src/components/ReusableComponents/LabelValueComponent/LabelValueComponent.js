//library dependencies
import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";

//style
import './styles.scss';

//for customization of style
const styles = () => ({
  chip: {}
});

class LabelValueComponent extends React.Component {
  render() {
    const {label, value, type} = this.props;
    return (
      <div className="label-value-body">
        <div className="label-value-wrapper">
          {label ?
            (<div>
              <div className="label-styles">{label}</div>
              <div className="value-styles">{value}</div>
            </div>)
            : type === "OnlyText" ? (<div>
                <div className="value-styles2">{value}</div>
              </div>) :
              (<div>
                <div className="value-styles1">{value}</div>
              </div>)
          }
        </div>
      </div>
    );
  }
}

LabelValueComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LabelValueComponent);
