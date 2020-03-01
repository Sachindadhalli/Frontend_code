// import React, { Component } from 'react';
// import InputLabel from '@material-ui/core/InputLabel';
// import CustomTag from '../../../../../components/CustomTag';
// import CustomIcon from '../../../../../components/CustomIcon/CustomIcon';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import AutoCompleteNew from '../../../../../components/AutoCompleteNew';
// // import './style.scss';
// import Input from '@material-ui/core/Input';
// import { TextField, withStyles } from '@material-ui/core';
// import FormControl from '@material-ui/core/FormControl';
// import FormHelperText from '@material-ui/core/FormHelperText';
// // import UserBasicDetailsView from '../../../UserProfileFresherView/components/UserBasicDetailsView/UserBasicDetailsView';
// import { withRouter } from 'react-router-dom';
// import customisedMaterial from '../../../../../styles/customisedMaterial';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
// import dropdown from '../../../../../../assets/media/icons/dropdown.svg';
// import { CURRENCY } from '../../../../../../config/constants';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { apiCall, isObjectAlreadyExist, calculateTotalCount } from '../../../../../Utilities/';
// // import CollapsibleComponentUserProfile from '../CollapsibleComponentUserProfile/CollapsibleComponentUserProfile';
// import CreatableRemoteDataSingleSelectDropdown from '../../../../../components/SingleSelectDropdownWrapper/components/CreatableRemoteDataSingleSelectDropdown/CreatableRemoteDataSingleSelectDropdown';
// const styles = theme => ({
//     root: {
//         display: 'flex',
//         flexWrap: 'wrap',
//     },
//     margin: {
//         margin: theme.spacing.unit,
//     },
//     withoutLabel: {
//         marginTop: theme.spacing.unit * 3,
//     },
//     Input: {
//         flexBasis: 200,
//     },
//     button: {
//         margin: '11px',
//         borderRadius: '20px',
//     },
//     input: {
//         display: 'none',
//     },
//     formControl: {
//         marginBottom: '5px',
//     },
//     paper: {
//         padding: theme.spacing.unit * 2,
//         textAlign: 'center',
//         color: theme.palette.text.secondary,
//     },
//     ...customisedMaterial,
//     label: {
//         fontWeight: 'normal',
//         fontSize: '16px',
//         color: 'black',
//     },
// });

// const allDropDownWidth = {
//     //rightHalf: '100%',
//     //leftHalf: '47.5%',
//     fullWidth: '275px',
// };
// const experiences = [];
// for (let i = 1; i <= 30; i++) {
//     experiences.push(i.toString());
// }

// class ExperiencedBasicDetailsEdit extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             ...this.props.user_profile,

//             value: 'search',
//             currency_error: '',
//         };
//     }
//     componentWillMount() {
//         //debugger;
//         // this.setState({
//         //   value: this.props.history.location.pathname == 'user-profile' ? 'search' : 'advance',
//         // });
//     }
//     valdiateCurrency = () => {
//         const currency = this.state.currency.value;
//         let errorHere = '';
//         if (currency == '') {
//             errorHere = 'Kindly specify currency';
//         }
//         this.setParticularState('currency_error', errorHere);
//     };

//     validateFormData = name => {
//         switch (name) {
//             case 'currency':
//                 this.valdiateCurrency();
//                 break;
//         }
//     };

//     validateAllForm = () => {
//         const fields = ['currency', 'month', 'year'];
//         fields.map(value => {
//             this.validateFormData(value);
//         });
//     };

//     handleChange = event => {
//         //debugger;
//         this.setState({ value: event.target.value });
//         if (event.target.value == 'advance') {
//             this.props.history.push({ pathname: 'exp-profile' });
//         } else {
//             this.props.history.push({ pathname: 'user-profile' });
//         }
//     };
//     toggle = () => {
//         this.setState({ usersave: !this.state.usersave });
//     };
//     createItem = () => {
//         this.setState({ activeItem: item, usersave: !this.state.usersave });
//     };
//     onInputChange = e => {
//         const { name, value } = e.target;
//         this.setState({
//             [name]: value,
//         });
//     };

