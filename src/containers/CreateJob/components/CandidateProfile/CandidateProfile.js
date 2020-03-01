//library dependencies
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  withStyles, FormControlLabel, FormControl, FormHelperText, Checkbox, Radio, Tooltip, FormLabel,
  Input, Modal, InputLabel, createMuiTheme, MuiThemeProvider
} from '@material-ui/core';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

//style
import './style.scss';
import customisedMaterial from '../../../../styles/customisedMaterial';
//icons
import question from '../../../../../assets/media/icons/question.svg';

//custom components
import CustomTag from '../../../../components/CustomTag';
import SelectSpecialization from '../../../../components/SelectSpecialization';
import CustomIcon from '../../../../components/CustomIcon';
import NonCreatableRemoteDataMultiSelectDropdown
  from "../../../../components/MultiSelectDropdownWrapper/components/NonCreatableRemoteDataMultiSelectDropdown/NonCreatableRemoteDataMultiSelectDropdown";
import CreatableRemoteMultiDropDown
  from "../../../../components/MultiSelectDropdownWrapper/components/CreatableRemoteMultiDropDown/CreatableRemoteMultiDropDown";
import ConformationDialog from "../../../../components/ConformationDialog/ConformationDialog";

//utilities
import {
  POST_JOB, POST_JOB_GET_ORGANISATION, POST_JOB_SPECIFY_QUALIFICATION, POST_JOB_SPECIFY_PHD_QUALIFICATION,
  POST_JOB_SPECIFY_SPECIALISATION, POST_JOBS_GET_DETAILS, INDUSTRY, KEY_SKILLS
} from '../../../../../config/constants';
import {
  handleLocalStorage,
  apiCall,
  isObjectAlreadyExist,
  calculateTotalCount,
  customIndexOf,
  commaSeperated
} from '../../../../Utilities/';
import * as actions from '../../../../actions/createAJob'

// customised material ui style
const theme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        'min-width': '262px',
        'min-height': '78px',
        'fontFamily': 'Roboto',
        'fontSize': '14px',
        'fontWeight': 'normal',
        'fontStyle': 'normal',
        'fontStretch': 'normal',
        'lineHeight': 'normal',
        'letterSpacing': 'normal',
        'textAlign': 'start',
        'color': '#626366',
        'backgroundColor': '#FFFFFF',
        'borderRadius': '4px',
        'boxShadow': `0 1px 2px 0 rgba(0, 0, 0, 0.1)`,
        'border': ` solid 1px #dbdbdb`,
        'paddingTop': '12px',
        'paddingRight': '9px',
        'paddingBottom': '18px',
        'paddingLeft': '14px',
        'boxSizing': 'border-box'
      }
    }
  }
});
// customised material ui style
const styles = theme => ({
  ...customisedMaterial,
  label: {fontSize: '20px', fontWeight: '500', color: '#212121'},
  root: {display: 'flex', flexWrap: 'wrap',},
  margin: {margin: theme.spacing.unit,},
  withoutLabel: {marginTop: theme.spacing.unit * 3,},
  textField: {flexBasis: 200,},
  label2: {fontSize: '16px', color: '#212121'},
  removeAllSpec: {
    width: '47.5%',
    textAlign: 'right',
    marginTop: '-12px',
    fontSize: '14px',
    color: '#e73a9e',
    fontFamily: 'Roboto',
    cursor: 'pointer'
  },
  tootipQuestionMark: {marginTop: '6px', cursor: 'pointer', width: '12.6px!important'},
});

const encourageText = "Back to work is an initiative which means if the woman was on break for a long time, can start working again";

const notVisibleToolTip = "This job shall not be visible to the mentioned organisation, and this information won’t appear anywhere to the jobseeker";

const visibleToolTip = "This job shall be visible to only specified organisation, and this information won’t appear anywhere to the jobseeker";

const ApplyAllVisibleToolTip = "This is applicable for all.";

class CandidateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job_id: this.props.match.params.jobId,
      back_to_work_error: '',
      job_for_specified_organisation_error: '',
      job_not_visible_for_specified_organisation_error: '',
      organisation_name_error: '',
      qualification_error: '',
      specialisations_error: '',
      phd_qualification_error: '',
      phd_specialisations_error: '',
      qualification_premier_error: '',
      qualification_phd_premier_error: '',
      desired_candidate_error: '',
      job_for_all_organisation: true,
      job_is_for_organisation: 2,
      specialisations: [],
      phd_specialisations: [],
      qualification_premier_modal: false,
      ...props.candidate_profile
    }
  }

  /**
   * on click save as draft button
   * @return: redirect to saved jobs page after save the data
   * */

  saveAsDraft = async () => {
    const sendingData = {
      candidate_profile: this.state,
      id: this.props.match.params.jobId || ""
    };
    const headers = {'authorization': handleLocalStorage("get", "employerLogin"), 'Content-Type': 'application/json',};
    const data = await apiCall('post', sendingData, POST_JOB, headers);
    if (data.status) {
      this.props.history.push(this.props.match.url.replace(`create-a-job/${this.props.match.params.jobId}/candidate-profile`, 'employer-saved-jobs'));
    }
  };

  /**
   * on change of desired candidate field
   * @param: event
   * @return: validate and updating state
   * */
  onCandidateProfileChange = e => {
    const {name, value} = e.target;
    if (value.length <= 300) this.setState({[name]: value}) //validate and update the state
  };

  /**
   * on change values in input fields
   * @param: event
   * @return: updating state
   * */
  onInputChange = e => {
    const {name, value} = e.target;
    this.setState({[name]: value})
  };

  /**
   * on change checkbox and radio button in the form
   * @param: event,value
   * @return: updating state
   * */
  handleStateChange = (e, value) => {
    const {name} = e.target;
    this.setState({[name]: value})
  };

  /**
   * on change options from  the drop down components
   * @param: fieldName,selectedOption
   * @return: updating state
   * */
  setValuetoChips = (fieldName, selectedOption) => {
    const newSpecialisation = [];
    const newPhdSpecialisation = [];
    const opt = this.state[fieldName];
    if (fieldName === 'qualification') { //for qualification
      this.state.specialisations.map(value => {
        selectedOption.map(item => {
          if (item.value === value.parent_key) {
            newSpecialisation.push(value)
          }
        })
      });
      this.setState({specialisations: newSpecialisation}) //update qualification specialisation
    }
    if (fieldName === 'phd_qualification') { //for phd qualification
      this.state.phd_specialisations.map(value => {
        selectedOption.map(item => {
          if (item.value === value.parent_key) {
            newPhdSpecialisation.push(value)
          }
        })
      });
      this.setState({phd_specialisations: newPhdSpecialisation}) // update phd specialisation
    }
    if (selectedOption.length > 0) {
      for (let option of selectedOption) {
        let index = opt.findIndex((optionSeleced) => optionSeleced.key === option.value);
        if (index > -1) {
        } else opt.push({key: option.value, value: option.label})
      }
      this.setState({[fieldName]: opt}, () => {
        this.handleAllQualificationChange(fieldName);
        this.validateField(fieldName)
      })
    } else {

      if (fieldName === 'qualification') this.setSpecialization('specialisations', []);

      else if (fieldName === 'phd_qualification') this.setSpecialization('phd_specialisations', []);

      this.setState({[fieldName]: []}, () => this.handleAllQualificationChange(fieldName))
    }
  };

  /**
   *
   * @param fieldError
   * @param errorHandler
   */
  onErrorChange(fieldError, errorHandler) {
  }

  /**
   * On change in Qualification and phd qualification,updating specialisation by calling a function
   * @param: name
   * @return: updating state
   * */
  handleAllQualificationChange = (name) => {
    if (name === "qualification") this.handleQualificationChange();
    else if (name === "phd_qualification") this.handlephdQualificationChange();
  };

  /**
   * on select the specialisation,updating the state
   * @return: updating state
   * */
  setSpecialization = (name, value) => {
    this.setState({[name]: [...value]})
  };

  /**
   * To validate organisation
   * @return: update the state with error message
   * */
  validateOrganisation = () => {
    const {organisation_name, job_is_for_organisation} = this.state;
    let errorHere = "";
    if (job_is_for_organisation !== 2) {
      if (organisation_name.length === 0) errorHere = " Kindly Specify atleast 1 organisation";
    }
    this.setState({organisation_name_error: errorHere})
  };

  /**
   * To validate qualification
   * @return: update the state with error message
   * */
  validateQualification = () => {
    const {qualification} = this.state;
    let errorHere = "";
    if (qualification.length === 0) errorHere = "Kindly select atleast 1 qualification";
    this.setState({qualification_error: errorHere});
  };

  /**
   * To validate phd qualification
   * @return: update the state with error message
   * */
  validatePhdQualification = () => {
    const {phd_qualification} = this.state;
    let errorHere = "";
    if (phd_qualification.length === 0) errorHere = "Kindly select atleast 1 qualification";
    this.setState({phd_qualification_error: errorHere});
  };

  /**
   * To validate all the fields one by one
   * @return: calling a function and pass the fields name
   * */

  validateAllFields = () => {
    const fields = ['job_not_visible_for_specified_organisation', 'organisation_name', 'qualification', 'specialisations',
      'phd_qualification', 'phd_specialisations', 'desired_candidate'];
    fields.forEach(field => this.validateField(field));
  };

  /**
   * To validate the fields
   * @return: calling a functions.
   * */
  validateField = (name) => {
    switch (name) {
      case 'organisation_name':
        this.validateOrganisation();
        break;
      case 'qualification':
        this.validateQualification();
        break;
      case 'phd_qualification':
        this.validatePhdQualification();
        break;
    }
  };

  /**
   * validate form To submit,checking error
   * @return: boolean
   * */
  isFormValid = () => {
    const errorFields = ['back_to_work_error', 'job_for_specified_organisation_error', 'job_not_visible_for_specified_organisation_error', 'organisation_name_error',
      'qualification_error', 'specialisations_error', 'phd_qualification_error', 'phd_specialisations_error', 'qualification_premier_error',
      'qualification_phd_premier_error', 'desired_candidate_error'];
    let isValid = true;
    for (let i = 0; i < errorFields.length; i++) {
      if (this.state[errorFields[i]] !== "") isValid = false;
    }
    return isValid;
  };

  /**
   * on click of cancel button and close icon , closing confirmation dialog box
   * @return: updating the state
   * */
  closeQualificationPremierModal = () => {
    this.setState({qualification_premier_modal: false})
  };

  /**
   * To validate mandatory field
   * @return: if valid, calling a function to save the data.
   * */
  handleSubmit = async (e) => {
    await this.validateAllFields(); // calling a function to validate fields
    const isValid = await this.isFormValid();// calling a function to check an error if any
    if (isValid) {
      if (this.state.qualification_premier || this.state.qualification_phd_premier) this.setState({qualification_premier_modal: true});
      else this.saveData();
    }
  };

  /**
   * on click of next button ,saving the detail after validation
   * @return: redirect to next tab after successfully saved
   * */
  saveData = async () => {
    const AnySelectedQualification = this.state.specialisations.filter(value => value.is_parent === 'any');
    const ModifieddataQualification = this.state.specialisations.map(value => {
      AnySelectedQualification.forEach(values => {
        if (values.parent_key === value.parent_key) {
          value.value = values.value
        }
      });
      return value
    });
    const AnySelectedPhdQualification = this.state.phd_specialisations.filter(value => value.is_parent === 'any');
    const ModifieddataPhdQualification = this.state.phd_specialisations.map(value => {
      AnySelectedPhdQualification.forEach(values => {
        if (values.parent_key === value.parent_key) {
          value.value = values.value
        }
      });
      return value
    });
    this.setState({qualification_premier_modal: false});
    const newSendingdata = this.state;
    newSendingdata.specialisations = ModifieddataQualification;
    newSendingdata.phd_specialisations = ModifieddataPhdQualification;
    const sendingData = {candidate_profile: newSendingdata, id: this.props.match.params.jobId};
    const headers = {'authorization': handleLocalStorage("get", "employerLogin"), 'Content-Type': 'application/json',};
    const responseData = await apiCall('post', sendingData, POST_JOB, headers);
    if (responseData.status) {
      this.props.history.push(this.props.match.url.replace('candidate-profile', 'manage-responses'));
    }
  };

  componentDidMount() {

    // creating reference of this component to save as draft
    this.getInitialisedData();
    this.props.onRef(this)
  }

  componentWillUnMount() {
    this.props.onRef(null)
  }

  /**
   * To get the data of previous job id
   * @return: calling a function and passing job id
   * */
  getInitialisedData = () => {
    const {candidate_profile_from_previous_job} = this.props;
    if (candidate_profile_from_previous_job !== null) this.changeReduxStore(this.props.match.params.jobId);
    else this.changeReduxStore(this.props.match.params.jobId);
  };

  /**
   * To get the data from an api and update the component state
   * @param id
   * @return: candidate data and updating the specialisation of according to qualification
   * */

  changeReduxStore = async (id = this.props.match.params.jobId) => {
    const newSendingData = {id: id};
    const headers = {'authorization': handleLocalStorage("get", "employerLogin"), 'Content-Type': 'application/json',};
    const jobData = await apiCall('get', newSendingData, POST_JOBS_GET_DETAILS, headers);

    if (jobData.status) {
      let specialisations = [];
      let phdSpecialisations = [];
      const QualificationSpecialisation = jobData.data.candidate_profile.specialisations.filter(value => value.is_parent === 'any');
      const QualificationKeys = QualificationSpecialisation.map(value => {
        return value.parent_key
      });
      const qualificationSendingdata = {id: QualificationKeys};
      const QualificationModified = await apiCall('post', qualificationSendingdata, POST_JOB_SPECIFY_SPECIALISATION, headers);
      if (QualificationModified.status) {
        specialisations = QualificationModified.data.filter(value => value.is_parent === "child");
        if (specialisations && specialisations.length > 0) {
          jobData.data.candidate_profile.specialisations = [...jobData.data.candidate_profile.specialisations, ...specialisations]
        }
      }
      const PhdQualificationSpecialisation = jobData.data.candidate_profile.phd_specialisations.filter(value => value.is_parent === 'any');
      const PhdQualificationKeys = PhdQualificationSpecialisation.map(value => {
        return value.parent_key
      });
      const phdQualificationSendingdata = {id: PhdQualificationKeys};
      const PhdQualificationModified = await apiCall('post', phdQualificationSendingdata, POST_JOB_SPECIFY_SPECIALISATION, headers);
      if (PhdQualificationModified.status) {
        phdSpecialisations = PhdQualificationModified.data.filter(value => value.is_parent === "child");
        if (phdSpecialisations && phdSpecialisations.length > 0) {
          jobData.data.candidate_profile.phd_specialisations = [...jobData.data.candidate_profile.phd_specialisations, ...phdSpecialisations]
        }
      }
      this.props.updateCandidateProfile(this.state);
      this.setState({...jobData.data.candidate_profile},
        () => {
          this.handlephdQualificationChange(); //calling a function  to update qualification
          this.handleQualificationChange() //calling a function to update specialisation of qualificqation
        })
    }
  };

  /**
   * To get all the keys from an array of objects
   * @param arrayData
   * @return: keys of an array of objects
   * */
  getAllKeys = (arrayData) => {
    let keysArray = [];
    arrayData.forEach(singleData => {
      keysArray.push(singleData.key)
    });
    return keysArray
  };

  /**
   * on click of remove all button of the phd qualification
   * @return: calling a function to update the state
   * */
  removePhdQualificationSpec = () => {
    this.setSpecialization('phd_specialisations', [])
  };

  /**
   * on click of remove all button of the qualification
   * @return: calling a function to update the state
   * */
  removeQualificationSpec = () => {
    this.setSpecialization('specialisations', [])
  };

  /**
   * To update the specialisation of qualification
   * @return: calling an api to get specialisation according to qualification
   * */
  handleQualificationChange = async () => {
    const sendingData = {
      id: await this.getAllKeys(this.state.qualification) //sending selected qualification
    };
    const headers = {
      'authorization': handleLocalStorage("get", "employerLogin"),
      'Content-Type': 'application/json',
    };
    const newData = await apiCall('post', sendingData, POST_JOB_SPECIFY_SPECIALISATION, headers);

    if (newData.status) { //update state with new qualification specialisation
      this.setState({specialisation_data_source: newData.data});
    }
  };
  /**
   * To update the specialisation of phd qualification
   * @return: calling an api to get specialisation according to phd qualification
   * */
  handlephdQualificationChange = async () => {
    const sendingData = {
      id: await this.getAllKeys(this.state.phd_qualification) //sending selected phd qualification
    };
    const headers = {'authorization': handleLocalStorage("get", "employerLogin"), 'Content-Type': 'application/json',};
    const newData = await apiCall('post', sendingData, POST_JOB_SPECIFY_SPECIALISATION, headers);
    if (newData.status) { //update state with new phd specialisation
      this.setState({phd_specialisation_data_source: newData.data})
    }
  };

  render() {
    const {classes} = this.props;
    const {
      back_to_work, job_for_specified_organisation, job_not_visible_for_specified_organisation, organisation_name,
      qualification, specialisations, phd_qualification, phd_specialisations,
      qualification_premier, qualification_phd_premier, desired_candidate, specialisation_data, specialisation_data_source,
      phd_specialisation_data_source
    } = this.state;
    const {
      back_to_work_error, job_for_specified_organisation_error, job_not_visible_for_specified_organisation_error, organisation_name_error,
      qualification_error, specialisations_error, phd_qualification_error, phd_specialisations_error, qualification_premier_error,
      qualification_phd_premier_error, desired_candidate_error, job_for_all_organisation, job_is_for_organisation
    } = this.state;

    return (
      <div className="candidate-profile-container">
        <div className="we-encourage">
          <FormControl className="checkbox-form">
            <FormControlLabel
              classes={{label: classes.label}}
              control={
                <Checkbox
                  name="back_to_work"
                  classes={{root: classes.root}}
                  checked={!!back_to_work}
                  onChange={this.handleStateChange}
                />
              }
              label="We encourage back to work"
            />
          </FormControl>
          <MuiThemeProvider theme={theme}>
            <Tooltip disableFocusListener disableTouchListener title={encourageText} placement="bottom">
              <span className="combined-shape"><CustomIcon icon={question}
                                                           iconStyle={classes.tootipQuestionMark}/></span>
            </Tooltip>
          </MuiThemeProvider>
        </div>
        <div className="row-2">
          <div className="specified-organisation">
            <FormControl className="checkbox-form">
              <FormControlLabel
                classes={{label: classes.label2}}
                control={
                  <Radio
                    checked={job_is_for_organisation === 0}
                    onChange={(e) => this.handleStateChange(e, 0)}
                    value="b"
                    name="job_is_for_organisation"
                    aria-label="B"
                  />
                }
                label="This job is for the specified organization"
              />
            </FormControl>
            <MuiThemeProvider theme={theme}>
              <Tooltip disableFocusListener disableTouchListener title={visibleToolTip} placement="bottom">
                <span className="combined-shape"><CustomIcon icon={question}
                                                             iconStyle={classes.tootipQuestionMark}/></span>
              </Tooltip>
            </MuiThemeProvider>
          </div>
          <div className="visibility">
            <FormControl className="checkbox-form">
              <FormControlLabel
                classes={{label: classes.label2}}
                control={
                  <Radio
                    checked={job_is_for_organisation === 1}
                    value="b"
                    name="job_is_for_organisation"
                    aria-label="B"
                    onChange={(e) => this.handleStateChange(e, 1)}
                  />
                }
                label="This job should not be visible for the selected organization"
              />
            </FormControl>
            <MuiThemeProvider theme={theme}>
              <Tooltip disableFocusListener disableTouchListener title={notVisibleToolTip} placement="bottom">
                <span className="combined-shape"><CustomIcon icon={question}
                                                             iconStyle={classes.tootipQuestionMark}/></span>
              </Tooltip>
            </MuiThemeProvider>
          </div>
          <div className="visibility">
            <FormControl className="checkbox-form">
              <FormControlLabel
                classes={{label: classes.label2}}
                control={
                  <Radio
                    checked={job_is_for_organisation === 2}
                    value="b"
                    name="job_is_for_organisation"
                    aria-label="B"
                    onChange={(e) => this.handleStateChange(e, 2)}
                  />
                }
                label="Apply for all"
              />
            </FormControl>
            <MuiThemeProvider theme={theme}>
              <Tooltip disableFocusListener disableTouchListener title={ApplyAllVisibleToolTip} placement="bottom">
                <span className="combined-shape"><CustomIcon icon={question}
                                                             iconStyle={classes.tootipQuestionMark}/></span>
              </Tooltip>
            </MuiThemeProvider>
          </div>
        </div>
        {job_is_for_organisation !== 2 ?
          <div className="organisation">
            <FormControl
              style={{width: '47.5%', marginTop: '20px', marginBottom: '20px'}}
            >
              <InputLabel
                style={{marginTop: '-20px'}}
                className="change-label-style"
                shrink={true}
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                  error: classes.cssError
                }}
              >
                <div style={{display: 'flex'}}>
                  <span>{'Organisation Name'}</span>
                  <Tooltip disableFocusListener disableTouchListener
                           title={"You can type and search your organisation name here. If it's not there, you can add a new one"}
                           placement="bottom">
                    <span className="combined-shape" style={{marginLeft: '8px', marginTop: '-2px'}}><CustomIcon
                      icon={question} iconStyle={classes.tootipQuestionMark}/></span>
                  </Tooltip>
                </div>
              </InputLabel>
              <CreatableRemoteMultiDropDown
                isSearchable={true}
                apiUrl={POST_JOB_GET_ORGANISATION}
                queryParams={{search: ''}}
                getSelectedOption={(option) =>
                  this.setValuetoChips('organisation_name', option)}
                editable={true}
                maxOptions={50}
                defaultValue={this.state.organisation_name}
                error={this.state.organisation_name_error}
                gettingError={(error) => this.onErrorChange('skills_error', error)}
              >
              </CreatableRemoteMultiDropDown>
            </FormControl>
          </div>
          :
          null}
        <div className="qualification">
          <div className="qualification-select">
            <FormControl
              style={{width: '100%', marginTop: '20px'}}
            >
              <InputLabel
                style={{marginTop: '-20px'}}
                className="change-label-style"
                shrink={true}
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                  error: classes.cssError
                }}
              >{'Select Qualification'}
              </InputLabel>
              <NonCreatableRemoteDataMultiSelectDropdown
                isSearchable={true}
                showRemove={true}
                apiUrl={POST_JOB_SPECIFY_QUALIFICATION}
                queryParams={{search: ''}}
                getSelectedOption={(option) =>
                  this.setValuetoChips('qualification', option)}
                editable={true}
                isClearable={true}
                defaultValue={this.state.qualification}
                error={this.state.qualification_error}
                gettingError={(error) => this.onErrorChange('qualification_error', error)}
              >
              </NonCreatableRemoteDataMultiSelectDropdown>
            </FormControl>
          </div>

          <div className="institute">
            <FormControl className="" style={{paddingTop: "23px"}}>
              <FormControlLabel
                classes={{label: classes.label2}}
                control={
                  <Checkbox
                    name="qualification_premier"
                    classes={{root: classes.root}}
                    checked={qualification_premier}
                    onChange={this.handleStateChange}
                  />
                }
                label="Looking for candidates from "
              />
            </FormControl>
            <CustomTag text="Premier Universities/Colleges" className="premium-text"/>
          </div>
        </div>
        <div className="specialisation">
          <SelectSpecialization
            label="Select Specialisation"
            dataSource={specialisation_data_source}
            onChange={this.setSpecialization}
            name="specialisations"
            disable={this.state.qualification.length > 0 ? false : true}
            showError={specialisations_error}
            specialisationData={specialisations}
          />
          <div style={{display: 'flex', justifyContent: 'space-between', width: '47.5%'}}>
            <FormHelperText>{specialisations_error}</FormHelperText>
            <div className={classes.removeAllSpec} style={{marginTop: '12px'}}
                 onClick={this.removeQualificationSpec}>Remove all
            </div>
          </div>

        </div>
        <div className="phd-qualification">
          <div className="phd-qualification-select">
            <FormControl
              style={{width: '100%'}}
            >
              <InputLabel
                style={{marginTop: '-20px'}}
                className="change-label-style"
                shrink={true}
                classes={{root: classes.cssLabel, focused: classes.cssFocused, error: classes.cssError}}

              >
                {'Select Phd Qualification'}
              </InputLabel>
              <NonCreatableRemoteDataMultiSelectDropdown
                isSearchable={true}
                showRemove={true}
                apiUrl={POST_JOB_SPECIFY_PHD_QUALIFICATION}
                queryParams={{search: ''}}
                getSelectedOption={(option) =>
                  this.setValuetoChips('phd_qualification', option)}
                editable={true}
                defaultValue={this.state.phd_qualification}
                error={this.state.phd_qualification_error}
                gettingError={(error) => this.onErrorChange('phd_qualification_error', error)}
              >
              </NonCreatableRemoteDataMultiSelectDropdown>
            </FormControl>
          </div>
          <div className="institute">
            <FormControl className="" style={{paddingTop: "23px"}}>
              <FormControlLabel
                classes={{label: classes.label2}}
                control={
                  <Checkbox
                    name="qualification_phd_premier"
                    classes={{root: classes.root}}
                    checked={qualification_phd_premier}
                    onChange={this.handleStateChange}
                  />
                }
                label="Looking for candidates from "
              />
            </FormControl>
            <CustomTag text="Premier Universities/Colleges" className="premium-text"/>
          </div>
        </div>
        <div className="specialisation">
          <SelectSpecialization
            label="Select Phd Specialisation"
            dataSource={phd_specialisation_data_source}
            onChange={this.setSpecialization}
            name="phd_specialisations"
            disable={this.state.phd_qualification.length > 0 ? false : true}
            showError={phd_specialisations_error}
            specialisationData={phd_specialisations}
          />
          <FormControl
            style={{width: '47.5%'}}
            error={phd_specialisations_error !== ""}
          >
            <FormHelperText>{phd_specialisations_error}</FormHelperText>
          </FormControl>
          <div className={classes.removeAllSpec} onClick={this.removePhdQualificationSpec}>Remove all</div>
        </div>
        <FormControl
          error={desired_candidate_error}
        >
          <FormLabel classes={{
            root: classes.cssLabel,
            focused: classes.cssFocused,
          }}>
            Desired Candidate Profile</FormLabel>
          <Input
            name="desired_candidate"
            onChange={this.onCandidateProfileChange}
            value={desired_candidate}
            multiline={true}
            classes={{
              underline: classes.cssUnderline,
              focused: classes.cssFocused,
            }}
          >
          </Input>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <FormHelperText>{desired_candidate_error} </FormHelperText>
            <div className="character-info-section" style={{marginLeft: 'auto', marginTop: '8px'}}>
              <CustomTag text="Character left : " className="character-left"/>
              <CustomTag text={desired_candidate ? 300 - desired_candidate.length : 300} className="count"/>
            </div>
          </div>
        </FormControl>

        <div className="hr-line"></div>
        <div className="next-candidate-details">
          <button
            className="shenzyn-btn filled-primary-button px-48"
            saveText="Next"
            onClick={this.handleSubmit}
          >
            Next
          </button>
        </div>
        <div className="last-child-of-job-details"/>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.qualification_premier_modal}
          onClose={this.closeQualificationPremierModal}
        >
          <ConformationDialog
            actionType={this.state.actionType}
            conformationStatus={this.saveData}
            handleClose={this.closeQualificationPremierModal}
            Text="Yes"
            headingText="This job is only for the candidate from the premium institute"
          />
        </Modal>
      </div>
    );
  }
}

CandidateProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    candidate_profile: state.createAJob.candidate_profile ? JSON.parse(JSON.stringify(state.createAJob.candidate_profile)) : state.createAJob.candidate_profile,
    candidate_profile_from_previous_job: state.postJobModal.candidate_profile ? JSON.parse(JSON.stringify(state.postJobModal.candidate_profile)) : state.postJobModal.candidate_profile
  }
};

const mapDispatchToProps = dispatch => ({
  updateCandidateProfile: bindActionCreators(
    actions.updateCandidateProfile,
    dispatch,
  ),
  updateJobId: bindActionCreators(
    actions.updateJobId,
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CandidateProfile))
