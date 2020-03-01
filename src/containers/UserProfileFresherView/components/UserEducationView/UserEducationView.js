// // import React, { Component } from 'react';
// // import InputLabel from '@material-ui/core/InputLabel';
// // import PropTypes from 'prop-types';
// // import DateFnsUtils from '@date-io/date-fns';
// // import InputAdornment from '@material-ui/core/InputAdornment';
// // import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
// // import CustomTag from '../../../../components/CustomTag';
// // import CustomIcon from '../../../../components/CustomIcon/CustomIcon';
// // import deleteIcon from '../../../../../assets/media/icons/deleteIcon.svg';
// // import Radio from '@material-ui/core/Radio';
// // import RadioGroup from '@material-ui/core/RadioGroup';
// // import FormControlLabel from '@material-ui/core/FormControlLabel';
// // import AutoCompleteNew from '../../../../components/AutoCompleteNew';
// // //import './style.scss';
// // import Input from '@material-ui/core/Input';
// // import calendar from '../../../../../assets/media/icons/calendar.svg';
// // import { TextField, withStyles } from '@material-ui/core';
// // import { Checkbox } from '@material-ui/core';
// // import untick from '../../../../../assets/media/icons/untick.svg';
// // import FormControl from '@material-ui/core/FormControl';
// // import FormHelperText from '@material-ui/core/FormHelperText';
// // import Grid from '@material-ui/core/Grid';
// // import UserBasicDetailsView from '../../../UserProfileFresherView/components/UserBasicDetailsView/UserBasicDetailsView';
// // import customisedMaterial from '../../../../styles/customisedMaterial';
// // import Select from '@material-ui/core/Select';
// // import MenuItem from '@material-ui/core/MenuItem';
// // import dropdown from '../../../../../assets/media/icons/dropdown.svg';
// // import DateTimePicker from '../../../../components/DateTimePicker';
// // import MultiSelect from '../../../../components/MultiSelectDropDown/MultiSelect';

// // class UserEducationView extends Component {
// //   render() {
// //     return (
// //       <div className={'basic-emp-container'}>
// //         <div className="save-emp-header">
// //           <div className="save-discard">
// //             <CustomTag
// //               text="Save"
// //               //onClick={this.createItem}
// //               //onclick={this.handleSave}
// //               className="save"
// //             />
// //             <CustomTag text="Cancel" className="cancel_btn" onclick={this.props.onclick} />
// //           </div>
// //           <div className="save-emp-details">
// //             <img src={dropdown} />
// //             <CustomTag text="Education" className="mx-15" />
// //           </div>
// //         </div>
// //         <div className="hr-line" />

