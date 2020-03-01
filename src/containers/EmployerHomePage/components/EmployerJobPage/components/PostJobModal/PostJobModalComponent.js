//library dependencies
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Input,
  InputAdornment,
  InputLabel
} from '@material-ui/core';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

//style
import './style.scss';

//icons
import search from '../../../../../../../assets/media/icons/search.svg';
import CustomIcon from '../../../../../../components/CustomIcon';
import defaultUntick from '../../../../../../../assets/media/icons/default_untick.svg'
import SaveAndCancelButton from '../SaveAndCancelButton';

//utilities
import handleLocalStorage from '../../../../../../Utilities/handleLocalStorage';
import * as actions from '../../../../../../actions/PostJobModal';
import * as IHiredForAction from '../../../../../../actions/createAJob';
import apiCall from '../../../../../../Utilities/apiCall';
import {isEmptyObject} from "../../../../../../Utilities";
import {CURRENT_SIMILAR_TO_PREVIOUS, POST_JOB, POST_JOBS_GET_DETAILS} from '../../../../../../../config/constants';

//custom components
import EmployerSideNav from '../../../../../../components/EmployerSideNav';
import NonCreatableSingleSelectDropdown
  from '../../../../../../components/SingleSelectDropdownWrapper/components/NonCreatableSingleSelectDropdown';
import PreviousJobSearchField from './PreviousJobSearchField';

const locationObject = {country: {key: '', value: ''}, location: {key: '', value: ''}}
const shiftObject = {shift: 'Regular', start: new Date('2014-08-18T09:00:00'), end: new Date('2014-08-18T18:00:00')}

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
    marginBottom: "10px !important"
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
  },
  input: {
    height: "35px"
  },
  checkedManualStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '44px !important',
    height: '44px !important',
    borderRadius: '3px',
    objectFit: 'contain',

  }
});

const hireForOptions = [{key: 1, value: "Startups",}, {key: 2, value: "Other MNCs",}, {
  key: 3, value: "Own Organization",
}];

