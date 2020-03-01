//library dependency
import React, {Component} from "react";
import Grid from '@material-ui/core/Grid'

//custom components
import IconValueComponent from "../../../../components/ReusableComponents/IconValueComponent";
import LabelValueComponent from '../../../../components/ReusableComponents/LabelValueComponent'
import LanguageComponent from "../../../../components/ReusableComponents/LanguageComponent";

//styles
import './styles.scss'

//icons
import Location from '../../../../../assets/media/icons/location.svg'


class ViewPersonalDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "birth_date": "27th Mar 1969",
      "gender": "Female",
      "address": "Shop No 43, Greenfields Avillion (A), JV Link Road, Mumbai 400093",
      "pincode": 123456,
      "hometown": {"key": "", "value": ""},
      "permanent_residency": "",
      "passport_number": "",
      "marital_status": true,
      "category": "general",
      "differently_abled": false,
      "language": [
        {
          "language": "English",
          "proficiency": "read/write"
        },
        {
          "language": "Hindi",
          "proficiency": "read/write"
        },
      ]
    }

  }

  render() {
    const {address, gender, birth_date, permanent_residency, differently_abled, marital_status, language, category} = this.state;
    return (
      <div className='view-personal-details-main-wrapper'>
        <div className="view-personal-details-inner-wrapper">
          <div style={{"paddingBottom": "24px"}}>
            <IconValueComponent iconName={Location} text={address ? address : "-"}/>
          </div>
          <div style={{"paddingBottom": "24px"}}>
            <Grid container spacing={16}>
              <Grid item xs={12} md={4}>
                <LabelValueComponent label='Date of Birth' value={birth_date ? birth_date : "-"}/>
              </Grid>
              <Grid item xs={12} md={4}>
                <LabelValueComponent label='Gender' value={gender ? gender : "-"}/>
              </Grid>
              <Grid item xs={12} md={4}>
                <LabelValueComponent label='Marital Status'
                                     value={marital_status !== null ? marital_status ? "Married" : "Single" : "-"}/>
              </Grid>
            </Grid>
          </div>
          <div style={{"paddingBottom": "24px"}}>
            <Grid container spacing={16}>
              <Grid item xs={12} md={4}>
                <LabelValueComponent label='Permanent Residency For'
                                     value={permanent_residency ? permanent_residency : '-'}/>
              </Grid>
              <Grid item xs={12} md={4}>
                <LabelValueComponent label='Category' value={category ? category : '-'}/>
              </Grid>
              <Grid item xs={12} md={4}>
                <LabelValueComponent label='Differently Abled'
                                     value={differently_abled !== null ? differently_abled ? "Yes" : "No" : "-"}/>
              </Grid>
            </Grid>
          </div>
          <div>
            <Grid container spacing={16}>
              <Grid item xs={12} md={12}>
                {language && language.length !== 0 ? <LanguageComponent value={language}/> : ''}
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewPersonalDetails;