// //         <div className="internship-box">
// //           <div className="fres-internship">Qualification </div>
// //           <Grid container>
// //             <Grid item xs={12} md={6} className="row-padding">
// //               <div>
// //                 <CustomTag text="Bachelor's degree" className="field-heading" />
// //               </div>
// //               <div />
// //             </Grid>
// //             <Grid item xs={12} md={6} className="row-padding">
// //               <div>
// //                 <CustomTag text="college name" className="field-heading" />
// //               </div>
// //               <div />
// //               <CustomIcon
// //                 style={{ marginTop: '-20px' }}
// //                 icon={deleteIcon}
// //                 className="delete-icon"
// //               />
// //             </Grid>
// //           </Grid>
// //           <Grid container>
// //             <Grid item xs={12} md={6} className="row-padding">
// //               <div>
// //                 <CustomTag text="Mar 2013 - Jun 2017" className="field-heading" />
// //               </div>
// //               <div />
// //             </Grid>
// //             <Grid item xs={12} md={6} className="row-padding">
// //               <div>
// //                 <CustomTag text="CGPA: 7.6/10" className="field-heading" />
// //               </div>
// //               <div />
// //             </Grid>
// //           </Grid>
// //         </div>
// //         <div className="internship-box">
// //           <div className="fres-internship">Qualification </div>
// //           <Grid container>
// //             <Grid item xs={12} md={6} className="row-padding">
// //               <div>
// //                 <CustomTag text="12th ( Maharashtra Board, 2013 )" className="field-heading" />
// //               </div>
// //               <div />
// //             </Grid>
// //             <Grid item xs={12} md={6} className="row-padding">
// //               <div>
// //                 <CustomTag text="427/450" className="field-heading" />
// //               </div>
// //               <div />
// //             </Grid>
// //             <Grid item xs={12} md={6} className="row-padding">
// //               <div>
// //                 <CustomTag text="English" className="field-heading" />
// //               </div>
// //               <div />
// //               <CustomIcon
// //                 style={{ marginTop: '-20px' }}
// //                 icon={deleteIcon}
// //                 className="delete-icon"
// //               />
// //             </Grid>
// //           </Grid>
// //         </div>
// //         <div className="internship-box">
// //           <div className="fres-internship">Qualification</div>
// //           <Grid container>
// //             <Grid item xs={12} md={6} className="row-padding">
// //               <div>
// //                 <CustomTag text="Below 10th" className="field-heading" />
// //               </div>
// //             </Grid>
// //             <CustomIcon style={{ marginTop: '-20px' }} icon={deleteIcon} className="delete-icon" />
// //           </Grid>
// //         </div>
// //       </div>
// //     );
// //   }
// // }
// // export default UserEducationView;
// //code from user-profile
// import React, { Component } from 'react';
// import InputLabel from '@material-ui/core/InputLabel';
// import PropTypes from 'prop-types';
// import DateFnsUtils from '@date-io/date-fns';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
// import CustomTag from '../../../../components/CustomTag';
// import CustomIcon from '../../../../components/CustomIcon/CustomIcon';
// import deleteIcon from '../../../../../assets/media/icons/deleteIcon.svg';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import AutoCompleteNew from '../../../../components/AutoCompleteNew';
// //import './style.scss';
// import Input from '@material-ui/core/Input';
// import calendar from '../../../../../assets/media/icons/calendar.svg';
// import { TextField, withStyles } from '@material-ui/core';
// import { Checkbox } from '@material-ui/core';
// import untick from '../../../../../assets/media/icons/untick.svg';
// import FormControl from '@material-ui/core/FormControl';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import Grid from '@material-ui/core/Grid';
// import UserBasicDetailsView from '../../../UserProfileFresherView/components/UserBasicDetailsView/UserBasicDetailsView';
// import customisedMaterial from '../../../../styles/customisedMaterial';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
// import dropdown from '../../../../../assets/media/icons/dropdown.svg';
// import DateTimePicker from '../../../../components/DateTimePicker';
// import MultiSelect from '../../../../components/MultiSelectDropDown/MultiSelect';

// class UserEducationView extends Component {
//   render() {
//     return (
//       <div className={'basic-emp-container'}>
//         <div className="save-emp-header">
//           <div className="save-discard">
//             <CustomTag
//               text="Save"
//               //onClick={this.createItem}
//               //onclick={this.handleSave}
//               className="save"
//             />
//             <CustomTag text="Cancel" className="cancel_btn" onclick={this.props.onclick} />
//           </div>
//           <div className="save-emp-details">
//             <img src={dropdown} />
//             <CustomTag text="Education" className="mx-15" />
//           </div>
//         </div>
//         <div className="hr-line" />

