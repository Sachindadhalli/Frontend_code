//library dependencies
import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";

//style
import './styles.scss';

//icons
import Tick from '../../../../assets/media/icons/tick.svg';

//custom component
import CustomIcon from "../../CustomIcon/CustomIcon";

//customization of styles
const styles = () => ({
  chip: {}
});

class LanguageComponent extends React.Component {
  render() {
    const {value} = this.props;
    return (
      <div className="label-value-body">
        <div className="label-value-wrapper">
          <table width="100%">
            <tr className="label-styles-L">
              <td width={"34% "}>Language</td>
              <td>Read</td>
              <td>Write</td>
              <td>Speak</td>
            </tr>
            {value.map((values, index) => {
              return <tr className="value-styles-L" key={index}>
                <td>{values.language}</td>
                <td>{values.read ? <CustomIcon style={{"padding": "5px", "margin": "5px", "textAlign": "left"}}
                                               icon={Tick}></CustomIcon> : <CustomIcon icon={""}></CustomIcon>}</td>
                <td>{values.write ? <CustomIcon style={{"padding": "5px", "margin": "5px", "textAlign": "left"}}
                                                icon={Tick}></CustomIcon> : <CustomIcon icon={""}></CustomIcon>}</td>
                <td>{values.speak ? <CustomIcon style={{"padding": "5px", "margin": "5px", "textAlign": "left"}}
                                                icon={Tick}></CustomIcon> : <CustomIcon icon={""}></CustomIcon>}</td>
              </tr>
            })}
          </table>
        </div>
      </div>
    );
  }
}

LanguageComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LanguageComponent);
