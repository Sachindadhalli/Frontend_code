// import React, { Component } from 'react';
// import InputLabel from '@material-ui/core/InputLabel';
// import PropTypes from 'prop-types';
// import CustomTag from '../../../../../components/CustomTag';
// import CustomIcon from '../../../../../components/CustomIcon/CustomIcon';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import AutoCompleteNew from '../../../../../components/AutoCompleteNew';
// //import './style.scss';
// import Input from '@material-ui/core/Input';
// import { TextField, withStyles } from '@material-ui/core';
// import { Checkbox } from '@material-ui/core';
// import untick from '../../../../../../assets/media/icons/untick.svg';
// import FormControl from '@material-ui/core/FormControl';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import customisedMaterial from '../../../../../styles/customisedMaterial';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
// import dropdown from '../../../../../../assets/media/icons/dropdown.svg';
// import DateTimePicker from '../../../../../components/DateTimePicker';
// import MultiSelect from '../../../../../components/MultiSelectDropDown/MultiSelect';
// import CreatableRemoteDataSingleSelectDropdown from '../../../../../components/SingleSelectDropdownWrapper/components/CreatableRemoteDataSingleSelectDropdown/CreatableRemoteDataSingleSelectDropdown';
// import LabelValueComponent from '../../../../../components/ReusableComponents/LabelValueComponent/LabelValueComponent';
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
// class PersonalDetailsEdit extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       permanent_address: '',
//       marital_status: '',
//       marital_status_error: '',
//       category_error: '',
//       category: '',
//       permanent_residency: '',
//       permanent_residency_error: '',
//       passport: '',
//       passport_error: '',
//       area_pincode: '',
//       area_pincode_error: '',
//       hometown: '',
//       hometown_error: '',
//       permanent_address: '',
//       permanent_address_error: '',
//       date_of_birth: '',
//       date_of_birth_error: '',
//     };
//   }
//   render() {
//     const { permanent_address } = this.state;
//     const { classes } = this.props;
//     const {
//       rightHalf,
//       leftHalf,
//       fullWidth,
//       marital_status,
//       category,
//       permanent_residency,
//       passport,
//       area_pincode,
//       hometown,
//       //   permanent_address,
//       date_of_birth,
//     } = allDropDownWidth;
//     return (
//       <div className={'basic-per-container'}>
//         {/* <div className="save-emp-header">
//           <div className="save-discard">
//             <CustomTag
//               text="Save"
//               //onClick={this.createItem}
//               className="save"
//               onclick={this.props.onclick}
//             />
//             <CustomTag text="Cancel" className="cancel_btn" onclick={this.props.onclick} />
//           </div>
//           <div className="save-emp-details">
//             <img src={dropdown} />
//             <CustomTag text="Personal Details" className="mx-15" />
//           </div>
//         </div> */}
//         <div className="box1 full-form-child">
//           <FormControl
//             className="form-child"
//             style={{
//               //width: '100%',
//               marginTop: '10px',
//               marginRight: '30px',
//               marginBottom: '-20px',
//             }}
//           >
//             <DateTimePicker
//               label="Date of Birth"
//               //date={this.state.dateOfBirth}
//               onChangeDate={this.handleDateChange}
//               //selected={this.state.dateOfBirth ? this.state.dateOfBirth : null}
//             />
//           </FormControl>
//           {/* <Input
//             className="form-child"
//             style={{ marginTop: '10px' }}
//             id="gen"
//             placeholder="Gender"
//             className="gen"
//             // onChange={this.handleChange('name')}
//             margin="normal"
//             //width="100%"
//             //style={{ marginTop: '30px' }}
//           /> */}
//           <LabelValueComponent label="Gender" value={'Female'} />
//         </div>
//         <FormControl className="full-form-child">
//           <Input
//             placeholder="Permanent Address"
//             // onClose={(name, data) => {
//             //   if (data != null && data.value !== '') this.setParticularState(data);
//             // }}
//             //width={rightHalf}
//             //apiUrl={JOB_ROLE}
//             //filterKey={'value'}
//             method="get"
//             //selectedValues={[job_role]}
//             name="permanent_address"
//           />
//           {/* <FormHelperText >{job_role_error}</FormHelperText> */}
//         </FormControl>
//         <div className="character-info-section">
//           <CustomTag text="Minimum Character left : " className="character-left" />
//           <CustomTag
//             text={permanent_address === '' ? 100 : 100 - permanent_address.length}
//             className="count"
//           />
//         </div>

