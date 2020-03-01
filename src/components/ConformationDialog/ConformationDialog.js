//library dependencies
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core';

//style
import './styles.scss';

//icon
import close from '../../../assets/media/icons/close.svg';

//custom icon
import CustomIcon from '../CustomIcon';

/**
 * this variable used to overrides material ui theme styles
 * @param theme
 * @returns {{root: {display: string, flexWrap: string}, margin: {margin: *}, withoutLabel: {marginTop: number}, textField: {flexBasis: number}, input: {display: string}, helperText: {color: string, fontSize: string, fontFamily: string, fontWeight: string, fontStyle: string, fontStretch: string, lineHeight: string, letterSpacing: string}, padding: {}, label: {color: string}}}
 */
const styles = theme => ({
  root: {display: 'flex', flexWrap: 'wrap',},
  margin: {margin: theme.spacing.unit,},
  withoutLabel: {marginTop: theme.spacing.unit * 3,},
  textField: {flexBasis: 70,},
  input: {display: 'none',},
  helperText: {
    color: '#656565', fontSize: '14px', fontFamily: 'Roboto', fontWeight: 'normal', fontStyle: 'normal',
    fontStretch: 'normal', lineHeight: 'normal', letterSpacing: 'normal',
  },
  padding: {},
  label: {color: '#656565',},
});

class ConformationDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * this function used to handle close event click
   * whenever closed is click sending close event to parent class using props
   */
  handleClose = () => {
    this.props.handleClose(true);
  };

  render() {
    const {Text, headingText} = this.props;
    return (
      <div className="conform-dialog-container">
        <div className="confirm-dialog">
          <div className="dialog-close" onClick={this.handleClose}>
            <CustomIcon icon={close}/>
          </div>
          <div className="dialog-header">{headingText}</div>
          <div className="dialog-button">
            <button
              className="shenzyn-btn outline-primary-button px-40 py-8 mr-20"
              onClick={this.handleClose}
            >
              Cancel
            </button>
            <button
              className="shenzyn-btn filled-primary-button px-40 py-8"
              onClick={() => this.props.conformationStatus()}
            >
              {Text}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ConformationDialog.propTypes = {
  canProceedToNext: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConformationDialog);
