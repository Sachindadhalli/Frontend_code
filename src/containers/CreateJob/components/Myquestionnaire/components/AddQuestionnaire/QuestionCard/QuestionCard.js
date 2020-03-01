// library dependencies
import React, {Component} from 'react';
import {FormControlLabel, FormControl, Checkbox, InputLabel, Input, FormHelperText} from '@material-ui/core';

//style
import './style.scss';

//icon
import CustomIcon from '../../../../../../../components/CustomIcon/CustomIcon';
import deleteIcon from '../../../../../../../../assets/media/icons/deleteIcon.svg';

//custom component
import OptionCheckboxRadio from './component/OptionCheckboxRadio/OptionCheckboxRadio';
import NonCreatableSingleSelectDropdown
  from "../../../../../../../components/SingleSelectDropdownWrapper/components/NonCreatableSingleSelectDropdown/NonCreatableSingleSelectDropdown";

class QuestionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: props.questionData,
      question_error: '',
      option_error1: '',
      option_error2: '',
      option_error3: '',
      option_error4: '',
      option_error0: '',
      addOptionDisabled: false,
      allFieldsStatus: {
        question: false,
      },
      options: [{key: 1, value: "Checkbox"}, {key: 2, value: "Radio button"}, {key: 3, value: "Textbox"}]
    };
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(null);
  }

  /**
   * on click of checkbox question is mandatory
   * @return: update state
   * */
  handleIsMandatory = e => {
    const {id} = e.target;
    const {question} = this.state;
    question[id] = e.target.checked;
    this.setState({question,});
  };

  /**
   * on click of DELETE button
   * @param: index
   * @return: update state ,displaying error if there is two option
   * */
  deleteOption = index => {
    const option = this.state.question.options;
    const optionError = "option_error" + index;
    if (option.length > 2) {
      option.splice(index, 1);
      this.setState({question: {...this.state.question, option},});
    } else {
      this.setState({[optionError]: 'min 2 option'});
      setTimeout(() => {
        this.setState({[optionError]: ''})
      }, 3000)
    }

    if (option.length < 5) {
      this.setState({question: {...this.state.question, addOptionDisabled: false},});
    }
  };

  /**
   * on click of save the Questionnaire button , validate all question cards with ref
   * @return: a boolean
   * */
  validateAllQuestioncard = async () => {
    let isValid = true;
    await this.onSaveCheckError();
    if (this.state.question_error !== '' || this.state.option_error0 !== '' || this.state.option_error1 !== '' ||
      this.state.option_error2 !== '' || this.state.option_error3 !== '' || this.state.option_error4 !== '') {
      isValid = false;
      return isValid
    }
    return isValid
  };

  /**
   * To validate all input fields in all question cards , and displaying errors
   * @return:  update the state with error message
   * */
  onSaveCheckError = () => {
    const question = this.state.question.question;
    const Type = this.state.question.type;
    const options = this.state.question.options;
    const question_error = this.state.question_error;
    const option_error0 = this.state.option_error0;
    const option_error1 = this.state.option_error1;
    const option_error2 = this.state.option_error2;
    const option_error3 = this.state.option_error3;
    const option_error4 = this.state.option_error4;
    if (question === '' || question == null) {
      this.setState({
        question_error: 'Kindly enter Question',
      });
    }
    if (question.length > 150) {
      this.setState({
        question_error: 'Kindly enter Question in 150 words',
      });
    }
    if (options.length > 0 && Type !== "Textbox") {

      options.map((value, index) => {
        let option = "option_error" + index;
        if (value === '' || value == null) {
          this.setState({
            [option]: "kindly specify option"
          })
        }
      })
    }
  };

  /**
   * To validate QUESTION NAME in question cards , and displaying errors
   * @param: name
   * @return:  update the state with error message
   * */

  checkForErrors = name => {
    const field_name = `${name}_error`;
    let error = false;
    if (this.state.question[name] === '' || this.state.question[name] == null) {
      error = true;
      this.setState({
        [field_name]: 'Kindly enter Question',
      });
    } else if (this.state.question[name].length > 150) {
      error = true;
      this.setState({
        [field_name]: 'Kindly enter Question in 150 words',
      });
    } else if (this.state.question[name]) {
      this.setState({
        [field_name]: '',
      });
    }
    return error;
  };

  /**
   * To validate OPTIONS in question cards , and displaying errors
   * @param: id , name
   * @return:  update the state with error message
   * */

  checkOptionErrors = (id, name) => {
    let error = false;
    if (this.state.question.option[id] === '' || this.state.question.option[id] == null) {
      error = true;
      this.setState({
        [name]: 'Kindly enter Option',
      });
    } else if (this.state.question.option[id]) {
      this.setState({
        [name]: '',
      });
    }
    return error;
  };
  /**
   * On change in the input field in question card
   * @param: e
   * @return:  update the state with new value
   * */
  onInputChange = e => {
    const {id} = e.target;
    const {question} = this.state;
    question[id] = e.target.value;
    this.setState(
      {
        question,
      },
      () => {
        this.checkForErrors('question');
      },
    );
  };

  /**
   * On change in option field in question cards , and validating on change
   * @param: event , index
   * @return:  update the state with error message
   * */
  onOptionChange = (e, index) => {
    const option = this.state.question.options;
    option[index] = e.target.value;
    this.setState(
      {
        question: {
          ...this.state.question,
          option,
        },
      },
      () => {
        this.checkOptionErrors(index, `option_error${index}`);
      },
    );
  };

  /**
   * on click of ADD ANOTHER OPTION , adding one option more
   * @return:  update the state and disabled button when u add max 5 option
   * */
  addAnotherOption = () => {
    const length = this.state.question.options.length + 1;
    const option = this.state.question.options;
    option.push("");
    this.setState({
      question: {
        ...this.state.question,
        option,
      },
    });
    if (length === 5) {
      this.setState({
        question: {
          ...this.state.question,
          addOptionDisabled: true,
        },
      });
    }
  };

  /**
   * on click of  drop down to change the option type
   * @param: option
   * @return: update the state with new option type
   * */
  onChangeOptionType = (option) => {
    const {question} = this.state;
    question.addOptionDisabled = false;
    const options = [""];
    const RadioAndCheck = ["", ""];
    question.type = option.label;
    if (option.label === "Textbox") {
      question.options = options

    } else {
      question.options = RadioAndCheck
    }
    this.setState({question,})
  };

  render() {
    const {question_error} = this.state;
    return (
      <div className="card-container">
        <div className="title-question">Question {parseInt(this.props.id) + 1} </div>
        <div className="card">
          <div style={{float: 'right'}}>
            <CustomIcon
              icon={deleteIcon}
              iconStyle="delete-icon-question-card"
              onclick={() => this.props.deleteQuestionCard(this.props.id)}
            />
          </div>
          <div className="ques-card-grid">
            <div className="ques-card-item">
              <FormControl style={{width: '90%'}}>
                <InputLabel shrink={true}>Enter the Question</InputLabel>
                <Input
                  id="question"
                  name="question"
                  onChange={e => {
                    this.onInputChange(e);
                  }}
                  value={this.state.question.question}
                  onBlur={e => {
                    this.onInputChange(e)
                  }}
                  error={question_error}
                />
                {
                  <FormHelperText error={this.state.question_error !== ''} id="name_error">
                  <span className="field_error">{this.state.question_error}
                  </span>
                  </FormHelperText>
                }
              </FormControl>
            </div>
            <div className="ques-card-item">
              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="is_mandatory"
                      name="is_mandatory"
                      defaultChecked={false}
                      checked={this.state.question.is_mandatory}
                      onChange={this.handleIsMandatory}
                    />
                  }
                  label="Question is mandatory"
                />
              </FormControl>
            </div>
          </div>
          <div className="ques-card-grid">
            <div className="ques-card-item">
              <FormControl style={{width: '75%'}}>
                <InputLabel shrink={true} style={{marginTop: '-13px'}}>Choose answer type</InputLabel>
                <NonCreatableSingleSelectDropdown

                  isSearchable={false}
                  defaultValue={{value: this.state.question.type, label: this.state.question.type}}
                  getSelectedOption={(option) => this.onChangeOptionType(option)}
                  options={this.state.options}
                  isClearable={false}
                />

              </FormControl>
            </div>
          </div>
          <div>
            <OptionCheckboxRadio
              type={this.state.question.type}
              questionChange={this.onInputChange}
              options={this.state.question.options}
              option_error0={this.state.option_error0}
              option_error1={this.state.option_error1}
              option_error2={this.state.option_error2}
              option_error3={this.state.option_error3}
              option_error4={this.state.option_error4}
              addAnotherOption={() => this.addAnotherOption()}
              inputChange={(e, index) => this.onOptionChange(e, index)}
              addOptionDisabled={this.state.question.addOptionDisabled}
              deleteOption={index => {
                this.deleteOption(index);
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionCard;
