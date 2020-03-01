import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import CustomTag from '../../../../../components/CustomTag';
import CustomIcon from '../../../../../components/CustomIcon/CustomIcon';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AutoCompleteNew from '../../../../../components/AutoCompleteNew';
import deleteIcon from '../../../../../../assets/media/icons/deleteIcon.svg';
// import './style.scss';
import Input from '@material-ui/core/Input';
import calendar from '../../../../../../assets/media/icons/calendar.svg';
import { TextField, withStyles } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import untick from '../../../../../../assets/media/icons/untick.svg';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import UserBasicDetailsView from '../../../../UserProfileFresherView/components/UserBasicDetailsView/UserBasicDetailsView';
import customisedMaterial from '../../../../../styles/customisedMaterial';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import dropdown from '../../../../../../assets/media/icons/dropdown.svg';
import DateTimePicker from '../../../../../components/DateTimePicker';
import MultiSelect from '../../../../../components/MultiSelectDropDown/MultiSelect';
import BoxInternship from '../../UserEmployment/components/BoxInternship';
import BoxTraining from '../../UserEmployment/components/BoxTraining';
import { DateFormatInput } from 'material-ui-next-pickers';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  Input: {
    flexBasis: 200,
  },
  button: {
    margin: '11px',
    borderRadius: '20px',
  },
  input: {
    display: 'none',
  },
  formControl: {
    marginBottom: '5px',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  ...customisedMaterial,
  label: {
    fontWeight: 'normal',
    fontSize: '16px',
    color: 'black',
  },
});
const allDropDownWidth = {
  rightHalf: '100%',
  leftHalf: '47.5%',
  fullWidth: '100%',
};
class WorkSample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role_dsc: '',
      work_title: '',
      url: '',
      start_date: '',
      end_date: '',
      description: '',
      work_title_error: '',
      url_error: '',
      start_date_error: '',
      end_date_error: '',
      description_error: '',
    };
    // this.checkForErrors = this.checkForErrors.bind(this);
  }
  onStartDate(event) {
    // this.fieldTouched('startdate');
    // const { qualification } = this.state;
    this.state.start_date = new Date(event);
    this.setState(
      {
        // qualification,
        start_date_error: '',
      },
      () => {
        this.checkForErrors();
      },
    );
  }

  onEndDate(event) {
    //this.fieldTouched('enddate');
    //const { qualification } = this.state;
    this.state.end_date = new Date(event);
    const isEndGreater = Date.parse(this.state.start_date) < Date.parse(this.state.end_date);
    if (!isEndGreater) {
      this.setState({
        //qualification,
        end_date_error: 'End date must be bigger than the start date',
      });
    } else {
      this.setState({
        //qualification,
        end_date_error: '',
      });
    }
    this.checkForErrors();
  }
  resetErrors = () => {
    this.setState({
      work_title_error: '',
      url_error: '',
      start_date_error: '',
      end_date_error: '',
      description_error: '',
    });
  };
  handleInput = (e, validatorAfterSave = null) => {
    const { name } = e.target;
    this.setState(
      {
        [name]: e.target.value,
        [`${name}_error`]: '',
      },
      () => {
        // debugger;
        this.validateFields(name);
      },
    );
  };
  validateFields = fieldName => {
    switch (fieldName) {
      case 'work_title':
        this.validateWorkTitleForm();
        break;
      case 'url':
        this.validateUrlForm();
        break;
      case 'description':
        this.validateDescriptionForm();
        break;
    }
  };
  removeErrorFocus = e => {
    this.setParticularField(e.target.name, '');
  };
  validateWorkTitleForm = async () => {
    let errorValue = '';
    if (!this.state.work_title) {
      errorValue = 'Kindly specify your Work Title';
    }
    this.setParticularField('work_title', errorValue);
    return errorValue ? true : false;
  };
  validateUrlForm = async () => {
    let errorValue = '';
    if (!this.state.url) {
      errorValue = 'Kindly specify your URL';
    }
    this.setParticularField('url', errorValue);
    return errorValue ? true : false;
  };
  validateDescriptionForm = async () => {
    let errorValue = '';
    if (!this.state.description) {
      errorValue = 'Kindly specify your Description';
    }
    this.setParticularField('description', errorValue);
    return errorValue ? true : false;
  };

  setParticularField = (name, value) => {
    const errorName = name + '_error';
    this.setState({
      [errorName]: value,
    });
  };
  fieldTouched(id) {
    const { allFieldsStatus } = this.state;
    allFieldsStatus[id] = true;
    this.setState({ allFieldsStatus });
  }
  render() {
    const { classes, index } = this.props;
    const {
      role_dsc,
      work_title,
      url,
      start_date,
      end_date,
      description,
      work_title_error,
      url_error,
      start_date_error,
      end_date_error,
      description_error,
    } = this.state;
    const { rightHalf, leftHalf, fullWidth } = allDropDownWidth;
    return (
      <div className="training-box" key={index}>
        <div style={{ textAlign: 'right' }}>
          <CustomIcon
            icon={deleteIcon}
            className="delete-icon"
            // onclick={e => {
            //   this.props.deleteQualifications(qualification_id);
            // }}
          />
        </div>
        {/* <Input
          id="loc"
          placeholder="Work Title"
          //className="loc"
          // onChange={this.handleChange('name')}
          margin="normal"
          width="100%"
          //style={{ marginTop: '30px' }}
        />
        <Input
          placeholder="URL"
          //className="loc"
          // onChange={this.handleChange('name')}
          margin="normal"
          width="100%"
          //style={{ marginTop: '30px' }}
        /> */}
        <FormControl className={'full-form-child ' + classes.formControl}>
          <InputLabel
            classes={{ root: classes.helperText }}
            classes={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
            shrink={true}
            htmlFor="work_title"
          >
            Work Title
          </InputLabel>
          <Input
            name="work_title"
            type="text"
            value={this.state.work_title}
            onChange={this.handleInput}
            onBlur={() => this.validateFields('social_profile')}
            onFocus={this.removeErrorFocus}
            autoComplete="off"
            error={work_title_error ? work_title_error : false}
          />
          {work_title_error ? (
            <FormHelperText error={work_title_error} id="firstName_error">
              <span className="field_error">{work_title_error}</span>
            </FormHelperText>
          ) : null}
        </FormControl>
        <FormControl className={'full-form-child ' + classes.formControl}>
          <InputLabel
            classes={{ root: classes.helperText }}
            classes={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
            shrink={true}
            htmlFor="url"
          >
            URL
          </InputLabel>
          <Input
            name="url"
            type="text"
            value={this.state.url}
            onChange={this.handleInput}
            onBlur={() => this.validateFields('url')}
            onFocus={this.removeErrorFocus}
            autoComplete="off"
            error={url_error ? url_error : false}
          />
          {url_error ? (
            <FormHelperText error={url_error} id="firstName_error">
              <span className="field_error">{url_error}</span>
            </FormHelperText>
          ) : null}
        </FormControl>
        <div className="wrapper1">
          <FormControl style={{ marginTop: '25px' }}>
            <FormControlLabel
              control={<Checkbox id="check_inter" name="check_intern" />}
              label="I am Currently working on this"
            />
          </FormControl>

          {/* <Grid item xs={4} style={{ marginRight: '10px' }}>
            <FormControl style={{ width: '100%', marginTop: 10 }}>
              <DateFormatInput
                name="date-input"
                //value={qualification.startdate}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                onChange={this.onStartDate}
                fullWidth={true}
                FormControlProps={{
                  error: this.state.allFieldsStatus['start_date'] && start_date_error !== '',
                }}
                onBlur={() => {
                  this.fieldTouched('start_date');
                }}
                InputLabelProps={{
                  shrink: true,
                  // color:'#656565',
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                    error: classes.cssError,
                  },
                }}
                errorStyle={{ color: '#eaeaea' }}
                error={
                  this.state.allFieldsStatus['start_date'] ? (
                    <span style={{ color: '#f0582b' }}>{start_date_error}</span>
                  ) : null
                }
                max={new Date()}
                label="Start Date"
                endIcon={<CustomIcon iconStyle="end-icon" icon={calendar} />}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl style={{ width: '100%', marginTop: 10 }}>
              <DateFormatInput
                name="date-input"
                //value={qualification.enddate}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                onChange={this.onEndDate}
                onBlur={() => {
                  this.fieldTouched('end_date');
                }}
                fullWidth={true}
                FormControlProps={{
                  error: this.state.allFieldsStatus['end_date'] && end_date_error !== '',
                }}
                error={
                  this.state.allFieldsStatus['end_date'] ? (
                    <span style={{ color: '#f0582b' }}>{end_date_error}</span>
                  ) : null
                }
                InputLabelProps={{
                  shrink: true,
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                    error: classes.cssError,
                  },
                }}
                max={new Date()}
                label="End Date"
                endIcon={<CustomIcon iconStyle="end-icon" icon={calendar} />}
              />
            </FormControl>
          </Grid> */}

          <Grid container spacing={32}>
            <Grid item xs={12} md={6}>
              <FormControl
                style={{ width: '100%' }}
                className="form-child"
                // error={start_date_error ? true : false}
              >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    id="start_date"
                    name="start_date"
                    margin="normal"
                    label="Start Date"
                    value={this.start_date}
                    views={['year', 'month']}
                    style={{ marginBottom: '0px', width: '100%' }}
                    maxDate={new Date()}
                    onChange={value =>
                      this.handleInput({ target: { value: value, name: 'start_date' } }, true)
                    }
                    onBlur={() => this.validateFields('start_date')}
                    onFocus={this.removeErrorFocus}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CustomIcon icon={calendar} className="search-icon" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                style={{ width: '100%' }}
                className="form-child"
                //error={com_date_error ? true : false}
              >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    id="com_date"
                    name="com_date"
                    margin="normal"
                    label="End Date"
                    value={this.end_date}
                    views={['year', 'month']}
                    style={{ marginBottom: '0px', width: '100%' }}
                    maxDate={new Date()}
                    minDate={new Date(start_date)}
                    onChange={value =>
                      this.handleInput({ target: { value: value, name: 'end_date' } }, true)
                    }
                    onBlur={() => this.validateFields('com_date')}
                    onFocus={this.removeErrorFocus}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CustomIcon icon={calendar} className="search-icon" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
            </Grid>
          </Grid>
        </div>
        <FormControl className={'full-form-child ' + classes.formControl}>
          <InputLabel
            classes={{ root: classes.helperText }}
            classes={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
            shrink={true}
            htmlFor="description"
          >
            Description
          </InputLabel>
          <Input
            name="description"
            type="text"
            value={this.state.description}
            onChange={this.handleInput}
            onBlur={() => this.validateFields('description')}
            onFocus={this.removeErrorFocus}
            autoComplete="off"
            error={description_error ? description_error : false}
          />
          {description_error ? (
            <FormHelperText error={description_error} id="firstName_error">
              <span className="field_error">{description_error}</span>
            </FormHelperText>
          ) : null}
        </FormControl>
        <div className="character-info-section">
          <CustomTag text="Minimum Character left : " className="character-left" />
          <CustomTag text={role_dsc === '' ? 250 : 250 - role_dsc.length} className="count" />
        </div>
        <div style={{ textAlign: 'right' }}>
          {/* {index !== 0 ? ( */}
          <FormControl style={{ marginLeft: '11px' }} className="shape-minus">
            <div className="shape" onClick={this.props.removeWorkSample}>
              <div className="minus">-</div>
            </div>
          </FormControl>
          {/* ) : null} */}
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(WorkSample);
