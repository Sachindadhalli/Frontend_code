//library dependency
import React, {Component} from "react";
import Grid from '@material-ui/core/Grid'

//custom components
import LabelValueComponent from '../../../../components/ReusableComponents/LabelValueComponent'

//styles
import './styles.scss';

//utilities

//icons


class ViewDesiredCareerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      desired_profile: {
        "industry": {key: '', value: 'Information Technology'},
        "functional_area": {key: '', value: 'PeopleSoft'},
        "role": {key: '', value: 'Project Lead'},
        "job_type": 'permanent',
        "shift": 'flexible',
        "availablity_to_join": "immediate",
        "available_month": 3,
        "available_year": 2019,
        "expected_salary": {
          "currency": "inr",
          "value": 12
        },
        "location": [{key: '', value: 'Mumbai'}, {key: '', value: 'test'}, {key: '', value: 'test'}],

      }

    }
  }

  render() {
    const {desired_profile} = this.state;
    return (
      <div className='view-desired-career-profile-main-wrapper'>
        <div style={{"paddingBottom": "24px"}}>
          <Grid container spacing={16}>
            <Grid item xs={12} md={4}>
              <LabelValueComponent label='Industry'
                                   value={desired_profile.industry && desired_profile.industry.value ? desired_profile.industry.value : "-"}/>
            </Grid>
            <Grid item xs={12} md={4}>
              <LabelValueComponent label='Functional Area'
                                   value={desired_profile.functional_area && desired_profile.functional_area.value ? desired_profile.functional_area.value : "-"}/>
            </Grid>
            <Grid item xs={12} md={4}>
              <LabelValueComponent label='Role'
                                   value={desired_profile.role && desired_profile.role.value ? desired_profile.role.value : "-"}/>
            </Grid>
          </Grid>
        </div>
        <div style={{"paddingBottom": "24px"}}>
          <Grid container spacing={16}>
            <Grid item xs={12} md={4}>
              <LabelValueComponent label='Job Type' value={desired_profile.job_type ? desired_profile.job_type : "-"}/>
            </Grid>
            <Grid item xs={12} md={4}>
              <LabelValueComponent label='Desired Shift' value={desired_profile.shift ? desired_profile.shift : "-"}/>
            </Grid>
            <Grid item xs={12} md={4}>
              <LabelValueComponent label='Availability to Join'
                                   value={desired_profile.availablity_to_join ? desired_profile.availablity_to_join : "-"}/>
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid container spacing={16}>
            <Grid item xs={12} md={4}>
              <LabelValueComponent label='Expected Salary'
                                   value={desired_profile.expected_salary ? desired_profile.expected_salary["currency"] + " " + desired_profile.expected_salary["value"] + " Lacs" : "-"}/>
            </Grid>
            <Grid item xs={12} md={4}>
              <LabelValueComponent label='Desired Location'
                                   value={desired_profile.location.length > 0 ? desired_profile.location[0].value : "-"}/>
            </Grid>
            <Grid item xs={12} md={4}>
              <LabelValueComponent label='Desired Industry'
                                   value={desired_profile.industry && desired_profile.industry.value ? desired_profile.industry.value : "-"}/>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default ViewDesiredCareerProfile;
