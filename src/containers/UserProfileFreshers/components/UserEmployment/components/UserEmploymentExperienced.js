// import React, { Component } from 'react';
// import InputLabel from '@material-ui/core/InputLabel';
// import PropTypes from 'prop-types';
// import DateFnsUtils from '@date-io/date-fns';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
// import CustomTag from '../../../../../components/CustomTag';
// import CustomIcon from '../../../../../components/CustomIcon/CustomIcon';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import AutoCompleteNew from '../../../../../components/AutoCompleteNew';
// //import './style.scss';
// import Input from '@material-ui/core/Input';
// import calendar from '../../../../../../assets/media/icons/calendar.svg';
// import { TextField, withStyles } from '@material-ui/core';
// import { Checkbox } from '@material-ui/core';
// import untick from '../../../../../../assets/media/icons/untick.svg';
// import FormControl from '@material-ui/core/FormControl';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import Grid from '@material-ui/core/Grid';
// // import UserBasicDetailsView from '../../../UserProfileFresherView/components/UserBasicDetailsView/UserBasicDetailsView';
// import customisedMaterial from '../../../../../styles/customisedMaterial';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
// import dropdown from '../../../../../../assets/media/icons/dropdown.svg';
// import DateTimePicker from '../../../../../components/DateTimePicker';
// import MultiSelect from '../../../../../components/MultiSelectDropDown/MultiSelect';
// import CollapsibleComponentUserProfile from '../../CollapsibleComponentUserProfile/CollapsibleComponentUserProfile';
// import { JOB_ROLE } from '../../../../../../config/constants';
// import { apiCall, isObjectAlreadyExist, calculateTotalCount } from '../../../../../Utilities/';
// import CreatableRemoteDataSingleSelectDropdown from '../../../../../components/SingleSelectDropdownWrapper/components/CreatableRemoteDataSingleSelectDropdown/CreatableRemoteDataSingleSelectDropdown';

// const styles = theme => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   margin: {
//     margin: theme.spacing.unit,
//   },
//   withoutLabel: {
//     marginTop: theme.spacing.unit * 3,
//   },
//   Input: {
//     flexBasis: 200,
//   },
//   button: {
//     margin: '11px',
//     borderRadius: '20px',
//   },
//   input: {
//     display: 'none',
//   },
//   formControl: {
//     marginBottom: '5px',
//   },
//   paper: {
//     padding: theme.spacing.unit * 2,
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   },
//   ...customisedMaterial,
//   label: {
//     fontWeight: 'normal',
//     fontSize: '16px',
//     color: 'black',
//   },
// });
// const allDropDownWidth = {
//   rightHalf: '100%',
//   leftHalf: '47.5%',
//   fullWidth: '100%',
// };
// const experiences = [];
// for (let i = 1; i <= 30; i++) {
//   experiences.push(i.toString());
// }

// class UserEmploymentExperienced extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       current_designation: this.getValueFromProp('current_designation'),
//       current_designation_error: '',
//       start_date: this.getValueFromProp('start_date'),
//       com_date: this.getValueFromProp('com_on'),
//       start_date_error: '',
//       com_date_error: '',
//       role_dsc: '',
//     };
//   }
//   getValueFromProp = key => {
//     if (!this.props.experience) return null;
//     return this.props.experience[key] ? this.props.experience[key] : null;
//   };
//   validateStartDateForm = async () => {
//     let errorValue = '';
//     if (!this.state.start_date) {
//       errorValue = 'Kindly specify your joined date';
//     }
//     this.setParticularField('start_date', errorValue);
//     return errorValue ? true : false;
//   };
//   //Validate left on Form
//   validateCompleteDateForm = async () => {
//     let errorValue = '';

//     let com_date = new Date(this.state.com_date).getTime(),
//       start_date = new Date(this.state.start_date).getTime();
//     if (!this.state.com_date) {
//       errorValue = 'Kindly specify your left date';
//     } else if (com_date <= start_date) {
//       errorValue = 'Left date must be greater than the joined date';
//     }
//     this.setParticularField('com_date', errorValue);

//     return errorValue ? true : false;
//   };
//   //Remove Error on focus
//   removeErrorFocus = e => {
//     this.setParticularField(e.target.name, '');
//   };
//   setParticularField = (name, value) => {
//     const errorName = name + '_error';
//     this.setState({
//       [errorName]: value,
//     });
//   };
//   validateFields = fieldName => {
//     switch (fieldName) {
//       case 'start_date':
//         this.validateStartDateForm();
//         break;
//       case 'com_date':
//         this.validateCompleteDateForm();
//         break;
//     }
//   };
//   handleInput = (e, validatorAfterSave = null) => {
//     // const { allFieldsStatus } = this.state;
//     const { name } = e.target;

//     // allFieldsStatus[name] = true; //change the touch status of field
//     let value = e.target.value;
//     if (['start_date', 'com_date'].includes(e.target.name)) {
//       value = new Date(value);
//     }
//     this.setState(
//       {
//         [name]: value,
//         // allFieldsStatus
//       },
//       () => {
//         if (validatorAfterSave) {
//           this.validateFields(name);
//         }
//       },
//     );
//   };

//   render() {
//     const { month, year } = this.state;
//     const { classes } = this.props;
//     const { course_name_error } = this.state;
//     const { course_name } = this.props;

//     const {
//       joined_on_error,
//       left_on_error,
//       current_designation,
//       current_designation_error,
//       start_date,
//       com_date,
//       start_date_error,
//       com_date_error,
//       role_dsc,
//     } = this.state;

