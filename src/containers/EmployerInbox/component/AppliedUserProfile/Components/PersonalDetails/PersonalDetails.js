//library dependency
import React, {Component} from "react";
import Grid from '@material-ui/core/Grid'

//custom components
import CollapsibleComponent
  from "../../../../../../components/ReusableComponents/CollapsibleComponent/CollapsibleComponent";
import IconValueComponent from "../../../../../../components/ReusableComponents/IconValueComponent";
import LabelValueComponent from '../../../../../../components/ReusableComponents/LabelValueComponent'
import LanguageComponent from "../../../../../../components/ReusableComponents/LanguageComponent";

//styles
import './styles.scss'

//icons
import Location from '../../../../../../../assets/media/icons/location.svg'

class PersonalDetails extends Component {
  render() {
    const {personal_details} = this.props;
    return (
      <div className="label-value-body">
        <CollapsibleComponent collapsibleTitle="Personal Details">
          <div className="align-in-collapse">
            <div style={{"paddingBottom": "24px"}}>
              <IconValueComponent iconName={Location} text={personal_details.address ? personal_details.address : "-"}/>
            </div>
            <div>
              <Grid container spacing={16}>
                <Grid item xs={12} md={4}>
                  <LabelValueComponent label='Date of Birth'
                                       value={personal_details.birth_date ? personal_details.birth_date : "-"}/>
                </Grid>
                <Grid item xs={12} md={4}>
                  <LabelValueComponent label='Gender' value={personal_details.gender ? personal_details.gender : "-"}/>
                </Grid>
                <Grid item xs={12} md={4}>
                  <LabelValueComponent label='Marital Status'
                                       value={personal_details.marital_status !== null ? personal_details.marital_status ? "Married" : "Single" : "-"}/>
                </Grid>
              </Grid>
            </div>
            <div>
              <Grid container spacing={16}>
                <Grid item xs={12} md={4}>
                  <LabelValueComponent label='Permanent Residency For'
                                       value={personal_details.permanent_residency ? personal_details.permanent_residency : '-'}/>
                </Grid>
                <Grid item xs={12} md={4}>
                  <LabelValueComponent label='Category'
                                       value={personal_details.category ? personal_details.category : '-'}/>
                </Grid>
                <Grid item xs={12} md={4}>
                  <LabelValueComponent label='Differently Abled'
                                       value={personal_details.differently_abled !== null ? personal_details.differently_abled ? "Yes" : "No" : "-"}/>
                </Grid>
              </Grid>
            </div>
            <div>
              <Grid container spacing={16}>
                <Grid item xs={12} md={12}>
                  {personal_details.language && personal_details.language.length !== 0 ?
                    <LanguageComponent value={personal_details.language}/> : ''}
                </Grid>
              </Grid>
            </div>
          </div>
        </CollapsibleComponent>
      </div>
    );
  }
}


export default PersonalDetails;