//         <div className="fourth full-form-child">
//           <FormControl
//             className={'form-child ' + classes.formControl}
//             style={{ marginRight: '35px' }}
//           >
//             <InputLabel
//               classes={{ root: classes.helperText }}
//               classes={{
//                 root: classes.cssLabel,
//                 focused: classes.cssFocused,
//               }}
//               shrink={true}
//               htmlFor="area"
//             >
//               Area Pincode
//             </InputLabel>
//             <Input
//               name="area_pincode"
//               type="number"
//               value={area_pincode}
//               onChange={this.handleInput}
//               //   onBlur={() => this.validateFields('salary')}
//               //   onFocus={this.removeErrorFocus}
//               autoComplete="off"
//               //   error={salary_error ? salary_error : false}
//             />
//             {/* {salary_error ? (
//               <FormHelperText error={salary_error} id="firstName_error">
//                 <span className="field_error">{salary_error}</span>
//               </FormHelperText>
//             ) : null} */}
//           </FormControl>

//           <FormControl
//             className={'form-child left-child-form ' + classes.formControl}
//             // error={industry_error != ''}
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
//               {'Hometown (City)'}
//             </InputLabel>

//             <CreatableRemoteDataSingleSelectDropdown
//               isSearchable={true}
//               //apiUrl={INDUSTRY}
//               queryParams={{ search: '' }}
//               getSelectedOption={option => this.setDropdownOption(option, 'hometown')}
//               defaultValue={hometown ? { value: hometown.key, label: hometown.value } : {}}
//               isClearable={true}
//               //   error={expected_salary_error ? expected_salary_error : false}
//             />
//             {/* {expected_salary_error ? (
//               <FormHelperText error={expected_salary_error} id="firstName_error">
//                 <span className="field_error">{expected_salary_error}</span>
//               </FormHelperText>
//             ) : null} */}
//           </FormControl>
//         </div>
//         <FormControl
//           className={'form-child left-child-form ' + classes.formControl}
//           // error={industry_error != ''}
//           style={{ marginTop: '13px', marginRight: '35px' }}
//         >
//           <InputLabel
//             style={{ marginTop: '-12px' }}
//             className="change-label-style"
//             shrink={true}
//             classes={{
//               root: classes.cssLabel,
//               focused: classes.cssFocused,
//               error: classes.cssError,
//             }}
//           >
//             {'permanent residency for'}
//           </InputLabel>

//           <CreatableRemoteDataSingleSelectDropdown
//             isSearchable={true}
//             //apiUrl={INDUSTRY}
//             queryParams={{ search: '' }}
//             getSelectedOption={option => this.setDropdownOption(option, 'permanent_residency')}
//             defaultValue={hometown ? { value: hometown.key, label: hometown.value } : {}}
//             isClearable={true}
//             //   error={expected_salary_error ? expected_salary_error : false}
//           />
//           {/* {expected_salary_error ? (
//               <FormHelperText error={expected_salary_error} id="firstName_error">
//                 <span className="field_error">{expected_salary_error}</span>
//               </FormHelperText>
//             ) : null} */}
//         </FormControl>

//         <FormControl className={'form-child ' + classes.formControl}>
//           <InputLabel
//             classes={{ root: classes.helperText }}
//             classes={{
//               root: classes.cssLabel,
//               focused: classes.cssFocused,
//             }}
//             shrink={true}
//             htmlFor="salary"
//           >
//             Passport Number
//           </InputLabel>
//           <Input
//             name="passport"
//             type="number"
//             value={passport}
//             onChange={this.handleInput}
//             //   onBlur={() => this.validateFields('salary')}
//             //   onFocus={this.removeErrorFocus}
//             autoComplete="off"
//             //   error={salary_error ? salary_error : false}
//           />
//           {/* {salary_error ? (
//               <FormHelperText error={salary_error} id="firstName_error">
//                 <span className="field_error">{salary_error}</span>
//               </FormHelperText>
//             ) : null} */}
//         </FormControl>

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
//               {'Marital status'}
//             </InputLabel>

