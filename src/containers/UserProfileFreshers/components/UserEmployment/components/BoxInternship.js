import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
// import PropTypes from 'prop-types';
// import DateFnsUtils from '@date-io/date-fns';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
// import CustomTag from '../../../../../components/CustomTag';
// import CustomIcon from '../../../../../components/CustomIcon/CustomIcon';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import AutoCompleteNew from '../../../../../components/AutoCompleteNew';
//import './style.scss';
// import Input from '@material-ui/core/Input';
// import calendar from '../../../../../../assets/media/icons/calendar.svg';
// import { TextField, withStyles } from '@material-ui/core';
// import { Checkbox } from '@material-ui/core';
// import untick from '../../../../../../assets/media/icons/untick.svg';
import FormControl from '@material-ui/core/FormControl';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import Grid from '@material-ui/core/Grid';
// import UserBasicDetailsView from '../../../UserProfileFresherView/components/UserBasicDetailsView/UserBasicDetailsView';
import customisedMaterial from '../../../../../styles/customisedMaterial';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
// import dropdown from '../../../../../../assets/media/icons/dropdown.svg';
// import DateTimePicker from '../../../../../components/DateTimePicker';
// import MultiSelect from '../../../../../components/MultiSelectDropDown/MultiSelect';
import { JOB_ROLE } from '../../../../../../config/constants';
import { apiCall, isObjectAlreadyExist, calculateTotalCount } from '../../../../../Utilities/';
import FormHelperText from '@material-ui/core/FormHelperText';
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
  rightHalf: '100%',
  leftHalf: '47.5%',
  fullWidth: '100%',
};
const experiences_year = [];
for (let i = 1; i <= 30; i++) {
  //experiences_year.push(i.toString());
  experiences_year.push({ key: i, value: i });
}
const experiences_month = [];
for (let i = 1; i <= 12; i++) {
  // experiences_month.push(i.toString());
  experiences_month.push({ key: i, value: i });
}
// class Box extends Component {
//   constructor(props) {
//     super(props);
//     this.resetErrors();
//     this.state = {
//       count: 0,
//       job_role: '',
//       company_name: '',
//       month: '',
//       year: '',
//       job_role_error: '',
//       company_name_error: '',
//       month_error: '',
//       year_error: '',
//     };
//     this.checkForErrors = this.checkForErrors.bind(this);
//   }
//   componentDidMount() {
//     if (this.props.checkForErrors == true) {
//       this.checkForErrors();
//     }
//     this.props.onRef(this);
//   }
//   componentWillUnmount() {
//     this.props.onRef(null);
//   }
//   checkForErrors() {
//     let error = false;
//     if (typeof this.state.job_role === 'string' || this.state.job_role == '') {
//       error = true;
//       this.setState({
//         job_role_error: 'Kindly specify your Job Role',
//       });
//     }
//     if (typeof this.state.company_name === 'string' || this.state.company_name == '') {
//       error = true;
//       this.setState({
//         company_name_error: 'Kindly specify your Company Name',
//       });
//     }
//     if (typeof this.state.year === 'string' || this.state.year == '') {
//       error = true;
//       this.setState({
//         year_error: 'Kindly specify your Job Years',
//       });
//     }
//     if (typeof this.state.month === 'string' || this.state.month == '') {
//       error = true;
//       this.setState({
//         month_error: 'Kindly specify your Job Months',
//       });
//     }
//   }
//   resetErrors = () => {
//     this.setState({
//       job_role_error: '',
//       company_name_error: '',
//       month_error: '',
//       year_error: '',
//     });
//   };
//   setDropdownOption = (option, name, validatorAfterSave = null) => {
//     const opt = option ? { key: option.value, value: option.label } : '';
//     this.setState(
//       {
//         [name]: opt,
//         [`${name}_error`]: '',
//       },
//       () => {
//         this.validateFields(name);
//       },
//     );
//   };

