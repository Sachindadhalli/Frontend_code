//library dependencies
import React from "react";
import PropTypes from "prop-types";
import {withStyles, Chip} from "@material-ui/core";

//style
import './styles.scss'

//customised style ChipsComponents
const styles = () => ({
  chip: {marginRight:"10px", marginTop:"10px", background: "#eeeeee", color: "#757575", fontFamily: "Roboto",
    fontSize: "14px", borderRadius: "15px"}
});

class ChipsComponents extends React.Component {
  render() {
    const {classes, title, values} = this.props;
    return (
      <div>
        {title ? <div className="chip-title-style">{title}</div> : <div> </div>}
        <div className = "top-padding-10-1" >
          {values.map((value, index)=><span><Chip key={index} label={value} className={classes.chip} /></span>)}
        </div>
      </div>
    );
  }
}

ChipsComponents.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ChipsComponents);
