//library dependencies
import React from "react";
import PropTypes from "prop-types";
import {Input, Grid} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";

class OTPInput extends React.Component {
  state = {};
  /**
   * on change in otp input field
   * @param e
   */
  onOtpInputChange = e => {
    const {id} = e.target;
    this.setState({
      [id]: !isNaN(e.target.value) && e.target.value != '' ? (e.target.value) % 10 : e.target.value,
    }, e.target.value != "" ? this.setFocusToInput(id) : null);
  };

  /**
   * To move focus in the next input field after type previous field in otp's Four Field
   * @function used to move the focus on next input field otp
   * @param previousFocus
   */
  setFocusToInput = (previousFocus) => {
    switch (previousFocus) {
      case 'input_one':
        this.input_two.focus();
        break;
      case 'input_two':
        this.input_three.focus();
        break;
      case 'input_three':
        this.input_four.focus();
        break;
    }
  }

  render() {
    const {classes} = this.props;
    const receivedOtp = !this.props.is_received_otp || this.props.popup_email_error != "";
    return (
      <div className="input-otp">
        <div>
          <Grid container spacing={8} className='gridStyle'
          >
            <Grid item xs={2} style={{paddingRight: '10px'}}>
              <Input
                onChange={this.onOtpInputChange}
                id="input_one"
                type="number"
                tabIndex="1"
                readOnly={receivedOtp}
                value={this.state.input_one}
                disabled={receivedOtp}
              />
            </Grid>
            <Grid item xs={2} style={{paddingRight: '10px'}}>
              <Input
                onChange={this.onOtpInputChange}
                id="input_two"
                type="number"
                value={this.state.input_two}
                readOnly={receivedOtp}
                inputRef={ref => {
                  this.input_two = ref;
                }}
                disabled={receivedOtp}
              />
            </Grid>
            <Grid item xs={2} style={{paddingRight: '10px'}}>
              <Input
                onChange={this.onOtpInputChange}
                id="input_three"
                type="number"
                value={this.state.input_three}
                readOnly={receivedOtp}
                inputRef={ref => {
                  this.input_three = ref;
                }}
                disabled={receivedOtp}
              />
            </Grid>
            <Grid item xs={2} style={{paddingRight: '10px'}}>
              <Input
                onChange={this.onOtpInputChange}
                id="input_four"
                type="number"
                value={this.state.input_four}
                readOnly={receivedOtp}
                inputRef={ref => {
                  this.input_four = ref;
                }}
                disabled={receivedOtp}
              />
            </Grid>
          </Grid>
        </div>
        <div>
          <FormControl
            error={this.state.forgot_password_otp_error != ""}>
            <FormHelperText style={{"textAlign": "center"}}
                            id="pop-email-error">{this.state.forgot_password_otp_error}</FormHelperText>
          </FormControl>
        </div>
      </div>
    );
  }
}

OTPInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CodePicker);