//   validateFields = fieldName => {
//     switch (fieldName) {
//       case 'job_role':
//         this.validateJobRoleForm();
//         break;
//       case 'company_name':
//         this.validateCompanyNameForm();
//         break;
//       case 'month':
//         this.validateMonthForm();
//         break;
//       case 'year':
//         this.validateYearForm();
//         break;
//     }
//   };
//   //Remove Error on focus
//   removeErrorFocus = e => {
//     this.setParticularField(e.target.name, '');
//   };
//   validateJobRoleForm = async () => {
//     let errorValue = '';
//     if (!this.state.job_role || !this.state.job_role.value) {
//       errorValue = 'Kindly specify your Job Role';
//     }
//     this.setParticularField('job_role', errorValue);
//     //debugger;
//     // console.log("im in current designation",this.state.current_designation);
//     return errorValue ? true : false;
//   };
//   validateCompanyNameForm = async () => {
//     let errorValue = '';
//     if (!this.state.company_name || !this.state.company_name.value) {
//       errorValue = 'Kindly specify your Company Name';
//     }
//     this.setParticularField('company_name', errorValue);
//     //debugger;
//     // console.log("im in current designation",this.state.current_designation);
//     return errorValue ? true : false;
//   };
//   validateMonthForm = async () => {
//     let errorValue = '';
//     if (!this.state.month) {
//       errorValue = 'Kindly specify number of Months';
//     }
//     this.setParticularField('month', errorValue);
//     //debugger;
//     // console.log("im in current designation",this.state.current_designation);
//     return errorValue ? true : false;
//   };
//   validateYearForm = async () => {
//     let errorValue = '';
//     if (!this.state.year) {
//       errorValue = 'Kindly specify number of Years';
//     }
//     this.setParticularField('year', errorValue);
//     //debugger;
//     // console.log("im in current designation",this.state.current_designation);
//     return errorValue ? true : false;
//   };
//   setMonths = option => {
//     const value = option.label;
//     this.setState(
//       {
//         month: value,
//       },
//       () => this.validateFields('month'),
//     );
//   };
//   setYears = option => {
//     const value = option.label;
//     this.setState(
//       {
//         year: value,
//       },

//       () => this.validateFields('year'),
//     );
//   };
//   //assign error value
//   setParticularField = (name, value) => {
//     const errorName = name + '_error';
//     this.setState({
//       [errorName]: value,
//     });
//   };
//   render() {
//     const {
//       rightHalf,
//       // year,
//       // month,
//       dropdown,
//       leftHalf,
//       fullWidth,
//       allDropDownWidth,
//     } = this.props;
//     const {
//       year,
//       month,
//       job_role,
//       company_name,
//       job_role_error,
//       company_name_error,
//       month_error,
//       year_error,
//     } = this.state;
//     const { classes } = this.props;
//     return (
//       // <div className="internship">
//       //   <p>Internship Details</p>
//       //   <button onClick={this.props.onDelete}>Delete</button>
//       // </div>
//       <div className="internship-box">
//         <FormControl
//           className="full-form-child"
//           //error={job_role_error != ''}
//           style={{ marginTop: '13px' }}
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
//             {'Job Role'}
//           </InputLabel>
//           <CreatableRemoteDataSingleSelectDropdown
//             isSearchable={true}
//             apiUrl={JOB_ROLE}
//             queryParams={{ search: '' }}
//             getSelectedOption={option => this.setDropdownOption(option, 'job_role')}
//             defaultValue={job_role.value ? { value: job_role.key, label: job_role.value } : {}}
//             isClearable={true}
//             error={job_role_error ? job_role_error : false}
//           />
//           {/* {console.log('hint', qualification_error)} */}

//           {job_role_error ? (
//             <FormHelperText error={job_role_error} id="firstName_error">
//               <span className="field_error">{job_role_error}</span>
//             </FormHelperText>
//           ) : null}
//         </FormControl>

//         <FormControl
//           className="full-form-child"
//           //error={job_role_error != ''}
//           style={{ marginTop: '13px' }}
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
//             {'Company Name'}
//           </InputLabel>
//           <CreatableRemoteDataSingleSelectDropdown
//             isSearchable={true}
//             //apiUrl={JOB_ROLE}
//             queryParams={{ search: '' }}
//             getSelectedOption={option => this.setDropdownOption(option, 'company_name')}
//             defaultValue={
//               company_name.value ? { value: company_name.key, label: company_name.value } : {}
//             }
//             isClearable={true}
//             error={company_name_error ? company_name_error : false}
//           />

