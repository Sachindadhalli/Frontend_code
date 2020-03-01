//library dependency
import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';


//custom components
import LabelValueComponent from '../../../../components/ReusableComponents/LabelValueComponent/LabelValueComponent';

//styles
import './styles.scss';
import {apiCall, handleLocalStorage} from "../../../../Utilities";
import {USER_PROFILE_BASIC_DETAILS_GET} from "../../../../../config/constants"

//utilities

//icons


class ViewBasicDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "is_fresher": true,
      "experience_in_years": '',
      "experience_in_months": '',
      "annual_salary": '',
      "mobile_number": '8888888888'
    }
  }

  componentWillMount() {
    /**
     * after component will mount call get basic details api
     */
    // this.GetBasicDetailsApi();
  };

  /**
   * server api to get user profile basic details and store data in state
   * @returns {Promise<void>}
   * @constructor
   */
  GetBasicDetailsApi = async () => {
    let headers = {'authorization': handleLocalStorage('get', 'employeeLogin'), 'Content-Type': 'application/json'};
    try {
      const BasicDetails = await apiCall('get', {}, USER_PROFILE_BASIC_DETAILS_GET, headers);
      if (BasicDetails.status) {
        let out = {
          "is_fresher": BasicDetails.data.is_fresher,
          "experience_in_years": BasicDetails.data.experience_in_years,
          "experience_in_months": BasicDetails.data.experience_in_months,
          "annual_salary": BasicDetails.data.annual_salary,
          "mobile_number": BasicDetails.data.mobile_number
        };
        this.setState({...out});
      }
    }
    catch (e) {
    }
  };


  render() {
    const {is_fresher, experience_in_years, experience_in_months, annual_salary, mobile_number} = this.state;
    return (
      <div>
        <div className="basic-details-div">
          {is_fresher === false ?
            <Grid container spacing={16}>
              <Grid item xs={12} md={4}>
                <LabelValueComponent label='Experience'
                                     value={`Experienced ( ${experience_in_years} Years & ${experience_in_months} Months )`}/>
              </Grid>
              <Grid item xs={12} md={4}>
                <LabelValueComponent label='Annual Salary' value={annual_salary} className="annual-salary"/>
              </Grid>
              <Grid item xs={12} md={4}>
                <LabelValueComponent label='Mobile number' value={mobile_number}/>
              </Grid>
            </Grid> :
            <Grid container spacing={16}>
              <Grid item xs={12} md={4}>
                <LabelValueComponent label='Experience' value='Fresher'/>
              </Grid>
              <Grid item xs={12} md={4}>
                <LabelValueComponent label='Mobile number' value={mobile_number}/>
              </Grid>
            </Grid>
          }
        </div>
      </div>
    );
  }
}

export default ViewBasicDetails;
