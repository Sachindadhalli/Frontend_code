//library dependencies
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, formValueSelector} from 'redux-form';
import {bindActionCreators} from "redux";

//style
import './style.scss'

//custom component
import SaveAndCancelButton from '../../../../components/SaveAndCancelButton';
import CustomComponents from '../../../../components/CustomComponents/CustomComponents'

//utilities
import {apiCall, handleLocalStorage} from '../../../../Utilities';
import {POST_JOB, POST_JOBS_GET_DETAILS} from '../../../../../config/constants'
import * as IHiredForAction from '../../../../actions/createAJob'
import * as actions from "../../../../actions/PostJobModal";

const locationObject = {country: {key: '', value: ''}, location: {key: '', value: ''}};
const shiftObject = {shift: 'Regular', start: new Date('2014-08-18T09:00:00'), end: new Date('2014-08-18T18:00:00')};

class PublishJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh_time: props.refresh_time
    }
  }

  componentDidMount() {
    // getting the details from previous selected job
    // creating reference of this component
    this.setDetails();
    this.props.onRef(this)
  }

  componentWillUnMount() {
    this.props.onRef(null)
  }

  /**
   * On click of preview job button, redirecting to post job preview page
   */
  previewJob = () => {
    this.props.history.push(this.props.match.url.replace('publish-job', 'post-job-preview'));
  };
  /**
   *After saved the Job ,redirect to saved job page
   */
  SaveJobChangesPage = () => {
    this.props.history.push(this.props.match.url.replace(`create-a-job/${this.props.match.params.jobId}/publish-job`, 'employer-saved-jobs'));
  };
  /**
   * on click of save as draft button
   * @return {Promise<void>}
   */
  saveAsDraft = async () => {
    const sendingData = {
      publish_job: {refresh_time: this.props.refresh_time, job_type: "Draft"},
      id: this.props.match.params.jobId || "",
    };
    const headers = {
      'authorization': handleLocalStorage("get", "employerLogin"),
      'Content-Type': 'application/json',
    };
    const data = await apiCall('post', sendingData, POST_JOB, headers);
    if (data.status) {
      this.SaveJobChangesPage()
    }
  };

  /**
   * to get the data of selected job id
   * @return {Promise<void>}
   */
  setDetails = async () => {
    const jobIdHere = this.props.match.params.jobId;
    const newSendingData = {
      id: jobIdHere
    };
    const headers = {'authorization': handleLocalStorage("get", "employerLogin"), 'Content-Type': 'application/json',};
    const JobDetailsData = await apiCall('get', newSendingData, POST_JOBS_GET_DETAILS, headers);
    if (JobDetailsData.status) {
      this.props.change("refresh_time", JobDetailsData.data.publish_job && JobDetailsData.data.publish_job.refresh_time);
    }
  };
  /**
   * on click publish job,
   * @param values
   * @return {Promise<void>}
   */
  postJob = async (values) => {
    let receivingData = {};
    const sendingData = {
      publish_job: {...values, job_type: "Post"},
      id: this.props.match.params.jobId,
    };
    try {
      const headers = {
        'authorization': handleLocalStorage("get", "employerLogin"),
        'Content-Type': 'application/json',
      };
      receivingData = await apiCall('post', sendingData, POST_JOB, headers);
    } catch (exc) {
    }
    if (receivingData.status) {
      this.props.setPostJobModal({});
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
        document: [],
        my_questionnaire: {
          page: 0,
          selectedQuestionnaire: 0
        },
        my_organisation: {
          page: 0,
          selectedOrganisation: 0
        },
        publish_job: {
          job_type: "",
          refresh_time: ""
        }
      });
      this.SaveJobChangesPage()
    } else {
    }
  };

  render() {
    const {handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit(this.postJob)} className="publish-job-container">
        <div className="publish-job-content">
          <Field
            label="Schedule a Refresh & Post the Job"
            type="FormLabel"
            styleClass={{field: "refresh-schedule"}}
            component={CustomComponents}
          />
          <Field
            label="Schedule a refresh on the website for the current job, once every"
            type="FormLabel"
            styleClass={{field: "refresh-schedule-radio"}}
            component={CustomComponents}
          />
          <Field
            name={'refresh_time'}
            type="Radio"
            className="refresh-schedule-radio"
            styleClass={{field: "schedule-radio"}}
            value={this.props.refresh_time}
            component={CustomComponents}
            radioButtons={[{name: "week", value: "Week", label: "Week", styleClass: "radio-item"}, {
              name: "fortnight",
              value: "Fortnight",
              label: "Fortnight",
              styleClass: "radio-item"
            }, {name: "month", value: "Month", label: "Month", styleClass: "radio-item"}]}
          />
        </div>
        <div className="hr-line-publish-job"></div>
        <button type="submit" style={{display: 'none'}}
                ref={publishJobSave => this.publishJobSave = publishJobSave}></button>
        <SaveAndCancelButton cancelText="Preview" saveText="Post Job" onSave={() => this.publishJobSave.click()}
                             onCancel={this.previewJob}/>
      </form>

    );
  }
}

const selector = formValueSelector('PublishJob');
const mapStateToProps = (state) => {
  return {
    initialValues: {
      refresh_time: ""
    },
    'refresh_time': selector(state, 'refresh_time')
  }
};
PublishJob = reduxForm({
    form: "PublishJob",
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};
      return errors;
    }
  }
)(PublishJob);


const mapDispatchToProps = dispatch => ({
  setPostJobModal: bindActionCreators(
    actions.setPostJobModal,
    dispatch,
  ),
  onDataLoad: bindActionCreators(
    IHiredForAction.updateCreateAJob,
    dispatch,
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(PublishJob);