//           {company_name_error ? (
//             <FormHelperText error={company_name_error} id="firstName_error">
//               <span className="field_error">{company_name_error}</span>
//             </FormHelperText>
//           ) : null}
//         </FormControl>

//         <div className="fres-text">Internship Tenure</div>
//         <div className="year-month" style={{ marginTop: '30px' }}>
//           <div className="yr form-child">
//             <FormControl
//               style={{ width: '100%' }}
//               className={'one-forth-form one-forth-form-left ' + classes.formControl}
//             >
//               <InputLabel
//                 shrink={true}
//                 style={{ marginTop: '-13px' }}
//                 classes={{
//                   root: classes.cssLabel,
//                   focused: classes.cssFocused,
//                 }}
//               >
//                 Years
//               </InputLabel>

//               <NonCreatableSingleSelectDropdown
//                 isSearchable={false}
//                 getSelectedOption={option => this.setYears(option)}
//                 defaultValue={year ? { key: year, label: year } : {}}
//                 options={experiences_year}
//                 isClearable={false}
//                 error={year_error}
//               />
//               {year_error ? (
//                 <FormHelperText error={year_error} id="firstName_error">
//                   <span className="field_error">{year_error}</span>
//                 </FormHelperText>
//               ) : null}
//               {/* <InputLabel>Years</InputLabel>
//                 <Select
//                   classes={{
//                     // underline: classes.cssUnderline,
//                     focused: classes.cssFocused,
//                     root: classes.selectText,
//                   }}
//                   value={year1}
//                   onChange={this.onInputChange}
//                   name="year1"
//                   IconComponent={props => (
//                     <i {...props} className={`material-icons ${props.className}`}>
//                       <img src={dropdown} />
//                     </i>
//                   )}
//                 >
//                   <MenuItem value={'0'}>{'0'}</MenuItem>
//                   {experiences_year.map(value => {
//                     return (
//                       <MenuItem classes={{ root: classes.selectText }} value={value}>
//                         {value}
//                       </MenuItem>
//                     );
//                   })}
//                 </Select> */}
//             </FormControl>
//           </div>
//           <div className="mn form-child">
//             <FormControl
//               style={{ width: '100%' }}
//               className={'one-forth-form one-forth-form-left ' + classes.formControl}
//             >
//               <InputLabel
//                 shrink={true}
//                 style={{ marginTop: '-13px' }}
//                 classes={{
//                   root: classes.cssLabel,
//                   focused: classes.cssFocused,
//                 }}
//               >
//                 Months
//               </InputLabel>

