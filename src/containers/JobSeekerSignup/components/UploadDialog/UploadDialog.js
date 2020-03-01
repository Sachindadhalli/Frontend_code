//library dependencies
import React, {Component} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import {debug} from "util";
//styles
import './styles.scss';
//custom components
import CustomIcon from "../../CustomIcon";
//icons
import close from "../../../../../assets/media/icons/close.svg"

const styles = (theme) => ({
  root: {display: 'flex', flexWrap: 'wrap'},
  margin: {margin: theme.spacing.unit},
  withoutLabel: {marginTop: theme.spacing.unit * 3},
  textField: {flexBasis: 70},
  input: {display: 'none'},
  helperText: {
    color: '#656565',
    fontSize: '14px',
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
  },
  padding: {},
  label: {color: '#656565'},
});

class uploadDialog extends React.Component {

  /**
   * @function to close the modal
   */
  handleClose = () => {
    this.props.handleClose();
    this.setState({open: false});
  };

  /**
   * @function on file change, sending file data to parent component and close the modal
   * @param event
   */
  onFileUpload = (event) => {
    const {target} = event;
    const {files} = target;
    this.props.onFileUpload(files);
    this.props.handleClose();
  };

  onFormSubmit = (event) => {
    this.props.sendExpDetailsToRedux();
    this.props.history.push({
      pathname: "/employee-home-page",
      state: {experienceType: this.props.location.state.experienceType, previousPath: '/jobseeker-signup/employment'},
    })
  };

  render() {
    const {classes} = this.props;
    return (
      <div className="upload-dialog-container">
        <div className="upload-option">
          <div className="upload-close" onClick={this.handleClose}><CustomIcon icon={close}></CustomIcon></div>
          <div className="upload-body">
            <div className="upload-title">Upload your resume</div>
            <div className="file">
              <div className="file-name">File:</div>
              <button className="solid_button" id="submit" onClick={() => {
                this.upload.click()
              }}>
                Upload
              </button>
              <input
                className={classes.input}
                id="contained-button-file"
                multiple={false}
                type="file"
                onChange={e => {
                  this.onFileUpload(e);
                }}
                ref={(ref) => this.upload = ref}
              />
            </div>
            <div>
              <span className="dashes">Or</span>
            </div>
            <div className="video">
              <div className="file-name">Video:</div>
              <button className="solid_button" id="submit" onClick={this.onFormSubmit}>
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

uploadDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  canProceedToNext: PropTypes.any.isRequired
};

export default withStyles(styles)(uploadDialog);
