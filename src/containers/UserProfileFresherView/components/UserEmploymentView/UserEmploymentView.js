// import React, { Component } from 'react';
// import Grid from '@material-ui/core/Grid';
// import { withStyles } from '@material-ui/core/styles';
// //import './styles.scss';
// import LabelValueComponent from '../../../../components/ReusableComponents/LabelValueComponent/LabelValueComponent';
// import CollapsibleComponent from '../../../../components/ReusableComponents/CollapsibleComponent/CollapsibleComponent';
// import IconValueComponent from '../../../../components/ReusableComponents/IconValueComponent/IconValueComponent';
// import workExpIcon from '../../../../../assets/media/icons/work-exp.svg';
// import company from '../../../../../assets/media/icons/company.svg';
// import clock from '../../../../../assets/media/icons/clock.svg';
// import Moment from 'react-moment';
// const styles = theme => ({
//   root: {
//     flexGrow: 1,
//   },
// });
// class UserEmploymentView extends Component {
//   render() {
//     const { education } = this.state;
//     return (
//       <div className="basic-details-main-container">
//         <CollapsibleComponent collapsibleTitle="Education">
//           <div className="main-div-experienced">
//             <div>
//               {education.map((values, index) => {
//                 return (
//                   <div className="experiance-Education">
//                     {values.qualification === '12' ? (
//                       <div className="higher-education">
//                         <Grid container spacing={16}>
//                           <Grid item xs={12} md={4}>
//                             <LabelValueComponent
//                               label="Qualification"
//                               value={
//                                 values.qualification + ' ( ' + values.board + values.end_date + ' )'
//                               }
//                             />
//                           </Grid>
//                           <Grid item xs={12} md={4}>
//                             <LabelValueComponent
//                               label="Total Marks"
//                               value={values.marks + '/' + '600'}
//                             />
//                           </Grid>
//                           <Grid item xs={12} md={4}>
//                             <LabelValueComponent label="Medium" value={values.medium} />
//                           </Grid>
//                         </Grid>
//                       </div>
//                     ) : values.qualification === '10' ? (
//                       <div className="secondary-education">
//                         <Grid container spacing={16}>
//                           <Grid item xs={12} md={4}>
//                             <LabelValueComponent
//                               label="Qualification"
//                               value={'Below ' + values.qualification}
//                             />
//                           </Grid>
//                         </Grid>
//                       </div>
//                     ) : (
//                       <div className="degree-education">
//                         <Grid container spacing={16}>
//                           <Grid item xs={12} md={5}>
//                             <LabelValueComponent
//                               label="Qualification"
//                               value={values.qualification ? values.qualification : '-'}
//                             />
//                           </Grid>
//                           <Grid item xs={12} md={7}>
//                             <LabelValueComponent
//                               value={values.institute + ' ( ' + values.university + ')'}
//                             />
//                           </Grid>
//                         </Grid>
//                         <Grid container spacing={16}>
//                           <Grid item xs={12} md={5}>
//                             <IconValueComponent
//                               iconName={clock}
//                               text={
//                                 <div>
//                                   <Moment format="MMM YYYY">{new Date(values.start_date)}</Moment>
//                                   {' - '}
//                                   <Moment format="MMM YYYY">{new Date(values.end_date)}</Moment>
//                                 </div>
//                               }
//                             />
//                           </Grid>
//                           <Grid item xs={12} md={7}>
//                             <LabelValueComponent
//                               type={'OnlyText'}
//                               value={'CGPA : ' + values.marks}
//                             />
//                           </Grid>
//                         </Grid>
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </CollapsibleComponent>
//       </div>
//     );
//   }
// }

// export default withStyles(styles)(UserEmploymentView);
//code from user-profile
import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import CustomTag from '../../../../components/CustomTag';
import CustomIcon from '../../../../components/CustomIcon/CustomIcon';
import deleteIcon from '../../../../../assets/media/icons/deleteIcon.svg';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AutoCompleteNew from '../../../../components/AutoCompleteNew';
//import './style.scss';
import Input from '@material-ui/core/Input';
import calendar from '../../../../../assets/media/icons/calendar.svg';
import { TextField, withStyles } from '@material-ui/core';
// import { withStyles, createStyles } from "@material-ui/core/styles";

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
import CollapsibleComponentUserProfile from '../../../UserProfileFreshers/components/CollapsibleComponentUserProfile/CollapsibleComponentUserProfile';
import BoxInternship from '../../../UserProfileFreshers/components/UserEmployment/components/BoxInternship';
import BoxTraining from '../../../UserProfileFreshers/components/UserEmployment/components/BoxTraining';
import EmploymentView from '../../../UserProfileFreshers/components/UserEmployment/components/EmploymentView';

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

