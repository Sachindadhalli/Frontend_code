//library dependency
import React, { Component } from 'react';
import { FormControl, Input, withStyles} from '@material-ui/core';

//custom components

//styles
import './styles.scss';
import customisedMaterial from "../../../../styles/customisedMaterial";
import CustomTag from '../../../../components/CustomTag';

//utilities

//icons

const styles = () => ({...customisedMaterial});


class EditProfileSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile_summary_error:'',
      profile_summary:''
    }
  }

  /**
   * on profile summary change update summary details in state
   * @param e
   */
  onProfileSummaryChange=(e)=>{
    if(e.target.value.length<=1000){
      this.setState({profile_summary:e.target.value})
    }
  };

  render() {
    const { profile_summary, profile_summary_error } = this.state;
    const { classes } = this.props;
    return (
      <div className='edit-profile-summary-container width-100-per'>
        <FormControl error={profile_summary_error} className='width-100-per'>
          <Input
            name="Profile Summary"
            onChange={this.onProfileSummaryChange}
            value={profile_summary}
            multiline={true}
            classes={{underline: classes.cssUnderline, focused: classes.cssFocused,}}
          >
          </Input>
          <div className='max-limit-number-wrapper'>
            <CustomTag text="Maximum Character Limit : " className="maximum-character-limit" />
            <CustomTag text={profile_summary ? 1000-profile_summary.length: 1000} className="count" />
          </div>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(EditProfileSummary);