//         <div className="internship-box">
//           <div className="fres-internship">Qualification </div>
//           <Grid container>
//             <Grid item xs={12} md={6} className="row-padding">
//               <div>
//                 <CustomTag text="Bachelor's degree" className="field-heading" />
//               </div>
//               <div />
//             </Grid>
//             <Grid item xs={12} md={6} className="row-padding">
//               <div>
//                 <CustomTag text="college name" className="field-heading" />
//               </div>
//               <div />
//               <CustomIcon
//                 style={{ marginTop: '-20px' }}
//                 icon={deleteIcon}
//                 className="delete-icon"
//               />
//             </Grid>
//           </Grid>
//           <Grid container>
//             <Grid item xs={12} md={6} className="row-padding">
//               <div>
//                 <CustomTag text="Mar 2013 - Jun 2017" className="field-heading" />
//               </div>
//               <div />
//             </Grid>
//             <Grid item xs={12} md={6} className="row-padding">
//               <div>
//                 <CustomTag text="CGPA: 7.6/10" className="field-heading" />
//               </div>
//               <div />
//             </Grid>
//           </Grid>
//         </div>
//         <div className="internship-box">
//           <div className="fres-internship">Qualification </div>
//           <Grid container>
//             <Grid item xs={12} md={6} className="row-padding">
//               <div>
//                 <CustomTag text="12th ( Maharashtra Board, 2013 )" className="field-heading" />
//               </div>
//               <div />
//             </Grid>
//             <Grid item xs={12} md={6} className="row-padding">
//               <div>
//                 <CustomTag text="427/450" className="field-heading" />
//               </div>
//               <div />
//             </Grid>
//             <Grid item xs={12} md={6} className="row-padding">
//               <div>
//                 <CustomTag text="English" className="field-heading" />
//               </div>
//               <div />
//               <CustomIcon
//                 style={{ marginTop: '-20px' }}
//                 icon={deleteIcon}
//                 className="delete-icon"
//               />
//             </Grid>
//           </Grid>
//         </div>
//         <div className="internship-box">
//           <div className="fres-internship">Qualification</div>
//           <Grid container>
//             <Grid item xs={12} md={6} className="row-padding">
//               <div>
//                 <CustomTag text="Below 10th" className="field-heading" />
//               </div>
//             </Grid>
//             <CustomIcon style={{ marginTop: '-20px' }} icon={deleteIcon} className="delete-icon" />
//           </Grid>
//         </div>
//       </div>
//     );
//   }
// }
// export default UserEducationView;

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
// // import UserEducationView from '../../../UserProfileFreshers/components/UserEducationView/UserEducationView';
// import BasicView from '../../../UserProfileFreshers/components/UserBasicDetails/components/BasicView';
// import CollapsibleComponentUserProfile from '../../../UserProfileFreshers/components/CollapsibleComponentUserProfile/CollapsibleComponentUserProfile';

// import Moment from 'react-moment';
// const styles = theme => ({
//   root: {
//     flexGrow: 1,
//   },
// });
// class UserEducationView extends Component {
//   state = {
//     editMode: false,
//   };
//   render() {
//     const { education } = this.props;
//     // console.log(education);
//     return (
//       <div className="basic-details-main-container">
//         {/* <CollapsibleComponentUserProfile collapsibleTitle="Education" showEdit={!this.state.editMode} onEditClick={() => { this.setState({ editMode: true }); }} onClick={() => { this.setState({ editMode: false }); }}>
//           {this.state.editMode ? (
//             <UserEducationView type={'fresher'} />
//           ) : (
//               <UserEducationView />
//             )}{' '} */}
//           <div className="main-div-experienced">
//             <div>
//               {education && education.map((values) => {
//                 (<div className="experiance-Education">
//                   {values.qualification === '12' ? (<div className="higher-education">
//                     <Grid container spacing={16}>
//                       <Grid item xs={12} md={4}>
//                         <LabelValueComponent label="Qualification" value={values.qualification + ' ( ' + values.board + values.end_date + ' )'} />
//                       </Grid>
//                       <Grid item xs={12} md={4}>
//                         <LabelValueComponent label="Total Marks" value={values.marks + '/' + '600'} />
//                       </Grid>
//                       <Grid item xs={12} md={4}>
//                         <LabelValueComponent label="Medium" value={values.medium} />
//                       </Grid>
//                     </Grid>
//                   </div>) : values.qualification === '10' ? (<div className="secondary-education">
//                     <Grid container spacing={16}>
//                       <Grid item xs={12} md={4}>
//                         <LabelValueComponent label="Qualification" value={'Below ' + values.qualification} />
//                       </Grid>
//                     </Grid>
//                   </div>) : (<div className="degree-education">
//                     <Grid container spacing={16}>
//                       <Grid item xs={12} md={5}>
//                         <LabelValueComponent label="Qualification" value={values.qualification ? values.qualification : '-'} />
//                       </Grid>
//                       <Grid item xs={12} md={7}>
//                         <LabelValueComponent value={values.institute + ' ( ' + values.university + ')'} />
//                       </Grid>
//                     </Grid>
//                     <Grid container spacing={16}>
//                       <Grid item xs={12} md={5}>
//                         <IconValueComponent iconName={clock} text={<div>
//                           <Moment format="MMM YYYY">{new Date(values.start_date)}</Moment>
//                           {' - '}
//                           <Moment format="MMM YYYY">{new Date(values.end_date)}</Moment>
//                         </div>
//                         } />

