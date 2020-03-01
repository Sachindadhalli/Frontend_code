// library dependencies
import React, {Component} from 'react';

//style
import './style.scss';

//custom component
import QuestionsPerview from './QuestionsPerview/QuestionsPerview';
import SaveAndCancelButton from '../../../../../../../../components/SaveAndCancelButton/SaveAndCancelButton';
import LoadingIcon from "../../../../../../../../components/LoadingIcon";

//utilities
import {apiCall, handleLocalStorage} from "../../../../../../../../Utilities";
import {GET_QUESTIONNAIRE} from "../../../../../../../../../config/constants";


class QuestionnairePerview extends Component {
  constructor(props) {
    super(props);
    this.state = {Loading: false, QuestionnaireViewData: {},}
  }

  componentWillMount() {

    // receiving the Questionnaire id from url params, calling a function to get data of that id.
    const id = this.props.match.params.previewId;
    this.previewQuestionnaire(id)
  }

  /**
   * To preview questionnaire getting data from an api
   * @param: id
   * @return: update the state with coming data
   * */
  previewQuestionnaire = async id => {
    try {
      this.setState({editId: id, Loading: true,});
      const token = await handleLocalStorage('get', 'employerLogin');
      const AUTH_HEADER = {authorization: token, 'Content-Type': 'application/json',};
      const sendingData = {id: id,};
      const getQuestionnaire_response = await apiCall('get', sendingData, GET_QUESTIONNAIRE, AUTH_HEADER,);
      if (getQuestionnaire_response.status) {
        this.setState({QuestionnaireViewData: getQuestionnaire_response.data, Loading: false,})
      }
    } catch (e) {
      this.setState({loading: false});
    }
  };

  /**
   * on click of cancel button, redirection happens to the QuestionnaireView page
   * @return:  redirect to back page
   * */
  cancelQuestionPerview = () => {
    this.props.history.goBack();
  };

  /**
   * on click of edit button, redirection happens to the EditQuestionnaire page
   * @return:  redirect to edit page
   * */
  editQuestionPerview = () => {
    const id = this.props.match.params.previewId;
    this.props.history.push(this.props.match.url.replace('my-questionnaire/preview/' + id, 'my-questionnaire/edit/' + id));
  };

  render() {
    if (!this.state.Loading) {
      return (
        <div className="my-questionnaire-perview">
          <div className="question-title">{this.state.QuestionnaireViewData.name}</div>
          {this.state.QuestionnaireViewData.data.map((key, index) => (
            <QuestionsPerview
              data={key}
              index={index}
              cancelQuestionPerview={this.cancelQuestionPerview}
              editQuestionPerview={this.editQuestionPerview}
            />
          ))}
          <div className="save-cancel-btn">
            <SaveAndCancelButton
              cancelText="Cancel"
              saveText="Edit"
              onCancel={this.cancelQuestionPerview}
              onSave={this.editQuestionPerview}
            />
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <LoadingIcon/>
        </div>
      )
    }
  }
}

export default QuestionnairePerview;