//               <NonCreatableSingleSelectDropdown
//                 isSearchable={false}
//                 getSelectedOption={option => this.setMonths(option)}
//                 defaultValue={month ? { key: month, label: month } : {}}
//                 options={experiences_month}
//                 isClearable={false}
//                 error={month_error}
//               />
//               {month_error ? (
//                 <FormHelperText error={month_error} id="firstName_error">
//                   <span className="field_error">{month_error}</span>
//                 </FormHelperText>
//               ) : null}
//               {/* <InputLabel>Months</InputLabel>
//                 <Select
//                   classes={{
//                     // underline: classes.cssUnderline,
//                     focused: classes.cssFocused,
//                     root: classes.selectText,
//                   }}
//                   value={month1}
//                   onChange={this.onInputChange}
//                   name="month1"
//                   // IconComponent={props => (
//                   //     <i {...props} className={`material-icons ${props.className}`}>
//                   //     <img src={dropdown} />
//                   //     </i>
//                   // )}
//                 >
//                   <MenuItem value={'0'}>{'0'}</MenuItem>
//                   {experiences_month.map(value => {
//                     return (
//                       <MenuItem classes={{ root: classes.selectText }} value={value}>
//                         {value}
//                       </MenuItem>
//                     );
//                   })}
//                 </Select> */}
//             </FormControl>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
class BoxInternship extends Component {
  constructor(props) {
    super(props);
    this.resetErrors();
    this.state = {
      count: 0,
      job_role: '',
      company_name: '',
      month: '',
      year: '',
      job_role_error: '',
      company_name_error: '',
      month_error: '',
      year_error: '',
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
    if (typeof this.state.job_role === 'string' || this.state.job_role == '') {
      error = true;
      this.setState({
        job_role_error: 'Kindly specify your Job Role',
      });
    }
    if (typeof this.state.company_name === 'string' || this.state.company_name == '') {
      error = true;
      this.setState({
        company_name_error: 'Kindly specify your Company Name',
      });
    }
    if (typeof this.state.year === 'string' || this.state.year == '') {
      error = true;
      this.setState({
        year_error: 'Kindly specify your Job Years',
      });
    }
    if (typeof this.state.month === 'string' || this.state.month == '') {
      error = true;
      this.setState({
        month_error: 'Kindly specify your Job Months',
      });
    }
  }
  resetErrors = () => {
    this.setState({
      job_role_error: '',
      company_name_error: '',
      month_error: '',
      year_error: '',
    });
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

  validateFields = fieldName => {
    switch (fieldName) {
      case 'job_role':
        this.validateJobRoleForm();
        break;
      case 'company_name':
        this.validateCompanyNameForm();
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
  validateJobRoleForm = async () => {
    let errorValue = '';
    if (!this.state.job_role || !this.state.job_role.value) {
      errorValue = 'Kindly specify your Job Role';
    }
    this.setParticularField('job_role', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
  };
  validateCompanyNameForm = async () => {
    let errorValue = '';
    if (!this.state.company_name || !this.state.company_name.value) {
      errorValue = 'Kindly specify your Company Name';
    }
    this.setParticularField('company_name', errorValue);
    //debugger;
    // console.log("im in current designation",this.state.current_designation);
    return errorValue ? true : false;
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
  //assign error value
  setParticularField = (name, value) => {
    const errorName = name + '_error';
    this.setState({
      [errorName]: value,
    });
  };
  onInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  render() {
    const {
      rightHalf,
      classes,
      // year,
      // month,
      dropdown,
      leftHalf,
      fullWidth,
      allDropDownWidth,
    } = this.props;
    const {
      year,
      month,
      job_role,
      company_name,
      job_role_error,
      company_name_error,
      month_error,
      year_error,
    } = this.state;
    return (
      <div>
        <div className="fres-internship">
          Internship
          <div
            className="shape mx-15"
            onClick={e => {
              this.setState({ count: this.state.count + 1 });
            }}
          >
            <div className="plus">+</div>
          </div>
          {(() => {
            let a = [];
            for (let i = 0; i < this.state.count; i++)
              a.push(
                <Box
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
                  key={i}
                  onDelete={() => {
                    this.setState({ count: this.state.count - 1 });
                  }}
                />,
              );
            return a;
          })()}
        </div>

        <div className="fres-text">Freshers can enter their internship details here</div>
        {/* <Box
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
        /> */}

        <div className="internship-box">
          <FormControl
            className="full-form-child"
            //error={job_role_error != ''}
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
              {'Job Role'}
            </InputLabel>
            <CreatableRemoteDataSingleSelectDropdown
              isSearchable={true}
              apiUrl={JOB_ROLE}
              queryParams={{ search: '' }}
              getSelectedOption={option => this.setDropdownOption(option, 'job_role')}
              defaultValue={job_role.value ? { value: job_role.key, label: job_role.value } : {}}
              isClearable={true}
              error={job_role_error ? job_role_error : false}
            />

            {job_role_error ? (
              <FormHelperText error={job_role_error} id="firstName_error">
                <span className="field_error">{job_role_error}</span>
              </FormHelperText>
            ) : null}
          </FormControl>

          <FormControl
            className="full-form-child"
            //error={job_role_error != ''}
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
              {'Company Name'}
            </InputLabel>
            <CreatableRemoteDataSingleSelectDropdown
              isSearchable={true}
              //apiUrl={JOB_ROLE}
              queryParams={{ search: '' }}
              getSelectedOption={option => this.setDropdownOption(option, 'company_name')}
              defaultValue={
                company_name.value ? { value: company_name.key, label: company_name.value } : {}
              }
              isClearable={true}
              error={company_name_error ? company_name_error : false}
            />

            {company_name_error ? (
              <FormHelperText error={company_name_error} id="firstName_error">
                <span className="field_error">{company_name_error}</span>
              </FormHelperText>
            ) : null}
          </FormControl>

          <div className="fres-text">Internship Tenure</div>
          <div className="year-month" style={{ marginTop: '30px' }}>
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
    );
  }
}
export default BoxInternship;
