//library dependencies
import React, { Component } from 'react';
import { Typography, TextField, FormControlLabel, Checkbox, Radio } from '@material-ui/core';

//style
import './styles.scss';


class DialogQuetionnaireQuestions extends Component {
  state = {value:''};

  /**
   * on answer change of each field, event will this function will called and then all details to parent component using props
   * @param index
   * @param valuekey
   * @param type
   */
  handleChange = (index,valuekey, type) => {
    this.props.onRadioChange(index,valuekey, type);
  };

  /**
   * this function render answer options depending upon question type
   * it will render radio buttons, checkbox, and text field depends op type to question
   * @param question
   * @returns {*}
   */
  handleOption = (question) => {
    return question.options.map((value) => {
      switch (value.type.value) {
        case 'TextField':
          let val=value.value;
          val.key=value.value.key;
          val.value=value.value.value;
          val.isActive=value.value.isActive;
          return <TextField onChange={(e)=>this.handleChange(question.key,{key:val.key,value:e.target.value,isActive:val.isActive},"textfield")}/>;
        case 'CheckboxField':
          return (
            <div className="dialog-option-content">
            <FormControlLabel
            control={ <Checkbox
                name={question.key}
                value={value.value.key}
                onChange={()=>this.handleChange(question.key,value.value.key,"checkbox")}
            />
            }
            label={<Typography >{value.value.value}</Typography>}
            /> 
            </div>
          );
        case 'RadioField':
          return (
                <div className="dialog-option-content">
                  <FormControlLabel
                    control={
                      <Radio
                        name={question.key}
                        value={value.value.key}
                        onChange={()=>this.handleChange(question.key,value.value.key, "radio")}
                        checked={value.value.isActive}
                      />
                    }
                    label={<Typography >{value.value.value}</Typography>}
                  />
                </div>
          );
      }
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="dialog-questions-perview">
        <div className="dialog-question-name">{`${this.props.index+1}. ${this.props.data.value}`}
        {this.props.data.is_mandatory == true? <span style={{color:'red',fontSize:'15px',paddingLeft:'3px',paddingBottom:'2px'}}><sup style={{top:'-0.25em'}}>*</sup></span>:null }
        </div>
        <div className="dialog-option-container-div">
        {this.handleOption(this.props.data, classes)}
        </div>
      </div>
    );
  }
}
export default (DialogQuetionnaireQuestions);
