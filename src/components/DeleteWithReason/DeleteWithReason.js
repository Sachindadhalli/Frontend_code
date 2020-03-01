//library dependencies
import React, {Component} from 'react';
import {Radio, RadioGroup, FormControl, FormControlLabel, FormHelperText, TextField} from '@material-ui/core';

//style
import './styles.scss';

//icon
import close from '../../../assets/media/images/close.png';

class DeleteWithReason extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeOfReason: "I don't use this platform",
      comment: '',
      reasonError: '',
      reason: [{name: "I don't use this platform", id: "1"}, {name: "This platform is not useful to me", id: "2"}],
    };
  }

  /**
   * this function used to handle chnage of delete reason input field
   * this will update in state variable and check for length is less than 300
   * @param event
   */
  handleChange = event => {
    const {name, value} = event.target;
    if (value.length <= 300) this.setState({[name]: value, reasonError: ''});
  };

  /**
   * on delete click it will first validate if delete reason is provided or not if not then it will rise error
   * or else send details to parent component using props
   */
  onDeleteClick = () => {
    if (this.state.typeOfReason === "others") {
      if (this.state.comment.length > 0) {
        this.props.isdeleteMyAccount({
          reason: this.state.typeOfReason === "others" ? this.state.comment : this.state.typeOfReason,
          actionType: 'delete'
        });
        this.setState({reasonError: ''})
      } else {
        this.setState({reasonError: 'Please specify your reason'});
      }
    } else {
      this.props.isdeleteMyAccount({
        reason: this.state.typeOfReason === "others" ? this.state.comment : this.state.typeOfReason,
        actionType: 'delete'
      })
    }
  };

  /**
   * error validation function for error reason
   */
  checkReasonError = () => {
    if (this.state.comment.length > 0) this.setState({reasonError: ''});
    else this.setState({reasonError: 'Please specify your reason'});
  };

  render() {
    const {typeOfReason, comment, reason, reasonError} = this.state;
    const {headingText} = this.props;
    return (
      <div className="delete-with-reason-model-container">
        <div className="delete-with-reason-model">
          <div className="delete-with-reason-model-inside-form">
            <div className="delete-modal-close">
              <img src={close} className="close" alt="close" onClick={this.props.closeDeleteDialog}/>
            </div>
            <div className="delete-account-pop-up">{headingText}</div>
            <FormControl className="delete-modal-radio-buttons">
              <RadioGroup name="typeOfReason" onChange={this.handleChange} defaultValue={typeOfReason}>
                {reason.map((name, index) => (
                  <FormControlLabel id={index} value={name.name} control={<Radio/>} label={name.name}/>))}
                <FormControlLabel value="others" control={<Radio/>} label="Others"/>
              </RadioGroup>
              {typeOfReason === 'others' && (
                <div className="value-other-specify-reason-field">
                  <TextField
                    id="specify reason"
                    name="comment"
                    InputLabelProps={{shrink: true}}
                    label={<span style={{
                      color: '#656565',
                      fontFamily: 'Roboto',
                      fontSize: '14px',
                      fontWeight: '400',
                      marginTop: '-8px'
                    }}>Specify Reason</span>}
                    value={comment}
                    onBlur={this.checkReasonError}
                    onChange={this.handleChange}
                    margin="normal"
                    error={reasonError !== ''}
                  />
                  <div className="value-other-specify-reason-field-charactercount">
                    <div className="value-other-specify-reason-field-charactercount-left-character">Characters left:
                    </div>
                    <div
                      className="value-other-specify-reason-field-charactercount-left-character-count">{300 - comment.length}</div>
                  </div>
                  <FormHelperText error={reasonError !== ''} id="file_error">
                    <span className="field_error" style={{marginTop: '-24px'}}> {reasonError} </span>
                  </FormHelperText>
                </div>
              )}
              <div className="delete-button">
                <button className="shenzyn-btn outline-primary-button px-40 mr-20 "
                        onClick={this.props.closeDeleteDialog}>Cancel
                </button>
                <button className="shenzyn-btn filled-primary-button px-40" onClick={this.onDeleteClick}>Delete</button>
              </div>
            </FormControl>

          </div>
        </div>
      </div>
    );
  }
}

export default DeleteWithReason;
