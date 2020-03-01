//library dependencies
import React, {Component} from 'react';
import {TextField, Modal, FormHelperText} from '@material-ui/core';
import uuid from 'uuid/v4';

//style
import './style.scss';

//custom component
import QuestionCard from './QuestionCard/QuestionCard';
import ConformationDialog from '../../../../../../components/ConformationDialog/ConformationDialog';
import LoadingIcon from "../../../../../../components/LoadingIcon";
import SaveAndCancelButton from '../../../../../../components/SaveAndCancelButton';

//utilities
import {apiCall, handleLocalStorage} from "../../../../../../Utilities";
import {CREATE_QUESTIONNAIRE, EDIT_QUESTIONNAIRE, GET_QUESTIONNAIRE} from "../../../../../../../config/constants";


class AddQuestionnaire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      QuestionnaireViewData: {},
      disabledAddNewQuestion: false,
      editId: '',
      name_error: '',
      canSubmit: true,
      deleteQuestionId: '',
      deleteQuestionModel: false,
      QuestionnaireNewData: {
        name: '',
        data: [{
          question: '',
          type: 'Radio button',
          options: ['', ''],
          is_mandatory: false,
        },
          {
            question: '',
            type: 'Radio button',
            options: ['', ''],
            is_mandatory: false,
          }],
      }
    };
    this.validationStaus = true;
  }

  componentWillMount() {
    // checking from the url path weather is edit or new questionnaire ,
    // according to that update their state by calling a function.
    if (this.props.match.url.includes("edit")) this.editQuestionnaireDetail(this.props.match.params.editId);
    else if (this.props.match.url.includes("new")) this.addQuestionnaire()
  }

  /**
   * on click Edit icon, getting data from an api
   *@param: id
   * @return: update state with coming data to auto populate the data to field
   * */
  editQuestionnaireDetail = async id => {
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
   * on click save button
   *@param: event
   * @return: update state with coming data to auto populate the data to field
   * */
  saveQuestionnaire = async (e) => {
    e.preventDefault();
    this.validationStaus = true;
    await this.checkForErrors('name');
    await this.validateAllfroms();
    if (!(this.isFormValidated())) {
    } else {
      try {
        const token = await handleLocalStorage('get', 'employerLogin');
        const AUTH_HEADER = {authorization: token, 'Content-Type': 'application/json',};
        if (this.props.match.url.includes("edit")) {
          const sendingData = {...this.state.QuestionnaireViewData, "id": this.props.match.params.editId};
          const update_questionnaire = await apiCall('post', sendingData, EDIT_QUESTIONNAIRE, AUTH_HEADER,);
          if (update_questionnaire.status) this.props.history.goBack()
        } else if (this.props.match.url.includes("new")) {
          const sendingData = {...this.state.QuestionnaireViewData,};
          const save_questionnaire = await apiCall('post', sendingData, CREATE_QUESTIONNAIRE, AUTH_HEADER,);
          if (save_questionnaire.status) {
            this.props.history.push(this.props.match.url.replace('my-questionnaire/new', 'my-questionnaire'))
          }
        }
      } catch (e) {
        this.setState({loading: false});
      }
    }
  };

  /**
   * on change in the input field of ADD questionnaire form
   *@param: event
   * @return: update state , validate the field
   * */
  onInputChange = e => {
    let name = e.target.value;
    this.setState({QuestionnaireViewData: {...this.state.QuestionnaireViewData, name}},
      () => {
        this.checkForErrors("name");
      },
    );
  };

  /**
   * validate the questionnaire  name
   *@param: name
   * @return: update state with the error message
   * */
  checkForErrors = name => {
    let error = false;
    if (this.state.QuestionnaireViewData.name === '' || this.state.QuestionnaireViewData.name == null) {
      error = true;
      this.setState({
        name_error: 'Kindly enter Questionnaire name'
      })
    } else if (this.state.QuestionnaireViewData.name.length > 100) {
      error = true;
      this.setState({
        name_error: 'Kindly enter Question in 100 words'
      })
    } else if (this.state.name !== '') {
      this.setState({
        name_error: '',
      })
    }
    return error;
  };
  /**
   * to validate the from before save
   * @return: a boolean(error status)
   * */
  isFormValidated = () => {
    let isValidatedState = true;

    if (this.state.name_error !== '') {
      isValidatedState = false;
      return false
    }

    if (!this.validationStaus) {
      isValidatedState = false;
      return false
    }
    return isValidatedState
  };

  /**
   * validate all the question card on click of SAVE button, calling a function of child component with ref
   * @return: a boolean (status)
   * */
  validateAllfroms = async () => {
    for (let child in this.allCardForms) {
      if (this.allCardForms[child] != null) {
        let isItInvalid = await this.allCardForms[child].validateAllQuestioncard();
        if (!isItInvalid) this.validationStaus = false;
      }
    }
  };

  /**
   * on click of cancel button,redirecting to questionnaire view page
   * @return: redirecting to previous page
   * */
  cancelCreateQuestionnaire = () => {
    this.props.history.goBack();
  };

  /**
   * on click of ADD new Question button
   * @return: update state with new question data
   * */
  addNewQuestion = () => {
    const newQuestionAdded = this.state.QuestionnaireViewData.data;
    newQuestionAdded.push({
      question: '',
      is_mandatory: false,
      type: 'Radio button',
      options: ['', ''],
    });

    this.setState({
      question: newQuestionAdded,
    });
  };

  /**
   * on click of ADD new Questionnaire
   * @return: update state with the error message
   * */
  addQuestionnaire = () => {
    const questionNewData = this.state.QuestionnaireNewData;
    this.setState({QuestionnaireViewData: questionNewData,});
  };

  /**
   * on click Delete button of confirmation dialog box
   * @return: Delete the question data from state , updating state to close dialog box
   * */
  deleteQuestionCard = () => {
    const {deleteQuestionId} = this.state;
    const questions = this.state.QuestionnaireViewData.data;
    questions.splice(deleteQuestionId, 1);
    this.setState({...this.state.question, question: questions, deleteQuestionModel: false,});
  };

  /**
   * on click Close icon in confirmation dialog box
   * @return: updating the state to close the dialog box
   * */
  closeDeleteQuestionModel = () => {
    this.setState({deleteQuestionModel: false,});
  };

  /**
   * on click Delete icon in question card,opening a confirmation dialog box
   * @return: Delete the question data from state , updating state to close dialog box
   * */
  openDeleteQuestionModel = deleteCardId => {
    this.setState({deleteQuestionId: deleteCardId, deleteQuestionModel: true,});
  };

  allCardForms = {};

  render() {
    if (!this.state.Loading) {
      return (
        <div className="my-add-questionnaire-container">
          <div className="my-questionnaire-add-content">
            <div className="questionnaire-name">Name this Questionnaire</div>
            <div>
              <TextField style={{width: '75%'}}
                         value={this.state.QuestionnaireViewData.name}
                         id="name"
                         name="name"
                         error={this.state.name_error}
                         onChange={e => {
                           this.onInputChange(e);
                         }}
                         onBlur={e => {
                           this.onInputChange(e);
                         }}
              />
              {
                <FormHelperText error={this.state.name_error !== ''} id="name_error">
                  <span className="field_error">{this.state.name_error}
                  </span>
                </FormHelperText>
              }
            </div>
            {this.state.QuestionnaireViewData.data.map((data, index) => (
              <QuestionCard
                onRef={ref => (this.allCardForms[index] = ref)}
                key={uuid()}
                questionData={data}
                id={index}
                deleteQuestionCard={deleteCardId => {
                  this.openDeleteQuestionModel(deleteCardId);
                }}
              />
            ))}
          </div>
          <div className="add-question">
            <button
              className="shenzyn-btn outline-primary-button"
              onClick={this.addNewQuestion}
            >
              Add New Question
            </button>
          </div>
          <div className="save-cancel-questionnaire">
            <SaveAndCancelButton
              cancelText="Cancel"
              saveText="Save"
              onCancel={this.cancelCreateQuestionnaire}
              onSave={this.saveQuestionnaire}
            />
          </div>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.deleteQuestionModel}
            onClose={this.closeDeleteQuestionModel}
          >
            <ConformationDialog
              actionType={this.state.actionType}
              conformationStatus={this.deleteQuestionCard}
              handleClose={this.closeDeleteQuestionModel}
              Text="Delete"
              headingText="Are you sure you want to Delete Question Card?"
            />
          </Modal>
        </div>
      );
    } else {
      return (
        <div>
          <LoadingIcon/>

        </div>
      )
    }
  }
}

export default AddQuestionnaire;
