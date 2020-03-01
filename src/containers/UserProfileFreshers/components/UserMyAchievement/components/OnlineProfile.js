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
import deleteIcon from '../../../../../../assets/media/icons/deleteIcon.svg';
// import './style.scss';
import Input from '@material-ui/core/Input';
import calendar from '../../../../../../assets/media/icons/calendar.svg';
import { TextField, withStyles } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import untick from '../../../../../../assets/media/icons/untick.svg';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import UserBasicDetailsView from '../../../../UserProfileFresherView/components/UserBasicDetailsView/UserBasicDetailsView';
import customisedMaterial from '../../../../../styles/customisedMaterial';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import dropdown from '../../../../../../assets/media/icons/dropdown.svg';
import DateTimePicker from '../../../../../components/DateTimePicker';
import MultiSelect from '../../../../../components/MultiSelectDropDown/MultiSelect';
import BoxInternship from '../../UserEmployment/components/BoxInternship';
import BoxTraining from '../../UserEmployment/components/BoxTraining';

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

class OnlineProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course_name: '',
      role_dsc: '',
      social_profile: '',
      url: '',
      role_description: '',
      course_name_error: '',
      role_dsc_error: '',
      social_profile_error: '',
      url_error: '',
      role_description_error: '',
    };
    // this.checkForErrors = this.checkForErrors.bind(this);
  }

  resetErrors = () => {
    this.setState({
      course_name_error: '',
      role_dsc_error: '',
      social_profile_error: '',
      url_error: '',
      role_description_error: '',
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
      case 'social_profile':
        this.validateSocialProfileForm();
        break;
      case 'url':
        this.validateUrlForm();
        break;
      case 'role_description':
        this.validateRoleDescriptionForm();
        break;
    }
  };
  //Remove Error on focus
  removeErrorFocus = e => {
    this.setParticularField(e.target.name, '');
  };
  validateSocialProfileForm = async () => {
    let errorValue = '';
    if (!this.state.social_profile) {
      errorValue = 'Kindly specify your Social Profile';
    }
    this.setParticularField('social_profile', errorValue);
    return errorValue ? true : false;
  };
  validateUrlForm = async () => {
    let errorValue = '';
    if (!this.state.url) {
      errorValue = 'Kindly specify your URL';
    }
    this.setParticularField('url', errorValue);
    return errorValue ? true : false;
  };
  validateRoleDescriptionForm = async () => {
    let errorValue = '';
    if (!this.state.role_description) {
      errorValue = 'Kindly specify your Role Description';
    }
    this.setParticularField('role_description', errorValue);
    return errorValue ? true : false;
  };
  setParticularField = (name, value) => {
    const errorName = name + '_error';
    this.setState({
      [errorName]: value,
    });
  };
  // removeOnlineProfile = e => {
  //   debugger;
  // };
  render() {
    const { classes, index } = this.props;
    const {
      role_dsc,
      social_profile,
      url,
      role_description,
      social_profile_error,
      url_error,
      role_description_error,
    } = this.state;
    const { rightHalf, leftHalf, fullWidth } = allDropDownWidth;
    console.log('render', this.props.index);
    return (
      <div className="training-box" key={index}>
        {/* <div style={{ textAlign: 'right' }}>
          <CustomIcon
            icon={deleteIcon}
            className="delete-icon"
            onClick={this.props.removeOnlineProfile}
          />
        </div> */}

        {/* <Input
          id="loc"
          placeholder="Social Profile"
          //className="loc"
          // onChange={this.handleChange('name')}
          margin="normal"
          width="100%"
          //style={{ marginTop: '30px' }}
        /> */}
        <FormControl className={'full-form-child ' + classes.formControl}>
          <InputLabel
            classes={{ root: classes.helperText }}
            classes={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
            shrink={true}
            htmlFor="social_profile"
          >
            Social Profile
          </InputLabel>
          <Input
            name="social_profile"
            type="text"
            value={this.state.social_profile}
            onChange={this.handleInput}
            onBlur={() => this.validateFields('social_profile')}
            onFocus={this.removeErrorFocus}
            autoComplete="off"
            error={social_profile_error ? social_profile_error : false}
          />
          {social_profile_error ? (
            <FormHelperText error={social_profile_error} id="firstName_error">
              <span className="field_error">{social_profile_error}</span>
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
            htmlFor="url"
          >
            URL
          </InputLabel>
          <Input
            name="url"
            type="text"
            value={this.state.url}
            onChange={this.handleInput}
            onBlur={() => this.validateFields('social_profile')}
            onFocus={this.removeErrorFocus}
            autoComplete="off"
            error={url_error ? url_error : false}
          />
          {url_error ? (
            <FormHelperText error={url_error} id="firstName_error">
              <span className="field_error">{url_error}</span>
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
            htmlFor="role_description"
          >
            Role Description
          </InputLabel>
          <Input
            name="role_description"
            type="text"
            value={this.state.role_description}
            onChange={this.handleInput}
            onBlur={() => this.validateFields('social_profile')}
            onFocus={this.removeErrorFocus}
            autoComplete="off"
            error={role_description_error ? role_description_error : false}
          />
          {role_description_error ? (
            <FormHelperText error={role_description_error} id="firstName_error">
              <span className="field_error">{role_description_error}</span>
            </FormHelperText>
          ) : null}
        </FormControl>
        <div className="character-info-section">
          <CustomTag text="Minimum Character left : " className="character-left" />
          <CustomTag text={role_dsc === '' ? 250 : 250 - role_dsc.length} className="count" />
        </div>
        <div style={{ textAlign: 'right' }}>
          {/* {index !== 0 ? ( */}
          <FormControl style={{ marginLeft: '11px' }} className="shape-minus">
            <div className="shape" onClick={this.props.removeOnlineProfile}>
              <div className="minus">-</div>
            </div>
          </FormControl>
          {/* ) : null} */}
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(OnlineProfile);