//     handleNavigationClick = () => {
//         //debugger;
//         this.props.history.push({ pathname: 'exp-profile' });
//     };

//     render() {
//         const { classes } = this.props;
//         const { currency, month, year } = this.state;
//         const { currency_error } = this.state;
//         const { fullWidth } = allDropDownWidth;
//         return (
//             <div className={'basic-user-container'}>
//                 {/* {this.props.type == 'fresher' ? <div>im fresher</div> : <div>Im experienced</div>} */}

//                 {/* <div className="save-emp-header">
//                         <div className="save-discard">
//                             <CustomTag
//                             text="Save"
//                             //onClick={this.createItem}
//                             className="save"
//                             onclick={this.props.onclick}
//                             />
//                             <CustomTag text="Cancel" className="cancel_btn" onclick={this.props.onclick} />
//                         </div>
//                         <div className="save-emp-details">
//                             <img src={dropdown} />
//                             <CustomTag text="Basic Details" className="mx-15" />
//                         </div>
//                         </div>
//                         <div className="hr-line" /> */}
//                 <div className="first">
//                     <div className="box-pro">
//                         <div className="fres-text">Experience</div>
//                         <div className="search-type-radio-buttons wrapper1">
//                             {/* <CustomTag text="Experience" className="exp" /> */}
//                             <div className="second">
//                                 <FormControl component="fieldset" className="radio-button-control">
//                                     <RadioGroup
//                                         aria-label="Gender"
//                                         name="gender1"
//                                         className="search-radio-buttons"
//                                         //value={this.state.value}
//                                         value={this.props.type == 'fresher' ? 'search' : 'advance'}
//                                         onChange={this.handleChange}
//                                     >
//                                         <FormControlLabel value="search" control={<Radio />} label="Fresher" />
//                                         <FormControlLabel value="advance" control={<Radio />} label="Experienced" />
//                                     </RadioGroup>
//                                 </FormControl>
//                             </div>
//                             {/* {this.props.type == 'experienced' ? ( */}

//                             <div
//                                 className="year-month form-child"
//                                 style={{ marginLeft: '105px', marginTop: '-17px' }}
//                             >
//                                 <div className="yr form-child">
//                                     <FormControl
//                                         className={'one-forth-form one-forth-form-left ' + classes.formControl}
//                                     >
//                                         <InputLabel>Years</InputLabel>
//                                         <Select
//                                             classes={{
//                                                 // underline: classes.cssUnderline,
//                                                 focused: classes.cssFocused,
//                                                 root: classes.selectText,
//                                             }}
//                                             value={year}
//                                             onChange={this.onInputChange}
//                                             name="year"
//                                             IconComponent={props => (
//                                                 <i {...props} className={`material-icons ${props.className}`}>
//                                                     <img src={dropdown} />
//                                                 </i>
//                                             )}
//                                         >
//                                             <MenuItem value={'0'}>{'0'}</MenuItem>
//                                             {experiences.map(value => {
//                                                 return (
//                                                     <MenuItem classes={{ root: classes.selectText }} value={value}>
//                                                         {value}
//                                                     </MenuItem>
//                                                 );
//                                             })}
//                                         </Select>
//                                     </FormControl>
//                                 </div>
//                                 <div className="mn form-child">
//                                     <FormControl
//                                         className={'one-forth-form one-forth-form-left ' + classes.formControl}
//                                     >
//                                         <InputLabel>Months</InputLabel>
//                                         <Select
//                                             classes={{
//                                                 // underline: classes.cssUnderline,
//                                                 focused: classes.cssFocused,
//                                                 root: classes.selectText,
//                                             }}
//                                             value={month}
//                                             onChange={this.onInputChange}
//                                             name="month"
//                                         // IconComponent={props => (
//                                         //     <i {...props} className={`material-icons ${props.className}`}>
//                                         //     <img src={dropdown} />
//                                         //     </i>
//                                         // )}
//                                         >
//                                             <MenuItem value={'0'}>{'0'}</MenuItem>
//                                             {experiences.map(value => {
//                                                 return (
//                                                     <MenuItem classes={{ root: classes.selectText }} value={value}>
//                                                         {value}
//                                                     </MenuItem>
//                                                 );
//                                             })}
//                                         </Select>
//                                     </FormControl>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="fourth full-form-child">
//                         {/* <FormControl
//                                 style={{ marginRight: '30px' }}
//                                 className={'form-child left-child-form ' + classes.formControl}
//                             >
//                                 <InputLabel
//                                 classes={{ root: classes.helperText }}
//                                 shrink
//                                 classes={{
//                                     root: classes.cssLabel,
//                                     focused: classes.cssFocused,
//                                 }}
//                                 >
//                                 Expected Salary
//                                 </InputLabel>
//                                 <Select
//                                 //value={job_type}
//                                 //onChange={this.onInputChange}
//                                 IconComponent={props => (
//                                     <i {...props} className={`material-icons ${props.className}`}>
//                                     <img src={dropdown} />
//                                     </i>
//                                 )}
//                                 //name="job_type"
//                                 classes={{
//                                     // underline: classes.cssUnderline,
//                                     focused: classes.cssFocused,
//                                     root: classes.selectText,
//                                 }}
//                                 />
//                             </FormControl> */}
//                         <FormControl
//                             className={'form-child left-child-form ' + classes.formControl}
//                             // error={industry_error != ''}
//                             style={{ marginTop: '13px', marginRight: '35px' }}
//                         >
//                             <InputLabel
//                                 style={{ marginTop: '-12px' }}
//                                 className="change-label-style"
//                                 shrink={true}
//                                 classes={{
//                                     root: classes.cssLabel,
//                                     focused: classes.cssFocused,
//                                     error: classes.cssError,
//                                 }}
//                             >
//                                 {'Expected Salary'}
//                             </InputLabel>

