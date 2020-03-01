// library dependencies
import React from "react";
import PropTypes from "prop-types";
import {withStyles, InputAdornment} from "@material-ui/core";
import {DateFormatInput} from "material-ui-next-pickers";

//custom component
import CustomIcon from "../../components/CustomIcon";

//icon
import calendar from "../../../assets/media/icons/calendar.svg";

// used to overrides material ui component styles
const styles = () => ({
  root: {flexGrow: 1,},
  cssLabel: {color: '#656565 !important', fontSize: '14px', fontFamily: 'Roboto', fontWeight: 400,},
  cssError: {color: '#656565 !important', fontSize: '14px', fontFamily: 'Roboto', fontWeight: 400,},
});

/**
 * this function used as a Date picker component
 * parameters required in props are classes, vertical, horizontal, error, maxDate, label, endIconPos, date, fullWidth
 * @param props
 * @returns {*}
 * @constructor
 */
const DateTimePicker = (props) => {
  const {classes, vertical, horizontal, error, maxDate, label, endIconPos, date, fullWidth} = props;
  return (
    <div className={classes.root}>
      <DateFormatInput
        name='date-input'
        value={date}
        anchorOrigin={{vertical: vertical || "bottom", horizontal: horizontal || "center"}}
        FormControlProps={{error: error !== '' ? error : ''}}
        onChange={props.onChangeDate}
        fullWidth={fullWidth || true}
        max={maxDate || new Date()}
        InputLabelProps={{
          shrink: true,
          classes: {root: classes.cssLabel, focused: classes.cssFocused, error: classes.cssError}
        }}
        label={label || "Date of birth"}
        error={error !== '' ? <span style={{color: '#f0582b'}}>{error}</span> : null}
        endIcon={<InputAdornment position={endIconPos === true ? "end" : null}> <CustomIcon icon={calendar}/>
        </InputAdornment>}
      />
    </div>
  );
};

DateTimePicker.propTypes = {
  classes: PropTypes.object.isRequired,
  onChangeDate: PropTypes.any
};

export default withStyles(styles)(DateTimePicker);
