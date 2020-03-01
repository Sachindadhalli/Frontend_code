//library dependencies
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {TextField, Modal} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {toast} from "react-toastify";

//style
import './style.scss';

//custom component
import AddOrganisationComponent from './components/AddOrganisationComponent/AddOrganisationComponent';
import OrganisationView from './components/OrganisationView/OrganisationView';
import ConformationDialog from '../../../../components/ConformationDialog/ConformationDialog';

//utilities
import {apiCall, handleLocalStorage} from '../../../../Utilities';
import {
  CREATE_ORGANISATION,
  GET_ORAGANISATION,
  DELETE_ORGANISATION,
  UPDATE_ORGANISATION,
  POST_JOB,
  POST_JOBS_GET_DETAILS,
}
  from '../../../../../config/constants';
import * as actions from '../../../../actions/createAJob'

toast.configure({
  "position": "top-center",
  toastClassName: "toast-inner-container",
  bodyClassName: "toast-body-name",
  closeButton: false,
  progressClassName: 'toast-progress-bar'
})

class MyOrganisation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organisation_name: '',
      organisation_descreption: '',
      website_name: '',
      ShowOrganisationView: true,
      firstOrganisation: false,
      Loading: false,
      organisationCount: '',
      cardsCount: '',
      organisations_data: [],
      delete_Model: false,
      actionType: '',
      delete_Id: '',
      edit_Detail: {},
      edit_view: false,
      nameOrg: '',
      pageNumber: 0,
      key: '',
      selectedCard: props.createAJob.my_organisation.selectedOrganisation
    };
    this.header = {
      authorization: handleLocalStorage('get', 'employerLogin'),
      'Content-Type': 'application/json',
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {

    // receiving change in selected organisation and updating state
    this.setState({selectedCard: this.props.createAJob.my_organisation.selectedOrganisation})
  }

  componentWillMount() {

    // calling a function while mounting this component to get the data from an api
    this.getOrganisationData('0');
  }

  componentDidMount() {

    //creating a reference of this component for save as draft button.
    this.getInitialisedData();
    this.props.onRef(this);
  }

  componentWillUnMount() {

    // removing reference while going in other component or tab
    this.props.onRef(null);
  }

  /**
   * on click of ADD Organisation button
   * */
  AddOrganisation = () => {
    this.setState({ShowOrganisationView: false, edit_view: false,});
  };

  /**
   * on click of Add Organisation first time visit the page
   * @return: update a state and open first time add organisation page
   * */
  firstAddOrganisation = () => {
    this.setState({ShowOrganisationView: false, firstOrganisation: true,});
  };

  /**
   * on click of cancel button in Add organisation page
   * @return: update a state and showing all other added organisation(view)
   * */
  CancelOrganisation = () => {
    this.setState({ShowOrganisationView: true, edit_view: false,});
  };

  /**
   * on click of close button in the delete dialog box
   * @return: update a state to close dialog box
   * */
  closeDeleteDialogModel = () => {
    this.setState({delete_Model: false,});
  };

  /**
   * on click of delete button, opening confirmation dialog box
   * @param: key ,name
   * @return: update state and open delete dialog box
   * */
  openDeleteDialogModel = (key, name) => {
    this.setState({delete_Id: key, nameOrg: name, delete_Model: true,});
  };

  /**
   * To get all organisation, calling an api
   * @param: page
   * @return: update a state with coming organisation data
   * */
  getOrganisationData = async page => {
    try {
      this.setState({Loading: true});
      const token = await handleLocalStorage('get', 'employerLogin');
      const AUTH_HEADER = {
        authorization: token,
        'Content-Type': 'application/json',
      };
      const sendingData = {pagination: parseInt(page) + 1,};
      const Organisation_response = await apiCall('get', sendingData, GET_ORAGANISATION, AUTH_HEADER,);
      if (Organisation_response.status) {
        const totalNoPages = Math.ceil(Organisation_response.total_count / 4);
        this.setState({
          organisations_data: Organisation_response.data,
          organisationCount: totalNoPages,
          pageNumber: page,
          cardsCount: Organisation_response.total_count,
          Loading: false,
        });
      }
    } catch (e) {
      this.setState({loading: false});
    }
  };

  /**
   * on click of delete button of confirmation dialog box
   * @return: update a state with new data after deleting from backend
   * */
  deleteOrganisationDetail = async () => {
    try {
      const token = await handleLocalStorage('get', 'employerLogin');
      const AUTH_HEADER = {authorization: token, 'Content-Type': 'application/json',};
      const sendingData = {key: this.state.delete_Id,};
      this.setState({delete_Model: false});
      const delete_Response = await apiCall('get', sendingData, DELETE_ORGANISATION, AUTH_HEADER);
      if (delete_Response.status) {
        this.getOrganisationData(this.state.pageNumber);
      }
    } catch (e) {
      this.setState({loading: false});
    }
  };

  /**
   * on click of edit button of the organisation card
   * @param: details
   * @return: update a state with  edit view to open edit page
   * */
  editOrganisationDetail = detail => {
    this.setState({ShowOrganisationView: false, edit_Detail: detail, edit_view: true,});
  };

  /**
   * To get previous selected organisation from an api
   * @return: to call a function to get data from an api or redux
   * */
  getInitialisedData = () => {
    const {my_organisation_from_previous_job} = this.props;
    if (my_organisation_from_previous_job !== null) this.getDataFromRedux(my_organisation_from_previous_job);
    else this.changeReduxStore(this.props.match.params.jobId);
  };

  /**
   * To get data from redux
   * @param: manage_responses_from_previous_job
   * @return: update a state with coming data
   * */
  getDataFromRedux = my_organisation_from_previous_job => {
    this.setState({...my_organisation_from_previous_job,});
  };

  /**
   * To get data of added organisations by an api
   * @param: id
   * @return: update a state with coming data
   * */
  changeReduxStore = async (id = this.props.match.params.jobId) => {
    const newSendingData = {id,};
    try {
      const header = {authorization: handleLocalStorage('get', 'employerLogin'),};
      const jobData = await apiCall('get', newSendingData, GET_ORAGANISATION, header);
      if (jobData.status) {
        this.setState({...jobData.data.candidate_profile,});
      }
    } catch (e) {
    }
  };

  /**
   * on click of save as draft button
   * @param: id
   * @return: after saved redirect to employer saved job page
   * */
  saveAsDraft = async Id => {
    if (Id === '' || Id === undefined || Id === null) Id = this.state.selectedCard;
    const token = await handleLocalStorage('get', 'employerLogin');
    const AUTH_HEADER = {authorization: token, 'Content-Type': 'application/json',};
    const sendingData = {
      advertise_company_details: {key: Id, value: '',},
      id: this.props.match.params.jobId,
    };
    const data = await apiCall('post', sendingData, POST_JOB, AUTH_HEADER);
    if (data.status) {
      this.props.history.push(this.props.match.url.replace(`create-a-job/${this.props.match.params.jobId}/my-organisation`, 'employer-saved-jobs'));
    }
  };

  /**
   * on click of next button in organisation view
   * @param: id
   * @return: redirect to next tab after saved successfully
   * */
  saveNext = async Id => {
    if (Id === '') {
      const newId = this.state.organisations_data[0].key;
      const token = await handleLocalStorage('get', 'employerLogin');
      const AUTH_HEADER = {
        authorization: token,
        'Content-Type': 'application/json',
      };
      const sendingData = {
        advertise_company_details: {key: newId,},
        id: this.props.match.params.jobId,
      };
      const data = await apiCall('post', sendingData, POST_JOB, AUTH_HEADER);
      if (data.status) {
        this.props.history.push(this.props.match.url.replace('my-organisation', 'my-questionnaire'));
      }
    } else {
      const token = await handleLocalStorage('get', 'employerLogin');
      const AUTH_HEADER = {
        authorization: token,
        'Content-Type': 'application/json',
      };
      const sendingData = {
        advertise_company_details: {key: Id,},
        id: this.props.match.params.jobId,
      };
      const data = await apiCall('post', sendingData, POST_JOB, AUTH_HEADER);
      if (data.status) {
        this.props.history.push(this.props.match.url.replace('my-organisation', 'my-questionnaire'));
      }
    }
  };

  /**
   * on click of save button to add new organisation
   * @param: sendingData
   * @return: call an api and saved data and  redirect to organisation view page
   * */
  saveOrganisation = async sendingData => {
    const token = await handleLocalStorage('get', 'employerLogin');
    const AUTH_HEADER = {authorization: token, 'Content-Type': 'application/json',};
    if (this.state.edit_view) {
      const EditKeyId = this.state.edit_Detail.key;
      const sendingApiData = {
        key: EditKeyId,
        organisation_name: sendingData.organisation_name,
        description: sendingData.organisation_descreption,
        url: sendingData.website_name,
      };
      const responseData = await apiCall('post', sendingApiData, UPDATE_ORGANISATION, AUTH_HEADER);
      if (responseData.status) {
        this.getOrganisationData('0');
        this.setState({ShowOrganisationView: true,});
      }
    } else {
      const sendingApiData = {
        organisation_name: sendingData.organisation_name,
        description: sendingData.organisation_descreption,
        url: sendingData.website_name,
      };
      const responseData = await apiCall('post', sendingApiData, CREATE_ORGANISATION, AUTH_HEADER);
      if (responseData.status) {
        this.getOrganisationData('0');
        this.setState({ShowOrganisationView: true,});
      }
    }
  };

  render() {
    return (
      <div>
        {this.state.ShowOrganisationView ?
          (<OrganisationView
            addOrganisation={this.AddOrganisation}
            firstaddOrganisation={this.firstAddOrganisation}
            organsisation_data={this.state.organisations_data}
            Loading={this.state.Loading}
            totalPage={this.state.organisationCount}
            cardsCount={this.state.cardsCount}
            deleteOrganisationDetail={(key, name) => {
              this.openDeleteDialogModel(key, name);
            }}
            editOrganisationDetail={detail => {
              this.editOrganisationDetail(detail);
            }}
            saveNext={Id => {
              this.saveNext(Id);
            }}
            pagination={page => this.getOrganisationData(page)}/>)
          :
          (<AddOrganisationComponent
            firstOrganisation={this.state.firstOrganisation}
            cancel={this.CancelOrganisation}
            editData={this.state.edit_Detail}
            editView={this.state.edit_view}
            saveOrganisation={sendingData => {
              this.saveOrganisation(sendingData);
            }}
          />)}
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.delete_Model}
          onClose={this.closeDeleteDialogModel}>
          <ConformationDialog
            actionType={this.state.actionType}
            conformationStatus={this.deleteOrganisationDetail}
            handleClose={this.closeDeleteDialogModel}
            Text="Delete"
            headingText={"Do you want to delete '" + this.state.nameOrg + "' organisation?"}/>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  onOrganisationChange: bindActionCreators(
    actions.updateMyOrganisation,
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyOrganisation);
