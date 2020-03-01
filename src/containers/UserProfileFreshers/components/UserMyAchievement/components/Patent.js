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
import { DateFormatInput } from 'material-ui-next-pickers';
import NonCreatableSingleSelectDropdown from '../../../../../components/SingleSelectDropdownWrapper/components/NonCreatableSingleSelectDropdown/NonCreatableSingleSelectDropdown';

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

class Patent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role_dsc: '',
      patent_title: '',
      url: '',
      patent_office: '',
      application_number: '',
      year: '',
      month: '',
      description: '',
      patent_title_error: '',
      url_error: '',
      patent_office_error: '',
      application_number_error: '',
      year_error: '',
      month_error: '',
      description_error: '',
    };
    // this.checkForErrors = this.checkForErrors.bind(this);
  }
  resetErrors = () => {
    this.setState({
      patent_title_error: '',
      url_error: '',
      patent_office_error: '',
      application_number_error: '',
      year_error: '',
      month_error: '',
      description_error: '',
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
      case 'patent_title':
        this.validatePatentTitleForm();
        break;
      case 'url':
        this.validateUrlForm();
        break;
      case 'patent_office':
        this.validatePatentOfficeForm();
        break;
      case 'application_number':
        this.validateApplicationNumberForm();
        break;
      case 'description':
        this.validateDescriptionForm();
        break;
    }
  };
  //Remove Error on focus
  removeErrorFocus = e => {
    this.setParticularField(e.target.name, '');
  };
  //assign error value
  setParticularField = (name, value) => {
    const errorName = name + '_error';
    this.setState({
      [errorName]: value,
    });
  };
  validatePatentTitleForm = async () => {
    let errorValue = '';
    if (!this.state.patent_title) {
      errorValue = 'Kindly specify your Patent Title';
    }
    this.setParticularField('patent_title', errorValue);
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
  validatePatentOfficeForm = async () => {
    let errorValue = '';
    if (!this.state.patent_office) {
      errorValue = 'Kindly specify your Patent Office';
    }
    this.setParticularField('patent_office', errorValue);
    return errorValue ? true : false;
  };
  validateApplicationNumberForm = async () => {
    let errorValue = '';
    if (!this.state.application_number) {
      errorValue = 'Kindly specify your Application Number';
    }
    this.setParticularField('application_number', errorValue);
    return errorValue ? true : false;
  };
  validateDescriptionForm = async () => {
    let errorValue = '';
    if (!this.state.description) {
      errorValue = 'Kindly specify your Description';
    }
    this.setParticularField('description', errorValue);
    return errorValue ? true : false;
  };
  render() {
    const { classes, index } = this.props;
    const {
      role_dsc,
      patent_title,
      url,
      patent_office,
      application_number,
      year,
      month,
      description,
      patent_title_error,
      url_error,
      patent_office_error,
      application_number_error,
      year_error,
      month_error,
      description_error,
    } = this.state;
    const { rightHalf, leftHalf, fullWidth } = allDropDownWidth;
    return (
      <div className="training-box" key={index}>
        <div style={{ textAlign: 'right' }}>
          <CustomIcon
            icon={deleteIcon}
            className="delete-icon"
            // onclick={e => {
            //   this.props.deleteQualifications(qualification_id);
            // }}
          />
        </div>
        <FormControl className={'full-form-child ' + classes.formControl}>
          <InputLabel
            classes={{ root: classes.helperText }}
            classes={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
            shrink={true}
            htmlFor="patent_title"
          >
            Patent Title
          </InputLabel>
          <Input
            name="patent_title"
            type="text"
            value={this.state.patent_title}
            onChange={this.handleInput}
            onBlur={() => this.validateFields('social_profile')}
            onFocus={this.removeErrorFocus}
            autoComplete="off"
            error={patent_title_error ? patent_title_error : false}
          />
          {patent_title_error ? (
            <FormHelperText error={patent_title_error} id="firstName_error">
              <span className="field_error">{patent_title_error}</span>
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
            onBlur={() => this.validateFields('url')}
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
            htmlFor="patent_office"
          >
            Patent Office
          </InputLabel>
          <Input
            name="patent_office"
            type="text"
            value={this.state.patent_office}
            onChange={this.handleInput}
            onBlur={() => this.validateFields('patent_office')}
            onFocus={this.removeErrorFocus}
            autoComplete="off"
            error={patent_office_error ? patent_office_error : false}
          />
          {patent_office_error ? (
            <FormHelperText error={patent_office_error} id="firstName_error">
              <span className="field_error">{patent_office_error}</span>
            </FormHelperText>
          ) : null}
        </FormControl>
        <div className="character-info-section">
          <CustomTag text="Minimum Character left : " className="character-left" />
          <CustomTag text={role_dsc === '' ? 250 : 250 - role_dsc.length} className="count" />
        </div>
        <div className="fres-text">Status</div>
        <div className="yes-no">
          <FormControl component="fieldset" className="radio-button-control">
            <RadioGroup
              aria-label="Gender"
              className="search-radio-buttons"
              //value={this.state.value}
              //onChange={this.handleChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Patent Issued" />
              <FormControlLabel value="no" control={<Radio />} label="Patent Pending" />
            </RadioGroup>
          </FormControl>
        </div>
        <FormControl className={'full-form-child ' + classes.formControl}>
          <InputLabel
            classes={{ root: classes.helperText }}
            classes={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
            shrink={true}
            htmlFor="application_number"
          >
            Application Number
          </InputLabel>
          <Input
            name="application_number"
            type="text"
            value={this.state.application_number}
            onChange={this.handleInput}
            onBlur={() => this.validateFields('social_profile')}
            onFocus={this.removeErrorFocus}
            autoComplete="off"
            error={application_number_error ? application_number_error : false}
          />
          {application_number_error ? (
            <FormHelperText error={application_number_error} id="firstName_error">
              <span className="field_error">{application_number_error}</span>
            </FormHelperText>
          ) : null}
        </FormControl>
        <div className="fres-text">Issue Date</div>
        <div className="year-month" style={{ marginTop: '30px' }}>
          <div className="yr form-child" style={{ marginRight: '30px' }}>
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
                // isSearchable={false}
                // getSelectedOption={option => this.setYears(option)}
                // defaultValue={year ? { key: year, label: year } : {}}
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
                // isSearchable={false}
                // getSelectedOption={option => this.setMonths(option)}
                // defaultValue={month ? { key: month, label: month } : {}}
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

        <FormControl className={'full-form-child ' + classes.formControl}>
          <InputLabel
            classes={{ root: classes.helperText }}
            classes={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
            shrink={true}
            htmlFor="description"
          >
            Description
          </InputLabel>
          <Input
            name="description"
            type="text"
            value={this.state.description}
            onChange={this.handleInput}
            onBlur={() => this.validateFields('description')}
            onFocus={this.removeErrorFocus}
            autoComplete="off"
            error={description_error ? description_error : false}
          />
          {description_error ? (
            <FormHelperText error={description_error} id="firstName_error">
              <span className="field_error">{description_error}</span>
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
            <div className="shape" onClick={this.props.removePatent}>
              <div className="minus">-</div>
            </div>
          </FormControl>
          {/* ) : null} */}
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Patent);
