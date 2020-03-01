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
// import CollapsibleComponentUserProfile from '../CollapsibleComponentUserProfile/CollapsibleComponentUserProfile';
const BasicDetailsBoxView = ({ basic_profile, fresher_experienced }) => (
  <div className="basic-edu-container">
    {fresher_experienced == false ? (
      <Grid container spacing={16}>
        <Grid item xs={12} md={4}>
          <LabelValueComponent className="label-width" label="Experience" value={basic_profile.experience} />
        </Grid>
        <Grid item xs={12} md={4}>
          <LabelValueComponent
            label="Annual Salary"
            value={'₹ ' + basic_profile.annual_salary}
            className="annual-salary"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <LabelValueComponent label="Mobile number" className="label-width" value={basic_profile.mobile_number} />
        </Grid>
      </Grid>
    ) : (
        <Grid container spacing={16}>
          <Grid item xs={12} md={4}>
            <LabelValueComponent label="Experience" value="Fresher" />
          </Grid>
          <Grid item xs={12} md={4}>
            <LabelValueComponent className="label-width" label="Mobile number" value={basic_profile.mobile_number} />
          </Grid>
        </Grid>
      )}
  </div>
);
export default BasicDetailsBoxView;