//     const { rightHalf, leftHalf, fullWidth } = allDropDownWidth;
//     return (
//       <div className='basic-edu-container'>
//         {/* <FormControl className="form-child" style={{ marginRight: '30px' }}>
//           <AutoCompleteNew
//             label="Your Designation"
//             // onClose={(name, data) => {
//             //   if (data != null && data.value !== '')
//             //     this.setParticularState('job_role', data);
//             // }}
//             //width={rightHalf}
//             //apiUrl={JOB_ROLE}
//             //filterKey={'value'}
//             //value={course_name}
//             method="get"
//             //selectedValues={[job_role]}
//             name="your_designation"
//             onClose={(name, data) => {
//               if (data) {
//                 if (typeof data === 'string') {
//                   this.handleInput({ target: { value: { value: data, key: data }, name } }, true);
//                 } else this.handleInput({ target: { value: data, name } }, true);
//               } else {
//                 this.validateFields(name);
//               }
//             }}
//             onFocus={this.removeErrorFocus}
//             showError={current_designation_error}
//           />
//         </FormControl>
//         <FormControl className="form-child">
//           <AutoCompleteNew
//             label="Your Organisation"
//             // onClose={(name, data) => {
//             //   if (data != null && data.value !== '')
//             //     this.setParticularState('job_role', data);
//             // }}
//             //width={rightHalf}
//             //apiUrl={JOB_ROLE}
//             //filterKey={'value'}
//             //value={course_name}
//             method="get"
//             //selectedValues={[job_role]}
//             name="your_organisation"
//             onClose={(name, data) => {
//               if (data) {
//                 if (typeof data === 'string') {
//                   this.handleInput({ target: { value: { value: data, key: data }, name } }, true);
//                 } else this.handleInput({ target: { value: data, name } }, true);
//               } else {
//                 this.validateFields(name);
//               }
//             }}
//             onFocus={this.removeErrorFocus}
//             showError={current_designation_error}
//           />
//         </FormControl> */}
//         <div className="fifth full-form-child">
//           <FormControl
//             className={'form-child left-child-form ' + classes.formControl}
//             // error={industry_error != ''}
//             style={{ marginTop: '13px', marginRight: '35px' }}
//           >
//             <InputLabel
//               style={{ marginTop: '-12px' }}
//               className="change-label-style"
//               shrink={true}
//               classes={{
//                 root: classes.cssLabel,
//                 focused: classes.cssFocused,
//                 error: classes.cssError,
//               }}
//             >
//               {'Your Designation'}
//             </InputLabel>

