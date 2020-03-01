import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import CustomTag from '../../../../components/CustomTag';
import CustomIcon from '../../../../components/CustomIcon/CustomIcon';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import DateFnsUtils from '@date-io/date-fns';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AutoCompleteNew from '../../../../components/AutoCompleteNew';
import './style.scss';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import Input from '@material-ui/core/Input';
import { TextField, withStyles } from '@material-ui/core';
import calendar from '../../../../../assets/media/icons/calendar.svg';
import Checkbox from '@material-ui/core';
import deleteIcon from '../../../../../assets/media/icons/deleteIcon.svg';
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
import EducationEdit from './component/EducationEdit';
import CreatableRemoteDataSingleSelectDropdown from '../../../../components/SingleSelectDropdownWrapper/components/CreatableRemoteDataSingleSelectDropdown/CreatableRemoteDataSingleSelectDropdown';
import EducationDetailsContainer from './component/EducationDetailsContainer';

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
class UserEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //educationReference: '',
      start_date: this.getValueFromProp('start_date'),
      com_date: this.getValueFromProp('com_on'),
      start_date_error: '',
      com_date_error: '',
    };
    //this.educationReference = React.createRef();
  }
  getValueFromProp = key => {
    if (!this.props.experience) return null;
    return this.props.experience[key] ? this.props.experience[key] : null;
  };
  validateStartDateForm = async () => {
    let errorValue = '';
    if (!this.state.start_date) {
      errorValue = 'Kindly specify your joined date';
    }
    this.setParticularField('start_date', errorValue);
    return errorValue ? true : false;
  };
  //Validate left on Form
  validateCompleteDateForm = async () => {
    let errorValue = '';

    let com_date = new Date(this.state.com_date).getTime(),
      start_date = new Date(this.state.start_date).getTime();
    if (!this.state.com_date) {
      errorValue = 'Kindly specify your left date';
    } else if (com_date <= start_date) {
      errorValue = 'Left date must be greater than the joined date';
    }
    this.setParticularField('com_date', errorValue);

    return errorValue ? true : false;
  };
  //Remove Error on focus
  removeErrorFocus = e => {
    this.setParticularField(e.target.name, '');
  };
  setParticularField = (name, value) => {
    const errorName = name + '_error';
    this.setState({
      [errorName]: value,
    });
  };
  validateFields = fieldName => {
    switch (fieldName) {
      case 'start_date':
        this.validateStartDateForm();
        break;
      case 'com_date':
        this.validateCompleteDateForm();
        break;
    }
  };
  handleInput = (e, validatorAfterSave = null) => {
    // const { allFieldsStatus } = this.state;
    const { name } = e.target;

    // allFieldsStatus[name] = true; //change the touch status of field
    let value = e.target.value;
    if (['start_date', 'com_date'].includes(e.target.name)) {
      value = new Date(value);
    }
    this.setState(
      {
        [name]: value,
        // allFieldsStatus
      },
      () => {
        if (validatorAfterSave) {
          this.validateFields(name);
        }
      },
    );
  };

  componentWillReceiveProps(newprops) {
    // debugger;
  }
  checkValidationsOnSave = e => {
    //debugger;
    // let canSubmit = true;
    // //for (let child in this.allFormsRefs) {
    // //if (this.allFormsRefs[child]) {
    // debugger;
    // let isItInvalid = this.educationReference.checkForErrors(); //if error is present

    // if (isItInvalid) canSubmit = false;
    // //  }
    // //}
    // if (!canSubmit) {
    //   return;
    // }
    this.educationReference.checkForErrors();
  };
  dummyFunction(ref) {
    this.setState({
      educationReference: ref,
    });
    // debugger;
  }
  checkFunction = e => {
    console.log('checkfunc', this.educationReference);
    //debugger;
  };
  divReference = {};
  render() {
    const { classes } = this.props;
    const { qualification_id } = this.props;
    const { month, year, start_date, com_date, start_date_error, com_date_error } = this.state;
    const { rightHalf, leftHalf, fullWidth } = allDropDownWidth;
    return (
      <CollapsibleComponentUserProfile
        collapsibleTitle="Education"
        showAddButtow={false}
        onSaveClick={this.checkValidationsOnSave}
      >
        {/* <EducationEdit */}
        <EducationDetailsContainer
          onRef={ref => (this.educationReference = ref)}
          // ref={this.props.educationReference}
          // {...{
          //   rightHalf,
          //   classes,
          //   year,
          //   month,
          //   dropdown,
          //   leftHalf,
          //   fullWidth,
          //   allDropDownWidth,
          // }}
          // onRef={ref => this.dummyFunction(ref)}
        />
        {/* <div id="hello" onRef={ref => (this.divReference = ref)} onClick={this.checkFunction}>
          Hello World
        </div>
        {console.log('hint2', this.educationReference, this.divReference)} */}
      </CollapsibleComponentUserProfile>
    );
  }
  componentDidMount() {
    this.forceUpdate();
  }
}

export default withStyles(styles)(UserEducation);
