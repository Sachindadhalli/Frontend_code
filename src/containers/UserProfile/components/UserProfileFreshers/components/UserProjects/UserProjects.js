import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import CustomTag from '../../../../components/CustomTag';
import CustomIcon from '../../../../components/CustomIcon/CustomIcon';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AutoCompleteNew from '../../../../components/AutoCompleteNew';
import './style.scss';
import calendar from '../../../../../assets/media/icons/calendar.svg';
import DateFnsUtils from '@date-io/date-fns';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { TextField, withStyles } from '@material-ui/core';
import Checkbox from '@material-ui/core';
import deleteIcon from '../../../../../assets/media/icons/deleteIcon.svg';
import untick from '../../../../../assets/media/icons/untick.svg';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import UserBasicDetailsView from '../../../UserProfileFresherView/components/UserBasicDetailsView/UserBasicDetailsView';
import customisedMaterial from '../../../../styles/customisedMaterial';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import dropdown from '../../../../../assets/media/icons/dropdown.svg';
import DateTimePicker from '../../../../components/DateTimePicker';
import MultiSelect from '../../../../components/MultiSelectDropDown/MultiSelect';
import { fileValidation, browserValidation, apiCall } from '../../../../Utilities';
import { AADHAR_UPDATE } from '../../../../../config/constants';
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {},
  label: {
    color: '#656565',
  },
  greenLabel: {
    color: '#0f0',
  },
  greenUnderline: {
    '&:after': {
      backgroundColor: '#0f0',
    },
  },
  greenInkbar: {
    '&:after': {
      backgroundColor: '#0f0',
    },
  },
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
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flexBasis: 70,
  },
  input: {
    display: 'none',
  },
  formControl: {
    marginBottom: '5px',
  },
  padding: {},
  ...customisedMaterial,
});
const allDropDownWidth = {
  rightHalf: '100%',
  leftHalf: '47.5%',
  fullWidth: '100%',
};
class UserProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project_details: '',
      role_dsc: '',
      file_error: '',
      aadhar_file_name: null,
      start_date: this.getValueFromProp('start_date'),
      com_date: this.getValueFromProp('com_on'),
      start_date_error: '',
      com_date_error: '',
    };
    this.onFileUpload = this.onFileUpload.bind(this);
  }
  checkFileSizeFF(files) {
    const filesize = files[0].size;
    return filesize / (1024 * 1024) > 2;
  }

  checkFileSizeIE(file) {
    const myFSO = new ActiveXObject('Scripting.FileSystemObject');
    const filepath = file.value;
    const thefile = myFSO.getFile(filepath);
    const size = thefile.size / (1024 * 1024);
    return size > 2;
  }
  onFileUpload = async event => {
    const { target } = event;
    const { files } = target;
    const filesize = files[0].size / (1024 * 1024);
    if (filesize > 2) {
      return this.setState({
        file_error: 'Document size cannot be more than 2 MB',
      });
    }
    if (files && files[0]) {
      if (!fileValidation(files[0], 2, ['png', 'pdf'])) {
        return this.setState({
          file_error: 'Only PDF and PNG type files are allowed',
        });
      }

      const reader = new FileReader();

      reader.onloadstart = () => this.setState({ loading: true });

      reader.onload = event => {
        if (browserValidation() == 'IE' && this.checkFileSizeIE(files)) {
          this.setState({
            file_error: 'Document size cannot be more than 2 MB',
          });
        } else if (this.checkFileSizeFF(files)) {
          this.setState({
            file_error: 'Document size cannot be more than 2 MB',
          });
        } else {
          let formData = new FormData();
          formData.append('document', files[0]);
          apiCall('post', formData, AADHAR_UPDATE)
            .then(res => {
              if (true) {
                this.setState({
                  aadharFileName: res.data,
                });
              } else {
              }
            })
            .catch(e => {
            });

          this.setState(
            {
              aadhar_file_name: files[0].name,
              // aadhar_file: files[0],
              file_error: '',
            },
            () => {
              event.target.value = null;
            },
          );
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };
  onFileClear(e) {
    this.setState({
      aadhar_file_name: null,
      aadhar_file: null,
    });
  }
  getValueFromProp = key => {
    if (!this.props.experience) return null;
    return this.props.experience[key] ? this.props.experience[key] : null;
  };
  validateStartDateForm = async () => {
    let errorValue = '';
    if (!this.state.start_date) {
      errorValue = 'Kindly specify your joined date';
    }
    this.setParticularField('start_date', errorValue);
    return errorValue ? true : false;
  };
  //Validate left on Form
  validateCompleteDateForm = async () => {
    let errorValue = '';

    let com_date = new Date(this.state.com_date).getTime(),
      start_date = new Date(this.state.start_date).getTime();
    if (!this.state.com_date) {
      errorValue = 'Kindly specify your left date';
    } else if (com_date <= start_date) {
      errorValue = 'Left date must be greater than the joined date';
    }
    this.setParticularField('com_date', errorValue);

    return errorValue ? true : false;
  };
  //Remove Error on focus
  removeErrorFocus = e => {
    this.setParticularField(e.target.name, '');
  };
  setParticularField = (name, value) => {
    const errorName = name + '_error';
    this.setState({
      [errorName]: value,
    });
  };
  validateFields = fieldName => {
    switch (fieldName) {
      case 'start_date':
        this.validateStartDateForm();
        break;
      case 'com_date':
        this.validateCompleteDateForm();
        break;
    }
  };
  handleInput = (e, validatorAfterSave = null) => {
    // const { allFieldsStatus } = this.state;
    const { name } = e.target;

    // allFieldsStatus[name] = true; //change the touch status of field
    let value = e.target.value;
    if (['start_date', 'com_date'].includes(e.target.name)) {
      value = new Date(value);
    }
    this.setState(
      {
        [name]: value,
        // allFieldsStatus
      },
      () => {
        if (validatorAfterSave) {
          this.validateFields(name);
        }
      },
    );
  };
  render() {
    const {
      project_details,
      role_dsc,
      start_date,
      com_date,
      start_date_error,
      com_date_error,
    } = this.state;
    const { classes } = this.props;
    const { rightHalf, leftHalf, fullWidth } = allDropDownWidth;
    return (
      <div className={'basic-pro-container'}>
        <div className="save-pro-header">
          <div className="save-discard">
            <CustomTag
              text="Save"
              //onClick={this.createItem}
              className="save"
              onclick={this.props.onclick}
            />
            <CustomTag text="Cancel" className="cancel_btn" onclick={this.props.onclick} />
          </div>
          <div className="save-pro-details">
            <img src={dropdown} />
            <CustomTag text="Projects" className="mx-15" />
            <div className="shape">
              <div className="plus">+</div>
            </div>
          </div>
        </div>
        <div className="hr-line" />
        <div className="pro-box-1">
          <div>
            <CustomIcon
              icon={deleteIcon}
              className="delete-icon"
              // onclick={e => {
              //   this.props.deleteQualifications(qualification_id);
              // }}
            />
            <FormControl>
              <AutoCompleteNew
                label="Project Title"
                //value={course_name}
                method="get"
                name="project_title"
              />
            </FormControl>
          </div>

          <div className="wrapper">
            <div className="fres-text">Tag this project with your employment/education</div>
            <div className="fifth full-form-child">
              <FormControl className={'form-child left-child-form ' + classes.formControl}>
                <AutoCompleteNew label="Role" width={fullWidth} method="get" />
              </FormControl>
              <FormControl className="form-child">
                <AutoCompleteNew label="Qualification" width={rightHalf} method="get" />
              </FormControl>
            </div>
          </div>
          <FormControl>
            <AutoCompleteNew
              label="Client"
              onClose={(name, data) => {
                if (data != null && data.value !== '') this.setParticularState(data);
              }}
              //width={rightHalf}
              //apiUrl={JOB_ROLE}
              filterKey={'value'}
              method="get"
              //selectedValues={[job_role]}
            />
            {/* <FormHelperText >{job_role_error}</FormHelperText> */}
          </FormControl>

          <div className="box-pro">
            <div className="fres-text">Project Status</div>
            <div className="wrapper1">
              {/* <div className="fifth full-form-child box1"> */}
              <FormControl component="fieldset" className="radio-button-control">
                <RadioGroup
                  aria-label="Gender"
                  className="search-radio-buttons wrapper1"
                  //value={this.state.value}
                  onChange={this.handleChange}
                >
                  <FormControlLabel value="yes" control={<Radio />} label="In Progress" />
                  <FormControlLabel value="no" control={<Radio />} label="Completed" />
                </RadioGroup>
              </FormControl>
              <Grid container spacing={32} style={{ marginTop: '-35px' }}>
                <Grid item xs={12} md={6}>
                  <FormControl
                    style={{ width: '100%' }}
                    className="form-child"
                    error={start_date_error ? true : false}
                  >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        id="start_date"
                        name="start_date"
                        margin="normal"
                        label="Start Date"
                        value={start_date}
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
                    {start_date_error && <FormHelperText>{start_date_error}</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl
                    style={{ width: '100%' }}
                    className="form-child"
                    error={com_date_error ? true : false}
                  >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        id="com_date"
                        name="com_date"
                        margin="normal"
                        label="Completion Date"
                        value={com_date}
                        views={['year', 'month']}
                        style={{ marginBottom: '0px', width: '100%' }}
                        maxDate={new Date()}
                        minDate={new Date(start_date)}
                        onChange={value =>
                          this.handleInput({ target: { value: value, name: 'com_date' } }, true)
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
                    {com_date_error && <FormHelperText>{com_date_error}</FormHelperText>}
                  </FormControl>
                </Grid>
              </Grid>
              {/* </div> */}
              {/* <div className="year-month1">
                <FormControl style={{ marginTop: '10px' }}>
                  <DateTimePicker
                    label="Start Date"
                    //date={this.state.dateOfBirth}
                    onChangeDate={this.handleDateChange}
                    //selected={this.state.dateOfBirth ? this.state.dateOfBirth : null}
                  />
                </FormControl>
                <FormControl style={{ marginTop: '10px' }}>
                  <DateTimePicker
                    label="End Date"
                    //date={this.state.dateOfBirth}
                    onChangeDate={this.handleDateChange}
                    //selected={this.state.dateOfBirth ? this.state.dateOfBirth : null}
                  />
                </FormControl>
              </div> */}
            </div>
          </div>

          <FormControl className="">
            <AutoCompleteNew
              label="Details of Project"
              // onClose={(name, data) => {
              //   if (data != null && data.value !== '') this.setParticularState(data);
              // }}
              //width={rightHalf}
              //apiUrl={JOB_ROLE}
              //filterKey={'value'}
              method="get"
              //selectedValues={[job_role]}
              name="project_details"
            />
            {/* <FormHelperText >{job_role_error}</FormHelperText> */}
          </FormControl>
          <div className="character-info-section">
            <CustomTag text="Minimum Character left : " className="character-left" />
            <CustomTag
              text={project_details === '' ? 300 : 300 - project_details.length}
              className="count"
            />
          </div>
          <div className="more-details">
            <div
              style={{
                width: '124px',
                height: '19px',
                fontSize: '16px',
                color: '#e73a9e',
                font: 'bold',
              }}
            >
              Add more details
            </div>
            <Input
              id="loc"
              placeholder="Project Location"
              className="loc"
              // onChange={this.handleChange('name')}
              margin="normal"
              width="100%"
              //style={{ marginTop: '30px' }}
            />
            <div className="fres-text">Project site</div>
            <div className="box2">
              <div className="yes-no">
                <FormControl component="fieldset" className="radio-button-control">
                  <RadioGroup
                    aria-label="Gender"
                    className="search-radio-buttons"
                    //value={this.state.value}
                    onChange={this.handleChange}
                  >
                    <FormControlLabel value="yes" control={<Radio />} label="Offsite" />
                    <FormControlLabel value="no" control={<Radio />} label="Onsite" />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
            <div className="fres-text">Nature of Project</div>
            <div className="box2">
              <div className="yes-no">
                <FormControl component="fieldset" className="radio-button-control">
                  <RadioGroup
                    aria-label="Gender"
                    className="search-radio-buttons"
                    //value={this.state.value}
                    onChange={this.handleChange}
                  >
                    <FormControlLabel value="yes" control={<Radio />} label="Full time" />
                    <FormControlLabel value="no" control={<Radio />} label="Part time" />
                    <FormControlLabel value="tr" control={<Radio />} label="Trainee" />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>

            <div className="fourth full-form-child">
              <FormControl className={'form-child ' + classes.formControl}>
                <InputLabel
                  classes={{ root: classes.helperText }}
                  classes={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  }}
                >
                  Team Size
                </InputLabel>
                <Input
                  //name="number_of_vacancy"
                  // className={classes.Input}
                  //value={number_of_vacancy}
                  classes={{
                    underline: classes.cssUnderline,
                    focused: classes.cssFocused,
                  }}
                  type="number"
                  margin="normal"
                  // onChange={this.onInputChange}
                  // onBlur={this.handleBlur}
                />
              </FormControl>
              <FormControl
                style={{ marginLeft: '30px' }}
                className={'form-child ' + classes.formControl}
              >
                <InputLabel
                  classes={{ root: classes.helperText }}
                  classes={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  }}
                >
                  Role
                </InputLabel>
                <Input
                  //name="number_of_vacancy"
                  // className={classes.Input}
                  //value={number_of_vacancy}
                  classes={{
                    underline: classes.cssUnderline,
                    focused: classes.cssFocused,
                  }}
                  type="text"
                  margin="normal"
                  // onChange={this.onInputChange}
                  // onBlur={this.handleBlur}
                />
              </FormControl>
            </div>
            <div>
              <Input
                id="role_dsc"
                placeholder="Role Description"
                className="role_dsc"
                // onChange={this.handleChange('name')}
                margin="normal"
                //style={{ marginTop: '30px' }}
              />
              <div className="character-info-section">
                <CustomTag text="Minimum Character left : " className="character-left" />
                <CustomTag text={role_dsc === '' ? 250 : 250 - role_dsc.length} className="count" />
              </div>
            </div>
            <Input
              id="key_skills"
              placeholder="Key Skills"
              className="key_skills"
              // onChange={this.handleChange('name')}
              margin="normal"
              //style={{ marginTop: '30px' }}
            />
            <Grid container spacing={16}>
              <Grid item xs={12}>
                <FormControl style={{ width: '100%' }} error={this.state.file_error !== ''}>
                  <InputLabel htmlFor="adornment-password" style={{ fontSize: '14px' }}>
                    Aadhar Card
                  </InputLabel>
                  <label htmlFor="contained-button-file" style={{ width: '30%' }}>
                    <Button
                      style={{ marginTop: '45px' }}
                      variant="contained"
                      component="span"
                      className="default_button"
                    >
                      Upload
                    </Button>
                  </label>
                  {this.state.aadhar_file_name ? (
                    <span id="aadhar-upload">
                      {this.state.aadhar_file_name}
                      <CustomIcon icon={close} onClick={this.onFileClear} />
                    </span>
                  ) : null}
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple={false}
                    type="file"
                    onChange={e => {
                      this.onFileUpload(e);
                    }}
                    onClick={event => {
                      event.target.value = null;
                    }}
                  />
                  {/* <FormHelperText error={this.state.file_error !== ''} id="file_error">
                  <span className="field_error">
                    {this.state.file_error}
                  </span>
                </FormHelperText> */}
                </FormControl>
              </Grid>
            </Grid>
            {/* <div className="section-body">
              <input placeholder="Key Skills" className="w-full" />
              <div className="mt-md">
                <span className="badge">test</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(UserProjects);