//             <CreatableRemoteDataSingleSelectDropdown
//               isSearchable={true}
//               //apiUrl={INDUSTRY}
//               queryParams={{ search: '' }}
//               getSelectedOption={option => this.setDropdownOption(option, 'desired_location')}
//               defaultValue={
//                 marital_status ? { value: desired_location.key, label: desired_location.value } : {}
//               }
//               isClearable={true}
//               // error={desired_location_error ? desired_location_error : false}
//             />
//             {/* {desired_location_error ? (
//                 <FormHelperText error={desired_location_error} id="firstName_error">
//                   <span className="field_error">{desired_location_error}</span>
//                 </FormHelperText>
//               ) : null} */}
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
//               {'Category'}
//             </InputLabel>
//             <CreatableRemoteDataSingleSelectDropdown
//               isSearchable={true}
//               //  apiUrl={INDUSTRY}
//               queryParams={{ search: '' }}
//               getSelectedOption={option => this.setDropdownOption(option, 'desired_industry')}
//               defaultValue={
//                 category ? { value: desired_industry.key, label: desired_industry.value } : {}
//               }
//               isClearable={true}
//               // error={desired_industry_error ? desired_industry_error : false}
//             />
//             {/* {desired_industry_error ? (
//                 <FormHelperText error={desired_industry_error} id="firstName_error">
//                   <span className="field_error">{desired_industry_error}</span>
//                 </FormHelperText>
//               ) : null} */}
//           </FormControl>
//         </div>
//         <div className="fres-text">Differently Abled</div>
//         <div className="box2" style={{ marginBottom: '-7px' }}>
//           <div className="yes-no">
//             <FormControl component="fieldset" className="radio-button-control">
//               <RadioGroup
//                 aria-label="Gender"
//                 className="search-radio-buttons"
//                 //value={this.state.value}
//                 onChange={this.handleChange}
//               >
//                 <FormControlLabel value="yes" control={<Radio />} label="Yes" />
//                 <FormControlLabel value="no" control={<Radio />} label="No" />
//               </RadioGroup>
//             </FormControl>
//           </div>
//         </div>
//         {/* <div className="wrapper">
//           <div className="fres-text" Language>
//             <div className="shape mx-15">
//               <div className="plus">+</div>
//             </div>
//           </div>
//           <div className="fifth full-form-child">
//             <FormControl className={'form-child left-child-form ' + classes.formControl}>
//               <AutoCompleteNew label="English" method="get" />
//             </FormControl>
//           </div>
//         </div> */}
//         <div style={{ display: 'flex' }}>
//           <div className="lang">
//             <div className="fres-internship">
//               Language
//               <div className="shape mx-15">
//                 <div className="plus">+</div>
//               </div>
//             </div>
//             <FormControl style={{ width: '195%' }}>
//               <AutoCompleteNew
//                 label=""
//                 // onClose={(name, data) => {
//                 //   if (data != null && data.value !== '') this.setParticularState(data);
//                 // }}
//                 //width={rightHalf}
//                 //apiUrl={JOB_ROLE}
//                 //filterKey={'value'}
//                 method="get"
//                 //selectedValues={[job_role]}
//               />
//             </FormControl>
//           </div>
//           <div className="wrapper" style={{ width: 'auto' }}>
//             <div className="fres-text">Proficiency</div>
//             <div style={{ alignSelf: 'self-end' }} className="box1">
//               <FormControl>
//                 <FormControlLabel
//                   control={<Checkbox id="check_inter" name="check_intern" />}
//                   label="Read"
//                 />
//               </FormControl>
//               <FormControl>
//                 <FormControlLabel
//                   control={<Checkbox id="check_inter" name="check_intern" />}
//                   label="Write"
//                 />
//               </FormControl>
//               <FormControl>
//                 <FormControlLabel
//                   control={<Checkbox id="check_inter" name="check_intern" />}
//                   label="Speak"
//                 />
//               </FormControl>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
// export default withStyles(styles)(PersonalDetailsEdit);

