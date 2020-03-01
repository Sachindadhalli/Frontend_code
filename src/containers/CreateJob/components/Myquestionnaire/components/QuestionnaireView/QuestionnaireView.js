//library dependencies
import React, {Component} from 'react';
import {withStyles, TablePagination, Modal} from '@material-ui/core';
import {toast} from "react-toastify";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

//style
import './style.scss';

//custom component
import QuestionnaireCard from './component/QuestionnaireCard/QuestionnaireCard';
import TablePaginationActions from '../TablePaginationActions/TablePaginationActions';
import LoadingIcon from '../../../../../../components/LoadingIcon/LoadingIcon';
import ConformationDialog from '../../../../../../components/ConformationDialog/ConformationDialog'
import SaveAndCancelButton from '../../../../../../components/SaveAndCancelButton/SaveAndCancelButton';
import NoQuestionnaire from "../NoQuestionnaire/NoQuestionnaire";

//utilities
import {apiCall, handleLocalStorage} from "../../../../../../Utilities";
import {DELETE_QUESTIONNAIRE, POST_JOB, QUESTIONNAIRE_NAME} from "../../../../../../../config/constants";
import * as actions from "../../../../../../actions/createAJob";

toast.configure({
  "position": "top-center",
  toastClassName: "toast-inner-container",
  bodyClassName: "toast-body-name",
  closeButton: false,
  progressClassName: 'toast-progress-bar'
});

// material ui style customizations
const actionsStyles = theme => ({
  root: {flexShrink: 0, color: theme.palette.text.secondary, marginLeft: '104px',},
  spacer: {flex: '1 1 50%', border: '1px solid black'}
});

const TablePaginationActionsWrapped = withStyles(actionsStyles, {withTheme: true})(
  TablePaginationActions,
);

