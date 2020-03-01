import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import CustomTag from '../../../../components/CustomTag';
import CustomIcon from '../../../../components/CustomIcon/CustomIcon';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AutoCompleteNew from '../../../../components/AutoCompleteNew';
import './style.scss';
import Input from '@material-ui/core/Input';
import calendar from '../../../../../assets/media/icons/calendar.svg';
import { TextField, withStyles } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import untick from '../../../../../assets/media/icons/untick.svg';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import UserBasicDetailsView from '../../../UserProfileFresherView/components/UserBasicDetailsView/UserBasicDetailsView';
import customisedMaterial from '../../../../styles/customisedMaterial';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import dropdown from '../../../../../assets/media/icons/dropdown.svg';
import DateTimePicker from '../../../../components/DateTimePicker';
import MultiSelect from '../../../../components/MultiSelectDropDown/MultiSelect';
import BoxInternship from './components/BoxInternship';
import BoxTraining from './components/BoxTraining';
import UserEmploymentExperienced from './components/UserEmploymentExperienced';
import CollapsibleComponentUserProfile from '../CollapsibleComponentUserProfile/CollapsibleComponentUserProfile';

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
const experiences = [];
for (let i = 1; i <= 30; i++) {
  experiences.push(i.toString());
}
class Box extends Component {
  render() {
    return (
      <div className="internship">
        <p>Internship Details</p>
        <button onClick={this.props.onDelete}>Delete</button>
      </div>
    );
  }
}

class UserEmployment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'search',
      course_name_error: '',
      showTraining: false,
      showInternship: false,
      course_name: '',
    };
    // this.boxInternshipReference = React.createRef();
    // this.boxTrainingReference = React.createRef();
    // this.expEmploymentReference = React.createRef();
  }
  validateCourseName = () => {
    const { course_name } = this.state;
    let errorHere = '';
    if (course_name == '') {
      errorHere = 'Kindly specify Course Name';
    }
    this.setState({
      course_name_error: errorHere,
    });
  };
  // validateFormData = name => {
  //   switch (name) {
  //     case 'course_name':
  //       this.validateJobDescription();
  //       break;
  //   }
  // };
  handleBlur = e => {
    this.validateFormData(e.target.name);
  };

  //function to hide show on click of toggle button
  toggleDiv = () => {
    const { show } = this.state;
    this.setState = { show: !show };
  };

  validateJobRole = () => {
    const job_role = this.state.job_role.value ? this.state.job_role.value : '';
    //alert(job_role)
    let errorHere = '';
    if (job_role == '') {
      errorHere = 'Kindly specify your job role';
    }
    this.setState({
      job_role_error: errorHere,
    });
  };

  handleChange = (event, type) => {
    this.setState({
      [type]: event.target.value == 'yes' ? true : false,
      value: event.target.value,
    });
  };
  checkValidationsOnSave = e => {
    // console.log(
    //   'hint',
    //   this.boxInternshipReference,
    //   this.boxTrainingReference,
    //   this.expEmploymentReference,
    // );
    //debugger;

    this.boxInternshipReference && this.boxInternshipReference.checkForErrors();

    //this.boxInternshipReference.checkForErrors();
    this.boxTrainingReference && this.boxTrainingReference.checkForErrors();
    this.expEmploymentReference && this.expEmploymentReference.checkForErrors();
  };
  render() {
    const { month, year } = this.state;
    const { classes } = this.props;
    const { course_name_error } = this.state;
    const { course_name } = this.state;

    const { rightHalf, leftHalf, fullWidth } = allDropDownWidth;
    return (
      <div>
        {' '}
        <CollapsibleComponentUserProfile
          collapsibleTitle="Employment"
          onSaveClick={this.checkValidationsOnSave}
          showAddButtow={false}
        >
          <div className={'basic-emp-container'}>
            {this.props.type == 'experienced' ? (
              <div>
                <UserEmploymentExperienced onRef={ref => (this.expEmploymentReference = ref)} />
              </div>
            ) : (
              <div>
                <div className="internship">
                  <div className="box-ck">
                    <div className="ck">
                      <FormControl>
                        <FormControlLabel
                          control={<Checkbox id="check_inter" name="check_intern" />}
                        />
                      </FormControl>
                    </div>
                    <div
                      style={{ marginTop: '12px', marginLeft: '-20px' }}
                      className="internship-text "
                    >
                      Have you done any internship?
                    </div>
                  </div>
                  <div className="yes-no">
                    <FormControl component="fieldset" className="radio-button-control">
                      <RadioGroup
                        id="showInternship"
                        aria-label="Gender"
                        className="search-radio-buttons"
                        //value={this.state.value}
                        //onChange={this.handleChange}
                        onChange={e => this.handleChange(e, 'showInternship')}
                      >
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  {this.state.showInternship && (
                    <BoxInternship
                      onRef={ref => (this.boxInternshipReference = ref)}
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
                  )}
                </div>
                <div className="internship">
                  <div className="box-ck">
                    <div className="ck">
                      <FormControl>
                        <FormControlLabel
                          control={<Checkbox id="check_inter" name="check_intern" />}
                        />
                      </FormControl>
                    </div>
                    <div
                      className="internship-text"
                      style={{ marginTop: '12px', marginLeft: '-20px' }}
                    >
                      Have you done any training?
                    </div>
                  </div>
                  <div className="yes-no2">
                    <FormControl component="fieldset" className="radio-button-control">
                      <RadioGroup
                        id="showTraining"
                        aria-label="Gender"
                        className="search-radio-buttons2"
                        //value={this.state.value}
                        //onChange={this.handleChange}
                        onChange={e => this.handleChange(e, 'showTraining')}
                      >
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  {this.state.showTraining && (
                    <BoxTraining
                      onRef={ref => {
                        //debugger;
                        this.boxTrainingReference = ref;
                      }}
                      {...{
                        course_name,
                        //dateOfBirth,
                      }}
                    />
                  )}
                  {console.log('checking refs', this.boxTrainingReference)}
                </div>
              </div>
            )}
          </div>
        </CollapsibleComponentUserProfile>
      </div> //main-div
    );
  }
}

export default withStyles(styles)(UserEmployment);
