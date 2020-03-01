//library dependencies
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid} from '@material-ui/core';

//style
import './style.scss';

//custom component
import CustomTag from '../../../../../../../../components/CustomTag';
import CustomIcon from '../../../../../../../../components/CustomIcon';

//icon
import display_picture from '../../../../../../../../../assets/media/icons/profile-girl.svg';

//utilities
import * as actions from "../../../../../../../../actions/homePageEmp/"
import {EMPLOYER_GET_BASIC_PROFILE_DETAILS, SERVER_API_URL} from '../../../../../../../../../config/constants';
import {handleLocalStorage, apiCall} from '../../../../../../../../Utilities';

class PersonalDetailPreview extends Component {
  componentWillMount() {
    //to get the previously filled detail from an api
    const header = {
      authorization: handleLocalStorage('get', 'employerLogin'),
    };

    apiCall('get', {}, EMPLOYER_GET_BASIC_PROFILE_DETAILS, header).then((response) => {
      if (response.status) {
        const {data} = response;
        const basicDetails = {
          profile_pic: data.profile_pic_url || null,
          name: data.first_name || null,
          current_country: data.country || null,
          current_city: data.city || null,
          current_employer: data.current_employer || null,
          current_designation: data.current_designation || null
        };
        this.props.updateEmpBasicDetails(basicDetails)
      }
    }).catch(e => {

    });
  }

  render() {
    const {name, current_employer, profile_pic, current_designation, current_country, current_city} = this.props.basicDetails;
    return (
      <div className="personal-details-preview">
        <div className="edit-details-header">
          <div className="save-discard">
            <CustomTag text="Edit" className="edit" onclick={this.props.onclick}/>
          </div>
          <div className="edit-basic-details">
            <CustomTag text="Basic Details" className="edit-basic-details"/>
          </div>
        </div>
        <Grid container>
          <Grid item xs={12} md={6} className="row-padding">
            <div className="profile-picture-container">
              <div className="profile-rectangle">
                <CustomIcon icon={profile_pic ? SERVER_API_URL + profile_pic : display_picture}
                            iconStyle="profile-img"/>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6} className="row-padding">
            <CustomTag text="Name" className="field-heading change-label-style"/>
            <CustomTag text={name} className="field-text"/>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={6} className="row-padding">
            <div>
              <CustomTag text="Current Employer" className="field-heading change-label-style"/>
            </div>
            <div>
              <CustomTag text={current_employer ? current_employer.value : ''} className="field-text"/>
            </div>
          </Grid>
          <Grid item xs={12} md={6} className="row-padding">
            <div>
              <CustomTag text="Current Designation" className="field-heading change-label-style"/>
            </div>
            <div>
              <CustomTag text={current_designation ? current_designation.value : ''} className="field-text"/>
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={6} className="row-padding">
            <div>
              <CustomTag text="Country" className="field-heading change-label-style"/>
            </div>
            <div>
              <CustomTag text={current_country ? current_country.value : ''} className="field-text"/>
            </div>
          </Grid>
          <Grid item xs={12} md={6} className="row-padding">
            <div>
              <CustomTag text="City" className="field-heading change-label-style"/>
            </div>
            <div>
              <CustomTag text={current_city ? current_city.value : ''} className="field-text"/>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    basicDetails: state.empHomePage.personalDetails.basicDetails
  }
}

const mapDispatchToProps = dispatch => ({
  updateEmpBasicDetails: bindActionCreators(
    actions.updateEmpBasicDetails,
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetailPreview)