class QuestionnaireView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      no_organisation: false,
      activeQues: props.createAJob.my_questionnaire.selectedQuestionnaire,
      intialPage: 0,
      editProps: false,
      QuestionnaireName_data: {},
      Loading: false,
      deleteQuestionnaireModal: false,
      deleteQuestionnaireId: '',
      totalCountPage: 0,
      pages: ''
    }
  }

  componentWillMount() {

    // on mount this questionnaire view component, calling an api by function to get first  page of data
    this.getQuestionnaireData('1')
  }

  /**
   * To get data of Questionnaire
   * @param: page
   * @return: Update the state with coming data
   * */
  getQuestionnaireData = async page => {
    try {
      this.setState({Loading: true});
      const token = await handleLocalStorage('get', 'employerLogin');
      const AUTH_HEADER = {
        authorization: token,
        'Content-Type': 'application/json',
      };
      const sendingData = {
        pagination: page,
      };
      const QuestionnaireName_response = await apiCall('get', sendingData, QUESTIONNAIRE_NAME, AUTH_HEADER,);
      if (QuestionnaireName_response.status) {
        this.setState({
          QuestionnaireName_data: QuestionnaireName_response.data,
          totalCountPage: QuestionnaireName_response.total_count, Loading: false,
        });
      }
    } catch (e) {
      this.setState({loading: false});
    }
  };

  /**
   * on click of radio button to selcet the questionnaire
   * @param: value
   * @return:  call a function to update redux store
   * */
  onOrganisationRadioChange(value) {
    this.setState({activeQues: value,});
    this.props.onQuestionnaireChange({page: this.props.createAJob.my_questionnaire.page, selectedQuestionnaire: value});
  }

  /**
   * on  click of button ADD questionnaire
   * @return:  redirect the add questionnaire page
   * */
  addQuestionnaire = () => {
    this.props.history.push(this.props.match.url.replace('my-questionnaire', 'my-questionnaire/new'));
  };

  /**
   * To click on EDIT icon of Added questionnaire
   * @param: id
   * @return:  redirect the questionnaire page
   * */
  editQuestionnaire(id) {
    this.props.history.push(this.props.match.url.replace('my-questionnaire', 'my-questionnaire/edit/' + id));
  }

  /**
   * To update the selected questionnaire in redux store
   * @param: event,page
   * @return:  redirect the add questionnaire page
   * */
  handleChangePage(e, page) {
    if (e != null) {
      this.setState({intialPage: page,});
      this.props.onQuestionnaireChange({
        page: page,
        selectedQuestionnaire: this.props.createAJob.my_questionnaire.selectedQuestionnaire
      });
      this.getQuestionnaireData(parseInt(page) + 1)
    }
  }

  /**
   * To validate the questionnaire is selected or not before Move on next tab
   * @return:  if selected then call a function to save the detail else show toast message
   * */
  QuestionnaireNext = () => {
    if (this.state.activeQues === '' || this.state.activeQues === undefined) toast("Please select at least one questionnaire", {});
    else this.NextQuestionnaire(this.state.activeQues)
  };

  /**
   * To save the selected questionnaire
   * @param: id
   * @return: redirect the to next tab after save the detail
   * */
  NextQuestionnaire = async (id) => {
    try {
      const token = await handleLocalStorage('get', 'employerLogin');
      const AUTH_HEADER = {authorization: token, 'Content-Type': 'application/json',};
      const sendingData = {
        questioner_details: {"key": id, "value": ""},
        id: this.props.match.params.jobId
      };
      const questionnaireNext_response = await apiCall('post', sendingData, POST_JOB, AUTH_HEADER,);
      if (questionnaireNext_response.status) this.props.history.push(this.props.match.url.replace('my-questionnaire', 'publish-job'));
    } catch (e) {
      this.setState({loading: false});
    }
  };

  /**
   * To click on delete button of the questionnaire, opening delete modal
   * @param: id
   * @return:  update the state
   * */
  deleteQuestionnaire(id) {
    this.setState({deleteQuestionnaireModal: true, deleteQuestionnaireId: id})
  }

  /**
   * on click of close button of the delete questionnaire modal
   * @return:  update the state to close
   * */
  closeDeleteQuestionnaireModel = () => {
    this.setState({deleteQuestionnaireModal: false,})
  };

  /**
   * on click of preview icon of added questionnaire
   * @param: id
   * @return:  redirect to preview page
   * */
  previewQuestionnaireCard = (id) => {
    this.props.history.push(this.props.match.url.replace('my-questionnaire', 'my-questionnaire/preview/' + id));
  };

  /**
   * on click of  delete button of confirmation dialog modal
   * @param: value
   * @return: call an api to delete and update the state
   * */
  deleteQuestionnaireDetail = async () => {
    try {
      const token = await handleLocalStorage('get', 'employerLogin');
      const AUTH_HEADER = {authorization: token, 'Content-Type': 'application/json',};
      const sendingData = {id: this.state.deleteQuestionnaireId};
      const QuestionnaireNameDelete_response = await apiCall('delete', sendingData, DELETE_QUESTIONNAIRE, AUTH_HEADER,);
      if (QuestionnaireNameDelete_response.status) {
        this.getQuestionnaireData('1');
        this.setState({deleteQuestionnaireModal: false,})
      }
    } catch (e) {
      this.setState({loading: false});
    }
  };

  /**
   * on click of skip button
   * @param: value
   * @return:  redirect to next tab
   * */
  QuestionnaireSkip = async () => {
    try {
      const token = await handleLocalStorage('get', 'employerLogin');
      const AUTH_HEADER = {authorization: token, 'Content-Type': 'application/json',};
      const sendingData = {
        questioner_details: {"key": "", "value": ""},
        id: this.props.match.params.jobId
      };
      const questionnaireNext_response = await apiCall('post', sendingData, POST_JOB, AUTH_HEADER,);
      if (questionnaireNext_response.status) {
        this.props.history.push(this.props.match.url.replace('my-questionnaire', 'publish-job'));
      }
    } catch (e) {
      this.setState({loading: false});
    }
  };

  render() {
    if (!this.state.Loading) {
      const {page, selectedQuestionnaire} = this.props.createAJob.my_questionnaire;
      return (<div>
          {!this.state.Loading && (this.state.QuestionnaireName_data && this.state.QuestionnaireName_data.length > 0) ?
            <div className="my-questionnaire-view-container">
              <div>
                <button className="shenzyn-btn outline-primary-button my-questionnaire-btn"
                        onClick={this.addQuestionnaire}
                > Add Questionnaire
                </button>
              </div>
              <div className="my-questionnaire-view">
                <div className="pagination-style ">
                  <div style={{float: "right"}}>
                    <TablePagination
                      labelRowsPerPage=''
                      labelDisplayedRows={({from, to, count}) => ''}
                      rowsPerPageOptions={4}
                      colSpan={7}
                      count={this.state.totalCountPage}
                      rowsPerPage={10}
                      page={page}
                      SelectProps={{
                        native: true,
                      }}
                      style={{border: 'none'}}
                      onChangePage={(e, page) => this.handleChangePage(e, page)}
                      ActionsComponent={TablePaginationActionsWrapped}
                      align="center"
                    />
                  </div>
                </div>
                <div className="card-container">
                  {this.state.QuestionnaireName_data.map((value, index) => (
                    <QuestionnaireCard
                      questionnaireData={value}
                      isActive={selectedQuestionnaire}
                      onOrganisationRadioChange={(value) => this.onOrganisationRadioChange(value)}
                      deleteQuestionnaire={(id) => this.deleteQuestionnaire(id)}
                      editQuestionnaire={(id) => this.editQuestionnaire(id)}
                      previewQuestionnaireCard={(id) => this.previewQuestionnaireCard(id)}
                    />
                  ))}
                </div>
                <div className="form-hr-line"></div>
                <SaveAndCancelButton
                  cancelText="Skip"
                  saveText="Next"
                  onCancel={this.QuestionnaireSkip}
                  onSave={this.QuestionnaireNext}/>
              </div>
              <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.deleteQuestionnaireModal}
                onClose={this.closeDeleteQuestionnaireModel}
              >
                <ConformationDialog
                  actionType={this.state.actionType}
                  conformationStatus={this.deleteQuestionnaireDetail}
                  handleClose={this.closeDeleteQuestionnaireModel}
                  Text="Delete"
                  headingText="Do you want to delete the card?"
                />
              </Modal>
            </div>
            :
            <div>
              <NoQuestionnaire
                addQuestionnaire={this.addQuestionnaire}
                skipQuestionnaire={this.QuestionnaireSkip}
              />
            </div>
          }
        </div>
      );
    } else {
      return (
        <div>
          <LoadingIcon/>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = dispatch => ({
  onQuestionnaireChange: bindActionCreators(
    actions.updateMyQuestionnaire,
    dispatch,
  ),
});
export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireView);