class PostJobModalComponent extends Component {
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
      job_details: [],
      document: [],
      video: [],
    }
  }

  /**
   * On select of previous job from drop Down
   * @param previousJob
   */
  setPreviousJob = (previousJob) => {
    this.setState({
        'previous_job': previousJob
      },
      () => this.changePreviousJobFocus(null, false),
    )
  };
  /**
   * updating the state,on change of previous job
   * @param e
   */
  setPreviousJobChange = (e) => {
    try {
      const previousJob = e.target.value
      this.setState({
        'previous_job': {
          job_title: previousJob,
          id: null
        },

      }, () => {
        this.modifyJobDetails()
      },)
    }
    catch (exc) {
    }
  };

  componentDidMount() {
    //updating the data of previous jobs in drop down
    this.modifyJobDetails();
  }

  componentWillMount() {

    //initialise the data if previous job is not selected
    this.props.onDataLoad({
      job_id: null,
      hired_for: '',
      job_details: {
        locations: [locationObject],
        timings: [shiftObject],
        title: '',
        job_role: {key: '', value: ''},
        job_description: '',
        key_skills: [],
        job_type: [],
        number_of_vacancy: '',
        industry: [],
        functional_area: [],
        how_soon: '',
        work_experience_min: '',
        work_experience_max: '',
        is_fresher: false,
        currency: {key: '', value: ''},
        minimum_ctc: null,
        maximum_ctc: null,
        visible_to_no_one: false
      },
      candidate_profile: {
        back_to_work: true,
        job_for_specified_organisation: false,
        job_not_visible_for_specified_organisation: false,
        organisation_name: [],
        qualification: [],
        qualification_specialization: [{key: "", parent_key: "", value: "Any"}],
        phd_qualification: [],
        phd_qualification_specialization: [{key: "", parent_key: "", value: "Any"}],
        qualification_premier: false,
        qualification_phd_premier: false,
        desired_candidate: '',
        name: [],
        specialisation_data_source: [],
        phd_specialisation_data_source: [],
      },
      manage_response: {
        email_or_walkin: "email",
        forward_application_to_email: false,
        reference_code: "",
        selected_email: "",
        time_from: null,
        time_to: null,
        date_from: null,
        date_to: null,
        address_url: "",
        venue: ""
      },
      my_questionnaire: {
        page: 0,
        selectedQuestionnaire: 0
      },
      my_organisation: {
        page: 0,
        selectedOrganisation: 0
      },
      document: [],
      publish_job: {
        job_type: "",
        refresh_time: ""
      }
    })
  }

  /**
   * on change of previous job
   * @param e
   * @param newState
   */
  changePreviousJob = (e, newState = true) => {
    this.setState({
      is_previous_job_focused: newState
    },)
  };
  /**
   *
   * @param e
   * @param newState
   */
  changePreviousJobFocus = (e, newState = true) => {
    this.setState({
        is_previous_job_focused: newState
      },
      () => this.validatePreviousJob(),)
  };

  /**
   * updating the previous jobs from an api
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
      this.setState({
        job_details: [...responseData.data]
      })
    }
  };

  /**
   * on scroll the drop down,calling an api to get next data
   * @param e
   * @returns {Promise<void>}
   */
  onScrollChangeData = async (e) => {
    const {sort, previous_job} = this.state;
    const sendingData = {
      sort: sort,
      search: previous_job.job_title,
      pagination: 1,
    };
    const headers = {
      'authorization': handleLocalStorage("get", "employerLogin"),
      'Content-Type': 'application/json',
    }
    const responseData = await apiCall('get', sendingData, CURRENT_SIMILAR_TO_PREVIOUS, headers);
    if (responseData.status) {
      this.setState({
        job_details: [...responseData.data]
      })
    }
  };

  /**
   * On chnage field,updating the state
   * @param name
   * @param value
   */
  setParticularState = (name, value) => {
    this.setState({
      [name]: value,
    })
  };

  /**
   * To validate the previous job is selected or not
   */
  validatePreviousJob = () => {
    const {previous_job, is_similar} = this.state;

    if (is_similar && previous_job.id === null) {
      this.setParticularState("previous_job_error", 'Kindly specify Previous Job')
    }
    else {
      this.setParticularState("previous_job_error", '')
    }
  };

  /**
   * To validate "Hire for" field
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
   * To validate the fields
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
      this.getSelectedJobData();
    } else if (hiring_for && !is_similar) {
      this.getSelectedJobData();
    }
  };

  /**
   * To get the data from an api of previous selected job id
   * @returns {Promise<void>}
   */
  getSelectedJobData = async () => {
    const {previous_job} = this.state;
    const sendingData = {
      id: previous_job.id || null
    };
    const headers = {
      'authorization': handleLocalStorage("get", "employerLogin"),
      'Content-Type': 'application/json',
    };
    const responseData = await apiCall('get', sendingData, POST_JOBS_GET_DETAILS, headers);
    if (responseData.status) {
      try {
        if (previous_job.id !== null) {
          this.props.updateIHiredFor(this.state.hiring_for);
          this.updateNewDataForNewJob(responseData.data)
        }
        else {
          this.props.setPostJobModal(responseData.data);
          this.props.updateIHiredFor(this.state.hiring_for);
          this.props.history.push('create-a-job')
        }
      }
      catch (exc) {
      }
    }
  };

  /**
   * To make the form data of document and video
   * @param id
   * @returns {FormData}
   */
  prepareTheDataForApi = (id) => {
    const document = this.state.document;
    const video = this.state.video;
    const Id = {
      id: id,
    };
    const files = {};
    const newVideo = {};
    video.map((value) => {
      newVideo["video"] = value
    });
    document.map((value, index) => {
      const doc = `doc_${index + 1}`;
      files[doc] = value;
    });
    const formData = new FormData();
    for (const key in files) {
      if (files[key].hasOwnProperty("url") && !files[key]["url"].includes("blob:http")) {
        formData.append(key, JSON.stringify(files[key]))
      }
      else {
        formData.append(key, files[key]);
      }
    }
    for (const jobId in Id) {
      formData.append(jobId, Id[jobId]);
    }
    for (const videoname in newVideo) {
      if (newVideo[videoname].hasOwnProperty("url") && !newVideo[videoname]["url"].includes("blob:http")) {
        formData.append(videoname, JSON.stringify(newVideo[videoname]))
      }
      else {
        formData.append(videoname, newVideo[videoname])
      }
    }
    formData.append("docs", "docs")
    return formData
  };

  /**
   * TO change the format of DOcuments and video to show
   * @param data
   * @returns {Promise<void>}
   */
  modifiedData = async (data) => {
    let video = [];
    if (data.job_description_documents.length > 0) {
      data.job_description_documents.forEach((value) => {
        let newNameArray = value.name.split("/")
        value.url = value.name
        value.name = newNameArray[newNameArray.length - 1]
        value.uploaded_on = value.lastModified
      })
      this.setState({
        document: data.job_description_documents,
      })
    }
    if (!isEmptyObject(data.job_description_video)) {
      const videoUrl = data.job_description_video.video
      const videoDate = data.job_description_video.video_updated_on
      let videoname = videoUrl.split("/")
      const newVideoName = videoname[videoname.length - 1].replace(/_/g, " ")
      video = [{"name": newVideoName, "lastModified": videoDate, url: videoUrl, uploaded_on: videoDate}]
      this.setState({
        video: video
      })
    }
  };

  /**
   * To Update the document format to show  data in document tab
   * @param id
   * @returns {Promise<void>}
   */
  documentUploadInNewJob = async (id) => {
    try {
      const token = await handleLocalStorage('get', 'employerLogin');
      const AUTH_HEADER = {
        authorization: token,
        'Content-Type': 'application/json',
      };

      const preparedData = this.prepareTheDataForApi(id);
      const document_upload = await apiCall('post', preparedData, POST_JOB, AUTH_HEADER);
      if (document_upload.status) {
        if (this.props.location.state && this.props.location.state.videoUrl) {
          this.props.location.state.videoUrl = ""
        }
        this.props.history.push(`create-a-job/${id}`)
      }
    } catch (e) {
      this.setState({loading: false});
    }
  };
  /**
   * To Modified the Questionnaire detail as per required to view previous selected questionnaire
   * @param data
   * @param QuestionanireId
   * @returns {Promise<void>}
   */
  modifiedQuestionnaireDetails = async (data, QuestionanireId) => {
    const sendingData = {
      questioner_details: {
        "key": data.questionnaire_details.questioner_id.key,
        "value": data.questionnaire_details.questioner_id.value
      },
      id: QuestionanireId
    }
    const headers = {
      'authorization': handleLocalStorage("get", "employerLogin"),
      'Content-Type': 'application/json',
    }
    const responseData = await apiCall('post', sendingData, POST_JOB, headers);
    if (responseData.status) {
      console.log("success");
    }
  };

  /**
   * Update the new Job with previous selected job
   * @param data
   * @returns {Promise<void>}
   */
  updateNewDataForNewJob = async (data) => {
    const sendingData = {id: null, ...data};
    const headers = {
      'authorization': handleLocalStorage("get", "employerLogin"),
      'Content-Type': 'application/json',
    };
    const responseData = await apiCall('post', sendingData, POST_JOB, headers);
    if (responseData.status) {
      try {
        this.props.setPostJobModal(responseData.data);
        await this.modifiedQuestionnaireDetails(data, responseData.id)
        await this.modifiedData(data);
        await this.documentUploadInNewJob(responseData.id)
      }
      catch (exc) {
      }
    }
  };

  /**
   * on click of button to change the order of previous jobs in Drop Down
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
   * on change in DropDown "hire for" field
   * @param option
   */
  setIHireForOption = (option) => {
    this.setParticularState("hiring_for", option.label);
    this.setParticularState("hiring_for_error", '');
  };

  /**
   * on change of checkbox "is similar" field
   */
  onToggleSimilar = () => {
    this.setState({
      is_similar: !this.state.is_similar,
      previous_job_error: '',
    })
  };
  /**
   * To reset the post job modal fields
   */
  clearForm = () => {
    this.setState({
      is_similar: false,
      hiring_for: "",
      hiring_for_error: '',
      previous_job: "",
      previous_job_error: "",
    });
    // this.props.closeDialog()
  };

  render() {
    const {classes} = this.props;
    const {is_similar, hiring_for, previous_job, previous_job_error, hiring_for_error, is_previous_job_focused, job_details, sort} = this.state;
    return (
      <div>
        <EmployerSideNav history={this.props.history} selected={2}>
          <form className="post-job-modal">
            <div className="post-job">
              Post Job
            </div>
            <FormControl
              style={{paddingTop: '30px'}}
              className={classes.formControl + " form-control-child"}
              error={hiring_for_error !== ""}
            >
              <InputLabel htmlFor="age-simple"
                          style={{marginTop: '14px'}}
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
                    style={{width: "44px", height: "44px"}}
                    classes={{checked: 'checkedManualStyle', label: classes.label}}
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
                    }} shrink>Choose a Previous Job</InputLabel>
                  <Input
                    id="previous_job"
                    name="previous_job"
                    type="text"
                    label="choose a previous job"
                    onFocus={this.changePreviousJob}
                    classes={{input: classes.input}}
                    autoComplete="off"
                    startAdornment={
                      <InputAdornment position="start">
                        <CustomIcon icon={search}/>
                      </InputAdornment>
                    }
                    value={previous_job.job_title || ""}
                    onChange={(e) => this.setPreviousJobChange(e)}
                  />
                  <FormHelperText className="field_error">{previous_job_error}</FormHelperText>
                  {
                    is_previous_job_focused ?
                      <PreviousJobSearchField
                        onScrollChangeData={(e) => this.onScrollChangeData(e)}
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
            <div style={{marginTop: '20px'}}>
              <SaveAndCancelButton
                saveText="Save"
                cancelText="Cancel"
                onSave={this.ValidateFormData}
                onCancel={this.clearForm}
              />
            </div>
          </form>
        </EmployerSideNav>
      </div>
    );
  }
}


PostJobModalComponent.propTypes = {
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
  ),
  onDataLoad: bindActionCreators(
    IHiredForAction.updateCreateAJob,
    dispatch,
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PostJobModalComponent))
