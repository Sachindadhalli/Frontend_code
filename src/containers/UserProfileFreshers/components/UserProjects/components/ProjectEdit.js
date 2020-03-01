import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import CustomTag from '../../../../../components/CustomTag';
import CustomIcon from '../../../../../components/CustomIcon/CustomIcon';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AutoCompleteNew from '../../../../../components/AutoCompleteNew';
import calendar from '../../../../../../assets/media/icons/calendar.svg';
import DateFnsUtils from '@date-io/date-fns';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { TextField, withStyles } from '@material-ui/core';
import Checkbox from '@material-ui/core';
import deleteIcon from '../../../../../../assets/media/icons/deleteIcon.svg';
import untick from '../../../../../../assets/media/icons/untick.svg';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import UserBasicDetailsView from '../../../../UserProfileFresherView/components/UserBasicDetailsView/UserBasicDetailsView';
import customisedMaterial from '../../../../../styles/customisedMaterial';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import dropdown from '../../../../../../assets/media/icons/dropdown.svg';
import DateTimePicker from '../../../../../components/DateTimePicker';
import MultiSelect from '../../../../../components/MultiSelectDropDown/MultiSelect';
import { fileValidation, browserValidation, apiCall } from '../../../../../Utilities';
import { AADHAR_UPDATE, KEY_SKILLS } from '../../../../../../config/constants';
import CreatableRemoteDataSingleSelectDropdown from '../../../../../components/SingleSelectDropdownWrapper/components/CreatableRemoteDataSingleSelectDropdown/CreatableRemoteDataSingleSelectDropdown';
import AutoCompleteSearch from '../../../../../components/AutoCompleteSearch';
import ChipsForFields from '../../../../../components/EmployerJobPage/components/SectorsRoles/ChipsForFields/ChipsForFields';
import { DateFormatInput } from 'material-ui-next-pickers';

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
class ProjectEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project_details: '',
      key_skills: [],
      role_dsc: '',
      file_error: '',
      aadhar_file_name: null,
      project_title: '',
      role: '',
      qualification: '',
      client: '',
      start_date: '',
      end_date: '',
      details_of_project: '',
      project_location: '',
      team_size: '',
      role_input: '',
      role_description: '',
      project_title_error: '',
      role_error: '',
      qualification_error: '',
      client_error: '',
      start_date_error: '',
      end_date_error: '',
      details_of_project_error: '',
      project_location_error: '',
      team_size_error: '',
      role_input_error: '',
      role_description_error: '',
      key_skills_error: '',
    };
    this.onFileUpload = this.onFileUpload.bind(this);
    this.checkForErrors = this.checkForErrors.bind(this);
  }

  componentDidMount() {
    if (this.props.checkForErrors == true) {
      this.checkForErrors();
    }
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(null);
  }

  checkForErrors() {
    let error = false;
    if (typeof this.state.project_title === 'string' || this.state.project_title == '') {
      error = true;
      this.setState({
        project_title_error: 'Kindly specify your Project Title',
      });
    }
    if (typeof this.state.role === 'string' || this.state.role == '') {
      error = true;
      this.setState({
        role_error: 'Kindly specify your Role',
      });
    }
    if (typeof this.state.qualification === 'string' || this.state.qualification == '') {
      error = true;
      this.setState({
        qualification_error: 'Kindly specify your Qualification',
      });
    }
    if (typeof this.state.client === 'string' || this.state.client == '') {
      error = true;
      this.setState({
        client_error: 'Kindly specify your Client',
      });
    }
    if (typeof this.state.start_date === 'string' || this.state.start_date == '') {
      error = true;
      this.setState({
        start_date_error: 'Kindly specify your Start Date',
      });
    }
    if (typeof this.state.end_date === 'string' || this.state.end_date == '') {
      error = true;
      this.setState({
        end_date_error: 'Kindly specify your End Date',
      });
    }
    if (typeof this.state.project_location === 'string' || this.state.project_location == '') {
      error = true;
      this.setState({
        project_location_error: 'Kindly specify your Project Location',
      });
    }
    if (typeof this.state.team_size === 'string' || this.state.team_size == '') {
      error = true;
      this.setState({
        team_size_error: 'Kindly specify your Team Size',
      });
    }
    if (typeof this.state.role_input === 'string' || this.state.role_input == '') {
      error = true;
      this.setState({
        role_input_error: 'Kindly specify your Role',
      });
    }
    if (typeof this.state.role_description === 'string' || this.state.role_description == '') {
      error = true;
      this.setState({
        role_description_error: 'Kindly specify your Role Description',
      });
    }
    if (typeof this.state.key_skills === 'string' || this.state.key_skills == '') {
      error = true;
      this.setState({
        key_skills_error: 'Kindly specify your Key Skills',
      });
    }
  }

  resetErrors = () => {
    this.setState({
      project_title_error: '',
      role_error: '',
      qualification_error: '',
      client_error: '',
      start_date_error: '',
      end_date_error: '',
      details_of_project_error: '',
      project_location_error: '',
      team_size_error: '',
      role_input_error: '',
      role_description_error: '',
      key_skills_error: '',
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
  setDropdownOption = (option, name, validatorAfterSave = null) => {
    const opt = option ? { key: option.value, value: option.label } : '';
    this.setState(
      {
        [name]: opt,
        [`${name}_error`]: '',
      },
      () => {
        this.validateFields(name);
      },
    );
  };
  validateFields = fieldName => {
    switch (fieldName) {
      case 'project_title':
        this.validateProjectTitleForm();
        break;
      case 'role':
        this.validateRoleForm();
        break;
      case 'qualification':
        this.validateQualificationForm();
        break;
      case 'client':
        this.validateClientForm();
        break;
      case 'start_date':
        this.validateStartDateForm();
        break;
      case 'end_date':
        this.validateEndDateForm();
        break;
      case 'details_of_project':
        this.validateDetailsOfProjectForm();
        break;
      case 'project_location':
        this.validateProjectLocationForm();
        break;
      case 'team_size':
        this.validateTeamSizeForm();
        break;
      case 'role_input':
        this.validateRoleInputForm();
        break;
      case 'role_description':
        this.validateRoleDescriptionForm();
        break;
      case 'key_skills':
        this.validateKeySkillsForm();
        break;
    }
  };
  validateProjectTitleForm = async () => {
    let errorValue = '';
    if (!this.state.project_title) {
      errorValue = 'Kindly specify your Project Title';
    }
    this.setParticularField('project_title', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateRoleForm = async () => {
    let errorValue = '';
    if (!this.state.role || !this.state.role.value) {
      errorValue = 'Kindly specify your Role';
    }
    this.setParticularField('role', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateQualificationForm = async () => {
    let errorValue = '';
    if (!this.state.qualification || !this.state.qualification.value) {
      errorValue = 'Kindly specify your Qualification';
    }
    this.setParticularField('qualification', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateClientForm = async () => {
    let errorValue = '';
    if (!this.state.client || !this.state.client.value) {
      errorValue = 'Kindly specify your Project Client';
    }
    this.setParticularField('client', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateDetailsOfProjectForm = async () => {
    let errorValue = '';
    if (!this.state.details_of_project || !this.state.details_of_project.value) {
      errorValue = 'Kindly specify your Project Details';
    }
    this.setParticularField('details_of_project', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateProjectLocationForm = async () => {
    let errorValue = '';
    if (!this.state.project_location || !this.state.project_location.value) {
      errorValue = 'Kindly specify your Project Location';
    }
    this.setParticularField('project_location', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateTeamSizeForm = async () => {
    let errorValue = '';
    if (!this.state.team_size) {
      errorValue = 'Kindly specify your Team Size';
    }
    this.setParticularField('team_size', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateRoleInputForm = async () => {
    let errorValue = '';
    if (!this.state.role_input) {
      errorValue = 'Kindly specify your Role';
    }
    this.setParticularField('role_input', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateRoleDescriptionForm = async () => {
    let errorValue = '';
    if (!this.state.role_description || !this.state.role_description.value) {
      errorValue = 'Kindly specify your Role Descripton';
    }
    this.setParticularField('role_description', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateKeySkillsForm = async () => {
    let errorValue = '';
    if (!this.state.key_skills || !this.state.key_skills.value) {
      errorValue = 'Kindly specify your Key Skills';
    }
    this.setParticularField('key_skills', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  setParticularField = (name, value) => {
    const errorName = name + '_error';
    this.setState({
      [errorName]: value,
    });
  };
  checkFileSizeFF(files) {
    // debugger;
    const filesize = files[0].size;
    return filesize / (1024 * 1024) > 2;
  }

  checkFileSizeIE(file) {
    // debugger;
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

      //console.log(files);
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
                //console.log('Not uploaeded');
              }
            })
            .catch(e => {
              //console.log(e);
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
  // validateFields = fieldName => {
  //   switch (fieldName) {
  //     case 'start_date':
  //       this.validateStartDateForm();
  //       break;
  //     case 'com_date':
  //       this.validateCompleteDateForm();
  //       break;
  //   }
  // };

  pushElementIntoState = (fieldName, data) => {
    if (!data || !data.value) return; //don't insert empty values
    let fieldDataFromState = JSON.parse(JSON.stringify(this.state[fieldName]));
    //check for maximum allowed things
    // if (fieldDataFromState.length >= formMetaData[fieldName]['maxAllowed']) return;
    if (fieldName === 'key_skills' && data.value.length > 20) return;
    //don't push if already existed
    if (fieldDataFromState.find(value => value.value === data.value)) return;

    if (!data.key) data.key = data.value;

    fieldDataFromState.push(data);
    this.setState({ [fieldName]: fieldDataFromState });
  };
  //for displaying selected skills
  removeElementFromState = (fieldName, key) => {
    let fieldDataFromState = JSON.parse(JSON.stringify(this.state[fieldName]));
    fieldDataFromState.splice(key, 1);
    this.setState({ [fieldName]: fieldDataFromState });
  };
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
  render() {
    const {
      project_details,
      key_skills,
      role_dsc,
      project_title,
      role,
      qualification,
      client,
      start_date,
      end_date,
      details_of_project,
      project_location,
      team_size,
      role_input,
      role_description,
      project_title_error,
      role_error,
      qualification_error,
      client_error,
      start_date_error,
      end_date_error,
      details_of_project_error,
      project_location_error,
      team_size_error,
      role_input_error,
      role_description_error,
      key_skills_error,
    } = this.state;
    const { classes, isItEditMode } = this.props;
    const { rightHalf, dropdown, leftHalf, fullWidth, allDropDownWidth } = this.props;
    return (
      <div className={'basic-pro-container'}>
        {/* <div className="save-pro-header">
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
        <div className="hr-line" /> */}
        <div className="pro-box-1">
          <div>
            <div style={{ textAlign: 'right' }}>
              <CustomIcon
                style={{ float: 'right' }}
                icon={deleteIcon}
                className="delete-icon"
                // onclick={e => {
                //   this.props.deleteQualifications(qualification_id);
                // }}
              />
            </div>
            <FormControl className={'full-form-child ' + classes.formControl}>
              <InputLabel
                classes={{ root: classes.helperText }}
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                }}
                shrink={true}
                htmlFor="project_title"
              >
                Project Title
              </InputLabel>
              <Input
                name="project_title"
                type="text"
                value={this.state.project_title}
                onChange={this.handleInput}
                onBlur={() => this.validateFields('project_title')}
                onFocus={this.removeErrorFocus}
                autoComplete="off"
                error={project_title_error ? project_title_error : false}
              />
              {project_title_error ? (
                <FormHelperText error={project_title_error} id="firstName_error">
                  <span className="field_error">{project_title_error}</span>
                </FormHelperText>
              ) : null}
            </FormControl>
          </div>

          <div className="fres-text">Tag this project with your employment/education</div>
          {/* <div
              className="fifth full-form-child"
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <FormControl className={'form-child left-child-form ' + classes.formControl}>
                <AutoCompleteNew label="Role" width={fullWidth} method="get" />
              </FormControl>
              <FormControl className="form-child">
                <AutoCompleteNew label="Qualification" width={rightHalf} method="get" />
              </FormControl>
            </div>*/}
          <div className="fifth full-form-child">
            <FormControl
              className={'form-child left-child-form ' + classes.formControl}
              // error={industry_error != ''}
              style={{ marginTop: '13px', marginRight: '35px' }}
            >
              <InputLabel
                style={{ marginTop: '-12px' }}
                className="change-label-style"
                shrink={true}
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                  error: classes.cssError,
                }}
              >
                {'Role'}
              </InputLabel>

              <CreatableRemoteDataSingleSelectDropdown
                isSearchable={true}
                // apiUrl={INDUSTRY}
                queryParams={{ search: '' }}
                getSelectedOption={option => this.setDropdownOption(option, 'role')}
                defaultValue={role ? { value: role.key, label: role.value } : {}}
                isClearable={true}
                error={role_error ? role_error : false}
              />
              {role_error ? (
                <FormHelperText error={role_error} id="firstName_error">
                  <span className="field_error">{role_error}</span>
                </FormHelperText>
              ) : null}
            </FormControl>

            <FormControl
              className={'form-child left-child-form ' + classes.formControl}
              // error={industry_error != ''}
              style={{ marginTop: '13px' }}
            >
              <InputLabel
                style={{ marginTop: '-12px' }}
                className="change-label-style"
                shrink={true}
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                  error: classes.cssError,
                }}
              >
                {'Qualification'}
              </InputLabel>

              <CreatableRemoteDataSingleSelectDropdown
                isSearchable={true}
                // apiUrl={INDUSTRY}
                queryParams={{ search: '' }}
                getSelectedOption={option => this.setDropdownOption(option, 'qualification')}
                defaultValue={
                  qualification ? { value: qualification.key, label: qualification.value } : {}
                }
                isClearable={true}
                error={qualification_error ? qualification_error : false}
              />
              {qualification_error ? (
                <FormHelperText error={qualification_error} id="firstName_error">
                  <span className="field_error">{qualification_error}</span>
                </FormHelperText>
              ) : null}
            </FormControl>
          </div>
          <FormControl
            className={'full-form-child left-child-form ' + classes.formControl}
            // error={industry_error != ''}
            style={{ marginTop: '13px', marginRight: '35px' }}
          >
            <InputLabel
              style={{ marginTop: '-12px' }}
              className="change-label-style"
              shrink={true}
              classes={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
                error: classes.cssError,
              }}
            >
              {'Client'}
            </InputLabel>

            <CreatableRemoteDataSingleSelectDropdown
              isSearchable={true}
              // apiUrl={INDUSTRY}
              queryParams={{ search: '' }}
              getSelectedOption={option => this.setDropdownOption(option, 'client')}
              defaultValue={client ? { value: client.key, label: client.value } : {}}
              isClearable={true}
              error={client_error ? client_error : false}
            />
            {client_error ? (
              <FormHelperText error={client_error} id="firstName_error">
                <span className="field_error">{client_error}</span>
              </FormHelperText>
            ) : null}
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
              {/* <Grid
                container
                spacing={16}
                direction="row"
                justify="space-evenly"
                style={{ marginBottom: '20px' }}
              > */}
              <Grid item xs={4} style={{ marginRight: '10px' }}>
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
                    // FormControlProps={{
                    //   error:
                    //     this.state.allFieldsStatus['start_date'] && start_date_error !== '',
                    // }}
                    // onBlur={() => {
                    //   this.fieldTouched('start_date');
                    // }}
                    InputLabelProps={{
                      shrink: true,
                      // color:'#656565',
                      classes: {
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                        error: classes.cssError,
                      },
                    }}
                    // errorStyle={{ color: '#eaeaea' }}
                    // error={
                    //   this.state.allFieldsStatus['startdate'] ? (
                    //     <span style={{ color: '#f0582b' }}>{startdate_error}</span>
                    //   ) : null
                    // }
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
                    // onBlur={() => {
                    //   this.fieldTouched('enddate');
                    // }}
                    fullWidth={true}
                    // FormControlProps={{
                    //   error: this.state.allFieldsStatus['enddate'] && enddate_error !== '',
                    // }}
                    // error={
                    //   this.state.allFieldsStatus['enddate'] ? (
                    //     <span style={{ color: '#f0582b' }}>{enddate_error}</span>
                    //   ) : null
                    // }
                    InputLabelProps={{
                      shrink: true,
                      classes: {
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                        error: classes.cssError,
                      },
                    }}
                    max={new Date()}
                    label="Completion Date"
                    endIcon={<CustomIcon iconStyle="end-icon" icon={calendar} />}
                  />
                </FormControl>
              </Grid>
              {/* </Grid> */}
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

          <FormControl
            className={'full-form-child left-child-form ' + classes.formControl}
            // error={industry_error != ''}
            style={{ marginTop: '13px', marginRight: '35px' }}
          >
            <InputLabel
              style={{ marginTop: '-12px' }}
              className="change-label-style"
              shrink={true}
              classes={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
                error: classes.cssError,
              }}
            >
              {'Details of Project'}
            </InputLabel>

            <CreatableRemoteDataSingleSelectDropdown
              isSearchable={true}
              // apiUrl={INDUSTRY}
              queryParams={{ search: '' }}
              getSelectedOption={option => this.setDropdownOption(option, 'details_of_project')}
              defaultValue={
                details_of_project
                  ? { value: details_of_project.key, label: details_of_project.value }
                  : {}
              }
              isClearable={true}
              error={details_of_project_error ? details_of_project_error : false}
            />
            {details_of_project_error ? (
              <FormHelperText error={details_of_project_error} id="firstName_error">
                <span className="field_error">{details_of_project_error}</span>
              </FormHelperText>
            ) : null}
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
              Add more Details
            </div>
            {/* <Input
              id="loc"
              placeholder="Project Location"
              className="loc"
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
                htmlFor="salary"
              >
                Project Location
              </InputLabel>
              <Input
                name="project_location"
                type="number"
                //value={salary}
                onChange={this.handleInput}
                onBlur={() => this.validateFields('project_location')}
                onFocus={this.removeErrorFocus}
                autoComplete="off"
                error={project_location_error ? project_location_error : false}
              />
              {project_location_error ? (
                <FormHelperText error={project_location_error} id="firstName_error">
                  <span className="field_error">{project_location_error}</span>
                </FormHelperText>
              ) : null}
            </FormControl>

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
                  shrink={true}
                  htmlFor="team_size"
                >
                  Team Size
                </InputLabel>
                <Input
                  name="team_size"
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
                  onChange={this.handleInput}
                  onBlur={() => this.validateFields('team_size')}
                  onFocus={this.removeErrorFocus}
                  error={team_size_error ? team_size_error : false}
                />
                {team_size_error ? (
                  <FormHelperText error={team_size_error} id="firstName_error">
                    <span className="field_error">{team_size_error}</span>
                  </FormHelperText>
                ) : null}
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
                  shrink={true}
                  htmlFor="role_input"
                >
                  Role
                </InputLabel>
                <Input
                  name="role_input"
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
                  onChange={this.handleInput}
                  onBlur={() => this.validateFields('role_input')}
                  onFocus={this.removeErrorFocus}
                  autoComplete="off"
                  error={role_input_error ? role_input_error : false}
                />
                {role_input_error ? (
                  <FormHelperText error={role_input_error} id="firstName_error">
                    <span className="field_error">{role_input_error}</span>
                  </FormHelperText>
                ) : null}
              </FormControl>
            </div>
            <FormControl
              className={'full-form-child left-child-form ' + classes.formControl}
              // error={industry_error != ''}
              style={{ marginTop: '13px', marginRight: '35px' }}
            >
              <InputLabel
                style={{ marginTop: '-12px' }}
                className="change-label-style"
                shrink={true}
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                  error: classes.cssError,
                }}
              >
                {'Role Description'}
              </InputLabel>

              <CreatableRemoteDataSingleSelectDropdown
                isSearchable={true}
                // apiUrl={INDUSTRY}
                queryParams={{ search: '' }}
                getSelectedOption={option => this.setDropdownOption(option, 'role_description')}
                defaultValue={
                  role_description
                    ? { value: role_description.key, label: role_description.value }
                    : {}
                }
                isClearable={true}
                error={role_description_error ? role_description_error : false}
              />
              {role_description_error ? (
                <FormHelperText error={role_description_error} id="firstName_error">
                  <span className="field_error">{role_description_error}</span>
                </FormHelperText>
              ) : null}
            </FormControl>
            {/* <Input
              id="key_skills"
              placeholder="Key Skills"
              className="key_skills"
              // onChange={this.handleChange('name')}
              margin="normal"
              //style={{ marginTop: '30px' }}
            /> */}
            <AutoCompleteSearch
              // hintMessage={formMetaData['key_skills']}
              label="Key Skills"
              id="key_skills"
              type="text"
              selectedValues={[]}
              filterKey="value"
              apiUrl={KEY_SKILLS}
              //width="100% !important"
              //icon="drop-down"
              onClose={(name, data) => {
                if (data && data.value) this.pushElementIntoState('key_skills', data);
              }}
              queryWith="search"
              otherData={{ format: 'json' }}
              error={key_skills_error ? key_skills_error : false}
            />
            {key_skills_error ? (
              <FormHelperText error={key_skills_error} id="firstName_error">
                <span className="field_error">{key_skills_error}</span>
              </FormHelperText>
            ) : null}
            <ChipsForFields
              values={key_skills}
              isItEditMode={true}
              onDelete={key => {
                this.removeElementFromState('key_skills', key);
              }}
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
                  <FormHelperText error={this.state.file_error !== ''} id="file_error">
                    <span className="field_error">{this.state.file_error}</span>
                  </FormHelperText>
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

export default withStyles(styles)(ProjectEdit);
