//library dependency
import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';

//custom components
import LabelValueComponent
  from '../../../../../../components/ReusableComponents/LabelValueComponent/LabelValueComponent';
import CollapsibleComponent
  from '../../../../../../components/ReusableComponents/CollapsibleComponent/CollapsibleComponent';

//styles
import './styles.scss';


class BasicDetails extends Component {
  render() {
    const {basic_profile, fresher_experienced} = this.props;
    return (
      <div className="basic-details-main-container">
        <CollapsibleComponent collapsibleTitle='Basic Details'>
          <div className="basic-details-div">
            {fresher_experienced === false ?
              <Grid container spacing={16}>
                <Grid item xs={12} md={4}>
                  <LabelValueComponent label='Experience' value={basic_profile.experience}/>
                </Grid>
                <Grid item xs={12} md={4}>
                  <LabelValueComponent label='Annual Salary'
                                       value={basic_profile.annual_salary ? "₹ " + basic_profile.annual_salary : "-"}
                                       className="annual-salary"/>
                </Grid>
                <Grid item xs={12} md={4}>
                  <LabelValueComponent label='Mobile number' value={basic_profile.mobile_number}/>
                </Grid>
              </Grid> :
              <Grid container spacing={16}>
                <Grid item xs={12} md={4}>
                  <LabelValueComponent label='Experience' value='Fresher'/>
                </Grid>
                <Grid item xs={12} md={4}>
                  <LabelValueComponent label='Mobile number' value={basic_profile.mobile_number}/>
                </Grid>
              </Grid>
            }
          </div>
        </CollapsibleComponent>
      </div>
    );
  }
}

export default BasicDetails;
