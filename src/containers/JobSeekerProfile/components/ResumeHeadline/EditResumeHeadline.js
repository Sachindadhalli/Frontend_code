//library dependency
import React, {Component} from 'react';
import {FormControl, Input, withStyles} from '@material-ui/core';

//custom components
import CustomTag from '../../../../components/CustomTag';

//styles
import './styles.scss';
import customisedMaterial from "../../../../styles/customisedMaterial";

//utilities

//icons


const styles = () => ({...customisedMaterial});

class EditResumeHeadline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resume_headline_error: '',
      resume_headline: ''
    }
  }

  /**
   * on resume headline change update headline details in state
   * @param e
   */
  onResumeHeadlineChange = (e) => {
    if (e.target.value.length <= 1000) {
      this.setState({resume_headline: e.target.value})
    }
  };

  render() {
    const {resume_headline, resume_headline_error} = this.state;
    const {classes} = this.props;
    return (
      <div className='edit-resume-headline-container width-100-per'>
        <div className='reload-clear-all-styles width-100-per'>
          <span>Reload</span><span className='clear-all'>Clear All</span>
        </div>
        <FormControl error={resume_headline_error} className='width-100-per'>
          <Input
            name="Profile Summary"
            onChange={this.onResumeHeadlineChange}
            value={resume_headline}
            multiline={true}
            classes={{underline: classes.cssUnderline, focused: classes.cssFocused,}}
          >
          </Input>
          <div className='max-limit-number-wrapper'>
            <CustomTag text="Maximum Character Limit : " className="maximum-character-limit"/>
            <CustomTag text={resume_headline ? 1000 - resume_headline.length : 1000} className="count"/>
          </div>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(EditResumeHeadline);
