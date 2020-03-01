import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import CustomTag from '../../../../../components/CustomTag';
import CustomIcon from '../../../../../components/CustomIcon/CustomIcon';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AutoCompleteNew from '../../../../../components/AutoCompleteNew';
//import './style.scss';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import { TextField, withStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
// import UserBasicDetailsView from '../../../UserProfileFresherView/components/UserBasicDetailsView/UserBasicDetailsView';
import LabelValueComponent from '../../../../../components/ReusableComponents/LabelValueComponent/LabelValueComponent';
import { withRouter } from 'react-router-dom';
import customisedMaterial from '../../../../../styles/customisedMaterial';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import dropdown from '../../../../../../assets/media/icons/dropdown.svg';
import { CURRENCY } from '../../../../../../config/constants';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { apiCall, isObjectAlreadyExist, calculateTotalCount } from '../../../../../Utilities/';

class DesiredCareerProfileView extends React.Component {
  state = {
    desired_profile: [],
  };
  render() {
    const { desired_profile } = this.state;
    return (
      <div className="align-in-collapse">
        <div>
          <Grid container spacing={16}>
            <Grid item xs={12} md={4}>
              <LabelValueComponent
                label="Industry"
                value={desired_profile.industry ? desired_profile.industry : '-'}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabelValueComponent
                label="Functional Area"
                value={desired_profile.functional_area ? desired_profile.functional_area : '-'}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabelValueComponent
                label="Role"
                value={desired_profile.role ? desired_profile.role : '-'}
              />
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid container spacing={16}>
            <Grid item xs={12} md={4}>
              <LabelValueComponent
                label="Job Type"
                value={desired_profile.job_type ? desired_profile.job_type : '-'}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabelValueComponent
                label="Employment Type"
                value={desired_profile.employment_type ? desired_profile.employment_type : '-'}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabelValueComponent
                label="Desired Shift"
                value={desired_profile.shift ? desired_profile.shift : '-'}
              />
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid container spacing={16}>
            <Grid item xs={12} md={4}>
              <LabelValueComponent
                label="Availability to Join"
                value={desired_profile.availability ? desired_profile.availability : '-'}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabelValueComponent
                label="Expected Salary"
                value={
                  desired_profile.expected_salary
                    ? desired_profile.expected_salary['currency'] +
                      ' ' +
                      desired_profile.expected_salary['value'] +
                      ' Lacs'
                    : '-'
                }
              />
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid container spacing={16}>
            <Grid item xs={12} md={4}>
              <LabelValueComponent
                label="Desired Location"
                value={desired_profile.desired_location ? desired_profile.desired_location : '-'}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LabelValueComponent
                label="Desired Industry"
                value={desired_profile.desired_industry ? desired_profile.desired_industry : '-'}
              />
            </Grid>
          </Grid>
        </div>
      </div>
      //);
    );
  }
}
export default DesiredCareerProfileView;
