//library dependency
import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';


//custom components
import LabelValueComponent from '../../../../components/ReusableComponents/LabelValueComponent/LabelValueComponent';

//styles
import './styles.scss';
import {apiCall, handleLocalStorage} from "../../../../Utilities";
import {USER_PROFILE_PROFILE_SUMMARY_GET} from "../../../../../config/constants"

//icons


class ViewProfileSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile_summary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets."
    }
  }

  componentWillMount() {
    /**
     * after component will mount, call get profile summary api function
     */
    // this.GetProfileSummaryApi();
  };

  /**
   * this function will call get profile summary and update state depends on data
   * @returns {Promise<void>}
   * @constructor
   */
  GetProfileSummaryApi = async () => {
    let headers = {'authorization': handleLocalStorage('get', 'employeeLogin'), 'Content-Type': 'application/json'};
    try {
      const ProfileSummary = await apiCall('get', {}, USER_PROFILE_PROFILE_SUMMARY_GET, headers);
      if (ProfileSummary.status) {
        this.setState({profile_summary: ProfileSummary.profile_summery});
      }
    }
    catch (e) {
    }
  };


  render() {
    const {profile_summary} = this.state;
    return (
      <div className='view-profile-summary-main-container'>
        <Grid container spacing={16}>
          <Grid item xs={12} md={12}>
            <LabelValueComponent type={"OnlyText"} value={profile_summary}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ViewProfileSummary;
