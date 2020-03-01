//library dependencies
import React, {Component} from 'react';
import {Dialog, MuiDialogTitle, IconButton, Typography, withStyles} from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import {toast} from 'react-toastify';

//style
import './styles.scss';

//icons
import CloseIcon from '@material-ui/icons/Close';

//custom component
import SaveAndCancelButton from '../../components/SaveAndCancelButton/SaveAndCancelButton';
import DialogQuetionnaireQuestions from './components/DialogQuetionnaireQuestions/DialogQuetionnaireQuestions';
import LoadingIcon from '../LoadingIcon';

//utilities
import {apiCall, handleLocalStorage} from '../../Utilities';
import {JOB_LISTING_GET_QUESTIONNAIRE, JOB_LISTING_QUICK_APPLY} from '../../../config/constants';

/**
 * used to overrides material ui components theme styles
 * @param theme
 */
const styles = theme => ({
  root: {margin: 0, padding: theme.spacing.unit * 2,},
  component: {color: '#656565', paddingTop: '20px', paddingLeft: '40px', paddingBottom: '20px',},
  paper: {maxWidth: "820px"},
  h6: {
    color: '#656565',
    fontFamily: 'Roboto',
    fontSize: '24px',
    fontWeight: '500',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineSeight: 'normal',
    letterSpacing: 'normal',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit * 3,
    top: theme.spacing.unit * 3,
    color: theme.palette.grey[500],
  },
  dialogContent: {paddingTop: '8px', paddingLeft: '40px', paddingRight: '40px', maxHeight: '70vh', minHeight: '20vh'},
  dialogAction: {justifyContent: 'center !important'}
});

/**
 * this is material ui dialog title customisation function used to customise model title
 */