//             <CreatableRemoteDataSingleSelectDropdown
//               isSearchable={true}
//               //apiUrl={INDUSTRY}
//               queryParams={{ search: '' }}
//               // defaultValue={
//               //   industry ? { value: industry.key, label: industry.value } : {}
//               // }
//               // getSelectedOption={option =>
//               //   this.setParticularState('industry', {
//               //     key: option.value,
//               //     value: option.label,
//               //   })
//               // }
//               isClearable={false}
//               //error={industry_error}
//             />
//             {/* <FormHelperText>
//                     <span className="field_error">{industry_error}</span>
//                   </FormHelperText> */}
//           </FormControl>
//           <FormControl
//             className="form-child"
//             //error={functional_area_error != ''}
//             style={{ marginTop: '13px' }}
//           >
//             <InputLabel
//               style={{ marginTop: '-12px' }}
//               className="change-label-style"
//               shrink={true}
//               classes={{
//                 root: classes.cssLabel,
//                 focused: classes.cssFocused,
//                 error: classes.cssError,
//               }}
//             >
//               {'Your Organisation'}
//             </InputLabel>
//             <CreatableRemoteDataSingleSelectDropdown
//               isSearchable={true}
//               // apiUrl={FUNCTIONAL_AREA}
//               queryParams={{ search: '' }}
//               // defaultValue={
//               //   functional_area
//               //     ? { value: functional_area.key, label: functional_area.value }
//               //     : 'sumeet'
//               // }
//               // getSelectedOption={option =>
//               //   this.setParticularState('functional_area', {
//               //     key: option.value,
//               //     value: option.label,
//               //   })
//               // }
//               isClearable={false}
//               //error={functional_area_error}
//             />
//             {/* <FormHelperText>
//                     <span className="field_error">{functional_area_error}</span>
//                   </FormHelperText> */}
//           </FormControl>
//         </div>
//         <div className="box-pro">
//           <div className="fres-text">Currently I work here</div>
//           <div className="wrapper1">
//             {/* <div className="fifth full-form-child box1"> */}
//             <FormControl component="fieldset" className="radio-button-control">
//               <RadioGroup
//                 aria-label="Gender"
//                 className="search-radio-buttons wrapper1"
//                 //value={this.state.value}
//                 onChange={this.handleChange}
//               >
//                 <FormControlLabel value="yes" control={<Radio />} label="Yes" />
//                 <FormControlLabel value="no" control={<Radio />} label="No" />
//               </RadioGroup>
//             </FormControl>
//             <Grid container spacing={32} style={{ marginTop: '-35px' }}>
//               <Grid item xs={12} md={6}>
//                 <FormControl
//                   style={{ width: '100%' }}
//                   className="form-child"
//                   error={start_date_error ? true : false}
//                 >
//                   <MuiPickersUtilsProvider utils={DateFnsUtils}>
//                     <DatePicker
//                       id="start_date"
//                       name="start_date"
//                       margin="normal"
//                       label="Start Date"
//                       value={start_date}
//                       views={['year', 'month']}
//                       style={{ marginBottom: '0px', width: '100%' }}
//                       maxDate={new Date()}
//                       onChange={value =>
//                         this.handleInput({ target: { value: value, name: 'start_date' } }, true)
//                       }
//                       onBlur={() => this.validateFields('start_date')}
//                       onFocus={this.removeErrorFocus}
//                       InputProps={{
//                         endAdornment: (
//                           <InputAdornment position="end">
//                             <CustomIcon icon={calendar} className="search-icon" />
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                   </MuiPickersUtilsProvider>
//                   {start_date_error && <FormHelperText>{start_date_error}</FormHelperText>}
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <FormControl
//                   style={{ width: '100%' }}
//                   className="form-child"
//                   error={com_date_error ? true : false}
//                 >
//                   <MuiPickersUtilsProvider utils={DateFnsUtils}>
//                     <DatePicker
//                       id="com_date"
//                       name="com_date"
//                       margin="normal"
//                       label="Completion Date"
//                       value={com_date}
//                       views={['year', 'month']}
//                       style={{ marginBottom: '0px', width: '100%' }}
//                       maxDate={new Date()}
//                       minDate={new Date(start_date)}
//                       onChange={value =>
//                         this.handleInput({ target: { value: value, name: 'com_date' } }, true)
//                       }
//                       onBlur={() => this.validateFields('com_date')}
//                       onFocus={this.removeErrorFocus}
//                       InputProps={{
//                         endAdornment: (
//                           <InputAdornment position="end">
//                             <CustomIcon icon={calendar} className="search-icon" />
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                   </MuiPickersUtilsProvider>
//                   {com_date_error && <FormHelperText>{com_date_error}</FormHelperText>}
//                 </FormControl>
//               </Grid>
//             </Grid>
//           </div>
//         </div>
//         <FormControl component="fieldset" className="radio-button-control">
//           <RadioGroup
//             aria-label="Gender"
//             className="search-radio-buttons wrapper1"
//             //value={this.state.value}
//             onChange={this.handleChange}
//           >
//             <FormControlLabel value="yes" control={<Radio />} label="Service Based" />
//             <FormControlLabel value="no" control={<Radio />} label="Product Based" />
//             <FormControlLabel value="yes" control={<Radio />} label="Hybrid" />
//             <FormControlLabel value="no" control={<Radio />} label="Startup" />
//           </RadioGroup>
//         </FormControl>
//         <div className="full-form-child">
//           <Input
//             style={{ width: '100%' }}
//             id="role_dsc"
//             placeholder="My Roles and Responsibilities"
//             className="role_dsc"
//             // onChange={this.handleChange('name')}
//             margin="normal"
//             //style={{ marginTop: '30px' }}
//           />
//           <div className="character-info-section">
//             <CustomTag text="Minimum Character left : " className="character-left" />
//             <CustomTag text={role_dsc === '' ? 280 : 280 - role_dsc.length} className="count" />
//           </div>
//         </div>
//         <div className="box1">
//           {/* <FormControl className={'form-child left-child-form ' + classes.formControl}>
//             <AutoCompleteNew label="Marital status" width={fullWidth} method="get" />
//           </FormControl> */}
//           <FormControl
//             className={'form-child left-child-form ' + classes.formControl}
//             // error={industry_error != ''}
//             style={{ marginTop: '13px', marginRight: '35px' }}
//           >
//             <InputLabel
//               style={{ marginTop: '-12px' }}
//               className="change-label-style"
//               shrink={true}
//               classes={{
//                 root: classes.cssLabel,
//                 focused: classes.cssFocused,
//                 error: classes.cssError,
//               }}
//             >
//               {'Marital status'}
//             </InputLabel>

//             <CreatableRemoteDataSingleSelectDropdown
//               isSearchable={true}
//               //apiUrl={INDUSTRY}
//               queryParams={{ search: '' }}
//               // defaultValue={
//               //   industry ? { value: industry.key, label: industry.value } : {}
//               // }
//               // getSelectedOption={option =>
//               //   this.setParticularState('industry', {
//               //     key: option.value,
//               //     value: option.label,
//               //   })
//               // }
//               isClearable={false}
//               //error={industry_error}
//             />
//             {/* <FormHelperText>
//                     <span className="field_error">{industry_error}</span>
//                   </FormHelperText> */}
//           </FormControl>
//           <Grid item xs={12} md={6}>
//             <FormControl
//               style={{ width: '100%', marginTop: '-16px' }}
//               className="form-child"
//               error={com_date_error ? true : false}
//             >
//               <MuiPickersUtilsProvider utils={DateFnsUtils}>
//                 <DatePicker
//                   id="com_date"
//                   name="com_date"
//                   margin="normal"
//                   label="Completion Date"
//                   value={com_date}
//                   views={['year', 'month']}
//                   style={{ marginBottom: '0px', width: '100%' }}
//                   maxDate={new Date()}
//                   minDate={new Date(start_date)}
//                   onChange={value =>
//                     this.handleInput({ target: { value: value, name: 'com_date' } }, true)
//                   }
//                   onBlur={() => this.validateFields('com_date')}
//                   onFocus={this.removeErrorFocus}
//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <CustomIcon icon={calendar} className="search-icon" />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </MuiPickersUtilsProvider>
//               {com_date_error && <FormHelperText>{com_date_error}</FormHelperText>}
//             </FormControl>
//           </Grid>{' '}
//         </div>
//         <div className="box1 full-form-child">
//           {/* <FormControl className="form-child">
//             <AutoCompleteNew
//               label="Designation Offererd"
//               // onClose={(name, data) => {
//               //   if (data != null && data.value !== '') this.setParticularState('job_role', data);
//               // }}
//               //width={rightHalf}
//               //apiUrl={JOB_ROLE}
//               filterKey={'value'}
//               method="get"
//               //selectedValues={[job_role]}
//             />
//           </FormControl>
//           <FormControl className="form-child">
//             <AutoCompleteNew
//               label="Next Employer"
//               //width={rightHalf}
//               //apiUrl={JOB_ROLE}
//               filterKey={'value'}
//               method="get"
//               //selectedValues={[job_role]}
//             />
//           </FormControl> */}
//           <div className="fifth full-form-child">
//             <FormControl
//               className={'form-child left-child-form ' + classes.formControl}
//               // error={industry_error != ''}
//               style={{ marginTop: '13px', marginRight: '35px' }}
//             >
//               <InputLabel
//                 style={{ marginTop: '-12px' }}
//                 className="change-label-style"
//                 shrink={true}
//                 classes={{
//                   root: classes.cssLabel,
//                   focused: classes.cssFocused,
//                   error: classes.cssError,
//                 }}
//               >
//                 {'Designation Offered'}
//               </InputLabel>