class UserEmploymentView extends Component {
  state = {
    course_name: '',
    editMode: false,
  };
  checkValidationsOnSave = e => {
    this.boxInternshipReference && this.boxInternshipReference.checkForErrors();

    //this.boxInternshipReference.checkForErrors();
    this.boxTrainingReference && this.boxTrainingReference.checkForErrors();
  };

  render() {
    const { month, year } = this.state;
    const { classes } = this.props;
    const { course_name_error } = this.state;
    const { course_name } = this.state;

    const { rightHalf, leftHalf, fullWidth } = allDropDownWidth;
    return (
      <CollapsibleComponentUserProfile
        collapsibleTitle="Employment"
        showEdit={!this.state.editMode}
        onSaveClick={this.checkValidationsOnSave}
        onEditClick={() => {
          this.setState({ editMode: true });
        }}
        onclick={() => {
          this.setState({ editMode: false });
        }}
      >
        {this.state.editMode ? (
          <>
            <BoxInternship
              onRef={ref => {
                //debugger;
                this.boxInternshipReference = ref;
              }}
              {...{
                classes,
                year,
                month,
                dropdown,
              }}
            />
            <BoxTraining
              onRef={ref => {
                //debugger;
                this.boxTrainingReference = ref;
              }}
              {...{
                course_name,
              }}
            />{' '}
          </>
        ) : (
          <EmploymentView />
        )}{' '}
        {/* {this.state.editMode ? (
          <UserEmploymentView type={'experienced'}
        )} */}
        {/* <div className={'basic-emp-container'}>

          <div className="fres-internship">Internship </div>
          <div className="internship-box">
            <Grid container >
              <Grid item xs={12} md={6} className="row-padding">
                <div>
                  <CustomTag text="Junior Developer" className="field-heading" />
                </div>
                <div />
              </Grid>
              <Grid item xs={12} md={6} style={{
                display: 'flex',
                justifyContent: 'space-between'
              }} className="row-padding">
                <div>
                  <CustomTag text="5 months" className="field-heading" />
                </div>
                <div />
                <CustomIcon
                  style={{ marginTop: '-20px' }}
                  icon={deleteIcon}
                  className="delete-icon"
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} md={6} className="row-padding">
                <div>
                  <CustomTag text="Associate Tester" className="field-heading" />
                </div>
                <div />
              </Grid>
              <Grid item xs={12} md={6} style={{
                display: 'flex',
                justifyContent: 'space-between'
              }} className="row-padding">
                <div>
                  <CustomTag text="3 months" className="field-heading" />
                </div>
                <div />
                <CustomIcon
                  style={{ marginTop: '-20px' }}
                  icon={deleteIcon}
                  className="delete-icon"
                />
              </Grid>
            </Grid>
          </div>
          <div className="fres-internship">Training </div>
          <div className="internship-box">
            <Grid container>
              <Grid item xs={12} md={6} className="row-padding">
                <div>
                  <CustomTag text="Summer Internship" className="field-heading" />
                </div>
                <div />
              </Grid>
              <Grid item xs={12} md={6} style={{
                display: 'flex',
                justifyContent: 'space-between'
              }} className="row-padding">
                <div>
                  <CustomTag text="5 months" className="field-heading" />
                </div>
                <div />
                <CustomIcon
                  style={{ marginTop: '-20px' }}
                  icon={deleteIcon}
                  className="delete-icon"
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} md={6} className="row-padding">
                <div>
                  <CustomTag text="Associate Tester" className="field-heading" />
                </div>
                <div />
              </Grid>
              <Grid item xs={12} md={6} style={{
                display: 'flex',
                justifyContent: 'space-between'
              }} className="row-padding">
                <div>
                  <CustomTag text="3 months" className="field-heading" />
                </div>
                <div />
                <CustomIcon
                  style={{ marginTop: '-20px' }}
                  icon={deleteIcon}
                  className="delete-icon"
                />
              </Grid>
            </Grid>
          </div>
        </div> */}
      </CollapsibleComponentUserProfile>
    );
  }
}
export default withStyles(styles)(UserEmploymentView);
