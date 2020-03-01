import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import CustomTag from '../../../../components/CustomTag';
import CustomIcon from '../../../../components/CustomIcon/CustomIcon';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AutoCompleteNew from '../../../../components/AutoCompleteNew';
import './style.scss';
import selectedCircle from '../../../../../assets/media/icons/selectedcircle.svg';
import Input from '@material-ui/core/Input';
import { TextField, withStyles } from '@material-ui/core';
import Checkbox from '@material-ui/core';
import unselected from '../../../../../assets/media/icons/unselected.svg';
import untick from '../../../../../assets/media/icons/untick.svg';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import UserBasicDetailsView from '../../../UserProfileFresherView/components/UserBasicDetailsView/UserBasicDetailsView';
import customisedMaterial from '../../../../styles/customisedMaterial';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import dropdown from '../../../../../assets/media/icons/dropdown.svg';
import DateTimePicker from '../../../../components/DateTimePicker';
import MultiSelect from '../../../../components/MultiSelectDropDown/MultiSelect';
import CollapsibleComponentUserProfile from '../CollapsibleComponentUserProfile/CollapsibleComponentUserProfile';
import { JOB_ROLE } from '../../../../../config/constants';
import { apiCall, isObjectAlreadyExist, calculateTotalCount } from '../../../../Utilities/';
import CreatableRemoteDataSingleSelectDropdown from '../../../../components/SingleSelectDropdownWrapper/components/CreatableRemoteDataSingleSelectDropdown/CreatableRemoteDataSingleSelectDropdown';
import DesiredCareerProfileEdit from './components/DesiredCareerProfileEdit';
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
  rightHalf: '100%',
  leftHalf: '47.5%',
  fullWidth: '100%',
};
const experiences_year = [];
for (let i = 1; i <= 30; i++) {
  experiences_year.push(i.toString());
}
const experiences_month = [];
for (let i = 1; i <= 12; i++) {
  experiences_month.push(i.toString());
}
class UserDesiredCareerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // desired_careerList: [
      //   {
      //     desired_career: '',
      //     industry: '',
      //     functional_area: '',
      //     role: '',
      //     job_type: '',
      //     month: '',
      //     year: '',
      //     expected_salary: '',
      //     salary: '',
      //     desired_location: '',
      //     desired_industry: '',
      //   },
      // ],
      // filteredQualification: [],
      // originalQualification: [],
      // checkForErrors: false,
      // showSkillsError: false,
    };
  }
  //errorsInForms = {};
  checkValidationsOnSave = e => {
    this.desiredCareerReference.checkForErrors();
  };
  render() {
    const { month, year } = this.state;
    const { classes } = this.props;
    const { rightHalf, leftHalf, fullWidth } = allDropDownWidth;
    return (
      <CollapsibleComponentUserProfile
        onSaveClick={this.checkValidationsOnSave}
        collapsibleTitle="Desired Career Profile"
        showAddButtow={false}
      >
        <DesiredCareerProfileEdit
          onRef={ref => (this.desiredCareerReference = ref)}
          //desired_career={desired_career}
          // key={uuid()}
          // indexKey={key}
          //checkForErrors={checkForErrors}
          // onChange={data => {
          //   this.changeQualificationData(data, key);
          // }}
          // checkedForErrors={error => {
          //   this.errorsInForms[key] = error;
          // }}
          // removeQualification={this.removeQualification}
          // filteredQualification={filteredQualification}
          // setFilteredQualification={this.setFilteredQualification}
          {...{
            rightHalf,
            classes,
            year,
            month,
            dropdown,
            leftHalf,
            fullWidth,
            allDropDownWidth,
          }}
        />
      </CollapsibleComponentUserProfile>
    );
  }
}
export default withStyles(styles)(UserDesiredCareerProfile);
