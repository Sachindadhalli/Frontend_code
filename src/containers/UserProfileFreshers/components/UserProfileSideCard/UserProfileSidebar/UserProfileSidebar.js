import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import InputAdornment from '@material-ui/core/InputAdornment';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import CustomTag from '../../../../../components/CustomTag';
import CustomIcon from '../../../../../components/CustomIcon/CustomIcon';
import CreatableRemoteDataSingleSelectDropdown from '../../../../../components/SingleSelectDropdownWrapper/components/CreatableRemoteDataSingleSelectDropdown/CreatableRemoteDataSingleSelectDropdown';
// import AutoCompleteNew from '../../../../../components/AutoCompleteNew/AutoCompleteNew';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AutoCompleteNew from '../../../../../components/AutoCompleteNew';
// import InputLabel from '@material-ui/core/InputLabel';
import './style.scss';
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
import display_picture from '../../../../../../assets/media/icons/displayPicture.svg';
import close_icon from '../../../../../../assets/media/icons/close.svg';
import edit_icon from '../../../../../../assets/media/icons/editIcon.svg';
import { apiCall, handleLocalStorage, fileValidation } from '../../../../../Utilities';
import {
  SERVER_API_URL,
  SERVER_API_PATH,
  COUNTRY,
  STATE,
  CITY,
} from '../../../../../../config/constants';
import LabelValueComponent from '../../../../../components/ReusableComponents/LabelValueComponent/LabelValueComponent';
import { toast } from 'react-toastify';
toast.configure({
  position: 'top-center',
  toastClassName: 'toast-inner-container',
  bodyClassName: 'toast-body-name',
  closeButton: false,
  progressClassName: 'toast-progress-bar',
});
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
class UserProfileSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'search',
      first_name: '',
      last_name: '',
      middle_name: '',
      country: '',
      state1: '',
      city: '',
      first_name_error: '',
      last_name_error: '',
      middle_name_error: '',
      country_error: '',
      state_error: '',
      city_error: '',
    };
  }
  handleChange = event => {
    this.setState({ value: event.target.value });
  };
  removeImage = async () => {
    this.setState({
      image_name: null,
      selected_image: null,
      profile_pic: null,
      previewSrc: null,
    });
  };
  //after selecting file
  fileSelectedHandler = async e => {
    const selectedFile = e.target.files[0];
    const previewSrc = URL.createObjectURL(event.target.files[0]);
    if (!fileValidation(event.target.files[0], 2, ['jpg', 'gif', 'png'])) {
      return toast('Uploaded image cannot be more than 2 MB', {});
    }

    this.setState({
      selected_image: selectedFile,
      image_name: selectedFile.name,
      previewSrc,
    });
  };
  resetErrors = () => {
    this.setState({
      first_name_error: '',
      last_name_error: '',
      middle_name_error: '',
      country_error: '',
      state_error: '',
      city_error: '',
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
      case 'first_name':
        this.validateFirstNameForm();
        break;
      case 'middle_name':
        this.validateMiddleNameForm();
        break;
      case 'last_name':
        this.validateLastNameForm();
        break;
      case 'country':
        this.validateCountryForm();
        break;
      case 'city':
        this.validateCityForm();
        break;
      case 'state1':
        this.validateStateForm();
        break;
    }
  };
  removeErrorFocus = e => {
    this.setParticularField(e.target.name, '');
  };
  validateFirstNameForm = async () => {
    let errorValue = '';
    if (!this.state.first_name) {
      errorValue = 'Kindly specify your First Name';
    }
    this.setParticularField('first_name', errorValue);
    return errorValue ? true : false;
  };
  validateMiddleNameForm = async () => {
    let errorValue = '';
    if (!this.state.middle_name) {
      errorValue = 'Kindly specify your Middle Name';
    }
    this.setParticularField('middle_name', errorValue);
    return errorValue ? true : false;
  };
  validateLastNameForm = async () => {
    let errorValue = '';
    if (!this.state.last_name) {
      errorValue = 'Kindly specify your Last Name';
    }
    this.setParticularField('last_name', errorValue);
    return errorValue ? true : false;
  };
  validateCountryForm = async () => {
    let errorValue = '';
    if (!this.state.country || !this.state.country.value) {
      errorValue = 'Kindly specify your Country';
    }
    this.setParticularField('country', errorValue);
    return errorValue ? true : false;
  };
  validateCityForm = async () => {
    let errorValue = '';
    if (!this.state.city || !this.state.city.value) {
      errorValue = 'Kindly specify your City';
    }
    this.setParticularField('city', errorValue);
    return errorValue ? true : false;
  };
  validateStateForm = async () => {
    let errorValue = '';
    if (!this.state.state1 || !this.state.state1.value) {
      errorValue = 'Kindly specify your State';
    }
    this.setParticularField('state1', errorValue);
    return errorValue ? true : false;
  };
  setParticularField = (name, value) => {
    const errorName = name + '_error';
    this.setState({
      [errorName]: value,
    });
  };
  render() {
    const { previewSrc, profile_pic } = this.state;
    const {
      first_name,
      last_name,
      middle_name,
      country,
      state1,
      city,
      first_name_error,
      last_name_error,
      middle_name_error,
      country_error,
      state_error,
      city_error,
    } = this.state;
    const { classes, toast } = this.props;
    return (
      <div
        style={{ paddingTop: '30px', paddingBottom: '30px', paddingRight: '20px' }}
        className="user-details-card"
      >
        {/* <div className='custom-section'> */}
        {/* <div className='profile-sidebar'> */}
        {/* <div class="profile-copy">
          {' '}
          <img src="./img/profile-copy.png" />
        </div> */}
        {/* <div className='text'> */}
        <div className="profile-picture-container">
          <div className="profile-rectangle">
            <div class="remove-profile-icon ">
              <img src={close_icon} onClick={this.removeImage} height={27} width={27} />
            </div>
            <CustomIcon
              icon={
                previewSrc
                  ? previewSrc
                  : profile_pic
                  ? SERVER_API_URL + profile_pic
                  : display_picture
              }
              iconStyle="profile-img"
            />
          </div>
          <input
            name="selected_image"
            type="file"
            accept="image/*"
            onChange={this.fileSelectedHandler}
            style={{ display: 'none' }}
            ref={fileInput => (this.fileInput = fileInput)}
          />

          <div className="profile-oval" onClick={() => this.fileInput.click()}>
            <CustomIcon icon={edit_icon} iconStyle="" />
          </div>
        </div>
        <div style={{ marginTop: '65px' }} className="user-details-name-and-info">
          <FormControl className={'full-form-child ' + classes.formControl}>
            <InputLabel
              classes={{ root: classes.helperText }}
              classes={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
              }}
              shrink={true}
              htmlFor="first_name"
            >
              First Name
            </InputLabel>
            <Input
              name="first_name"
              type="text"
              value={first_name}
              onChange={this.handleInput}
              onBlur={() => this.validateFields('first_name')}
              onFocus={this.removeErrorFocus}
              autoComplete="off"
              error={first_name_error ? first_name_error : false}
            />
            {first_name_error ? (
              <FormHelperText error={first_name_error} id="firstName_error">
                <span className="field_error">{first_name_error}</span>
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl className={'full-form-child ' + classes.formControl}>
            <InputLabel
              classes={{ root: classes.helperText }}
              classes={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
              }}
              shrink={true}
              htmlFor="middle_name"
            >
              Middle Name
            </InputLabel>
            <Input
              name="middle_name"
              type="text"
              value={middle_name}
              onChange={this.handleInput}
              onBlur={() => this.validateFields('salary')}
              onFocus={this.removeErrorFocus}
              autoComplete="off"
              error={middle_name_error ? middle_name_error : false}
            />
            {middle_name_error ? (
              <FormHelperText error={middle_name_error} id="firstName_error">
                <span className="field_error">{middle_name_error}</span>
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl className={'full-form-child ' + classes.formControl}>
            <InputLabel
              classes={{ root: classes.helperText }}
              classes={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
              }}
              shrink={true}
              htmlFor="last_name"
            >
              Last Name
            </InputLabel>
            <Input
              name="last_name"
              type="text"
              value={last_name}
              onChange={this.handleInput}
              onBlur={() => this.validateFields('salary')}
              onFocus={this.removeErrorFocus}
              autoComplete="off"
              error={last_name_error ? last_name_error : false}
            />
            {last_name_error ? (
              <FormHelperText error={last_name_error} id="firstName_error">
                <span className="field_error">{last_name_error}</span>
              </FormHelperText>
            ) : null}
          </FormControl>
          <LabelValueComponent label="Email" value={'abcd.xyz@pqr.com'} />

          <FormControl
            className="full-form-child"
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
              {'Country'}
            </InputLabel>
            <CreatableRemoteDataSingleSelectDropdown
              isSearchable={true}
              apiUrl={COUNTRY}
              queryParams={{ search: '' }}
              getSelectedOption={option => this.setDropdownOption(option, 'country')}
              defaultValue={country ? { value: country.key, label: country.value } : {}}
              isClearable={true}
              error={country_error ? country_error : false}
            />
            {country_error ? (
              <FormHelperText error={country_error} id="firstName_error">
                <span className="field_error">{country_error}</span>
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl
            className="full-form-child"
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
              {'State'}
            </InputLabel>
            <CreatableRemoteDataSingleSelectDropdown
              isSearchable={true}
              apiUrl={STATE}
              queryParams={{ search: '' }}
              getSelectedOption={option => this.setDropdownOption(option, 'state1')}
              defaultValue={state1 ? { value: state1.key, label: state1.value } : {}}
              isClearable={true}
              error={state_error ? state_error : false}
            />
            {state_error ? (
              <FormHelperText error={state_error} id="firstName_error">
                <span className="field_error">{state1_error}</span>
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl
            className="full-form-child"
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
              {'City'}
            </InputLabel>
            <CreatableRemoteDataSingleSelectDropdown
              isSearchable={true}
              apiUrl={CITY}
              queryParams={{ search: '', state: '', country: this.state.country.value }}
              getSelectedOption={option => this.setDropdownOption(option, 'city')}
              defaultValue={city ? { value: city.key, label: city.value } : {}}
              isClearable={true}
              error={city_error ? city_error : false}
            />
            {city_error ? (
              <FormHelperText error={city_error} id="firstName_error">
                <span className="field_error">{city_error}</span>
              </FormHelperText>
            ) : null}
          </FormControl>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(UserProfileSidebar);
