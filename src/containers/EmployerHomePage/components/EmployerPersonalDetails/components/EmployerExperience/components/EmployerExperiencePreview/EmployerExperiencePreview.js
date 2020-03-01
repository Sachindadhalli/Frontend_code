//library dependencies
import React, {Component} from 'react';
import { Grid, FormControl } from '@material-ui/core';

//style
import './style.scss';

//custom component
import CustomTag from '../../../../../../../../components/CustomTag';

//utilities
import {dateFormatter} from '../../../../../../../../Utilities';

class EmployerExperiencePreview extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {current_employer, current_designation, job_profile, id, joined_on, left_on, is_current_job_view} = this.props.experience;
    return (
      <div className="single-experience experience ml-sm-36 ml-16 px-12 px-sm-28">
        <div className="experience-edit">
          <FormControl>
            <label>{is_current_job_view ? "Current Employment" : "Past Employment"}</label>

          </FormControl>
          <CustomTag text="Edit" className="edit" onclick={this.props.onclick}/>
        </div>
        <Grid container>
          <Grid item xs={12} md={6} className="row-padding">
            <CustomTag text="Designation" className="field-heading change-label-style"/>
            <CustomTag text={current_designation ? current_designation.value : ''} className="field-text"/>
          </Grid>
          <Grid item xs={12} md={6} className="row-padding">
            <CustomTag text="Employer" className="field-heading change-label-style"/>
            <CustomTag text={current_employer ? current_employer.value : ''} className="field-text"/>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <CustomTag text="Job Profile" className="field-heading change-label-style"/>
            <CustomTag text={job_profile} className="field-text"/>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={6} className="row-padding">
            <CustomTag text="Joined in" className="field-heading change-label-style"/>
            <CustomTag text={dateFormatter(joined_on, 'MY', ' ')} className="field-text"/>
          </Grid>
          {!is_current_job_view ? <Grid item xs={12} md={6} className="row-padding">
            <CustomTag text="Left on" className="field-heading change-label-style"/>
            <CustomTag text={dateFormatter(left_on, 'MY', ' ')} className="field-text"/>
          </Grid> : null}
        </Grid>
      </div>
    );
  }
}

export default EmployerExperiencePreview;