import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import CustomTag from '../../../../../components/CustomTag';
import CustomIcon from '../../../../../components/CustomIcon/CustomIcon';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AutoCompleteNew from '../../../../../components/AutoCompleteNew';
//import './style.scss';
import Input from '@material-ui/core/Input';
import { TextField, withStyles } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import untick from '../../../../../../assets/media/icons/untick.svg';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import customisedMaterial from '../../../../../styles/customisedMaterial';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import dropdown from '../../../../../../assets/media/icons/dropdown.svg';
import DateTimePicker from '../../../../../components/DateTimePicker';
import MultiSelect from '../../../../../components/MultiSelectDropDown/MultiSelect';
import CreatableRemoteDataSingleSelectDropdown from '../../../../../components/SingleSelectDropdownWrapper/components/CreatableRemoteDataSingleSelectDropdown/CreatableRemoteDataSingleSelectDropdown';
import LabelValueComponent from '../../../../../components/ReusableComponents/LabelValueComponent/LabelValueComponent';
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
class PersonalDetailsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marital_status: '',
      marital_status_error: '',
      category_error: '',
      category: '',
      permanent_residency: '',
      permanent_residency_error: '',
      passport: '',
      passport_error: '',
      area_pincode: '',
      area_pincode_error: '',
      hometown: '',
      hometown_error: '',
      permanent_address: '',
      permanent_address_error: '',
      date_of_birth: '',
      date_of_birth_error: '',
      language: '',
      language_error: '',
    };
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
    if (typeof this.state.marital_status === 'string' || this.state.marital_status == '') {
      error = true;
      this.setState({
        marital_status_error: 'Kindly specify your Marital status',
      });
    }
    if (typeof this.state.category === 'string' || this.state.category == '') {
      error = true;
      this.setState({
        category_error: 'Kindly specify your Category',
      });
    }
    if (
      typeof this.state.permanent_residency === 'string' ||
      this.state.permanent_residency == ''
    ) {
      error = true;
      this.setState({
        permanent_address_error: 'Kindly specify your Permanent Residency Form',
      });
    }
    if (typeof this.state.passport === 'string' || this.state.passport == '') {
      error = true;
      this.setState({
        passport_error: 'Kindly specify your Passport',
      });
    }
    if (typeof this.state.area_pincode === 'string' || this.state.area_pincode == '') {
      error = true;
      this.setState({
        area_pincode_error: 'Kindly specify your Area Pincode',
      });
    }
    if (typeof this.state.hometown === 'string' || this.state.hometown == '') {
      error = true;
      this.setState({
        hometown_error: 'Kindly specify your Hometown',
      });
    }
    if (typeof this.state.permanent_address === 'string' || this.state.permanent_address == '') {
      error = true;
      this.setState({
        permanent_address_error: 'Kindly specify your Permanent Address',
      });
    }
    if (typeof this.state.date_of_birth === 'string' || this.state.date_of_birth == '') {
      error = true;
      this.setState({
        date_of_birth_error: 'Kindly specify your Date of Birt',
      });
    }
    if (typeof this.state.language === 'string' || this.state.language == '') {
      error = true;
      this.setState({
        language_error: 'Kindly specify your  Language',
      });
    }
  }
  resetErrors = () => {
    this.setState({
      marital_status_error: '',
      category_error: '',
      permanent_residency_error: '',
      passport_error: '',
      area_pincode_error: '',
      hometown_error: '',
      permanent_address_error: '',
      date_of_birth_error: '',
      language_error: '',
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
        // debugger;
        this.validateFields(name);
      },
    );
  };
  validateFields = fieldName => {
    switch (fieldName) {
      case 'marital_status':
        this.validateMaritalStatusForm();
        break;
      case 'category':
        this.validateCategoryForm();
        break;
      case 'permanent_residency':
        this.validatePermanentResidencyForm();
        break;
      case 'passport':
        this.validatePassportForm();
        break;
      case 'area_pincode':
        this.validateAreaPincodeForm();
        break;
      case 'hometown':
        this.validateHometownForm();
        break;
      case 'permanent_address':
        this.validatePermanentAddressForm();
        break;
      case 'date_of_birth':
        this.validateDateOfBirthForm();
        break;
      case 'language':
        this.validateLanguageForm();
        break;
    }
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
  validateMaritalStatusForm = async () => {
    let errorValue = '';
    if (!this.state.marital_status || !this.state.marital_status.value) {
      errorValue = 'Kindly specify your Marital status';
    }
    this.setParticularField('marital_status', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateCategoryForm = async () => {
    let errorValue = '';
    if (!this.state.category || !this.state.category.value) {
      errorValue = 'Kindly specify your Category';
    }
    this.setParticularField('category', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validatePermanentResidencyForm = async () => {
    let errorValue = '';
    if (!this.state.permanent_residency || !this.state.permanent_residency.value) {
      errorValue = 'Kindly specify your Permanent Residency From';
    }
    this.setParticularField('permanent_residency', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validatePassportForm = async () => {
    let errorValue = '';
    if (!this.state.passport) {
      errorValue = 'Kindly specify your Passport';
    }
    this.setParticularField('passport', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateAreaPincodeForm = async () => {
    let errorValue = '';
    if (!this.state.area_pincode) {
      errorValue = 'Kindly specify your Area Pincode';
    }
    this.setParticularField('area_pincode', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateHometownForm = async () => {
    let errorValue = '';
    if (!this.state.hometown || !this.state.hometown.value) {
      errorValue = 'Kindly specify your Hometown';
    }
    this.setParticularField('hometown', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validatePermanentAddressForm = async () => {
    let errorValue = '';
    if (!this.state.permanent_address) {
      errorValue = 'Kindly specify your Permanent Address';
    }
    this.setParticularField('permanent_address', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateDateOfBirthForm = async () => {
    let errorValue = '';
    if (!this.state.date_of_birth || !this.state.date_of_birth.value) {
      errorValue = 'Kindly specify your Date of Birth';
    }
    this.setParticularField('date_of_birth', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateLanguageForm = async () => {
    let errorValue = '';
    if (!this.state.language || !this.state.language.value) {
      errorValue = 'Kindly specify your Marital status';
    }
    this.setParticularField('language', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
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

  render() {
    const { permanent_address } = this.state;
    const { classes } = this.props;
    const {
      rightHalf,
      leftHalf,
      fullWidth,
      marital_status,
      marital_status_error,
      category_error,
      category,
      permanent_residency,
      permanent_residency_error,
      passport,
      passport_error,
      area_pincode,
      area_pincode_error,
      hometown,
      hometown_error,
      permanent_address_error,
      date_of_birth,
      date_of_birth_error,
      language,
      language_error,
    } = this.state;
    return (
      <div className={'basic-per-container'}>
        {/* <div className="save-emp-header">
          <div className="save-discard">
            <CustomTag
              text="Save"
              //onClick={this.createItem}
              className="save"
              onclick={this.props.onclick}
            />
            <CustomTag text="Cancel" className="cancel_btn" onclick={this.props.onclick} />
          </div>
          <div className="save-emp-details">
            <img src={dropdown} />
            <CustomTag text="Personal Details" className="mx-15" />
          </div>
        </div> */}
        <div className="box1 full-form-child">
          <FormControl
            className="form-child"
            style={{
              //width: '100%',
              marginTop: '10px',
              marginRight: '30px',
              marginBottom: '-20px',
            }}
          >
            <DateTimePicker
              label="Date of Birth"
              //date={this.state.dateOfBirth}
              onChangeDate={this.handleDateChange}
              //selected={this.state.dateOfBirth ? this.state.dateOfBirth : null}
            />
          </FormControl>
          {/* <Input
            className="form-child"
            style={{ marginTop: '10px' }}
            id="gen"
            placeholder="Gender"
            className="gen"
            // onChange={this.handleChange('name')}
            margin="normal"
            //width="100%"
            //style={{ marginTop: '30px' }}
          /> */}
          <LabelValueComponent label="Gender" value={'Female'} />
        </div>
        {/* <FormControl className="full-form-child">
          <Input
            placeholder="Permanent Address"
            // onClose={(name, data) => {
            //   if (data != null && data.value !== '') this.setParticularState(data);
            // }}
            //width={rightHalf}
            //apiUrl={JOB_ROLE}
            //filterKey={'value'}
            method="get"
            //selectedValues={[job_role]}
            name="permanent_address"
          />
          <FormHelperText >{job_role_error}</FormHelperText>
        </FormControl> */}
        <FormControl className={'full-form-child ' + classes.formControl}>
          <InputLabel
            classes={{ root: classes.helperText }}
            classes={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
            shrink={true}
            htmlFor="permanent_address"
          >
            Permanent Address
          </InputLabel>
          <Input
            name="permanent_address"
            type="text"
            value={permanent_address}
            onChange={this.handleInput}
            onBlur={() => this.validateFields('permanent_address')}
            onFocus={this.removeErrorFocus}
            autoComplete="off"
            error={permanent_address_error ? permanent_address_error : false}
          />
          {permanent_address_error ? (
            <FormHelperText error={permanent_address_error} id="firstName_error">
              <span className="field_error">{permanent_address_error}</span>
            </FormHelperText>
          ) : null}
        </FormControl>
        <div className="character-info-section">
          <CustomTag text="Minimum Character left : " className="character-left" />
          <CustomTag
            text={permanent_address === '' ? 100 : 100 - permanent_address.length}
            className="count"
          />
        </div>

        <div className="fourth full-form-child">
          <FormControl
            className={'form-child ' + classes.formControl}
            style={{ marginRight: '35px' }}
          >
            <InputLabel
              classes={{ root: classes.helperText }}
              classes={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
              }}
              shrink={true}
              htmlFor="area_pincode"
            >
              Area Pincode
            </InputLabel>
            <Input
              name="area_pincode"
              type="number"
              value={area_pincode}
              onChange={this.handleInput}
              onBlur={() => this.validateFields('area_pincode')}
              onFocus={this.removeErrorFocus}
              autoComplete="off"
              error={area_pincode_error ? area_pincode_error : false}
            />
            {area_pincode_error ? (
              <FormHelperText error={area_pincode_error} id="area_pincode">
                <span className="field_error">{area_pincode_error}</span>
              </FormHelperText>
            ) : null}
          </FormControl>

          <FormControl
            className={'form-child left-child-form ' + classes.formControl}
            // error={industry_error != ''}
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
              {'Hometown (City)'}
            </InputLabel>

            <CreatableRemoteDataSingleSelectDropdown
              isSearchable={true}
              //apiUrl={INDUSTRY}
              queryParams={{ search: '' }}
              getSelectedOption={option => this.setDropdownOption(option, 'hometown')}
              defaultValue={hometown ? { value: hometown.key, label: hometown.value } : {}}
              isClearable={true}
              error={hometown_error ? hometown_error : false}
            />
            {hometown_error ? (
              <FormHelperText error={hometown_error} id="firstName_error">
                <span className="field_error">{hometown_error}</span>
              </FormHelperText>
            ) : null}
          </FormControl>
        </div>
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
            {'permanent residency for'}
          </InputLabel>

          <CreatableRemoteDataSingleSelectDropdown
            isSearchable={true}
            //apiUrl={INDUSTRY}
            queryParams={{ search: '' }}
            getSelectedOption={option => this.setDropdownOption(option, 'permanent_residency')}
            defaultValue={
              hometown
                ? {
                    value: permanent_residency.key,
                    label: permanent_residency.value,
                  }
                : {}
            }
            isClearable={true}
            error={permanent_residency_error ? permanent_residency_error : false}
          />
          {permanent_residency_error ? (
            <FormHelperText error={permanent_residency_error} id="firstName_error">
              <span className="field_error">{permanent_residency_error}</span>
            </FormHelperText>
          ) : null}
        </FormControl>

        <FormControl className={'form-child ' + classes.formControl}>
          <InputLabel
            classes={{ root: classes.helperText }}
            classes={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
            shrink={true}
            htmlFor="passport"
          >
            Passport Number
          </InputLabel>
          <Input
            name="passport"
            type="number"
            value={passport}
            onChange={this.handleInput}
            onBlur={() => this.validateFields('passport')}
            onFocus={this.removeErrorFocus}
            autoComplete="off"
            error={passport_error ? passport_error : false}
          />
          {passport_error ? (
            <FormHelperText error={passport_error} id="firstName_error">
              <span className="field_error">{passport_error}</span>
            </FormHelperText>
          ) : null}
        </FormControl>

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
              {'Marital status'}
            </InputLabel>

            <CreatableRemoteDataSingleSelectDropdown
              isSearchable={true}
              //apiUrl={INDUSTRY}
              queryParams={{ search: '' }}
              getSelectedOption={option => this.setDropdownOption(option, 'desired_location')}
              defaultValue={
                marital_status
                  ? {
                      value: desired_location.key,
                      label: desired_location.value,
                    }
                  : {}
              }
              isClearable={true}
              error={marital_status_error ? marital_status_error : false}
            />
            {marital_status_error ? (
              <FormHelperText error={marital_status_error} id="firstName_error">
                <span className="field_error">{marital_status_error}</span>
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
              {'Category'}
            </InputLabel>
            <CreatableRemoteDataSingleSelectDropdown
              isSearchable={true}
              //  apiUrl={INDUSTRY}
              queryParams={{ search: '' }}
              getSelectedOption={option => this.setDropdownOption(option, 'desired_industry')}
              defaultValue={
                category
                  ? {
                      value: desired_industry.key,
                      label: desired_industry.value,
                    }
                  : {}
              }
              isClearable={true}
              error={category_error ? category_error : false}
            />
            {category_error ? (
              <FormHelperText error={category_error} id="firstName_error">
                <span className="field_error">{category_error}</span>
              </FormHelperText>
            ) : null}
          </FormControl>
        </div>
        <div className="fres-text">Differently Abled</div>
        <div className="box2" style={{ marginBottom: '-7px' }}>
          <div className="yes-no">
            <FormControl component="fieldset" className="radio-button-control">
              <RadioGroup
                aria-label="Gender"
                className="search-radio-buttons"
                //value={this.state.value}
                onChange={this.handleChange}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        {/* <div className="wrapper">
          <div className="fres-text" Language>
            <div className="shape mx-15">
              <div className="plus">+</div>
            </div>
          </div>
          <div className="fifth full-form-child">
            <FormControl className={'form-child left-child-form ' + classes.formControl}>
              <AutoCompleteNew label="English" method="get" />
            </FormControl>
          </div>
        </div> */}
        <div style={{ display: 'flex' }}>
          <div className="lang">
            <div className="fres-internship">
              Language
              <div className="shape mx-15">
                <div className="plus">+</div>
              </div>
            </div>
            <FormControl style={{ width: '195%' }}>
              <AutoCompleteNew
                label=""
                // onClose={(name, data) => {
                //   if (data != null && data.value !== '') this.setParticularState(data);
                // }}
                //width={rightHalf}
                //apiUrl={JOB_ROLE}
                //filterKey={'value'}
                method="get"
                //selectedValues={[job_role]}
              />
            </FormControl>
          </div>
          <div className="wrapper" style={{ width: 'auto' }}>
            <div className="fres-text">Proficiency</div>
            <div style={{ alignSelf: 'self-end' }} className="box1">
              <FormControl>
                <FormControlLabel
                  control={<Checkbox id="check_inter" name="check_intern" />}
                  label="Read"
                />
              </FormControl>
              <FormControl>
                <FormControlLabel
                  control={<Checkbox id="check_inter" name="check_intern" />}
                  label="Write"
                />
              </FormControl>
              <FormControl>
                <FormControlLabel
                  control={<Checkbox id="check_inter" name="check_intern" />}
                  label="Speak"
                />
              </FormControl>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default PersonalDetailsEdit;
