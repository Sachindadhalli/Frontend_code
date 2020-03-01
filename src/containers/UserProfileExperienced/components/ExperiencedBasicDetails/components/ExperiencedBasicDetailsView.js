import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import CustomTag from '../../../../../components/CustomTag';
import CustomIcon from '../../../../../components/CustomIcon/CustomIcon';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AutoCompleteNew from '../../../../../components/AutoCompleteNew';
// import './style.scss';
import Input from '@material-ui/core/Input';
import { TextField, withStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import UserBasicDetailsView from '../../../../UserProfileFresherView/components/UserBasicDetailsView/UserBasicDetailsView';
import { withRouter } from 'react-router-dom';
import customisedMaterial from '../../../../../styles/customisedMaterial';
import LabelValueComponent from '../../../../../components/ReusableComponents/LabelValueComponent';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import dropdown from '../../../../../../assets/media/icons/dropdown.svg';
import { CURRENCY } from '../../../../../../config/constants';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { apiCall, isObjectAlreadyExist, calculateTotalCount } from '../../../../../Utilities/';
// import CollapsibleComponentUserProfile from '../CollapsibleComponentUserProfile/CollapsibleComponentUserProfile';
import CreatableRemoteDataSingleSelectDropdown from '../../../../../components/SingleSelectDropdownWrapper/components/CreatableRemoteDataSingleSelectDropdown/CreatableRemoteDataSingleSelectDropdown';
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  Input: {
    flexBasis: 200,
  },
  button: {
    margin: '11px',
    borderRadius: '20px',
  },
  input: {
    display: 'none',
  },
  formControl: {
    marginBottom: '5px',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  ...customisedMaterial,
  label: {
    fontWeight: 'normal',
    fontSize: '16px',
    color: 'black',
  },
});

const allDropDownWidth = {
  //rightHalf: '100%',
  //leftHalf: '47.5%',
  fullWidth: '275px',
};
const experiences = [];
for (let i = 1; i <= 30; i++) {
  experiences.push(i.toString());
}

class ExperiencedBasicDetailsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.user_profile,

      value: 'search',
      currency_error: '',
    };
  }

  render() {
    const { classes, basic_profile, fresher_experienced } = this.props;
    const { currency, month, year } = this.state;
    const { currency_error } = this.state;
    const { fullWidth } = allDropDownWidth;
    return (
      <div className="basic-details-main-container">
        <div className="basic-edu-container">
          {/* <UserBasicDetailsView
                            fresher_experienced={this.state.result.is_fresher}
                            basic_profile={this.state.result.basic_profile}
                        /> */}
          {fresher_experienced == false ? (
            <Grid container spacing={16}>
              <Grid item xs={12} md={4}>
                <LabelValueComponent label="Experience" value="Experienced (3 Years & 4 Months )" />
              </Grid>
              <Grid item xs={12} md={4}>
                <LabelValueComponent
                  label="Annual Salary"
                  value={'₹ 5.5 Lacs '}
                  className="annual-salary"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <LabelValueComponent label="Mobile number" value="8301098257" />
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={16}>
              <Grid item xs={12} md={4}>
                <LabelValueComponent label="Experience" value="Experienced (3 Years & 4 Months )" />
              </Grid>
              <Grid item xs={12} md={4}>
                <LabelValueComponent label="Mobile number" value="8301098257" />
              </Grid>
            </Grid>
          )}
        </div>
      </div>
    );
  }
}
export default ExperiencedBasicDetailsView;
