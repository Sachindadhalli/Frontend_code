//library dependency
import React from "react";
import Grid from '@material-ui/core/Grid'

//custom components
import CollapsibleComponent
  from "../../../../../../components/ReusableComponents/CollapsibleComponent/CollapsibleComponent";
import LabelValueComponent from '../../../../../../components/ReusableComponents/LabelValueComponent'

//styles
import './styles.scss'

class DesiredCareerProfile extends React.Component {
  render() {
    const {desired_profile} = this.props;
    return (
      <div className="label-value-body">
        <CollapsibleComponent collapsibleTitle="Desired Career Profile">
          {desired_profile !== {} && <div className="align-in-collapse">
            <div>
              <Grid container spacing={16}>
                <Grid item xs={12} md={4}>
                  <LabelValueComponent label='Industry'
                                       value={desired_profile.industry ? desired_profile.industry : "-"}/>
                </Grid>
                <Grid item xs={12} md={4}>
                  <LabelValueComponent label='Functional Area'
                                       value={desired_profile.functional_area ? desired_profile.functional_area : "-"}/>
                </Grid>
                <Grid item xs={12} md={4}>
                  <LabelValueComponent label='Role' value={desired_profile.role ? desired_profile.role : "-"}/>
                </Grid>
              </Grid>
            </div>
            <div>
              <Grid container spacing={16}>
                <Grid item xs={12} md={4}>
                  <LabelValueComponent label='Job Type'
                                       value={desired_profile.job_type ? desired_profile.job_type : "-"}/>
                </Grid>
                <Grid item xs={12} md={4}>
                  <LabelValueComponent label='Employment Type'
                                       value={desired_profile.employment_type ? desired_profile.employment_type : "-"}/>
                </Grid>
                <Grid item xs={12} md={4}>
                  <LabelValueComponent label='Desired Shift'
                                       value={desired_profile.shift ? desired_profile.shift : "-"}/>
                </Grid>
              </Grid>
            </div>
            <div>
              <Grid container spacing={16}>
                <Grid item xs={12} md={4}>
                  <LabelValueComponent label='Availability to Join'
                                       value={desired_profile.availability ? desired_profile.availability : "-"}/>
                </Grid>
                <Grid item xs={12} md={4}>
                  <LabelValueComponent label='Expected Salary'
                                       value={desired_profile.expected_salary ? desired_profile.expected_salary["currency"] + " " + desired_profile.expected_salary["value"] + " Lacs" : "-"}/>
                </Grid>
              </Grid>
            </div>
            <div>
              <Grid container spacing={16}>
                <Grid item xs={12} md={4}>
                  <LabelValueComponent label='Desired Location'
                                       value={desired_profile.desired_location ? desired_profile.desired_location : "-"}/>
                </Grid>
                <Grid item xs={12} md={4}>
                  <LabelValueComponent label='Desired Industry'
                                       value={desired_profile.desired_industry ? desired_profile.desired_industry : "-"}/>
                </Grid>
              </Grid>
            </div>
          </div>}

        </CollapsibleComponent>
      </div>
    );
  }
}

export default DesiredCareerProfile;