//               <CreatableRemoteDataSingleSelectDropdown
//                 isSearchable={true}
//                 //apiUrl={INDUSTRY}
//                 queryParams={{ search: '' }}
//                 // defaultValue={
//                 //   industry ? { value: industry.key, label: industry.value } : {}
//                 // }
//                 // getSelectedOption={option =>
//                 //   this.setParticularState('industry', {
//                 //     key: option.value,
//                 //     value: option.label,
//                 //   })
//                 // }
//                 isClearable={false}
//                 //error={industry_error}
//               />
//               {/* <FormHelperText>
//                     <span className="field_error">{industry_error}</span>
//                   </FormHelperText> */}
//             </FormControl>
//             <FormControl
//               className="form-child"
//               //error={functional_area_error != ''}
//               style={{ marginTop: '13px' }}
//             >
//               <InputLabel
//                 style={{ marginTop: '-12px' }}
//                 className="change-label-style"
//                 shrink={true}
//                 classes={{
//                   root: classes.cssLabel,
//                   focused: classes.cssFocused,
//                   error: classes.cssError,
//                 }}
//               >
//                 {'Next Employer'}
//               </InputLabel>
//               <CreatableRemoteDataSingleSelectDropdown
//                 isSearchable={true}
//                 // apiUrl={FUNCTIONAL_AREA}
//                 queryParams={{ search: '' }}
//                 // defaultValue={
//                 //   functional_area
//                 //     ? { value: functional_area.key, label: functional_area.value }
//                 //     : 'sumeet'
//                 // }
//                 // getSelectedOption={option =>
//                 //   this.setParticularState('functional_area', {
//                 //     key: option.value,
//                 //     value: option.label,
//                 //   })
//                 // }
//                 isClearable={false}
//                 //error={functional_area_error}
//               />
//               {/* <FormHelperText>
//                     <span className="field_error">{functional_area_error}</span>
//                   </FormHelperText> */}
//             </FormControl>
//           </div>
//         </div>
//         <div className="wrapper" style={{ width: 'auto' }}>
//           <div style={{ alignSelf: 'self-end' }} className="box1">
//             <FormControl>
//               <FormControlLabel
//                 control={<Checkbox id="check_inter" name="check_intern" />}
//                 label="I have a buy out option"
//               />
//             </FormControl>
//             <FormControl>
//               <FormControlLabel
//                 control={<Checkbox id="check_inter" name="check_intern" />}
//                 label="My notice period is negitiable"
//               />
//             </FormControl>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default withStyles(styles)(UserEmploymentExperienced);

import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import CustomTag from '../../../../../components/CustomTag';
import CustomIcon from '../../../../../components/CustomIcon/CustomIcon';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AutoCompleteNew from '../../../../../components/AutoCompleteNew';
//import './style.scss';
import Input from '@material-ui/core/Input';
import calendar from '../../../../../../assets/media/icons/calendar.svg';
import { TextField, withStyles } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import untick from '../../../../../../assets/media/icons/untick.svg';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
// import UserBasicDetailsView from '../../../UserProfileFresherView/components/UserBasicDetailsView/UserBasicDetailsView';
import customisedMaterial from '../../../../../styles/customisedMaterial';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import dropdown from '../../../../../../assets/media/icons/dropdown.svg';
import DateTimePicker from '../../../../../components/DateTimePicker';
import MultiSelect from '../../../../../components/MultiSelectDropDown/MultiSelect';
import CollapsibleComponentUserProfile from '../../CollapsibleComponentUserProfile/CollapsibleComponentUserProfile';
import { JOB_ROLE } from '../../../../../../config/constants';
import { apiCall, isObjectAlreadyExist, calculateTotalCount } from '../../../../../Utilities/';
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
  rightHalf: '100%',
  leftHalf: '47.5%',
  fullWidth: '100%',
};
const experiences = [];
for (let i = 1; i <= 30; i++) {
  experiences.push(i.toString());
}