//                             <CreatableRemoteDataSingleSelectDropdown
//                                 isSearchable={true}
//                                 //apiUrl={INDUSTRY}
//                                 queryParams={{ search: '' }}
//                                 // defaultValue={
//                                 //   industry ? { value: industry.key, label: industry.value } : {}
//                                 // }
//                                 // getSelectedOption={option =>
//                                 //   this.setParticularState('industry', {
//                                 //     key: option.value,
//                                 //     value: option.label,
//                                 //   })
//                                 // }
//                                 isClearable={false}
//                             //error={industry_error}
//                             />
//                             {/* <FormHelperText>
//                                     <span className="field_error">{industry_error}</span>
//                                 </FormHelperText> */}
//                         </FormControl>

//                         <FormControl className={'form-child ' + classes.formControl}>
//                             <InputLabel
//                                 classes={{ root: classes.helperText }}
//                                 classes={{
//                                     root: classes.cssLabel,
//                                     focused: classes.cssFocused,
//                                 }}
//                             >
//                                 Salary
//                                 </InputLabel>
//                             <Input
//                                 //name="number_of_vacancy"
//                                 // className={classes.Input}
//                                 //value={number_of_vacancy}
//                                 classes={{
//                                     underline: classes.cssUnderline,
//                                     focused: classes.cssFocused,
//                                 }}
//                                 type="number"
//                                 margin="normal"
//                             // onChange={this.onInputChange}
//                             // onBlur={this.handleBlur}
//                             />
//                         </FormControl>
//                     </div>
//                     <div className="annual-salary">
//                         <div className="full-form-child annual-salary-fields">
//                             <div className="form-child" style={{ marginLeft: '-14px' }}>
//                                 <div className="save-details-header">
//                                     <div className="update">
//                                         <CustomTag text="Update" className="save" />
//                                     </div>
//                                     <Input
//                                         id="mobile"
//                                         placeholder="Mobile Number"
//                                         className="mobile"
//                                         // onChange={this.handleChange('name')}
//                                         margin="normal"
//                                     //style={{ marginTop: '30px' }}
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* <UserBasicDetailsSave   />  */}
//             </div>
//         );
//     }
// }

