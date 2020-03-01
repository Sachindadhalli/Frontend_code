//library dependencies
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid} from '@material-ui/core';

//style
import './style.scss';


//custom component
import CustomTag from '../../../../../../../../components/CustomTag';

//utilities
import {EMPLOYER_GET_CONTACT_DETAILS} from '../../../../../../../../../config/constants';
import {apiCall, handleLocalStorage} from '../../../../../../../../Utilities';
import * as actions from '../../../../../../../../actions/homePageEmp';

class ContactDetailsPreview extends Component {
  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    //to get the previously detail to preview
    try {
      const header = {
        authorization: handleLocalStorage('get', 'employerLogin'),
      };
      const response = await apiCall('get', {}, EMPLOYER_GET_CONTACT_DETAILS, header);
      if (response.status) {
        const {data} = response;
        const contactDetails = {
          business_email: data.business_email == null ? '' : data.business_email,
          secondary_email: data.secondary_email == null ? '' : data.secondary_email,
          mobile: {
            code: data.mobile_prefix == null ? '' : data.mobile_prefix + '',
            number: data.mobile_number == null ? '' : data.mobile_number,
          },
          facebook_url: data.facebook_url == null ? '' : data.facebook_url,
          linkedin_url: data.linkedin_url == null ? '' : data.linkedin_url,
          id: data.id,
        };
        this.props.updateEmpContactDetails(contactDetails);
      }
    } catch (e) {
    }
  }

  render() {
    const {
      business_email,
      secondary_email,
      mobile,
      facebook_url,
      linkedin_url,
    } = this.props.contactDetails;
    return (
      <div className="contact-details-preview">
        <div className="contact-edit">
          <CustomTag text="Edit" className="edit" onclick={this.props.onclick}/>
        </div>
        <div>
          <CustomTag text="Your Contact Details" className="your-contact-details"/>
        </div>
        <Grid container>
          <Grid item xs={12} md={6} className="row-padding">
            <CustomTag text="Business Email" className="field-heading change-label-style"/>
            <CustomTag text={business_email} className="field-text"/>
          </Grid>
          <Grid item xs={12} md={6} className="row-padding">
            <CustomTag text="Secondary Email" className="field-heading change-label-style"/>
            <CustomTag text={secondary_email} className="field-text"/>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={6} className="row-padding">
            <CustomTag text="Mobile" className="field-heading change-label-style"/>
            <CustomTag text={`${mobile.code} ${mobile.number}`} className="field-text"/>
          </Grid>
          <Grid item xs={12} md={6} className="row-padding">
            <CustomTag text="Facebook" className="field-heading change-label-style"/>
            <CustomTag text={facebook_url} className="field-text"/>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={6} className="row-padding">
            <CustomTag text="Linkedin" className="field-heading change-label-style"/>
            <CustomTag text={linkedin_url} className="field-text"/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  contactDetails: state.empHomePage.personalDetails.contactDetails,
});
const mapDispatchToProps = dispatch => ({
  updateEmpContactDetails: bindActionCreators(actions.updateEmpContactDetails, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContactDetailsPreview);