class UserEmploymentExperienced extends Component {
  constructor(props) {
    super(props);
    this.resetErrors();
    this.state = {
      your_designation_error: '',
      your_organisation_error: '',
      start_date_error: '',
      com_date_error: '',
      last_working_error: '',
      my_roles_and_responsibilities_error: '',
      notice_period_error: '',
      completion_error: '',
      designation_offered_error: '',
      next_employer_error: '',
      your_designation: '',
      your_organisation: '',
      start_date: '',
      com_date: '',
      last_working: '',
      my_roles_and_responsibilities: '',
      notice_period: '',
      completion: '',
      designation_offered: '',
      next_employer: '',
      // current_designation: this.getValueFromProp('current_designation'),
      // current_designation_error: '',
      // start_date: this.getValueFromProp('start_date'),
      // com_date: this.getValueFromProp('com_on'),
      // start_date_error: '',
      // com_date_error: '',
      role_dsc: '',
    };
    this.checkForErrors = this.checkForErrors.bind(this);
  }
  componentDidMount() {
    if (this.props.checkForErrors == true) {
      this.checkForErrors();
    }
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(null);
  }
  checkForErrors() {
    let error = false;
    if (typeof this.state.your_designation === 'string' || this.state.your_designation == '') {
      error = true;
      this.setState({
        your_designation_error: 'Kindly specify your Designation',
      });
    }
    if (typeof this.state.your_organisation === 'string' || this.state.your_organisation == '') {
      error = true;
      this.setState({
        your_organisation_error: 'Kindly specify your Organisation',
      });
    }
    if (typeof this.state.start_date === 'string' || this.state.start_date == '') {
      error = true;
      this.setState({
        start_date_error: 'Kindly specify your Start Date',
      });
    }
    if (typeof this.state.com_date === 'string' || this.state.com_date == '') {
      error = true;
      this.setState({
        com_date_error: 'Kindly specify your Completion Date',
      });
    }
    if (typeof this.state.notice_period === 'string' || this.state.notice_period == '') {
      error = true;
      this.setState({
        notice_period_error: 'Kindly specify your Notice Period',
      });
    }
    if (typeof this.state.last_working === 'string' || this.state.last_working == '') {
      error = true;
      this.setState({
        last_working_error: 'Kindly specify your Last Working Day',
      });
    }
    if (
      typeof this.state.my_roles_and_responsibilities === 'string' ||
      this.state.my_roles_and_responsibilities == ''
    ) {
      error = true;
      this.setState({
        my_roles_and_responsibilities_error: 'Kindly specify your Roles and Responsibility',
      });
    }
    if (typeof this.state.notice_period === 'string' || this.state.notice_period == '') {
      error = true;
      this.setState({
        notice_period_error: 'Kindly specify your Notice Period',
      });
    }
    if (typeof this.state.your_designation === 'string' || this.state.your_designation == '') {
      error = true;
      this.setState({
        your_designation_error: 'Kindly specify your Designation',
      });
    }
    if (typeof this.state.your_designation === 'string' || this.state.your_designation == '') {
      error = true;
      this.setState({
        your_designation_error: 'Kindly specify your Designation',
      });
    }
    if (typeof this.state.your_designation === 'string' || this.state.your_designation == '') {
      error = true;
      this.setState({
        your_designation_error: 'Kindly specify your Designation',
      });
    }
  }
  resetErrors = () => {
    this.setState({
      your_designation_error: '',
      your_organisation_error: '',
      start_date_error: '',
      com_date_error: '',
      last_working_error: '',
      my_roles_and_responsibilities_error: '',
      notice_period_error: '',
      completion_error: '',
      designation_offered_error: '',
      next_employer_error: '',
    });
  };
  handleInput = (e, validatorAfterSave = null) => {
    const { name } = e.target;
    this.setState(
      {
        [name]: e.target.value,
        [`${name}_error`]: '',
      },
      () => {
        //debugger;
        this.validateFields(name);
      },
    );
  };
  setDropdownOption = (option, name, validatorAfterSave = null) => {
    const opt = option ? { key: option.value, value: option.label } : '';
    this.setState(
      {
        [name]: opt,
        [`${name}_error`]: '',
      },
      () => {
        this.validateFields(name);
      },
    );
  };
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
      case 'your_designation':
        this.validateYourDesignationForm();
        break;
      case 'your_organisation':
        this.validateYourOrganisationForm();
        break;
      case 'my_roles_and_responsibilities':
        this.validateMyRolesandResponsibilitiesForm();
        break;
      case 'notice_period':
        this.validateNoticePeridForm();
        break;
      case 'last_working':
        this.validateLastWorkingForm();
        break;
      case 'designation_offered':
        this.validateDesignationOfferedForm();
        break;
      case 'next_employer':
        this.validateNextEmployerForm();
        break;
    }
  };
  //Remove Error on focus
  removeErrorFocus = e => {
    this.setParticularField(e.target.name, '');
  };
  validateYourDesignationForm = async () => {
    let errorValue = '';
    if (!this.state.your_designation || !this.state.your_designation.value) {
      errorValue = 'Kindly specify your Designation';
    }
    this.setParticularField('your_designation', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateYourOrganisationForm = async () => {
    let errorValue = '';
    if (!this.state.your_organisation || !this.state.your_organisation.value) {
      errorValue = 'Kindly specify your Organisation';
    }
    this.setParticularField('your_organisation', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateMyRolesandResponsibilitiesForm = async () => {
    let errorValue = '';
    if (!this.state.my_roles_and_responsibilities) {
      errorValue = 'Kindly specify your Roles and Responsibilities';
    }
    this.setParticularField('my_roles_and_responsibilities', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateNoticePeriodForm = async () => {
    let errorValue = '';
    if (!this.state.notice_period || !this.state.notice_period.value) {
      errorValue = 'Kindly specify your Notice Period';
    }
    this.setParticularField('notice_period', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateLastWorkingForm = async () => {
    let errorValue = '';
    if (!this.state.last_working || !this.state.last_working.value) {
      errorValue = 'Kindly specify your Last Working Day';
    }
    this.setParticularField('last_working', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateDesignationOfferedForm = async () => {
    let errorValue = '';
    if (!this.state.designation_offered || !this.state.designation_offered.value) {
      errorValue = 'Kindly specify your Designation Offered';
    }
    this.setParticularField('designation_offered', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateNextEmployerForm = async () => {
    let errorValue = '';
    if (!this.state.next_employer || !this.state.next_employer.value) {
      errorValue = 'Kindly specify Next Employer';
    }
    this.setParticularField('next_employer', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateStartDateForm = async () => {
    let errorValue = '';
    if (!this.state.start_date || !this.state.start_date.value) {
      errorValue = 'Kindly specify your Start Date';
    }
    this.setParticularField('start_date', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateCompleteDateForm = async () => {
    let errorValue = '';
    if (!this.state.com_date || !this.state.com_date.value) {
      errorValue = 'Kindly specify your Completion Date';
    }
    this.setParticularField('com_date', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  render() {
    const { month, year } = this.state;
    const { classes } = this.props;
    const { course_name_error } = this.state;
    const { course_name } = this.props;

    const {
      joined_on_error,
      left_on_error,
      current_designation,
      current_designation_error,
      start_date,
      com_date,
      start_date_error,
      com_date_error,
      role_dsc,
      your_designation_error,
      your_organisation_error,
      my_roles_and_responsibilities_error,
      notice_period_error,
      last_working_error,
      completion_error,
      designation_offered_error,
      next_employer_error,
      your_designation,
      your_organisation,

      my_roles_and_responsibilities,
      notice_period,
      completion,
      designation_offered,
      next_employer,
    } = this.state;

    const { rightHalf, leftHalf, fullWidth } = allDropDownWidth;
    return (
      <div className="basic-edu-container">
        {/* <FormControl className="form-child" style={{ marginRight: '30px' }}>
          <AutoCompleteNew
            label="Your Designation"
            // onClose={(name, data) => {
            //   if (data != null && data.value !== '')
            //     this.setParticularState('job_role', data);
            // }}
            //width={rightHalf}
            //apiUrl={JOB_ROLE}
            //filterKey={'value'}
            //value={course_name}
            method="get"
            //selectedValues={[job_role]}
            name="your_designation"
            onClose={(name, data) => {
              if (data) {
                if (typeof data === 'string') {
                  this.handleInput({ target: { value: { value: data, key: data }, name } }, true);
                } else this.handleInput({ target: { value: data, name } }, true);
              } else {
                this.validateFields(name);
              }
            }}
            onFocus={this.removeErrorFocus}
            showError={current_designation_error}
          />
        </FormControl>
        <FormControl className="form-child">
          <AutoCompleteNew
            label="Your Organisation"
            // onClose={(name, data) => {
            //   if (data != null && data.value !== '')
            //     this.setParticularState('job_role', data);
            // }}
            //width={rightHalf}
            //apiUrl={JOB_ROLE}
            //filterKey={'value'}
            //value={course_name}
            method="get"
            //selectedValues={[job_role]}
            name="your_organisation"
            onClose={(name, data) => {
              if (data) {
                if (typeof data === 'string') {
                  this.handleInput({ target: { value: { value: data, key: data }, name } }, true);
                } else this.handleInput({ target: { value: data, name } }, true);
              } else {
                this.validateFields(name);
              }
            }}
            onFocus={this.removeErrorFocus}
            showError={current_designation_error}
          />
        </FormControl> */}
        <div className="fifth full-form-child">
          <FormControl
            className={'form-child left-child-form ' + classes.formControl}
            // error={industry_error != ''}
            style={{ marginTop: '13px', marginRight: '35px' }}
          >
            <InputLabel
              style={{ marginTop: '-12px' }}
              className="change-label-style"
              shrink={true}
              classes={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
                error: classes.cssError,
              }}
            >
              {'Your Designation'}
            </InputLabel>

            <CreatableRemoteDataSingleSelectDropdown
              isSearchable={true}
              //apiUrl={INDUSTRY}
              queryParams={{ search: '' }}
              getSelectedOption={option => this.setDropdownOption(option, 'your_designation')}
              defaultValue={
                your_designation.value
                  ? {
                      value: your_designation.key,
                      label: your_designation.value,
                    }
                  : {}
              }
              isClearable={true}
              error={your_designation_error ? your_designation_error : false}
            />
            {/* {console.log('hint', qualification_error)} */}

            {your_designation_error ? (
              <FormHelperText error={your_designation_error} id="firstName_error">
                <span className="field_error">{your_designation_error}</span>
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl
            className="form-child"
            //error={functional_area_error != ''}
            style={{ marginTop: '13px' }}
          >
            <InputLabel
              style={{ marginTop: '-12px' }}
              className="change-label-style"
              shrink={true}
              classes={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
                error: classes.cssError,
              }}
            >
              {'Your Organisation'}
            </InputLabel>
            <CreatableRemoteDataSingleSelectDropdown
              isSearchable={true}
              // apiUrl={FUNCTIONAL_AREA}
              queryParams={{ search: '' }}
              getSelectedOption={option => this.setDropdownOption(option, 'your_organisation')}
              defaultValue={
                your_organisation.value
                  ? {
                      value: your_organisation.key,
                      label: your_organisation.value,
                    }
                  : {}
              }
              isClearable={true}
              error={your_organisation_error ? your_organisation_error : false}
            />
            {/* {console.log('hint', qualification_error)} */}

            {your_organisation_error ? (
              <FormHelperText error={your_organisation_error} id="firstName_error">
                <span className="field_error">{your_organisation_error}</span>
              </FormHelperText>
            ) : null}
          </FormControl>
        </div>
        <div className="box-pro">
          <div className="fres-text">Currently I work here</div>
          <div className="wrapper1">
            {/* <div className="fifth full-form-child box1"> */}
            <FormControl component="fieldset" className="radio-button-control">
              <RadioGroup
                aria-label="Gender"
                className="search-radio-buttons wrapper1"
                //value={this.state.value}
                onChange={this.handleChange}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <Grid container spacing={32} style={{ marginTop: '-35px' }}>
              <Grid item xs={12} md={6}>
                <FormControl
                  style={{ width: '100%' }}
                  className="form-child"
                  error={start_date_error ? true : false}
                >
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      id="start_date"
                      name="start_date"
                      margin="normal"
                      label="Start Date"
                      // value={start_date}
                      views={['year', 'month']}
                      style={{ marginBottom: '0px', width: '100%' }}
                      maxDate={new Date()}
                      onChange={value =>
                        this.handleInput({ target: { value: value, name: 'start_date' } }, true)
                      }
                      onBlur={() => this.validateFields('start_date')}
                      onFocus={this.removeErrorFocus}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <CustomIcon icon={calendar} className="search-icon" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  {start_date_error && <FormHelperText>{start_date_error}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl
                  style={{ width: '100%' }}
                  className="form-child"
                  error={com_date_error ? true : false}
                >
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      id="com_date"
                      name="com_date"
                      margin="normal"
                      label="Completion Date"
                      // value={com_date}
                      views={['year', 'month']}
                      style={{ marginBottom: '0px', width: '100%' }}
                      maxDate={new Date()}
                      minDate={new Date(start_date)}
                      onChange={value =>
                        this.handleInput({ target: { value: value, name: 'com_date' } }, true)
                      }
                      onBlur={() => this.validateFields('com_date')}
                      onFocus={this.removeErrorFocus}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <CustomIcon icon={calendar} className="search-icon" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  {com_date_error && <FormHelperText>{com_date_error}</FormHelperText>}
                </FormControl>
              </Grid>
            </Grid>
          </div>
        </div>
        <FormControl component="fieldset" className="radio-button-control">
          <RadioGroup
            aria-label="Gender"
            className="search-radio-buttons wrapper1"
            //value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Service Based" />
            <FormControlLabel value="no" control={<Radio />} label="Product Based" />
            <FormControlLabel value="yes" control={<Radio />} label="Hybrid" />
            <FormControlLabel value="no" control={<Radio />} label="Startup" />
          </RadioGroup>
        </FormControl>
        {/* <div className="full-form-child"> */}
        {/* <Input
            style={{ width: '100%' }}
            id="role_dsc"
            placeholder="My Roles and Responsibilities"
            className="role_dsc"
            // onChange={this.handleChange('name')}
            margin="normal"
            //style={{ marginTop: '30px' }}
          /> */}
        <FormControl
          //error={marks_error !== ''}
          className={'full-form-child '}
          // style={{ marginLeft: '35px' }}
        >
          <InputLabel
            classes={{ root: classes.helperText }}
            classes={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
            shrink={true}
            htmlFor="my_roles_and_responsibilities"
          >
            My Roles and Responsibilities
          </InputLabel>
          <Input
            name="my_roles_and_responsibilities"
            type="text"
            value={my_roles_and_responsibilities}
            onChange={this.handleInput}
            onBlur={() => this.validateFields('my_roles_and_responsibilities')}
            onFocus={this.removeErrorFocus}
            autoComplete="off"
            //name="number_of_vacancy"
            //className={classes.Input}
            //value={number_of_vacancy}
            // classes={{
            //   underline: classes.cssUnderline,
            //   focused: classes.cssFocused,
            // }}
            // type="number"
            // margin="normal"
            // onChange={this.onInputChange}
            // onBlur={this.handleBlur}
            error={
              my_roles_and_responsibilities_error ? my_roles_and_responsibilities_error : false
            }
          />
          {/* <FormHelperText className="field_error">{marks_error}</FormHelperText> */}
          {my_roles_and_responsibilities_error ? (
            <FormHelperText error={my_roles_and_responsibilities_error} id="firstName_error">
              <span className="field_error">{my_roles_and_responsibilities_error}</span>
            </FormHelperText>
          ) : null}
        </FormControl>
        <div className="character-info-section">
          <CustomTag text="Minimum Character left : " className="character-left" />
          <CustomTag text={role_dsc === '' ? 280 : 280 - role_dsc.length} className="count" />
        </div>
        {/* </div> */}
        <div className="box1">
          {/* <FormControl className={'form-child left-child-form ' + classes.formControl}>
            <AutoCompleteNew label="Marital status" width={fullWidth} method="get" />
          </FormControl> */}
          <FormControl
            className={'form-child left-child-form ' + classes.formControl}
            // error={industry_error != ''}
            style={{ marginTop: '13px', marginRight: '35px' }}
          >
            <InputLabel
              style={{ marginTop: '-12px' }}
              className="change-label-style"
              shrink={true}
              classes={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
                error: classes.cssError,
              }}
            >
              {'Notice Period'}
            </InputLabel>

            <CreatableRemoteDataSingleSelectDropdown
              isSearchable={true}
              //apiUrl={INDUSTRY}
              queryParams={{ search: '' }}
              getSelectedOption={option => this.setDropdownOption(option, 'notice_period')}
              defaultValue={
                notice_period.value ? { value: notice_period.key, label: notice_period.value } : {}
              }
              isClearable={true}
              error={notice_period_error ? notice_period_error : false}
            />
            {/* {console.log('hint', qualification_error)} */}

            {notice_period_error ? (
              <FormHelperText error={notice_period_error} id="firstName_error">
                <span className="field_error">{notice_period_error}</span>
              </FormHelperText>
            ) : null}
          </FormControl>
          <Grid item xs={12} md={6}>
            <FormControl
              style={{ width: '100%', marginTop: '-16px' }}
              className="form-child"
              error={last_working_error ? true : false}
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  id="last_working"
                  name="last_working"
                  margin="normal"
                  label="My Expected last working day"
                  //  value={com_date}
                  views={['year', 'month']}
                  style={{ marginBottom: '0px', width: '100%' }}
                  maxDate={new Date()}
                  minDate={new Date(start_date)}
                  onChange={value =>
                    this.handleInput({ target: { value: value, name: 'last_working' } }, true)
                  }
                  onBlur={() => this.validateFields('last_working')}
                  onFocus={this.removeErrorFocus}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CustomIcon icon={calendar} className="search-icon" />
                      </InputAdornment>
                    ),
                  }}
                />
              </MuiPickersUtilsProvider>
              {last_working_error && <FormHelperText>{last_working_error}</FormHelperText>}
            </FormControl>
          </Grid>{' '}
        </div>
        <div className="box1 full-form-child">
          {/* <FormControl className="form-child">
            <AutoCompleteNew
              label="Designation Offererd"
              // onClose={(name, data) => {
              //   if (data != null && data.value !== '') this.setParticularState('job_role', data);
              // }}
              //width={rightHalf}
              //apiUrl={JOB_ROLE}
              filterKey={'value'}
              method="get"
              //selectedValues={[job_role]}
            />
          </FormControl>
          <FormControl className="form-child">
            <AutoCompleteNew
              label="Next Employer"
              //width={rightHalf}
              //apiUrl={JOB_ROLE}
              filterKey={'value'}
              method="get"
              //selectedValues={[job_role]}
            />
          </FormControl> */}
          <div className="fifth full-form-child">
            <FormControl
              className={'form-child left-child-form ' + classes.formControl}
              // error={industry_error != ''}
              style={{ marginTop: '13px', marginRight: '35px' }}
            >
              <InputLabel
                style={{ marginTop: '-12px' }}
                className="change-label-style"
                shrink={true}
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                  error: classes.cssError,
                }}
              >
                {'Designation Offered'}
              </InputLabel>

              <CreatableRemoteDataSingleSelectDropdown
                isSearchable={true}
                //apiUrl={INDUSTRY}
                queryParams={{ search: '' }}
                getSelectedOption={option => this.setDropdownOption(option, 'designation_offered')}
                defaultValue={
                  designation_offered.value
                    ? {
                        value: designation_offered.key,
                        label: designation_offered.value,
                      }
                    : {}
                }
                isClearable={true}
                error={designation_offered_error ? designation_offered_error : false}
              />
              {/* {console.log('hint', qualification_error)} */}

              {designation_offered_error ? (
                <FormHelperText error={designation_offered_error} id="firstName_error">
                  <span className="field_error">{designation_offered_error}</span>
                </FormHelperText>
              ) : null}
            </FormControl>
            <FormControl
              className="form-child"
              //error={functional_area_error != ''}
              style={{ marginTop: '13px' }}
            >
              <InputLabel
                style={{ marginTop: '-12px' }}
                className="change-label-style"
                shrink={true}
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                  error: classes.cssError,
                }}
              >
                {'Next Employer'}
              </InputLabel>
              <CreatableRemoteDataSingleSelectDropdown
                isSearchable={true}
                // apiUrl={FUNCTIONAL_AREA}
                queryParams={{ search: '' }}
                getSelectedOption={option => this.setDropdownOption(option, 'next_employer')}
                defaultValue={
                  next_employer.value
                    ? { value: next_employer.key, label: next_employer.value }
                    : {}
                }
                isClearable={true}
                error={next_employer_error ? next_employer_error : false}
              />
              {/* {console.log('hint', qualification_error)} */}

              {next_employer_error ? (
                <FormHelperText error={next_employer_error} id="firstName_error">
                  <span className="field_error">{next_employer_error}</span>
                </FormHelperText>
              ) : null}
            </FormControl>
          </div>
        </div>
        <div className="wrapper" style={{ width: 'auto' }}>
          <div style={{ alignSelf: 'self-end' }} className="box1">
            <FormControl>
              <FormControlLabel
                control={<Checkbox id="check_inter" name="check_intern" />}
                label="I have a buy out option"
              />
            </FormControl>
            <FormControl>
              <FormControlLabel
                control={<Checkbox id="check_inter" name="check_intern" />}
                label="My notice period is negitiable"
              />
            </FormControl>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(UserEmploymentExperienced);
