//library dependency
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Checkbox, FormControl, FormControlLabel, FormHelperText, InputLabel} from '@material-ui/core';

//style
import './style.scss';

//custom components
import NonCreatableSingleSelectDropdown
  from '../../../../../../components/SingleSelectDropdownWrapper/components/NonCreatableSingleSelectDropdown';
import PreviousJobSearchField from './PreviousJobSearchField';

//utilities
import handleLocalStorage from '../../../../../../Utilities/handleLocalStorage';
import apiCall from '../../../../../../Utilities/apiCall';
import {CURRENT_SIMILAR_TO_PREVIOUS, POST_JOBS_GET_DETAILS} from '../../../../../../../config/constants';
import * as actions from '../../../../../../actions/PostJobModal';
import * as IHiredForAction from '../../../../../../actions/createAJob';

//icons
import close from '../../../../../../../assets/media/images/close.png';
import CustomIcon from '../../../../../../components/CustomIcon';
import defaultUntick from '../../../../../../../assets/media/icons/default_untick.svg';
import SaveAndCancelButton from '../SaveAndCancelButton';

//customised material ui style
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  cssLabel: {
    color: '#656565 !important',
    fontSize: '14px',
    fontFamily: 'Roboto',
    fontWeight: 400,
  },
  cssError: {
    color: '#656565 !important',
    fontSize: '14px',
    fontFamily: 'Roboto',
    fontWeight: 400,
  },
  checkbox: {
    margin: "0px"
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
  selectText: {
    color: 'black',
    fontSize: '14px',
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
  }
});

const hireForOptions = [{key: 1, value: "Startups",}, {key: 2, value: "Other MNCs",}, {
  key: 3, value: "Own Organization",}];

class PostJobModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      is_similar: false,
      hiring_for: "",
      hiring_for_error: '',
      previous_job: {
        job_title: "",
        id: null,
      },
      previous_job_error: "",
      form_error: "",
      is_previous_job_focused: false,
      sort: true,
      job_details: []
    }
  }

  /**
   * on selected previous job ,updating state
   * @param previousJob
   */
  setPreviousJob = (previousJob) => {
    this.setState({
      'previous_job': previousJob
    }, () => this.changePreviousJobFocus(null, false))
  }

  componentDidMount() {
    // updating the previous jobs in drop down from an api
    this.modifyJobDetails();
  }

  /**
   *
   * @param e
   * @param newState
   */
  changePreviousJobFocus = (e, newState = true) => {
    this.setState({
      is_previous_job_focused: newState
    })
  };
  /**
   * update the dropdown data of previous jobs
   * @returns {Promise<void>}
   */
  modifyJobDetails = async () => {
    const {sort, previous_job} = this.state;
    const sendingData = {
      sort: sort,
      search: previous_job.job_title,
      pagination: 1,
    }
    const headers = {
      'authorization': handleLocalStorage("get", "employerLogin"),
      'Content-Type': 'application/json',
    }
    const responseData = await apiCall('get', sendingData, CURRENT_SIMILAR_TO_PREVIOUS, headers);
    if (responseData.status) {
      this.setState({job_details: [...responseData.data]})
    }
  };

  /**
   * on change of value of fields,updating the state
   * @param name
   * @param value
   */
  setParticularState = (name, value) => {
    this.setState({
      [name]: value,
    })
  };
  /**
   * To validate the Previous job is selected or not
   * if checkbox selected for "is similar field"
   */
  validatePreviousJob = () => {
    const {previous_job} = this.state;
    if (previous_job == "") {
      this.setParticularState("previous_job_error", 'Kindly specify Previous Job')
    }
    else {
      this.setParticularState("previous_job_error", '')
    }
  };

  /**
   * to validate the "hire for" field
   */
  validateHireFor = () => {
    const {hiring_for} = this.state;
    if (hiring_for == "") {
      this.setParticularState("hiring_for_error", "Kindly specify hiring for")
    }
    else {
      this.setParticularState("hiring_for_error", "");
    }
  };

  /**
   * To validate all fields of post job modal
   * @param e
   * @returns {Promise<void>}
   * @constructor
   */
  ValidateFormData = async (e) => {
    e.preventDefault();
    await this.validateHireFor();
    await this.validatePreviousJob();
    const {hiring_for, previous_job, is_similar} = this.state;
    if (hiring_for && previous_job.id && is_similar) {
      this.saveFormData();
    } else if (hiring_for && !is_similar) {
      this.saveFormData();
    }
  }

  saveFormData = async () => {
    this.getSelectedJobData();
  };
  /**
   * on selected previous job id,calling an api to get the data
   * redirecting to create a job page with data
   *
   * @returns {Promise<void>}
   */
  getSelectedJobData = async () => {
    const {previous_job} = this.state;
    const sendingData = {
      id: previous_job.id || null
    }
    const headers = {
      'authorization': handleLocalStorage("get", "employerLogin"),
      'Content-Type': 'application/json',
    }
    const responseData = await apiCall('get', sendingData, POST_JOBS_GET_DETAILS, headers);
    if (responseData.status) {
      try {
        this.props.setPostJobModal(responseData.data);
        this.props.updateIHiredFor(this.state.hiring_for);
        this.props.history.push('create-a-job')
      }
      catch (exc) {
      }
    }
  };

  /**
   * on click of button to change the order of jobs
   * @param name
   */
  toggleSort = (name) => {
    const {sort} = this.state;
    if (name == "latest" && sort || name == "oldest" && !sort) {
      return
    }
    this.setState({
      sort: !sort,
    }, () => {
      this.modifyJobDetails()
    })
  };

  /**
   * on change the option from dropdown "hire for"
   * @param event
   */
  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
    this.setParticularState("hiring_for_error", "");
  };

  /**
   * on change of checkbox similar to previous job
   */
  onToggleSimilar = () => {
    this.setState({
      is_similar: !this.state.is_similar
    })
  };

  /**
   * on click cancel,reset the forms
   */
  clearForm = () => {
    this.setState({
      is_similar: false,
      hiring_for: "",
      hiring_for_error: '',
      previous_job: "",
      previous_job_error: "",
    })
    this.props.closeDialog()
  };

  /**
   * on select the previous job from dropdown
   * @param option
   */
  setIHireForOption = (option) => {
    this.setParticularState("hiring_for", option.label);
    this.setParticularState("hiring_for_error", '');
  };

  /**
   * on click of cancel icon,closing the modal
   */
  changeModelState = () => {
    this.props.closeDialog()
  };

  render() {
    const {classes} = this.props;
    const {is_similar, hiring_for, previous_job_error, hiring_for_error, is_previous_job_focused, job_details, sort} = this.state;
    return (
      <form className="post-job-modal">
        <div className="post-job-modal-close">
          <img src={close}
               className="close"
               alt="close"
               onClick={this.changeModelState}
          />
        </div>
        <div className="post-job">
          Post Job
        </div>
        <FormControl
          className={classes.formControl + " form-control-child"}
          error={hiring_for_error !== ""}
        >
          <InputLabel htmlFor="age-simple"
                      style={{marginTop: '-16px'}}
                      classes={{
                        cssLabel: classes.cssLabel,
                        error: classes.cssError
                      }} shrink>I hire for</InputLabel>
          <NonCreatableSingleSelectDropdown
            isSearchable={false}
            getSelectedOption={(option) => this.setIHireForOption(option)}
            defaultValue={hiring_for ? {value: hiring_for, label: hiring_for} : ''}
            options={hireForOptions}
            isClearable={true}
            error={hiring_for_error}
          />
          <FormHelperText className="field_error">{hiring_for_error}</FormHelperText>
        </FormControl>
        <FormControl
          className="form-control-child"
          classes={classes.checkbox}
        >
          <FormControlLabel
            style={{"marginLeft": "0px !important"}}
            classes={{label: classes.label}}
            control={
              <Checkbox
                id="is_similar"
                name="is_similar"
                classes={{checked: 'tick-checkbox', label: classes.label}}
                checked={is_similar}
                icon={<CustomIcon icon={defaultUntick} iconStyle="untick-checkbox"/>}
                onClick={this.onToggleSimilar}
              />
            }
            label="Is the current job similar to previous jobs?"
          />
        </FormControl>
        {
          is_similar ?
            <FormControl
              className="form-control-child force-margin-top"
              error={previous_job_error !== ""}
            >
              <InputLabel
                htmlFor="adornment-password"
                classes={{
                  root: classes.helperText,
                  cssLabel: classes.cssLabel,
                  error: classes.cssError
                }} shrink>Choose a Previos Job</InputLabel>

              <FormHelperText className="field_error">{previous_job_error}</FormHelperText>
              {
                is_previous_job_focused ?
                  <PreviousJobSearchField
                    setPreviousJob={this.setPreviousJob}
                    changePreviousJobFocus={this.changePreviousJobFocus}
                    job_details={job_details}
                    sort={sort}
                    toggleSort={this.toggleSort}
                  /> :
                  null
              }
            </FormControl>
            : null
        }
        <SaveAndCancelButton
          saveText="Save"
          cancelText="Cancel"
          onSave={this.ValidateFormData}
          onCancel={this.clearForm}
        />
      </form>
    );
  }
}


PostJobModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = dispatch => ({
  setPostJobModal: bindActionCreators(
    actions.setPostJobModal,
    dispatch,
  ),
  updateIHiredFor: bindActionCreators(
    IHiredForAction.updateIHiredFor,
    dispatch,
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PostJobModal))