// export default withStyles(styles)(ExperiencedBasicDetailsEdit);

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
// import UserBasicDetailsView from '../../../UserProfileFresherView/components/UserBasicDetailsView/UserBasicDetailsView';
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
import CreatableRemoteDataSingleSelectDropdown from '../../../../../components/SingleSelectDropdownWrapper/components/CreatableRemoteDataSingleSelectDropdown/CreatableRemoteDataSingleSelectDropdown';
import NonCreatableSingleSelectDropdown from '../../../../../components/SingleSelectDropdownWrapper/components/NonCreatableSingleSelectDropdown/NonCreatableSingleSelectDropdown';

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
const experiences_year = [];
for (let i = 1; i <= 30; i++) {
  //experiences_year.push(i.toString());
  experiences_year.push({ key: i, value: i });
}
const experiences_month = [];
for (let i = 1; i <= 12; i++) {
  //experiences_month.push(i.toString());
  experiences_month.push({ key: i, value: i });
}

class ExperiencedBasicDetailsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expected_salary_error: '',
      expected_salary: '',
      salary_error: '',
      salary: '',
      mobile_number_error: '',
      mobile_number: '',
      month: '',
      month_error: '',
      year: '',
      year_error: '',
      ...this.props.user_profile,

      value: 'search',
      currency_error: '',
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
    if (typeof this.state.year === 'string' || this.state.year == '') {
      error = true;
      this.setState({
        year_error: 'Kindly specify your number of Years',
      });
    }
    if (typeof this.state.month === 'string' || this.state.month == '') {
      error = true;
      this.setState({
        month_error: 'Kindly specify your number of Months',
      });
    }
    if (typeof this.state.expected_salary === 'string' || this.state.expected_salary == '') {
      error = true;
      this.setState({
        expected_salary_error: 'Kindly specify your Expected Salary',
      });
    }
    if (typeof this.state.salary === 'string' || this.state.salary == '') {
      error = true;
      this.setState({
        salary_error: 'Kindly specify your Salary',
      });
    }
    if (typeof this.state.mobile_number === 'string' || this.state.mobile_number == '') {
      error = true;
      this.setState({
        mobile_number_error: 'Kindly specify your Mobile Number',
      });
    }
  }

  resetError = () => {
    this.setState({
      expected_salary_error: '',
      salary_error: '',
      mobile_number_error: '',
      month_error: '',
      year_error: '',
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
      case 'expected_salary':
        this.validateExpectedSalaryForm();
        break;
      case 'salary':
        this.validateSalaryForm();
        break;
      case 'mobile_number':
        this.validateMobileNumberForm();
        break;
      case 'month':
        this.validateMonthForm();
        break;
      case 'year':
        this.validateYearForm();
        break;
    }
  };
  //Remove Error on focus
  removeErrorFocus = e => {
    this.setParticularField(e.target.name, '');
  };
  validateMonthForm = async () => {
    let errorValue = '';
    if (!this.state.month) {
      errorValue = 'Kindly specify number of Months';
    }
    this.setParticularField('month', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateYearForm = async () => {
    let errorValue = '';
    if (!this.state.year) {
      errorValue = 'Kindly specify number of Years';
    }
    this.setParticularField('year', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateExpectedSalaryForm = async () => {
    let errorValue = '';
    if (!this.state.expected_salary || !this.state.expected_salary.value) {
      errorValue = 'Kindly specify your Expected Salary';
    }
    this.setParticularField('expected_salary', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateSalaryForm = async () => {
    let errorValue = '';
    if (!this.state.salary) {
      errorValue = 'Kindly specify your Salary';
    }
    this.setParticularField('salary', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateMobileNumberForm = async () => {
    let errorValue = '';
    if (!this.state.mobile_number) {
      errorValue = 'Kindly specify your Mobile Number';
    }
    this.setParticularField('mobile_number', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  componentWillMount() {
    //debugger;
    // this.setState({
    //   value: this.props.history.location.pathname == 'user-profile' ? 'search' : 'advance',
    // });
  }
  valdiateCurrency = () => {
    const currency = this.state.currency.value;
    let errorHere = '';
    if (currency == '') {
      errorHere = 'Kindly specify currency';
    }
    this.setParticularState('currency_error', errorHere);
  };

  validateFormData = name => {
    switch (name) {
      case 'currency':
        this.valdiateCurrency();
        break;
    }
  };

  validateAllForm = () => {
    const fields = ['currency', 'month', 'year'];
    fields.map(value => {
      this.validateFormData(value);
    });
  };

  handleChange = event => {
    //debugger;
    this.setState({ value: event.target.value });
    if (event.target.value == 'advance') {
      this.props.history.push({ pathname: 'exp-profile' });
    } else {
      this.props.history.push({ pathname: 'user-profile' });
    }
  };
  toggle = () => {
    this.setState({ usersave: !this.state.usersave });
  };
  createItem = () => {
    this.setState({ activeItem: item, usersave: !this.state.usersave });
  };
  onInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleNavigationClick = () => {
    //debugger;
    this.props.history.push({ pathname: 'exp-profile' });
  };

  setMonths = option => {
    const value = option.label;
    this.setState(
      {
        month: value,
      },
      () => this.validateFields('month'),
    );
  };
  setYears = option => {
    const value = option.label;
    this.setState(
      {
        year: value,
      },

      () => this.validateFields('year'),
    );
  };
  setParticularField = (name, value) => {
    const errorName = name + '_error';
    this.setState({
      [errorName]: value,
    });
  };
  render() {
    const { classes } = this.props;
    const { currency, month, year } = this.state;
    const { currency_error } = this.state;
    const { fullWidth } = allDropDownWidth;
    const {
      expected_salary_error,
      expected_salary,
      salary_error,
      salary,
      mobile_number_error,
      mobile_number,
      month_error,
      year_error,
    } = this.state;
    return (
      <div className={'basic-user-container'}>
        {/* {this.props.type == 'fresher' ? <div>im fresher</div> : <div>Im experienced</div>} */}

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
                            <CustomTag text="Basic Details" className="mx-15" />
                        </div>
                        </div>
                        <div className="hr-line" /> */}
        <div className="first">
          <div className="box-pro">
            <div className="fres-text">Experience</div>
            <div className="search-type-radio-buttons wrapper1">
              {/* <CustomTag text="Experience" className="exp" /> */}
              <div className="second">
                <FormControl component="fieldset" className="radio-button-control">
                  <RadioGroup
                    aria-label="Gender"
                    name="gender1"
                    className="search-radio-buttons"
                    //value={this.state.value}
                    value={this.props.type == 'fresher' ? 'search' : 'advance'}
                    onChange={this.handleChange}
                  >
                    <FormControlLabel value="search" control={<Radio />} label="Fresher" />
                    <FormControlLabel value="advance" control={<Radio />} label="Experienced" />
                  </RadioGroup>
                </FormControl>
              </div>
              {/* {this.props.type == 'experienced' ? ( */}

              <div
                className="year-month form-child"
                style={{ marginLeft: '180px', marginTop: '-17px' }}
              >
                <div className="yr form-child">
                  <FormControl
                    style={{ width: '100%' }}
                    className={'one-forth-form one-forth-form-left ' + classes.formControl}
                  >
                    <InputLabel
                      shrink={true}
                      style={{ marginTop: '-13px' }}
                      classes={{
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                      }}
                    >
                      Years
                    </InputLabel>
                    <NonCreatableSingleSelectDropdown
                      isSearchable={false}
                      getSelectedOption={option => this.setYears(option)}
                      defaultValue={year ? { key: year, label: year } : {}}
                      options={experiences_year}
                      isClearable={false}
                      error={year_error}
                    />
                    {year_error ? (
                      <FormHelperText error={year_error} id="firstName_error">
                        <span className="field_error">{year_error}</span>
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </div>
                <div className="mn form-child">
                  <FormControl
                    style={{ width: '100%' }}
                    className={'one-forth-form one-forth-form-left ' + classes.formControl}
                  >
                    <InputLabel
                      shrink={true}
                      style={{ marginTop: '-13px' }}
                      classes={{
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                      }}
                    >
                      Months
                    </InputLabel>
                    <NonCreatableSingleSelectDropdown
                      isSearchable={false}
                      getSelectedOption={option => this.setMonths(option)}
                      defaultValue={month ? { key: month, label: month } : {}}
                      options={experiences_month}
                      isClearable={false}
                      error={month_error}
                    />
                    {month_error ? (
                      <FormHelperText error={month_error} id="firstName_error">
                        <span className="field_error">{month_error}</span>
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </div>
              </div>
            </div>
          </div>
          <div className="fourth full-form-child">
            {/* <FormControl
                                style={{ marginRight: '30px' }}
                                className={'form-child left-child-form ' + classes.formControl}
                            >
                                <InputLabel
                                classes={{ root: classes.helperText }}
                                shrink
                                classes={{
                                    root: classes.cssLabel,
                                    focused: classes.cssFocused,
                                }}
                                >
                                Expected Salary
                                </InputLabel>
                                <Select
                                //value={job_type}
                                //onChange={this.onInputChange}
                                IconComponent={props => (
                                    <i {...props} className={`material-icons ${props.className}`}>
                                    <img src={dropdown} />
                                    </i>
                                )}
                                //name="job_type"
                                classes={{
                                    // underline: classes.cssUnderline,
                                    focused: classes.cssFocused,
                                    root: classes.selectText,
                                }}
                                />
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
                {'Expected Salary'}
              </InputLabel>

              <CreatableRemoteDataSingleSelectDropdown
                isSearchable={true}
                //apiUrl={INDUSTRY}
                queryParams={{ search: '' }}
                getSelectedOption={option => this.setDropdownOption(option, 'expected_salary')}
                defaultValue={
                  expected_salary.value
                    ? {
                        value: expected_salary.key,
                        label: expected_salary.value,
                      }
                    : {}
                }
                isClearable={true}
                error={expected_salary_error ? expected_salary_error : false}
              />
              {/* {console.log('hint', qualification_error)} */}

              {expected_salary_error ? (
                <FormHelperText error={expected_salary_error} id="firstName_error">
                  <span className="field_error">{expected_salary_error}</span>
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
                htmlFor="salary"
              >
                Salary
              </InputLabel>
              <Input
                name="salary"
                type="number"
                value={salary}
                onChange={this.handleInput}
                onBlur={() => this.validateFields('salary')}
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
                error={salary_error ? salary_error : false}
              />
              {/* <FormHelperText className="field_error">{marks_error}</FormHelperText> */}
              {salary_error ? (
                <FormHelperText error={salary_error} id="salary_error">
                  <span className="field_error">{salary_error}</span>
                </FormHelperText>
              ) : null}
            </FormControl>
          </div>
          <div className="annual-salary">
            <div className="full-form-child annual-salary-fields">
              <div className="form-child" style={{ marginLeft: '-14px' }}>
                <div className="save-details-header">
                  <div className="update">
                    <CustomTag text="Update" className="save" />
                  </div>
                  {/* <Input
                    id="mobile"
                    placeholder="Mobile Number"
                    className="mobile"
                    // onChange={this.handleChange('name')}
                    margin="normal"
                    //style={{ marginTop: '30px' }}
                  /> */}
                  <FormControl className={'form-child ' + classes.formControl}>
                    <InputLabel
                      classes={{ root: classes.helperText }}
                      classes={{
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                      }}
                      shrink={true}
                      htmlFor="mobile_number"
                    >
                      Mobile Number
                    </InputLabel>
                    <Input
                      name="mobile_number"
                      type="number"
                      value={mobile_number}
                      onChange={this.handleInput}
                      onBlur={() => this.validateFields('mobile_number')}
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
                      error={mobile_number_error ? mobile_number_error : false}
                    />
                    {/* <FormHelperText className="field_error">{marks_error}</FormHelperText> */}
                    {mobile_number_error ? (
                      <FormHelperText error={mobile_number_error} id="mobile_number_error">
                        <span className="field_error">{mobile_number_error}</span>
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <UserBasicDetailsSave   />  */}
      </div>
    );
  }
}

export default withStyles(styles)(ExperiencedBasicDetailsEdit);
