//library dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { withStyles, Link } from '@material-ui/core';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

//styles
import './style.scss';

//custom components
import CustomIcon from '../../components/CustomTag';
import JobDetails from './components/JobDetails';
import CreateJobRouter from './components/CreateJobRouter';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import EmployerSideNav from '../../components/EmployerSideNav';

//utilities
import { apiCall, handleLocalStorage, isEmptyObject} from "../../Utilities";
import {POST_JOBS_GET_DETAILS,GET_TAB_COUNT} from "../../../config/constants";
import * as actions from "../../actions/createAJob";

let globalJobId = undefined;

//customised the material ui style
const styles = theme => ({
  root: { justifyContent: 'center', flexWrap: 'wrap', },
  paper: { padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`, },
});

const selectedButtton = {
  background: 'linear-gradient(105deg, #f0582b, #ec0586)',
  color: '#ffffff',
  fontWeight: 500,
};

const unSelectedButton = { color: '#e73a9e', };

class CreateJob extends Component {
  constructor(props) {
    super(props);
    this.state = { currently_opened_tab:0,  count:0, };
  }

  /**
   * on click save as draft button
   */
  saveDraft = () => { this.child.saveAsDraft(); };

  /**
   * calling a function to get data from api and updating that into redux store
   * @param jobId
   * */

  getInitialData = (jobId) => {
    if(jobId) this.changeReduxStoreData(jobId);
  };

  /**
   * getting data of previous selected job
   * @param id
   * @return Post job data and update redux
   * */
  changeReduxStoreData = async(id=this.props.match.params.jobId) => {
    const newSendingData = { id: id };//sending job id
    const headers ={  //authorization
      'authorization': handleLocalStorage("get", "employerLogin"),
      'Content-Type': 'application/json',
    };
    const jobData = await apiCall('get', newSendingData, POST_JOBS_GET_DETAILS, headers); //api call
    if(jobData.status){
      try{
        if(!isEmptyObject(jobData.data)){
          this.props.updateIHiredFor(jobData.data.hired_for);
          this.props.onDataLoad({
            ...jobData.data,
            my_questionnaire:{
              page:0,
              selectedQuestionnaire:jobData.data.questionnaire_details.length!==0?jobData.data.questionnaire_details.questioner_id.key:0
            },
            my_organisation: {
              page:0,
              selectedOrganisation:jobData.data.advertise_company_details.key?jobData.data.advertise_company_details.key:0
            },
            publish_job: {
              job_type: jobData.data.publish_job.job_type,
              refresh_time: jobData.data.publish_job.refresh_time
            }
          })
        }
      }
      catch (e) { }
    }
  };

componentWillMount() {

  //getting a count to disabled the tab so user can move to next after filled  current tab
  this.getCurrentlyOpenTab()
}

componentDidMount(){
    try{
      const job_id = this.props.location.pathname.split('/',3);
      if(isNaN(job_id[2])){ }
      else{
        globalJobId = job_id[2];
        this.getInitialData(globalJobId); // calling function to get the data of particular job id.
      }
    }
    catch(exc){ this.props.history.push('/') } //redirect to home page

    finally{ this.getCurrentlyOpenTab(); }
  }

  /**
   * To get the count and change the tab
   * @return changing the tab
   * */
getCurrentlyOpenTab = async () => {
  const full_url = window.location.pathname;
  const jobId=full_url.split('/',3);
  if(isNaN(jobId[2]) || jobId[2] === ""){}
  else {
    try {
      const newSendingData = { key: jobId[2] };
      const headers ={
        'authorization': handleLocalStorage("get", "employerLogin"),
        'Content-Type': 'application/json',
      };
      let currently_opened_tab = 0;
      const tabCount = await apiCall('get', newSendingData, GET_TAB_COUNT, headers);
      if (tabCount.status) {
        if (full_url.includes('document-video-upload') && tabCount.data.count >= 1) {
          currently_opened_tab = 1;
        } else if (full_url.includes('candidate-profile') && tabCount.data.count >= 2) {
          currently_opened_tab = 2;
        } else if (full_url.includes('manage-responses') && tabCount.data.count >= 3) {
          currently_opened_tab = 3;
        } else if (full_url.includes('my-organisation') && tabCount.data.count >= 4) {
          currently_opened_tab = 4;
        } else if (full_url.includes('my-questionnaire') && tabCount.data.count >= 5) {
          currently_opened_tab = 5;
        } else if (full_url.includes('publish-job') && tabCount.data.count >= 6) {
          currently_opened_tab = 6;
        } else if (full_url.includes('post-job-preview')) {
          currently_opened_tab = 7;
          tabCount.data.count=tabCount.data.count+1;
        }
        if (tabCount.data.count < currently_opened_tab) this.props.history.push(this.props.match.url + `/${jobId[2]}`);
        this.setState({ currently_opened_tab: currently_opened_tab });
      }
      else this.props.history.push('/')
    }
     catch(exc){ this.props.history.push('/') }
  }
};

  /**
   * on change of tab from one tab to another
   * @param url
   * @param currently_opened_tab
   * @return: if tab count is valid then navigate that url
   * */
  handleNavigationClick = async (url, currently_opened_tab) => {
    try{
      const job_id = this.props.location.pathname.split('/',3); // getting jobid from url params
      if(isNaN(job_id[2]) || job_id[2] === ""){ throw "exception occured" }
      else{
        const newSendingData = { key: job_id[2] }; //sending JobId
        const headers ={ // authorization
          'authorization': handleLocalStorage("get", "employerLogin"),
          'Content-Type': 'application/json',
        };
        const tabCount = await apiCall('get', newSendingData, GET_TAB_COUNT, headers); //getting tab count
        if(tabCount.status){
          this.setState({ count:tabCount.data.count });
          if(tabCount.data.count>=currently_opened_tab) {
            globalJobId = job_id[2];
            this.setState({
              currently_opened_tab,
            });
            if (globalJobId !== undefined) {
              this.props.history.push(this.props.match.url + `/${globalJobId}` + url); //redirecting to particular tab
            }
          }
        }
      }
    }
    catch(exc){
      this.props.history.push(this.props.match.url);
    }
  };

  componentWillReceiveProps(nextProps) {
    //getting count tab
    this.getCurrentlyOpenTab();
  }

  render() {
    const {match} = this.props;
    const currently_opened_tab = this.state.currently_opened_tab;
    return (
        <div className="create-job-page">
            <EmployerSideNav history={this.props.history} selected={2}>
                <div className="create-a-job-container">
                  {
                    currently_opened_tab === 7? <div>
                      <CustomBreadcrumb breadcrumb_text="Job Details" breadcrumbs= {[{text: "Jobs", link: ""}, {text: "JobDetails", link: ""}]} />
                    </div> :
                    <div>
                       <div className="breadcrumb-save-as-draft">
                          <div className="create-a-job-text">Create a job</div>
                          <button  className="shenzyn-btn outline-primary-button "
                            onClick={this.saveDraft}
                            >
                            Save as Draft </button>
                       </div>
                    <div className="create-job-nav">

                        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} arial-label="Breadcrumb">
                          <Link color="inherit" href="#" onClick={this.handleNavigationClick}> Jobs </Link>
                          <Link color="inherit" href="#" onClick={this.handleNavigationClick}>
                              <CustomIcon text="Create a Job" className="nav-create-a-job-text" />
                          </Link>
                        </Breadcrumbs>
                    </div>
                    <div className="create-job-buttons">
                        <div className="job-details-button"
                             style={currently_opened_tab === 0 ? selectedButtton: unSelectedButton}
                             onClick = {() => this.handleNavigationClick(``,0)} >
                            <div className="job-details-text"> Job Details </div>
                        </div>
                        <div className="document-video-upload-button" style={currently_opened_tab === 1 ? selectedButtton: unSelectedButton}
                        onClick = {() => this.handleNavigationClick(`/document-video-upload`,1)} >
                            <div className="doucument-video-text"> Document & Video Profile </div>
                        </div>
                      <div className="candidate-profile-button" style={currently_opened_tab === 2 ? selectedButtton: unSelectedButton}
                           onClick = {() => this.handleNavigationClick(`/candidate-profile`,2)} >
                        <div className="candidate-profile-text"> Candidate Profile </div>
                      </div>
                        <div className="manage-responses-button" style={currently_opened_tab === 3 ? selectedButtton: unSelectedButton}
                        onClick = {() => this.handleNavigationClick(`/manage-responses`,3)} >
                            <div className="manage-responses-text"> Manage Responses </div>
                        </div>
                        <div className="my-organisation-button"
                        style={currently_opened_tab === 4 ? selectedButtton: unSelectedButton}
                        onClick = {() => this.handleNavigationClick(`/my-organisation`,4)} >
                            <div className="my-organisation-text"> My Organisation </div>
                        </div>
                        <div className="my-questionnaire-button"
                        style={currently_opened_tab === 5 ? selectedButtton: unSelectedButton}
                        onClick = {() => this.handleNavigationClick(`/my-questionnaire`,5)} >
                            <div className="my-organisation-text"> My Questionnaire </div>
                        </div>
                        <div className="publish-job-button"
                        style={currently_opened_tab === 6 ? selectedButtton: unSelectedButton}
                        onClick = {() => this.handleNavigationClick(`/publish-job`,6)} >
                            <div className="publish-job-text"> Publish Job </div>
                        </div>
                    </div>
                    </div>
                  }
                   <CreateJobRouter match={match}
                     handleNavigationClick = {() => this.handleNavigationClick(`/my-organisation`,3)} onRef={ref => this.child = ref} />
                </div>
              </EmployerSideNav>
      </div>
    );
  }
}

CreateJob.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  onDataLoad: bindActionCreators(
    actions.updateCreateAJob,
    dispatch,
  ),
  updateIHiredFor:bindActionCreators(
    actions.updateIHiredFor,
    dispatch,
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateJob));
