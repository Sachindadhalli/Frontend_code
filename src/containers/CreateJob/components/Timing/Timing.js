//library dependencies
import React, {Component} from 'react';
import {
  withStyles,
  InputLabel,
  FormControl,
  FormHelperText,
  InputAdornment,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, TimePicker} from 'material-ui-pickers';

//style
import './style.scss';

//icon
import dropdown from '../../../../../assets/media/icons/dropdown.svg'

//custom component
import CustomIcon from '../../../../components/CustomIcon';
import NonCreatableSingleSelectDropdown
  from "../../../../components/SingleSelectDropdownWrapper/components/NonCreatableSingleSelectDropdown/NonCreatableSingleSelectDropdown";

// customised material ui style
const styles = theme => ({
  root: {display: 'flex', flexWrap: 'wrap',},
  margin: {margin: theme.spacing.unit,},
  withoutLabel: {marginTop: theme.spacing.unit * 3,},
  Input: {flexBasis: 200,},
  button: {margin: '11px', borderRadius: '20px'},
  input: {display: 'none',},
  formControl: {marginBottom: '5px',},
  paper: {padding: theme.spacing.unit * 2, textAlign: 'center', color: theme.palette.text.secondary,},
  label: {
    fontSize: '16px', color: 'black', fontWeight: 'normal', fontStyle: 'normal', fontStretch: 'normal',
    lineHeight: 'normal', letterSpacing: 'normal',
  },
  helperText: {
    color: '#656565', fontSize: '14px', fontFamily: 'Roboto', fontWeight: 'normal', fontStyle: 'normal',
    fontStretch: 'normal', lineHeight: 'normal', letterSpacing: 'normal',
  },
  selectText: {
    color: 'black', fontSize: '16px', fontFamily: 'Roboto', fontWeight: 'normal', fontStyle: 'normal',
    fontStretch: 'normal', lineHeight: 'normal', letterSpacing: 'normal', overFlow: 'hidden',
  }
});

//customised material ui date and time picker
export const customTheme = createMuiTheme({
  palette: {
    primary: {main: '#F00360', light: '#212121', dark: '#212121',},
    secondary: {main: '#F00360',},
  },
});

class Timing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: new Date('2014-08-18T21:11:54'),
      end: new Date('2014-08-18T21:11:54'),
      shift: "Regular",
      time_error: '',
      ...this.props
    }
  }

  componentDidMount() {
    // creating reference of this component
    this.props.onRef(this)
  }

  componentWillUnmount() {
    this.props.onRef(null)
  }

  /**
   * on change of start time picker, modify the time ,updating state
   * @param date
   */
  handleStartDateChange = date => {
    this.setState({start: date}, () => this.modifyTiming());
  };

  /**
   * on change of end time picker, updating state, modify the time
   * @param date
   */
  handleEndDateChange = date => {
    this.setState({end: date}, () => this.modifyTiming())
  };

  /**
   * on change in shift drop down, updating the state
   * @param option
   */
  handleChange = (option) => {
    const value = option.label;
    this.setState({shift: value}, () => {
      this.modifyTiming()
    });
  };

  /**
   * validating the timings
   * @return {boolean}
   */
  validateShiftTimings = () => {
    if (this.state.time_error !== '') {
      return true
    }
    return false
  };

  componentWillReceiveProps = (nextProps) => {

    // on updating the value,receiving props, updating state
    this.setState({...nextProps})
  };

  /**
   * to update the time and validating that start and end time
   */
  modifyTiming = () => {
    const {start, end, shift, time_error} = this.state;
    if (new Date(start).getTime() !== new Date(end).getTime()) {
      this.setState({time_error: ''})
    } else {
      this.setState({time_error: "Start Time should not be same as the End Time"})
    }
    const timingObj = {start: start, end: end, shift: shift};
    this.props.modifyTiming(this.props.index, timingObj);
  };

  render() {
    const {classes, index} = this.props;
    const {end, start, shift, time_error} = this.state;
    return (
      <div className="timing-main">
        <div className={"form-child left-child-form"}>
          <FormControl
            style={{width: '100%', marginTop: '13px'}}>
            <InputLabel shrink
                        style={{marginTop: '-12px'}}>
              Shifts
            </InputLabel>
            <NonCreatableSingleSelectDropdown
              isSearchable={false}
              defaultValue={shift ? {value: 1, label: shift} : {}}
              getSelectedOption={(option) => this.handleChange(option)}
              options={[{key: 1, value: 'Regular'}, {key: 2, value: 'Rotational shift'}]}
              isClearable={false}
            />
          </FormControl>
        </div>
        <div className="form-child slots">
          <FormControl
            className={"one-forth-form one-forth-form-left " + classes.formControl}>
            <InputLabel classes={{root: classes.helperText}} shrink>
              Slot starts at
            </InputLabel>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <MuiThemeProvider theme={customTheme}>
                <TimePicker
                  margin="normal"
                  value={start}
                  onChange={this.handleStartDateChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">
                      <CustomIcon icon={dropdown} className="search-icon"/>
                    </InputAdornment>,
                  }}
                  error={!!time_error}
                />
              </MuiThemeProvider>
            </MuiPickersUtilsProvider>
            <FormHelperText><span className="field_error"
                                  style={{marginTop: '-6px'}}>{time_error}</span></FormHelperText>
          </FormControl>
          <FormControl
            className={"one-forth-form " + classes.formControl}
          >
            <InputLabel classes={{root: classes.helperText}} shrink>Slot ends at</InputLabel>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <MuiThemeProvider theme={customTheme}>
                <TimePicker
                  margin="normal"
                  value={end}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">
                      <CustomIcon icon={dropdown} className="search-icon"/>
                    </InputAdornment>,
                  }}
                  onChange={this.handleEndDateChange}
                  error={!!time_error}
                />
              </MuiThemeProvider>
            </MuiPickersUtilsProvider>
          </FormControl>
          {
            index !== 0 ? <FormControl className="shape-minus">
              <div className="shape" onClick={this.props.removeTiming}>
                <div className="minus">-</div>
              </div>
            </FormControl> : null
          }
        </div>
      </div>
    );
  }
}

Timing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Timing);