const DialogTitle = withStyles(styles)(props => {
  const {children, classes, onClose} = props;
  return (
    <MuiDialogTitle disableTypography className={classes.component}>
      <Typography className={classes.h6} variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}> <CloseIcon/> </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

/**
 * used to overrides material ui dialog content style
 */
const DialogContent = withStyles(theme => ({
  root: {
    paddingTop: theme.spacing.unit * 1,
    paddingLeft: theme.spacing.unit * 5,
    paddingRight: theme.spacing.unit * 5,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(() => ({}))(MuiDialogActions);

class DialogQuestionnaire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.openDialog, id: this.props.id,
      name: 'name of questionnaire', answer: [], question_key: '', isDataEmpty: false, is_mandatory: '', data: [],
    };
  }

  /**
   * this function used to handle all answers related to radio, checkbox and textbox on every change event
   * and stores in state variable
   * @param index
   * @param value
   * @param type
   */
  onRadioChange = (index, value, type) => {
    if (type === "radio") {
      let new_data = this.state.data;
      new_data.forEach(data => {
        if (data.key === index) {
          let is_exist = false, answer_value = "";
          data.options.forEach(options => {
            if (options.value.key === value) {
              options.value.isActive = !options.value.isActive;
              let answers = this.state.answer;
              answer_value = options.value.value;
              for (let i = 0; i < answers.length; i++) {
                if (answers[i]["question_id"] === data.key) {
                  is_exist = true;
                  answers[i]["answer"] = options.value.value;
                  this.setState({answer: answers})
                }
              }
            }
            else {
              options.value.isActive = false
            }
          });
          if (!is_exist) {
            let answers = this.state.answer;
            answers.push({question_id: index, answer: answer_value});
            this.setState({answer: answers})
          }
        }
      });
      this.setState({data: new_data,});
    }
    else if (type === "checkbox") {
      let new_data = this.state.data;
      new_data.forEach(data => {
        if (data.key === index) {
          let is_exist = false, answer_value = "", is_removed = false;
          data.options.forEach(options => {
            if (options.value.key === value) {
              is_removed = true;
              options.value.isActive = !options.value.isActive
            }
          });
          if (is_removed) {
            let new_array = [], answers = this.state.answer;
            data.options.forEach(options => {
              if (options.value.isActive) {
                new_array.push(options.value.value)
              }
            });
            if (new_array.length === 0) {
              let updated_answers_array = [];
              for (let i = 0; i < answers.length; i++) {
                if (answers[i]["question_id"] !== data.key) {
                  is_exist = true;
                  updated_answers_array.push(answers[i])
                }
              }
              this.setState({answer: updated_answers_array})
            }
            else {
              for (let i = 0; i < answers.length; i++) {
                if (answers[i]["question_id"] === data.key) {
                  is_exist = true;
                  answers[i]["answer"] = new_array;
                  this.setState({answer: answers})
                }
              }
            }
            if (!is_exist) {
              let answers = this.state.answer;
              answers.push({question_id: index, answer: new_array});
              this.setState({answer: answers})
            }
          }
        }
      });
      this.setState({data: new_data,});
    }
    else {
      let new_data = this.state.data;
      new_data.forEach(data => {
        if (data.key === index) {
          let is_exist = false, answer_value = value.value ? value.value : '';
          data.options.forEach(options => {
            if (options.value.key === value.key) {
              options.value.isActive = !options.value.isActive;
              let answers = this.state.answer;
              answer_value = options.value.value;
              for (let i = 0; i < answers.length; i++) {
                if (answers[i]["question_id"] === data.key) {
                  is_exist = true;
                  answers[i]["answer"] = value.value;
                  this.setState({answer: answers})
                }
              }
            } else options.value.isActive = false;
          });
          if (!is_exist) {
            let answers = this.state.answer;
            answers.push({question_id: index, answer: answer_value});
            this.setState({answer: answers})
          }
        }
      });
      this.setState({data: new_data,})
    }
  };

  /**
   * this function call get questionnaire from server and show preview of questionnaire
   * @returns {Promise<void>}
   */
  previewQuestionnaire = async () => {
    try {
      this.setState({
        Loading: true,
      });
      const token = await handleLocalStorage('get', 'employeeLogin');
      const AUTH_HEADER = {
        authorization: token,
        'Content-Type': 'application/json',
      };
      const sendingData = {job_id: this.state.id,};
      const getQuestionnaire_response = await apiCall('post', sendingData, JOB_LISTING_GET_QUESTIONNAIRE, AUTH_HEADER,);
      if (getQuestionnaire_response.status) {
        getQuestionnaire_response.data.forEach(data => {
          this.setState({is_mandatory: data.is_mandatory,});
          data.options.forEach(options => {
            options.value["isActive"] = false
          });
        });
        this.setState({
          data: getQuestionnaire_response.data,
          name: getQuestionnaire_response.name,
          Loading: false,
          is_mandatory: getQuestionnaire_response.data.is_mandatory,
        });

      }
      else if (getQuestionnaire_response.data.length === 0) {
        this.setState({isDataEmpty: true});
        this.saveQuestionnaireAnswer()
      }
    } catch (e) {
      this.setState({loading: false});
    }
  };
  /**
   * on submit click check for all mandatory fields are selected or not
   * else gave and error messages
   */
  onSubmitAnswers = () => {
    let is_mandatory = true;
    this.state.data.forEach(data => {
      if (data.is_mandatory) {
        let answered = false;
        for (let i = 0; i < this.state.answer.length; i++) {
          if (data.key === this.state.answer[i].question_id) {
            answered = true
          }
        }
        if (!answered) is_mandatory = false;
      }
    });
    if (is_mandatory) this.saveQuestionnaireAnswer();
    else toast(`Please fill mandatory fields`, {});
  };

  /**
   * used to save questionnaire answers in server database using api call
   * @param index
   * @param key
   * @returns {Promise<void>}
   */
  saveQuestionnaireAnswer = async (index, key) => {
    const token = await handleLocalStorage('get', 'employeeLogin');
    const AUTH_HEADER = {authorization: token, 'Content-Type': 'application/json',};
    let sendingData = {
      job_id: this.state.id,
      responses: this.state.isDataEmpty === true ? [] : [{
        'question_id': this.state.question_key,
        'answer': this.state.answer
      }],
    };
    const getSavedQuestionnaire_response = await apiCall('post', sendingData, JOB_LISTING_QUICK_APPLY, AUTH_HEADER,);
    if (getSavedQuestionnaire_response.status) {
      this.props.handleQuestionnairemodel();
      this.props.changeButtonStatus();
      toast(getSavedQuestionnaire_response.message, {})
    }
    else this.setState({open: false}, () => this.props.handleQuestionnairemodel());

  };

  /**
   * after component will mount call previous questionnaire function
   */
  componentWillMount() {
    this.previewQuestionnaire();
  }

  /**
   * on click open dialog
   */
  handleClickOpen = () => {
    this.setState({open: true,});
  };

  /**
   * on close cloas dialog and call handleQuestionnairemodel function of parent through props
   */
  handleClose = () => {
    this.setState({open: false}, () => {
      this.props.handleQuestionnairemodel();
    })
  };

  /**
   * on cancel question preview closed dialog
   */
  cancelQuestionPerview = () => {
    this.setState({open: false});
  };

  /**
   * update state to open or close dialog whenever response come through props
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    this.setState({open: nextProps.openDialog})
  }

  render() {
    const {data, name} = this.state;
    const {classes} = this.props;
    if (!this.state.Loading) {
      return (
        <div className="dialog-questionnaire-main-container">
          <Dialog
            onClose={this.handleClose}
            maxWidth={screen.width < 480 ? 'xs' : screen.width > 480 && screen.width > 900 ? 'md' : 'lg'}
            fullWidth={true}
            aria-labelledby="customized-dialog-title"
            classes={{paper: classes.paper}}
            open={this.state.open}
          >
            <DialogTitle
              className={classes.component}
              id="customized-dialog-title"
              style={{color: '#656565'}}
            >
              {name}
            </DialogTitle>
            <DialogContent className={classes.dialogContent} dividers>
              {data.map((key, index) => (
                <DialogQuetionnaireQuestions
                  data={key}
                  index={index}
                  cancelQuestionPerview={this.cancelQuestionPerview}
                  saveQuestionnaireAnswer={this.saveQuestionnaireAnswer}
                  onRadioChange={(index, value, type) => this.onRadioChange(index, value, type)}
                />
              ))}
            </DialogContent>
            <DialogActions className={classes.dialogAction} classes="flex-override-justify-content">
              <div className="dialog-action-component">
                <SaveAndCancelButton
                  cancelText="Cancel"
                  saveText="Save"
                  onCancel={this.cancelQuestionPerview}
                  onSave={this.onSubmitAnswers}
                />
              </div>
            </DialogActions>
          </Dialog>
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

export default withStyles(styles)(DialogQuestionnaire);