//                       </Grid>
//                       <Grid item xs={12} md={7}>
//                         <LabelValueComponent type={'OnlyText'} value={'CGPA : ' + values.marks} />
//                       </Grid>
//                     </Grid>
//                   </div>)}
//                 </div>)
//               })}
//             </div>
//           </div>
//         {/* </CollapsibleComponentUserProfile> */}
//       </div>
//     );
//   }
// }

// export default withStyles(styles)(UserEducationView);

import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
//import './styles.scss';
import LabelValueComponent from '../../../../components/ReusableComponents/LabelValueComponent/LabelValueComponent';
import CollapsibleComponentUserProfile from '../../../UserProfileFreshers/components/CollapsibleComponentUserProfile/CollapsibleComponentUserProfile';
import IconValueComponent from '../../../../components/ReusableComponents/IconValueComponent/IconValueComponent';
import workExpIcon from '../../../../../assets/media/icons/work-exp.svg';
import company from '../../../../../assets/media/icons/company.svg';
import clock from '../../../../../assets/media/icons/clock.svg';
import Moment from 'react-moment';
import EducationEdit from '../../../UserProfileFreshers/components/UserEducation/component/EducationEdit';
import EducationView from '../../../UserProfileFreshers/components/UserEducation/component/EducationView';
import EducationDetailsContainer from '../../../UserProfileFreshers/components/UserEducation/component/EducationDetailsContainer';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});
class UserEducationView extends Component {
  state = {
    editMode: false,
  };
  checkValidationsOnSave = e => {
    this.educationReference.checkForErrors();
  };
  render() {
    const { education, classes } = this.props;
    return (
      <div className="basic-details-main-container">
        <CollapsibleComponentUserProfile
          collapsibleTitle="Education"
          showEdit={!this.state.editMode}
          onSaveClick={this.checkValidationsOnSave}
          //To edit the component on click of Edit button
          onEditClick={() => {
            this.setState({ editMode: true });
          }}
          onclick={() => {
            this.setState({ editMode: false });
          }}
        >
          {this.state.editMode ? (
            // <EducationEdit
            <EducationDetailsContainer
              onRef={ref => (this.educationReference = ref)}
              {...{
                classes,
              }}
            />
          ) : (
            <EducationView education={education} />
          )}{' '}
          {/* <div className="main-div-experienced">
            <div>
              {education.map((values, index) => {
                return (
                  <div className="experiance-Education">
                    {values.qualification === '12' ? (
                      <div className="higher-education">
                        <Grid container spacing={16}>
                          <Grid item xs={12} md={4}>
                            <LabelValueComponent
                              label="Qualification"
                              value={
                                values.qualification + ' ( ' + values.board + values.end_date + ' )'
                              }
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <LabelValueComponent
                              label="Total Marks"
                              value={values.marks + '/' + '600'}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <LabelValueComponent label="Medium" value={values.medium} />
                          </Grid>
                        </Grid>
                      </div>
                    ) : values.qualification === '10' ? (
                      <div className="secondary-education">
                        <Grid container spacing={16}>
                          <Grid item xs={12} md={4}>
                            <LabelValueComponent
                              label="Qualification"
                              value={'Below ' + values.qualification}
                            />
                          </Grid>
                        </Grid>
                      </div>
                    ) : (
                          <div className="degree-education">
                            <Grid container spacing={16}>
                              <Grid item xs={12} md={5}>
                                <LabelValueComponent
                                  label="Qualification"
                                  value={values.qualification ? values.qualification : '-'}
                                />
                              </Grid>
                              <Grid item xs={12} md={7}>
                                <LabelValueComponent
                                  value={values.institute + ' ( ' + values.university + ')'}
                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={16}>
                              <Grid item xs={12} md={5}>
                                <IconValueComponent
                                  iconName={clock}
                                  text={
                                    <div>
                                      <Moment format="MMM YYYY">{new Date(values.start_date)}</Moment>
                                      {' - '}
                                      <Moment format="MMM YYYY">{new Date(values.end_date)}</Moment>
                                    </div>
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} md={7}>
                                <LabelValueComponent
                                  type={'OnlyText'}
                                  value={'CGPA : ' + values.marks}
                                />
                              </Grid>
                            </Grid>
                          </div>
                        )}
                  </div>
                );
              })}
            </div>
          </div> */}
        </CollapsibleComponentUserProfile>
      </div>
    );
  }
}

export default withStyles(styles)(UserEducationView);
